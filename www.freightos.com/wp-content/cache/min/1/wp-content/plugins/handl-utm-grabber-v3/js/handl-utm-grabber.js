jQuery(function($) {
    if (handl_utm_cookie_duration[1] === '1' && typeof(TVE) === "undefined") {
        window.utms_js = {}
        window.gaNames = []
        SetRefLink('handlID', Math.floor(Math.random() * Date.now()), !1, 0)
        GAClientID()
        setHandLParams()
        var qvars = getUrlVars()
        var domain = getDomainName()
        Cookies.set('user_agent', navigator.userAgent, {
            domain: domain
        })
        $.each(handl_utm_all_params, function(i, v) {
            var cookie_field = GetQVars(v, qvars)
            if (cookie_field != '' && cookie_field != 'PANTHEON_STRIPPED')
                Cookies.set(v, cookie_field, {
                    expires: parseInt(handl_utm_cookie_duration[0]),
                    domain: domain,
                    sameSite: 'None',
                    secure: !0
                });
            var curval = decodeURI(Cookies.get(v))
            if (curval != 'undefined') {
                utms_js[v] = curval
                curval = decodeURIComponent(curval)
                if (v == 'username') {
                    curval = curval.replace(/\+/g, ' ')
                }
                jQuery('input[name=\"' + v + '\"]').val(curval)
                jQuery('input#' + v).val(curval)
                jQuery('input.' + v).val(curval)
                jQuery('input#form-field-' + v).val(curval)
                jQuery('#' + v).find('input').val(curval)
                jQuery('.' + v).find('input').val(curval)
                jQuery("[data-original_id='" + v + "']").val(curval)
                jQuery("[name*=" + v + "]").val(curval)
                jQuery("[id*=" + v + "]").val(curval)
                jQuery("[class*=" + v + "]").val(curval)
                jQuery("[class*=" + v + "_out]").html(curval)
                jQuery("[id*=" + v + "_out]").html(curval)
            }
        });
        jQuery.each(handl_utm_predefined, function(i, v) {
            let value = v.value.replace(/^\[|\]$/g, '');
            let cookie_name = v.name;
            if (['_ga', 'gaclientid'].indexOf(value) > -1) {
                gaNames.push(cookie_name)
            }
            if (cookie_name != '') {
                var cookie_field = GetQVars(value, qvars)
                if (cookie_field == '') {
                    cookie_field = Cookies.get(value)
                }
                if (cookie_field != '' && cookie_field != 'PANTHEON_STRIPPED') {
                    utms_js[cookie_name] = cookie_field
                    SetRefLink(cookie_name, cookie_field, !0, 0)
                }
            }
        })
        populateLinks()
        $(document).on('nfFormReady', function() {
            form.fields.map(item => {
                if (item.default) {
                    var matches = item.default.match(/^{(\w+):(\w+)/)
                    if (matches && matches.length == 3) {
                        let key = matches[1]
                        let value = matches[2]
                        if (key === 'handl') {
                            jQuery('#nf-field-' + item.id).val(Cookies.get(value))
                        }
                    }
                }
            })
            jQuery('.nf-field-container.hidden-container').map((i, item) => jQuery(item).parents().eq(4).hide())
        })
    }
});

function populateLinks() {
    jQuery('.utm-out-js, .utm-out-js a').each(function() {
        var merged_raw = jQuery.extend({}, utms_js)
        var merged = Object.keys(merged_raw).filter(key => handl_utm_append_params.includes(key)).reduce((obj, key) => {
            obj[key] = merged_raw[key];
            return obj
        }, {});
        merged = jQuery.extend(merged, getSearchParams(this.href))
        if (this.href !== undefined) {
            var href = this.href.split("?")[0];
            if (!jQuery.isEmptyObject(merged))
                this.href = href + "?" + decodeURIComponent(jQuery.param(merged))
        }
    });
    jQuery('.utm-out, .utm-out a').each(function() {
        var merged_raw = jQuery.extend({}, handl_utm, utms_js)
        var merged = Object.keys(merged_raw).filter(key => handl_utm_append_params.includes(key)).reduce((obj, key) => {
            obj[key] = decodeURIComponent(merged_raw[key]);
            return obj
        }, {});
        merged = jQuery.extend(merged, getSearchParams(this.href))
        var current_page = window.location.href.split('?')[0]
        if (this.href !== undefined && !this.href.match("#") && !this.href.startsWith("tel:") && !this.href.startsWith("mailto:") && !this.href.startsWith("sms:") && this.href.match(new RegExp("^" + current_page + "$")) == null) {
            var href = this.href.split("?")[0];
            if (!jQuery.isEmptyObject(merged))
                this.href = href + "?" + decodeURIComponent(jQuery.param(merged))
        }
    });
    jQuery('.utm-src').each(function() {
        var target_url
        if (this.src) {
            target_url = this.src
        } else if (jQuery(this).data('url')) {
            target_url = jQuery(this).data('url')
        }
        var merged = jQuery.extend({}, handl_utm, getSearchParams(target_url))
        var src = target_url.split("?")[0];
        if (!jQuery.isEmptyObject(merged)) {
            var final_target = src + "?" + decodeURIComponent(jQuery.param(merged))
            if (this.src) {
                this.src = final_target
            } else if (jQuery(this).data('url')) {
                jQuery(this).data('url', final_target)
            }
        }
    })
}

function getSearchParams(url, k) {
    var p = {};
    var a = document.createElement('a');
    a.href = url;
    a.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, k, v) {
        p[k] = v
    })
    return k ? p[k] : p
}

function GetQVars(v, qvars) {
    if (qvars[v] != undefined) {
        return qvars[v]
    }
    return ''
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function GAClientID() {
    if (typeof(ga) == 'function' && typeof(ga.getAll) == 'function') {
        var trackers = ga.getAll();
        if (trackers.length > 0) {
            var entries = Object.entries({
                "clientId": "gaclientid",
                "referrer": "organic_source"
            })
            var domain = getDomainName()
            for (const [gaName, handlName] of entries) {
                var gaValue = trackers[0].get(gaName)
                if (gaValue !== undefined) {
                    if (gaName != 'clientId') {
                        gaNames = []
                    }
                    gaNames.push(handlName)
                    for (const curName of gaNames) {
                        utms_js[curName] = gaValue
                        Cookies.set(curName, gaValue, {
                            expires: parseInt(handl_utm_cookie_duration[0]),
                            domain: domain,
                            sameSite: 'None',
                            secure: !0
                        });
                        jQuery('input[name=\"' + curName + '\"]').val(gaValue)
                        jQuery('input#' + curName).val(gaValue)
                        jQuery('input.' + curName).val(gaValue)
                    }
                    populateLinks()
                }
            }
        }
    } else {
        setTimeout(GAClientID, 500)
    }
}

function getDomainName() {
    var name = "HandLtestDomainName"
    var value = "HandLtestDomainValue"
    var host = location.host
    var domain;
    if (host.split('.').length === 1) {
        domain = ''
    } else {
        var domainParts = host.split('.');
        domainParts.shift();
        domain = '.' + domainParts.join('.');
        Cookies.set(name, value, {
            domain: domain
        })
        if (Cookies.get(name) == null || Cookies.get(name) != value) {
            domain = '.' + host
        }
    }
    return domain
}

function setHandLParams() {
    SetRefLink('handl_url_base', document.location.origin + document.location.pathname, !0, 0)
    SetRefLink('handl_url', document.location.href, !0, 0)
    SetRefLink('handl_ref', document.referrer, !0, 0)
    SetRefLink('handl_ref_domain', document.referrer == '' ? '' : this.get_url_domain(document.referrer), !0, 0)
    SetRefLink('handl_landing_page', document.location.href, !1, 0)
    SetRefLink('handl_original_ref', document.referrer, !1, 0)
    let original_ref = Cookies.get('handl_ref_domain')
    let this_domain = document.location.host
    let source = "Other";
    if (original_ref == '') {
        source = "Direct"
    } else if (original_ref.match(/google/i) !== null) {
        source = "Google"
    } else if (original_ref.match(/yahoo/i) !== null) {
        source = "Yahoo"
    } else if (original_ref.match(/bing/i) !== null) {
        source = "Bing"
    } else if (original_ref.match(/instagram/i) !== null) {
        source = "Instagram"
    } else if (original_ref.match(/facebook/i) !== null || original_ref.match(/fb\.com$/i) !== null) {
        source = "Facebook"
    } else if (original_ref.match(/twitter/i) !== null || original_ref.match(/t\.co$/i) !== null) {
        source = "Twitter"
    } else if (original_ref.match(/snapchat/i) !== null) {
        source = "Snapchat"
    } else if (original_ref.match(/youtube/i) !== null) {
        source = "YouTube"
    } else if (original_ref.match(/pinterest/i) !== null) {
        source = "Pinterest"
    } else if (original_ref.match(/linkedin/i) !== null) {
        source = "LinkedIn"
    } else if (original_ref.match(/tumblr/i) !== null) {
        source = "Tumblr"
    } else if (original_ref.match(/duckduckgo/i) !== null) {
        source = "Duckduckgo"
    } else if (this_domain == original_ref) {
        source = "Internal"
    }
    if ((!Cookies.get('organic_source_str') || Cookies.get('organic_source_str') == '') || (Cookies.get('organic_source_str') && Cookies.get('organic_source_str') != '' && ['Internal', 'Direct'].indexOf(source) == -1)) {
        SetRefLink('organic_source', document.referrer, !0, 0)
        SetRefLink('organic_source_str', source, !0, 0)
    }
    var qvars = getUrlVars()
    let traffic_source = 'Other'
    if (Cookies.get('fbclid') != undefined || Cookies.get('gclid') != undefined || Cookies.get('msclkid') != undefined || Object.keys(qvars).indexOf('fbclid') != -1 || Object.keys(qvars).indexOf('gclid') != -1 || Object.keys(qvars).indexOf('msclkid') != -1) {
        traffic_source = 'Paid'
    } else if (['Google', 'Bing', 'Yahoo', 'Duckduckgo'].indexOf(Cookies.get('organic_source_str')) > -1) {
        traffic_source = 'Organic'
    } else if (['Facebook', 'Twitter', 'Instagram', 'Snapchat', 'YouTube', 'Pinterest', 'LinkedIn', 'Tumblr'].indexOf(Cookies.get('organic_source_str')) > -1) {
        traffic_source = 'Social'
    } else if (['Internal', 'Direct'].indexOf(Cookies.get('organic_source_str')) > -1) {
        traffic_source = 'Direct'
    } else if (Cookies.get('organic_source_str') && ['Internal'].indexOf(Cookies.get('organic_source_str')) == -1) {
        traffic_source = 'Referral'
    }
    SetRefLink('traffic_source', traffic_source, !0, 0)
}

function SetRefLink(field, value, overwrite, count) {
    var domain = getDomainName()
    if (Cookies.get(field) != value) {
        if (Cookies.get(field) !== undefined && Cookies.get(field) != "" && !overwrite) {} else if (Cookies.get(field) === undefined || Cookies.get(field) == '' || overwrite) {
            if (count == undefined) {
                count = 0
            }
            Cookies.set(field, value, {
                expires: parseInt(handl_utm_cookie_duration[0]),
                domain: domain,
                sameSite: 'None',
                secure: !0
            })
        } else {
            count = count + 1
            if (count < 3) {
                setTimeout(function() {
                    SetRefLink(field, value, overwrite, count)
                }, 500)
            }
        }
    }
}

function get_url_domain(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname
}