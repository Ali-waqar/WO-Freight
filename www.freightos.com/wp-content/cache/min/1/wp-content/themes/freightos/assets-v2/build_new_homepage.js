/*! For license information please see build_new_homepage.js.LICENSE */ ! function(i) {
    var n = {};

    function o(e) {
        if (n[e]) return n[e].exports;
        var t = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return i[e].call(t.exports, t, t.exports, o), t.l = !0, t.exports
    }
    o.m = i, o.c = n, o.d = function(e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) o.d(i, n, function(e) {
                return t[e]
            }.bind(null, n));
        return i
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 126)
}({
    100: function(e, t, i) {
        e.exports = {
            "slick-loading": "slick-loading",
            "slick-list": "slick-list",
            "slick-prev": "slick-prev",
            "slick-next": "slick-next",
            "slick-disabled": "slick-disabled",
            "slick-dotted": "slick-dotted",
            "slick-slider": "slick-slider",
            "slick-dots": "slick-dots",
            "slick-active": "slick-active"
        }
    },
    126: function(e, t, i) {
        "use strict";
        i.r(t),
            function(m) {
                i(98), i(99), i(100), i(127), i(2);
                m(document).ready(function() {
                    for (var e = document.querySelectorAll(".signup-pop-button"), t = 0; t < e.length; t++) e[t].onclick = function() {
                        document.body.style.overflow = "hidden", document.querySelector("#signup-popup").classList.add("show")
                    };
                    "#gf_2" === window.location.hash && document.querySelector("#signup-popup").classList.add("show");
                    var i = document.querySelector("#signup-popup-close");
                    null != i && (i.onclick = function() {
                        document.querySelector("#signup-popup").classList.remove("show"), document.body.style.overflow = "auto"
                    }, document.addEventListener("keydown", function(e) {
                        "Escape" == e.code && (document.querySelector("#signup-popup").classList.remove("show"), document.body.style.overflow = "auto")
                    }));
                    var r, n = document.querySelectorAll(".js-open-video");
                    for (t = 0; t < n.length; t++) n[t].onclick = function() {
                        document.body.style.overflow = "hidden";
                        for (var e = document.querySelectorAll(".mfp-close"), t = 0; t < e.length; t++) e[t].onclick = function() {
                            document.body.style.overflow = "auto"
                        }
                    };
                    var o = document.getElementsByClassName("dynamic-section-tabs");
                    if (null != o)
                        for (t = 0; t < o.length; t++) o[t].onclick = function() {
                            document.getElementsByClassName("active-tabs")[0].classList.remove("active-tabs"), this.classList.add("active-tabs");
                            for (var e = document.getElementsByClassName("active-dynamic-section"), t = _toArray(e).slice(0), i = 0; i < t.length; i++) t[i].classList.remove("active-dynamic-section");
                            for (var n = document.getElementsByClassName(this.id), o = 0; o < n.length; o++) n[o].classList.add("active-dynamic-section"), "bar-row-1" === n[o].children[0].id ? (clearTimeout(r), s("1-0")) : "bar-row-2" === n[o].children[0].id && (clearTimeout(r), s("2-0"))
                        };

                    function s(e) {
                        document.querySelector(".show-tab-image") && document.querySelector(".show-tab-image").classList.remove("show-tab-image"), document.querySelector("#image-tab-link-" + e).classList.add("show-tab-image");
                        var t = document.getElementById(e).children[0];
                        if (document.querySelector(".blue")) {
                            for (var i = document.querySelectorAll(".blue"), n = 0; n < i.length; n++) i[n].classList.remove("blue");
                            document.querySelector(".animate").classList.remove("animate"), t.querySelector(".progress-bar").classList.add("blue"), t.querySelector(".bar").classList.add("animate"), t.querySelector(".small-text").classList.add("blue")
                        } else t.querySelector(".progress-bar").classList.add("blue"), t.querySelector(".bar").classList.add("animate"), t.querySelector(".small-text").classList.add("blue");
                        a(document.getElementById(e).nextElementSibling)
                    }

                    function a(o) {
                        r = setTimeout(function() {
                            document.querySelector(".show-tab-image") && document.querySelector(".show-tab-image").classList.remove("show-tab-image"), document.querySelector("#image-tab-link-" + o.id).classList.add("show-tab-image");
                            var e = o.children[0];
                            if (document.querySelector(".blue")) {
                                for (var t = document.querySelectorAll(".blue"), i = 0; i < t.length; i++) t[i].classList.remove("blue");
                                document.querySelector(".animate").classList.remove("animate"), e.querySelector(".progress-bar").classList.add("blue"), e.querySelector(".bar").classList.add("animate"), e.querySelector(".small-text").classList.add("blue")
                            } else e.querySelector(".progress-bar").classList.add("blue"), e.querySelector(".bar").classList.add("animate"), e.querySelector(".small-text").classList.add("blue");
                            var n = o.nextElementSibling;
                            n ? a(n) : l(o.id.charAt(0) + "-0")
                        }, 9e3)
                    }

                    function l(e) {
                        a(document.getElementById(e))
                    }
                    null != document.querySelector("#bar-row") ? s("1-0") : null != document.querySelector("#bar-row-1") && s("1-0");
                    var c = document.querySelectorAll(".tab-col");
                    for (t = 0; t < c.length; t++) c[t].onclick = function() {
                        clearTimeout(r), document.querySelector(".show-tab-image") && document.querySelector(".show-tab-image").classList.remove("show-tab-image"), document.querySelector("#image-tab-link-" + this.id).classList.add("show-tab-image");
                        var e = this.children[0];
                        if (document.querySelector(".blue")) {
                            for (var t = document.querySelectorAll(".blue"), i = 0; i < t.length; i++) t[i].classList.remove("blue");
                            document.querySelector(".animate").classList.remove("animate"), e.querySelector(".progress-bar").classList.add("blue"), e.querySelector(".bar").classList.add("animate"), e.querySelector(".small-text").classList.add("blue")
                        } else e.querySelector(".progress-bar").classList.add("blue"), e.querySelector(".bar").classList.add("animate"), e.querySelector(".small-text").classList.add("blue");
                        var n = this.nextElementSibling;
                        n ? a(n) : l(this.id.charAt(0) + "-0")
                    };
                    var u = document.querySelectorAll(".play-video"),
                        d = document.querySelectorAll(".play-button");
                    for (t = 0; t < d.length; t++) d[t].onclick = function() {
                        document.querySelector("#screen-tab-video-" + this.getAttribute("data-id")).classList.add("play-video")
                    };
                    for (t = 0; t < u.length; t++) u[t].onclick = function() {
                        document.querySelector("#screen-tab-video-" + this.getAttribute("data-id")).classList.add("play-video")
                    };
                    var p, f = document.querySelectorAll(".video-screen-close");
                    for (t = 0; t < f.length; t++) f[t].onclick = function() {
                        for (var e = document.querySelectorAll(".video-screen"), t = 0; t < f.length; t++) {
                            e[t].classList.remove("play-video");
                            var i = e[t].querySelector("iframe");
                            if (null !== i) {
                                var n = i.src;
                                i.src = n
                            }
                        }
                    };

                    function h(o) {
                        p = setTimeout(function() {
                            document.querySelector(".show-tab-image-video") && document.querySelector(".show-tab-image-video").classList.remove("show-tab-image-video"), document.querySelector("#image-tab-link-" + o.id).classList.add("show-tab-image-video");
                            var e = o.children[0];
                            if (document.querySelector(".blueVideo")) {
                                for (var t = document.querySelectorAll(".blueVideo"), i = 0; i < t.length; i++) t[i].classList.remove("blueVideo");
                                document.querySelector(".animateVideo").classList.remove("animateVideo"), e.querySelector(".progress-bar").classList.add("blueVideo"), e.querySelector(".bar").classList.add("animateVideo")
                            } else e.querySelector(".progress-bar").classList.add("blueVideo"), e.querySelector(".bar").classList.add("animateVideo");
                            var n = o.nextElementSibling;
                            if (n) h(n);
                            else {
                                g("video-0")
                            }
                        }, 9e3)
                    }

                    function g(e) {
                        h(document.getElementById(e))
                    }
                    null != document.querySelector("#bar-video-row") && function(e) {
                        document.querySelector(".show-tab-image-video") && document.querySelector(".show-tab-image-video").classList.remove("show-tab-image-video");
                        document.querySelector("#image-tab-link-" + e).classList.add("show-tab-image-video");
                        var t = document.getElementById(e).children[0];
                        if (document.querySelector(".blueVideo")) {
                            for (var i = document.querySelectorAll(".blueVideo"), n = 0; n < i.length; n++) i[n].classList.remove("blueVideo");
                            document.querySelector(".animateVideo").classList.remove("animateVideo"), t.querySelector(".progress-bar").classList.add("blueVideo"), t.querySelector(".barVideo").classList.add("animateVideo")
                        } else t.querySelector(".progress-bar").classList.add("blueVideo"), t.querySelector(".bar").classList.add("animateVideo");
                        h(document.getElementById(e).nextElementSibling)
                    }("video-0");
                    var v = document.querySelectorAll(".tab-video-col");
                    for (t = 0; t < v.length; t++) v[t].onclick = function() {
                        clearTimeout(p), document.querySelector(".show-tab-image-video") && document.querySelector(".show-tab-image-video").classList.remove("show-tab-image-video"), document.querySelector("#image-tab-link-" + this.id).classList.add("show-tab-image-video");
                        var e = this.children[0];
                        if (document.querySelector(".blueVideo")) {
                            for (var t = document.querySelectorAll(".blueVideo"), i = 0; i < t.length; i++) t[i].classList.remove("blueVideo");
                            document.querySelector(".animateVideo").classList.remove("animateVideo"), e.querySelector(".progress-bar").classList.add("blueVideo"), e.querySelector(".bar").classList.add("animateVideo")
                        } else e.querySelector(".progress-bar").classList.add("blueVideo"), e.querySelector(".bar").classList.add("animateVideo");
                        var n = this.nextElementSibling;
                        if (n) h(n);
                        else {
                            g("video-0")
                        }
                    };
                    var y = m.noConflict();
                    y(".test-list").slick({
                        arrows: !0,
                        prevArrow: y(".left-slider"),
                        nextArrow: y(".right-slider"),
                        autoplay: !0,
                        fade: !0,
                        cssEase: "ease-in-out",
                        autoplaySpeed: 1e4
                    })
                })
            }.call(this, i(2))
    },
    127: function(e, t, i) {
        e.exports = {
            home: "home",
            digital: "digital",
            "small-text": "small-text",
            "page-template-new-homepage": "page-template-new-homepage",
            subtitle: "subtitle",
            "tab-bottom-col": "tab-bottom-col",
            "tab-bottom__link": "tab-bottom__link"
        }
    },
    2: function(si, ai, e) {
        var li;
        ! function(e, t) {
            "use strict";
            "object" == typeof si.exports ? si.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e)
            } : t(e)
        }("undefined" != typeof window ? window : this, function(S, e) {
            "use strict";

            function g(e) {
                return null != e && e === e.window
            }
            var t = [],
                T = S.document,
                n = Object.getPrototypeOf,
                a = t.slice,
                v = t.concat,
                l = t.push,
                o = t.indexOf,
                i = {},
                r = i.toString,
                y = i.hasOwnProperty,
                s = y.toString,
                c = s.call(Object),
                m = {},
                b = function(e) {
                    return "function" == typeof e && "number" != typeof e.nodeType
                },
                u = {
                    type: !0,
                    src: !0,
                    nonce: !0,
                    noModule: !0
                };

            function w(e, t, i) {
                var n, o, r = (i = i || T).createElement("script");
                if (r.text = e, t)
                    for (n in u)(o = t[n] || t.getAttribute && t.getAttribute(n)) && r.setAttribute(n, o);
                i.head.appendChild(r).parentNode.removeChild(r)
            }

            function x(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? i[r.call(e)] || "object" : typeof e
            }
            var C = function(e, t) {
                    return new C.fn.init(e, t)
                },
                d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

            function p(e) {
                var t = !!e && "length" in e && e.length,
                    i = x(e);
                return !b(e) && !g(e) && ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
            }
            C.fn = C.prototype = {
                jquery: "3.4.1",
                constructor: C,
                length: 0,
                toArray: function() {
                    return a.call(this)
                },
                get: function(e) {
                    return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
                },
                pushStack: function(e) {
                    var t = C.merge(this.constructor(), e);
                    return t.prevObject = this, t
                },
                each: function(e) {
                    return C.each(this, e)
                },
                map: function(i) {
                    return this.pushStack(C.map(this, function(e, t) {
                        return i.call(e, t, e)
                    }))
                },
                slice: function() {
                    return this.pushStack(a.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        i = +e + (e < 0 ? t : 0);
                    return this.pushStack(0 <= i && i < t ? [this[i]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: l,
                sort: t.sort,
                splice: t.splice
            }, C.extend = C.fn.extend = function() {
                var e, t, i, n, o, r, s = arguments[0] || {},
                    a = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || b(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
                    if (null != (e = arguments[a]))
                        for (t in e) n = e[t], "__proto__" !== t && s !== n && (c && n && (C.isPlainObject(n) || (o = Array.isArray(n))) ? (i = s[t], r = o && !Array.isArray(i) ? [] : o || C.isPlainObject(i) ? i : {}, o = !1, s[t] = C.extend(c, r, n)) : void 0 !== n && (s[t] = n));
                return s
            }, C.extend({
                expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isPlainObject: function(e) {
                    var t, i;
                    return !(!e || "[object Object]" !== r.call(e)) && (!(t = n(e)) || "function" == typeof(i = y.call(t, "constructor") && t.constructor) && s.call(i) === c)
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                globalEval: function(e, t) {
                    w(e, {
                        nonce: t && t.nonce
                    })
                },
                each: function(e, t) {
                    var i, n = 0;
                    if (p(e))
                        for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
                    else
                        for (n in e)
                            if (!1 === t.call(e[n], n, e[n])) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(d, "")
                },
                makeArray: function(e, t) {
                    var i = t || [];
                    return null != e && (p(Object(e)) ? C.merge(i, "string" == typeof e ? [e] : e) : l.call(i, e)), i
                },
                inArray: function(e, t, i) {
                    return null == t ? -1 : o.call(t, e, i)
                },
                merge: function(e, t) {
                    for (var i = +t.length, n = 0, o = e.length; n < i; n++) e[o++] = t[n];
                    return e.length = o, e
                },
                grep: function(e, t, i) {
                    for (var n = [], o = 0, r = e.length, s = !i; o < r; o++) !t(e[o], o) != s && n.push(e[o]);
                    return n
                },
                map: function(e, t, i) {
                    var n, o, r = 0,
                        s = [];
                    if (p(e))
                        for (n = e.length; r < n; r++) null != (o = t(e[r], r, i)) && s.push(o);
                    else
                        for (r in e) null != (o = t(e[r], r, i)) && s.push(o);
                    return v.apply([], s)
                },
                guid: 1,
                support: m
            }), "function" == typeof Symbol && (C.fn[Symbol.iterator] = t[Symbol.iterator]), C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                i["[object " + t + "]"] = t.toLowerCase()
            });
            var f = function(i) {
                function d(e, t, i) {
                    var n = "0x" + t - 65536;
                    return n != n || i ? t : n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                }

                function o() {
                    k()
                }
                var e, f, w, r, s, h, p, g, x, l, c, k, S, a, T, v, u, y, m, C = "sizzle" + 1 * new Date,
                    b = i.document,
                    $ = 0,
                    n = 0,
                    A = le(),
                    E = le(),
                    L = le(),
                    q = le(),
                    j = function(e, t) {
                        return e === t && (c = !0), 0
                    },
                    D = {}.hasOwnProperty,
                    t = [],
                    N = t.pop,
                    O = t.push,
                    H = t.push,
                    P = t.slice,
                    M = function(e, t) {
                        for (var i = 0, n = e.length; i < n; i++)
                            if (e[i] === t) return i;
                        return -1
                    },
                    I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    z = "[\\x20\\t\\r\\n\\f]",
                    R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    W = "\\[" + z + "*(" + R + ")(?:" + z + "*([*^$|!~]?=)" + z + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + z + "*\\]",
                    B = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
                    F = new RegExp(z + "+", "g"),
                    _ = new RegExp("^" + z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + z + "+$", "g"),
                    U = new RegExp("^" + z + "*," + z + "*"),
                    V = new RegExp("^" + z + "*([>+~]|" + z + ")" + z + "*"),
                    X = new RegExp(z + "|>"),
                    Y = new RegExp(B),
                    G = new RegExp("^" + R + "$"),
                    Q = {
                        ID: new RegExp("^#(" + R + ")"),
                        CLASS: new RegExp("^\\.(" + R + ")"),
                        TAG: new RegExp("^(" + R + "|[*])"),
                        ATTR: new RegExp("^" + W),
                        PSEUDO: new RegExp("^" + B),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + z + "*(even|odd|(([+-]|)(\\d*)n|)" + z + "*(?:([+-]|)" + z + "*(\\d+)|))" + z + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + I + ")$", "i"),
                        needsContext: new RegExp("^" + z + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + z + "*((?:-\\d)?\\d*)" + z + "*\\)|)(?=[^-]|$)", "i")
                    },
                    J = /HTML$/i,
                    K = /^(?:input|select|textarea|button)$/i,
                    Z = /^h\d$/i,
                    ee = /^[^{]+\{\s*\[native \w/,
                    te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ie = /[+~]/,
                    ne = new RegExp("\\\\([\\da-f]{1,6}" + z + "?|(" + z + ")|.)", "ig"),
                    oe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    re = function(e, t) {
                        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                    },
                    se = we(function(e) {
                        return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    H.apply(t = P.call(b.childNodes), b.childNodes), t[b.childNodes.length].nodeType
                } catch (e) {
                    H = {
                        apply: t.length ? function(e, t) {
                            O.apply(e, P.call(t))
                        } : function(e, t) {
                            for (var i = e.length, n = 0; e[i++] = t[n++];);
                            e.length = i - 1
                        }
                    }
                }

                function ae(t, e, i, n) {
                    var o, r, s, a, l, c, u, d = e && e.ownerDocument,
                        p = e ? e.nodeType : 9;
                    if (i = i || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return i;
                    if (!n && ((e ? e.ownerDocument || e : b) !== S && k(e), e = e || S, T)) {
                        if (11 !== p && (l = te.exec(t)))
                            if (o = l[1]) {
                                if (9 === p) {
                                    if (!(s = e.getElementById(o))) return i;
                                    if (s.id === o) return i.push(s), i
                                } else if (d && (s = d.getElementById(o)) && m(e, s) && s.id === o) return i.push(s), i
                            } else {
                                if (l[2]) return H.apply(i, e.getElementsByTagName(t)), i;
                                if ((o = l[3]) && f.getElementsByClassName && e.getElementsByClassName) return H.apply(i, e.getElementsByClassName(o)), i
                            }
                        if (f.qsa && !q[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                            if (u = t, d = e, 1 === p && X.test(t)) {
                                for ((a = e.getAttribute("id")) ? a = a.replace(oe, re) : e.setAttribute("id", a = C), r = (c = h(t)).length; r--;) c[r] = "#" + a + " " + be(c[r]);
                                u = c.join(","), d = ie.test(t) && ye(e.parentNode) || e
                            }
                            try {
                                return H.apply(i, d.querySelectorAll(u)), i
                            } catch (e) {
                                q(t, !0)
                            } finally {
                                a === C && e.removeAttribute("id")
                            }
                        }
                    }
                    return g(t.replace(_, "$1"), e, i, n)
                }

                function le() {
                    var n = [];
                    return function e(t, i) {
                        return n.push(t + " ") > w.cacheLength && delete e[n.shift()], e[t + " "] = i
                    }
                }

                function ce(e) {
                    return e[C] = !0, e
                }

                function ue(e) {
                    var t = S.createElement("fieldset");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function de(e, t) {
                    for (var i = e.split("|"), n = i.length; n--;) w.attrHandle[i[n]] = t
                }

                function pe(e, t) {
                    var i = t && e,
                        n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (n) return n;
                    if (i)
                        for (; i = i.nextSibling;)
                            if (i === t) return -1;
                    return e ? 1 : -1
                }

                function fe(t) {
                    return function(e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === t
                    }
                }

                function he(i) {
                    return function(e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t || "button" === t) && e.type === i
                    }
                }

                function ge(t) {
                    return function(e) {
                        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && se(e) === t : e.disabled === t : "label" in e && e.disabled === t
                    }
                }

                function ve(s) {
                    return ce(function(r) {
                        return r = +r, ce(function(e, t) {
                            for (var i, n = s([], e.length, r), o = n.length; o--;) e[i = n[o]] && (e[i] = !(t[i] = e[i]))
                        })
                    })
                }

                function ye(e) {
                    return e && void 0 !== e.getElementsByTagName && e
                }
                for (e in f = ae.support = {}, s = ae.isXML = function(e) {
                        var t = e.namespaceURI,
                            i = (e.ownerDocument || e).documentElement;
                        return !J.test(t || i && i.nodeName || "HTML")
                    }, k = ae.setDocument = function(e) {
                        var t, i, n = e ? e.ownerDocument || e : b;
                        return n !== S && 9 === n.nodeType && n.documentElement && (a = (S = n).documentElement, T = !s(S), b !== S && (i = S.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", o, !1) : i.attachEvent && i.attachEvent("onunload", o)), f.attributes = ue(function(e) {
                            return e.className = "i", !e.getAttribute("className")
                        }), f.getElementsByTagName = ue(function(e) {
                            return e.appendChild(S.createComment("")), !e.getElementsByTagName("*").length
                        }), f.getElementsByClassName = ee.test(S.getElementsByClassName), f.getById = ue(function(e) {
                            return a.appendChild(e).id = C, !S.getElementsByName || !S.getElementsByName(C).length
                        }), f.getById ? (w.filter.ID = function(e) {
                            var t = e.replace(ne, d);
                            return function(e) {
                                return e.getAttribute("id") === t
                            }
                        }, w.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && T) {
                                var i = t.getElementById(e);
                                return i ? [i] : []
                            }
                        }) : (w.filter.ID = function(e) {
                            var i = e.replace(ne, d);
                            return function(e) {
                                var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return t && t.value === i
                            }
                        }, w.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && T) {
                                var i, n, o, r = t.getElementById(e);
                                if (r) {
                                    if ((i = r.getAttributeNode("id")) && i.value === e) return [r];
                                    for (o = t.getElementsByName(e), n = 0; r = o[n++];)
                                        if ((i = r.getAttributeNode("id")) && i.value === e) return [r]
                                }
                                return []
                            }
                        }), w.find.TAG = f.getElementsByTagName ? function(e, t) {
                            return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0
                        } : function(e, t) {
                            var i, n = [],
                                o = 0,
                                r = t.getElementsByTagName(e);
                            if ("*" !== e) return r;
                            for (; i = r[o++];) 1 === i.nodeType && n.push(i);
                            return n
                        }, w.find.CLASS = f.getElementsByClassName && function(e, t) {
                            if (void 0 !== t.getElementsByClassName && T) return t.getElementsByClassName(e)
                        }, u = [], v = [], (f.qsa = ee.test(S.querySelectorAll)) && (ue(function(e) {
                            a.appendChild(e).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + z + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + z + "*(?:value|" + I + ")"), e.querySelectorAll("[id~=" + C + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + C + "+*").length || v.push(".#.+[+~]")
                        }), ue(function(e) {
                            e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var t = S.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + z + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                        })), (f.matchesSelector = ee.test(y = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ue(function(e) {
                            f.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), u.push("!=", B)
                        }), v = v.length && new RegExp(v.join("|")), u = u.length && new RegExp(u.join("|")), t = ee.test(a.compareDocumentPosition), m = t || ee.test(a.contains) ? function(e, t) {
                            var i = 9 === e.nodeType ? e.documentElement : e,
                                n = t && t.parentNode;
                            return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
                        } : function(e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        }, j = t ? function(e, t) {
                            if (e === t) return c = !0, 0;
                            var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !f.sortDetached && t.compareDocumentPosition(e) === i ? e === S || e.ownerDocument === b && m(b, e) ? -1 : t === S || t.ownerDocument === b && m(b, t) ? 1 : l ? M(l, e) - M(l, t) : 0 : 4 & i ? -1 : 1)
                        } : function(e, t) {
                            if (e === t) return c = !0, 0;
                            var i, n = 0,
                                o = e.parentNode,
                                r = t.parentNode,
                                s = [e],
                                a = [t];
                            if (!o || !r) return e === S ? -1 : t === S ? 1 : o ? -1 : r ? 1 : l ? M(l, e) - M(l, t) : 0;
                            if (o === r) return pe(e, t);
                            for (i = e; i = i.parentNode;) s.unshift(i);
                            for (i = t; i = i.parentNode;) a.unshift(i);
                            for (; s[n] === a[n];) n++;
                            return n ? pe(s[n], a[n]) : s[n] === b ? -1 : a[n] === b ? 1 : 0
                        }), S
                    }, ae.matches = function(e, t) {
                        return ae(e, null, null, t)
                    }, ae.matchesSelector = function(e, t) {
                        if ((e.ownerDocument || e) !== S && k(e), f.matchesSelector && T && !q[t + " "] && (!u || !u.test(t)) && (!v || !v.test(t))) try {
                            var i = y.call(e, t);
                            if (i || f.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                        } catch (e) {
                            q(t, !0)
                        }
                        return 0 < ae(t, S, null, [e]).length
                    }, ae.contains = function(e, t) {
                        return (e.ownerDocument || e) !== S && k(e), m(e, t)
                    }, ae.attr = function(e, t) {
                        (e.ownerDocument || e) !== S && k(e);
                        var i = w.attrHandle[t.toLowerCase()],
                            n = i && D.call(w.attrHandle, t.toLowerCase()) ? i(e, t, !T) : void 0;
                        return void 0 !== n ? n : f.attributes || !T ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
                    }, ae.escape = function(e) {
                        return (e + "").replace(oe, re)
                    }, ae.error = function(e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    }, ae.uniqueSort = function(e) {
                        var t, i = [],
                            n = 0,
                            o = 0;
                        if (c = !f.detectDuplicates, l = !f.sortStable && e.slice(0), e.sort(j), c) {
                            for (; t = e[o++];) t === e[o] && (n = i.push(o));
                            for (; n--;) e.splice(i[n], 1)
                        }
                        return l = null, e
                    }, r = ae.getText = function(e) {
                        var t, i = "",
                            n = 0,
                            o = e.nodeType;
                        if (o) {
                            if (1 === o || 9 === o || 11 === o) {
                                if ("string" == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) i += r(e)
                            } else if (3 === o || 4 === o) return e.nodeValue
                        } else
                            for (; t = e[n++];) i += r(t);
                        return i
                    }, (w = ae.selectors = {
                        cacheLength: 50,
                        createPseudo: ce,
                        match: Q,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(e) {
                                return e[1] = e[1].replace(ne, d), e[3] = (e[3] || e[4] || e[5] || "").replace(ne, d), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                            },
                            CHILD: function(e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                            },
                            PSEUDO: function(e) {
                                var t, i = !e[6] && e[2];
                                return Q.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && Y.test(i) && (t = h(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(e) {
                                var t = e.replace(ne, d).toLowerCase();
                                return "*" === e ? function() {
                                    return !0
                                } : function(e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                            },
                            CLASS: function(e) {
                                var t = A[e + " "];
                                return t || (t = new RegExp("(^|" + z + ")" + e + "(" + z + "|$)")) && A(e, function(e) {
                                    return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(i, n, o) {
                                return function(e) {
                                    var t = ae.attr(e, i);
                                    return null == t ? "!=" === n : !n || (t += "", "=" === n ? t === o : "!=" === n ? t !== o : "^=" === n ? o && 0 === t.indexOf(o) : "*=" === n ? o && -1 < t.indexOf(o) : "$=" === n ? o && t.slice(-o.length) === o : "~=" === n ? -1 < (" " + t.replace(F, " ") + " ").indexOf(o) : "|=" === n && (t === o || t.slice(0, o.length + 1) === o + "-"))
                                }
                            },
                            CHILD: function(h, e, t, g, v) {
                                var y = "nth" !== h.slice(0, 3),
                                    m = "last" !== h.slice(-4),
                                    b = "of-type" === e;
                                return 1 === g && 0 === v ? function(e) {
                                    return !!e.parentNode
                                } : function(e, t, i) {
                                    var n, o, r, s, a, l, c = y != m ? "nextSibling" : "previousSibling",
                                        u = e.parentNode,
                                        d = b && e.nodeName.toLowerCase(),
                                        p = !i && !b,
                                        f = !1;
                                    if (u) {
                                        if (y) {
                                            for (; c;) {
                                                for (s = e; s = s[c];)
                                                    if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                                l = c = "only" === h && !l && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (l = [m ? u.firstChild : u.lastChild], m && p) {
                                            for (f = (a = (n = (o = (r = (s = u)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === $ && n[1]) && n[2], s = a && u.childNodes[a]; s = ++a && s && s[c] || (f = a = 0) || l.pop();)
                                                if (1 === s.nodeType && ++f && s === e) {
                                                    o[h] = [$, a, f];
                                                    break
                                                }
                                        } else if (p && (f = a = (n = (o = (r = (s = e)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === $ && n[1]), !1 === f)
                                            for (;
                                                (s = ++a && s && s[c] || (f = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (p && ((o = (r = s[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] = [$, f]), s !== e)););
                                        return (f -= v) === g || f % g == 0 && 0 <= f / g
                                    }
                                }
                            },
                            PSEUDO: function(e, r) {
                                var t, s = w.pseudos[e] || w.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                                return s[C] ? s(r) : 1 < s.length ? (t = [e, e, "", r], w.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function(e, t) {
                                    for (var i, n = s(e, r), o = n.length; o--;) e[i = M(e, n[o])] = !(t[i] = n[o])
                                }) : function(e) {
                                    return s(e, 0, t)
                                }) : s
                            }
                        },
                        pseudos: {
                            not: ce(function(e) {
                                var n = [],
                                    o = [],
                                    a = p(e.replace(_, "$1"));
                                return a[C] ? ce(function(e, t, i, n) {
                                    for (var o, r = a(e, null, n, []), s = e.length; s--;)(o = r[s]) && (e[s] = !(t[s] = o))
                                }) : function(e, t, i) {
                                    return n[0] = e, a(n, null, i, o), n[0] = null, !o.pop()
                                }
                            }),
                            has: ce(function(t) {
                                return function(e) {
                                    return 0 < ae(t, e).length
                                }
                            }),
                            contains: ce(function(t) {
                                return t = t.replace(ne, d),
                                    function(e) {
                                        return -1 < (e.textContent || r(e)).indexOf(t)
                                    }
                            }),
                            lang: ce(function(i) {
                                return G.test(i || "") || ae.error("unsupported lang: " + i), i = i.replace(ne, d).toLowerCase(),
                                    function(e) {
                                        var t;
                                        do {
                                            if (t = T ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-")
                                        } while ((e = e.parentNode) && 1 === e.nodeType);
                                        return !1
                                    }
                            }),
                            target: function(e) {
                                var t = i.location && i.location.hash;
                                return t && t.slice(1) === e.id
                            },
                            root: function(e) {
                                return e === a
                            },
                            focus: function(e) {
                                return e === S.activeElement && (!S.hasFocus || S.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            },
                            enabled: ge(!1),
                            disabled: ge(!0),
                            checked: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6) return !1;
                                return !0
                            },
                            parent: function(e) {
                                return !w.pseudos.empty(e)
                            },
                            header: function(e) {
                                return Z.test(e.nodeName)
                            },
                            input: function(e) {
                                return K.test(e.nodeName)
                            },
                            button: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            },
                            text: function(e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                            },
                            first: ve(function() {
                                return [0]
                            }),
                            last: ve(function(e, t) {
                                return [t - 1]
                            }),
                            eq: ve(function(e, t, i) {
                                return [i < 0 ? i + t : i]
                            }),
                            even: ve(function(e, t) {
                                for (var i = 0; i < t; i += 2) e.push(i);
                                return e
                            }),
                            odd: ve(function(e, t) {
                                for (var i = 1; i < t; i += 2) e.push(i);
                                return e
                            }),
                            lt: ve(function(e, t, i) {
                                for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n;) e.push(n);
                                return e
                            }),
                            gt: ve(function(e, t, i) {
                                for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
                                return e
                            })
                        }
                    }).pseudos.nth = w.pseudos.eq, {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) w.pseudos[e] = fe(e);
                for (e in {
                        submit: !0,
                        reset: !0
                    }) w.pseudos[e] = he(e);

                function me() {}

                function be(e) {
                    for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
                    return n
                }

                function we(a, e, t) {
                    var l = e.dir,
                        c = e.next,
                        u = c || l,
                        d = t && "parentNode" === u,
                        p = n++;
                    return e.first ? function(e, t, i) {
                        for (; e = e[l];)
                            if (1 === e.nodeType || d) return a(e, t, i);
                        return !1
                    } : function(e, t, i) {
                        var n, o, r, s = [$, p];
                        if (i) {
                            for (; e = e[l];)
                                if ((1 === e.nodeType || d) && a(e, t, i)) return !0
                        } else
                            for (; e = e[l];)
                                if (1 === e.nodeType || d)
                                    if (o = (r = e[C] || (e[C] = {}))[e.uniqueID] || (r[e.uniqueID] = {}), c && c === e.nodeName.toLowerCase()) e = e[l] || e;
                                    else {
                                        if ((n = o[u]) && n[0] === $ && n[1] === p) return s[2] = n[2];
                                        if ((o[u] = s)[2] = a(e, t, i)) return !0
                                    } return !1
                    }
                }

                function xe(o) {
                    return 1 < o.length ? function(e, t, i) {
                        for (var n = o.length; n--;)
                            if (!o[n](e, t, i)) return !1;
                        return !0
                    } : o[0]
                }

                function ke(e, t, i, n, o) {
                    for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (i && !i(r, n, o) || (s.push(r), c && t.push(a)));
                    return s
                }

                function Se(f, h, g, v, y, e) {
                    return v && !v[C] && (v = Se(v)), y && !y[C] && (y = Se(y, e)), ce(function(e, t, i, n) {
                        var o, r, s, a = [],
                            l = [],
                            c = t.length,
                            u = e || function(e, t, i) {
                                for (var n = 0, o = t.length; n < o; n++) ae(e, t[n], i);
                                return i
                            }(h || "*", i.nodeType ? [i] : i, []),
                            d = !f || !e && h ? u : ke(u, a, f, i, n),
                            p = g ? y || (e ? f : c || v) ? [] : t : d;
                        if (g && g(d, p, i, n), v)
                            for (o = ke(p, l), v(o, [], i, n), r = o.length; r--;)(s = o[r]) && (p[l[r]] = !(d[l[r]] = s));
                        if (e) {
                            if (y || f) {
                                if (y) {
                                    for (o = [], r = p.length; r--;)(s = p[r]) && o.push(d[r] = s);
                                    y(null, p = [], o, n)
                                }
                                for (r = p.length; r--;)(s = p[r]) && -1 < (o = y ? M(e, s) : a[r]) && (e[o] = !(t[o] = s))
                            }
                        } else p = ke(p === t ? p.splice(c, p.length) : p), y ? y(null, t, p, n) : H.apply(t, p)
                    })
                }

                function Te(e) {
                    for (var o, t, i, n = e.length, r = w.relative[e[0].type], s = r || w.relative[" "], a = r ? 1 : 0, l = we(function(e) {
                            return e === o
                        }, s, !0), c = we(function(e) {
                            return -1 < M(o, e)
                        }, s, !0), u = [function(e, t, i) {
                            var n = !r && (i || t !== x) || ((o = t).nodeType ? l(e, t, i) : c(e, t, i));
                            return o = null, n
                        }]; a < n; a++)
                        if (t = w.relative[e[a].type]) u = [we(xe(u), t)];
                        else {
                            if ((t = w.filter[e[a].type].apply(null, e[a].matches))[C]) {
                                for (i = ++a; i < n && !w.relative[e[i].type]; i++);
                                return Se(1 < a && xe(u), 1 < a && be(e.slice(0, a - 1).concat({
                                    value: " " === e[a - 2].type ? "*" : ""
                                })).replace(_, "$1"), t, a < i && Te(e.slice(a, i)), i < n && Te(e = e.slice(i)), i < n && be(e))
                            }
                            u.push(t)
                        }
                    return xe(u)
                }

                function Ce(v, y) {
                    function e(e, t, i, n, o) {
                        var r, s, a, l = 0,
                            c = "0",
                            u = e && [],
                            d = [],
                            p = x,
                            f = e || b && w.find.TAG("*", o),
                            h = $ += null == p ? 1 : Math.random() || .1,
                            g = f.length;
                        for (o && (x = t === S || t || o); c !== g && null != (r = f[c]); c++) {
                            if (b && r) {
                                for (s = 0, t || r.ownerDocument === S || (k(r), i = !T); a = v[s++];)
                                    if (a(r, t || S, i)) {
                                        n.push(r);
                                        break
                                    }
                                o && ($ = h)
                            }
                            m && ((r = !a && r) && l--, e && u.push(r))
                        }
                        if (l += c, m && c !== l) {
                            for (s = 0; a = y[s++];) a(u, d, t, i);
                            if (e) {
                                if (0 < l)
                                    for (; c--;) u[c] || d[c] || (d[c] = N.call(n));
                                d = ke(d)
                            }
                            H.apply(n, d), o && !e && 0 < d.length && 1 < l + y.length && ae.uniqueSort(n)
                        }
                        return o && ($ = h, x = p), u
                    }
                    var m = 0 < y.length,
                        b = 0 < v.length;
                    return m ? ce(e) : e
                }
                return me.prototype = w.filters = w.pseudos, w.setFilters = new me, h = ae.tokenize = function(e, t) {
                    var i, n, o, r, s, a, l, c = E[e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    for (s = e, a = [], l = w.preFilter; s;) {
                        for (r in i && !(n = U.exec(s)) || (n && (s = s.slice(n[0].length) || s), a.push(o = [])), i = !1, (n = V.exec(s)) && (i = n.shift(), o.push({
                                value: i,
                                type: n[0].replace(_, " ")
                            }), s = s.slice(i.length)), w.filter) !(n = Q[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), o.push({
                            value: i,
                            type: r,
                            matches: n
                        }), s = s.slice(i.length));
                        if (!i) break
                    }
                    return t ? s.length : s ? ae.error(e) : E(e, a).slice(0)
                }, p = ae.compile = function(e, t) {
                    var i, n = [],
                        o = [],
                        r = L[e + " "];
                    if (!r) {
                        for (i = (t = t || h(e)).length; i--;)(r = Te(t[i]))[C] ? n.push(r) : o.push(r);
                        (r = L(e, Ce(o, n))).selector = e
                    }
                    return r
                }, g = ae.select = function(e, t, i, n) {
                    var o, r, s, a, l, c = "function" == typeof e && e,
                        u = !n && h(e = c.selector || e);
                    if (i = i || [], 1 === u.length) {
                        if (2 < (r = u[0] = u[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === t.nodeType && T && w.relative[r[1].type]) {
                            if (!(t = (w.find.ID(s.matches[0].replace(ne, d), t) || [])[0])) return i;
                            c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                        }
                        for (o = Q.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !w.relative[a = s.type]);)
                            if ((l = w.find[a]) && (n = l(s.matches[0].replace(ne, d), ie.test(r[0].type) && ye(t.parentNode) || t))) {
                                if (r.splice(o, 1), !(e = n.length && be(r))) return H.apply(i, n), i;
                                break
                            }
                    }
                    return (c || p(e, u))(n, t, !T, i, !t || ie.test(e) && ye(t.parentNode) || t), i
                }, f.sortStable = C.split("").sort(j).join("") === C, f.detectDuplicates = !!c, k(), f.sortDetached = ue(function(e) {
                    return 1 & e.compareDocumentPosition(S.createElement("fieldset"))
                }), ue(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || de("type|href|height|width", function(e, t, i) {
                    if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), f.attributes && ue(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || de("value", function(e, t, i) {
                    if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                }), ue(function(e) {
                    return null == e.getAttribute("disabled")
                }) || de(I, function(e, t, i) {
                    var n;
                    if (!i) return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
                }), ae
            }(S);
            C.find = f, C.expr = f.selectors, C.expr[":"] = C.expr.pseudos, C.uniqueSort = C.unique = f.uniqueSort, C.text = f.getText, C.isXMLDoc = f.isXML, C.contains = f.contains, C.escapeSelector = f.escape;

            function h(e, t, i) {
                for (var n = [], o = void 0 !== i;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (o && C(e).is(i)) break;
                        n.push(e)
                    }
                return n
            }

            function k(e, t) {
                for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
                return i
            }
            var $ = C.expr.match.needsContext;

            function A(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }
            var E = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

            function L(e, i, n) {
                return b(i) ? C.grep(e, function(e, t) {
                    return !!i.call(e, t, e) !== n
                }) : i.nodeType ? C.grep(e, function(e) {
                    return e === i !== n
                }) : "string" != typeof i ? C.grep(e, function(e) {
                    return -1 < o.call(i, e) !== n
                }) : C.filter(i, e, n)
            }
            C.filter = function(e, t, i) {
                var n = t[0];
                return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? C.find.matchesSelector(n, e) ? [n] : [] : C.find.matches(e, C.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }, C.fn.extend({
                find: function(e) {
                    var t, i, n = this.length,
                        o = this;
                    if ("string" != typeof e) return this.pushStack(C(e).filter(function() {
                        for (t = 0; t < n; t++)
                            if (C.contains(o[t], this)) return !0
                    }));
                    for (i = this.pushStack([]), t = 0; t < n; t++) C.find(e, o[t], i);
                    return 1 < n ? C.uniqueSort(i) : i
                },
                filter: function(e) {
                    return this.pushStack(L(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(L(this, e || [], !0))
                },
                is: function(e) {
                    return !!L(this, "string" == typeof e && $.test(e) ? C(e) : e || [], !1).length
                }
            });
            var q, j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (C.fn.init = function(e, t, i) {
                var n, o;
                if (!e) return this;
                if (i = i || q, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : b(e) ? void 0 !== i.ready ? i.ready(e) : e(C) : C.makeArray(e, this);
                if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : j.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof C ? t[0] : t, C.merge(this, C.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), E.test(n[1]) && C.isPlainObject(t))
                        for (n in t) b(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                return (o = T.getElementById(n[2])) && (this[0] = o, this.length = 1), this
            }).prototype = C.fn, q = C(T);
            var D = /^(?:parents|prev(?:Until|All))/,
                N = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };

            function O(e, t) {
                for (;
                    (e = e[t]) && 1 !== e.nodeType;);
                return e
            }
            C.fn.extend({
                has: function(e) {
                    var t = C(e, this),
                        i = t.length;
                    return this.filter(function() {
                        for (var e = 0; e < i; e++)
                            if (C.contains(this, t[e])) return !0
                    })
                },
                closest: function(e, t) {
                    var i, n = 0,
                        o = this.length,
                        r = [],
                        s = "string" != typeof e && C(e);
                    if (!$.test(e))
                        for (; n < o; n++)
                            for (i = this[n]; i && i !== t; i = i.parentNode)
                                if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && C.find.matchesSelector(i, e))) {
                                    r.push(i);
                                    break
                                }
                    return this.pushStack(1 < r.length ? C.uniqueSort(r) : r)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? o.call(C(e), this[0]) : o.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), C.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return h(e, "parentNode")
                },
                parentsUntil: function(e, t, i) {
                    return h(e, "parentNode", i)
                },
                next: function(e) {
                    return O(e, "nextSibling")
                },
                prev: function(e) {
                    return O(e, "previousSibling")
                },
                nextAll: function(e) {
                    return h(e, "nextSibling")
                },
                prevAll: function(e) {
                    return h(e, "previousSibling")
                },
                nextUntil: function(e, t, i) {
                    return h(e, "nextSibling", i)
                },
                prevUntil: function(e, t, i) {
                    return h(e, "previousSibling", i)
                },
                siblings: function(e) {
                    return k((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return k(e.firstChild)
                },
                contents: function(e) {
                    return void 0 !== e.contentDocument ? e.contentDocument : (A(e, "template") && (e = e.content || e), C.merge([], e.childNodes))
                }
            }, function(n, o) {
                C.fn[n] = function(e, t) {
                    var i = C.map(this, o, e);
                    return "Until" !== n.slice(-5) && (t = e), t && "string" == typeof t && (i = C.filter(t, i)), 1 < this.length && (N[n] || C.uniqueSort(i), D.test(n) && i.reverse()), this.pushStack(i)
                }
            });
            var H = /[^\x20\t\r\n\f]+/g;

            function P(e) {
                return e
            }

            function M(e) {
                throw e
            }

            function I(e, t, i, n) {
                var o;
                try {
                    e && b(o = e.promise) ? o.call(e).done(t).fail(i) : e && b(o = e.then) ? o.call(e, t, i) : t.apply(void 0, [e].slice(n))
                } catch (e) {
                    i.apply(void 0, [e])
                }
            }
            C.Callbacks = function(n) {
                var e, i;
                n = "string" == typeof n ? (e = n, i = {}, C.each(e.match(H) || [], function(e, t) {
                    i[t] = !0
                }), i) : C.extend({}, n);

                function o() {
                    for (a = a || n.once, s = r = !0; c.length; u = -1)
                        for (t = c.shift(); ++u < l.length;) !1 === l[u].apply(t[0], t[1]) && n.stopOnFalse && (u = l.length, t = !1);
                    n.memory || (t = !1), r = !1, a && (l = t ? [] : "")
                }
                var r, t, s, a, l = [],
                    c = [],
                    u = -1,
                    d = {
                        add: function() {
                            return l && (t && !r && (u = l.length - 1, c.push(t)), function i(e) {
                                C.each(e, function(e, t) {
                                    b(t) ? n.unique && d.has(t) || l.push(t) : t && t.length && "string" !== x(t) && i(t)
                                })
                            }(arguments), t && !r && o()), this
                        },
                        remove: function() {
                            return C.each(arguments, function(e, t) {
                                for (var i; - 1 < (i = C.inArray(t, l, i));) l.splice(i, 1), i <= u && u--
                            }), this
                        },
                        has: function(e) {
                            return e ? -1 < C.inArray(e, l) : 0 < l.length
                        },
                        empty: function() {
                            return l = l && [], this
                        },
                        disable: function() {
                            return a = c = [], l = t = "", this
                        },
                        disabled: function() {
                            return !l
                        },
                        lock: function() {
                            return a = c = [], t || r || (l = t = ""), this
                        },
                        locked: function() {
                            return !!a
                        },
                        fireWith: function(e, t) {
                            return a || (t = [e, (t = t || []).slice ? t.slice() : t], c.push(t), r || o()), this
                        },
                        fire: function() {
                            return d.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!s
                        }
                    };
                return d
            }, C.extend({
                Deferred: function(e) {
                    var r = [
                            ["notify", "progress", C.Callbacks("memory"), C.Callbacks("memory"), 2],
                            ["resolve", "done", C.Callbacks("once memory"), C.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", C.Callbacks("once memory"), C.Callbacks("once memory"), 1, "rejected"]
                        ],
                        o = "pending",
                        s = {
                            state: function() {
                                return o
                            },
                            always: function() {
                                return a.done(arguments).fail(arguments), this
                            },
                            catch: function(e) {
                                return s.then(null, e)
                            },
                            pipe: function() {
                                var o = arguments;
                                return C.Deferred(function(n) {
                                    C.each(r, function(e, t) {
                                        var i = b(o[t[4]]) && o[t[4]];
                                        a[t[1]](function() {
                                            var e = i && i.apply(this, arguments);
                                            e && b(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[t[0] + "With"](this, i ? [e] : arguments)
                                        })
                                    }), o = null
                                }).promise()
                            },
                            then: function(t, i, n) {
                                var l = 0;

                                function c(o, r, s, a) {
                                    return function() {
                                        function e() {
                                            var e, t;
                                            if (!(o < l)) {
                                                if ((e = s.apply(i, n)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                                t = e && ("object" == typeof e || "function" == typeof e) && e.then, b(t) ? a ? t.call(e, c(l, r, P, a), c(l, r, M, a)) : (l++, t.call(e, c(l, r, P, a), c(l, r, M, a), c(l, r, P, r.notifyWith))) : (s !== P && (i = void 0, n = [e]), (a || r.resolveWith)(i, n))
                                            }
                                        }
                                        var i = this,
                                            n = arguments,
                                            t = a ? e : function() {
                                                try {
                                                    e()
                                                } catch (e) {
                                                    C.Deferred.exceptionHook && C.Deferred.exceptionHook(e, t.stackTrace), l <= o + 1 && (s !== M && (i = void 0, n = [e]), r.rejectWith(i, n))
                                                }
                                            };
                                        o ? t() : (C.Deferred.getStackHook && (t.stackTrace = C.Deferred.getStackHook()), S.setTimeout(t))
                                    }
                                }
                                return C.Deferred(function(e) {
                                    r[0][3].add(c(0, e, b(n) ? n : P, e.notifyWith)), r[1][3].add(c(0, e, b(t) ? t : P)), r[2][3].add(c(0, e, b(i) ? i : M))
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? C.extend(e, s) : s
                            }
                        },
                        a = {};
                    return C.each(r, function(e, t) {
                        var i = t[2],
                            n = t[5];
                        s[t[1]] = i.add, n && i.add(function() {
                            o = n
                        }, r[3 - e][2].disable, r[3 - e][3].disable, r[0][2].lock, r[0][3].lock), i.add(t[3].fire), a[t[0]] = function() {
                            return a[t[0] + "With"](this === a ? void 0 : this, arguments), this
                        }, a[t[0] + "With"] = i.fireWith
                    }), s.promise(a), e && e.call(a, a), a
                },
                when: function(e) {
                    function t(t) {
                        return function(e) {
                            o[t] = this, r[t] = 1 < arguments.length ? a.call(arguments) : e, --i || s.resolveWith(o, r)
                        }
                    }
                    var i = arguments.length,
                        n = i,
                        o = Array(n),
                        r = a.call(arguments),
                        s = C.Deferred();
                    if (i <= 1 && (I(e, s.done(t(n)).resolve, s.reject, !i), "pending" === s.state() || b(r[n] && r[n].then))) return s.then();
                    for (; n--;) I(r[n], t(n), s.reject);
                    return s.promise()
                }
            });
            var z = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            C.Deferred.exceptionHook = function(e, t) {
                S.console && S.console.warn && e && z.test(e.name) && S.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
            }, C.readyException = function(e) {
                S.setTimeout(function() {
                    throw e
                })
            };
            var R = C.Deferred();

            function W() {
                T.removeEventListener("DOMContentLoaded", W), S.removeEventListener("load", W), C.ready()
            }
            C.fn.ready = function(e) {
                return R.then(e).catch(function(e) {
                    C.readyException(e)
                }), this
            }, C.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --C.readyWait : C.isReady) || (C.isReady = !0) !== e && 0 < --C.readyWait || R.resolveWith(T, [C])
                }
            }), C.ready.then = R.then, "complete" === T.readyState || "loading" !== T.readyState && !T.documentElement.doScroll ? S.setTimeout(C.ready) : (T.addEventListener("DOMContentLoaded", W), S.addEventListener("load", W));
            var B = function(e, t, i, n, o, r, s) {
                    var a = 0,
                        l = e.length,
                        c = null == i;
                    if ("object" === x(i))
                        for (a in o = !0, i) B(e, t, a, i[a], !0, r, s);
                    else if (void 0 !== n && (o = !0, b(n) || (s = !0), c && (t = s ? (t.call(e, n), null) : (c = t, function(e, t, i) {
                            return c.call(C(e), i)
                        })), t))
                        for (; a < l; a++) t(e[a], i, s ? n : n.call(e[a], a, t(e[a], i)));
                    return o ? e : c ? t.call(e) : l ? t(e[0], i) : r
                },
                F = /^-ms-/,
                _ = /-([a-z])/g;

            function U(e, t) {
                return t.toUpperCase()
            }

            function V(e) {
                return e.replace(F, "ms-").replace(_, U)
            }

            function X(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            }

            function Y() {
                this.expando = C.expando + Y.uid++
            }
            Y.uid = 1, Y.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, X(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t
                },
                set: function(e, t, i) {
                    var n, o = this.cache(e);
                    if ("string" == typeof t) o[V(t)] = i;
                    else
                        for (n in t) o[V(n)] = t[n];
                    return o
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
                },
                access: function(e, t, i) {
                    return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
                },
                remove: function(e, t) {
                    var i, n = e[this.expando];
                    if (void 0 !== n) {
                        if (void 0 !== t) {
                            i = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in n ? [t] : t.match(H) || []).length;
                            for (; i--;) delete n[t[i]]
                        }
                        void 0 !== t && !C.isEmptyObject(n) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !C.isEmptyObject(t)
                }
            };
            var G = new Y,
                Q = new Y,
                J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                K = /[A-Z]/g;

            function Z(e, t, i) {
                var n, o;
                if (void 0 === i && 1 === e.nodeType)
                    if (n = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(n))) {
                        try {
                            i = "true" === (o = i) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : J.test(o) ? JSON.parse(o) : o)
                        } catch (e) {}
                        Q.set(e, t, i)
                    } else i = void 0;
                return i
            }
            C.extend({
                hasData: function(e) {
                    return Q.hasData(e) || G.hasData(e)
                },
                data: function(e, t, i) {
                    return Q.access(e, t, i)
                },
                removeData: function(e, t) {
                    Q.remove(e, t)
                },
                _data: function(e, t, i) {
                    return G.access(e, t, i)
                },
                _removeData: function(e, t) {
                    G.remove(e, t)
                }
            }), C.fn.extend({
                data: function(i, e) {
                    var t, n, o, r = this[0],
                        s = r && r.attributes;
                    if (void 0 !== i) return "object" == typeof i ? this.each(function() {
                        Q.set(this, i)
                    }) : B(this, function(e) {
                        var t;
                        if (r && void 0 === e) return void 0 !== (t = Q.get(r, i)) ? t : void 0 !== (t = Z(r, i)) ? t : void 0;
                        this.each(function() {
                            Q.set(this, i, e)
                        })
                    }, null, e, 1 < arguments.length, null, !0);
                    if (this.length && (o = Q.get(r), 1 === r.nodeType && !G.get(r, "hasDataAttrs"))) {
                        for (t = s.length; t--;) s[t] && 0 === (n = s[t].name).indexOf("data-") && (n = V(n.slice(5)), Z(r, n, o[n]));
                        G.set(r, "hasDataAttrs", !0)
                    }
                    return o
                },
                removeData: function(e) {
                    return this.each(function() {
                        Q.remove(this, e)
                    })
                }
            }), C.extend({
                queue: function(e, t, i) {
                    var n;
                    if (e) return t = (t || "fx") + "queue", n = G.get(e, t), i && (!n || Array.isArray(i) ? n = G.access(e, t, C.makeArray(i)) : n.push(i)), n || []
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var i = C.queue(e, t),
                        n = i.length,
                        o = i.shift(),
                        r = C._queueHooks(e, t);
                    "inprogress" === o && (o = i.shift(), n--), o && ("fx" === t && i.unshift("inprogress"), delete r.stop, o.call(e, function() {
                        C.dequeue(e, t)
                    }, r)), !n && r && r.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var i = t + "queueHooks";
                    return G.get(e, i) || G.access(e, i, {
                        empty: C.Callbacks("once memory").add(function() {
                            G.remove(e, [t + "queue", i])
                        })
                    })
                }
            }), C.fn.extend({
                queue: function(t, i) {
                    var e = 2;
                    return "string" != typeof t && (i = t, t = "fx", e--), arguments.length < e ? C.queue(this[0], t) : void 0 === i ? this : this.each(function() {
                        var e = C.queue(this, t, i);
                        C._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        C.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    function i() {
                        --o || r.resolveWith(s, [s])
                    }
                    var n, o = 1,
                        r = C.Deferred(),
                        s = this,
                        a = this.length;
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = G.get(s[a], e + "queueHooks")) && n.empty && (o++, n.empty.add(i));
                    return i(), r.promise(t)
                }
            });
            var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
                ie = ["Top", "Right", "Bottom", "Left"],
                ne = T.documentElement,
                oe = function(e) {
                    return C.contains(e.ownerDocument, e)
                },
                re = {
                    composed: !0
                };
            ne.getRootNode && (oe = function(e) {
                return C.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument
            });

            function se(e, t, i, n) {
                var o, r, s = {};
                for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                for (r in o = i.apply(e, n || []), t) e.style[r] = s[r];
                return o
            }
            var ae = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === C.css(e, "display")
            };

            function le(e, t, i, n) {
                var o, r, s = 20,
                    a = n ? function() {
                        return n.cur()
                    } : function() {
                        return C.css(e, t, "")
                    },
                    l = a(),
                    c = i && i[3] || (C.cssNumber[t] ? "" : "px"),
                    u = e.nodeType && (C.cssNumber[t] || "px" !== c && +l) && te.exec(C.css(e, t));
                if (u && u[3] !== c) {
                    for (l /= 2, c = c || u[3], u = +l || 1; s--;) C.style(e, t, u + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), u /= r;
                    u *= 2, C.style(e, t, u + c), i = i || []
                }
                return i && (u = +u || +l || 0, o = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = u, n.end = o)), o
            }
            var ce = {};

            function ue(e, t) {
                for (var i, n, o, r, s, a, l, c = [], u = 0, d = e.length; u < d; u++)(n = e[u]).style && (i = n.style.display, t ? ("none" === i && (c[u] = G.get(n, "display") || null, c[u] || (n.style.display = "")), "" === n.style.display && ae(n) && (c[u] = (l = s = r = void 0, s = (o = n).ownerDocument, a = o.nodeName, (l = ce[a]) || (r = s.body.appendChild(s.createElement(a)), l = C.css(r, "display"), r.parentNode.removeChild(r), "none" === l && (l = "block"), ce[a] = l)))) : "none" !== i && (c[u] = "none", G.set(n, "display", i)));
                for (u = 0; u < d; u++) null != c[u] && (e[u].style.display = c[u]);
                return e
            }
            C.fn.extend({
                show: function() {
                    return ue(this, !0)
                },
                hide: function() {
                    return ue(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        ae(this) ? C(this).show() : C(this).hide()
                    })
                }
            });
            var de = /^(?:checkbox|radio)$/i,
                pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                fe = /^$|^module$|\/(?:java|ecma)script/i,
                he = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };

            function ge(e, t) {
                var i;
                return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? C.merge([e], i) : i
            }

            function ve(e, t) {
                for (var i = 0, n = e.length; i < n; i++) G.set(e[i], "globalEval", !t || G.get(t[i], "globalEval"))
            }
            he.optgroup = he.option, he.tbody = he.tfoot = he.colgroup = he.caption = he.thead, he.th = he.td;
            var ye, me, be = /<|&#?\w+;/;

            function we(e, t, i, n, o) {
                for (var r, s, a, l, c, u, d = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
                    if ((r = e[f]) || 0 === r)
                        if ("object" === x(r)) C.merge(p, r.nodeType ? [r] : r);
                        else if (be.test(r)) {
                    for (s = s || d.appendChild(t.createElement("div")), a = (pe.exec(r) || ["", ""])[1].toLowerCase(), l = he[a] || he._default, s.innerHTML = l[1] + C.htmlPrefilter(r) + l[2], u = l[0]; u--;) s = s.lastChild;
                    C.merge(p, s.childNodes), (s = d.firstChild).textContent = ""
                } else p.push(t.createTextNode(r));
                for (d.textContent = "", f = 0; r = p[f++];)
                    if (n && -1 < C.inArray(r, n)) o && o.push(r);
                    else if (c = oe(r), s = ge(d.appendChild(r), "script"), c && ve(s), i)
                    for (u = 0; r = s[u++];) fe.test(r.type || "") && i.push(r);
                return d
            }
            ye = T.createDocumentFragment().appendChild(T.createElement("div")), (me = T.createElement("input")).setAttribute("type", "radio"), me.setAttribute("checked", "checked"), me.setAttribute("name", "t"), ye.appendChild(me), m.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked, ye.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue;
            var xe = /^key/,
                ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                Se = /^([^.]*)(?:\.(.+)|)/;

            function Te() {
                return !0
            }

            function Ce() {
                return !1
            }

            function $e(e, t) {
                return e === function() {
                    try {
                        return T.activeElement
                    } catch (e) {}
                }() == ("focus" === t)
            }

            function Ae(e, t, i, n, o, r) {
                var s, a;
                if ("object" == typeof t) {
                    for (a in "string" != typeof i && (n = n || i, i = void 0), t) Ae(e, a, i, n, t[a], r);
                    return e
                }
                if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = Ce;
                else if (!o) return e;
                return 1 === r && (s = o, (o = function(e) {
                    return C().off(e), s.apply(this, arguments)
                }).guid = s.guid || (s.guid = C.guid++)), e.each(function() {
                    C.event.add(this, t, o, n, i)
                })
            }

            function Ee(e, o, r) {
                r ? (G.set(e, o, !1), C.event.add(e, o, {
                    namespace: !1,
                    handler: function(e) {
                        var t, i, n = G.get(this, o);
                        if (1 & e.isTrigger && this[o]) {
                            if (n.length)(C.event.special[o] || {}).delegateType && e.stopPropagation();
                            else if (n = a.call(arguments), G.set(this, o, n), t = r(this, o), this[o](), n !== (i = G.get(this, o)) || t ? G.set(this, o, !1) : i = {}, n !== i) return e.stopImmediatePropagation(), e.preventDefault(), i.value
                        } else n.length && (G.set(this, o, {
                            value: C.event.trigger(C.extend(n[0], C.Event.prototype), n.slice(1), this)
                        }), e.stopImmediatePropagation())
                    }
                })) : void 0 === G.get(e, o) && C.event.add(e, o, Te)
            }
            C.event = {
                global: {},
                add: function(t, e, i, n, o) {
                    var r, s, a, l, c, u, d, p, f, h, g, v = G.get(t);
                    if (v)
                        for (i.handler && (i = (r = i).handler, o = r.selector), o && C.find.matchesSelector(ne, o), i.guid || (i.guid = C.guid++), (l = v.events) || (l = v.events = {}), (s = v.handle) || (s = v.handle = function(e) {
                                return void 0 !== C && C.event.triggered !== e.type ? C.event.dispatch.apply(t, arguments) : void 0
                            }), c = (e = (e || "").match(H) || [""]).length; c--;) f = g = (a = Se.exec(e[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (d = C.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, d = C.event.special[f] || {}, u = C.extend({
                            type: f,
                            origType: g,
                            data: n,
                            handler: i,
                            guid: i.guid,
                            selector: o,
                            needsContext: o && C.expr.match.needsContext.test(o),
                            namespace: h.join(".")
                        }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, n, h, s) || t.addEventListener && t.addEventListener(f, s)), d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), C.event.global[f] = !0)
                },
                remove: function(e, t, i, n, o) {
                    var r, s, a, l, c, u, d, p, f, h, g, v = G.hasData(e) && G.get(e);
                    if (v && (l = v.events)) {
                        for (c = (t = (t || "").match(H) || [""]).length; c--;)
                            if (f = g = (a = Se.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                                for (d = C.event.special[f] || {}, p = l[f = (n ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) u = p[r], !o && g !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (p.splice(r, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                                s && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, v.handle) || C.removeEvent(e, f, v.handle), delete l[f])
                            } else
                                for (f in l) C.event.remove(e, f + t[c], i, n, !0);
                        C.isEmptyObject(l) && G.remove(e, "handle events")
                    }
                },
                dispatch: function(e) {
                    var t, i, n, o, r, s, a = C.event.fix(e),
                        l = new Array(arguments.length),
                        c = (G.get(this, "events") || {})[a.type] || [],
                        u = C.event.special[a.type] || {};
                    for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                    if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                        for (s = C.event.handlers.call(this, a, c), t = 0;
                            (o = s[t++]) && !a.isPropagationStopped();)
                            for (a.currentTarget = o.elem, i = 0;
                                (r = o.handlers[i++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !1 !== r.namespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (n = ((C.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, a), a.result
                    }
                },
                handlers: function(e, t) {
                    var i, n, o, r, s, a = [],
                        l = t.delegateCount,
                        c = e.target;
                    if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                        for (; c !== this; c = c.parentNode || this)
                            if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                                for (r = [], s = {}, i = 0; i < l; i++) void 0 === s[o = (n = t[i]).selector + " "] && (s[o] = n.needsContext ? -1 < C(o, this).index(c) : C.find(o, this, null, [c]).length), s[o] && r.push(n);
                                r.length && a.push({
                                    elem: c,
                                    handlers: r
                                })
                            }
                    return c = this, l < t.length && a.push({
                        elem: c,
                        handlers: t.slice(l)
                    }), a
                },
                addProp: function(t, e) {
                    Object.defineProperty(C.Event.prototype, t, {
                        enumerable: !0,
                        configurable: !0,
                        get: b(e) ? function() {
                            if (this.originalEvent) return e(this.originalEvent)
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[t]
                        },
                        set: function(e) {
                            Object.defineProperty(this, t, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: e
                            })
                        }
                    })
                },
                fix: function(e) {
                    return e[C.expando] ? e : new C.Event(e)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(e) {
                            var t = this || e;
                            return de.test(t.type) && t.click && A(t, "input") && Ee(t, "click", Te), !1
                        },
                        trigger: function(e) {
                            var t = this || e;
                            return de.test(t.type) && t.click && A(t, "input") && Ee(t, "click"), !0
                        },
                        _default: function(e) {
                            var t = e.target;
                            return de.test(t.type) && t.click && A(t, "input") && G.get(t, "click") || A(t, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            }, C.removeEvent = function(e, t, i) {
                e.removeEventListener && e.removeEventListener(t, i)
            }, C.Event = function(e, t) {
                if (!(this instanceof C.Event)) return new C.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Te : Ce, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && C.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[C.expando] = !0
            }, C.Event.prototype = {
                constructor: C.Event,
                isDefaultPrevented: Ce,
                isPropagationStopped: Ce,
                isImmediatePropagationStopped: Ce,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = Te, e && !this.isSimulated && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = Te, e && !this.isSimulated && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = Te, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, C.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function(e) {
                    var t = e.button;
                    return null == e.which && xe.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ke.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
                }
            }, C.event.addProp), C.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                C.event.special[e] = {
                    setup: function() {
                        return Ee(this, e, $e), !1
                    },
                    trigger: function() {
                        return Ee(this, e), !0
                    },
                    delegateType: t
                }
            }), C.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, o) {
                C.event.special[e] = {
                    delegateType: o,
                    bindType: o,
                    handle: function(e) {
                        var t, i = e.relatedTarget,
                            n = e.handleObj;
                        return i && (i === this || C.contains(this, i)) || (e.type = n.origType, t = n.handler.apply(this, arguments), e.type = o), t
                    }
                }
            }), C.fn.extend({
                on: function(e, t, i, n) {
                    return Ae(this, e, t, i, n)
                },
                one: function(e, t, i, n) {
                    return Ae(this, e, t, i, n, 1)
                },
                off: function(e, t, i) {
                    var n, o;
                    if (e && e.preventDefault && e.handleObj) return n = e.handleObj, C(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                    if ("object" != typeof e) return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = Ce), this.each(function() {
                        C.event.remove(this, e, i, t)
                    });
                    for (o in e) this.off(o, t, e[o]);
                    return this
                }
            });
            var Le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                qe = /<script|<style|<link/i,
                je = /checked\s*(?:[^=]|=\s*.checked.)/i,
                De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

            function Ne(e, t) {
                return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && C(e).children("tbody")[0] || e
            }

            function Oe(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function He(e) {
                return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
            }

            function Pe(e, t) {
                var i, n, o, r, s, a, l, c;
                if (1 === t.nodeType) {
                    if (G.hasData(e) && (r = G.access(e), s = G.set(t, r), c = r.events))
                        for (o in delete s.handle, s.events = {}, c)
                            for (i = 0, n = c[o].length; i < n; i++) C.event.add(t, o, c[o][i]);
                    Q.hasData(e) && (a = Q.access(e), l = C.extend({}, a), Q.set(t, l))
                }
            }

            function Me(i, n, o, r) {
                n = v.apply([], n);
                var e, t, s, a, l, c, u = 0,
                    d = i.length,
                    p = d - 1,
                    f = n[0],
                    h = b(f);
                if (h || 1 < d && "string" == typeof f && !m.checkClone && je.test(f)) return i.each(function(e) {
                    var t = i.eq(e);
                    h && (n[0] = f.call(this, e, t.html())), Me(t, n, o, r)
                });
                if (d && (t = (e = we(n, i[0].ownerDocument, !1, i, r)).firstChild, 1 === e.childNodes.length && (e = t), t || r)) {
                    for (a = (s = C.map(ge(e, "script"), Oe)).length; u < d; u++) l = e, u !== p && (l = C.clone(l, !0, !0), a && C.merge(s, ge(l, "script"))), o.call(i[u], l, u);
                    if (a)
                        for (c = s[s.length - 1].ownerDocument, C.map(s, He), u = 0; u < a; u++) l = s[u], fe.test(l.type || "") && !G.access(l, "globalEval") && C.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? C._evalUrl && !l.noModule && C._evalUrl(l.src, {
                            nonce: l.nonce || l.getAttribute("nonce")
                        }) : w(l.textContent.replace(De, ""), l, c))
                }
                return i
            }

            function Ie(e, t, i) {
                for (var n, o = t ? C.filter(t, e) : e, r = 0; null != (n = o[r]); r++) i || 1 !== n.nodeType || C.cleanData(ge(n)), n.parentNode && (i && oe(n) && ve(ge(n, "script")), n.parentNode.removeChild(n));
                return e
            }
            C.extend({
                htmlPrefilter: function(e) {
                    return e.replace(Le, "<$1></$2>")
                },
                clone: function(e, t, i) {
                    var n, o, r, s, a, l, c, u = e.cloneNode(!0),
                        d = oe(e);
                    if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || C.isXMLDoc(e)))
                        for (s = ge(u), n = 0, o = (r = ge(e)).length; n < o; n++) a = r[n], l = s[n], "input" === (c = l.nodeName.toLowerCase()) && de.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
                    if (t)
                        if (i)
                            for (r = r || ge(e), s = s || ge(u), n = 0, o = r.length; n < o; n++) Pe(r[n], s[n]);
                        else Pe(e, u);
                    return 0 < (s = ge(u, "script")).length && ve(s, !d && ge(e, "script")), u
                },
                cleanData: function(e) {
                    for (var t, i, n, o = C.event.special, r = 0; void 0 !== (i = e[r]); r++)
                        if (X(i)) {
                            if (t = i[G.expando]) {
                                if (t.events)
                                    for (n in t.events) o[n] ? C.event.remove(i, n) : C.removeEvent(i, n, t.handle);
                                i[G.expando] = void 0
                            }
                            i[Q.expando] && (i[Q.expando] = void 0)
                        }
                }
            }), C.fn.extend({
                detach: function(e) {
                    return Ie(this, e, !0)
                },
                remove: function(e) {
                    return Ie(this, e)
                },
                text: function(e) {
                    return B(this, function(e) {
                        return void 0 === e ? C.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return Me(this, arguments, function(e) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ne(this, e).appendChild(e)
                    })
                },
                prepend: function() {
                    return Me(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = Ne(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return Me(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return Me(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (C.cleanData(ge(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map(function() {
                        return C.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return B(this, function(e) {
                        var t = this[0] || {},
                            i = 0,
                            n = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !qe.test(e) && !he[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = C.htmlPrefilter(e);
                            try {
                                for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (C.cleanData(ge(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (e) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var i = [];
                    return Me(this, arguments, function(e) {
                        var t = this.parentNode;
                        C.inArray(this, i) < 0 && (C.cleanData(ge(this)), t && t.replaceChild(e, this))
                    }, i)
                }
            }), C.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, s) {
                C.fn[e] = function(e) {
                    for (var t, i = [], n = C(e), o = n.length - 1, r = 0; r <= o; r++) t = r === o ? this : this.clone(!0), C(n[r])[s](t), l.apply(i, t.get());
                    return this.pushStack(i)
                }
            });
            var ze, Re, We, Be, Fe, _e, Ue, Ve = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
                Xe = function(e) {
                    var t = e.ownerDocument.defaultView;
                    return t && t.opener || (t = S), t.getComputedStyle(e)
                },
                Ye = new RegExp(ie.join("|"), "i");

            function Ge() {
                if (Ue) {
                    _e.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", Ue.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ne.appendChild(_e).appendChild(Ue);
                    var e = S.getComputedStyle(Ue);
                    ze = "1%" !== e.top, Fe = 12 === Qe(e.marginLeft), Ue.style.right = "60%", Be = 36 === Qe(e.right), Re = 36 === Qe(e.width), Ue.style.position = "absolute", We = 12 === Qe(Ue.offsetWidth / 3), ne.removeChild(_e), Ue = null
                }
            }

            function Qe(e) {
                return Math.round(parseFloat(e))
            }

            function Je(e, t, i) {
                var n, o, r, s, a = e.style;
                return (i = i || Xe(e)) && ("" !== (s = i.getPropertyValue(t) || i[t]) || oe(e) || (s = C.style(e, t)), !m.pixelBoxStyles() && Ve.test(s) && Ye.test(t) && (n = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = i.width, a.width = n, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
            }

            function Ke(e, t) {
                return {
                    get: function() {
                        if (!e()) return (this.get = t).apply(this, arguments);
                        delete this.get
                    }
                }
            }
            _e = T.createElement("div"), (Ue = T.createElement("div")).style && (Ue.style.backgroundClip = "content-box", Ue.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === Ue.style.backgroundClip, C.extend(m, {
                boxSizingReliable: function() {
                    return Ge(), Re
                },
                pixelBoxStyles: function() {
                    return Ge(), Be
                },
                pixelPosition: function() {
                    return Ge(), ze
                },
                reliableMarginLeft: function() {
                    return Ge(), Fe
                },
                scrollboxSize: function() {
                    return Ge(), We
                }
            }));
            var Ze = ["Webkit", "Moz", "ms"],
                et = T.createElement("div").style,
                tt = {};

            function it(e) {
                var t = C.cssProps[e] || tt[e];
                return t || (e in et ? e : tt[e] = function(e) {
                    for (var t = e[0].toUpperCase() + e.slice(1), i = Ze.length; i--;)
                        if ((e = Ze[i] + t) in et) return e
                }(e) || e)
            }
            var nt = /^(none|table(?!-c[ea]).+)/,
                ot = /^--/,
                rt = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                st = {
                    letterSpacing: "0",
                    fontWeight: "400"
                };

            function at(e, t, i) {
                var n = te.exec(t);
                return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
            }

            function lt(e, t, i, n, o, r) {
                var s = "width" === t ? 1 : 0,
                    a = 0,
                    l = 0;
                if (i === (n ? "border" : "content")) return 0;
                for (; s < 4; s += 2) "margin" === i && (l += C.css(e, i + ie[s], !0, o)), n ? ("content" === i && (l -= C.css(e, "padding" + ie[s], !0, o)), "margin" !== i && (l -= C.css(e, "border" + ie[s] + "Width", !0, o))) : (l += C.css(e, "padding" + ie[s], !0, o), "padding" !== i ? l += C.css(e, "border" + ie[s] + "Width", !0, o) : a += C.css(e, "border" + ie[s] + "Width", !0, o));
                return !n && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5)) || 0), l
            }

            function ct(e, t, i) {
                var n = Xe(e),
                    o = (!m.boxSizingReliable() || i) && "border-box" === C.css(e, "boxSizing", !1, n),
                    r = o,
                    s = Je(e, t, n),
                    a = "offset" + t[0].toUpperCase() + t.slice(1);
                if (Ve.test(s)) {
                    if (!i) return s;
                    s = "auto"
                }
                return (!m.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === C.css(e, "display", !1, n)) && e.getClientRects().length && (o = "border-box" === C.css(e, "boxSizing", !1, n), (r = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + lt(e, t, i || (o ? "border" : "content"), r, n, s) + "px"
            }

            function ut(e, t, i, n, o) {
                return new ut.prototype.init(e, t, i, n, o)
            }
            C.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var i = Je(e, "opacity");
                                return "" === i ? "1" : i
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {},
                style: function(e, t, i, n) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var o, r, s, a = V(t),
                            l = ot.test(t),
                            c = e.style;
                        if (l || (t = it(a)), s = C.cssHooks[t] || C.cssHooks[a], void 0 === i) return s && "get" in s && void 0 !== (o = s.get(e, !1, n)) ? o : c[t];
                        "string" === (r = typeof i) && (o = te.exec(i)) && o[1] && (i = le(e, t, o), r = "number"), null != i && i == i && ("number" !== r || l || (i += o && o[3] || (C.cssNumber[a] ? "" : "px")), m.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (i = s.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i))
                    }
                },
                css: function(e, t, i, n) {
                    var o, r, s, a = V(t);
                    return ot.test(t) || (t = it(a)), (s = C.cssHooks[t] || C.cssHooks[a]) && "get" in s && (o = s.get(e, !0, i)), void 0 === o && (o = Je(e, t, n)), "normal" === o && t in st && (o = st[t]), "" === i || i ? (r = parseFloat(o), !0 === i || isFinite(r) ? r || 0 : o) : o
                }
            }), C.each(["height", "width"], function(e, l) {
                C.cssHooks[l] = {
                    get: function(e, t, i) {
                        if (t) return !nt.test(C.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ct(e, l, i) : se(e, rt, function() {
                            return ct(e, l, i)
                        })
                    },
                    set: function(e, t, i) {
                        var n, o = Xe(e),
                            r = !m.scrollboxSize() && "absolute" === o.position,
                            s = (r || i) && "border-box" === C.css(e, "boxSizing", !1, o),
                            a = i ? lt(e, l, i, s, o) : 0;
                        return s && r && (a -= Math.ceil(e["offset" + l[0].toUpperCase() + l.slice(1)] - parseFloat(o[l]) - lt(e, l, "border", !1, o) - .5)), a && (n = te.exec(t)) && "px" !== (n[3] || "px") && (e.style[l] = t, t = C.css(e, l)), at(0, t, a)
                    }
                }
            }), C.cssHooks.marginLeft = Ke(m.reliableMarginLeft, function(e, t) {
                if (t) return (parseFloat(Je(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
            }), C.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(o, r) {
                C.cssHooks[o + r] = {
                    expand: function(e) {
                        for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) i[o + ie[t] + r] = n[t] || n[t - 2] || n[0];
                        return i
                    }
                }, "margin" !== o && (C.cssHooks[o + r].set = at)
            }), C.fn.extend({
                css: function(e, t) {
                    return B(this, function(e, t, i) {
                        var n, o, r = {},
                            s = 0;
                        if (Array.isArray(t)) {
                            for (n = Xe(e), o = t.length; s < o; s++) r[t[s]] = C.css(e, t[s], !1, n);
                            return r
                        }
                        return void 0 !== i ? C.style(e, t, i) : C.css(e, t)
                    }, e, t, 1 < arguments.length)
                }
            }), ((C.Tween = ut).prototype = {
                constructor: ut,
                init: function(e, t, i, n, o, r) {
                    this.elem = e, this.prop = i, this.easing = o || C.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = r || (C.cssNumber[i] ? "" : "px")
                },
                cur: function() {
                    var e = ut.propHooks[this.prop];
                    return e && e.get ? e.get(this) : ut.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, i = ut.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : ut.propHooks._default.set(this), this
                }
            }).init.prototype = ut.prototype, (ut.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = C.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                    },
                    set: function(e) {
                        C.fx.step[e.prop] ? C.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !C.cssHooks[e.prop] && null == e.elem.style[it(e.prop)] ? e.elem[e.prop] = e.now : C.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }).scrollTop = ut.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, C.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, C.fx = ut.prototype.init, C.fx.step = {};
            var dt, pt, ft, ht, gt = /^(?:toggle|show|hide)$/,
                vt = /queueHooks$/;

            function yt() {
                pt && (!1 === T.hidden && S.requestAnimationFrame ? S.requestAnimationFrame(yt) : S.setTimeout(yt, C.fx.interval), C.fx.tick())
            }

            function mt() {
                return S.setTimeout(function() {
                    dt = void 0
                }), dt = Date.now()
            }

            function bt(e, t) {
                var i, n = 0,
                    o = {
                        height: e
                    };
                for (t = t ? 1 : 0; n < 4; n += 2 - t) o["margin" + (i = ie[n])] = o["padding" + i] = e;
                return t && (o.opacity = o.width = e), o
            }

            function wt(e, t, i) {
                for (var n, o = (xt.tweeners[t] || []).concat(xt.tweeners["*"]), r = 0, s = o.length; r < s; r++)
                    if (n = o[r].call(i, t, e)) return n
            }

            function xt(r, e, t) {
                var i, s, n = 0,
                    o = xt.prefilters.length,
                    a = C.Deferred().always(function() {
                        delete l.elem
                    }),
                    l = function() {
                        if (s) return !1;
                        for (var e = dt || mt(), t = Math.max(0, c.startTime + c.duration - e), i = 1 - (t / c.duration || 0), n = 0, o = c.tweens.length; n < o; n++) c.tweens[n].run(i);
                        return a.notifyWith(r, [c, i, t]), i < 1 && o ? t : (o || a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c]), !1)
                    },
                    c = a.promise({
                        elem: r,
                        props: C.extend({}, e),
                        opts: C.extend(!0, {
                            specialEasing: {},
                            easing: C.easing._default
                        }, t),
                        originalProperties: e,
                        originalOptions: t,
                        startTime: dt || mt(),
                        duration: t.duration,
                        tweens: [],
                        createTween: function(e, t) {
                            var i = C.Tween(r, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                            return c.tweens.push(i), i
                        },
                        stop: function(e) {
                            var t = 0,
                                i = e ? c.tweens.length : 0;
                            if (s) return this;
                            for (s = !0; t < i; t++) c.tweens[t].run(1);
                            return e ? (a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c, e])) : a.rejectWith(r, [c, e]), this
                        }
                    }),
                    u = c.props;
                for (! function(e, t) {
                        var i, n, o, r, s;
                        for (i in e)
                            if (o = t[n = V(i)], r = e[i], Array.isArray(r) && (o = r[1], r = e[i] = r[0]), i !== n && (e[n] = r, delete e[i]), (s = C.cssHooks[n]) && "expand" in s)
                                for (i in r = s.expand(r), delete e[n], r) i in e || (e[i] = r[i], t[i] = o);
                            else t[n] = o
                    }(u, c.opts.specialEasing); n < o; n++)
                    if (i = xt.prefilters[n].call(c, r, u, c.opts)) return b(i.stop) && (C._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
                return C.map(u, wt, c), b(c.opts.start) && c.opts.start.call(r, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), C.fx.timer(C.extend(l, {
                    elem: r,
                    anim: c,
                    queue: c.opts.queue
                })), c
            }
            C.Animation = C.extend(xt, {
                tweeners: {
                    "*": [function(e, t) {
                        var i = this.createTween(e, t);
                        return le(i.elem, e, te.exec(t), i), i
                    }]
                },
                tweener: function(e, t) {
                    for (var i, n = 0, o = (e = b(e) ? (t = e, ["*"]) : e.match(H)).length; n < o; n++) i = e[n], xt.tweeners[i] = xt.tweeners[i] || [], xt.tweeners[i].unshift(t)
                },
                prefilters: [function(e, t, i) {
                    var n, o, r, s, a, l, c, u, d = "width" in t || "height" in t,
                        p = this,
                        f = {},
                        h = e.style,
                        g = e.nodeType && ae(e),
                        v = G.get(e, "fxshow");
                    for (n in i.queue || (null == (s = C._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                            s.unqueued || a()
                        }), s.unqueued++, p.always(function() {
                            p.always(function() {
                                s.unqueued--, C.queue(e, "fx").length || s.empty.fire()
                            })
                        })), t)
                        if (o = t[n], gt.test(o)) {
                            if (delete t[n], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
                                if ("show" !== o || !v || void 0 === v[n]) continue;
                                g = !0
                            }
                            f[n] = v && v[n] || C.style(e, n)
                        }
                    if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(f))
                        for (n in d && 1 === e.nodeType && (i.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = v && v.display) && (c = G.get(e, "display")), "none" === (u = C.css(e, "display")) && (c ? u = c : (ue([e], !0), c = e.style.display || c, u = C.css(e, "display"), ue([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === C.css(e, "float") && (l || (p.done(function() {
                                h.display = c
                            }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), i.overflow && (h.overflow = "hidden", p.always(function() {
                                h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2]
                            })), l = !1, f) l || (v ? "hidden" in v && (g = v.hidden) : v = G.access(e, "fxshow", {
                            display: c
                        }), r && (v.hidden = !g), g && ue([e], !0), p.done(function() {
                            for (n in g || ue([e]), G.remove(e, "fxshow"), f) C.style(e, n, f[n])
                        })), l = wt(g ? v[n] : 0, n, p), n in v || (v[n] = l.start, g && (l.end = l.start, l.start = 0))
                }],
                prefilter: function(e, t) {
                    t ? xt.prefilters.unshift(e) : xt.prefilters.push(e)
                }
            }), C.speed = function(e, t, i) {
                var n = e && "object" == typeof e ? C.extend({}, e) : {
                    complete: i || !i && t || b(e) && e,
                    duration: e,
                    easing: i && t || t && !b(t) && t
                };
                return C.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in C.fx.speeds ? n.duration = C.fx.speeds[n.duration] : n.duration = C.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    b(n.old) && n.old.call(this), n.queue && C.dequeue(this, n.queue)
                }, n
            }, C.fn.extend({
                fadeTo: function(e, t, i, n) {
                    return this.filter(ae).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, i, n)
                },
                animate: function(t, e, i, n) {
                    function o() {
                        var e = xt(this, C.extend({}, t), s);
                        (r || G.get(this, "finish")) && e.stop(!0)
                    }
                    var r = C.isEmptyObject(t),
                        s = C.speed(e, i, n);
                    return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
                },
                stop: function(o, e, r) {
                    function s(e) {
                        var t = e.stop;
                        delete e.stop, t(r)
                    }
                    return "string" != typeof o && (r = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), this.each(function() {
                        var e = !0,
                            t = null != o && o + "queueHooks",
                            i = C.timers,
                            n = G.get(this);
                        if (t) n[t] && n[t].stop && s(n[t]);
                        else
                            for (t in n) n[t] && n[t].stop && vt.test(t) && s(n[t]);
                        for (t = i.length; t--;) i[t].elem !== this || null != o && i[t].queue !== o || (i[t].anim.stop(r), e = !1, i.splice(t, 1));
                        !e && r || C.dequeue(this, o)
                    })
                },
                finish: function(s) {
                    return !1 !== s && (s = s || "fx"), this.each(function() {
                        var e, t = G.get(this),
                            i = t[s + "queue"],
                            n = t[s + "queueHooks"],
                            o = C.timers,
                            r = i ? i.length : 0;
                        for (t.finish = !0, C.queue(this, s, []), n && n.stop && n.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; e < r; e++) i[e] && i[e].finish && i[e].finish.call(this);
                        delete t.finish
                    })
                }
            }), C.each(["toggle", "show", "hide"], function(e, n) {
                var o = C.fn[n];
                C.fn[n] = function(e, t, i) {
                    return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(bt(n, !0), e, t, i)
                }
            }), C.each({
                slideDown: bt("show"),
                slideUp: bt("hide"),
                slideToggle: bt("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, n) {
                C.fn[e] = function(e, t, i) {
                    return this.animate(n, e, t, i)
                }
            }), C.timers = [], C.fx.tick = function() {
                var e, t = 0,
                    i = C.timers;
                for (dt = Date.now(); t < i.length; t++)(e = i[t])() || i[t] !== e || i.splice(t--, 1);
                i.length || C.fx.stop(), dt = void 0
            }, C.fx.timer = function(e) {
                C.timers.push(e), C.fx.start()
            }, C.fx.interval = 13, C.fx.start = function() {
                pt || (pt = !0, yt())
            }, C.fx.stop = function() {
                pt = null
            }, C.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, C.fn.delay = function(n, e) {
                return n = C.fx && C.fx.speeds[n] || n, e = e || "fx", this.queue(e, function(e, t) {
                    var i = S.setTimeout(e, n);
                    t.stop = function() {
                        S.clearTimeout(i)
                    }
                })
            }, ft = T.createElement("input"), ht = T.createElement("select").appendChild(T.createElement("option")), ft.type = "checkbox", m.checkOn = "" !== ft.value, m.optSelected = ht.selected, (ft = T.createElement("input")).value = "t", ft.type = "radio", m.radioValue = "t" === ft.value;
            var kt, St = C.expr.attrHandle;
            C.fn.extend({
                attr: function(e, t) {
                    return B(this, C.attr, e, t, 1 < arguments.length)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        C.removeAttr(this, e)
                    })
                }
            }), C.extend({
                attr: function(e, t, i) {
                    var n, o, r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? C.prop(e, t, i) : (1 === r && C.isXMLDoc(e) || (o = C.attrHooks[t.toLowerCase()] || (C.expr.match.bool.test(t) ? kt : void 0)), void 0 !== i ? null === i ? void C.removeAttr(e, t) : o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : o && "get" in o && null !== (n = o.get(e, t)) ? n : null == (n = C.find.attr(e, t)) ? void 0 : n)
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!m.radioValue && "radio" === t && A(e, "input")) {
                                var i = e.value;
                                return e.setAttribute("type", t), i && (e.value = i), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var i, n = 0,
                        o = t && t.match(H);
                    if (o && 1 === e.nodeType)
                        for (; i = o[n++];) e.removeAttribute(i)
                }
            }), kt = {
                set: function(e, t, i) {
                    return !1 === t ? C.removeAttr(e, i) : e.setAttribute(i, i), i
                }
            }, C.each(C.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var s = St[t] || C.find.attr;
                St[t] = function(e, t, i) {
                    var n, o, r = t.toLowerCase();
                    return i || (o = St[r], St[r] = n, n = null != s(e, t, i) ? r : null, St[r] = o), n
                }
            });
            var Tt = /^(?:input|select|textarea|button)$/i,
                Ct = /^(?:a|area)$/i;

            function $t(e) {
                return (e.match(H) || []).join(" ")
            }

            function At(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }

            function Et(e) {
                return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || []
            }
            C.fn.extend({
                prop: function(e, t) {
                    return B(this, C.prop, e, t, 1 < arguments.length)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[C.propFix[e] || e]
                    })
                }
            }), C.extend({
                prop: function(e, t, i) {
                    var n, o, r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r) return 1 === r && C.isXMLDoc(e) || (t = C.propFix[t] || t, o = C.propHooks[t]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : e[t] = i : o && "get" in o && null !== (n = o.get(e, t)) ? n : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = C.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : Tt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), m.optSelected || (C.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                }
            }), C.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                C.propFix[this.toLowerCase()] = this
            }), C.fn.extend({
                addClass: function(t) {
                    var e, i, n, o, r, s, a, l = 0;
                    if (b(t)) return this.each(function(e) {
                        C(this).addClass(t.call(this, e, At(this)))
                    });
                    if ((e = Et(t)).length)
                        for (; i = this[l++];)
                            if (o = At(i), n = 1 === i.nodeType && " " + $t(o) + " ") {
                                for (s = 0; r = e[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                                o !== (a = $t(n)) && i.setAttribute("class", a)
                            }
                    return this
                },
                removeClass: function(t) {
                    var e, i, n, o, r, s, a, l = 0;
                    if (b(t)) return this.each(function(e) {
                        C(this).removeClass(t.call(this, e, At(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ((e = Et(t)).length)
                        for (; i = this[l++];)
                            if (o = At(i), n = 1 === i.nodeType && " " + $t(o) + " ") {
                                for (s = 0; r = e[s++];)
                                    for (; - 1 < n.indexOf(" " + r + " ");) n = n.replace(" " + r + " ", " ");
                                o !== (a = $t(n)) && i.setAttribute("class", a)
                            }
                    return this
                },
                toggleClass: function(o, t) {
                    var r = typeof o,
                        s = "string" == r || Array.isArray(o);
                    return "boolean" == typeof t && s ? t ? this.addClass(o) : this.removeClass(o) : b(o) ? this.each(function(e) {
                        C(this).toggleClass(o.call(this, e, At(this), t), t)
                    }) : this.each(function() {
                        var e, t, i, n;
                        if (s)
                            for (t = 0, i = C(this), n = Et(o); e = n[t++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                        else void 0 !== o && "boolean" != r || ((e = At(this)) && G.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === o ? "" : G.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, i, n = 0;
                    for (t = " " + e + " "; i = this[n++];)
                        if (1 === i.nodeType && -1 < (" " + $t(At(i)) + " ").indexOf(t)) return !0;
                    return !1
                }
            });
            var Lt = /\r/g;
            C.fn.extend({
                val: function(i) {
                    var n, e, o, t = this[0];
                    return arguments.length ? (o = b(i), this.each(function(e) {
                        var t;
                        1 === this.nodeType && (null == (t = o ? i.call(this, e, C(this).val()) : i) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = C.map(t, function(e) {
                            return null == e ? "" : e + ""
                        })), (n = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, t, "value") || (this.value = t))
                    })) : t ? (n = C.valHooks[t.type] || C.valHooks[t.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(t, "value")) ? e : "string" == typeof(e = t.value) ? e.replace(Lt, "") : null == e ? "" : e : void 0
                }
            }), C.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = C.find.attr(e, "value");
                            return null != t ? t : $t(C.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            var t, i, n, o = e.options,
                                r = e.selectedIndex,
                                s = "select-one" === e.type,
                                a = s ? null : [],
                                l = s ? r + 1 : o.length;
                            for (n = r < 0 ? l : s ? r : 0; n < l; n++)
                                if (((i = o[n]).selected || n === r) && !i.disabled && (!i.parentNode.disabled || !A(i.parentNode, "optgroup"))) {
                                    if (t = C(i).val(), s) return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            for (var i, n, o = e.options, r = C.makeArray(t), s = o.length; s--;)((n = o[s]).selected = -1 < C.inArray(C.valHooks.option.get(n), r)) && (i = !0);
                            return i || (e.selectedIndex = -1), r
                        }
                    }
                }
            }), C.each(["radio", "checkbox"], function() {
                C.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t)) return e.checked = -1 < C.inArray(C(e).val(), t)
                    }
                }, m.checkOn || (C.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            }), m.focusin = "onfocusin" in S;

            function qt(e) {
                e.stopPropagation()
            }
            var jt = /^(?:focusinfocus|focusoutblur)$/;
            C.extend(C.event, {
                trigger: function(e, t, i, n) {
                    var o, r, s, a, l, c, u, d, p = [i || T],
                        f = y.call(e, "type") ? e.type : e,
                        h = y.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (r = d = s = i = i || T, 3 !== i.nodeType && 8 !== i.nodeType && !jt.test(f + C.event.triggered) && (-1 < f.indexOf(".") && (f = (h = f.split(".")).shift(), h.sort()), l = f.indexOf(":") < 0 && "on" + f, (e = e[C.expando] ? e : new C.Event(f, "object" == typeof e && e)).isTrigger = n ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : C.makeArray(t, [e]), u = C.event.special[f] || {}, n || !u.trigger || !1 !== u.trigger.apply(i, t))) {
                        if (!n && !u.noBubble && !g(i)) {
                            for (a = u.delegateType || f, jt.test(a + f) || (r = r.parentNode); r; r = r.parentNode) p.push(r), s = r;
                            s === (i.ownerDocument || T) && p.push(s.defaultView || s.parentWindow || S)
                        }
                        for (o = 0;
                            (r = p[o++]) && !e.isPropagationStopped();) d = r, e.type = 1 < o ? a : u.bindType || f, (c = (G.get(r, "events") || {})[e.type] && G.get(r, "handle")) && c.apply(r, t), (c = l && r[l]) && c.apply && X(r) && (e.result = c.apply(r, t), !1 === e.result && e.preventDefault());
                        return e.type = f, n || e.isDefaultPrevented() || u._default && !1 !== u._default.apply(p.pop(), t) || !X(i) || l && b(i[f]) && !g(i) && ((s = i[l]) && (i[l] = null), C.event.triggered = f, e.isPropagationStopped() && d.addEventListener(f, qt), i[f](), e.isPropagationStopped() && d.removeEventListener(f, qt), C.event.triggered = void 0, s && (i[l] = s)), e.result
                    }
                },
                simulate: function(e, t, i) {
                    var n = C.extend(new C.Event, i, {
                        type: e,
                        isSimulated: !0
                    });
                    C.event.trigger(n, null, t)
                }
            }), C.fn.extend({
                trigger: function(e, t) {
                    return this.each(function() {
                        C.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var i = this[0];
                    if (i) return C.event.trigger(e, t, i, !0)
                }
            }), m.focusin || C.each({
                focus: "focusin",
                blur: "focusout"
            }, function(i, n) {
                function o(e) {
                    C.event.simulate(n, e.target, C.event.fix(e))
                }
                C.event.special[n] = {
                    setup: function() {
                        var e = this.ownerDocument || this,
                            t = G.access(e, n);
                        t || e.addEventListener(i, o, !0), G.access(e, n, (t || 0) + 1)
                    },
                    teardown: function() {
                        var e = this.ownerDocument || this,
                            t = G.access(e, n) - 1;
                        t ? G.access(e, n, t) : (e.removeEventListener(i, o, !0), G.remove(e, n))
                    }
                }
            });
            var Dt = S.location,
                Nt = Date.now(),
                Ot = /\?/;
            C.parseXML = function(e) {
                var t;
                if (!e || "string" != typeof e) return null;
                try {
                    t = (new S.DOMParser).parseFromString(e, "text/xml")
                } catch (e) {
                    t = void 0
                }
                return t && !t.getElementsByTagName("parsererror").length || C.error("Invalid XML: " + e), t
            };
            var Ht = /\[\]$/,
                Pt = /\r?\n/g,
                Mt = /^(?:submit|button|image|reset|file)$/i,
                It = /^(?:input|select|textarea|keygen)/i;

            function zt(i, e, n, o) {
                var t;
                if (Array.isArray(e)) C.each(e, function(e, t) {
                    n || Ht.test(i) ? o(i, t) : zt(i + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, n, o)
                });
                else if (n || "object" !== x(e)) o(i, e);
                else
                    for (t in e) zt(i + "[" + t + "]", e[t], n, o)
            }
            C.param = function(e, t) {
                function i(e, t) {
                    var i = b(t) ? t() : t;
                    o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
                }
                var n, o = [];
                if (null == e) return "";
                if (Array.isArray(e) || e.jquery && !C.isPlainObject(e)) C.each(e, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in e) zt(n, e[n], t, i);
                return o.join("&")
            }, C.fn.extend({
                serialize: function() {
                    return C.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = C.prop(this, "elements");
                        return e ? C.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !C(this).is(":disabled") && It.test(this.nodeName) && !Mt.test(e) && (this.checked || !de.test(e))
                    }).map(function(e, t) {
                        var i = C(this).val();
                        return null == i ? null : Array.isArray(i) ? C.map(i, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(Pt, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: i.replace(Pt, "\r\n")
                        }
                    }).get()
                }
            });
            var Rt = /%20/g,
                Wt = /#.*$/,
                Bt = /([?&])_=[^&]*/,
                Ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                _t = /^(?:GET|HEAD)$/,
                Ut = /^\/\//,
                Vt = {},
                Xt = {},
                Yt = "*/".concat("*"),
                Gt = T.createElement("a");

            function Qt(r) {
                return function(e, t) {
                    "string" != typeof e && (t = e, e = "*");
                    var i, n = 0,
                        o = e.toLowerCase().match(H) || [];
                    if (b(t))
                        for (; i = o[n++];) "+" === i[0] ? (i = i.slice(1) || "*", (r[i] = r[i] || []).unshift(t)) : (r[i] = r[i] || []).push(t)
                }
            }

            function Jt(t, o, r, s) {
                var a = {},
                    l = t === Xt;

                function c(e) {
                    var n;
                    return a[e] = !0, C.each(t[e] || [], function(e, t) {
                        var i = t(o, r, s);
                        return "string" != typeof i || l || a[i] ? l ? !(n = i) : void 0 : (o.dataTypes.unshift(i), c(i), !1)
                    }), n
                }
                return c(o.dataTypes[0]) || !a["*"] && c("*")
            }

            function Kt(e, t) {
                var i, n, o = C.ajaxSettings.flatOptions || {};
                for (i in t) void 0 !== t[i] && ((o[i] ? e : n = n || {})[i] = t[i]);
                return n && C.extend(!0, e, n), e
            }
            Gt.href = Dt.href, C.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Dt.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Dt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Yt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": C.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? Kt(Kt(e, C.ajaxSettings), t) : Kt(C.ajaxSettings, e)
                },
                ajaxPrefilter: Qt(Vt),
                ajaxTransport: Qt(Xt),
                ajax: function(e, t) {
                    "object" == typeof e && (t = e, e = void 0), t = t || {};
                    var u, d, p, i, f, n, h, g, o, r, v = C.ajaxSetup({}, t),
                        y = v.context || v,
                        m = v.context && (y.nodeType || y.jquery) ? C(y) : C.event,
                        b = C.Deferred(),
                        w = C.Callbacks("once memory"),
                        x = v.statusCode || {},
                        s = {},
                        a = {},
                        l = "canceled",
                        k = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (h) {
                                    if (!i)
                                        for (i = {}; t = Ft.exec(p);) i[t[1].toLowerCase() + " "] = (i[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                    t = i[e.toLowerCase() + " "]
                                }
                                return null == t ? null : t.join(", ")
                            },
                            getAllResponseHeaders: function() {
                                return h ? p : null
                            },
                            setRequestHeader: function(e, t) {
                                return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, s[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return null == h && (v.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (h) k.always(e[k.status]);
                                    else
                                        for (t in e) x[t] = [x[t], e[t]];
                                return this
                            },
                            abort: function(e) {
                                var t = e || l;
                                return u && u.abort(t), c(0, t), this
                            }
                        };
                    if (b.promise(k), v.url = ((e || v.url || Dt.href) + "").replace(Ut, Dt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(H) || [""], null == v.crossDomain) {
                        n = T.createElement("a");
                        try {
                            n.href = v.url, n.href = n.href, v.crossDomain = Gt.protocol + "//" + Gt.host != n.protocol + "//" + n.host
                        } catch (e) {
                            v.crossDomain = !0
                        }
                    }
                    if (v.data && v.processData && "string" != typeof v.data && (v.data = C.param(v.data, v.traditional)), Jt(Vt, v, t, k), h) return k;
                    for (o in (g = C.event && v.global) && 0 == C.active++ && C.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !_t.test(v.type), d = v.url.replace(Wt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Rt, "+")) : (r = v.url.slice(d.length), v.data && (v.processData || "string" == typeof v.data) && (d += (Ot.test(d) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (d = d.replace(Bt, "$1"), r = (Ot.test(d) ? "&" : "?") + "_=" + Nt++ + r), v.url = d + r), v.ifModified && (C.lastModified[d] && k.setRequestHeader("If-Modified-Since", C.lastModified[d]), C.etag[d] && k.setRequestHeader("If-None-Match", C.etag[d])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && k.setRequestHeader("Content-Type", v.contentType), k.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Yt + "; q=0.01" : "") : v.accepts["*"]), v.headers) k.setRequestHeader(o, v.headers[o]);
                    if (v.beforeSend && (!1 === v.beforeSend.call(y, k, v) || h)) return k.abort();
                    if (l = "abort", w.add(v.complete), k.done(v.success), k.fail(v.error), u = Jt(Xt, v, t, k)) {
                        if (k.readyState = 1, g && m.trigger("ajaxSend", [k, v]), h) return k;
                        v.async && 0 < v.timeout && (f = S.setTimeout(function() {
                            k.abort("timeout")
                        }, v.timeout));
                        try {
                            h = !1, u.send(s, c)
                        } catch (e) {
                            if (h) throw e;
                            c(-1, e)
                        }
                    } else c(-1, "No Transport");

                    function c(e, t, i, n) {
                        var o, r, s, a, l, c = t;
                        h || (h = !0, f && S.clearTimeout(f), u = void 0, p = n || "", k.readyState = 0 < e ? 4 : 0, o = 200 <= e && e < 300 || 304 === e, i && (a = function(e, t, i) {
                            for (var n, o, r, s, a = e.contents, l = e.dataTypes;
                                "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (n)
                                for (o in a)
                                    if (a[o] && a[o].test(n)) {
                                        l.unshift(o);
                                        break
                                    }
                            if (l[0] in i) r = l[0];
                            else {
                                for (o in i) {
                                    if (!l[0] || e.converters[o + " " + l[0]]) {
                                        r = o;
                                        break
                                    }
                                    s = s || o
                                }
                                r = r || s
                            }
                            if (r) return r !== l[0] && l.unshift(r), i[r]
                        }(v, k, i)), a = function(e, t, i, n) {
                            var o, r, s, a, l, c = {},
                                u = e.dataTypes.slice();
                            if (u[1])
                                for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                            for (r = u.shift(); r;)
                                if (e.responseFields[r] && (i[e.responseFields[r]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())
                                    if ("*" === r) r = l;
                                    else if ("*" !== l && l !== r) {
                                if (!(s = c[l + " " + r] || c["* " + r]))
                                    for (o in c)
                                        if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                            !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));
                                            break
                                        }
                                if (!0 !== s)
                                    if (s && e.throws) t = s(t);
                                    else try {
                                        t = s(t)
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: s ? e : "No conversion from " + l + " to " + r
                                        }
                                    }
                            }
                            return {
                                state: "success",
                                data: t
                            }
                        }(v, a, k, o), o ? (v.ifModified && ((l = k.getResponseHeader("Last-Modified")) && (C.lastModified[d] = l), (l = k.getResponseHeader("etag")) && (C.etag[d] = l)), 204 === e || "HEAD" === v.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = a.state, r = a.data, o = !(s = a.error))) : (s = c, !e && c || (c = "error", e < 0 && (e = 0))), k.status = e, k.statusText = (t || c) + "", o ? b.resolveWith(y, [r, c, k]) : b.rejectWith(y, [k, c, s]), k.statusCode(x), x = void 0, g && m.trigger(o ? "ajaxSuccess" : "ajaxError", [k, v, o ? r : s]), w.fireWith(y, [k, c]), g && (m.trigger("ajaxComplete", [k, v]), --C.active || C.event.trigger("ajaxStop")))
                    }
                    return k
                },
                getJSON: function(e, t, i) {
                    return C.get(e, t, i, "json")
                },
                getScript: function(e, t) {
                    return C.get(e, void 0, t, "script")
                }
            }), C.each(["get", "post"], function(e, o) {
                C[o] = function(e, t, i, n) {
                    return b(t) && (n = n || i, i = t, t = void 0), C.ajax(C.extend({
                        url: e,
                        type: o,
                        dataType: n,
                        data: t,
                        success: i
                    }, C.isPlainObject(e) && e))
                }
            }), C._evalUrl = function(e, t) {
                return C.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(e) {
                        C.globalEval(e, t)
                    }
                })
            }, C.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return this[0] && (b(e) && (e = e.call(this[0])), t = C(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                        return e
                    }).append(this)), this
                },
                wrapInner: function(i) {
                    return b(i) ? this.each(function(e) {
                        C(this).wrapInner(i.call(this, e))
                    }) : this.each(function() {
                        var e = C(this),
                            t = e.contents();
                        t.length ? t.wrapAll(i) : e.append(i)
                    })
                },
                wrap: function(t) {
                    var i = b(t);
                    return this.each(function(e) {
                        C(this).wrapAll(i ? t.call(this, e) : t)
                    })
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each(function() {
                        C(this).replaceWith(this.childNodes)
                    }), this
                }
            }), C.expr.pseudos.hidden = function(e) {
                return !C.expr.pseudos.visible(e)
            }, C.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
            }, C.ajaxSettings.xhr = function() {
                try {
                    return new S.XMLHttpRequest
                } catch (e) {}
            };
            var Zt = {
                    0: 200,
                    1223: 204
                },
                ei = C.ajaxSettings.xhr();
            m.cors = !!ei && "withCredentials" in ei, m.ajax = ei = !!ei, C.ajaxTransport(function(o) {
                var r, s;
                if (m.cors || ei && !o.crossDomain) return {
                    send: function(e, t) {
                        var i, n = o.xhr();
                        if (n.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                            for (i in o.xhrFields) n[i] = o.xhrFields[i];
                        for (i in o.mimeType && n.overrideMimeType && n.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) n.setRequestHeader(i, e[i]);
                        r = function(e) {
                            return function() {
                                r && (r = s = n.onload = n.onerror = n.onabort = n.ontimeout = n.onreadystatechange = null, "abort" === e ? n.abort() : "error" === e ? "number" != typeof n.status ? t(0, "error") : t(n.status, n.statusText) : t(Zt[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                                    binary: n.response
                                } : {
                                    text: n.responseText
                                }, n.getAllResponseHeaders()))
                            }
                        }, n.onload = r(), s = n.onerror = n.ontimeout = r("error"), void 0 !== n.onabort ? n.onabort = s : n.onreadystatechange = function() {
                            4 === n.readyState && S.setTimeout(function() {
                                r && s()
                            })
                        }, r = r("abort");
                        try {
                            n.send(o.hasContent && o.data || null)
                        } catch (e) {
                            if (r) throw e
                        }
                    },
                    abort: function() {
                        r && r()
                    }
                }
            }), C.ajaxPrefilter(function(e) {
                e.crossDomain && (e.contents.script = !1)
            }), C.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return C.globalEval(e), e
                    }
                }
            }), C.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), C.ajaxTransport("script", function(i) {
                var n, o;
                if (i.crossDomain || i.scriptAttrs) return {
                    send: function(e, t) {
                        n = C("<script>").attr(i.scriptAttrs || {}).prop({
                            charset: i.scriptCharset,
                            src: i.url
                        }).on("load error", o = function(e) {
                            n.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type)
                        }), T.head.appendChild(n[0])
                    },
                    abort: function() {
                        o && o()
                    }
                }
            });
            var ti, ii = [],
                ni = /(=)\?(?=&|$)|\?\?/;
            C.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = ii.pop() || C.expando + "_" + Nt++;
                    return this[e] = !0, e
                }
            }), C.ajaxPrefilter("json jsonp", function(e, t, i) {
                var n, o, r, s = !1 !== e.jsonp && (ni.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(e.data) && "data");
                if (s || "jsonp" === e.dataTypes[0]) return n = e.jsonpCallback = b(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(ni, "$1" + n) : !1 !== e.jsonp && (e.url += (Ot.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), e.converters["script json"] = function() {
                    return r || C.error(n + " was not called"), r[0]
                }, e.dataTypes[0] = "json", o = S[n], S[n] = function() {
                    r = arguments
                }, i.always(function() {
                    void 0 === o ? C(S).removeProp(n) : S[n] = o, e[n] && (e.jsonpCallback = t.jsonpCallback, ii.push(n)), r && b(o) && o(r[0]), r = o = void 0
                }), "script"
            }), m.createHTMLDocument = ((ti = T.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === ti.childNodes.length), C.parseHTML = function(e, t, i) {
                return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (m.createHTMLDocument ? ((n = (t = T.implementation.createHTMLDocument("")).createElement("base")).href = T.location.href, t.head.appendChild(n)) : t = T), r = !i && [], (o = E.exec(e)) ? [t.createElement(o[1])] : (o = we([e], t, r), r && r.length && C(r).remove(), C.merge([], o.childNodes)));
                var n, o, r
            }, C.fn.load = function(e, t, i) {
                var n, o, r, s = this,
                    a = e.indexOf(" ");
                return -1 < a && (n = $t(e.slice(a)), e = e.slice(0, a)), b(t) ? (i = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && C.ajax({
                    url: e,
                    type: o || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    r = arguments, s.html(n ? C("<div>").append(C.parseHTML(e)).find(n) : e)
                }).always(i && function(e, t) {
                    s.each(function() {
                        i.apply(this, r || [e.responseText, t, e])
                    })
                }), this
            }, C.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                C.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), C.expr.pseudos.animated = function(t) {
                return C.grep(C.timers, function(e) {
                    return t === e.elem
                }).length
            }, C.offset = {
                setOffset: function(e, t, i) {
                    var n, o, r, s, a, l, c = C.css(e, "position"),
                        u = C(e),
                        d = {};
                    "static" === c && (e.style.position = "relative"), a = u.offset(), r = C.css(e, "top"), l = C.css(e, "left"), o = ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (n = u.position()).top, n.left) : (s = parseFloat(r) || 0, parseFloat(l) || 0), b(t) && (t = t.call(e, i, C.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + o), "using" in t ? t.using.call(e, d) : u.css(d)
                }
            }, C.fn.extend({
                offset: function(t) {
                    if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                        C.offset.setOffset(this, t, e)
                    });
                    var e, i, n = this[0];
                    return n ? n.getClientRects().length ? (e = n.getBoundingClientRect(), i = n.ownerDocument.defaultView, {
                        top: e.top + i.pageYOffset,
                        left: e.left + i.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0
                },
                position: function() {
                    if (this[0]) {
                        var e, t, i, n = this[0],
                            o = {
                                top: 0,
                                left: 0
                            };
                        if ("fixed" === C.css(n, "position")) t = n.getBoundingClientRect();
                        else {
                            for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === C.css(e, "position");) e = e.parentNode;
                            e && e !== n && 1 === e.nodeType && ((o = C(e).offset()).top += C.css(e, "borderTopWidth", !0), o.left += C.css(e, "borderLeftWidth", !0))
                        }
                        return {
                            top: t.top - o.top - C.css(n, "marginTop", !0),
                            left: t.left - o.left - C.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && "static" === C.css(e, "position");) e = e.offsetParent;
                        return e || ne
                    })
                }
            }), C.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(t, o) {
                var r = "pageYOffset" === o;
                C.fn[t] = function(e) {
                    return B(this, function(e, t, i) {
                        var n;
                        if (g(e) ? n = e : 9 === e.nodeType && (n = e.defaultView), void 0 === i) return n ? n[o] : e[t];
                        n ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset) : e[t] = i
                    }, t, e, arguments.length)
                }
            }), C.each(["top", "left"], function(e, i) {
                C.cssHooks[i] = Ke(m.pixelPosition, function(e, t) {
                    if (t) return t = Je(e, i), Ve.test(t) ? C(e).position()[i] + "px" : t
                })
            }), C.each({
                Height: "height",
                Width: "width"
            }, function(s, a) {
                C.each({
                    padding: "inner" + s,
                    content: a,
                    "": "outer" + s
                }, function(n, r) {
                    C.fn[r] = function(e, t) {
                        var i = arguments.length && (n || "boolean" != typeof e),
                            o = n || (!0 === e || !0 === t ? "margin" : "border");
                        return B(this, function(e, t, i) {
                            var n;
                            return g(e) ? 0 === r.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (n = e.documentElement, Math.max(e.body["scroll" + s], n["scroll" + s], e.body["offset" + s], n["offset" + s], n["client" + s])) : void 0 === i ? C.css(e, t, o) : C.style(e, t, i, o)
                        }, a, i ? e : void 0, i)
                    }
                })
            }), C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, i) {
                C.fn[i] = function(e, t) {
                    return 0 < arguments.length ? this.on(i, null, e, t) : this.trigger(i)
                }
            }), C.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }), C.fn.extend({
                bind: function(e, t, i) {
                    return this.on(e, null, t, i)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, i, n) {
                    return this.on(t, e, i, n)
                },
                undelegate: function(e, t, i) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
                }
            }), C.proxy = function(e, t) {
                var i, n, o;
                if ("string" == typeof t && (i = e[t], t = e, e = i), b(e)) return n = a.call(arguments, 2), (o = function() {
                    return e.apply(t || this, n.concat(a.call(arguments)))
                }).guid = e.guid = e.guid || C.guid++, o
            }, C.holdReady = function(e) {
                e ? C.readyWait++ : C.ready(!0)
            }, C.isArray = Array.isArray, C.parseJSON = JSON.parse, C.nodeName = A, C.isFunction = b, C.isWindow = g, C.camelCase = V, C.type = x, C.now = Date.now, C.isNumeric = function(e) {
                var t = C.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            }, void 0 === (li = function() {
                return C
            }.apply(ai, [])) || (si.exports = li);
            var oi = S.jQuery,
                ri = S.$;
            return C.noConflict = function(e) {
                return S.$ === C && (S.$ = ri), e && S.jQuery === C && (S.jQuery = oi), C
            }, e || (S.jQuery = S.$ = C), C
        })
    },
    98: function(e, t, i) {
        var n, o, r;
        ! function() {
            "use strict";
            o = [i(2)], void 0 === (r = "function" == typeof(n = function(u) {
                "use strict";
                var s = window.Slick || {};
                (s = function() {
                    var o = 0;

                    function e(e, t) {
                        var i = this,
                            n;
                        i.defaults = {
                            accessibility: !0,
                            adaptiveHeight: !1,
                            appendArrows: u(e),
                            appendDots: u(e),
                            arrows: !0,
                            asNavFor: null,
                            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                            autoplay: !1,
                            autoplaySpeed: 3e3,
                            centerMode: !1,
                            centerPadding: "50px",
                            cssEase: "ease",
                            customPaging: function(e, t) {
                                return u('<button type="button" />').text(t + 1)
                            },
                            dots: !1,
                            dotsClass: "slick-dots",
                            draggable: !0,
                            easing: "linear",
                            edgeFriction: .35,
                            fade: !1,
                            focusOnSelect: !1,
                            focusOnChange: !1,
                            infinite: !0,
                            initialSlide: 0,
                            lazyLoad: "ondemand",
                            mobileFirst: !1,
                            pauseOnHover: !0,
                            pauseOnFocus: !0,
                            pauseOnDotsHover: !1,
                            respondTo: "window",
                            responsive: null,
                            rows: 1,
                            rtl: !1,
                            slide: "",
                            slidesPerRow: 1,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 500,
                            swipe: !0,
                            swipeToSlide: !1,
                            touchMove: !0,
                            touchThreshold: 5,
                            useCSS: !0,
                            useTransform: !0,
                            variableWidth: !1,
                            vertical: !1,
                            verticalSwiping: !1,
                            waitForAnimate: !0,
                            zIndex: 1e3
                        };
                        i.initials = {
                            animating: !1,
                            dragging: !1,
                            autoPlayTimer: null,
                            currentDirection: 0,
                            currentLeft: null,
                            currentSlide: 0,
                            direction: 1,
                            $dots: null,
                            listWidth: null,
                            listHeight: null,
                            loadIndex: 0,
                            $nextArrow: null,
                            $prevArrow: null,
                            scrolling: !1,
                            slideCount: null,
                            slideWidth: null,
                            $slideTrack: null,
                            $slides: null,
                            sliding: !1,
                            slideOffset: 0,
                            swipeLeft: null,
                            swiping: !1,
                            $list: null,
                            touchObject: {},
                            transformsEnabled: !1,
                            unslicked: !1
                        };
                        u.extend(i, i.initials);
                        i.activeBreakpoint = null;
                        i.animType = null;
                        i.animProp = null;
                        i.breakpoints = [];
                        i.breakpointSettings = [];
                        i.cssTransitions = !1;
                        i.focussed = !1;
                        i.interrupted = !1;
                        i.hidden = "hidden";
                        i.paused = !0;
                        i.positionProp = null;
                        i.respondTo = null;
                        i.rowCount = 1;
                        i.shouldClick = !0;
                        i.$slider = u(e);
                        i.$slidesCache = null;
                        i.transformType = null;
                        i.transitionType = null;
                        i.visibilityChange = "visibilitychange";
                        i.windowWidth = 0;
                        i.windowTimer = null;
                        n = u(e).data("slick") || {};
                        i.options = u.extend({}, i.defaults, t, n);
                        i.currentSlide = i.options.initialSlide;
                        i.originalSettings = i.options;
                        if (typeof document.mozHidden !== "undefined") {
                            i.hidden = "mozHidden";
                            i.visibilityChange = "mozvisibilitychange"
                        } else if (typeof document.webkitHidden !== "undefined") {
                            i.hidden = "webkitHidden";
                            i.visibilityChange = "webkitvisibilitychange"
                        }
                        i.autoPlay = u.proxy(i.autoPlay, i);
                        i.autoPlayClear = u.proxy(i.autoPlayClear, i);
                        i.autoPlayIterator = u.proxy(i.autoPlayIterator, i);
                        i.changeSlide = u.proxy(i.changeSlide, i);
                        i.clickHandler = u.proxy(i.clickHandler, i);
                        i.selectHandler = u.proxy(i.selectHandler, i);
                        i.setPosition = u.proxy(i.setPosition, i);
                        i.swipeHandler = u.proxy(i.swipeHandler, i);
                        i.dragHandler = u.proxy(i.dragHandler, i);
                        i.keyHandler = u.proxy(i.keyHandler, i);
                        i.instanceUid = o++;
                        i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
                        i.registerBreakpoints();
                        i.init(!0)
                    }
                    return e
                }()).prototype.activateADA = function() {
                    var e = this;
                    e.$slideTrack.find(".slick-active").attr({
                        "aria-hidden": "false"
                    }).find("a, input, button, select").attr({
                        tabindex: "0"
                    })
                }, s.prototype.addSlide = s.prototype.slickAdd = function(e, t, i) {
                    var n = this;
                    if (typeof t === "boolean") {
                        i = t;
                        t = null
                    } else if (t < 0 || t >= n.slideCount) {
                        return !1
                    }
                    n.unload();
                    if (typeof t === "number") {
                        if (t === 0 && n.$slides.length === 0) {
                            u(e).appendTo(n.$slideTrack)
                        } else if (i) {
                            u(e).insertBefore(n.$slides.eq(t))
                        } else {
                            u(e).insertAfter(n.$slides.eq(t))
                        }
                    } else {
                        if (i === !0) {
                            u(e).prependTo(n.$slideTrack)
                        } else {
                            u(e).appendTo(n.$slideTrack)
                        }
                    }
                    n.$slides = n.$slideTrack.children(this.options.slide);
                    n.$slideTrack.children(this.options.slide).detach();
                    n.$slideTrack.append(n.$slides);
                    n.$slides.each(function(e, t) {
                        u(t).attr("data-slick-index", e)
                    });
                    n.$slidesCache = n.$slides;
                    n.reinit()
                }, s.prototype.animateHeight = function() {
                    var e = this;
                    if (e.options.slidesToShow === 1 && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                        e.$list.animate({
                            height: t
                        }, e.options.speed)
                    }
                }, s.prototype.animateSlide = function(e, t) {
                    var i = {},
                        n = this;
                    n.animateHeight();
                    if (n.options.rtl === !0 && n.options.vertical === !1) {
                        e = -e
                    }
                    if (n.transformsEnabled === !1) {
                        if (n.options.vertical === !1) {
                            n.$slideTrack.animate({
                                left: e
                            }, n.options.speed, n.options.easing, t)
                        } else {
                            n.$slideTrack.animate({
                                top: e
                            }, n.options.speed, n.options.easing, t)
                        }
                    } else {
                        if (n.cssTransitions === !1) {
                            if (n.options.rtl === !0) {
                                n.currentLeft = -n.currentLeft
                            }
                            u({
                                animStart: n.currentLeft
                            }).animate({
                                animStart: e
                            }, {
                                duration: n.options.speed,
                                easing: n.options.easing,
                                step: function(e) {
                                    e = Math.ceil(e);
                                    if (n.options.vertical === !1) {
                                        i[n.animType] = "translate(" + e + "px, 0px)";
                                        n.$slideTrack.css(i)
                                    } else {
                                        i[n.animType] = "translate(0px," + e + "px)";
                                        n.$slideTrack.css(i)
                                    }
                                },
                                complete: function() {
                                    if (t) {
                                        t.call()
                                    }
                                }
                            })
                        } else {
                            n.applyTransition();
                            e = Math.ceil(e);
                            if (n.options.vertical === !1) {
                                i[n.animType] = "translate3d(" + e + "px, 0px, 0px)"
                            } else {
                                i[n.animType] = "translate3d(0px," + e + "px, 0px)"
                            }
                            n.$slideTrack.css(i);
                            if (t) {
                                setTimeout(function() {
                                    n.disableTransition();
                                    t.call()
                                }, n.options.speed)
                            }
                        }
                    }
                }, s.prototype.getNavTarget = function() {
                    var e = this,
                        t = e.options.asNavFor;
                    if (t && t !== null) {
                        t = u(t).not(e.$slider)
                    }
                    return t
                }, s.prototype.asNavFor = function(t) {
                    var e = this,
                        i = e.getNavTarget();
                    if (i !== null && typeof i === "object") {
                        i.each(function() {
                            var e = u(this).slick("getSlick");
                            if (!e.unslicked) {
                                e.slideHandler(t, !0)
                            }
                        })
                    }
                }, s.prototype.applyTransition = function(e) {
                    var t = this,
                        i = {};
                    if (t.options.fade === !1) {
                        i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase
                    } else {
                        i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase
                    }
                    if (t.options.fade === !1) {
                        t.$slideTrack.css(i)
                    } else {
                        t.$slides.eq(e).css(i)
                    }
                }, s.prototype.autoPlay = function() {
                    var e = this;
                    e.autoPlayClear();
                    if (e.slideCount > e.options.slidesToShow) {
                        e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed)
                    }
                }, s.prototype.autoPlayClear = function() {
                    var e = this;
                    if (e.autoPlayTimer) {
                        clearInterval(e.autoPlayTimer)
                    }
                }, s.prototype.autoPlayIterator = function() {
                    var e = this,
                        t = e.currentSlide + e.options.slidesToScroll;
                    if (!e.paused && !e.interrupted && !e.focussed) {
                        if (e.options.infinite === !1) {
                            if (e.direction === 1 && e.currentSlide + 1 === e.slideCount - 1) {
                                e.direction = 0
                            } else if (e.direction === 0) {
                                t = e.currentSlide - e.options.slidesToScroll;
                                if (e.currentSlide - 1 === 0) {
                                    e.direction = 1
                                }
                            }
                        }
                        e.slideHandler(t)
                    }
                }, s.prototype.buildArrows = function() {
                    var e = this;
                    if (e.options.arrows === !0) {
                        e.$prevArrow = u(e.options.prevArrow).addClass("slick-arrow");
                        e.$nextArrow = u(e.options.nextArrow).addClass("slick-arrow");
                        if (e.slideCount > e.options.slidesToShow) {
                            e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                            e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                            if (e.htmlExpr.test(e.options.prevArrow)) {
                                e.$prevArrow.prependTo(e.options.appendArrows)
                            }
                            if (e.htmlExpr.test(e.options.nextArrow)) {
                                e.$nextArrow.appendTo(e.options.appendArrows)
                            }
                            if (e.options.infinite !== !0) {
                                e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")
                            }
                        } else {
                            e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                                "aria-disabled": "true",
                                tabindex: "-1"
                            })
                        }
                    }
                }, s.prototype.buildDots = function() {
                    var e = this,
                        t, i;
                    if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$slider.addClass("slick-dotted");
                        i = u("<ul />").addClass(e.options.dotsClass);
                        for (t = 0; t <= e.getDotCount(); t += 1) {
                            i.append(u("<li />").append(e.options.customPaging.call(this, e, t)))
                        }
                        e.$dots = i.appendTo(e.options.appendDots);
                        e.$dots.find("li").first().addClass("slick-active")
                    }
                }, s.prototype.buildOut = function() {
                    var e = this;
                    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
                    e.slideCount = e.$slides.length;
                    e.$slides.each(function(e, t) {
                        u(t).attr("data-slick-index", e).data("originalStyling", u(t).attr("style") || "")
                    });
                    e.$slider.addClass("slick-slider");
                    e.$slideTrack = e.slideCount === 0 ? u('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent();
                    e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent();
                    e.$slideTrack.css("opacity", 0);
                    if (e.options.centerMode === !0 || e.options.swipeToSlide === !0) {
                        e.options.slidesToScroll = 1
                    }
                    u("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading");
                    e.setupInfinite();
                    e.buildArrows();
                    e.buildDots();
                    e.updateDots();
                    e.setSlideClasses(typeof e.currentSlide === "number" ? e.currentSlide : 0);
                    if (e.options.draggable === !0) {
                        e.$list.addClass("draggable")
                    }
                }, s.prototype.buildRows = function() {
                    var e = this,
                        t, i, n, o, r, s, a;
                    o = document.createDocumentFragment();
                    s = e.$slider.children();
                    if (e.options.rows > 0) {
                        a = e.options.slidesPerRow * e.options.rows;
                        r = Math.ceil(s.length / a);
                        for (t = 0; t < r; t++) {
                            var l = document.createElement("div");
                            for (i = 0; i < e.options.rows; i++) {
                                var c = document.createElement("div");
                                for (n = 0; n < e.options.slidesPerRow; n++) {
                                    var u = t * a + (i * e.options.slidesPerRow + n);
                                    if (s.get(u)) {
                                        c.appendChild(s.get(u))
                                    }
                                }
                                l.appendChild(c)
                            }
                            o.appendChild(l)
                        }
                        e.$slider.empty().append(o);
                        e.$slider.children().children().children().css({
                            width: 100 / e.options.slidesPerRow + "%",
                            display: "inline-block"
                        })
                    }
                }, s.prototype.checkResponsive = function(e, t) {
                    var i = this,
                        n, o, r, s = !1;
                    var a = i.$slider.width();
                    var l = window.innerWidth || u(window).width();
                    if (i.respondTo === "window") {
                        r = l
                    } else if (i.respondTo === "slider") {
                        r = a
                    } else if (i.respondTo === "min") {
                        r = Math.min(l, a)
                    }
                    if (i.options.responsive && i.options.responsive.length && i.options.responsive !== null) {
                        o = null;
                        for (n in i.breakpoints) {
                            if (i.breakpoints.hasOwnProperty(n)) {
                                if (i.originalSettings.mobileFirst === !1) {
                                    if (r < i.breakpoints[n]) {
                                        o = i.breakpoints[n]
                                    }
                                } else {
                                    if (r > i.breakpoints[n]) {
                                        o = i.breakpoints[n]
                                    }
                                }
                            }
                        }
                        if (o !== null) {
                            if (i.activeBreakpoint !== null) {
                                if (o !== i.activeBreakpoint || t) {
                                    i.activeBreakpoint = o;
                                    if (i.breakpointSettings[o] === "unslick") {
                                        i.unslick(o)
                                    } else {
                                        i.options = u.extend({}, i.originalSettings, i.breakpointSettings[o]);
                                        if (e === !0) {
                                            i.currentSlide = i.options.initialSlide
                                        }
                                        i.refresh(e)
                                    }
                                    s = o
                                }
                            } else {
                                i.activeBreakpoint = o;
                                if (i.breakpointSettings[o] === "unslick") {
                                    i.unslick(o)
                                } else {
                                    i.options = u.extend({}, i.originalSettings, i.breakpointSettings[o]);
                                    if (e === !0) {
                                        i.currentSlide = i.options.initialSlide
                                    }
                                    i.refresh(e)
                                }
                                s = o
                            }
                        } else {
                            if (i.activeBreakpoint !== null) {
                                i.activeBreakpoint = null;
                                i.options = i.originalSettings;
                                if (e === !0) {
                                    i.currentSlide = i.options.initialSlide
                                }
                                i.refresh(e);
                                s = o
                            }
                        }
                        if (!e && s !== !1) {
                            i.$slider.trigger("breakpoint", [i, s])
                        }
                    }
                }, s.prototype.changeSlide = function(e, t) {
                    var i = this,
                        n = u(e.currentTarget),
                        o, r, s;
                    if (n.is("a")) {
                        e.preventDefault()
                    }
                    if (!n.is("li")) {
                        n = n.closest("li")
                    }
                    s = i.slideCount % i.options.slidesToScroll !== 0;
                    o = s ? 0 : (i.slideCount - i.currentSlide) % i.options.slidesToScroll;
                    switch (e.data.message) {
                        case "previous":
                            r = o === 0 ? i.options.slidesToScroll : i.options.slidesToShow - o;
                            if (i.slideCount > i.options.slidesToShow) {
                                i.slideHandler(i.currentSlide - r, !1, t)
                            }
                            break;
                        case "next":
                            r = o === 0 ? i.options.slidesToScroll : o;
                            if (i.slideCount > i.options.slidesToShow) {
                                i.slideHandler(i.currentSlide + r, !1, t)
                            }
                            break;
                        case "index":
                            var a = e.data.index === 0 ? 0 : e.data.index || n.index() * i.options.slidesToScroll;
                            i.slideHandler(i.checkNavigable(a), !1, t);
                            n.children().trigger("focus");
                            break;
                        default:
                            return
                    }
                }, s.prototype.checkNavigable = function(e) {
                    var t = this,
                        i, n;
                    i = t.getNavigableIndexes();
                    n = 0;
                    if (e > i[i.length - 1]) {
                        e = i[i.length - 1]
                    } else {
                        for (var o in i) {
                            if (e < i[o]) {
                                e = n;
                                break
                            }
                            n = i[o]
                        }
                    }
                    return e
                }, s.prototype.cleanUpEvents = function() {
                    var e = this;
                    if (e.options.dots && e.$dots !== null) {
                        u("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", u.proxy(e.interrupt, e, !0)).off("mouseleave.slick", u.proxy(e.interrupt, e, !1));
                        if (e.options.accessibility === !0) {
                            e.$dots.off("keydown.slick", e.keyHandler)
                        }
                    }
                    e.$slider.off("focus.slick blur.slick");
                    if (e.options.arrows === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide);
                        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide);
                        if (e.options.accessibility === !0) {
                            e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler);
                            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler)
                        }
                    }
                    e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler);
                    e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler);
                    e.$list.off("touchend.slick mouseup.slick", e.swipeHandler);
                    e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler);
                    e.$list.off("click.slick", e.clickHandler);
                    u(document).off(e.visibilityChange, e.visibility);
                    e.cleanUpSlideEvents();
                    if (e.options.accessibility === !0) {
                        e.$list.off("keydown.slick", e.keyHandler)
                    }
                    if (e.options.focusOnSelect === !0) {
                        u(e.$slideTrack).children().off("click.slick", e.selectHandler)
                    }
                    u(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange);
                    u(window).off("resize.slick.slick-" + e.instanceUid, e.resize);
                    u("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault);
                    u(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
                }, s.prototype.cleanUpSlideEvents = function() {
                    var e = this;
                    e.$list.off("mouseenter.slick", u.proxy(e.interrupt, e, !0));
                    e.$list.off("mouseleave.slick", u.proxy(e.interrupt, e, !1))
                }, s.prototype.cleanUpRows = function() {
                    var e = this,
                        t;
                    if (e.options.rows > 0) {
                        t = e.$slides.children().children();
                        t.removeAttr("style");
                        e.$slider.empty().append(t)
                    }
                }, s.prototype.clickHandler = function(e) {
                    var t = this;
                    if (t.shouldClick === !1) {
                        e.stopImmediatePropagation();
                        e.stopPropagation();
                        e.preventDefault()
                    }
                }, s.prototype.destroy = function(e) {
                    var t = this;
                    t.autoPlayClear();
                    t.touchObject = {};
                    t.cleanUpEvents();
                    u(".slick-cloned", t.$slider).detach();
                    if (t.$dots) {
                        t.$dots.remove()
                    }
                    if (t.$prevArrow && t.$prevArrow.length) {
                        t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
                        if (t.htmlExpr.test(t.options.prevArrow)) {
                            t.$prevArrow.remove()
                        }
                    }
                    if (t.$nextArrow && t.$nextArrow.length) {
                        t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
                        if (t.htmlExpr.test(t.options.nextArrow)) {
                            t.$nextArrow.remove()
                        }
                    }
                    if (t.$slides) {
                        t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                            u(this).attr("style", u(this).data("originalStyling"))
                        });
                        t.$slideTrack.children(this.options.slide).detach();
                        t.$slideTrack.detach();
                        t.$list.detach();
                        t.$slider.append(t.$slides)
                    }
                    t.cleanUpRows();
                    t.$slider.removeClass("slick-slider");
                    t.$slider.removeClass("slick-initialized");
                    t.$slider.removeClass("slick-dotted");
                    t.unslicked = !0;
                    if (!e) {
                        t.$slider.trigger("destroy", [t])
                    }
                }, s.prototype.disableTransition = function(e) {
                    var t = this,
                        i = {};
                    i[t.transitionType] = "";
                    if (t.options.fade === !1) {
                        t.$slideTrack.css(i)
                    } else {
                        t.$slides.eq(e).css(i)
                    }
                }, s.prototype.fadeSlide = function(e, t) {
                    var i = this;
                    if (i.cssTransitions === !1) {
                        i.$slides.eq(e).css({
                            zIndex: i.options.zIndex
                        });
                        i.$slides.eq(e).animate({
                            opacity: 1
                        }, i.options.speed, i.options.easing, t)
                    } else {
                        i.applyTransition(e);
                        i.$slides.eq(e).css({
                            opacity: 1,
                            zIndex: i.options.zIndex
                        });
                        if (t) {
                            setTimeout(function() {
                                i.disableTransition(e);
                                t.call()
                            }, i.options.speed)
                        }
                    }
                }, s.prototype.fadeSlideOut = function(e) {
                    var t = this;
                    if (t.cssTransitions === !1) {
                        t.$slides.eq(e).animate({
                            opacity: 0,
                            zIndex: t.options.zIndex - 2
                        }, t.options.speed, t.options.easing)
                    } else {
                        t.applyTransition(e);
                        t.$slides.eq(e).css({
                            opacity: 0,
                            zIndex: t.options.zIndex - 2
                        })
                    }
                }, s.prototype.filterSlides = s.prototype.slickFilter = function(e) {
                    var t = this;
                    if (e !== null) {
                        t.$slidesCache = t.$slides;
                        t.unload();
                        t.$slideTrack.children(this.options.slide).detach();
                        t.$slidesCache.filter(e).appendTo(t.$slideTrack);
                        t.reinit()
                    }
                }, s.prototype.focusHandler = function() {
                    var i = this;
                    i.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(e) {
                        var t = u(this);
                        setTimeout(function() {
                            if (i.options.pauseOnFocus) {
                                if (t.is(":focus")) {
                                    i.focussed = !0;
                                    i.autoPlay()
                                }
                            }
                        }, 0)
                    }).on("blur.slick", "*", function(e) {
                        var t = u(this);
                        if (i.options.pauseOnFocus) {
                            i.focussed = !1;
                            i.autoPlay()
                        }
                    })
                }, s.prototype.getCurrent = s.prototype.slickCurrentSlide = function() {
                    var e = this;
                    return e.currentSlide
                }, s.prototype.getDotCount = function() {
                    var e = this;
                    var t = 0;
                    var i = 0;
                    var n = 0;
                    if (e.options.infinite === !0) {
                        if (e.slideCount <= e.options.slidesToShow) {
                            ++n
                        } else {
                            while (t < e.slideCount) {
                                ++n;
                                t = i + e.options.slidesToScroll;
                                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow
                            }
                        }
                    } else if (e.options.centerMode === !0) {
                        n = e.slideCount
                    } else if (!e.options.asNavFor) {
                        n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll)
                    } else {
                        while (t < e.slideCount) {
                            ++n;
                            t = i + e.options.slidesToScroll;
                            i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow
                        }
                    }
                    return n - 1
                }, s.prototype.getLeft = function(e) {
                    var t = this,
                        i, n, o = 0,
                        r, s;
                    t.slideOffset = 0;
                    n = t.$slides.first().outerHeight(!0);
                    if (t.options.infinite === !0) {
                        if (t.slideCount > t.options.slidesToShow) {
                            t.slideOffset = t.slideWidth * t.options.slidesToShow * -1;
                            s = -1;
                            if (t.options.vertical === !0 && t.options.centerMode === !0) {
                                if (t.options.slidesToShow === 2) {
                                    s = -1.5
                                } else if (t.options.slidesToShow === 1) {
                                    s = -2
                                }
                            }
                            o = n * t.options.slidesToShow * s
                        }
                        if (t.slideCount % t.options.slidesToScroll !== 0) {
                            if (e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow) {
                                if (e > t.slideCount) {
                                    t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1;
                                    o = (t.options.slidesToShow - (e - t.slideCount)) * n * -1
                                } else {
                                    t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1;
                                    o = t.slideCount % t.options.slidesToScroll * n * -1
                                }
                            }
                        }
                    } else {
                        if (e + t.options.slidesToShow > t.slideCount) {
                            t.slideOffset = (e + t.options.slidesToShow - t.slideCount) * t.slideWidth;
                            o = (e + t.options.slidesToShow - t.slideCount) * n
                        }
                    }
                    if (t.slideCount <= t.options.slidesToShow) {
                        t.slideOffset = 0;
                        o = 0
                    }
                    if (t.options.centerMode === !0 && t.slideCount <= t.options.slidesToShow) {
                        t.slideOffset = t.slideWidth * Math.floor(t.options.slidesToShow) / 2 - t.slideWidth * t.slideCount / 2
                    } else if (t.options.centerMode === !0 && t.options.infinite === !0) {
                        t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth
                    } else if (t.options.centerMode === !0) {
                        t.slideOffset = 0;
                        t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)
                    }
                    if (t.options.vertical === !1) {
                        i = e * t.slideWidth * -1 + t.slideOffset
                    } else {
                        i = e * n * -1 + o
                    }
                    if (t.options.variableWidth === !0) {
                        if (t.slideCount <= t.options.slidesToShow || t.options.infinite === !1) {
                            r = t.$slideTrack.children(".slick-slide").eq(e)
                        } else {
                            r = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow)
                        }
                        if (t.options.rtl === !0) {
                            if (r[0]) {
                                i = (t.$slideTrack.width() - r[0].offsetLeft - r.width()) * -1
                            } else {
                                i = 0
                            }
                        } else {
                            i = r[0] ? r[0].offsetLeft * -1 : 0
                        }
                        if (t.options.centerMode === !0) {
                            if (t.slideCount <= t.options.slidesToShow || t.options.infinite === !1) {
                                r = t.$slideTrack.children(".slick-slide").eq(e)
                            } else {
                                r = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow + 1)
                            }
                            if (t.options.rtl === !0) {
                                if (r[0]) {
                                    i = (t.$slideTrack.width() - r[0].offsetLeft - r.width()) * -1
                                } else {
                                    i = 0
                                }
                            } else {
                                i = r[0] ? r[0].offsetLeft * -1 : 0
                            }
                            i += (t.$list.width() - r.outerWidth()) / 2
                        }
                    }
                    return i
                }, s.prototype.getOption = s.prototype.slickGetOption = function(e) {
                    var t = this;
                    return t.options[e]
                }, s.prototype.getNavigableIndexes = function() {
                    var e = this,
                        t = 0,
                        i = 0,
                        n = [],
                        o;
                    if (e.options.infinite === !1) {
                        o = e.slideCount
                    } else {
                        t = e.options.slidesToScroll * -1;
                        i = e.options.slidesToScroll * -1;
                        o = e.slideCount * 2
                    }
                    while (t < o) {
                        n.push(t);
                        t = i + e.options.slidesToScroll;
                        i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow
                    }
                    return n
                }, s.prototype.getSlick = function() {
                    return this
                }, s.prototype.getSlideCount = function() {
                    var r = this,
                        e, s, a, t;
                    t = r.options.centerMode === !0 ? Math.floor(r.$list.width() / 2) : 0;
                    a = r.swipeLeft * -1 + t;
                    if (r.options.swipeToSlide === !0) {
                        r.$slideTrack.find(".slick-slide").each(function(e, t) {
                            var i, n, o;
                            i = u(t).outerWidth();
                            n = t.offsetLeft;
                            if (r.options.centerMode !== !0) {
                                n += i / 2
                            }
                            o = n + i;
                            if (a < o) {
                                s = t;
                                return !1
                            }
                        });
                        e = Math.abs(u(s).attr("data-slick-index") - r.currentSlide) || 1;
                        return e
                    } else {
                        return r.options.slidesToScroll
                    }
                }, s.prototype.goTo = s.prototype.slickGoTo = function(e, t) {
                    var i = this;
                    i.changeSlide({
                        data: {
                            message: "index",
                            index: parseInt(e)
                        }
                    }, t)
                }, s.prototype.init = function(e) {
                    var t = this;
                    if (!u(t.$slider).hasClass("slick-initialized")) {
                        u(t.$slider).addClass("slick-initialized");
                        t.buildRows();
                        t.buildOut();
                        t.setProps();
                        t.startLoad();
                        t.loadSlider();
                        t.initializeEvents();
                        t.updateArrows();
                        t.updateDots();
                        t.checkResponsive(!0);
                        t.focusHandler()
                    }
                    if (e) {
                        t.$slider.trigger("init", [t])
                    }
                    if (t.options.accessibility === !0) {
                        t.initADA()
                    }
                    if (t.options.autoplay) {
                        t.paused = !1;
                        t.autoPlay()
                    }
                }, s.prototype.initADA = function() {
                    var n = this,
                        i = Math.ceil(n.slideCount / n.options.slidesToShow),
                        o = n.getNavigableIndexes().filter(function(e) {
                            return e >= 0 && e < n.slideCount
                        });
                    n.$slides.add(n.$slideTrack.find(".slick-cloned")).attr({
                        "aria-hidden": "true",
                        tabindex: "-1"
                    }).find("a, input, button, select").attr({
                        tabindex: "-1"
                    });
                    if (n.$dots !== null) {
                        n.$slides.not(n.$slideTrack.find(".slick-cloned")).each(function(e) {
                            var t = o.indexOf(e);
                            u(this).attr({
                                role: "tabpanel",
                                id: "slick-slide" + n.instanceUid + e,
                                tabindex: -1
                            });
                            if (t !== -1) {
                                var i = "slick-slide-control" + n.instanceUid + t;
                                if (u("#" + i).length) {
                                    u(this).attr({
                                        "aria-describedby": i
                                    })
                                }
                            }
                        });
                        n.$dots.attr("role", "tablist").find("li").each(function(e) {
                            var t = o[e];
                            u(this).attr({
                                role: "presentation"
                            });
                            u(this).find("button").first().attr({
                                role: "tab",
                                id: "slick-slide-control" + n.instanceUid + e,
                                "aria-controls": "slick-slide" + n.instanceUid + t,
                                "aria-label": e + 1 + " of " + i,
                                "aria-selected": null,
                                tabindex: "-1"
                            })
                        }).eq(n.currentSlide).find("button").attr({
                            "aria-selected": "true",
                            tabindex: "0"
                        }).end()
                    }
                    for (var e = n.currentSlide, t = e + n.options.slidesToShow; e < t; e++) {
                        if (n.options.focusOnChange) {
                            n.$slides.eq(e).attr({
                                tabindex: "0"
                            })
                        } else {
                            n.$slides.eq(e).removeAttr("tabindex")
                        }
                    }
                    n.activateADA()
                }, s.prototype.initArrowEvents = function() {
                    var e = this;
                    if (e.options.arrows === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$prevArrow.off("click.slick").on("click.slick", {
                            message: "previous"
                        }, e.changeSlide);
                        e.$nextArrow.off("click.slick").on("click.slick", {
                            message: "next"
                        }, e.changeSlide);
                        if (e.options.accessibility === !0) {
                            e.$prevArrow.on("keydown.slick", e.keyHandler);
                            e.$nextArrow.on("keydown.slick", e.keyHandler)
                        }
                    }
                }, s.prototype.initDotEvents = function() {
                    var e = this;
                    if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
                        u("li", e.$dots).on("click.slick", {
                            message: "index"
                        }, e.changeSlide);
                        if (e.options.accessibility === !0) {
                            e.$dots.on("keydown.slick", e.keyHandler)
                        }
                    }
                    if (e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow) {
                        u("li", e.$dots).on("mouseenter.slick", u.proxy(e.interrupt, e, !0)).on("mouseleave.slick", u.proxy(e.interrupt, e, !1))
                    }
                }, s.prototype.initSlideEvents = function() {
                    var e = this;
                    if (e.options.pauseOnHover) {
                        e.$list.on("mouseenter.slick", u.proxy(e.interrupt, e, !0));
                        e.$list.on("mouseleave.slick", u.proxy(e.interrupt, e, !1))
                    }
                }, s.prototype.initializeEvents = function() {
                    var e = this;
                    e.initArrowEvents();
                    e.initDotEvents();
                    e.initSlideEvents();
                    e.$list.on("touchstart.slick mousedown.slick", {
                        action: "start"
                    }, e.swipeHandler);
                    e.$list.on("touchmove.slick mousemove.slick", {
                        action: "move"
                    }, e.swipeHandler);
                    e.$list.on("touchend.slick mouseup.slick", {
                        action: "end"
                    }, e.swipeHandler);
                    e.$list.on("touchcancel.slick mouseleave.slick", {
                        action: "end"
                    }, e.swipeHandler);
                    e.$list.on("click.slick", e.clickHandler);
                    u(document).on(e.visibilityChange, u.proxy(e.visibility, e));
                    if (e.options.accessibility === !0) {
                        e.$list.on("keydown.slick", e.keyHandler)
                    }
                    if (e.options.focusOnSelect === !0) {
                        u(e.$slideTrack).children().on("click.slick", e.selectHandler)
                    }
                    u(window).on("orientationchange.slick.slick-" + e.instanceUid, u.proxy(e.orientationChange, e));
                    u(window).on("resize.slick.slick-" + e.instanceUid, u.proxy(e.resize, e));
                    u("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault);
                    u(window).on("load.slick.slick-" + e.instanceUid, e.setPosition);
                    u(e.setPosition)
                }, s.prototype.initUI = function() {
                    var e = this;
                    if (e.options.arrows === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$prevArrow.show();
                        e.$nextArrow.show()
                    }
                    if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$dots.show()
                    }
                }, s.prototype.keyHandler = function(e) {
                    var t = this;
                    if (!e.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
                        if (e.keyCode === 37 && t.options.accessibility === !0) {
                            t.changeSlide({
                                data: {
                                    message: t.options.rtl === !0 ? "next" : "previous"
                                }
                            })
                        } else if (e.keyCode === 39 && t.options.accessibility === !0) {
                            t.changeSlide({
                                data: {
                                    message: t.options.rtl === !0 ? "previous" : "next"
                                }
                            })
                        }
                    }
                }, s.prototype.lazyLoad = function() {
                    var r = this,
                        e, t, i, n;

                    function o(e) {
                        u("img[data-lazy]", e).each(function() {
                            var e = u(this),
                                t = u(this).attr("data-lazy"),
                                i = u(this).attr("data-srcset"),
                                n = u(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                                o = document.createElement("img");
                            o.onload = function() {
                                e.animate({
                                    opacity: 0
                                }, 100, function() {
                                    if (i) {
                                        e.attr("srcset", i);
                                        if (n) {
                                            e.attr("sizes", n)
                                        }
                                    }
                                    e.attr("src", t).animate({
                                        opacity: 1
                                    }, 200, function() {
                                        e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                    });
                                    r.$slider.trigger("lazyLoaded", [r, e, t])
                                })
                            };
                            o.onerror = function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                                r.$slider.trigger("lazyLoadError", [r, e, t])
                            };
                            o.src = t
                        })
                    }
                    if (r.options.centerMode === !0) {
                        if (r.options.infinite === !0) {
                            i = r.currentSlide + (r.options.slidesToShow / 2 + 1);
                            n = i + r.options.slidesToShow + 2
                        } else {
                            i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1));
                            n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide
                        }
                    } else {
                        i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide;
                        n = Math.ceil(i + r.options.slidesToShow);
                        if (r.options.fade === !0) {
                            if (i > 0) i--;
                            if (n <= r.slideCount) n++
                        }
                    }
                    e = r.$slider.find(".slick-slide").slice(i, n);
                    if (r.options.lazyLoad === "anticipated") {
                        var s = i - 1,
                            a = n,
                            l = r.$slider.find(".slick-slide");
                        for (var c = 0; c < r.options.slidesToScroll; c++) {
                            if (s < 0) s = r.slideCount - 1;
                            e = e.add(l.eq(s));
                            e = e.add(l.eq(a));
                            s--;
                            a++
                        }
                    }
                    o(e);
                    if (r.slideCount <= r.options.slidesToShow) {
                        t = r.$slider.find(".slick-slide");
                        o(t)
                    } else if (r.currentSlide >= r.slideCount - r.options.slidesToShow) {
                        t = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow);
                        o(t)
                    } else if (r.currentSlide === 0) {
                        t = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1);
                        o(t)
                    }
                }, s.prototype.loadSlider = function() {
                    var e = this;
                    e.setPosition();
                    e.$slideTrack.css({
                        opacity: 1
                    });
                    e.$slider.removeClass("slick-loading");
                    e.initUI();
                    if (e.options.lazyLoad === "progressive") {
                        e.progressiveLazyLoad()
                    }
                }, s.prototype.next = s.prototype.slickNext = function() {
                    var e = this;
                    e.changeSlide({
                        data: {
                            message: "next"
                        }
                    })
                }, s.prototype.orientationChange = function() {
                    var e = this;
                    e.checkResponsive();
                    e.setPosition()
                }, s.prototype.pause = s.prototype.slickPause = function() {
                    var e = this;
                    e.autoPlayClear();
                    e.paused = !0
                }, s.prototype.play = s.prototype.slickPlay = function() {
                    var e = this;
                    e.autoPlay();
                    e.options.autoplay = !0;
                    e.paused = !1;
                    e.focussed = !1;
                    e.interrupted = !1
                }, s.prototype.postSlide = function(e) {
                    var t = this;
                    if (!t.unslicked) {
                        t.$slider.trigger("afterChange", [t, e]);
                        t.animating = !1;
                        if (t.slideCount > t.options.slidesToShow) {
                            t.setPosition()
                        }
                        t.swipeLeft = null;
                        if (t.options.autoplay) {
                            t.autoPlay()
                        }
                        if (t.options.accessibility === !0) {
                            t.initADA();
                            if (t.options.focusOnChange) {
                                var i = u(t.$slides.get(t.currentSlide));
                                i.attr("tabindex", 0).focus()
                            }
                        }
                    }
                }, s.prototype.prev = s.prototype.slickPrev = function() {
                    var e = this;
                    e.changeSlide({
                        data: {
                            message: "previous"
                        }
                    })
                }, s.prototype.preventDefault = function(e) {
                    e.preventDefault()
                }, s.prototype.progressiveLazyLoad = function(e) {
                    e = e || 1;
                    var t = this,
                        i = u("img[data-lazy]", t.$slider),
                        n, o, r, s, a;
                    if (i.length) {
                        n = i.first();
                        o = n.attr("data-lazy");
                        r = n.attr("data-srcset");
                        s = n.attr("data-sizes") || t.$slider.attr("data-sizes");
                        a = document.createElement("img");
                        a.onload = function() {
                            if (r) {
                                n.attr("srcset", r);
                                if (s) {
                                    n.attr("sizes", s)
                                }
                            }
                            n.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                            if (t.options.adaptiveHeight === !0) {
                                t.setPosition()
                            }
                            t.$slider.trigger("lazyLoaded", [t, n, o]);
                            t.progressiveLazyLoad()
                        };
                        a.onerror = function() {
                            if (e < 3) {
                                setTimeout(function() {
                                    t.progressiveLazyLoad(e + 1)
                                }, 500)
                            } else {
                                n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                                t.$slider.trigger("lazyLoadError", [t, n, o]);
                                t.progressiveLazyLoad()
                            }
                        };
                        a.src = o
                    } else {
                        t.$slider.trigger("allImagesLoaded", [t])
                    }
                }, s.prototype.refresh = function(e) {
                    var t = this,
                        i, n;
                    n = t.slideCount - t.options.slidesToShow;
                    if (!t.options.infinite && t.currentSlide > n) {
                        t.currentSlide = n
                    }
                    if (t.slideCount <= t.options.slidesToShow) {
                        t.currentSlide = 0
                    }
                    i = t.currentSlide;
                    t.destroy(!0);
                    u.extend(t, t.initials, {
                        currentSlide: i
                    });
                    t.init();
                    if (!e) {
                        t.changeSlide({
                            data: {
                                message: "index",
                                index: i
                            }
                        }, !1)
                    }
                }, s.prototype.registerBreakpoints = function() {
                    var i = this,
                        e, t, n, o = i.options.responsive || null;
                    if (u.type(o) === "array" && o.length) {
                        i.respondTo = i.options.respondTo || "window";
                        for (e in o) {
                            n = i.breakpoints.length - 1;
                            if (o.hasOwnProperty(e)) {
                                t = o[e].breakpoint;
                                while (n >= 0) {
                                    if (i.breakpoints[n] && i.breakpoints[n] === t) {
                                        i.breakpoints.splice(n, 1)
                                    }
                                    n--
                                }
                                i.breakpoints.push(t);
                                i.breakpointSettings[t] = o[e].settings
                            }
                        }
                        i.breakpoints.sort(function(e, t) {
                            return i.options.mobileFirst ? e - t : t - e
                        })
                    }
                }, s.prototype.reinit = function() {
                    var e = this;
                    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide");
                    e.slideCount = e.$slides.length;
                    if (e.currentSlide >= e.slideCount && e.currentSlide !== 0) {
                        e.currentSlide = e.currentSlide - e.options.slidesToScroll
                    }
                    if (e.slideCount <= e.options.slidesToShow) {
                        e.currentSlide = 0
                    }
                    e.registerBreakpoints();
                    e.setProps();
                    e.setupInfinite();
                    e.buildArrows();
                    e.updateArrows();
                    e.initArrowEvents();
                    e.buildDots();
                    e.updateDots();
                    e.initDotEvents();
                    e.cleanUpSlideEvents();
                    e.initSlideEvents();
                    e.checkResponsive(!1, !0);
                    if (e.options.focusOnSelect === !0) {
                        u(e.$slideTrack).children().on("click.slick", e.selectHandler)
                    }
                    e.setSlideClasses(typeof e.currentSlide === "number" ? e.currentSlide : 0);
                    e.setPosition();
                    e.focusHandler();
                    e.paused = !e.options.autoplay;
                    e.autoPlay();
                    e.$slider.trigger("reInit", [e])
                }, s.prototype.resize = function() {
                    var e = this;
                    if (u(window).width() !== e.windowWidth) {
                        clearTimeout(e.windowDelay);
                        e.windowDelay = window.setTimeout(function() {
                            e.windowWidth = u(window).width();
                            e.checkResponsive();
                            if (!e.unslicked) {
                                e.setPosition()
                            }
                        }, 50)
                    }
                }, s.prototype.removeSlide = s.prototype.slickRemove = function(e, t, i) {
                    var n = this;
                    if (typeof e === "boolean") {
                        t = e;
                        e = t === !0 ? 0 : n.slideCount - 1
                    } else {
                        e = t === !0 ? --e : e
                    }
                    if (n.slideCount < 1 || e < 0 || e > n.slideCount - 1) {
                        return !1
                    }
                    n.unload();
                    if (i === !0) {
                        n.$slideTrack.children().remove()
                    } else {
                        n.$slideTrack.children(this.options.slide).eq(e).remove()
                    }
                    n.$slides = n.$slideTrack.children(this.options.slide);
                    n.$slideTrack.children(this.options.slide).detach();
                    n.$slideTrack.append(n.$slides);
                    n.$slidesCache = n.$slides;
                    n.reinit()
                }, s.prototype.setCSS = function(e) {
                    var t = this,
                        i = {},
                        n, o;
                    if (t.options.rtl === !0) {
                        e = -e
                    }
                    n = t.positionProp == "left" ? Math.ceil(e) + "px" : "0px";
                    o = t.positionProp == "top" ? Math.ceil(e) + "px" : "0px";
                    i[t.positionProp] = e;
                    if (t.transformsEnabled === !1) {
                        t.$slideTrack.css(i)
                    } else {
                        i = {};
                        if (t.cssTransitions === !1) {
                            i[t.animType] = "translate(" + n + ", " + o + ")";
                            t.$slideTrack.css(i)
                        } else {
                            i[t.animType] = "translate3d(" + n + ", " + o + ", 0px)";
                            t.$slideTrack.css(i)
                        }
                    }
                }, s.prototype.setDimensions = function() {
                    var e = this;
                    if (e.options.vertical === !1) {
                        if (e.options.centerMode === !0) {
                            e.$list.css({
                                padding: "0px " + e.options.centerPadding
                            })
                        }
                    } else {
                        e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow);
                        if (e.options.centerMode === !0) {
                            e.$list.css({
                                padding: e.options.centerPadding + " 0px"
                            })
                        }
                    }
                    e.listWidth = e.$list.width();
                    e.listHeight = e.$list.height();
                    if (e.options.vertical === !1 && e.options.variableWidth === !1) {
                        e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow);
                        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))
                    } else if (e.options.variableWidth === !0) {
                        e.$slideTrack.width(5e3 * e.slideCount)
                    } else {
                        e.slideWidth = Math.ceil(e.listWidth);
                        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length))
                    }
                    var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
                    if (e.options.variableWidth === !1) e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
                }, s.prototype.setFade = function() {
                    var i = this,
                        n;
                    i.$slides.each(function(e, t) {
                        n = i.slideWidth * e * -1;
                        if (i.options.rtl === !0) {
                            u(t).css({
                                position: "relative",
                                right: n,
                                top: 0,
                                zIndex: i.options.zIndex - 2,
                                opacity: 0
                            })
                        } else {
                            u(t).css({
                                position: "relative",
                                left: n,
                                top: 0,
                                zIndex: i.options.zIndex - 2,
                                opacity: 0
                            })
                        }
                    });
                    i.$slides.eq(i.currentSlide).css({
                        zIndex: i.options.zIndex - 1,
                        opacity: 1
                    })
                }, s.prototype.setHeight = function() {
                    var e = this;
                    if (e.options.slidesToShow === 1 && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                        e.$list.css("height", t)
                    }
                }, s.prototype.setOption = s.prototype.slickSetOption = function() {
                    var i = this,
                        e, t, n, o, r = !1,
                        s;
                    if (u.type(arguments[0]) === "object") {
                        n = arguments[0];
                        r = arguments[1];
                        s = "multiple"
                    } else if (u.type(arguments[0]) === "string") {
                        n = arguments[0];
                        o = arguments[1];
                        r = arguments[2];
                        if (arguments[0] === "responsive" && u.type(arguments[1]) === "array") {
                            s = "responsive"
                        } else if (typeof arguments[1] !== "undefined") {
                            s = "single"
                        }
                    }
                    if (s === "single") {
                        i.options[n] = o
                    } else if (s === "multiple") {
                        u.each(n, function(e, t) {
                            i.options[e] = t
                        })
                    } else if (s === "responsive") {
                        for (t in o) {
                            if (u.type(i.options.responsive) !== "array") {
                                i.options.responsive = [o[t]]
                            } else {
                                e = i.options.responsive.length - 1;
                                while (e >= 0) {
                                    if (i.options.responsive[e].breakpoint === o[t].breakpoint) {
                                        i.options.responsive.splice(e, 1)
                                    }
                                    e--
                                }
                                i.options.responsive.push(o[t])
                            }
                        }
                    }
                    if (r) {
                        i.unload();
                        i.reinit()
                    }
                }, s.prototype.setPosition = function() {
                    var e = this;
                    e.setDimensions();
                    e.setHeight();
                    if (e.options.fade === !1) {
                        e.setCSS(e.getLeft(e.currentSlide))
                    } else {
                        e.setFade()
                    }
                    e.$slider.trigger("setPosition", [e])
                }, s.prototype.setProps = function() {
                    var e = this,
                        t = document.body.style;
                    e.positionProp = e.options.vertical === !0 ? "top" : "left";
                    if (e.positionProp === "top") {
                        e.$slider.addClass("slick-vertical")
                    } else {
                        e.$slider.removeClass("slick-vertical")
                    }
                    if (t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.msTransition !== undefined) {
                        if (e.options.useCSS === !0) {
                            e.cssTransitions = !0
                        }
                    }
                    if (e.options.fade) {
                        if (typeof e.options.zIndex === "number") {
                            if (e.options.zIndex < 3) {
                                e.options.zIndex = 3
                            }
                        } else {
                            e.options.zIndex = e.defaults.zIndex
                        }
                    }
                    if (t.OTransform !== undefined) {
                        e.animType = "OTransform";
                        e.transformType = "-o-transform";
                        e.transitionType = "OTransition";
                        if (t.perspectiveProperty === undefined && t.webkitPerspective === undefined) e.animType = !1
                    }
                    if (t.MozTransform !== undefined) {
                        e.animType = "MozTransform";
                        e.transformType = "-moz-transform";
                        e.transitionType = "MozTransition";
                        if (t.perspectiveProperty === undefined && t.MozPerspective === undefined) e.animType = !1
                    }
                    if (t.webkitTransform !== undefined) {
                        e.animType = "webkitTransform";
                        e.transformType = "-webkit-transform";
                        e.transitionType = "webkitTransition";
                        if (t.perspectiveProperty === undefined && t.webkitPerspective === undefined) e.animType = !1
                    }
                    if (t.msTransform !== undefined) {
                        e.animType = "msTransform";
                        e.transformType = "-ms-transform";
                        e.transitionType = "msTransition";
                        if (t.msTransform === undefined) e.animType = !1
                    }
                    if (t.transform !== undefined && e.animType !== !1) {
                        e.animType = "transform";
                        e.transformType = "transform";
                        e.transitionType = "transition"
                    }
                    e.transformsEnabled = e.options.useTransform && (e.animType !== null && e.animType !== !1)
                }, s.prototype.setSlideClasses = function(e) {
                    var t = this,
                        i, n, o, r;
                    n = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
                    t.$slides.eq(e).addClass("slick-current");
                    if (t.options.centerMode === !0) {
                        var s = t.options.slidesToShow % 2 === 0 ? 1 : 0;
                        i = Math.floor(t.options.slidesToShow / 2);
                        if (t.options.infinite === !0) {
                            if (e >= i && e <= t.slideCount - 1 - i) {
                                t.$slides.slice(e - i + s, e + i + 1).addClass("slick-active").attr("aria-hidden", "false")
                            } else {
                                o = t.options.slidesToShow + e;
                                n.slice(o - i + 1 + s, o + i + 2).addClass("slick-active").attr("aria-hidden", "false")
                            }
                            if (e === 0) {
                                n.eq(n.length - 1 - t.options.slidesToShow).addClass("slick-center")
                            } else if (e === t.slideCount - 1) {
                                n.eq(t.options.slidesToShow).addClass("slick-center")
                            }
                        }
                        t.$slides.eq(e).addClass("slick-center")
                    } else {
                        if (e >= 0 && e <= t.slideCount - t.options.slidesToShow) {
                            t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
                        } else if (n.length <= t.options.slidesToShow) {
                            n.addClass("slick-active").attr("aria-hidden", "false")
                        } else {
                            r = t.slideCount % t.options.slidesToShow;
                            o = t.options.infinite === !0 ? t.options.slidesToShow + e : e;
                            if (t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - e < t.options.slidesToShow) {
                                n.slice(o - (t.options.slidesToShow - r), o + r).addClass("slick-active").attr("aria-hidden", "false")
                            } else {
                                n.slice(o, o + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
                            }
                        }
                    }
                    if (t.options.lazyLoad === "ondemand" || t.options.lazyLoad === "anticipated") {
                        t.lazyLoad()
                    }
                }, s.prototype.setupInfinite = function() {
                    var e = this,
                        t, i, n;
                    if (e.options.fade === !0) {
                        e.options.centerMode = !1
                    }
                    if (e.options.infinite === !0 && e.options.fade === !1) {
                        i = null;
                        if (e.slideCount > e.options.slidesToShow) {
                            if (e.options.centerMode === !0) {
                                n = e.options.slidesToShow + 1
                            } else {
                                n = e.options.slidesToShow
                            }
                            for (t = e.slideCount; t > e.slideCount - n; t -= 1) {
                                i = t - 1;
                                u(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned")
                            }
                            for (t = 0; t < n + e.slideCount; t += 1) {
                                i = t;
                                u(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned")
                            }
                            e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                                u(this).attr("id", "")
                            })
                        }
                    }
                }, s.prototype.interrupt = function(e) {
                    var t = this;
                    if (!e) {
                        t.autoPlay()
                    }
                    t.interrupted = e
                }, s.prototype.selectHandler = function(e) {
                    var t = this;
                    var i = u(e.target).is(".slick-slide") ? u(e.target) : u(e.target).parents(".slick-slide");
                    var n = parseInt(i.attr("data-slick-index"));
                    if (!n) n = 0;
                    if (t.slideCount <= t.options.slidesToShow) {
                        t.slideHandler(n, !1, !0);
                        return
                    }
                    t.slideHandler(n)
                }, s.prototype.slideHandler = function(e, t, i) {
                    var n, o, r, s, a = null,
                        l = this,
                        c;
                    t = t || !1;
                    if (l.animating === !0 && l.options.waitForAnimate === !0) {
                        return
                    }
                    if (l.options.fade === !0 && l.currentSlide === e) {
                        return
                    }
                    if (t === !1) {
                        l.asNavFor(e)
                    }
                    n = e;
                    a = l.getLeft(n);
                    s = l.getLeft(l.currentSlide);
                    l.currentLeft = l.swipeLeft === null ? s : l.swipeLeft;
                    if (l.options.infinite === !1 && l.options.centerMode === !1 && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll)) {
                        if (l.options.fade === !1) {
                            n = l.currentSlide;
                            if (i !== !0 && l.slideCount > l.options.slidesToShow) {
                                l.animateSlide(s, function() {
                                    l.postSlide(n)
                                })
                            } else {
                                l.postSlide(n)
                            }
                        }
                        return
                    } else if (l.options.infinite === !1 && l.options.centerMode === !0 && (e < 0 || e > l.slideCount - l.options.slidesToScroll)) {
                        if (l.options.fade === !1) {
                            n = l.currentSlide;
                            if (i !== !0 && l.slideCount > l.options.slidesToShow) {
                                l.animateSlide(s, function() {
                                    l.postSlide(n)
                                })
                            } else {
                                l.postSlide(n)
                            }
                        }
                        return
                    }
                    if (l.options.autoplay) {
                        clearInterval(l.autoPlayTimer)
                    }
                    if (n < 0) {
                        if (l.slideCount % l.options.slidesToScroll !== 0) {
                            o = l.slideCount - l.slideCount % l.options.slidesToScroll
                        } else {
                            o = l.slideCount + n
                        }
                    } else if (n >= l.slideCount) {
                        if (l.slideCount % l.options.slidesToScroll !== 0) {
                            o = 0
                        } else {
                            o = n - l.slideCount
                        }
                    } else {
                        o = n
                    }
                    l.animating = !0;
                    l.$slider.trigger("beforeChange", [l, l.currentSlide, o]);
                    r = l.currentSlide;
                    l.currentSlide = o;
                    l.setSlideClasses(l.currentSlide);
                    if (l.options.asNavFor) {
                        c = l.getNavTarget();
                        c = c.slick("getSlick");
                        if (c.slideCount <= c.options.slidesToShow) {
                            c.setSlideClasses(l.currentSlide)
                        }
                    }
                    l.updateDots();
                    l.updateArrows();
                    if (l.options.fade === !0) {
                        if (i !== !0) {
                            l.fadeSlideOut(r);
                            l.fadeSlide(o, function() {
                                l.postSlide(o)
                            })
                        } else {
                            l.postSlide(o)
                        }
                        l.animateHeight();
                        return
                    }
                    if (i !== !0 && l.slideCount > l.options.slidesToShow) {
                        l.animateSlide(a, function() {
                            l.postSlide(o)
                        })
                    } else {
                        l.postSlide(o)
                    }
                }, s.prototype.startLoad = function() {
                    var e = this;
                    if (e.options.arrows === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$prevArrow.hide();
                        e.$nextArrow.hide()
                    }
                    if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
                        e.$dots.hide()
                    }
                    e.$slider.addClass("slick-loading")
                }, s.prototype.swipeDirection = function() {
                    var e, t, i, n, o = this;
                    e = o.touchObject.startX - o.touchObject.curX;
                    t = o.touchObject.startY - o.touchObject.curY;
                    i = Math.atan2(t, e);
                    n = Math.round(i * 180 / Math.PI);
                    if (n < 0) {
                        n = 360 - Math.abs(n)
                    }
                    if (n <= 45 && n >= 0) {
                        return o.options.rtl === !1 ? "left" : "right"
                    }
                    if (n <= 360 && n >= 315) {
                        return o.options.rtl === !1 ? "left" : "right"
                    }
                    if (n >= 135 && n <= 225) {
                        return o.options.rtl === !1 ? "right" : "left"
                    }
                    if (o.options.verticalSwiping === !0) {
                        if (n >= 35 && n <= 135) {
                            return "down"
                        } else {
                            return "up"
                        }
                    }
                    return "vertical"
                }, s.prototype.swipeEnd = function(e) {
                    var t = this,
                        i, n;
                    t.dragging = !1;
                    t.swiping = !1;
                    if (t.scrolling) {
                        t.scrolling = !1;
                        return !1
                    }
                    t.interrupted = !1;
                    t.shouldClick = t.touchObject.swipeLength > 10 ? false : !0;
                    if (t.touchObject.curX === undefined) {
                        return !1
                    }
                    if (t.touchObject.edgeHit === !0) {
                        t.$slider.trigger("edge", [t, t.swipeDirection()])
                    }
                    if (t.touchObject.swipeLength >= t.touchObject.minSwipe) {
                        n = t.swipeDirection();
                        switch (n) {
                            case "left":
                            case "down":
                                i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount();
                                t.currentDirection = 0;
                                break;
                            case "right":
                            case "up":
                                i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount();
                                t.currentDirection = 1;
                                break;
                            default:
                        }
                        if (n != "vertical") {
                            t.slideHandler(i);
                            t.touchObject = {};
                            t.$slider.trigger("swipe", [t, n])
                        }
                    } else {
                        if (t.touchObject.startX !== t.touchObject.curX) {
                            t.slideHandler(t.currentSlide);
                            t.touchObject = {}
                        }
                    }
                }, s.prototype.swipeHandler = function(e) {
                    var t = this;
                    if (t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1) {
                        return
                    } else if (t.options.draggable === !1 && e.type.indexOf("mouse") !== -1) {
                        return
                    }
                    t.touchObject.fingerCount = e.originalEvent && e.originalEvent.touches !== undefined ? e.originalEvent.touches.length : 1;
                    t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
                    if (t.options.verticalSwiping === !0) {
                        t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold
                    }
                    switch (e.data.action) {
                        case "start":
                            t.swipeStart(e);
                            break;
                        case "move":
                            t.swipeMove(e);
                            break;
                        case "end":
                            t.swipeEnd(e);
                            break
                    }
                }, s.prototype.swipeMove = function(e) {
                    var t = this,
                        i = !1,
                        n, o, r, s, a, l;
                    a = e.originalEvent !== undefined ? e.originalEvent.touches : null;
                    if (!t.dragging || t.scrolling || a && a.length !== 1) {
                        return !1
                    }
                    n = t.getLeft(t.currentSlide);
                    t.touchObject.curX = a !== undefined ? a[0].pageX : e.clientX;
                    t.touchObject.curY = a !== undefined ? a[0].pageY : e.clientY;
                    t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2)));
                    l = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)));
                    if (!t.options.verticalSwiping && !t.swiping && l > 4) {
                        t.scrolling = !0;
                        return !1
                    }
                    if (t.options.verticalSwiping === !0) {
                        t.touchObject.swipeLength = l
                    }
                    o = t.swipeDirection();
                    if (e.originalEvent !== undefined && t.touchObject.swipeLength > 4) {
                        t.swiping = !0;
                        e.preventDefault()
                    }
                    s = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1);
                    if (t.options.verticalSwiping === !0) {
                        s = t.touchObject.curY > t.touchObject.startY ? 1 : -1
                    }
                    r = t.touchObject.swipeLength;
                    t.touchObject.edgeHit = !1;
                    if (t.options.infinite === !1) {
                        if (t.currentSlide === 0 && o === "right" || t.currentSlide >= t.getDotCount() && o === "left") {
                            r = t.touchObject.swipeLength * t.options.edgeFriction;
                            t.touchObject.edgeHit = !0
                        }
                    }
                    if (t.options.vertical === !1) {
                        t.swipeLeft = n + r * s
                    } else {
                        t.swipeLeft = n + r * (t.$list.height() / t.listWidth) * s
                    }
                    if (t.options.verticalSwiping === !0) {
                        t.swipeLeft = n + r * s
                    }
                    if (t.options.fade === !0 || t.options.touchMove === !1) {
                        return !1
                    }
                    if (t.animating === !0) {
                        t.swipeLeft = null;
                        return !1
                    }
                    t.setCSS(t.swipeLeft)
                }, s.prototype.swipeStart = function(e) {
                    var t = this,
                        i;
                    t.interrupted = !0;
                    if (t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) {
                        t.touchObject = {};
                        return !1
                    }
                    if (e.originalEvent !== undefined && e.originalEvent.touches !== undefined) {
                        i = e.originalEvent.touches[0]
                    }
                    t.touchObject.startX = t.touchObject.curX = i !== undefined ? i.pageX : e.clientX;
                    t.touchObject.startY = t.touchObject.curY = i !== undefined ? i.pageY : e.clientY;
                    t.dragging = !0
                }, s.prototype.unfilterSlides = s.prototype.slickUnfilter = function() {
                    var e = this;
                    if (e.$slidesCache !== null) {
                        e.unload();
                        e.$slideTrack.children(this.options.slide).detach();
                        e.$slidesCache.appendTo(e.$slideTrack);
                        e.reinit()
                    }
                }, s.prototype.unload = function() {
                    var e = this;
                    u(".slick-cloned", e.$slider).remove();
                    if (e.$dots) {
                        e.$dots.remove()
                    }
                    if (e.$prevArrow && e.htmlExpr.test(e.options.prevArrow)) {
                        e.$prevArrow.remove()
                    }
                    if (e.$nextArrow && e.htmlExpr.test(e.options.nextArrow)) {
                        e.$nextArrow.remove()
                    }
                    e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
                }, s.prototype.unslick = function(e) {
                    var t = this;
                    t.$slider.trigger("unslick", [t, e]);
                    t.destroy()
                }, s.prototype.updateArrows = function() {
                    var e = this,
                        t;
                    t = Math.floor(e.options.slidesToShow / 2);
                    if (e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite) {
                        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                        if (e.currentSlide === 0) {
                            e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                            e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
                        } else if (e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1) {
                            e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                            e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
                        } else if (e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0) {
                            e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                            e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
                        }
                    }
                }, s.prototype.updateDots = function() {
                    var e = this;
                    if (e.$dots !== null) {
                        e.$dots.find("li").removeClass("slick-active").end();
                        e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active")
                    }
                }, s.prototype.visibility = function() {
                    var e = this;
                    if (e.options.autoplay) {
                        if (document[e.hidden]) {
                            e.interrupted = !0
                        } else {
                            e.interrupted = !1
                        }
                    }
                }, u.fn.slick = function() {
                    var e = this,
                        t = arguments[0],
                        i = Array.prototype.slice.call(arguments, 1),
                        n = e.length,
                        o, r;
                    for (o = 0; o < n; o++) {
                        if (typeof t == "object" || typeof t == "undefined") e[o].slick = new s(e[o], t);
                        else r = e[o].slick[t].apply(e[o].slick, i);
                        if (typeof r != "undefined") return r
                    }
                    return e
                }
            }) ? n.apply(t, o) : n) || (e.exports = r)
        }()
    },
    99: function(e, t, i) {
        e.exports = {
            "slick-slider": "slick-slider",
            "slick-list": "slick-list",
            dragging: "dragging",
            "slick-track": "slick-track",
            "slick-loading": "slick-loading",
            "slick-slide": "slick-slide",
            "slick-initialized": "slick-initialized",
            "slick-vertical": "slick-vertical",
            "slick-arrow": "slick-arrow",
            "slick-hidden": "slick-hidden"
        }
    }
})