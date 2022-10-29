jQuery(document).ready(function($) {
    $(document).on('lity:close', function(event, instance) {
        $('body').css('overflow', '');
        console.log('done')
    });

    function nav_dropdowns() {
        var e = $(".freightos-header");
        if (e.length) {
            var t = e.find("#top-nav"),
                i = e.find("#navbarSupportedContent");
            i.on("click", ".dropdown-submenu-toggle", function(e) {
                var t = $(this),
                    n = t.closest("li").find(".dropdown-menu").first();
                if (n.length) {
                    if ($(window).width() < 1200) {
                        var o = t.closest(".dropdown-menu").find(".dropdown-menu.show");
                        o.length && !o.is(n) && (o.removeClass("show"), o.parent().removeClass("show"), o.stop().slideUp("fast")), n.hasClass("show") ? (t.parent().removeClass("show"), n.removeClass("show"), n.stop().slideUp("fast")) : (t.parent().addClass("show"), n.addClass("show"), n.stop().slideDown("fast"))
                    }
                }
            });
            var a = function(e, t, n) {
                var o = e.closest("li").find(".dropdown-menu").first();
                o.length && (t.preventDefault(), null === n && (n = !o.hasClass("show")), !0 === n ? $(window).width() < 1200 && (e.parent().addClass("show"), o.addClass("show"), o.stop().slideDown("fast")) : $(window).width() < 1200 && (e.parent().removeClass("show"), o.removeClass("show"), o.stop().slideUp("fast")))
            };
            $("body").on("click", function(e) {
                var t = $(e.target);
                if (t.length) {
                    if (t.hasClass("dropdown-toggle")) {
                        var n = i.find(".dropdown.show>.dropdown-toggle");
                        n.length && !n.is(t) && a(n, e, !1), a(t, e, null)
                    } else if (1200 <= $(window).width()) {
                        var o = i.find(".dropdown.show");
                        o.removeClass("show"), o.find(".dropdown-menu").removeClass("show"), o.find(".dropdown-submenu.show").trigger("click")
                    }
                }
            }), t.on("click", ".nav-head", function(e) {
                e.preventDefault(), $(this).parent().find(".top-nav--sub").stop().slideToggle("fast")
            }), t.on("click", ".is-current", function(e) {
                e.preventDefault()
            }), $(".dropdown-toggle").on("click", function() {
                t.find(".top-nav--sub").stop().slideUp("fast")
            }), window.addEventListener("click", function(e) {
                $(e.target).parents(".nav-item--solutions").length || t.find(".top-nav--sub").stop().slideUp("fast")
            });
            var o = function() {
                setTimeout(function() {
                    var e = i.closest(".navbar"),
                        t = e.find(".navbar-toggler").height() + parseFloat(e.find(".navbar-toggler").css("margin-bottom")),
                        n = e.find(".navbar-brand").height() + parseFloat(e.find(".navbar-brand").css("margin-bottom"));
                    t < n && (t = n), i.css("max-height", $(window).height() - t - 15)
                }, 300)
            };
            if ($("body").on("click", ".navbar-toggler,#toggler-open", function() {
                    var e = $($(this).data("target")),
                        t = $(this).closest("#menu");
                    t.hasClass("open") ? t.removeClass("open") : t.hasClass("open") || t.addClass("open"), setTimeout(function() {
                        e.hasClass("show") ? t.addClass("open") : e.hasClass("show") || t.removeClass("open")
                    }, 500), o()
                }), o(), !i.find(".group-solutions-nav--mobile").length) {
                var s = t.find(".group-solutions-nav").clone(),
                    l = $(".freightos-header .main-nav"),
                    c = s.find(">.nav-item--solutions");
                c.find(".nav-head").addClass("dropdown-toggle"), c.find(".top-nav--sub").addClass("dropdown-menu"), c.find(".top-nav--sub-item").addClass("dropdown-submenu"), c.addClass("group-solutions-nav--mobile").addClass("dropdown"), c.appendTo(l)
            }
        }
    }
    nav_dropdowns()
});
jQuery(window).load(function($) {
    let first_cookie_setup = !1;
    const getCid = () => {
        try {
            return window.ga.getAll()[0].get('clientId')
        } catch (e) {
            return !1
        }
    };
    const getCookie = (cname) => {
        try {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1)
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length)
                }
            }
            return !1
        } catch (e) {
            return !1
        }
    };
    const getCookieDomain = () => {
        var domain = window.location.hostname;
        return domain.replace('www.', '.')
    }
    const setCookie = (cname, cvalue, exdays) => {
        try {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + getCookieDomain()
        } catch (e) {
            console.log(e)
        }
    };
    let googleCid = getCid();
    let _fup_holder = getCookie('_fup_holder');
    let utm_params = getCookie('utm_params');
    if (typeof utm_params == undefined || utm_params == null || utm_params == '') {
        first_cookie_setup = !0
    }
    if (googleCid) {
        if (typeof utm_params == undefined || utm_params == null || utm_params == '') {
            if (typeof _fup_holder == undefined || _fup_holder == null || _fup_holder == '') {
                setCookie('utm_params', 'googleCid:' + googleCid, 365)
            } else {
                setCookie('utm_params', _fup_holder + '&googleCid:' + googleCid, 365)
            }
        } else if (!utm_params.includes('googleCid:')) {
            _fup_holder = utm_params;
            setCookie('utm_params', '', -1);
            setCookie('utm_params', _fup_holder + '&googleCid:' + googleCid, 365)
        }
    } else {
        setCookie('utm_params', _fup_holder, 365)
    }
    const sendCookieEvent = (properties) => {
        try {
            const ENDPOINTS = {
                segment: 'https://us-central1-freightos-lh-prod.cloudfunctions.net/segment'
            };
            const body = {
                name: 'Fcom_Paid_first_click',
                properties: properties,
                context: {
                    page_referrer: document.referrer,
                    page_title: document.title,
                    page_url: document.location.href,
                }
            };
            navigator.sendBeacon(ENDPOINTS.segment, JSON.stringify(body))
        } catch (e) {
            console.log(e)
        }
    };
    const getUtmParams = () => {
        try {
            let utm_params = {};
            let query_string = window.location.search;
            let url_params = new URLSearchParams(query_string);
            let googleCid = getCid();
            if (url_params.has('utm_source')) {
                utm_params.utmSource = url_params.get('utm_source')
            }
            if (url_params.has('utm_medium')) {
                utm_params.utmMedium = url_params.get('utm_medium')
            }
            if (url_params.has('utm_term')) {
                utm_params.utmTerm = url_params.get('utm_term')
            }
            if (url_params.has('utm_campaign')) {
                utm_params.utmCampaign = url_params.get('utm_campaign')
            }
            if (url_params.has('device')) {
                utm_params.device = url_params.get('device')
            }
            if (url_params.has('gclid')) {
                utm_params.gclid = url_params.get('gclid')
            }
            if (googleCid) {
                utm_params.googleCid = googleCid
            }
            utm_params.firstTouchUrl = document.location.href;
            return utm_params
        } catch (e) {
            return !1
        }
    };
    if (googleCid) {
        let visited_before = localStorage.getItem('visited_before');
        if (visited_before != 1) {
            let utm_params = getUtmParams();
            if (utm_params.hasOwnProperty('utmSource')) {
                sendCookieEvent(utm_params)
            }
        }
        localStorage.setItem('visited_before', 1)
    }
})