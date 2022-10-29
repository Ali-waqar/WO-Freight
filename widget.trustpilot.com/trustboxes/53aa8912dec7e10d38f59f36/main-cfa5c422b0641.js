(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function(require, module, exports) {
        'use strict';

        var _slider = require('@trustpilot/trustbox-framework-vanilla/modules/slider');

        var _impression = require('@trustpilot/trustbox-framework-vanilla/modules/impression');

        var _impression2 = _interopRequireDefault(_impression);

        var _api = require('@trustpilot/trustbox-framework-vanilla/modules/api');

        var _dom = require('@trustpilot/trustbox-framework-vanilla/modules/dom');

        var _utils = require('@trustpilot/trustbox-framework-vanilla/modules/utils');

        var _queryString = require('@trustpilot/trustbox-framework-vanilla/modules/queryString');

        var _reviews = require('@trustpilot/trustbox-framework-vanilla/modules/templates/reviews');

        var _reviews2 = _interopRequireDefault(_reviews);

        var _stars = require('@trustpilot/trustbox-framework-vanilla/modules/templates/stars');

        var _logo = require('@trustpilot/trustbox-framework-vanilla/modules/templates/logo');

        var _templating = require('@trustpilot/trustbox-framework-vanilla/modules/templating');

        var _summary = require('@trustpilot/trustbox-framework-vanilla/modules/templates/summary');

        var _reviewFilterText = require('@trustpilot/trustbox-framework-vanilla/modules/reviewFilterText');

        var _reviewFilterText2 = _interopRequireDefault(_reviewFilterText);

        var _styleFirstVisibleReview = require('./styleFirstVisibleReview');

        var _styleFirstVisibleReview2 = _interopRequireDefault(_styleFirstVisibleReview);

        var _init = require('@trustpilot/trustbox-framework-vanilla/modules/init');

        var _init2 = _interopRequireDefault(_init);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        _impression2.default.attachImpressionHandler();

        var mkTracking = function mkTracking(source) {
            return function() {
                return _impression2.default.engagement({
                    source: source
                });
            };
        };

        var addUtm = (0, _utils.addUtmParams)('Carousel');

        var _getQueryString = (0, _queryString.getAsObject)(),
            businessUnitId = _getQueryString.businessunitId,
            locale = _getQueryString.locale,
            _getQueryString$theme = _getQueryString.theme,
            theme = _getQueryString$theme === undefined ? 'light' : _getQueryString$theme,
            reviewLanguages = _getQueryString.reviewLanguages,
            reviewStars = _getQueryString.stars,
            reviewTagValue = _getQueryString.tags,
            location = _getQueryString.location,
            templateId = _getQueryString.templateId,
            fontFamily = _getQueryString.fontFamily,
            textColor = _getQueryString.textColor;

        var populateEmptySummary = function populateEmptySummary(_ref) {
            var translations = _ref.baseData.translations,
                url = _ref.url;

            var widgetContentElement = document.getElementById('tp-widget-wrapper');
            var options = {
                title: translations.noreviews,
                subtitle: translations.firstreviewer,
                url: url
            };
            var emptySummary = (0, _summary.makeEmptySummary)(options);
            (0, _utils.setHtmlContent)(widgetContentElement, emptySummary, false);
        };

        var populateSummary = function populateSummary(_ref2) {
            var locale = _ref2.locale,
                baseData = _ref2.baseData;

            var scoreElem = document.getElementById('trust-score');
            var basedOn = document.getElementById('translations-basedon');
            var profilelink = document.getElementById('profileLink');
            var numberOfReviews = baseData.businessEntity.numberOfReviews,
                profileUrl = baseData.links.profileUrl,
                starsString = baseData.starsString,
                translations = baseData.translations;


            var totalReviews = numberOfReviews.total;

            (0, _stars.populateStars)(baseData, 'tp-widget-stars');
            (0, _logo.populateLogo)(profilelink);

            (0, _dom.populateElements)([{
                element: scoreElem,
                string: starsString
            }, {
                element: basedOn,
                string: translations.basedon,
                substitutions: {
                    '[NOREVIEWS]': (0, _utils.insertNumberSeparator)(totalReviews, locale)
                }
            }]);

            var utmLink = addUtm(profileUrl);
            profilelink.href = utmLink;

            var linkElement = document.querySelector('#translations-basedon a');
            if (linkElement) {
                linkElement.href = utmLink;
            }

            (0, _utils.addEventListener)(profilelink, 'click', mkTracking('LogoClick'));

            if (baseData.reviews && baseData.reviews.length > 0) {
                var reviewsFilterText = (0, _reviewFilterText2.default)(locale, reviewStars, reviewTagValue);
                var reviewsFilterTextElement = document.getElementById('tp-widget-reviews-filter-label');
                (0, _utils.setTextContent)(reviewsFilterTextElement, reviewsFilterText);
            }
        };

        var populateSlider = function populateSlider(_ref3) {
            var locale = _ref3.locale,
                reviews = _ref3.reviews;

            var sliderElements = {
                slider: document.getElementById('tp-widget-reviews'),
                sliderContainer: document.getElementById('tp-widget-reviews-wrapper')
            };
            var sliderArrows = {
                prevArrow: document.getElementById('review-arrow-left'),
                nextArrow: document.getElementById('review-arrow-right')
            };
            var templateOptions = {
                reviewLinkGenerator: function reviewLinkGenerator(review) {
                    return addUtm(review.reviewUrl);
                },
                textLength: 80
            };
            var template = (0, _reviews2.default)(locale.toLowerCase(), templateOptions);
            var svgSliderArrows = [].slice.call(document.getElementsByClassName('svg-slider-arrow'));
            svgSliderArrows.forEach(function(item) {
                return (0, _dom.populateElements)([{
                    element: item,
                    string: (0, _templating.mkElemWithSvgLookup)('arrowSlider')
                }, {
                    element: item,
                    string: (0, _templating.mkElemWithSvgLookup)('arrowSlider')
                }]);
            });

            var callbacks = {
                prevPage: mkTracking('Prev'),
                nextPage: mkTracking('Next')
            };
            var breakpoints = [{
                minWidth: 1250,
                reviewsForWidth: 4
            }, {
                minWidth: 1000,
                reviewsForWidth: 3
            }, {
                minWidth: 750,
                reviewsForWidth: 2
            }, {
                minWidth: 0,
                reviewsForWidth: 1
            }];

            var sliderHandler = new _slider.ReviewSlider(reviews, sliderElements, template, {
                reviewClass: 'tp-widget-review',
                reviewsPerPage: breakpoints
            });

            var sliderControls = new _slider.ArrowControls(sliderHandler, sliderArrows, {
                callbacks: callbacks,
                disabledClass: 'display-none'
            });
            sliderControls.initialize();

            var styleFirstReview = new _styleFirstVisibleReview2.default(sliderHandler, sliderElements.slider);
            styleFirstReview.initialize();
        };

        var applyCustomStyling = function applyCustomStyling() {
            if (fontFamily) {
                (0, _utils.setFont)(fontFamily);
            }
            if (textColor) {
                (0, _utils.setTextColor)(textColor);
            }
        };

        var constructTrustBox = function constructTrustBox(_ref4) {
            var baseData = _ref4.baseData,
                locale = _ref4.locale;

            if (baseData.settings.customStylesAllowed) {
                applyCustomStyling();
            }

            if (baseData.businessEntity.numberOfReviews.total === 0) {
                populateEmptySummary({
                    baseData: baseData,
                    url: addUtm(baseData.links.evaluateUrl)
                });
            } else {
                populateSummary({
                    baseData: baseData,
                    locale: locale
                });

                if (baseData.reviews && baseData.reviews.length > 0) {
                    populateSlider({
                        locale: locale,
                        reviews: baseData.reviews
                    });
                }
            }
        };

        var fetchParams = {
            businessUnitId: businessUnitId,
            locale: locale,
            reviewLanguages: reviewLanguages,
            reviewStars: reviewStars,
            reviewTagValue: reviewTagValue,
            includeReviews: true,
            reviewsPerPage: 15,
            theme: theme,
            location: location
        };

        (0, _init2.default)(function() {
            return (0, _api.fetchServiceReviewData)(templateId)(fetchParams, constructTrustBox);
        });

    }, {
        "./styleFirstVisibleReview": 2,
        "@trustpilot/trustbox-framework-vanilla/modules/api": 31,
        "@trustpilot/trustbox-framework-vanilla/modules/dom": 38,
        "@trustpilot/trustbox-framework-vanilla/modules/impression": 40,
        "@trustpilot/trustbox-framework-vanilla/modules/init": 41,
        "@trustpilot/trustbox-framework-vanilla/modules/queryString": 43,
        "@trustpilot/trustbox-framework-vanilla/modules/reviewFilterText": 44,
        "@trustpilot/trustbox-framework-vanilla/modules/slider": 48,
        "@trustpilot/trustbox-framework-vanilla/modules/templates/logo": 54,
        "@trustpilot/trustbox-framework-vanilla/modules/templates/reviews": 55,
        "@trustpilot/trustbox-framework-vanilla/modules/templates/stars": 56,
        "@trustpilot/trustbox-framework-vanilla/modules/templates/summary": 57,
        "@trustpilot/trustbox-framework-vanilla/modules/templating": 58,
        "@trustpilot/trustbox-framework-vanilla/modules/utils": 63
    }],
    2: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        /**
         * Updates the styling of the first visible review in the widget when the widget updates.
         * When the widget height is below 140px, the text in the first visible review should be limited to
         * a single line only in order to make space for the disclaimer text.
         */
        var StyleFirstVisibleReview = function() {
            /**
             * Create a StyleFirstVisibleReview instance.
             *
             * @param {ReviewSlider} slider - The ReviewSlider to which to attach the styling.
             * @param {Object} sliderDomElement - DOM element for slider.
             */
            function StyleFirstVisibleReview(slider, sliderDomElement) {
                _classCallCheck(this, StyleFirstVisibleReview);

                this.slider = slider;
                this.sliderDomElement = sliderDomElement;
            }

            _createClass(StyleFirstVisibleReview, [{
                key: 'initialize',
                value: function initialize() {
                    this.slider.attachObserver(this);
                    this.slider.initialize();
                    this.onUpdate();
                }
            }, {
                key: 'onUpdate',
                value: function onUpdate() {
                    try {
                        var widgetHeight = this.sliderDomElement.closest('html').clientHeight;
                        if (widgetHeight < 140) {
                            var firstVisibleReviewIndex = this.slider.getFirstVisibleReviewIndex();
                            var invisibleReviewsWithTextSpanningOneLine = this.sliderDomElement.querySelectorAll('.text-single-line');

                            this.makeFirstVisibleReviewTextSpanOneLine(firstVisibleReviewIndex);
                            this.makeAllReviewsExceptFirstVisibleSpanTwoLines(invisibleReviewsWithTextSpanningOneLine);
                        }
                    } catch (err) {
                        // do nothing
                    }
                }
            }, {
                key: 'makeFirstVisibleReviewTextSpanOneLine',
                value: function makeFirstVisibleReviewTextSpanOneLine(firstVisibleReviewIndex) {
                    var textElementOfFirstVisibleReview = this.sliderDomElement.childNodes[firstVisibleReviewIndex].querySelector('.text');
                    textElementOfFirstVisibleReview.classList.add('text-single-line');
                }
            }, {
                key: 'makeAllReviewsExceptFirstVisibleSpanTwoLines',
                value: function makeAllReviewsExceptFirstVisibleSpanTwoLines(invisibleReviewsWithTextSpanningOneLine) {
                    setTimeout(function() {
                        invisibleReviewsWithTextSpanningOneLine.forEach(function(reviewTextElement) {
                            reviewTextElement.classList.remove('text-single-line');
                        });
                    }, 1000); // doing this in a timeout because otherwise you will visually see the switch from one to two lines as you scroll
                }
            }, {
                key: 'onPageChange',
                value: function onPageChange() {
                    this.onUpdate();
                }
            }, {
                key: 'onResize',
                value: function onResize() {
                    this.onUpdate();
                }
            }]);

            return StyleFirstVisibleReview;
        }();

        exports.default = StyleFirstVisibleReview;

    }, {}],
    38: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.populateElements = /* common-shake removed: exports.hasClass = */ exports.removeClass = exports.addClass = undefined;

        var _utils = require('./utils');

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        var hasClass = function hasClass(elem, className) {
            if (elem) {
                var elemClassList = elem.getAttribute('class');
                var classNames = elemClassList ? elemClassList.split(' ') : '';
                return classNames.indexOf(className) !== -1;
            }
            return false;
        };

        var addClass = function addClass(elem, forAddition) {
            if (elem) {
                var elemClassList = elem.getAttribute('class');
                var classNames = elemClassList ? elemClassList.split(' ') : [];

                if (!hasClass(elem, forAddition)) {
                    var newClasses = [].concat(_toConsumableArray(classNames), [forAddition]).join(' ');
                    elem.setAttribute('class', newClasses);
                }
            }
        };

        var removeClass = function removeClass(elem, forRemoval) {
            if (elem) {
                var classNames = elem.className.split(' ');
                elem.className = classNames.filter(function(name) {
                    return name !== forRemoval;
                }).join(' ');
            }
        };

        /**
         * Populates a series of elements with HTML content.
         *
         * For each object in a list, either a given string value is used to populate
         * the given element (including optional substitutions); or, where no string
         * value is provided, remove the given element.
         */
        var populateElements = function populateElements(elements) {
            elements.forEach(function(_ref) {
                var element = _ref.element,
                    string = _ref.string,
                    _ref$substitutions = _ref.substitutions,
                    substitutions = _ref$substitutions === undefined ? {} : _ref$substitutions;

                if (string) {
                    (0, _utils.setHtmlContent)(element, (0, _utils.makeTranslations)(substitutions, string), false);
                } else {
                    (0, _utils.removeElement)(element);
                }
            });
        };

        exports.addClass = addClass;
        exports.removeClass = removeClass;
        /* common-shake removed: exports.hasClass = */
        void hasClass;
        exports.populateElements = populateElements;

    }, {
        "./utils": 63
    }],
    40: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _queryString3 = require('./queryString');

        var _utils = require('./utils');

        var _rootUri = require('./rootUri');

        var _rootUri2 = _interopRequireDefault(_rootUri);

        var _xhr = require('./xhr');

        var _xhr2 = _interopRequireDefault(_xhr);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }

        function setCookie(cname, cvalue, expires) {
            var path = 'path=/';
            var domain = 'domain=' + window.location.hostname.replace(/^.*\.([^.]+\.[^.]+)/, '$1');
            var samesite = 'samesite=none';
            var secure = 'secure';
            document.cookie = [cname + '=' + cvalue, path, expires, domain, samesite, secure].join('; ');
            document.cookie = [cname + '-legacy=' + cvalue, path, expires, domain].join('; ');
        }

        function makeTrackingUrl(eventName, impressionData) {
            // Destructure the impressionData and query params so that we only pass the
            // desired values for constructing the tracking URL.
            var userId = impressionData.anonymousId,
                _ = impressionData.sessionExpiry,
                impressionParams = _objectWithoutProperties(impressionData, ['anonymousId', 'sessionExpiry']);

            var _queryString = (0, _queryString3.getAsObject)(),
                businessUnitId = _queryString.businessunitId,
                widgetId = _queryString.templateId,
                widgetSettings = _objectWithoutProperties(_queryString, ['businessunitId', 'templateId']);

            var urlParams = _extends({}, widgetSettings, impressionParams, widgetSettings.group && userId ? {
                userId: userId
            } : {
                nosettings: 1
            }, {
                businessUnitId: businessUnitId,
                widgetId: widgetId
            });
            var urlParamsString = Object.keys(urlParams).map(function(property) {
                return property + '=' + encodeURIComponent(urlParams[property]);
            }).join('&');
            return (0, _rootUri2.default)() + '/stats/' + eventName + '?' + urlParamsString;
        }

        function setTrackingCookies(eventName, _ref) {
            var session = _ref.session,
                testId = _ref.testId,
                sessionExpiry = _ref.sessionExpiry;

            var _queryString2 = (0, _queryString3.getAsObject)(),
                group = _queryString2.group,
                businessUnitId = _queryString2.businessunitId;

            if (!group) {
                return;
            }

            if (!testId || !session) {
                // eslint-disable-next-line
                console.warn('TrustBox Optimizer test group detected but no running test settings found!');
            }

            if (sessionExpiry) {
                var settings = {
                    group: group,
                    session: session,
                    testId: testId
                };
                setCookie('TrustboxSplitTest_' + businessUnitId, encodeURIComponent(JSON.stringify(settings)), sessionExpiry);
            }
        }

        function trackEventRequest(eventName, impressionData) {
            setTrackingCookies(eventName, impressionData);
            var url = makeTrackingUrl(eventName, impressionData);
            try {
                (0, _xhr2.default)({
                    url: url
                });
            } catch (e) {
                // do nothing
            }
        }

        var trackImpression = function trackImpression(data) {
            trackEventRequest('TrustboxImpression', data);
        };

        var trackView = function trackView(data) {
            trackEventRequest('TrustboxView', data);
        };

        var trackEngagement = function trackEngagement(data) {
            trackEventRequest('TrustboxEngagement', data);
        };

        var id = null;

        var attachImpressionHandler = function attachImpressionHandler() {
            (0, _utils.addEventListener)(window, 'message', function(event) {
                if (typeof event.data !== 'string') {
                    return;
                }

                var e = void 0;
                try {
                    e = {
                        data: JSON.parse(event.data)
                    };
                } catch (e) {
                    // probably not for us
                    return;
                }

                if (e.data.command === 'setId') {
                    id = e.data.widgetId;
                    window.parent.postMessage(JSON.stringify({
                        command: 'impression',
                        widgetId: id
                    }), '*');
                    return;
                }

                if (e.data.command === 'impression-received') {
                    delete e.data.command;
                    trackImpression(e.data);
                }

                if (e.data.command === 'trustbox-in-viewport') {
                    delete e.data.command;
                    trackView(e.data);
                }
            });
        };

        var tracking = {
            engagement: trackEngagement,
            attachImpressionHandler: attachImpressionHandler
        };

        exports.default = tracking;

    }, {
        "./queryString": 43,
        "./rootUri": 45,
        "./utils": 63,
        "./xhr": 64
    }],
    43: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getAsObject = /* common-shake removed: exports.getQueryParams = */ undefined;

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        var _fn = require('./fn');

        /**
         * Convert a parameter string to an object.
         */
        function paramsToObject(paramString) {
            var tokens = ['?', '#'];
            var dropFirstIfToken = function dropFirstIfToken(str) {
                return tokens.indexOf(str[0]) !== -1 ? str.substring(1) : str;
            };
            var toPairs = function toPairs(str) {
                return str.split('&').filter(Boolean).map(function(pairString) {
                    var _pairString$split = pairString.split('='),
                        _pairString$split2 = _slicedToArray(_pairString$split, 2),
                        key = _pairString$split2[0],
                        value = _pairString$split2[1];

                    try {
                        var dKey = decodeURIComponent(key);
                        var dValue = decodeURIComponent(value);
                        return [dKey, dValue];
                    } catch (e) {}
                }).filter(Boolean);
            };
            var mkObject = (0, _fn.compose)(_fn.pairsToObject, toPairs, dropFirstIfToken);
            return mkObject(paramString);
        }

        /**
         * Get all params from the TrustBox's URL.
         *
         * The only query parameters required to run the initial load of a TrustBox are
         * businessUnitId and templateId. The rest are only used within the TrustBox to
         * make the data call(s) and set options. These are passed as part of the hash
         * to ensure that we can properly utilise browser caching.
         *
         * Note: this only captures single occurences of values in the URL.
         *
         * @param {Location} location - A location object for which to get query params.
         * @return {Object} - All query params for the given location.
         */
        function getQueryParams() {
            var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location;

            var queryParams = paramsToObject(location.search);
            var hashParams = paramsToObject(location.hash);
            return _extends({}, queryParams, hashParams);
        }

        /* common-shake removed: exports.getQueryParams = */
        void getQueryParams;
        exports.getAsObject = getQueryParams;

    }, {
        "./fn": 39
    }],
    63: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.sortAttributeRatings = */
        exports.showTrustBox = /* common-shake removed: exports.setWidgetAlignment = */ exports.setTextContent = exports.setTextColor = /* common-shake removed: exports.setPopupAlignment = */ exports.setFont = /* common-shake removed: exports.setHtmlLanguage = */ exports.setHtmlContent = /* common-shake removed: exports.setBorderColor = */ exports.sanitizeHtml = exports.sanitizeColor = exports.removeElement = /* common-shake removed: exports.regulateFollowForLocation = */ /* common-shake removed: exports.range = */ exports.makeTranslations = exports.handlePopoverPosition = exports.insertNumberSeparator = /* common-shake removed: exports.injectWidgetLinks = */ exports.getOnPageReady = exports.addUtmParams = exports.addEventListener = undefined;

        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }(); /* eslint-disable no-console */


        var _dom = require('./dom');

        var _styleAlignmentPositions = require('./models/styleAlignmentPositions');

        var _rootUri = require('./rootUri');

        var _rootUri2 = _interopRequireDefault(_rootUri);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        function addEventListener(element, type, listener) {
            if (element) {
                if (element.addEventListener) {
                    element.addEventListener(type, listener);
                } else {
                    element.attachEvent('on' + type, function(e) {
                        e = e || window.event;
                        e.preventDefault = e.preventDefault || function() {
                            e.returnValue = false;
                        };
                        e.stopPropagation = e.stopPropagation || function() {
                            e.cancelBubble = true;
                        };
                        listener.call(element, e);
                    });
                }
            }
        }

        function getOnPageReady() {
            return new Promise(function(resolve) {
                var resolveWithTimeout = function resolveWithTimeout() {
                    setTimeout(function() {
                        resolve();
                    }, 0);
                };
                if (document.readyState === 'complete') {
                    resolveWithTimeout();
                } else {
                    addEventListener(window, 'load', function() {
                        resolveWithTimeout();
                    });
                }
            });
        }

        function insertNumberSeparator(input, locale) {
            try {
                input.toLocaleString();
            } catch (e) {
                return input;
            }
            return input.toLocaleString(locale || 'en-US');
        }

        function setTextContent(element, content) {
            if (!element) {
                console.log('Attempting to set content on missing element');
            } else if ('innerText' in element) {
                // IE8
                element.innerText = content;
            } else {
                element.textContent = content;
            }
        }

        var sanitizeHtml = function sanitizeHtml(string) {
            if (typeof string !== 'string') {
                return string;
            }
            // TODO: Get rid of <a> tags in translations
            // Remove html tags, except <p> <b> <i> <li> <ul> <a> <strong>
            // Breakdown:
            //  (<\/?(?:p|b|i|li|ul|a|strong)\/?>) — 1st capturing group, selects allowed tags (opening and closing)
            //  (?:<\/?.*?\/?>) — non-capturing group (?:), matches all html tags
            //  $1 — keep matches from 1st capturing group as is, matches from non-capturing group will be omitted
            //  /gi — global (matches all occurrences) and case-insensitive
            // Test: https://regex101.com/r/cDa8jr/1
            return string.replace(/(<\/?(?:p|b|i|li|ul|a|strong)\/?>)|(?:<\/?.*?\/?>)/gi, '$1');
        };

        /**
         * Safely sets innerHTML to DOM element. Always use it instead of setting .innerHTML directly on element.
         * Sanitizes HTML by default. Use sanitize flag to control this behaviour.
         *
         * @param element
         * @param content
         * @param sanitize
         */
        function setHtmlContent(element, content) {
            var sanitize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (!element) {
                console.warn('Attempting to set HTML content on missing element');
            } else {
                element.innerHTML = sanitize ? sanitizeHtml(content) : content;
            }
        }

        /**
         * Helper function, check if the
         * @param alignment
         * @returns `true` if the supplied value is left or right, false otherwise
         */

        var isValidAlignment = function isValidAlignment(alignment) {
            return _styleAlignmentPositions.styleAlignmentPositions.includes(alignment);
        };

        /**
         * Set widget alignment, allowed values are `left` and `right`
         *
         * @param elementId
         * @param alignment
         */
        var setWidgetAlignment = function setWidgetAlignment(elementId, alignment) {
            if (!elementId) {
                console.warn('Trustpilot: cannot find stars wrapper element, please contact support!');
                return;
            }

            if (!alignment) {
                console.warn('Trustpilot: cannot apply widget alignment, please contact support!');
                return;
            }

            var isAlignmentValid = isValidAlignment(alignment);
            console.log('isAlignmentValid: ', isAlignmentValid);

            if (!isAlignmentValid) {
                console.warn('Trustpilot: ' + alignment + ' is not a valid widget alignment value, please contact support!');
                return;
            }

            var wapperElement = document.getElementById(elementId);

            if (!wapperElement) {
                console.error("Trustpilot: couldn't find the stars wrapper element, please contact support!");
                return;
            }

            // Note: Element's Id and Class Name are the same
            wapperElement.classList.add(elementId + '--' + alignment);
        };

        /**
         * Set popup alignment, allowed values are left and right
         * @param {string} alignment
         * @returns set the position of the popup of the Product Mini and Product Mini Imported widgets to `left` or `right`, as provided by the html data- field
         */

        var setPopupAlignment = function setPopupAlignment(alignment) {
            if (!alignment) {
                console.warn('Trustpilot: cannot apply widget alignment, please contact support!');
                return;
            }

            var isAlignmentValid = isValidAlignment(alignment);

            if (!isAlignmentValid) {
                console.warn('Trustpilot: ' + alignment + ' is not a valid value for style alignment, please contact support!');
                return;
            }

            // Note: Element's Id and class name have the same value
            var widgetPopupWrapperElement = document.getElementById('tp-widget-wrapper');
            if (!widgetPopupWrapperElement) {
                console.error('Trustpilot: widget popup is not found, please contact support!');
                return;
            }

            var popupStyleAlignment = 'tp-widget-wrapper--' + alignment;
            widgetPopupWrapperElement.classList.add(popupStyleAlignment);
        };

        function makeTranslations(translations, string) {
            if (!string) {
                console.log('Missing translation string');
                return '';
            }
            return Object.keys(translations).reduce(function(result, key) {
                return result.split(key).join(translations[key]);
            }, string);
        }

        function removeElement(element) {
            if (!element || !element.parentNode) {
                console.log('Attempting to remove a non-existing element');
                return;
            }
            return element.parentNode.removeChild(element);
        }

        var showTrustBox = function showTrustBox(theme, hasReviews) {
            var body = document.getElementsByTagName('body')[0];
            var wrapper = document.getElementById('tp-widget-wrapper');

            (0, _dom.addClass)(body, theme);
            (0, _dom.addClass)(wrapper, 'visible');

            if (!hasReviews) {
                (0, _dom.addClass)(body, 'first-reviewer');
            }
        };

        // url can already have query params in it
        var verifyQueryParamSeparator = function verifyQueryParamSeparator(url) {
            return '' + url + (url.indexOf('?') === -1 ? '?' : '&');
        };

        var addUtmParams = function addUtmParams(trustBoxName) {
            return function(url) {
                return verifyQueryParamSeparator(url) + 'utm_medium=trustbox&utm_source=' + trustBoxName;
            };
        };

        var regulateFollowForLocation = function regulateFollowForLocation(location) {
            return function(element) {
                if (location && element) {
                    element.rel = 'nofollow';
                }
            };
        };

        var injectWidgetLinks = function injectWidgetLinks(baseData, utmTrustBoxId) {
            var linksClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'profile-url';
            var numberOfReviews = baseData.businessEntity.numberOfReviews.total,
                links = baseData.links;

            var items = [].slice.call(document.getElementsByClassName(linksClass));
            var baseUrl = numberOfReviews ? links.profileUrl : links.evaluateUrl;
            for (var i = 0; i < items.length; i++) {
                items[i].href = addUtmParams(utmTrustBoxId)(baseUrl);
            }
        };

        // Create a range of numbers, up to (but excluding) the argument.
        // Written to support IE11.
        var range = function range(num) {
            var result = [];
            while (num > 0) {
                result.push(result.length);
                num--;
            }
            return result;
        };

        // Shifts the given color to either lighter or darker based on the base value given.
        // Positive values give you lighter color, negative darker.
        var colorShift = function colorShift(col, amt) {
            var validateBounds = function validateBounds(v) {
                return v > 255 ? 255 : v < 0 ? 0 : v;
            };
            var usePound = false;

            if (col[0] === '#') {
                col = col.slice(1);
                usePound = true;
            }

            var num = parseInt(col, 16);
            if (!num) {
                return col;
            }

            var r = (num >> 16) + amt;
            r = validateBounds(r);

            var g = (num >> 8 & 0x00ff) + amt;
            g = validateBounds(g);

            var b = (num & 0x0000ff) + amt;
            b = validateBounds(b);

            var _map = [r, g, b].map(function(color) {
                return color <= 15 ? '0' + color.toString(16) : color.toString(16);
            });

            var _map2 = _slicedToArray(_map, 3);

            r = _map2[0];
            g = _map2[1];
            b = _map2[2];

            return (usePound ? '#' : '') + r + g + b;
        };

        var hexToRGBA = function hexToRGBA(hex) {
            var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var num = hex[0] === '#' ? parseInt(hex.slice(1), 16) : parseInt(hex, 16);
            var red = num >> 16;
            var green = num >> 8 & 0x00ff;
            var blue = num & 0x0000ff;
            return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        };

        var setTextColor = function setTextColor(textColor) {
            var textColorStyle = document.createElement('style');
            textColorStyle.appendChild(document.createTextNode('\n      * {\n        color: inherit !important;\n      }\n      body {\n        color: ' + textColor + ' !important;\n      }\n      .bold-underline {\n        border-bottom-color: ' + textColor + ' !important;\n      }\n      .bold-underline:hover {\n        border-color: ' + colorShift(textColor, -30) + ' !important;\n      }\n      .secondary-text {\n        color: ' + hexToRGBA(textColor, 0.6) + ' !important;\n      }\n      .secondary-text-arrow {\n        border-color: ' + hexToRGBA(textColor, 0.6) + ' transparent transparent transparent !important;\n      }\n      .read-more {\n        color: ' + textColor + ' !important;\n      }\n    '));
            document.head.appendChild(textColorStyle);
        };

        var setBorderColor = function setBorderColor(borderColor) {
            var borderColorStyle = document.createElement('style');
            borderColorStyle.appendChild(document.createTextNode('\n     * {\n        border-color: ' + borderColor + ' !important;\n      }\n    '));
            document.head.appendChild(borderColorStyle);
        };

        var setFont = function setFont(fontFamily) {
            var widgetRootUri = (0, _rootUri2.default)();
            var fontFamilyNormalizedForUrl = fontFamily.replace(/\s/g, '-').toLowerCase();
            var fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            // we are using the following three weights in most of our TrustBoxes
            // in future iterations, we can optimize the bytes transferred by having a list of weights per TrustBox
            fontLink.href = widgetRootUri + '/fonts/' + fontFamilyNormalizedForUrl + '.css';
            document.head.appendChild(fontLink);

            var cleanFontName = fontFamily.replace(/\+/g, ' ');
            var fontStyle = document.createElement('style');
            fontStyle.appendChild(document.createTextNode('\n    * {\n      font-family: inherit !important;\n    }\n    body {\n      font-family: "' + cleanFontName + '", sans-serif !important;\n    }\n    '));
            document.head.appendChild(fontStyle);
        };

        var setHtmlLanguage = function setHtmlLanguage(language) {
            document.documentElement.setAttribute('lang', language);
        };

        var sanitizeColor = function sanitizeColor(color) {
            var hexRegExp = /^#(?:[\da-fA-F]{3}){1,2}$/;
            return typeof color === 'string' && hexRegExp.test(color) ? color : null;
        };

        var handlePopoverPosition = function handlePopoverPosition(label, popover, container, popUpArrow) {
            var popoverRect = popover.getBoundingClientRect();
            var containerRect = container.getBoundingClientRect();
            var labelRect = label.getBoundingClientRect();

            if (popoverRect.left < containerRect.left) {
                // We need to stick the popover to the left side of the container
                // Because the `left` and `right` values are relative to the parent,
                // we need to make the following calculation to find where to stick the popover
                popover.style.left = containerRect.left - labelRect.left + 'px';
                popover.style.right = 'auto';
                // Moving the arrow by the distance of the popover shift over X axis
                var newPopupRect = popover.getBoundingClientRect();
                var currentLeftValue = getComputedStyle(popUpArrow).left;
                popUpArrow.style.left = 'calc(' + currentLeftValue + ' + ' + Math.floor(popoverRect.left - newPopupRect.left) + 'px)';
            } else if (popoverRect.right > containerRect.right) {
                // We need to stick the popover to the right side of the container
                // Because the `left` and `right` values are relative to the parent,
                // we need to make the following calculation to find where to stick the popover
                popover.style.right = labelRect.right - containerRect.right + 'px';
                popover.style.left = 'auto';
                // Moving the arrow by the distance of the popover shift over X axis
                var _newPopupRect = popover.getBoundingClientRect();
                var _currentLeftValue = getComputedStyle(popUpArrow).left;
                popUpArrow.style.left = 'calc(' + _currentLeftValue + ' + ' + Math.floor(popoverRect.right - _newPopupRect.right) + 'px)';
            }
        };

        var sortAttributeRatings = function sortAttributeRatings(attributeRatingsArray) {
            var sortByName = function sortByName(a, b) {
                return a.name.localeCompare(b.name);
            };

            var starAttributes = attributeRatingsArray.filter(function(x) {
                return x.type === 'range_1to5';
            }).sort(sortByName);
            var scaleAttributes = attributeRatingsArray.filter(function(x) {
                return x.type === 'scale';
            }).sort(sortByName);

            return [].concat(_toConsumableArray(starAttributes), _toConsumableArray(scaleAttributes));
        };

        exports.addEventListener = addEventListener;
        exports.addUtmParams = addUtmParams;
        exports.getOnPageReady = getOnPageReady;
        /* common-shake removed: exports.injectWidgetLinks = */
        void injectWidgetLinks;
        exports.insertNumberSeparator = insertNumberSeparator;
        exports.handlePopoverPosition = handlePopoverPosition;
        exports.makeTranslations = makeTranslations;
        /* common-shake removed: exports.range = */
        void range;
        /* common-shake removed: exports.regulateFollowForLocation = */
        void regulateFollowForLocation;
        exports.removeElement = removeElement;
        exports.sanitizeColor = sanitizeColor;
        exports.sanitizeHtml = sanitizeHtml;
        /* common-shake removed: exports.setBorderColor = */
        void setBorderColor;
        exports.setHtmlContent = setHtmlContent;
        /* common-shake removed: exports.setHtmlLanguage = */
        void setHtmlLanguage;
        exports.setFont = setFont;
        /* common-shake removed: exports.setPopupAlignment = */
        void setPopupAlignment;
        exports.setTextColor = setTextColor;
        exports.setTextContent = setTextContent;
        /* common-shake removed: exports.setWidgetAlignment = */
        void setWidgetAlignment;
        exports.showTrustBox = showTrustBox;
        /* common-shake removed: exports.sortAttributeRatings = */
        void sortAttributeRatings;

    }, {
        "./dom": 38,
        "./models/styleAlignmentPositions": 42,
        "./rootUri": 45
    }],
    56: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.populateStars = exports.makeStars = undefined;

        var _templating = require('../templating');

        var _dom = require('../dom');

        var _utils = require('../utils');

        var makeStars = function makeStars(_ref) {
            var num = _ref.num,
                _ref$trustScore = _ref.trustScore,
                trustScore = _ref$trustScore === undefined ? null : _ref$trustScore,
                _ref$wrapperClass = _ref.wrapperClass,
                wrapperClass = _ref$wrapperClass === undefined ? '' : _ref$wrapperClass,
                color = _ref.color;

            var fullPart = Math.floor(num);
            var halfPart = num === fullPart ? '' : ' tp-stars--' + fullPart + '--half';
            var sanitizedColor = (0, _utils.sanitizeColor)(color);
            return (0, _templating.div)({
                    class: wrapperClass
                },
                // add a different class so that styles from widgets-styleguide do not apply
                (0, _templating.mkElemWithSvgLookup)('stars', '' + (sanitizedColor ? 'tp-stars-custom-color' : 'tp-stars tp-stars--' + fullPart + halfPart), {
                    rating: num,
                    trustScore: trustScore || num,
                    color: sanitizedColor
                }));
        };

        var populateStars = function populateStars(_ref2) {
            var _ref2$businessEntity = _ref2.businessEntity,
                stars = _ref2$businessEntity.stars,
                trustScore = _ref2$businessEntity.trustScore,
                total = _ref2$businessEntity.numberOfReviews.total;
            var starsContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tp-widget-stars';
            var starsColor = arguments[2];

            var sanitizedColor = (0, _utils.sanitizeColor)(starsColor);
            var container = typeof starsContainer === 'string' ? document.getElementById(starsContainer) : starsContainer;

            // Ensure we properly handle empty review state - we sometimes get a rating
            // back from the API even where we have no reviews, so explicitly check.
            var displayedStars = total ? stars : 0;

            (0, _dom.populateElements)([{
                element: container,
                string: makeStars({
                    num: displayedStars,
                    trustScore: trustScore,
                    color: sanitizedColor
                })
            }]);
        };

        exports.makeStars = makeStars;
        exports.populateStars = populateStars;

    }, {
        "../dom": 38,
        "../templating": 58,
        "../utils": 63
    }],
    54: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.populateLogo = exports.makeLogo = undefined;

        var _templating = require('../templating');

        var _dom = require('../dom');

        var makeLogo = function makeLogo() {
            return (0, _templating.mkElemWithSvgLookup)('logo');
        };

        var populateLogo = function populateLogo() {
            var logoContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-logo';

            var container = typeof logoContainer === 'string' ? document.getElementById(logoContainer) : logoContainer;

            (0, _dom.populateElements)([{
                element: container,
                string: makeLogo()
            }]);
        };

        exports.makeLogo = makeLogo;
        exports.populateLogo = populateLogo;

    }, {
        "../dom": 38,
        "../templating": 58
    }],
    57: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.ORIENTATION = */
        exports.makeEmptySummary = undefined;

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _templating = require('../templating');

        var _stars = require('./stars');

        var _logo = require('./logo');

        var _utils = require('../utils');

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        var HORIZONTAL = 'horizontal';
        var VERTICAL = 'vertical';
        var ORIENTATION = {
            HORIZONTAL: HORIZONTAL,
            VERTICAL: VERTICAL
        };

        var useNofollow = function useNofollow(nofollow) {
            return nofollow ? {
                rel: 'nofollow'
            } : {};
        };

        var renderSubtitle = function renderSubtitle(options) {
            var subtitle = options.subtitle,
                url = options.url,
                hasLogo = options.hasLogo,
                nofollow = options.nofollow;

            var translatedSubtitle = subtitle && (0, _utils.makeTranslations)({}, subtitle);
            var children = [translatedSubtitle && (0, _templating.span)({
                class: 'tp-widget-empty-vertical__subtitle'
            }, translatedSubtitle), url && (0, _templating.a)(_extends({
                class: 'tp-widget-empty-vertical__logo',
                href: url,
                target: '_blank'
            }, useNofollow(nofollow)), (0, _logo.makeLogo)()), hasLogo && !url && (0, _templating.span)({
                class: 'tp-widget-empty-vertical__logo'
            }, (0, _logo.makeLogo)())].filter(Boolean);

            return _templating.div.apply(undefined, [{
                class: 'tp-widget-empty-vertical__subtitle-wrapper'
            }].concat(_toConsumableArray(children)));
        };

        var makeEmptyVerticalSummary = function makeEmptyVerticalSummary(options) {
            var translatedTitle = (0, _utils.makeTranslations)({}, options.title);
            var subtitleElement = renderSubtitle(options);
            return (0, _templating.div)({
                class: 'tp-widget-empty-vertical'
            }, (0, _templating.span)({
                class: 'tp-widget-empty-vertical__title'
            }, translatedTitle), (0, _stars.makeStars)({
                num: 0,
                wrapperClass: 'tp-widget-empty-vertical__stars'
            }), subtitleElement);
        };

        var makeEmptyHorizontalSummary = function makeEmptyHorizontalSummary(options) {
            var title = options.title,
                url = options.url,
                nofollow = options.nofollow;

            var translatedTitle = (0, _utils.makeTranslations)({}, title);
            return (0, _templating.div)({
                class: 'tp-widget-empty-horizontal'
            }, (0, _templating.span)({
                class: 'tp-widget-empty-horizontal__title'
            }, translatedTitle), (0, _templating.a)(_extends({
                class: 'tp-widget-empty-horizontal__logo',
                href: url,
                target: '_blank'
            }, useNofollow(nofollow)), (0, _logo.makeLogo)()));
        };

        var makeEmptySummary = function makeEmptySummary(options) {
            return options.orientation === ORIENTATION.HORIZONTAL ? makeEmptyHorizontalSummary(options) : makeEmptyVerticalSummary(options);
        };

        exports.makeEmptySummary = makeEmptySummary;
        /* common-shake removed: exports.ORIENTATION = */
        void ORIENTATION;

    }, {
        "../templating": 58,
        "../utils": 63,
        "./logo": 54,
        "./stars": 56
    }],
    58: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.customElement = */
        exports.mkElemWithSvgLookup = exports.span = /* common-shake removed: exports.input = */ /* common-shake removed: exports.label = */ /* common-shake removed: exports.img = */ exports.div = exports.a = undefined;

        var _svg = require('./assets/svg');

        var _utils = require('./utils');

        var flatten = function flatten(arrs) {
            return [].concat.apply([], arrs);
        };

        var mkProps = function mkProps(props) {
            return Object.keys(props).map(function(key) {
                var sanitizedProp = (0, _utils.sanitizeHtml)(props[key]);
                return key + '="' + sanitizedProp + '"';
            }).join(' ');
        };

        var mkElem = function mkElem(tag) {
            return function(props) {
                for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    children[_key - 1] = arguments[_key];
                }

                return '<' + tag + ' ' + mkProps(props) + '>' + flatten(children).join('\n') + '</' + tag + '>';
            };
        };

        var mkNonClosingElem = function mkNonClosingElem(tag) {
            return function(props) {
                return '<' + tag + ' ' + mkProps(props) + '>';
            };
        };

        var a = mkElem('a');
        var div = mkElem('div');
        var img = mkElem('img');
        var label = mkElem('label');
        var span = mkElem('span');
        var input = mkNonClosingElem('input');
        var customElement = mkElem;

        var mkElemWithSvgLookup = function mkElemWithSvgLookup(svgKey) {
            var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var props = arguments[2];
            return div({
                class: className
            }, _svg.svgMap[svgKey](props));
        };

        exports.a = a;
        exports.div = div;
        /* common-shake removed: exports.img = */
        void img;
        /* common-shake removed: exports.label = */
        void label;
        /* common-shake removed: exports.input = */
        void input;
        exports.span = span;
        exports.mkElemWithSvgLookup = mkElemWithSvgLookup;
        /* common-shake removed: exports.customElement = */
        void customElement;

    }, {
        "./assets/svg": 36,
        "./utils": 63
    }],
    41: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _communication = require('./communication');

        var _errorFallback = require('./templates/errorFallback');

        var FALLBACK_DELAY = 500;

        /**
         * Makes sure that the widget is initialized only when the bootstrapper is present.
         *
         * Sends a "ping" message to the bootstrapper and waits for a "pong" reply before initializing the widget.
         *
         * @param {Function} onInit the callback to be executed when the init is done.
         */
        var init = function init(onInit) {
            var initialized = false;
            (0, _communication.onPong)(function() {
                initialized = true;
                if (typeof onInit === 'function') {
                    onInit();
                } else {
                    console.warn('`onInit` not supplied');
                }
            });

            (0, _communication.ping)();

            // we want to avoid rendering the fallback right away in case the "pong" message from the bootstrapper comes back immediately
            // this way we will avoid a flicker from "empty screen" -> "fallback" -> "TrustBox" and have "empty screen" -> "TrustBox"
            setTimeout(function() {
                if (!initialized) {
                    (0, _errorFallback.errorFallback)();
                }
            }, FALLBACK_DELAY);
        };

        exports.default = init;

    }, {
        "./communication": 37,
        "./templates/errorFallback": 52
    }],
    55: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _templating = require('../templating');

        var _smartAge = require('../smartAge');

        var _smartAge2 = _interopRequireDefault(_smartAge);

        var _stars = require('./stars');

        var _text = require('../text');

        var _translations = require('../translations');

        var _typeLabel = require('../typeLabel');

        var _typeLabel2 = _interopRequireDefault(_typeLabel);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var processOpts = function processOpts(opts) {
            var optsIsFunction = typeof opts === 'function';
            var optsIsObject = opts !== null && (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object';

            var reviewLinkGenerator = optsIsFunction ? opts : optsIsObject ? opts.reviewLinkGenerator : null;

            var _ref = optsIsObject ? opts : {},
                textLength = _ref.textLength,
                starColor = _ref.starColor,
                importedReviews = _ref.importedReviews,
                showReviewSource = _ref.showReviewSource;

            return {
                reviewLinkGenerator: reviewLinkGenerator,
                textLength: textLength,
                starColor: starColor,
                importedReviews: importedReviews,
                showReviewSource: showReviewSource
            };
        };

        var makeVerificationMethod = function makeVerificationMethod(locale, verifiedBy) {
            if (verifiedBy) {
                return (0, _translations.getFrameworkTranslation)('reviews.collectedVia', (0, _translations.formatLocale)(locale), {
                    '[source]': verifiedBy
                });
            }
            return (0, _translations.getFrameworkTranslation)('reviews.verifiedVia', (0, _translations.formatLocale)(locale), {
                '[source]': 'Trustpilot'
            });
        };

        var makePopUp = function makePopUp(label) {
            return (0, _templating.div)({
                class: 'tp-widget-review__source__information'
            }, [(0, _templating.div)({
                class: 'tp-widget-review__source__arrow'
            }), (0, _templating.div)({
                class: 'information-title'
            }, label.tooltipTitle()), (0, _templating.div)({
                class: 'information-text'
            }, label.tooltipContent())]);
        };

        var makeVerificationLabel = function makeVerificationLabel(locale, review) {
            var label = (0, _typeLabel2.default)(locale, review);

            if (label.labelType === _typeLabel.LabelTypes.NOT_VERIFIED) {
                return "";
            }

            var icon = (0, _templating.div)({
                class: 'label-icon'
            }, [label.icon(),
                // Set popup element as icon's child, so it's always rendered relative to icon's position
                makePopUp(label)
            ]);
            var labelText = (0, _templating.div)({
                class: 'label-text'
            }, label.label());

            return (0, _templating.div)({
                class: 'tp-widget-review__source popover-activator'
            }, [(0, _templating.div)({
                class: 'verification-label-wrapper'
            }, [(0, _templating.div)({
                class: 'verification-label'
            }, [icon, labelText])])]);
        };

        // Template for reviews displayed within Carousel, TestimonialSlider, Product Reviews Carousel TrustBoxes.
        var reviewTemplate = function reviewTemplate(locale) {
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return function(review) {
                // Check if opts contain only the reviewLinkGenerator. This is to maintain the
                // old API for this function, which only took a locale and a reviewLinkGenerator.
                var _processOpts = processOpts(opts),
                    reviewLinkGenerator = _processOpts.reviewLinkGenerator,
                    _processOpts$textLeng = _processOpts.textLength,
                    textLength = _processOpts$textLeng === undefined ? 85 : _processOpts$textLeng,
                    starColor = _processOpts.starColor,
                    importedReviews = _processOpts.importedReviews,
                    _processOpts$showRevi = _processOpts.showReviewSource,
                    showReviewSource = _processOpts$showRevi === undefined ? false : _processOpts$showRevi;

                var wrappedDiv = function wrappedDiv() {
                    return reviewLinkGenerator ? (0, _templating.a)({
                        href: reviewLinkGenerator(review),
                        target: '_blank',
                        rel: 'nofollow'
                    }, _templating.div.apply(undefined, arguments)) : _templating.div.apply(undefined, arguments);
                };

                return (0, _templating.div)({
                        class: 'tp-widget-review' + (importedReviews ? ' tp-widget-review--imported' : '')
                    }, (0, _templating.div)({
                        class: 'top-row'
                    }, [(0, _templating.div)({
                        class: 'tp-widget-stars'
                    }, (0, _stars.makeStars)({
                        num: review.stars,
                        color: starColor
                    })), makeVerificationLabel(locale, review)]), review.title ? wrappedDiv({
                        class: 'header'
                    }, (0, _text.escapeHtml)(review.title)) : '',
                    // service reviews use `text` while product reviews use `content`
                    wrappedDiv({
                        class: 'text'
                    }, (0, _text.truncateText)(review.text || review.content, textLength)), wrappedDiv({
                        class: 'date-and-user-info-wrapper'
                    }, [(0, _templating.div)({
                        class: 'name secondary-text'
                    }, review.consumer.displayName + ','), (0, _templating.div)({
                        class: 'date secondary-text'
                    }, (0, _smartAge2.default)(locale, review.createdAt))]), showReviewSource ? (0, _templating.div)({
                        class: 'tp-widget-review__source'
                    }, [makeVerificationMethod(locale, review.verifiedBy)]) : null);
            };
        };

        exports.default = reviewTemplate;

    }, {
        "../smartAge": 51,
        "../templating": 58,
        "../text": 59,
        "../translations": 61,
        "../typeLabel": 62,
        "./stars": 56
    }],
    48: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.PaginationControls = */
        exports.ArrowControls = exports.ReviewSlider = undefined;

        var _reviewSlider = require('./reviewSlider');

        var _reviewSlider2 = _interopRequireDefault(_reviewSlider);

        var _arrowControls = require('./arrowControls');

        var _arrowControls2 = _interopRequireDefault(_arrowControls);

        var _paginationControls = require('./paginationControls');

        var _paginationControls2 = _interopRequireDefault(_paginationControls);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        exports.ReviewSlider = _reviewSlider2.default;
        exports.ArrowControls = _arrowControls2.default;
        /* common-shake removed: exports.PaginationControls = */
        void _paginationControls2.default;

    }, {
        "./arrowControls": 46,
        "./paginationControls": 49,
        "./reviewSlider": 50
    }],
    44: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _translations = require('./translations');

        var reviewFilterText = function reviewFilterText(locale, reviewStars, reviewTagValue) {
            var formattedLocale = (0, _translations.formatLocale)(locale);
            if (reviewTagValue) {
                return (0, _translations.getFrameworkTranslation)('reviewFilters.byFavoriteOrTag', formattedLocale);
            }

            if (reviewStars && !['1', '2', '3', '4', '5'].every(function(star) {
                    return reviewStars.split(',').indexOf(star) > -1;
                })) {
                return generateStarsString(locale, reviewStars.split(',').sort());
            }

            return (0, _translations.getFrameworkTranslation)('reviewFilters.byLatest', formattedLocale);
        };

        var generateStarsString = function generateStarsString(locale, stars) {
            var id = 'reviewFilters.byLatest';
            var interpolations = {};
            var formattedLocale = (0, _translations.formatLocale)(locale);

            switch (stars.length) {
                case 4:
                    id = 'reviewFilters.byStars4';
                    interpolations['[star1]'] = stars[0];
                    interpolations['[star2]'] = stars[1];
                    interpolations['[star3]'] = stars[2];
                    interpolations['[star4]'] = stars[3];
                    break;
                case 3:
                    id = 'reviewFilters.byStars3';
                    interpolations['[star1]'] = stars[0];
                    interpolations['[star2]'] = stars[1];
                    interpolations['[star3]'] = stars[2];
                    break;
                case 2:
                    id = 'reviewFilters.byStars2';
                    interpolations['[star1]'] = stars[0];
                    interpolations['[star2]'] = stars[1];
                    break;
                case 1:
                    id = 'reviewFilters.byStars1';
                    interpolations['[star1]'] = stars[0];
                    break;
                default:
                    break;
            }

            return (0, _translations.getFrameworkTranslation)(id, formattedLocale, interpolations);
        };

        exports.default = reviewFilterText;

    }, {
        "./translations": 61
    }],
    31: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.fetchServiceRevieMultipleData = */
        exports.fetchServiceReviewData = /* common-shake removed: exports.constructTrustBoxAndComplete = */ /* common-shake removed: exports.fetchProductReview = */ /* common-shake removed: exports.fetchProductData = */ undefined;

        var _fetchData = require('./fetchData');

        var _productReviews = require('./productReviews');

        var fetchServiceReviewData = function fetchServiceReviewData(templateId) {
            return function(fetchParams, constructTrustBox, passToPopup) {
                (0, _fetchData.fetchData)('/trustbox-data/' + templateId)(fetchParams, constructTrustBox, passToPopup, _fetchData.hasServiceReviews);
            };
        };

        var fetchServiceRevieMultipleData = function fetchServiceRevieMultipleData(templateId) {
            return function(fetchParams, constructTrustBox, passToPopup) {
                (0, _fetchData.multiFetchData)('/trustbox-data/' + templateId)(fetchParams, constructTrustBox, passToPopup, _fetchData.hasServiceReviewsMultiFetch);
            };
        };

        /* common-shake removed: exports.fetchProductData = */
        void _productReviews.fetchProductData;
        /* common-shake removed: exports.fetchProductReview = */
        void _productReviews.fetchProductReview;
        /* common-shake removed: exports.constructTrustBoxAndComplete = */
        void _fetchData.constructTrustBoxAndComplete;
        exports.fetchServiceReviewData = fetchServiceReviewData;
        /* common-shake removed: exports.fetchServiceRevieMultipleData = */
        void fetchServiceRevieMultipleData;

    }, {
        "./fetchData": 30,
        "./productReviews": 32
    }],
    3: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "anmeldelse",
                "plural": "anmeldelser",
                "collectedVia": "Indsamlet via [source]",
                "verifiedVia": "Verificeret – indsamlet via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verificeret",
                        "infoTitle": "Verificeret anmeldelse",
                        "info": "[LINK-BEGIN]Læs mere[LINK-END] om de forskellige typer anmeldelser"
                    },
                    "invitedReview": {
                        "label": "Inviteret",
                        "infoTitle": "Inviteret anmeldelse",
                        "info": "[LINK-BEGIN]Læs mere[LINK-END] om de forskellige typer anmeldelser"
                    },
                    "redirectedReview": {
                        "label": "Omdirigeret",
                        "infoTitle": "Omdirigeret anmeldelse",
                        "info": "[LINK-BEGIN]Læs mere[LINK-END] om de forskellige typer anmeldelser"
                    }
                }
            },
            "monthNames": {
                "january": "januar",
                "february": "februar",
                "march": "marts",
                "april": "april",
                "may": "maj",
                "june": "juni",
                "july": "juli",
                "august": "august",
                "september": "september",
                "october": "oktober",
                "november": "november",
                "december": "december"
            },
            "timeAgo": {
                "days": {
                    "singular": "For [count] dag siden",
                    "plural": "For [count] dage siden"
                },
                "hours": {
                    "singular": "For [count] time siden",
                    "plural": "For [count] timer siden"
                },
                "minutes": {
                    "singular": "For [count] minut siden",
                    "plural": "For [count] minutter siden"
                },
                "seconds": {
                    "singular": "For [count] sekund siden",
                    "plural": "For [count] sekunder siden"
                }
            },
            "reviewFilters": {
                "byStars1": "Viser vores [star1]-stjernede anmeldelser",
                "byStars2": "Viser vores [star1]- og [star2]-stjernede anmeldelser",
                "byStars3": "Viser vores [star1]-, [star2]- og [star3]-stjernede anmeldelser",
                "byStars4": "Viser vores [star1]-, [star2]-, [star3]- og [star4]-stjernede anmeldelser",
                "byLatest": "Viser vores seneste anmeldelser",
                "byFavoriteOrTag": "Viser vores yndlingsanmeldelser"
            }
        }
    }, {}],
    4: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "Bewertung",
                "plural": "Bewertungen",
                "collectedVia": "Gesammelt über [source]",
                "verifiedVia": "Verifiziert, gesammelt über [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verifiziert",
                        "infoTitle": "Verifizierte Bewertung",
                        "info": "[LINK-BEGIN]Erfahren Sie mehr[LINK-END] über verschiedene Arten von Bewertungen"
                    },
                    "invitedReview": {
                        "label": "Auf Einladung",
                        "infoTitle": "Bewertung auf Einladung",
                        "info": "[LINK-BEGIN]Erfahren Sie mehr[LINK-END] über verschiedene Arten von Bewertungen"
                    },
                    "redirectedReview": {
                        "label": "Weitergeleitet",
                        "infoTitle": "Weitergeleitete Bewertung",
                        "info": "[LINK-BEGIN]Erfahren Sie mehr[LINK-END] über verschiedene Arten von Bewertungen"
                    }
                }
            },
            "monthNames": {
                "january": "Januar",
                "february": "Februar",
                "march": "März",
                "april": "April",
                "may": "Mai",
                "june": "Juni",
                "july": "Juli",
                "august": "August",
                "september": "September",
                "october": "Oktober",
                "november": "November",
                "december": "Dezember"
            },
            "timeAgo": {
                "days": {
                    "singular": "vor [count] Tag",
                    "plural": "vor [count] Tagen"
                },
                "hours": {
                    "singular": "vor [count] Stunde",
                    "plural": "vor [count] Stunden"
                },
                "minutes": {
                    "singular": "vor [count] Minute",
                    "plural": "vor [count] Minuten"
                },
                "seconds": {
                    "singular": "vor [count] Sekunde",
                    "plural": "vor [count] Sekunden"
                }
            },
            "reviewFilters": {
                "byStars1": "Einige unserer [star1]-Sterne-Bewertungen",
                "byStars2": "Einige unserer [star1]- & [star2]-Sterne-Bewertungen",
                "byStars3": "Einige unserer [star1]-, [star2]- & [star3]-Sterne-Bewertungen",
                "byStars4": "Einige unserer [star1]-, [star2]-, [star3]- & [star4]-Sterne-Bewertungen",
                "byLatest": "Unsere neuesten Bewertungen",
                "byFavoriteOrTag": "Unsere Lieblingsbewertungen"
            }
        }
    }, {}],
    5: [function(require, module, exports) {
        arguments[4][4][0].apply(exports, arguments)
    }, {
        "dup": 4
    }],
    6: [function(require, module, exports) {
        arguments[4][4][0].apply(exports, arguments)
    }, {
        "dup": 4
    }],
    7: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "review",
                "plural": "reviews",
                "collectedVia": "Collected via [source]",
                "verifiedVia": "Verified, collected via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verified",
                        "infoTitle": "Verified review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    },
                    "invitedReview": {
                        "label": "Invited",
                        "infoTitle": "Invited review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    },
                    "redirectedReview": {
                        "label": "Redirected",
                        "infoTitle": "Redirected review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    }
                }
            },
            "monthNames": {
                "january": "January",
                "february": "February",
                "march": "March",
                "april": "April",
                "may": "May",
                "june": "June",
                "july": "July",
                "august": "August",
                "september": "September",
                "october": "October",
                "november": "November",
                "december": "December"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] day ago",
                    "plural": "[count] days ago"
                },
                "hours": {
                    "singular": "[count] hour ago",
                    "plural": "[count] hours ago"
                },
                "minutes": {
                    "singular": "[count] minute ago",
                    "plural": "[count] minutes ago"
                },
                "seconds": {
                    "singular": "[count] second ago",
                    "plural": "[count] seconds ago"
                }
            },
            "reviewFilters": {
                "byStars1": "Showing our [star1] star reviews",
                "byStars2": "Showing our [star1] & [star2] star reviews",
                "byStars3": "Showing our [star1], [star2] & [star3] star reviews",
                "byStars4": "Showing our [star1], [star2], [star3] & [star4] star reviews",
                "byLatest": "Showing our latest reviews",
                "byFavoriteOrTag": "Showing our favourite reviews"
            }
        }
    }, {}],
    8: [function(require, module, exports) {
        arguments[4][7][0].apply(exports, arguments)
    }, {
        "dup": 7
    }],
    9: [function(require, module, exports) {
        arguments[4][7][0].apply(exports, arguments)
    }, {
        "dup": 7
    }],
    10: [function(require, module, exports) {
        arguments[4][7][0].apply(exports, arguments)
    }, {
        "dup": 7
    }],
    11: [function(require, module, exports) {
        arguments[4][7][0].apply(exports, arguments)
    }, {
        "dup": 7
    }],
    12: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "review",
                "plural": "reviews",
                "collectedVia": "Collected via [source]",
                "verifiedVia": "Verified, collected via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verified",
                        "infoTitle": "Verified review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    },
                    "invitedReview": {
                        "label": "Invited",
                        "infoTitle": "Invited review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    },
                    "redirectedReview": {
                        "label": "Redirected",
                        "infoTitle": "Redirected review",
                        "info": "[LINK-BEGIN]Learn more[LINK-END] about review types"
                    }
                }
            },
            "monthNames": {
                "january": "January",
                "february": "February",
                "march": "March",
                "april": "April",
                "may": "May",
                "june": "June",
                "july": "July",
                "august": "August",
                "september": "September",
                "october": "October",
                "november": "November",
                "december": "December"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] day ago",
                    "plural": "[count] days ago"
                },
                "hours": {
                    "singular": "[count] hour ago",
                    "plural": "[count] hours ago"
                },
                "minutes": {
                    "singular": "[count] minute ago",
                    "plural": "[count] minutes ago"
                },
                "seconds": {
                    "singular": "[count] second ago",
                    "plural": "[count] seconds ago"
                }
            },
            "reviewFilters": {
                "byStars1": "Showing our [star1] star reviews",
                "byStars2": "Showing our [star1] & [star2] star reviews",
                "byStars3": "Showing our [star1], [star2] & [star3] star reviews",
                "byStars4": "Showing our [star1], [star2], [star3] & [star4] star reviews",
                "byLatest": "Showing our latest reviews",
                "byFavoriteOrTag": "Showing our favorite reviews"
            },
            "notRated": "Not rated"
        }
    }, {}],
    13: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "opinión",
                "plural": "opiniones",
                "collectedVia": "Fuente: [source]",
                "verifiedVia": "Verificada, recopilada vía [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verificada",
                        "infoTitle": "Opinión verificada",
                        "info": "[LINK-BEGIN]Más información[LINK-END] sobre los tipos de opinión"
                    },
                    "invitedReview": {
                        "label": "Por invitación",
                        "infoTitle": "Opinión por invitación",
                        "info": "[LINK-BEGIN]Más información[LINK-END] sobre los tipos de opinión"
                    },
                    "redirectedReview": {
                        "label": "Redirigida",
                        "infoTitle": "Opinión redirigida",
                        "info": "[LINK-BEGIN]Más información[LINK-END] sobre los tipos de opinión"
                    }
                }
            },
            "monthNames": {
                "january": "enero",
                "february": "febrero",
                "march": "marzo",
                "april": "abril",
                "may": "mayo",
                "june": "junio",
                "july": "julio",
                "august": "agosto",
                "september": "septiembre",
                "october": "octubre",
                "november": "noviembre",
                "december": "diciembre"
            },
            "timeAgo": {
                "days": {
                    "singular": "Hace [count] día",
                    "plural": "Hace [count] días"
                },
                "hours": {
                    "singular": "Hace [count] hora",
                    "plural": "Hace [count] horas"
                },
                "minutes": {
                    "singular": "Hace [count] minuto",
                    "plural": "Hace [count] minutos"
                },
                "seconds": {
                    "singular": "Hace [count] segundo",
                    "plural": "Hace [count] segundos"
                }
            },
            "reviewFilters": {
                "byStars1": "Nuestras opiniones de [star1] estrellas",
                "byStars2": "Nuestras opiniones de [star1] y [star2] estrellas",
                "byStars3": "Nuestras opiniones de [star1], [star2] y [star3] estrellas",
                "byStars4": "Nuestras opiniones de [star1], [star2], [star3] y [star4] estrellas",
                "byLatest": "Nuestras opiniones más recientes",
                "byFavoriteOrTag": "Nuestras opiniones preferidas"
            }
        }
    }, {}],
    14: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "arvostelu",
                "plural": "arvostelua",
                "collectedVia": "Arvostelun lähde: [source]",
                "verifiedVia": "Varmennettu, lähde: [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Varmennettu",
                        "infoTitle": "Varmennettu arvostelu",
                        "info": "[LINK-BEGIN]Lue lisää[LINK-END] eri arvostelutyypeistä"
                    },
                    "invitedReview": {
                        "label": "Kutsuttu",
                        "infoTitle": "Kutsuttu arvostelu",
                        "info": "[LINK-BEGIN]Lue lisää[LINK-END] eri arvostelutyypeistä"
                    },
                    "redirectedReview": {
                        "label": "Uudelleenohjattu",
                        "infoTitle": "Uudelleenohjattu arvostelu",
                        "info": "[LINK-BEGIN]Lue lisää[LINK-END] eri arvostelutyypeistä"
                    }
                }
            },
            "monthNames": {
                "january": "tammikuuta",
                "february": "helmikuuta",
                "march": "maaliskuuta",
                "april": "huhtikuuta",
                "may": "toukokuuta",
                "june": "kesäkuuta",
                "july": "heinäkuuta",
                "august": "elokuuta",
                "september": "syyskuuta",
                "october": "lokakuuta",
                "november": "marraskuuta",
                "december": "joulukuuta"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] päivää sitten",
                    "plural": "[count] päivää sitten"
                },
                "hours": {
                    "singular": "[count] tuntia sitten",
                    "plural": "[count] tuntia sitten"
                },
                "minutes": {
                    "singular": "[count] minuuttia sitten",
                    "plural": "[count] minuuttia sitten"
                },
                "seconds": {
                    "singular": "[count] sekuntia sitten",
                    "plural": "[count] sekuntia sitten"
                }
            },
            "reviewFilters": {
                "byStars1": "Näytetään [star1] tähden arvostelumme",
                "byStars2": "Näytetään [star1] & [star2] tähden arvostelumme",
                "byStars3": "Näytetään [star1], [star2] & [star3] tähden arvostelumme",
                "byStars4": "Näytetään [star1], [star2], [star3] & [star4] tähden arvostelumme",
                "byLatest": "Näytetään viimeisimmät arvostelumme",
                "byFavoriteOrTag": "Näytetään suosikkiarvostelumme"
            }
        }
    }, {}],
    15: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "avis",
                "plural": "avis",
                "collectedVia": "Collecté via [source]",
                "verifiedVia": "Vérifié, collecté via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Vérifié",
                        "infoTitle": "Avis vérifié",
                        "info": "[LINK-BEGIN]En savoir plus[LINK-END] sur les types d'avis"
                    },
                    "invitedReview": {
                        "label": "Sur invitation",
                        "infoTitle": "Avis sur invitation",
                        "info": "[LINK-BEGIN]En savoir plus[LINK-END] sur les types d'avis"
                    },
                    "redirectedReview": {
                        "label": "Redirigé",
                        "infoTitle": "Avis redirigé",
                        "info": "[LINK-BEGIN]En savoir plus[LINK-END] sur les types d'avis"
                    }
                }
            },
            "monthNames": {
                "january": "janvier",
                "february": "février",
                "march": "mars",
                "april": "avril",
                "may": "mai",
                "june": "juin",
                "july": "juillet",
                "august": "août",
                "september": "septembre",
                "october": "octobre",
                "november": "novembre",
                "december": "décembre"
            },
            "timeAgo": {
                "days": {
                    "singular": "ll y a [count] jour",
                    "plural": "Il y a [count] jours"
                },
                "hours": {
                    "singular": "Il y a [count] heure",
                    "plural": "Il y a [count] heures"
                },
                "minutes": {
                    "singular": "Il y a [count] minute",
                    "plural": "Il y a [count] minutes"
                },
                "seconds": {
                    "singular": "Il y a [count] seconde",
                    "plural": "Il y a [count] secondes"
                }
            },
            "reviewFilters": {
                "byStars1": "Nos avis [star1] étoiles",
                "byStars2": "Nos avis [star1] et [star2] étoiles",
                "byStars3": "Nos avis [star1], [star2] et [star3] étoiles",
                "byStars4": "Nos avis [star1], [star2], [star3] et [star4] étoiles",
                "byLatest": "Nos derniers avis",
                "byFavoriteOrTag": "Nos avis préférés"
            }
        }
    }, {}],
    16: [function(require, module, exports) {
        arguments[4][15][0].apply(exports, arguments)
    }, {
        "dup": 15
    }],
    17: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _strings = require('./da-DK/strings.json');

        var dk = _interopRequireWildcard(_strings);

        var _strings2 = require('./de-AT/strings.json');

        var at = _interopRequireWildcard(_strings2);

        var _strings3 = require('./de-CH/strings.json');

        var ch = _interopRequireWildcard(_strings3);

        var _strings4 = require('./de-DE/strings.json');

        var de = _interopRequireWildcard(_strings4);

        var _strings5 = require('./en-AU/strings.json');

        var au = _interopRequireWildcard(_strings5);

        var _strings6 = require('./en-CA/strings.json');

        var ca = _interopRequireWildcard(_strings6);

        var _strings7 = require('./en-GB/strings.json');

        var gb = _interopRequireWildcard(_strings7);

        var _strings8 = require('./en-IE/strings.json');

        var ie = _interopRequireWildcard(_strings8);

        var _strings9 = require('./en-NZ/strings.json');

        var nz = _interopRequireWildcard(_strings9);

        var _strings10 = require('./en-US/strings.json');

        var us = _interopRequireWildcard(_strings10);

        var _strings11 = require('./es-ES/strings.json');

        var es = _interopRequireWildcard(_strings11);

        var _strings12 = require('./fi-FI/strings.json');

        var fi = _interopRequireWildcard(_strings12);

        var _strings13 = require('./fr-BE/strings.json');

        var be = _interopRequireWildcard(_strings13);

        var _strings14 = require('./fr-FR/strings.json');

        var fr = _interopRequireWildcard(_strings14);

        var _strings15 = require('./it-IT/strings.json');

        var it = _interopRequireWildcard(_strings15);

        var _strings16 = require('./ja-JP/strings.json');

        var jp = _interopRequireWildcard(_strings16);

        var _strings17 = require('./nb-NO/strings.json');

        var no = _interopRequireWildcard(_strings17);

        var _strings18 = require('./nl-BE/strings.json');

        var beNl = _interopRequireWildcard(_strings18);

        var _strings19 = require('./nl-NL/strings.json');

        var nl = _interopRequireWildcard(_strings19);

        var _strings20 = require('./pl-PL/strings.json');

        var pl = _interopRequireWildcard(_strings20);

        var _strings21 = require('./pt-BR/strings.json');

        var br = _interopRequireWildcard(_strings21);

        var _strings22 = require('./pt-PT/strings.json');

        var pt = _interopRequireWildcard(_strings22);

        var _strings23 = require('./ru-RU/strings.json');

        var ru = _interopRequireWildcard(_strings23);

        var _strings24 = require('./sv-SE/strings.json');

        var se = _interopRequireWildcard(_strings24);

        var _strings25 = require('./zh-CN/strings.json');

        var cn = _interopRequireWildcard(_strings25);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
                return obj;
            } else {
                var newObj = {};
                if (obj != null) {
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                }
                newObj.default = obj;
                return newObj;
            }
        }

        var locales = {
            'da-DK': dk,
            'de-AT': at,
            'de-CH': ch,
            'de-DE': de,
            'en-AU': au,
            'en-CA': ca,
            'en-GB': gb,
            'en-IE': ie,
            'en-NZ': nz,
            'en-US': us,
            'es-ES': es,
            'fi-FI': fi,
            'fr-BE': be,
            'fr-FR': fr,
            'it-IT': it,
            'ja-JP': jp,
            'nb-NO': no,
            'nl-BE': beNl,
            'nl-NL': nl,
            'pl-PL': pl,
            'pt-BR': br,
            'pt-PT': pt,
            'ru-RU': ru,
            'sv-SE': se,
            'zh-CN': cn
        };

        exports.default = locales;

    }, {
        "./da-DK/strings.json": 3,
        "./de-AT/strings.json": 4,
        "./de-CH/strings.json": 5,
        "./de-DE/strings.json": 6,
        "./en-AU/strings.json": 7,
        "./en-CA/strings.json": 8,
        "./en-GB/strings.json": 9,
        "./en-IE/strings.json": 10,
        "./en-NZ/strings.json": 11,
        "./en-US/strings.json": 12,
        "./es-ES/strings.json": 13,
        "./fi-FI/strings.json": 14,
        "./fr-BE/strings.json": 15,
        "./fr-FR/strings.json": 16,
        "./it-IT/strings.json": 18,
        "./ja-JP/strings.json": 19,
        "./nb-NO/strings.json": 20,
        "./nl-BE/strings.json": 21,
        "./nl-NL/strings.json": 22,
        "./pl-PL/strings.json": 23,
        "./pt-BR/strings.json": 24,
        "./pt-PT/strings.json": 25,
        "./ru-RU/strings.json": 26,
        "./sv-SE/strings.json": 27,
        "./zh-CN/strings.json": 28
    }],
    18: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "recensione",
                "plural": "recensioni",
                "collectedVia": "Raccolta tramite [source]",
                "verifiedVia": "Verificata, raccolta da [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verificata",
                        "infoTitle": "Recensione verificata",
                        "info": "[LINK-BEGIN]Scopri di più[LINK-END] sui diversi tipi di recensioni"
                    },
                    "invitedReview": {
                        "label": "Su invito",
                        "infoTitle": "Recensione su invito",
                        "info": "[LINK-BEGIN]Scopri di più[LINK-END] sui diversi tipi di recensioni"
                    },
                    "redirectedReview": {
                        "label": "Reindirizzata",
                        "infoTitle": "Recensione reindirizzata",
                        "info": "[LINK-BEGIN]Scopri di più[LINK-END] sui diversi tipi di recensioni"
                    }
                }
            },
            "monthNames": {
                "january": "gennaio",
                "february": "febbraio",
                "march": "marzo",
                "april": "aprile",
                "may": "maggio",
                "june": "giugno",
                "july": "luglio",
                "august": "agosto",
                "september": "settembre",
                "october": "ottobre",
                "november": "novembre",
                "december": "dicembre"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] giorno fa",
                    "plural": "[count] giorni fa"
                },
                "hours": {
                    "singular": "[count] ora fa",
                    "plural": "[count] ore fa"
                },
                "minutes": {
                    "singular": "[count] minuto fa",
                    "plural": "[count] minuti fa"
                },
                "seconds": {
                    "singular": "[count] secondo fa",
                    "plural": "[count] secondi fa"
                }
            },
            "reviewFilters": {
                "byStars1": "Le nostre recensioni a [star1] stelle",
                "byStars2": "Le nostre recensioni a [star1] e a [star2] stelle",
                "byStars3": "Le nostre recensioni a [star1], a [star2] e a [star3] stelle",
                "byStars4": "Le nostre recensioni a [star1], a [star2], a [star3] e a [star4] stelle",
                "byLatest": "Le nostre ultime recensioni",
                "byFavoriteOrTag": "Le nostre recensioni preferite"
            }
        }
    }, {}],
    19: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "レビュー",
                "plural": "レビュー",
                "collectedVia": "[source] によって収集",
                "verifiedVia": "[source] によって確認・収集",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "確認済み",
                        "infoTitle": "確認済みのレビュー",
                        "info": "レビューの種類についての詳細は[LINK-BEGIN]こちら[LINK-END]をご覧ください。"
                    },
                    "invitedReview": {
                        "label": "手動招待",
                        "infoTitle": "招待によるレビュー",
                        "info": "レビューの種類についての詳細は[LINK-BEGIN]こちら[LINK-END]をご覧ください。"
                    },
                    "redirectedReview": {
                        "label": "自動転送",
                        "infoTitle": "自動転送によるレビュー",
                        "info": "レビューの種類についての詳細は[LINK-BEGIN]こちら[LINK-END]をご覧ください。"
                    }
                }
            },
            "monthNames": {
                "january": "1月",
                "february": "2月",
                "march": "3月",
                "april": "4月",
                "may": "5月",
                "june": "6月",
                "july": "7月",
                "august": "8月",
                "september": "9月",
                "october": "10月",
                "november": "11月",
                "december": "12月"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count]日前",
                    "plural": "[count]日前"
                },
                "hours": {
                    "singular": "[count]時間前",
                    "plural": "[count]時間前"
                },
                "minutes": {
                    "singular": "[count]分前",
                    "plural": "[count]分前"
                },
                "seconds": {
                    "singular": "[count]秒前",
                    "plural": "[count]秒前"
                }
            },
            "reviewFilters": {
                "byStars1": "[star1]つ星のレビューを表示",
                "byStars2": "[star1]つ星と[star2]つ星のレビューを表示",
                "byStars3": "[star1]つ星、[star2]つ星、[star3]つ星のレビューを表示",
                "byStars4": "[star1]つ星、[star2]つ星、[star3]つ星、[star4]つ星のレビューを表示",
                "byLatest": "最新のレビューを表示",
                "byFavoriteOrTag": "お気に入りのレビューを表示"
            }
        }
    }, {}],
    20: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "anmeldelse",
                "plural": "anmeldelser",
                "collectedVia": "Samlet inn gjennom [source]",
                "verifiedVia": "Bekreftet – samlet inn via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Bekreftet",
                        "infoTitle": "Bekreftet kunde",
                        "info": "[LINK-BEGIN]Lær mer[LINK-END] om de ulike typene anmeldelser"
                    },
                    "invitedReview": {
                        "label": "På oppfordring",
                        "infoTitle": "Anmeldelse skrevet på oppfordring",
                        "info": "[LINK-BEGIN]Lær mer[LINK-END] om de ulike typene anmeldelser"
                    },
                    "redirectedReview": {
                        "label": "Omdirigert",
                        "infoTitle": "Omdirigert anmeldelse",
                        "info": "[LINK-BEGIN]Lær mer[LINK-END] om de ulike typene anmeldelser"
                    }
                }
            },
            "monthNames": {
                "january": "januar",
                "february": "februar",
                "march": "mars",
                "april": "april",
                "may": "mai",
                "june": "juni",
                "july": "juli",
                "august": "august",
                "september": "september",
                "october": "oktober",
                "november": "november",
                "december": "desember"
            },
            "timeAgo": {
                "days": {
                    "singular": "For [count] dag siden",
                    "plural": "For [count] dager siden"
                },
                "hours": {
                    "singular": "For [count] time siden",
                    "plural": "For [count] timer siden"
                },
                "minutes": {
                    "singular": "For [count] minutt siden",
                    "plural": "For [count] minutter siden"
                },
                "seconds": {
                    "singular": "For [count] sekund siden",
                    "plural": "For [count] sekunder siden"
                }
            },
            "reviewFilters": {
                "byStars1": "Viser [star1]-stjernersanmeldelsene",
                "byStars2": "Viser [star1]- og [star2]-stjernersanmeldelsene",
                "byStars3": "Viser [star1]-, [star2]- og [star3]-stjernersanmeldelsene",
                "byStars4": "Viser [star1]-, [star2]-, [star3]- og [star4]-stjernersanmeldelsene",
                "byLatest": "Viser de nyeste anmeldelsene",
                "byFavoriteOrTag": "Viser favorittene våre"
            }
        }
    }, {}],
    21: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "review",
                "plural": "reviews",
                "collectedVia": "Verzameld via [source]",
                "verifiedVia": "Geverifieerd — verzameld via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Geverifieerd",
                        "infoTitle": "Geverifieerde review",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    },
                    "invitedReview": {
                        "label": "Op uitnodiging",
                        "infoTitle": "Review op uitnodiging",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    },
                    "redirectedReview": {
                        "label": "Omgeleid",
                        "infoTitle": "Omgeleide review",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    }
                }
            },
            "monthNames": {
                "january": "januari",
                "february": "februari",
                "march": "maart",
                "april": "april",
                "may": "mei",
                "june": "juni",
                "july": "juli",
                "august": "augustus",
                "september": "september",
                "october": "oktober",
                "november": "november",
                "december": "December"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] dag geleden",
                    "plural": "[count] dagen geleden"
                },
                "hours": {
                    "singular": "[count] uur geleden",
                    "plural": "[count] uur geleden"
                },
                "minutes": {
                    "singular": "[count] minuut geleden",
                    "plural": "[count] minuten geleden"
                },
                "seconds": {
                    "singular": "[count] seconde geleden",
                    "plural": "[count] seconden geleden"
                }
            },
            "reviewFilters": {
                "byStars1": "Onze reviews met [star1] sterren",
                "byStars2": "Onze reviews met [star1] en [star2] sterren",
                "byStars3": "Onze reviews met [star1], [star2] en [star3] sterren",
                "byStars4": "Onze reviews met [star1], [star2], [star3] en [star4] sterren",
                "byLatest": "Onze meest recente reviews",
                "byFavoriteOrTag": "Onze favoriete reviews"
            }
        }
    }, {}],
    22: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "review",
                "plural": "reviews",
                "collectedVia": "Verzameld via [source]",
                "verifiedVia": "Geverifieerd — verzameld via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Geverifieerd",
                        "infoTitle": "Geverifieerde review",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    },
                    "invitedReview": {
                        "label": "Op uitnodiging",
                        "infoTitle": "Review op uitnodiging",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    },
                    "redirectedReview": {
                        "label": "Omgeleid",
                        "infoTitle": "Omgeleide review",
                        "info": "[LINK-BEGIN]Meer informatie[LINK-END] over de soorten reviews"
                    }
                }
            },
            "monthNames": {
                "january": "januari",
                "february": "februari",
                "march": "maart",
                "april": "april",
                "may": "mei",
                "june": "juni",
                "july": "juli",
                "august": "augustus",
                "september": "september",
                "october": "oktober",
                "november": "november",
                "december": "december"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] dag geleden",
                    "plural": "[count] dagen geleden"
                },
                "hours": {
                    "singular": "[count] uur geleden",
                    "plural": "[count] uur geleden"
                },
                "minutes": {
                    "singular": "[count] minuut geleden",
                    "plural": "[count] minuten geleden"
                },
                "seconds": {
                    "singular": "[count] seconde geleden",
                    "plural": "[count] seconden geleden"
                }
            },
            "reviewFilters": {
                "byStars1": "Onze reviews met [star1] sterren",
                "byStars2": "Onze reviews met [star1] en [star2] sterren",
                "byStars3": "Onze reviews met [star1], [star2] en [star3] sterren",
                "byStars4": "Onze reviews met [star1], [star2], [star3] en [star4] sterren",
                "byLatest": "Onze meest recente reviews",
                "byFavoriteOrTag": "Onze favoriete reviews"
            }
        }
    }, {}],
    23: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "recenzja",
                "plural": "recenzji",
                "collectedVia": "Zebrane przez [source]",
                "verifiedVia": "Zweryfikowano i zebrano przez [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Zweryfikowana",
                        "infoTitle": "Zweryfikowana recenzja",
                        "info": "[LINK-BEGIN]Dowiedz się więcej[LINK-END] o typach recenzji"
                    },
                    "invitedReview": {
                        "label": "Na zaproszenie",
                        "infoTitle": "Rezenzja na zaproszenie",
                        "info": "[LINK-BEGIN]Dowiedz się więcej[LINK-END] o typach recenzji"
                    },
                    "redirectedReview": {
                        "label": "Z przekierowana",
                        "infoTitle": "Recenzja z przekierowana",
                        "info": "[LINK-BEGIN]Dowiedz się więcej[LINK-END] o typach recenzji"
                    }
                }
            },
            "monthNames": {
                "january": "stycznia",
                "february": "lutego",
                "march": "marca",
                "april": "kwietnia",
                "may": "maja",
                "june": "czerwca",
                "july": "lipca",
                "august": "sierpnia",
                "september": "września",
                "october": "października",
                "november": "listopada",
                "december": "grudnia"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] dzień temu",
                    "plural": "[count] dni temu"
                },
                "hours": {
                    "singular": "[count] godzinę temu",
                    "plural": "[count] godz. temu"
                },
                "minutes": {
                    "singular": "[count] minutę temu",
                    "plural": "[count] min. temu"
                },
                "seconds": {
                    "singular": "[count] sekundę temu",
                    "plural": "[count] sek. temu"
                }
            },
            "reviewFilters": {
                "byStars1": "Wyświetlamy nasze [star1]-gwiazdkowe recenzje",
                "byStars2": "Wyświetlamy nasze [star1]- i [star2]-gwiazdkowe recenzje",
                "byStars3": "Wyświetlamy nasze [star1]-, [star2]- i [star3]-gwiazdkowe recenzje",
                "byStars4": "Wyświetlamy nasze [star1]-, [star2]-, [star3]- i [star4]-gwiazdkowe recenzje",
                "byLatest": "Wyświetlamy najnowsze recenzje",
                "byFavoriteOrTag": "Wyświetlamy nasze ulubione recenzje"
            }
        }
    }, {}],
    24: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "avaliação",
                "plural": "avaliações",
                "collectedVia": "Recolhida via [source]",
                "verifiedVia": "Verificada, recolhida via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verificada",
                        "infoTitle": "Avaliação verificada",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de avaliação"
                    },
                    "invitedReview": {
                        "label": "Por convite",
                        "infoTitle": "Avaliação por convite",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de avaliação"
                    },
                    "redirectedReview": {
                        "label": "Redirecionada",
                        "infoTitle": "Avaliação redirecionada",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de avaliação"
                    }
                }
            },
            "monthNames": {
                "january": "Janeiro",
                "february": "Fevereiro",
                "march": "Março",
                "april": "Abril",
                "may": "Maio",
                "june": "Junho",
                "july": "Julho",
                "august": "Agosto",
                "september": "Setembro",
                "october": "Outubro",
                "november": "Novembro",
                "december": "Dezembro"
            },
            "timeAgo": {
                "days": {
                    "singular": "há [count] dia",
                    "plural": "há [count] dias"
                },
                "hours": {
                    "singular": "há [count] hora",
                    "plural": "há [count] horas"
                },
                "minutes": {
                    "singular": "há [count] minuto",
                    "plural": "há [count] minutos"
                },
                "seconds": {
                    "singular": "há [count] segundo",
                    "plural": "há [count] segundos"
                }
            },
            "reviewFilters": {
                "byStars1": "Nossas avaliações com [star1] estrela(s)",
                "byStars2": "Nossas avaliações com [star1] & [star2] estrelas",
                "byStars3": "Nossas avaliações com [star1], [star2] & [star3] estrelas",
                "byStars4": "Nossas avaliações com [star1], [star2], [star3] & [star4] estrelas",
                "byLatest": "Mostrando nossas avaliações mais recentes",
                "byFavoriteOrTag": "Mostrando nossas avaliações favoritas"
            }
        }
    }, {}],
    25: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "opinião",
                "plural": "opiniões",
                "collectedVia": "Recolhida via [source]",
                "verifiedVia": "Verificada, recolhida via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verificada",
                        "infoTitle": "Opinião verificada",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de opiniões"
                    },
                    "invitedReview": {
                        "label": "Por convite",
                        "infoTitle": "Opinião por convite",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de opiniões"
                    },
                    "redirectedReview": {
                        "label": "Redireccionada",
                        "infoTitle": "Opinião redireccionada",
                        "info": "[LINK-BEGIN]Saiba mais[LINK-END] sobre os diferentes tipos de opiniões"
                    }
                }
            },
            "monthNames": {
                "january": "Janeiro",
                "february": "Fevereiro",
                "march": "Março",
                "april": "Abril",
                "may": "Maio",
                "june": "Junho",
                "july": "Julho",
                "august": "Agosto",
                "september": "Setembro",
                "october": "Outubro",
                "november": "Novembro",
                "december": "Dezembro"
            },
            "timeAgo": {
                "days": {
                    "singular": "há [count] dia",
                    "plural": "há [count] dias"
                },
                "hours": {
                    "singular": "há [count] hora",
                    "plural": "há [count] horas"
                },
                "minutes": {
                    "singular": "há [count] minuto",
                    "plural": "há [count] minutos"
                },
                "seconds": {
                    "singular": "há [count] segundo",
                    "plural": "há [count] segundos"
                }
            },
            "reviewFilters": {
                "byStars1": "As nossas opiniões com [star1] estrela(s)",
                "byStars2": "As nossas opiniões com [star1] e [star2] estrelas",
                "byStars3": "As nossas opiniões com [star1], [star2] e [star3] estrelas",
                "byStars4": "As nossas opiniões com [star1], [star2], [star3] e [star4] estrelas",
                "byLatest": "As nossas opiniões mais recentes",
                "byFavoriteOrTag": "As nossas opiniões favoritas"
            }
        }
    }, {}],
    26: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "отзыв",
                "plural": "отзывов",
                "collectedVia": "Собрано через [source]",
                "verifiedVia": "Подтверждено, собрано через [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Подтверждено",
                        "infoTitle": "Подтвержденный отзыв",
                        "info": "[LINK-BEGIN]Узнать больше[LINK-END] о типах отзывов"
                    },
                    "invitedReview": {
                        "label": "По приглашению",
                        "infoTitle": "Отзыв по приглашению",
                        "info": "[LINK-BEGIN]Узнать больше[LINK-END] о типах отзывов"
                    },
                    "redirectedReview": {
                        "label": "Перенаправлено",
                        "infoTitle": "Перенаправленный отзыв",
                        "info": "[LINK-BEGIN]Узнать больше[LINK-END] о типах отзывов"
                    }
                }
            },
            "monthNames": {
                "january": "января",
                "february": "февраля",
                "march": "марта",
                "april": "апреля",
                "may": "мая",
                "june": "июня",
                "july": "Июль",
                "august": "августа",
                "september": "сентября",
                "october": "Октябрь",
                "november": "ноября",
                "december": "Декабрь"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] день назад",
                    "plural": "[count] дней назад"
                },
                "hours": {
                    "singular": "[count] час назад",
                    "plural": "[count] часов назад"
                },
                "minutes": {
                    "singular": "[count] минуту назад",
                    "plural": "[count] минут назад"
                },
                "seconds": {
                    "singular": "[count] секунду назад",
                    "plural": "[count] секунд назад"
                }
            },
            "reviewFilters": {
                "byStars1": "Наши отзывы [star1] звезд",
                "byStars2": "Наши отзывы [star1] и [star2] звезд",
                "byStars3": "Наши отзывы [star1], [star2] и [star3] звезд",
                "byStars4": "Наши отзывы [star1], [star2], [star3] и [star4] звезд",
                "byLatest": "Наши недавние отзывы",
                "byFavoriteOrTag": "Наши любимые отзывы"
            }
        }
    }, {}],
    27: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "omdöme",
                "plural": "omdömen",
                "collectedVia": "Insamlat via [source]",
                "verifiedVia": "Verifierat – insamlat via [source]",
                "serviceReviewTypeLabels": {
                    "verifiedReview": {
                        "label": "Verifierat",
                        "infoTitle": "Verifierat omdöme",
                        "info": "[LINK-BEGIN]Läs mer[LINK-END] om olika typer av omdömen"
                    },
                    "invitedReview": {
                        "label": "Med inbjudan",
                        "infoTitle": "Omdöme skrivet efter inbjudan",
                        "info": "[LINK-BEGIN]Läs mer[LINK-END] om olika typer av omdömen"
                    },
                    "redirectedReview": {
                        "label": "Omdirigerat",
                        "infoTitle": "Omdirigerat omdöme",
                        "info": "[LINK-BEGIN]Läs mer[LINK-END] om olika typer av omdömen"
                    }
                }
            },
            "monthNames": {
                "january": "januari",
                "february": "februari",
                "march": "mars",
                "april": "april",
                "may": "maj",
                "june": "juni",
                "july": "juli",
                "august": "augusti",
                "september": "september",
                "october": "oktober",
                "november": "november",
                "december": "december"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] dag sedan",
                    "plural": "[count] dagar sedan"
                },
                "hours": {
                    "singular": "[count] timme sedan",
                    "plural": "[count] timmar sedan"
                },
                "minutes": {
                    "singular": "[count] minut sedan",
                    "plural": "[count] minuter sedan"
                },
                "seconds": {
                    "singular": "[count] sekund sedan",
                    "plural": "[count] sekunder sedan"
                }
            },
            "reviewFilters": {
                "byStars1": "Visar våra [star1]-stjärniga omdömen",
                "byStars2": "Visar våra [star1]- och [star2]-stjärniga omdömen",
                "byStars3": "Visar våra [star1]-, [star2]- och [star3]-stjärniga omdömen",
                "byStars4": "Visar våra [star1]-, [star2]-, [star3]- och [star4]-stjärniga omdömen",
                "byLatest": "Visar våra senaste omdömen",
                "byFavoriteOrTag": "Visar våra favoritomdömen"
            }
        }
    }, {}],
    28: [function(require, module, exports) {
        module.exports = {
            "reviews": {
                "singular": "条评论",
                "plural": "条点评,"
            },
            "monthNames": {
                "january": "一月",
                "february": "二月",
                "march": "三月",
                "april": "四月",
                "may": "五月",
                "june": "六月",
                "july": "七月",
                "august": "八月",
                "september": "九月",
                "october": "十月",
                "november": "十一月",
                "december": "十二月"
            },
            "timeAgo": {
                "days": {
                    "singular": "[count] day ago",
                    "plural": "[count] days ago"
                },
                "hours": {
                    "singular": "[count] hour ago",
                    "plural": "[count] hours ago"
                },
                "minutes": {
                    "singular": "[count] minute ago",
                    "plural": "[count] minutes ago"
                },
                "seconds": {
                    "singular": "[count] second ago",
                    "plural": "[count] seconds ago"
                }
            },
            "reviewFilters": {
                "byStars1": "Showing our [star1] star reviews",
                "byStars2": "Showing our [star1] & [star2] star reviews",
                "byStars3": "Showing our [star1], [star2] & [star3] star reviews",
                "byStars4": "Showing our [star1], [star2], [star3] & [star4] star reviews",
                "byLatest": "Showing our latest reviews",
                "byFavoriteOrTag": "Showing our favorite reviews"
            }
        }
    }, {}],
    29: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.apiCall = undefined;

        var _xhr = require('../xhr');

        var _xhr2 = _interopRequireDefault(_xhr);

        var _queryString = require('../queryString');

        var _rootUri = require('../rootUri');

        var _rootUri2 = _interopRequireDefault(_rootUri);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        // Make a random ID where an apiCall requires one.
        var makeId = function makeId(numOfChars) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < numOfChars; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        /* eslint-disable compat/compat */
        var apiCall = function apiCall(uri, params) {
            return new Promise(function(resolve, fail) {
                var values = void 0;
                var url = void 0;

                if (uri.indexOf('/') === 0) {
                    values = params || {};

                    var _getQuerystringAsObje = (0, _queryString.getAsObject)(),
                        token = _getQuerystringAsObje.token;

                    if (token) {
                        values.random = makeId(20);
                    }
                }

                if (uri.indexOf('http') === 0) {
                    // is a full url from a paging link, ensure https
                    url = uri.replace(/^https?:/, 'https:');
                } else if (uri.indexOf('/') === 0) {
                    // is a regular "/v1/..." add domain for local testing (value is empty in prod)
                    url = (0, _rootUri2.default)() + uri;
                } else {
                    // weird/broken url
                    return fail();
                }

                return (0, _xhr2.default)({
                    url: url,
                    data: values,
                    success: resolve,
                    error: fail
                });
            });
        };

        exports.apiCall = apiCall;
        /* eslint-enable compat/compat */

    }, {
        "../queryString": 43,
        "../rootUri": 45,
        "../xhr": 64
    }],
    64: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* global ActiveXObject */

        function isIE() {
            var myNav = navigator.userAgent.toLowerCase();
            return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1]) : false;
        }

        // adapted (stolen) from https://github.com/toddmotto/atomic

        function parse(req) {
            try {
                return JSON.parse(req.responseText);
            } catch (e) {
                return req.responseText;
            }
        }

        // http://stackoverflow.com/a/1714899
        function toQueryString(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            }
            return str.join('&');
        }

        function noop() {}

        function makeRequest(params) {
            var XMLHttpRequest = window.XMLHttpRequest || ActiveXObject;
            var request = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
            request.open(params.type, params.url, true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        params.success(parse(request));
                    } else {
                        params.error(parse(request));
                    }
                }
            };

            request.send(params.data);
        }

        /* IE9-compatible request function.

        IE9 does not permit cross-origin HTTP requests in the usual way. It also does
        not permit a request to be made to a URI with a different protocol from that
        of the page, e.g. an HTTPS request from an HTTP page.

        This function makes requests in a manner compatible with IE9's limitations.
        */
        function makeRequestIE(params) {
            var request = new window.XDomainRequest();
            var protocol = window.location.protocol;
            params.url = params.url.replace(/https?:/, protocol);
            request.open(params.type, params.url);
            request.onload = function() {
                params.success(parse(request));
            };
            request.onerror = function() {
                params.error(parse(request));
            };

            setTimeout(function() {
                request.send(params.data);
            }, 0);
        }

        function xhr(options) {
            var params = {
                type: options.type || 'GET',
                error: options.error || noop,
                success: options.success || noop,
                data: options.data,
                url: options.url || ''
            };

            if (params.type === 'GET' && params.data) {
                params.url = params.url + '?' + toQueryString(params.data);
                delete params.data;
            }

            if (isIE() && isIE() <= 9) {
                makeRequestIE(params);
            } else {
                makeRequest(params);
            }
        }

        exports.default = xhr;

    }, {}],
    45: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        exports.default = function() {
            var host = '#{WidgetApi.Host}';
            return host.indexOf('#') === 0 ? 'https://widget.tp-staging.com' : host;
        };

    }, {}],
    30: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.hasProductReviews = exports.hasServiceReviewsMultiFetch = exports.hasServiceReviews = /* common-shake removed: exports.constructTrustBoxAndComplete = */ exports.multiFetchData = exports.fetchData = undefined;

        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _call = require('./call');

        var _utils = require('../utils');

        var _loader = require('../templates/loader');

        var _errorFallback = require('../templates/errorFallback');

        var _communication = require('../communication');

        var _fn = require('../fn');

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }

        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }

        /**
         * Define a unique single fetch object key, allowing us to flatten back to a
         * single set of base data. This is arbitrary, and has been selected to ensure
         * it will not be accidentally used in a fetchParamsObject.
         */
        var singleFetchObjectKey = 'default_singleFetch_f98ac77b';

        /**
         * Flatten a fetchParamsObject value to one single set of fetchParams, where
         * that object contains only one value, and it is indexed by
         * singleFetchObjectKey.
         */
        var flattenSingleParams = function flattenSingleParams(fetchParamsObject) {
            var keys = Object.keys(fetchParamsObject);
            return singleFetchObjectKey in fetchParamsObject && keys.length === 1 ? fetchParamsObject[singleFetchObjectKey] : fetchParamsObject;
        };

        /**
         * Check if business has service reviews
         */
        var hasServiceReviews = function hasServiceReviews(_ref) {
            var total = _ref.businessEntity.numberOfReviews.total;
            return total > 0;
        };

        /**
         * Check if a business has service reviews using multi-fetch.
         *
         * This checks that any of the base data sets has service reviews present
         * within it.
         */
        var hasServiceReviewsMultiFetch = function hasServiceReviewsMultiFetch(baseData) {
            var keys = Object.keys(baseData);
            return keys.some(function(k) {
                return hasServiceReviews(baseData[k]);
            });
        };

        /**
         * Check if business has imported or regular product reviews
         */
        var hasProductReviews = function hasProductReviews(_ref2) {
            var productReviewsSummary = _ref2.productReviewsSummary,
                importedProductReviewsSummary = _ref2.importedProductReviewsSummary;

            var totalProductReviews = productReviewsSummary ? productReviewsSummary.numberOfReviews.total : 0;
            var totalImportedProductReviews = importedProductReviewsSummary ? importedProductReviewsSummary.numberOfReviews.total : 0;

            return totalProductReviews + totalImportedProductReviews > 0;
        };

        // Construct a base data call promise.
        var baseDataCall = function baseDataCall(uri) {
            return function(_ref3) {
                var businessUnitId = _ref3.businessUnitId,
                    locale = _ref3.locale,
                    opts = _objectWithoutProperties(_ref3, ['businessUnitId', 'locale']);

                var baseDataParams = (0, _fn.rejectNullaryValues)(_extends({
                    businessUnitId: businessUnitId,
                    locale: locale
                }, opts, {
                    theme: null // Force rejection of the theme param
                }));
                return (0, _call.apiCall)(uri, baseDataParams);
            };
        };

        /**
         * Call a constructTrustBox callback, and then complete the loading process
         * for the TrustBox.
         */
        var constructTrustBoxAndComplete = function constructTrustBoxAndComplete(constructTrustBox) {
            var passToPopup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var hasReviewsFromBaseData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : hasServiceReviews;
            return function(_ref4) {
                var baseData = _ref4.baseData,
                    locale = _ref4.locale,
                    theme = _ref4.theme,
                    hasMoreReviews = _ref4.hasMoreReviews,
                    loadMoreReviews = _ref4.loadMoreReviews;

                var hasReviews = hasReviewsFromBaseData(baseData);

                constructTrustBox({
                    baseData: baseData,
                    locale: locale,
                    hasMoreReviews: hasMoreReviews,
                    loadMoreReviews: loadMoreReviews
                });

                // Conditionally send to popup
                var sendOnPopupLoad = function sendOnPopupLoad(_ref5) {
                    var event = _ref5.data;

                    if ((0, _communication.isLoadedMessage)(event)) {
                        (0, _communication.sendAPIDataMessage)({
                            baseData: baseData,
                            locale: locale
                        });
                    }
                };
                if (passToPopup) {
                    (0, _communication.setListener)(sendOnPopupLoad);
                }

                (0, _utils.showTrustBox)(theme, hasReviews);
                (0, _errorFallback.removeErrorFallback)();
            };
        };

        /**
         * Fetch data from the data API, making zero or more requests.
         *
         * This function accepts an object with arbitrary keys, and values which are
         * each an object containing query params for one request. A request is made
         * for each query param object, and the result is wrapped within an object
         * indexed by the keys of the original argument object.
         *
         * These data, together with locale data, are passed to the
         * constructTrustBox callback.
         *
         * An optional argument, passToPopup, can be provided to this function. If set
         * to a truthy value, this function will attempt to pass the data obtained to
         * any popup iframe.
         */
        var multiFetchData = function multiFetchData(uri) {
            return function(fetchParamsObject, constructTrustBox, passToPopup, hasReviewsFromBaseData) {
                var firstFetchParams = fetchParamsObject[Object.keys(fetchParamsObject)[0]];
                var locale = firstFetchParams.locale,
                    _firstFetchParams$the = firstFetchParams.theme,
                    theme = _firstFetchParams$the === undefined ? 'light' : _firstFetchParams$the;


                var baseDataPromises = (0, _fn.promiseAllObject)((0, _fn.mapObject)(baseDataCall(uri), fetchParamsObject));
                var readyPromise = (0, _utils.getOnPageReady)();

                // eslint-disable-next-line compat/compat
                var fetchPromise = Promise.all([baseDataPromises, readyPromise]).then(function(_ref6) {
                    var _ref7 = _slicedToArray(_ref6, 1),
                        originalBaseData = _ref7[0];

                    var baseData = flattenSingleParams(originalBaseData);

                    return {
                        baseData: baseData,
                        locale: locale,
                        theme: theme
                    };
                }).then(constructTrustBoxAndComplete(constructTrustBox, passToPopup, hasReviewsFromBaseData)).catch(function(e) {
                    if (e && e.FallbackLogo) {
                        // render fallback only if allowed, based on the response
                        return (0, _errorFallback.errorFallback)();
                    }
                    // do nothing
                });

                (0, _loader.withLoader)(fetchPromise);
            };
        };

        // Fetch and structure API data.
        var fetchData = function fetchData(uri) {
            return function(fetchParams, constructTrustBox, passToPopup, hasReviewsFromBaseData) {
                var fetchParamsObject = _defineProperty({}, singleFetchObjectKey, fetchParams);
                multiFetchData(uri)(fetchParamsObject, constructTrustBox, passToPopup, hasReviewsFromBaseData);
            };
        };

        exports.fetchData = fetchData;
        exports.multiFetchData = multiFetchData;
        /* common-shake removed: exports.constructTrustBoxAndComplete = */
        void constructTrustBoxAndComplete;
        exports.hasServiceReviews = hasServiceReviews;
        exports.hasServiceReviewsMultiFetch = hasServiceReviewsMultiFetch;
        exports.hasProductReviews = hasProductReviews;

    }, {
        "../communication": 37,
        "../fn": 39,
        "../templates/errorFallback": 52,
        "../templates/loader": 53,
        "../utils": 63,
        "./call": 29
    }],
    37: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.scrollToTrustBox = */
        exports.onPong = exports.ping = /* common-shake removed: exports.isPopupToggleMessage = */ /* common-shake removed: exports.isAPIDataMessage = */ exports.sendAPIDataMessage = exports.isLoadedMessage = exports.setListener = /* common-shake removed: exports.resizeHeight = */ /* common-shake removed: exports.setStyles = */ /* common-shake removed: exports.loaded = */ /* common-shake removed: exports.focusModal = */ /* common-shake removed: exports.hideModal = */ /* common-shake removed: exports.showModal = */ /* common-shake removed: exports.focusPopup = */ /* common-shake removed: exports.hidePopup = */ /* common-shake removed: exports.showPopup = */ /* common-shake removed: exports.hideTrustBox = */ /* common-shake removed: exports.createModal = */ /* common-shake removed: exports.createPopup = */ /* common-shake removed: exports.send = */ undefined;

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _utils = require('./utils.js');

        var wparent = window.parent;
        var messageQueue = [];
        var defaultOptions = {
            command: 'createIFrame',
            position: 'center top',
            show: false,
            source: 'popup.html',
            queryString: ''
        };
        var popupOptions = {
            name: 'popup',
            modal: false,
            styles: {
                height: '300px',
                width: ''
            }
        };
        var modalOptions = {
            name: 'modal',
            modal: true,
            styles: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                margin: '0 auto',
                zindex: 99
            }
        };

        var id = null;
        var listenerCallbacks = [];

        function sendMessage(message) {
            if (id) {
                message.widgetId = id;
                message = JSON.stringify(message); // This is to make it IE8 compatible
                wparent.postMessage(message, '*');
            } else {
                messageQueue.push(message);
            }
        }

        function sendMessageTo(target) {
            return function(message) {
                var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return sendMessage(_extends({}, payload, {
                    message: message,
                    command: 'message',
                    name: target
                }));
            };
        }

        function sendQueue() {
            while (messageQueue.length) {
                sendMessage(messageQueue.pop());
            }
        }

        function createPopupIframe(options) {
            sendMessage(_extends({}, defaultOptions, popupOptions, options));
        }

        function createModalIframe(options) {
            sendMessage(_extends({}, defaultOptions, modalOptions, options));
        }

        function setStyles(styles, optionalIframeName) {
            sendMessage({
                command: 'setStyle',
                name: optionalIframeName,
                style: styles
            });
        }

        function showIframe(iframeName) {
            sendMessage({
                command: 'show',
                name: iframeName
            });
            sendMessageTo('main')(iframeName + ' toggled', {
                visible: true
            });
        }

        function hideIframe(iframeName) {
            sendMessage({
                command: 'hide',
                name: iframeName
            });
            sendMessageTo('main')(iframeName + ' toggled', {
                visible: false
            });
        }

        function focusIframe(iframeName) {
            sendMessage({
                command: 'focus',
                name: iframeName
            });
        }

        function sendLoadedMessage() {
            sendMessage({
                command: 'loaded'
            });
        }

        function isLoadedMessage(message) {
            return message === 'loaded';
        }

        /**
         * Send data obtained from an API call to a popup iframe.
         */
        function sendAPIDataMessage(data) {
            sendMessageTo('popup')('API data', data);
        }

        /**
         * Test if two messages are of the same type.
         *
         * Ignores any additional data contained within the message.
         */
        function areMatchingMessages(message, otherMessage) {
            return ['message', 'command', 'name'].every(function(key) {
                return message[key] && otherMessage[key] && message[key] === otherMessage[key];
            });
        }

        function isAPIDataMessage(message) {
            return areMatchingMessages(message, {
                command: 'message',
                name: 'popup',
                message: 'API data'
            });
        }

        function isPopupToggleMessage(message) {
            return areMatchingMessages(message, {
                command: 'message',
                name: 'main',
                message: 'popup toggled'
            });
        }

        function addCallbackFunction(func) {
            listenerCallbacks.push(func);
        }

        function hideMainIframe() {
            hideIframe('main');
        }

        function showPopupIframe() {
            showIframe('popup');
        }

        function hidePopupIframe() {
            hideIframe('popup');
        }

        function focusPopupIframe() {
            focusIframe('popup');
        }

        function showModalIframe() {
            showIframe('modal');
        }

        function hideModalIframe() {
            hideIframe('modal');
        }

        function focusModalIframe() {
            focusIframe('modal');
        }

        var sendPing = function sendPing() {
            return sendMessage({
                command: 'ping'
            });
        };

        var onPong = function onPong(cb) {
            var pong = function pong(event) {
                if (event.data.command === 'pong') {
                    // eslint-disable-next-line callback-return
                    cb(event);
                }
            };
            addCallbackFunction(pong);
        };

        function resizeHeight(optionalHeight, optionalIframeName) {
            var body = document.getElementsByTagName('body')[0];
            sendMessage({
                command: 'resize-height',
                name: optionalIframeName,
                height: optionalHeight || body.offsetHeight
            });
        }

        function scrollToTrustBox(targets) {
            sendMessage({
                command: 'scrollTo',
                targets: targets
            });
        }

        (0, _utils.addEventListener)(window, 'message', function(event) {
            if (typeof event.data !== 'string') {
                return;
            }

            var e = void 0;
            try {
                e = {
                    data: JSON.parse(event.data)
                }; // This is to make it IE8 compatible
            } catch (e) {
                return; // probably not for us
            }

            if (e.data.command === 'setId') {
                id = e.data.widgetId;
                sendQueue();
            } else {
                for (var i = 0; i < listenerCallbacks.length; i++) {
                    var callback = listenerCallbacks[i];
                    // eslint-disable-next-line callback-return
                    callback(e);
                }
            }
        });

        /* common-shake removed: exports.send = */
        void sendMessage;
        /* common-shake removed: exports.createPopup = */
        void createPopupIframe;
        /* common-shake removed: exports.createModal = */
        void createModalIframe;
        /* common-shake removed: exports.hideTrustBox = */
        void hideMainIframe;
        /* common-shake removed: exports.showPopup = */
        void showPopupIframe;
        /* common-shake removed: exports.hidePopup = */
        void hidePopupIframe;
        /* common-shake removed: exports.focusPopup = */
        void focusPopupIframe;
        /* common-shake removed: exports.showModal = */
        void showModalIframe;
        /* common-shake removed: exports.hideModal = */
        void hideModalIframe;
        /* common-shake removed: exports.focusModal = */
        void focusModalIframe;
        /* common-shake removed: exports.loaded = */
        void sendLoadedMessage;
        /* common-shake removed: exports.setStyles = */
        void setStyles;
        /* common-shake removed: exports.resizeHeight = */
        void resizeHeight;
        exports.setListener = addCallbackFunction;
        exports.isLoadedMessage = isLoadedMessage;
        exports.sendAPIDataMessage = sendAPIDataMessage;
        /* common-shake removed: exports.isAPIDataMessage = */
        void isAPIDataMessage;
        /* common-shake removed: exports.isPopupToggleMessage = */
        void isPopupToggleMessage;
        exports.ping = sendPing;
        exports.onPong = onPong;
        /* common-shake removed: exports.scrollToTrustBox = */
        void scrollToTrustBox;

    }, {
        "./utils.js": 63
    }],
    39: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }

        // Convert reduce method into a function
        var reduce = function reduce(f) {
            return function(init) {
                return function(xs) {
                    return xs.reduce(f, init);
                };
            };
        };

        // Convert filter method into a function
        var filter = function filter(p) {
            return function(xs) {
                return xs.filter(p);
            };
        };

        // Convert map method into a function
        var map = function map(f) {
            return function(xs) {
                return xs.map(f);
            };
        };

        // Implementation of map, but for an object. Values are replaced with the result
        // of calling the passed function of them; keys remain unchanged.
        var mapObject = function mapObject(f, obj) {
            return Object.keys(obj).reduce(function(all, k) {
                return _extends({}, all, _defineProperty({}, k, f(obj[k])));
            }, {});
        };

        // Transforms an object containing arbitrary keys, and promise values, into a
        // promise-wrapped object, with the same keys and the result of resolving each
        // promise as values.
        var promiseAllObject = function promiseAllObject(obj) {
            var keys = Object.keys(obj);
            var values = keys.map(function(k) {
                return obj[k];
            });
            // eslint-disable-next-line compat/compat
            return Promise.all(values).then(function(promises) {
                return promises.reduce(function(all, promise, idx) {
                    return _extends({}, all, _defineProperty({}, keys[idx], promise));
                }, {});
            });
        };

        /**
         * Convert an array containing pairs of values into an object.
         *
         *   [[k1, v1], [k2, v2], ... ] -> { [k1]: v1, [k2]: v2, ... }
         */
        var pairsToObject = function pairsToObject(pairs) {
            return pairs.reduce(function(obj, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    k = _ref2[0],
                    v = _ref2[1];

                return _extends({}, obj, _defineProperty({}, k, v));
            }, {});
        };

        var isNullary = function isNullary(value) {
            return typeof value === 'undefined' || value === null;
        };

        var isNullaryOrFalse = function isNullaryOrFalse(value) {
            return isNullary(value) || value === false;
        };

        // Filter out all null or undefined values from an object.
        var rejectNullaryValues = function rejectNullaryValues(obj) {
            return Object.keys(obj).reduce(function(newObj, key) {
                return _extends({}, newObj, isNullary(obj[key]) ? {} : _defineProperty({}, key, obj[key]));
            }, {});
        };

        /**
         * Split an array of values into chunks of a given size.
         *
         * If the number of values does not divide evenly into the chunk size, the
         * final chunk will be smaller than chunkSize.
         *
         *   chunk 2 [a, b, c, d, e, f, g] -> [[a, b], [c, d], [e, f], [g]]
         */
        var chunk = function chunk(chunkSize) {
            return reduce(function(chunks, val, idx) {
                var lastChunk = chunks[chunks.length - 1];
                var isNewChunk = idx % chunkSize === 0;
                var newChunk = isNewChunk ? [val] : [].concat(_toConsumableArray(lastChunk), [val]);
                return [].concat(_toConsumableArray(chunks.slice(0, chunks.length - (isNewChunk ? 0 : 1))), [newChunk]);
            })([]);
        };

        /**
         * Split an array of values into chunks of a given size, and then transpose values.
         *
         * This is equivalent to {@link 'chunk'}, but with the values transposed:
         *
         *   chunkTranspose 2 [a, b, c, d, e, f, g] -> [[a, c, e, g], [b, d, f]]
         *
         * The transposition has the effect of turning an array of x chunks of size n,
         * into an array of n chunks of size x.
         */
        var chunkTranspose = function chunkTranspose(chunkSize) {
            return reduce(function(chunks, val, idx) {
                var chunkIdx = idx % chunkSize;
                var newChunk = [].concat(_toConsumableArray(chunks[chunkIdx] || []), [val]);
                return [].concat(_toConsumableArray(chunks.slice(0, chunkIdx)), [newChunk], _toConsumableArray(chunks.slice(chunkIdx + 1)));
            })([]);
        };

        /**
         * Compose a series of functions together.
         *
         * Equivalent to applying an array of functions to a value, right to left.
         *
         *   compose(f, g, h)(x) === f(g(h(x)))
         *
         */
        var compose = function compose() {
            for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
                fs[_key] = arguments[_key];
            }

            return function(x) {
                return fs.reduceRight(function(val, f) {
                    return f(val);
                }, x);
            };
        };

        // Pipe a value through a series of functions which terminates immediately on
        // receiving a nullary value.
        var pipeMaybe = function pipeMaybe() {
            for (var _len2 = arguments.length, fs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                fs[_key2] = arguments[_key2];
            }

            return function(x) {
                return fs.reduce(function(val, f) {
                    return isNullary(val) ? val : f(val);
                }, x);
            };
        };

        // Get first value from an array
        var first = function first(_ref4) {
            var _ref5 = _slicedToArray(_ref4, 1),
                x = _ref5[0];

            return x;
        };

        // First first value matching predicate p in an array of values.
        var find = function find(p) {
            return pipeMaybe(filter(p), first);
        };

        // Get a value from an object at a given key.
        var prop = function prop(k) {
            return function() {
                var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return obj[k];
            };
        };

        // Get a value from an object at a given key if it exists.
        var propMaybe = function propMaybe(k) {
            return function() {
                var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return obj[k] || obj;
            };
        };

        // Test if a value is false or nullary, returning null if true, or a second value if false.
        // Intended for use within a pipeMaybe where you want to terminate execution where
        // an arbitrary value is null.
        var guard = function guard(p) {
            return function(x) {
                return isNullaryOrFalse(p) ? null : x;
            };
        };

        /* common-shake removed: exports.chunk = */
        void chunk;
        /* common-shake removed: exports.chunkTranspose = */
        void chunkTranspose;
        exports.compose = compose;
        /* common-shake removed: exports.filter = */
        void filter;
        exports.find = find;
        /* common-shake removed: exports.first = */
        void first;
        exports.guard = guard;
        exports.map = map;
        exports.mapObject = mapObject;
        exports.pairsToObject = pairsToObject;
        exports.pipeMaybe = pipeMaybe;
        exports.promiseAllObject = promiseAllObject;
        exports.prop = prop;
        exports.propMaybe = propMaybe;
        exports.rejectNullaryValues = rejectNullaryValues;

    }, {}],
    52: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.removeErrorFallback = exports.errorFallback = undefined;

        var _dom = require('../dom');

        var _templating = require('../templating');

        var _utils = require('../utils');

        var errorFallback = function errorFallback() {
            var containerElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-fallback';

            var container = document.getElementById(containerElement);

            (0, _dom.populateElements)([{
                element: container,
                string: (0, _templating.a)({
                    href: 'https://www.trustpilot.com?utm_medium=trustboxfallback',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }, (0, _templating.mkElemWithSvgLookup)('logo', 'fallback-logo'))
            }]);
        };

        var removeErrorFallback = function removeErrorFallback() {
            var containerElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tp-widget-fallback';

            var container = document.getElementById(containerElement);
            (0, _utils.removeElement)(container);
        };

        exports.errorFallback = errorFallback;
        exports.removeErrorFallback = removeErrorFallback;

    }, {
        "../dom": 38,
        "../templating": 58,
        "../utils": 63
    }],
    53: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.withLoader = undefined;

        var _dom = require('../dom');

        var _utils = require('../utils');

        var _templating = require('../templating');

        var defaultLoaderContainer = 'tp-widget-loader';

        var addLoader = function addLoader(loaderElement) {
            var loader = document.getElementById(loaderElement);

            (0, _dom.populateElements)([{
                element: loader,
                string: (0, _templating.mkElemWithSvgLookup)('logo')
            }]);
        };

        var removeLoader = function removeLoader(loaderElement) {
            var loader = document.getElementById(loaderElement);
            var loaderLoadedClass = loaderElement + '--loaded';
            (0, _dom.addClass)(loader, loaderLoadedClass);

            // Remove loader after completion of animation.
            if (loader) {
                loader.addEventListener('animationend', function() {
                    return (0, _utils.removeElement)(loader);
                });
                loader.addEventListener('webkitAnimationEnd', function() {
                    return (0, _utils.removeElement)(loader);
                });
                loader.addEventListener('oanimationend', function() {
                    return (0, _utils.removeElement)(loader);
                });
            }
        };

        // Creates a loader element in the DOM, then resolves a passed promise and removes
        // the loader once complete. The loader is displayed only after the passed delay
        // has elapsed.
        var withLoader = function withLoader(promise) {
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$loaderElement = _ref.loaderElement,
                loaderElement = _ref$loaderElement === undefined ? defaultLoaderContainer : _ref$loaderElement,
                _ref$delay = _ref.delay,
                delay = _ref$delay === undefined ? 1000 : _ref$delay;

            var loaderTimeoutId = setTimeout(function() {
                return addLoader(loaderElement);
            }, delay);
            return promise.finally(function() {
                clearTimeout(loaderTimeoutId);
                removeLoader(loaderElement);
            });
        };

        exports.withLoader = withLoader;

    }, {
        "../dom": 38,
        "../templating": 58,
        "../utils": 63
    }],
    32: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.fetchProductReview = */
        /* common-shake removed: exports.fetchProductData = */
        undefined;

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _fetchData = require('./fetchData');

        var _call = require('./call');

        var _reviewFetcher = require('./reviewFetcher');

        var _reviewFetcher2 = _interopRequireDefault(_reviewFetcher);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }

        /**
         * Fetches data for a product attribute TrustBox.
         *
         * This uses a "new-style" endpoint, which takes a templateId and supplies data
         * based on that.
         */
        var fetchProductData = function fetchProductData(templateId) {
            return function(fetchParams, constructTrustBox) {
                var passToPopup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var includeImportedReviews = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                // Add extra data to the constructTrustBox callback, where we are fetching reviews
                var wrappedConstruct = function wrappedConstruct(_ref) {
                    var baseData = _ref.baseData,
                        locale = _ref.locale,
                        args = _objectWithoutProperties(_ref, ['baseData', 'locale']);

                    var fetcher = new _reviewFetcher2.default(_extends({
                        baseData: baseData,
                        includeImportedReviews: includeImportedReviews,
                        reviewsPerPage: parseInt(fetchParams.reviewsPerPage),
                        locale: locale
                    }, args));
                    return fetcher.consumeReviews(constructTrustBox)();
                };

                var construct = fetchParams.reviewsPerPage > 0 ? wrappedConstruct : constructTrustBox;
                (0, _fetchData.fetchData)('/trustbox-data/' + templateId)(fetchParams, construct, passToPopup, _fetchData.hasProductReviews);
            };
        };

        /**
         * Fetches product review data given an ID and a locale.
         */
        var fetchProductReview = function fetchProductReview(productReviewId, locale, callback) {
            (0, _call.apiCall)('/product-reviews/' + productReviewId, {
                locale: locale
            }).then(callback);
        };

        /* common-shake removed: exports.fetchProductData = */
        void fetchProductData;
        /* common-shake removed: exports.fetchProductReview = */
        void fetchProductReview;

    }, {
        "./call": 29,
        "./fetchData": 30,
        "./reviewFetcher": 33
    }],
    33: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _fn = require('../../fn');

        var _call = require('../call');

        var _util = require('./util');

        var _responseProcessor = require('./responseProcessor');

        var _responseProcessor2 = _interopRequireDefault(_responseProcessor);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var NO_REVIEWS_ERROR = 'No reviews available';

        /**
         * This class provides reviews on request of a consumer. It collects reviews
         * through paginated API calls, and then provides one page of reviews on request
         * from the consumer.
         *
         * Three methods are exposed as intended for use: {@link ReviewFetcher#consumeReviews},
         * {@link ReviewFetcher#produceReviews}, and {@link ReviewFetcher#hasMoreReviews}. Other
         * methods should be considered private.
         */

        var ReviewFetcher = function() {
            /**
             * Construct a ReviewFetcher.
             *
             * The constructor takes an object containing options and data required to
             * obtain and produce reviews for consumption.
             *
             * @param {Object} args - An object containing the arguments below.
             * @param {number} args.reviewsPerPage - The number of reviews to provide per
             * request.
             * @param {boolean} args.includeImportedReviews - Whether to include imported
             * reviews in the reviews provided.
             * @param {Object} args.baseData - The baseData response received from a base-data
             * call.
             * @param {...Object} args.wrapArgs - An arbitrary set of arguments to add to
             * the data provided to the callback in {@link ReviewFetcher#consumeReviews}.
             */
            function ReviewFetcher(_ref) {
                var reviewsPerPage = _ref.reviewsPerPage,
                    includeImportedReviews = _ref.includeImportedReviews,
                    baseData = _ref.baseData,
                    wrapArgs = _objectWithoutProperties(_ref, ['reviewsPerPage', 'includeImportedReviews', 'baseData']);

                _classCallCheck(this, ReviewFetcher);

                // Get next page links from a base data response.
                var getBaseDataNextPageLinks = (0, _util.getNextPageLinks)(function(responseKey) {
                    return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.prop)('nextPage'));
                });

                this.reviewsPerPage = reviewsPerPage;
                this.includeImportedReviews = includeImportedReviews;
                this.baseData = baseData;
                this.nextPage = getBaseDataNextPageLinks(baseData, includeImportedReviews);
                this.wrapArgs = wrapArgs;

                this.reviews = this._makeResponseProcessor(baseData).getReviews();
            }

            /**
             * Consume a number of reviews using a callback function.
             *
             * This method gets one page of reviews, and combines this with the data in
             * the wrapArgs field and passes it all to a callback. The return value is
             * wrapped in an anonymous function to make it suitable for use within event
             * handlers.
             *
             * @param {Function} callback - A function to call with a set of review data.
             */


            _createClass(ReviewFetcher, [{
                key: 'consumeReviews',
                value: function consumeReviews(callback) {
                    var _this = this;

                    return function() {
                        return _this.produceReviews().then(function(reviews) {
                            return callback(_extends({}, _this.wrapArgs, {
                                baseData: _this.baseData,
                                reviews: reviews,
                                hasMoreReviews: _this.hasMoreReviews,
                                loadMoreReviews: _this.consumeReviews.bind(_this)
                            }));
                        }).catch(function(err) {
                            if (err === NO_REVIEWS_ERROR) {
                                return callback(_extends({}, _this.wrapArgs, {
                                    baseData: _this.baseData,
                                    reviews: [],
                                    hasMoreReviews: false,
                                    loadMoreReviews: _this.consumeReviews.bind(_this)
                                }));
                            } else {
                                // Rethrow error which is unexpected
                                throw err;
                            }
                        });
                    };
                }

                /**
                 * Produce a number of reviews.
                 *
                 * This method produces one page of reviews. It may require to fetch additional
                 * reviews from an API if there are insufficent reviews available locally. The
                 * reviews are thus returned wrapped in a Promise.
                 */

            }, {
                key: 'produceReviews',
                value: function produceReviews() {
                    var _this2 = this;

                    var processResponse = function processResponse(response) {
                        var _reviews;

                        var responseProcessor = _this2._makeResponseProcessor(response);
                        _this2.nextPage = responseProcessor.getNextPageLinks();
                        (_reviews = _this2.reviews).push.apply(_reviews, _toConsumableArray(responseProcessor.getReviews()));
                        return _this2._takeReviews();
                    };

                    if (this.reviews.length === 0) {
                        // eslint-disable-next-line compat/compat
                        return Promise.reject(NO_REVIEWS_ERROR);
                    }
                    return this.reviewsPerPage >= this.reviews.length ? this._fetchReviews().then(processResponse) : // eslint-disable-next-line compat/compat
                        Promise.resolve(this._takeReviews());
                }

                /**
                 * Flag whether more reviews are available for consumption.
                 *
                 * Where true, this means it is possible to load more reviews. If false, no
                 * more reviews are available.
                 */

            }, {
                key: '_takeReviews',


                // Private Methods //

                /**
                 * Take a page of reviews from internal cache of reviews, removing these and
                 * returning them from the method.
                 */
                value: function _takeReviews() {
                    return this.reviews.splice(0, this.reviewsPerPage);
                }

                /**
                 * Fetch more reviews from the API.
                 */

            }, {
                key: '_fetchReviews',
                value: function _fetchReviews() {
                    return (0, _fn.promiseAllObject)((0, _fn.mapObject)(_call.apiCall, this.nextPage));
                }

                /**
                 * Construct a {@link ResponseProcessor} instance using properties from this instance.
                 */

            }, {
                key: '_makeResponseProcessor',
                value: function _makeResponseProcessor(response) {
                    return new _responseProcessor2.default(response, {
                        includeImportedReviews: this.includeImportedReviews,
                        displayName: this.baseData.businessEntity.displayName
                    });
                }
            }, {
                key: 'hasMoreReviews',
                get: function get() {
                    return this.reviews.length > 0;
                }
            }]);

            return ReviewFetcher;
        }();

        exports.default = ReviewFetcher;

    }, {
        "../../fn": 39,
        "../call": 29,
        "./responseProcessor": 34,
        "./util": 35
    }],
    35: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getNextPageLinks = undefined;

        var _fn = require('../../fn');

        /**
         * Get next page links from a response.
         *
         * This function take a getter function, used to extract a particular type of link,
         * either for productReviews or importedProductReviews. It returns a function which
         * take a response and a flag to indicate whether to include imported reviews. This
         * can then be called to obtain available next page links.
         */
        var getNextPageLinks = function getNextPageLinks(getter) {
            return function(response) {
                var includeImportedReviews = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                var productReviews = getter('productReviews')(response);
                var importedProductReviews = (0, _fn.pipeMaybe)((0, _fn.guard)(includeImportedReviews), getter('importedProductReviews'))(response);
                return (0, _fn.rejectNullaryValues)({
                    productReviews: productReviews,
                    importedProductReviews: importedProductReviews
                });
            };
        };

        exports.getNextPageLinks = getNextPageLinks;

    }, {
        "../../fn": 39
    }],
    34: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _fn = require('../../fn');

        var _util = require('./util');

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        /**
         * This class processes an API response containing reviews and pagination
         * data.
         */
        var ReviewResponseProcessor = function() {
            /**
             * Create a ReviewResponseProcessor instance.
             *
             * Takes an API response object for processing, together with a short list
             * of options for processing and annotating reviews.
             */
            function ReviewResponseProcessor(response, _ref) {
                var includeImportedReviews = _ref.includeImportedReviews,
                    displayName = _ref.displayName;

                _classCallCheck(this, ReviewResponseProcessor);

                this.response = response;
                this.includeImportedReviews = includeImportedReviews;
                this.displayName = displayName;
            }

            /**
             * Get a combined list of reviews from the API response.
             *
             * This method extracts all reviews from the response, including optionally
             * imported reviews, and then combines and sorts these by date, descending.
             */


            _createClass(ReviewResponseProcessor, [{
                key: 'getReviews',
                value: function getReviews() {
                    var _this = this;

                    var _response = this.response,
                        productReviews = _response.productReviews,
                        importedProductReviews = _response.importedProductReviews;

                    var orderByCreatedAtDesc = function orderByCreatedAtDesc(_ref2, _ref3) {
                        var c1 = _ref2.createdAt;
                        var c2 = _ref3.createdAt;
                        return new Date(c2) - new Date(c1);
                    };
                    var productReviewsList = (0, _fn.pipeMaybe)((0, _fn.propMaybe)('productReviews'), (0, _fn.propMaybe)('reviews'))(productReviews) || [];

                    var importedReviewsList = (0, _fn.pipeMaybe)((0, _fn.guard)(this.includeImportedReviews), (0, _fn.propMaybe)('importedProductReviews'), (0, _fn.propMaybe)('productReviews'), (0, _fn.map)(function(review) {
                        return _extends({}, review, {
                            verifiedBy: review.type === 'External' ? review.source ? review.source.name : _this.displayName : _this.displayName
                        });
                    }))(importedProductReviews) || [];

                    return [].concat(_toConsumableArray(productReviewsList), _toConsumableArray(importedReviewsList)).sort(orderByCreatedAtDesc);
                }

                /**
                 * Get an object containing links to the next page URIs contained within the
                 * API response.
                 */

            }, {
                key: 'getNextPageLinks',
                value: function getNextPageLinks() {
                    // Get next page links from a pagination response.
                    var getOldPaginationNextPageLinks = (0, _util.getNextPageLinks)(function(responseKey) {
                        return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.find)(function(link) {
                            return link.rel === 'next-page';
                        }), (0, _fn.prop)('href'));
                    });

                    var getNewPaginationNextPageLinks = (0, _util.getNextPageLinks)(function(responseKey) {
                        return (0, _fn.pipeMaybe)((0, _fn.prop)(responseKey), (0, _fn.prop)(responseKey), (0, _fn.prop)('links'), (0, _fn.prop)('nextPage'));
                    });

                    var newLinks = getNewPaginationNextPageLinks(this.response, this.includeImportedReviews);
                    var oldLinks = getOldPaginationNextPageLinks(this.response, this.includeImportedReviews);

                    return _extends({}, oldLinks, newLinks);
                }
            }]);

            return ReviewResponseProcessor;
        }();

        exports.default = ReviewResponseProcessor;

    }, {
        "../../fn": 39,
        "./util": 35
    }],
    36: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        /* common-shake removed: exports.SCALE_DIMENSIONS_105x19 = */
        /* common-shake removed: exports.SCALE_DIMENSIONS_90x16 = */ /* common-shake removed: exports.SCALE_DIMENSIONS_80x15 = */
        exports.svgMap = undefined;

        var _SCALE_SVG_PROPS;

        var _utils = require('../utils');

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        /* This module defines a number of SVG elements.
         *
         * IE11 does not properly display SVG tags, except using one of several hacks.
         * So, we use one below: we wrap each SVG in a div element, with particular
         * styling attached. We do this following Option 4 in the article at
         * https://css-tricks.com/scale-svg/.
         */

        var svgStarStyle = 'style="position: absolute; height: 100%; width: 100%; left: 0; top: 0;"';

        var wrapSvg = function wrapSvg(dimensions, inner) {
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var sanitizedProps = Object.keys(props).reduce(function(acc, cur) {
                acc[cur] = (0, _utils.sanitizeHtml)(props[cur]);
                if (cur === 'color') {
                    acc[cur] = (0, _utils.sanitizeColor)(acc[cur]);
                }
                return acc;
            }, {});
            return '\n    <div style="position: relative; height: 0; width: 100%; padding: 0; padding-bottom: ' + dimensions.height / dimensions.width * 100 + '%;">\n      ' + inner(dimensions, sanitizedProps) + '\n    </div>\n  ';
        };

        var SCALE_DIMENSIONS_80x15 = '80x15';
        var SCALE_DIMENSIONS_90x16 = '90x16';
        var SCALE_DIMENSIONS_105x19 = '105x19';

        var SCALE_SVG_PROPS = (_SCALE_SVG_PROPS = {}, _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_80x15, {
            dimensions: {
                width: 80,
                height: 15
            },
            lines: [{
                x1: 80,
                y1: 7.5,
                x2: 0,
                y2: 7.5
            }, {
                x1: 0.5,
                y1: 3.5,
                x2: 0.5,
                y2: 11.5
            }, {
                x1: 20.5,
                y1: 6,
                x2: 20.5,
                y2: 9
            }, {
                x1: 40.5,
                y1: 6,
                x2: 40.5,
                y2: 9
            }, {
                x1: 60.5,
                y1: 6,
                x2: 60.5,
                y2: 9
            }, {
                x1: 80,
                y1: 3.5,
                x2: 80,
                y2: 11.5
            }],
            stars: [{
                x: 1.5,
                w: 14,
                h: 14,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.7613 6.02594H13.7205L10.5316 8.29316L8.55968 9.68372L5.35535 11.9509L6.57238 8.29316L3.36804 6.02594H7.32724L8.54427 2.36816L9.7613 6.02594ZM10.7935 9.14011L8.54429 9.69936L11.7332 11.9817L10.7935 9.14011Z" fill="white"/>'
            }, {
                x: 13.5,
                w: 14,
                h: 14,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7615 6.02606H25.7208L22.5318 8.29328L20.5599 9.68384L17.3556 11.9511L18.5726 8.29328L15.3683 6.02606H19.3275L20.5445 2.36829L21.7615 6.02606ZM22.7938 9.14034L20.5446 9.69959L23.7335 11.9819L22.7938 9.14034Z" fill="white"/>'
            }, {
                x: 13.5,
                w: 14,
                h: 14,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7615 6.02606H25.7208L22.5318 8.29328L20.5599 9.68384L17.3556 11.9511L18.5726 8.29328L15.3683 6.02606H19.3275L20.5445 2.36829L21.7615 6.02606ZM22.7938 9.14034L20.5446 9.69959L23.7335 11.9819L22.7938 9.14034Z" fill="white"/>'
            }, {
                x: 33.5,
                w: 14,
                h: 14,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M41.7615 6.02606H45.7208L42.5318 8.29328L40.5599 9.68384L37.3556 11.9511L38.5726 8.29328L35.3683 6.02606H39.3275L40.5445 2.36829L41.7615 6.02606ZM42.7938 9.14034L40.5446 9.69959L43.7335 11.9819L42.7938 9.14034Z" fill="white"/>'
            }, {
                x: 64.5,
                w: 14,
                h: 14,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M72.7615 6.02606H76.7208L73.5318 8.29328L71.5599 9.68384L68.3556 11.9511L69.5726 8.29328L66.3683 6.02606H70.3275L71.5445 2.36829L72.7615 6.02606ZM73.7935 9.14022L71.5443 9.69947L74.7332 11.9818L73.7935 9.14022Z" fill="white"/>'
            }]
        }), _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_90x16, {
            dimensions: {
                width: 90,
                height: 16
            },
            lines: [{
                x1: 90,
                y1: 8.5,
                x2: 0,
                y2: 8.5
            }, {
                x1: 0.5,
                y1: 5,
                x2: 0.5,
                y2: 12
            }, {
                x1: 23.2185,
                y1: 7,
                x2: 23.2185,
                y2: 10
            }, {
                x1: 45.5,
                y1: 7,
                x2: 45.5,
                y2: 10
            }, {
                x1: 67.7815,
                y1: 7,
                x2: 67.7815,
                y2: 10
            }, {
                x1: 90,
                y1: 5,
                x2: 90,
                y2: 12
            }],
            stars: [{
                x: 1.5,
                w: 15,
                h: 15,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3454 6.42769H14.5685L11.167 8.84606L9.06363 10.3293L5.64567 12.7477L6.94384 8.84606L3.52588 6.42769H7.74903L9.04719 2.52606L10.3454 6.42769ZM11.4464 9.74948L9.04727 10.346L12.4488 12.7805L11.4464 9.74948Z" fill="white"/>'
            }, {
                x: 15.5,
                w: 15,
                h: 15,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M24.3456 6.42781H28.5688L25.1672 8.84618L23.0639 10.3294L19.6459 12.7478L20.9441 8.84618L17.5261 6.42781H21.7493L23.0474 2.52618L24.3456 6.42781ZM25.4466 9.74967L23.0475 10.3462L26.449 12.7807L25.4466 9.74967Z" fill="white"/>'
            }, {
                x: 37.5,
                w: 15,
                h: 15,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M46.3456 6.42781H50.5688L47.1672 8.84618L45.0639 10.3294L41.6459 12.7478L42.9441 8.84618L39.5261 6.42781H43.7493L45.0474 2.52618L46.3456 6.42781ZM47.4466 9.74967L45.0475 10.3462L48.449 12.7807L47.4466 9.74967Z" fill="white"/>'
            }, {
                x: 60.5,
                w: 15,
                h: 15,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M69.3456 6.42781H73.5688L70.1672 8.84618L68.0639 10.3294L64.6459 12.7478L65.9441 8.84618L62.5261 6.42781H66.7493L68.0474 2.52618L69.3456 6.42781ZM70.4466 9.74967L68.0475 10.3462L71.449 12.7807L70.4466 9.74967Z" fill="white"/>'
            }, {
                x: 73.5,
                w: 15,
                h: 15,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M82.3456 6.42781H86.5688L83.1672 8.84618L81.0639 10.3294L77.6459 12.7478L78.9441 8.84618L75.5261 6.42781H79.7493L81.0474 2.52618L82.3456 6.42781ZM83.4464 9.74957L81.0473 10.3461L84.4488 12.7806L83.4464 9.74957Z" fill="white"/>'
            }]
        }), _defineProperty(_SCALE_SVG_PROPS, SCALE_DIMENSIONS_105x19, {
            dimensions: {
                width: 105,
                height: 19
            },
            lines: [{
                x1: 105,
                y1: 10,
                x2: 0,
                y2: 10
            }, {
                x1: 0.5,
                y1: 6,
                x2: 0.5,
                y2: 14.3125
            }, {
                x1: 26.5,
                y1: 8,
                x2: 26.5,
                y2: 12
            }, {
                x1: 52.5,
                y1: 8,
                x2: 52.5,
                y2: 12
            }, {
                x1: 78.5,
                y1: 8,
                x2: 78.5,
                y2: 12
            }, {
                x1: 105,
                y1: 6,
                x2: 105,
                y2: 14.3125
            }],
            stars: [{
                x: 1.5,
                w: 18,
                h: 19,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0976 7.63288H17.1126L13.0733 10.5047L10.5756 12.2661L6.51676 15.1379L8.05834 10.5047L3.99951 7.63288H9.0145L10.5561 2.99969L12.0976 7.63288ZM13.4051 11.5774L10.5561 12.2858L14.5954 15.1768L13.4051 11.5774Z" fill="white"/>'
            }, {
                x: 17.5682,
                w: 18,
                h: 18,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M28.1661 7.633H33.1811L29.1418 10.5048L26.6441 12.2662L22.5852 15.138L24.1268 10.5048L20.068 7.633H25.083L26.6246 2.99982L28.1661 7.633ZM29.4736 11.5777L26.6246 12.2861L30.6639 15.1771L29.4736 11.5777Z" fill="white"/>'
            }, {
                x: 43.5,
                w: 18,
                h: 18,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M54.0979 7.633H59.1129L55.0736 10.5048L52.5758 12.2662L48.517 15.138L50.0586 10.5048L45.9998 7.633H51.0147L52.5563 2.99982L54.0979 7.633ZM55.4054 11.5777L52.5564 12.2861L56.5957 15.1771L55.4054 11.5777Z" fill="white"/>'
            }, {
                x: 69.7046,
                w: 18,
                h: 18,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M80.3025 7.633H85.3175L81.2782 10.5048L78.7804 12.2662L74.7216 15.138L76.2632 10.5048L72.2043 7.633H77.2193L78.7609 2.99982L80.3025 7.633ZM81.61 11.5777L78.761 12.2861L82.8003 15.1771L81.61 11.5777Z" fill="white"/>'
            }, {
                x: 85.7727,
                w: 18,
                h: 18,
                p: '<path fill-rule="evenodd" clip-rule="evenodd" d="M96.3706 7.633H101.386L97.3463 10.5048L94.8485 12.2662L90.7897 15.138L92.3313 10.5048L88.2725 7.633H93.2874L94.829 2.99982L96.3706 7.633ZM97.6778 11.5776L94.8289 12.286L98.8682 15.177L97.6778 11.5776Z" fill="white"/>'
            }]
        }), _SCALE_SVG_PROPS);

        var createScaleLines = function createScaleLines(dimensionId, color) {
            return SCALE_SVG_PROPS[dimensionId].lines.reduce(function(acc, _ref) {
                var x1 = _ref.x1,
                    y1 = _ref.y1,
                    x2 = _ref.x2,
                    y2 = _ref.y2;
                return acc + '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '"/>';
            }, '');
        };

        var createScaleStar = function createScaleStar(dimensionId, rating, color) {
            if (rating === 0) {
                return '';
            }

            var _SCALE_SVG_PROPS$dime = SCALE_SVG_PROPS[dimensionId].stars[rating - 1],
                x = _SCALE_SVG_PROPS$dime.x,
                w = _SCALE_SVG_PROPS$dime.w,
                h = _SCALE_SVG_PROPS$dime.h,
                p = _SCALE_SVG_PROPS$dime.p;


            return '\n    <rect x="' + x + '" y="0.5" width="' + w + '" height="' + h + '" fill="' + color + '" stroke="' + color + '"/>\n    ' + p + '\n  ';
        };

        var _scale = function _scale(dimensions, _ref2) {
            var dimensionId = _ref2.dimensionId,
                color = _ref2.color,
                rating = _ref2.rating;
            return '\n  <svg role="img" aria-labelledby="scaleRating" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '">\n      <g class="tp-stars">\n        ' + createScaleLines(dimensionId, color) + '\n        ' + createScaleStar(dimensionId, rating, color) + '\n      </g>\n  </svg>';
        };

        var emptyStarColor = '#dcdce6';
        var _stars = function _stars(dimensions, _ref3) {
            var rating = _ref3.rating,
                trustScore = _ref3.trustScore,
                color = _ref3.color;
            return '\n  <svg role="img" aria-labelledby="starRating" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <title id="starRating" lang="en">' + trustScore + ' out of five star rating on Trustpilot</title>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 1 && color ? color : emptyStarColor) + '" d="M0 46.330002h46.375586V0H0z"/>\n          <path class="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 2 && color ? color : emptyStarColor) + '" d="M51.24816 46.330002h46.375587V0H51.248161z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 1.5 && color ? color : emptyStarColor) + '" d="M51.24816 46.330002h23.187793V0H51.248161z"/>\n          <path class="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 3 && color ? color : emptyStarColor) + '" d="M102.532209 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 2.5 && color ? color : emptyStarColor) + '" d="M102.532209 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating >= 4 && color ? color : emptyStarColor) + '" d="M153.815458 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 3.5 && color ? color : emptyStarColor) + '" d="M153.815458 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (rating === 5 && color ? color : emptyStarColor) + '" d="M205.064416 46.330002h46.375587V0h-46.375587z"/>\n          <path class="tp-star__canvas--half" fill="' + (rating >= 4.5 && color ? color : emptyStarColor) + '" d="M205.064416 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n  </svg>';
        };

        var _logo = function _logo(dimensions) {
            return '\n  <svg role="img" aria-labelledby="trustpilotLogo" viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <title id="trustpilotLogo">Trustpilot</title>\n      <path class="tp-logo__text" d="M33.074774 11.07005H45.81806v2.364196h-5.010656v13.290316h-2.755306V13.434246h-4.988435V11.07005h.01111zm12.198892 4.319629h2.355341v2.187433h.04444c.077771-.309334.222203-.60762.433295-.894859.211092-.287239.466624-.56343.766597-.79543.299972-.243048.633276-.430858.999909-.585525.366633-.14362.744377-.220953 1.12212-.220953.288863 0 .499955.011047.611056.022095.1111.011048.222202.033143.344413.04419v2.408387c-.177762-.033143-.355523-.055238-.544395-.077333-.188872-.022096-.366633-.033143-.544395-.033143-.422184 0-.822148.08838-1.199891.254096-.377744.165714-.699936.41981-.977689.740192-.277753.331429-.499955.729144-.666606 1.21524-.166652.486097-.244422 1.03848-.244422 1.668195v5.39125h-2.510883V15.38968h.01111zm18.220567 11.334883H61.02779v-1.579813h-.04444c-.311083.574477-.766597 1.02743-1.377653 1.369908-.611055.342477-1.233221.51924-1.866497.51924-1.499864 0-2.588654-.364573-3.25526-1.104765-.666606-.740193-.999909-1.856005-.999909-3.347437V15.38968h2.510883v6.948968c0 .994288.188872 1.701337.577725 2.1101.377744.408763.922139.618668 1.610965.618668.533285 0 .96658-.077333 1.322102-.243048.355524-.165714.644386-.37562.855478-.65181.222202-.265144.377744-.596574.477735-.972194.09999-.37562.144431-.784382.144431-1.226288v-6.573349h2.510883v11.323836zm4.27739-3.634675c.07777.729144.355522 1.237336.833257 1.535623.488844.287238 1.06657.441905 1.744286.441905.233312 0 .499954-.022095.799927-.055238.299973-.033143.588836-.110476.844368-.209905.266642-.099429.477734-.254096.655496-.452954.166652-.198857.244422-.452953.233312-.773335-.01111-.320381-.133321-.585525-.355523-.784382-.222202-.209906-.499955-.364573-.844368-.497144-.344413-.121525-.733267-.232-1.17767-.320382-.444405-.088381-.888809-.18781-1.344323-.287239-.466624-.099429-.922138-.232-1.355432-.37562-.433294-.14362-.822148-.342477-1.166561-.596573-.344413-.243048-.622166-.56343-.822148-.950097-.211092-.386668-.311083-.861716-.311083-1.436194 0-.618668.155542-1.12686.455515-1.54667.299972-.41981.688826-.75124 1.14434-1.005336.466624-.254095.97769-.430858 1.544304-.541334.566615-.099429 1.11101-.154667 1.622075-.154667.588836 0 1.15545.066286 1.688736.18781.533285.121524 1.02213.320381 1.455423.60762.433294.276191.788817.640764 1.07768 1.08267.288863.441905.466624.98324.544395 1.612955h-2.621984c-.122211-.596572-.388854-1.005335-.822148-1.204193-.433294-.209905-.933248-.309334-1.488753-.309334-.177762 0-.388854.011048-.633276.04419-.244422.033144-.466624.088382-.688826.165715-.211092.077334-.388854.198858-.544395.353525-.144432.154667-.222203.353525-.222203.60762 0 .309335.111101.552383.322193.740193.211092.18781.488845.342477.833258.475048.344413.121524.733267.232 1.177671.320382.444404.088381.899918.18781 1.366542.287239.455515.099429.899919.232 1.344323.37562.444404.14362.833257.342477 1.17767.596573.344414.254095.622166.56343.833258.93905.211092.37562.322193.850668.322193 1.40305 0 .673906-.155541 1.237336-.466624 1.712385-.311083.464001-.711047.850669-1.199891 1.137907-.488845.28724-1.04435.508192-1.644295.640764-.599946.132572-1.199891.198857-1.788727.198857-.722156 0-1.388762-.077333-1.999818-.243048-.611056-.165714-1.14434-.408763-1.588745-.729144-.444404-.33143-.799927-.740192-1.05546-1.226289-.255532-.486096-.388853-1.071621-.411073-1.745528h2.533103v-.022095zm8.288135-7.700208h1.899828v-3.402675h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155542.486096.07777.132572.199981.232.366633.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.13332-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222zm8.454788 0h2.377562V16.9253h.04444c.355523-.662858.844368-1.12686 1.477644-1.414098.633276-.287239 1.310992-.430858 2.055369-.430858.899918 0 1.677625.154667 2.344231.475048.666606.309335 1.222111.740193 1.666515 1.292575.444405.552382.766597 1.193145.9888 1.92229.222202.729145.333303 1.513527.333303 2.3421 0 .762288-.099991 1.50248-.299973 2.20953-.199982.718096-.499955 1.347812-.899918 1.900194-.399964.552383-.911029.98324-1.533194 1.31467-.622166.33143-1.344323.497144-2.18869.497144-.366634 0-.733267-.033143-1.0999-.099429-.366634-.066286-.722157-.176762-1.05546-.320381-.333303-.14362-.655496-.33143-.933249-.56343-.288863-.232-.522175-.497144-.722157-.79543h-.04444v5.656393h-2.510883V15.38968zm8.77698 5.67849c0-.508193-.06666-1.005337-.199981-1.491433-.133321-.486096-.333303-.905907-.599946-1.281527-.266642-.37562-.599945-.673906-.988799-.894859-.399963-.220953-.855478-.342477-1.366542-.342477-1.05546 0-1.855387.364572-2.388672 1.093717-.533285.729144-.799928 1.701337-.799928 2.916578 0 .574478.066661 1.104764.211092 1.59086.144432.486097.344414.905908.633276 1.259432.277753.353525.611056.629716.99991.828574.388853.209905.844367.309334 1.355432.309334.577725 0 1.05546-.121524 1.455423-.353525.399964-.232.722157-.541335.97769-.905907.255531-.37562.444403-.79543.555504-1.270479.099991-.475049.155542-.961145.155542-1.458289zm4.432931-9.99812h2.510883v2.364197h-2.510883V11.07005zm0 4.31963h2.510883v11.334883h-2.510883V15.389679zm4.755124-4.31963h2.510883v15.654513h-2.510883V11.07005zm10.210184 15.963847c-.911029 0-1.722066-.154667-2.433113-.452953-.711046-.298287-1.310992-.718097-1.810946-1.237337-.488845-.530287-.866588-1.160002-1.12212-1.889147-.255533-.729144-.388854-1.535622-.388854-2.408386 0-.861716.133321-1.657147.388853-2.386291.255533-.729145.633276-1.35886 1.12212-1.889148.488845-.530287 1.0999-.93905 1.810947-1.237336.711047-.298286 1.522084-.452953 2.433113-.452953.911028 0 1.722066.154667 2.433112.452953.711047.298287 1.310992.718097 1.810947 1.237336.488844.530287.866588 1.160003 1.12212 1.889148.255532.729144.388854 1.524575.388854 2.38629 0 .872765-.133322 1.679243-.388854 2.408387-.255532.729145-.633276 1.35886-1.12212 1.889147-.488845.530287-1.0999.93905-1.810947 1.237337-.711046.298286-1.522084.452953-2.433112.452953zm0-1.977528c.555505 0 1.04435-.121524 1.455423-.353525.411074-.232.744377-.541335 1.01102-.916954.266642-.37562.455513-.806478.588835-1.281527.12221-.475049.188872-.961145.188872-1.45829 0-.486096-.066661-.961144-.188872-1.44724-.122211-.486097-.322193-.905907-.588836-1.281527-.266642-.37562-.599945-.673907-1.011019-.905907-.411074-.232-.899918-.353525-1.455423-.353525-.555505 0-1.04435.121524-1.455424.353525-.411073.232-.744376.541334-1.011019.905907-.266642.37562-.455514.79543-.588835 1.281526-.122211.486097-.188872.961145-.188872 1.447242 0 .497144.06666.98324.188872 1.458289.12221.475049.322193.905907.588835 1.281527.266643.37562.599946.684954 1.01102.916954.411073.243048.899918.353525 1.455423.353525zm6.4883-9.66669h1.899827v-3.402674h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155541.486096.077771.132572.199982.232.366634.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.133321-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222z" fill="#191919"/>\n      <path class="tp-logo__star" fill="#00B67A" d="M30.141707 11.07005H18.63164L15.076408.177071l-3.566342 10.892977L0 11.059002l9.321376 6.739063-3.566343 10.88193 9.321375-6.728016 9.310266 6.728016-3.555233-10.88193 9.310266-6.728016z"/>\n      <path class="tp-logo__star-notch" fill="#005128" d="M21.631369 20.26169l-.799928-2.463625-5.755033 4.153914z"/>\n  </svg>';
        };

        var _arrowSlider = function _arrowSlider(dimensions) {
            return '\n  <svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n      <circle class="arrow-slider-circle" cx="12" cy="12" r="11.5" fill="none" stroke="#8C8C8C"/>\n      <path class="arrow-slider-shape" fill="#8C8C8C" d="M10.5088835 12l3.3080582-3.02451041c.2440777-.22315674.2440777-.5849653 0-.80812204-.2440776-.22315673-.6398058-.22315673-.8838834 0L9.18305826 11.595939c-.24407768.2231567-.24407768.5849653 0 .808122l3.75000004 3.4285714c.2440776.2231568.6398058.2231568.8838834 0 .2440777-.2231567.2440777-.5849653 0-.808122L10.5088835 12z"/>\n  </svg>\n';
        };

        var _replyArrow = function _replyArrow(dimensions, _ref4) {
            var elementColor = _ref4.elementColor;
            return '\n<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" xmlns=\u201Chttp://www.w3.org/2000/svg\u201C ' + svgStarStyle + '>\n  <path d="M5.24040526 8.60770645c0 .40275007-.25576387.51300008-.57003092.24825004L.2361338 4.98520583C.0871841 4.86986375 0 4.69208677 0 4.50370575s.0871841-.366158.2361338-.48150008L4.67037434.14470501c.31501709-.26625004.57003092-.15450003.57003092.24825004V2.9992055h.75004069c2.86515541 0 5.31553833 2.3745004 5.91257072 4.93950083a4.3385348 4.3385348 0 0 1 .09375508.5782501c.02250123.20025004-.07500406.24450004-.21826184.10350002 0 0-.0405022-.036-.07500406-.07500001C10.18673699 7.00766398 8.14655579 6.09727666 5.98894586 5.995456h-.75004068l.00150008 2.61225045z" fill="' + (elementColor || '#00B67A') + '" fill-rule="evenodd"/>\n</svg>\n';
        };

        var _verifiedReview = function _verifiedReview(dimensions) {
            return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg ' + svgStarStyle + '">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"/>\n</svg>\n';
        };

        var _invitedReview = function _invitedReview(dimensions) {
            return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg ' + svgStarStyle + '">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"/>\n</svg>\n';
        };

        var _redirectedReview = function _redirectedReview(dimensions) {
            return '<svg viewBox="0 0 ' + dimensions.width + ' ' + dimensions.height + '" fill="none" xmlns="http://www.w3.org/2000/svg" ' + svgStarStyle + '>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7056 4.07227L10.6915 1.04706C10.2986 0.65216 9.66093 0.651152 9.26704 1.04303C8.87214 1.43591 8.87113 2.0746 9.26402 2.46749L10.5656 3.77509L3.42415 3.76602H3.41407C1.96242 3.76602 1.15751 4.40169 0.738429 4.93561C0.255887 5.55012 0.0010157 6.38827 8.3031e-06 7.36041C-0.00301388 8.91482 0.819021 11.8151 2.40265 11.8161H2.40365C2.95974 11.8161 3.41105 11.3668 3.41206 10.8107C3.41206 10.3645 3.12293 9.98467 2.72098 9.85069C2.35429 9.40038 1.72568 7.60218 2.15281 6.48901C2.2868 6.14045 2.54268 5.78081 3.41407 5.78081H3.42012L10.5585 5.78988L9.25495 7.0874C8.86005 7.48029 8.85905 8.11898 9.25193 8.51186C9.44837 8.70931 9.70727 8.80904 9.96617 8.80904C10.2231 8.80904 10.4799 8.71032 10.6764 8.51589L13.7046 5.49874H13.7056C14.1116 5.08369 14.0844 4.45206 13.7056 4.07227Z" fill="currentColor"/>\n</svg>\n';
        };
        /* eslint-enable max-len */

        // Define a series of objects containing width and height values. These are
        // used in setting the styling of the SVG, and creating the div wrapper for
        // IE11 support.
        var starsDimensions = {
            width: 251,
            height: 46
        };
        var logoDimensions = {
            width: 126,
            height: 31
        };
        var arrowSliderDimensions = {
            width: 24,
            height: 24
        };
        var replyArrowDimensions = {
            width: 12,
            height: 9
        };
        var verifiedReviewDimensions = {
            width: 14,
            height: 14
        };
        var invitedReviewDimensions = {
            width: 14,
            height: 14
        };
        var redirectedReviewDimensions = {
            width: 14,
            height: 12
        };

        var svgMap = {
            scale: function scale(props) {
                return wrapSvg(SCALE_SVG_PROPS[props.dimensionId].dimensions, _scale, props);
            },
            stars: function stars(props) {
                return wrapSvg(starsDimensions, _stars, props);
            },
            logo: function logo() {
                return wrapSvg(logoDimensions, _logo);
            },
            arrowSlider: function arrowSlider() {
                return wrapSvg(arrowSliderDimensions, _arrowSlider);
            },
            replyArrow: function replyArrow(props) {
                return wrapSvg(replyArrowDimensions, _replyArrow, props);
            },
            verifiedReview: function verifiedReview(props) {
                return wrapSvg(verifiedReviewDimensions, _verifiedReview, props);
            },
            invitedReview: function invitedReview(props) {
                return wrapSvg(invitedReviewDimensions, _invitedReview, props);
            },
            redirectedReview: function redirectedReview(props) {
                return wrapSvg(redirectedReviewDimensions, _redirectedReview, props);
            }
        };

        exports.svgMap = svgMap;
        /* common-shake removed: exports.SCALE_DIMENSIONS_80x15 = */
        void SCALE_DIMENSIONS_80x15;
        /* common-shake removed: exports.SCALE_DIMENSIONS_90x16 = */
        void SCALE_DIMENSIONS_90x16;
        /* common-shake removed: exports.SCALE_DIMENSIONS_105x19 = */
        void SCALE_DIMENSIONS_105x19;

    }, {
        "../utils": 63
    }],
    42: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var styleAlignmentPositions = exports.styleAlignmentPositions = ['left', 'right'];

    }, {}],
    61: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getFrameworkTranslation = exports.formatLocale = exports.defaultLocale = undefined;

        var _localization = require('../localization');

        var _localization2 = _interopRequireDefault(_localization);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var defaultLocale = 'en-US';

        var LOCALE_DIVIDER = '-';

        var languageToCountryMap = {
            da: 'DK',
            en: 'US',
            ja: 'JP',
            nb: 'NO',
            sv: 'SE'
            // other languages assumed to have the same country code as the language code itself
        };

        /**
         * Tries to find the country for the given language.
         * If no country is found, the language itself is returned.
         * Acts as a safety mechanism for translations when only the language part is present in the given locale.
         *
         * @param {string} language the language for which the country should be found.
         */
        var tryGetCountryForLanguage = function tryGetCountryForLanguage(language) {
            var country = languageToCountryMap[language] || language;
            return country;
        };

        var formatLocale = function formatLocale(locale) {
            var localeParts = locale.split(LOCALE_DIVIDER);
            var language = localeParts[0];
            var country = localeParts[1];

            if (!country) {
                country = tryGetCountryForLanguage(language);
            }

            return language && country ? '' + language + LOCALE_DIVIDER + country.toUpperCase() : defaultLocale;
        };

        var getFrameworkTranslation = function getFrameworkTranslation(key) {
            var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultLocale;
            var interpolations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var links = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            var translationTable = _localization2.default[formatLocale(locale)] || _localization2.default[defaultLocale];
            var rawTranslation = key.split('.').reduce(function(a, b) {
                return a[b];
            }, translationTable);
            var translation = Object.keys(interpolations).reduce(function(value, key) {
                return value.replace(key, interpolations[key]);
            }, rawTranslation);
            var translationWithLinksReplaced = links.reduce(function(previous, current) {
                return previous.replace('[LINK-END]', '</a>').replace('[LINK-BEGIN]', current);
            }, translation);

            return translationWithLinksReplaced;
        };

        exports.defaultLocale = defaultLocale;
        exports.formatLocale = formatLocale;
        exports.getFrameworkTranslation = getFrameworkTranslation;

    }, {
        "../localization": 17
    }],
    46: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _utils = require('../utils');

        var _dom = require('../dom');

        var _controls = require('./controls');

        var _controls2 = _interopRequireDefault(_controls);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        /**
         * The ArrowControls class provides logic for controlling a sliding review
         * carousel with previous/next page buttons.
         *
         * To use ArrowControls, construct an instance of it and then call
         * {@link ArrowControls#initialize}.
         */
        var ArrowControls = function(_Controls) {
            _inherits(ArrowControls, _Controls);

            /**
             * Create an ArrowControls instance.
             *
             * @param {ReviewSlider} slider - The ReviewSlider to which to attach controls.
             * @param {Object} elements - DOM elements for the controls.
             * @param {HTMLElement} elements.prevArrow - The previous arrow element.
             * @param {HTMLElement} elements.nextArrow - The next arrow element.
             * @param {Object} [options={}] - Options for the controls.
             * @param {Object} [options.callbacks] - Callbacks to trigger after clicking a control.
             * @param {callback} [options.callbacks.prevPage] - Callback to trigger on clicking
             * the previous arrow.
             * @param {callback} [options.callbacks.nextPage] - Callback to trigger on clicking
             * the next arrow.
             * @param {string} [options.disabledClass] - The class to set on disabled controls.
             */
            function ArrowControls(slider, elements) {
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                _classCallCheck(this, ArrowControls);

                var _this = _possibleConstructorReturn(this, (ArrowControls.__proto__ || Object.getPrototypeOf(ArrowControls)).call(this, slider, elements));

                _this.callbacks = options.callbacks || {};
                _this.disabledClass = options.disabledClass;
                return _this;
            }

            _createClass(ArrowControls, [{
                key: 'attachListeners',
                value: function attachListeners() {
                    var _this2 = this;

                    var noOp = function noOp() {};
                    var _elements = this.elements,
                        prevArrow = _elements.prevArrow,
                        nextArrow = _elements.nextArrow;
                    var _callbacks = this.callbacks,
                        _callbacks$prevPage = _callbacks.prevPage,
                        prevPage = _callbacks$prevPage === undefined ? noOp : _callbacks$prevPage,
                        _callbacks$nextPage = _callbacks.nextPage,
                        nextPage = _callbacks$nextPage === undefined ? noOp : _callbacks$nextPage;

                    (0, _utils.addEventListener)(prevArrow, 'click', function() {
                        _this2.slider.moveContent(-1);
                        prevPage();
                    });
                    (0, _utils.addEventListener)(nextArrow, 'click', function() {
                        _this2.slider.moveContent(1);
                        nextPage();
                    });
                }
            }, {
                key: 'styleArrow',
                value: function styleArrow(elem, isDisabled) {
                    var disabledClass = this.disabledClass;
                    if (isDisabled) {
                        (0, _dom.addClass)(elem, disabledClass);
                    } else {
                        (0, _dom.removeClass)(elem, disabledClass);
                    }
                }
            }, {
                key: 'styleArrows',
                value: function styleArrows() {
                    var _elements2 = this.elements,
                        prevArrow = _elements2.prevArrow,
                        nextArrow = _elements2.nextArrow;

                    this.styleArrow(prevArrow, this.slider.isAtFirstPage());
                    this.styleArrow(nextArrow, this.slider.isAtLastPage());
                }
            }, {
                key: 'onUpdate',
                value: function onUpdate() {
                    this.styleArrows();
                }
            }]);

            return ArrowControls;
        }(_controls2.default);

        exports.default = ArrowControls;

    }, {
        "../dom": 38,
        "../utils": 63,
        "./controls": 47
    }],
    47: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        /**
         * The Controls class is an abstract base class for concrete controls to use.
         *
         * A number of required methods are defined, together with a default
         * implementaton of the {@link Controls#initialize} method. These required methods
         * are used to update the controls on a change taking place within the slider,
         * and must be implemented. By default, the page change and resize events are
         * both handled by the {@link Controls#onUpdate} method.
         */
        var Controls = function() {
            /**
             * Create a Controls instance.
             *
             * @param {ReviewSlider} slider - The ReviewSlider to which to attach controls.
             * @param {Object|Array} elements - DOM elements for the controls.
             */
            function Controls(slider, elements) {
                _classCallCheck(this, Controls);

                this.slider = slider;
                this.elements = elements;
            }

            /**
             * Initialize this Controls instance.
             *
             * This method attaches listener callbacks to the control elements and
             * attaches the controls themselves to the slider and initializes that.
             */


            _createClass(Controls, [{
                key: 'initialize',
                value: function initialize() {
                    this.attachListeners();
                    this.slider.attachObserver(this);
                    this.slider.initialize();
                    this.onUpdate();
                }

                /**
                 * Intended to be used to attach callbacks to events on the associated control
                 * elements.
                 */

            }, {
                key: 'attachListeners',
                value: function attachListeners() {
                    throw new Error('attachListeners method not yet implemented');
                }

                /**
                 * Called upon initialization, and where a page change or resize event occurs
                 * in the slider.
                 */

            }, {
                key: 'onUpdate',
                value: function onUpdate() {
                    throw new Error('onUpdate method not yet implemented');
                }

                /**
                 * Called by the associated slider when it encounters a page change event.
                 */

            }, {
                key: 'onPageChange',
                value: function onPageChange() {
                    this.onUpdate();
                }

                /**
                 * Called by the associated slider when it encounters a resize event.
                 */

            }, {
                key: 'onResize',
                value: function onResize() {
                    this.onUpdate();
                }
            }]);

            return Controls;
        }();

        exports.default = Controls;

    }, {}],
    49: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _utils = require('../utils');

        var _dom = require('../dom');

        var _controls = require('./controls');

        var _controls2 = _interopRequireDefault(_controls);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        /**
         * The PaginationControls class provides logic for controlling a sliding review
         * carousel with page selection buttons.
         *
         * To use PaginationControls, construct an instance of it and then call
         * {@link PaginationControls#initialize}.
         */
        var PaginationControls = function(_Controls) {
            _inherits(PaginationControls, _Controls);

            /**
             * Create an PaginationControls instance.
             *
             * An array of elements is required, with element x triggering a page change
             * to page x+1. An array of callbacks is optional, each of which correspond
             * to an element on the page, i.e. callback x is trigger by clicking element
             * x.
             *
             * @param {ReviewSlider} slider - The ReviewSlider to which to attach controls.
             * @param {Object[]} elements - DOM elements for the controls.
             * @param {Object} [options={}] - Options for the controls.
             * @param {Array} [options.callbacks] - Callbacks to trigger after clicking a control.
             * @param {string} [options.activeClass] - The class to set on the active control.
             */
            function PaginationControls(slider, elements) {
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                _classCallCheck(this, PaginationControls);

                var _this = _possibleConstructorReturn(this, (PaginationControls.__proto__ || Object.getPrototypeOf(PaginationControls)).call(this, slider, elements));

                _this.callbacks = options.callbacks || [];
                _this.activeClass = options.activeClass;
                return _this;
            }

            _createClass(PaginationControls, [{
                key: 'attachListeners',
                value: function attachListeners() {
                    var _this2 = this;

                    var pagination = this.elements;
                    var noOp = function noOp() {};
                    pagination.forEach(function(elem, index) {
                        if (index === 0) {
                            (0, _dom.addClass)(elem, _this2.activeClass);
                        }
                        (0, _utils.addEventListener)(elem, 'click', function() {
                            _this2.slider.jumpToPage(index + 1);
                            var callback = _this2.callbacks[index] || noOp;
                            callback();
                        });
                    });
                }
            }, {
                key: 'onUpdate',
                value: function onUpdate() {
                    var _this3 = this;

                    var pagination = this.elements;
                    pagination.forEach(function(elem, index) {
                        var isActive = _this3.slider.currentPage === index + 1;
                        if (isActive) {
                            (0, _dom.addClass)(elem, _this3.activeClass);
                        } else {
                            (0, _dom.removeClass)(elem, _this3.activeClass);
                        }
                    });
                }
            }]);

            return PaginationControls;
        }(_controls2.default);

        exports.default = PaginationControls;

    }, {
        "../dom": 38,
        "../utils": 63,
        "./controls": 47
    }],
    50: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _utils = require('../utils');

        var _touch = require('../touch');

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var clamp = function clamp(val, min, max) {
            return Math.max(Math.min(val, max), min);
        };
        /**
         * The ReviewSlider class provides logic for handling sliding review carousel
         * elements.
         *
         * A review carousel is a series of HTML elements used to contain and display
         * reviews within a TrustBox. A ReviewSlider instance expects certain HTML
         * elements within the DOM: a "slider" element; a container element for the
         * slider; and a list of review elements. (See {@link ReviewSlider#constructor}
         * on how these elements are provided to the ReviewSlider.)
         *
         * To use a ReviewSlider, first construct an instance of it. Then, if controls
         * are required, construct an instance of one of the controls classes (see
         * {@link ArrowControls} and {@link PaginationControls}) and following their
         * instructions for initialization. If controls are not required, simply call
         * {@link ReviewSlider#initialize}.
         */

        var ReviewSlider = function() {
            /**
             * Create a ReviewSlider instance.
             *
             * @param {Object[]} reviews - Reviews to be displayed in the slider.
             * @param {Object} elements - DOM elements for the slider.
             * @param {HTMLElement} elements.slider - The slider element.
             * @param {HTMLElement} elements.sliderContainer - The container for the slider.
             * @param {Callback} template - function which generates HTML for a review.
             * @param {Object} [options={}] - Options for the slider.
             * @param {string} [options.reviewClass] - The class name for a review element.
             * @param {string} [options.transitionClass] - The class name for elements
             * with a sliding animation/transition.
             * @param {int|Object[]} [options.reviewsPerPage] - Either the number of
             * reviews to display per page, or a list of objects containing breakpoints
             * with associated review counts (see {@link ReviewSlider#setReviewsPerPage}).
             */
            function ReviewSlider(reviews, elements, template) {
                var _this = this;

                var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                _classCallCheck(this, ReviewSlider);

                this.reviews = reviews;
                this.elements = elements;
                this.reviewCount = reviews.length;
                this.template = template;
                this.reviewClass = options.reviewClass;
                this.setReviewsPerPage(options.reviewsPerPage);
                this.currentPage = 1;
                this.resizeTimeout = null;
                this.observers = [];
                this.isInitialized = false;

                // Touch callbacks

                this.touchStartCallback = function(_ref) {
                    var translateX = _ref.translateX,
                        originPage = _ref.originPage;

                    _this.setSliderTransitionDuration(0);
                    _this.setSliderTranslateX(translateX);
                    _this.currentPage = originPage;
                };
                this.touchMoveCallback = function(_ref2) {
                    var translateX = _ref2.translateX;

                    _this.setSliderTranslateX(translateX);
                };
                this.touchEndCallback = function(_ref3) {
                    var pagesToSwipe = _ref3.pagesToSwipe,
                        transitionDuration = _ref3.transitionDuration;

                    _this.moveContent(pagesToSwipe, clamp(transitionDuration, 0.2, 1));
                };
            }

            /**
             * Set the reviewsPerPage property.
             *
             * @param {int|Object[]} reviewsPerPage - Either the number of reviews to
             * display per page, or a list of objects containing breakpoints with
             * associated review counts. In the case of the latter, each object must
             * contain a minWidth and a reviewsForWidth property. The number of reviews
             * displayed is equal to the reviewsForWidth value associated with the largest
             * minimum width value less than the width of the sliderContainer.
             */


            _createClass(ReviewSlider, [{
                key: 'setReviewsPerPage',
                value: function setReviewsPerPage(reviewsPerPage) {
                    if (typeof reviewsPerPage === 'number') {
                        this.reviewsPerPage = [{
                            minWidth: 0,
                            reviewsForWidth: reviewsPerPage
                        }];
                    } else {
                        this.reviewsPerPage = reviewsPerPage;
                        this.reviewsPerPage.sort(function(_ref4, _ref5) {
                            var a = _ref4.minWidth;
                            var b = _ref5.minWidth;
                            return b - a;
                        });
                    }
                }

                /**
                 * Populate the slider with reviews using the template.
                 */

            }, {
                key: 'populateSlider',
                value: function populateSlider() {
                    this.elements.slider.innerHTML = this.reviews.map(this.template.bind(this)).join('');
                }

                /**
                 * Initialize this ReviewSlider instance.
                 *
                 * This method attaches this instance to the slider and window. It attaches
                 * a touch handler to the slider and ensures the resize events are listened
                 * to.
                 */

            }, {
                key: 'initialize',
                value: function initialize() {
                    if (this.isInitialized) {
                        return;
                    }

                    this.populateSlider();
                    this.calculateReviewsPerPage();

                    this.touch = new _touch.TrustBoxesTouch({
                        targetElement: this.elements.slider,
                        pageWidth: this.sliderContainerWidth,
                        touchStartCallback: this.touchStartCallback,
                        touchMoveCallback: this.touchMoveCallback,
                        touchEndCallback: this.touchEndCallback
                    });

                    this.touch.attach();
                    this.windowResize();
                    this.attachResizeListener();
                    this.attachPopoverListeners();

                    this.isInitialized = true;
                }

                // Getters & properties //

            }, {
                key: 'getFirstVisibleReviewIndex',
                value: function getFirstVisibleReviewIndex() {
                    return this._reviewsPerPage * (this.currentPage - 1);
                }
            }, {
                key: 'isAtFirstPage',
                value: function isAtFirstPage() {
                    return this.currentPage === 1;
                }
            }, {
                key: 'isAtLastPage',
                value: function isAtLastPage() {
                    return this.currentPage === this.totalPages;
                }
            }, {
                key: 'setSliderTranslateX',
                value: function setSliderTranslateX(pixels) {
                    this.elements.slider.style.transform = 'translateX(' + pixels + 'px)';
                }
            }, {
                key: 'setSliderTransitionDuration',
                value: function setSliderTransitionDuration(seconds) {
                    this.elements.slider.style.transitionDuration = seconds + 's';
                }

                // Review calculations //

            }, {
                key: 'reviewElementMargins',
                value: function reviewElementMargins() {
                    if (this.reviewElements.length === 0 || !this.reviewElements[0]) {
                        return {
                            left: 0,
                            right: 0
                        };
                    } else {
                        var computedStyle = window.getComputedStyle(this.reviewElements[0]);
                        return {
                            left: parseInt(computedStyle.marginLeft),
                            right: parseInt(computedStyle.marginRight)
                        };
                    }
                }
            }, {
                key: 'calculateReviewsPerPage',
                value: function calculateReviewsPerPage() {
                    var currentBreakpoint = this.reviewsPerPage.reduce(function(reviewCount, _ref6) {
                        var minWidth = _ref6.minWidth,
                            reviewsForWidth = _ref6.reviewsForWidth;
                        return !reviewCount && document.documentElement.clientWidth >= minWidth ? {
                            minWidth: minWidth,
                            reviewsForWidth: reviewsForWidth
                        } : reviewCount;
                    }, null);
                    this._reviewsPerPage = currentBreakpoint.reviewsForWidth;
                    this._defaultSliderWidth = currentBreakpoint.minWidth;
                }

                // Observer methods //

            }, {
                key: 'attachObserver',
                value: function attachObserver(observer) {
                    this.observers.push(observer);
                }
            }, {
                key: 'detachObserver',
                value: function detachObserver(observer) {
                    this.observers = this.observers.filter(function(obs) {
                        return obs !== observer;
                    });
                }

                // Window resize methods //

            }, {
                key: 'attachResizeListener',
                value: function attachResizeListener() {
                    var _this2 = this;

                    (0, _utils.addEventListener)(window, 'resize', function() {
                        if (_this2.resizeTimeout !== null) {
                            window.clearTimeout(_this2.resizeTimeout);
                        }
                        _this2.resizeTimeout = window.setTimeout(function() {
                            _this2.windowResize();
                        }, 200);
                    });
                }
            }, {
                key: 'attachPopoverListeners',
                value: function attachPopoverListeners() {
                    var _this3 = this;

                    this.elements.slider.querySelectorAll('.tp-widget-review__source.popover-activator').forEach(function(element) {
                        (0, _utils.addEventListener)(element, 'mouseover', function() {
                            var popoverElement = element.querySelector('.tp-widget-review__source__information');
                            var arrowElement = element.querySelector('.tp-widget-review__source__arrow');
                            (0, _utils.handlePopoverPosition)(element, popoverElement, _this3.elements.sliderContainer, arrowElement);
                        });
                    });
                }
            }, {
                key: 'windowResize',
                value: function windowResize() {
                    var _this4 = this;

                    this.setPageOnResize();
                    var pages = Math.ceil(this.reviewCount / this._reviewsPerPage);
                    var sliderWidth = pages * this._reviewsPerPage * this.reviewWidthWithMargins;
                    this.elements.slider.style.width = sliderWidth + 'px';
                    this.reviewElements.forEach(function(elem) {
                        elem.style.width = _this4.reviewWidth + 'px';
                    });
                    this.observers.forEach(function(observer) {
                        return observer.onResize();
                    });
                }
            }, {
                key: 'setPageOnResize',
                value: function setPageOnResize() {
                    var preResize = {
                        page: this.currentPage,
                        focusedReviewIndex: this._reviewsPerPage * (this.currentPage - 1)
                    };
                    this.calculateReviewsPerPage();
                    var newPage = Math.floor(preResize.focusedReviewIndex / this._reviewsPerPage) + 1;
                    this.jumpToPage(newPage, 0);
                    this.touch.setPageWidth(this.sliderContainerWidth);
                }

                // Pagination methods //

            }, {
                key: 'moveContent',
                value: function moveContent(numPages) {
                    var transitionDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

                    var pageNumber = clamp(numPages + this.currentPage, 1, this.totalPages);
                    this.jumpToPage(pageNumber, transitionDuration);
                }
            }, {
                key: 'pageOffset',
                value: function pageOffset(pageNumber) {
                    return this.sliderContainerWidth * (pageNumber - 1) * -1;
                }
            }, {
                key: 'jumpToPage',
                value: function jumpToPage(pageNumber) {
                    var transitionDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

                    var offset = this.pageOffset(pageNumber);
                    this.setSliderTranslateX(offset);
                    this.setSliderTransitionDuration(transitionDuration);
                    this.currentPage = pageNumber;
                    this.observers.forEach(function(observer) {
                        return observer.onPageChange();
                    });
                }
            }, {
                key: 'totalPages',
                get: function get() {
                    return Math.ceil(this.reviewCount / this._reviewsPerPage);
                }
            }, {
                key: 'reviewWidth',
                get: function get() {
                    var _reviewElementMargins = this.reviewElementMargins(),
                        left = _reviewElementMargins.left,
                        right = _reviewElementMargins.right;

                    return this.reviewWidthWithMargins - (left + right);
                }
            }, {
                key: 'reviewWidthWithMargins',
                get: function get() {
                    return this.sliderContainerWidth / this._reviewsPerPage;
                }
            }, {
                key: 'sliderContainerWidth',
                get: function get() {
                    var _reviewElementMargins2 = this.reviewElementMargins(),
                        adjustmentForLastRightMargin = _reviewElementMargins2.right,
                        adjustmentForFirstLeftMargin = _reviewElementMargins2.left;

                    return (this.elements.sliderContainer.offsetWidth || this._defaultSliderWidth) + adjustmentForLastRightMargin + adjustmentForFirstLeftMargin;
                }
            }, {
                key: 'reviewElements',
                get: function get() {
                    return [].slice.call(this.elements.slider.getElementsByClassName(this.reviewClass));
                }
            }]);

            return ReviewSlider;
        }();

        exports.default = ReviewSlider;

    }, {
        "../touch": 60,
        "../utils": 63
    }],
    60: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        // polyfill for Math.sign (not supported in some mobile browsers)
        var sign = function sign(x) {
            return (x > 0) - (x < 0) || +x;
        };
        Math.sign = Math.sign || sign;

        var TrustBoxesTouch = exports.TrustBoxesTouch = function() {
            function TrustBoxesTouch(_ref) {
                var _ref$targetElement = _ref.targetElement,
                    targetElement = _ref$targetElement === undefined ? null : _ref$targetElement,
                    _ref$pageWidth = _ref.pageWidth,
                    pageWidth = _ref$pageWidth === undefined ? null : _ref$pageWidth,
                    _ref$sensitivity = _ref.sensitivity,
                    sensitivity = _ref$sensitivity === undefined ? 25 : _ref$sensitivity,
                    _ref$touchEndCallback = _ref.touchEndCallback,
                    touchEndCallback = _ref$touchEndCallback === undefined ? function() {} : _ref$touchEndCallback,
                    _ref$touchMoveCallbac = _ref.touchMoveCallback,
                    touchMoveCallback = _ref$touchMoveCallbac === undefined ? function() {} : _ref$touchMoveCallbac,
                    _ref$touchStartCallba = _ref.touchStartCallback,
                    touchStartCallback = _ref$touchStartCallba === undefined ? function() {} : _ref$touchStartCallba;

                _classCallCheck(this, TrustBoxesTouch);

                this.targetElement = targetElement;
                this.pageWidth = pageWidth;
                this.sensitivity = sensitivity;
                this.touchEndCallback = touchEndCallback;
                this.touchMoveCallback = touchMoveCallback;
                this.touchStartCallback = touchStartCallback;
                this.initialX = 0;
                this.offsetDistanceX = 0;
                this.startTouchTime = 0;
                this.lastDragDistanceX = 0;
                this.directionX = 0;
                this.scrollAxis = 'none';
                this.touchPosition = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    stop: {
                        x: 0,
                        y: 0
                    }
                };
                this.targetElement.style.userSelect = 'none';
                this.targetElement.style.transitionTimingFunction = 'ease';
            }

            _createClass(TrustBoxesTouch, [{
                key: 'getDragDistance',
                value: function getDragDistance() {
                    return {
                        x: this.touchPosition.stop.x - this.touchPosition.start.x,
                        y: this.touchPosition.stop.y - this.touchPosition.start.y
                    };
                }
            }, {
                key: 'getPagesToSwipe',
                value: function getPagesToSwipe(towardsInitialX) {
                    var distance = this.getDragDistance().x + this.offsetDistanceX;
                    var distFromClosestPage = Math.abs(distance) % this.pageWidth;
                    var maxPagesToSwipe = Math.ceil(Math.abs(distance / this.pageWidth)) || 1;
                    var exceedsThreshold = distFromClosestPage > this.sensitivity;
                    return exceedsThreshold && !towardsInitialX ? maxPagesToSwipe : maxPagesToSwipe - 1;
                }
            }, {
                key: 'setPageWidth',
                value: function setPageWidth(pageWidth) {
                    this.pageWidth = pageWidth;
                }
            }, {
                key: 'attach',
                value: function attach() {
                    var _this = this;

                    this.targetElement.addEventListener('touchstart', function(evt) {
                        _this.startTouchTime = new Date().getTime();
                        _this.touchPosition.start.x = evt.changedTouches[0].screenX;
                        _this.touchPosition.start.y = evt.changedTouches[0].screenY;
                        var style = window.getComputedStyle(_this.targetElement);
                        var translateX = 0;
                        if (window.DOMMatrix) {
                            var matrix = new window.DOMMatrix(style.webkitTransform);
                            translateX = matrix.m41;
                            _this.initialX = Math.round(translateX / _this.pageWidth) * _this.pageWidth;
                            _this.offsetDistanceX = translateX - _this.initialX;
                        }
                        _this.scrollAxis = 'none';
                        // Don't press links when pages are offset
                        // Assume user wants to scroll on x in this case.
                        if (Math.abs(_this.offsetDistanceX) > 5) {
                            evt.preventDefault();
                            _this.scrollAxis = 'x';
                        }
                        _this.touchStartCallback({
                            translateX: translateX,
                            originPage: Math.abs(_this.initialX) / _this.pageWidth + 1
                        });
                    });

                    this.targetElement.addEventListener('touchmove', function(evt) {
                        _this.touchPosition.stop.x = evt.changedTouches[0].screenX;
                        _this.touchPosition.stop.y = evt.changedTouches[0].screenY;
                        var dragDistance = _this.getDragDistance();
                        if (_this.scrollAxis === 'none') {
                            _this.scrollAxis = Math.abs(dragDistance.x) >= Math.abs(dragDistance.y) ? 'x' : 'y';
                        }
                        if (_this.scrollAxis === 'x') {
                            evt.preventDefault();
                            _this.directionX = dragDistance.x - _this.lastDragDistanceX;
                            _this.lastDragDistanceX = dragDistance.x;

                            _this.touchMoveCallback({
                                translateX: dragDistance.x + _this.offsetDistanceX + _this.initialX
                            });
                        }
                    });

                    this.targetElement.addEventListener('touchend', function() {
                        var endTouchTime = new Date().getTime();
                        var deltaTime = (endTouchTime - _this.startTouchTime) / 1000;
                        var dragDistance = _this.getDragDistance();
                        var fingerSpeed = Math.abs(dragDistance.x) / deltaTime;
                        var transitionDuration = _this.pageWidth / fingerSpeed;
                        var translateX = dragDistance.x + _this.offsetDistanceX + _this.initialX;
                        var dirToInitialX = Math.sign(_this.initialX - translateX);
                        var towardsInitialX = Math.sign(_this.directionX) === dirToInitialX;
                        var pagesToSwipe = _this.scrollAxis === 'x' ? _this.getPagesToSwipe(towardsInitialX) : 0;

                        _this.touchEndCallback({
                            pagesToSwipe: pagesToSwipe * dirToInitialX,
                            transitionDuration: transitionDuration
                        });
                    });
                }
            }]);

            return TrustBoxesTouch;
        }();

    }, {}],
    51: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _translations = require('./translations');

        var mapDateNumberToHuman = {
            0: 'january',
            1: 'february',
            2: 'march',
            3: 'april',
            4: 'may',
            5: 'june',
            6: 'july',
            7: 'august',
            8: 'september',
            9: 'october',
            10: 'november',
            11: 'december'
        };

        var smartAge = function smartAge(locale, date) {
            if (!date) {
                return null;
            }

            var formattedLocale = (0, _translations.formatLocale)(locale);
            var parsedDate = Date.parse(date);
            var parsedDateAsObject = new Date(parsedDate);
            var now = new Date();
            var seconds = Math.floor((now - parsedDate) / 1000);
            var minutes = roundUpOrDown(seconds, 60);
            var hours = roundUpOrDown(minutes, 60);
            var days = roundUpOrDown(hours, 24);

            if (days >= 7) {
                var month = parsedDateAsObject.getMonth();
                var day = parsedDateAsObject.getDate();
                var monthName = mapDateNumberToHuman[month];
                var monthNameTranslated = (0, _translations.getFrameworkTranslation)('monthNames.' + monthName, formattedLocale);
                var japaneseLocale = 'ja-JP';

                if (formattedLocale === _translations.defaultLocale) {
                    return monthNameTranslated + ' ' + day;
                } else if (formattedLocale === japaneseLocale) {
                    return monthNameTranslated + ' ' + day + '\u65E5';
                } else {
                    return day + ' ' + monthNameTranslated;
                }
            }

            if (days > 0) {
                return (0, _translations.getFrameworkTranslation)('timeAgo.days.' + singularOrPlural(days), formattedLocale, {
                    '[count]': days
                });
            }

            if (hours > 0) {
                return (0, _translations.getFrameworkTranslation)('timeAgo.hours.' + singularOrPlural(hours), formattedLocale, {
                    '[count]': hours
                });
            }

            if (minutes > 0) {
                return (0, _translations.getFrameworkTranslation)('timeAgo.minutes.' + singularOrPlural(minutes), formattedLocale, {
                    '[count]': minutes
                });
            }

            if (seconds >= 0) {
                return (0, _translations.getFrameworkTranslation)('timeAgo.seconds.' + singularOrPlural(seconds), formattedLocale, {
                    '[count]': seconds
                });
            }
        };

        function roundUpOrDown(value, interval) {
            return inSecondPartOfTimeInterval(value, interval) ? Math.ceil(value / interval) : Math.floor(value / interval);
        }

        function inSecondPartOfTimeInterval(value, interval) {
            return value > interval && value % interval >= interval / 2;
        }

        function singularOrPlural(value) {
            return value === 1 ? 'singular' : 'plural';
        }

        exports.default = smartAge;

    }, {
        "./translations": 61
    }],
    59: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function escapeHtml(string) {
            var specialCharacters = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;',
                '/': '&sol;',
                '=': '&equals;',
                '`': '&grave;'
            };
            return string.replace(/[<>"'`=\/]/g, function(s) {
                return specialCharacters[s];
            });
        }

        function truncateText(input, maximumLength) {
            if (isNaN(maximumLength)) {
                return input;
            }
            if (maximumLength <= 0) {
                return '';
            }
            if (input && input.length > maximumLength) {
                input = input.substring(0, maximumLength);
                var lastChar = input.charAt(input.length - 1);
                while (lastChar === ' ' || lastChar === '.' || lastChar === ',') {
                    input = input.substr(0, input.length - 1);
                    lastChar = input.charAt(input.length - 1);
                }
                input += '...';
            }
            return escapeHtml(input);
        }

        exports.truncateText = truncateText;
        exports.escapeHtml = escapeHtml;

    }, {}],
    62: [function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.LabelTypes = undefined;

        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _translations = require('./translations');

        var _templating = require('./templating');

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }

        var VerificationLevels = {
            VERIFIED: 'verified',
            INVITED: 'invited',
            REDIRECTED: 'redirected',
            NOT_VERIFIED: 'not-verified'
        };

        var ReviewSourceNames = {
            BASIC_LINK: 'BasicLink',
            DOMAIN_LINK: 'DomainLink',
            INVITATION_LINK_API: 'InvitationLinkApi',
            BUSINESS_GENERATED_LINK: 'BusinessGeneratedLink',
            LEGACY_UNIQUE_LINK: 'LegacyUniqueLink',
            UNIQUE_LINK: 'UniqueLink',
            EMBEDDED_BUSINESS_GENERATED_LINK_FORM: 'EmbeddedBusinessGeneratedLinkForm',
            EMBEDDED_UNIQUE_LINK_FORM: 'EmbeddedUniqueLinkForm',
            KICKSTART: 'Kickstart',
            COPY_PASTE_INVITATION: 'CopyPasteInvitation',
            FILE_UPLOAD_INVITATION: 'FileUploadInvitation',
            MANUAL_INPUT_INVITATION: 'ManualInputInvitation'
        };

        var VerificationSourceNames = {
            COMPLIANCE_DOCUMENTATION: 'complianceDocumentation'
        };

        var LabelTypes = exports.LabelTypes = {
            VERIFIED: 'Verified',
            INVITED: 'Invited',
            REDIRECTED: 'Redirected',
            NOT_VERIFIED: 'Not verified'
        };

        var TooltipTypes = {
            VERIFIED_DOE: 'Verified DoE',
            VERIFIED_AUTOMATIC: 'Verified automatic',
            INVITED_MANUAL: 'Invited manual',
            INVITED_SELF_INVITER: 'Invited self-inviter',
            REDIRECTED: 'Redirected',
            NOT_VERIFIED: 'Not verified'
        };

        var labelAndTooltipTitle = function labelAndTooltipTitle(locale) {
            var _ref;

            return _ref = {}, _defineProperty(_ref, LabelTypes.NOT_VERIFIED, {
                icon: '',
                label: function label() {
                    return '';
                },
                infoTitle: function infoTitle() {
                    return '';
                }
            }), _defineProperty(_ref, LabelTypes.VERIFIED, {
                icon: 'verifiedReview',
                label: function label() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.verifiedReview.label', locale);
                },
                infoTitle: function infoTitle() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.verifiedReview.infoTitle', locale);
                }
            }), _defineProperty(_ref, LabelTypes.REDIRECTED, {
                icon: 'redirectedReview',
                label: function label() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.redirectedReview.label', locale);
                },
                infoTitle: function infoTitle() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.redirectedReview.infoTitle', locale);
                }
            }), _defineProperty(_ref, LabelTypes.INVITED, {
                icon: 'invitedReview',
                label: function label() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.invitedReview.label', locale);
                },
                infoTitle: function infoTitle() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.invitedReview.infoTitle', locale);
                }
            }), _ref;
        };

        var _tooltipContent = function _tooltipContent(locale) {
            var _ref2;

            return _ref2 = {}, _defineProperty(_ref2, TooltipTypes.NOT_VERIFIED, {
                info: function info() {
                    return '';
                }
            }), _defineProperty(_ref2, TooltipTypes.VERIFIED_AUTOMATIC, {
                info: function info() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.verifiedReview.info', locale, {}, ['<a href="https://support.trustpilot.com/hc/articles/223402468#verified-reviews-2" target="_blank">']);
                }
            }), _defineProperty(_ref2, TooltipTypes.VERIFIED_DOE, {
                info: function info() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.verifiedReview.info', locale, {}, ['<a href="https://support.trustpilot.com/hc/articles/201819697" target="_blank">']);
                }
            }), _defineProperty(_ref2, TooltipTypes.REDIRECTED, {
                info: function info() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.redirectedReview.info', locale, {}, ['<a href="https://support.trustpilot.com/hc/articles/223402468#redirected-5" target="_blank">']);
                }
            }), _defineProperty(_ref2, TooltipTypes.INVITED_MANUAL, {
                info: function info() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.invitedReview.info', locale, {}, ['<a href="https://support.trustpilot.com/hc/articles/223402468#invited-reviews-3" target="_blank">']);
                }
            }), _defineProperty(_ref2, TooltipTypes.INVITED_SELF_INVITER, {
                info: function info() {
                    return (0, _translations.getFrameworkTranslation)('reviews.serviceReviewTypeLabels.invitedReview.info', locale, {}, ['<a href="https://support.trustpilot.com/hc/articles/223402468#invited-reviews-3" target="_blank">']);
                }
            }), _ref2;
        };

        var LabelAndTooltipTypeData = function() {
            function LabelAndTooltipTypeData(labelTypeString, tooltipTypeString, locale) {
                _classCallCheck(this, LabelAndTooltipTypeData);

                this.labelType = labelTypeString;
                this.tooltipType = tooltipTypeString;
                this.locale = locale;
            }

            _createClass(LabelAndTooltipTypeData, [{
                key: 'labelNotTranslated',
                value: function labelNotTranslated() {
                    return this.labelType;
                }
            }, {
                key: 'label',
                value: function label() {
                    return labelAndTooltipTitle(this.locale)[this.labelType].label();
                }
            }, {
                key: 'tooltipTitle',
                value: function tooltipTitle() {
                    return labelAndTooltipTitle(this.locale)[this.labelType].infoTitle();
                }
            }, {
                key: 'tooltipContent',
                value: function tooltipContent() {
                    return _tooltipContent(this.locale)[this.tooltipType].info();
                }
            }, {
                key: 'icon',
                value: function icon() {
                    var icon = labelAndTooltipTitle(this.locale)[this.labelType].icon;
                    return icon && (0, _templating.mkElemWithSvgLookup)(icon);
                }
            }]);

            return LabelAndTooltipTypeData;
        }();

        var labelAndTooltipType = function labelAndTooltipType(_ref3) {
            var locale = _ref3.locale,
                createdDateTime = _ref3.createdAt,
                isVerified = _ref3.isVerified,
                reviewSourceName = _ref3.reviewSource,
                verificationLevel = _ref3.verificationLevel,
                verificationSource = _ref3.verificationSource;

            var isManualInvitation = function isManualInvitation() {
                return [ReviewSourceNames.KICKSTART, ReviewSourceNames.COPY_PASTE_INVITATION, ReviewSourceNames.FILE_UPLOAD_INVITATION, ReviewSourceNames.MANUAL_INPUT_INVITATION].indexOf(reviewSourceName) !== -1;
            };
            var isSelfInvited = function isSelfInvited() {
                var reviewSources = [ReviewSourceNames.INVITATION_LINK_API, ReviewSourceNames.BUSINESS_GENERATED_LINK, ReviewSourceNames.LEGACY_UNIQUE_LINK, ReviewSourceNames.UNIQUE_LINK, ReviewSourceNames.EMBEDDED_BUSINESS_GENERATED_LINK_FORM, ReviewSourceNames.EMBEDDED_UNIQUE_LINK_FORM];
                var createdAt = new Date(createdDateTime);
                var startDate = new Date('2020-10-02'); // Release date of "Self invited"
                return reviewSources.indexOf(reviewSourceName) !== -1 && createdAt >= startDate;
            };

            if (verificationLevel) {
                switch (verificationLevel) {
                    case VerificationLevels.VERIFIED:
                        if (verificationSource === VerificationSourceNames.COMPLIANCE_DOCUMENTATION) {
                            return new LabelAndTooltipTypeData(LabelTypes.VERIFIED, TooltipTypes.VERIFIED_DOE, locale);
                        } else {
                            // verificationSource === 'invitation'
                            return new LabelAndTooltipTypeData(LabelTypes.VERIFIED, TooltipTypes.VERIFIED_AUTOMATIC, locale);
                        }
                    case VerificationLevels.INVITED:
                        if (isManualInvitation()) {
                            return new LabelAndTooltipTypeData(LabelTypes.INVITED, TooltipTypes.INVITED_MANUAL, locale);
                        } else if (isSelfInvited()) {
                            return new LabelAndTooltipTypeData(LabelTypes.INVITED, TooltipTypes.INVITED_SELF_INVITER, locale);
                        } else if (reviewSourceName === ReviewSourceNames.BASIC_LINK) {
                            return new LabelAndTooltipTypeData(LabelTypes.NOT_VERIFIED, TooltipTypes.NOT_VERIFIED, locale);
                        }
                        break;
                    case VerificationLevels.REDIRECTED:
                        return new LabelAndTooltipTypeData(LabelTypes.REDIRECTED, TooltipTypes.REDIRECTED, locale);
                    case VerificationLevels.NOT_VERIFIED:
                        return new LabelAndTooltipTypeData(LabelTypes.NOT_VERIFIED, TooltipTypes.NOT_VERIFIED, locale);
                }
            }
            if (isVerified) {
                if (verificationSource === VerificationSourceNames.COMPLIANCE_DOCUMENTATION) {
                    return new LabelAndTooltipTypeData(LabelTypes.VERIFIED, TooltipTypes.VERIFIED_DOE, locale);
                } else if (isManualInvitation()) {
                    return new LabelAndTooltipTypeData(LabelTypes.INVITED, TooltipTypes.INVITED_MANUAL, locale);
                } else if (isSelfInvited()) {
                    return new LabelAndTooltipTypeData(LabelTypes.INVITED, TooltipTypes.INVITED_SELF_INVITER, locale);
                } else {
                    return new LabelAndTooltipTypeData(LabelTypes.VERIFIED, TooltipTypes.VERIFIED_AUTOMATIC, locale);
                }
            } else if (reviewSourceName === ReviewSourceNames.BASIC_LINK) {
                return new LabelAndTooltipTypeData(LabelTypes.NOT_VERIFIED, TooltipTypes.NOT_VERIFIED, locale);
            } else if (reviewSourceName === ReviewSourceNames.DOMAIN_LINK) {
                return new LabelAndTooltipTypeData(LabelTypes.REDIRECTED, TooltipTypes.REDIRECTED, locale);
            } else {
                return new LabelAndTooltipTypeData(LabelTypes.NOT_VERIFIED, TooltipTypes.NOT_VERIFIED, locale);
            }
        };

        var typeLabel = function typeLabel(locale, review) {
            return labelAndTooltipType(_extends({
                locale: locale
            }, review.verification));
        };

        exports.default = typeLabel;

    }, {
        "./templating": 58,
        "./translations": 61
    }]
}, {}, [1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9zdHlsZUZpcnN0VmlzaWJsZVJldmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2RvbS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2ltcHJlc3Npb24uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9xdWVyeVN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL3N0YXJzLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL2xvZ28uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0ZXMvc3VtbWFyeS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRpbmcuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9pbml0LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdGVtcGxhdGVzL3Jldmlld3MuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9zbGlkZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9yZXZpZXdGaWx0ZXJUZXh0LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvYXBpL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9kYS1ESy9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL2RlLUFUL3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9sb2NhbGl6YXRpb24vZW4tQVUvc3RyaW5ncy5qc29uIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9lbi1VUy9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL2VzLUVTL3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9sb2NhbGl6YXRpb24vZmktRkkvc3RyaW5ncy5qc29uIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9mci1CRS9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9pdC1JVC9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL2phLUpQL3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9sb2NhbGl6YXRpb24vbmItTk8vc3RyaW5ncy5qc29uIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9ubC1CRS9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL25sLU5ML3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9sb2NhbGl6YXRpb24vcGwtUEwvc3RyaW5ncy5qc29uIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9wdC1CUi9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL3B0LVBUL3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9sb2NhbGl6YXRpb24vcnUtUlUvc3RyaW5ncy5qc29uIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL2xvY2FsaXphdGlvbi9zdi1TRS9zdHJpbmdzLmpzb24iLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbG9jYWxpemF0aW9uL3poLUNOL3N0cmluZ3MuanNvbiIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9jYWxsLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMveGhyLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvcm9vdFVyaS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9mZXRjaERhdGEuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9jb21tdW5pY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvZm4uanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0ZXMvZXJyb3JGYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRlcy9sb2FkZXIuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9hcGkvcHJvZHVjdFJldmlld3MuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9hcGkvcmV2aWV3RmV0Y2hlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaS9yZXZpZXdGZXRjaGVyL3V0aWwuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9hcGkvcmV2aWV3RmV0Y2hlci9yZXNwb25zZVByb2Nlc3Nvci5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2Fzc2V0cy9zdmcuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9tb2RlbHMvc3R5bGVBbGlnbm1lbnRQb3NpdGlvbnMuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90cmFuc2xhdGlvbnMuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9zbGlkZXIvYXJyb3dDb250cm9scy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3NsaWRlci9jb250cm9scy5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3NsaWRlci9wYWdpbmF0aW9uQ29udHJvbHMuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9zbGlkZXIvcmV2aWV3U2xpZGVyLmpzIiwibm9kZV9tb2R1bGVzL0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvdG91Y2guanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9zbWFydEFnZS5qcyIsIm5vZGVfbW9kdWxlcy9AdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RleHQuanMiLCJub2RlX21vZHVsZXMvQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90eXBlTGFiZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSx1REFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxXQUFBLEdBQUEsT0FBQSxDQUFBLDJEQUFBLENBQUEsQ0FBQTs7OztBQUNBLElBQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxvREFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxJQUFBLEdBQUEsT0FBQSxDQUFBLG9EQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsc0RBQUEsQ0FBQSxDQUFBOztBQVNBLElBQUEsWUFBQSxHQUFBLE9BQUEsQ0FBQSw0REFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLGtFQUFBLENBQUEsQ0FBQTs7OztBQUNBLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxnRUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLCtEQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFdBQUEsR0FBQSxPQUFBLENBQUEsMkRBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxrRUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxpQkFBQSxHQUFBLE9BQUEsQ0FBQSxpRUFBQSxDQUFBLENBQUE7Ozs7QUFDQSxJQUFBLHdCQUFBLEdBQUEsT0FBQSxDQUFBLDJCQUFBLENBQUEsQ0FBQTs7OztBQUVBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxxREFBQSxDQUFBLENBQUE7Ozs7OztBQUVBLFlBQUEsQ0FBQSxPQUFBLENBQVMsdUJBQVQsRUFBQSxDQUFBOztBQUVBLElBQU0sVUFBQSxHQUFhLFNBQWIsVUFBYSxDQUFDLE1BQUQsRUFBQTtFQUFBLE9BQVks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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxJOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7O0FBQ1o7O0lBQVksRTs7QUFDWjs7SUFBWSxFOztBQUNaOztJQUFZLEU7Ozs7QUFFWixJQUFNLFVBQVU7QUFDZCxXQUFTLEVBREs7QUFFZCxXQUFTLEVBRks7QUFHZCxXQUFTLEVBSEs7QUFJZCxXQUFTLEVBSks7QUFLZCxXQUFTLEVBTEs7QUFNZCxXQUFTLEVBTks7QUFPZCxXQUFTLEVBUEs7QUFRZCxXQUFTLEVBUks7QUFTZCxXQUFTLEVBVEs7QUFVZCxXQUFTLEVBVks7QUFXZCxXQUFTLEVBWEs7QUFZZCxXQUFTLEVBWks7QUFhZCxXQUFTLEVBYks7QUFjZCxXQUFTLEVBZEs7QUFlZCxXQUFTLEVBZks7QUFnQmQsV0FBUyxFQWhCSztBQWlCZCxXQUFTLEVBakJLO0FBa0JkLFdBQVMsSUFsQks7QUFtQmQsV0FBUyxFQW5CSztBQW9CZCxXQUFTLEVBcEJLO0FBcUJkLFdBQVMsRUFyQks7QUFzQmQsV0FBUyxFQXRCSztBQXVCZCxXQUFTLEVBdkJLO0FBd0JkLFdBQVMsRUF4Qks7QUF5QmQsV0FBUztBQXpCSyxDQUFoQjs7a0JBNEJlLE87OztBQ3REZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QXZDLEVBQW1ELGFBQWEsVUFBaEUsRUFBNEUsTUFBNUUsQ0FBUDtBQUNELEdBRk0sTUFFQTtBQUNMLFdBQU8sSUFBSSx1QkFBSixDQUE0QixXQUFXLFlBQXZDLEVBQXFELGFBQWEsWUFBbEUsRUFBZ0YsTUFBaEYsQ0FBUDtBQUNEO0FBQ0YsQ0F0R0Q7O0FBd0dBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxNQUFELEVBQVMsTUFBVDtBQUFBLFNBQW9CLCtCQUFzQixjQUF0QixJQUFpQyxPQUFPLFlBQXhDLEVBQXBCO0FBQUEsQ0FBbEI7O2tCQUVlLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBSZXZpZXdTbGlkZXIsIEFycm93Q29udHJvbHMgfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3NsaWRlcic7XG5pbXBvcnQgdHJhY2tpbmcgZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9pbXByZXNzaW9uJztcbmltcG9ydCB7IGZldGNoU2VydmljZVJldmlld0RhdGEgfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL2FwaSc7XG5pbXBvcnQgeyBwb3B1bGF0ZUVsZW1lbnRzIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9kb20nO1xuaW1wb3J0IHtcbiAgaW5zZXJ0TnVtYmVyU2VwYXJhdG9yLFxuICBhZGRFdmVudExpc3RlbmVyLFxuICBzZXRIdG1sQ29udGVudCxcbiAgYWRkVXRtUGFyYW1zLFxuICBzZXRGb250LFxuICBzZXRUZXh0Q29sb3IsXG4gIHNldFRleHRDb250ZW50LFxufSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCB7IGdldEFzT2JqZWN0IGFzIGdldFF1ZXJ5U3RyaW5nIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9xdWVyeVN0cmluZyc7XG5pbXBvcnQgcmV2aWV3VGVtcGxhdGUgZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0ZXMvcmV2aWV3cyc7XG5pbXBvcnQgeyBwb3B1bGF0ZVN0YXJzIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0ZXMvc3RhcnMnO1xuaW1wb3J0IHsgcG9wdWxhdGVMb2dvIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0ZXMvbG9nbyc7XG5pbXBvcnQgeyBta0VsZW1XaXRoU3ZnTG9va3VwIH0gZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy90ZW1wbGF0aW5nJztcbmltcG9ydCB7IG1ha2VFbXB0eVN1bW1hcnkgfSBmcm9tICdAdHJ1c3RwaWxvdC90cnVzdGJveC1mcmFtZXdvcmstdmFuaWxsYS9tb2R1bGVzL3RlbXBsYXRlcy9zdW1tYXJ5JztcbmltcG9ydCByZXZpZXdGaWx0ZXJUZXh0IGZyb20gJ0B0cnVzdHBpbG90L3RydXN0Ym94LWZyYW1ld29yay12YW5pbGxhL21vZHVsZXMvcmV2aWV3RmlsdGVyVGV4dCc7XG5pbXBvcnQgU3R5bGVGaXJzdFZpc2libGVSZXZpZXcgZnJvbSAnLi9zdHlsZUZpcnN0VmlzaWJsZVJldmlldydcblxuaW1wb3J0IGluaXQgZnJvbSAnQHRydXN0cGlsb3QvdHJ1c3Rib3gtZnJhbWV3b3JrLXZhbmlsbGEvbW9kdWxlcy9pbml0JztcblxudHJhY2tpbmcuYXR0YWNoSW1wcmVzc2lvbkhhbmRsZXIoKTtcblxuY29uc3QgbWtUcmFja2luZyA9IChzb3VyY2UpID0+ICgpID0+IHRyYWNraW5nLmVuZ2FnZW1lbnQoeyBzb3VyY2UgfSk7XG5cbmNvbnN0IGFkZFV0bSA9IGFkZFV0bVBhcmFtcygnQ2Fyb3VzZWwnKTtcblxuY29uc3Qge1xuICBidXNpbmVzc3VuaXRJZDogYnVzaW5lc3NVbml0SWQsXG4gIGxvY2FsZSxcbiAgdGhlbWUgPSAnbGlnaHQnLFxuICByZXZpZXdMYW5ndWFnZXMsXG4gIHN0YXJzOiByZXZpZXdTdGFycyxcbiAgdGFnczogcmV2aWV3VGFnVmFsdWUsXG4gIGxvY2F0aW9uLFxuICB0ZW1wbGF0ZUlkLFxuICBmb250RmFtaWx5LFxuICB0ZXh0Q29sb3IsXG59ID0gZ2V0UXVlcnlTdHJpbmcoKTtcblxuY29uc3QgcG9wdWxhdGVFbXB0eVN1bW1hcnkgPSAoeyBiYXNlRGF0YTogeyB0cmFuc2xhdGlvbnMgfSwgdXJsIH0pID0+IHtcbiAgY29uc3Qgd2lkZ2V0Q29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHAtd2lkZ2V0LXdyYXBwZXInKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB0aXRsZTogdHJhbnNsYXRpb25zLm5vcmV2aWV3cyxcbiAgICBzdWJ0aXRsZTogdHJhbnNsYXRpb25zLmZpcnN0cmV2aWV3ZXIsXG4gICAgdXJsLFxuICB9O1xuICBjb25zdCBlbXB0eVN1bW1hcnkgPSBtYWtlRW1wdHlTdW1tYXJ5KG9wdGlvbnMpO1xuICBzZXRIdG1sQ29udGVudCh3aWRnZXRDb250ZW50RWxlbWVudCwgZW1wdHlTdW1tYXJ5LCBmYWxzZSk7XG59O1xuXG5jb25zdCBwb3B1bGF0ZVN1bW1hcnkgPSAoeyBsb2NhbGUsIGJhc2VEYXRhIH0pID0+IHtcbiAgY29uc3Qgc2NvcmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RydXN0LXNjb3JlJyk7XG4gIGNvbnN0IGJhc2VkT24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbnNsYXRpb25zLWJhc2Vkb24nKTtcbiAgY29uc3QgcHJvZmlsZWxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUxpbmsnKTtcbiAgY29uc3Qge1xuICAgIGJ1c2luZXNzRW50aXR5OiB7IG51bWJlck9mUmV2aWV3cyB9LFxuICAgIGxpbmtzOiB7IHByb2ZpbGVVcmwgfSxcbiAgICBzdGFyc1N0cmluZyxcbiAgICB0cmFuc2xhdGlvbnMsXG4gIH0gPSBiYXNlRGF0YTtcblxuICBjb25zdCB0b3RhbFJldmlld3MgPSBudW1iZXJPZlJldmlld3MudG90YWw7XG5cbiAgcG9wdWxhdGVTdGFycyhiYXNlRGF0YSwgJ3RwLXdpZGdldC1zdGFycycpO1xuICBwb3B1bGF0ZUxvZ28ocHJvZmlsZWxpbmspO1xuXG4gIHBvcHVsYXRlRWxlbWVudHMoW1xuICAgIHsgZWxlbWVudDogc2NvcmVFbGVtLCBzdHJpbmc6IHN0YXJzU3RyaW5nIH0sXG4gICAge1xuICAgICAgZWxlbWVudDogYmFzZWRPbixcbiAgICAgIHN0cmluZzogdHJhbnNsYXRpb25zLmJhc2Vkb24sXG4gICAgICBzdWJzdGl0dXRpb25zOiB7XG4gICAgICAgICdbTk9SRVZJRVdTXSc6IGluc2VydE51bWJlclNlcGFyYXRvcih0b3RhbFJldmlld3MsIGxvY2FsZSksXG4gICAgICB9LFxuICAgIH0sXG4gIF0pO1xuXG4gIGNvbnN0IHV0bUxpbmsgPSBhZGRVdG0ocHJvZmlsZVVybCk7XG4gIHByb2ZpbGVsaW5rLmhyZWYgPSB1dG1MaW5rO1xuXG4gIGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RyYW5zbGF0aW9ucy1iYXNlZG9uIGEnKTtcbiAgaWYgKGxpbmtFbGVtZW50KSB7XG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IHV0bUxpbms7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKHByb2ZpbGVsaW5rLCAnY2xpY2snLCBta1RyYWNraW5nKCdMb2dvQ2xpY2snKSk7XG5cbiAgaWYgKGJhc2VEYXRhLnJldmlld3MgJiYgYmFzZURhdGEucmV2aWV3cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcmV2aWV3c0ZpbHRlclRleHQgPSByZXZpZXdGaWx0ZXJUZXh0KGxvY2FsZSwgcmV2aWV3U3RhcnMsIHJldmlld1RhZ1ZhbHVlKTtcbiAgICBjb25zdCByZXZpZXdzRmlsdGVyVGV4dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHAtd2lkZ2V0LXJldmlld3MtZmlsdGVyLWxhYmVsJyk7XG4gICAgc2V0VGV4dENvbnRlbnQocmV2aWV3c0ZpbHRlclRleHRFbGVtZW50LCByZXZpZXdzRmlsdGVyVGV4dCk7XG4gIH1cbn07XG5cbmNvbnN0IHBvcHVsYXRlU2xpZGVyID0gKHsgbG9jYWxlLCByZXZpZXdzIH0pID0+IHtcbiAgY29uc3Qgc2xpZGVyRWxlbWVudHMgPSB7XG4gICAgc2xpZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHAtd2lkZ2V0LXJldmlld3MnKSxcbiAgICBzbGlkZXJDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cC13aWRnZXQtcmV2aWV3cy13cmFwcGVyJyksXG4gIH07XG4gIGNvbnN0IHNsaWRlckFycm93cyA9IHtcbiAgICBwcmV2QXJyb3c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXctYXJyb3ctbGVmdCcpLFxuICAgIG5leHRBcnJvdzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlldy1hcnJvdy1yaWdodCcpLFxuICB9O1xuICBjb25zdCB0ZW1wbGF0ZU9wdGlvbnMgPSB7XG4gICAgcmV2aWV3TGlua0dlbmVyYXRvcjogKHJldmlldykgPT4gYWRkVXRtKHJldmlldy5yZXZpZXdVcmwpLFxuICAgIHRleHRMZW5ndGg6IDgwXG4gIH07XG4gIGNvbnN0IHRlbXBsYXRlID0gcmV2aWV3VGVtcGxhdGUobG9jYWxlLnRvTG93ZXJDYXNlKCksIHRlbXBsYXRlT3B0aW9ucyk7XG4gIGNvbnN0IHN2Z1NsaWRlckFycm93cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3ZnLXNsaWRlci1hcnJvdycpKTtcbiAgc3ZnU2xpZGVyQXJyb3dzLmZvckVhY2goKGl0ZW0pID0+XG4gICAgcG9wdWxhdGVFbGVtZW50cyhbXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6IGl0ZW0sXG4gICAgICAgIHN0cmluZzogbWtFbGVtV2l0aFN2Z0xvb2t1cCgnYXJyb3dTbGlkZXInKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6IGl0ZW0sXG4gICAgICAgIHN0cmluZzogbWtFbGVtV2l0aFN2Z0xvb2t1cCgnYXJyb3dTbGlkZXInKSxcbiAgICAgIH0sXG4gICAgXSlcbiAgKTtcblxuICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgcHJldlBhZ2U6IG1rVHJhY2tpbmcoJ1ByZXYnKSxcbiAgICBuZXh0UGFnZTogbWtUcmFja2luZygnTmV4dCcpLFxuICB9O1xuICBjb25zdCBicmVha3BvaW50cyA9IFtcbiAgICB7IG1pbldpZHRoOiAxMjUwLCByZXZpZXdzRm9yV2lkdGg6IDQgfSxcbiAgICB7IG1pbldpZHRoOiAxMDAwLCByZXZpZXdzRm9yV2lkdGg6IDMgfSxcbiAgICB7IG1pbldpZHRoOiA3NTAsIHJldmlld3NGb3JXaWR0aDogMiB9LFxuICAgIHsgbWluV2lkdGg6IDAsIHJldmlld3NGb3JXaWR0aDogMSB9LFxuICBdO1xuXG4gIGNvbnN0IHNsaWRlckhhbmRsZXIgPSBuZXcgUmV2aWV3U2xpZGVyKHJldmlld3MsIHNsaWRlckVsZW1lbnRzLCB0ZW1wbGF0ZSwge1xuICAgIHJldmlld0NsYXNzOiAndHAtd2lkZ2V0LXJldmlldycsXG4gICAgcmV2aWV3c1BlclBhZ2U6IGJyZWFrcG9pbnRzLFxuICB9KTtcblxuICBjb25zdCBzbGlkZXJDb250cm9scyA9IG5ldyBBcnJvd0NvbnRyb2xzKHNsaWRlckhhbmRsZXIsIHNsaWRlckFycm93cywge1xuICAgIGNhbGxiYWNrcyxcbiAgICBkaXNhYmxlZENsYXNzOiAnZGlzcGxheS1ub25lJyxcbiAgfSk7XG4gIHNsaWRlckNvbnRyb2xzLmluaXRpYWxpemUoKTtcblxuICBjb25zdCBzdHlsZUZpcnN0UmV2aWV3ID0gbmV3IFN0eWxlRmlyc3RWaXNpYmxlUmV2aWV3KHNsaWRlckhhbmRsZXIsIHNsaWRlckVsZW1lbnRzLnNsaWRlcik7XG4gIHN0eWxlRmlyc3RSZXZpZXcuaW5pdGlhbGl6ZSgpO1xufTtcblxuY29uc3QgYXBwbHlDdXN0b21TdHlsaW5nID0gKCkgPT4ge1xuICBpZiAoZm9udEZhbWlseSkge1xuICAgIHNldEZvbnQoZm9udEZhbWlseSk7XG4gIH1cbiAgaWYgKHRleHRDb2xvcikge1xuICAgIHNldFRleHRDb2xvcih0ZXh0Q29sb3IpO1xuICB9XG59O1xuXG5jb25zdCBjb25zdHJ1Y3RUcnVzdEJveCA9ICh7IGJhc2VEYXRhLCBsb2NhbGUgfSkgPT4ge1xuICBpZiAoYmFzZURhdGEuc2V0dGluZ3MuY3VzdG9tU3R5bGVzQWxsb3dlZCkge1xuICAgIGFwcGx5Q3VzdG9tU3R5bGluZygpO1xuICB9XG5cbiAgaWYgKGJhc2VEYXRhLmJ1c2luZXNzRW50aXR5Lm51bWJlck9mUmV2aWV3cy50b3RhbCA9PT0gMCkge1xuICAgIHBvcHVsYXRlRW1wdHlTdW1tYXJ5KHsgYmFzZURhdGEsIHVybDogYWRkVXRtKGJhc2VEYXRhLmxpbmtzLmV2YWx1YXRlVXJsKSB9KTtcbiAgfSBlbHNlIHtcbiAgICBwb3B1bGF0ZVN1bW1hcnkoeyBiYXNlRGF0YSwgbG9jYWxlIH0pO1xuXG4gICAgaWYgKGJhc2VEYXRhLnJldmlld3MgJiYgYmFzZURhdGEucmV2aWV3cy5sZW5ndGggPiAwKSB7XG4gICAgICBwb3B1bGF0ZVNsaWRlcih7IGxvY2FsZSwgcmV2aWV3czogYmFzZURhdGEucmV2aWV3cyB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGZldGNoUGFyYW1zID0ge1xuICBidXNpbmVzc1VuaXRJZCxcbiAgbG9jYWxlLFxuICByZXZpZXdMYW5ndWFnZXMsXG4gIHJldmlld1N0YXJzLFxuICByZXZpZXdUYWdWYWx1ZSxcbiAgaW5jbHVkZVJldmlld3M6IHRydWUsXG4gIHJldmlld3NQZXJQYWdlOiAxNSxcbiAgdGhlbWUsXG4gIGxvY2F0aW9uLFxufTtcblxuaW5pdCgoKSA9PiBmZXRjaFNlcnZpY2VSZXZpZXdEYXRhKHRlbXBsYXRlSWQpKGZldGNoUGFyYW1zLCBjb25zdHJ1Y3RUcnVzdEJveCkpO1xuIiwiLyoqXG4gKiBVcGRhdGVzIHRoZSBzdHlsaW5nIG9mIHRoZSBmaXJzdCB2aXNpYmxlIHJldmlldyBpbiB0aGUgd2lkZ2V0IHdoZW4gdGhlIHdpZGdldCB1cGRhdGVzLlxuICogV2hlbiB0aGUgd2lkZ2V0IGhlaWdodCBpcyBiZWxvdyAxNDBweCwgdGhlIHRleHQgaW4gdGhlIGZpcnN0IHZpc2libGUgcmV2aWV3IHNob3VsZCBiZSBsaW1pdGVkIHRvXG4gKiBhIHNpbmdsZSBsaW5lIG9ubHkgaW4gb3JkZXIgdG8gbWFrZSBzcGFjZSBmb3IgdGhlIGRpc2NsYWltZXIgdGV4dC5cbiAqL1xuIGNsYXNzIFN0eWxlRmlyc3RWaXNpYmxlUmV2aWV3IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBTdHlsZUZpcnN0VmlzaWJsZVJldmlldyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmV2aWV3U2xpZGVyfSBzbGlkZXIgLSBUaGUgUmV2aWV3U2xpZGVyIHRvIHdoaWNoIHRvIGF0dGFjaCB0aGUgc3R5bGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2xpZGVyRG9tRWxlbWVudCAtIERPTSBlbGVtZW50IGZvciBzbGlkZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2xpZGVyLCBzbGlkZXJEb21FbGVtZW50KSB7XG4gICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgIHRoaXMuc2xpZGVyRG9tRWxlbWVudCA9IHNsaWRlckRvbUVsZW1lbnQ7XG4gICAgfVxuICBcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgdGhpcy5zbGlkZXIuYXR0YWNoT2JzZXJ2ZXIodGhpcyk7XG4gICAgICB0aGlzLnNsaWRlci5pbml0aWFsaXplKCk7XG4gICAgICB0aGlzLm9uVXBkYXRlKCk7XG4gICAgfVxuICBcbiAgICBvblVwZGF0ZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHdpZGdldEhlaWdodCA9IHRoaXMuc2xpZGVyRG9tRWxlbWVudC5jbG9zZXN0KCdodG1sJykuY2xpZW50SGVpZ2h0O1xuICAgICAgICBpZiAod2lkZ2V0SGVpZ2h0IDwgMTQwKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3RWaXNpYmxlUmV2aWV3SW5kZXggPSB0aGlzLnNsaWRlci5nZXRGaXJzdFZpc2libGVSZXZpZXdJbmRleCgpO1xuICAgICAgICAgIGNvbnN0IGludmlzaWJsZVJldmlld3NXaXRoVGV4dFNwYW5uaW5nT25lTGluZSA9IHRoaXMuc2xpZGVyRG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dC1zaW5nbGUtbGluZScpO1xuICBcbiAgICAgICAgICB0aGlzLm1ha2VGaXJzdFZpc2libGVSZXZpZXdUZXh0U3Bhbk9uZUxpbmUoZmlyc3RWaXNpYmxlUmV2aWV3SW5kZXgpO1xuICAgICAgICAgIHRoaXMubWFrZUFsbFJldmlld3NFeGNlcHRGaXJzdFZpc2libGVTcGFuVHdvTGluZXMoaW52aXNpYmxlUmV2aWV3c1dpdGhUZXh0U3Bhbm5pbmdPbmVMaW5lKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbWFrZUZpcnN0VmlzaWJsZVJldmlld1RleHRTcGFuT25lTGluZShmaXJzdFZpc2libGVSZXZpZXdJbmRleCkge1xuICAgICAgY29uc3QgdGV4dEVsZW1lbnRPZkZpcnN0VmlzaWJsZVJldmlldyA9IHRoaXMuc2xpZGVyRG9tRWxlbWVudC5jaGlsZE5vZGVzW2ZpcnN0VmlzaWJsZVJldmlld0luZGV4XS5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuICAgICAgdGV4dEVsZW1lbnRPZkZpcnN0VmlzaWJsZVJldmlldy5jbGFzc0xpc3QuYWRkKCd0ZXh0LXNpbmdsZS1saW5lJyk7XG4gICAgfVxuXG4gICAgbWFrZUFsbFJldmlld3NFeGNlcHRGaXJzdFZpc2libGVTcGFuVHdvTGluZXMoaW52aXNpYmxlUmV2aWV3c1dpdGhUZXh0U3Bhbm5pbmdPbmVMaW5lKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW52aXNpYmxlUmV2aWV3c1dpdGhUZXh0U3Bhbm5pbmdPbmVMaW5lLmZvckVhY2goKHJldmlld1RleHRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgcmV2aWV3VGV4dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1zaW5nbGUtbGluZScpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMDApOyAvLyBkb2luZyB0aGlzIGluIGEgdGltZW91dCBiZWNhdXNlIG90aGVyd2lzZSB5b3Ugd2lsbCB2aXN1YWxseSBzZWUgdGhlIHN3aXRjaCBmcm9tIG9uZSB0byB0d28gbGluZXMgYXMgeW91IHNjcm9sbFxuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZSgpIHtcbiAgICAgIHRoaXMub25VcGRhdGUoKTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgIHRoaXMub25VcGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBkZWZhdWx0IFN0eWxlRmlyc3RWaXNpYmxlUmV2aWV3O1xuICAiLCJpbXBvcnQgeyBzZXRIdG1sQ29udGVudCwgbWFrZVRyYW5zbGF0aW9ucywgcmVtb3ZlRWxlbWVudCB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBoYXNDbGFzcyA9IChlbGVtLCBjbGFzc05hbWUpID0+IHtcbiAgaWYgKGVsZW0pIHtcbiAgICBjb25zdCBlbGVtQ2xhc3NMaXN0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGVsZW1DbGFzc0xpc3QgPyBlbGVtQ2xhc3NMaXN0LnNwbGl0KCcgJykgOiAnJztcbiAgICByZXR1cm4gY2xhc3NOYW1lcy5pbmRleE9mKGNsYXNzTmFtZSkgIT09IC0xO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGFkZENsYXNzID0gKGVsZW0sIGZvckFkZGl0aW9uKSA9PiB7XG4gIGlmIChlbGVtKSB7XG4gICAgY29uc3QgZWxlbUNsYXNzTGlzdCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtQ2xhc3NMaXN0ID8gZWxlbUNsYXNzTGlzdC5zcGxpdCgnICcpIDogW107XG5cbiAgICBpZiAoIWhhc0NsYXNzKGVsZW0sIGZvckFkZGl0aW9uKSkge1xuICAgICAgY29uc3QgbmV3Q2xhc3NlcyA9IFsuLi5jbGFzc05hbWVzLCBmb3JBZGRpdGlvbl0uam9pbignICcpO1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgbmV3Q2xhc3Nlcyk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCByZW1vdmVDbGFzcyA9IChlbGVtLCBmb3JSZW1vdmFsKSA9PiB7XG4gIGlmIChlbGVtKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWVzLmZpbHRlcigobmFtZSkgPT4gbmFtZSAhPT0gZm9yUmVtb3ZhbCkuam9pbignICcpO1xuICB9XG59O1xuXG4vKipcbiAqIFBvcHVsYXRlcyBhIHNlcmllcyBvZiBlbGVtZW50cyB3aXRoIEhUTUwgY29udGVudC5cbiAqXG4gKiBGb3IgZWFjaCBvYmplY3QgaW4gYSBsaXN0LCBlaXRoZXIgYSBnaXZlbiBzdHJpbmcgdmFsdWUgaXMgdXNlZCB0byBwb3B1bGF0ZVxuICogdGhlIGdpdmVuIGVsZW1lbnQgKGluY2x1ZGluZyBvcHRpb25hbCBzdWJzdGl0dXRpb25zKTsgb3IsIHdoZXJlIG5vIHN0cmluZ1xuICogdmFsdWUgaXMgcHJvdmlkZWQsIHJlbW92ZSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqL1xuY29uc3QgcG9wdWxhdGVFbGVtZW50cyA9IChlbGVtZW50cykgPT4ge1xuICBlbGVtZW50cy5mb3JFYWNoKCh7IGVsZW1lbnQsIHN0cmluZywgc3Vic3RpdHV0aW9ucyA9IHt9IH0pID0+IHtcbiAgICBpZiAoc3RyaW5nKSB7XG4gICAgICBzZXRIdG1sQ29udGVudChlbGVtZW50LCBtYWtlVHJhbnNsYXRpb25zKHN1YnN0aXR1dGlvbnMsIHN0cmluZyksIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlRWxlbWVudChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzLCBoYXNDbGFzcywgcG9wdWxhdGVFbGVtZW50cyB9O1xuIiwiaW1wb3J0IHsgZ2V0QXNPYmplY3QgYXMgcXVlcnlTdHJpbmcgfSBmcm9tICcuL3F1ZXJ5U3RyaW5nJztcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBnZXRXaWRnZXRSb290VXJpIGZyb20gJy4vcm9vdFVyaSc7XG5pbXBvcnQgeGhyIGZyb20gJy4veGhyJztcblxuZnVuY3Rpb24gc2V0Q29va2llKGNuYW1lLCBjdmFsdWUsIGV4cGlyZXMpIHtcbiAgY29uc3QgcGF0aCA9ICdwYXRoPS8nO1xuICBjb25zdCBkb21haW4gPSBgZG9tYWluPSR7d2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLnJlcGxhY2UoL14uKlxcLihbXi5dK1xcLlteLl0rKS8sICckMScpfWA7XG4gIGNvbnN0IHNhbWVzaXRlID0gYHNhbWVzaXRlPW5vbmVgO1xuICBjb25zdCBzZWN1cmUgPSBgc2VjdXJlYDtcbiAgZG9jdW1lbnQuY29va2llID0gW2Ake2NuYW1lfT0ke2N2YWx1ZX1gLCBwYXRoLCBleHBpcmVzLCBkb21haW4sIHNhbWVzaXRlLCBzZWN1cmVdLmpvaW4oJzsgJyk7XG4gIGRvY3VtZW50LmNvb2tpZSA9IFtgJHtjbmFtZX0tbGVnYWN5PSR7Y3ZhbHVlfWAsIHBhdGgsIGV4cGlyZXMsIGRvbWFpbl0uam9pbignOyAnKTtcbn1cblxuZnVuY3Rpb24gbWFrZVRyYWNraW5nVXJsKGV2ZW50TmFtZSwgaW1wcmVzc2lvbkRhdGEpIHtcbiAgLy8gRGVzdHJ1Y3R1cmUgdGhlIGltcHJlc3Npb25EYXRhIGFuZCBxdWVyeSBwYXJhbXMgc28gdGhhdCB3ZSBvbmx5IHBhc3MgdGhlXG4gIC8vIGRlc2lyZWQgdmFsdWVzIGZvciBjb25zdHJ1Y3RpbmcgdGhlIHRyYWNraW5nIFVSTC5cbiAgY29uc3QgeyBhbm9ueW1vdXNJZDogdXNlcklkLCBzZXNzaW9uRXhwaXJ5OiBfLCAuLi5pbXByZXNzaW9uUGFyYW1zIH0gPSBpbXByZXNzaW9uRGF0YTtcbiAgY29uc3QgeyBidXNpbmVzc3VuaXRJZDogYnVzaW5lc3NVbml0SWQsIHRlbXBsYXRlSWQ6IHdpZGdldElkLCAuLi53aWRnZXRTZXR0aW5ncyB9ID0gcXVlcnlTdHJpbmcoKTtcblxuICBjb25zdCB1cmxQYXJhbXMgPSB7XG4gICAgLi4ud2lkZ2V0U2V0dGluZ3MsXG4gICAgLi4uaW1wcmVzc2lvblBhcmFtcyxcbiAgICAuLi4od2lkZ2V0U2V0dGluZ3MuZ3JvdXAgJiYgdXNlcklkID8geyB1c2VySWQgfSA6IHsgbm9zZXR0aW5nczogMSB9KSxcbiAgICBidXNpbmVzc1VuaXRJZCxcbiAgICB3aWRnZXRJZCxcbiAgfTtcbiAgY29uc3QgdXJsUGFyYW1zU3RyaW5nID0gT2JqZWN0LmtleXModXJsUGFyYW1zKVxuICAgIC5tYXAoKHByb3BlcnR5KSA9PiBgJHtwcm9wZXJ0eX09JHtlbmNvZGVVUklDb21wb25lbnQodXJsUGFyYW1zW3Byb3BlcnR5XSl9YClcbiAgICAuam9pbignJicpO1xuICByZXR1cm4gYCR7Z2V0V2lkZ2V0Um9vdFVyaSgpfS9zdGF0cy8ke2V2ZW50TmFtZX0/JHt1cmxQYXJhbXNTdHJpbmd9YDtcbn1cblxuZnVuY3Rpb24gc2V0VHJhY2tpbmdDb29raWVzKGV2ZW50TmFtZSwgeyBzZXNzaW9uLCB0ZXN0SWQsIHNlc3Npb25FeHBpcnkgfSkge1xuICBjb25zdCB7IGdyb3VwLCBidXNpbmVzc3VuaXRJZDogYnVzaW5lc3NVbml0SWQgfSA9IHF1ZXJ5U3RyaW5nKCk7XG4gIGlmICghZ3JvdXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXRlc3RJZCB8fCAhc2Vzc2lvbikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGNvbnNvbGUud2FybignVHJ1c3RCb3ggT3B0aW1pemVyIHRlc3QgZ3JvdXAgZGV0ZWN0ZWQgYnV0IG5vIHJ1bm5pbmcgdGVzdCBzZXR0aW5ncyBmb3VuZCEnKTtcbiAgfVxuXG4gIGlmIChzZXNzaW9uRXhwaXJ5KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB7IGdyb3VwLCBzZXNzaW9uLCB0ZXN0SWQgfTtcbiAgICBzZXRDb29raWUoXG4gICAgICBgVHJ1c3Rib3hTcGxpdFRlc3RfJHtidXNpbmVzc1VuaXRJZH1gLFxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSksXG4gICAgICBzZXNzaW9uRXhwaXJ5XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmFja0V2ZW50UmVxdWVzdChldmVudE5hbWUsIGltcHJlc3Npb25EYXRhKSB7XG4gIHNldFRyYWNraW5nQ29va2llcyhldmVudE5hbWUsIGltcHJlc3Npb25EYXRhKTtcbiAgY29uc3QgdXJsID0gbWFrZVRyYWNraW5nVXJsKGV2ZW50TmFtZSwgaW1wcmVzc2lvbkRhdGEpO1xuICB0cnkge1xuICAgIHhocih7IHVybCB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5jb25zdCB0cmFja0ltcHJlc3Npb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0cmFja0V2ZW50UmVxdWVzdCgnVHJ1c3Rib3hJbXByZXNzaW9uJywgZGF0YSk7XG59O1xuXG5jb25zdCB0cmFja1ZpZXcgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0cmFja0V2ZW50UmVxdWVzdCgnVHJ1c3Rib3hWaWV3JywgZGF0YSk7XG59O1xuXG5jb25zdCB0cmFja0VuZ2FnZW1lbnQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0cmFja0V2ZW50UmVxdWVzdCgnVHJ1c3Rib3hFbmdhZ2VtZW50JywgZGF0YSk7XG59O1xuXG5sZXQgaWQgPSBudWxsO1xuXG5jb25zdCBhdHRhY2hJbXByZXNzaW9uSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdtZXNzYWdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBldmVudC5kYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlO1xuICAgIHRyeSB7XG4gICAgICBlID0geyBkYXRhOiBKU09OLnBhcnNlKGV2ZW50LmRhdGEpIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gcHJvYmFibHkgbm90IGZvciB1c1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLmRhdGEuY29tbWFuZCA9PT0gJ3NldElkJykge1xuICAgICAgaWQgPSBlLmRhdGEud2lkZ2V0SWQ7XG4gICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHsgY29tbWFuZDogJ2ltcHJlc3Npb24nLCB3aWRnZXRJZDogaWQgfSksICcqJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUuZGF0YS5jb21tYW5kID09PSAnaW1wcmVzc2lvbi1yZWNlaXZlZCcpIHtcbiAgICAgIGRlbGV0ZSBlLmRhdGEuY29tbWFuZDtcbiAgICAgIHRyYWNrSW1wcmVzc2lvbihlLmRhdGEpO1xuICAgIH1cblxuICAgIGlmIChlLmRhdGEuY29tbWFuZCA9PT0gJ3RydXN0Ym94LWluLXZpZXdwb3J0Jykge1xuICAgICAgZGVsZXRlIGUuZGF0YS5jb21tYW5kO1xuICAgICAgdHJhY2tWaWV3KGUuZGF0YSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRyYWNraW5nID0ge1xuICBlbmdhZ2VtZW50OiB0cmFja0VuZ2FnZW1lbnQsXG4gIGF0dGFjaEltcHJlc3Npb25IYW5kbGVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhY2tpbmc7XG4iLCJpbXBvcnQgeyBjb21wb3NlLCBwYWlyc1RvT2JqZWN0IH0gZnJvbSAnLi9mbic7XG5cbi8qKlxuICogQ29udmVydCBhIHBhcmFtZXRlciBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwYXJhbXNUb09iamVjdChwYXJhbVN0cmluZykge1xuICBjb25zdCB0b2tlbnMgPSBbJz8nLCAnIyddO1xuICBjb25zdCBkcm9wRmlyc3RJZlRva2VuID0gKHN0cikgPT4gKHRva2Vucy5pbmRleE9mKHN0clswXSkgIT09IC0xID8gc3RyLnN1YnN0cmluZygxKSA6IHN0cik7XG4gIGNvbnN0IHRvUGFpcnMgPSAoc3RyKSA9PlxuICAgIHN0clxuICAgICAgLnNwbGl0KCcmJylcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5tYXAoKHBhaXJTdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gcGFpclN0cmluZy5zcGxpdCgnPScpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRLZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgICAgICBjb25zdCBkVmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgIHJldHVybiBbZEtleSwgZFZhbHVlXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICBjb25zdCBta09iamVjdCA9IGNvbXBvc2UocGFpcnNUb09iamVjdCwgdG9QYWlycywgZHJvcEZpcnN0SWZUb2tlbik7XG4gIHJldHVybiBta09iamVjdChwYXJhbVN0cmluZyk7XG59XG5cbi8qKlxuICogR2V0IGFsbCBwYXJhbXMgZnJvbSB0aGUgVHJ1c3RCb3gncyBVUkwuXG4gKlxuICogVGhlIG9ubHkgcXVlcnkgcGFyYW1ldGVycyByZXF1aXJlZCB0byBydW4gdGhlIGluaXRpYWwgbG9hZCBvZiBhIFRydXN0Qm94IGFyZVxuICogYnVzaW5lc3NVbml0SWQgYW5kIHRlbXBsYXRlSWQuIFRoZSByZXN0IGFyZSBvbmx5IHVzZWQgd2l0aGluIHRoZSBUcnVzdEJveCB0b1xuICogbWFrZSB0aGUgZGF0YSBjYWxsKHMpIGFuZCBzZXQgb3B0aW9ucy4gVGhlc2UgYXJlIHBhc3NlZCBhcyBwYXJ0IG9mIHRoZSBoYXNoXG4gKiB0byBlbnN1cmUgdGhhdCB3ZSBjYW4gcHJvcGVybHkgdXRpbGlzZSBicm93c2VyIGNhY2hpbmcuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGNhcHR1cmVzIHNpbmdsZSBvY2N1cmVuY2VzIG9mIHZhbHVlcyBpbiB0aGUgVVJMLlxuICpcbiAqIEBwYXJhbSB7TG9jYXRpb259IGxvY2F0aW9uIC0gQSBsb2NhdGlvbiBvYmplY3QgZm9yIHdoaWNoIHRvIGdldCBxdWVyeSBwYXJhbXMuXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gQWxsIHF1ZXJ5IHBhcmFtcyBmb3IgdGhlIGdpdmVuIGxvY2F0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtcyhsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbikge1xuICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcmFtc1RvT2JqZWN0KGxvY2F0aW9uLnNlYXJjaCk7XG4gIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJhbXNUb09iamVjdChsb2NhdGlvbi5oYXNoKTtcbiAgcmV0dXJuIHsgLi4ucXVlcnlQYXJhbXMsIC4uLmhhc2hQYXJhbXMgfTtcbn1cblxuZXhwb3J0IHtcbiAgZ2V0UXVlcnlQYXJhbXMsXG4gIGdldFF1ZXJ5UGFyYW1zIGFzIGdldEFzT2JqZWN0LCAvLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBUQnNcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBhZGRDbGFzcyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IHN0eWxlQWxpZ25tZW50UG9zaXRpb25zIH0gZnJvbSAnLi9tb2RlbHMvc3R5bGVBbGlnbm1lbnRQb3NpdGlvbnMnO1xuaW1wb3J0IGdldFdpZGdldFJvb3RVcmkgZnJvbSAnLi9yb290VXJpJztcblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCB0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoYG9uJHt0eXBlfWAsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCB8fFxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9O1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbiA9XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24gfHxcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgbGlzdGVuZXIuY2FsbChlbGVtZW50LCBlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRPblBhZ2VSZWFkeSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgY29uc3QgcmVzb2x2ZVdpdGhUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIDApO1xuICAgIH07XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgIHJlc29sdmVXaXRoVGltZW91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc29sdmVXaXRoVGltZW91dCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0TnVtYmVyU2VwYXJhdG9yKGlucHV0LCBsb2NhbGUpIHtcbiAgdHJ5IHtcbiAgICBpbnB1dC50b0xvY2FsZVN0cmluZygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHJldHVybiBpbnB1dC50b0xvY2FsZVN0cmluZyhsb2NhbGUgfHwgJ2VuLVVTJyk7XG59XG5cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KGVsZW1lbnQsIGNvbnRlbnQpIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gc2V0IGNvbnRlbnQgb24gbWlzc2luZyBlbGVtZW50Jyk7XG4gIH0gZWxzZSBpZiAoJ2lubmVyVGV4dCcgaW4gZWxlbWVudCkge1xuICAgIC8vIElFOFxuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gY29udGVudDtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgfVxufVxuXG5jb25zdCBzYW5pdGl6ZUh0bWwgPSAoc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgLy8gVE9ETzogR2V0IHJpZCBvZiA8YT4gdGFncyBpbiB0cmFuc2xhdGlvbnNcbiAgLy8gUmVtb3ZlIGh0bWwgdGFncywgZXhjZXB0IDxwPiA8Yj4gPGk+IDxsaT4gPHVsPiA8YT4gPHN0cm9uZz5cbiAgLy8gQnJlYWtkb3duOlxuICAvLyAgKDxcXC8/KD86cHxifGl8bGl8dWx8YXxzdHJvbmcpXFwvPz4pIOKAlCAxc3QgY2FwdHVyaW5nIGdyb3VwLCBzZWxlY3RzIGFsbG93ZWQgdGFncyAob3BlbmluZyBhbmQgY2xvc2luZylcbiAgLy8gICg/OjxcXC8/Lio/XFwvPz4pIOKAlCBub24tY2FwdHVyaW5nIGdyb3VwICg/OiksIG1hdGNoZXMgYWxsIGh0bWwgdGFnc1xuICAvLyAgJDEg4oCUIGtlZXAgbWF0Y2hlcyBmcm9tIDFzdCBjYXB0dXJpbmcgZ3JvdXAgYXMgaXMsIG1hdGNoZXMgZnJvbSBub24tY2FwdHVyaW5nIGdyb3VwIHdpbGwgYmUgb21pdHRlZFxuICAvLyAgL2dpIOKAlCBnbG9iYWwgKG1hdGNoZXMgYWxsIG9jY3VycmVuY2VzKSBhbmQgY2FzZS1pbnNlbnNpdGl2ZVxuICAvLyBUZXN0OiBodHRwczovL3JlZ2V4MTAxLmNvbS9yL2NEYThqci8xXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKDxcXC8/KD86cHxifGl8bGl8dWx8YXxzdHJvbmcpXFwvPz4pfCg/OjxcXC8/Lio/XFwvPz4pL2dpLCAnJDEnKTtcbn07XG5cbi8qKlxuICogU2FmZWx5IHNldHMgaW5uZXJIVE1MIHRvIERPTSBlbGVtZW50LiBBbHdheXMgdXNlIGl0IGluc3RlYWQgb2Ygc2V0dGluZyAuaW5uZXJIVE1MIGRpcmVjdGx5IG9uIGVsZW1lbnQuXG4gKiBTYW5pdGl6ZXMgSFRNTCBieSBkZWZhdWx0LiBVc2Ugc2FuaXRpemUgZmxhZyB0byBjb250cm9sIHRoaXMgYmVoYXZpb3VyLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0gY29udGVudFxuICogQHBhcmFtIHNhbml0aXplXG4gKi9cbmZ1bmN0aW9uIHNldEh0bWxDb250ZW50KGVsZW1lbnQsIGNvbnRlbnQsIHNhbml0aXplID0gdHJ1ZSkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ0F0dGVtcHRpbmcgdG8gc2V0IEhUTUwgY29udGVudCBvbiBtaXNzaW5nIGVsZW1lbnQnKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHNhbml0aXplID8gc2FuaXRpemVIdG1sKGNvbnRlbnQpIDogY29udGVudDtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2sgaWYgdGhlXG4gKiBAcGFyYW0gYWxpZ25tZW50XG4gKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN1cHBsaWVkIHZhbHVlIGlzIGxlZnQgb3IgcmlnaHQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5cbmNvbnN0IGlzVmFsaWRBbGlnbm1lbnQgPSAoYWxpZ25tZW50KSA9PiB7XG4gIHJldHVybiBzdHlsZUFsaWdubWVudFBvc2l0aW9ucy5pbmNsdWRlcyhhbGlnbm1lbnQpO1xufTtcblxuLyoqXG4gKiBTZXQgd2lkZ2V0IGFsaWdubWVudCwgYWxsb3dlZCB2YWx1ZXMgYXJlIGBsZWZ0YCBhbmQgYHJpZ2h0YFxuICpcbiAqIEBwYXJhbSBlbGVtZW50SWRcbiAqIEBwYXJhbSBhbGlnbm1lbnRcbiAqL1xuY29uc3Qgc2V0V2lkZ2V0QWxpZ25tZW50ID0gKGVsZW1lbnRJZCwgYWxpZ25tZW50KSA9PiB7XG4gIGlmICghZWxlbWVudElkKSB7XG4gICAgY29uc29sZS53YXJuKCdUcnVzdHBpbG90OiBjYW5ub3QgZmluZCBzdGFycyB3cmFwcGVyIGVsZW1lbnQsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFhbGlnbm1lbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RydXN0cGlsb3Q6IGNhbm5vdCBhcHBseSB3aWRnZXQgYWxpZ25tZW50LCBwbGVhc2UgY29udGFjdCBzdXBwb3J0IScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlzQWxpZ25tZW50VmFsaWQgPSBpc1ZhbGlkQWxpZ25tZW50KGFsaWdubWVudCk7XG4gIGNvbnNvbGUubG9nKCdpc0FsaWdubWVudFZhbGlkOiAnLCBpc0FsaWdubWVudFZhbGlkKTtcblxuICBpZiAoIWlzQWxpZ25tZW50VmFsaWQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgVHJ1c3RwaWxvdDogJHthbGlnbm1lbnR9IGlzIG5vdCBhIHZhbGlkIHdpZGdldCBhbGlnbm1lbnQgdmFsdWUsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FwcGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG5cbiAgaWYgKCF3YXBwZXJFbGVtZW50KSB7XG4gICAgY29uc29sZS5lcnJvcihcIlRydXN0cGlsb3Q6IGNvdWxkbid0IGZpbmQgdGhlIHN0YXJzIHdyYXBwZXIgZWxlbWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTm90ZTogRWxlbWVudCdzIElkIGFuZCBDbGFzcyBOYW1lIGFyZSB0aGUgc2FtZVxuICB3YXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudElkfS0tJHthbGlnbm1lbnR9YCk7XG59O1xuXG4vKipcbiAqIFNldCBwb3B1cCBhbGlnbm1lbnQsIGFsbG93ZWQgdmFsdWVzIGFyZSBsZWZ0IGFuZCByaWdodFxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWdubWVudFxuICogQHJldHVybnMgc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wdXAgb2YgdGhlIFByb2R1Y3QgTWluaSBhbmQgUHJvZHVjdCBNaW5pIEltcG9ydGVkIHdpZGdldHMgdG8gYGxlZnRgIG9yIGByaWdodGAsIGFzIHByb3ZpZGVkIGJ5IHRoZSBodG1sIGRhdGEtIGZpZWxkXG4gKi9cblxuY29uc3Qgc2V0UG9wdXBBbGlnbm1lbnQgPSAoYWxpZ25tZW50KSA9PiB7XG4gIGlmICghYWxpZ25tZW50KSB7XG4gICAgY29uc29sZS53YXJuKCdUcnVzdHBpbG90OiBjYW5ub3QgYXBwbHkgd2lkZ2V0IGFsaWdubWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCEnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpc0FsaWdubWVudFZhbGlkID0gaXNWYWxpZEFsaWdubWVudChhbGlnbm1lbnQpO1xuXG4gIGlmICghaXNBbGlnbm1lbnRWYWxpZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBUcnVzdHBpbG90OiAke2FsaWdubWVudH0gaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHN0eWxlIGFsaWdubWVudCwgcGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCFgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBOb3RlOiBFbGVtZW50J3MgSWQgYW5kIGNsYXNzIG5hbWUgaGF2ZSB0aGUgc2FtZSB2YWx1ZVxuICBjb25zdCB3aWRnZXRQb3B1cFdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RwLXdpZGdldC13cmFwcGVyJyk7XG4gIGlmICghd2lkZ2V0UG9wdXBXcmFwcGVyRWxlbWVudCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RydXN0cGlsb3Q6IHdpZGdldCBwb3B1cCBpcyBub3QgZm91bmQsIHBsZWFzZSBjb250YWN0IHN1cHBvcnQhJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcG9wdXBTdHlsZUFsaWdubWVudCA9IGB0cC13aWRnZXQtd3JhcHBlci0tJHthbGlnbm1lbnR9YDtcbiAgd2lkZ2V0UG9wdXBXcmFwcGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHBvcHVwU3R5bGVBbGlnbm1lbnQpO1xufTtcblxuZnVuY3Rpb24gbWFrZVRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMsIHN0cmluZykge1xuICBpZiAoIXN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCdNaXNzaW5nIHRyYW5zbGF0aW9uIHN0cmluZycpO1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXModHJhbnNsYXRpb25zKS5yZWR1Y2UoXG4gICAgKHJlc3VsdCwga2V5KSA9PiByZXN1bHQuc3BsaXQoa2V5KS5qb2luKHRyYW5zbGF0aW9uc1trZXldKSxcbiAgICBzdHJpbmdcbiAgKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gcmVtb3ZlIGEgbm9uLWV4aXN0aW5nIGVsZW1lbnQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbn1cblxuY29uc3Qgc2hvd1RydXN0Qm94ID0gKHRoZW1lLCBoYXNSZXZpZXdzKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RwLXdpZGdldC13cmFwcGVyJyk7XG5cbiAgYWRkQ2xhc3MoYm9keSwgdGhlbWUpO1xuICBhZGRDbGFzcyh3cmFwcGVyLCAndmlzaWJsZScpO1xuXG4gIGlmICghaGFzUmV2aWV3cykge1xuICAgIGFkZENsYXNzKGJvZHksICdmaXJzdC1yZXZpZXdlcicpO1xuICB9XG59O1xuXG4vLyB1cmwgY2FuIGFscmVhZHkgaGF2ZSBxdWVyeSBwYXJhbXMgaW4gaXRcbmNvbnN0IHZlcmlmeVF1ZXJ5UGFyYW1TZXBhcmF0b3IgPSAodXJsKSA9PiBgJHt1cmx9JHt1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJ31gO1xuXG5jb25zdCBhZGRVdG1QYXJhbXMgPSAodHJ1c3RCb3hOYW1lKSA9PiAodXJsKSA9PlxuICBgJHt2ZXJpZnlRdWVyeVBhcmFtU2VwYXJhdG9yKHVybCl9dXRtX21lZGl1bT10cnVzdGJveCZ1dG1fc291cmNlPSR7dHJ1c3RCb3hOYW1lfWA7XG5cbmNvbnN0IHJlZ3VsYXRlRm9sbG93Rm9yTG9jYXRpb24gPSAobG9jYXRpb24pID0+IChlbGVtZW50KSA9PiB7XG4gIGlmIChsb2NhdGlvbiAmJiBlbGVtZW50KSB7XG4gICAgZWxlbWVudC5yZWwgPSAnbm9mb2xsb3cnO1xuICB9XG59O1xuXG5jb25zdCBpbmplY3RXaWRnZXRMaW5rcyA9IChiYXNlRGF0YSwgdXRtVHJ1c3RCb3hJZCwgbGlua3NDbGFzcyA9ICdwcm9maWxlLXVybCcpID0+IHtcbiAgY29uc3Qge1xuICAgIGJ1c2luZXNzRW50aXR5OiB7XG4gICAgICBudW1iZXJPZlJldmlld3M6IHsgdG90YWw6IG51bWJlck9mUmV2aWV3cyB9LFxuICAgIH0sXG4gICAgbGlua3MsXG4gIH0gPSBiYXNlRGF0YTtcbiAgY29uc3QgaXRlbXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGlua3NDbGFzcykpO1xuICBjb25zdCBiYXNlVXJsID0gbnVtYmVyT2ZSZXZpZXdzID8gbGlua3MucHJvZmlsZVVybCA6IGxpbmtzLmV2YWx1YXRlVXJsO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbXNbaV0uaHJlZiA9IGFkZFV0bVBhcmFtcyh1dG1UcnVzdEJveElkKShiYXNlVXJsKTtcbiAgfVxufTtcblxuLy8gQ3JlYXRlIGEgcmFuZ2Ugb2YgbnVtYmVycywgdXAgdG8gKGJ1dCBleGNsdWRpbmcpIHRoZSBhcmd1bWVudC5cbi8vIFdyaXR0ZW4gdG8gc3VwcG9ydCBJRTExLlxuY29uc3QgcmFuZ2UgPSAobnVtKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICB3aGlsZSAobnVtID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKHJlc3VsdC5sZW5ndGgpO1xuICAgIG51bS0tO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBTaGlmdHMgdGhlIGdpdmVuIGNvbG9yIHRvIGVpdGhlciBsaWdodGVyIG9yIGRhcmtlciBiYXNlZCBvbiB0aGUgYmFzZSB2YWx1ZSBnaXZlbi5cbi8vIFBvc2l0aXZlIHZhbHVlcyBnaXZlIHlvdSBsaWdodGVyIGNvbG9yLCBuZWdhdGl2ZSBkYXJrZXIuXG5jb25zdCBjb2xvclNoaWZ0ID0gKGNvbCwgYW10KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRlQm91bmRzID0gKHYpID0+ICh2ID4gMjU1ID8gMjU1IDogdiA8IDAgPyAwIDogdik7XG4gIGxldCB1c2VQb3VuZCA9IGZhbHNlO1xuXG4gIGlmIChjb2xbMF0gPT09ICcjJykge1xuICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICB1c2VQb3VuZCA9IHRydWU7XG4gIH1cblxuICBjb25zdCBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcbiAgaWYgKCFudW0pIHtcbiAgICByZXR1cm4gY29sO1xuICB9XG5cbiAgbGV0IHIgPSAobnVtID4+IDE2KSArIGFtdDtcbiAgciA9IHZhbGlkYXRlQm91bmRzKHIpO1xuXG4gIGxldCBnID0gKChudW0gPj4gOCkgJiAweDAwZmYpICsgYW10O1xuICBnID0gdmFsaWRhdGVCb3VuZHMoZyk7XG5cbiAgbGV0IGIgPSAobnVtICYgMHgwMDAwZmYpICsgYW10O1xuICBiID0gdmFsaWRhdGVCb3VuZHMoYik7XG5cbiAgW3IsIGcsIGJdID0gW3IsIGcsIGJdLm1hcCgoY29sb3IpID0+XG4gICAgY29sb3IgPD0gMTUgPyBgMCR7Y29sb3IudG9TdHJpbmcoMTYpfWAgOiBjb2xvci50b1N0cmluZygxNilcbiAgKTtcbiAgcmV0dXJuICh1c2VQb3VuZCA/ICcjJyA6ICcnKSArIHIgKyBnICsgYjtcbn07XG5cbmNvbnN0IGhleFRvUkdCQSA9IChoZXgsIGFscGhhID0gMSkgPT4ge1xuICBjb25zdCBudW0gPSBoZXhbMF0gPT09ICcjJyA/IHBhcnNlSW50KGhleC5zbGljZSgxKSwgMTYpIDogcGFyc2VJbnQoaGV4LCAxNik7XG4gIGNvbnN0IHJlZCA9IG51bSA+PiAxNjtcbiAgY29uc3QgZ3JlZW4gPSAobnVtID4+IDgpICYgMHgwMGZmO1xuICBjb25zdCBibHVlID0gbnVtICYgMHgwMDAwZmY7XG4gIHJldHVybiBgcmdiYSgke3JlZH0sJHtncmVlbn0sJHtibHVlfSwke2FscGhhfSlgO1xufTtcblxuY29uc3Qgc2V0VGV4dENvbG9yID0gKHRleHRDb2xvcikgPT4ge1xuICBjb25zdCB0ZXh0Q29sb3JTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHRleHRDb2xvclN0eWxlLmFwcGVuZENoaWxkKFxuICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgICoge1xuICAgICAgICBjb2xvcjogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgYm9keSB7XG4gICAgICAgIGNvbG9yOiAke3RleHRDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5ib2xkLXVuZGVybGluZSB7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR7dGV4dENvbG9yfSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLmJvbGQtdW5kZXJsaW5lOmhvdmVyIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAke2NvbG9yU2hpZnQodGV4dENvbG9yLCAtMzApfSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnNlY29uZGFyeS10ZXh0IHtcbiAgICAgICAgY29sb3I6ICR7aGV4VG9SR0JBKHRleHRDb2xvciwgMC42KX0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5zZWNvbmRhcnktdGV4dC1hcnJvdyB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtoZXhUb1JHQkEodGV4dENvbG9yLCAwLjYpfSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLnJlYWQtbW9yZSB7XG4gICAgICAgIGNvbG9yOiAke3RleHRDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRleHRDb2xvclN0eWxlKTtcbn07XG5cbmNvbnN0IHNldEJvcmRlckNvbG9yID0gKGJvcmRlckNvbG9yKSA9PiB7XG4gIGNvbnN0IGJvcmRlckNvbG9yU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBib3JkZXJDb2xvclN0eWxlLmFwcGVuZENoaWxkKFxuICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgKiB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHtib3JkZXJDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGJvcmRlckNvbG9yU3R5bGUpO1xufTtcblxuY29uc3Qgc2V0Rm9udCA9IChmb250RmFtaWx5KSA9PiB7XG4gIGNvbnN0IHdpZGdldFJvb3RVcmkgPSBnZXRXaWRnZXRSb290VXJpKCk7XG4gIGNvbnN0IGZvbnRGYW1pbHlOb3JtYWxpemVkRm9yVXJsID0gZm9udEZhbWlseS5yZXBsYWNlKC9cXHMvZywgJy0nKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmb250TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgZm9udExpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAvLyB3ZSBhcmUgdXNpbmcgdGhlIGZvbGxvd2luZyB0aHJlZSB3ZWlnaHRzIGluIG1vc3Qgb2Ygb3VyIFRydXN0Qm94ZXNcbiAgLy8gaW4gZnV0dXJlIGl0ZXJhdGlvbnMsIHdlIGNhbiBvcHRpbWl6ZSB0aGUgYnl0ZXMgdHJhbnNmZXJyZWQgYnkgaGF2aW5nIGEgbGlzdCBvZiB3ZWlnaHRzIHBlciBUcnVzdEJveFxuICBmb250TGluay5ocmVmID0gYCR7d2lkZ2V0Um9vdFVyaX0vZm9udHMvJHtmb250RmFtaWx5Tm9ybWFsaXplZEZvclVybH0uY3NzYDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChmb250TGluayk7XG5cbiAgY29uc3QgY2xlYW5Gb250TmFtZSA9IGZvbnRGYW1pbHkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gIGNvbnN0IGZvbnRTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIGZvbnRTdHlsZS5hcHBlbmRDaGlsZChcbiAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgKiB7XG4gICAgICBmb250LWZhbWlseTogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBib2R5IHtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIiR7Y2xlYW5Gb250TmFtZX1cIiwgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBgKVxuICApO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGZvbnRTdHlsZSk7XG59O1xuXG5jb25zdCBzZXRIdG1sTGFuZ3VhZ2UgPSAobGFuZ3VhZ2UpID0+IHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnbGFuZycsIGxhbmd1YWdlKTtcbn07XG5cbmNvbnN0IHNhbml0aXplQ29sb3IgPSAoY29sb3IpID0+IHtcbiAgY29uc3QgaGV4UmVnRXhwID0gL14jKD86W1xcZGEtZkEtRl17M30pezEsMn0kLztcbiAgcmV0dXJuIHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycgJiYgaGV4UmVnRXhwLnRlc3QoY29sb3IpID8gY29sb3IgOiBudWxsO1xufTtcblxuY29uc3QgaGFuZGxlUG9wb3ZlclBvc2l0aW9uID0gKGxhYmVsLCBwb3BvdmVyLCBjb250YWluZXIsIHBvcFVwQXJyb3cpID0+IHtcbiAgY29uc3QgcG9wb3ZlclJlY3QgPSBwb3BvdmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBsYWJlbFJlY3QgPSBsYWJlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBpZiAocG9wb3ZlclJlY3QubGVmdCA8IGNvbnRhaW5lclJlY3QubGVmdCkge1xuICAgIC8vIFdlIG5lZWQgdG8gc3RpY2sgdGhlIHBvcG92ZXIgdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgY29udGFpbmVyXG4gICAgLy8gQmVjYXVzZSB0aGUgYGxlZnRgIGFuZCBgcmlnaHRgIHZhbHVlcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCxcbiAgICAvLyB3ZSBuZWVkIHRvIG1ha2UgdGhlIGZvbGxvd2luZyBjYWxjdWxhdGlvbiB0byBmaW5kIHdoZXJlIHRvIHN0aWNrIHRoZSBwb3BvdmVyXG4gICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gYCR7Y29udGFpbmVyUmVjdC5sZWZ0IC0gbGFiZWxSZWN0LmxlZnR9cHhgO1xuICAgIHBvcG92ZXIuc3R5bGUucmlnaHQgPSAnYXV0byc7XG4gICAgLy8gTW92aW5nIHRoZSBhcnJvdyBieSB0aGUgZGlzdGFuY2Ugb2YgdGhlIHBvcG92ZXIgc2hpZnQgb3ZlciBYIGF4aXNcbiAgICBjb25zdCBuZXdQb3B1cFJlY3QgPSBwb3BvdmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGN1cnJlbnRMZWZ0VmFsdWUgPSBnZXRDb21wdXRlZFN0eWxlKHBvcFVwQXJyb3cpLmxlZnQ7XG4gICAgcG9wVXBBcnJvdy5zdHlsZS5sZWZ0ID0gYGNhbGMoJHtjdXJyZW50TGVmdFZhbHVlfSArICR7TWF0aC5mbG9vcihcbiAgICAgIHBvcG92ZXJSZWN0LmxlZnQgLSBuZXdQb3B1cFJlY3QubGVmdFxuICAgICl9cHgpYDtcbiAgfSBlbHNlIGlmIChwb3BvdmVyUmVjdC5yaWdodCA+IGNvbnRhaW5lclJlY3QucmlnaHQpIHtcbiAgICAvLyBXZSBuZWVkIHRvIHN0aWNrIHRoZSBwb3BvdmVyIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb250YWluZXJcbiAgICAvLyBCZWNhdXNlIHRoZSBgbGVmdGAgYW5kIGByaWdodGAgdmFsdWVzIGFyZSByZWxhdGl2ZSB0byB0aGUgcGFyZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gbWFrZSB0aGUgZm9sbG93aW5nIGNhbGN1bGF0aW9uIHRvIGZpbmQgd2hlcmUgdG8gc3RpY2sgdGhlIHBvcG92ZXJcbiAgICBwb3BvdmVyLnN0eWxlLnJpZ2h0ID0gYCR7bGFiZWxSZWN0LnJpZ2h0IC0gY29udGFpbmVyUmVjdC5yaWdodH1weGA7XG4gICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICAgIC8vIE1vdmluZyB0aGUgYXJyb3cgYnkgdGhlIGRpc3RhbmNlIG9mIHRoZSBwb3BvdmVyIHNoaWZ0IG92ZXIgWCBheGlzXG4gICAgY29uc3QgbmV3UG9wdXBSZWN0ID0gcG9wb3Zlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjdXJyZW50TGVmdFZhbHVlID0gZ2V0Q29tcHV0ZWRTdHlsZShwb3BVcEFycm93KS5sZWZ0O1xuICAgIHBvcFVwQXJyb3cuc3R5bGUubGVmdCA9IGBjYWxjKCR7Y3VycmVudExlZnRWYWx1ZX0gKyAke01hdGguZmxvb3IoXG4gICAgICBwb3BvdmVyUmVjdC5yaWdodCAtIG5ld1BvcHVwUmVjdC5yaWdodFxuICAgICl9cHgpYDtcbiAgfVxufTtcblxuY29uc3Qgc29ydEF0dHJpYnV0ZVJhdGluZ3MgPSAoYXR0cmlidXRlUmF0aW5nc0FycmF5KSA9PiB7XG4gIGNvbnN0IHNvcnRCeU5hbWUgPSAoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKTtcblxuICBjb25zdCBzdGFyQXR0cmlidXRlcyA9IGF0dHJpYnV0ZVJhdGluZ3NBcnJheVxuICAgIC5maWx0ZXIoKHgpID0+IHgudHlwZSA9PT0gJ3JhbmdlXzF0bzUnKVxuICAgIC5zb3J0KHNvcnRCeU5hbWUpO1xuICBjb25zdCBzY2FsZUF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVSYXRpbmdzQXJyYXkuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09ICdzY2FsZScpLnNvcnQoc29ydEJ5TmFtZSk7XG5cbiAgcmV0dXJuIFsuLi5zdGFyQXR0cmlidXRlcywgLi4uc2NhbGVBdHRyaWJ1dGVzXTtcbn07XG5cbmV4cG9ydCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIsXG4gIGFkZFV0bVBhcmFtcyxcbiAgZ2V0T25QYWdlUmVhZHksXG4gIGluamVjdFdpZGdldExpbmtzLFxuICBpbnNlcnROdW1iZXJTZXBhcmF0b3IsXG4gIGhhbmRsZVBvcG92ZXJQb3NpdGlvbixcbiAgbWFrZVRyYW5zbGF0aW9ucyxcbiAgcmFuZ2UsXG4gIHJlZ3VsYXRlRm9sbG93Rm9yTG9jYXRpb24sXG4gIHJlbW92ZUVsZW1lbnQsXG4gIHNhbml0aXplQ29sb3IsXG4gIHNhbml0aXplSHRtbCxcbiAgc2V0Qm9yZGVyQ29sb3IsXG4gIHNldEh0bWxDb250ZW50LFxuICBzZXRIdG1sTGFuZ3VhZ2UsXG4gIHNldEZvbnQsXG4gIHNldFBvcHVwQWxpZ25tZW50LFxuICBzZXRUZXh0Q29sb3IsXG4gIHNldFRleHRDb250ZW50LFxuICBzZXRXaWRnZXRBbGlnbm1lbnQsXG4gIHNob3dUcnVzdEJveCxcbiAgc29ydEF0dHJpYnV0ZVJhdGluZ3MsXG59O1xuIiwiaW1wb3J0IHsgZGl2LCBta0VsZW1XaXRoU3ZnTG9va3VwIH0gZnJvbSAnLi4vdGVtcGxhdGluZyc7XG5pbXBvcnQgeyBwb3B1bGF0ZUVsZW1lbnRzIH0gZnJvbSAnLi4vZG9tJztcbmltcG9ydCB7IHNhbml0aXplQ29sb3IgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IG1ha2VTdGFycyA9ICh7IG51bSwgdHJ1c3RTY29yZSA9IG51bGwsIHdyYXBwZXJDbGFzcyA9ICcnLCBjb2xvciB9KSA9PiB7XG4gIGNvbnN0IGZ1bGxQYXJ0ID0gTWF0aC5mbG9vcihudW0pO1xuICBjb25zdCBoYWxmUGFydCA9IG51bSA9PT0gZnVsbFBhcnQgPyAnJyA6IGAgdHAtc3RhcnMtLSR7ZnVsbFBhcnR9LS1oYWxmYDtcbiAgY29uc3Qgc2FuaXRpemVkQ29sb3IgPSBzYW5pdGl6ZUNvbG9yKGNvbG9yKTtcbiAgcmV0dXJuIGRpdihcbiAgICB7IGNsYXNzOiB3cmFwcGVyQ2xhc3MgfSxcbiAgICAvLyBhZGQgYSBkaWZmZXJlbnQgY2xhc3Mgc28gdGhhdCBzdHlsZXMgZnJvbSB3aWRnZXRzLXN0eWxlZ3VpZGUgZG8gbm90IGFwcGx5XG4gICAgbWtFbGVtV2l0aFN2Z0xvb2t1cChcbiAgICAgICdzdGFycycsXG4gICAgICBgJHtcbiAgICAgICAgc2FuaXRpemVkQ29sb3JcbiAgICAgICAgICA/ICd0cC1zdGFycy1jdXN0b20tY29sb3InXG4gICAgICAgICAgOiBgdHAtc3RhcnMgdHAtc3RhcnMtLSR7ZnVsbFBhcnR9JHtoYWxmUGFydH1gXG4gICAgICB9YCxcbiAgICAgIHsgcmF0aW5nOiBudW0sIHRydXN0U2NvcmU6IHRydXN0U2NvcmUgfHwgbnVtLCBjb2xvcjogc2FuaXRpemVkQ29sb3IgfVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IHBvcHVsYXRlU3RhcnMgPSAoXG4gIHtcbiAgICBidXNpbmVzc0VudGl0eToge1xuICAgICAgc3RhcnMsXG4gICAgICB0cnVzdFNjb3JlLFxuICAgICAgbnVtYmVyT2ZSZXZpZXdzOiB7IHRvdGFsIH0sXG4gICAgfSxcbiAgfSxcbiAgc3RhcnNDb250YWluZXIgPSAndHAtd2lkZ2V0LXN0YXJzJyxcbiAgc3RhcnNDb2xvclxuKSA9PiB7XG4gIGNvbnN0IHNhbml0aXplZENvbG9yID0gc2FuaXRpemVDb2xvcihzdGFyc0NvbG9yKTtcbiAgY29uc3QgY29udGFpbmVyID1cbiAgICB0eXBlb2Ygc3RhcnNDb250YWluZXIgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RhcnNDb250YWluZXIpIDogc3RhcnNDb250YWluZXI7XG5cbiAgLy8gRW5zdXJlIHdlIHByb3Blcmx5IGhhbmRsZSBlbXB0eSByZXZpZXcgc3RhdGUgLSB3ZSBzb21ldGltZXMgZ2V0IGEgcmF0aW5nXG4gIC8vIGJhY2sgZnJvbSB0aGUgQVBJIGV2ZW4gd2hlcmUgd2UgaGF2ZSBubyByZXZpZXdzLCBzbyBleHBsaWNpdGx5IGNoZWNrLlxuICBjb25zdCBkaXNwbGF5ZWRTdGFycyA9IHRvdGFsID8gc3RhcnMgOiAwO1xuXG4gIHBvcHVsYXRlRWxlbWVudHMoW1xuICAgIHtcbiAgICAgIGVsZW1lbnQ6IGNvbnRhaW5lcixcbiAgICAgIHN0cmluZzogbWFrZVN0YXJzKHsgbnVtOiBkaXNwbGF5ZWRTdGFycywgdHJ1c3RTY29yZSwgY29sb3I6IHNhbml0aXplZENvbG9yIH0pLFxuICAgIH0sXG4gIF0pO1xufTtcblxuZXhwb3J0IHsgbWFrZVN0YXJzLCBwb3B1bGF0ZVN0YXJzIH07XG4iLCJpbXBvcnQgeyBta0VsZW1XaXRoU3ZnTG9va3VwIH0gZnJvbSAnLi4vdGVtcGxhdGluZyc7XG5pbXBvcnQgeyBwb3B1bGF0ZUVsZW1lbnRzIH0gZnJvbSAnLi4vZG9tJztcblxuY29uc3QgbWFrZUxvZ28gPSAoKSA9PiBta0VsZW1XaXRoU3ZnTG9va3VwKCdsb2dvJyk7XG5cbmNvbnN0IHBvcHVsYXRlTG9nbyA9IChsb2dvQ29udGFpbmVyID0gJ3RwLXdpZGdldC1sb2dvJykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPVxuICAgIHR5cGVvZiBsb2dvQ29udGFpbmVyID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvZ29Db250YWluZXIpIDogbG9nb0NvbnRhaW5lcjtcblxuICBwb3B1bGF0ZUVsZW1lbnRzKFtcbiAgICB7XG4gICAgICBlbGVtZW50OiBjb250YWluZXIsXG4gICAgICBzdHJpbmc6IG1ha2VMb2dvKCksXG4gICAgfSxcbiAgXSk7XG59O1xuXG5leHBvcnQgeyBtYWtlTG9nbywgcG9wdWxhdGVMb2dvIH07XG4iLCJpbXBvcnQgeyBkaXYsIHNwYW4sIGEgfSBmcm9tICcuLi90ZW1wbGF0aW5nJztcbmltcG9ydCB7IG1ha2VTdGFycyB9IGZyb20gJy4vc3RhcnMnO1xuaW1wb3J0IHsgbWFrZUxvZ28gfSBmcm9tICcuL2xvZ28nO1xuaW1wb3J0IHsgbWFrZVRyYW5zbGF0aW9ucyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgSE9SSVpPTlRBTCA9ICdob3Jpem9udGFsJztcbmNvbnN0IFZFUlRJQ0FMID0gJ3ZlcnRpY2FsJztcbmNvbnN0IE9SSUVOVEFUSU9OID0ge1xuICBIT1JJWk9OVEFMLFxuICBWRVJUSUNBTCxcbn07XG5cbmNvbnN0IHVzZU5vZm9sbG93ID0gKG5vZm9sbG93KSA9PiAobm9mb2xsb3cgPyB7IHJlbDogJ25vZm9sbG93JyB9IDoge30pO1xuXG5jb25zdCByZW5kZXJTdWJ0aXRsZSA9IChvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgc3VidGl0bGUsIHVybCwgaGFzTG9nbywgbm9mb2xsb3cgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHRyYW5zbGF0ZWRTdWJ0aXRsZSA9IHN1YnRpdGxlICYmIG1ha2VUcmFuc2xhdGlvbnMoe30sIHN1YnRpdGxlKTtcbiAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgdHJhbnNsYXRlZFN1YnRpdGxlICYmIHNwYW4oeyBjbGFzczogJ3RwLXdpZGdldC1lbXB0eS12ZXJ0aWNhbF9fc3VidGl0bGUnIH0sIHRyYW5zbGF0ZWRTdWJ0aXRsZSksXG4gICAgdXJsICYmXG4gICAgICBhKFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6ICd0cC13aWRnZXQtZW1wdHktdmVydGljYWxfX2xvZ28nLFxuICAgICAgICAgIGhyZWY6IHVybCxcbiAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICAgIC4uLnVzZU5vZm9sbG93KG5vZm9sbG93KSxcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZUxvZ28oKVxuICAgICAgKSxcbiAgICBoYXNMb2dvICYmICF1cmwgJiYgc3Bhbih7IGNsYXNzOiAndHAtd2lkZ2V0LWVtcHR5LXZlcnRpY2FsX19sb2dvJyB9LCBtYWtlTG9nbygpKSxcbiAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgcmV0dXJuIGRpdih7IGNsYXNzOiAndHAtd2lkZ2V0LWVtcHR5LXZlcnRpY2FsX19zdWJ0aXRsZS13cmFwcGVyJyB9LCAuLi5jaGlsZHJlbik7XG59O1xuXG5jb25zdCBtYWtlRW1wdHlWZXJ0aWNhbFN1bW1hcnkgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB0cmFuc2xhdGVkVGl0bGUgPSBtYWtlVHJhbnNsYXRpb25zKHt9LCBvcHRpb25zLnRpdGxlKTtcbiAgY29uc3Qgc3VidGl0bGVFbGVtZW50ID0gcmVuZGVyU3VidGl0bGUob3B0aW9ucyk7XG4gIHJldHVybiBkaXYoXG4gICAge1xuICAgICAgY2xhc3M6ICd0cC13aWRnZXQtZW1wdHktdmVydGljYWwnLFxuICAgIH0sXG4gICAgc3Bhbih7IGNsYXNzOiAndHAtd2lkZ2V0LWVtcHR5LXZlcnRpY2FsX190aXRsZScgfSwgdHJhbnNsYXRlZFRpdGxlKSxcbiAgICBtYWtlU3RhcnMoeyBudW06IDAsIHdyYXBwZXJDbGFzczogJ3RwLXdpZGdldC1lbXB0eS12ZXJ0aWNhbF9fc3RhcnMnIH0pLFxuICAgIHN1YnRpdGxlRWxlbWVudFxuICApO1xufTtcblxuY29uc3QgbWFrZUVtcHR5SG9yaXpvbnRhbFN1bW1hcnkgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCB7IHRpdGxlLCB1cmwsIG5vZm9sbG93IH0gPSBvcHRpb25zO1xuICBjb25zdCB0cmFuc2xhdGVkVGl0bGUgPSBtYWtlVHJhbnNsYXRpb25zKHt9LCB0aXRsZSk7XG4gIHJldHVybiBkaXYoXG4gICAgeyBjbGFzczogJ3RwLXdpZGdldC1lbXB0eS1ob3Jpem9udGFsJyB9LFxuICAgIHNwYW4oeyBjbGFzczogJ3RwLXdpZGdldC1lbXB0eS1ob3Jpem9udGFsX190aXRsZScgfSwgdHJhbnNsYXRlZFRpdGxlKSxcbiAgICBhKFxuICAgICAge1xuICAgICAgICBjbGFzczogJ3RwLXdpZGdldC1lbXB0eS1ob3Jpem9udGFsX19sb2dvJyxcbiAgICAgICAgaHJlZjogdXJsLFxuICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICAuLi51c2VOb2ZvbGxvdyhub2ZvbGxvdyksXG4gICAgICB9LFxuICAgICAgbWFrZUxvZ28oKVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IG1ha2VFbXB0eVN1bW1hcnkgPSAob3B0aW9ucykgPT4ge1xuICByZXR1cm4gb3B0aW9ucy5vcmllbnRhdGlvbiA9PT0gT1JJRU5UQVRJT04uSE9SSVpPTlRBTFxuICAgID8gbWFrZUVtcHR5SG9yaXpvbnRhbFN1bW1hcnkob3B0aW9ucylcbiAgICA6IG1ha2VFbXB0eVZlcnRpY2FsU3VtbWFyeShvcHRpb25zKTtcbn07XG5cbmV4cG9ydCB7IG1ha2VFbXB0eVN1bW1hcnksIE9SSUVOVEFUSU9OIH07XG4iLCJpbXBvcnQgeyBzdmdNYXAgfSBmcm9tICcuL2Fzc2V0cy9zdmcnO1xuaW1wb3J0IHsgc2FuaXRpemVIdG1sIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGZsYXR0ZW4gPSAoYXJycykgPT4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJzKTtcblxuY29uc3QgbWtQcm9wcyA9IChwcm9wcykgPT5cbiAgT2JqZWN0LmtleXMocHJvcHMpXG4gICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBzYW5pdGl6ZWRQcm9wID0gc2FuaXRpemVIdG1sKHByb3BzW2tleV0pO1xuICAgICAgcmV0dXJuIGAke2tleX09XCIke3Nhbml0aXplZFByb3B9XCJgO1xuICAgIH0pXG4gICAgLmpvaW4oJyAnKTtcblxuY29uc3QgbWtFbGVtID1cbiAgKHRhZykgPT5cbiAgKHByb3BzLCAuLi5jaGlsZHJlbikgPT4ge1xuICAgIHJldHVybiBgPCR7dGFnfSAke21rUHJvcHMocHJvcHMpfT4ke2ZsYXR0ZW4oY2hpbGRyZW4pLmpvaW4oJ1xcbicpfTwvJHt0YWd9PmA7XG4gIH07XG5cbmNvbnN0IG1rTm9uQ2xvc2luZ0VsZW0gPSAodGFnKSA9PiAocHJvcHMpID0+IGA8JHt0YWd9ICR7bWtQcm9wcyhwcm9wcyl9PmA7XG5cbmNvbnN0IGEgPSBta0VsZW0oJ2EnKTtcbmNvbnN0IGRpdiA9IG1rRWxlbSgnZGl2Jyk7XG5jb25zdCBpbWcgPSBta0VsZW0oJ2ltZycpO1xuY29uc3QgbGFiZWwgPSBta0VsZW0oJ2xhYmVsJyk7XG5jb25zdCBzcGFuID0gbWtFbGVtKCdzcGFuJyk7XG5jb25zdCBpbnB1dCA9IG1rTm9uQ2xvc2luZ0VsZW0oJ2lucHV0Jyk7XG5jb25zdCBjdXN0b21FbGVtZW50ID0gbWtFbGVtO1xuXG5jb25zdCBta0VsZW1XaXRoU3ZnTG9va3VwID0gKHN2Z0tleSwgY2xhc3NOYW1lID0gJycsIHByb3BzKSA9PlxuICBkaXYoeyBjbGFzczogY2xhc3NOYW1lIH0sIHN2Z01hcFtzdmdLZXldKHByb3BzKSk7XG5cbmV4cG9ydCB7IGEsIGRpdiwgaW1nLCBsYWJlbCwgaW5wdXQsIHNwYW4sIG1rRWxlbVdpdGhTdmdMb29rdXAsIGN1c3RvbUVsZW1lbnQgfTtcbiIsImltcG9ydCB7IHBpbmcsIG9uUG9uZyB9IGZyb20gJy4vY29tbXVuaWNhdGlvbic7XG5pbXBvcnQgeyBlcnJvckZhbGxiYWNrIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZXJyb3JGYWxsYmFjayc7XG5cbmNvbnN0IEZBTExCQUNLX0RFTEFZID0gNTAwO1xuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCB0aGUgd2lkZ2V0IGlzIGluaXRpYWxpemVkIG9ubHkgd2hlbiB0aGUgYm9vdHN0cmFwcGVyIGlzIHByZXNlbnQuXG4gKlxuICogU2VuZHMgYSBcInBpbmdcIiBtZXNzYWdlIHRvIHRoZSBib290c3RyYXBwZXIgYW5kIHdhaXRzIGZvciBhIFwicG9uZ1wiIHJlcGx5IGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIHdpZGdldC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkluaXQgdGhlIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGluaXQgaXMgZG9uZS5cbiAqL1xuY29uc3QgaW5pdCA9IChvbkluaXQpID0+IHtcbiAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gIG9uUG9uZygoKSA9PiB7XG4gICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIGlmICh0eXBlb2Ygb25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvbkluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdgb25Jbml0YCBub3Qgc3VwcGxpZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBpbmcoKTtcblxuICAvLyB3ZSB3YW50IHRvIGF2b2lkIHJlbmRlcmluZyB0aGUgZmFsbGJhY2sgcmlnaHQgYXdheSBpbiBjYXNlIHRoZSBcInBvbmdcIiBtZXNzYWdlIGZyb20gdGhlIGJvb3RzdHJhcHBlciBjb21lcyBiYWNrIGltbWVkaWF0ZWx5XG4gIC8vIHRoaXMgd2F5IHdlIHdpbGwgYXZvaWQgYSBmbGlja2VyIGZyb20gXCJlbXB0eSBzY3JlZW5cIiAtPiBcImZhbGxiYWNrXCIgLT4gXCJUcnVzdEJveFwiIGFuZCBoYXZlIFwiZW1wdHkgc2NyZWVuXCIgLT4gXCJUcnVzdEJveFwiXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcbiAgICAgIGVycm9yRmFsbGJhY2soKTtcbiAgICB9XG4gIH0sIEZBTExCQUNLX0RFTEFZKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG4iLCJpbXBvcnQgeyBkaXYsIGEgfSBmcm9tICcuLi90ZW1wbGF0aW5nJztcbmltcG9ydCBzbWFydEFnZSBmcm9tICcuLi9zbWFydEFnZSc7XG5pbXBvcnQgeyBtYWtlU3RhcnMgfSBmcm9tICcuL3N0YXJzJztcbmltcG9ydCB7IGVzY2FwZUh0bWwsIHRydW5jYXRlVGV4dCB9IGZyb20gJy4uL3RleHQnO1xuaW1wb3J0IHsgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24sIGZvcm1hdExvY2FsZSB9IGZyb20gXCIuLi90cmFuc2xhdGlvbnNcIjtcbmltcG9ydCB0eXBlTGFiZWwsIHsgTGFiZWxUeXBlcyB9IGZyb20gXCIuLi90eXBlTGFiZWxcIjtcblxuY29uc3QgcHJvY2Vzc09wdHMgPSAob3B0cykgPT4ge1xuICBjb25zdCBvcHRzSXNGdW5jdGlvbiA9IHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nO1xuICBjb25zdCBvcHRzSXNPYmplY3QgPSBvcHRzICE9PSBudWxsICYmIHR5cGVvZiBvcHRzID09PSAnb2JqZWN0JztcblxuICBjb25zdCByZXZpZXdMaW5rR2VuZXJhdG9yID0gb3B0c0lzRnVuY3Rpb25cbiAgICA/IG9wdHNcbiAgICA6IG9wdHNJc09iamVjdFxuICAgICAgPyBvcHRzLnJldmlld0xpbmtHZW5lcmF0b3JcbiAgICAgIDogbnVsbDtcbiAgY29uc3QgeyB0ZXh0TGVuZ3RoLCBzdGFyQ29sb3IsIGltcG9ydGVkUmV2aWV3cywgc2hvd1Jldmlld1NvdXJjZSB9ID0gb3B0c0lzT2JqZWN0ID8gb3B0cyA6IHt9O1xuICByZXR1cm4geyByZXZpZXdMaW5rR2VuZXJhdG9yLCB0ZXh0TGVuZ3RoLCBzdGFyQ29sb3IsIGltcG9ydGVkUmV2aWV3cywgc2hvd1Jldmlld1NvdXJjZSB9O1xufTtcblxuY29uc3QgbWFrZVZlcmlmaWNhdGlvbk1ldGhvZCA9IChsb2NhbGUsIHZlcmlmaWVkQnkpID0+IHtcbiAgaWYgKHZlcmlmaWVkQnkpIHtcbiAgICByZXR1cm4gZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oXG4gICAgICBgcmV2aWV3cy5jb2xsZWN0ZWRWaWFgLFxuICAgICAgZm9ybWF0TG9jYWxlKGxvY2FsZSksXG4gICAgICB7XG4gICAgICAgICdbc291cmNlXSc6IHZlcmlmaWVkQnksXG4gICAgICB9XG4gICAgKTtcbiAgfVxuICByZXR1cm4gZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oXG4gICAgYHJldmlld3MudmVyaWZpZWRWaWFgLFxuICAgIGZvcm1hdExvY2FsZShsb2NhbGUpLFxuICAgIHtcbiAgICAgICdbc291cmNlXSc6ICdUcnVzdHBpbG90JyxcbiAgICB9XG4gICk7XG59O1xuXG5jb25zdCBtYWtlUG9wVXAgPSAobGFiZWwpID0+XG4gIGRpdihcbiAgICB7IGNsYXNzOiAndHAtd2lkZ2V0LXJldmlld19fc291cmNlX19pbmZvcm1hdGlvbicgfSxcbiAgICBbXG4gICAgICBkaXYoeyBjbGFzczogJ3RwLXdpZGdldC1yZXZpZXdfX3NvdXJjZV9fYXJyb3cnIH0pLFxuICAgICAgZGl2KHsgY2xhc3M6ICdpbmZvcm1hdGlvbi10aXRsZScgfSwgbGFiZWwudG9vbHRpcFRpdGxlKCkpLFxuICAgICAgZGl2KHsgY2xhc3M6ICdpbmZvcm1hdGlvbi10ZXh0JyB9LCBsYWJlbC50b29sdGlwQ29udGVudCgpKSxcbiAgICBdXG4gICk7XG5cbmNvbnN0IG1ha2VWZXJpZmljYXRpb25MYWJlbCA9IChsb2NhbGUsIHJldmlldykgPT4ge1xuICBjb25zdCBsYWJlbCA9IHR5cGVMYWJlbChsb2NhbGUsIHJldmlldyk7XG5cbiAgaWYgKGxhYmVsLmxhYmVsVHlwZSA9PT0gTGFiZWxUeXBlcy5OT1RfVkVSSUZJRUQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGljb24gPSBkaXYoeyBjbGFzczogJ2xhYmVsLWljb24nIH0sIFtcbiAgICBsYWJlbC5pY29uKCksXG4gICAgLy8gU2V0IHBvcHVwIGVsZW1lbnQgYXMgaWNvbidzIGNoaWxkLCBzbyBpdCdzIGFsd2F5cyByZW5kZXJlZCByZWxhdGl2ZSB0byBpY29uJ3MgcG9zaXRpb25cbiAgICBtYWtlUG9wVXAobGFiZWwpXG4gIF0pO1xuICBjb25zdCBsYWJlbFRleHQgPSBkaXYoeyBjbGFzczogJ2xhYmVsLXRleHQnIH0sIGxhYmVsLmxhYmVsKCkpO1xuXG4gIHJldHVybiBkaXYoeyBjbGFzczogJ3RwLXdpZGdldC1yZXZpZXdfX3NvdXJjZSBwb3BvdmVyLWFjdGl2YXRvcicgfSwgW1xuICAgIGRpdih7IGNsYXNzOiAndmVyaWZpY2F0aW9uLWxhYmVsLXdyYXBwZXInIH0sIFtcbiAgICAgIGRpdih7IGNsYXNzOiAndmVyaWZpY2F0aW9uLWxhYmVsJ30sIFtpY29uLCBsYWJlbFRleHRdKSxcbiAgICBdKVxuICBdKTtcbn07XG5cbi8vIFRlbXBsYXRlIGZvciByZXZpZXdzIGRpc3BsYXllZCB3aXRoaW4gQ2Fyb3VzZWwsIFRlc3RpbW9uaWFsU2xpZGVyLCBQcm9kdWN0IFJldmlld3MgQ2Fyb3VzZWwgVHJ1c3RCb3hlcy5cbmNvbnN0IHJldmlld1RlbXBsYXRlID0gKGxvY2FsZSwgb3B0cyA9IHt9KSA9PiAocmV2aWV3KSA9PiB7XG4gIC8vIENoZWNrIGlmIG9wdHMgY29udGFpbiBvbmx5IHRoZSByZXZpZXdMaW5rR2VuZXJhdG9yLiBUaGlzIGlzIHRvIG1haW50YWluIHRoZVxuICAvLyBvbGQgQVBJIGZvciB0aGlzIGZ1bmN0aW9uLCB3aGljaCBvbmx5IHRvb2sgYSBsb2NhbGUgYW5kIGEgcmV2aWV3TGlua0dlbmVyYXRvci5cbiAgY29uc3Qge1xuICAgIHJldmlld0xpbmtHZW5lcmF0b3IsXG4gICAgdGV4dExlbmd0aCA9IDg1LFxuICAgIHN0YXJDb2xvcixcbiAgICBpbXBvcnRlZFJldmlld3MsXG4gICAgc2hvd1Jldmlld1NvdXJjZSA9IGZhbHNlLFxuICB9ID0gcHJvY2Vzc09wdHMob3B0cyk7XG5cbiAgY29uc3Qgd3JhcHBlZERpdiA9ICguLi5hcmdzKSA9PlxuICAgIHJldmlld0xpbmtHZW5lcmF0b3JcbiAgICAgID8gYSh7IGhyZWY6IHJldmlld0xpbmtHZW5lcmF0b3IocmV2aWV3KSwgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9mb2xsb3cnIH0sIGRpdiguLi5hcmdzKSlcbiAgICAgIDogZGl2KC4uLmFyZ3MpO1xuXG4gIHJldHVybiBkaXYoXG4gICAgeyBjbGFzczogYHRwLXdpZGdldC1yZXZpZXcke2ltcG9ydGVkUmV2aWV3cyA/ICcgdHAtd2lkZ2V0LXJldmlldy0taW1wb3J0ZWQnIDogJyd9YCB9LFxuICAgIGRpdih7IGNsYXNzOiAndG9wLXJvdycgfSwgW1xuICAgICAgZGl2KHsgY2xhc3M6ICd0cC13aWRnZXQtc3RhcnMnIH0sIG1ha2VTdGFycyh7IG51bTogcmV2aWV3LnN0YXJzLCBjb2xvcjogc3RhckNvbG9yIH0pKSxcbiAgICAgIG1ha2VWZXJpZmljYXRpb25MYWJlbChsb2NhbGUsIHJldmlldyksXG4gICAgXSksXG4gICAgcmV2aWV3LnRpdGxlID8gd3JhcHBlZERpdih7IGNsYXNzOiAnaGVhZGVyJyB9LCBlc2NhcGVIdG1sKHJldmlldy50aXRsZSkpIDogJycsXG4gICAgLy8gc2VydmljZSByZXZpZXdzIHVzZSBgdGV4dGAgd2hpbGUgcHJvZHVjdCByZXZpZXdzIHVzZSBgY29udGVudGBcbiAgICB3cmFwcGVkRGl2KHsgY2xhc3M6ICd0ZXh0JyB9LCB0cnVuY2F0ZVRleHQocmV2aWV3LnRleHQgfHwgcmV2aWV3LmNvbnRlbnQsIHRleHRMZW5ndGgpKSxcbiAgICB3cmFwcGVkRGl2KHsgY2xhc3M6ICdkYXRlLWFuZC11c2VyLWluZm8td3JhcHBlcicgfSwgW1xuICAgICAgZGl2KHsgY2xhc3M6ICduYW1lIHNlY29uZGFyeS10ZXh0JyB9LCBgJHtyZXZpZXcuY29uc3VtZXIuZGlzcGxheU5hbWV9LGApLFxuICAgICAgZGl2KHsgY2xhc3M6ICdkYXRlIHNlY29uZGFyeS10ZXh0JyB9LCBzbWFydEFnZShsb2NhbGUsIHJldmlldy5jcmVhdGVkQXQpKSxcbiAgICBdKSxcbiAgICBzaG93UmV2aWV3U291cmNlXG4gICAgICA/IGRpdih7IGNsYXNzOiAndHAtd2lkZ2V0LXJldmlld19fc291cmNlJyB9LCBbXG4gICAgICAgICAgbWFrZVZlcmlmaWNhdGlvbk1ldGhvZChsb2NhbGUsIHJldmlldy52ZXJpZmllZEJ5KSxcbiAgICAgICAgXSlcbiAgICAgIDogbnVsbFxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmV2aWV3VGVtcGxhdGU7XG4iLCJpbXBvcnQgUmV2aWV3U2xpZGVyIGZyb20gJy4vcmV2aWV3U2xpZGVyJztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vYXJyb3dDb250cm9scyc7XG5pbXBvcnQgUGFnaW5hdGlvbkNvbnRyb2xzIGZyb20gJy4vcGFnaW5hdGlvbkNvbnRyb2xzJztcblxuZXhwb3J0IHsgUmV2aWV3U2xpZGVyLCBBcnJvd0NvbnRyb2xzLCBQYWdpbmF0aW9uQ29udHJvbHMgfTtcbiIsImltcG9ydCB7IGZvcm1hdExvY2FsZSwgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24gfSBmcm9tICcuL3RyYW5zbGF0aW9ucyc7XG5cbmNvbnN0IHJldmlld0ZpbHRlclRleHQgPSAobG9jYWxlLCByZXZpZXdTdGFycywgcmV2aWV3VGFnVmFsdWUpID0+IHtcbiAgY29uc3QgZm9ybWF0dGVkTG9jYWxlID0gZm9ybWF0TG9jYWxlKGxvY2FsZSk7XG4gIGlmIChyZXZpZXdUYWdWYWx1ZSkge1xuICAgIHJldHVybiBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbihgcmV2aWV3RmlsdGVycy5ieUZhdm9yaXRlT3JUYWdgLCBmb3JtYXR0ZWRMb2NhbGUpO1xuICB9XG5cbiAgaWYgKFxuICAgIHJldmlld1N0YXJzICYmXG4gICAgIVsnMScsICcyJywgJzMnLCAnNCcsICc1J10uZXZlcnkoKHN0YXIpID0+IHJldmlld1N0YXJzLnNwbGl0KCcsJykuaW5kZXhPZihzdGFyKSA+IC0xKVxuICApIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVTdGFyc1N0cmluZyhsb2NhbGUsIHJldmlld1N0YXJzLnNwbGl0KCcsJykuc29ydCgpKTtcbiAgfVxuXG4gIHJldHVybiBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbihgcmV2aWV3RmlsdGVycy5ieUxhdGVzdGAsIGZvcm1hdHRlZExvY2FsZSk7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJzU3RyaW5nID0gKGxvY2FsZSwgc3RhcnMpID0+IHtcbiAgbGV0IGlkID0gJ3Jldmlld0ZpbHRlcnMuYnlMYXRlc3QnO1xuICBjb25zdCBpbnRlcnBvbGF0aW9ucyA9IHt9O1xuICBjb25zdCBmb3JtYXR0ZWRMb2NhbGUgPSBmb3JtYXRMb2NhbGUobG9jYWxlKTtcblxuICBzd2l0Y2ggKHN0YXJzLmxlbmd0aCkge1xuICAgIGNhc2UgNDpcbiAgICAgIGlkID0gJ3Jldmlld0ZpbHRlcnMuYnlTdGFyczQnO1xuICAgICAgaW50ZXJwb2xhdGlvbnNbJ1tzdGFyMV0nXSA9IHN0YXJzWzBdO1xuICAgICAgaW50ZXJwb2xhdGlvbnNbJ1tzdGFyMl0nXSA9IHN0YXJzWzFdO1xuICAgICAgaW50ZXJwb2xhdGlvbnNbJ1tzdGFyM10nXSA9IHN0YXJzWzJdO1xuICAgICAgaW50ZXJwb2xhdGlvbnNbJ1tzdGFyNF0nXSA9IHN0YXJzWzNdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgaWQgPSAncmV2aWV3RmlsdGVycy5ieVN0YXJzMyc7XG4gICAgICBpbnRlcnBvbGF0aW9uc1snW3N0YXIxXSddID0gc3RhcnNbMF07XG4gICAgICBpbnRlcnBvbGF0aW9uc1snW3N0YXIyXSddID0gc3RhcnNbMV07XG4gICAgICBpbnRlcnBvbGF0aW9uc1snW3N0YXIzXSddID0gc3RhcnNbMl07XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBpZCA9ICdyZXZpZXdGaWx0ZXJzLmJ5U3RhcnMyJztcbiAgICAgIGludGVycG9sYXRpb25zWydbc3RhcjFdJ10gPSBzdGFyc1swXTtcbiAgICAgIGludGVycG9sYXRpb25zWydbc3RhcjJdJ10gPSBzdGFyc1sxXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIGlkID0gJ3Jldmlld0ZpbHRlcnMuYnlTdGFyczEnO1xuICAgICAgaW50ZXJwb2xhdGlvbnNbJ1tzdGFyMV0nXSA9IHN0YXJzWzBdO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGlkLCBmb3JtYXR0ZWRMb2NhbGUsIGludGVycG9sYXRpb25zKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJldmlld0ZpbHRlclRleHQ7XG4iLCJpbXBvcnQge1xuICBmZXRjaERhdGEsXG4gIG11bHRpRmV0Y2hEYXRhLFxuICBjb25zdHJ1Y3RUcnVzdEJveEFuZENvbXBsZXRlLFxuICBoYXNTZXJ2aWNlUmV2aWV3cyxcbiAgaGFzU2VydmljZVJldmlld3NNdWx0aUZldGNoLFxufSBmcm9tICcuL2ZldGNoRGF0YSc7XG5pbXBvcnQge1xuICBmZXRjaFByb2R1Y3REYXRhLFxuICBmZXRjaFByb2R1Y3RSZXZpZXdcbn0gZnJvbSAnLi9wcm9kdWN0UmV2aWV3cyc7XG5cbmNvbnN0IGZldGNoU2VydmljZVJldmlld0RhdGEgPSAodGVtcGxhdGVJZCkgPT4gKGZldGNoUGFyYW1zLCBjb25zdHJ1Y3RUcnVzdEJveCwgcGFzc1RvUG9wdXApID0+IHtcbiAgZmV0Y2hEYXRhKGAvdHJ1c3Rib3gtZGF0YS8ke3RlbXBsYXRlSWR9YCkoXG4gICAgZmV0Y2hQYXJhbXMsXG4gICAgY29uc3RydWN0VHJ1c3RCb3gsXG4gICAgcGFzc1RvUG9wdXAsXG4gICAgaGFzU2VydmljZVJldmlld3NcbiAgKTtcbn07XG5cbmNvbnN0IGZldGNoU2VydmljZVJldmllTXVsdGlwbGVEYXRhID0gKHRlbXBsYXRlSWQpID0+IChcbiAgZmV0Y2hQYXJhbXMsXG4gIGNvbnN0cnVjdFRydXN0Qm94LFxuICBwYXNzVG9Qb3B1cFxuKSA9PiB7XG4gIG11bHRpRmV0Y2hEYXRhKGAvdHJ1c3Rib3gtZGF0YS8ke3RlbXBsYXRlSWR9YCkoXG4gICAgZmV0Y2hQYXJhbXMsXG4gICAgY29uc3RydWN0VHJ1c3RCb3gsXG4gICAgcGFzc1RvUG9wdXAsXG4gICAgaGFzU2VydmljZVJldmlld3NNdWx0aUZldGNoXG4gICk7XG59O1xuXG5leHBvcnQge1xuICBmZXRjaFByb2R1Y3REYXRhLFxuICBmZXRjaFByb2R1Y3RSZXZpZXcsXG4gIGNvbnN0cnVjdFRydXN0Qm94QW5kQ29tcGxldGUsXG4gIGZldGNoU2VydmljZVJldmlld0RhdGEsXG4gIGZldGNoU2VydmljZVJldmllTXVsdGlwbGVEYXRhLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJyZXZpZXdzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiYW5tZWxkZWxzZVwiLFxuICAgIFwicGx1cmFsXCI6IFwiYW5tZWxkZWxzZXJcIixcbiAgICBcImNvbGxlY3RlZFZpYVwiOiBcIkluZHNhbWxldCB2aWEgW3NvdXJjZV1cIixcbiAgICBcInZlcmlmaWVkVmlhXCI6IFwiVmVyaWZpY2VyZXQg4oCTIGluZHNhbWxldCB2aWEgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiVmVyaWZpY2VyZXRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJWZXJpZmljZXJldCBhbm1lbGRlbHNlXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpnMgbWVyZVtMSU5LLUVORF0gb20gZGUgZm9yc2tlbGxpZ2UgdHlwZXIgYW5tZWxkZWxzZXJcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJJbnZpdGVyZXRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJJbnZpdGVyZXQgYW5tZWxkZWxzZVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1Mw6ZzIG1lcmVbTElOSy1FTkRdIG9tIGRlIGZvcnNrZWxsaWdlIHR5cGVyIGFubWVsZGVsc2VyXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiT21kaXJpZ2VyZXRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJPbWRpcmlnZXJldCBhbm1lbGRlbHNlXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpnMgbWVyZVtMSU5LLUVORF0gb20gZGUgZm9yc2tlbGxpZ2UgdHlwZXIgYW5tZWxkZWxzZXJcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJqYW51YXJcIixcbiAgICBcImZlYnJ1YXJ5XCI6IFwiZmVicnVhclwiLFxuICAgIFwibWFyY2hcIjogXCJtYXJ0c1wiLFxuICAgIFwiYXByaWxcIjogXCJhcHJpbFwiLFxuICAgIFwibWF5XCI6IFwibWFqXCIsXG4gICAgXCJqdW5lXCI6IFwianVuaVwiLFxuICAgIFwianVseVwiOiBcImp1bGlcIixcbiAgICBcImF1Z3VzdFwiOiBcImF1Z3VzdFwiLFxuICAgIFwic2VwdGVtYmVyXCI6IFwic2VwdGVtYmVyXCIsXG4gICAgXCJvY3RvYmVyXCI6IFwib2t0b2JlclwiLFxuICAgIFwibm92ZW1iZXJcIjogXCJub3ZlbWJlclwiLFxuICAgIFwiZGVjZW1iZXJcIjogXCJkZWNlbWJlclwiXG4gIH0sXG4gIFwidGltZUFnb1wiOiB7XG4gICAgXCJkYXlzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJGb3IgW2NvdW50XSBkYWcgc2lkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiRm9yIFtjb3VudF0gZGFnZSBzaWRlblwiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJGb3IgW2NvdW50XSB0aW1lIHNpZGVuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIkZvciBbY291bnRdIHRpbWVyIHNpZGVuXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiRm9yIFtjb3VudF0gbWludXQgc2lkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiRm9yIFtjb3VudF0gbWludXR0ZXIgc2lkZW5cIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJGb3IgW2NvdW50XSBzZWt1bmQgc2lkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiRm9yIFtjb3VudF0gc2VrdW5kZXIgc2lkZW5cIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiVmlzZXIgdm9yZXMgW3N0YXIxXS1zdGplcm5lZGUgYW5tZWxkZWxzZXJcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiVmlzZXIgdm9yZXMgW3N0YXIxXS0gb2cgW3N0YXIyXS1zdGplcm5lZGUgYW5tZWxkZWxzZXJcIixcbiAgICBcImJ5U3RhcnMzXCI6IFwiVmlzZXIgdm9yZXMgW3N0YXIxXS0sIFtzdGFyMl0tIG9nIFtzdGFyM10tc3RqZXJuZWRlIGFubWVsZGVsc2VyXCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIlZpc2VyIHZvcmVzIFtzdGFyMV0tLCBbc3RhcjJdLSwgW3N0YXIzXS0gb2cgW3N0YXI0XS1zdGplcm5lZGUgYW5tZWxkZWxzZXJcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiVmlzZXIgdm9yZXMgc2VuZXN0ZSBhbm1lbGRlbHNlclwiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiVmlzZXIgdm9yZXMgeW5kbGluZ3Nhbm1lbGRlbHNlclwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicmV2aWV3c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIkJld2VydHVuZ1wiLFxuICAgIFwicGx1cmFsXCI6IFwiQmV3ZXJ0dW5nZW5cIixcbiAgICBcImNvbGxlY3RlZFZpYVwiOiBcIkdlc2FtbWVsdCDDvGJlciBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJWZXJpZml6aWVydCwgZ2VzYW1tZWx0IMO8YmVyIFtzb3VyY2VdXCIsXG4gICAgXCJzZXJ2aWNlUmV2aWV3VHlwZUxhYmVsc1wiOiB7XG4gICAgICBcInZlcmlmaWVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlZlcmlmaXppZXJ0XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiVmVyaWZpemllcnRlIEJld2VydHVuZ1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1FcmZhaHJlbiBTaWUgbWVocltMSU5LLUVORF0gw7xiZXIgdmVyc2NoaWVkZW5lIEFydGVuIHZvbiBCZXdlcnR1bmdlblwiXG4gICAgICB9LFxuICAgICAgXCJpbnZpdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkF1ZiBFaW5sYWR1bmdcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJCZXdlcnR1bmcgYXVmIEVpbmxhZHVuZ1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1FcmZhaHJlbiBTaWUgbWVocltMSU5LLUVORF0gw7xiZXIgdmVyc2NoaWVkZW5lIEFydGVuIHZvbiBCZXdlcnR1bmdlblwiXG4gICAgICB9LFxuICAgICAgXCJyZWRpcmVjdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIldlaXRlcmdlbGVpdGV0XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiV2VpdGVyZ2VsZWl0ZXRlIEJld2VydHVuZ1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1FcmZhaHJlbiBTaWUgbWVocltMSU5LLUVORF0gw7xiZXIgdmVyc2NoaWVkZW5lIEFydGVuIHZvbiBCZXdlcnR1bmdlblwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm1vbnRoTmFtZXNcIjoge1xuICAgIFwiamFudWFyeVwiOiBcIkphbnVhclwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJGZWJydWFyXCIsXG4gICAgXCJtYXJjaFwiOiBcIk3DpHJ6XCIsXG4gICAgXCJhcHJpbFwiOiBcIkFwcmlsXCIsXG4gICAgXCJtYXlcIjogXCJNYWlcIixcbiAgICBcImp1bmVcIjogXCJKdW5pXCIsXG4gICAgXCJqdWx5XCI6IFwiSnVsaVwiLFxuICAgIFwiYXVndXN0XCI6IFwiQXVndXN0XCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJTZXB0ZW1iZXJcIixcbiAgICBcIm9jdG9iZXJcIjogXCJPa3RvYmVyXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIk5vdmVtYmVyXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcIkRlemVtYmVyXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcInZvciBbY291bnRdIFRhZ1wiLFxuICAgICAgXCJwbHVyYWxcIjogXCJ2b3IgW2NvdW50XSBUYWdlblwiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJ2b3IgW2NvdW50XSBTdHVuZGVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwidm9yIFtjb3VudF0gU3R1bmRlblwiXG4gICAgfSxcbiAgICBcIm1pbnV0ZXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcInZvciBbY291bnRdIE1pbnV0ZVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJ2b3IgW2NvdW50XSBNaW51dGVuXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwidm9yIFtjb3VudF0gU2VrdW5kZVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJ2b3IgW2NvdW50XSBTZWt1bmRlblwiXG4gICAgfVxuICB9LFxuICBcInJldmlld0ZpbHRlcnNcIjoge1xuICAgIFwiYnlTdGFyczFcIjogXCJFaW5pZ2UgdW5zZXJlciBbc3RhcjFdLVN0ZXJuZS1CZXdlcnR1bmdlblwiLFxuICAgIFwiYnlTdGFyczJcIjogXCJFaW5pZ2UgdW5zZXJlciBbc3RhcjFdLSAmIFtzdGFyMl0tU3Rlcm5lLUJld2VydHVuZ2VuXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIkVpbmlnZSB1bnNlcmVyIFtzdGFyMV0tLCBbc3RhcjJdLSAmIFtzdGFyM10tU3Rlcm5lLUJld2VydHVuZ2VuXCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIkVpbmlnZSB1bnNlcmVyIFtzdGFyMV0tLCBbc3RhcjJdLSwgW3N0YXIzXS0gJiBbc3RhcjRdLVN0ZXJuZS1CZXdlcnR1bmdlblwiLFxuICAgIFwiYnlMYXRlc3RcIjogXCJVbnNlcmUgbmV1ZXN0ZW4gQmV3ZXJ0dW5nZW5cIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcIlVuc2VyZSBMaWVibGluZ3NiZXdlcnR1bmdlblwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicmV2aWV3c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcInJldmlld1wiLFxuICAgIFwicGx1cmFsXCI6IFwicmV2aWV3c1wiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiQ29sbGVjdGVkIHZpYSBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJWZXJpZmllZCwgY29sbGVjdGVkIHZpYSBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJWZXJpZmllZFwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlZlcmlmaWVkIHJldmlld1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1MZWFybiBtb3JlW0xJTkstRU5EXSBhYm91dCByZXZpZXcgdHlwZXNcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJJbnZpdGVkXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiSW52aXRlZCByZXZpZXdcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTGVhcm4gbW9yZVtMSU5LLUVORF0gYWJvdXQgcmV2aWV3IHR5cGVzXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiUmVkaXJlY3RlZFwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlJlZGlyZWN0ZWQgcmV2aWV3XCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUxlYXJuIG1vcmVbTElOSy1FTkRdIGFib3V0IHJldmlldyB0eXBlc1wiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm1vbnRoTmFtZXNcIjoge1xuICAgIFwiamFudWFyeVwiOiBcIkphbnVhcnlcIixcbiAgICBcImZlYnJ1YXJ5XCI6IFwiRmVicnVhcnlcIixcbiAgICBcIm1hcmNoXCI6IFwiTWFyY2hcIixcbiAgICBcImFwcmlsXCI6IFwiQXByaWxcIixcbiAgICBcIm1heVwiOiBcIk1heVwiLFxuICAgIFwianVuZVwiOiBcIkp1bmVcIixcbiAgICBcImp1bHlcIjogXCJKdWx5XCIsXG4gICAgXCJhdWd1c3RcIjogXCJBdWd1c3RcIixcbiAgICBcInNlcHRlbWJlclwiOiBcIlNlcHRlbWJlclwiLFxuICAgIFwib2N0b2JlclwiOiBcIk9jdG9iZXJcIixcbiAgICBcIm5vdmVtYmVyXCI6IFwiTm92ZW1iZXJcIixcbiAgICBcImRlY2VtYmVyXCI6IFwiRGVjZW1iZXJcIlxuICB9LFxuICBcInRpbWVBZ29cIjoge1xuICAgIFwiZGF5c1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBkYXkgYWdvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gZGF5cyBhZ29cIlxuICAgIH0sXG4gICAgXCJob3Vyc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBob3VyIGFnb1wiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIGhvdXJzIGFnb1wiXG4gICAgfSxcbiAgICBcIm1pbnV0ZXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gbWludXRlIGFnb1wiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIG1pbnV0ZXMgYWdvXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBzZWNvbmQgYWdvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gc2Vjb25kcyBhZ29cIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiU2hvd2luZyBvdXIgW3N0YXIxXSBzdGFyIHJldmlld3NcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiU2hvd2luZyBvdXIgW3N0YXIxXSAmIFtzdGFyMl0gc3RhciByZXZpZXdzXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIlNob3dpbmcgb3VyIFtzdGFyMV0sIFtzdGFyMl0gJiBbc3RhcjNdIHN0YXIgcmV2aWV3c1wiLFxuICAgIFwiYnlTdGFyczRcIjogXCJTaG93aW5nIG91ciBbc3RhcjFdLCBbc3RhcjJdLCBbc3RhcjNdICYgW3N0YXI0XSBzdGFyIHJldmlld3NcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiU2hvd2luZyBvdXIgbGF0ZXN0IHJldmlld3NcIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcIlNob3dpbmcgb3VyIGZhdm91cml0ZSByZXZpZXdzXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJyZXZpZXdzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwicmV2aWV3XCIsXG4gICAgXCJwbHVyYWxcIjogXCJyZXZpZXdzXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJDb2xsZWN0ZWQgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIlZlcmlmaWVkLCBjb2xsZWN0ZWQgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJzZXJ2aWNlUmV2aWV3VHlwZUxhYmVsc1wiOiB7XG4gICAgICBcInZlcmlmaWVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlZlcmlmaWVkXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiVmVyaWZpZWQgcmV2aWV3XCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUxlYXJuIG1vcmVbTElOSy1FTkRdIGFib3V0IHJldmlldyB0eXBlc1wiXG4gICAgICB9LFxuICAgICAgXCJpbnZpdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkludml0ZWRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJJbnZpdGVkIHJldmlld1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1MZWFybiBtb3JlW0xJTkstRU5EXSBhYm91dCByZXZpZXcgdHlwZXNcIlxuICAgICAgfSxcbiAgICAgIFwicmVkaXJlY3RlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJSZWRpcmVjdGVkXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiUmVkaXJlY3RlZCByZXZpZXdcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTGVhcm4gbW9yZVtMSU5LLUVORF0gYWJvdXQgcmV2aWV3IHR5cGVzXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibW9udGhOYW1lc1wiOiB7XG4gICAgXCJqYW51YXJ5XCI6IFwiSmFudWFyeVwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJGZWJydWFyeVwiLFxuICAgIFwibWFyY2hcIjogXCJNYXJjaFwiLFxuICAgIFwiYXByaWxcIjogXCJBcHJpbFwiLFxuICAgIFwibWF5XCI6IFwiTWF5XCIsXG4gICAgXCJqdW5lXCI6IFwiSnVuZVwiLFxuICAgIFwianVseVwiOiBcIkp1bHlcIixcbiAgICBcImF1Z3VzdFwiOiBcIkF1Z3VzdFwiLFxuICAgIFwic2VwdGVtYmVyXCI6IFwiU2VwdGVtYmVyXCIsXG4gICAgXCJvY3RvYmVyXCI6IFwiT2N0b2JlclwiLFxuICAgIFwibm92ZW1iZXJcIjogXCJOb3ZlbWJlclwiLFxuICAgIFwiZGVjZW1iZXJcIjogXCJEZWNlbWJlclwiXG4gIH0sXG4gIFwidGltZUFnb1wiOiB7XG4gICAgXCJkYXlzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIGRheSBhZ29cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBkYXlzIGFnb1wiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIGhvdXIgYWdvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gaG91cnMgYWdvXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBtaW51dGUgYWdvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gbWludXRlcyBhZ29cIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIHNlY29uZCBhZ29cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBzZWNvbmRzIGFnb1wiXG4gICAgfVxuICB9LFxuICBcInJldmlld0ZpbHRlcnNcIjoge1xuICAgIFwiYnlTdGFyczFcIjogXCJTaG93aW5nIG91ciBbc3RhcjFdIHN0YXIgcmV2aWV3c1wiLFxuICAgIFwiYnlTdGFyczJcIjogXCJTaG93aW5nIG91ciBbc3RhcjFdICYgW3N0YXIyXSBzdGFyIHJldmlld3NcIixcbiAgICBcImJ5U3RhcnMzXCI6IFwiU2hvd2luZyBvdXIgW3N0YXIxXSwgW3N0YXIyXSAmIFtzdGFyM10gc3RhciByZXZpZXdzXCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIlNob3dpbmcgb3VyIFtzdGFyMV0sIFtzdGFyMl0sIFtzdGFyM10gJiBbc3RhcjRdIHN0YXIgcmV2aWV3c1wiLFxuICAgIFwiYnlMYXRlc3RcIjogXCJTaG93aW5nIG91ciBsYXRlc3QgcmV2aWV3c1wiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiU2hvd2luZyBvdXIgZmF2b3JpdGUgcmV2aWV3c1wiXG4gIH0sXG4gIFwibm90UmF0ZWRcIjogXCJOb3QgcmF0ZWRcIlxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJyZXZpZXdzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwib3BpbmnDs25cIixcbiAgICBcInBsdXJhbFwiOiBcIm9waW5pb25lc1wiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiRnVlbnRlOiBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJWZXJpZmljYWRhLCByZWNvcGlsYWRhIHbDrWEgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiVmVyaWZpY2FkYVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIk9waW5pw7NuIHZlcmlmaWNhZGFcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTcOhcyBpbmZvcm1hY2nDs25bTElOSy1FTkRdIHNvYnJlIGxvcyB0aXBvcyBkZSBvcGluacOzblwiXG4gICAgICB9LFxuICAgICAgXCJpbnZpdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlBvciBpbnZpdGFjacOzblwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIk9waW5pw7NuIHBvciBpbnZpdGFjacOzblwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1Nw6FzIGluZm9ybWFjacOzbltMSU5LLUVORF0gc29icmUgbG9zIHRpcG9zIGRlIG9waW5pw7NuXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiUmVkaXJpZ2lkYVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIk9waW5pw7NuIHJlZGlyaWdpZGFcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTcOhcyBpbmZvcm1hY2nDs25bTElOSy1FTkRdIHNvYnJlIGxvcyB0aXBvcyBkZSBvcGluacOzblwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm1vbnRoTmFtZXNcIjoge1xuICAgIFwiamFudWFyeVwiOiBcImVuZXJvXCIsXG4gICAgXCJmZWJydWFyeVwiOiBcImZlYnJlcm9cIixcbiAgICBcIm1hcmNoXCI6IFwibWFyem9cIixcbiAgICBcImFwcmlsXCI6IFwiYWJyaWxcIixcbiAgICBcIm1heVwiOiBcIm1heW9cIixcbiAgICBcImp1bmVcIjogXCJqdW5pb1wiLFxuICAgIFwianVseVwiOiBcImp1bGlvXCIsXG4gICAgXCJhdWd1c3RcIjogXCJhZ29zdG9cIixcbiAgICBcInNlcHRlbWJlclwiOiBcInNlcHRpZW1icmVcIixcbiAgICBcIm9jdG9iZXJcIjogXCJvY3R1YnJlXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIm5vdmllbWJyZVwiLFxuICAgIFwiZGVjZW1iZXJcIjogXCJkaWNpZW1icmVcIlxuICB9LFxuICBcInRpbWVBZ29cIjoge1xuICAgIFwiZGF5c1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiSGFjZSBbY291bnRdIGTDrWFcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiSGFjZSBbY291bnRdIGTDrWFzXCJcbiAgICB9LFxuICAgIFwiaG91cnNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIkhhY2UgW2NvdW50XSBob3JhXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIkhhY2UgW2NvdW50XSBob3Jhc1wiXG4gICAgfSxcbiAgICBcIm1pbnV0ZXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIkhhY2UgW2NvdW50XSBtaW51dG9cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiSGFjZSBbY291bnRdIG1pbnV0b3NcIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJIYWNlIFtjb3VudF0gc2VndW5kb1wiLFxuICAgICAgXCJwbHVyYWxcIjogXCJIYWNlIFtjb3VudF0gc2VndW5kb3NcIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiTnVlc3RyYXMgb3BpbmlvbmVzIGRlIFtzdGFyMV0gZXN0cmVsbGFzXCIsXG4gICAgXCJieVN0YXJzMlwiOiBcIk51ZXN0cmFzIG9waW5pb25lcyBkZSBbc3RhcjFdIHkgW3N0YXIyXSBlc3RyZWxsYXNcIixcbiAgICBcImJ5U3RhcnMzXCI6IFwiTnVlc3RyYXMgb3BpbmlvbmVzIGRlIFtzdGFyMV0sIFtzdGFyMl0geSBbc3RhcjNdIGVzdHJlbGxhc1wiLFxuICAgIFwiYnlTdGFyczRcIjogXCJOdWVzdHJhcyBvcGluaW9uZXMgZGUgW3N0YXIxXSwgW3N0YXIyXSwgW3N0YXIzXSB5IFtzdGFyNF0gZXN0cmVsbGFzXCIsXG4gICAgXCJieUxhdGVzdFwiOiBcIk51ZXN0cmFzIG9waW5pb25lcyBtw6FzIHJlY2llbnRlc1wiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiTnVlc3RyYXMgb3BpbmlvbmVzIHByZWZlcmlkYXNcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJhcnZvc3RlbHVcIixcbiAgICBcInBsdXJhbFwiOiBcImFydm9zdGVsdWFcIixcbiAgICBcImNvbGxlY3RlZFZpYVwiOiBcIkFydm9zdGVsdW4gbMOkaGRlOiBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJWYXJtZW5uZXR0dSwgbMOkaGRlOiBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJWYXJtZW5uZXR0dVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlZhcm1lbm5ldHR1IGFydm9zdGVsdVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1MdWUgbGlzw6TDpFtMSU5LLUVORF0gZXJpIGFydm9zdGVsdXR5eXBlaXN0w6RcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJLdXRzdXR0dVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIkt1dHN1dHR1IGFydm9zdGVsdVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1MdWUgbGlzw6TDpFtMSU5LLUVORF0gZXJpIGFydm9zdGVsdXR5eXBlaXN0w6RcIlxuICAgICAgfSxcbiAgICAgIFwicmVkaXJlY3RlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJVdWRlbGxlZW5vaGphdHR1XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiVXVkZWxsZWVub2hqYXR0dSBhcnZvc3RlbHVcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTHVlIGxpc8Okw6RbTElOSy1FTkRdIGVyaSBhcnZvc3RlbHV0eXlwZWlzdMOkXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibW9udGhOYW1lc1wiOiB7XG4gICAgXCJqYW51YXJ5XCI6IFwidGFtbWlrdXV0YVwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJoZWxtaWt1dXRhXCIsXG4gICAgXCJtYXJjaFwiOiBcIm1hYWxpc2t1dXRhXCIsXG4gICAgXCJhcHJpbFwiOiBcImh1aHRpa3V1dGFcIixcbiAgICBcIm1heVwiOiBcInRvdWtva3V1dGFcIixcbiAgICBcImp1bmVcIjogXCJrZXPDpGt1dXRhXCIsXG4gICAgXCJqdWx5XCI6IFwiaGVpbsOka3V1dGFcIixcbiAgICBcImF1Z3VzdFwiOiBcImVsb2t1dXRhXCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJzeXlza3V1dGFcIixcbiAgICBcIm9jdG9iZXJcIjogXCJsb2tha3V1dGFcIixcbiAgICBcIm5vdmVtYmVyXCI6IFwibWFycmFza3V1dGFcIixcbiAgICBcImRlY2VtYmVyXCI6IFwiam91bHVrdXV0YVwiXG4gIH0sXG4gIFwidGltZUFnb1wiOiB7XG4gICAgXCJkYXlzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIHDDpGl2w6TDpCBzaXR0ZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBww6RpdsOkw6Qgc2l0dGVuXCJcbiAgICB9LFxuICAgIFwiaG91cnNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gdHVudGlhIHNpdHRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIHR1bnRpYSBzaXR0ZW5cIlxuICAgIH0sXG4gICAgXCJtaW51dGVzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIG1pbnV1dHRpYSBzaXR0ZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW51dXR0aWEgc2l0dGVuXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBzZWt1bnRpYSBzaXR0ZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBzZWt1bnRpYSBzaXR0ZW5cIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiTsOkeXRldMOkw6RuIFtzdGFyMV0gdMOkaGRlbiBhcnZvc3RlbHVtbWVcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiTsOkeXRldMOkw6RuIFtzdGFyMV0gJiBbc3RhcjJdIHTDpGhkZW4gYXJ2b3N0ZWx1bW1lXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIk7DpHl0ZXTDpMOkbiBbc3RhcjFdLCBbc3RhcjJdICYgW3N0YXIzXSB0w6RoZGVuIGFydm9zdGVsdW1tZVwiLFxuICAgIFwiYnlTdGFyczRcIjogXCJOw6R5dGV0w6TDpG4gW3N0YXIxXSwgW3N0YXIyXSwgW3N0YXIzXSAmIFtzdGFyNF0gdMOkaGRlbiBhcnZvc3RlbHVtbWVcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiTsOkeXRldMOkw6RuIHZpaW1laXNpbW3DpHQgYXJ2b3N0ZWx1bW1lXCIsXG4gICAgXCJieUZhdm9yaXRlT3JUYWdcIjogXCJOw6R5dGV0w6TDpG4gc3Vvc2lra2lhcnZvc3RlbHVtbWVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJhdmlzXCIsXG4gICAgXCJwbHVyYWxcIjogXCJhdmlzXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJDb2xsZWN0w6kgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIlbDqXJpZmnDqSwgY29sbGVjdMOpIHZpYSBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJWw6lyaWZpw6lcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJBdmlzIHbDqXJpZmnDqVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1FbiBzYXZvaXIgcGx1c1tMSU5LLUVORF0gc3VyIGxlcyB0eXBlcyBkJ2F2aXNcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTdXIgaW52aXRhdGlvblwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIkF2aXMgc3VyIGludml0YXRpb25cIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dRW4gc2F2b2lyIHBsdXNbTElOSy1FTkRdIHN1ciBsZXMgdHlwZXMgZCdhdmlzXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiUmVkaXJpZ8OpXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiQXZpcyByZWRpcmlnw6lcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dRW4gc2F2b2lyIHBsdXNbTElOSy1FTkRdIHN1ciBsZXMgdHlwZXMgZCdhdmlzXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibW9udGhOYW1lc1wiOiB7XG4gICAgXCJqYW51YXJ5XCI6IFwiamFudmllclwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJmw6l2cmllclwiLFxuICAgIFwibWFyY2hcIjogXCJtYXJzXCIsXG4gICAgXCJhcHJpbFwiOiBcImF2cmlsXCIsXG4gICAgXCJtYXlcIjogXCJtYWlcIixcbiAgICBcImp1bmVcIjogXCJqdWluXCIsXG4gICAgXCJqdWx5XCI6IFwianVpbGxldFwiLFxuICAgIFwiYXVndXN0XCI6IFwiYW/Du3RcIixcbiAgICBcInNlcHRlbWJlclwiOiBcInNlcHRlbWJyZVwiLFxuICAgIFwib2N0b2JlclwiOiBcIm9jdG9icmVcIixcbiAgICBcIm5vdmVtYmVyXCI6IFwibm92ZW1icmVcIixcbiAgICBcImRlY2VtYmVyXCI6IFwiZMOpY2VtYnJlXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcImxsIHkgYSBbY291bnRdIGpvdXJcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiSWwgeSBhIFtjb3VudF0gam91cnNcIlxuICAgIH0sXG4gICAgXCJob3Vyc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiSWwgeSBhIFtjb3VudF0gaGV1cmVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiSWwgeSBhIFtjb3VudF0gaGV1cmVzXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiSWwgeSBhIFtjb3VudF0gbWludXRlXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIklsIHkgYSBbY291bnRdIG1pbnV0ZXNcIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJJbCB5IGEgW2NvdW50XSBzZWNvbmRlXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIklsIHkgYSBbY291bnRdIHNlY29uZGVzXCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcIk5vcyBhdmlzIFtzdGFyMV0gw6l0b2lsZXNcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiTm9zIGF2aXMgW3N0YXIxXSBldCBbc3RhcjJdIMOpdG9pbGVzXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIk5vcyBhdmlzIFtzdGFyMV0sIFtzdGFyMl0gZXQgW3N0YXIzXSDDqXRvaWxlc1wiLFxuICAgIFwiYnlTdGFyczRcIjogXCJOb3MgYXZpcyBbc3RhcjFdLCBbc3RhcjJdLCBbc3RhcjNdIGV0IFtzdGFyNF0gw6l0b2lsZXNcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiTm9zIGRlcm5pZXJzIGF2aXNcIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcIk5vcyBhdmlzIHByw6lmw6lyw6lzXCJcbiAgfVxufSIsImltcG9ydCAqIGFzIGRrIGZyb20gJy4vZGEtREsvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGF0IGZyb20gJy4vZGUtQVQvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGNoIGZyb20gJy4vZGUtQ0gvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGRlIGZyb20gJy4vZGUtREUvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGF1IGZyb20gJy4vZW4tQVUvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGNhIGZyb20gJy4vZW4tQ0Evc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGdiIGZyb20gJy4vZW4tR0Ivc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGllIGZyb20gJy4vZW4tSUUvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIG56IGZyb20gJy4vZW4tTlovc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIHVzIGZyb20gJy4vZW4tVVMvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGVzIGZyb20gJy4vZXMtRVMvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGZpIGZyb20gJy4vZmktRkkvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGJlIGZyb20gJy4vZnItQkUvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGZyIGZyb20gJy4vZnItRlIvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGl0IGZyb20gJy4vaXQtSVQvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGpwIGZyb20gJy4vamEtSlAvc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIG5vIGZyb20gJy4vbmItTk8vc3RyaW5ncy5qc29uJztcbmltcG9ydCAqIGFzIGJlTmwgZnJvbSAnLi9ubC1CRS9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgbmwgZnJvbSAnLi9ubC1OTC9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC1QTC9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgYnIgZnJvbSAnLi9wdC1CUi9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgcHQgZnJvbSAnLi9wdC1QVC9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgcnUgZnJvbSAnLi9ydS1SVS9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgc2UgZnJvbSAnLi9zdi1TRS9zdHJpbmdzLmpzb24nO1xuaW1wb3J0ICogYXMgY24gZnJvbSAnLi96aC1DTi9zdHJpbmdzLmpzb24nO1xuXG5jb25zdCBsb2NhbGVzID0ge1xuICAnZGEtREsnOiBkayxcbiAgJ2RlLUFUJzogYXQsXG4gICdkZS1DSCc6IGNoLFxuICAnZGUtREUnOiBkZSxcbiAgJ2VuLUFVJzogYXUsXG4gICdlbi1DQSc6IGNhLFxuICAnZW4tR0InOiBnYixcbiAgJ2VuLUlFJzogaWUsXG4gICdlbi1OWic6IG56LFxuICAnZW4tVVMnOiB1cyxcbiAgJ2VzLUVTJzogZXMsXG4gICdmaS1GSSc6IGZpLFxuICAnZnItQkUnOiBiZSxcbiAgJ2ZyLUZSJzogZnIsXG4gICdpdC1JVCc6IGl0LFxuICAnamEtSlAnOiBqcCxcbiAgJ25iLU5PJzogbm8sXG4gICdubC1CRSc6IGJlTmwsXG4gICdubC1OTCc6IG5sLFxuICAncGwtUEwnOiBwbCxcbiAgJ3B0LUJSJzogYnIsXG4gICdwdC1QVCc6IHB0LFxuICAncnUtUlUnOiBydSxcbiAgJ3N2LVNFJzogc2UsXG4gICd6aC1DTic6IGNuLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9jYWxlcztcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJyZXZpZXdzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwicmVjZW5zaW9uZVwiLFxuICAgIFwicGx1cmFsXCI6IFwicmVjZW5zaW9uaVwiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiUmFjY29sdGEgdHJhbWl0ZSBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJWZXJpZmljYXRhLCByYWNjb2x0YSBkYSBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJWZXJpZmljYXRhXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiUmVjZW5zaW9uZSB2ZXJpZmljYXRhXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXVNjb3ByaSBkaSBwacO5W0xJTkstRU5EXSBzdWkgZGl2ZXJzaSB0aXBpIGRpIHJlY2Vuc2lvbmlcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTdSBpbnZpdG9cIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJSZWNlbnNpb25lIHN1IGludml0b1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1TY29wcmkgZGkgcGnDuVtMSU5LLUVORF0gc3VpIGRpdmVyc2kgdGlwaSBkaSByZWNlbnNpb25pXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiUmVpbmRpcml6emF0YVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlJlY2Vuc2lvbmUgcmVpbmRpcml6emF0YVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1TY29wcmkgZGkgcGnDuVtMSU5LLUVORF0gc3VpIGRpdmVyc2kgdGlwaSBkaSByZWNlbnNpb25pXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibW9udGhOYW1lc1wiOiB7XG4gICAgXCJqYW51YXJ5XCI6IFwiZ2VubmFpb1wiLFxuICAgIFwiZmVicnVhcnlcIjogXCJmZWJicmFpb1wiLFxuICAgIFwibWFyY2hcIjogXCJtYXJ6b1wiLFxuICAgIFwiYXByaWxcIjogXCJhcHJpbGVcIixcbiAgICBcIm1heVwiOiBcIm1hZ2dpb1wiLFxuICAgIFwianVuZVwiOiBcImdpdWdub1wiLFxuICAgIFwianVseVwiOiBcImx1Z2xpb1wiLFxuICAgIFwiYXVndXN0XCI6IFwiYWdvc3RvXCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJzZXR0ZW1icmVcIixcbiAgICBcIm9jdG9iZXJcIjogXCJvdHRvYnJlXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIm5vdmVtYnJlXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcImRpY2VtYnJlXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gZ2lvcm5vIGZhXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gZ2lvcm5pIGZhXCJcbiAgICB9LFxuICAgIFwiaG91cnNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gb3JhIGZhXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gb3JlIGZhXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBtaW51dG8gZmFcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW51dGkgZmFcIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIHNlY29uZG8gZmFcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBzZWNvbmRpIGZhXCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcIkxlIG5vc3RyZSByZWNlbnNpb25pIGEgW3N0YXIxXSBzdGVsbGVcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiTGUgbm9zdHJlIHJlY2Vuc2lvbmkgYSBbc3RhcjFdIGUgYSBbc3RhcjJdIHN0ZWxsZVwiLFxuICAgIFwiYnlTdGFyczNcIjogXCJMZSBub3N0cmUgcmVjZW5zaW9uaSBhIFtzdGFyMV0sIGEgW3N0YXIyXSBlIGEgW3N0YXIzXSBzdGVsbGVcIixcbiAgICBcImJ5U3RhcnM0XCI6IFwiTGUgbm9zdHJlIHJlY2Vuc2lvbmkgYSBbc3RhcjFdLCBhIFtzdGFyMl0sIGEgW3N0YXIzXSBlIGEgW3N0YXI0XSBzdGVsbGVcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiTGUgbm9zdHJlIHVsdGltZSByZWNlbnNpb25pXCIsXG4gICAgXCJieUZhdm9yaXRlT3JUYWdcIjogXCJMZSBub3N0cmUgcmVjZW5zaW9uaSBwcmVmZXJpdGVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCLjg6zjg5Pjg6Xjg7xcIixcbiAgICBcInBsdXJhbFwiOiBcIuODrOODk+ODpeODvFwiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiW3NvdXJjZV0g44Gr44KI44Gj44Gm5Y+O6ZuGXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIltzb3VyY2VdIOOBq+OCiOOBo+OBpueiuuiqjeODu+WPjumbhlwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCLnorroqo3muIjjgb9cIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCLnorroqo3muIjjgb/jga7jg6zjg5Pjg6Xjg7xcIixcbiAgICAgICAgXCJpbmZvXCI6IFwi44Os44OT44Ol44O844Gu56iu6aGe44Gr44Gk44GE44Gm44Gu6Kmz57Sw44GvW0xJTkstQkVHSU5d44GT44Gh44KJW0xJTkstRU5EXeOCkuOBlOimp+OBj+OBoOOBleOBhOOAglwiXG4gICAgICB9LFxuICAgICAgXCJpbnZpdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIuaJi+WLleaLm+W+hVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIuaLm+W+heOBq+OCiOOCi+ODrOODk+ODpeODvFwiLFxuICAgICAgICBcImluZm9cIjogXCLjg6zjg5Pjg6Xjg7zjga7nqK7poZ7jgavjgaTjgYTjgabjga7oqbPntLDjga9bTElOSy1CRUdJTl3jgZPjgaHjgolbTElOSy1FTkRd44KS44GU6Kan44GP44Gg44GV44GE44CCXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi6Ieq5YuV6Lui6YCBXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwi6Ieq5YuV6Lui6YCB44Gr44KI44KL44Os44OT44Ol44O8XCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIuODrOODk+ODpeODvOOBrueorumhnuOBq+OBpOOBhOOBpuOBruips+e0sOOBr1tMSU5LLUJFR0lOXeOBk+OBoeOCiVtMSU5LLUVORF3jgpLjgZTopqfjgY/jgaDjgZXjgYTjgIJcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCIx5pyIXCIsXG4gICAgXCJmZWJydWFyeVwiOiBcIjLmnIhcIixcbiAgICBcIm1hcmNoXCI6IFwiM+aciFwiLFxuICAgIFwiYXByaWxcIjogXCI05pyIXCIsXG4gICAgXCJtYXlcIjogXCI15pyIXCIsXG4gICAgXCJqdW5lXCI6IFwiNuaciFwiLFxuICAgIFwianVseVwiOiBcIjfmnIhcIixcbiAgICBcImF1Z3VzdFwiOiBcIjjmnIhcIixcbiAgICBcInNlcHRlbWJlclwiOiBcIjnmnIhcIixcbiAgICBcIm9jdG9iZXJcIjogXCIxMOaciFwiLFxuICAgIFwibm92ZW1iZXJcIjogXCIxMeaciFwiLFxuICAgIFwiZGVjZW1iZXJcIjogXCIxMuaciFwiXG4gIH0sXG4gIFwidGltZUFnb1wiOiB7XG4gICAgXCJkYXlzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRd5pel5YmNXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF3ml6XliY1cIlxuICAgIH0sXG4gICAgXCJob3Vyc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XeaZgumWk+WJjVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRd5pmC6ZaT5YmNXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XeWIhuWJjVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRd5YiG5YmNXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XeenkuWJjVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRd56eS5YmNXCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcIltzdGFyMV3jgaTmmJ/jga7jg6zjg5Pjg6Xjg7zjgpLooajnpLpcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiW3N0YXIxXeOBpOaYn+OBqFtzdGFyMl3jgaTmmJ/jga7jg6zjg5Pjg6Xjg7zjgpLooajnpLpcIixcbiAgICBcImJ5U3RhcnMzXCI6IFwiW3N0YXIxXeOBpOaYn+OAgVtzdGFyMl3jgaTmmJ/jgIFbc3RhcjNd44Gk5pif44Gu44Os44OT44Ol44O844KS6KGo56S6XCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIltzdGFyMV3jgaTmmJ/jgIFbc3RhcjJd44Gk5pif44CBW3N0YXIzXeOBpOaYn+OAgVtzdGFyNF3jgaTmmJ/jga7jg6zjg5Pjg6Xjg7zjgpLooajnpLpcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwi5pyA5paw44Gu44Os44OT44Ol44O844KS6KGo56S6XCIsXG4gICAgXCJieUZhdm9yaXRlT3JUYWdcIjogXCLjgYrmsJfjgavlhaXjgorjga7jg6zjg5Pjg6Xjg7zjgpLooajnpLpcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJhbm1lbGRlbHNlXCIsXG4gICAgXCJwbHVyYWxcIjogXCJhbm1lbGRlbHNlclwiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiU2FtbGV0IGlubiBnamVubm9tIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIkJla3JlZnRldCDigJMgc2FtbGV0IGlubiB2aWEgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiQmVrcmVmdGV0XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiQmVrcmVmdGV0IGt1bmRlXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpnIgbWVyW0xJTkstRU5EXSBvbSBkZSB1bGlrZSB0eXBlbmUgYW5tZWxkZWxzZXJcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJQw6Ugb3BwZm9yZHJpbmdcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJBbm1lbGRlbHNlIHNrcmV2ZXQgcMOlIG9wcGZvcmRyaW5nXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpnIgbWVyW0xJTkstRU5EXSBvbSBkZSB1bGlrZSB0eXBlbmUgYW5tZWxkZWxzZXJcIlxuICAgICAgfSxcbiAgICAgIFwicmVkaXJlY3RlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJPbWRpcmlnZXJ0XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiT21kaXJpZ2VydCBhbm1lbGRlbHNlXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpnIgbWVyW0xJTkstRU5EXSBvbSBkZSB1bGlrZSB0eXBlbmUgYW5tZWxkZWxzZXJcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJqYW51YXJcIixcbiAgICBcImZlYnJ1YXJ5XCI6IFwiZmVicnVhclwiLFxuICAgIFwibWFyY2hcIjogXCJtYXJzXCIsXG4gICAgXCJhcHJpbFwiOiBcImFwcmlsXCIsXG4gICAgXCJtYXlcIjogXCJtYWlcIixcbiAgICBcImp1bmVcIjogXCJqdW5pXCIsXG4gICAgXCJqdWx5XCI6IFwianVsaVwiLFxuICAgIFwiYXVndXN0XCI6IFwiYXVndXN0XCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJzZXB0ZW1iZXJcIixcbiAgICBcIm9jdG9iZXJcIjogXCJva3RvYmVyXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIm5vdmVtYmVyXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcImRlc2VtYmVyXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIkZvciBbY291bnRdIGRhZyBzaWRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJGb3IgW2NvdW50XSBkYWdlciBzaWRlblwiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJGb3IgW2NvdW50XSB0aW1lIHNpZGVuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIkZvciBbY291bnRdIHRpbWVyIHNpZGVuXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiRm9yIFtjb3VudF0gbWludXR0IHNpZGVuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIkZvciBbY291bnRdIG1pbnV0dGVyIHNpZGVuXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiRm9yIFtjb3VudF0gc2VrdW5kIHNpZGVuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIkZvciBbY291bnRdIHNla3VuZGVyIHNpZGVuXCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcIlZpc2VyIFtzdGFyMV0tc3RqZXJuZXJzYW5tZWxkZWxzZW5lXCIsXG4gICAgXCJieVN0YXJzMlwiOiBcIlZpc2VyIFtzdGFyMV0tIG9nIFtzdGFyMl0tc3RqZXJuZXJzYW5tZWxkZWxzZW5lXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIlZpc2VyIFtzdGFyMV0tLCBbc3RhcjJdLSBvZyBbc3RhcjNdLXN0amVybmVyc2FubWVsZGVsc2VuZVwiLFxuICAgIFwiYnlTdGFyczRcIjogXCJWaXNlciBbc3RhcjFdLSwgW3N0YXIyXS0sIFtzdGFyM10tIG9nIFtzdGFyNF0tc3RqZXJuZXJzYW5tZWxkZWxzZW5lXCIsXG4gICAgXCJieUxhdGVzdFwiOiBcIlZpc2VyIGRlIG55ZXN0ZSBhbm1lbGRlbHNlbmVcIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcIlZpc2VyIGZhdm9yaXR0ZW5lIHbDpXJlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJyZXZpZXdzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwicmV2aWV3XCIsXG4gICAgXCJwbHVyYWxcIjogXCJyZXZpZXdzXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJWZXJ6YW1lbGQgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIkdldmVyaWZpZWVyZCDigJQgdmVyemFtZWxkIHZpYSBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJHZXZlcmlmaWVlcmRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJHZXZlcmlmaWVlcmRlIHJldmlld1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1NZWVyIGluZm9ybWF0aWVbTElOSy1FTkRdIG92ZXIgZGUgc29vcnRlbiByZXZpZXdzXCJcbiAgICAgIH0sXG4gICAgICBcImludml0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiT3AgdWl0bm9kaWdpbmdcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJSZXZpZXcgb3AgdWl0bm9kaWdpbmdcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTWVlciBpbmZvcm1hdGllW0xJTkstRU5EXSBvdmVyIGRlIHNvb3J0ZW4gcmV2aWV3c1wiXG4gICAgICB9LFxuICAgICAgXCJyZWRpcmVjdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIk9tZ2VsZWlkXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiT21nZWxlaWRlIHJldmlld1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1NZWVyIGluZm9ybWF0aWVbTElOSy1FTkRdIG92ZXIgZGUgc29vcnRlbiByZXZpZXdzXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibW9udGhOYW1lc1wiOiB7XG4gICAgXCJqYW51YXJ5XCI6IFwiamFudWFyaVwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJmZWJydWFyaVwiLFxuICAgIFwibWFyY2hcIjogXCJtYWFydFwiLFxuICAgIFwiYXByaWxcIjogXCJhcHJpbFwiLFxuICAgIFwibWF5XCI6IFwibWVpXCIsXG4gICAgXCJqdW5lXCI6IFwianVuaVwiLFxuICAgIFwianVseVwiOiBcImp1bGlcIixcbiAgICBcImF1Z3VzdFwiOiBcImF1Z3VzdHVzXCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJzZXB0ZW1iZXJcIixcbiAgICBcIm9jdG9iZXJcIjogXCJva3RvYmVyXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIm5vdmVtYmVyXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcIkRlY2VtYmVyXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gZGFnIGdlbGVkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBkYWdlbiBnZWxlZGVuXCJcbiAgICB9LFxuICAgIFwiaG91cnNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gdXVyIGdlbGVkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSB1dXIgZ2VsZWRlblwiXG4gICAgfSxcbiAgICBcIm1pbnV0ZXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gbWludXV0IGdlbGVkZW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW51dGVuIGdlbGVkZW5cIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIHNlY29uZGUgZ2VsZWRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIHNlY29uZGVuIGdlbGVkZW5cIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiT256ZSByZXZpZXdzIG1ldCBbc3RhcjFdIHN0ZXJyZW5cIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiT256ZSByZXZpZXdzIG1ldCBbc3RhcjFdIGVuIFtzdGFyMl0gc3RlcnJlblwiLFxuICAgIFwiYnlTdGFyczNcIjogXCJPbnplIHJldmlld3MgbWV0IFtzdGFyMV0sIFtzdGFyMl0gZW4gW3N0YXIzXSBzdGVycmVuXCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIk9uemUgcmV2aWV3cyBtZXQgW3N0YXIxXSwgW3N0YXIyXSwgW3N0YXIzXSBlbiBbc3RhcjRdIHN0ZXJyZW5cIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiT256ZSBtZWVzdCByZWNlbnRlIHJldmlld3NcIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcIk9uemUgZmF2b3JpZXRlIHJldmlld3NcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJyZXZpZXdcIixcbiAgICBcInBsdXJhbFwiOiBcInJldmlld3NcIixcbiAgICBcImNvbGxlY3RlZFZpYVwiOiBcIlZlcnphbWVsZCB2aWEgW3NvdXJjZV1cIixcbiAgICBcInZlcmlmaWVkVmlhXCI6IFwiR2V2ZXJpZmllZXJkIOKAlCB2ZXJ6YW1lbGQgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJzZXJ2aWNlUmV2aWV3VHlwZUxhYmVsc1wiOiB7XG4gICAgICBcInZlcmlmaWVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkdldmVyaWZpZWVyZFwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIkdldmVyaWZpZWVyZGUgcmV2aWV3XCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXU1lZXIgaW5mb3JtYXRpZVtMSU5LLUVORF0gb3ZlciBkZSBzb29ydGVuIHJldmlld3NcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJPcCB1aXRub2RpZ2luZ1wiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlJldmlldyBvcCB1aXRub2RpZ2luZ1wiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1NZWVyIGluZm9ybWF0aWVbTElOSy1FTkRdIG92ZXIgZGUgc29vcnRlbiByZXZpZXdzXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiT21nZWxlaWRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJPbWdlbGVpZGUgcmV2aWV3XCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXU1lZXIgaW5mb3JtYXRpZVtMSU5LLUVORF0gb3ZlciBkZSBzb29ydGVuIHJldmlld3NcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJqYW51YXJpXCIsXG4gICAgXCJmZWJydWFyeVwiOiBcImZlYnJ1YXJpXCIsXG4gICAgXCJtYXJjaFwiOiBcIm1hYXJ0XCIsXG4gICAgXCJhcHJpbFwiOiBcImFwcmlsXCIsXG4gICAgXCJtYXlcIjogXCJtZWlcIixcbiAgICBcImp1bmVcIjogXCJqdW5pXCIsXG4gICAgXCJqdWx5XCI6IFwianVsaVwiLFxuICAgIFwiYXVndXN0XCI6IFwiYXVndXN0dXNcIixcbiAgICBcInNlcHRlbWJlclwiOiBcInNlcHRlbWJlclwiLFxuICAgIFwib2N0b2JlclwiOiBcIm9rdG9iZXJcIixcbiAgICBcIm5vdmVtYmVyXCI6IFwibm92ZW1iZXJcIixcbiAgICBcImRlY2VtYmVyXCI6IFwiZGVjZW1iZXJcIlxuICB9LFxuICBcInRpbWVBZ29cIjoge1xuICAgIFwiZGF5c1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBkYWcgZ2VsZWRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIGRhZ2VuIGdlbGVkZW5cIlxuICAgIH0sXG4gICAgXCJob3Vyc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSB1dXIgZ2VsZWRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIHV1ciBnZWxlZGVuXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBtaW51dXQgZ2VsZWRlblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIG1pbnV0ZW4gZ2VsZWRlblwiXG4gICAgfSxcbiAgICBcInNlY29uZHNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gc2Vjb25kZSBnZWxlZGVuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gc2Vjb25kZW4gZ2VsZWRlblwiXG4gICAgfVxuICB9LFxuICBcInJldmlld0ZpbHRlcnNcIjoge1xuICAgIFwiYnlTdGFyczFcIjogXCJPbnplIHJldmlld3MgbWV0IFtzdGFyMV0gc3RlcnJlblwiLFxuICAgIFwiYnlTdGFyczJcIjogXCJPbnplIHJldmlld3MgbWV0IFtzdGFyMV0gZW4gW3N0YXIyXSBzdGVycmVuXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIk9uemUgcmV2aWV3cyBtZXQgW3N0YXIxXSwgW3N0YXIyXSBlbiBbc3RhcjNdIHN0ZXJyZW5cIixcbiAgICBcImJ5U3RhcnM0XCI6IFwiT256ZSByZXZpZXdzIG1ldCBbc3RhcjFdLCBbc3RhcjJdLCBbc3RhcjNdIGVuIFtzdGFyNF0gc3RlcnJlblwiLFxuICAgIFwiYnlMYXRlc3RcIjogXCJPbnplIG1lZXN0IHJlY2VudGUgcmV2aWV3c1wiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiT256ZSBmYXZvcmlldGUgcmV2aWV3c1wiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicmV2aWV3c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcInJlY2VuemphXCIsXG4gICAgXCJwbHVyYWxcIjogXCJyZWNlbnpqaVwiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwiWmVicmFuZSBwcnpleiBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCJad2VyeWZpa293YW5vIGkgemVicmFubyBwcnpleiBbc291cmNlXVwiLFxuICAgIFwic2VydmljZVJldmlld1R5cGVMYWJlbHNcIjoge1xuICAgICAgXCJ2ZXJpZmllZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJad2VyeWZpa293YW5hXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiWndlcnlmaWtvd2FuYSByZWNlbnpqYVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1Eb3dpZWR6IHNpxJkgd2nEmWNlaltMSU5LLUVORF0gbyB0eXBhY2ggcmVjZW56amlcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJOYSB6YXByb3N6ZW5pZVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlJlemVuemphIG5hIHphcHJvc3plbmllXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXURvd2llZHogc2nEmSB3acSZY2VqW0xJTkstRU5EXSBvIHR5cGFjaCByZWNlbnpqaVwiXG4gICAgICB9LFxuICAgICAgXCJyZWRpcmVjdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlogcHJ6ZWtpZXJvd2FuYVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIlJlY2VuemphIHogcHJ6ZWtpZXJvd2FuYVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1Eb3dpZWR6IHNpxJkgd2nEmWNlaltMSU5LLUVORF0gbyB0eXBhY2ggcmVjZW56amlcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJzdHljem5pYVwiLFxuICAgIFwiZmVicnVhcnlcIjogXCJsdXRlZ29cIixcbiAgICBcIm1hcmNoXCI6IFwibWFyY2FcIixcbiAgICBcImFwcmlsXCI6IFwia3dpZXRuaWFcIixcbiAgICBcIm1heVwiOiBcIm1hamFcIixcbiAgICBcImp1bmVcIjogXCJjemVyd2NhXCIsXG4gICAgXCJqdWx5XCI6IFwibGlwY2FcIixcbiAgICBcImF1Z3VzdFwiOiBcInNpZXJwbmlhXCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJ3cnplxZtuaWFcIixcbiAgICBcIm9jdG9iZXJcIjogXCJwYcW6ZHppZXJuaWthXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcImxpc3RvcGFkYVwiLFxuICAgIFwiZGVjZW1iZXJcIjogXCJncnVkbmlhXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gZHppZcWEIHRlbXVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBkbmkgdGVtdVwiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIGdvZHppbsSZIHRlbXVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBnb2R6LiB0ZW11XCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBtaW51dMSZIHRlbXVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW4uIHRlbXVcIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIHNla3VuZMSZIHRlbXVcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBzZWsuIHRlbXVcIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiV3nFm3dpZXRsYW15IG5hc3plIFtzdGFyMV0tZ3dpYXpka293ZSByZWNlbnpqZVwiLFxuICAgIFwiYnlTdGFyczJcIjogXCJXecWbd2lldGxhbXkgbmFzemUgW3N0YXIxXS0gaSBbc3RhcjJdLWd3aWF6ZGtvd2UgcmVjZW56amVcIixcbiAgICBcImJ5U3RhcnMzXCI6IFwiV3nFm3dpZXRsYW15IG5hc3plIFtzdGFyMV0tLCBbc3RhcjJdLSBpIFtzdGFyM10tZ3dpYXpka293ZSByZWNlbnpqZVwiLFxuICAgIFwiYnlTdGFyczRcIjogXCJXecWbd2lldGxhbXkgbmFzemUgW3N0YXIxXS0sIFtzdGFyMl0tLCBbc3RhcjNdLSBpIFtzdGFyNF0tZ3dpYXpka293ZSByZWNlbnpqZVwiLFxuICAgIFwiYnlMYXRlc3RcIjogXCJXecWbd2lldGxhbXkgbmFqbm93c3plIHJlY2VuemplXCIsXG4gICAgXCJieUZhdm9yaXRlT3JUYWdcIjogXCJXecWbd2lldGxhbXkgbmFzemUgdWx1YmlvbmUgcmVjZW56amVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJhdmFsaWHDp8Ojb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiYXZhbGlhw6fDtWVzXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJSZWNvbGhpZGEgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIlZlcmlmaWNhZGEsIHJlY29saGlkYSB2aWEgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiVmVyaWZpY2FkYVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIkF2YWxpYcOnw6NvIHZlcmlmaWNhZGFcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dU2FpYmEgbWFpc1tMSU5LLUVORF0gc29icmUgb3MgZGlmZXJlbnRlcyB0aXBvcyBkZSBhdmFsaWHDp8Ojb1wiXG4gICAgICB9LFxuICAgICAgXCJpbnZpdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlBvciBjb252aXRlXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiQXZhbGlhw6fDo28gcG9yIGNvbnZpdGVcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dU2FpYmEgbWFpc1tMSU5LLUVORF0gc29icmUgb3MgZGlmZXJlbnRlcyB0aXBvcyBkZSBhdmFsaWHDp8Ojb1wiXG4gICAgICB9LFxuICAgICAgXCJyZWRpcmVjdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlJlZGlyZWNpb25hZGFcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJBdmFsaWHDp8OjbyByZWRpcmVjaW9uYWRhXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXVNhaWJhIG1haXNbTElOSy1FTkRdIHNvYnJlIG9zIGRpZmVyZW50ZXMgdGlwb3MgZGUgYXZhbGlhw6fDo29cIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJKYW5laXJvXCIsXG4gICAgXCJmZWJydWFyeVwiOiBcIkZldmVyZWlyb1wiLFxuICAgIFwibWFyY2hcIjogXCJNYXLDp29cIixcbiAgICBcImFwcmlsXCI6IFwiQWJyaWxcIixcbiAgICBcIm1heVwiOiBcIk1haW9cIixcbiAgICBcImp1bmVcIjogXCJKdW5ob1wiLFxuICAgIFwianVseVwiOiBcIkp1bGhvXCIsXG4gICAgXCJhdWd1c3RcIjogXCJBZ29zdG9cIixcbiAgICBcInNlcHRlbWJlclwiOiBcIlNldGVtYnJvXCIsXG4gICAgXCJvY3RvYmVyXCI6IFwiT3V0dWJyb1wiLFxuICAgIFwibm92ZW1iZXJcIjogXCJOb3ZlbWJyb1wiLFxuICAgIFwiZGVjZW1iZXJcIjogXCJEZXplbWJyb1wiXG4gIH0sXG4gIFwidGltZUFnb1wiOiB7XG4gICAgXCJkYXlzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJow6EgW2NvdW50XSBkaWFcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiaMOhIFtjb3VudF0gZGlhc1wiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJow6EgW2NvdW50XSBob3JhXCIsXG4gICAgICBcInBsdXJhbFwiOiBcImjDoSBbY291bnRdIGhvcmFzXCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiaMOhIFtjb3VudF0gbWludXRvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcImjDoSBbY291bnRdIG1pbnV0b3NcIlxuICAgIH0sXG4gICAgXCJzZWNvbmRzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJow6EgW2NvdW50XSBzZWd1bmRvXCIsXG4gICAgICBcInBsdXJhbFwiOiBcImjDoSBbY291bnRdIHNlZ3VuZG9zXCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcIk5vc3NhcyBhdmFsaWHDp8O1ZXMgY29tIFtzdGFyMV0gZXN0cmVsYShzKVwiLFxuICAgIFwiYnlTdGFyczJcIjogXCJOb3NzYXMgYXZhbGlhw6fDtWVzIGNvbSBbc3RhcjFdICYgW3N0YXIyXSBlc3RyZWxhc1wiLFxuICAgIFwiYnlTdGFyczNcIjogXCJOb3NzYXMgYXZhbGlhw6fDtWVzIGNvbSBbc3RhcjFdLCBbc3RhcjJdICYgW3N0YXIzXSBlc3RyZWxhc1wiLFxuICAgIFwiYnlTdGFyczRcIjogXCJOb3NzYXMgYXZhbGlhw6fDtWVzIGNvbSBbc3RhcjFdLCBbc3RhcjJdLCBbc3RhcjNdICYgW3N0YXI0XSBlc3RyZWxhc1wiLFxuICAgIFwiYnlMYXRlc3RcIjogXCJNb3N0cmFuZG8gbm9zc2FzIGF2YWxpYcOnw7VlcyBtYWlzIHJlY2VudGVzXCIsXG4gICAgXCJieUZhdm9yaXRlT3JUYWdcIjogXCJNb3N0cmFuZG8gbm9zc2FzIGF2YWxpYcOnw7VlcyBmYXZvcml0YXNcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCJvcGluacOjb1wiLFxuICAgIFwicGx1cmFsXCI6IFwib3BpbmnDtWVzXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJSZWNvbGhpZGEgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJ2ZXJpZmllZFZpYVwiOiBcIlZlcmlmaWNhZGEsIHJlY29saGlkYSB2aWEgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiVmVyaWZpY2FkYVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIk9waW5pw6NvIHZlcmlmaWNhZGFcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dU2FpYmEgbWFpc1tMSU5LLUVORF0gc29icmUgb3MgZGlmZXJlbnRlcyB0aXBvcyBkZSBvcGluacO1ZXNcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCJQb3IgY29udml0ZVwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcIk9waW5pw6NvIHBvciBjb252aXRlXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXVNhaWJhIG1haXNbTElOSy1FTkRdIHNvYnJlIG9zIGRpZmVyZW50ZXMgdGlwb3MgZGUgb3BpbmnDtWVzXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiUmVkaXJlY2Npb25hZGFcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJPcGluacOjbyByZWRpcmVjY2lvbmFkYVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1TYWliYSBtYWlzW0xJTkstRU5EXSBzb2JyZSBvcyBkaWZlcmVudGVzIHRpcG9zIGRlIG9waW5pw7Vlc1wiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm1vbnRoTmFtZXNcIjoge1xuICAgIFwiamFudWFyeVwiOiBcIkphbmVpcm9cIixcbiAgICBcImZlYnJ1YXJ5XCI6IFwiRmV2ZXJlaXJvXCIsXG4gICAgXCJtYXJjaFwiOiBcIk1hcsOnb1wiLFxuICAgIFwiYXByaWxcIjogXCJBYnJpbFwiLFxuICAgIFwibWF5XCI6IFwiTWFpb1wiLFxuICAgIFwianVuZVwiOiBcIkp1bmhvXCIsXG4gICAgXCJqdWx5XCI6IFwiSnVsaG9cIixcbiAgICBcImF1Z3VzdFwiOiBcIkFnb3N0b1wiLFxuICAgIFwic2VwdGVtYmVyXCI6IFwiU2V0ZW1icm9cIixcbiAgICBcIm9jdG9iZXJcIjogXCJPdXR1YnJvXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIk5vdmVtYnJvXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcIkRlemVtYnJvXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcImjDoSBbY291bnRdIGRpYVwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJow6EgW2NvdW50XSBkaWFzXCJcbiAgICB9LFxuICAgIFwiaG91cnNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcImjDoSBbY291bnRdIGhvcmFcIixcbiAgICAgIFwicGx1cmFsXCI6IFwiaMOhIFtjb3VudF0gaG9yYXNcIlxuICAgIH0sXG4gICAgXCJtaW51dGVzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJow6EgW2NvdW50XSBtaW51dG9cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiaMOhIFtjb3VudF0gbWludXRvc1wiXG4gICAgfSxcbiAgICBcInNlY29uZHNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcImjDoSBbY291bnRdIHNlZ3VuZG9cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiaMOhIFtjb3VudF0gc2VndW5kb3NcIlxuICAgIH1cbiAgfSxcbiAgXCJyZXZpZXdGaWx0ZXJzXCI6IHtcbiAgICBcImJ5U3RhcnMxXCI6IFwiQXMgbm9zc2FzIG9waW5pw7VlcyBjb20gW3N0YXIxXSBlc3RyZWxhKHMpXCIsXG4gICAgXCJieVN0YXJzMlwiOiBcIkFzIG5vc3NhcyBvcGluacO1ZXMgY29tIFtzdGFyMV0gZSBbc3RhcjJdIGVzdHJlbGFzXCIsXG4gICAgXCJieVN0YXJzM1wiOiBcIkFzIG5vc3NhcyBvcGluacO1ZXMgY29tIFtzdGFyMV0sIFtzdGFyMl0gZSBbc3RhcjNdIGVzdHJlbGFzXCIsXG4gICAgXCJieVN0YXJzNFwiOiBcIkFzIG5vc3NhcyBvcGluacO1ZXMgY29tIFtzdGFyMV0sIFtzdGFyMl0sIFtzdGFyM10gZSBbc3RhcjRdIGVzdHJlbGFzXCIsXG4gICAgXCJieUxhdGVzdFwiOiBcIkFzIG5vc3NhcyBvcGluacO1ZXMgbWFpcyByZWNlbnRlc1wiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiQXMgbm9zc2FzIG9waW5pw7VlcyBmYXZvcml0YXNcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJldmlld3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCLQvtGC0LfRi9CyXCIsXG4gICAgXCJwbHVyYWxcIjogXCLQvtGC0LfRi9Cy0L7QslwiLFxuICAgIFwiY29sbGVjdGVkVmlhXCI6IFwi0KHQvtCx0YDQsNC90L4g0YfQtdGA0LXQtyBbc291cmNlXVwiLFxuICAgIFwidmVyaWZpZWRWaWFcIjogXCLQn9C+0LTRgtCy0LXRgNC20LTQtdC90L4sINGB0L7QsdGA0LDQvdC+INGH0LXRgNC10LcgW3NvdXJjZV1cIixcbiAgICBcInNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzXCI6IHtcbiAgICAgIFwidmVyaWZpZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi0J/QvtC00YLQstC10YDQttC00LXQvdC+XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwi0J/QvtC00YLQstC10YDQttC00LXQvdC90YvQuSDQvtGC0LfRi9CyXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXdCj0LfQvdCw0YLRjCDQsdC+0LvRjNGI0LVbTElOSy1FTkRdINC+INGC0LjQv9Cw0YUg0L7RgtC30YvQstC+0LJcIlxuICAgICAgfSxcbiAgICAgIFwiaW52aXRlZFJldmlld1wiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCLQn9C+INC/0YDQuNCz0LvQsNGI0LXQvdC40Y5cIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCLQntGC0LfRi9CyINC/0L4g0L/RgNC40LPQu9Cw0YjQtdC90LjRjlwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl3Qo9C30L3QsNGC0Ywg0LHQvtC70YzRiNC1W0xJTkstRU5EXSDQviDRgtC40L/QsNGFINC+0YLQt9GL0LLQvtCyXCJcbiAgICAgIH0sXG4gICAgICBcInJlZGlyZWN0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi0J/QtdGA0LXQvdCw0L/RgNCw0LLQu9C10L3QvlwiLFxuICAgICAgICBcImluZm9UaXRsZVwiOiBcItCf0LXRgNC10L3QsNC/0YDQsNCy0LvQtdC90L3Ri9C5INC+0YLQt9GL0LJcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5d0KPQt9C90LDRgtGMINCx0L7Qu9GM0YjQtVtMSU5LLUVORF0g0L4g0YLQuNC/0LDRhSDQvtGC0LfRi9Cy0L7QslwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm1vbnRoTmFtZXNcIjoge1xuICAgIFwiamFudWFyeVwiOiBcItGP0L3QstCw0YDRj1wiLFxuICAgIFwiZmVicnVhcnlcIjogXCLRhNC10LLRgNCw0LvRj1wiLFxuICAgIFwibWFyY2hcIjogXCLQvNCw0YDRgtCwXCIsXG4gICAgXCJhcHJpbFwiOiBcItCw0L/RgNC10LvRj1wiLFxuICAgIFwibWF5XCI6IFwi0LzQsNGPXCIsXG4gICAgXCJqdW5lXCI6IFwi0LjRjtC90Y9cIixcbiAgICBcImp1bHlcIjogXCLQmNGO0LvRjFwiLFxuICAgIFwiYXVndXN0XCI6IFwi0LDQstCz0YPRgdGC0LBcIixcbiAgICBcInNlcHRlbWJlclwiOiBcItGB0LXQvdGC0Y/QsdGA0Y9cIixcbiAgICBcIm9jdG9iZXJcIjogXCLQntC60YLRj9Cx0YDRjFwiLFxuICAgIFwibm92ZW1iZXJcIjogXCLQvdC+0Y/QsdGA0Y9cIixcbiAgICBcImRlY2VtYmVyXCI6IFwi0JTQtdC60LDQsdGA0YxcIlxuICB9LFxuICBcInRpbWVBZ29cIjoge1xuICAgIFwiZGF5c1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSDQtNC10L3RjCDQvdCw0LfQsNC0XCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0g0LTQvdC10Lkg0L3QsNC30LDQtFwiXG4gICAgfSxcbiAgICBcImhvdXJzXCI6IHtcbiAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdINGH0LDRgSDQvdCw0LfQsNC0XCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0g0YfQsNGB0L7QsiDQvdCw0LfQsNC0XCJcbiAgICB9LFxuICAgIFwibWludXRlc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSDQvNC40L3Rg9GC0YMg0L3QsNC30LDQtFwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdINC80LjQvdGD0YIg0L3QsNC30LDQtFwiXG4gICAgfSxcbiAgICBcInNlY29uZHNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0g0YHQtdC60YPQvdC00YMg0L3QsNC30LDQtFwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdINGB0LXQutGD0L3QtCDQvdCw0LfQsNC0XCJcbiAgICB9XG4gIH0sXG4gIFwicmV2aWV3RmlsdGVyc1wiOiB7XG4gICAgXCJieVN0YXJzMVwiOiBcItCd0LDRiNC4INC+0YLQt9GL0LLRiyBbc3RhcjFdINC30LLQtdC30LRcIixcbiAgICBcImJ5U3RhcnMyXCI6IFwi0J3QsNGI0Lgg0L7RgtC30YvQstGLIFtzdGFyMV0g0LggW3N0YXIyXSDQt9Cy0LXQt9C0XCIsXG4gICAgXCJieVN0YXJzM1wiOiBcItCd0LDRiNC4INC+0YLQt9GL0LLRiyBbc3RhcjFdLCBbc3RhcjJdINC4IFtzdGFyM10g0LfQstC10LfQtFwiLFxuICAgIFwiYnlTdGFyczRcIjogXCLQndCw0YjQuCDQvtGC0LfRi9Cy0YsgW3N0YXIxXSwgW3N0YXIyXSwgW3N0YXIzXSDQuCBbc3RhcjRdINC30LLQtdC30LRcIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwi0J3QsNGI0Lgg0L3QtdC00LDQstC90LjQtSDQvtGC0LfRi9Cy0YtcIixcbiAgICBcImJ5RmF2b3JpdGVPclRhZ1wiOiBcItCd0LDRiNC4INC70Y7QsdC40LzRi9C1INC+0YLQt9GL0LLRi1wiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicmV2aWV3c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIm9tZMO2bWVcIixcbiAgICBcInBsdXJhbFwiOiBcIm9tZMO2bWVuXCIsXG4gICAgXCJjb2xsZWN0ZWRWaWFcIjogXCJJbnNhbWxhdCB2aWEgW3NvdXJjZV1cIixcbiAgICBcInZlcmlmaWVkVmlhXCI6IFwiVmVyaWZpZXJhdCDigJMgaW5zYW1sYXQgdmlhIFtzb3VyY2VdXCIsXG4gICAgXCJzZXJ2aWNlUmV2aWV3VHlwZUxhYmVsc1wiOiB7XG4gICAgICBcInZlcmlmaWVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIlZlcmlmaWVyYXRcIixcbiAgICAgICAgXCJpbmZvVGl0bGVcIjogXCJWZXJpZmllcmF0IG9tZMO2bWVcIixcbiAgICAgICAgXCJpbmZvXCI6IFwiW0xJTkstQkVHSU5dTMOkcyBtZXJbTElOSy1FTkRdIG9tIG9saWthIHR5cGVyIGF2IG9tZMO2bWVuXCJcbiAgICAgIH0sXG4gICAgICBcImludml0ZWRSZXZpZXdcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwiTWVkIGluYmp1ZGFuXCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiT21kw7ZtZSBza3JpdmV0IGVmdGVyIGluYmp1ZGFuXCIsXG4gICAgICAgIFwiaW5mb1wiOiBcIltMSU5LLUJFR0lOXUzDpHMgbWVyW0xJTkstRU5EXSBvbSBvbGlrYSB0eXBlciBhdiBvbWTDtm1lblwiXG4gICAgICB9LFxuICAgICAgXCJyZWRpcmVjdGVkUmV2aWV3XCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIk9tZGlyaWdlcmF0XCIsXG4gICAgICAgIFwiaW5mb1RpdGxlXCI6IFwiT21kaXJpZ2VyYXQgb21kw7ZtZVwiLFxuICAgICAgICBcImluZm9cIjogXCJbTElOSy1CRUdJTl1Mw6RzIG1lcltMSU5LLUVORF0gb20gb2xpa2EgdHlwZXIgYXYgb21kw7ZtZW5cIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJtb250aE5hbWVzXCI6IHtcbiAgICBcImphbnVhcnlcIjogXCJqYW51YXJpXCIsXG4gICAgXCJmZWJydWFyeVwiOiBcImZlYnJ1YXJpXCIsXG4gICAgXCJtYXJjaFwiOiBcIm1hcnNcIixcbiAgICBcImFwcmlsXCI6IFwiYXByaWxcIixcbiAgICBcIm1heVwiOiBcIm1halwiLFxuICAgIFwianVuZVwiOiBcImp1bmlcIixcbiAgICBcImp1bHlcIjogXCJqdWxpXCIsXG4gICAgXCJhdWd1c3RcIjogXCJhdWd1c3RpXCIsXG4gICAgXCJzZXB0ZW1iZXJcIjogXCJzZXB0ZW1iZXJcIixcbiAgICBcIm9jdG9iZXJcIjogXCJva3RvYmVyXCIsXG4gICAgXCJub3ZlbWJlclwiOiBcIm5vdmVtYmVyXCIsXG4gICAgXCJkZWNlbWJlclwiOiBcImRlY2VtYmVyXCJcbiAgfSxcbiAgXCJ0aW1lQWdvXCI6IHtcbiAgICBcImRheXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gZGFnIHNlZGFuXCIsXG4gICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gZGFnYXIgc2VkYW5cIlxuICAgIH0sXG4gICAgXCJob3Vyc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSB0aW1tZSBzZWRhblwiLFxuICAgICAgXCJwbHVyYWxcIjogXCJbY291bnRdIHRpbW1hciBzZWRhblwiXG4gICAgfSxcbiAgICBcIm1pbnV0ZXNcIjoge1xuICAgICAgXCJzaW5ndWxhclwiOiBcIltjb3VudF0gbWludXQgc2VkYW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW51dGVyIHNlZGFuXCJcbiAgICB9LFxuICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBzZWt1bmQgc2VkYW5cIixcbiAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBzZWt1bmRlciBzZWRhblwiXG4gICAgfVxuICB9LFxuICBcInJldmlld0ZpbHRlcnNcIjoge1xuICAgIFwiYnlTdGFyczFcIjogXCJWaXNhciB2w6VyYSBbc3RhcjFdLXN0asOkcm5pZ2Egb21kw7ZtZW5cIixcbiAgICBcImJ5U3RhcnMyXCI6IFwiVmlzYXIgdsOlcmEgW3N0YXIxXS0gb2NoIFtzdGFyMl0tc3Rqw6RybmlnYSBvbWTDtm1lblwiLFxuICAgIFwiYnlTdGFyczNcIjogXCJWaXNhciB2w6VyYSBbc3RhcjFdLSwgW3N0YXIyXS0gb2NoIFtzdGFyM10tc3Rqw6RybmlnYSBvbWTDtm1lblwiLFxuICAgIFwiYnlTdGFyczRcIjogXCJWaXNhciB2w6VyYSBbc3RhcjFdLSwgW3N0YXIyXS0sIFtzdGFyM10tIG9jaCBbc3RhcjRdLXN0asOkcm5pZ2Egb21kw7ZtZW5cIixcbiAgICBcImJ5TGF0ZXN0XCI6IFwiVmlzYXIgdsOlcmEgc2VuYXN0ZSBvbWTDtm1lblwiLFxuICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiVmlzYXIgdsOlcmEgZmF2b3JpdG9tZMO2bWVuXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcInJldmlld3NcIjoge1xuICAgICAgICBcInNpbmd1bGFyXCI6IFwi5p2h6K+E6K66XCIsXG4gICAgICAgIFwicGx1cmFsXCI6IFwi5p2h54K56K+ELFwiXG4gICAgfSxcbiAgICBcIm1vbnRoTmFtZXNcIjoge1xuICAgICAgICBcImphbnVhcnlcIjogXCLkuIDmnIhcIixcbiAgICAgICAgXCJmZWJydWFyeVwiOiBcIuS6jOaciFwiLFxuICAgICAgICBcIm1hcmNoXCI6IFwi5LiJ5pyIXCIsXG4gICAgICAgIFwiYXByaWxcIjogXCLlm5vmnIhcIixcbiAgICAgICAgXCJtYXlcIjogXCLkupTmnIhcIixcbiAgICAgICAgXCJqdW5lXCI6IFwi5YWt5pyIXCIsXG4gICAgICAgIFwianVseVwiOiBcIuS4g+aciFwiLFxuICAgICAgICBcImF1Z3VzdFwiOiBcIuWFq+aciFwiLFxuICAgICAgICBcInNlcHRlbWJlclwiOiBcIuS5neaciFwiLFxuICAgICAgICBcIm9jdG9iZXJcIjogXCLljYHmnIhcIixcbiAgICAgICAgXCJub3ZlbWJlclwiOiBcIuWNgeS4gOaciFwiLFxuICAgICAgICBcImRlY2VtYmVyXCI6IFwi5Y2B5LqM5pyIXCJcbiAgICB9LFxuICAgIFwidGltZUFnb1wiOiB7XG4gICAgICAgIFwiZGF5c1wiOiB7XG4gICAgICAgICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBkYXkgYWdvXCIsXG4gICAgICAgICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gZGF5cyBhZ29cIlxuICAgICAgICB9LFxuICAgICAgICBcImhvdXJzXCI6IHtcbiAgICAgICAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIGhvdXIgYWdvXCIsXG4gICAgICAgICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gaG91cnMgYWdvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJtaW51dGVzXCI6IHtcbiAgICAgICAgICAgIFwic2luZ3VsYXJcIjogXCJbY291bnRdIG1pbnV0ZSBhZ29cIixcbiAgICAgICAgICAgIFwicGx1cmFsXCI6IFwiW2NvdW50XSBtaW51dGVzIGFnb1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vjb25kc1wiOiB7XG4gICAgICAgICAgICBcInNpbmd1bGFyXCI6IFwiW2NvdW50XSBzZWNvbmQgYWdvXCIsXG4gICAgICAgICAgICBcInBsdXJhbFwiOiBcIltjb3VudF0gc2Vjb25kcyBhZ29cIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInJldmlld0ZpbHRlcnNcIjoge1xuICAgICAgICBcImJ5U3RhcnMxXCI6IFwiU2hvd2luZyBvdXIgW3N0YXIxXSBzdGFyIHJldmlld3NcIixcbiAgICAgICAgXCJieVN0YXJzMlwiOiBcIlNob3dpbmcgb3VyIFtzdGFyMV0gJiBbc3RhcjJdIHN0YXIgcmV2aWV3c1wiLFxuICAgICAgICBcImJ5U3RhcnMzXCI6IFwiU2hvd2luZyBvdXIgW3N0YXIxXSwgW3N0YXIyXSAmIFtzdGFyM10gc3RhciByZXZpZXdzXCIsXG4gICAgICAgIFwiYnlTdGFyczRcIjogXCJTaG93aW5nIG91ciBbc3RhcjFdLCBbc3RhcjJdLCBbc3RhcjNdICYgW3N0YXI0XSBzdGFyIHJldmlld3NcIixcbiAgICAgICAgXCJieUxhdGVzdFwiOiBcIlNob3dpbmcgb3VyIGxhdGVzdCByZXZpZXdzXCIsXG4gICAgICAgIFwiYnlGYXZvcml0ZU9yVGFnXCI6IFwiU2hvd2luZyBvdXIgZmF2b3JpdGUgcmV2aWV3c1wiXG4gICAgfVxufSIsImltcG9ydCB4aHIgZnJvbSAnLi4veGhyJztcbmltcG9ydCB7IGdldEFzT2JqZWN0IGFzIGdldFF1ZXJ5c3RyaW5nQXNPYmplY3QgfSBmcm9tICcuLi9xdWVyeVN0cmluZyc7XG5pbXBvcnQgZ2V0V2lkZ2V0Um9vdFVyaSBmcm9tICcuLi9yb290VXJpJztcblxuLy8gTWFrZSBhIHJhbmRvbSBJRCB3aGVyZSBhbiBhcGlDYWxsIHJlcXVpcmVzIG9uZS5cbmNvbnN0IG1ha2VJZCA9IChudW1PZkNoYXJzKSA9PiB7XG4gIGxldCB0ZXh0ID0gJyc7XG4gIGNvbnN0IHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZkNoYXJzOyBpKyspIHtcbiAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgfVxuICByZXR1cm4gdGV4dDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBhdC9jb21wYXQgKi9cbmNvbnN0IGFwaUNhbGwgPSAodXJpLCBwYXJhbXMpID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCBmYWlsKSA9PiB7XG4gICAgbGV0IHZhbHVlcztcbiAgICBsZXQgdXJsO1xuXG4gICAgaWYgKHVyaS5pbmRleE9mKCcvJykgPT09IDApIHtcbiAgICAgIHZhbHVlcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgIGNvbnN0IHsgdG9rZW4gfSA9IGdldFF1ZXJ5c3RyaW5nQXNPYmplY3QoKTtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICB2YWx1ZXMucmFuZG9tID0gbWFrZUlkKDIwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXJpLmluZGV4T2YoJ2h0dHAnKSA9PT0gMCkge1xuICAgICAgLy8gaXMgYSBmdWxsIHVybCBmcm9tIGEgcGFnaW5nIGxpbmssIGVuc3VyZSBodHRwc1xuICAgICAgdXJsID0gdXJpLnJlcGxhY2UoL15odHRwcz86LywgJ2h0dHBzOicpO1xuICAgIH0gZWxzZSBpZiAodXJpLmluZGV4T2YoJy8nKSA9PT0gMCkge1xuICAgICAgLy8gaXMgYSByZWd1bGFyIFwiL3YxLy4uLlwiIGFkZCBkb21haW4gZm9yIGxvY2FsIHRlc3RpbmcgKHZhbHVlIGlzIGVtcHR5IGluIHByb2QpXG4gICAgICB1cmwgPSBnZXRXaWRnZXRSb290VXJpKCkgKyB1cmk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlaXJkL2Jyb2tlbiB1cmxcbiAgICAgIHJldHVybiBmYWlsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHhocih7XG4gICAgICB1cmwsXG4gICAgICBkYXRhOiB2YWx1ZXMsXG4gICAgICBzdWNjZXNzOiByZXNvbHZlLFxuICAgICAgZXJyb3I6IGZhaWwsXG4gICAgfSk7XG4gIH0pO1xuXG5leHBvcnQgeyBhcGlDYWxsIH07XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBhdC9jb21wYXQgKi9cbiIsIi8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0ICovXG5cbmZ1bmN0aW9uIGlzSUUoKSB7XG4gIGNvbnN0IG15TmF2ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gbXlOYXYuaW5kZXhPZignbXNpZScpICE9PSAtMSA/IHBhcnNlSW50KG15TmF2LnNwbGl0KCdtc2llJylbMV0pIDogZmFsc2U7XG59XG5cbi8vIGFkYXB0ZWQgKHN0b2xlbikgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdG9kZG1vdHRvL2F0b21pY1xuXG5mdW5jdGlvbiBwYXJzZShyZXEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiByZXEucmVzcG9uc2VUZXh0O1xuICB9XG59XG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE3MTQ4OTlcbmZ1bmN0aW9uIHRvUXVlcnlTdHJpbmcob2JqKSB7XG4gIGNvbnN0IHN0ciA9IFtdO1xuICBmb3IgKGNvbnN0IHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgc3RyLnB1c2goYCR7ZW5jb2RlVVJJQ29tcG9uZW50KHApfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpbcF0pfWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHBhcmFtcykge1xuICBjb25zdCBYTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBBY3RpdmVYT2JqZWN0O1xuICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCdNU1hNTDIuWE1MSFRUUC4zLjAnKTtcbiAgcmVxdWVzdC5vcGVuKHBhcmFtcy50eXBlLCBwYXJhbXMudXJsLCB0cnVlKTtcbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgcGFyYW1zLnN1Y2Nlc3MocGFyc2UocmVxdWVzdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLmVycm9yKHBhcnNlKHJlcXVlc3QpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVxdWVzdC5zZW5kKHBhcmFtcy5kYXRhKTtcbn1cblxuLyogSUU5LWNvbXBhdGlibGUgcmVxdWVzdCBmdW5jdGlvbi5cblxuSUU5IGRvZXMgbm90IHBlcm1pdCBjcm9zcy1vcmlnaW4gSFRUUCByZXF1ZXN0cyBpbiB0aGUgdXN1YWwgd2F5LiBJdCBhbHNvIGRvZXNcbm5vdCBwZXJtaXQgYSByZXF1ZXN0IHRvIGJlIG1hZGUgdG8gYSBVUkkgd2l0aCBhIGRpZmZlcmVudCBwcm90b2NvbCBmcm9tIHRoYXRcbm9mIHRoZSBwYWdlLCBlLmcuIGFuIEhUVFBTIHJlcXVlc3QgZnJvbSBhbiBIVFRQIHBhZ2UuXG5cblRoaXMgZnVuY3Rpb24gbWFrZXMgcmVxdWVzdHMgaW4gYSBtYW5uZXIgY29tcGF0aWJsZSB3aXRoIElFOSdzIGxpbWl0YXRpb25zLlxuKi9cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0SUUocGFyYW1zKSB7XG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gIGNvbnN0IHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICBwYXJhbXMudXJsID0gcGFyYW1zLnVybC5yZXBsYWNlKC9odHRwcz86LywgcHJvdG9jb2wpO1xuICByZXF1ZXN0Lm9wZW4ocGFyYW1zLnR5cGUsIHBhcmFtcy51cmwpO1xuICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwYXJhbXMuc3VjY2VzcyhwYXJzZShyZXF1ZXN0KSk7XG4gIH07XG4gIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICBwYXJhbXMuZXJyb3IocGFyc2UocmVxdWVzdCkpO1xuICB9O1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlcXVlc3Quc2VuZChwYXJhbXMuZGF0YSk7XG4gIH0sIDApO1xufVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdHlwZTogb3B0aW9ucy50eXBlIHx8ICdHRVQnLFxuICAgIGVycm9yOiBvcHRpb25zLmVycm9yIHx8IG5vb3AsXG4gICAgc3VjY2Vzczogb3B0aW9ucy5zdWNjZXNzIHx8IG5vb3AsXG4gICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgIHVybDogb3B0aW9ucy51cmwgfHwgJycsXG4gIH07XG5cbiAgaWYgKHBhcmFtcy50eXBlID09PSAnR0VUJyAmJiBwYXJhbXMuZGF0YSkge1xuICAgIHBhcmFtcy51cmwgPSBgJHtwYXJhbXMudXJsfT8ke3RvUXVlcnlTdHJpbmcocGFyYW1zLmRhdGEpfWA7XG4gICAgZGVsZXRlIHBhcmFtcy5kYXRhO1xuICB9XG5cbiAgaWYgKGlzSUUoKSAmJiBpc0lFKCkgPD0gOSkge1xuICAgIG1ha2VSZXF1ZXN0SUUocGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBtYWtlUmVxdWVzdChwYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHhocjtcbiIsIi8vIFRoaXMgd2lsbCBiZSBzdWJzdGl0dXRlZCB3aXRoaW4gdGhlIGJ1aWxkc2NyaXB0cywgc28gZG9uJ3QgY2hhbmdlIHRoaXMhXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGhvc3QgPSAnI3tXaWRnZXRBcGkuSG9zdH0nO1xuICByZXR1cm4gaG9zdC5pbmRleE9mKCcjJykgPT09IDAgPyAnaHR0cHM6Ly93aWRnZXQudHAtc3RhZ2luZy5jb20nIDogaG9zdDtcbn1cbiIsImltcG9ydCB7IGFwaUNhbGwgfSBmcm9tICcuL2NhbGwnO1xuaW1wb3J0IHsgZ2V0T25QYWdlUmVhZHksIHNob3dUcnVzdEJveCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHdpdGhMb2FkZXIgfSBmcm9tICcuLi90ZW1wbGF0ZXMvbG9hZGVyJztcbmltcG9ydCB7IGVycm9yRmFsbGJhY2ssIHJlbW92ZUVycm9yRmFsbGJhY2sgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZXJyb3JGYWxsYmFjayc7XG5pbXBvcnQgeyBzZXRMaXN0ZW5lciwgaXNMb2FkZWRNZXNzYWdlLCBzZW5kQVBJRGF0YU1lc3NhZ2UgfSBmcm9tICcuLi9jb21tdW5pY2F0aW9uJztcbmltcG9ydCB7IG1hcE9iamVjdCwgcHJvbWlzZUFsbE9iamVjdCwgcmVqZWN0TnVsbGFyeVZhbHVlcyB9IGZyb20gJy4uL2ZuJztcblxuLyoqXG4gKiBEZWZpbmUgYSB1bmlxdWUgc2luZ2xlIGZldGNoIG9iamVjdCBrZXksIGFsbG93aW5nIHVzIHRvIGZsYXR0ZW4gYmFjayB0byBhXG4gKiBzaW5nbGUgc2V0IG9mIGJhc2UgZGF0YS4gVGhpcyBpcyBhcmJpdHJhcnksIGFuZCBoYXMgYmVlbiBzZWxlY3RlZCB0byBlbnN1cmVcbiAqIGl0IHdpbGwgbm90IGJlIGFjY2lkZW50YWxseSB1c2VkIGluIGEgZmV0Y2hQYXJhbXNPYmplY3QuXG4gKi9cbmNvbnN0IHNpbmdsZUZldGNoT2JqZWN0S2V5ID0gJ2RlZmF1bHRfc2luZ2xlRmV0Y2hfZjk4YWM3N2InO1xuXG4vKipcbiAqIEZsYXR0ZW4gYSBmZXRjaFBhcmFtc09iamVjdCB2YWx1ZSB0byBvbmUgc2luZ2xlIHNldCBvZiBmZXRjaFBhcmFtcywgd2hlcmVcbiAqIHRoYXQgb2JqZWN0IGNvbnRhaW5zIG9ubHkgb25lIHZhbHVlLCBhbmQgaXQgaXMgaW5kZXhlZCBieVxuICogc2luZ2xlRmV0Y2hPYmplY3RLZXkuXG4gKi9cbmNvbnN0IGZsYXR0ZW5TaW5nbGVQYXJhbXMgPSAoZmV0Y2hQYXJhbXNPYmplY3QpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGZldGNoUGFyYW1zT2JqZWN0KTtcbiAgcmV0dXJuIHNpbmdsZUZldGNoT2JqZWN0S2V5IGluIGZldGNoUGFyYW1zT2JqZWN0ICYmIGtleXMubGVuZ3RoID09PSAxXG4gICAgPyBmZXRjaFBhcmFtc09iamVjdFtzaW5nbGVGZXRjaE9iamVjdEtleV1cbiAgICA6IGZldGNoUGFyYW1zT2JqZWN0O1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBidXNpbmVzcyBoYXMgc2VydmljZSByZXZpZXdzXG4gKi9cbmNvbnN0IGhhc1NlcnZpY2VSZXZpZXdzID0gKHtcbiAgYnVzaW5lc3NFbnRpdHk6IHtcbiAgICBudW1iZXJPZlJldmlld3M6IHsgdG90YWwgfSxcbiAgfSxcbn0pID0+IHRvdGFsID4gMDtcblxuLyoqXG4gKiBDaGVjayBpZiBhIGJ1c2luZXNzIGhhcyBzZXJ2aWNlIHJldmlld3MgdXNpbmcgbXVsdGktZmV0Y2guXG4gKlxuICogVGhpcyBjaGVja3MgdGhhdCBhbnkgb2YgdGhlIGJhc2UgZGF0YSBzZXRzIGhhcyBzZXJ2aWNlIHJldmlld3MgcHJlc2VudFxuICogd2l0aGluIGl0LlxuICovXG5jb25zdCBoYXNTZXJ2aWNlUmV2aWV3c011bHRpRmV0Y2ggPSAoYmFzZURhdGEpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGJhc2VEYXRhKTtcbiAgcmV0dXJuIGtleXMuc29tZSgoaykgPT4gaGFzU2VydmljZVJldmlld3MoYmFzZURhdGFba10pKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYnVzaW5lc3MgaGFzIGltcG9ydGVkIG9yIHJlZ3VsYXIgcHJvZHVjdCByZXZpZXdzXG4gKi9cbmNvbnN0IGhhc1Byb2R1Y3RSZXZpZXdzID0gKHsgcHJvZHVjdFJldmlld3NTdW1tYXJ5LCBpbXBvcnRlZFByb2R1Y3RSZXZpZXdzU3VtbWFyeSB9KSA9PiB7XG4gIGNvbnN0IHRvdGFsUHJvZHVjdFJldmlld3MgPSBwcm9kdWN0UmV2aWV3c1N1bW1hcnlcbiAgICA/IHByb2R1Y3RSZXZpZXdzU3VtbWFyeS5udW1iZXJPZlJldmlld3MudG90YWxcbiAgICA6IDA7XG4gIGNvbnN0IHRvdGFsSW1wb3J0ZWRQcm9kdWN0UmV2aWV3cyA9IGltcG9ydGVkUHJvZHVjdFJldmlld3NTdW1tYXJ5XG4gICAgPyBpbXBvcnRlZFByb2R1Y3RSZXZpZXdzU3VtbWFyeS5udW1iZXJPZlJldmlld3MudG90YWxcbiAgICA6IDA7XG5cbiAgcmV0dXJuIHRvdGFsUHJvZHVjdFJldmlld3MgKyB0b3RhbEltcG9ydGVkUHJvZHVjdFJldmlld3MgPiAwO1xufTtcblxuLy8gQ29uc3RydWN0IGEgYmFzZSBkYXRhIGNhbGwgcHJvbWlzZS5cbmNvbnN0IGJhc2VEYXRhQ2FsbCA9ICh1cmkpID0+ICh7IGJ1c2luZXNzVW5pdElkLCBsb2NhbGUsIC4uLm9wdHMgfSkgPT4ge1xuICBjb25zdCBiYXNlRGF0YVBhcmFtcyA9IHJlamVjdE51bGxhcnlWYWx1ZXMoe1xuICAgIGJ1c2luZXNzVW5pdElkLFxuICAgIGxvY2FsZSxcbiAgICAuLi5vcHRzLFxuICAgIHRoZW1lOiBudWxsLCAvLyBGb3JjZSByZWplY3Rpb24gb2YgdGhlIHRoZW1lIHBhcmFtXG4gIH0pO1xuICByZXR1cm4gYXBpQ2FsbCh1cmksIGJhc2VEYXRhUGFyYW1zKTtcbn07XG5cbi8qKlxuICogQ2FsbCBhIGNvbnN0cnVjdFRydXN0Qm94IGNhbGxiYWNrLCBhbmQgdGhlbiBjb21wbGV0ZSB0aGUgbG9hZGluZyBwcm9jZXNzXG4gKiBmb3IgdGhlIFRydXN0Qm94LlxuICovXG5jb25zdCBjb25zdHJ1Y3RUcnVzdEJveEFuZENvbXBsZXRlID0gKFxuICBjb25zdHJ1Y3RUcnVzdEJveCxcbiAgcGFzc1RvUG9wdXAgPSBmYWxzZSxcbiAgaGFzUmV2aWV3c0Zyb21CYXNlRGF0YSA9IGhhc1NlcnZpY2VSZXZpZXdzXG4pID0+ICh7IGJhc2VEYXRhLCBsb2NhbGUsIHRoZW1lLCBoYXNNb3JlUmV2aWV3cywgbG9hZE1vcmVSZXZpZXdzIH0pID0+IHtcbiAgY29uc3QgaGFzUmV2aWV3cyA9IGhhc1Jldmlld3NGcm9tQmFzZURhdGEoYmFzZURhdGEpO1xuXG4gIGNvbnN0cnVjdFRydXN0Qm94KHtcbiAgICBiYXNlRGF0YSxcbiAgICBsb2NhbGUsXG4gICAgaGFzTW9yZVJldmlld3MsXG4gICAgbG9hZE1vcmVSZXZpZXdzLFxuICB9KTtcblxuICAvLyBDb25kaXRpb25hbGx5IHNlbmQgdG8gcG9wdXBcbiAgY29uc3Qgc2VuZE9uUG9wdXBMb2FkID0gKHsgZGF0YTogZXZlbnQgfSkgPT4ge1xuICAgIGlmIChpc0xvYWRlZE1lc3NhZ2UoZXZlbnQpKSB7XG4gICAgICBzZW5kQVBJRGF0YU1lc3NhZ2Uoe1xuICAgICAgICBiYXNlRGF0YSxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBpZiAocGFzc1RvUG9wdXApIHtcbiAgICBzZXRMaXN0ZW5lcihzZW5kT25Qb3B1cExvYWQpO1xuICB9XG5cbiAgc2hvd1RydXN0Qm94KHRoZW1lLCBoYXNSZXZpZXdzKTtcbiAgcmVtb3ZlRXJyb3JGYWxsYmFjaygpO1xufTtcblxuLyoqXG4gKiBGZXRjaCBkYXRhIGZyb20gdGhlIGRhdGEgQVBJLCBtYWtpbmcgemVybyBvciBtb3JlIHJlcXVlc3RzLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbiBvYmplY3Qgd2l0aCBhcmJpdHJhcnkga2V5cywgYW5kIHZhbHVlcyB3aGljaCBhcmVcbiAqIGVhY2ggYW4gb2JqZWN0IGNvbnRhaW5pbmcgcXVlcnkgcGFyYW1zIGZvciBvbmUgcmVxdWVzdC4gQSByZXF1ZXN0IGlzIG1hZGVcbiAqIGZvciBlYWNoIHF1ZXJ5IHBhcmFtIG9iamVjdCwgYW5kIHRoZSByZXN1bHQgaXMgd3JhcHBlZCB3aXRoaW4gYW4gb2JqZWN0XG4gKiBpbmRleGVkIGJ5IHRoZSBrZXlzIG9mIHRoZSBvcmlnaW5hbCBhcmd1bWVudCBvYmplY3QuXG4gKlxuICogVGhlc2UgZGF0YSwgdG9nZXRoZXIgd2l0aCBsb2NhbGUgZGF0YSwgYXJlIHBhc3NlZCB0byB0aGVcbiAqIGNvbnN0cnVjdFRydXN0Qm94IGNhbGxiYWNrLlxuICpcbiAqIEFuIG9wdGlvbmFsIGFyZ3VtZW50LCBwYXNzVG9Qb3B1cCwgY2FuIGJlIHByb3ZpZGVkIHRvIHRoaXMgZnVuY3Rpb24uIElmIHNldFxuICogdG8gYSB0cnV0aHkgdmFsdWUsIHRoaXMgZnVuY3Rpb24gd2lsbCBhdHRlbXB0IHRvIHBhc3MgdGhlIGRhdGEgb2J0YWluZWQgdG9cbiAqIGFueSBwb3B1cCBpZnJhbWUuXG4gKi9cbmNvbnN0IG11bHRpRmV0Y2hEYXRhID0gKHVyaSkgPT4gKFxuICBmZXRjaFBhcmFtc09iamVjdCxcbiAgY29uc3RydWN0VHJ1c3RCb3gsXG4gIHBhc3NUb1BvcHVwLFxuICBoYXNSZXZpZXdzRnJvbUJhc2VEYXRhXG4pID0+IHtcbiAgY29uc3QgZmlyc3RGZXRjaFBhcmFtcyA9IGZldGNoUGFyYW1zT2JqZWN0W09iamVjdC5rZXlzKGZldGNoUGFyYW1zT2JqZWN0KVswXV07XG4gIGNvbnN0IHsgbG9jYWxlLCB0aGVtZSA9ICdsaWdodCcgfSA9IGZpcnN0RmV0Y2hQYXJhbXM7XG5cbiAgY29uc3QgYmFzZURhdGFQcm9taXNlcyA9IHByb21pc2VBbGxPYmplY3QobWFwT2JqZWN0KGJhc2VEYXRhQ2FsbCh1cmkpLCBmZXRjaFBhcmFtc09iamVjdCkpO1xuICBjb25zdCByZWFkeVByb21pc2UgPSBnZXRPblBhZ2VSZWFkeSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wYXQvY29tcGF0XG4gIGNvbnN0IGZldGNoUHJvbWlzZSA9IFByb21pc2UuYWxsKFtiYXNlRGF0YVByb21pc2VzLCByZWFkeVByb21pc2VdKVxuICAgIC50aGVuKChbb3JpZ2luYWxCYXNlRGF0YV0pID0+IHtcbiAgICAgIGNvbnN0IGJhc2VEYXRhID0gZmxhdHRlblNpbmdsZVBhcmFtcyhvcmlnaW5hbEJhc2VEYXRhKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmFzZURhdGEsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgdGhlbWUsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLnRoZW4oY29uc3RydWN0VHJ1c3RCb3hBbmRDb21wbGV0ZShjb25zdHJ1Y3RUcnVzdEJveCwgcGFzc1RvUG9wdXAsIGhhc1Jldmlld3NGcm9tQmFzZURhdGEpKVxuICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgJiYgZS5GYWxsYmFja0xvZ28pIHtcbiAgICAgICAgLy8gcmVuZGVyIGZhbGxiYWNrIG9ubHkgaWYgYWxsb3dlZCwgYmFzZWQgb24gdGhlIHJlc3BvbnNlXG4gICAgICAgIHJldHVybiBlcnJvckZhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSk7XG5cbiAgd2l0aExvYWRlcihmZXRjaFByb21pc2UpO1xufTtcblxuLy8gRmV0Y2ggYW5kIHN0cnVjdHVyZSBBUEkgZGF0YS5cbmNvbnN0IGZldGNoRGF0YSA9ICh1cmkpID0+IChcbiAgZmV0Y2hQYXJhbXMsXG4gIGNvbnN0cnVjdFRydXN0Qm94LFxuICBwYXNzVG9Qb3B1cCxcbiAgaGFzUmV2aWV3c0Zyb21CYXNlRGF0YVxuKSA9PiB7XG4gIGNvbnN0IGZldGNoUGFyYW1zT2JqZWN0ID0geyBbc2luZ2xlRmV0Y2hPYmplY3RLZXldOiBmZXRjaFBhcmFtcyB9O1xuICBtdWx0aUZldGNoRGF0YSh1cmkpKGZldGNoUGFyYW1zT2JqZWN0LCBjb25zdHJ1Y3RUcnVzdEJveCwgcGFzc1RvUG9wdXAsIGhhc1Jldmlld3NGcm9tQmFzZURhdGEpO1xufTtcblxuZXhwb3J0IHtcbiAgZmV0Y2hEYXRhLFxuICBtdWx0aUZldGNoRGF0YSxcbiAgY29uc3RydWN0VHJ1c3RCb3hBbmRDb21wbGV0ZSxcbiAgaGFzU2VydmljZVJldmlld3MsXG4gIGhhc1NlcnZpY2VSZXZpZXdzTXVsdGlGZXRjaCxcbiAgaGFzUHJvZHVjdFJldmlld3MsXG59O1xuIiwiaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCB3cGFyZW50ID0gd2luZG93LnBhcmVudDtcbmNvbnN0IG1lc3NhZ2VRdWV1ZSA9IFtdO1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGNvbW1hbmQ6ICdjcmVhdGVJRnJhbWUnLFxuICBwb3NpdGlvbjogJ2NlbnRlciB0b3AnLFxuICBzaG93OiBmYWxzZSxcbiAgc291cmNlOiAncG9wdXAuaHRtbCcsXG4gIHF1ZXJ5U3RyaW5nOiAnJyxcbn07XG5jb25zdCBwb3B1cE9wdGlvbnMgPSB7XG4gIG5hbWU6ICdwb3B1cCcsXG4gIG1vZGFsOiBmYWxzZSxcbiAgc3R5bGVzOiB7XG4gICAgaGVpZ2h0OiAnMzAwcHgnLFxuICAgIHdpZHRoOiAnJyxcbiAgfSxcbn07XG5jb25zdCBtb2RhbE9wdGlvbnMgPSB7XG4gIG5hbWU6ICdtb2RhbCcsXG4gIG1vZGFsOiB0cnVlLFxuICBzdHlsZXM6IHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgIGxlZnQ6ICcwJyxcbiAgICByaWdodDogJzAnLFxuICAgIHRvcDogJzAnLFxuICAgIGJvdHRvbTogJzAnLFxuICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgemluZGV4OiA5OSxcbiAgfSxcbn07XG5cbmxldCBpZCA9IG51bGw7XG5jb25zdCBsaXN0ZW5lckNhbGxiYWNrcyA9IFtdO1xuXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShtZXNzYWdlKSB7XG4gIGlmIChpZCkge1xuICAgIG1lc3NhZ2Uud2lkZ2V0SWQgPSBpZDtcbiAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7IC8vIFRoaXMgaXMgdG8gbWFrZSBpdCBJRTggY29tcGF0aWJsZVxuICAgIHdwYXJlbnQucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlUXVldWUucHVzaChtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZW5kTWVzc2FnZVRvKHRhcmdldCkge1xuICByZXR1cm4gKG1lc3NhZ2UsIHBheWxvYWQgPSB7fSkgPT5cbiAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAuLi5wYXlsb2FkLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIGNvbW1hbmQ6ICdtZXNzYWdlJyxcbiAgICAgIG5hbWU6IHRhcmdldCxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2VuZFF1ZXVlKCkge1xuICB3aGlsZSAobWVzc2FnZVF1ZXVlLmxlbmd0aCkge1xuICAgIHNlbmRNZXNzYWdlKG1lc3NhZ2VRdWV1ZS5wb3AoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9wdXBJZnJhbWUob3B0aW9ucykge1xuICBzZW5kTWVzc2FnZSh7XG4gICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgLi4ucG9wdXBPcHRpb25zLFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNb2RhbElmcmFtZShvcHRpb25zKSB7XG4gIHNlbmRNZXNzYWdlKHtcbiAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAuLi5tb2RhbE9wdGlvbnMsXG4gICAgLi4ub3B0aW9ucyxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlcyhzdHlsZXMsIG9wdGlvbmFsSWZyYW1lTmFtZSkge1xuICBzZW5kTWVzc2FnZSh7IGNvbW1hbmQ6ICdzZXRTdHlsZScsIG5hbWU6IG9wdGlvbmFsSWZyYW1lTmFtZSwgc3R5bGU6IHN0eWxlcyB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd0lmcmFtZShpZnJhbWVOYW1lKSB7XG4gIHNlbmRNZXNzYWdlKHsgY29tbWFuZDogJ3Nob3cnLCBuYW1lOiBpZnJhbWVOYW1lIH0pO1xuICBzZW5kTWVzc2FnZVRvKCdtYWluJykoYCR7aWZyYW1lTmFtZX0gdG9nZ2xlZGAsIHsgdmlzaWJsZTogdHJ1ZSB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZUlmcmFtZShpZnJhbWVOYW1lKSB7XG4gIHNlbmRNZXNzYWdlKHsgY29tbWFuZDogJ2hpZGUnLCBuYW1lOiBpZnJhbWVOYW1lIH0pO1xuICBzZW5kTWVzc2FnZVRvKCdtYWluJykoYCR7aWZyYW1lTmFtZX0gdG9nZ2xlZGAsIHsgdmlzaWJsZTogZmFsc2UgfSk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzSWZyYW1lKGlmcmFtZU5hbWUpIHtcbiAgc2VuZE1lc3NhZ2UoeyBjb21tYW5kOiAnZm9jdXMnLCBuYW1lOiBpZnJhbWVOYW1lIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kTG9hZGVkTWVzc2FnZSgpIHtcbiAgc2VuZE1lc3NhZ2UoeyBjb21tYW5kOiAnbG9hZGVkJyB9KTtcbn1cblxuZnVuY3Rpb24gaXNMb2FkZWRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIG1lc3NhZ2UgPT09ICdsb2FkZWQnO1xufVxuXG4vKipcbiAqIFNlbmQgZGF0YSBvYnRhaW5lZCBmcm9tIGFuIEFQSSBjYWxsIHRvIGEgcG9wdXAgaWZyYW1lLlxuICovXG5mdW5jdGlvbiBzZW5kQVBJRGF0YU1lc3NhZ2UoZGF0YSkge1xuICBzZW5kTWVzc2FnZVRvKCdwb3B1cCcpKCdBUEkgZGF0YScsIGRhdGEpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgdHdvIG1lc3NhZ2VzIGFyZSBvZiB0aGUgc2FtZSB0eXBlLlxuICpcbiAqIElnbm9yZXMgYW55IGFkZGl0aW9uYWwgZGF0YSBjb250YWluZWQgd2l0aGluIHRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBhcmVNYXRjaGluZ01lc3NhZ2VzKG1lc3NhZ2UsIG90aGVyTWVzc2FnZSkge1xuICByZXR1cm4gWydtZXNzYWdlJywgJ2NvbW1hbmQnLCAnbmFtZSddLmV2ZXJ5KFxuICAgIChrZXkpID0+IG1lc3NhZ2Vba2V5XSAmJiBvdGhlck1lc3NhZ2Vba2V5XSAmJiBtZXNzYWdlW2tleV0gPT09IG90aGVyTWVzc2FnZVtrZXldXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQVBJRGF0YU1lc3NhZ2UobWVzc2FnZSkge1xuICByZXR1cm4gYXJlTWF0Y2hpbmdNZXNzYWdlcyhtZXNzYWdlLCB7XG4gICAgY29tbWFuZDogJ21lc3NhZ2UnLFxuICAgIG5hbWU6ICdwb3B1cCcsXG4gICAgbWVzc2FnZTogJ0FQSSBkYXRhJyxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzUG9wdXBUb2dnbGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGFyZU1hdGNoaW5nTWVzc2FnZXMobWVzc2FnZSwge1xuICAgIGNvbW1hbmQ6ICdtZXNzYWdlJyxcbiAgICBuYW1lOiAnbWFpbicsXG4gICAgbWVzc2FnZTogJ3BvcHVwIHRvZ2dsZWQnLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkQ2FsbGJhY2tGdW5jdGlvbihmdW5jKSB7XG4gIGxpc3RlbmVyQ2FsbGJhY2tzLnB1c2goZnVuYyk7XG59XG5cbmZ1bmN0aW9uIGhpZGVNYWluSWZyYW1lKCkge1xuICBoaWRlSWZyYW1lKCdtYWluJyk7XG59XG5cbmZ1bmN0aW9uIHNob3dQb3B1cElmcmFtZSgpIHtcbiAgc2hvd0lmcmFtZSgncG9wdXAnKTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwSWZyYW1lKCkge1xuICBoaWRlSWZyYW1lKCdwb3B1cCcpO1xufVxuXG5mdW5jdGlvbiBmb2N1c1BvcHVwSWZyYW1lKCkge1xuICBmb2N1c0lmcmFtZSgncG9wdXAnKTtcbn1cblxuZnVuY3Rpb24gc2hvd01vZGFsSWZyYW1lKCkge1xuICBzaG93SWZyYW1lKCdtb2RhbCcpO1xufVxuXG5mdW5jdGlvbiBoaWRlTW9kYWxJZnJhbWUoKSB7XG4gIGhpZGVJZnJhbWUoJ21vZGFsJyk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzTW9kYWxJZnJhbWUoKSB7XG4gIGZvY3VzSWZyYW1lKCdtb2RhbCcpO1xufVxuXG5jb25zdCBzZW5kUGluZyA9ICgpID0+IHNlbmRNZXNzYWdlKHsgY29tbWFuZDogJ3BpbmcnIH0pO1xuXG5jb25zdCBvblBvbmcgPSAoY2IpID0+IHtcbiAgY29uc3QgcG9uZyA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5kYXRhLmNvbW1hbmQgPT09ICdwb25nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbGxiYWNrLXJldHVyblxuICAgICAgY2IoZXZlbnQpO1xuICAgIH1cbiAgfTtcbiAgYWRkQ2FsbGJhY2tGdW5jdGlvbihwb25nKTtcbn07XG5cbmZ1bmN0aW9uIHJlc2l6ZUhlaWdodChvcHRpb25hbEhlaWdodCwgb3B0aW9uYWxJZnJhbWVOYW1lKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICBzZW5kTWVzc2FnZSh7XG4gICAgY29tbWFuZDogJ3Jlc2l6ZS1oZWlnaHQnLFxuICAgIG5hbWU6IG9wdGlvbmFsSWZyYW1lTmFtZSxcbiAgICBoZWlnaHQ6IG9wdGlvbmFsSGVpZ2h0IHx8IGJvZHkub2Zmc2V0SGVpZ2h0LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsVG9UcnVzdEJveCh0YXJnZXRzKSB7XG4gIHNlbmRNZXNzYWdlKHtcbiAgICBjb21tYW5kOiAnc2Nyb2xsVG8nLFxuICAgIHRhcmdldHMsXG4gIH0pO1xufVxuXG5hZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKHR5cGVvZiBldmVudC5kYXRhICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBlO1xuICB0cnkge1xuICAgIGUgPSB7IGRhdGE6IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgfTsgLy8gVGhpcyBpcyB0byBtYWtlIGl0IElFOCBjb21wYXRpYmxlXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm47IC8vIHByb2JhYmx5IG5vdCBmb3IgdXNcbiAgfVxuXG4gIGlmIChlLmRhdGEuY29tbWFuZCA9PT0gJ3NldElkJykge1xuICAgIGlkID0gZS5kYXRhLndpZGdldElkO1xuICAgIHNlbmRRdWV1ZSgpO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gbGlzdGVuZXJDYWxsYmFja3NbaV07XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FsbGJhY2stcmV0dXJuXG4gICAgICBjYWxsYmFjayhlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQge1xuICBzZW5kTWVzc2FnZSBhcyBzZW5kLFxuICBjcmVhdGVQb3B1cElmcmFtZSBhcyBjcmVhdGVQb3B1cCxcbiAgY3JlYXRlTW9kYWxJZnJhbWUgYXMgY3JlYXRlTW9kYWwsXG4gIGhpZGVNYWluSWZyYW1lIGFzIGhpZGVUcnVzdEJveCxcbiAgc2hvd1BvcHVwSWZyYW1lIGFzIHNob3dQb3B1cCxcbiAgaGlkZVBvcHVwSWZyYW1lIGFzIGhpZGVQb3B1cCxcbiAgZm9jdXNQb3B1cElmcmFtZSBhcyBmb2N1c1BvcHVwLFxuICBzaG93TW9kYWxJZnJhbWUgYXMgc2hvd01vZGFsLFxuICBoaWRlTW9kYWxJZnJhbWUgYXMgaGlkZU1vZGFsLFxuICBmb2N1c01vZGFsSWZyYW1lIGFzIGZvY3VzTW9kYWwsXG4gIHNlbmRMb2FkZWRNZXNzYWdlIGFzIGxvYWRlZCxcbiAgc2V0U3R5bGVzLFxuICByZXNpemVIZWlnaHQsXG4gIGFkZENhbGxiYWNrRnVuY3Rpb24gYXMgc2V0TGlzdGVuZXIsXG4gIGlzTG9hZGVkTWVzc2FnZSxcbiAgc2VuZEFQSURhdGFNZXNzYWdlLFxuICBpc0FQSURhdGFNZXNzYWdlLFxuICBpc1BvcHVwVG9nZ2xlTWVzc2FnZSxcbiAgc2VuZFBpbmcgYXMgcGluZyxcbiAgb25Qb25nLFxuICBzY3JvbGxUb1RydXN0Qm94LFxufTtcbiIsIi8vIENvbnZlcnQgcmVkdWNlIG1ldGhvZCBpbnRvIGEgZnVuY3Rpb25cbmNvbnN0IHJlZHVjZSA9IChmKSA9PiAoaW5pdCkgPT4gKHhzKSA9PiB4cy5yZWR1Y2UoZiwgaW5pdCk7XG5cbi8vIENvbnZlcnQgZmlsdGVyIG1ldGhvZCBpbnRvIGEgZnVuY3Rpb25cbmNvbnN0IGZpbHRlciA9IChwKSA9PiAoeHMpID0+IHhzLmZpbHRlcihwKTtcblxuLy8gQ29udmVydCBtYXAgbWV0aG9kIGludG8gYSBmdW5jdGlvblxuY29uc3QgbWFwID0gKGYpID0+ICh4cykgPT4geHMubWFwKGYpO1xuXG4vLyBJbXBsZW1lbnRhdGlvbiBvZiBtYXAsIGJ1dCBmb3IgYW4gb2JqZWN0LiBWYWx1ZXMgYXJlIHJlcGxhY2VkIHdpdGggdGhlIHJlc3VsdFxuLy8gb2YgY2FsbGluZyB0aGUgcGFzc2VkIGZ1bmN0aW9uIG9mIHRoZW07IGtleXMgcmVtYWluIHVuY2hhbmdlZC5cbmNvbnN0IG1hcE9iamVjdCA9IChmLCBvYmopID0+IE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChhbGwsIGspID0+ICh7IC4uLmFsbCwgW2tdOiBmKG9ialtrXSkgfSksIHt9KTtcblxuLy8gVHJhbnNmb3JtcyBhbiBvYmplY3QgY29udGFpbmluZyBhcmJpdHJhcnkga2V5cywgYW5kIHByb21pc2UgdmFsdWVzLCBpbnRvIGFcbi8vIHByb21pc2Utd3JhcHBlZCBvYmplY3QsIHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdGhlIHJlc3VsdCBvZiByZXNvbHZpbmcgZWFjaFxuLy8gcHJvbWlzZSBhcyB2YWx1ZXMuXG5jb25zdCBwcm9taXNlQWxsT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgY29uc3QgdmFsdWVzID0ga2V5cy5tYXAoKGspID0+IG9ialtrXSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wYXQvY29tcGF0XG4gIHJldHVybiBQcm9taXNlLmFsbCh2YWx1ZXMpLnRoZW4oKHByb21pc2VzKSA9PlxuICAgIHByb21pc2VzLnJlZHVjZSgoYWxsLCBwcm9taXNlLCBpZHgpID0+ICh7IC4uLmFsbCwgW2tleXNbaWR4XV06IHByb21pc2UgfSksIHt9KVxuICApO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IGNvbnRhaW5pbmcgcGFpcnMgb2YgdmFsdWVzIGludG8gYW4gb2JqZWN0LlxuICpcbiAqICAgW1trMSwgdjFdLCBbazIsIHYyXSwgLi4uIF0gLT4geyBbazFdOiB2MSwgW2syXTogdjIsIC4uLiB9XG4gKi9cbmNvbnN0IHBhaXJzVG9PYmplY3QgPSAocGFpcnMpID0+IHBhaXJzLnJlZHVjZSgob2JqLCBbaywgdl0pID0+ICh7IC4uLm9iaiwgW2tdOiB2IH0pLCB7fSk7XG5cbmNvbnN0IGlzTnVsbGFyeSA9ICh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbDtcblxuY29uc3QgaXNOdWxsYXJ5T3JGYWxzZSA9ICh2YWx1ZSkgPT4gaXNOdWxsYXJ5KHZhbHVlKSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG5cbi8vIEZpbHRlciBvdXQgYWxsIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlcyBmcm9tIGFuIG9iamVjdC5cbmNvbnN0IHJlamVjdE51bGxhcnlWYWx1ZXMgPSAob2JqKSA9PiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShcbiAgICAobmV3T2JqLCBrZXkpID0+ICh7XG4gICAgICAuLi5uZXdPYmosXG4gICAgICAuLi4oaXNOdWxsYXJ5KG9ialtrZXldKSA/IHt9IDogeyBba2V5XTogb2JqW2tleV0gfSksXG4gICAgfSksXG4gICAge31cbiAgKTtcbn07XG5cbi8qKlxuICogU3BsaXQgYW4gYXJyYXkgb2YgdmFsdWVzIGludG8gY2h1bmtzIG9mIGEgZ2l2ZW4gc2l6ZS5cbiAqXG4gKiBJZiB0aGUgbnVtYmVyIG9mIHZhbHVlcyBkb2VzIG5vdCBkaXZpZGUgZXZlbmx5IGludG8gdGhlIGNodW5rIHNpemUsIHRoZVxuICogZmluYWwgY2h1bmsgd2lsbCBiZSBzbWFsbGVyIHRoYW4gY2h1bmtTaXplLlxuICpcbiAqICAgY2h1bmsgMiBbYSwgYiwgYywgZCwgZSwgZiwgZ10gLT4gW1thLCBiXSwgW2MsIGRdLCBbZSwgZl0sIFtnXV1cbiAqL1xuY29uc3QgY2h1bmsgPSAoY2h1bmtTaXplKSA9PlxuICByZWR1Y2UoKGNodW5rcywgdmFsLCBpZHgpID0+IHtcbiAgICBjb25zdCBsYXN0Q2h1bmsgPSBjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGlzTmV3Q2h1bmsgPSBpZHggJSBjaHVua1NpemUgPT09IDA7XG4gICAgY29uc3QgbmV3Q2h1bmsgPSBpc05ld0NodW5rID8gW3ZhbF0gOiBbLi4ubGFzdENodW5rLCB2YWxdO1xuICAgIHJldHVybiBbLi4uY2h1bmtzLnNsaWNlKDAsIGNodW5rcy5sZW5ndGggLSAoaXNOZXdDaHVuayA/IDAgOiAxKSksIG5ld0NodW5rXTtcbiAgfSkoW10pO1xuXG4vKipcbiAqIFNwbGl0IGFuIGFycmF5IG9mIHZhbHVlcyBpbnRvIGNodW5rcyBvZiBhIGdpdmVuIHNpemUsIGFuZCB0aGVuIHRyYW5zcG9zZSB2YWx1ZXMuXG4gKlxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIHtAbGluayAnY2h1bmsnfSwgYnV0IHdpdGggdGhlIHZhbHVlcyB0cmFuc3Bvc2VkOlxuICpcbiAqICAgY2h1bmtUcmFuc3Bvc2UgMiBbYSwgYiwgYywgZCwgZSwgZiwgZ10gLT4gW1thLCBjLCBlLCBnXSwgW2IsIGQsIGZdXVxuICpcbiAqIFRoZSB0cmFuc3Bvc2l0aW9uIGhhcyB0aGUgZWZmZWN0IG9mIHR1cm5pbmcgYW4gYXJyYXkgb2YgeCBjaHVua3Mgb2Ygc2l6ZSBuLFxuICogaW50byBhbiBhcnJheSBvZiBuIGNodW5rcyBvZiBzaXplIHguXG4gKi9cbmNvbnN0IGNodW5rVHJhbnNwb3NlID0gKGNodW5rU2l6ZSkgPT5cbiAgcmVkdWNlKChjaHVua3MsIHZhbCwgaWR4KSA9PiB7XG4gICAgY29uc3QgY2h1bmtJZHggPSBpZHggJSBjaHVua1NpemU7XG4gICAgY29uc3QgbmV3Q2h1bmsgPSBbLi4uKGNodW5rc1tjaHVua0lkeF0gfHwgW10pLCB2YWxdO1xuICAgIHJldHVybiBbLi4uY2h1bmtzLnNsaWNlKDAsIGNodW5rSWR4KSwgbmV3Q2h1bmssIC4uLmNodW5rcy5zbGljZShjaHVua0lkeCArIDEpXTtcbiAgfSkoW10pO1xuXG4vKipcbiAqIENvbXBvc2UgYSBzZXJpZXMgb2YgZnVuY3Rpb25zIHRvZ2V0aGVyLlxuICpcbiAqIEVxdWl2YWxlbnQgdG8gYXBwbHlpbmcgYW4gYXJyYXkgb2YgZnVuY3Rpb25zIHRvIGEgdmFsdWUsIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogICBjb21wb3NlKGYsIGcsIGgpKHgpID09PSBmKGcoaCh4KSkpXG4gKlxuICovXG5jb25zdCBjb21wb3NlID1cbiAgKC4uLmZzKSA9PlxuICAoeCkgPT5cbiAgICBmcy5yZWR1Y2VSaWdodCgodmFsLCBmKSA9PiBmKHZhbCksIHgpO1xuXG4vLyBQaXBlIGEgdmFsdWUgdGhyb3VnaCBhIHNlcmllcyBvZiBmdW5jdGlvbnMgd2hpY2ggdGVybWluYXRlcyBpbW1lZGlhdGVseSBvblxuLy8gcmVjZWl2aW5nIGEgbnVsbGFyeSB2YWx1ZS5cbmNvbnN0IHBpcGVNYXliZSA9XG4gICguLi5mcykgPT5cbiAgKHgpID0+XG4gICAgZnMucmVkdWNlKCh2YWwsIGYpID0+IChpc051bGxhcnkodmFsKSA/IHZhbCA6IGYodmFsKSksIHgpO1xuXG4vLyBHZXQgZmlyc3QgdmFsdWUgZnJvbSBhbiBhcnJheVxuY29uc3QgZmlyc3QgPSAoW3hdKSA9PiB4O1xuXG4vLyBGaXJzdCBmaXJzdCB2YWx1ZSBtYXRjaGluZyBwcmVkaWNhdGUgcCBpbiBhbiBhcnJheSBvZiB2YWx1ZXMuXG5jb25zdCBmaW5kID0gKHApID0+IHBpcGVNYXliZShmaWx0ZXIocCksIGZpcnN0KTtcblxuLy8gR2V0IGEgdmFsdWUgZnJvbSBhbiBvYmplY3QgYXQgYSBnaXZlbiBrZXkuXG5jb25zdCBwcm9wID1cbiAgKGspID0+XG4gIChvYmogPSB7fSkgPT5cbiAgICBvYmpba107XG5cbi8vIEdldCBhIHZhbHVlIGZyb20gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4ga2V5IGlmIGl0IGV4aXN0cy5cbmNvbnN0IHByb3BNYXliZSA9XG4gIChrKSA9PlxuICAob2JqID0ge30pID0+XG4gICAgb2JqW2tdIHx8IG9iajtcblxuLy8gVGVzdCBpZiBhIHZhbHVlIGlzIGZhbHNlIG9yIG51bGxhcnksIHJldHVybmluZyBudWxsIGlmIHRydWUsIG9yIGEgc2Vjb25kIHZhbHVlIGlmIGZhbHNlLlxuLy8gSW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYSBwaXBlTWF5YmUgd2hlcmUgeW91IHdhbnQgdG8gdGVybWluYXRlIGV4ZWN1dGlvbiB3aGVyZVxuLy8gYW4gYXJiaXRyYXJ5IHZhbHVlIGlzIG51bGwuXG5jb25zdCBndWFyZCA9IChwKSA9PiAoeCkgPT4gaXNOdWxsYXJ5T3JGYWxzZShwKSA/IG51bGwgOiB4O1xuXG5leHBvcnQge1xuICBjaHVuayxcbiAgY2h1bmtUcmFuc3Bvc2UsXG4gIGNvbXBvc2UsXG4gIGZpbHRlcixcbiAgZmluZCxcbiAgZmlyc3QsXG4gIGd1YXJkLFxuICBtYXAsXG4gIG1hcE9iamVjdCxcbiAgcGFpcnNUb09iamVjdCxcbiAgcGlwZU1heWJlLFxuICBwcm9taXNlQWxsT2JqZWN0LFxuICBwcm9wLFxuICBwcm9wTWF5YmUsXG4gIHJlamVjdE51bGxhcnlWYWx1ZXMsXG59O1xuIiwiaW1wb3J0IHsgcG9wdWxhdGVFbGVtZW50cyB9IGZyb20gJy4uL2RvbSc7XG5pbXBvcnQgeyBta0VsZW1XaXRoU3ZnTG9va3VwLCBhIH0gZnJvbSAnLi4vdGVtcGxhdGluZyc7XG5pbXBvcnQgeyByZW1vdmVFbGVtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBlcnJvckZhbGxiYWNrID0gKGNvbnRhaW5lckVsZW1lbnQgPSAndHAtd2lkZ2V0LWZhbGxiYWNrJykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJFbGVtZW50KTtcblxuICBwb3B1bGF0ZUVsZW1lbnRzKFtcbiAgICB7XG4gICAgICBlbGVtZW50OiBjb250YWluZXIsXG4gICAgICBzdHJpbmc6IGEoXG4gICAgICAgIHtcbiAgICAgICAgICBocmVmOiAnaHR0cHM6Ly93d3cudHJ1c3RwaWxvdC5jb20/dXRtX21lZGl1bT10cnVzdGJveGZhbGxiYWNrJyxcbiAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgICAgIHJlbDogJ25vb3BlbmVyIG5vcmVmZXJyZXInLFxuICAgICAgICB9LFxuICAgICAgICBta0VsZW1XaXRoU3ZnTG9va3VwKCdsb2dvJywgJ2ZhbGxiYWNrLWxvZ28nKVxuICAgICAgKSxcbiAgICB9LFxuICBdKTtcbn07XG5cbmNvbnN0IHJlbW92ZUVycm9yRmFsbGJhY2sgPSAoY29udGFpbmVyRWxlbWVudCA9ICd0cC13aWRnZXQtZmFsbGJhY2snKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lckVsZW1lbnQpO1xuICByZW1vdmVFbGVtZW50KGNvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgeyBlcnJvckZhbGxiYWNrLCByZW1vdmVFcnJvckZhbGxiYWNrIH07XG4iLCJpbXBvcnQgeyBhZGRDbGFzcywgcG9wdWxhdGVFbGVtZW50cyB9IGZyb20gJy4uL2RvbSc7XG5pbXBvcnQgeyByZW1vdmVFbGVtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgbWtFbGVtV2l0aFN2Z0xvb2t1cCB9IGZyb20gJy4uL3RlbXBsYXRpbmcnO1xuXG5jb25zdCBkZWZhdWx0TG9hZGVyQ29udGFpbmVyID0gJ3RwLXdpZGdldC1sb2FkZXInO1xuXG5jb25zdCBhZGRMb2FkZXIgPSAobG9hZGVyRWxlbWVudCkgPT4ge1xuICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsb2FkZXJFbGVtZW50KTtcblxuICBwb3B1bGF0ZUVsZW1lbnRzKFtcbiAgICB7XG4gICAgICBlbGVtZW50OiBsb2FkZXIsXG4gICAgICBzdHJpbmc6IG1rRWxlbVdpdGhTdmdMb29rdXAoJ2xvZ28nKSxcbiAgICB9LFxuICBdKTtcbn07XG5cbmNvbnN0IHJlbW92ZUxvYWRlciA9IChsb2FkZXJFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvYWRlckVsZW1lbnQpO1xuICBjb25zdCBsb2FkZXJMb2FkZWRDbGFzcyA9IGAke2xvYWRlckVsZW1lbnR9LS1sb2FkZWRgO1xuICBhZGRDbGFzcyhsb2FkZXIsIGxvYWRlckxvYWRlZENsYXNzKTtcblxuICAvLyBSZW1vdmUgbG9hZGVyIGFmdGVyIGNvbXBsZXRpb24gb2YgYW5pbWF0aW9uLlxuICBpZiAobG9hZGVyKSB7XG4gICAgbG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHJlbW92ZUVsZW1lbnQobG9hZGVyKSk7XG4gICAgbG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdEFuaW1hdGlvbkVuZCcsICgpID0+IHJlbW92ZUVsZW1lbnQobG9hZGVyKSk7XG4gICAgbG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ29hbmltYXRpb25lbmQnLCAoKSA9PiByZW1vdmVFbGVtZW50KGxvYWRlcikpO1xuICB9XG59O1xuXG4vLyBDcmVhdGVzIGEgbG9hZGVyIGVsZW1lbnQgaW4gdGhlIERPTSwgdGhlbiByZXNvbHZlcyBhIHBhc3NlZCBwcm9taXNlIGFuZCByZW1vdmVzXG4vLyB0aGUgbG9hZGVyIG9uY2UgY29tcGxldGUuIFRoZSBsb2FkZXIgaXMgZGlzcGxheWVkIG9ubHkgYWZ0ZXIgdGhlIHBhc3NlZCBkZWxheVxuLy8gaGFzIGVsYXBzZWQuXG5jb25zdCB3aXRoTG9hZGVyID0gKHByb21pc2UsIHsgbG9hZGVyRWxlbWVudCA9IGRlZmF1bHRMb2FkZXJDb250YWluZXIsIGRlbGF5ID0gMTAwMCB9ID0ge30pID0+IHtcbiAgY29uc3QgbG9hZGVyVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiBhZGRMb2FkZXIobG9hZGVyRWxlbWVudCksIGRlbGF5KTtcbiAgcmV0dXJuIHByb21pc2UuZmluYWxseSgoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KGxvYWRlclRpbWVvdXRJZCk7XG4gICAgcmVtb3ZlTG9hZGVyKGxvYWRlckVsZW1lbnQpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IHdpdGhMb2FkZXIgfTtcbiIsImltcG9ydCB7IGZldGNoRGF0YSwgaGFzUHJvZHVjdFJldmlld3MgfSBmcm9tICcuL2ZldGNoRGF0YSc7XG5pbXBvcnQgeyBhcGlDYWxsIH0gZnJvbSAnLi9jYWxsJztcbmltcG9ydCBSZXZpZXdGZXRjaGVyIGZyb20gJy4vcmV2aWV3RmV0Y2hlcic7XG5cbi8qKlxuICogRmV0Y2hlcyBkYXRhIGZvciBhIHByb2R1Y3QgYXR0cmlidXRlIFRydXN0Qm94LlxuICpcbiAqIFRoaXMgdXNlcyBhIFwibmV3LXN0eWxlXCIgZW5kcG9pbnQsIHdoaWNoIHRha2VzIGEgdGVtcGxhdGVJZCBhbmQgc3VwcGxpZXMgZGF0YVxuICogYmFzZWQgb24gdGhhdC5cbiAqL1xuY29uc3QgZmV0Y2hQcm9kdWN0RGF0YSA9ICh0ZW1wbGF0ZUlkKSA9PiAoXG4gIGZldGNoUGFyYW1zLFxuICBjb25zdHJ1Y3RUcnVzdEJveCxcbiAgcGFzc1RvUG9wdXAgPSBmYWxzZSxcbiAgaW5jbHVkZUltcG9ydGVkUmV2aWV3cyA9IGZhbHNlXG4pID0+IHtcbiAgLy8gQWRkIGV4dHJhIGRhdGEgdG8gdGhlIGNvbnN0cnVjdFRydXN0Qm94IGNhbGxiYWNrLCB3aGVyZSB3ZSBhcmUgZmV0Y2hpbmcgcmV2aWV3c1xuICBjb25zdCB3cmFwcGVkQ29uc3RydWN0ID0gKHsgYmFzZURhdGEsIGxvY2FsZSwgLi4uYXJncyB9KSA9PiB7XG4gICAgY29uc3QgZmV0Y2hlciA9IG5ldyBSZXZpZXdGZXRjaGVyKHtcbiAgICAgIGJhc2VEYXRhLFxuICAgICAgaW5jbHVkZUltcG9ydGVkUmV2aWV3cyxcbiAgICAgIHJldmlld3NQZXJQYWdlOiBwYXJzZUludChmZXRjaFBhcmFtcy5yZXZpZXdzUGVyUGFnZSksXG4gICAgICBsb2NhbGUsXG4gICAgICAuLi5hcmdzLFxuICAgIH0pO1xuICAgIHJldHVybiBmZXRjaGVyLmNvbnN1bWVSZXZpZXdzKGNvbnN0cnVjdFRydXN0Qm94KSgpO1xuICB9O1xuXG4gIGNvbnN0IGNvbnN0cnVjdCA9IGZldGNoUGFyYW1zLnJldmlld3NQZXJQYWdlID4gMCA/IHdyYXBwZWRDb25zdHJ1Y3QgOiBjb25zdHJ1Y3RUcnVzdEJveDtcbiAgZmV0Y2hEYXRhKGAvdHJ1c3Rib3gtZGF0YS8ke3RlbXBsYXRlSWR9YCkoZmV0Y2hQYXJhbXMsIGNvbnN0cnVjdCwgcGFzc1RvUG9wdXAsIGhhc1Byb2R1Y3RSZXZpZXdzKTtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBwcm9kdWN0IHJldmlldyBkYXRhIGdpdmVuIGFuIElEIGFuZCBhIGxvY2FsZS5cbiAqL1xuY29uc3QgZmV0Y2hQcm9kdWN0UmV2aWV3ID0gKFxuICBwcm9kdWN0UmV2aWV3SWQsXG4gIGxvY2FsZSxcbiAgY2FsbGJhY2tcbikgPT4ge1xuICBhcGlDYWxsKGAvcHJvZHVjdC1yZXZpZXdzLyR7cHJvZHVjdFJldmlld0lkfWAsIHsgbG9jYWxlIH0pLnRoZW4oY2FsbGJhY2spO1xufVxuXG5leHBvcnQge1xuICBmZXRjaFByb2R1Y3REYXRhLFxuICBmZXRjaFByb2R1Y3RSZXZpZXdcbn07XG4iLCJpbXBvcnQgeyBtYXBPYmplY3QsIHBpcGVNYXliZSwgcHJvbWlzZUFsbE9iamVjdCwgcHJvcCB9IGZyb20gJy4uLy4uL2ZuJztcbmltcG9ydCB7IGFwaUNhbGwgfSBmcm9tICcuLi9jYWxsJztcbmltcG9ydCB7IGdldE5leHRQYWdlTGlua3MgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IFJlc3BvbnNlUHJvY2Vzc29yIGZyb20gJy4vcmVzcG9uc2VQcm9jZXNzb3InO1xuXG5jb25zdCBOT19SRVZJRVdTX0VSUk9SID0gJ05vIHJldmlld3MgYXZhaWxhYmxlJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIHJldmlld3Mgb24gcmVxdWVzdCBvZiBhIGNvbnN1bWVyLiBJdCBjb2xsZWN0cyByZXZpZXdzXG4gKiB0aHJvdWdoIHBhZ2luYXRlZCBBUEkgY2FsbHMsIGFuZCB0aGVuIHByb3ZpZGVzIG9uZSBwYWdlIG9mIHJldmlld3Mgb24gcmVxdWVzdFxuICogZnJvbSB0aGUgY29uc3VtZXIuXG4gKlxuICogVGhyZWUgbWV0aG9kcyBhcmUgZXhwb3NlZCBhcyBpbnRlbmRlZCBmb3IgdXNlOiB7QGxpbmsgUmV2aWV3RmV0Y2hlciNjb25zdW1lUmV2aWV3c30sXG4gKiB7QGxpbmsgUmV2aWV3RmV0Y2hlciNwcm9kdWNlUmV2aWV3c30sIGFuZCB7QGxpbmsgUmV2aWV3RmV0Y2hlciNoYXNNb3JlUmV2aWV3c30uIE90aGVyXG4gKiBtZXRob2RzIHNob3VsZCBiZSBjb25zaWRlcmVkIHByaXZhdGUuXG4gKi9cbmNsYXNzIFJldmlld0ZldGNoZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgUmV2aWV3RmV0Y2hlci5cbiAgICpcbiAgICogVGhlIGNvbnN0cnVjdG9yIHRha2VzIGFuIG9iamVjdCBjb250YWluaW5nIG9wdGlvbnMgYW5kIGRhdGEgcmVxdWlyZWQgdG9cbiAgICogb2J0YWluIGFuZCBwcm9kdWNlIHJldmlld3MgZm9yIGNvbnN1bXB0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBhcmd1bWVudHMgYmVsb3cuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhcmdzLnJldmlld3NQZXJQYWdlIC0gVGhlIG51bWJlciBvZiByZXZpZXdzIHRvIHByb3ZpZGUgcGVyXG4gICAqIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYXJncy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzIC0gV2hldGhlciB0byBpbmNsdWRlIGltcG9ydGVkXG4gICAqIHJldmlld3MgaW4gdGhlIHJldmlld3MgcHJvdmlkZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzLmJhc2VEYXRhIC0gVGhlIGJhc2VEYXRhIHJlc3BvbnNlIHJlY2VpdmVkIGZyb20gYSBiYXNlLWRhdGFcbiAgICogY2FsbC5cbiAgICogQHBhcmFtIHsuLi5PYmplY3R9IGFyZ3Mud3JhcEFyZ3MgLSBBbiBhcmJpdHJhcnkgc2V0IG9mIGFyZ3VtZW50cyB0byBhZGQgdG9cbiAgICogdGhlIGRhdGEgcHJvdmlkZWQgdG8gdGhlIGNhbGxiYWNrIGluIHtAbGluayBSZXZpZXdGZXRjaGVyI2NvbnN1bWVSZXZpZXdzfS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgcmV2aWV3c1BlclBhZ2UsIGluY2x1ZGVJbXBvcnRlZFJldmlld3MsIGJhc2VEYXRhLCAuLi53cmFwQXJncyB9KSB7XG4gICAgLy8gR2V0IG5leHQgcGFnZSBsaW5rcyBmcm9tIGEgYmFzZSBkYXRhIHJlc3BvbnNlLlxuICAgIGNvbnN0IGdldEJhc2VEYXRhTmV4dFBhZ2VMaW5rcyA9IGdldE5leHRQYWdlTGlua3MoKHJlc3BvbnNlS2V5KSA9PlxuICAgICAgcGlwZU1heWJlKHByb3AocmVzcG9uc2VLZXkpLCBwcm9wKCdsaW5rcycpLCBwcm9wKCduZXh0UGFnZScpKVxuICAgICk7XG5cbiAgICB0aGlzLnJldmlld3NQZXJQYWdlID0gcmV2aWV3c1BlclBhZ2U7XG4gICAgdGhpcy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzID0gaW5jbHVkZUltcG9ydGVkUmV2aWV3cztcbiAgICB0aGlzLmJhc2VEYXRhID0gYmFzZURhdGE7XG4gICAgdGhpcy5uZXh0UGFnZSA9IGdldEJhc2VEYXRhTmV4dFBhZ2VMaW5rcyhiYXNlRGF0YSwgaW5jbHVkZUltcG9ydGVkUmV2aWV3cyk7XG4gICAgdGhpcy53cmFwQXJncyA9IHdyYXBBcmdzO1xuXG4gICAgdGhpcy5yZXZpZXdzID0gdGhpcy5fbWFrZVJlc3BvbnNlUHJvY2Vzc29yKGJhc2VEYXRhKS5nZXRSZXZpZXdzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3VtZSBhIG51bWJlciBvZiByZXZpZXdzIHVzaW5nIGEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGdldHMgb25lIHBhZ2Ugb2YgcmV2aWV3cywgYW5kIGNvbWJpbmVzIHRoaXMgd2l0aCB0aGUgZGF0YSBpblxuICAgKiB0aGUgd3JhcEFyZ3MgZmllbGQgYW5kIHBhc3NlcyBpdCBhbGwgdG8gYSBjYWxsYmFjay4gVGhlIHJldHVybiB2YWx1ZSBpc1xuICAgKiB3cmFwcGVkIGluIGFuIGFub255bW91cyBmdW5jdGlvbiB0byBtYWtlIGl0IHN1aXRhYmxlIGZvciB1c2Ugd2l0aGluIGV2ZW50XG4gICAqIGhhbmRsZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEEgZnVuY3Rpb24gdG8gY2FsbCB3aXRoIGEgc2V0IG9mIHJldmlldyBkYXRhLlxuICAgKi9cbiAgY29uc3VtZVJldmlld3MoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gKCkgPT5cbiAgICAgIHRoaXMucHJvZHVjZVJldmlld3MoKVxuICAgICAgICAudGhlbigocmV2aWV3cykgPT5cbiAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAuLi50aGlzLndyYXBBcmdzLFxuICAgICAgICAgICAgYmFzZURhdGE6IHRoaXMuYmFzZURhdGEsXG4gICAgICAgICAgICByZXZpZXdzLFxuICAgICAgICAgICAgaGFzTW9yZVJldmlld3M6IHRoaXMuaGFzTW9yZVJldmlld3MsXG4gICAgICAgICAgICBsb2FkTW9yZVJldmlld3M6IHRoaXMuY29uc3VtZVJldmlld3MuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVyciA9PT0gTk9fUkVWSUVXU19FUlJPUikge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgLi4udGhpcy53cmFwQXJncyxcbiAgICAgICAgICAgICAgYmFzZURhdGE6IHRoaXMuYmFzZURhdGEsXG4gICAgICAgICAgICAgIHJldmlld3M6IFtdLFxuICAgICAgICAgICAgICBoYXNNb3JlUmV2aWV3czogZmFsc2UsXG4gICAgICAgICAgICAgIGxvYWRNb3JlUmV2aWV3czogdGhpcy5jb25zdW1lUmV2aWV3cy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldGhyb3cgZXJyb3Igd2hpY2ggaXMgdW5leHBlY3RlZFxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZSBhIG51bWJlciBvZiByZXZpZXdzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBwcm9kdWNlcyBvbmUgcGFnZSBvZiByZXZpZXdzLiBJdCBtYXkgcmVxdWlyZSB0byBmZXRjaCBhZGRpdGlvbmFsXG4gICAqIHJldmlld3MgZnJvbSBhbiBBUEkgaWYgdGhlcmUgYXJlIGluc3VmZmljZW50IHJldmlld3MgYXZhaWxhYmxlIGxvY2FsbHkuIFRoZVxuICAgKiByZXZpZXdzIGFyZSB0aHVzIHJldHVybmVkIHdyYXBwZWQgaW4gYSBQcm9taXNlLlxuICAgKi9cbiAgcHJvZHVjZVJldmlld3MoKSB7XG4gICAgY29uc3QgcHJvY2Vzc1Jlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZVByb2Nlc3NvciA9IHRoaXMuX21ha2VSZXNwb25zZVByb2Nlc3NvcihyZXNwb25zZSk7XG4gICAgICB0aGlzLm5leHRQYWdlID0gcmVzcG9uc2VQcm9jZXNzb3IuZ2V0TmV4dFBhZ2VMaW5rcygpO1xuICAgICAgdGhpcy5yZXZpZXdzLnB1c2goLi4ucmVzcG9uc2VQcm9jZXNzb3IuZ2V0UmV2aWV3cygpKTtcbiAgICAgIHJldHVybiB0aGlzLl90YWtlUmV2aWV3cygpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5yZXZpZXdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBhdC9jb21wYXRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChOT19SRVZJRVdTX0VSUk9SKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmV2aWV3c1BlclBhZ2UgPj0gdGhpcy5yZXZpZXdzLmxlbmd0aFxuICAgICAgPyB0aGlzLl9mZXRjaFJldmlld3MoKS50aGVuKHByb2Nlc3NSZXNwb25zZSlcbiAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBhdC9jb21wYXRcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3Rha2VSZXZpZXdzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYWcgd2hldGhlciBtb3JlIHJldmlld3MgYXJlIGF2YWlsYWJsZSBmb3IgY29uc3VtcHRpb24uXG4gICAqXG4gICAqIFdoZXJlIHRydWUsIHRoaXMgbWVhbnMgaXQgaXMgcG9zc2libGUgdG8gbG9hZCBtb3JlIHJldmlld3MuIElmIGZhbHNlLCBub1xuICAgKiBtb3JlIHJldmlld3MgYXJlIGF2YWlsYWJsZS5cbiAgICovXG4gIGdldCBoYXNNb3JlUmV2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXZpZXdzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvLyBQcml2YXRlIE1ldGhvZHMgLy9cblxuICAvKipcbiAgICogVGFrZSBhIHBhZ2Ugb2YgcmV2aWV3cyBmcm9tIGludGVybmFsIGNhY2hlIG9mIHJldmlld3MsIHJlbW92aW5nIHRoZXNlIGFuZFxuICAgKiByZXR1cm5pbmcgdGhlbSBmcm9tIHRoZSBtZXRob2QuXG4gICAqL1xuICBfdGFrZVJldmlld3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmV2aWV3cy5zcGxpY2UoMCwgdGhpcy5yZXZpZXdzUGVyUGFnZSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbW9yZSByZXZpZXdzIGZyb20gdGhlIEFQSS5cbiAgICovXG4gIF9mZXRjaFJldmlld3MoKSB7XG4gICAgcmV0dXJuIHByb21pc2VBbGxPYmplY3QobWFwT2JqZWN0KGFwaUNhbGwsIHRoaXMubmV4dFBhZ2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSB7QGxpbmsgUmVzcG9uc2VQcm9jZXNzb3J9IGluc3RhbmNlIHVzaW5nIHByb3BlcnRpZXMgZnJvbSB0aGlzIGluc3RhbmNlLlxuICAgKi9cbiAgX21ha2VSZXNwb25zZVByb2Nlc3NvcihyZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2VQcm9jZXNzb3IocmVzcG9uc2UsIHtcbiAgICAgIGluY2x1ZGVJbXBvcnRlZFJldmlld3M6IHRoaXMuaW5jbHVkZUltcG9ydGVkUmV2aWV3cyxcbiAgICAgIGRpc3BsYXlOYW1lOiB0aGlzLmJhc2VEYXRhLmJ1c2luZXNzRW50aXR5LmRpc3BsYXlOYW1lLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJldmlld0ZldGNoZXI7XG4iLCJpbXBvcnQgeyBndWFyZCwgcGlwZU1heWJlLCByZWplY3ROdWxsYXJ5VmFsdWVzIH0gZnJvbSAnLi4vLi4vZm4nO1xuXG4vKipcbiAqIEdldCBuZXh0IHBhZ2UgbGlua3MgZnJvbSBhIHJlc3BvbnNlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZSBhIGdldHRlciBmdW5jdGlvbiwgdXNlZCB0byBleHRyYWN0IGEgcGFydGljdWxhciB0eXBlIG9mIGxpbmssXG4gKiBlaXRoZXIgZm9yIHByb2R1Y3RSZXZpZXdzIG9yIGltcG9ydGVkUHJvZHVjdFJldmlld3MuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB3aGljaFxuICogdGFrZSBhIHJlc3BvbnNlIGFuZCBhIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0byBpbmNsdWRlIGltcG9ydGVkIHJldmlld3MuIFRoaXNcbiAqIGNhbiB0aGVuIGJlIGNhbGxlZCB0byBvYnRhaW4gYXZhaWxhYmxlIG5leHQgcGFnZSBsaW5rcy5cbiAqL1xuY29uc3QgZ2V0TmV4dFBhZ2VMaW5rcyA9IChnZXR0ZXIpID0+IChyZXNwb25zZSwgaW5jbHVkZUltcG9ydGVkUmV2aWV3cyA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RSZXZpZXdzID0gZ2V0dGVyKCdwcm9kdWN0UmV2aWV3cycpKHJlc3BvbnNlKTtcbiAgY29uc3QgaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cyA9IHBpcGVNYXliZShcbiAgICBndWFyZChpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzKSxcbiAgICBnZXR0ZXIoJ2ltcG9ydGVkUHJvZHVjdFJldmlld3MnKVxuICApKHJlc3BvbnNlKTtcbiAgcmV0dXJuIHJlamVjdE51bGxhcnlWYWx1ZXMoe1xuICAgIHByb2R1Y3RSZXZpZXdzLFxuICAgIGltcG9ydGVkUHJvZHVjdFJldmlld3MsXG4gIH0pO1xufTtcblxuZXhwb3J0IHsgZ2V0TmV4dFBhZ2VMaW5rcyB9O1xuIiwiaW1wb3J0IHsgZmluZCwgZ3VhcmQsIG1hcCwgcGlwZU1heWJlLCBwcm9wLCBwcm9wTWF5YmUgfSBmcm9tICcuLi8uLi9mbic7XG5pbXBvcnQgeyBnZXROZXh0UGFnZUxpbmtzIH0gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHByb2Nlc3NlcyBhbiBBUEkgcmVzcG9uc2UgY29udGFpbmluZyByZXZpZXdzIGFuZCBwYWdpbmF0aW9uXG4gKiBkYXRhLlxuICovXG5jbGFzcyBSZXZpZXdSZXNwb25zZVByb2Nlc3NvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBSZXZpZXdSZXNwb25zZVByb2Nlc3NvciBpbnN0YW5jZS5cbiAgICpcbiAgICogVGFrZXMgYW4gQVBJIHJlc3BvbnNlIG9iamVjdCBmb3IgcHJvY2Vzc2luZywgdG9nZXRoZXIgd2l0aCBhIHNob3J0IGxpc3RcbiAgICogb2Ygb3B0aW9ucyBmb3IgcHJvY2Vzc2luZyBhbmQgYW5ub3RhdGluZyByZXZpZXdzLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVzcG9uc2UsIHsgaW5jbHVkZUltcG9ydGVkUmV2aWV3cywgZGlzcGxheU5hbWUgfSkge1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLmluY2x1ZGVJbXBvcnRlZFJldmlld3MgPSBpbmNsdWRlSW1wb3J0ZWRSZXZpZXdzO1xuICAgIHRoaXMuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjb21iaW5lZCBsaXN0IG9mIHJldmlld3MgZnJvbSB0aGUgQVBJIHJlc3BvbnNlLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhbGwgcmV2aWV3cyBmcm9tIHRoZSByZXNwb25zZSwgaW5jbHVkaW5nIG9wdGlvbmFsbHlcbiAgICogaW1wb3J0ZWQgcmV2aWV3cywgYW5kIHRoZW4gY29tYmluZXMgYW5kIHNvcnRzIHRoZXNlIGJ5IGRhdGUsIGRlc2NlbmRpbmcuXG4gICAqL1xuICBnZXRSZXZpZXdzKCkge1xuICAgIGNvbnN0IHsgcHJvZHVjdFJldmlld3MsIGltcG9ydGVkUHJvZHVjdFJldmlld3MgfSA9IHRoaXMucmVzcG9uc2U7XG4gICAgY29uc3Qgb3JkZXJCeUNyZWF0ZWRBdERlc2MgPSAoeyBjcmVhdGVkQXQ6IGMxIH0sIHsgY3JlYXRlZEF0OiBjMiB9KSA9PlxuICAgICAgbmV3IERhdGUoYzIpIC0gbmV3IERhdGUoYzEpO1xuICAgIGNvbnN0IHByb2R1Y3RSZXZpZXdzTGlzdCA9XG4gICAgICBwaXBlTWF5YmUocHJvcE1heWJlKCdwcm9kdWN0UmV2aWV3cycpLCBwcm9wTWF5YmUoJ3Jldmlld3MnKSkocHJvZHVjdFJldmlld3MpIHx8IFtdO1xuXG4gICAgY29uc3QgaW1wb3J0ZWRSZXZpZXdzTGlzdCA9XG4gICAgICBwaXBlTWF5YmUoXG4gICAgICAgIGd1YXJkKHRoaXMuaW5jbHVkZUltcG9ydGVkUmV2aWV3cyksXG4gICAgICAgIHByb3BNYXliZSgnaW1wb3J0ZWRQcm9kdWN0UmV2aWV3cycpLFxuICAgICAgICBwcm9wTWF5YmUoJ3Byb2R1Y3RSZXZpZXdzJyksXG4gICAgICAgIG1hcCgocmV2aWV3KSA9PiAoe1xuICAgICAgICAgIC4uLnJldmlldyxcbiAgICAgICAgICB2ZXJpZmllZEJ5OiByZXZpZXcudHlwZSA9PT0gJ0V4dGVybmFsJ1xuICAgICAgICAgICAgPyByZXZpZXcuc291cmNlXG4gICAgICAgICAgICAgID8gcmV2aWV3LnNvdXJjZS5uYW1lXG4gICAgICAgICAgICAgIDogdGhpcy5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgOiB0aGlzLmRpc3BsYXlOYW1lLFxuICAgICAgICB9KSksXG4gICAgICApKGltcG9ydGVkUHJvZHVjdFJldmlld3MpIHx8IFtdO1xuXG4gICAgcmV0dXJuIFsuLi5wcm9kdWN0UmV2aWV3c0xpc3QsIC4uLmltcG9ydGVkUmV2aWV3c0xpc3RdLnNvcnQob3JkZXJCeUNyZWF0ZWRBdERlc2MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBvYmplY3QgY29udGFpbmluZyBsaW5rcyB0byB0aGUgbmV4dCBwYWdlIFVSSXMgY29udGFpbmVkIHdpdGhpbiB0aGVcbiAgICogQVBJIHJlc3BvbnNlLlxuICAgKi9cbiAgZ2V0TmV4dFBhZ2VMaW5rcygpIHtcbiAgICAvLyBHZXQgbmV4dCBwYWdlIGxpbmtzIGZyb20gYSBwYWdpbmF0aW9uIHJlc3BvbnNlLlxuICAgIGNvbnN0IGdldE9sZFBhZ2luYXRpb25OZXh0UGFnZUxpbmtzID0gZ2V0TmV4dFBhZ2VMaW5rcygocmVzcG9uc2VLZXkpID0+XG4gICAgICBwaXBlTWF5YmUoXG4gICAgICAgIHByb3AocmVzcG9uc2VLZXkpLFxuICAgICAgICBwcm9wKCdsaW5rcycpLFxuICAgICAgICBmaW5kKChsaW5rKSA9PiBsaW5rLnJlbCA9PT0gJ25leHQtcGFnZScpLFxuICAgICAgICBwcm9wKCdocmVmJyksXG4gICAgICApLFxuICAgICk7XG5cbiAgICBjb25zdCBnZXROZXdQYWdpbmF0aW9uTmV4dFBhZ2VMaW5rcyA9IGdldE5leHRQYWdlTGlua3MoKHJlc3BvbnNlS2V5KSA9PlxuICAgICAgcGlwZU1heWJlKHByb3AocmVzcG9uc2VLZXkpLCBwcm9wKHJlc3BvbnNlS2V5KSwgcHJvcCgnbGlua3MnKSwgcHJvcCgnbmV4dFBhZ2UnKSksXG4gICAgKTtcblxuICAgIGNvbnN0IG5ld0xpbmtzID0gZ2V0TmV3UGFnaW5hdGlvbk5leHRQYWdlTGlua3ModGhpcy5yZXNwb25zZSwgdGhpcy5pbmNsdWRlSW1wb3J0ZWRSZXZpZXdzKTtcbiAgICBjb25zdCBvbGRMaW5rcyA9IGdldE9sZFBhZ2luYXRpb25OZXh0UGFnZUxpbmtzKHRoaXMucmVzcG9uc2UsIHRoaXMuaW5jbHVkZUltcG9ydGVkUmV2aWV3cyk7XG5cbiAgICByZXR1cm4geyAuLi5vbGRMaW5rcywgLi4ubmV3TGlua3MgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXZpZXdSZXNwb25zZVByb2Nlc3NvcjtcbiIsIi8qIFRoaXMgbW9kdWxlIGRlZmluZXMgYSBudW1iZXIgb2YgU1ZHIGVsZW1lbnRzLlxuICpcbiAqIElFMTEgZG9lcyBub3QgcHJvcGVybHkgZGlzcGxheSBTVkcgdGFncywgZXhjZXB0IHVzaW5nIG9uZSBvZiBzZXZlcmFsIGhhY2tzLlxuICogU28sIHdlIHVzZSBvbmUgYmVsb3c6IHdlIHdyYXAgZWFjaCBTVkcgaW4gYSBkaXYgZWxlbWVudCwgd2l0aCBwYXJ0aWN1bGFyXG4gKiBzdHlsaW5nIGF0dGFjaGVkLiBXZSBkbyB0aGlzIGZvbGxvd2luZyBPcHRpb24gNCBpbiB0aGUgYXJ0aWNsZSBhdFxuICogaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zY2FsZS1zdmcvLlxuICovXG5cbmltcG9ydCB7IHNhbml0aXplSHRtbCwgc2FuaXRpemVDb2xvciB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3ZnU3RhclN0eWxlID0gJ3N0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBsZWZ0OiAwOyB0b3A6IDA7XCInO1xuXG5jb25zdCB3cmFwU3ZnID0gKGRpbWVuc2lvbnMsIGlubmVyLCBwcm9wcyA9IHt9KSA9PiB7XG4gIGNvbnN0IHNhbml0aXplZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcbiAgICBhY2NbY3VyXSA9IHNhbml0aXplSHRtbChwcm9wc1tjdXJdKTtcbiAgICBpZiAoY3VyID09PSAnY29sb3InKSB7XG4gICAgICBhY2NbY3VyXSA9IHNhbml0aXplQ29sb3IoYWNjW2N1cl0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBgXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgaGVpZ2h0OiAwOyB3aWR0aDogMTAwJTsgcGFkZGluZzogMDsgcGFkZGluZy1ib3R0b206ICR7KGRpbWVuc2lvbnMuaGVpZ2h0IC9cbiAgICAgIGRpbWVuc2lvbnMud2lkdGgpICpcbiAgICAgIDEwMH0lO1wiPlxuICAgICAgJHtpbm5lcihkaW1lbnNpb25zLCBzYW5pdGl6ZWRQcm9wcyl9XG4gICAgPC9kaXY+XG4gIGA7XG59O1xuXG5jb25zdCBTQ0FMRV9ESU1FTlNJT05TXzgweDE1ID0gJzgweDE1JztcbmNvbnN0IFNDQUxFX0RJTUVOU0lPTlNfOTB4MTYgPSAnOTB4MTYnO1xuY29uc3QgU0NBTEVfRElNRU5TSU9OU18xMDV4MTkgPSAnMTA1eDE5JztcblxuY29uc3QgU0NBTEVfU1ZHX1BST1BTID0ge1xuICBbU0NBTEVfRElNRU5TSU9OU184MHgxNV06IHtcbiAgICBkaW1lbnNpb25zOiB7IHdpZHRoOiA4MCwgaGVpZ2h0OiAxNSB9LFxuICAgIGxpbmVzOiBbXG4gICAgICB7IHgxOiA4MCwgeTE6IDcuNSwgeDI6IDAsIHkyOiA3LjUgfSxcbiAgICAgIHsgeDE6IDAuNSwgeTE6IDMuNSwgeDI6IDAuNSwgeTI6IDExLjUgfSxcbiAgICAgIHsgeDE6IDIwLjUsIHkxOiA2LCB4MjogMjAuNSwgeTI6IDkgfSxcbiAgICAgIHsgeDE6IDQwLjUsIHkxOiA2LCB4MjogNDAuNSwgeTI6IDkgfSxcbiAgICAgIHsgeDE6IDYwLjUsIHkxOiA2LCB4MjogNjAuNSwgeTI6IDkgfSxcbiAgICAgIHsgeDE6IDgwLCB5MTogMy41LCB4MjogODAsIHkyOiAxMS41IH0sXG4gICAgXSxcbiAgICBzdGFyczogW1xuICAgICAge1xuICAgICAgICB4OiAxLjUsXG4gICAgICAgIHc6IDE0LFxuICAgICAgICBoOiAxNCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTkuNzYxMyA2LjAyNTk0SDEzLjcyMDVMMTAuNTMxNiA4LjI5MzE2TDguNTU5NjggOS42ODM3Mkw1LjM1NTM1IDExLjk1MDlMNi41NzIzOCA4LjI5MzE2TDMuMzY4MDQgNi4wMjU5NEg3LjMyNzI0TDguNTQ0MjcgMi4zNjgxNkw5Ljc2MTMgNi4wMjU5NFpNMTAuNzkzNSA5LjE0MDExTDguNTQ0MjkgOS42OTkzNkwxMS43MzMyIDExLjk4MTdMMTAuNzkzNSA5LjE0MDExWlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMTMuNSxcbiAgICAgICAgdzogMTQsXG4gICAgICAgIGg6IDE0LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjEuNzYxNSA2LjAyNjA2SDI1LjcyMDhMMjIuNTMxOCA4LjI5MzI4TDIwLjU1OTkgOS42ODM4NEwxNy4zNTU2IDExLjk1MTFMMTguNTcyNiA4LjI5MzI4TDE1LjM2ODMgNi4wMjYwNkgxOS4zMjc1TDIwLjU0NDUgMi4zNjgyOUwyMS43NjE1IDYuMDI2MDZaTTIyLjc5MzggOS4xNDAzNEwyMC41NDQ2IDkuNjk5NTlMMjMuNzMzNSAxMS45ODE5TDIyLjc5MzggOS4xNDAzNFpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDEzLjUsXG4gICAgICAgIHc6IDE0LFxuICAgICAgICBoOiAxNCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIxLjc2MTUgNi4wMjYwNkgyNS43MjA4TDIyLjUzMTggOC4yOTMyOEwyMC41NTk5IDkuNjgzODRMMTcuMzU1NiAxMS45NTExTDE4LjU3MjYgOC4yOTMyOEwxNS4zNjgzIDYuMDI2MDZIMTkuMzI3NUwyMC41NDQ1IDIuMzY4MjlMMjEuNzYxNSA2LjAyNjA2Wk0yMi43OTM4IDkuMTQwMzRMMjAuNTQ0NiA5LjY5OTU5TDIzLjczMzUgMTEuOTgxOUwyMi43OTM4IDkuMTQwMzRaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAzMy41LFxuICAgICAgICB3OiAxNCxcbiAgICAgICAgaDogMTQsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk00MS43NjE1IDYuMDI2MDZINDUuNzIwOEw0Mi41MzE4IDguMjkzMjhMNDAuNTU5OSA5LjY4Mzg0TDM3LjM1NTYgMTEuOTUxMUwzOC41NzI2IDguMjkzMjhMMzUuMzY4MyA2LjAyNjA2SDM5LjMyNzVMNDAuNTQ0NSAyLjM2ODI5TDQxLjc2MTUgNi4wMjYwNlpNNDIuNzkzOCA5LjE0MDM0TDQwLjU0NDYgOS42OTk1OUw0My43MzM1IDExLjk4MTlMNDIuNzkzOCA5LjE0MDM0WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogNjQuNSxcbiAgICAgICAgdzogMTQsXG4gICAgICAgIGg6IDE0LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNzIuNzYxNSA2LjAyNjA2SDc2LjcyMDhMNzMuNTMxOCA4LjI5MzI4TDcxLjU1OTkgOS42ODM4NEw2OC4zNTU2IDExLjk1MTFMNjkuNTcyNiA4LjI5MzI4TDY2LjM2ODMgNi4wMjYwNkg3MC4zMjc1TDcxLjU0NDUgMi4zNjgyOUw3Mi43NjE1IDYuMDI2MDZaTTczLjc5MzUgOS4xNDAyMkw3MS41NDQzIDkuNjk5NDdMNzQuNzMzMiAxMS45ODE4TDczLjc5MzUgOS4xNDAyMlpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgW1NDQUxFX0RJTUVOU0lPTlNfOTB4MTZdOiB7XG4gICAgZGltZW5zaW9uczogeyB3aWR0aDogOTAsIGhlaWdodDogMTYgfSxcbiAgICBsaW5lczogW1xuICAgICAgeyB4MTogOTAsIHkxOiA4LjUsIHgyOiAwLCB5MjogOC41IH0sXG4gICAgICB7IHgxOiAwLjUsIHkxOiA1LCB4MjogMC41LCB5MjogMTIgfSxcbiAgICAgIHsgeDE6IDIzLjIxODUsIHkxOiA3LCB4MjogMjMuMjE4NSwgeTI6IDEwIH0sXG4gICAgICB7IHgxOiA0NS41LCB5MTogNywgeDI6IDQ1LjUsIHkyOiAxMCB9LFxuICAgICAgeyB4MTogNjcuNzgxNSwgeTE6IDcsIHgyOiA2Ny43ODE1LCB5MjogMTAgfSxcbiAgICAgIHsgeDE6IDkwLCB5MTogNSwgeDI6IDkwLCB5MjogMTIgfSxcbiAgICBdLFxuICAgIHN0YXJzOiBbXG4gICAgICB7XG4gICAgICAgIHg6IDEuNSxcbiAgICAgICAgdzogMTUsXG4gICAgICAgIGg6IDE1LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTAuMzQ1NCA2LjQyNzY5SDE0LjU2ODVMMTEuMTY3IDguODQ2MDZMOS4wNjM2MyAxMC4zMjkzTDUuNjQ1NjcgMTIuNzQ3N0w2Ljk0Mzg0IDguODQ2MDZMMy41MjU4OCA2LjQyNzY5SDcuNzQ5MDNMOS4wNDcxOSAyLjUyNjA2TDEwLjM0NTQgNi40Mjc2OVpNMTEuNDQ2NCA5Ljc0OTQ4TDkuMDQ3MjcgMTAuMzQ2TDEyLjQ0ODggMTIuNzgwNUwxMS40NDY0IDkuNzQ5NDhaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAxNS41LFxuICAgICAgICB3OiAxNSxcbiAgICAgICAgaDogMTUsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yNC4zNDU2IDYuNDI3ODFIMjguNTY4OEwyNS4xNjcyIDguODQ2MThMMjMuMDYzOSAxMC4zMjk0TDE5LjY0NTkgMTIuNzQ3OEwyMC45NDQxIDguODQ2MThMMTcuNTI2MSA2LjQyNzgxSDIxLjc0OTNMMjMuMDQ3NCAyLjUyNjE4TDI0LjM0NTYgNi40Mjc4MVpNMjUuNDQ2NiA5Ljc0OTY3TDIzLjA0NzUgMTAuMzQ2MkwyNi40NDkgMTIuNzgwN0wyNS40NDY2IDkuNzQ5NjdaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAzNy41LFxuICAgICAgICB3OiAxNSxcbiAgICAgICAgaDogMTUsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk00Ni4zNDU2IDYuNDI3ODFINTAuNTY4OEw0Ny4xNjcyIDguODQ2MThMNDUuMDYzOSAxMC4zMjk0TDQxLjY0NTkgMTIuNzQ3OEw0Mi45NDQxIDguODQ2MThMMzkuNTI2MSA2LjQyNzgxSDQzLjc0OTNMNDUuMDQ3NCAyLjUyNjE4TDQ2LjM0NTYgNi40Mjc4MVpNNDcuNDQ2NiA5Ljc0OTY3TDQ1LjA0NzUgMTAuMzQ2Mkw0OC40NDkgMTIuNzgwN0w0Ny40NDY2IDkuNzQ5NjdaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiA2MC41LFxuICAgICAgICB3OiAxNSxcbiAgICAgICAgaDogMTUsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02OS4zNDU2IDYuNDI3ODFINzMuNTY4OEw3MC4xNjcyIDguODQ2MThMNjguMDYzOSAxMC4zMjk0TDY0LjY0NTkgMTIuNzQ3OEw2NS45NDQxIDguODQ2MThMNjIuNTI2MSA2LjQyNzgxSDY2Ljc0OTNMNjguMDQ3NCAyLjUyNjE4TDY5LjM0NTYgNi40Mjc4MVpNNzAuNDQ2NiA5Ljc0OTY3TDY4LjA0NzUgMTAuMzQ2Mkw3MS40NDkgMTIuNzgwN0w3MC40NDY2IDkuNzQ5NjdaXCIgZmlsbD1cIndoaXRlXCIvPicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiA3My41LFxuICAgICAgICB3OiAxNSxcbiAgICAgICAgaDogMTUsXG4gICAgICAgIHA6XG4gICAgICAgICAgJzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk04Mi4zNDU2IDYuNDI3ODFIODYuNTY4OEw4My4xNjcyIDguODQ2MThMODEuMDYzOSAxMC4zMjk0TDc3LjY0NTkgMTIuNzQ3OEw3OC45NDQxIDguODQ2MThMNzUuNTI2MSA2LjQyNzgxSDc5Ljc0OTNMODEuMDQ3NCAyLjUyNjE4TDgyLjM0NTYgNi40Mjc4MVpNODMuNDQ2NCA5Ljc0OTU3TDgxLjA0NzMgMTAuMzQ2MUw4NC40NDg4IDEyLjc4MDZMODMuNDQ2NCA5Ljc0OTU3WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBbU0NBTEVfRElNRU5TSU9OU18xMDV4MTldOiB7XG4gICAgZGltZW5zaW9uczogeyB3aWR0aDogMTA1LCBoZWlnaHQ6IDE5IH0sXG4gICAgbGluZXM6IFtcbiAgICAgIHsgeDE6IDEwNSwgeTE6IDEwLCB4MjogMCwgeTI6IDEwIH0sXG4gICAgICB7IHgxOiAwLjUsIHkxOiA2LCB4MjogMC41LCB5MjogMTQuMzEyNSB9LFxuICAgICAgeyB4MTogMjYuNSwgeTE6IDgsIHgyOiAyNi41LCB5MjogMTIgfSxcbiAgICAgIHsgeDE6IDUyLjUsIHkxOiA4LCB4MjogNTIuNSwgeTI6IDEyIH0sXG4gICAgICB7IHgxOiA3OC41LCB5MTogOCwgeDI6IDc4LjUsIHkyOiAxMiB9LFxuICAgICAgeyB4MTogMTA1LCB5MTogNiwgeDI6IDEwNSwgeTI6IDE0LjMxMjUgfSxcbiAgICBdLFxuICAgIHN0YXJzOiBbXG4gICAgICB7XG4gICAgICAgIHg6IDEuNSxcbiAgICAgICAgdzogMTgsXG4gICAgICAgIGg6IDE5LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIuMDk3NiA3LjYzMjg4SDE3LjExMjZMMTMuMDczMyAxMC41MDQ3TDEwLjU3NTYgMTIuMjY2MUw2LjUxNjc2IDE1LjEzNzlMOC4wNTgzNCAxMC41MDQ3TDMuOTk5NTEgNy42MzI4OEg5LjAxNDVMMTAuNTU2MSAyLjk5OTY5TDEyLjA5NzYgNy42MzI4OFpNMTMuNDA1MSAxMS41Nzc0TDEwLjU1NjEgMTIuMjg1OEwxNC41OTU0IDE1LjE3NjhMMTMuNDA1MSAxMS41Nzc0WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMTcuNTY4MixcbiAgICAgICAgdzogMTgsXG4gICAgICAgIGg6IDE4LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjguMTY2MSA3LjYzM0gzMy4xODExTDI5LjE0MTggMTAuNTA0OEwyNi42NDQxIDEyLjI2NjJMMjIuNTg1MiAxNS4xMzhMMjQuMTI2OCAxMC41MDQ4TDIwLjA2OCA3LjYzM0gyNS4wODNMMjYuNjI0NiAyLjk5OTgyTDI4LjE2NjEgNy42MzNaTTI5LjQ3MzYgMTEuNTc3N0wyNi42MjQ2IDEyLjI4NjFMMzAuNjYzOSAxNS4xNzcxTDI5LjQ3MzYgMTEuNTc3N1pcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDQzLjUsXG4gICAgICAgIHc6IDE4LFxuICAgICAgICBoOiAxOCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTU0LjA5NzkgNy42MzNINTkuMTEyOUw1NS4wNzM2IDEwLjUwNDhMNTIuNTc1OCAxMi4yNjYyTDQ4LjUxNyAxNS4xMzhMNTAuMDU4NiAxMC41MDQ4TDQ1Ljk5OTggNy42MzNINTEuMDE0N0w1Mi41NTYzIDIuOTk5ODJMNTQuMDk3OSA3LjYzM1pNNTUuNDA1NCAxMS41Nzc3TDUyLjU1NjQgMTIuMjg2MUw1Ni41OTU3IDE1LjE3NzFMNTUuNDA1NCAxMS41Nzc3WlwiIGZpbGw9XCJ3aGl0ZVwiLz4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogNjkuNzA0NixcbiAgICAgICAgdzogMTgsXG4gICAgICAgIGg6IDE4LFxuICAgICAgICBwOlxuICAgICAgICAgICc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNODAuMzAyNSA3LjYzM0g4NS4zMTc1TDgxLjI3ODIgMTAuNTA0OEw3OC43ODA0IDEyLjI2NjJMNzQuNzIxNiAxNS4xMzhMNzYuMjYzMiAxMC41MDQ4TDcyLjIwNDMgNy42MzNINzcuMjE5M0w3OC43NjA5IDIuOTk5ODJMODAuMzAyNSA3LjYzM1pNODEuNjEgMTEuNTc3N0w3OC43NjEgMTIuMjg2MUw4Mi44MDAzIDE1LjE3NzFMODEuNjEgMTEuNTc3N1pcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDg1Ljc3MjcsXG4gICAgICAgIHc6IDE4LFxuICAgICAgICBoOiAxOCxcbiAgICAgICAgcDpcbiAgICAgICAgICAnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTk2LjM3MDYgNy42MzNIMTAxLjM4Nkw5Ny4zNDYzIDEwLjUwNDhMOTQuODQ4NSAxMi4yNjYyTDkwLjc4OTcgMTUuMTM4TDkyLjMzMTMgMTAuNTA0OEw4OC4yNzI1IDcuNjMzSDkzLjI4NzRMOTQuODI5IDIuOTk5ODJMOTYuMzcwNiA3LjYzM1pNOTcuNjc3OCAxMS41Nzc2TDk0LjgyODkgMTIuMjg2TDk4Ljg2ODIgMTUuMTc3TDk3LjY3NzggMTEuNTc3NlpcIiBmaWxsPVwid2hpdGVcIi8+JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn07XG5cbmNvbnN0IGNyZWF0ZVNjYWxlTGluZXMgPSAoZGltZW5zaW9uSWQsIGNvbG9yKSA9PiB7XG4gIHJldHVybiBTQ0FMRV9TVkdfUFJPUFNbZGltZW5zaW9uSWRdLmxpbmVzLnJlZHVjZShcbiAgICAoYWNjLCB7IHgxLCB5MSwgeDIsIHkyIH0pID0+XG4gICAgICBgJHthY2N9PGxpbmUgeDE9XCIke3gxfVwiIHkxPVwiJHt5MX1cIiB4Mj1cIiR7eDJ9XCIgeTI9XCIke3kyfVwiIHN0cm9rZT1cIiR7Y29sb3J9XCIvPmAsXG4gICAgJydcbiAgKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVNjYWxlU3RhciA9IChkaW1lbnNpb25JZCwgcmF0aW5nLCBjb2xvcikgPT4ge1xuICBpZiAocmF0aW5nID09PSAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgeyB4LCB3LCBoLCBwIH0gPSBTQ0FMRV9TVkdfUFJPUFNbZGltZW5zaW9uSWRdLnN0YXJzW3JhdGluZyAtIDFdO1xuXG4gIHJldHVybiBgXG4gICAgPHJlY3QgeD1cIiR7eH1cIiB5PVwiMC41XCIgd2lkdGg9XCIke3d9XCIgaGVpZ2h0PVwiJHtofVwiIGZpbGw9XCIke2NvbG9yfVwiIHN0cm9rZT1cIiR7Y29sb3J9XCIvPlxuICAgICR7cH1cbiAgYDtcbn07XG5cbmNvbnN0IHNjYWxlID0gKGRpbWVuc2lvbnMsIHsgZGltZW5zaW9uSWQsIGNvbG9yLCByYXRpbmcgfSkgPT4gYFxuICA8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsbGVkYnk9XCJzY2FsZVJhdGluZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgJHtcbiAgICBkaW1lbnNpb25zLndpZHRoXG4gIH0gJHtkaW1lbnNpb25zLmhlaWdodH1cIj5cbiAgICAgIDxnIGNsYXNzPVwidHAtc3RhcnNcIj5cbiAgICAgICAgJHtjcmVhdGVTY2FsZUxpbmVzKGRpbWVuc2lvbklkLCBjb2xvcil9XG4gICAgICAgICR7Y3JlYXRlU2NhbGVTdGFyKGRpbWVuc2lvbklkLCByYXRpbmcsIGNvbG9yKX1cbiAgICAgIDwvZz5cbiAgPC9zdmc+YDtcblxuY29uc3QgZW1wdHlTdGFyQ29sb3IgPSAnI2RjZGNlNic7XG5jb25zdCBzdGFycyA9IChkaW1lbnNpb25zLCB7IHJhdGluZywgdHJ1c3RTY29yZSwgY29sb3IgfSkgPT4gYFxuICA8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsbGVkYnk9XCJzdGFyUmF0aW5nXCIgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7XG4gIGRpbWVuc2lvbnMuaGVpZ2h0XG59XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICR7c3ZnU3RhclN0eWxlfT5cbiAgICAgIDx0aXRsZSBpZD1cInN0YXJSYXRpbmdcIiBsYW5nPVwiZW5cIj4ke3RydXN0U2NvcmV9IG91dCBvZiBmaXZlIHN0YXIgcmF0aW5nIG9uIFRydXN0cGlsb3Q8L3RpdGxlPlxuICAgICAgPGcgY2xhc3M9XCJ0cC1zdGFyXCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXNcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAxICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTAgNDYuMzMwMDAyaDQ2LjM3NTU4NlYwSDB6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fc2hhcGVcIiBkPVwiTTM5LjUzMzkzNiAxOS43MTE0MzNMMTMuMjMwMjM5IDM4LjgwMDY1bDMuODM4MjE2LTExLjc5NzgyN0w3LjAyMTE1IDE5LjcxMTQzM2gxMi40MTg5NzVsMy44Mzc0MTctMTEuNzk4NjI0IDMuODM3NDE4IDExLjc5ODYyNGgxMi40MTg5NzV6TTIzLjI3ODUgMzEuNTEwMDc1bDcuMTgzNTk1LTEuNTA5NTc2IDIuODYyMTE0IDguODAwMTUyTDIzLjI3ODUgMzEuNTEwMDc1elwiIGZpbGw9XCIjRkZGXCIvPlxuICAgICAgPC9nPlxuICAgICAgPGcgY2xhc3M9XCJ0cC1zdGFyXCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXNcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAyICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTUxLjI0ODE2IDQ2LjMzMDAwMmg0Ni4zNzU1ODdWMEg1MS4yNDgxNjF6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fY2FudmFzLS1oYWxmXCIgZmlsbD1cIiR7XG4gICAgICAgICAgICByYXRpbmcgPj0gMS41ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTUxLjI0ODE2IDQ2LjMzMDAwMmgyMy4xODc3OTNWMEg1MS4yNDgxNjF6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fc2hhcGVcIiBkPVwiTTc0Ljk5MDk3OCAzMS4zMjk5MUw4MS4xNTA5MDggMzAgODQgMzlsLTkuNjYwMjA2LTcuMjAyNzg2TDY0LjMwMjc5IDM5bDMuODk1NjM2LTExLjg0MDY2Nkw1OCAxOS44NDE0NjZoMTIuNjA1NTc3TDc0LjQ5OTU5NSA4bDMuODk1NjM3IDExLjg0MTQ2Nkg5MUw3NC45OTA5NzggMzEuMzI5OTA5elwiIGZpbGw9XCIjRkZGXCIvPlxuICAgICAgPC9nPlxuICAgICAgPGcgY2xhc3M9XCJ0cC1zdGFyXCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXNcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSAzICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTEwMi41MzIyMDkgNDYuMzMwMDAyaDQ2LjM3NTU4NlYwaC00Ni4zNzU1ODZ6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fY2FudmFzLS1oYWxmXCIgZmlsbD1cIiR7XG4gICAgICAgICAgICByYXRpbmcgPj0gMi41ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTEwMi41MzIyMDkgNDYuMzMwMDAyaDIzLjE4Nzc5M1YwaC0yMy4xODc3OTN6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fc2hhcGVcIiBkPVwiTTE0Mi4wNjY5OTQgMTkuNzExNDMzTDExNS43NjMyOTggMzguODAwNjVsMy44MzgyMTUtMTEuNzk3ODI3LTEwLjA0NzMwNC03LjI5MTM5MWgxMi40MTg5NzVsMy44Mzc0MTgtMTEuNzk4NjI0IDMuODM3NDE3IDExLjc5ODYyNGgxMi40MTg5NzV6TTEyNS44MTE1NiAzMS41MTAwNzVsNy4xODM1OTUtMS41MDk1NzYgMi44NjIxMTMgOC44MDAxNTItMTAuMDQ1NzA4LTcuMjkwNTc2elwiIGZpbGw9XCIjRkZGXCIvPlxuICAgICAgPC9nPlxuICAgICAgPGcgY2xhc3M9XCJ0cC1zdGFyXCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXNcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA+PSA0ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTE1My44MTU0NTggNDYuMzMwMDAyaDQ2LjM3NTU4NlYwaC00Ni4zNzU1ODZ6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fY2FudmFzLS1oYWxmXCIgZmlsbD1cIiR7XG4gICAgICAgICAgICByYXRpbmcgPj0gMy41ICYmIGNvbG9yID8gY29sb3IgOiBlbXB0eVN0YXJDb2xvclxuICAgICAgICAgIH1cIiBkPVwiTTE1My44MTU0NTggNDYuMzMwMDAyaDIzLjE4Nzc5M1YwaC0yMy4xODc3OTN6XCIvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwidHAtc3Rhcl9fc2hhcGVcIiBkPVwiTTE5My4zNDgzNTUgMTkuNzExNDMzTDE2Ny4wNDU0NTcgMzguODAwNjVsMy44Mzc0MTctMTEuNzk3ODI3LTEwLjA0NzMwMy03LjI5MTM5MWgxMi40MTg5NzRsMy44Mzc0MTgtMTEuNzk4NjI0IDMuODM3NDE4IDExLjc5ODYyNGgxMi40MTg5NzR6TTE3Ny4wOTI5MiAzMS41MTAwNzVsNy4xODM1OTUtMS41MDk1NzYgMi44NjIxMTQgOC44MDAxNTItMTAuMDQ1NzA5LTcuMjkwNTc2elwiIGZpbGw9XCIjRkZGXCIvPlxuICAgICAgPC9nPlxuICAgICAgPGcgY2xhc3M9XCJ0cC1zdGFyXCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJ0cC1zdGFyX19jYW52YXNcIiBmaWxsPVwiJHtcbiAgICAgICAgICAgIHJhdGluZyA9PT0gNSAmJiBjb2xvciA/IGNvbG9yIDogZW1wdHlTdGFyQ29sb3JcbiAgICAgICAgICB9XCIgZD1cIk0yMDUuMDY0NDE2IDQ2LjMzMDAwMmg0Ni4zNzU1ODdWMGgtNDYuMzc1NTg3elwiLz5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX2NhbnZhcy0taGFsZlwiIGZpbGw9XCIke1xuICAgICAgICAgICAgcmF0aW5nID49IDQuNSAmJiBjb2xvciA/IGNvbG9yIDogZW1wdHlTdGFyQ29sb3JcbiAgICAgICAgICB9XCIgZD1cIk0yMDUuMDY0NDE2IDQ2LjMzMDAwMmgyMy4xODc3OTNWMGgtMjMuMTg3NzkzelwiLz5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cInRwLXN0YXJfX3NoYXBlXCIgZD1cIk0yNDQuNTk3MDIyIDE5LjcxMTQzM2wtMjYuMzAyOSAxOS4wODkyMTggMy44Mzc0MTktMTEuNzk3ODI3LTEwLjA0NzMwNC03LjI5MTM5MWgxMi40MTg5NzRsMy44Mzc0MTgtMTEuNzk4NjI0IDMuODM3NDE4IDExLjc5ODYyNGgxMi40MTg5NzV6bS0xNi4yNTU0MzYgMTEuNzk4NjQybDcuMTgzNTk1LTEuNTA5NTc2IDIuODYyMTE0IDguODAwMTUyLTEwLjA0NTcwOS03LjI5MDU3NnpcIiBmaWxsPVwiI0ZGRlwiLz5cbiAgICAgIDwvZz5cbiAgPC9zdmc+YDtcblxuY29uc3QgbG9nbyA9IChkaW1lbnNpb25zKSA9PiBgXG4gIDxzdmcgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWxsZWRieT1cInRydXN0cGlsb3RMb2dvXCIgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7ZGltZW5zaW9ucy5oZWlnaHR9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICR7c3ZnU3RhclN0eWxlfT5cbiAgICAgIDx0aXRsZSBpZD1cInRydXN0cGlsb3RMb2dvXCI+VHJ1c3RwaWxvdDwvdGl0bGU+XG4gICAgICA8cGF0aCBjbGFzcz1cInRwLWxvZ29fX3RleHRcIiBkPVwiTTMzLjA3NDc3NCAxMS4wNzAwNUg0NS44MTgwNnYyLjM2NDE5NmgtNS4wMTA2NTZ2MTMuMjkwMzE2aC0yLjc1NTMwNlYxMy40MzQyNDZoLTQuOTg4NDM1VjExLjA3MDA1aC4wMTExMXptMTIuMTk4ODkyIDQuMzE5NjI5aDIuMzU1MzQxdjIuMTg3NDMzaC4wNDQ0NGMuMDc3NzcxLS4zMDkzMzQuMjIyMjAzLS42MDc2Mi40MzMyOTUtLjg5NDg1OS4yMTEwOTItLjI4NzIzOS40NjY2MjQtLjU2MzQzLjc2NjU5Ny0uNzk1NDMuMjk5OTcyLS4yNDMwNDguNjMzMjc2LS40MzA4NTguOTk5OTA5LS41ODU1MjUuMzY2NjMzLS4xNDM2Mi43NDQzNzctLjIyMDk1MyAxLjEyMjEyLS4yMjA5NTMuMjg4ODYzIDAgLjQ5OTk1NS4wMTEwNDcuNjExMDU2LjAyMjA5NS4xMTExLjAxMTA0OC4yMjIyMDIuMDMzMTQzLjM0NDQxMy4wNDQxOXYyLjQwODM4N2MtLjE3Nzc2Mi0uMDMzMTQzLS4zNTU1MjMtLjA1NTIzOC0uNTQ0Mzk1LS4wNzczMzMtLjE4ODg3Mi0uMDIyMDk2LS4zNjY2MzMtLjAzMzE0My0uNTQ0Mzk1LS4wMzMxNDMtLjQyMjE4NCAwLS44MjIxNDguMDg4MzgtMS4xOTk4OTEuMjU0MDk2LS4zNzc3NDQuMTY1NzE0LS42OTk5MzYuNDE5ODEtLjk3NzY4OS43NDAxOTItLjI3Nzc1My4zMzE0MjktLjQ5OTk1NS43MjkxNDQtLjY2NjYwNiAxLjIxNTI0LS4xNjY2NTIuNDg2MDk3LS4yNDQ0MjIgMS4wMzg0OC0uMjQ0NDIyIDEuNjY4MTk1djUuMzkxMjVoLTIuNTEwODgzVjE1LjM4OTY4aC4wMTExMXptMTguMjIwNTY3IDExLjMzNDg4M0g2MS4wMjc3OXYtMS41Nzk4MTNoLS4wNDQ0NGMtLjMxMTA4My41NzQ0NzctLjc2NjU5NyAxLjAyNzQzLTEuMzc3NjUzIDEuMzY5OTA4LS42MTEwNTUuMzQyNDc3LTEuMjMzMjIxLjUxOTI0LTEuODY2NDk3LjUxOTI0LTEuNDk5ODY0IDAtMi41ODg2NTQtLjM2NDU3My0zLjI1NTI2LTEuMTA0NzY1LS42NjY2MDYtLjc0MDE5My0uOTk5OTA5LTEuODU2MDA1LS45OTk5MDktMy4zNDc0MzdWMTUuMzg5NjhoMi41MTA4ODN2Ni45NDg5NjhjMCAuOTk0Mjg4LjE4ODg3MiAxLjcwMTMzNy41Nzc3MjUgMi4xMTAxLjM3Nzc0NC40MDg3NjMuOTIyMTM5LjYxODY2OCAxLjYxMDk2NS42MTg2NjguNTMzMjg1IDAgLjk2NjU4LS4wNzczMzMgMS4zMjIxMDItLjI0MzA0OC4zNTU1MjQtLjE2NTcxNC42NDQzODYtLjM3NTYyLjg1NTQ3OC0uNjUxODEuMjIyMjAyLS4yNjUxNDQuMzc3NzQ0LS41OTY1NzQuNDc3NzM1LS45NzIxOTQuMDk5OTktLjM3NTYyLjE0NDQzMS0uNzg0MzgyLjE0NDQzMS0xLjIyNjI4OHYtNi41NzMzNDloMi41MTA4ODN2MTEuMzIzODM2em00LjI3NzM5LTMuNjM0Njc1Yy4wNzc3Ny43MjkxNDQuMzU1NTIyIDEuMjM3MzM2LjgzMzI1NyAxLjUzNTYyMy40ODg4NDQuMjg3MjM4IDEuMDY2NTcuNDQxOTA1IDEuNzQ0Mjg2LjQ0MTkwNS4yMzMzMTIgMCAuNDk5OTU0LS4wMjIwOTUuNzk5OTI3LS4wNTUyMzguMjk5OTczLS4wMzMxNDMuNTg4ODM2LS4xMTA0NzYuODQ0MzY4LS4yMDk5MDUuMjY2NjQyLS4wOTk0MjkuNDc3NzM0LS4yNTQwOTYuNjU1NDk2LS40NTI5NTQuMTY2NjUyLS4xOTg4NTcuMjQ0NDIyLS40NTI5NTMuMjMzMzEyLS43NzMzMzUtLjAxMTExLS4zMjAzODEtLjEzMzMyMS0uNTg1NTI1LS4zNTU1MjMtLjc4NDM4Mi0uMjIyMjAyLS4yMDk5MDYtLjQ5OTk1NS0uMzY0NTczLS44NDQzNjgtLjQ5NzE0NC0uMzQ0NDEzLS4xMjE1MjUtLjczMzI2Ny0uMjMyLTEuMTc3NjctLjMyMDM4Mi0uNDQ0NDA1LS4wODgzODEtLjg4ODgwOS0uMTg3ODEtMS4zNDQzMjMtLjI4NzIzOS0uNDY2NjI0LS4wOTk0MjktLjkyMjEzOC0uMjMyLTEuMzU1NDMyLS4zNzU2Mi0uNDMzMjk0LS4xNDM2Mi0uODIyMTQ4LS4zNDI0NzctMS4xNjY1NjEtLjU5NjU3My0uMzQ0NDEzLS4yNDMwNDgtLjYyMjE2Ni0uNTYzNDMtLjgyMjE0OC0uOTUwMDk3LS4yMTEwOTItLjM4NjY2OC0uMzExMDgzLS44NjE3MTYtLjMxMTA4My0xLjQzNjE5NCAwLS42MTg2NjguMTU1NTQyLTEuMTI2ODYuNDU1NTE1LTEuNTQ2NjcuMjk5OTcyLS40MTk4MS42ODg4MjYtLjc1MTI0IDEuMTQ0MzQtMS4wMDUzMzYuNDY2NjI0LS4yNTQwOTUuOTc3NjktLjQzMDg1OCAxLjU0NDMwNC0uNTQxMzM0LjU2NjYxNS0uMDk5NDI5IDEuMTExMDEtLjE1NDY2NyAxLjYyMjA3NS0uMTU0NjY3LjU4ODgzNiAwIDEuMTU1NDUuMDY2Mjg2IDEuNjg4NzM2LjE4NzgxLjUzMzI4NS4xMjE1MjQgMS4wMjIxMy4zMjAzODEgMS40NTU0MjMuNjA3NjIuNDMzMjk0LjI3NjE5MS43ODg4MTcuNjQwNzY0IDEuMDc3NjggMS4wODI2Ny4yODg4NjMuNDQxOTA1LjQ2NjYyNC45ODMyNC41NDQzOTUgMS42MTI5NTVoLTIuNjIxOTg0Yy0uMTIyMjExLS41OTY1NzItLjM4ODg1NC0xLjAwNTMzNS0uODIyMTQ4LTEuMjA0MTkzLS40MzMyOTQtLjIwOTkwNS0uOTMzMjQ4LS4zMDkzMzQtMS40ODg3NTMtLjMwOTMzNC0uMTc3NzYyIDAtLjM4ODg1NC4wMTEwNDgtLjYzMzI3Ni4wNDQxOS0uMjQ0NDIyLjAzMzE0NC0uNDY2NjI0LjA4ODM4Mi0uNjg4ODI2LjE2NTcxNS0uMjExMDkyLjA3NzMzNC0uMzg4ODU0LjE5ODg1OC0uNTQ0Mzk1LjM1MzUyNS0uMTQ0NDMyLjE1NDY2Ny0uMjIyMjAzLjM1MzUyNS0uMjIyMjAzLjYwNzYyIDAgLjMwOTMzNS4xMTExMDEuNTUyMzgzLjMyMjE5My43NDAxOTMuMjExMDkyLjE4NzgxLjQ4ODg0NS4zNDI0NzcuODMzMjU4LjQ3NTA0OC4zNDQ0MTMuMTIxNTI0LjczMzI2Ny4yMzIgMS4xNzc2NzEuMzIwMzgyLjQ0NDQwNC4wODgzODEuODk5OTE4LjE4NzgxIDEuMzY2NTQyLjI4NzIzOS40NTU1MTUuMDk5NDI5Ljg5OTkxOS4yMzIgMS4zNDQzMjMuMzc1NjIuNDQ0NDA0LjE0MzYyLjgzMzI1Ny4zNDI0NzcgMS4xNzc2Ny41OTY1NzMuMzQ0NDE0LjI1NDA5NS42MjIxNjYuNTYzNDMuODMzMjU4LjkzOTA1LjIxMTA5Mi4zNzU2Mi4zMjIxOTMuODUwNjY4LjMyMjE5MyAxLjQwMzA1IDAgLjY3MzkwNi0uMTU1NTQxIDEuMjM3MzM2LS40NjY2MjQgMS43MTIzODUtLjMxMTA4My40NjQwMDEtLjcxMTA0Ny44NTA2NjktMS4xOTk4OTEgMS4xMzc5MDctLjQ4ODg0NS4yODcyNC0xLjA0NDM1LjUwODE5Mi0xLjY0NDI5NS42NDA3NjQtLjU5OTk0Ni4xMzI1NzItMS4xOTk4OTEuMTk4ODU3LTEuNzg4NzI3LjE5ODg1Ny0uNzIyMTU2IDAtMS4zODg3NjItLjA3NzMzMy0xLjk5OTgxOC0uMjQzMDQ4LS42MTEwNTYtLjE2NTcxNC0xLjE0NDM0LS40MDg3NjMtMS41ODg3NDUtLjcyOTE0NC0uNDQ0NDA0LS4zMzE0My0uNzk5OTI3LS43NDAxOTItMS4wNTU0Ni0xLjIyNjI4OS0uMjU1NTMyLS40ODYwOTYtLjM4ODg1My0xLjA3MTYyMS0uNDExMDczLTEuNzQ1NTI4aDIuNTMzMTAzdi0uMDIyMDk1em04LjI4ODEzNS03LjcwMDIwOGgxLjg5OTgyOHYtMy40MDI2NzVoMi41MTA4ODN2My40MDI2NzVoMi4yNjY0NnYxLjg2NzA1MmgtMi4yNjY0NnY2LjA1NDEwOWMwIC4yNjUxNDMuMDExMTEuNDg2MDk2LjAzMzMzLjY4NDk1NC4wMjIyMi4xODc4MS4wNzc3Ny4zNTM1MjQuMTU1NTQyLjQ4NjA5Ni4wNzc3Ny4xMzI1NzIuMTk5OTgxLjIzMi4zNjY2MzMuMjk4Mjg3LjE2NjY1MS4wNjYyODUuMzc3NzQzLjA5OTQyOC42NjY2MDYuMDk5NDI4LjE3Nzc2MiAwIC4zNTU1MjMgMCAuNTMzMjg1LS4wMTEwNDcuMTc3NzYyLS4wMTEwNDguMzU1NTIzLS4wMzMxNDMuNTMzMjg1LS4wNzczMzR2MS45MzMzMzhjLS4yNzc3NTMuMDMzMTQzLS41NTU1MDUuMDU1MjM4LS44MTEwMzguMDg4MzgxLS4yNjY2NDIuMDMzMTQzLS41MzMyODUuMDQ0MTktLjgxMTAzNy4wNDQxOS0uNjY2NjA2IDAtMS4xOTk4OTEtLjA2NjI4NS0xLjU5OTg1NS0uMTg3ODEtLjM5OTk2My0uMTIxNTIzLS43MjIxNTYtLjMwOTMzMy0uOTQ0MzU4LS41NTIzODEtLjIzMzMxMy0uMjQzMDQ5LS4zNzc3NDQtLjU0MTMzNS0uNDY2NjI1LS45MDU5MDctLjA3Nzc3LS4zNjQ1NzMtLjEzMzMyLS43ODQzODMtLjE0NDQzMS0xLjI0ODM4NHYtNi42ODM4MjVoLTEuODk5ODI3di0xLjg4OTE0N2gtLjAyMjIyem04LjQ1NDc4OCAwaDIuMzc3NTYyVjE2LjkyNTNoLjA0NDQ0Yy4zNTU1MjMtLjY2Mjg1OC44NDQzNjgtMS4xMjY4NiAxLjQ3NzY0NC0xLjQxNDA5OC42MzMyNzYtLjI4NzIzOSAxLjMxMDk5Mi0uNDMwODU4IDIuMDU1MzY5LS40MzA4NTguODk5OTE4IDAgMS42Nzc2MjUuMTU0NjY3IDIuMzQ0MjMxLjQ3NTA0OC42NjY2MDYuMzA5MzM1IDEuMjIyMTExLjc0MDE5MyAxLjY2NjUxNSAxLjI5MjU3NS40NDQ0MDUuNTUyMzgyLjc2NjU5NyAxLjE5MzE0NS45ODg4IDEuOTIyMjkuMjIyMjAyLjcyOTE0NS4zMzMzMDMgMS41MTM1MjcuMzMzMzAzIDIuMzQyMSAwIC43NjIyODgtLjA5OTk5MSAxLjUwMjQ4LS4yOTk5NzMgMi4yMDk1My0uMTk5OTgyLjcxODA5Ni0uNDk5OTU1IDEuMzQ3ODEyLS44OTk5MTggMS45MDAxOTQtLjM5OTk2NC41NTIzODMtLjkxMTAyOS45ODMyNC0xLjUzMzE5NCAxLjMxNDY3LS42MjIxNjYuMzMxNDMtMS4zNDQzMjMuNDk3MTQ0LTIuMTg4NjkuNDk3MTQ0LS4zNjY2MzQgMC0uNzMzMjY3LS4wMzMxNDMtMS4wOTk5LS4wOTk0MjktLjM2NjYzNC0uMDY2Mjg2LS43MjIxNTctLjE3Njc2Mi0xLjA1NTQ2LS4zMjAzODEtLjMzMzMwMy0uMTQzNjItLjY1NTQ5Ni0uMzMxNDMtLjkzMzI0OS0uNTYzNDMtLjI4ODg2My0uMjMyLS41MjIxNzUtLjQ5NzE0NC0uNzIyMTU3LS43OTU0M2gtLjA0NDQ0djUuNjU2MzkzaC0yLjUxMDg4M1YxNS4zODk2OHptOC43NzY5OCA1LjY3ODQ5YzAtLjUwODE5My0uMDY2NjYtMS4wMDUzMzctLjE5OTk4MS0xLjQ5MTQzMy0uMTMzMzIxLS40ODYwOTYtLjMzMzMwMy0uOTA1OTA3LS41OTk5NDYtMS4yODE1MjctLjI2NjY0Mi0uMzc1NjItLjU5OTk0NS0uNjczOTA2LS45ODg3OTktLjg5NDg1OS0uMzk5OTYzLS4yMjA5NTMtLjg1NTQ3OC0uMzQyNDc3LTEuMzY2NTQyLS4zNDI0NzctMS4wNTU0NiAwLTEuODU1Mzg3LjM2NDU3Mi0yLjM4ODY3MiAxLjA5MzcxNy0uNTMzMjg1LjcyOTE0NC0uNzk5OTI4IDEuNzAxMzM3LS43OTk5MjggMi45MTY1NzggMCAuNTc0NDc4LjA2NjY2MSAxLjEwNDc2NC4yMTEwOTIgMS41OTA4Ni4xNDQ0MzIuNDg2MDk3LjM0NDQxNC45MDU5MDguNjMzMjc2IDEuMjU5NDMyLjI3Nzc1My4zNTM1MjUuNjExMDU2LjYyOTcxNi45OTk5MS44Mjg1NzQuMzg4ODUzLjIwOTkwNS44NDQzNjcuMzA5MzM0IDEuMzU1NDMyLjMwOTMzNC41Nzc3MjUgMCAxLjA1NTQ2LS4xMjE1MjQgMS40NTU0MjMtLjM1MzUyNS4zOTk5NjQtLjIzMi43MjIxNTctLjU0MTMzNS45Nzc2OS0uOTA1OTA3LjI1NTUzMS0uMzc1NjIuNDQ0NDAzLS43OTU0My41NTU1MDQtMS4yNzA0NzkuMDk5OTkxLS40NzUwNDkuMTU1NTQyLS45NjExNDUuMTU1NTQyLTEuNDU4Mjg5em00LjQzMjkzMS05Ljk5ODEyaDIuNTEwODgzdjIuMzY0MTk3aC0yLjUxMDg4M1YxMS4wNzAwNXptMCA0LjMxOTYzaDIuNTEwODgzdjExLjMzNDg4M2gtMi41MTA4ODNWMTUuMzg5Njc5em00Ljc1NTEyNC00LjMxOTYzaDIuNTEwODgzdjE1LjY1NDUxM2gtMi41MTA4ODNWMTEuMDcwMDV6bTEwLjIxMDE4NCAxNS45NjM4NDdjLS45MTEwMjkgMC0xLjcyMjA2Ni0uMTU0NjY3LTIuNDMzMTEzLS40NTI5NTMtLjcxMTA0Ni0uMjk4Mjg3LTEuMzEwOTkyLS43MTgwOTctMS44MTA5NDYtMS4yMzczMzctLjQ4ODg0NS0uNTMwMjg3LS44NjY1ODgtMS4xNjAwMDItMS4xMjIxMi0xLjg4OTE0Ny0uMjU1NTMzLS43MjkxNDQtLjM4ODg1NC0xLjUzNTYyMi0uMzg4ODU0LTIuNDA4Mzg2IDAtLjg2MTcxNi4xMzMzMjEtMS42NTcxNDcuMzg4ODUzLTIuMzg2MjkxLjI1NTUzMy0uNzI5MTQ1LjYzMzI3Ni0xLjM1ODg2IDEuMTIyMTItMS44ODkxNDguNDg4ODQ1LS41MzAyODcgMS4wOTk5LS45MzkwNSAxLjgxMDk0Ny0xLjIzNzMzNi43MTEwNDctLjI5ODI4NiAxLjUyMjA4NC0uNDUyOTUzIDIuNDMzMTEzLS40NTI5NTMuOTExMDI4IDAgMS43MjIwNjYuMTU0NjY3IDIuNDMzMTEyLjQ1Mjk1My43MTEwNDcuMjk4Mjg3IDEuMzEwOTkyLjcxODA5NyAxLjgxMDk0NyAxLjIzNzMzNi40ODg4NDQuNTMwMjg3Ljg2NjU4OCAxLjE2MDAwMyAxLjEyMjEyIDEuODg5MTQ4LjI1NTUzMi43MjkxNDQuMzg4ODU0IDEuNTI0NTc1LjM4ODg1NCAyLjM4NjI5IDAgLjg3Mjc2NS0uMTMzMzIyIDEuNjc5MjQzLS4zODg4NTQgMi40MDgzODctLjI1NTUzMi43MjkxNDUtLjYzMzI3NiAxLjM1ODg2LTEuMTIyMTIgMS44ODkxNDctLjQ4ODg0NS41MzAyODctMS4wOTk5LjkzOTA1LTEuODEwOTQ3IDEuMjM3MzM3LS43MTEwNDYuMjk4Mjg2LTEuNTIyMDg0LjQ1Mjk1My0yLjQzMzExMi40NTI5NTN6bTAtMS45Nzc1MjhjLjU1NTUwNSAwIDEuMDQ0MzUtLjEyMTUyNCAxLjQ1NTQyMy0uMzUzNTI1LjQxMTA3NC0uMjMyLjc0NDM3Ny0uNTQxMzM1IDEuMDExMDItLjkxNjk1NC4yNjY2NDItLjM3NTYyLjQ1NTUxMy0uODA2NDc4LjU4ODgzNS0xLjI4MTUyNy4xMjIyMS0uNDc1MDQ5LjE4ODg3Mi0uOTYxMTQ1LjE4ODg3Mi0xLjQ1ODI5IDAtLjQ4NjA5Ni0uMDY2NjYxLS45NjExNDQtLjE4ODg3Mi0xLjQ0NzI0LS4xMjIyMTEtLjQ4NjA5Ny0uMzIyMTkzLS45MDU5MDctLjU4ODgzNi0xLjI4MTUyNy0uMjY2NjQyLS4zNzU2Mi0uNTk5OTQ1LS42NzM5MDctMS4wMTEwMTktLjkwNTkwNy0uNDExMDc0LS4yMzItLjg5OTkxOC0uMzUzNTI1LTEuNDU1NDIzLS4zNTM1MjUtLjU1NTUwNSAwLTEuMDQ0MzUuMTIxNTI0LTEuNDU1NDI0LjM1MzUyNS0uNDExMDczLjIzMi0uNzQ0Mzc2LjU0MTMzNC0xLjAxMTAxOS45MDU5MDctLjI2NjY0Mi4zNzU2Mi0uNDU1NTE0Ljc5NTQzLS41ODg4MzUgMS4yODE1MjYtLjEyMjIxMS40ODYwOTctLjE4ODg3Mi45NjExNDUtLjE4ODg3MiAxLjQ0NzI0MiAwIC40OTcxNDQuMDY2NjYuOTgzMjQuMTg4ODcyIDEuNDU4Mjg5LjEyMjIxLjQ3NTA0OS4zMjIxOTMuOTA1OTA3LjU4ODgzNSAxLjI4MTUyNy4yNjY2NDMuMzc1NjIuNTk5OTQ2LjY4NDk1NCAxLjAxMTAyLjkxNjk1NC40MTEwNzMuMjQzMDQ4Ljg5OTkxOC4zNTM1MjUgMS40NTU0MjMuMzUzNTI1em02LjQ4ODMtOS42NjY2OWgxLjg5OTgyN3YtMy40MDI2NzRoMi41MTA4ODN2My40MDI2NzVoMi4yNjY0NnYxLjg2NzA1MmgtMi4yNjY0NnY2LjA1NDEwOWMwIC4yNjUxNDMuMDExMTEuNDg2MDk2LjAzMzMzLjY4NDk1NC4wMjIyMi4xODc4MS4wNzc3Ny4zNTM1MjQuMTU1NTQxLjQ4NjA5Ni4wNzc3NzEuMTMyNTcyLjE5OTk4Mi4yMzIuMzY2NjM0LjI5ODI4Ny4xNjY2NTEuMDY2Mjg1LjM3Nzc0My4wOTk0MjguNjY2NjA2LjA5OTQyOC4xNzc3NjIgMCAuMzU1NTIzIDAgLjUzMzI4NS0uMDExMDQ3LjE3Nzc2Mi0uMDExMDQ4LjM1NTUyMy0uMDMzMTQzLjUzMzI4NS0uMDc3MzM0djEuOTMzMzM4Yy0uMjc3NzUzLjAzMzE0My0uNTU1NTA1LjA1NTIzOC0uODExMDM4LjA4ODM4MS0uMjY2NjQyLjAzMzE0My0uNTMzMjg1LjA0NDE5LS44MTEwMzcuMDQ0MTktLjY2NjYwNiAwLTEuMTk5ODkxLS4wNjYyODUtMS41OTk4NTUtLjE4NzgxLS4zOTk5NjMtLjEyMTUyMy0uNzIyMTU2LS4zMDkzMzMtLjk0NDM1OC0uNTUyMzgxLS4yMzMzMTMtLjI0MzA0OS0uMzc3NzQ0LS41NDEzMzUtLjQ2NjYyNS0uOTA1OTA3LS4wNzc3Ny0uMzY0NTczLS4xMzMzMjEtLjc4NDM4My0uMTQ0NDMxLTEuMjQ4Mzg0di02LjY4MzgyNWgtMS44OTk4Mjd2LTEuODg5MTQ3aC0uMDIyMjJ6XCIgZmlsbD1cIiMxOTE5MTlcIi8+XG4gICAgICA8cGF0aCBjbGFzcz1cInRwLWxvZ29fX3N0YXJcIiBmaWxsPVwiIzAwQjY3QVwiIGQ9XCJNMzAuMTQxNzA3IDExLjA3MDA1SDE4LjYzMTY0TDE1LjA3NjQwOC4xNzcwNzFsLTMuNTY2MzQyIDEwLjg5Mjk3N0wwIDExLjA1OTAwMmw5LjMyMTM3NiA2LjczOTA2My0zLjU2NjM0MyAxMC44ODE5MyA5LjMyMTM3NS02LjcyODAxNiA5LjMxMDI2NiA2LjcyODAxNi0zLjU1NTIzMy0xMC44ODE5MyA5LjMxMDI2Ni02LjcyODAxNnpcIi8+XG4gICAgICA8cGF0aCBjbGFzcz1cInRwLWxvZ29fX3N0YXItbm90Y2hcIiBmaWxsPVwiIzAwNTEyOFwiIGQ9XCJNMjEuNjMxMzY5IDIwLjI2MTY5bC0uNzk5OTI4LTIuNDYzNjI1LTUuNzU1MDMzIDQuMTUzOTE0elwiLz5cbiAgPC9zdmc+YDtcblxuY29uc3QgYXJyb3dTbGlkZXIgPSAoZGltZW5zaW9ucykgPT4gYFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgJHtkaW1lbnNpb25zLndpZHRofSAke2RpbWVuc2lvbnMuaGVpZ2h0fVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAke3N2Z1N0YXJTdHlsZX0+XG4gICAgICA8Y2lyY2xlIGNsYXNzPVwiYXJyb3ctc2xpZGVyLWNpcmNsZVwiIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjExLjVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiM4QzhDOENcIi8+XG4gICAgICA8cGF0aCBjbGFzcz1cImFycm93LXNsaWRlci1zaGFwZVwiIGZpbGw9XCIjOEM4QzhDXCIgZD1cIk0xMC41MDg4ODM1IDEybDMuMzA4MDU4Mi0zLjAyNDUxMDQxYy4yNDQwNzc3LS4yMjMxNTY3NC4yNDQwNzc3LS41ODQ5NjUzIDAtLjgwODEyMjA0LS4yNDQwNzc2LS4yMjMxNTY3My0uNjM5ODA1OC0uMjIzMTU2NzMtLjg4Mzg4MzQgMEw5LjE4MzA1ODI2IDExLjU5NTkzOWMtLjI0NDA3NzY4LjIyMzE1NjctLjI0NDA3NzY4LjU4NDk2NTMgMCAuODA4MTIybDMuNzUwMDAwMDQgMy40Mjg1NzE0Yy4yNDQwNzc2LjIyMzE1NjguNjM5ODA1OC4yMjMxNTY4Ljg4Mzg4MzQgMCAuMjQ0MDc3Ny0uMjIzMTU2Ny4yNDQwNzc3LS41ODQ5NjUzIDAtLjgwODEyMkwxMC41MDg4ODM1IDEyelwiLz5cbiAgPC9zdmc+XG5gO1xuXG5jb25zdCByZXBseUFycm93ID0gKGRpbWVuc2lvbnMsIHsgZWxlbWVudENvbG9yIH0pID0+IGBcbjxzdmcgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7XG4gIGRpbWVuc2lvbnMuaGVpZ2h0XG59XCIgeG1sbnM94oCcaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmfigJwgJHtzdmdTdGFyU3R5bGV9PlxuICA8cGF0aCBkPVwiTTUuMjQwNDA1MjYgOC42MDc3MDY0NWMwIC40MDI3NTAwNy0uMjU1NzYzODcuNTEzMDAwMDgtLjU3MDAzMDkyLjI0ODI1MDA0TC4yMzYxMzM4IDQuOTg1MjA1ODNDLjA4NzE4NDEgNC44Njk4NjM3NSAwIDQuNjkyMDg2NzcgMCA0LjUwMzcwNTc1cy4wODcxODQxLS4zNjYxNTguMjM2MTMzOC0uNDgxNTAwMDhMNC42NzAzNzQzNC4xNDQ3MDUwMWMuMzE1MDE3MDktLjI2NjI1MDA0LjU3MDAzMDkyLS4xNTQ1MDAwMy41NzAwMzA5Mi4yNDgyNTAwNFYyLjk5OTIwNTVoLjc1MDA0MDY5YzIuODY1MTU1NDEgMCA1LjMxNTUzODMzIDIuMzc0NTAwNCA1LjkxMjU3MDcyIDQuOTM5NTAwODNhNC4zMzg1MzQ4IDQuMzM4NTM0OCAwIDAgMSAuMDkzNzU1MDguNTc4MjUwMWMuMDIyNTAxMjMuMjAwMjUwMDQtLjA3NTAwNDA2LjI0NDUwMDA0LS4yMTgyNjE4NC4xMDM1MDAwMiAwIDAtLjA0MDUwMjItLjAzNi0uMDc1MDA0MDYtLjA3NTAwMDAxQzEwLjE4NjczNjk5IDcuMDA3NjYzOTggOC4xNDY1NTU3OSA2LjA5NzI3NjY2IDUuOTg4OTQ1ODYgNS45OTU0NTZoLS43NTAwNDA2OGwuMDAxNTAwMDggMi42MTIyNTA0NXpcIiBmaWxsPVwiJHtlbGVtZW50Q29sb3IgfHxcbiAgICAnIzAwQjY3QSd9XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz5cbjwvc3ZnPlxuYDtcblxuY29uc3QgdmVyaWZpZWRSZXZpZXcgPSAoXG4gIGRpbWVuc2lvbnNcbikgPT4gYDxzdmcgdmlld0JveD1cIjAgMCAke2RpbWVuc2lvbnMud2lkdGh9ICR7ZGltZW5zaW9ucy5oZWlnaHR9XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnICR7c3ZnU3RhclN0eWxlfVwiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcgMTRDMTAuODY2IDE0IDE0IDEwLjg2NiAxNCA3QzE0IDMuMTM0MDEgMTAuODY2IDAgNyAwQzMuMTM0MDEgMCAwIDMuMTM0MDEgMCA3QzAgMTAuODY2IDMuMTM0MDEgMTQgNyAxNFpNNi4wOTIxNyA3LjgxNDAxTDkuMjAzMTEgNC43MDMxQzkuNDQ4NzQgNC40NTc1NyA5Ljg0Njg4IDQuNDU3NTcgMTAuMDkyMyA0LjcwMzFDMTAuMzM4IDQuOTQ4NjQgMTAuMzM4IDUuMzQ2NzMgMTAuMDkyMyA1LjU5MjI2TDYuNjIwMDkgOS4wNjQ0OEM2LjU5NTczIDkuMTAyODMgNi41NjY4MiA5LjEzOTEyIDYuNTMzMzMgOS4xNzI1NkM2LjI4Nzg3IDkuNDE4MjEgNS44ODk2NSA5LjQxODIxIDUuNjQ0MDIgOS4xNzI1NkwzLjcwNTkgNy4xMTAzMUMzLjQ2MDQ2IDYuODY0NjQgMy40NjA0NiA2LjQ2NjY5IDMuNzA1OSA2LjIyMTAyQzMuOTUxNTQgNS45NzU0OCA0LjM0OTY4IDUuOTc1NDggNC41OTUxMiA2LjIyMTAyTDYuMDkyMTcgNy44MTQwMVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuPC9zdmc+XG5gO1xuXG5jb25zdCBpbnZpdGVkUmV2aWV3ID0gKFxuICBkaW1lbnNpb25zXG4pID0+IGA8c3ZnIHZpZXdCb3g9XCIwIDAgJHtkaW1lbnNpb25zLndpZHRofSAke2RpbWVuc2lvbnMuaGVpZ2h0fVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyAke3N2Z1N0YXJTdHlsZX1cIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03IDE0QzEwLjg2NiAxNCAxNCAxMC44NjYgMTQgN0MxNCAzLjEzNDAxIDEwLjg2NiAwIDcgMEMzLjEzNDAxIDAgMCAzLjEzNDAxIDAgN0MwIDEwLjg2NiAzLjEzNDAxIDE0IDcgMTRaTTYuMDkyMTcgNy44MTQwMUw5LjIwMzExIDQuNzAzMUM5LjQ0ODc0IDQuNDU3NTcgOS44NDY4OCA0LjQ1NzU3IDEwLjA5MjMgNC43MDMxQzEwLjMzOCA0Ljk0ODY0IDEwLjMzOCA1LjM0NjczIDEwLjA5MjMgNS41OTIyNkw2LjYyMDA5IDkuMDY0NDhDNi41OTU3MyA5LjEwMjgzIDYuNTY2ODIgOS4xMzkxMiA2LjUzMzMzIDkuMTcyNTZDNi4yODc4NyA5LjQxODIxIDUuODg5NjUgOS40MTgyMSA1LjY0NDAyIDkuMTcyNTZMMy43MDU5IDcuMTEwMzFDMy40NjA0NiA2Ljg2NDY0IDMuNDYwNDYgNi40NjY2OSAzLjcwNTkgNi4yMjEwMkMzLjk1MTU0IDUuOTc1NDggNC4zNDk2OCA1Ljk3NTQ4IDQuNTk1MTIgNi4yMjEwMkw2LjA5MjE3IDcuODE0MDFaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbjwvc3ZnPlxuYDtcblxuY29uc3QgcmVkaXJlY3RlZFJldmlldyA9IChcbiAgZGltZW5zaW9uc1xuKSA9PiBgPHN2ZyB2aWV3Qm94PVwiMCAwICR7ZGltZW5zaW9ucy53aWR0aH0gJHtkaW1lbnNpb25zLmhlaWdodH1cIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAke3N2Z1N0YXJTdHlsZX0+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTMuNzA1NiA0LjA3MjI3TDEwLjY5MTUgMS4wNDcwNkMxMC4yOTg2IDAuNjUyMTYgOS42NjA5MyAwLjY1MTE1MiA5LjI2NzA0IDEuMDQzMDNDOC44NzIxNCAxLjQzNTkxIDguODcxMTMgMi4wNzQ2IDkuMjY0MDIgMi40Njc0OUwxMC41NjU2IDMuNzc1MDlMMy40MjQxNSAzLjc2NjAySDMuNDE0MDdDMS45NjI0MiAzLjc2NjAyIDEuMTU3NTEgNC40MDE2OSAwLjczODQyOSA0LjkzNTYxQzAuMjU1ODg3IDUuNTUwMTIgMC4wMDEwMTU3IDYuMzg4MjcgOC4zMDMxZS0wNiA3LjM2MDQxQy0wLjAwMzAxMzg4IDguOTE0ODIgMC44MTkwMjEgMTEuODE1MSAyLjQwMjY1IDExLjgxNjFIMi40MDM2NUMyLjk1OTc0IDExLjgxNjEgMy40MTEwNSAxMS4zNjY4IDMuNDEyMDYgMTAuODEwN0MzLjQxMjA2IDEwLjM2NDUgMy4xMjI5MyA5Ljk4NDY3IDIuNzIwOTggOS44NTA2OUMyLjM1NDI5IDkuNDAwMzggMS43MjU2OCA3LjYwMjE4IDIuMTUyODEgNi40ODkwMUMyLjI4NjggNi4xNDA0NSAyLjU0MjY4IDUuNzgwODEgMy40MTQwNyA1Ljc4MDgxSDMuNDIwMTJMMTAuNTU4NSA1Ljc4OTg4TDkuMjU0OTUgNy4wODc0QzguODYwMDUgNy40ODAyOSA4Ljg1OTA1IDguMTE4OTggOS4yNTE5MyA4LjUxMTg2QzkuNDQ4MzcgOC43MDkzMSA5LjcwNzI3IDguODA5MDQgOS45NjYxNyA4LjgwOTA0QzEwLjIyMzEgOC44MDkwNCAxMC40Nzk5IDguNzEwMzIgMTAuNjc2NCA4LjUxNTg5TDEzLjcwNDYgNS40OTg3NEgxMy43MDU2QzE0LjExMTYgNS4wODM2OSAxNC4wODQ0IDQuNDUyMDYgMTMuNzA1NiA0LjA3MjI3WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG48L3N2Zz5cbmA7XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxuLy8gRGVmaW5lIGEgc2VyaWVzIG9mIG9iamVjdHMgY29udGFpbmluZyB3aWR0aCBhbmQgaGVpZ2h0IHZhbHVlcy4gVGhlc2UgYXJlXG4vLyB1c2VkIGluIHNldHRpbmcgdGhlIHN0eWxpbmcgb2YgdGhlIFNWRywgYW5kIGNyZWF0aW5nIHRoZSBkaXYgd3JhcHBlciBmb3Jcbi8vIElFMTEgc3VwcG9ydC5cbmNvbnN0IHN0YXJzRGltZW5zaW9ucyA9IHsgd2lkdGg6IDI1MSwgaGVpZ2h0OiA0NiB9O1xuY29uc3QgbG9nb0RpbWVuc2lvbnMgPSB7IHdpZHRoOiAxMjYsIGhlaWdodDogMzEgfTtcbmNvbnN0IGFycm93U2xpZGVyRGltZW5zaW9ucyA9IHsgd2lkdGg6IDI0LCBoZWlnaHQ6IDI0IH07XG5jb25zdCByZXBseUFycm93RGltZW5zaW9ucyA9IHsgd2lkdGg6IDEyLCBoZWlnaHQ6IDkgfTtcbmNvbnN0IHZlcmlmaWVkUmV2aWV3RGltZW5zaW9ucyA9IHsgd2lkdGg6IDE0LCBoZWlnaHQ6IDE0IH07XG5jb25zdCBpbnZpdGVkUmV2aWV3RGltZW5zaW9ucyA9IHsgd2lkdGg6IDE0LCBoZWlnaHQ6IDE0IH07XG5jb25zdCByZWRpcmVjdGVkUmV2aWV3RGltZW5zaW9ucyA9IHsgd2lkdGg6IDE0LCBoZWlnaHQ6IDEyIH07XG5cbmNvbnN0IHN2Z01hcCA9IHtcbiAgc2NhbGU6IChwcm9wcykgPT4gd3JhcFN2ZyhTQ0FMRV9TVkdfUFJPUFNbcHJvcHMuZGltZW5zaW9uSWRdLmRpbWVuc2lvbnMsIHNjYWxlLCBwcm9wcyksXG4gIHN0YXJzOiAocHJvcHMpID0+IHdyYXBTdmcoc3RhcnNEaW1lbnNpb25zLCBzdGFycywgcHJvcHMpLFxuICBsb2dvOiAoKSA9PiB3cmFwU3ZnKGxvZ29EaW1lbnNpb25zLCBsb2dvKSxcbiAgYXJyb3dTbGlkZXI6ICgpID0+IHdyYXBTdmcoYXJyb3dTbGlkZXJEaW1lbnNpb25zLCBhcnJvd1NsaWRlciksXG4gIHJlcGx5QXJyb3c6IChwcm9wcykgPT4gd3JhcFN2ZyhyZXBseUFycm93RGltZW5zaW9ucywgcmVwbHlBcnJvdywgcHJvcHMpLFxuICB2ZXJpZmllZFJldmlldzogKHByb3BzKSA9PiB3cmFwU3ZnKHZlcmlmaWVkUmV2aWV3RGltZW5zaW9ucywgdmVyaWZpZWRSZXZpZXcsIHByb3BzKSxcbiAgaW52aXRlZFJldmlldzogKHByb3BzKSA9PiB3cmFwU3ZnKGludml0ZWRSZXZpZXdEaW1lbnNpb25zLCBpbnZpdGVkUmV2aWV3LCBwcm9wcyksXG4gIHJlZGlyZWN0ZWRSZXZpZXc6IChwcm9wcykgPT4gd3JhcFN2ZyhyZWRpcmVjdGVkUmV2aWV3RGltZW5zaW9ucywgcmVkaXJlY3RlZFJldmlldywgcHJvcHMpLFxufTtcblxuZXhwb3J0IHsgc3ZnTWFwLCBTQ0FMRV9ESU1FTlNJT05TXzgweDE1LCBTQ0FMRV9ESU1FTlNJT05TXzkweDE2LCBTQ0FMRV9ESU1FTlNJT05TXzEwNXgxOSB9O1xuIiwiZXhwb3J0IGNvbnN0IHN0eWxlQWxpZ25tZW50UG9zaXRpb25zID0gWydsZWZ0JywgJ3JpZ2h0J107XG4iLCJpbXBvcnQgbG9jYWxlcyBmcm9tICcuLi9sb2NhbGl6YXRpb24nO1xuXG5jb25zdCBkZWZhdWx0TG9jYWxlID0gJ2VuLVVTJztcblxuY29uc3QgTE9DQUxFX0RJVklERVIgPSAnLSc7XG5cbmNvbnN0IGxhbmd1YWdlVG9Db3VudHJ5TWFwID0ge1xuICBkYTogJ0RLJyxcbiAgZW46ICdVUycsXG4gIGphOiAnSlAnLFxuICBuYjogJ05PJyxcbiAgc3Y6ICdTRScsXG4gIC8vIG90aGVyIGxhbmd1YWdlcyBhc3N1bWVkIHRvIGhhdmUgdGhlIHNhbWUgY291bnRyeSBjb2RlIGFzIHRoZSBsYW5ndWFnZSBjb2RlIGl0c2VsZlxufTtcblxuLyoqXG4gKiBUcmllcyB0byBmaW5kIHRoZSBjb3VudHJ5IGZvciB0aGUgZ2l2ZW4gbGFuZ3VhZ2UuXG4gKiBJZiBubyBjb3VudHJ5IGlzIGZvdW5kLCB0aGUgbGFuZ3VhZ2UgaXRzZWxmIGlzIHJldHVybmVkLlxuICogQWN0cyBhcyBhIHNhZmV0eSBtZWNoYW5pc20gZm9yIHRyYW5zbGF0aW9ucyB3aGVuIG9ubHkgdGhlIGxhbmd1YWdlIHBhcnQgaXMgcHJlc2VudCBpbiB0aGUgZ2l2ZW4gbG9jYWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSB0aGUgbGFuZ3VhZ2UgZm9yIHdoaWNoIHRoZSBjb3VudHJ5IHNob3VsZCBiZSBmb3VuZC5cbiAqL1xuY29uc3QgdHJ5R2V0Q291bnRyeUZvckxhbmd1YWdlID0gKGxhbmd1YWdlKSA9PiB7XG4gIGNvbnN0IGNvdW50cnkgPSBsYW5ndWFnZVRvQ291bnRyeU1hcFtsYW5ndWFnZV0gfHwgbGFuZ3VhZ2U7XG4gIHJldHVybiBjb3VudHJ5O1xufTtcblxuY29uc3QgZm9ybWF0TG9jYWxlID0gKGxvY2FsZSkgPT4ge1xuICBjb25zdCBsb2NhbGVQYXJ0cyA9IGxvY2FsZS5zcGxpdChMT0NBTEVfRElWSURFUik7XG4gIGNvbnN0IGxhbmd1YWdlID0gbG9jYWxlUGFydHNbMF07XG4gIGxldCBjb3VudHJ5ID0gbG9jYWxlUGFydHNbMV07XG5cbiAgaWYgKCFjb3VudHJ5KSB7XG4gICAgY291bnRyeSA9IHRyeUdldENvdW50cnlGb3JMYW5ndWFnZShsYW5ndWFnZSk7XG4gIH1cblxuICByZXR1cm4gbGFuZ3VhZ2UgJiYgY291bnRyeVxuICAgID8gYCR7bGFuZ3VhZ2V9JHtMT0NBTEVfRElWSURFUn0ke2NvdW50cnkudG9VcHBlckNhc2UoKX1gXG4gICAgOiBkZWZhdWx0TG9jYWxlO1xufTtcblxuY29uc3QgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24gPSAoa2V5LCBsb2NhbGUgPSBkZWZhdWx0TG9jYWxlLCBpbnRlcnBvbGF0aW9ucyA9IHt9LCBsaW5rcyA9IFtdKSA9PiB7XG4gIGNvbnN0IHRyYW5zbGF0aW9uVGFibGUgPSBsb2NhbGVzW2Zvcm1hdExvY2FsZShsb2NhbGUpXSB8fCBsb2NhbGVzW2RlZmF1bHRMb2NhbGVdO1xuICBjb25zdCByYXdUcmFuc2xhdGlvbiA9IGtleS5zcGxpdCgnLicpLnJlZHVjZSgoYSwgYikgPT4gYVtiXSwgdHJhbnNsYXRpb25UYWJsZSk7XG4gIGNvbnN0IHRyYW5zbGF0aW9uID0gT2JqZWN0LmtleXMoaW50ZXJwb2xhdGlvbnMpLnJlZHVjZShcbiAgICAodmFsdWUsIGtleSkgPT4gdmFsdWUucmVwbGFjZShrZXksIGludGVycG9sYXRpb25zW2tleV0pLFxuICAgIHJhd1RyYW5zbGF0aW9uXG4gICk7XG4gIGNvbnN0IHRyYW5zbGF0aW9uV2l0aExpbmtzUmVwbGFjZWQgPSBsaW5rcy5yZWR1Y2UoXG4gICAgKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cy5yZXBsYWNlKCdbTElOSy1FTkRdJywgJzwvYT4nKS5yZXBsYWNlKCdbTElOSy1CRUdJTl0nLCBjdXJyZW50KSxcbiAgICB0cmFuc2xhdGlvblxuICApO1xuXG4gIHJldHVybiB0cmFuc2xhdGlvbldpdGhMaW5rc1JlcGxhY2VkO1xufTtcblxuZXhwb3J0IHsgZGVmYXVsdExvY2FsZSwgZm9ybWF0TG9jYWxlLCBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbiB9O1xuIiwiaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGFkZENsYXNzLCByZW1vdmVDbGFzcyB9IGZyb20gJy4uL2RvbSc7XG5pbXBvcnQgQ29udHJvbHMgZnJvbSAnLi9jb250cm9scyc7XG5cbi8qKlxuICogVGhlIEFycm93Q29udHJvbHMgY2xhc3MgcHJvdmlkZXMgbG9naWMgZm9yIGNvbnRyb2xsaW5nIGEgc2xpZGluZyByZXZpZXdcbiAqIGNhcm91c2VsIHdpdGggcHJldmlvdXMvbmV4dCBwYWdlIGJ1dHRvbnMuXG4gKlxuICogVG8gdXNlIEFycm93Q29udHJvbHMsIGNvbnN0cnVjdCBhbiBpbnN0YW5jZSBvZiBpdCBhbmQgdGhlbiBjYWxsXG4gKiB7QGxpbmsgQXJyb3dDb250cm9scyNpbml0aWFsaXplfS5cbiAqL1xuY2xhc3MgQXJyb3dDb250cm9scyBleHRlbmRzIENvbnRyb2xzIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBBcnJvd0NvbnRyb2xzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Jldmlld1NsaWRlcn0gc2xpZGVyIC0gVGhlIFJldmlld1NsaWRlciB0byB3aGljaCB0byBhdHRhY2ggY29udHJvbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50cyAtIERPTSBlbGVtZW50cyBmb3IgdGhlIGNvbnRyb2xzLlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50cy5wcmV2QXJyb3cgLSBUaGUgcHJldmlvdXMgYXJyb3cgZWxlbWVudC5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudHMubmV4dEFycm93IC0gVGhlIG5leHQgYXJyb3cgZWxlbWVudC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIE9wdGlvbnMgZm9yIHRoZSBjb250cm9scy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmNhbGxiYWNrc10gLSBDYWxsYmFja3MgdG8gdHJpZ2dlciBhZnRlciBjbGlja2luZyBhIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7Y2FsbGJhY2t9IFtvcHRpb25zLmNhbGxiYWNrcy5wcmV2UGFnZV0gLSBDYWxsYmFjayB0byB0cmlnZ2VyIG9uIGNsaWNraW5nXG4gICAqIHRoZSBwcmV2aW91cyBhcnJvdy5cbiAgICogQHBhcmFtIHtjYWxsYmFja30gW29wdGlvbnMuY2FsbGJhY2tzLm5leHRQYWdlXSAtIENhbGxiYWNrIHRvIHRyaWdnZXIgb24gY2xpY2tpbmdcbiAgICogdGhlIG5leHQgYXJyb3cuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kaXNhYmxlZENsYXNzXSAtIFRoZSBjbGFzcyB0byBzZXQgb24gZGlzYWJsZWQgY29udHJvbHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzbGlkZXIsIGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzbGlkZXIsIGVsZW1lbnRzKTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IG9wdGlvbnMuY2FsbGJhY2tzIHx8IHt9O1xuICAgIHRoaXMuZGlzYWJsZWRDbGFzcyA9IG9wdGlvbnMuZGlzYWJsZWRDbGFzcztcbiAgfVxuXG4gIGF0dGFjaExpc3RlbmVycygpIHtcbiAgICBjb25zdCBub09wID0gKCkgPT4ge307XG4gICAgY29uc3QgeyBwcmV2QXJyb3csIG5leHRBcnJvdyB9ID0gdGhpcy5lbGVtZW50cztcbiAgICBjb25zdCB7IHByZXZQYWdlID0gbm9PcCwgbmV4dFBhZ2UgPSBub09wIH0gPSB0aGlzLmNhbGxiYWNrcztcbiAgICBhZGRFdmVudExpc3RlbmVyKHByZXZBcnJvdywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zbGlkZXIubW92ZUNvbnRlbnQoLTEpO1xuICAgICAgcHJldlBhZ2UoKTtcbiAgICB9KTtcbiAgICBhZGRFdmVudExpc3RlbmVyKG5leHRBcnJvdywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zbGlkZXIubW92ZUNvbnRlbnQoMSk7XG4gICAgICBuZXh0UGFnZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3R5bGVBcnJvdyhlbGVtLCBpc0Rpc2FibGVkKSB7XG4gICAgY29uc3QgZGlzYWJsZWRDbGFzcyA9IHRoaXMuZGlzYWJsZWRDbGFzcztcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgYWRkQ2xhc3MoZWxlbSwgZGlzYWJsZWRDbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW0sIGRpc2FibGVkQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIHN0eWxlQXJyb3dzKCkge1xuICAgIGNvbnN0IHsgcHJldkFycm93LCBuZXh0QXJyb3cgfSA9IHRoaXMuZWxlbWVudHM7XG4gICAgdGhpcy5zdHlsZUFycm93KHByZXZBcnJvdywgdGhpcy5zbGlkZXIuaXNBdEZpcnN0UGFnZSgpKTtcbiAgICB0aGlzLnN0eWxlQXJyb3cobmV4dEFycm93LCB0aGlzLnNsaWRlci5pc0F0TGFzdFBhZ2UoKSk7XG4gIH1cblxuICBvblVwZGF0ZSgpIHtcbiAgICB0aGlzLnN0eWxlQXJyb3dzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXJyb3dDb250cm9scztcbiIsIi8qKlxuICogVGhlIENvbnRyb2xzIGNsYXNzIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGNvbmNyZXRlIGNvbnRyb2xzIHRvIHVzZS5cbiAqXG4gKiBBIG51bWJlciBvZiByZXF1aXJlZCBtZXRob2RzIGFyZSBkZWZpbmVkLCB0b2dldGhlciB3aXRoIGEgZGVmYXVsdFxuICogaW1wbGVtZW50YXRvbiBvZiB0aGUge0BsaW5rIENvbnRyb2xzI2luaXRpYWxpemV9IG1ldGhvZC4gVGhlc2UgcmVxdWlyZWQgbWV0aG9kc1xuICogYXJlIHVzZWQgdG8gdXBkYXRlIHRoZSBjb250cm9scyBvbiBhIGNoYW5nZSB0YWtpbmcgcGxhY2Ugd2l0aGluIHRoZSBzbGlkZXIsXG4gKiBhbmQgbXVzdCBiZSBpbXBsZW1lbnRlZC4gQnkgZGVmYXVsdCwgdGhlIHBhZ2UgY2hhbmdlIGFuZCByZXNpemUgZXZlbnRzIGFyZVxuICogYm90aCBoYW5kbGVkIGJ5IHRoZSB7QGxpbmsgQ29udHJvbHMjb25VcGRhdGV9IG1ldGhvZC5cbiAqL1xuY2xhc3MgQ29udHJvbHMge1xuICAvKipcbiAgICogQ3JlYXRlIGEgQ29udHJvbHMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmV2aWV3U2xpZGVyfSBzbGlkZXIgLSBUaGUgUmV2aWV3U2xpZGVyIHRvIHdoaWNoIHRvIGF0dGFjaCBjb250cm9scy5cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IGVsZW1lbnRzIC0gRE9NIGVsZW1lbnRzIGZvciB0aGUgY29udHJvbHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzbGlkZXIsIGVsZW1lbnRzKSB7XG4gICAgdGhpcy5zbGlkZXIgPSBzbGlkZXI7XG4gICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9scyBpbnN0YW5jZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgYXR0YWNoZXMgbGlzdGVuZXIgY2FsbGJhY2tzIHRvIHRoZSBjb250cm9sIGVsZW1lbnRzIGFuZFxuICAgKiBhdHRhY2hlcyB0aGUgY29udHJvbHMgdGhlbXNlbHZlcyB0byB0aGUgc2xpZGVyIGFuZCBpbml0aWFsaXplcyB0aGF0LlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIHRoaXMuc2xpZGVyLmF0dGFjaE9ic2VydmVyKHRoaXMpO1xuICAgIHRoaXMuc2xpZGVyLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLm9uVXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCB0byBhdHRhY2ggY2FsbGJhY2tzIHRvIGV2ZW50cyBvbiB0aGUgYXNzb2NpYXRlZCBjb250cm9sXG4gICAqIGVsZW1lbnRzLlxuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYXR0YWNoTGlzdGVuZXJzIG1ldGhvZCBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gaW5pdGlhbGl6YXRpb24sIGFuZCB3aGVyZSBhIHBhZ2UgY2hhbmdlIG9yIHJlc2l6ZSBldmVudCBvY2N1cnNcbiAgICogaW4gdGhlIHNsaWRlci5cbiAgICovXG4gIG9uVXBkYXRlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignb25VcGRhdGUgbWV0aG9kIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgdGhlIGFzc29jaWF0ZWQgc2xpZGVyIHdoZW4gaXQgZW5jb3VudGVycyBhIHBhZ2UgY2hhbmdlIGV2ZW50LlxuICAgKi9cbiAgb25QYWdlQ2hhbmdlKCkge1xuICAgIHRoaXMub25VcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgdGhlIGFzc29jaWF0ZWQgc2xpZGVyIHdoZW4gaXQgZW5jb3VudGVycyBhIHJlc2l6ZSBldmVudC5cbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMub25VcGRhdGUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcbiIsImltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXIgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuLi9kb20nO1xuaW1wb3J0IENvbnRyb2xzIGZyb20gJy4vY29udHJvbHMnO1xuXG4vKipcbiAqIFRoZSBQYWdpbmF0aW9uQ29udHJvbHMgY2xhc3MgcHJvdmlkZXMgbG9naWMgZm9yIGNvbnRyb2xsaW5nIGEgc2xpZGluZyByZXZpZXdcbiAqIGNhcm91c2VsIHdpdGggcGFnZSBzZWxlY3Rpb24gYnV0dG9ucy5cbiAqXG4gKiBUbyB1c2UgUGFnaW5hdGlvbkNvbnRyb2xzLCBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgaXQgYW5kIHRoZW4gY2FsbFxuICoge0BsaW5rIFBhZ2luYXRpb25Db250cm9scyNpbml0aWFsaXplfS5cbiAqL1xuY2xhc3MgUGFnaW5hdGlvbkNvbnRyb2xzIGV4dGVuZHMgQ29udHJvbHMge1xuICAvKipcbiAgICogQ3JlYXRlIGFuIFBhZ2luYXRpb25Db250cm9scyBpbnN0YW5jZS5cbiAgICpcbiAgICogQW4gYXJyYXkgb2YgZWxlbWVudHMgaXMgcmVxdWlyZWQsIHdpdGggZWxlbWVudCB4IHRyaWdnZXJpbmcgYSBwYWdlIGNoYW5nZVxuICAgKiB0byBwYWdlIHgrMS4gQW4gYXJyYXkgb2YgY2FsbGJhY2tzIGlzIG9wdGlvbmFsLCBlYWNoIG9mIHdoaWNoIGNvcnJlc3BvbmRcbiAgICogdG8gYW4gZWxlbWVudCBvbiB0aGUgcGFnZSwgaS5lLiBjYWxsYmFjayB4IGlzIHRyaWdnZXIgYnkgY2xpY2tpbmcgZWxlbWVudFxuICAgKiB4LlxuICAgKlxuICAgKiBAcGFyYW0ge1Jldmlld1NsaWRlcn0gc2xpZGVyIC0gVGhlIFJldmlld1NsaWRlciB0byB3aGljaCB0byBhdHRhY2ggY29udHJvbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGVsZW1lbnRzIC0gRE9NIGVsZW1lbnRzIGZvciB0aGUgY29udHJvbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBPcHRpb25zIGZvciB0aGUgY29udHJvbHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmNhbGxiYWNrc10gLSBDYWxsYmFja3MgdG8gdHJpZ2dlciBhZnRlciBjbGlja2luZyBhIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hY3RpdmVDbGFzc10gLSBUaGUgY2xhc3MgdG8gc2V0IG9uIHRoZSBhY3RpdmUgY29udHJvbC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHNsaWRlciwgZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNsaWRlciwgZWxlbWVudHMpO1xuICAgIHRoaXMuY2FsbGJhY2tzID0gb3B0aW9ucy5jYWxsYmFja3MgfHwgW107XG4gICAgdGhpcy5hY3RpdmVDbGFzcyA9IG9wdGlvbnMuYWN0aXZlQ2xhc3M7XG4gIH1cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMuZWxlbWVudHM7XG4gICAgY29uc3Qgbm9PcCA9ICgpID0+IHt9O1xuICAgIHBhZ2luYXRpb24uZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICBhZGRDbGFzcyhlbGVtLCB0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZWxlbSwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnNsaWRlci5qdW1wVG9QYWdlKGluZGV4ICsgMSk7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbaW5kZXhdIHx8IG5vT3A7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uVXBkYXRlKCkge1xuICAgIGNvbnN0IHBhZ2luYXRpb24gPSB0aGlzLmVsZW1lbnRzO1xuICAgIHBhZ2luYXRpb24uZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5zbGlkZXIuY3VycmVudFBhZ2UgPT09IGluZGV4ICsgMTtcbiAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICBhZGRDbGFzcyhlbGVtLCB0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsZW0sIHRoaXMuYWN0aXZlQ2xhc3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25Db250cm9scztcbiIsImltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXIsIGhhbmRsZVBvcG92ZXJQb3NpdGlvbiB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFRydXN0Qm94ZXNUb3VjaCB9IGZyb20gJy4uL3RvdWNoJztcbmNvbnN0IGNsYW1wID0gKHZhbCwgbWluLCBtYXgpID0+IE1hdGgubWF4KE1hdGgubWluKHZhbCwgbWF4KSwgbWluKTtcbi8qKlxuICogVGhlIFJldmlld1NsaWRlciBjbGFzcyBwcm92aWRlcyBsb2dpYyBmb3IgaGFuZGxpbmcgc2xpZGluZyByZXZpZXcgY2Fyb3VzZWxcbiAqIGVsZW1lbnRzLlxuICpcbiAqIEEgcmV2aWV3IGNhcm91c2VsIGlzIGEgc2VyaWVzIG9mIEhUTUwgZWxlbWVudHMgdXNlZCB0byBjb250YWluIGFuZCBkaXNwbGF5XG4gKiByZXZpZXdzIHdpdGhpbiBhIFRydXN0Qm94LiBBIFJldmlld1NsaWRlciBpbnN0YW5jZSBleHBlY3RzIGNlcnRhaW4gSFRNTFxuICogZWxlbWVudHMgd2l0aGluIHRoZSBET006IGEgXCJzbGlkZXJcIiBlbGVtZW50OyBhIGNvbnRhaW5lciBlbGVtZW50IGZvciB0aGVcbiAqIHNsaWRlcjsgYW5kIGEgbGlzdCBvZiByZXZpZXcgZWxlbWVudHMuIChTZWUge0BsaW5rIFJldmlld1NsaWRlciNjb25zdHJ1Y3Rvcn1cbiAqIG9uIGhvdyB0aGVzZSBlbGVtZW50cyBhcmUgcHJvdmlkZWQgdG8gdGhlIFJldmlld1NsaWRlci4pXG4gKlxuICogVG8gdXNlIGEgUmV2aWV3U2xpZGVyLCBmaXJzdCBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgaXQuIFRoZW4sIGlmIGNvbnRyb2xzXG4gKiBhcmUgcmVxdWlyZWQsIGNvbnN0cnVjdCBhbiBpbnN0YW5jZSBvZiBvbmUgb2YgdGhlIGNvbnRyb2xzIGNsYXNzZXMgKHNlZVxuICoge0BsaW5rIEFycm93Q29udHJvbHN9IGFuZCB7QGxpbmsgUGFnaW5hdGlvbkNvbnRyb2xzfSkgYW5kIGZvbGxvd2luZyB0aGVpclxuICogaW5zdHJ1Y3Rpb25zIGZvciBpbml0aWFsaXphdGlvbi4gSWYgY29udHJvbHMgYXJlIG5vdCByZXF1aXJlZCwgc2ltcGx5IGNhbGxcbiAqIHtAbGluayBSZXZpZXdTbGlkZXIjaW5pdGlhbGl6ZX0uXG4gKi9cbmNsYXNzIFJldmlld1NsaWRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBSZXZpZXdTbGlkZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IHJldmlld3MgLSBSZXZpZXdzIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgc2xpZGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudHMgLSBET00gZWxlbWVudHMgZm9yIHRoZSBzbGlkZXIuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRzLnNsaWRlciAtIFRoZSBzbGlkZXIgZWxlbWVudC5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudHMuc2xpZGVyQ29udGFpbmVyIC0gVGhlIGNvbnRhaW5lciBmb3IgdGhlIHNsaWRlci5cbiAgICogQHBhcmFtIHtDYWxsYmFja30gdGVtcGxhdGUgLSBmdW5jdGlvbiB3aGljaCBnZW5lcmF0ZXMgSFRNTCBmb3IgYSByZXZpZXcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBPcHRpb25zIGZvciB0aGUgc2xpZGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucmV2aWV3Q2xhc3NdIC0gVGhlIGNsYXNzIG5hbWUgZm9yIGEgcmV2aWV3IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50cmFuc2l0aW9uQ2xhc3NdIC0gVGhlIGNsYXNzIG5hbWUgZm9yIGVsZW1lbnRzXG4gICAqIHdpdGggYSBzbGlkaW5nIGFuaW1hdGlvbi90cmFuc2l0aW9uLlxuICAgKiBAcGFyYW0ge2ludHxPYmplY3RbXX0gW29wdGlvbnMucmV2aWV3c1BlclBhZ2VdIC0gRWl0aGVyIHRoZSBudW1iZXIgb2ZcbiAgICogcmV2aWV3cyB0byBkaXNwbGF5IHBlciBwYWdlLCBvciBhIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIGJyZWFrcG9pbnRzXG4gICAqIHdpdGggYXNzb2NpYXRlZCByZXZpZXcgY291bnRzIChzZWUge0BsaW5rIFJldmlld1NsaWRlciNzZXRSZXZpZXdzUGVyUGFnZX0pLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmV2aWV3cywgZWxlbWVudHMsIHRlbXBsYXRlLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJldmlld3MgPSByZXZpZXdzO1xuICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcbiAgICB0aGlzLnJldmlld0NvdW50ID0gcmV2aWV3cy5sZW5ndGg7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMucmV2aWV3Q2xhc3MgPSBvcHRpb25zLnJldmlld0NsYXNzO1xuICAgIHRoaXMuc2V0UmV2aWV3c1BlclBhZ2Uob3B0aW9ucy5yZXZpZXdzUGVyUGFnZSk7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgdGhpcy5yZXNpemVUaW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgLy8gVG91Y2ggY2FsbGJhY2tzXG5cbiAgICB0aGlzLnRvdWNoU3RhcnRDYWxsYmFjayA9ICh7IHRyYW5zbGF0ZVgsIG9yaWdpblBhZ2UgfSkgPT4ge1xuICAgICAgdGhpcy5zZXRTbGlkZXJUcmFuc2l0aW9uRHVyYXRpb24oMCk7XG4gICAgICB0aGlzLnNldFNsaWRlclRyYW5zbGF0ZVgodHJhbnNsYXRlWCk7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gb3JpZ2luUGFnZTtcbiAgICB9O1xuICAgIHRoaXMudG91Y2hNb3ZlQ2FsbGJhY2sgPSAoeyB0cmFuc2xhdGVYIH0pID0+IHtcbiAgICAgIHRoaXMuc2V0U2xpZGVyVHJhbnNsYXRlWCh0cmFuc2xhdGVYKTtcbiAgICB9O1xuICAgIHRoaXMudG91Y2hFbmRDYWxsYmFjayA9ICh7IHBhZ2VzVG9Td2lwZSwgdHJhbnNpdGlvbkR1cmF0aW9uIH0pID0+IHtcbiAgICAgIHRoaXMubW92ZUNvbnRlbnQocGFnZXNUb1N3aXBlLCBjbGFtcCh0cmFuc2l0aW9uRHVyYXRpb24sIDAuMiwgMSkpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSByZXZpZXdzUGVyUGFnZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtpbnR8T2JqZWN0W119IHJldmlld3NQZXJQYWdlIC0gRWl0aGVyIHRoZSBudW1iZXIgb2YgcmV2aWV3cyB0b1xuICAgKiBkaXNwbGF5IHBlciBwYWdlLCBvciBhIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIGJyZWFrcG9pbnRzIHdpdGhcbiAgICogYXNzb2NpYXRlZCByZXZpZXcgY291bnRzLiBJbiB0aGUgY2FzZSBvZiB0aGUgbGF0dGVyLCBlYWNoIG9iamVjdCBtdXN0XG4gICAqIGNvbnRhaW4gYSBtaW5XaWR0aCBhbmQgYSByZXZpZXdzRm9yV2lkdGggcHJvcGVydHkuIFRoZSBudW1iZXIgb2YgcmV2aWV3c1xuICAgKiBkaXNwbGF5ZWQgaXMgZXF1YWwgdG8gdGhlIHJldmlld3NGb3JXaWR0aCB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGxhcmdlc3RcbiAgICogbWluaW11bSB3aWR0aCB2YWx1ZSBsZXNzIHRoYW4gdGhlIHdpZHRoIG9mIHRoZSBzbGlkZXJDb250YWluZXIuXG4gICAqL1xuICBzZXRSZXZpZXdzUGVyUGFnZShyZXZpZXdzUGVyUGFnZSkge1xuICAgIGlmICh0eXBlb2YgcmV2aWV3c1BlclBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJldmlld3NQZXJQYWdlID0gW3sgbWluV2lkdGg6IDAsIHJldmlld3NGb3JXaWR0aDogcmV2aWV3c1BlclBhZ2UgfV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmV2aWV3c1BlclBhZ2UgPSByZXZpZXdzUGVyUGFnZTtcbiAgICAgIHRoaXMucmV2aWV3c1BlclBhZ2Uuc29ydCgoeyBtaW5XaWR0aDogYSB9LCB7IG1pbldpZHRoOiBiIH0pID0+IGIgLSBhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGUgdGhlIHNsaWRlciB3aXRoIHJldmlld3MgdXNpbmcgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgcG9wdWxhdGVTbGlkZXIoKSB7XG4gICAgdGhpcy5lbGVtZW50cy5zbGlkZXIuaW5uZXJIVE1MID0gdGhpcy5yZXZpZXdzLm1hcCh0aGlzLnRlbXBsYXRlLmJpbmQodGhpcykpLmpvaW4oJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyBSZXZpZXdTbGlkZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGF0dGFjaGVzIHRoaXMgaW5zdGFuY2UgdG8gdGhlIHNsaWRlciBhbmQgd2luZG93LiBJdCBhdHRhY2hlc1xuICAgKiBhIHRvdWNoIGhhbmRsZXIgdG8gdGhlIHNsaWRlciBhbmQgZW5zdXJlcyB0aGUgcmVzaXplIGV2ZW50cyBhcmUgbGlzdGVuZWRcbiAgICogdG8uXG4gICAqL1xuICBpbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBvcHVsYXRlU2xpZGVyKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVSZXZpZXdzUGVyUGFnZSgpO1xuXG4gICAgdGhpcy50b3VjaCA9IG5ldyBUcnVzdEJveGVzVG91Y2goe1xuICAgICAgdGFyZ2V0RWxlbWVudDogdGhpcy5lbGVtZW50cy5zbGlkZXIsXG4gICAgICBwYWdlV2lkdGg6IHRoaXMuc2xpZGVyQ29udGFpbmVyV2lkdGgsXG4gICAgICB0b3VjaFN0YXJ0Q2FsbGJhY2s6IHRoaXMudG91Y2hTdGFydENhbGxiYWNrLFxuICAgICAgdG91Y2hNb3ZlQ2FsbGJhY2s6IHRoaXMudG91Y2hNb3ZlQ2FsbGJhY2ssXG4gICAgICB0b3VjaEVuZENhbGxiYWNrOiB0aGlzLnRvdWNoRW5kQ2FsbGJhY2ssXG4gICAgfSk7XG5cbiAgICB0aGlzLnRvdWNoLmF0dGFjaCgpO1xuICAgIHRoaXMud2luZG93UmVzaXplKCk7XG4gICAgdGhpcy5hdHRhY2hSZXNpemVMaXN0ZW5lcigpO1xuICAgIHRoaXMuYXR0YWNoUG9wb3Zlckxpc3RlbmVycygpO1xuXG4gICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEdldHRlcnMgJiBwcm9wZXJ0aWVzIC8vXG5cbiAgZ2V0IHRvdGFsUGFnZXMoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnJldmlld0NvdW50IC8gdGhpcy5fcmV2aWV3c1BlclBhZ2UpO1xuICB9XG5cbiAgZ2V0IHJldmlld1dpZHRoKCkge1xuICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQgfSA9IHRoaXMucmV2aWV3RWxlbWVudE1hcmdpbnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZXZpZXdXaWR0aFdpdGhNYXJnaW5zIC0gKGxlZnQgKyByaWdodCk7XG4gIH1cblxuICBnZXQgcmV2aWV3V2lkdGhXaXRoTWFyZ2lucygpIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXJDb250YWluZXJXaWR0aCAvIHRoaXMuX3Jldmlld3NQZXJQYWdlO1xuICB9XG5cbiAgZ2V0IHNsaWRlckNvbnRhaW5lcldpZHRoKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHJpZ2h0OiBhZGp1c3RtZW50Rm9yTGFzdFJpZ2h0TWFyZ2luLFxuICAgICAgbGVmdDogYWRqdXN0bWVudEZvckZpcnN0TGVmdE1hcmdpbixcbiAgICB9ID0gdGhpcy5yZXZpZXdFbGVtZW50TWFyZ2lucygpO1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5lbGVtZW50cy5zbGlkZXJDb250YWluZXIub2Zmc2V0V2lkdGggfHwgdGhpcy5fZGVmYXVsdFNsaWRlcldpZHRoKSArXG4gICAgICBhZGp1c3RtZW50Rm9yTGFzdFJpZ2h0TWFyZ2luICtcbiAgICAgIGFkanVzdG1lbnRGb3JGaXJzdExlZnRNYXJnaW5cbiAgICApO1xuICB9XG5cbiAgZ2V0IHJldmlld0VsZW1lbnRzKCkge1xuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMuZWxlbWVudHMuc2xpZGVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5yZXZpZXdDbGFzcykpO1xuICB9XG5cbiAgZ2V0Rmlyc3RWaXNpYmxlUmV2aWV3SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jldmlld3NQZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UgLSAxKTtcbiAgfVxuXG4gIGlzQXRGaXJzdFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UgPT09IDE7XG4gIH1cblxuICBpc0F0TGFzdFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UgPT09IHRoaXMudG90YWxQYWdlcztcbiAgfVxuXG4gIHNldFNsaWRlclRyYW5zbGF0ZVgocGl4ZWxzKSB7XG4gICAgdGhpcy5lbGVtZW50cy5zbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwaXhlbHN9cHgpYDtcbiAgfVxuXG4gIHNldFNsaWRlclRyYW5zaXRpb25EdXJhdGlvbihzZWNvbmRzKSB7XG4gICAgdGhpcy5lbGVtZW50cy5zbGlkZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7c2Vjb25kc31zYDtcbiAgfVxuXG4gIC8vIFJldmlldyBjYWxjdWxhdGlvbnMgLy9cblxuICByZXZpZXdFbGVtZW50TWFyZ2lucygpIHtcbiAgICBpZiAodGhpcy5yZXZpZXdFbGVtZW50cy5sZW5ndGggPT09IDAgfHwgIXRoaXMucmV2aWV3RWxlbWVudHNbMF0pIHtcbiAgICAgIHJldHVybiB7IGxlZnQ6IDAsIHJpZ2h0OiAwIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnJldmlld0VsZW1lbnRzWzBdKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCksXG4gICAgICAgIHJpZ2h0OiBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0KSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlUmV2aWV3c1BlclBhZ2UoKSB7XG4gICAgY29uc3QgY3VycmVudEJyZWFrcG9pbnQgPSB0aGlzLnJldmlld3NQZXJQYWdlLnJlZHVjZShcbiAgICAgIChyZXZpZXdDb3VudCwgeyBtaW5XaWR0aCwgcmV2aWV3c0ZvcldpZHRoIH0pID0+XG4gICAgICAgICFyZXZpZXdDb3VudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPj0gbWluV2lkdGhcbiAgICAgICAgICA/IHsgbWluV2lkdGgsIHJldmlld3NGb3JXaWR0aCB9XG4gICAgICAgICAgOiByZXZpZXdDb3VudCxcbiAgICAgIG51bGxcbiAgICApO1xuICAgIHRoaXMuX3Jldmlld3NQZXJQYWdlID0gY3VycmVudEJyZWFrcG9pbnQucmV2aWV3c0ZvcldpZHRoO1xuICAgIHRoaXMuX2RlZmF1bHRTbGlkZXJXaWR0aCA9IGN1cnJlbnRCcmVha3BvaW50Lm1pbldpZHRoO1xuICB9XG5cbiAgLy8gT2JzZXJ2ZXIgbWV0aG9kcyAvL1xuXG4gIGF0dGFjaE9ic2VydmVyKG9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gIH1cblxuICBkZXRhY2hPYnNlcnZlcihvYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnMuZmlsdGVyKChvYnMpID0+IG9icyAhPT0gb2JzZXJ2ZXIpO1xuICB9XG5cbiAgLy8gV2luZG93IHJlc2l6ZSBtZXRob2RzIC8vXG5cbiAgYXR0YWNoUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdyZXNpemUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5yZXNpemVUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy53aW5kb3dSZXNpemUoKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhdHRhY2hQb3BvdmVyTGlzdGVuZXJzKCkge1xuICAgIHRoaXMuZWxlbWVudHMuc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy50cC13aWRnZXQtcmV2aWV3X19zb3VyY2UucG9wb3Zlci1hY3RpdmF0b3InKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsICdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcG92ZXJFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudHAtd2lkZ2V0LXJldmlld19fc291cmNlX19pbmZvcm1hdGlvbicpO1xuICAgICAgICBjb25zdCBhcnJvd0VsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cC13aWRnZXQtcmV2aWV3X19zb3VyY2VfX2Fycm93Jyk7XG4gICAgICAgIGhhbmRsZVBvcG92ZXJQb3NpdGlvbihlbGVtZW50LCBwb3BvdmVyRWxlbWVudCwgdGhpcy5lbGVtZW50cy5zbGlkZXJDb250YWluZXIsIGFycm93RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHdpbmRvd1Jlc2l6ZSgpIHtcbiAgICB0aGlzLnNldFBhZ2VPblJlc2l6ZSgpO1xuICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucmV2aWV3Q291bnQgLyB0aGlzLl9yZXZpZXdzUGVyUGFnZSk7XG4gICAgY29uc3Qgc2xpZGVyV2lkdGggPSBwYWdlcyAqIHRoaXMuX3Jldmlld3NQZXJQYWdlICogdGhpcy5yZXZpZXdXaWR0aFdpdGhNYXJnaW5zO1xuICAgIHRoaXMuZWxlbWVudHMuc2xpZGVyLnN0eWxlLndpZHRoID0gYCR7c2xpZGVyV2lkdGh9cHhgO1xuICAgIHRoaXMucmV2aWV3RWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGAke3RoaXMucmV2aWV3V2lkdGh9cHhgO1xuICAgIH0pO1xuICAgIHRoaXMub2JzZXJ2ZXJzLmZvckVhY2goKG9ic2VydmVyKSA9PiBvYnNlcnZlci5vblJlc2l6ZSgpKTtcbiAgfVxuXG4gIHNldFBhZ2VPblJlc2l6ZSgpIHtcbiAgICBjb25zdCBwcmVSZXNpemUgPSB7XG4gICAgICBwYWdlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgZm9jdXNlZFJldmlld0luZGV4OiB0aGlzLl9yZXZpZXdzUGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlIC0gMSksXG4gICAgfTtcbiAgICB0aGlzLmNhbGN1bGF0ZVJldmlld3NQZXJQYWdlKCk7XG4gICAgY29uc3QgbmV3UGFnZSA9IE1hdGguZmxvb3IocHJlUmVzaXplLmZvY3VzZWRSZXZpZXdJbmRleCAvIHRoaXMuX3Jldmlld3NQZXJQYWdlKSArIDE7XG4gICAgdGhpcy5qdW1wVG9QYWdlKG5ld1BhZ2UsIDApO1xuICAgIHRoaXMudG91Y2guc2V0UGFnZVdpZHRoKHRoaXMuc2xpZGVyQ29udGFpbmVyV2lkdGgpO1xuICB9XG5cbiAgLy8gUGFnaW5hdGlvbiBtZXRob2RzIC8vXG5cbiAgbW92ZUNvbnRlbnQobnVtUGFnZXMsIHRyYW5zaXRpb25EdXJhdGlvbiA9IDEpIHtcbiAgICBjb25zdCBwYWdlTnVtYmVyID0gY2xhbXAobnVtUGFnZXMgKyB0aGlzLmN1cnJlbnRQYWdlLCAxLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMuanVtcFRvUGFnZShwYWdlTnVtYmVyLCB0cmFuc2l0aW9uRHVyYXRpb24pO1xuICB9XG5cbiAgcGFnZU9mZnNldChwYWdlTnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVyQ29udGFpbmVyV2lkdGggKiAocGFnZU51bWJlciAtIDEpICogLTE7XG4gIH1cblxuICBqdW1wVG9QYWdlKHBhZ2VOdW1iZXIsIHRyYW5zaXRpb25EdXJhdGlvbiA9IDEpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBhZ2VPZmZzZXQocGFnZU51bWJlcik7XG4gICAgdGhpcy5zZXRTbGlkZXJUcmFuc2xhdGVYKG9mZnNldCk7XG4gICAgdGhpcy5zZXRTbGlkZXJUcmFuc2l0aW9uRHVyYXRpb24odHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZU51bWJlcjtcbiAgICB0aGlzLm9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlcikgPT4gb2JzZXJ2ZXIub25QYWdlQ2hhbmdlKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJldmlld1NsaWRlcjtcbiIsIi8vIHBvbHlmaWxsIGZvciBNYXRoLnNpZ24gKG5vdCBzdXBwb3J0ZWQgaW4gc29tZSBtb2JpbGUgYnJvd3NlcnMpXG5jb25zdCBzaWduID0gKHgpID0+ICh4ID4gMCkgLSAoeCA8IDApIHx8ICt4O1xuTWF0aC5zaWduID0gTWF0aC5zaWduIHx8IHNpZ247XG5cbmV4cG9ydCBjbGFzcyBUcnVzdEJveGVzVG91Y2gge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgdGFyZ2V0RWxlbWVudCA9IG51bGwsXG4gICAgcGFnZVdpZHRoID0gbnVsbCxcbiAgICBzZW5zaXRpdml0eSA9IDI1LFxuICAgIHRvdWNoRW5kQ2FsbGJhY2sgPSAoKSA9PiB7fSxcbiAgICB0b3VjaE1vdmVDYWxsYmFjayA9ICgpID0+IHt9LFxuICAgIHRvdWNoU3RhcnRDYWxsYmFjayA9ICgpID0+IHt9LFxuICB9KSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcbiAgICB0aGlzLnBhZ2VXaWR0aCA9IHBhZ2VXaWR0aDtcbiAgICB0aGlzLnNlbnNpdGl2aXR5ID0gc2Vuc2l0aXZpdHk7XG4gICAgdGhpcy50b3VjaEVuZENhbGxiYWNrID0gdG91Y2hFbmRDYWxsYmFjaztcbiAgICB0aGlzLnRvdWNoTW92ZUNhbGxiYWNrID0gdG91Y2hNb3ZlQ2FsbGJhY2s7XG4gICAgdGhpcy50b3VjaFN0YXJ0Q2FsbGJhY2sgPSB0b3VjaFN0YXJ0Q2FsbGJhY2s7XG4gICAgdGhpcy5pbml0aWFsWCA9IDA7XG4gICAgdGhpcy5vZmZzZXREaXN0YW5jZVggPSAwO1xuICAgIHRoaXMuc3RhcnRUb3VjaFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdERyYWdEaXN0YW5jZVggPSAwO1xuICAgIHRoaXMuZGlyZWN0aW9uWCA9IDA7XG4gICAgdGhpcy5zY3JvbGxBeGlzID0gJ25vbmUnO1xuICAgIHRoaXMudG91Y2hQb3NpdGlvbiA9IHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICB9LFxuICAgICAgc3RvcDoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMudGFyZ2V0RWxlbWVudC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgIHRoaXMudGFyZ2V0RWxlbWVudC5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSAnZWFzZSc7XG4gIH1cblxuICBnZXREcmFnRGlzdGFuY2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMudG91Y2hQb3NpdGlvbi5zdG9wLnggLSB0aGlzLnRvdWNoUG9zaXRpb24uc3RhcnQueCxcbiAgICAgIHk6IHRoaXMudG91Y2hQb3NpdGlvbi5zdG9wLnkgLSB0aGlzLnRvdWNoUG9zaXRpb24uc3RhcnQueSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0UGFnZXNUb1N3aXBlKHRvd2FyZHNJbml0aWFsWCkge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5nZXREcmFnRGlzdGFuY2UoKS54ICsgdGhpcy5vZmZzZXREaXN0YW5jZVg7XG4gICAgY29uc3QgZGlzdEZyb21DbG9zZXN0UGFnZSA9IE1hdGguYWJzKGRpc3RhbmNlKSAlIHRoaXMucGFnZVdpZHRoO1xuICAgIGNvbnN0IG1heFBhZ2VzVG9Td2lwZSA9IE1hdGguY2VpbChNYXRoLmFicyhkaXN0YW5jZSAvIHRoaXMucGFnZVdpZHRoKSkgfHwgMTtcbiAgICBjb25zdCBleGNlZWRzVGhyZXNob2xkID0gZGlzdEZyb21DbG9zZXN0UGFnZSA+IHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgcmV0dXJuIGV4Y2VlZHNUaHJlc2hvbGQgJiYgIXRvd2FyZHNJbml0aWFsWCA/IG1heFBhZ2VzVG9Td2lwZSA6IG1heFBhZ2VzVG9Td2lwZSAtIDE7XG4gIH1cblxuICBzZXRQYWdlV2lkdGgocGFnZVdpZHRoKSB7XG4gICAgdGhpcy5wYWdlV2lkdGggPSBwYWdlV2lkdGg7XG4gIH1cblxuICBhdHRhY2goKSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0VG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLnRvdWNoUG9zaXRpb24uc3RhcnQueCA9IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgdGhpcy50b3VjaFBvc2l0aW9uLnN0YXJ0LnkgPSBldnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcbiAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy50YXJnZXRFbGVtZW50KTtcbiAgICAgIGxldCB0cmFuc2xhdGVYID0gMDtcbiAgICAgIGlmICh3aW5kb3cuRE9NTWF0cml4KSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyB3aW5kb3cuRE9NTWF0cml4KHN0eWxlLndlYmtpdFRyYW5zZm9ybSk7XG4gICAgICAgIHRyYW5zbGF0ZVggPSBtYXRyaXgubTQxO1xuICAgICAgICB0aGlzLmluaXRpYWxYID0gTWF0aC5yb3VuZCh0cmFuc2xhdGVYIC8gdGhpcy5wYWdlV2lkdGgpICogdGhpcy5wYWdlV2lkdGg7XG4gICAgICAgIHRoaXMub2Zmc2V0RGlzdGFuY2VYID0gdHJhbnNsYXRlWCAtIHRoaXMuaW5pdGlhbFg7XG4gICAgICB9XG4gICAgICB0aGlzLnNjcm9sbEF4aXMgPSAnbm9uZSc7XG4gICAgICAvLyBEb24ndCBwcmVzcyBsaW5rcyB3aGVuIHBhZ2VzIGFyZSBvZmZzZXRcbiAgICAgIC8vIEFzc3VtZSB1c2VyIHdhbnRzIHRvIHNjcm9sbCBvbiB4IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLm9mZnNldERpc3RhbmNlWCkgPiA1KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNjcm9sbEF4aXMgPSAneCc7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdWNoU3RhcnRDYWxsYmFjayh7XG4gICAgICAgIHRyYW5zbGF0ZVgsXG4gICAgICAgIG9yaWdpblBhZ2U6IE1hdGguYWJzKHRoaXMuaW5pdGlhbFgpIC8gdGhpcy5wYWdlV2lkdGggKyAxLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGV2dCkgPT4ge1xuICAgICAgdGhpcy50b3VjaFBvc2l0aW9uLnN0b3AueCA9IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgdGhpcy50b3VjaFBvc2l0aW9uLnN0b3AueSA9IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xuICAgICAgY29uc3QgZHJhZ0Rpc3RhbmNlID0gdGhpcy5nZXREcmFnRGlzdGFuY2UoKTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbEF4aXMgPT09ICdub25lJykge1xuICAgICAgICB0aGlzLnNjcm9sbEF4aXMgPSBNYXRoLmFicyhkcmFnRGlzdGFuY2UueCkgPj0gTWF0aC5hYnMoZHJhZ0Rpc3RhbmNlLnkpID8gJ3gnIDogJ3knO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2Nyb2xsQXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvblggPSBkcmFnRGlzdGFuY2UueCAtIHRoaXMubGFzdERyYWdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMubGFzdERyYWdEaXN0YW5jZVggPSBkcmFnRGlzdGFuY2UueDtcblxuICAgICAgICB0aGlzLnRvdWNoTW92ZUNhbGxiYWNrKHtcbiAgICAgICAgICB0cmFuc2xhdGVYOiBkcmFnRGlzdGFuY2UueCArIHRoaXMub2Zmc2V0RGlzdGFuY2VYICsgdGhpcy5pbml0aWFsWCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBlbmRUb3VjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IGRlbHRhVGltZSA9IChlbmRUb3VjaFRpbWUgLSB0aGlzLnN0YXJ0VG91Y2hUaW1lKSAvIDEwMDA7XG4gICAgICBjb25zdCBkcmFnRGlzdGFuY2UgPSB0aGlzLmdldERyYWdEaXN0YW5jZSgpO1xuICAgICAgY29uc3QgZmluZ2VyU3BlZWQgPSBNYXRoLmFicyhkcmFnRGlzdGFuY2UueCkgLyBkZWx0YVRpbWU7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSB0aGlzLnBhZ2VXaWR0aCAvIGZpbmdlclNwZWVkO1xuICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IGRyYWdEaXN0YW5jZS54ICsgdGhpcy5vZmZzZXREaXN0YW5jZVggKyB0aGlzLmluaXRpYWxYO1xuICAgICAgY29uc3QgZGlyVG9Jbml0aWFsWCA9IE1hdGguc2lnbih0aGlzLmluaXRpYWxYIC0gdHJhbnNsYXRlWCk7XG4gICAgICBjb25zdCB0b3dhcmRzSW5pdGlhbFggPSBNYXRoLnNpZ24odGhpcy5kaXJlY3Rpb25YKSA9PT0gZGlyVG9Jbml0aWFsWDtcbiAgICAgIGNvbnN0IHBhZ2VzVG9Td2lwZSA9IHRoaXMuc2Nyb2xsQXhpcyA9PT0gJ3gnID8gdGhpcy5nZXRQYWdlc1RvU3dpcGUodG93YXJkc0luaXRpYWxYKSA6IDA7XG5cbiAgICAgIHRoaXMudG91Y2hFbmRDYWxsYmFjayh7XG4gICAgICAgIHBhZ2VzVG9Td2lwZTogcGFnZXNUb1N3aXBlICogZGlyVG9Jbml0aWFsWCxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGRlZmF1bHRMb2NhbGUsIGZvcm1hdExvY2FsZSwgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24gfSBmcm9tICcuL3RyYW5zbGF0aW9ucyc7XG5cbmNvbnN0IG1hcERhdGVOdW1iZXJUb0h1bWFuID0ge1xuICAwOiAnamFudWFyeScsXG4gIDE6ICdmZWJydWFyeScsXG4gIDI6ICdtYXJjaCcsXG4gIDM6ICdhcHJpbCcsXG4gIDQ6ICdtYXknLFxuICA1OiAnanVuZScsXG4gIDY6ICdqdWx5JyxcbiAgNzogJ2F1Z3VzdCcsXG4gIDg6ICdzZXB0ZW1iZXInLFxuICA5OiAnb2N0b2JlcicsXG4gIDEwOiAnbm92ZW1iZXInLFxuICAxMTogJ2RlY2VtYmVyJyxcbn07XG5cbmNvbnN0IHNtYXJ0QWdlID0gKGxvY2FsZSwgZGF0ZSkgPT4ge1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZExvY2FsZSA9IGZvcm1hdExvY2FsZShsb2NhbGUpO1xuICBjb25zdCBwYXJzZWREYXRlID0gRGF0ZS5wYXJzZShkYXRlKTtcbiAgY29uc3QgcGFyc2VkRGF0ZUFzT2JqZWN0ID0gbmV3IERhdGUocGFyc2VkRGF0ZSk7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKChub3cgLSBwYXJzZWREYXRlKSAvIDEwMDApO1xuICBjb25zdCBtaW51dGVzID0gcm91bmRVcE9yRG93bihzZWNvbmRzLCA2MCk7XG4gIGNvbnN0IGhvdXJzID0gcm91bmRVcE9yRG93bihtaW51dGVzLCA2MCk7XG4gIGNvbnN0IGRheXMgPSByb3VuZFVwT3JEb3duKGhvdXJzLCAyNCk7XG5cbiAgaWYgKGRheXMgPj0gNykge1xuICAgIGNvbnN0IG1vbnRoID0gcGFyc2VkRGF0ZUFzT2JqZWN0LmdldE1vbnRoKCk7XG4gICAgY29uc3QgZGF5ID0gcGFyc2VkRGF0ZUFzT2JqZWN0LmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aE5hbWUgPSBtYXBEYXRlTnVtYmVyVG9IdW1hblttb250aF07XG4gICAgY29uc3QgbW9udGhOYW1lVHJhbnNsYXRlZCA9IGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGBtb250aE5hbWVzLiR7bW9udGhOYW1lfWAsIGZvcm1hdHRlZExvY2FsZSk7XG4gICAgY29uc3QgamFwYW5lc2VMb2NhbGUgPSAnamEtSlAnO1xuXG4gICAgaWYgKGZvcm1hdHRlZExvY2FsZSA9PT0gZGVmYXVsdExvY2FsZSkge1xuICAgICAgcmV0dXJuIGAke21vbnRoTmFtZVRyYW5zbGF0ZWR9ICR7ZGF5fWA7XG4gICAgfSBlbHNlIGlmIChmb3JtYXR0ZWRMb2NhbGUgPT09IGphcGFuZXNlTG9jYWxlKSB7XG4gICAgICByZXR1cm4gYCR7bW9udGhOYW1lVHJhbnNsYXRlZH0gJHtkYXl95pelYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2RheX0gJHttb250aE5hbWVUcmFuc2xhdGVkfWA7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRheXMgPiAwKSB7XG4gICAgcmV0dXJuIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGB0aW1lQWdvLmRheXMuJHtzaW5ndWxhck9yUGx1cmFsKGRheXMpfWAsIGZvcm1hdHRlZExvY2FsZSwge1xuICAgICAgJ1tjb3VudF0nOiBkYXlzLFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhvdXJzID4gMCkge1xuICAgIHJldHVybiBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbihgdGltZUFnby5ob3Vycy4ke3Npbmd1bGFyT3JQbHVyYWwoaG91cnMpfWAsIGZvcm1hdHRlZExvY2FsZSwge1xuICAgICAgJ1tjb3VudF0nOiBob3VycyxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChtaW51dGVzID4gMCkge1xuICAgIHJldHVybiBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbihcbiAgICAgIGB0aW1lQWdvLm1pbnV0ZXMuJHtzaW5ndWxhck9yUGx1cmFsKG1pbnV0ZXMpfWAsXG4gICAgICBmb3JtYXR0ZWRMb2NhbGUsXG4gICAgICB7ICdbY291bnRdJzogbWludXRlcyB9XG4gICAgKTtcbiAgfVxuXG4gIGlmIChzZWNvbmRzID49IDApIHtcbiAgICByZXR1cm4gZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oXG4gICAgICBgdGltZUFnby5zZWNvbmRzLiR7c2luZ3VsYXJPclBsdXJhbChzZWNvbmRzKX1gLFxuICAgICAgZm9ybWF0dGVkTG9jYWxlLFxuICAgICAgeyAnW2NvdW50XSc6IHNlY29uZHMgfVxuICAgICk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJvdW5kVXBPckRvd24odmFsdWUsIGludGVydmFsKSB7XG4gIHJldHVybiBpblNlY29uZFBhcnRPZlRpbWVJbnRlcnZhbCh2YWx1ZSwgaW50ZXJ2YWwpXG4gICAgPyBNYXRoLmNlaWwodmFsdWUgLyBpbnRlcnZhbClcbiAgICA6IE1hdGguZmxvb3IodmFsdWUgLyBpbnRlcnZhbCk7XG59XG5cbmZ1bmN0aW9uIGluU2Vjb25kUGFydE9mVGltZUludGVydmFsKHZhbHVlLCBpbnRlcnZhbCkge1xuICByZXR1cm4gdmFsdWUgPiBpbnRlcnZhbCAmJiB2YWx1ZSAlIGludGVydmFsID49IGludGVydmFsIC8gMjtcbn1cblxuZnVuY3Rpb24gc2luZ3VsYXJPclBsdXJhbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IDEgPyAnc2luZ3VsYXInIDogJ3BsdXJhbCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNtYXJ0QWdlO1xuIiwiZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgY29uc3Qgc3BlY2lhbENoYXJhY3RlcnMgPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmYXBvczsnLFxuICAgICcvJzogJyZzb2w7JyxcbiAgICAnPSc6ICcmZXF1YWxzOycsXG4gICAgJ2AnOiAnJmdyYXZlOycsXG4gIH07XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWzw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHNwZWNpYWxDaGFyYWN0ZXJzW3NdO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGVUZXh0KGlucHV0LCBtYXhpbXVtTGVuZ3RoKSB7XG4gIGlmIChpc05hTihtYXhpbXVtTGVuZ3RoKSkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBpZiAobWF4aW11bUxlbmd0aCA8PSAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChpbnB1dCAmJiBpbnB1dC5sZW5ndGggPiBtYXhpbXVtTGVuZ3RoKSB7XG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgbWF4aW11bUxlbmd0aCk7XG4gICAgbGV0IGxhc3RDaGFyID0gaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aCAtIDEpO1xuICAgIHdoaWxlIChsYXN0Q2hhciA9PT0gJyAnIHx8IGxhc3RDaGFyID09PSAnLicgfHwgbGFzdENoYXIgPT09ICcsJykge1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoIC0gMSk7XG4gICAgICBsYXN0Q2hhciA9IGlucHV0LmNoYXJBdChpbnB1dC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgaW5wdXQgKz0gJy4uLic7XG4gIH1cbiAgcmV0dXJuIGVzY2FwZUh0bWwoaW5wdXQpO1xufVxuXG5leHBvcnQgeyB0cnVuY2F0ZVRleHQsIGVzY2FwZUh0bWwgfTtcbiIsImltcG9ydCB7IGdldEZyYW1ld29ya1RyYW5zbGF0aW9uIH0gZnJvbSAnLi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgbWtFbGVtV2l0aFN2Z0xvb2t1cCB9IGZyb20gJy4vdGVtcGxhdGluZyc7XG5cbmNvbnN0IFZlcmlmaWNhdGlvbkxldmVscyA9IHtcbiAgVkVSSUZJRUQ6ICd2ZXJpZmllZCcsXG4gIElOVklURUQ6ICdpbnZpdGVkJyxcbiAgUkVESVJFQ1RFRDogJ3JlZGlyZWN0ZWQnLFxuICBOT1RfVkVSSUZJRUQ6ICdub3QtdmVyaWZpZWQnLFxufTtcblxuY29uc3QgUmV2aWV3U291cmNlTmFtZXMgPSB7XG4gIEJBU0lDX0xJTks6ICdCYXNpY0xpbmsnLFxuICBET01BSU5fTElOSzogJ0RvbWFpbkxpbmsnLFxuICBJTlZJVEFUSU9OX0xJTktfQVBJOiAnSW52aXRhdGlvbkxpbmtBcGknLFxuICBCVVNJTkVTU19HRU5FUkFURURfTElOSzogJ0J1c2luZXNzR2VuZXJhdGVkTGluaycsXG4gIExFR0FDWV9VTklRVUVfTElOSzogJ0xlZ2FjeVVuaXF1ZUxpbmsnLFxuICBVTklRVUVfTElOSzogJ1VuaXF1ZUxpbmsnLFxuICBFTUJFRERFRF9CVVNJTkVTU19HRU5FUkFURURfTElOS19GT1JNOiAnRW1iZWRkZWRCdXNpbmVzc0dlbmVyYXRlZExpbmtGb3JtJyxcbiAgRU1CRURERURfVU5JUVVFX0xJTktfRk9STTogJ0VtYmVkZGVkVW5pcXVlTGlua0Zvcm0nLFxuICBLSUNLU1RBUlQ6ICdLaWNrc3RhcnQnLFxuICBDT1BZX1BBU1RFX0lOVklUQVRJT046ICdDb3B5UGFzdGVJbnZpdGF0aW9uJyxcbiAgRklMRV9VUExPQURfSU5WSVRBVElPTjogJ0ZpbGVVcGxvYWRJbnZpdGF0aW9uJyxcbiAgTUFOVUFMX0lOUFVUX0lOVklUQVRJT046ICdNYW51YWxJbnB1dEludml0YXRpb24nLFxufTtcblxuY29uc3QgVmVyaWZpY2F0aW9uU291cmNlTmFtZXMgPSB7XG4gIENPTVBMSUFOQ0VfRE9DVU1FTlRBVElPTjogJ2NvbXBsaWFuY2VEb2N1bWVudGF0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMYWJlbFR5cGVzID0ge1xuICBWRVJJRklFRDogJ1ZlcmlmaWVkJyxcbiAgSU5WSVRFRDogJ0ludml0ZWQnLFxuICBSRURJUkVDVEVEOiAnUmVkaXJlY3RlZCcsXG4gIE5PVF9WRVJJRklFRDogJ05vdCB2ZXJpZmllZCcsXG59O1xuXG5jb25zdCBUb29sdGlwVHlwZXMgPSB7XG4gIFZFUklGSUVEX0RPRTogJ1ZlcmlmaWVkIERvRScsXG4gIFZFUklGSUVEX0FVVE9NQVRJQzogJ1ZlcmlmaWVkIGF1dG9tYXRpYycsXG4gIElOVklURURfTUFOVUFMOiAnSW52aXRlZCBtYW51YWwnLFxuICBJTlZJVEVEX1NFTEZfSU5WSVRFUjogJ0ludml0ZWQgc2VsZi1pbnZpdGVyJyxcbiAgUkVESVJFQ1RFRDogJ1JlZGlyZWN0ZWQnLFxuICBOT1RfVkVSSUZJRUQ6ICdOb3QgdmVyaWZpZWQnLFxufTtcblxuY29uc3QgbGFiZWxBbmRUb29sdGlwVGl0bGUgPSAobG9jYWxlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgW0xhYmVsVHlwZXMuTk9UX1ZFUklGSUVEXToge1xuICAgICAgaWNvbjogJycsXG4gICAgICBsYWJlbDogKCkgPT4gJycsXG4gICAgICBpbmZvVGl0bGU6ICgpID0+ICcnLFxuICAgIH0sXG4gICAgW0xhYmVsVHlwZXMuVkVSSUZJRURdOiB7XG4gICAgICBpY29uOiAndmVyaWZpZWRSZXZpZXcnLFxuICAgICAgbGFiZWw6ICgpID0+XG4gICAgICAgIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGByZXZpZXdzLnNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzLnZlcmlmaWVkUmV2aWV3LmxhYmVsYCwgbG9jYWxlKSxcbiAgICAgIGluZm9UaXRsZTogKCkgPT5cbiAgICAgICAgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oYHJldmlld3Muc2VydmljZVJldmlld1R5cGVMYWJlbHMudmVyaWZpZWRSZXZpZXcuaW5mb1RpdGxlYCwgbG9jYWxlKSxcbiAgICB9LFxuICAgIFtMYWJlbFR5cGVzLlJFRElSRUNURURdOiB7XG4gICAgICBpY29uOiAncmVkaXJlY3RlZFJldmlldycsXG4gICAgICBsYWJlbDogKCkgPT5cbiAgICAgICAgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oYHJldmlld3Muc2VydmljZVJldmlld1R5cGVMYWJlbHMucmVkaXJlY3RlZFJldmlldy5sYWJlbGAsIGxvY2FsZSksXG4gICAgICBpbmZvVGl0bGU6ICgpID0+XG4gICAgICAgIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKFxuICAgICAgICAgIGByZXZpZXdzLnNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzLnJlZGlyZWN0ZWRSZXZpZXcuaW5mb1RpdGxlYCxcbiAgICAgICAgICBsb2NhbGVcbiAgICAgICAgKSxcbiAgICB9LFxuICAgIFtMYWJlbFR5cGVzLklOVklURURdOiB7XG4gICAgICBpY29uOiAnaW52aXRlZFJldmlldycsXG4gICAgICBsYWJlbDogKCkgPT5cbiAgICAgICAgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oYHJldmlld3Muc2VydmljZVJldmlld1R5cGVMYWJlbHMuaW52aXRlZFJldmlldy5sYWJlbGAsIGxvY2FsZSksXG4gICAgICBpbmZvVGl0bGU6ICgpID0+XG4gICAgICAgIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGByZXZpZXdzLnNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzLmludml0ZWRSZXZpZXcuaW5mb1RpdGxlYCwgbG9jYWxlKSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgdG9vbHRpcENvbnRlbnQgPSAobG9jYWxlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgW1Rvb2x0aXBUeXBlcy5OT1RfVkVSSUZJRURdOiB7XG4gICAgICBpbmZvOiAoKSA9PiAnJyxcbiAgICB9LFxuICAgIFtUb29sdGlwVHlwZXMuVkVSSUZJRURfQVVUT01BVElDXToge1xuICAgICAgaW5mbzogKCkgPT5cbiAgICAgICAgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oYHJldmlld3Muc2VydmljZVJldmlld1R5cGVMYWJlbHMudmVyaWZpZWRSZXZpZXcuaW5mb2AsIGxvY2FsZSwge30sIFtcbiAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC50cnVzdHBpbG90LmNvbS9oYy9hcnRpY2xlcy8yMjM0MDI0NjgjdmVyaWZpZWQtcmV2aWV3cy0yXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyxcbiAgICAgICAgXSksXG4gICAgfSxcbiAgICBbVG9vbHRpcFR5cGVzLlZFUklGSUVEX0RPRV06IHtcbiAgICAgIGluZm86ICgpID0+XG4gICAgICAgIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGByZXZpZXdzLnNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzLnZlcmlmaWVkUmV2aWV3LmluZm9gLCBsb2NhbGUsIHt9LCBbXG4gICAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL3N1cHBvcnQudHJ1c3RwaWxvdC5jb20vaGMvYXJ0aWNsZXMvMjAxODE5Njk3XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyxcbiAgICAgICAgXSksXG4gICAgfSxcbiAgICBbVG9vbHRpcFR5cGVzLlJFRElSRUNURURdOiB7XG4gICAgICBpbmZvOiAoKSA9PlxuICAgICAgICBnZXRGcmFtZXdvcmtUcmFuc2xhdGlvbihcbiAgICAgICAgICBgcmV2aWV3cy5zZXJ2aWNlUmV2aWV3VHlwZUxhYmVscy5yZWRpcmVjdGVkUmV2aWV3LmluZm9gLFxuICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC50cnVzdHBpbG90LmNvbS9oYy9hcnRpY2xlcy8yMjM0MDI0NjgjcmVkaXJlY3RlZC01XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyxcbiAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgfSxcbiAgICBbVG9vbHRpcFR5cGVzLklOVklURURfTUFOVUFMXToge1xuICAgICAgaW5mbzogKCkgPT5cbiAgICAgICAgZ2V0RnJhbWV3b3JrVHJhbnNsYXRpb24oYHJldmlld3Muc2VydmljZVJldmlld1R5cGVMYWJlbHMuaW52aXRlZFJldmlldy5pbmZvYCwgbG9jYWxlLCB7fSwgW1xuICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9zdXBwb3J0LnRydXN0cGlsb3QuY29tL2hjL2FydGljbGVzLzIyMzQwMjQ2OCNpbnZpdGVkLXJldmlld3MtM1wiIHRhcmdldD1cIl9ibGFua1wiPicsXG4gICAgICAgIF0pLFxuICAgIH0sXG4gICAgW1Rvb2x0aXBUeXBlcy5JTlZJVEVEX1NFTEZfSU5WSVRFUl06IHtcbiAgICAgIGluZm86ICgpID0+XG4gICAgICAgIGdldEZyYW1ld29ya1RyYW5zbGF0aW9uKGByZXZpZXdzLnNlcnZpY2VSZXZpZXdUeXBlTGFiZWxzLmludml0ZWRSZXZpZXcuaW5mb2AsIGxvY2FsZSwge30sIFtcbiAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC50cnVzdHBpbG90LmNvbS9oYy9hcnRpY2xlcy8yMjM0MDI0NjgjaW52aXRlZC1yZXZpZXdzLTNcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nLFxuICAgICAgICBdKSxcbiAgICB9LFxuICB9O1xufTtcblxuY2xhc3MgTGFiZWxBbmRUb29sdGlwVHlwZURhdGEge1xuICBjb25zdHJ1Y3RvcihsYWJlbFR5cGVTdHJpbmcsIHRvb2x0aXBUeXBlU3RyaW5nLCBsb2NhbGUpIHtcbiAgICB0aGlzLmxhYmVsVHlwZSA9IGxhYmVsVHlwZVN0cmluZztcbiAgICB0aGlzLnRvb2x0aXBUeXBlID0gdG9vbHRpcFR5cGVTdHJpbmc7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICBsYWJlbE5vdFRyYW5zbGF0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWxUeXBlO1xuICB9XG5cbiAgbGFiZWwoKSB7XG4gICAgcmV0dXJuIGxhYmVsQW5kVG9vbHRpcFRpdGxlKHRoaXMubG9jYWxlKVt0aGlzLmxhYmVsVHlwZV0ubGFiZWwoKTtcbiAgfVxuXG4gIHRvb2x0aXBUaXRsZSgpIHtcbiAgICByZXR1cm4gbGFiZWxBbmRUb29sdGlwVGl0bGUodGhpcy5sb2NhbGUpW3RoaXMubGFiZWxUeXBlXS5pbmZvVGl0bGUoKTtcbiAgfVxuXG4gIHRvb2x0aXBDb250ZW50KCkge1xuICAgIHJldHVybiB0b29sdGlwQ29udGVudCh0aGlzLmxvY2FsZSlbdGhpcy50b29sdGlwVHlwZV0uaW5mbygpO1xuICB9XG5cbiAgaWNvbigpIHtcbiAgICBjb25zdCBpY29uID0gbGFiZWxBbmRUb29sdGlwVGl0bGUodGhpcy5sb2NhbGUpW3RoaXMubGFiZWxUeXBlXS5pY29uO1xuICAgIHJldHVybiBpY29uICYmIG1rRWxlbVdpdGhTdmdMb29rdXAoaWNvbik7XG4gIH1cbn1cblxuY29uc3QgbGFiZWxBbmRUb29sdGlwVHlwZSA9ICh7XG4gIGxvY2FsZTogbG9jYWxlLFxuICBjcmVhdGVkQXQ6IGNyZWF0ZWREYXRlVGltZSxcbiAgaXNWZXJpZmllZDogaXNWZXJpZmllZCxcbiAgcmV2aWV3U291cmNlOiByZXZpZXdTb3VyY2VOYW1lLFxuICB2ZXJpZmljYXRpb25MZXZlbDogdmVyaWZpY2F0aW9uTGV2ZWwsXG4gIHZlcmlmaWNhdGlvblNvdXJjZTogdmVyaWZpY2F0aW9uU291cmNlLFxufSkgPT4ge1xuICBjb25zdCBpc01hbnVhbEludml0YXRpb24gPSAoKSA9PlxuICAgIFtcbiAgICAgIFJldmlld1NvdXJjZU5hbWVzLktJQ0tTVEFSVCxcbiAgICAgIFJldmlld1NvdXJjZU5hbWVzLkNPUFlfUEFTVEVfSU5WSVRBVElPTixcbiAgICAgIFJldmlld1NvdXJjZU5hbWVzLkZJTEVfVVBMT0FEX0lOVklUQVRJT04sXG4gICAgICBSZXZpZXdTb3VyY2VOYW1lcy5NQU5VQUxfSU5QVVRfSU5WSVRBVElPTixcbiAgICBdLmluZGV4T2YocmV2aWV3U291cmNlTmFtZSkgIT09IC0xO1xuICBjb25zdCBpc1NlbGZJbnZpdGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJldmlld1NvdXJjZXMgPSBbXG4gICAgICBSZXZpZXdTb3VyY2VOYW1lcy5JTlZJVEFUSU9OX0xJTktfQVBJLFxuICAgICAgUmV2aWV3U291cmNlTmFtZXMuQlVTSU5FU1NfR0VORVJBVEVEX0xJTkssXG4gICAgICBSZXZpZXdTb3VyY2VOYW1lcy5MRUdBQ1lfVU5JUVVFX0xJTkssXG4gICAgICBSZXZpZXdTb3VyY2VOYW1lcy5VTklRVUVfTElOSyxcbiAgICAgIFJldmlld1NvdXJjZU5hbWVzLkVNQkVEREVEX0JVU0lORVNTX0dFTkVSQVRFRF9MSU5LX0ZPUk0sXG4gICAgICBSZXZpZXdTb3VyY2VOYW1lcy5FTUJFRERFRF9VTklRVUVfTElOS19GT1JNLFxuICAgIF07XG4gICAgY29uc3QgY3JlYXRlZEF0ID0gbmV3IERhdGUoY3JlYXRlZERhdGVUaW1lKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSgnMjAyMC0xMC0wMicpOyAvLyBSZWxlYXNlIGRhdGUgb2YgXCJTZWxmIGludml0ZWRcIlxuICAgIHJldHVybiByZXZpZXdTb3VyY2VzLmluZGV4T2YocmV2aWV3U291cmNlTmFtZSkgIT09IC0xICYmIGNyZWF0ZWRBdCA+PSBzdGFydERhdGU7XG4gIH07XG5cbiAgaWYgKHZlcmlmaWNhdGlvbkxldmVsKSB7XG4gICAgc3dpdGNoICh2ZXJpZmljYXRpb25MZXZlbCkge1xuICAgICAgY2FzZSBWZXJpZmljYXRpb25MZXZlbHMuVkVSSUZJRUQ6XG4gICAgICAgIGlmICh2ZXJpZmljYXRpb25Tb3VyY2UgPT09IFZlcmlmaWNhdGlvblNvdXJjZU5hbWVzLkNPTVBMSUFOQ0VfRE9DVU1FTlRBVElPTikge1xuICAgICAgICAgIHJldHVybiBuZXcgTGFiZWxBbmRUb29sdGlwVHlwZURhdGEoXG4gICAgICAgICAgICBMYWJlbFR5cGVzLlZFUklGSUVELFxuICAgICAgICAgICAgVG9vbHRpcFR5cGVzLlZFUklGSUVEX0RPRSxcbiAgICAgICAgICAgIGxvY2FsZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdmVyaWZpY2F0aW9uU291cmNlID09PSAnaW52aXRhdGlvbidcbiAgICAgICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKFxuICAgICAgICAgICAgTGFiZWxUeXBlcy5WRVJJRklFRCxcbiAgICAgICAgICAgIFRvb2x0aXBUeXBlcy5WRVJJRklFRF9BVVRPTUFUSUMsXG4gICAgICAgICAgICBsb2NhbGVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICBjYXNlIFZlcmlmaWNhdGlvbkxldmVscy5JTlZJVEVEOlxuICAgICAgICBpZiAoaXNNYW51YWxJbnZpdGF0aW9uKCkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKFxuICAgICAgICAgICAgTGFiZWxUeXBlcy5JTlZJVEVELFxuICAgICAgICAgICAgVG9vbHRpcFR5cGVzLklOVklURURfTUFOVUFMLFxuICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1NlbGZJbnZpdGVkKCkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKFxuICAgICAgICAgICAgTGFiZWxUeXBlcy5JTlZJVEVELFxuICAgICAgICAgICAgVG9vbHRpcFR5cGVzLklOVklURURfU0VMRl9JTlZJVEVSLFxuICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXZpZXdTb3VyY2VOYW1lID09PSBSZXZpZXdTb3VyY2VOYW1lcy5CQVNJQ19MSU5LKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBMYWJlbEFuZFRvb2x0aXBUeXBlRGF0YShcbiAgICAgICAgICAgIExhYmVsVHlwZXMuTk9UX1ZFUklGSUVELFxuICAgICAgICAgICAgVG9vbHRpcFR5cGVzLk5PVF9WRVJJRklFRCxcbiAgICAgICAgICAgIGxvY2FsZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZlcmlmaWNhdGlvbkxldmVscy5SRURJUkVDVEVEOlxuICAgICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKExhYmVsVHlwZXMuUkVESVJFQ1RFRCwgVG9vbHRpcFR5cGVzLlJFRElSRUNURUQsIGxvY2FsZSk7XG4gICAgICBjYXNlIFZlcmlmaWNhdGlvbkxldmVscy5OT1RfVkVSSUZJRUQ6XG4gICAgICAgIHJldHVybiBuZXcgTGFiZWxBbmRUb29sdGlwVHlwZURhdGEoXG4gICAgICAgICAgTGFiZWxUeXBlcy5OT1RfVkVSSUZJRUQsXG4gICAgICAgICAgVG9vbHRpcFR5cGVzLk5PVF9WRVJJRklFRCxcbiAgICAgICAgICBsb2NhbGVcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVmVyaWZpZWQpIHtcbiAgICBpZiAodmVyaWZpY2F0aW9uU291cmNlID09PSBWZXJpZmljYXRpb25Tb3VyY2VOYW1lcy5DT01QTElBTkNFX0RPQ1VNRU5UQVRJT04pIHtcbiAgICAgIHJldHVybiBuZXcgTGFiZWxBbmRUb29sdGlwVHlwZURhdGEoTGFiZWxUeXBlcy5WRVJJRklFRCwgVG9vbHRpcFR5cGVzLlZFUklGSUVEX0RPRSwgbG9jYWxlKTtcbiAgICB9IGVsc2UgaWYgKGlzTWFudWFsSW52aXRhdGlvbigpKSB7XG4gICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKExhYmVsVHlwZXMuSU5WSVRFRCwgVG9vbHRpcFR5cGVzLklOVklURURfTUFOVUFMLCBsb2NhbGUpO1xuICAgIH0gZWxzZSBpZiAoaXNTZWxmSW52aXRlZCgpKSB7XG4gICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKFxuICAgICAgICBMYWJlbFR5cGVzLklOVklURUQsXG4gICAgICAgIFRvb2x0aXBUeXBlcy5JTlZJVEVEX1NFTEZfSU5WSVRFUixcbiAgICAgICAgbG9jYWxlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKFxuICAgICAgICBMYWJlbFR5cGVzLlZFUklGSUVELFxuICAgICAgICBUb29sdGlwVHlwZXMuVkVSSUZJRURfQVVUT01BVElDLFxuICAgICAgICBsb2NhbGVcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJldmlld1NvdXJjZU5hbWUgPT09IFJldmlld1NvdXJjZU5hbWVzLkJBU0lDX0xJTkspIHtcbiAgICByZXR1cm4gbmV3IExhYmVsQW5kVG9vbHRpcFR5cGVEYXRhKExhYmVsVHlwZXMuTk9UX1ZFUklGSUVELCBUb29sdGlwVHlwZXMuTk9UX1ZFUklGSUVELCBsb2NhbGUpO1xuICB9IGVsc2UgaWYgKHJldmlld1NvdXJjZU5hbWUgPT09IFJldmlld1NvdXJjZU5hbWVzLkRPTUFJTl9MSU5LKSB7XG4gICAgcmV0dXJuIG5ldyBMYWJlbEFuZFRvb2x0aXBUeXBlRGF0YShMYWJlbFR5cGVzLlJFRElSRUNURUQsIFRvb2x0aXBUeXBlcy5SRURJUkVDVEVELCBsb2NhbGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgTGFiZWxBbmRUb29sdGlwVHlwZURhdGEoTGFiZWxUeXBlcy5OT1RfVkVSSUZJRUQsIFRvb2x0aXBUeXBlcy5OT1RfVkVSSUZJRUQsIGxvY2FsZSk7XG4gIH1cbn07XG5cbmNvbnN0IHR5cGVMYWJlbCA9IChsb2NhbGUsIHJldmlldykgPT4gbGFiZWxBbmRUb29sdGlwVHlwZSh7IGxvY2FsZSwgLi4ucmV2aWV3LnZlcmlmaWNhdGlvbiB9KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZUxhYmVsO1xuIl19