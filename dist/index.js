
  /**
   * Generated on: 1716891583866 
   *      Package: @innovaccer/design-system
   *      Version: v2.34.0
   *      License: MIT
   *         Docs: https://innovaccer.github.io/design-system
   */

    
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('classnames'), require('react-dom'), require('react-popper')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'classnames', 'react-dom', 'react-popper'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.inno = {}, global.React, global.classNames, global.ReactDOM, global.ReactPopper));
})(this, (function (exports, React, classNames, ReactDOM, reactPopper) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);
    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
    var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

    var colorToHex = function colorToHex(color) {
      return getComputedStyle(document.documentElement).getPropertyValue("--" + color);
    };

    var css = /*#__PURE__*/Object.freeze({
        __proto__: null,
        colorToHex: colorToHex
    });

    var _a$2;

    var placeholders = (_a$2 = {}, _a$2['hh:mm'] = '--:--', _a$2['hh:mm AM'] = '--:-- AM', _a$2);
    var isPlaceholderPresent = function isPlaceholderPresent(placeholderChar, time) {
      return time && time.includes(placeholderChar);
    };
    var isFormat12hour = function isFormat12hour(format) {
      return format === 'hh:mm AM';
    };

    var get12hourFormat = function get12hourFormat(hours) {
      var AMPM = hours < 12 ? 'AM' : 'PM';
      var hrs = hours % 12 || 12;
      return {
        hrs: hrs,
        AMPM: AMPM
      };
    };

    var get24hourFormat = function get24hourFormat(hours, am_pm) {
      var convertedHours = hours;

      if (am_pm) {
        if (am_pm === 'PM' && hours < 12) {
          convertedHours = hours + 12;
        } else if (am_pm === 'AM' && hours === 12) {
          convertedHours = hours - 12;
        }

        return convertedHours;
      }

      return hours;
    };

    var translateToTime = function translateToTime(format, time) {
      if (!time) return '';

      if (typeof time === 'number') {
        var timeObj = getTimeObjectFromNumber(format, time);
        return translateToString$1(format, timeObj);
      }

      return time;
    };

    var getTimeObjectFromNumber = function getTimeObjectFromNumber(format, time) {
      var d = new Date(time);
      var hrs = d.getHours();
      var hours = isFormat12hour(format) ? get12hourFormat(hrs).hrs : hrs;
      var am_pm = isFormat12hour(format) ? get12hourFormat(hrs).AMPM : '';
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        am_pm: am_pm
      };
    };

    var getTimeObjFromStr = function getTimeObjFromStr(format, time) {
      var separator = ':';
      var hours = 0;
      var minutes = 0;
      var len = format.length;
      var timeLength = time.length;
      var lastChars = format.substring(len - 2, len);
      var is12hrFormat = lastChars === 'AM' || lastChars === 'PM';
      var am_pm = is12hrFormat ? time.substring(timeLength - 2, timeLength) : '';
      var timeFormat = is12hrFormat ? time.substring(0, timeLength - 3) : time;
      var inputFormat = is12hrFormat ? format.substring(0, len - 3) : format;
      var v = timeFormat.split(separator);
      inputFormat.split(separator).forEach(function (f, i) {
        switch (f) {
          case 'hh':
            hours = +v[i] || 0;
            break;

          case 'mm':
            minutes = +v[i] || 0;
            break;
        }
      });
      return {
        hours: hours,
        minutes: minutes,
        am_pm: am_pm
      };
    };
    var getOutputTimeString = function getOutputTimeString(inputFormat, outputFormat, time) {
      if (inputFormat === outputFormat) return time;

      var _a = getTimeObjFromStr(inputFormat, time),
          hours = _a.hours,
          minutes = _a.minutes,
          am_pm = _a.am_pm;

      var AMPM = isFormat12hour(outputFormat) ? get12hourFormat(hours).AMPM : '';
      var hrs = isFormat12hour(outputFormat) ? get12hourFormat(hours).hrs : get24hourFormat(hours, am_pm);
      var timeStr = translateToString$1(outputFormat, {
        minutes: minutes,
        hours: hrs,
        am_pm: AMPM
      });
      return timeStr;
    };

    var translateToString$1 = function translateToString(format, time) {
      var hours = time.hours,
          minutes = time.minutes,
          am_pm = time.am_pm;
      var separator = ':';
      var timeFormat = format.split(' ');
      var v = timeFormat[0].split(separator);
      var val = '';
      v.forEach(function (f, i) {
        switch (f) {
          case 'hh':
            val += hours < 10 ? "0" + hours : hours;
            break;

          case 'mm':
            val += minutes < 10 ? "0" + minutes : minutes;
            break;
        }

        if (i !== f.length - 1) val += separator;
      });
      val += isFormat12hour(format) && am_pm ? " " + am_pm : '';
      return val;
    };

    var isValid = function isValid(validators) {
      var value = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        value[_i - 1] = arguments[_i];
      }

      var iterator = Array.isArray(validators) ? validators : [validators];
      return iterator.every(function (validator) {
        return validator.apply(void 0, value);
      });
    };
    var date$1 = function date(val, format) {
      var validate = function validate(date, month, year) {
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0) monthLength[1] = 29;
        return month <= 12 && date <= monthLength[month - 1];
      };

      if (val) {
        switch (format) {
          case 'dd/mm/yyyy':
            {
              var p = val.split('/');
              var date_1 = +p[0] || 1;
              var month = +p[1] || 1;
              var year = +p[2] || 1900;
              return validate(date_1, month, year);
            }

          case 'mm/dd/yyyy':
            {
              var p = val.split('/');
              var date_2 = +p[1] || 1;
              var month = +p[0] || 1;
              var year = +p[2] || 1900;
              return validate(date_2, month, year);
            }

          case 'yyyy/mm/dd':
            {
              var p = val.split('/');
              var date_3 = +p[2] || 1;
              var month = +p[1] || 1;
              var year = +p[0] || 1900;
              return validate(date_3, month, year);
            }

          case 'dd-mm-yyyy':
            {
              var p = val.split('-');
              var date_4 = +p[0] || 1;
              var month = +p[1] || 1;
              var year = +p[2] || 1900;
              return validate(date_4, month, year);
            }

          case 'mm-dd-yyyy':
            {
              var p = val.split('-');
              var date_5 = +p[1] || 1;
              var month = +p[0] || 1;
              var year = +p[2] || 1900;
              return validate(date_5, month, year);
            }

          case 'yyyy-mm-dd':
            {
              var p = val.split('-');
              var date_6 = +p[2] || 1;
              var month = +p[1] || 1;
              var year = +p[0] || 1900;
              return validate(date_6, month, year);
            }

          default:
            return false;
        }
      }

      return false;
    };
    var time$1 = function time(val, format) {
      var _a = getTimeObjFromStr(format, val),
          hours = _a.hours,
          minutes = _a.minutes;

      var hoursCond = isFormat12hour(format) ? hours <= 12 : hours < 24;
      return hoursCond && minutes <= 60;
    };
    var isNaturalNumber = function isNaturalNumber(val) {
      if (typeof val === 'string' && /[^0-9]/.test(val) || typeof val === 'number' && (val <= 0 || val - Math.floor(val) !== 0)) {
        return false;
      }

      return true;
    };

    var validators = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isValid: isValid,
        date: date$1,
        time: time$1,
        isNaturalNumber: isNaturalNumber
    });

    var _a$1;

    var date = {
      'dd/mm/yyyy': [/[0123]/, /\d/, '/', /[01]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      'mm/dd/yyyy': [/[01]/, /\d/, '/', /[0123]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      'yyyy/mm/dd': [/\d/, /\d/, /\d/, /\d/, '/', /[01]/, /\d/, '/', /[0123]/, /\d/],
      'dd-mm-yyyy': [/[0123]/, /\d/, '-', /[01]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'mm-dd-yyyy': [/[01]/, /\d/, '-', /[0123]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'yyyy-mm-dd': [/\d/, /\d/, /\d/, /\d/, '-', /[01]/, /\d/, '-', /[0123]/, /\d/]
    };
    var rangeDate = {
      'dd/mm/yyyy': [/[0123]/, /\d/, '/', /[01]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /[0123]/, /\d/, '/', /[01]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      'mm/dd/yyyy': [/[01]/, /\d/, '/', /[0123]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /[01]/, /\d/, '/', /[0123]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      'yyyy/mm/dd': [/\d/, /\d/, /\d/, /\d/, '/', /[01]/, /\d/, '/', /[0123]/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, '/', /[01]/, /\d/, '/', /[0123]/, /\d/],
      'dd-mm-yyyy': [/[0123]/, /\d/, '-', /[01]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /[0123]/, /\d/, '-', /[01]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'mm-dd-yyyy': [/[01]/, /\d/, '-', /[0123]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /[01]/, /\d/, '-', /[0123]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'yyyy-mm-dd': [/\d/, /\d/, /\d/, /\d/, '-', /[01]/, /\d/, '-', /[0123]/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, '-', /[01]/, /\d/, '-', /[0123]/, /\d/]
    };
    var time = (_a$1 = {}, _a$1['hh:mm'] = [/[0-1-2]/, /\d/, ':', /[0-5]/, /\d/], _a$1['hh:mm AM'] = [/[0-1]/, /\d/, ':', /[0-5]/, /\d/, ' ', /[APap]/, 'M'], _a$1);

    var masks = /*#__PURE__*/Object.freeze({
        __proto__: null,
        date: date,
        rangeDate: rangeDate,
        time: time
    });

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        css: css,
        validators: validators,
        masks: masks
    });

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var extractBaseProps = function extractBaseProps(props) {
      var baseProps = ['className', 'data-test'];
      var basePropsObj = baseProps.reduce(function (acc, curr) {
        var _a;

        return props[curr] ? __assign(__assign({}, acc), (_a = {}, _a[curr] = props[curr], _a)) : __assign({}, acc);
      }, {});
      return basePropsObj;
    };
    var filterProps = function filterProps(props, propsList, include) {
      return Object.entries(props).filter(function (obj) {
        return include ? propsList.includes(obj[0]) : !propsList.includes(obj[0]);
      }).reduce(function (acc, curr) {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
    };

    var AvatarContext = /*#__PURE__*/React__namespace.createContext({
      size: 'regular',
      appearance: 'secondary',
      firstName: '',
      lastName: ''
    });
    var AvatarProvider = AvatarContext.Provider;

    var appearanceMapper = {
      secondary: 'inverse',
      primary: 'white',
      alert: 'white',
      accent2: 'white',
      accent3: 'white',
      warning: 'warning_darker',
      success: 'success_darker',
      accent1: 'accent1_darker',
      accent4: 'accent4_darker'
    };
    var AvatarIcon = function AvatarIcon(props) {
      var contextProp = React__namespace.useContext(AvatarContext);
      var size = contextProp.size,
          appearance = contextProp.appearance;
      var iconSize = size === 'regular' ? 20 : 16;
      var iconAppearance = appearance && appearanceMapper[appearance] || 'inverse';
      return /*#__PURE__*/React__namespace.createElement(Icon, __assign({}, props, {
        size: iconSize,
        appearance: iconAppearance
      }));
    };

    var sizeMapper = {
      regular: 32,
      tiny: 24
    };
    var AvatarImage = function AvatarImage(props) {
      var _a, _b;

      var children = props.children,
          src = props.src;

      var _c = React__namespace.useState(false),
          error = _c[0],
          setError = _c[1];

      var contextProp = React__namespace.useContext(AvatarContext);
      var size = contextProp.size,
          appearance = contextProp.appearance,
          firstName = contextProp.firstName,
          lastName = contextProp.lastName;
      var baseProps = extractBaseProps(props);
      var initials = "" + (firstName ? firstName.trim()[0] : '') + (lastName ? lastName.trim()[0] : '');
      var imgSize = size && sizeMapper[size];
      var TextClassNames = classNames__default["default"]((_a = {}, _a["Avatar-content--" + size] = size, _a["Avatar-content--" + appearance] = appearance, _a));
      var IconClassNames = classNames__default["default"]((_b = {}, _b["Avatar-content--" + appearance] = appearance, _b));

      var onError = function onError() {
        setError(true);
      };

      if (children) {
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, children);
      }

      if (error) {
        if (initials) {
          return /*#__PURE__*/React__namespace.createElement(Text, __assign({
            weight: "medium",
            appearance: 'white',
            className: TextClassNames
          }, baseProps), initials);
        }

        return /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-Avatar--Icon",
          name: "person",
          size: size === 'regular' ? 20 : 16,
          appearance: "white",
          className: IconClassNames
        });
      }

      return /*#__PURE__*/React__namespace.createElement("img", __assign({
        "data-test": "DesignSystem-Image",
        src: src,
        alt: firstName
      }, baseProps, {
        height: imgSize,
        width: imgSize,
        onError: onError
      }));
    };

    var initialsLength = 2;
    var DefaultAppearance = 'secondary';
    var colors = ['accent4', 'primary', 'accent3', 'alert', 'accent2', 'warning', 'accent1', 'success'];
    var Avatar = function Avatar(props) {
      var _a, _b, _c, _d;

      var withTooltip = props.withTooltip,
          tooltipPosition = props.tooltipPosition,
          size = props.size,
          children = props.children,
          firstName = props.firstName,
          lastName = props.lastName,
          className = props.className,
          appearance = props.appearance,
          shape = props.shape,
          _e = props.role,
          role = _e === void 0 ? 'presentation' : _e;
      var baseProps = extractBaseProps(props);
      var initials = children && typeof children === 'string' ? children.trim().slice(0, initialsLength) : "" + (firstName ? firstName.trim()[0] : '') + (lastName ? lastName.trim()[0] : '');
      var tooltip = children && typeof children === 'string' ? children : (firstName || '') + " " + (lastName || '') || '';
      var AvatarAppearance = appearance || colors[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % 8] || DefaultAppearance;
      var AvatarClassNames = classNames__default["default"]((_a = {
        Avatar: true
      }, _a['Avatar--square'] = shape === 'square', _a["Avatar--" + size] = shape !== 'square', _a["Avatar--" + AvatarAppearance] = AvatarAppearance, _a['Avatar--disabled'] = !initials || !withTooltip, _a), className);
      var AvatarWrapperClassNames = classNames__default["default"]((_b = {}, _b['Avatar--wrapper'] = shape === 'square', _b["Avatar--" + size] = shape === 'square', _b));
      var TextClassNames = classNames__default["default"]((_c = {}, _c["Avatar-content--" + size] = size, _c["Avatar-content--" + AvatarAppearance] = AvatarAppearance, _c));
      var IconClassNames = classNames__default["default"]((_d = {}, _d["Avatar-content--" + AvatarAppearance] = AvatarAppearance, _d));
      var sharedProp = {
        size: size,
        firstName: firstName,
        lastName: lastName,
        appearance: AvatarAppearance
      };

      var renderAvatar = function renderAvatar() {
        if (children && typeof children !== 'string') {
          return /*#__PURE__*/React__namespace.createElement("span", {
            "data-test": "DesignSystem-AvatarWrapper",
            className: AvatarWrapperClassNames,
            role: role
          }, /*#__PURE__*/React__namespace.createElement(AvatarProvider, {
            value: sharedProp
          }, /*#__PURE__*/React__namespace.createElement("span", __assign({
            "data-test": "DesignSystem-Avatar"
          }, baseProps, {
            className: AvatarClassNames
          }), children)));
        }

        return /*#__PURE__*/React__namespace.createElement("span", {
          "data-test": "DesignSystem-AvatarWrapper",
          className: AvatarWrapperClassNames,
          role: role
        }, /*#__PURE__*/React__namespace.createElement("span", __assign({
          "data-test": "DesignSystem-Avatar"
        }, baseProps, {
          className: AvatarClassNames
        }), initials && /*#__PURE__*/React__namespace.createElement(Text, {
          weight: "medium",
          appearance: 'white',
          className: TextClassNames
        }, initials), !initials && /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-Avatar--Icon",
          name: "person",
          size: size === 'regular' ? 20 : 16,
          appearance: 'white',
          className: IconClassNames
        })));
      };

      var renderTooltip = function renderTooltip() {
        if (withTooltip && initials) {
          return /*#__PURE__*/React__namespace.createElement(Tooltip, {
            tooltip: tooltip,
            position: tooltipPosition,
            triggerClass: 'flex-grow-0'
          }, renderAvatar());
        }

        return renderAvatar();
      };

      return renderTooltip();
    };
    Avatar.displayName = 'Avatar';
    Avatar.Icon = AvatarIcon;
    Avatar.Image = AvatarImage;
    Avatar.defaultProps = {
      tooltipPosition: 'bottom',
      withTooltip: true,
      size: 'regular',
      shape: 'round'
    };

    var AvatarCount = function AvatarCount(props) {
      var _a, _b;

      var hiddenAvatarCount = props.hiddenAvatarCount,
          avatarStyle = props.avatarStyle,
          size = props.size,
          on = props.on;
      var ContentClass = classNames__default["default"]((_a = {}, _a["Avatar-content--secondary"] = true, _a["Avatar-content--tiny"] = size === 'tiny', _a));
      var AvatarVariantsClass = classNames__default["default"]((_b = {
        Avatar: true
      }, _b["Avatar--regular"] = size === 'regular', _b["Avatar--tiny"] = size === 'tiny', _b["Avatar--secondary"] = true, _b['Avatar--disabled'] = true, _b['cursor-pointer'] = on === 'click', _b));
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-AvatarGroup--TriggerAvatar",
        className: "AvatarCount-wrapper",
        style: avatarStyle
      }, /*#__PURE__*/React__namespace.createElement("span", {
        "data-test": "DesignSystem-AvatarGroup--TriggerAvatarVariants",
        className: AvatarVariantsClass
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: 'white',
        className: ContentClass
      }, "+" + hiddenAvatarCount)));
    };

    var Avatars = function Avatars(props) {
      var _a;

      var avatarList = props.avatarList,
          avatarStyle = props.avatarStyle,
          tooltipPosition = props.tooltipPosition,
          size = props.size;
      var GroupClass = classNames__default["default"]((_a = {}, _a["AvatarGroup-item"] = true, _a["AvatarGroup-item--tiny"] = size === 'tiny', _a["AvatarGroup-item--regular"] = size === 'regular', _a));
      var avatars = avatarList.map(function (item, index) {
        var appearance = item.appearance,
            firstName = item.firstName,
            lastName = item.lastName,
            icon = item.icon,
            image = item.image;
        return /*#__PURE__*/React__namespace.createElement("div", {
          "data-test": "DesignSystem-AvatarGroup--Avatar",
          className: GroupClass,
          style: avatarStyle,
          key: index
        }, /*#__PURE__*/React__namespace.createElement(Avatar, {
          size: size,
          appearance: appearance,
          firstName: firstName,
          lastName: lastName,
          withTooltip: true,
          tooltipPosition: tooltipPosition
        }, image || icon));
      });
      return avatars;
    };

    var AvatarPopperBody = function AvatarPopperBody(props) {
      var hiddenAvatarList = props.hiddenAvatarList,
          popperRenderer = props.popperRenderer,
          maxHeight = props.maxHeight,
          dark = props.dark;

      if (popperRenderer) {
        return popperRenderer(hiddenAvatarList);
      }

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "px-4 py-3"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "AvatarGroup-TextWrapper",
        style: {
          maxHeight: maxHeight
        }
      }, hiddenAvatarList.map(function (item, ind) {
        var _a;

        var _b = item.firstName,
            firstName = _b === void 0 ? '' : _b,
            _c = item.lastName,
            lastName = _c === void 0 ? '' : _c;
        var name = firstName + " " + lastName;
        var AvatarTextClass = classNames__default["default"]((_a = {}, _a["mb-4"] = ind < hiddenAvatarList.length - 1, _a));
        return /*#__PURE__*/React__namespace.createElement(Text, {
          key: ind,
          appearance: dark ? 'white' : 'default',
          className: AvatarTextClass,
          "data-test": "DesignSystem-AvatarGroup--Text"
        }, name);
      })));
    };

    var AvatarGroup = function AvatarGroup(props) {
      var _a, _b;

      var max = props.max,
          borderColor = props.borderColor,
          popoverOptions = props.popoverOptions,
          tooltipPosition = props.tooltipPosition,
          list = props.list,
          className = props.className,
          size = props.size;
      var popperRenderer = popoverOptions.popperRenderer,
          _c = popoverOptions.maxHeight,
          maxHeight = _c === void 0 ? 150 : _c,
          _d = popoverOptions.position,
          position = _d === void 0 ? 'bottom' : _d,
          _e = popoverOptions.on,
          on = _e === void 0 ? 'hover' : _e,
          _f = popoverOptions.dark,
          dark = _f === void 0 ? true : _f,
          _g = popoverOptions.appendToBody,
          appendToBody = _g === void 0 ? true : _g,
          _h = popoverOptions.popperClassName,
          popperClassName = _h === void 0 ? '' : _h;
      var baseProps = extractBaseProps(props);
      var hiddenAvatarCount = list.length > max ? Math.min(list.length - max, 99) : 0;
      var style = {
        backgroundColor: "" + borderColor,
        boxShadow: "0 0 0  calc(var(--spacing-xs) + var(--spacing-s)) " + borderColor
      };
      var tinyAvatarStyle = {
        boxShadow: "0 0 0  var(--spacing-s) " + borderColor
      };
      var avatarStyle = size === 'tiny' ? __assign(__assign({}, style), tinyAvatarStyle) : style;
      var avatarList = list.length === 3 ? list : list.slice(0, max);
      var AvatarGroupClass = classNames__default["default"]((_a = {}, _a['AvatarGroup'] = true, _a), className);
      var popperClass = classNames__default["default"]((_b = {}, _b['AvatarGroup-Popper'] = true, _b), popperClassName);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-AvatarGroup"
      }, baseProps, {
        className: AvatarGroupClass + " d-inline-flex"
      }), /*#__PURE__*/React__namespace.createElement(Avatars, {
        size: size,
        avatarList: avatarList,
        avatarStyle: avatarStyle,
        tooltipPosition: tooltipPosition
      }), list.length - max > 0 && list.length !== 3 && /*#__PURE__*/React__namespace.createElement(Popover, {
        on: on,
        dark: dark,
        trigger: /*#__PURE__*/React__namespace.createElement(AvatarCount, {
          on: on,
          size: size,
          hiddenAvatarCount: hiddenAvatarCount,
          avatarStyle: avatarStyle
        }),
        position: position,
        appendToBody: appendToBody,
        className: popperClass,
        offset: "medium"
      }, /*#__PURE__*/React__namespace.createElement(AvatarPopperBody, {
        hiddenAvatarList: list.slice(max, list.length),
        popperRenderer: popperRenderer,
        maxHeight: maxHeight,
        dark: dark
      })));
    };
    AvatarGroup.displayName = 'AvatarGroup';
    AvatarGroup.defaultProps = {
      max: 2,
      tooltipPosition: 'bottom',
      borderColor: 'white',
      popoverOptions: {},
      size: 'regular'
    };

    var useEffect$1 = React__namespace.useEffect,
        useState$2 = React__namespace.useState;
    var Backdrop = function Backdrop(props) {
      var className = props.className;
      var baseProps = extractBaseProps(props);

      var _a = useState$2(null),
          savedBodyOverflow = _a[0],
          setBodyOverflow = _a[1];

      var _b = React__namespace.useState(props.open),
          open = _b[0],
          setOpen = _b[1];

      var _c = React__namespace.useState(props.open),
          animate = _c[0],
          setAnimate = _c[1];

      var classes = classNames__default["default"]({
        Backdrop: true,
        'Backdrop--open': open,
        'Backdrop-animation--open': animate,
        'Backdrop-animation--close': !animate
      }, className);

      var disableBodyScroll = function disableBodyScroll() {
        document.body.style.setProperty('overflow', 'hidden', 'important');
      };

      var enableBodyScroll = function enableBodyScroll() {
        document.body.style.overflow = savedBodyOverflow || '';
        setBodyOverflow(null);
      };

      useEffect$1(function () {
        if (props.open) {
          setBodyOverflow(document.body.style.overflow);
          disableBodyScroll();
          setOpen(true);
          setAnimate(true);
        }

        if (!props.open) {
          window.setTimeout(function () {
            setOpen(false);
          }, 120);
          setAnimate(false);
          enableBodyScroll();
        }

        return function () {
          enableBodyScroll();
        };
      }, [props.open]);
      var BackdropElement = /*#__PURE__*/ReactDOM__namespace.createPortal( /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Backdrop",
        "data-layer": true,
        "data-opened": open
      }, baseProps, {
        className: classes,
        style: {
          zIndex: props.zIndex
        }
      })), document.body);
      return BackdropElement;
    };
    Backdrop.displayName = 'Backdrop';

    var Badge = function Badge(props) {
      var _a;

      var appearance = props.appearance,
          children = props.children,
          subtle = props.subtle,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        Badge: true
      }, _a["Badge--" + appearance] = appearance && !subtle, _a["Badge--subtle-" + appearance] = subtle, _a), className);
      return /*#__PURE__*/React__namespace.createElement("span", __assign({
        "data-test": "DesignSystem-Badge"
      }, baseProps, {
        className: classes
      }), children);
    };
    Badge.displayName = 'Badge';
    Badge.defaultProps = {
      appearance: 'secondary'
    };

    var RenderLink = function RenderLink(_a) {
      var item = _a.item,
          onClick = _a.onClick;

      var onClickHandler = function onClickHandler(ev) {
        if (onClick) {
          ev.preventDefault();
          onClick(item.link);
        }
      };

      return /*#__PURE__*/React__namespace.createElement(Link, {
        className: "Breadcrumbs-link ellipsis--noWrap",
        "data-test": "DesignSystem-Breadcrumbs-link",
        href: item.link,
        onClick: onClickHandler,
        appearance: "subtle",
        size: "tiny"
      }, item.label);
    };

    var RenderItem = function RenderItem(_a) {
      var item = _a.item,
          onClick = _a.onClick,
          index = _a.index,
          showTooltip = _a.showTooltip;
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: index,
        className: "Breadcrumbs-item",
        "data-test": "DesignSystem-Breadcrumbs-item"
      }, showTooltip ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
        tooltip: item.label,
        position: "bottom"
      }, /*#__PURE__*/React__namespace.createElement(RenderLink, {
        item: item,
        onClick: onClick
      })) : /*#__PURE__*/React__namespace.createElement(RenderLink, {
        item: item,
        onClick: onClick
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: "Breadcrumbs-itemSeparator"
      }, "/"));
    };

    var renderDropdown = function renderDropdown(list, onClick) {
      var options = list.map(function (item) {
        return {
          label: item.label,
          value: item.link
        };
      });

      var customTrigger = function customTrigger() {
        return /*#__PURE__*/React__namespace.createElement(Button, {
          type: "button",
          size: "tiny",
          appearance: "transparent",
          icon: "more_horiz_filled",
          largeIcon: true,
          className: "Breadcrumbs-Button",
          "data-test": "DesignSystem-Breadcrumbs--Button"
        });
      };

      return /*#__PURE__*/React__namespace.createElement(Dropdown, {
        className: "Breadcrumbs-dropdown",
        triggerSize: 'tiny',
        triggerOptions: {
          customTrigger: customTrigger
        },
        options: options,
        menu: true,
        onChange: function onChange(selected) {
          if (onClick) {
            onClick(selected);
          }
        }
      });
    };

    var Breadcrumbs = function Breadcrumbs(props) {
      var _a;

      var list = props.list,
          onClick = props.onClick,
          className = props.className,
          showTooltip = props.showTooltip;
      var baseProps = extractBaseProps(props);
      var BreadcrumbClass = classNames__default["default"]((_a = {}, _a['Breadcrumbs'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Breadcrumbs"
      }, baseProps, {
        className: BreadcrumbClass
      }), list.length <= 4 ? list.map(function (item, index) {
        return /*#__PURE__*/React__namespace.createElement(RenderItem, {
          key: index,
          item: item,
          onClick: onClick,
          showTooltip: showTooltip
        });
      }) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(RenderItem, {
        item: list[0],
        onClick: onClick,
        showTooltip: showTooltip
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex align-items-center"
      }, renderDropdown(list.slice(1, list.length - 1), onClick), /*#__PURE__*/React__namespace.createElement("span", {
        className: "Breadcrumbs-itemSeparator"
      }, "/")), /*#__PURE__*/React__namespace.createElement(RenderItem, {
        item: list[list.length - 1],
        onClick: onClick,
        showTooltip: showTooltip
      })));
    };

    var sizeMapping$3 = {
      tiny: 12,
      regular: 16,
      large: 20
    };
    var ButtonElement = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a, _b;

      var _c = props.size,
          size = _c === void 0 ? 'regular' : _c,
          _d = props.appearance,
          appearance = _d === void 0 ? 'basic' : _d,
          _e = props.iconAlign,
          iconAlign = _e === void 0 ? 'left' : _e,
          _f = props.tabIndex,
          tabIndex = _f === void 0 ? 0 : _f,
          largeIcon = props.largeIcon,
          type = props.type,
          children = props.children,
          icon = props.icon,
          expanded = props.expanded,
          selected = props.selected,
          loading = props.loading,
          disabled = props.disabled,
          className = props.className;
          props.tooltip;
          var iconType = props.iconType,
          rest = __rest(props, ["size", "appearance", "iconAlign", "tabIndex", "largeIcon", "type", "children", "icon", "expanded", "selected", "loading", "disabled", "className", "tooltip", "iconType"]);

      var buttonClass = classNames__default["default"]((_a = {}, _a['Button'] = true, _a['Button--expanded'] = expanded, _a["Button--" + size] = size, _a["Button--" + size + "Square"] = !children, _a["Button--" + appearance] = appearance, _a['Button--selected'] = selected && (appearance === 'basic' || appearance === 'transparent'), _a["Button--iconAlign-" + iconAlign] = children && iconAlign, _a["" + className] = className, _a));
      var iconClass = classNames__default["default"]((_b = {}, _b['Button-icon'] = true, _b["Button-icon--" + iconAlign] = children && iconAlign, _b));
      return /*#__PURE__*/React__namespace.createElement("button", __assign({
        "data-test": "DesignSystem-Button",
        ref: ref,
        type: type,
        className: buttonClass,
        disabled: disabled || loading,
        tabIndex: tabIndex
      }, rest), loading ? /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Spinner, {
        size: "small",
        appearance: appearance === 'basic' || appearance === 'transparent' ? 'secondary' : 'white',
        "data-test": "DesignSystem-Button--Spinner",
        className: "Button-spinner"
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        className: "Button-text Button-text--hidden"
      }, children || '')) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, icon && /*#__PURE__*/React__namespace.createElement("div", {
        className: iconClass
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-Button--Icon",
        name: icon,
        type: iconType,
        size: largeIcon && !children ? sizeMapping$3[size] + 4 : sizeMapping$3[size]
      })), children && /*#__PURE__*/React__namespace.createElement("span", {
        className: "Button-text"
      }, children)));
    });
    var Button = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var icon = props.icon,
          tooltip = props.tooltip,
          children = props.children;
      return icon && tooltip && !children ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
        tooltip: tooltip
      }, /*#__PURE__*/React__namespace.createElement(ButtonElement, __assign({}, props, {
        ref: ref
      }))) : /*#__PURE__*/React__namespace.createElement(ButtonElement, __assign({}, props, {
        ref: ref
      }));
    });
    Button.displayName = 'Button';

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    var config = {
      yearBlockRange: 12,
      yearsInRow: 3,
      monthBlock: 12,
      monthsInRow: 3,
      daysInRow: 7,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: {
        small: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        large: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      }
    };

    var yearBlockRange = config.yearBlockRange;
    var getIndexOfDay = function getIndexOfDay(day) {
      return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
    };
    var getYearBlock = function getYearBlock(year) {
      return year - year % yearBlockRange;
    };
    var getDaysInMonth = function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    };
    var getFirstDayOfMonth = function getFirstDayOfMonth(year, month) {
      return new Date(year, month).getDay();
    };
    var getDateInfo = function getDateInfo(d) {
      if (d) {
        var dateVal = convertToDate(d);

        if (dateVal) {
          var year = dateVal.getFullYear();
          var month = dateVal.getMonth();
          var day = dateVal.getDay();
          var date = dateVal.getDate();
          var decadeYear = getYearBlock(year);
          return {
            decadeYear: decadeYear,
            year: year,
            month: month,
            day: day,
            date: date
          };
        } else {
          return {};
        }
      }

      return {};
    };
    var convertToDate = function convertToDate(d, format, validators) {
      var dateVal;

      if (d) {
        if (typeof d === 'number') {
          dateVal = new Date(d);
        } else if (typeof d === 'string') {
          return format ? translateToDate(format, d, validators) : undefined;
        } else if (!(d instanceof Date)) {
          var _a = d,
              year = _a.year,
              month = _a.month,
              date = _a.date;
          dateVal = new Date(year, month, date, 0, 0, 0);
        } else {
          dateVal = d;
        }
      }

      return dateVal;
    };
    var compareYearBlock = function compareYearBlock(d, operator, currDecade) {
      if (d) {
        var limitDecade = getDateInfo(d).decadeYear;

        switch (operator) {
          case 'less':
            if (limitDecade < currDecade) return true;
            break;

          case 'more':
            if (limitDecade > currDecade) return true;
            break;

          case 'equal':
            if (limitDecade === currDecade) return true;
            break;
        }
      }

      return false;
    };
    var compareDate = function compareDate(d, operator, currYear, currMonth, currDate) {
      if (d) {
        var _a = getDateInfo(d),
            limitYear = _a.year,
            limitMonth = _a.month,
            limitDate = _a.date;

        switch (operator) {
          case 'less':
            if (limitYear < currYear) return true;
            if (limitYear > currYear) return false;

            if (currMonth !== undefined) {
              if (limitMonth < currMonth) return true;
              if (limitMonth > currMonth) return false;
            }

            if (currDate !== undefined && limitDate < currDate) return true;
            break;

          case 'more':
            if (limitYear > currYear) return true;
            if (limitYear < currYear) return false;

            if (currMonth !== undefined) {
              if (limitMonth > currMonth) return true;
              if (limitMonth < currMonth) return false;
            }

            if (currDate !== undefined && limitDate > currDate) return true;
            break;

          case 'equal':
            if (currDate !== undefined) {
              if (limitYear === currYear && limitMonth === currMonth && limitDate === currDate) return true;
            } else if (currMonth !== undefined) {
              if (limitYear === currYear && limitMonth === currMonth) return true;
            } else if (limitYear === currYear) return true;

        }
      }

      return false;
    };
    var translateToString = function translateToString(format, d) {
      if (format && d) {
        var _a = getDateInfo(d),
            year_1 = _a.year,
            month_1 = _a.month,
            date_1 = _a.date;

        var separator_1 = format.includes('/') ? '/' : '-';
        var f_1 = format.split(separator_1);
        var val = f_1.reduce(function (out, curr, i) {
          switch (curr) {
            case 'mm':
              out += (month_1 < 9 && '0') + (month_1 + 1);
              break;

            case 'yyyy':
              out += year_1;
              break;

            case 'dd':
              out += (date_1 < 10 && '0') + date_1;
              break;
          }

          if (i !== f_1.length - 1) out += separator_1;
          return out;
        }, '');
        return val;
      }

      return '';
    };
    var translateToDate = function translateToDate(format, val, validators) {
      if (validators === void 0) {
        validators = [];
      }

      if (isValid(validators, val, format)) {
        var separator = format.includes('/') ? '/' : '-';
        var year_2 = -1,
            month_2 = -1,
            date_2 = -1;
        var v_1 = val.split(separator);
        format.split(separator).forEach(function (f, i) {
          switch (f) {
            case 'mm':
              month_2 = +v_1[i] - 1;
              break;

            case 'yyyy':
              year_2 = +v_1[i];
              break;

            case 'dd':
              date_2 = +v_1[i];
              break;
          }
        });
        var d = convertToDate({
          year: year_2,
          month: month_2,
          date: date_2
        });
        return d;
      } else {
        return undefined;
      }
    };
    var dateComparison = function dateComparison(date, operator, currDate, currMonth, currYear) {
      var currentDate = new Date(currYear + "-" + currMonth + "-" + currDate);

      if (date) {
        switch (operator) {
          case 'less':
            return date <= currentDate;

          case 'equal':
            return date.toDateString() === currentDate.toDateString();

          case 'more':
            return date >= currentDate;

          default:
            return false;
        }
      }

      return false;
    };

    var Calendar = function (_super) {
      __extends(Calendar, _super);

      function Calendar(props) {
        var _this = _super.call(this, props) || this;

        _this.updateState = function (year, month, date) {
          _this.setState({
            year: year,
            month: month,
            date: date
          });
        };

        _this.getDateValue = function (year, month, date) {
          var d = new Date(year, month, date);
          return d;
        };

        _this.getNavDateInfo = function (index) {
          var _a = _this.state,
              yearBlockNav = _a.yearBlockNav,
              yearNav = _a.yearNav,
              monthNav = _a.monthNav;
          var monthBlock = config.monthBlock;
          var yearBlock = yearBlockNav;
          var month = (monthNav + index) % monthBlock === -1 ? 11 : (monthNav + index) % monthBlock;
          var year;

          if (index >= 0) {
            year = yearNav + (index !== 0 && month < monthNav ? 1 : 0);
          } else {
            year = yearNav - (index !== 0 && month > monthNav ? 1 : 0);
          }

          return {
            yearBlock: yearBlock,
            year: year,
            month: month
          };
        };

        _this.getInRangeError = function () {
          var _a = _this.props,
              rangePicker = _a.rangePicker,
              rangeLimit = _a.rangeLimit;
          var _b = _this.state,
              startDateState = _b.startDate,
              endDateState = _b.endDate,
              hoverDateState = _b.hoverDate;

          if (rangePicker && rangeLimit) {
            var _c = getDateInfo(startDateState),
                startYear = _c.year,
                startMonth = _c.month,
                startDate = _c.date;

            var _d = getDateInfo(endDateState),
                endYear = _d.year,
                endMonth = _d.month,
                endDate = _d.date;

            var _e = getDateInfo(hoverDateState),
                hoverYear = _e.year,
                hoverMonth = _e.month,
                hoverDate = _e.date;

            var limitDate = void 0;

            if (startDateState) {
              limitDate = new Date(startDateState);
              limitDate.setDate(startDate + rangeLimit);
              return compareDate(limitDate, 'less', hoverYear, hoverMonth, hoverDate + 1) || compareDate(limitDate, 'less', endYear, endMonth, endDate + 1);
            }

            if (endDateState) {
              limitDate = new Date(endDateState);
              limitDate.setDate(endDate - rangeLimit);
              return compareDate(limitDate, 'more', hoverYear, hoverMonth, hoverDate - 1) || compareDate(limitDate, 'more', startYear, startMonth, startDate - 1);
            }
          }

          return false;
        };

        _this.selectYear = function (year) {
          return function () {
            _this.updateState(year);

            _this.setState({
              view: 'month'
            });
          };
        };

        _this.yearMouseOverHandler = function (year, isCurrentYear, isDisabled, ev) {
          var onYearHover = _this.props.onYearHover;
          var yearData = {
            value: year,
            year: year,
            isCurrentYear: isCurrentYear,
            isDisabled: isDisabled
          };
          if (onYearHover) onYearHover(yearData, ev);
        };

        _this.selectMonth = function (month) {
          return function () {
            _this.updateState(_this.state.yearNav, month);

            _this.setState({
              view: 'date'
            });
          };
        };

        _this.monthMouseOverHandler = function (month, isCurrentMonth, isDisabled, ev) {
          var months = config.months;
          var onMonthHover = _this.props.onMonthHover;
          var monthData = {
            value: months[month],
            month: months[month],
            year: _this.state.year,
            isCurrentMonth: isCurrentMonth,
            isDisabled: isDisabled
          };
          if (onMonthHover) onMonthHover(monthData, ev);
        };

        _this.selectDate = function (index, date, prevMonthDayRange, dayRange) {
          var d = _this.calculateDate(index, date, prevMonthDayRange, dayRange, false);

          _this.setState({
            currDate: d
          });
        };

        _this.calculateDate = function (index, date, prevMonthDayRange, dayRange, isDateHovered) {
          var neighbouringMonthIndex;
          var neighbouringMonthDate;
          var type = '';

          if (date <= 0) {
            neighbouringMonthIndex = index - 1;
            neighbouringMonthDate = prevMonthDayRange + date;
            type = 'prev';
          } else if (date > dayRange) {
            neighbouringMonthIndex = index;
            neighbouringMonthDate = date;
          } else {
            neighbouringMonthIndex = index;
            neighbouringMonthDate = date;
          }

          var _a = _this.getNavDateInfo(neighbouringMonthIndex),
              year = _a.year,
              month = _a.month;

          if (isDateHovered === false) {
            _this.updateState(year, month, neighbouringMonthDate);

            _this.onNavIconClickHandler(type)();
          }

          var d = _this.getDateValue(year, month, neighbouringMonthDate);

          return d;
        };

        _this.onNavIconClickHandler = function (type) {
          return function () {
            var _a = _this.state,
                view = _a.view,
                yearBlockNav = _a.yearBlockNav,
                yearNav = _a.yearNav,
                monthNav = _a.monthNav;
            var yearBlockRange = config.yearBlockRange,
                monthBlock = config.monthBlock;

            switch (view) {
              case 'year':
                if (type === 'prev') _this.setState({
                  yearBlockNav: yearBlockNav - yearBlockRange
                });
                if (type === 'next') _this.setState({
                  yearBlockNav: yearBlockNav + yearBlockRange
                });
                break;

              case 'month':
                if (type === 'prev') _this.setState({
                  yearNav: yearNav - 1
                });
                if (type === 'next') _this.setState({
                  yearNav: yearNav + 1
                });
                break;

              case 'date':
                if (type === 'prev') {
                  if (monthNav === 0) _this.setState({
                    yearNav: yearNav - 1
                  });

                  _this.setState({
                    monthNav: (monthBlock + monthNav - 1) % monthBlock
                  });
                }

                if (type === 'next') {
                  if (monthNav === monthBlock - 1) _this.setState({
                    yearNav: yearNav + 1
                  });

                  _this.setState({
                    monthNav: (monthNav + 1) % monthBlock
                  });
                }

                break;
            }
          };
        };

        _this.renderJumpButton = function (type) {
          var _a;

          var _b = _this.props,
              disabledBefore = _b.disabledBefore,
              disabledAfter = _b.disabledAfter,
              size = _b.size;
          var _c = _this.state,
              view = _c.view,
              yearBlockNav = _c.yearBlockNav,
              yearNav = _c.yearNav,
              monthNav = _c.monthNav;
          var disabled = false;

          switch (view) {
            case 'year':
              if (type === 'prev') {
                disabled = compareYearBlock(disabledBefore, 'more', yearBlockNav) || compareYearBlock(disabledBefore, 'equal', yearBlockNav);
              }

              if (type === 'next') {
                disabled = compareYearBlock(disabledAfter, 'less', yearBlockNav) || compareYearBlock(disabledAfter, 'equal', yearBlockNav);
              }

              break;

            case 'month':
              if (type === 'prev') {
                disabled = compareDate(disabledBefore, 'more', yearNav - 1);
              }

              if (type === 'next') {
                disabled = compareDate(disabledAfter, 'less', yearNav + 1);
              }

              break;

            case 'date':
              if (type === 'prev') {
                disabled = compareDate(disabledBefore, 'more', yearNav, monthNav - 1);
              }

              if (type === 'next') {
                disabled = compareDate(disabledAfter, 'less', yearNav, monthNav + 1);
              }

              break;
          }

          var headerIconClass = classNames__default["default"]((_a = {
            'Calendar-headerIcon': true
          }, _a["Calendar-headerIcon--" + type] = type, _a));
          return /*#__PURE__*/React__namespace.createElement(Button, {
            type: "button",
            className: headerIconClass,
            appearance: "basic",
            icon: "arrow_" + (type === 'next' ? 'forward' : 'back'),
            disabled: disabled,
            size: size === 'small' ? 'tiny' : 'regular',
            onClick: _this.onNavIconClickHandler(type)
          });
        };

        _this.onNavHeadingClickHandler = function (currView) {
          return function () {
            var monthsInView = _this.props.monthsInView;
            var jumpView = _this.props.jumpView;

            if (jumpView) {
              if (monthsInView > 1) jumpView = false;
            }

            if (jumpView) {
              if (currView === 'year') _this.setState({
                view: 'date'
              });
              if (currView === 'month') _this.setState({
                view: 'year'
              });
              if (currView === 'date') _this.setState({
                view: 'month'
              });
            }
          };
        };

        _this.renderHeaderContent = function (index) {
          var _a = _this.props,
              size = _a.size,
              monthsInView = _a.monthsInView,
              rangePicker = _a.rangePicker;
          var _b = _this.state,
              view = _b.view,
              yearBlockNav = _b.yearBlockNav;
          var yearBlockRange = config.yearBlockRange,
              months = config.months;

          var _c = _this.getNavDateInfo(index),
              yearNavVal = _c.year,
              monthNavVal = _c.month;

          var headerContentClass = classNames__default["default"]({
            'Calendar-headerContent': true,
            'Calendar-headerContent--noIcon-left': index === monthsInView - 1,
            'Calendar-headerContent--noIcon-right': index === 0
          });
          var headerContent = '';
          if (view === 'year') headerContent = yearBlockNav + " - " + (yearBlockNav + (yearBlockRange - 1));
          if (view === 'month') headerContent = "" + yearNavVal;

          var renderHeading = function renderHeading(content) {
            if (size === 'small') {
              return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Text, {
                weight: "strong"
              }, content), view !== 'year' && !rangePicker && /*#__PURE__*/React__namespace.createElement(Icon, {
                appearance: "inverse",
                className: "pl-3",
                name: "keyboard_arrow_down"
              }));
            }

            return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Heading, {
              size: "s"
            }, content), view !== 'year' && !rangePicker && /*#__PURE__*/React__namespace.createElement(Icon, {
              appearance: "inverse",
              className: "pl-3",
              name: "keyboard_arrow_down"
            }));
          };

          return /*#__PURE__*/React__namespace.createElement("div", {
            className: headerContentClass
          }, view !== 'date' && /*#__PURE__*/React__namespace.createElement("div", {
            className: "d-flex justify-content-center align-items-center",
            onClick: _this.onNavHeadingClickHandler(view)
          }, renderHeading(headerContent)), view === 'date' && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
            onClick: _this.onNavHeadingClickHandler(view),
            className: "d-flex justify-content-center align-items-center"
          }, renderHeading(months[monthNavVal])), /*#__PURE__*/React__namespace.createElement("div", {
            className: "ml-4 d-flex justify-content-center align-items-center",
            onClick: _this.onNavHeadingClickHandler('month')
          }, renderHeading(yearNavVal))));
        };

        _this.renderBodyYear = function () {
          var yearBlockRange = config.yearBlockRange,
              yearsInRow = config.yearsInRow;
          var _a = _this.props,
              size = _a.size,
              rangePicker = _a.rangePicker,
              disabledBefore = _a.disabledBefore,
              disabledAfter = _a.disabledAfter;
          var _b = _this.state,
              yearBlockNav = _b.yearBlockNav,
              currYear = _b.currYear;
          var noOfRows = Math.ceil(yearBlockRange / yearsInRow);
          return Array.from({
            length: noOfRows
          }, function (_y, row) {
            return /*#__PURE__*/React__namespace.createElement("div", {
              key: row,
              className: "Calendar-valueRow"
            }, Array.from({
              length: yearsInRow
            }, function (_x, col) {
              var _a;

              var offset = yearsInRow * row + col;
              if (offset === yearBlockNav) return undefined;
              var year = yearBlockNav + offset;
              var disabled = compareDate(disabledBefore, 'more', year) || compareDate(disabledAfter, 'less', year);
              var active = !disabled && !rangePicker && year === _this.state.year;

              var isCurrentYear = function isCurrentYear() {
                return year === currYear;
              };

              var valueClass = classNames__default["default"]((_a = {
                'Calendar-value': true,
                'Calendar-value--active': active,
                'Calendar-value--disabled': disabled,
                'Calendar-yearValue': true
              }, _a["Calendar-yearValue--" + size] = size, _a['Calendar-value--currDateMonthYear'] = isCurrentYear(), _a));
              var textClass = classNames__default["default"]({
                'Calendar-value--currDate': isCurrentYear() && !active,
                'Calendar-text': true
              });
              var getTextColor = classNames__default["default"]({
                inverse: !active && !isCurrentYear() && !disabled,
                white: active,
                'primary-lighter': isCurrentYear() && disabled,
                primary: isCurrentYear(),
                'inverse-lightest': disabled
              });
              return /*#__PURE__*/React__namespace.createElement("div", {
                key: row + "-" + col,
                "data-test": "DesignSystem-Calendar--yearValue",
                className: valueClass,
                onClick: _this.selectYear(year),
                onMouseOver: _this.yearMouseOverHandler.bind(_this, year, isCurrentYear(), disabled)
              }, /*#__PURE__*/React__namespace.createElement(Text, {
                size: size === 'small' ? 'small' : 'regular',
                color: getTextColor,
                className: textClass
              }, year));
            }));
          });
        };

        _this.renderBodyMonth = function () {
          var monthBlock = config.monthBlock,
              monthsInRow = config.monthsInRow,
              months = config.months;
          var _a = _this.props,
              size = _a.size,
              disabledBefore = _a.disabledBefore,
              disabledAfter = _a.disabledAfter;
          var _b = _this.state,
              yearNav = _b.yearNav,
              year = _b.year,
              currYear = _b.currYear,
              currMonth = _b.currMonth;
          var noOfRows = Math.ceil(monthBlock / monthsInRow);
          return Array.from({
            length: noOfRows
          }, function (_y, row) {
            return /*#__PURE__*/React__namespace.createElement("div", {
              key: row,
              className: "Calendar-valueRow"
            }, Array.from({
              length: monthsInRow
            }, function (_x, col) {
              var _a;

              var month = monthsInRow * row + col;
              var disabled = compareDate(disabledBefore, 'more', yearNav, month) || compareDate(disabledAfter, 'less', yearNav, month);
              var active = !disabled && year === yearNav && month === _this.state.month;

              var isCurrentMonth = function isCurrentMonth() {
                return currYear === yearNav && currMonth === month;
              };

              var valueClass = classNames__default["default"]((_a = {
                'Calendar-value': true,
                'Calendar-value--active': active,
                'Calendar-value--disabled': disabled,
                'Calendar-monthValue': true
              }, _a["Calendar-monthValue--" + size] = size, _a['Calendar-value--currDateMonthYear'] = isCurrentMonth(), _a));
              var getTextColor = classNames__default["default"]({
                inverse: !active && !isCurrentMonth() && !disabled,
                white: active,
                'primary-lighter': isCurrentMonth() && disabled,
                primary: isCurrentMonth(),
                'inverse-lightest': disabled
              });
              var textClass = classNames__default["default"]({
                'Calendar-value--currDate': isCurrentMonth() && !active,
                'Calendar-text': true
              });
              return /*#__PURE__*/React__namespace.createElement("div", {
                key: row + "-" + col,
                "data-test": "DesignSystem-Calendar--monthValue",
                className: valueClass,
                onClick: _this.selectMonth(month),
                onMouseOver: _this.monthMouseOverHandler.bind(_this, month, isCurrentMonth(), disabled)
              }, /*#__PURE__*/React__namespace.createElement(Text, {
                size: size === 'small' ? 'small' : 'regular',
                color: getTextColor,
                className: textClass
              }, months[month]));
            }));
          });
        };

        _this.onDateRowMouseLeaveHandler = function () {
          var rangePicker = _this.props.rangePicker;

          if (rangePicker) {
            _this.setState({
              hoverDate: undefined
            });
          }
        };

        _this.renderBodyDate = function (index) {
          var daysInRow = config.daysInRow,
              days = config.days;
          var _a = _this.props,
              size = _a.size,
              firstDayOfWeek = _a.firstDayOfWeek;
          var textSize = size === 'large' ? 'regular' : 'small';
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
            className: "Calendar-dayValues"
          }, Array.from({
            length: 7
          }, function (_x, day) {
            var valueClass = classNames__default["default"]({
              'Calendar-valueWrapper': true
            });
            var dayValue = (day + daysInRow + getIndexOfDay(firstDayOfWeek)) % daysInRow;
            return /*#__PURE__*/React__namespace.createElement(Text, {
              key: day,
              className: valueClass,
              appearance: "default",
              weight: "strong",
              size: textSize
            }, days[size][dayValue]);
          })), /*#__PURE__*/React__namespace.createElement("div", {
            className: "Calendar-dateValues",
            onMouseLeave: _this.onDateRowMouseLeaveHandler
          }, _this.renderDateValues(index)));
        };

        _this.renderDateValues = function (index) {
          var daysInRow = config.daysInRow,
              monthBlock = config.monthBlock;
          var _a = _this.props,
              size = _a.size,
              rangePicker = _a.rangePicker,
              firstDayOfWeek = _a.firstDayOfWeek,
              disabledBefore = _a.disabledBefore,
              disabledAfter = _a.disabledAfter,
              monthsInView = _a.monthsInView,
              onDateHover = _a.onDateHover;
          var _b = _this.state,
              startDate = _b.startDate,
              endDate = _b.endDate,
              hoverDate = _b.hoverDate,
              yearState = _b.year,
              monthState = _b.month,
              dateState = _b.date,
              currMonth = _b.currMonth,
              currYear = _b.currYear,
              todayDate = _b.todayDate;

          var _c = _this.getNavDateInfo(index),
              yearNavVal = _c.year,
              monthNavVal = _c.month;

          var prevMonth = monthNavVal - 1;
          var prevYear = yearNavVal;
          var prevMonthDayRange = getDaysInMonth(prevYear, prevMonth);
          var dayRange = getDaysInMonth(yearNavVal, monthNavVal);
          var firstDayIndex = getFirstDayOfMonth(yearNavVal, monthNavVal);
          var desiredFirstDayIndex = getIndexOfDay(firstDayOfWeek);
          var dayDiff = (firstDayIndex - desiredFirstDayIndex + 7) % 7;
          var dummyDays = Math.abs(dayDiff);
          var noOfRows = Math.ceil((dayRange + dummyDays) / daysInRow);

          if (noOfRows === 6) ; else if (monthsInView > 1) ; else {
            noOfRows = noOfRows + 1;
          }

          var inRangeError = _this.getInRangeError();

          var events = _this.props.events;

          var onClickHandler = function onClickHandler(date) {
            return function () {
              if (rangePicker) {
                if (startDate && endDate) {
                  _this.selectDate(index, date, prevMonthDayRange, dayRange);
                } else {
                  if (!inRangeError) _this.selectDate(index, date, prevMonthDayRange, dayRange);
                }
              } else {
                _this.selectDate(index, date, prevMonthDayRange, dayRange);
              }
            };
          };

          var onMouseOverHandler = function onMouseOverHandler(date) {
            return function () {
              if (rangePicker) {
                var d = _this.getDateValue(yearNavVal, monthNavVal, date);

                if (!startDate || !endDate) {
                  _this.setState({
                    hoverDate: d
                  });
                }
              }
            };
          };

          var onMouseEnterHandler = function onMouseEnterHandler(date, isToday, isDisabled, ev) {
            var d = _this.calculateDate(index, date, prevMonthDayRange, dayRange, true) || new Date();
            var months = config.months,
                days = config.days;
            var dayName = days.large[d.getDay()];
            var dateData = {
              value: d.getDate(),
              isToday: isToday,
              isDisabled: isDisabled,
              todayDate: _this.state.currDate,
              fullDate: d,
              date: d.getDate(),
              month: months[d.getMonth()],
              year: d.getFullYear(),
              dayName: dayName
            };
            if (onDateHover) onDateHover(dateData, ev);
          };

          return Array.from({
            length: noOfRows
          }, function (_y, row) {
            return /*#__PURE__*/React__namespace.createElement("div", {
              key: row,
              className: "Calendar-valueRow"
            }, Array.from({
              length: daysInRow
            }, function (_x, col) {
              var _a;

              var date = daysInRow * row + col - dummyDays + 1;
              var dummy = date <= 0 || date > dayRange;
              var disabled = compareDate(disabledBefore, 'more', yearNavVal, monthNavVal, date) || compareDate(disabledAfter, 'less', yearNavVal, monthNavVal, date);
              var active = !disabled && yearState === yearNavVal && monthState === monthNavVal && dateState === date;

              var today = function today() {
                var boolVal;

                if (date <= 0) {
                  boolVal = currYear === yearNavVal && currMonth === monthNavVal - 1 && todayDate === prevMonthDayRange + date;
                } else if (date > dayRange) {
                  boolVal = currYear === yearNavVal && currMonth === monthNavVal + 1 && todayDate === date - dayRange;
                } else {
                  boolVal = currYear === yearNavVal && currMonth === monthNavVal && todayDate === date;
                }

                return boolVal;
              };

              var startActive = false;
              var endActive = false;
              var inRange = false;
              var inRangeLast = false;

              var _b = getDateInfo(startDate),
                  sYear = _b.year,
                  sMonth = _b.month,
                  sDate = _b.date;

              var _c = getDateInfo(endDate),
                  eYear = _c.year,
                  eMonth = _c.month,
                  eDate = _c.date;

              var isStart = startActive || endDate && inRangeLast && compareDate(hoverDate, 'less', eYear, eMonth, eDate);
              var isEnd = endActive || startDate && inRangeLast && compareDate(hoverDate, 'more', sYear, sMonth, sDate);
              var dateInString = "" + (date <= 0 ? prevMonthDayRange + date : date > dayRange ? date - dayRange : date);
              var monthInString = "" + (date <= 0 ? monthNavVal === 0 ? monthNavVal + monthBlock : (monthNavVal - 1) % monthBlock + 1 : date > dayRange ? (monthNavVal + 1) % monthBlock + 1 : monthNavVal + 1);
              var yearInString = "" + (date <= 0 && monthNavVal + 1 === 1 ? yearNavVal - 1 : date > dayRange && monthNavVal + 1 === 12 ? yearNavVal + 1 : yearNavVal);
              var completeDateString = (monthInString.length === 2 ? monthInString : "0" + monthInString) + "/" + (dateInString.length === 2 ? dateInString : "0" + dateInString) + "/" + yearInString;
              var isEventExist = events && _typeof(events) === 'object' && events.hasOwnProperty(completeDateString);

              if (rangePicker) {
                startActive = compareDate(startDate, 'equal', yearNavVal, monthNavVal, date);
                endActive = compareDate(endDate, 'equal', yearNavVal, monthNavVal, date);
                inRangeLast = compareDate(hoverDate, 'equal', yearNavVal, monthNavVal, date);
                active = !disabled && (startActive || endActive);

                if (startDate && endDate) {
                  inRange = !disabled && (dateComparison(startDate, 'less', dateInString, monthInString, yearInString) && dateComparison(endDate, 'more', dateInString, monthInString, yearInString) || startActive || endActive);
                } else if (startDate) {
                  inRange = !disabled && (dateComparison(hoverDate, 'more', dateInString, monthInString, yearInString) || inRangeLast) && dateComparison(startDate, 'less', dateInString, monthInString, yearInString);
                } else if (endDate) {
                  inRange = !disabled && (dateComparison(hoverDate, 'less', dateInString, monthInString, yearInString) || inRangeLast) && dateComparison(endDate, 'more', dateInString, monthInString, yearInString);
                }
              }

              var isRangeError = inRange && inRangeError;
              var isStartActive = startDate && dateComparison(startDate, 'equal', dateInString, monthInString, yearInString);
              var isEndActive = endDate && dateComparison(endDate, 'equal', dateInString, monthInString, yearInString);
              var activeDate = startDate && endDate && (isStartActive || isEndActive);
              var isHoverBackwardLast = _this.props.allowReverseSelection && dateComparison(hoverDate, 'equal', dateInString, monthInString, yearInString) && hoverDate && (startDate && hoverDate < startDate || endDate && hoverDate < endDate);
              var isHoverForwardLast = dateComparison(hoverDate, 'equal', dateInString, monthInString, yearInString) && hoverDate && startDate && hoverDate >= startDate;
              var isEdgeElement = col === 0 || col === 6;
              var isValueRange = inRange || rangePicker && (active || activeDate);
              var wrapperClass = classNames__default["default"]({
                'Calendar-valueWrapper': true,
                'Calendar-valueWrapper--inRange': !isEdgeElement && isValueRange,
                'Calendar-valueWrapper--inEdgeRange': isValueRange && isEdgeElement,
                'Calendar-valueWrapper--inRangeError': isRangeError,
                'Calendar-valueWrapper--start': isStart && !isEnd && col !== 6 || rangePicker && isStartActive && col !== 6,
                'Calendar-valueWrapper--end': isEnd && !isStart && col !== 0 || rangePicker && isEndActive && col !== 0,
                'Calendar-valueWrapper--startEnd': isStart && isEnd,
                'Calendar-valueWrapper--startError': isStart && isRangeError || rangePicker && isRangeError && isStartActive,
                'Calendar-valueWrapper--endError': isEnd && isRangeError || rangePicker && isRangeError && isEndActive,
                'Calendar-valueWrapper--dummy': dummy,
                'Calendar-valueWrapper--hoverDate': rangePicker && isHoverForwardLast,
                'Calendar-valueWrapper--hoverEndDate': rangePicker && isHoverBackwardLast,
                'Calendar-valueWrapper--inStartRange': isValueRange && col === 0 && !active && !activeDate,
                'Calendar-valueWrapper--inEndRange': isValueRange && col === 6 && !active && !activeDate
              });
              var valueClass = classNames__default["default"]((_a = {
                'Calendar-value': true,
                'Calendar-inRangeValue': !isStart && !isEnd && !active && !activeDate,
                'Calendar-value--start': isStart && !isEnd,
                'Calendar-value--end': isEnd && !isStart,
                'Calendar-value--startError': isStart && isRangeError,
                'Calendar-value--endError': isEnd && isRangeError,
                'Calendar-value--active': active || activeDate,
                'Calendar-value--disabled': disabled,
                'Calendar-dateValue': true
              }, _a["Calendar-dateValue--" + size] = size, _a['Calendar-value--currDateMonthYear'] = today(), _a['Calendar-value--currDate'] = today() && !active && !activeDate, _a));
              var getTextColor = classNames__default["default"]({
                inverse: !active && !today() && !disabled && !activeDate,
                white: active || activeDate,
                'primary-lighter': today() && disabled,
                primary: today(),
                'inverse-lightest': disabled
              });
              return /*#__PURE__*/React__namespace.createElement("div", {
                key: row + "-" + col,
                className: wrapperClass,
                "data-test": "designSystem-Calendar-WrapperClass"
              }, !dummy && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Text, {
                color: getTextColor,
                size: size === 'small' ? 'small' : 'regular',
                "data-test": "DesignSystem-Calendar--dateValue",
                className: valueClass,
                onClick: onClickHandler(date),
                onMouseOver: onMouseOverHandler(date),
                onMouseEnter: onMouseEnterHandler.bind(_this, date, today(), disabled)
              }, date), isEventExist && _this.renderEventsIndicator(size, active)), (dummy && date > 0 && index === monthsInView - 1 || dummy && date <= 0 && index === 0) && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Text, {
                appearance: active || activeDate ? 'white' : disabled ? 'disabled' : today() ? 'link' : 'default',
                size: size === 'small' ? 'small' : 'regular',
                "data-test": "DesignSystem-Calendar--dateValue",
                className: valueClass,
                onClick: onClickHandler(date),
                onMouseOver: onMouseOverHandler(date),
                onMouseEnter: onMouseEnterHandler.bind(_this, date, today(), disabled)
              }, date <= 0 ? prevMonthDayRange + date : date - dayRange), isEventExist && _this.renderEventsIndicator(size, active)));
            }));
          });
        };

        _this.renderCalendar = function (index) {
          var _a, _b;

          var _c = _this.props,
              size = _c.size,
              monthsInView = _c.monthsInView;
          var view = _this.state.view;
          var containerClass = classNames__default["default"]((_a = {}, _a['Calendar'] = true, _a["Calendar-" + view + "--" + size] = view, _a["Calendar--" + size] = size, _a));
          var headerClass = classNames__default["default"]((_b = {}, _b["Calendar-header--" + size] = size, _b));
          var bodyClass = classNames__default["default"]({
            'Calendar-body': true
          });
          return /*#__PURE__*/React__namespace.createElement("div", {
            key: index,
            "data-test": "DesignSystem-Calendar",
            className: containerClass
          }, /*#__PURE__*/React__namespace.createElement("div", {
            className: headerClass
          }, index === 0 && _this.renderJumpButton('prev'), _this.renderHeaderContent(index), index === monthsInView - 1 && _this.renderJumpButton('next')), /*#__PURE__*/React__namespace.createElement("div", {
            className: bodyClass
          }, view === 'year' && _this.renderBodyYear(), view === 'month' && _this.renderBodyMonth(), view === 'date' && _this.renderBodyDate(index)));
        };

        var _a = _this.props,
            rangePicker = _a.rangePicker,
            startDate = _a.startDate,
            endDate = _a.endDate,
            monthsInView = _a.monthsInView,
            view = _a.view;
        var currDate = rangePicker ? endDate || startDate : props.date;
        var yearNav = props.yearNav !== undefined ? props.yearNav : getDateInfo(currDate || Date.now()).year;
        var monthNav = props.monthNav !== undefined ? props.monthNav : getDateInfo(currDate || Date.now()).month;

        var _b = getDateInfo(currDate),
            year = _b.year,
            month = _b.month,
            date = _b.date;

        var todayCompleteDate = getDateInfo(new Date(Date.now()));
        _this.state = {
          currDate: currDate,
          startDate: startDate,
          endDate: endDate,
          yearNav: yearNav,
          monthNav: monthNav,
          year: year,
          month: month,
          date: date,
          todayDate: todayCompleteDate.date,
          currMonth: todayCompleteDate.month,
          currYear: todayCompleteDate.year,
          view: monthsInView > 1 ? 'date' : view,
          yearBlockNav: getYearBlock(yearNav)
        };
        return _this;
      }

      Calendar.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d, _e;

        var monthsInView = this.props.monthsInView;

        if (prevProps.date !== this.props.date) {
          var _f = getDateInfo(this.props.date),
              year = _f.year,
              month = _f.month,
              date = _f.date;

          this.updateState(year, month, date);
          var d = convertToDate(this.props.date);
          this.setState({
            currDate: d
          });
        }

        if (this.props.startDate && !isNaN(this.props.startDate.getTime()) && prevProps.startDate !== this.props.startDate) {
          var d = convertToDate(this.props.startDate);
          this.setState({
            startDate: d
          });
        }

        if (this.props.endDate && !isNaN(this.props.endDate.getTime()) && prevProps.endDate !== this.props.endDate) {
          var d = convertToDate(this.props.endDate);
          this.setState({
            endDate: d
          });
        }

        if (prevProps.view !== this.props.view) {
          if (this.props.monthsInView === 1) {
            this.setState({
              view: this.props.view
            });
          }
        }

        if (prevProps.yearNav !== this.props.yearNav) {
          var yearNav = this.props.yearNav;

          if (yearNav) {
            this.setState({
              yearNav: yearNav,
              yearBlockNav: getYearBlock(yearNav)
            });
          }
        }

        if (prevProps.monthNav !== this.props.monthNav) {
          var monthNav = this.props.monthNav;

          if (monthNav) {
            this.setState({
              monthNav: monthNav
            });
          }
        }

        if (prevState.currDate !== this.state.currDate) {
          var _g = this.props,
              rangePicker = _g.rangePicker,
              onDateChange = _g.onDateChange;
          var _h = this.state,
              currDate = _h.currDate,
              startDate = _h.startDate,
              endDate = _h.endDate;

          if (currDate) {
            if (onDateChange) onDateChange(currDate);

            if (rangePicker) {
              this.setState({
                hoverDate: undefined
              });

              if (startDate && endDate) {
                this.setState({
                  startDate: currDate,
                  endDate: undefined
                });
              } else {
                var _j = getDateInfo(currDate),
                    year = _j.year,
                    month = _j.month,
                    date = _j.date;

                if (startDate) {
                  if (compareDate(startDate, 'more', year, month, date)) {
                    this.setState({
                      startDate: currDate
                    });
                  } else {
                    this.setState({
                      endDate: currDate
                    });
                  }
                } else if (endDate) {
                  if (compareDate(endDate, 'less', year, month, date)) {
                    this.setState({
                      endDate: currDate
                    });
                  } else {
                    this.setState({
                      startDate: currDate
                    });
                  }
                } else {
                  this.setState({
                    startDate: currDate
                  });
                }
              }
            } else {
              this.setState({
                startDate: currDate
              });
            }
          }
        }

        if (this.state.startDate && !isNaN(this.state.startDate.getTime()) && ((_a = prevState.startDate) === null || _a === void 0 ? void 0 : _a.getTime()) !== ((_b = this.state.startDate) === null || _b === void 0 ? void 0 : _b.getTime()) || this.state.endDate && !isNaN((_c = this.state.endDate) === null || _c === void 0 ? void 0 : _c.getTime()) && ((_d = prevState.endDate) === null || _d === void 0 ? void 0 : _d.getTime()) !== ((_e = this.state.endDate) === null || _e === void 0 ? void 0 : _e.getTime())) {
          var onRangeChange = this.props.onRangeChange;
          var _k = this.state,
              startDate = _k.startDate,
              endDate = _k.endDate;
          if (onRangeChange) onRangeChange(startDate, endDate);
        }

        if (this.props.allowReverseSelection && prevState.hoverDate !== this.state.hoverDate) {
          var _l = this.state,
              hoverDate = _l.hoverDate,
              startDate = _l.startDate,
              endDate = _l.endDate;

          if (startDate && !endDate) {
            var _m = getDateInfo(startDate),
                year = _m.year,
                month = _m.month,
                date = _m.date;

            if (compareDate(hoverDate, 'less', year, month, date)) {
              this.setState({
                startDate: undefined,
                endDate: startDate
              });
            }
          } else if (endDate && !startDate) {
            var _o = getDateInfo(endDate),
                year = _o.year,
                month = _o.month,
                date = _o.date;

            if (compareDate(hoverDate, 'more', year, month, date)) {
              this.setState({
                startDate: endDate,
                endDate: undefined
              });
            }
          }
        }

        if (prevState.year !== this.state.year) {
          var year = this.state.year;

          if (year !== undefined && monthsInView === 1) {
            this.setState({
              year: year,
              yearBlockNav: getYearBlock(year),
              yearNav: year
            });
          }
        }

        if (prevState.month !== this.state.month) {
          var month = this.state.month;

          if (month !== undefined && monthsInView === 1) {
            this.setState({
              monthNav: month
            });
          }
        }
      };

      Calendar.prototype.renderEventsIndicator = function (size, active) {
        var _a;

        var eventsIndicatorClass = classNames__default["default"]((_a = {
          'Calendar-eventsIndicator': true
        }, _a["Calendar-eventsIndicator--" + size] = true, _a['Calendar-eventsIndicator--active'] = active, _a));
        return /*#__PURE__*/React__namespace.createElement("span", {
          "data-test": "DesignSystem-Calendar-Event-Indicator",
          className: eventsIndicatorClass
        });
      };

      Calendar.prototype.render = function () {
        var _this = this;

        var _a = this.props,
            monthsInView = _a.monthsInView,
            className = _a.className;
        var baseProps = extractBaseProps(this.props);
        var classes = classNames__default["default"]({
          'Calendar-wrapper': true
        }, className);
        return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
          className: classes,
          "data-test": "DesignSystem-Calendar-Wrapper"
        }), Array.from({
          length: monthsInView
        }, function (_x, index) {
          return _this.renderCalendar(index);
        }));
      };

      Calendar.defaultProps = {
        size: 'large',
        monthsInView: 1,
        view: 'date',
        firstDayOfWeek: 'sunday',
        jumpView: true
      };
      return Calendar;
    }(React__namespace.Component);

    var Card = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var _b = props.shadow,
          shadow = _b === void 0 ? 'shadow10' : _b,
          children = props.children,
          className = props.className,
          rest = __rest(props, ["shadow", "children", "className"]);

      var classes = classNames__default["default"]((_a = {
        Card: true
      }, _a["Card--" + shadow] = shadow, _a["" + className] = className, _a));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Card",
        ref: ref
      }, rest, {
        className: classes
      }), children);
    });
    Card.displayName = 'Card';
    Card.defaultProps = {
      shadow: 'shadow10'
    };

    var CardSubdued = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var border = props.border,
          children = props.children,
          className = props.className,
          rest = __rest(props, ["border", "children", "className"]);

      var classes = classNames__default["default"]((_a = {
        CardSubdued: true
      }, _a["CardSubdued--" + border] = border, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-CardSubdued",
        ref: ref
      }, rest, {
        className: classes
      }), children);
    });
    CardSubdued.displayName = 'CardSubdued';

    var CardHeader = function CardHeader(props) {
      var className = props.className,
          children = props.children;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        'Card-header': true
      }, className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-CardHeader"
      }, baseProps, {
        className: classes
      }), children);
    };
    CardHeader.displayName = 'CardHeader';

    var CardBody = function CardBody(props) {
      var className = props.className,
          children = props.children;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        'Card-body': true
      }, className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-CardBody"
      }, baseProps, {
        className: classes
      }), children);
    };
    CardBody.displayName = 'CardBody';

    var CardFooter = function CardFooter(props) {
      var _a;

      var className = props.className,
          children = props.children,
          withSeperator = props.withSeperator;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        'Card-footer': true
      }, _a['Card-footer--withSeperator'] = withSeperator, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-CardFooter"
      }, baseProps, {
        className: classes
      }), children);
    };
    CardFooter.displayName = 'CardFooter';
    CardFooter.defaultProps = {
      withSeperator: true
    };

    var isSpaceKey = function isSpaceKey(e) {
      return e.key === 'Space';
    };

    var allowed = {
      button: new Set(['Enter', 'Space', 'Spacebar', ' ']),
      link: new Set(['Enter']),
      checkbox: new Set([]),
      radio: new Set([])
    };

    var isKeyboardInteractionAllowed = function isKeyboardInteractionAllowed(role, key) {
      if (!allowed[role]) {
        return false;
      }

      var allowedKeys = allowed[role];
      return allowedKeys.has(key);
    };

    var useAccessibilityProps = function useAccessibilityProps(_a) {
      var onClick = _a.onClick,
          _onKeyDown = _a.onKeyDown,
          _b = _a.role,
          role = _b === void 0 ? 'button' : _b,
          tabIndex = _a.tabIndex,
          rest = __rest(_a, ["onClick", "onKeyDown", "role", "tabIndex"]);

      return __assign({}, onClick ? {
        onClick: onClick,
        role: role,
        tabIndex: tabIndex || 0,
        'aria-label': rest['aria-label'],
        onKeyDown: function onKeyDown(e) {
          if (_onKeyDown) {
            _onKeyDown(e);

            return;
          }

          var key = e.key;

          if (isKeyboardInteractionAllowed(role, key)) {
            if (onClick) {
              e.preventDefault();
              onClick(e);
            }
          }
        }
      } : {
        role: role,
        tabIndex: tabIndex,
        'aria-label': rest['aria-label']
      });
    };

    var iconTypeMapper = {
      timelapse: 'outlined',
      content_copy: 'outlined',
      speed: 'outlined',
      add_circle_outline: 'outlined',
      turned_in_not: 'outlined',
      important_devices: 'outlined',
      thumb_down_off_alt: 'outlined',
      alarm_on: 'outlined',
      calendar_view_month: 'outlined',
      aspect_ratio: 'outlined',
      change_history: 'outlined',
      arrow_circle_down: 'outlined',
      card_membership: 'outlined',
      query_builder: 'outlined',
      copyright: 'outlined',
      arrow_circle_up: 'outlined',
      alarm: 'outlined',
      work_outline: 'outlined',
      bookmark_border: 'outlined',
      delete_outline: 'outlined',
      credit_card: 'outlined',
      highlight_of: 'outlined',
      check_circle_outline: 'outlined',
      help_outline: 'outlined',
      schedule: 'outlined',
      radio_button_unchecked: 'outlined',
      radio_button_checked: 'outlined',
      "delete": 'outlined'
    };
    var Icon = function Icon(props) {
      var _a;

      var appearance = props.appearance,
          className = props.className,
          name = props.name,
          size = props.size,
          children = props.children;
      var accessibilityProps = useAccessibilityProps(props);
      var baseProps = extractBaseProps(props);
      var mapper = {
        outline: 'outlined',
        sharp: 'outlined',
        round: 'rounded',
        filled: 'rounded',
        'two-tone': 'rounded'
      };
      var type = props.type && mapper[props.type] || props.type || name && iconTypeMapper[name] || 'rounded';

      var getIconAppearance = function getIconAppearance(iconColor) {
        var x = iconColor.indexOf('_');
        return iconColor.slice(0, x) + iconColor.charAt(x + 1).toUpperCase() + iconColor.slice(x + 2);
      };

      var color = appearance && appearance.includes('_') ? getIconAppearance(appearance) : appearance;
      var iconClass = classNames__default["default"]((_a = {}, _a['material-symbols'] = true, _a['material-symbols-rounded'] = type === 'rounded', _a['material-symbols-outlined'] = type === 'outlined', _a['Icon'] = true, _a["Icon--" + color] = appearance, _a["" + className] = className, _a));
      var styles = {
        fontSize: size + "px",
        width: size + "px"
      };

      if (children && /*#__PURE__*/React__namespace.isValidElement(children)) {
        return /*#__PURE__*/React__namespace.createElement("span", __assign({}, baseProps, {
          className: className
        }), children);
      }

      return /*#__PURE__*/React__namespace.createElement("i", __assign({
        "data-test": "DesignSystem-Icon"
      }, baseProps, {
        className: iconClass,
        style: styles
      }, accessibilityProps), name);
    };
    Icon.displayName = 'Icon';
    Icon.defaultProps = {
      size: 16
    };

    var GenericText = function GenericText(_a, ref) {
      var children = _a.children,
          _b = _a.componentType,
          componentType = _b === void 0 ? 'span' : _b,
          className = _a.className,
          rest = __rest(_a, ["children", "componentType", "className"]);

      return /*#__PURE__*/React__namespace.createElement(componentType, __assign(__assign({}, rest), {
        className: className,
        ref: ref
      }), children);
    };

    var Link$1 = /*#__PURE__*/React__namespace.forwardRef(GenericText);

    var Text = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var _b = props.appearance,
          appearance = _b === void 0 ? 'default' : _b,
          _c = props.size,
          size = _c === void 0 ? 'regular' : _c,
          children = props.children,
          weight = props.weight,
          small = props.small,
          className = props.className,
          color = props.color,
          rest = __rest(props, ["appearance", "size", "children", "weight", "small", "className", "color"]);

      var classes = classNames__default["default"]((_a = {
        Text: true
      }, _a["Text--" + appearance] = !color && appearance, _a["Text--" + weight] = weight, _a["Text--" + size] = size, _a["color-" + color] = color, _a['Text--small'] = size === 'small' || small, _a), className);
      return /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        ref: ref,
        "data-test": "DesignSystem-Text"
      }, rest, {
        className: classes,
        componentType: "span"
      }), children);
    });
    Text.displayName = 'Text';
    Text.defaultProps = {
      appearance: 'default',
      size: 'regular'
    };

    var GenericChip = function GenericChip(props) {
      var _a;

      var label = props.label,
          icon = props.icon,
          clearButton = props.clearButton,
          disabled = props.disabled,
          className = props.className,
          selected = props.selected,
          onClose = props.onClose,
          onClick = props.onClick,
          labelPrefix = props.labelPrefix,
          iconType = props.iconType;
      var baseProps = extractBaseProps(props);

      var iconClass = function iconClass(align) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['Chip-icon'] = true, _a["Chip-icon--" + align] = align, _a["Chip-icon-disabled--right"] = align === 'right' && disabled, _a['cursor-pointer'] = align === 'right' && !disabled, _a['Chip-icon--selected'] = align === 'right' && selected, _a));
      };

      var onCloseHandler = function onCloseHandler(e) {
        e.stopPropagation();
        if (onClose) onClose();
      };

      var onClickHandler = function onClickHandler() {
        if (onClick) onClick();
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        if (event.key === 'Enter') {
          onCloseHandler(event);
        }
      };

      var iconAppearance = function iconAppearance(align) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['disabled'] = disabled && !selected, _a['primary_dark'] = !disabled && selected, _a['primary_lighter'] = disabled && selected, _a['subtle'] = !disabled && !selected && align === 'right', _a['inverse'] = !disabled && !selected && align === 'left', _a));
      };

      var textColor = classNames__default["default"]((_a = {}, _a['primary-lighter'] = disabled && selected, _a['inverse-lightest'] = disabled && !selected, _a['primary-dark'] = selected, _a['inverse'] = !disabled && !selected, _a));

      var renderLabel = function renderLabel() {
        if (typeof label === 'string') {
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, labelPrefix && /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-GenericChip--LabelPrefix",
            weight: "medium",
            color: textColor,
            className: "Chip-text mr-3"
          }, labelPrefix), /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-GenericChip--Text",
            color: textColor,
            className: "Chip-text"
          }, label));
        }

        return label;
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        tabIndex: disabled ? -1 : 0,
        "data-test": "DesignSystem-GenericChip--GenericChipWrapper"
      }, baseProps, {
        className: "Chip-wrapper " + className,
        onClick: onClickHandler
      }), icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-GenericChip--Icon",
        name: icon,
        type: iconType,
        appearance: iconAppearance('left'),
        className: iconClass('left')
      }), renderLabel(), clearButton && /*#__PURE__*/React__namespace.createElement("div", {
        role: "button",
        onClick: onCloseHandler,
        tabIndex: disabled ? -1 : 0,
        onKeyDown: onKeyDownHandler,
        className: iconClass('right'),
        "data-test": "DesignSystem-GenericChip--clearButton"
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        name: "clear",
        appearance: iconAppearance('right'),
        className: "p-2"
      })));
    };
    GenericChip.displayName = 'GenericChip';

    var Chip = function Chip(props) {
      var _a;

      var label = props.label,
          icon = props.icon,
          clearButton = props.clearButton,
          type = props.type,
          disabled = props.disabled,
          selected = props.selected,
          onClose = props.onClose,
          onClick = props.onClick,
          name = props.name,
          className = props.className,
          labelPrefix = props.labelPrefix,
          iconType = props.iconType;
      var baseProps = extractBaseProps(props);

      var onCloseHandler = function onCloseHandler() {
        if (!disabled && onClose) onClose(name);
      };

      var onClickHandler = function onClickHandler() {
        if (!disabled && onClick) onClick(name);
      };

      var clearbutton = type === 'action' ? false : clearButton;
      var select = type === 'selection' && selected ? true : false;
      var chipClass = classNames__default["default"]((_a = {
        Chip: true
      }, _a["Chip-" + type + "--disabled"] = disabled, _a["Chip--" + type] = type && !disabled, _a["Chip-" + type + "--selected"] = selected && !disabled, _a["Chip-selection--selectedDisabled"] = type === 'selection' && selected && disabled, _a['Chip-icon--clear'] = clearbutton, _a), className);
      return /*#__PURE__*/React__namespace.createElement(GenericChip, __assign({
        "data-test": "DesignSystem-Chip--GenericChip"
      }, baseProps, {
        label: label,
        selected: select,
        icon: icon,
        iconType: iconType,
        clearButton: clearbutton,
        disabled: disabled,
        className: chipClass,
        onClose: onCloseHandler,
        onClick: onClickHandler,
        name: name,
        labelPrefix: labelPrefix
      }));
    };
    Chip.displayName = 'Chip';
    Chip.defaultProps = {
      type: 'input'
    };

    var ChipGroup = function ChipGroup(props) {
      var _a;

      var list = props.list,
          onClick = props.onClick,
          onClose = props.onClose,
          className = props.className;
      var baseProps = extractBaseProps(props);

      var onClickHandler = function onClickHandler(item) {
        if (onClick) onClick(item);
      };

      var onCloseHandler = function onCloseHandler(item) {
        if (onClose) onClose(item);
      };

      var ChipGroupClass = classNames__default["default"]((_a = {}, _a['ChipGroup'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-ChipGroup"
      }, baseProps, {
        className: ChipGroupClass
      }), list.map(function (item, ind) {
        var _a = item.label,
            label = _a === void 0 ? '' : _a,
            icon = item.icon,
            type = item.type,
            disabled = item.disabled,
            selected = item.selected,
            clearButton = item.clearButton,
            name = item.name,
            iconType = item.iconType;
        return /*#__PURE__*/React__namespace.createElement("span", {
          key: ind,
          className: "ChipGroup-item"
        }, /*#__PURE__*/React__namespace.createElement(Chip, {
          "data-test": "DesignSystem-ChipGroup--Chip",
          name: name,
          label: label,
          selected: selected,
          icon: icon,
          disabled: disabled,
          clearButton: clearButton,
          iconType: iconType,
          type: type,
          onClick: function onClick() {
            return onClickHandler(item);
          },
          onClose: function onClose() {
            return onCloseHandler(item);
          }
        }));
      }));
    };
    ChipGroup.displayName = 'ChipGroup';

    var uidGenerator = function uidGenerator() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        var s = (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
        return s;
      });
      return uuid;
    };

    var CheckboxIcon = function CheckboxIcon(props) {
      switch (props.name) {
        case 'checked--regular':
          return /*#__PURE__*/React__default["default"].createElement("svg", {
            width: "10",
            height: "8",
            viewBox: "0 0 10 8",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React__default["default"].createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.66667 5.56L8.72667 0.5L9.66667 1.44667L3.66667 7.44667L0.333333 4.11333L1.27333 3.17333L3.66667 5.56Z",
            fill: "white"
          }));

        case 'checked--tiny':
          return /*#__PURE__*/React__default["default"].createElement("svg", {
            width: "10",
            height: "8",
            viewBox: "0 0 10 8",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React__default["default"].createElement("path", {
            d: "M0.333344 4L1.27334 3.06L3.66668 5.44667L8.72668 0.386665L9.66668 1.33333L3.66668 7.33333L0.333344 4Z",
            fill: "white"
          }));

        case 'indeterminate--regular':
          return /*#__PURE__*/React__default["default"].createElement("svg", {
            width: "10",
            height: "2",
            viewBox: "0 0 10 2",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React__default["default"].createElement("path", {
            d: "M0 0H10V2H0V0Z",
            fill: "white"
          }));

        case 'indeterminate--tiny':
          return /*#__PURE__*/React__default["default"].createElement("svg", {
            width: "8",
            height: "2",
            viewBox: "0 0 8 2",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React__default["default"].createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 0H0V2H8V0Z",
            fill: "white"
          }));

        default:
          return null;
      }
    };

    var Checkbox = /*#__PURE__*/React__namespace.forwardRef(function (props, forwardedRef) {
      var _a, _b, _c, _d, _e, _f;

      var _g = props.size,
          size = _g === void 0 ? 'regular' : _g,
          _h = props.tabIndex,
          tabIndex = _h === void 0 ? 0 : _h,
          defaultChecked = props.defaultChecked,
          indeterminate = props.indeterminate,
          label = props.label,
          error = props.error,
          disabled = props.disabled,
          onChange = props.onChange,
          name = props.name,
          value = props.value,
          className = props.className,
          checkedProp = props.checked,
          helpText = props.helpText,
          _j = props.id,
          id = _j === void 0 ? name + "-" + label + "-" + uidGenerator() : _j,
          labelRef = props.labelRef,
          rest = __rest(props, ["size", "tabIndex", "defaultChecked", "indeterminate", "label", "error", "disabled", "onChange", "name", "value", "className", "checked", "helpText", "id", "labelRef"]);

      var ref = React__namespace.useRef(null);
      React__namespace.useImperativeHandle(forwardedRef, function () {
        return ref.current;
      });

      var _k = React__namespace.useState(checkedProp === undefined ? defaultChecked : checkedProp),
          checked = _k[0],
          setChecked = _k[1];

      React__namespace.useEffect(function () {
        setIndeterminate(indeterminate);
      }, [indeterminate]);
      React__namespace.useEffect(function () {
        if (checkedProp !== undefined) {
          setChecked(checkedProp);
        }
      }, [checkedProp]);
      var CheckboxClass = classNames__default["default"]((_a = {}, _a['Checkbox'] = true, _a['Checkbox--disabled'] = disabled, _a), className);
      var CheckboxOuterWrapper = classNames__default["default"]((_b = {}, _b['Checkbox-outerWrapper'] = true, _b["Checkbox-outerWrapper--" + size] = size, _b));
      var CheckboxInputWrapper = classNames__default["default"]((_c = {}, _c['Checkbox-input'] = true, _c['Checkbox-input--checked'] = checked, _c['Checkbox-input--indeterminate'] = props.indeterminate, _c));
      var CheckboxWrapper = classNames__default["default"]((_d = {}, _d['Checkbox-wrapper'] = true, _d['Checkbox-wrapper--default'] = !error, _d['Checkbox-wrapper--error'] = error, _d));
      var CheckboxLabelClass = classNames__default["default"]((_e = {}, _e['Checkbox-label'] = true, _e['Checkbox-label--tiny'] = size === 'tiny', _e));

      var setIndeterminate = function setIndeterminate(indeterminateValue) {
        ref.current.indeterminate = indeterminateValue;
      };

      var onChangeHandler = function onChangeHandler(e) {
        if (checkedProp === undefined) {
          setChecked(e.target.checked);
          setIndeterminate(e.target.indeterminate);
        }

        if (onChange) onChange(e);
      };

      var IconMapper = classNames__default["default"]((_f = {}, _f['checked--regular'] = checked && size === 'regular', _f['checked--tiny'] = checked && size === 'tiny', _f['indeterminate--regular'] = indeterminate && size === 'regular', _f['indeterminate--tiny'] = indeterminate && size === 'tiny', _f));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Checkbox",
        className: CheckboxClass
      }, /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Checkbox-OuterWrapper",
        className: CheckboxOuterWrapper
      }, /*#__PURE__*/React__namespace.createElement("input", __assign({}, rest, {
        type: "checkbox",
        defaultChecked: defaultChecked,
        onChange: onChangeHandler,
        checked: checked,
        disabled: disabled,
        ref: ref,
        name: name,
        value: value,
        className: CheckboxInputWrapper,
        tabIndex: tabIndex,
        id: id,
        "data-test": "DesignSystem-Checkbox-InputBox"
      })), /*#__PURE__*/React__namespace.createElement("span", {
        className: CheckboxWrapper,
        "data-test": "DesignSystem-Checkbox-Icon"
      }, IconMapper && /*#__PURE__*/React__namespace.createElement(CheckboxIcon, {
        name: IconMapper
      }))), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Checkbox-labelWrapper"
      }, label && label.trim() && /*#__PURE__*/React__namespace.createElement("label", {
        htmlFor: id,
        className: CheckboxLabelClass,
        "data-test": "DesignSystem-Checkbox-Label"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        size: size === 'tiny' ? 'small' : 'regular',
        appearance: disabled ? 'disabled' : 'default',
        className: "ellipsis--noWrap mw-100",
        ref: labelRef
      }, label.trim())), helpText && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-Checkbox-HelpText",
        size: "small",
        appearance: disabled ? 'disabled' : 'subtle'
      }, helpText.trim()))));
    });
    Checkbox.displayName = 'Checkbox';

    var Column = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var size = props.size,
          sizeXS = props.sizeXS,
          sizeS = props.sizeS,
          sizeM = props.sizeM,
          sizeL = props.sizeL,
          sizeXL = props.sizeXL,
          className = props.className,
          children = props.children,
          rest = __rest(props, ["size", "sizeXS", "sizeS", "sizeM", "sizeL", "sizeXL", "className", "children"]);

      var classes = classNames__default["default"]((_a = {}, _a['Col'] = true, _a["Col--" + size] = size, _a["Col--xs-" + sizeXS] = sizeXS, _a["Col--s-" + sizeS] = sizeS, _a["Col--m-" + sizeM] = sizeM, _a["Col--l-" + sizeL] = sizeL, _a["Col--xl-" + sizeXL] = sizeXL, _a["" + className] = className, _a));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        ref: ref,
        "data-test": "DesignSystem-Column"
      }, rest, {
        className: classes
      }), children);
    });
    Column.displayName = 'Column';

    var Trigger$1 = function Trigger(props) {
      var inputFormat = props.inputFormat,
          inputOptions = props.inputOptions,
          validators = props.validators,
          state = props.state,
          setState = props.setState;
      var init = state.init,
          date$1 = state.date,
          error = state.error;
      var _a = inputOptions.placeholderChar,
          placeholderChar = _a === void 0 ? '_' : _a;

      var onPasteHandler = function onPasteHandler(_e, val) {
        var onPaste = inputOptions.onPaste;
        setState({
          open: true
        });

        if (val && !val.includes(placeholderChar)) {
          var d = translateToDate(inputFormat, val, validators);
          setState({
            date: d
          });
        }

        if (onPaste) onPaste(_e, val);
      };

      var onChangeHandler = function onChangeHandler(_e, val) {
        var onChange = inputOptions.onChange;
        setState({
          open: true
        });

        if (val && !val.includes(placeholderChar)) {
          var d = translateToDate(inputFormat, val, validators);
          setState({
            date: d
          });
        }

        if (onChange) onChange(_e);
      };

      var onBlurHandler = function onBlurHandler(_e, val) {
        var onBlur = inputOptions.onBlur;
        setState({
          init: true
        });
        var hasNumber = /\d/;

        if (val && hasNumber.test(val) && val.includes(placeholderChar)) {
          setState({
            error: true
          });
        } else if (val && !hasNumber.test(val) || !val) {
          setState({
            error: false
          });
        }

        if (onBlur) onBlur(_e, val || '');
      };

      var onClearHandler = function onClearHandler(e) {
        var onClear = inputOptions.onClear;
        setState({
          init: true,
          date: undefined
        });
        if (onClear) onClear(e);
      };

      var showError = inputOptions.error || inputOptions.required && error && init;
      var errorMessage = inputOptions.caption === undefined ? 'Invalid value' : inputOptions.caption;

      var inputValidator = function inputValidator(val) {
        return isValid(validators, val, inputFormat);
      };

      var mask = date[inputFormat];
      return /*#__PURE__*/React__namespace.createElement(X, __assign({
        icon: "events",
        placeholder: inputFormat
      }, inputOptions, {
        error: showError,
        mask: mask,
        value: date$1 ? translateToString(inputFormat, date$1) : init ? X.utils.getDefaultValue(mask, placeholderChar) : '',
        onChange: onChangeHandler,
        onPaste: onPasteHandler,
        onBlur: onBlurHandler,
        onClear: onClearHandler,
        caption: showError ? errorMessage : '',
        validators: [inputValidator],
        clearOnEmptyBlur: true,
        id: "parent-DatePicker"
      }));
    };

    var DatePicker = function (_super) {
      __extends(DatePicker, _super);

      function DatePicker(props) {
        var _this = _super.call(this, props) || this;

        _this.getError = function (date) {
          var _a = _this.props,
              disabledBefore = _a.disabledBefore,
              disabledAfter = _a.disabledAfter,
              outputFormat = _a.outputFormat,
              onError = _a.onError;
          if (!date) return false;

          var _b = getDateInfo(disabledBefore),
              dbYear = _b.year,
              dbMonth = _b.month,
              dbDate = _b.date;

          var _c = getDateInfo(disabledAfter),
              daYear = _c.year,
              daMonth = _c.month,
              daDate = _c.date;

          if (compareDate(date, 'less', dbYear, dbMonth, dbDate) || compareDate(date, 'more', daYear, daMonth, daDate)) {
            if (onError) {
              var dVal = translateToString(outputFormat, date);
              onError(date, dVal);
            }

            return true;
          }

          return false;
        };

        _this.onDateChangeHandler = function (d) {
          _this.setState({
            init: true,
            date: d
          });

          var closeOnSelect = _this.props.closeOnSelect;
          if (closeOnSelect) _this.setState({
            open: false
          });
        };

        _this.onToggleHandler = function (o, type) {
          var disabled = _this.props.inputOptions.disabled;
          if (disabled) return;

          switch (type) {
            case 'outsideClick':
              _this.setState({
                open: o
              });

              break;

            case 'onClick':
              _this.setState({
                open: true
              });

              break;
          }
        };

        var inputFormat = props.inputFormat,
            validators = props.validators;
        var date = convertToDate(props.date, inputFormat, validators);

        var error = _this.getError(date);

        _this.state = {
          date: date,
          error: error,
          init: false,
          open: props.open || false
        };
        return _this;
      }

      DatePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.date !== this.props.date) {
          var _a = this.props,
              inputFormat = _a.inputFormat,
              validators = _a.validators;
          var d = convertToDate(this.props.date, inputFormat, validators);
          this.setState({
            date: d
          });
        }

        if (prevProps.open !== this.props.open) {
          this.setState({
            open: this.props.open || false
          });
        }

        if (prevState.date !== this.state.date) {
          var _b = this.props,
              onDateChange = _b.onDateChange,
              outputFormat = _b.outputFormat;
          var date = this.state.date;
          var newError = this.getError(date);
          this.setState({
            error: newError
          });

          if (onDateChange) {
            if (!newError) {
              var dVal = translateToString(outputFormat, date);
              onDateChange(date, dVal);
            } else {
              onDateChange(undefined, '');
            }
          }
        }
      };

      DatePicker.prototype.renderCalendar = function () {
        var _this = this;

        var _a = this.props;
            _a.date;
            _a.open;
            _a.position;
            var inputFormat = _a.inputFormat;
            _a.outputFormat;
            _a.inputOptions;
            var validators = _a.validators;
            _a.withInput;
            var disabledBefore = _a.disabledBefore,
            disabledAfter = _a.disabledAfter;
            _a.onDateChange;
            _a.closeOnSelect;
            var size = _a.size,
            _b = _a.showTodayDate,
            showTodayDate = _b === void 0 ? true : _b,
            _c = _a.children,
            children = _c === void 0 ? /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null) : _c,
            view = _a.view,
            rest = __rest(_a, ["date", "open", "position", "inputFormat", "outputFormat", "inputOptions", "validators", "withInput", "disabledBefore", "disabledAfter", "onDateChange", "closeOnSelect", "size", "showTodayDate", "children", "view"]);

        var date = this.state.date;
        var months = config.months;
        var todayDate = new Date(Date.now());
        var todayMonthAndDate = months[todayDate.getMonth()] + " " + todayDate.getDate();
        var currDate = convertToDate(date, inputFormat, validators);
        var dateDisabledBefore = convertToDate(disabledBefore, inputFormat, validators);
        var dateDisabledAfter = convertToDate(disabledAfter, inputFormat, validators);

        var isTodayDisabled = function isTodayDisabled() {
          var isTodayDateDisabled = true;

          if (currDate && dateDisabledBefore && dateDisabledAfter) {
            isTodayDateDisabled = currDate > dateDisabledBefore && currDate < dateDisabledAfter;
          } else if (currDate && dateDisabledBefore) {
            isTodayDateDisabled = currDate > dateDisabledBefore;
          } else if (currDate && dateDisabledAfter) {
            isTodayDateDisabled = currDate < dateDisabledAfter;
          }

          return !isTodayDateDisabled;
        };

        var todayChipClass = classNames__default["default"]({
          'd-flex justify-content-center': true,
          'pb-5': size === 'small',
          'pb-6': size === 'large',
          'pt-3': size === 'large' && view === 'year'
        });
        return /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("div", {
          className: "d-flex"
        }, children, /*#__PURE__*/React__namespace.createElement(Calendar, __assign({}, rest, {
          size: size,
          date: currDate,
          view: view,
          disabledBefore: dateDisabledBefore,
          disabledAfter: dateDisabledAfter,
          onDateChange: this.onDateChangeHandler
        }))), showTodayDate && /*#__PURE__*/React__namespace.createElement("div", {
          className: todayChipClass,
          "data-test": "DesignSystem-Select--TodaysDate-wrapper"
        }, /*#__PURE__*/React__namespace.createElement(Chip, {
          label: "Today, " + todayMonthAndDate,
          name: "chip",
          type: "action",
          disabled: isTodayDisabled(),
          onClick: function onClick() {
            return _this.onDateChangeHandler(new Date());
          }
        })));
      };

      DatePicker.prototype.render = function () {
        var _a = this.props,
            position = _a.position,
            withInput = _a.withInput,
            inputFormat = _a.inputFormat,
            inputOptions = _a.inputOptions,
            validators = _a.validators,
            popoverOptions = _a.popoverOptions;
        var open = this.state.open;

        if (withInput) {
          return /*#__PURE__*/React__namespace.createElement(Popover, __assign({
            trigger: /*#__PURE__*/React__namespace.createElement(Trigger$1, {
              inputFormat: inputFormat,
              inputOptions: inputOptions,
              validators: validators,
              state: this.state,
              setState: this.setState.bind(this)
            })
          }, popoverOptions, {
            triggerClass: "w-100",
            position: position,
            appendToBody: true,
            open: open,
            onToggle: this.onToggleHandler
          }), this.renderCalendar());
        }

        return this.renderCalendar();
      };

      DatePicker.defaultProps = __assign(__assign({}, Calendar.defaultProps), {
        position: 'bottom-start',
        inputFormat: 'mm/dd/yyyy',
        outputFormat: 'mm/dd/yyyy',
        validators: [date$1],
        inputOptions: {},
        closeOnSelect: true
      });
      return DatePicker;
    }(React__namespace.Component);

    var parseDate = function parseDate(date_time) {
      var d = new Date();
      d.setHours(date_time.substring(0, 2));
      d.setMinutes(date_time.substring(3, 5));
      return d;
    };

    var isFormat12Hour = function isFormat12Hour(format) {
      return format === '12-Hour';
    };

    var isTimeIn12HourFormat = function isTimeIn12HourFormat(time) {
      return _isTimeInAM(time) || _isTimeInPM(time);
    };

    var _isTimeInAM = function _isTimeInAM(time) {
      return time.includes('a') || time.includes('A');
    };
    var _isTimeInPM = function _isTimeInPM(time) {
      return time.includes('p') || time.includes('P');
    };
    var convert12To24HourFormat$1 = function convert12To24HourFormat(timeStr) {
      var _a = timeStr.split(' '),
          time = _a[0],
          modifier = _a[1];

      var timeArr = time.split(':');
      var hours = timeArr[0];
      var minutes = timeArr[1];

      if (hours === '12' && _isTimeInAM(modifier)) {
        hours = '00';
      }

      if (_isTimeInPM(modifier) && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      }

      return hours + ":" + minutes;
    };
    var convertToTwoDigit = function convertToTwoDigit(val) {
      return ('0' + val).slice(-2);
    };
    var convert24To12HourFormat = function convert24To12HourFormat(timeStr) {
      var timeArr = timeStr.split(':');
      var hours = parseInt(timeArr[0], 10);
      var modifier = hours >= 12 ? 'PM' : 'AM';
      var convertedHours = hours % 12 || 12;
      var hoursInString = convertedHours.toString();
      hoursInString = convertToTwoDigit(hoursInString);
      var minutes = timeArr[1];
      var result = hoursInString.toString() + ":" + minutes + " " + modifier;
      return result;
    };

    var getTimeIn24HrFormat = function getTimeIn24HrFormat(timeStr) {
      if (isTimeIn12HourFormat(timeStr)) {
        return convert12To24HourFormat$1(timeStr);
      }

      return timeStr;
    };

    var checkTimeDifference = function checkTimeDifference(startTime, endTime) {
      var parseStartTime = parseDate(startTime);
      var parseEndTime = parseDate(endTime);
      return parseStartTime > parseEndTime;
    };

    var get24HourTimeList = function get24HourTimeList(startTime, endTime, interval) {
      var timeList = [];
      var parseStartTime = parseDate(startTime);
      var parseEndTime = parseDate(endTime);

      while (parseStartTime <= parseEndTime) {
        timeList.push(parseStartTime.toTimeString().substring(0, 5));
        parseStartTime.setMinutes(parseStartTime.getMinutes() + interval);
      }

      return timeList;
    };

    var getReverseTimeList = function getReverseTimeList(startTime, endTime, interval) {
      var timeList = get24HourTimeList('00:00', '23:59', interval);
      var startTimeIndex = timeList.indexOf(startTime);
      var endTimeIndex = timeList.indexOf(endTime);
      var nextDayTimeIndex = endTime === '' ? startTimeIndex : endTimeIndex + 1;
      var presentDayList = timeList.slice(startTimeIndex);
      var nextDayList = timeList.slice(0, nextDayTimeIndex);
      var result = presentDayList.concat(nextDayList);
      return result;
    };

    var getTimeListIn24HourFormat = function getTimeListIn24HourFormat(startTime, endTime, interval) {
      if (endTime === '' || checkTimeDifference(startTime, endTime)) {
        return getReverseTimeList(startTime, endTime, interval);
      }

      return get24HourTimeList(startTime, endTime, interval);
    };

    var getTimeDifference = function getTimeDifference(startTime, endTime) {
      var timeStart = new Date('07/07/2022 ' + startTime);
      var timeEnd = new Date('07/07/2022 ' + endTime);
      var diff = timeEnd.getTime() - timeStart.getTime();
      var diff_as_date = new Date(diff);
      var hour = diff_as_date.getUTCHours();
      var minute = diff_as_date.getUTCMinutes();
      return {
        hour: hour,
        minute: minute
      };
    };

    var getCustomLabel = function getCustomLabel(time, timeFormat, showDuration, referenceTime) {
      var label = time;

      if (isFormat12Hour(timeFormat)) {
        label = convert24To12HourFormat(time);
      }

      if (showDuration && referenceTime) {
        var _a = getTimeDifference(referenceTime, time),
            hour = _a.hour,
            minute = _a.minute;

        var timeDiffLabel = " (" + hour + " hr " + minute + " min)";
        label += timeDiffLabel;
      }

      return label;
    };

    var isOptionDisabled = function isOptionDisabled(time, timeFormat, disabledSlotList) {
      var timeValue = time;

      if (isFormat12Hour(timeFormat)) {
        timeValue = convert24To12HourFormat(time);
      }

      if (disabledSlotList.includes(timeValue)) {
        return true;
      }

      return false;
    };

    var convertTimeToOptionList = function convertTimeToOptionList(timeList, timeFormat, id, showDuration, referenceTime, disabledSlotList) {
      if (id === void 0) {
        id = 'TimePicker-Option-key';
      }

      var optionList = timeList.map(function (time, index) {
        return {
          label: getCustomLabel(time, timeFormat, showDuration, referenceTime),
          value: time,
          disabled: disabledSlotList && isOptionDisabled(time, timeFormat, disabledSlotList),
          selected: false,
          optionID: id + index
        };
      });
      return optionList;
    };

    var computeEndTime = function computeEndTime(startTime) {
      return startTime ? '' : '23:59';
    };

    var getDropdownOptionList = function getDropdownOptionList(props) {
      var startTime = props.startTime,
          endTime = props.endTime,
          interval = props.interval,
          timeFormat = props.timeFormat,
          showDuration = props.showDuration,
          disabledSlotList = props.disabledSlotList,
          id = props.id;
      var startTimeIn24Hr = startTime ? getTimeIn24HrFormat(startTime) : '00:00';
      var endTimeIn24Hr = endTime ? getTimeIn24HrFormat(endTime) : computeEndTime(startTime);
      var timeList = getTimeListIn24HourFormat(startTimeIn24Hr, endTimeIn24Hr, interval);
      var dropdownOptionList = convertTimeToOptionList(timeList, timeFormat, id, showDuration, startTime, disabledSlotList);
      return dropdownOptionList;
    };

    var convertMinTo60 = function convertMinTo60(time) {
      var parseNum = parseInt(time, 10);
      if (parseNum < 10) return time;
      var timeInNum = parseNum > 60 ? parseNum % 60 : parseNum;
      var min = (timeInNum.toString() + '0').slice(0, 2);
      return min;
    };

    var get24HourCurrentTime = function get24HourCurrentTime() {
      var today = new Date();
      return convertToTwoDigit(today.getHours()) + ':' + convertToTwoDigit(today.getMinutes());
    };

    var convertHourTo24 = function convertHourTo24(time) {
      var timeInNum = parseInt(time, 10) % 24;
      return timeInNum.toString();
    };

    var convertHourTo12 = function convertHourTo12(time) {
      var timeInNum = parseInt(time, 10) % 12;
      return timeInNum.toString();
    };

    var _checkNumber = function _checkNumber(str) {
      var numberRegex = /^[0-9]+$/;
      return numberRegex.test(str);
    };

    var _checkNumberWithAMPM = function _checkNumberWithAMPM(str) {
      var numberWithAMPMRegex = /^[0-9]+[ AaMmPp]+$/;
      return numberWithAMPMRegex.test(str);
    };

    var _checkNumberWithSpecialChar = function _checkNumberWithSpecialChar(str) {
      var numberWithSpecialCharRegex = /^[0-9]+[`\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~][0-9]*$/;
      return numberWithSpecialCharRegex.test(str);
    };

    var _checkNumberWithSpecialCharAMPM = function _checkNumberWithSpecialCharAMPM(str) {
      var numberWithSpecialCharAMPM = /^[0-9]+[`\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~][0-9]+[ AaMmPp]+$/;
      return numberWithSpecialCharAMPM.test(str);
    };

    var specialCharRegex = /[`\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    var getTimeFromNumberWithSpecialChar = function getTimeFromNumberWithSpecialChar(searchTime) {
      var time = searchTime.split(specialCharRegex);
      var hour = convertHourTo24(time[0]);
      var hh = convertToTwoDigit(hour);
      var min = time[1] !== '' ? convertMinTo60(time[1]) : '00';
      var mm = (min + '0').slice(0, 2);
      return {
        hour: hh,
        min: mm
      };
    };

    var getSearchTimeFromNumber = function getSearchTimeFromNumber(searchTerm, show12HourFormat) {
      var searchLen = searchTerm.length;
      var searchTimeInNum = parseInt(searchTerm, 10);
      var firstTwoTerm = searchTerm.slice(0, 2);
      var hh = '00';
      var mm = '00';

      switch (searchLen) {
        case 1:
          hh = '0' + searchTerm;
          break;

        case 2:
          if (searchTimeInNum <= 24 || show12HourFormat && searchTimeInNum <= 12) {
            hh = convertToTwoDigit(searchTerm);
          } else {
            hh = '0' + searchTerm[0];
            mm = convertMinTo60(searchTerm[1] + '0');
          }

          break;

        case 3:
          hh = '0' + searchTerm[0];
          mm = convertMinTo60(searchTerm.slice(1));
          break;

        case 4:
          hh = show12HourFormat ? convertHourTo12(firstTwoTerm) : convertHourTo24(firstTwoTerm);
          mm = convertMinTo60(searchTerm.slice(2));
          break;

        default:
          hh = '-1';
          mm = '-1';
      }

      return {
        hour: hh,
        min: mm
      };
    };

    var getTimeFromNumberWithAMPM = function getTimeFromNumberWithAMPM(searchTime) {
      var timeArr = searchTime.split(/[\saAmMpP]/);

      var _a = getSearchTimeFromNumber(timeArr[0], true),
          hour = _a.hour,
          min = _a.min;

      return {
        hour: hour,
        min: min
      };
    };

    var formatSearchTerm = function formatSearchTerm(optionList, searchTerm) {
      var searchTime = {
        hour: '00',
        min: '00'
      };

      if (_checkNumber(searchTerm)) {
        var searchTimeInHHMM = getSearchTimeFromNumber(searchTerm);

        if (parseInt(searchTimeInHHMM.hour) <= 12 && parseInt(searchTimeInHHMM.hour) > 0) {
          searchTime = getCurrentRelativeTime(optionList, searchTimeInHHMM);
        } else {
          searchTime = searchTimeInHHMM;
        }
      } else if (_checkNumberWithAMPM(searchTerm)) {
        searchTime = getTimeFromNumberWithAMPM(searchTerm);
        searchTime.hour = convert12To24HourFormat(searchTime.hour, searchTerm);
      } else if (_checkNumberWithSpecialChar(searchTerm)) {
        var searchTimeInHHMM = getTimeFromNumberWithSpecialChar(searchTerm);

        if (parseInt(searchTimeInHHMM.hour) <= 12) {
          searchTime = getCurrentRelativeTime(optionList, searchTimeInHHMM);
        } else {
          searchTime = searchTimeInHHMM;
        }
      } else if (_checkNumberWithSpecialCharAMPM(searchTerm)) {
        var timeWithoutAMPM = searchTerm.replace(/[\saApPmM]/g, '');

        if (_checkNumber(timeWithoutAMPM)) {
          searchTime = getSearchTimeFromNumber(timeWithoutAMPM, true);
        } else if (_checkNumberWithSpecialChar(timeWithoutAMPM)) {
          searchTime = getTimeFromNumberWithSpecialChar(timeWithoutAMPM);
        }

        searchTime.hour = convert12To24HourFormat(searchTime.hour, searchTerm);
      }

      return searchTime;
    };

    var convert12To24HourFormat = function convert12To24HourFormat(hours, searchTerm) {
      if (hours === '12' && _isTimeInAM(searchTerm)) {
        hours = '00';
      } else if (_isTimeInPM(searchTerm) && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      }

      return hours;
    };

    var getCurrentRelativeTime = function getCurrentRelativeTime(optionList, searchTime) {
      var searchTimeStr = searchTime.hour + ":" + searchTime.min;
      var currentTime = get24HourCurrentTime();
      var greaterTime = checkTimeDifference(currentTime, searchTimeStr);
      var currentTimeIndex = findClosestTimeIndex(optionList, currentTime);
      var searchTimeIndex = findClosestTimeIndex(optionList, searchTimeStr);

      if (greaterTime && currentTimeIndex > searchTimeIndex) {
        var hourIn24Format = parseInt(searchTime.hour, 10) + 12;
        searchTime.hour = hourIn24Format.toString();
      }

      return searchTime;
    };

    var findClosestTimeIndex = function findClosestTimeIndex(optionList, searchItem) {
      var closestItemIndex = 0;
      var minTime = {
        hour: 100,
        mins: 100
      };

      for (var index = 0; index < optionList.length; index++) {
        var _a = getTimeDifference(searchItem, optionList[index]),
            hour = _a.hour,
            minute = _a.minute;

        if (hour < minTime.hour || hour === minTime.hour && minute < minTime.mins) {
          minTime.hour = hour;
          minTime.mins = minute;
          closestItemIndex = index;
        }
      }

      return closestItemIndex;
    };

    var getSearchIndex = function getSearchIndex(optionList, searchTerm) {
      var _a = formatSearchTerm(optionList, searchTerm),
          hour = _a.hour,
          min = _a.min;

      if (min === '60') {
        min = '00';
        hour = (parseInt(hour, 10) + 1).toString();
      }

      var searchItem = hour + ":" + min;
      var searchIndex = findClosestTimeIndex(optionList, searchItem);
      return searchIndex;
    };

    var countNumberInStr = function countNumberInStr(searchTerm) {
      var _a;

      return ((_a = searchTerm.match(/\d/g)) === null || _a === void 0 ? void 0 : _a.length) || 0;
    };

    var isValidSearchTerm = function isValidSearchTerm(searchTerm) {
      var totalDigit = countNumberInStr(searchTerm);
      return totalDigit > 0 && totalDigit < 5;
    };

    var getValueFromOptionList = function getValueFromOptionList(optionList) {
      var list = optionList.map(function (option) {
        return option.value;
      });
      return list;
    };

    var getSearchValueIndex = function getSearchValueIndex(options, searchTerm) {
      if (!isValidSearchTerm(searchTerm)) {
        return -1;
      }

      var searchIndex = getSearchIndex(options, searchTerm);
      return searchIndex;
    };

    var getScrollIndex = function getScrollIndex(dropdownOptionList, searchTerm) {
      var optionList = getValueFromOptionList(dropdownOptionList);

      if (searchTerm === '') {
        var currTime = get24HourCurrentTime();
        var currTimeIndex = findClosestTimeIndex(optionList, currTime);
        return currTimeIndex;
      }

      return getSearchValueIndex(optionList, searchTerm);
    };

    var getSearchedOptions = function getSearchedOptions(options, searchTerm) {
      var result = options.filter(function (option) {
        return option.label.toLowerCase().includes(searchTerm.toLowerCase());
      });
      return result;
    };

    var sortList = function sortList(arr) {
      return arr.sort(function (a, b) {
        return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
      });
    };

    var _isEqual = function _isEqual(firstList, secondList) {
      var firstSortedList = sortList(__spreadArrays(firstList));
      var secondSortedList = sortList(__spreadArrays(secondList));
      return firstSortedList.length === secondSortedList.length && firstSortedList.every(function (option, index) {
        return option.value === secondSortedList[index].value;
      });
    };
    var _isControlled = function _isControlled(selected) {
      return selected !== undefined;
    };
    var _isOpenControlled = function _isOpenControlled(open) {
      return open !== undefined;
    };
    var _showSelectedItems = function _showSelectedItems(bulk, searchTerm, withCheckbox) {
      return bulk && withCheckbox && searchTerm === '';
    };
    var _isSelectAllPresent = function _isSelectAllPresent(searchTerm, bulkOptions, withSelectAll, withCheckbox) {
      return withCheckbox && withSelectAll && bulkOptions === 0 && searchTerm === '';
    };
    var scrollTo = function scrollTo(element, top) {
      element.scrollTo(0, top);
    };
    var scrollIntoView = function scrollIntoView(menuElement, focusedElement) {
      var menuRect = menuElement === null || menuElement === void 0 ? void 0 : menuElement.getBoundingClientRect();
      var focusedRect = focusedElement.getBoundingClientRect();
      var overscroll = focusedElement.offsetHeight;

      if (focusedRect.bottom > menuRect.bottom && menuElement) {
        scrollTo(menuElement, focusedElement.offsetTop - menuRect.height + overscroll);
      } else if (focusedRect.top < menuRect.top && menuElement) {
        scrollTo(menuElement, focusedElement.offsetTop - overscroll);
      }
    };
    var getSelectAll$1 = function getSelectAll(selected, optionsLength, disabledOptionsLength) {
      if (selected.length) {
        if (selected.length > 0 && disabledOptionsLength > 0 && selected.length === optionsLength - disabledOptionsLength) {
          return {
            indeterminate: true,
            checked: true
          };
        }

        var indeterminate = selected.length > 0 && selected.length !== optionsLength;
        var checked = selected.length > 0 && selected.length === optionsLength;
        var obj = {
          checked: checked,
          indeterminate: indeterminate
        };
        return obj;
      }

      return {
        indeterminate: false,
        checked: false
      };
    };
    var scrollToOptionIndex = function scrollToOptionIndex(scrollIndex, listOptions) {
      var _a;

      var optionID = listOptions && ((_a = listOptions[scrollIndex]) === null || _a === void 0 ? void 0 : _a.optionID);
      var targetOption = document.getElementById(optionID);
      targetOption && targetOption.scrollIntoView && targetOption.scrollIntoView({
        block: 'center'
      });
    };
    var groupListOptions = function groupListOptions(listOptions) {
      var groupList = listOptions.reduce(function (acc, option) {
        var group = option.group || '';

        if (!acc[group]) {
          acc[group] = [];
        }

        acc[group].push(option);
        return acc;
      }, {});
      var flattenedGroupList = Object.values(groupList).flatMap(function (item) {
        return __spreadArrays(item);
      });
      return flattenedGroupList;
    };

    var TimePickerWithSearch = function TimePickerWithSearch(props) {
      var open = props.open,
          endTime = props.endTime,
          interval = props.interval,
          onChange = props.onChange,
          startTime = props.startTime,
          timeFormat = props.timeFormat,
          showDuration = props.showDuration,
          noResultMessage = props.noResultMessage,
          disabledSlotList = props.disabledSlotList,
          fetchTimeOptions = props.fetchTimeOptions,
          error = props.error;

      var _a = React__namespace.useState(0),
          tabIndex = _a[0],
          setTabIndex = _a[1];

      var _b = React__namespace.useState(false),
          openPopover = _b[0],
          setOpenPopover = _b[1];

      var _c = React__namespace.useState(-1),
          selectedIndex = _c[0],
          setSelectedIndex = _c[1];

      var _d = React__namespace.useState(0),
          counter = _d[0],
          setCounter = _d[1];

      var dropdownOptionList = getDropdownOptionList(props);
      React__namespace.useEffect(function () {
        open !== undefined && setOpenPopover(open);
      }, [open]);
      React__namespace.useEffect(function () {
        var timer;

        if (openPopover && selectedIndex != -1) {
          setTabIndex(selectedIndex);
          timer = setTimeout(function () {
            scrollToOptionIndex(selectedIndex, dropdownOptionList);
          }, 100);
        }

        return function () {
          clearTimeout(timer);
        };
      }, [openPopover]);
      React__namespace.useEffect(function () {
        setCounter(counter + 1);
      }, [startTime, endTime, interval, showDuration, disabledSlotList]);

      var onChangeHandler = function onChangeHandler(props) {
        var time = props;

        if (isFormat12Hour(timeFormat)) {
          time = convert24To12HourFormat(time);
        }

        var selectIndex = dropdownOptionList.findIndex(function (option) {
          return option.value === props;
        });
        setSelectedIndex(selectIndex);
        onChange && onChange(time);
      };

      var getOptionList = function getOptionList(searchTerm) {
        var scrollIndex;
        var indexValue = getScrollIndex(dropdownOptionList, searchTerm);

        if (searchTerm === '' && selectedIndex != -1) {
          scrollIndex = selectedIndex;
          setTabIndex(selectedIndex);
        } else {
          scrollIndex = indexValue;
          setTabIndex(indexValue);
        }

        return Promise.resolve({
          options: indexValue === -1 ? [] : dropdownOptionList,
          count: dropdownOptionList.length,
          scrollToIndex: scrollIndex === 0 ? scrollIndex + 1 : scrollIndex,
          searchTerm: searchTerm
        });
      };

      var fetchOptionList = function fetchOptionList() {
        return fetchTimeOptions ? fetchTimeOptions : getOptionList;
      };

      return /*#__PURE__*/React__namespace.createElement(Dropdown, {
        key: counter,
        maxHeight: 160,
        loadersCount: 0,
        withSearch: true,
        open: openPopover,
        tabIndex: tabIndex,
        searchPlaceholder: "Search",
        onChange: onChangeHandler,
        fetchOptions: fetchOptionList(),
        noResultMessage: noResultMessage,
        staticLimit: dropdownOptionList.length,
        onPopperToggle: function onPopperToggle() {
          setOpenPopover(!openPopover);
        },
        error: error
      });
    };
    TimePickerWithSearch.defaultProps = {
      timeFormat: '12-Hour',
      interval: 15
    };
    TimePickerWithSearch.displayName = 'TimePickerWithSearch';

    var TimePickerWithInput = function TimePickerWithInput(props) {
      var validators = props.validators,
          inputOptions = props.inputOptions,
          inputFormat = props.inputFormat,
          outputFormat = props.outputFormat,
          onTimeChange = props.onTimeChange,
          timeProp = props.time,
          error = props.error;

      var _a = React__namespace.useState(timeProp),
          time$1 = _a[0],
          setTime = _a[1];

      var _b = React__namespace.useState(false),
          init = _b[0],
          setInit = _b[1];

      var _c = inputOptions.placeholderChar,
          placeholderChar = _c === void 0 ? '_' : _c;
      React__namespace.useEffect(function () {
        var timeStr = translateToTime(inputFormat, time$1);
        var updatedTime = timeProp === undefined && timeStr.includes(placeholderChar) ? time$1 : timeProp;
        setTime(updatedTime);
      }, [timeProp]);

      var onChangeHandler = function onChangeHandler(e, val) {
        if (val === void 0) {
          val = '';
        }

        var updatedTime = val === null || val === void 0 ? void 0 : val.toUpperCase();
        setTime(updatedTime);

        if (inputOptions.onChange) {
          inputOptions.onChange(e, val);
        }
      };

      var onBlurHandler = function onBlurHandler(e, val) {
        if (val === void 0) {
          val = '';
        }

        var updatedTime = translateToTime(inputFormat, time$1);
        setInit(true);

        if (onTimeChange) {
          var outputTimeStr = updatedTime && !isPlaceholderPresent(placeholderChar, updatedTime) ? getOutputTimeString(inputFormat, outputFormat, updatedTime) : undefined;
          onTimeChange(outputTimeStr);
        }

        if (inputOptions.onBlur) inputOptions.onBlur(e, val);
      };

      var onClearHandler = function onClearHandler(e) {
        var updatedTime = '';
        setInit(true);
        if (onTimeChange) onTimeChange(updatedTime);
        if (inputOptions.onClear) inputOptions.onClear(e);
      };

      var inputValidator = function inputValidator(val) {
        return isValid(validators, val, inputFormat);
      };

      var mask = time[inputFormat];
      return /*#__PURE__*/React__namespace.createElement(X, __assign({
        placeholder: placeholders[inputFormat],
        placeholderChar: placeholderChar
      }, inputOptions, {
        mask: mask,
        value: time$1 ? translateToTime(inputFormat, time$1) : init ? X.utils.getDefaultValue(mask, placeholderChar) : '',
        validators: inputValidator,
        onChange: onChangeHandler,
        onClear: onClearHandler,
        onBlur: onBlurHandler,
        error: error,
        id: "parent-TimePicker"
      }));
    };
    TimePickerWithInput.defaultProps = {
      inputFormat: 'hh:mm AM',
      outputFormat: 'hh:mm AM',
      inputOptions: {},
      validators: [time$1]
    };
    TimePickerWithInput.displayName = 'TimePickerWithInput';

    var TimePicker = function TimePicker(props) {
      return props.withSearch ? /*#__PURE__*/React__namespace.createElement(TimePickerWithSearch, __assign({}, props)) : /*#__PURE__*/React__namespace.createElement(TimePickerWithInput, __assign({}, props));
    };
    TimePicker.defaultProps = __assign(__assign({}, TimePickerWithInput.defaultProps), TimePickerWithSearch.defaultProps);
    TimePicker.displayName = 'TimePicker';

    /* eslint-disable no-undefined,no-param-reassign,no-shadow */

    /**
     * Throttle execution of a function. Especially useful for rate limiting
     * execution of handlers on events like resize and scroll.
     *
     * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
     * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
     *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
     *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
     *                                    the internal counter is reset).
     * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
     *                                    to `callback` when the throttled-function is executed.
     * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
     *                                    schedule `callback` to execute after `delay` ms.
     *
     * @returns {Function}  A new, throttled, function.
     */
    function throttle (delay, noTrailing, callback, debounceMode) {
      /*
       * After wrapper has stopped being called, this timeout ensures that
       * `callback` is executed at the proper times in `throttle` and `end`
       * debounce modes.
       */
      var timeoutID;
      var cancelled = false; // Keep track of the last time `callback` was executed.

      var lastExec = 0; // Function to clear existing timeout

      function clearExistingTimeout() {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
      } // Function to cancel next exec


      function cancel() {
        clearExistingTimeout();
        cancelled = true;
      } // `noTrailing` defaults to falsy.


      if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
      }
      /*
       * The `wrapper` function encapsulates all of the throttling / debouncing
       * functionality and when executed will limit the rate at which `callback`
       * is executed.
       */


      function wrapper() {
        for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
          arguments_[_key] = arguments[_key];
        }

        var self = this;
        var elapsed = Date.now() - lastExec;

        if (cancelled) {
          return;
        } // Execute `callback` and update the `lastExec` timestamp.


        function exec() {
          lastExec = Date.now();
          callback.apply(self, arguments_);
        }
        /*
         * If `debounceMode` is true (at begin) this is used to clear the flag
         * to allow future `callback` executions.
         */


        function clear() {
          timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
          /*
           * Since `wrapper` is being called for the first time and
           * `debounceMode` is true (at begin), execute `callback`.
           */
          exec();
        }

        clearExistingTimeout();

        if (debounceMode === undefined && elapsed > delay) {
          /*
           * In throttle mode, if `delay` time has been exceeded, execute
           * `callback`.
           */
          exec();
        } else if (noTrailing !== true) {
          /*
           * In trailing throttle mode, since `delay` time has not been
           * exceeded, schedule `callback` to execute `delay` ms after most
           * recent execution.
           *
           * If `debounceMode` is true (at begin), schedule `clear` to execute
           * after `delay` ms.
           *
           * If `debounceMode` is false (at end), schedule `callback` to
           * execute after `delay` ms.
           */
          timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }
      }

      wrapper.cancel = cancel; // Return the wrapper function.

      return wrapper;
    }

    /* eslint-disable no-undefined */
    /**
     * Debounce execution of a function. Debouncing, unlike throttling,
     * guarantees that a function is only executed a single time, either at the
     * very beginning of a series of calls, or at the very end.
     *
     * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
     * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
     *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
     *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
     * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
     *                                  to `callback` when the debounced-function is executed.
     *
     * @returns {Function} A new, debounced function.
     */

    function debounce (delay, atBegin, callback) {
      return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    }

    var DropdownButton = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a, _b;

      var _c = props.triggerSize,
          triggerSize = _c === void 0 ? 'regular' : _c,
          _d = props.placeholder,
          placeholder = _d === void 0 ? 'Select' : _d,
          _e = props.menu,
          menu = _e === void 0 ? false : _e,
          children = props.children,
          icon = props.icon,
          disabled = props.disabled,
          open = props.open,
          inlineLabel = props.inlineLabel,
          error = props.error,
          iconType = props.iconType,
          rest = __rest(props, ["triggerSize", "placeholder", "menu", "children", "icon", "disabled", "open", "inlineLabel", "error", "iconType"]);

      var buttonDisabled = disabled ? 'disabled' : 'default';
      var trimmedPlaceholder = placeholder.trim();
      var value = children ? children : trimmedPlaceholder;
      var iconName = !menu ? 'keyboard_arrow_down' : icon ? icon : 'more_horiz';
      var buttonClass = classNames__default["default"]((_a = {}, _a['Button'] = true, _a['DropdownButton'] = true, _a["DropdownButton--" + triggerSize] = triggerSize, _a["DropdownButton--" + triggerSize + "Square"] = menu, _a['DropdownButton--placeholder'] = !children && !menu, _a['DropdownButton--icon'] = icon, _a['DropdownButton--open'] = open, _a['DropdownButton--error'] = error, _a));
      var textClass = classNames__default["default"]((_b = {}, _b['Text'] = true, _b['Text--regular'] = true, _b['DropdownButton-text'] = true, _b));
      return /*#__PURE__*/React__namespace.createElement("button", __assign({
        ref: ref,
        type: "button",
        value: children,
        className: buttonClass,
        disabled: disabled,
        tabIndex: 0,
        "data-test": "DesignSystem-DropdownTrigger"
      }, rest), !menu && /*#__PURE__*/React__namespace.createElement("div", {
        className: "DropdownButton-wrapper"
      }, inlineLabel && /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "subtle",
        className: "mr-4 white-space-nowrap"
      }, "" + inlineLabel.trim().charAt(0).toUpperCase() + inlineLabel.trim().slice(1)), icon && !inlineLabel && /*#__PURE__*/React__namespace.createElement(Icon, {
        appearance: buttonDisabled,
        className: "d-flex align-items-center mr-4",
        name: icon,
        type: iconType
      }), value && /*#__PURE__*/React__namespace.createElement("span", {
        className: textClass
      }, value)), /*#__PURE__*/React__namespace.createElement(Icon, {
        appearance: buttonDisabled,
        name: iconName,
        type: iconType
      }));
    });
    DropdownButton.displayName = 'DropdownButton';

    var CheckboxOption = function CheckboxOption(props) {
      var className = props.className,
          selected = props.selected,
          optionData = props.optionData,
          onChangeHandler = props.onChangeHandler,
          onUpdateActiveOption = props.onUpdateActiveOption,
          dataTest = props.dataTest,
          _a = props.id,
          id = _a === void 0 ? '' : _a;
      var subInfo = optionData.subInfo,
          label = optionData.label,
          disabled = optionData.disabled;

      var renderSubInfo = function renderSubInfo(subInfo) {
        var labelAppearance = disabled ? 'disabled' : 'subtle';
        var iconAppearance = selected ? 'white' : 'disabled';

        if (typeof subInfo === 'string') {
          return /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-DropdownOption--WITH_META--Meta",
            appearance: labelAppearance,
            size: "small",
            weight: "medium"
          }, subInfo);
        }

        var _a = subInfo.list,
            list = _a === void 0 ? [] : _a,
            seperator = subInfo.seperator;
        return /*#__PURE__*/React__namespace.createElement(MetaList, {
          list: list,
          seperator: seperator,
          iconAppearance: iconAppearance,
          labelAppearance: labelAppearance,
          seperatorAppearance: iconAppearance,
          "data-test": "DesignSystem-DropdownOption--WITH_META--MetaList"
        });
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: className,
        onMouseEnter: onUpdateActiveOption,
        "data-test": dataTest,
        "data-disabled": disabled
      }, /*#__PURE__*/React__namespace.createElement(Checkbox, {
        label: label,
        disabled: disabled,
        checked: selected,
        onChange: onChangeHandler,
        tabIndex: -1,
        className: "OptionCheckbox " + (subInfo ? 'pb-0' : ''),
        "data-test": dataTest + "--Checkbox",
        id: id
      }), subInfo && /*#__PURE__*/React__namespace.createElement("div", {
        className: "pl-8 ml-3"
      }, renderSubInfo(subInfo)));
    };

    var DefaultOption = function DefaultOption(props) {
      var className = props.className,
          textClassName = props.textClassName,
          onClickHandler = props.onClickHandler,
          optionData = props.optionData,
          color = props.color,
          onUpdateActiveOption = props.onUpdateActiveOption,
          dataTest = props.dataTest;
      var label = optionData.label,
          disabled = optionData.disabled;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: className,
        onClick: onClickHandler,
        onMouseEnter: onUpdateActiveOption,
        "data-test": dataTest,
        "data-disabled": disabled
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: 'Option-label'
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: textClassName,
        color: color,
        id: optionData.optionID
      }, label)));
    };

    var MetaOption = function MetaOption(props) {
      var className = props.className,
          textClassName = props.textClassName,
          onClickHandler = props.onClickHandler,
          optionData = props.optionData,
          onUpdateActiveOption = props.onUpdateActiveOption,
          renderSubInfo = props.renderSubInfo,
          color = props.color,
          dataTest = props.dataTest;
      var subInfo = optionData.subInfo,
          label = optionData.label,
          disabled = optionData.disabled;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: className,
        onClick: onClickHandler,
        onMouseEnter: onUpdateActiveOption,
        "data-test": dataTest,
        "data-disabled": disabled
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: 'Option-label'
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: textClassName,
        color: color
      }, label), subInfo && renderSubInfo(subInfo)));
    };

    var IconOption = function IconOption(props) {
      var _a;

      var className = props.className,
          textClassName = props.textClassName,
          onClickHandler = props.onClickHandler,
          optionData = props.optionData,
          onUpdateActiveOption = props.onUpdateActiveOption,
          color = props.color,
          dataTest = props.dataTest;
      var label = optionData.label,
          icon = optionData.icon,
          disabled = optionData.disabled,
          iconType = optionData.iconType;
      var OptionClass = classNames__default["default"]((_a = {}, _a["" + className] = true, _a['Option--icon'] = icon, _a));
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: OptionClass,
        onClick: onClickHandler,
        onMouseEnter: onUpdateActiveOption,
        "data-test": dataTest,
        "data-disabled": disabled
      }, icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        className: "Option-icon mr-4",
        "data-test": dataTest + "--Icon",
        name: icon,
        type: iconType
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: 'Option-label'
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: textClassName,
        color: color
      }, label)));
    };

    var IconWithMetaOption = function IconWithMetaOption(props) {
      var _a;

      var className = props.className,
          textClassName = props.textClassName,
          renderSubInfo = props.renderSubInfo,
          onClickHandler = props.onClickHandler,
          optionData = props.optionData,
          onUpdateActiveOption = props.onUpdateActiveOption,
          appearance = props.appearance,
          color = props.color,
          dataTest = props.dataTest;
      var subInfo = optionData.subInfo,
          label = optionData.label,
          icon = optionData.icon,
          disabled = optionData.disabled;
      var OptionClass = classNames__default["default"]((_a = {}, _a["" + className] = true, _a['Option--icon'] = icon, _a));
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: OptionClass,
        onClick: onClickHandler,
        onMouseEnter: onUpdateActiveOption,
        "data-test": dataTest,
        "data-disabled": disabled
      }, icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": dataTest + "--Icon",
        className: "Option-icon mr-4",
        name: icon,
        appearance: appearance
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: 'Option-label'
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: textClassName,
        color: color
      }, label), subInfo && renderSubInfo(subInfo)));
    };

    var _a;
    var OptionTypeMapping = (_a = {}, _a['DEFAULT'] = DefaultOption, _a['WITH_ICON'] = IconOption, _a['WITH_META'] = MetaOption, _a['WITH_CHECKBOX'] = CheckboxOption, _a['ICON_WITH_META'] = IconWithMetaOption, _a);

    var Option = function Option(props) {
      var _a, _b, _c, _d;

      var optionData = props.optionData,
          selected = props.selected,
          onClick = props.onClick,
          updateActiveOption = props.updateActiveOption,
          onChange = props.onChange,
          active = props.active,
          index = props.index,
          checkboxes = props.checkboxes,
          menu = props.menu,
          _e = props.id,
          id = _e === void 0 ? '' : _e;
      var _f = (optionData.optionType ? optionData : props).optionType,
          optionType = _f === void 0 ? 'DEFAULT' : _f;
      var disabled = optionData.disabled;
      var color = disabled ? 'inverse-lightest' : selected && !menu ? 'primary-dark' : 'inverse';
      var appearance = disabled ? 'disabled' : selected && !menu ? 'primary_dark' : 'default';
      var type = checkboxes ? 'WITH_CHECKBOX' : optionType;
      var component = OptionTypeMapping[type];
      var OptionClassName = classNames__default["default"]((_a = {}, _a['Option'] = true, _a['Option--active'] = active, _a['Option--selected'] = selected && !menu, _a['Option--disabled'] = disabled, _a['OptionWrapper'] = true, _a["color-" + color] = true, _a));
      var CheckboxClassName = classNames__default["default"]((_b = {}, _b['Option-checkbox'] = true, _b['Option-checkbox--active'] = active, _b['OptionWrapper'] = true, _b));
      var textClassName = classNames__default["default"]((_c = {}, _c['Option-text'] = true, _c['Option-text--wrap'] = !props.truncateOption, _c));
      var customOptionClass = classNames__default["default"]((_d = {}, _d['OptionWrapper'] = true, _d['OptionWrapper--disabled'] = disabled, _d));

      var onUpdateActiveOption = function onUpdateActiveOption() {
        if (disabled) return;
        if (updateActiveOption) updateActiveOption(index);
      };

      var onClickHandler = function onClickHandler(e) {
        e.stopPropagation();
        if (disabled) return;
        if (onClick) onClick();
      };

      var onChangeHandler = function onChangeHandler(e) {
        e.stopPropagation();
        if (disabled) return;
        if (onChange) onChange(e);
      };

      if (props.optionRenderer) {
        return /*#__PURE__*/React__namespace.createElement("div", __assign({
          "data-test": "DesignSystem-DropdownOption--Custom",
          className: customOptionClass,
          "data-disabled": disabled,
          onMouseEnter: onUpdateActiveOption
        }, !checkboxes && {
          onClick: onClick
        }), props.optionRenderer({
          optionData: optionData,
          selected: selected,
          onChange: onChange,
          active: active,
          index: index
        }));
      }

      var renderSubInfo = function renderSubInfo(subInfo) {
        var labelAppearance = disabled ? 'disabled' : selected && !menu ? 'white' : 'subtle';
        var subInfoColor = disabled ? 'inverse-lightest' : selected && !menu ? 'primary-dark' : 'inverse-lighter';
        var iconAppearance = selected ? 'white' : 'disabled';

        if (typeof subInfo === 'string') {
          return /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-DropdownOption--WITH_META--Meta",
            color: subInfoColor,
            size: "small",
            weight: "medium",
            className: "Option-subInfo"
          }, subInfo);
        }

        var _a = subInfo.list,
            list = _a === void 0 ? [] : _a,
            seperator = subInfo.seperator;
        return /*#__PURE__*/React__namespace.createElement(MetaList, {
          list: list,
          seperator: seperator,
          iconAppearance: iconAppearance,
          labelAppearance: labelAppearance,
          seperatorAppearance: iconAppearance,
          "data-test": "DesignSystem-DropdownOption--WITH_META--MetaList"
        });
      };

      return component({
        selected: selected,
        index: index,
        renderSubInfo: renderSubInfo,
        optionData: optionData,
        textClassName: textClassName,
        appearance: appearance,
        color: color,
        onClickHandler: onClickHandler,
        onChangeHandler: onChangeHandler,
        onUpdateActiveOption: onUpdateActiveOption,
        dataTest: "DesignSystem-DropdownOption--" + type,
        className: checkboxes ? CheckboxClassName : OptionClassName,
        id: id
      });
    };

    var PlaceholderParagraph = function PlaceholderParagraph(props) {
      var _a, _b;

      var length = props.length,
          size = props.size,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        'Placeholder--animation': true,
        PlaceholderParagraph: true
      }, _a["PlaceholderParagraph--" + size] = size, _a));
      var wrapperClass = classNames__default["default"]((_b = {
        'PlaceholderParagraph-wrapper': true
      }, _b["PlaceholderParagraph-wrapper--length-" + length] = length, _b["PlaceholderParagraph-wrapper--size-" + size] = size, _b), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: wrapperClass
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: classes
      }));
    };
    PlaceholderParagraph.displayName = 'PlaceholderParagraph';
    PlaceholderParagraph.defaultProps = {
      length: 'medium'
    };

    var PlaceholderImage = function PlaceholderImage(props) {
      var _a;

      var _b = props.size,
          size = _b === void 0 ? 'small' : _b,
          round = props.round,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        PlaceholderImage: true,
        'Placeholder--animation': true
      }, _a['PlaceholderImage--round'] = round, _a["PlaceholderImage--" + size] = size, _a), className);
      return /*#__PURE__*/React__namespace.createElement("span", __assign({}, baseProps, {
        className: classes
      }));
    };
    PlaceholderImage.displayName = 'PlaceholderImage';
    PlaceholderImage.defaultProps = {
      size: 'small'
    };

    var Placeholder = function Placeholder(props) {
      var _a, _b;

      var imageSize = props.imageSize,
          withImage = props.withImage,
          round = props.round,
          children = props.children,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var paragraphClasses = classNames__default["default"]((_a = {
        'Placeholder-paragraph': true
      }, _a['Placeholder-paragraph--withImage'] = withImage, _a));
      var classes = classNames__default["default"]((_b = {}, _b['Placeholder'] = true, _b), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Placeholder"
      }, baseProps, {
        className: classes
      }), withImage && /*#__PURE__*/React__namespace.createElement(PlaceholderImage, {
        round: round,
        size: imageSize,
        "data-test": "DesignSystem-Placeholder--Image"
      }), children && /*#__PURE__*/React__namespace.createElement("div", {
        className: paragraphClasses,
        "data-test": "DesignSystem-Placeholder--Paragraph"
      }, children));
    };
    Placeholder.displayName = 'Placeholder';
    Placeholder.defaultProps = {
      withImage: true,
      imageSize: 'small'
    };

    var Loading = function Loading(props) {
      var loadingType = props.loadingType,
          optionIndex = props.optionIndex;
      var placeholderSizes = ['medium', 'large'];
      var size = placeholderSizes[(optionIndex + 2) % 2];

      switch (loadingType) {
        case 'DEFAULT':
          return /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: size,
            "data-test": "DesignSystem-Dropdown--PlaceholderParagraph"
          });

        case 'WITH_ICON':
          return /*#__PURE__*/React__namespace.createElement(Placeholder, {
            withImage: true,
            round: true,
            "data-test": "DesignSystem-Dropdown--Placeholder"
          }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large"
          }));

        case 'WITH_META':
          return /*#__PURE__*/React__namespace.createElement(Placeholder, {
            withImage: false,
            "data-test": "DesignSystem-Dropdown--Placeholder"
          }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large",
            "data-test": "DesignSystem-Dropdown--PlaceholderParagraph"
          }), /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "medium",
            size: "xxs",
            "data-test": "DesignSystem-Dropdown--PlaceholderParagraph"
          }));

        case 'WITH_CHECKBOX':
          return /*#__PURE__*/React__namespace.createElement(Placeholder, {
            withImage: true,
            "data-test": "DesignSystem-Dropdown--Placeholder"
          }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large"
          }));

        case 'ICON_WITH_META':
          return /*#__PURE__*/React__namespace.createElement(Placeholder, {
            withImage: true,
            round: true,
            imageSize: 'medium',
            "data-test": "DesignSystem-Dropdown--Placeholder"
          }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large",
            "data-test": "DesignSystem-Dropdown--PlaceholderParagraph"
          }), /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "medium",
            size: "xxs",
            "data-test": "DesignSystem-Dropdown--PlaceholderParagraph"
          }));
      }

      return null;
    };

    var errorTitle = {
      FAILED_TO_FETCH: 'Failed to fetch data',
      NO_RECORDS_FOUND: 'No results found',
      DEFAULT: 'No record available'
    };
    var errorDescription = {
      FAILED_TO_FETCH: "We couldn't load the data, try reloading.",
      NO_RECORDS_FOUND: 'Try modifying your search to find what you are looking for.',
      DEFAULT: 'We have nothing to show you at the moment.'
    };
    var ErrorTemplate = function ErrorTemplate(_a) {
      var dropdownStyle = _a.dropdownStyle,
          errorType = _a.errorType,
          updateOptions = _a.updateOptions;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Dropdown-wrapper px-7 d-flex",
        style: dropdownStyle,
        "data-test": "DesignSystem-Dropdown--wrapper"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex flex-column justify-content-center align-items-center w-100",
        "data-test": "DesignSystem-Dropdown--errorWrapper"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: "text-align-center mb-3",
        weight: "strong"
      }, errorTitle[errorType]), /*#__PURE__*/React__namespace.createElement(Text, {
        className: "text-align-center mb-6",
        weight: "medium",
        size: "small",
        appearance: "subtle"
      }, errorDescription[errorType]), errorType === 'FAILED_TO_FETCH' && /*#__PURE__*/React__namespace.createElement(Button, {
        size: "tiny",
        largeIcon: true,
        "aria-label": "reload",
        icon: "refresh",
        iconAlign: "left",
        onClick: function onClick() {
          return updateOptions();
        }
      }, "Reload")));
    };

    var alignmentMapping = {
      right: 'bottom-start',
      left: 'bottom-end'
    };

    var DropdownList = function DropdownList(props) {
      var _a, _b, _c;

      var _d = props.listOptions,
          listOptions = _d === void 0 ? [] : _d,
          inputRef = props.inputRef,
          _e = props.align,
          align = _e === void 0 ? 'right' : _e,
          _f = props.optionType,
          optionType = _f === void 0 ? 'DEFAULT' : _f,
          _g = props.applyButtonLabel,
          applyButtonLabel = _g === void 0 ? 'Apply' : _g,
          _h = props.cancelButtonLabel,
          cancelButtonLabel = _h === void 0 ? 'Cancel' : _h,
          _j = props.truncateOption,
          truncateOption = _j === void 0 ? true : _j,
          _k = props.withSelectAll,
          withSelectAll = _k === void 0 ? true : _k,
          _l = props.maxHeight,
          maxHeight = _l === void 0 ? 200 : _l,
          customTrigger = props.customTrigger,
          selected = props.selected,
          tempSelected = props.tempSelected,
          previousSelected = props.previousSelected,
          remainingOptions = props.remainingOptions,
          firstEnabledOption = props.firstEnabledOption,
          dropdownOpen = props.dropdownOpen,
          menu = props.menu,
          searchTerm = props.searchTerm,
          showApplyButton = props.showApplyButton,
          withCheckbox = props.withCheckbox,
          withSearch = props.withSearch,
          popoverOptions = props.popoverOptions,
          onSearchChange = props.onSearchChange,
          optionRenderer = props.optionRenderer,
          applyOptions = props.applyOptions,
          cancelOptions = props.cancelOptions,
          toggleDropdown = props.toggleDropdown,
          className = props.className,
          _m = props.searchPlaceholder,
          searchPlaceholder = _m === void 0 ? 'Search..' : _m,
          scrollIndex = props.scrollIndex,
          updateOptions = props.updateOptions,
          noResultMessage = props.noResultMessage,
          errorType = props.errorType,
          loadingOptions = props.loadingOptions;
      var baseProps = extractBaseProps(props);
      var dropdownRef = /*#__PURE__*/React__namespace.createRef();
      var triggerRef = /*#__PURE__*/React__namespace.createRef();
      var dropdownTriggerRef = /*#__PURE__*/React__namespace.createRef();
      var dropdownCancelButtonRef = /*#__PURE__*/React__namespace.createRef();
      var dropdownApplyButtonRef = /*#__PURE__*/React__namespace.createRef();

      var _o = React__namespace.useState(),
          popoverStyle = _o[0],
          setPopoverStyle = _o[1];

      var _p = React__namespace.useState(firstEnabledOption),
          cursor = _p[0],
          setCursor = _p[1];

      var _q = React__namespace.useState(),
          minHeight = _q[0],
          setMinHeight = _q[1];

      var getMinHeight = function getMinHeight() {
        var dropdownWrapper = document.querySelector('.Dropdown-wrapper');
        var minHeight = dropdownWrapper === null || dropdownWrapper === void 0 ? void 0 : dropdownWrapper.offsetHeight;
        minHeight && setMinHeight(minHeight);
      };

      var isDropdownListBlank = listOptions.length === 0 && !loadingOptions && selected.length <= 0;
      React__namespace.useEffect(function () {
        var _a;

        var timer;

        if (dropdownOpen) {
          var width = props.width,
              minWidth = props.minWidth,
              maxWidth = props.maxWidth;
          var popperWidth = (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
          var popperMinWidth = showApplyButton ? 176 : menu ? 128 : popperWidth;
          var popperWrapperStyle = {
            width: width ? width : popperWidth,
            minWidth: minWidth ? minWidth : popperMinWidth,
            maxWidth: maxWidth ? maxWidth : '100%'
          };
          requestAnimationFrame(getMinHeight);
          setPopoverStyle(popperWrapperStyle);

          if (scrollIndex && tempSelected.length === 0) {
            timer = setTimeout(function () {
              scrollToOptionIndex(scrollIndex, listOptions);
            }, 100);
          }
        }

        return function () {
          clearTimeout(timer);
        };
      }, [dropdownOpen]);
      React__namespace.useEffect(function () {
        if (firstEnabledOption !== cursor) setCursor(firstEnabledOption);
      }, [firstEnabledOption]);
      var _r = props.triggerSize,
          triggerSize = _r === void 0 ? 'regular' : _r,
          _s = props.placeholder,
          placeholder = _s === void 0 ? 'Select' : _s,
          icon = props.icon,
          error = props.error,
          disabled = props.disabled,
          inlineLabel = props.inlineLabel,
          triggerLabel = props.triggerLabel,
          iconType = props.iconType;
      var CustomTrigger = customTrigger ? customTrigger(triggerLabel ? triggerLabel : placeholder) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null);
      var NewCustomTrigger = /*#__PURE__*/React__namespace.cloneElement(CustomTrigger, {
        tabIndex: 0,
        ref: dropdownTriggerRef
      });
      var trigger = customTrigger ? NewCustomTrigger : /*#__PURE__*/React__namespace.createElement(DropdownButton, {
        placeholder: placeholder,
        triggerSize: triggerSize,
        open: dropdownOpen,
        icon: icon,
        disabled: disabled,
        inlineLabel: inlineLabel,
        menu: menu,
        error: error,
        ref: dropdownTriggerRef,
        iconType: iconType
      }, triggerLabel);
      var dropdownStyle = {
        maxHeight: maxHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: minHeight
      };
      var loaderStyle = {
        maxHeight: minHeight ? minHeight : maxHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: minHeight
      };

      var defaultErrorTemplate = function defaultErrorTemplate() {
        return /*#__PURE__*/React__namespace.createElement(ErrorTemplate, {
          dropdownStyle: __assign(__assign({}, dropdownStyle), {
            minHeight: maxHeight
          }),
          updateOptions: updateOptions,
          errorType: errorType
        });
      };

      var getDropdownSectionClass = function getDropdownSectionClass(showClearButton) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['Dropdown-section'] = true, _a['Dropdown-section--withClear'] = showClearButton, _a));
      };

      var dropdownClass = classNames__default["default"]((_a = {}, _a['Dropdown'] = true, _a), className);
      var dropdownWrapperClass = classNames__default["default"]((_b = {}, _b['Dropdown-wrapper'] = true, _b['Dropdown-wrapper--wrap'] = !truncateOption, _b));
      var SelectAllClass = classNames__default["default"]((_c = {}, _c['Option-checkbox--active'] = cursor === 0, _c['Option-checkboxWrapper'] = true, _c['Option-checkbox'] = true, _c['OptionWrapper'] = true, _c));

      var onToggleDropdown = function onToggleDropdown(open, type) {
        var _a;

        toggleDropdown(open, type);
        if (!disabled) (_a = dropdownTriggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setCursor(firstEnabledOption);
      };

      var onCancelOptions = function onCancelOptions() {
        var _a;

        cancelOptions();
        (_a = dropdownTriggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      };

      var onApplyOptions = function onApplyOptions() {
        var _a;

        applyOptions();
        (_a = dropdownTriggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      };

      var optionClickHandler = function optionClickHandler(item) {
        var _a;

        props.onOptionSelect(item);
        (_a = dropdownTriggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      };

      var searchClearHandler = function searchClearHandler() {
        setCursor(firstEnabledOption);
        if (onSearchChange && searchTerm) onSearchChange('');
      };

      var searchHandler = function searchHandler(event) {
        setCursor(firstEnabledOption);
        if (onSearchChange) onSearchChange(event.target.value);
      };

      var updateActiveOption = function updateActiveOption(index, parentCheckbox) {
        var updatedIndex = withCheckbox && withSelectAll && !props.async && !parentCheckbox ? index + 1 : index;
        setCursor(updatedIndex);
      };

      var renderFooter = function renderFooter() {
        var _a = props.footerLabel,
            footerLabel = _a === void 0 ? 'Search for more options' : _a;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "Dropdown-footer"
        }, /*#__PURE__*/React__namespace.createElement(Text, {
          size: "small",
          appearance: 'subtle'
        }, footerLabel));
      };

      var renderGroups = function renderGroups(group, selectedGroup) {
        var onClearOptions = props.onClearOptions;
        var isClearDisabled = selected.every(function (option) {
          return option.disabled;
        });
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: getDropdownSectionClass(selectedGroup)
        }, /*#__PURE__*/React__namespace.createElement(Text, {
          size: "small",
          appearance: 'subtle'
        }, group), selectedGroup && /*#__PURE__*/React__namespace.createElement(Button, {
          onClick: onClearOptions,
          disabled: isClearDisabled,
          appearance: "transparent",
          size: "tiny",
          type: "button"
        }, "Clear"));
      };

      var renderApplyButton = function renderApplyButton() {
        var disable = _isEqual(previousSelected, tempSelected) || props.loadingOptions;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "Dropdown-buttonWrapper"
        }, /*#__PURE__*/React__namespace.createElement(Button, {
          ref: dropdownCancelButtonRef,
          className: "mr-4",
          appearance: 'basic',
          onClick: onCancelOptions,
          disabled: props.loadingOptions,
          size: 'tiny',
          tabIndex: -1,
          "data-test": "DesignSystem-Dropdown-CancelButton",
          type: "button"
        }, cancelButtonLabel), /*#__PURE__*/React__namespace.createElement(Button, {
          ref: dropdownApplyButtonRef,
          appearance: 'primary',
          disabled: disable,
          size: 'tiny',
          onClick: onApplyOptions,
          "data-test": "DesignSystem-Dropdown-ApplyButton",
          type: "button"
        }, applyButtonLabel));
      };

      var renderSearch = function renderSearch() {
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "Dropdown-inputWrapper"
        }, /*#__PURE__*/React__namespace.createElement(Input, {
          name: "Dropdown-search",
          icon: 'search',
          value: searchTerm,
          placeholder: searchPlaceholder,
          autoFocus: true,
          onChange: searchHandler,
          onClear: searchClearHandler,
          ref: inputRef,
          autoComplete: 'off',
          className: "Dropdown-input"
        }));
      };

      var renderLoading = function renderLoading(loadersLength) {
        var arr = Array(loadersLength).fill('Loading');
        var type = withCheckbox ? 'WITH_CHECKBOX' : optionType;
        return arr.map(function (option, ind) {
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: "Option-loading",
            key: option + "-" + ind
          }, /*#__PURE__*/React__namespace.createElement(Loading, {
            loadingType: type,
            optionIndex: ind
          }));
        });
      };

      var renderSelectAll = function renderSelectAll() {
        var _a = props.selectAllLabel,
            selectAllLabel = _a === void 0 ? 'Select All' : _a,
            selectAll = props.selectAll,
            onSelectAll = props.onSelectAll;
        var label = selectAllLabel.trim() ? selectAllLabel.trim() : 'Select All';
        var id = "Checkbox-option-" + label.toLowerCase().replace(/\s+/g, '') + "-" + new Date().getTime();
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: SelectAllClass,
          onMouseEnter: function onMouseEnter() {
            return updateActiveOption(0, true);
          }
        }, /*#__PURE__*/React__namespace.createElement("label", {
          htmlFor: id,
          className: "Checkbox-label"
        }, /*#__PURE__*/React__namespace.createElement(Checkbox, {
          label: label,
          onChange: onSelectAll,
          checked: selectAll.checked,
          indeterminate: selectAll.indeterminate,
          tabIndex: -1,
          className: "OptionCheckbox",
          id: id
        })));
      };

      var renderOptions = function renderOptions(item, index) {
        var selectAllPresent = _isSelectAllPresent(searchTerm, remainingOptions, withSelectAll, withCheckbox);

        var active = selectAllPresent ? index + 1 === cursor : index === cursor;
        var optionIsSelected = tempSelected.findIndex(function (option) {
          return option.value === item.value;
        }) !== -1;
        var id = "Checkbox-option-" + index + "-" + item.value + "-" + new Date().getTime();
        return /*#__PURE__*/React__namespace.createElement("label", {
          htmlFor: id
        }, /*#__PURE__*/React__namespace.createElement(Option, {
          optionData: item,
          truncateOption: truncateOption,
          selected: optionIsSelected,
          index: index,
          updateActiveOption: updateActiveOption,
          optionRenderer: optionRenderer,
          active: active,
          checkboxes: withCheckbox,
          menu: menu,
          onClick: function onClick() {
            return optionClickHandler(item);
          },
          onChange: function onChange(e) {
            return props.onSelect(item, e.target.checked);
          },
          optionType: props.optionType,
          id: id
        }));
      };

      var renderDropdownSection = function renderDropdownSection() {
        var _a;

        var _b = props.selectedSectionLabel,
            selectedSectionLabel = _b === void 0 ? 'Selected Items' : _b,
            _c = props.allItemsSectionLabel,
            allItemsSectionLabel = _c === void 0 ? 'All Items' : _c,
            _d = props.loadersCount,
            loadersCount = _d === void 0 ? 10 : _d,
            _e = props.errorTemplate,
            errorTemplate = _e === void 0 ? defaultErrorTemplate : _e;

        var selectAllPresent = _isSelectAllPresent(searchTerm, remainingOptions, withSelectAll, withCheckbox);

        var groupedListOptions = groupListOptions(listOptions);

        if (loadersCount && loadingOptions) {
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: 'Dropdown-loading'
          }, /*#__PURE__*/React__namespace.createElement("div", {
            className: "Dropdown-wrapper",
            style: loaderStyle
          }, renderLoading(loadersCount)));
        }

        if (isDropdownListBlank) {
          if (noResultMessage) {
            return /*#__PURE__*/React__namespace.createElement("div", {
              className: "Dropdown-wrapper w-100",
              style: dropdownStyle,
              "data-test": "DesignSystem-Dropdown--errorWrapper"
            }, /*#__PURE__*/React__namespace.createElement("div", {
              className: 'Option'
            }, /*#__PURE__*/React__namespace.createElement("div", {
              className: 'Option-subinfo'
            }, noResultMessage)));
          } else {
            return errorTemplate && errorTemplate({
              errorType: errorType
            });
          }
        }

        return /*#__PURE__*/React__namespace.createElement("div", {
          className: dropdownWrapperClass,
          style: dropdownStyle,
          ref: dropdownRef
        }, selectAllPresent && renderSelectAll(), selected.length > 0 && renderGroups(selectedSectionLabel, true), selected.map(function (option, index) {
          return renderOptions(option, index);
        }), selected.length > 0 && listOptions.length - selected.length > 0 && !((_a = listOptions[0].group) === null || _a === void 0 ? void 0 : _a.trim()) && renderGroups(allItemsSectionLabel), groupedListOptions.map(function (option, index) {
          var prevGroup = index > 0 ? groupedListOptions[index - 1].group : selected.length ? selectedSectionLabel : undefined;
          var currentGroup = option.group;
          var isGroupDifferent = prevGroup !== currentGroup;
          var updatedIndex = index + selected.length;
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: "Option-checkboxWrapper",
            key: index
          }, isGroupDifferent && currentGroup && renderGroups(currentGroup), renderOptions(option, updatedIndex));
        }), props.async && remainingOptions > 0 && renderFooter());
      };

      var focusOption = function focusOption(direction, classes) {
        var elements = document.querySelectorAll(classes);
        var updatedCursor = direction === 'down' ? cursor + 1 : cursor - 1;
        var startIndex = updatedCursor;
        var endIndex = direction === 'down' ? elements.length : -1;

        while (startIndex !== endIndex) {
          var node = elements[startIndex];

          if (node.getAttribute('data-disabled') !== 'true') {
            var element = elements[startIndex];
            if (element) scrollIntoView(dropdownRef.current, element);
            if (element !== undefined) setCursor(startIndex);
            break;
          }

          if (direction === 'down') {
            startIndex++;
          } else {
            startIndex--;
          }
        }
      };

      var onkeydown = function onkeydown(event) {
        var _a, _b, _c;

        var optionClass = '.OptionWrapper';

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            dropdownOpen ? focusOption('down', optionClass) : onToggleDropdown(!dropdownOpen);
            break;

          case 'ArrowUp':
            event.preventDefault();
            dropdownOpen ? focusOption('up', optionClass) : onToggleDropdown(!dropdownOpen);
            break;

          case 'Enter':
            {
              var activeElement = document.activeElement;

              if (dropdownOpen && (inputRef.current === activeElement || dropdownTriggerRef.current === activeElement)) {
                event.preventDefault();
                var classes = withCheckbox ? optionClass + " .Checkbox-input" : optionClass;
                var elements = document.querySelectorAll(classes);
                var element = elements[cursor];
                if (element) element.click();
              }

              if (!dropdownOpen) onToggleDropdown(!dropdownOpen);
              break;
            }

          case 'Tab':
            {
              if (!showApplyButton && dropdownOpen) {
                event.preventDefault();
                onToggleDropdown(false, 'onClick');
                return;
              }

              var currentElement = document.activeElement;
              var disabledApplyButton = (_a = dropdownApplyButtonRef.current) === null || _a === void 0 ? void 0 : _a.disabled;

              if ((currentElement === dropdownCancelButtonRef.current && disabledApplyButton || currentElement === dropdownApplyButtonRef.current) && dropdownOpen) {
                event.preventDefault();
                onToggleDropdown(false, 'onClick');
                return;
              }

              if (showApplyButton && dropdownOpen) {
                event.preventDefault();

                if (currentElement === dropdownCancelButtonRef.current) {
                  (_b = dropdownApplyButtonRef.current) === null || _b === void 0 ? void 0 : _b.focus();
                } else {
                  (_c = dropdownCancelButtonRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
              }

              break;
            }
        }
      };

      var enableSearch = withSearch || props.async;
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: dropdownClass,
        ref: triggerRef,
        onKeyDown: onkeydown
      }), /*#__PURE__*/React__namespace.createElement(Popover, __assign({
        onToggle: onToggleDropdown,
        trigger: trigger,
        triggerClass: !menu ? 'w-100' : '',
        open: dropdownOpen,
        customStyle: popoverStyle,
        position: alignmentMapping[align]
      }, popoverOptions, {
        "data-test": "DesignSystem-Dropdown--Popover"
      }), enableSearch && renderSearch(), renderDropdownSection(), showApplyButton && withCheckbox && renderApplyButton()));
    };

    DropdownList.displayName = 'DropdownList';

    var inputRef = /*#__PURE__*/React__namespace.createRef();

    var Dropdown = function (_super) {
      __extends(Dropdown, _super);

      function Dropdown(props) {
        var _this = _super.call(this, props) || this;

        _this.getDisabledOptions = function (options) {
          if (options === void 0) {
            options = [];
          }

          return options.filter(function (option) {
            return option.disabled;
          });
        };

        _this.fetchOptionsFunction = function (searchTerm) {
          var options = _this.props.options;
          var filteredOptions = searchTerm ? getSearchedOptions(options, searchTerm) : options;
          return new Promise(function (resolve) {
            resolve({
              searchTerm: searchTerm,
              options: filteredOptions,
              count: filteredOptions.length
            });
          });
        };

        _this.getUnSelectedOptions = function (options, init) {
          if (options.length) {
            if (!init) {
              return options.filter(function (option) {
                return _this.state.tempSelected.findIndex(function (item) {
                  return item.value === option.value;
                }) === -1;
              });
            }

            var _a = _this.props.selected,
                selected_1 = _a === void 0 ? [] : _a;
            var unSelectedGroup = options.filter(function (option) {
              return _isControlled(_this.props.selected) ? selected_1.findIndex(function (item) {
                return item.value === option.value;
              }) === -1 : !option.selected;
            });
            return unSelectedGroup;
          }

          return options;
        };

        _this.getSelectedOptions = function (options, init) {
          var _a = _this.props.selected,
              selected = _a === void 0 ? [] : _a;

          if (options.length) {
            if (!init) return _this.state.tempSelected;
            var selectedGroup = _isControlled(_this.props.selected) ? selected : options.filter(function (option) {
              return option.selected;
            });
            return selectedGroup;
          }

          return [];
        };

        _this.updateOptions = function (init, async) {
          var _a = _this.state,
              searchTerm = _a.searchTerm,
              selectAll = _a.selectAll,
              tempSelected = _a.tempSelected,
              previousSelected = _a.previousSelected,
              errorType = _a.errorType;
          var updatedAsync = async === undefined ? _this.state.async : async;
          var _b = _this.props,
              fetchOptions = _b.fetchOptions,
              withCheckbox = _b.withCheckbox,
              withSearch = _b.withSearch;
          var fetchFunction = fetchOptions ? fetchOptions : _this.fetchOptionsFunction;
          fetchFunction(searchTerm).then(function (res) {
            var _a;

            var options = res.options,
                count = res.count;

            if (res.scrollToIndex) {
              setTimeout(function () {
                scrollToOptionIndex(res.scrollToIndex, options);
              }, 0);
            }

            if (!res.searchTerm || res.searchTerm && res.searchTerm === _this.state.searchTerm) {
              updatedAsync = searchTerm === '' ? count > _this.staticLimit : updatedAsync;
              var unSelectedGroup = _showSelectedItems(updatedAsync, searchTerm, withCheckbox) ? _this.getUnSelectedOptions(options, init) : options;
              var selectedGroup = searchTerm === '' ? _this.getSelectedOptions(options, init) : [];
              var optionsLength = searchTerm === '' ? count : _this.state.optionsLength;

              var disabledOptions = _this.getDisabledOptions(unSelectedGroup.slice(0, _this.staticLimit));

              var errorResult = errorType;

              if (optionsLength === 0 && searchTerm === '') {
                errorResult = 'DEFAULT';
              } else if (searchTerm !== '') {
                errorResult = 'NO_RECORDS_FOUND';
              } else {
                errorResult = 'FAILED_TO_FETCH';
              }

              _this.setState(__assign(__assign({}, _this.state), {
                errorType: fetchOptions ? errorResult : errorType,
                scrollIndex: res.scrollToIndex || 0,
                optionsLength: optionsLength,
                loading: false,
                async: updatedAsync,
                searchedOptionsLength: count,
                options: unSelectedGroup.slice(0, _this.staticLimit),
                tempSelected: init ? selectedGroup : tempSelected,
                previousSelected: init ? selectedGroup : previousSelected,
                selected: _showSelectedItems(updatedAsync, searchTerm, withCheckbox) ? selectedGroup : [],
                triggerLabel: _this.updateTriggerLabel(init ? selectedGroup : tempSelected),
                selectAll: !updatedAsync && init ? getSelectAll$1(selectedGroup, optionsLength, disabledOptions.length) : selectAll
              }));

              if (updatedAsync || withSearch) (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
          })["catch"](function () {
            _this.setState({
              errorType: fetchOptions ? 'FAILED_TO_FETCH' : errorType,
              loading: false,
              options: []
            });
          });
        };

        _this.updateSearchTerm = function (search) {
          _this.setState(__assign(__assign({}, _this.state), {
            loading: true,
            searchInit: true,
            searchTerm: search,
            errorType: 'NO_RECORDS_FOUND'
          }));
        };

        _this.updateOnPopperToggle = function () {
          var _a = _this.props,
              withCheckbox = _a.withCheckbox,
              showApplyButton = _a.showApplyButton,
              onClose = _a.onClose,
              name = _a.name,
              _b = _a.selected,
              selected = _b === void 0 ? [] : _b;
          var _c = _this.state,
              previousSelected = _c.previousSelected,
              tempSelected = _c.tempSelected,
              optionsLength = _c.optionsLength,
              async = _c.async,
              loading = _c.loading,
              searchTerm = _c.searchTerm,
              options = _c.options;
          var popperIsOpen = _isOpenControlled(_this.props.open) ? _this.props.open : _this.state.open;

          var disabledOptionsCount = _this.getDisabledOptions(options).length;

          if (withCheckbox && showApplyButton) {
            var temporarySelected = _isControlled(_this.props.selected) ? selected : previousSelected;

            _this.setState({
              tempSelected: temporarySelected,
              selectAll: getSelectAll$1(temporarySelected, optionsLength, disabledOptionsCount),
              triggerLabel: _this.updateTriggerLabel(temporarySelected)
            });
          }

          if (_isOpenControlled(_this.props.open)) {
            _this.setState({
              open: popperIsOpen
            });
          }

          if (popperIsOpen) {
            var moveSelectedGroup = _showSelectedItems(async, searchTerm, withCheckbox) && !_isEqual(_this.state.selected, tempSelected);

            _this.setState({
              loading: moveSelectedGroup || loading || searchTerm !== '',
              searchInit: searchTerm !== '',
              searchTerm: ''
            });

            if (moveSelectedGroup) _this.updateOptions(false);
          }

          if (onClose && !popperIsOpen) {
            var arr = withCheckbox && showApplyButton ? _isControlled(_this.props.selected) ? selected : previousSelected : _this.state.tempSelected;
            var values = arr.map(function (option) {
              return option.value;
            });

            _this.debounceOnClose(values, name);
          }
        };

        _this.debounceOnClose = debounce(300, function (values, name) {
          var onClose = _this.props.onClose;

          if (onClose) {
            onClose(values, name);
          }
        });

        _this.updateTriggerLabel = function (selectedArray, totalOptions) {
          if (selectedArray === void 0) {
            selectedArray = [];
          }

          var selectedLength = selectedArray.length;
          if (selectedLength === 0) return '';
          var _a = _this.props,
              _b = _a.triggerOptions,
              triggerOptions = _b === void 0 ? {} : _b,
              getLabel = _a.getLabel;
          var customLabel = triggerOptions.customLabel,
              _c = triggerOptions.labelLimit,
              labelLimit = _c === void 0 ? 2 : _c;
          var optionsLength = _this.state ? _this.state.optionsLength : totalOptions;
          var label = '';

          if (selectedLength <= labelLimit) {
            label = selectedArray.map(function (option) {
              return option.label;
            }).join(', ');
          } else {
            label = customLabel ? customLabel(selectedLength, optionsLength, selectedArray) : selectedLength + " selected";
          }

          if (getLabel) getLabel(label);
          return label;
        };

        _this.updateSelectedOptions = function (selectedArray, isSingleSelect, isControlled) {
          var _a = _this.state,
              optionsLength = _a.optionsLength,
              previousSelected = _a.previousSelected,
              selected = _a.selected,
              loading = _a.loading,
              open = _a.open;
          var _b = _this.props,
              onChange = _b.onChange,
              withCheckbox = _b.withCheckbox,
              showApplyButton = _b.showApplyButton,
              closeOnSelect = _b.closeOnSelect,
              name = _b.name,
              onPopperToggle = _b.onPopperToggle;
          var updatePreviousSelected = withCheckbox && showApplyButton && isControlled;

          var disabledOptions = _this.getDisabledOptions(_this.state.options);

          var isClearClicked = selectedArray.length === 0 && selected.length > 0 || selectedArray.every(function (option) {
            return option.disabled;
          }) && !selected.every(function (option) {
            return option.disabled;
          });

          _this.setState(__assign(__assign({}, _this.state), {
            tempSelected: selectedArray,
            triggerLabel: _this.updateTriggerLabel(selectedArray),
            selectAll: getSelectAll$1(selectedArray, optionsLength, disabledOptions.length),
            open: _isOpenControlled(_this.props.open) || withCheckbox ? open : !closeOnSelect,
            previousSelected: updatePreviousSelected ? selectedArray : previousSelected,
            selected: isClearClicked ? selectedArray : selected,
            loading: isClearClicked ? true : loading
          }));

          if (isClearClicked) _this.debounceClear();

          if (onChange && (!showApplyButton || isControlled)) {
            var values = selectedArray.map(function (item) {
              return item.value;
            });
            var selectedValues = isSingleSelect ? values[0] : values;
            onChange(selectedValues, name);
          }

          if (!withCheckbox && closeOnSelect && onPopperToggle && _isOpenControlled(_this.props.open)) {
            onPopperToggle(false, 'optionClick');
          }
        };

        _this.isValidOption = function (option) {
          var _a = _this.props,
              closeOnSelect = _a.closeOnSelect,
              withCheckbox = _a.withCheckbox,
              open = _a.open,
              onPopperToggle = _a.onPopperToggle;
          var temp = _this.state.tempSelected;

          if (temp.length > 0 && !withCheckbox && temp[0].value === option['value']) {
            _this.setState(__assign(__assign({}, _this.state), {
              open: _isOpenControlled(open) || !closeOnSelect
            }));

            if (!withCheckbox && closeOnSelect && onPopperToggle && _isOpenControlled(open)) {
              onPopperToggle(false, 'optionClick');
            }

            return false;
          }

          return true;
        };

        _this.onOptionSelect = function (option) {
          var _a = _this.props,
              onUpdate = _a.onUpdate,
              selected = _a.selected,
              menu = _a.menu;

          if (_isControlled(selected)) {
            if (onUpdate && (_this.isValidOption(option) || menu)) {
              onUpdate('select-option', option);
            }

            return;
          }

          if (_this.isValidOption(option) || menu) {
            _this.updateSelectedOptions([option], true);
          }
        };

        _this.onSelect = function (option, checked) {
          var _a = _this.props,
              onUpdate = _a.onUpdate,
              selected = _a.selected,
              showApplyButton = _a.showApplyButton;

          if (_isControlled(selected) && !showApplyButton) {
            if (onUpdate) onUpdate(checked ? 'select-option' : 'deselect-option', option);
            return;
          }

          var tempSelected = _this.state.tempSelected;
          var selectedArray = tempSelected.slice();

          if (!checked) {
            var index = selectedArray.findIndex(function (item) {
              return item.value === option.value;
            });
            selectedArray.splice(index, 1);
          }

          selectedArray = checked ? selectedArray.concat(option) : selectedArray;

          _this.updateSelectedOptions(selectedArray, false);
        };

        _this.onSelectAll = function (event) {
          var _a = _this.props,
              onUpdate = _a.onUpdate,
              selected = _a.selected,
              showApplyButton = _a.showApplyButton;
          var _b = _this.state,
              tempSelected = _b.tempSelected,
              options = _b.options;

          if (_isControlled(selected) && !showApplyButton) {
            if (onUpdate) onUpdate(event.target.checked ? 'select-all' : 'deselect-all');
            return;
          }

          var selectedArr = tempSelected.slice();
          var selectedDisabledArray = selectedArr.filter(function (option) {
            return option.disabled;
          });
          var selectedArray = event.target.checked ? __spreadArrays(options.filter(function (option) {
            return !option.disabled;
          }), selectedDisabledArray) : selectedDisabledArray;

          _this.updateSelectedOptions(selectedArray, false);
        };

        _this.debounceSearch = debounce(_this.props.searchDebounceDuration, function () {
          _this.setState({
            searchInit: false
          }, function () {
            _this.updateOptions(false);
          });
        });

        _this.reload = function () {
          _this.setState({
            loading: true
          }, function () {
            _this.updateOptions(false);
          });
        };

        _this.debounceClear = debounce(250, function () {
          return _this.updateOptions(false);
        });

        _this.onClearOptions = function () {
          var _a = _this.props,
              selected = _a.selected,
              name = _a.name,
              onUpdate = _a.onUpdate,
              showApplyButton = _a.showApplyButton,
              onChange = _a.onChange;
          var tempSelected = _this.state.tempSelected;
          var selectedArray = tempSelected.filter(function (option) {
            return option.disabled;
          });

          if (_isControlled(selected) && !showApplyButton) {
            if (onUpdate) onUpdate('clear-all');
            return;
          }

          _this.setState({
            selected: selectedArray,
            tempSelected: selectedArray,
            triggerLabel: '',
            loading: true
          });

          _this.debounceClear();

          if (onChange && !showApplyButton) onChange(selectedArray, name);
        };

        _this.onTogglePopper = function (type) {
          var onPopperToggle = _this.props.onPopperToggle;

          if (onPopperToggle && _isOpenControlled(_this.props.open)) {
            onPopperToggle(false, type);
          }
        };

        _this.onCancelOptions = function () {
          var _a = _this.state,
              previousSelected = _a.previousSelected,
              tempSelected = _a.tempSelected,
              optionsLength = _a.optionsLength;
          var _b = _this.props,
              selected = _b.selected,
              onUpdate = _b.onUpdate,
              onClose = _b.onClose,
              name = _b.name;
          var popperIsOpen = _isOpenControlled(_this.props.open) ? _this.state.open : false;
          var values = previousSelected.map(function (option) {
            return option.value;
          });

          if (_isControlled(selected)) {
            if (onUpdate) onUpdate('cancel-selected', previousSelected, tempSelected);

            _this.onTogglePopper('cancelClick');

            return;
          }

          var label = _this.updateTriggerLabel(previousSelected);

          var disabledOptions = _this.getDisabledOptions(_this.state.options);

          _this.setState(__assign(__assign({}, _this.state), {
            tempSelected: previousSelected,
            selectAll: getSelectAll$1(previousSelected, optionsLength, disabledOptions.length),
            triggerLabel: label,
            open: popperIsOpen
          }));

          if (onClose && !popperIsOpen) {
            onClose(values, name);
          }

          _this.onTogglePopper('cancelClick');
        };

        _this.onApplyOptions = function () {
          var _a = _this.state,
              tempSelected = _a.tempSelected,
              previousSelected = _a.previousSelected;
          var _b = _this.props,
              onChange = _b.onChange,
              selected = _b.selected,
              onUpdate = _b.onUpdate,
              onClose = _b.onClose,
              name = _b.name;
          var popperIsOpen = _isOpenControlled(_this.props.open) ? _this.state.open : false;
          var values = tempSelected.map(function (option) {
            return option.value;
          });

          if (_isControlled(selected)) {
            if (onUpdate) onUpdate('apply-selected', previousSelected, tempSelected);

            _this.onTogglePopper('applyClick');

            return;
          }

          _this.setState(__assign(__assign({}, _this.state), {
            previousSelected: tempSelected,
            optionsApplied: true,
            open: popperIsOpen
          }));

          if (onChange) {
            onChange(values, name);
          }

          if (onClose && !popperIsOpen) {
            onClose(values, name);
          }

          _this.onTogglePopper('applyClick');
        };

        _this.onToggleDropdown = function (updatedOpen, type) {
          if (_this.props.disabled) {
            return;
          }

          var onPopperToggle = _this.props.onPopperToggle;

          if (onPopperToggle && _isOpenControlled(_this.props.open)) {
            onPopperToggle(updatedOpen, type);
            return;
          }

          _this.setState({
            open: updatedOpen
          });
        };

        var _a = props.selected,
            selected = _a === void 0 ? [] : _a,
            totalOptions = props.totalOptions,
            withCheckbox = props.withCheckbox,
            loading = props.loading,
            open = props.open,
            options = props.options;
        _this.staticLimit = Math.min(100, props.staticLimit);
        var optionsLength = totalOptions ? totalOptions : options.length;
        var async = 'fetchOptions' in _this.props || optionsLength > _this.staticLimit;
        var selectedGroup = !async ? _this.getSelectedOptions(options, true) : [];

        var disabledOptions = _this.getDisabledOptions(options);

        _this.state = {
          async: async,
          optionsLength: optionsLength,
          open: open,
          searchInit: false,
          searchedOptionsLength: optionsLength,
          optionsApplied: false,
          options: options || [],
          loading: async ? true : loading,
          searchTerm: '',
          tempSelected: selectedGroup,
          previousSelected: selectedGroup,
          selected: _showSelectedItems(async, '', withCheckbox) ? selected : [],
          triggerLabel: _this.updateTriggerLabel(selectedGroup, optionsLength),
          selectAll: getSelectAll$1(selectedGroup, optionsLength, disabledOptions.length),
          errorType: 'DEFAULT'
        };
        return _this;
      }

      Dropdown.prototype.componentDidMount = function () {
        var async = this.state.async;
        if (async) this.updateOptions(true);
      };

      Dropdown.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;

        if (!this.state.async) {
          var _b = this.props,
              loading = _b.loading,
              fetchOptions = _b.fetchOptions,
              _c = _b.options,
              options = _c === void 0 ? [] : _c,
              withSearch = _b.withSearch;
          var disabledOptionsCount = this.getDisabledOptions(options).length;

          if (prevProps.loading !== loading && !fetchOptions) {
            if (options.length > this.staticLimit) {
              this.updateOptions(true, true);
            } else {
              var selectedGroup = this.getSelectedOptions(options, true);
              this.setState(__assign(__assign({}, this.state), {
                options: options,
                loading: loading,
                tempSelected: selectedGroup,
                previousSelected: selectedGroup,
                optionsLength: options.length,
                searchedOptionsLength: options.length,
                triggerLabel: this.updateTriggerLabel(selectedGroup),
                selectAll: getSelectAll$1(selectedGroup, this.state.optionsLength, disabledOptionsCount)
              }));
              if (withSearch) (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
          }
        }

        if (this.props.selected !== undefined && prevProps.selected !== this.props.selected && prevProps.loading === this.props.loading) {
          var isSingleSelect = !this.props.withCheckbox;
          this.updateSelectedOptions(this.props.selected, isSingleSelect, true);
        }

        if (prevState.searchTerm !== this.state.searchTerm) {
          this.debounceSearch();
        }

        if (prevProps.open !== this.props.open || prevState.open !== this.state.open) {
          if (_isOpenControlled(this.props.open) && this.props.open === this.state.open) return;
          this.updateOnPopperToggle();
        }
      };

      Dropdown.prototype.render = function () {
        var _a = this.state,
            options = _a.options,
            async = _a.async,
            open = _a.open,
            searchTerm = _a.searchTerm,
            searchInit = _a.searchInit,
            loading = _a.loading,
            searchedOptionsLength = _a.searchedOptionsLength,
            tempSelected = _a.tempSelected,
            selectAll = _a.selectAll,
            triggerLabel = _a.triggerLabel,
            previousSelected = _a.previousSelected,
            scrollIndex = _a.scrollIndex,
            errorType = _a.errorType;
        var _b = this.props,
            _c = _b.withSelectAll,
            withSelectAll = _c === void 0 ? true : _c,
            withCheckbox = _b.withCheckbox;

        var _d = this.props,
            _e = _d.triggerOptions,
            triggerOptions = _e === void 0 ? {} : _e;
            _d.selected;
            var tabIndex = _d.tabIndex,
            rest = __rest(_d, ["triggerOptions", "selected", "tabIndex"]);

        var remainingOptionsLen = searchedOptionsLength - options.length;
        var firstEnabledOption = tabIndex ? tabIndex : _isSelectAllPresent(searchTerm, remainingOptionsLen, withSelectAll, withCheckbox) ? 0 : options.findIndex(function (option) {
          return !option.disabled;
        });
        return /*#__PURE__*/React__namespace.createElement(DropdownList, __assign({
          listOptions: options,
          inputRef: inputRef,
          remainingOptions: remainingOptionsLen,
          firstEnabledOption: firstEnabledOption,
          loadingOptions: loading,
          async: async,
          searchInit: searchInit,
          dropdownOpen: open,
          searchTerm: searchTerm,
          triggerLabel: triggerLabel,
          tempSelected: tempSelected,
          previousSelected: previousSelected,
          selected: this.state.selected,
          applyOptions: this.onApplyOptions,
          cancelOptions: this.onCancelOptions,
          toggleDropdown: this.onToggleDropdown,
          onClearOptions: this.onClearOptions,
          onSelect: this.onSelect,
          selectAll: selectAll,
          onSearchChange: this.updateSearchTerm,
          onOptionSelect: this.onOptionSelect,
          onSelectAll: this.onSelectAll,
          customTrigger: triggerOptions.customTrigger,
          scrollIndex: scrollIndex,
          updateOptions: this.reload,
          errorType: errorType
        }, rest));
      };

      Dropdown.defaultProps = {
        triggerOptions: {},
        options: [],
        closeOnSelect: true,
        staticLimit: 50,
        searchDebounceDuration: 300
      };
      return Dropdown;
    }(React__namespace.Component);

    var sizeMap = {
      s: 'h5',
      m: 'h4',
      l: 'h3',
      xl: 'h2',
      xxl: 'h1'
    };
    var Heading = function Heading(props) {
      var _a;

      var appearance = props.appearance,
          size = props.size,
          children = props.children,
          className = props.className,
          color = props.color,
          rest = __rest(props, ["appearance", "size", "children", "className", "color"]);

      var classes = classNames__default["default"]((_a = {
        Heading: true
      }, _a["Heading--" + size] = size, _a["Heading--" + appearance] = !color && appearance, _a["color-" + color] = color, _a), className);
      return /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        "data-test": "DesignSystem-Heading"
      }, rest, {
        className: classes,
        componentType: sizeMap[size]
      }), children);
    };
    Heading.displayName = 'Heading';
    Heading.defaultProps = {
      appearance: 'default',
      size: 'm'
    };

    var ActionButton$1 = function ActionButton(props) {
      var _a;

      var className = props.className,
          iconType = props.iconType,
          rest = __rest(props, ["className", "iconType"]);

      var iconClass = classNames__default["default"]((_a = {}, _a['ActionButton'] = true, _a["" + className] = className, _a));
      return /*#__PURE__*/React__namespace.createElement(Icon, __assign({
        className: iconClass,
        type: iconType,
        "data-test": "DesignSystem-Input-ActionButton"
      }, rest));
    };
    ActionButton$1.displayName = 'ActionButton';
    ActionButton$1.defaultProps = {
      size: 16,
      type: 'rounded'
    };

    var sizeMapping$2 = {
      tiny: 12,
      regular: 16,
      large: 20
    };
    var Input = /*#__PURE__*/React__namespace.forwardRef(function (props, forwardedRef) {
      var _a, _b, _c, _d;

      var _e = props.size,
          size = _e === void 0 ? 'regular' : _e,
          _f = props.type,
          type = _f === void 0 ? 'text' : _f,
          _g = props.minWidth,
          minWidth = _g === void 0 ? type !== 'number' ? 256 : undefined : _g,
          defaultValue = props.defaultValue,
          name = props.name,
          placeholder = props.placeholder,
          value = props.value,
          icon = props.icon,
          inlineLabel = props.inlineLabel,
          required = props.required,
          error = props.error,
          info = props.info,
          onChange = props.onChange,
          onClick = props.onClick,
          onClear = props.onClear,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          onPaste = props.onPaste,
          actionIcon = props.actionIcon,
          className = props.className,
          autoFocus = props.autoFocus,
          disabled = props.disabled,
          readOnly = props.readOnly,
          iconType = props.iconType,
          rest = __rest(props, ["size", "type", "minWidth", "defaultValue", "name", "placeholder", "value", "icon", "inlineLabel", "required", "error", "info", "onChange", "onClick", "onClear", "onBlur", "onFocus", "onPaste", "actionIcon", "className", "autoFocus", "disabled", "readOnly", "iconType"]);

      var ref = React__namespace.useRef(null);

      var _h = React__namespace.useState(!value),
          isInputBlank = _h[0],
          setIsInputBlank = _h[1];

      React__namespace.useImperativeHandle(forwardedRef, function () {
        return ref.current;
      });
      React__namespace.useEffect(function () {
        var _a;

        if (autoFocus) (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus({
          preventScroll: true
        });
      }, []);
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {}, _a['Input'] = true, _a["Input--" + size] = size, _a['Input--disabled'] = disabled || readOnly, _a['Input--error'] = error, _a), className);
      var inputClass = classNames__default["default"]((_b = {}, _b['Input-input'] = true, _b["Input-input--" + size] = size, _b));
      var leftIconClass = classNames__default["default"]((_c = {}, _c['Input-icon'] = true, _c['Input-icon--left'] = true, _c['Input-icon--inputBlank'] = isInputBlank, _c['Input-icon--error'] = error, _c));
      var rightIconClass = classNames__default["default"]((_d = {}, _d['Input-icon'] = true, _d['Input-iconWrapper--right'] = true, _d));
      var trigger = /*#__PURE__*/React__namespace.createElement("div", {
        className: rightIconClass,
        tabIndex: 0
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        name: 'info',
        size: sizeMapping$2[size],
        className: "Input-icon--right"
      }));
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-InputWrapper",
        className: classes,
        style: {
          minWidth: minWidth
        },
        onClick: function onClick() {
          var _a;

          return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        role: "presentation",
        onBlur: function onBlur() {
          var _a;

          return setIsInputBlank(!((_a = ref.current) === null || _a === void 0 ? void 0 : _a.value));
        }
      }, inlineLabel && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Input-inlineLabel"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "subtle"
      }, inlineLabel)), size !== 'tiny' && icon && /*#__PURE__*/React__namespace.createElement("div", {
        className: leftIconClass
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        name: icon,
        size: sizeMapping$2[size],
        type: iconType
      })), /*#__PURE__*/React__namespace.createElement("input", __assign({
        "data-test": "DesignSystem-Input"
      }, baseProps, rest, {
        ref: ref,
        name: name,
        type: type,
        defaultValue: defaultValue,
        placeholder: placeholder,
        className: inputClass,
        value: value,
        required: required,
        disabled: disabled,
        readOnly: readOnly,
        onChange: onChange,
        onBlur: onBlur,
        onClick: onClick,
        onFocus: onFocus,
        onPaste: onPaste,
        tabIndex: readOnly ? -1 : undefined
      })), disabled ? '' : info ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
        position: "bottom",
        tooltip: info
      }, trigger) : actionIcon && (value || defaultValue) ? actionIcon : onClear && (value || defaultValue) && /*#__PURE__*/React__namespace.createElement("div", {
        className: rightIconClass
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-Input--closeIcon",
        onClick: function onClick(e) {
          var _a;

          (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus({
            preventScroll: true
          });
          onClear(e);
        },
        name: 'close',
        size: sizeMapping$2[size],
        className: "Input-icon--right"
      })));
    });
    Input.displayName = 'Input';
    Object.assign(Input, {
      ActionButton: ActionButton$1
    });

    var sizeMapping$1 = {
      regular: 16,
      large: 20
    };

    var capMin = function capMin(min, value) {
      if (min === void 0) {
        min = -Infinity;
      }

      return isNaN(min) || !min && min !== 0 || isNaN(value) || !value && value !== 0 ? value : Math.max(min, value);
    };

    var capMax = function capMax(max, value) {
      if (max === void 0) {
        max = +Infinity;
      }

      return isNaN(max) || !max && max !== 0 || isNaN(value) || !value && value !== 0 ? value : Math.min(max, value);
    };

    var MetricInput = /*#__PURE__*/React__namespace.forwardRef(function (props, forwardedRef) {
      var _a, _b, _c, _d, _e, _f;

      var _g = props.size,
          size = _g === void 0 ? 'regular' : _g,
          defaultValue = props.defaultValue,
          name = props.name,
          placeholder = props.placeholder,
          icon = props.icon,
          prefix = props.prefix,
          suffix = props.suffix,
          error = props.error,
          min = props.min,
          max = props.max,
          onChange = props.onChange,
          onClick = props.onClick,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          className = props.className,
          autoFocus = props.autoFocus,
          disabled = props.disabled,
          readOnly = props.readOnly,
          valueProp = props.value,
          _h = props.showActionButton,
          showActionButton = _h === void 0 ? true : _h,
          onKeyDown = props.onKeyDown,
          iconType = props.iconType,
          rest = __rest(props, ["size", "defaultValue", "name", "placeholder", "icon", "prefix", "suffix", "error", "min", "max", "onChange", "onClick", "onBlur", "onFocus", "className", "autoFocus", "disabled", "readOnly", "value", "showActionButton", "onKeyDown", "iconType"]);

      var ref = React__namespace.useRef(null);
      var isUncontrolled = valueProp === undefined;

      var _j = React__namespace.useState(valueProp || defaultValue),
          value = _j[0],
          setValue = _j[1];

      React__namespace.useImperativeHandle(forwardedRef, function () {
        return ref.current;
      });
      React__namespace.useEffect(function () {
        var _a;

        if (autoFocus) (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus({
          preventScroll: true
        });
      }, []);
      React__namespace.useEffect(function () {
        if (valueProp !== undefined) {
          setValue(valueProp);
        }
      }, [valueProp]);
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {}, _a['MetricInput'] = true, _a["MetricInput--" + size] = size, _a['MetricInput--disabled'] = disabled || readOnly, _a['MetricInput--error'] = error, _a), className);
      var inputClass = classNames__default["default"]((_b = {}, _b['MetricInput-input'] = true, _b["MetricInput-input--" + size] = size, _b["mr-4"] = !suffix && !showActionButton && size === 'regular', _b["mr-6"] = !suffix && !showActionButton && size === 'large', _b));
      var iconClass = classNames__default["default"]((_c = {}, _c['MetricInput-icon'] = true, _c["MetricInput-icon--" + size] = size, _c));
      var prefixClass = classNames__default["default"]((_d = {}, _d['mr-4'] = size === 'regular', _d['mr-5'] = size !== 'regular', _d));
      var suffixClass = classNames__default["default"]((_e = {}, _e['ml-4 mr-3'] = size === 'regular', _e['mx-5'] = size !== 'regular', _e));
      var actionButton = classNames__default["default"]((_f = {}, _f['p-0'] = true, _f["MetricInput-arrowIcon--" + size] = size, _f['ml-3'] = true, _f));

      var onChangeHandler = function onChangeHandler(e) {
        if (isUncontrolled) {
          setValue(e.target.value);
        }

        if (onChange) onChange(e);
      };

      var onArrowClick = function onArrowClick(e, direction) {
        var _a;

        var newValue = Number(value || 0);
        var decimalDigits = ((_a = newValue.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        var isValid = direction === 'down' ? min !== undefined && newValue > min || min === undefined : max !== undefined && newValue < max || max === undefined;
        if (disabled || readOnly || !isValid) return;
        newValue = direction === 'down' ? newValue - 1 : newValue + 1;
        newValue = capMax(max, capMin(min, +newValue.toFixed(decimalDigits)));
        if (isUncontrolled) setValue(newValue);

        if (onChange) {
          var syntheticEvent = Object.create(e, {
            target: {
              value: {
                value: newValue
              }
            }
          });
          onChange(syntheticEvent);
        }
      };

      var onKeyDownHandler = function onKeyDownHandler(e) {
        switch (e.key) {
          case 'e':
          case 'E':
            e.preventDefault();
            return;

          case 'ArrowDown':
            e.preventDefault();
            onArrowClick(e, 'down');
            return;

          case 'ArrowUp':
            e.preventDefault();
            onArrowClick(e, 'up');
            return;
        }
      };

      var handleKeyDown = function handleKeyDown(e) {
        if (showActionButton) {
          onKeyDownHandler(e);
        } else e.preventDefault();
      };

      var actionButtonSize = size === 'large' ? 'regular' : 'tiny';
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-MetricInputWrapper",
        className: classes,
        onKeyDown: onKeyDown,
        role: "presentation"
      }, icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-MetricInput--icon",
        name: icon,
        type: iconType,
        size: sizeMapping$1[size],
        appearance: !value ? 'disabled' : 'subtle',
        className: iconClass
      }), prefix && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-MetricInput--prefix",
        className: prefixClass,
        size: size,
        appearance: "subtle"
      }, prefix), /*#__PURE__*/React__namespace.createElement("input", __assign({
        "data-test": "DesignSystem-MetricInput"
      }, baseProps, rest, {
        type: "number",
        ref: ref,
        name: name,
        defaultValue: defaultValue,
        placeholder: placeholder,
        className: inputClass,
        value: value,
        disabled: disabled,
        readOnly: readOnly,
        onChange: onChangeHandler,
        onBlur: onBlur,
        onClick: onClick,
        onFocus: onFocus,
        onKeyDown: handleKeyDown
      })), suffix && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-MetricInput--suffix",
        className: suffixClass,
        size: size,
        appearance: "subtle"
      }, suffix), showActionButton && /*#__PURE__*/React__namespace.createElement("div", {
        className: "MetricInput-arrowIcons"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        type: "button",
        icon: "keyboard_arrow_up",
        size: actionButtonSize,
        className: actionButton + " mb-2",
        onClick: function onClick(e) {
          return onArrowClick(e, 'up');
        },
        "data-test": "DesignSystem-MetricInput--upIcon"
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        type: "button",
        icon: "keyboard_arrow_down",
        size: actionButtonSize,
        className: actionButton,
        onClick: function onClick(e) {
          return onArrowClick(e, 'down');
        },
        "data-test": "DesignSystem-MetricInput--downIcon"
      })));
    });
    MetricInput.displayName = 'MetricInput';

    var isEditable = function isEditable(mask, pos) {
      return _typeof(mask[pos]) === 'object';
    };
    var getDefaultValue = function getDefaultValue(mask, placeholderChar) {
      var val = '';

      for (var i = 0; i < mask.length; i++) {
        val += isEditable(mask, i) ? placeholderChar : mask[i];
      }

      return val;
    };

    var InputMask = /*#__PURE__*/React__namespace.forwardRef(function (props, forwardRef) {
      props.mask;
          var valueProp = props.value,
          _a = props.placeholderChar,
          placeholderChar = _a === void 0 ? '_' : _a,
          _b = props.validators,
          validators = _b === void 0 ? [] : _b,
          _c = props.clearOnEmptyBlur,
          clearOnEmptyBlur = _c === void 0 ? true : _c,
          defaultValue = props.defaultValue,
          mask = props.mask,
          error = props.error,
          caption = props.caption,
          required = props.required,
          onChange = props.onChange,
          onPaste = props.onPaste,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          onClear = props.onClear,
          className = props.className,
          id = props.id,
          helpText = props.helpText,
          rest = __rest(props, ["mask", "value", "placeholderChar", "validators", "clearOnEmptyBlur", "defaultValue", "mask", "error", "caption", "required", "onChange", "onPaste", "onBlur", "onFocus", "onClear", "className", "id", "helpText"]);

      var isEditable = React__namespace.useCallback(function (pos) {
        return _typeof(mask[pos]) === 'object';
      }, [mask]);
      var getNewCursorPosition = React__namespace.useCallback(function (type, position) {
        if (type === 'right') {
          for (var i = position; i < mask.length; i++) {
            if (isEditable(i)) return i;
          }

          return mask.length;
        }

        if (type === 'left') {
          for (var i = position; i >= 0; i--) {
            if (isEditable(i - 1)) return i;
          }

          return 0;
        }

        return position;
      }, [mask, isEditable]);
      var getDefaultSelection = React__namespace.useCallback(function () {
        var pos = getNewCursorPosition('right', 0);
        return {
          start: pos,
          end: pos
        };
      }, [getNewCursorPosition]);
      var getPlaceholderValue = React__namespace.useCallback(function (start, end) {
        if (start === void 0) {
          start = 0;
        }

        if (end === void 0) {
          end = mask.length - 1;
        }

        return getDefaultValue(mask, placeholderChar).slice(start, end + 1);
      }, [mask, placeholderChar]);
      var defaultPlaceholderValue = React__namespace.useMemo(function () {
        return getPlaceholderValue();
      }, [getPlaceholderValue]);
      var defaultSelection = React__namespace.useMemo(function () {
        return getDefaultSelection();
      }, [getDefaultSelection]);
      var ref = React__namespace.useRef(null);
      var deferId = React__namespace.useRef();
      var selectionPos = React__namespace.useRef(defaultSelection);
      var newSelectionPos = React__namespace.useRef(0);

      var _d = React__namespace.useState(defaultValue || valueProp || ''),
          value = _d[0],
          setValue = _d[1];

      React__namespace.useImperativeHandle(forwardRef, function () {
        return ref.current;
      });
      React__namespace.useEffect(function () {
        setValue(valueProp || '');
      }, [valueProp]);
      React__namespace.useEffect(function () {
        setCursorPosition(newSelectionPos.current);
      }, [value]);
      var getSelectionLength = React__namespace.useCallback(function (val) {
        return Math.abs(val.end - val.start);
      }, []);
      var getCurrSelection = React__namespace.useCallback(function () {
        var _a, _b;

        return {
          start: ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.selectionStart) || 0,
          end: ((_b = ref.current) === null || _b === void 0 ? void 0 : _b.selectionEnd) || 0
        };
      }, [ref.current]);
      var setSelectionRange_compatible_types = ['text', 'password', 'tel', 'url'];
      var setSelectionPos = React__namespace.useCallback(function (pos) {
        if (ref.current) {
          var el = ref.current;
          var start = Math.min(pos.start, pos.end);
          var end = Math.max(pos.start, pos.end);

          if (setSelectionRange_compatible_types.includes(el.type)) {
            el.setSelectionRange(start, end);
          } else {
            var el_type = el.type;
            el.type = 'text';
            el.setSelectionRange(start, end);
            el.type = el_type;
          }
        }
      }, [ref.current]);
      var setCursorPosition = React__namespace.useCallback(function (val) {
        return setSelectionPos({
          start: val,
          end: val
        });
      }, [setSelectionPos]);
      var insertAtIndex = React__namespace.useCallback(function (currValue, index, iterator) {
        if (iterator === void 0) {
          iterator = 0;
        }

        var newValue = '';
        var newIndex = index + 1;
        var newIterator = iterator;

        if (index >= mask.length) {
          return newValue;
        }

        if (iterator >= currValue.length) {
          selectionPos.current = {
            start: index,
            end: index
          };
          return newValue;
        }

        var m = mask[index];

        if (isEditable(index)) {
          if (currValue[iterator].match(m)) {
            newValue += currValue[iterator];
          } else {
            newValue += placeholderChar;
          }

          newIterator++;
        } else {
          newValue += m;
        }

        newValue += insertAtIndex(currValue, newIndex, newIterator);
        return newValue;
      }, [mask, placeholderChar, isEditable]);
      var updateSelection = React__namespace.useCallback(function () {
        selectionPos.current = getCurrSelection();
        deferId.current = window.requestAnimationFrame(updateSelection);
      }, [selectionPos.current, getCurrSelection]);

      var matchSeparatorValue = function matchSeparatorValue(currValue) {
        var separator = props.placeholder || 'dd/mm/yyyy';

        if (separator.substring(0, 4) === 'yyyy') {
          return currValue && currValue[4] === separator[4] && currValue[7] === separator[7];
        }

        return currValue && currValue[2] === separator[2] && currValue[5] === separator[5];
      };

      var isSameFormat = function isSameFormat(currValue, inputLength) {
        var value = currValue.substring(0, inputLength);

        if (inputLength === 23) {
          var date = value.split(' - ');
          var startVal = date[0];
          var endVal = date[1];
          return matchSeparatorValue(startVal) && matchSeparatorValue(endVal);
        }

        return matchSeparatorValue(value);
      };

      var onPasteHandler = function onPasteHandler(e) {
        var _a;

        e.preventDefault();
        var pastedValue = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('Text');
        var sameFormat = isSameFormat(pastedValue, pastedValue.length);
        var isValidDate = isValid(validators, pastedValue);

        if (sameFormat && onPaste && isValidDate) {
          onPaste(e, pastedValue);
          setValue(pastedValue);
        }
      };

      var onChangeHandler = React__namespace.useCallback(function (e) {
        var _a;

        var inputVal = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.value;
        var currSelection = getCurrSelection();
        var start = Math.min(selectionPos.current.start, currSelection.start);
        var end = currSelection.end;
        var cursorPosition = start;
        var enteredVal = '';
        var updatedVal = '';
        var removedLength = 0;
        var insertedStringLength = 0;
        enteredVal = inputVal.slice(start, end);
        updatedVal = insertAtIndex(enteredVal, start);
        var oldValue = value;

        if (oldValue.length === 0 && (id === 'parent-TimePicker' || id === 'parent-DatePicker')) {
          oldValue = defaultPlaceholderValue;
        }

        insertedStringLength = updatedVal.length;

        if (currSelection.end > selectionPos.current.end) {
          removedLength = insertedStringLength ? getSelectionLength(selectionPos.current) : 0;
        } else if (inputVal.length < oldValue.length) {
          removedLength = oldValue.length - inputVal.length;
        }

        var maskedVal = oldValue.split('');

        for (var i = 0; i < insertedStringLength; i++) {
          maskedVal[start + i] = updatedVal[i];
        }

        for (var i = 0; i < removedLength; i++) {
          var index$1 = start + insertedStringLength + i;
          maskedVal[index$1] = getPlaceholderValue(index$1, index$1);
        }

        var enteredValue = maskedVal.slice(0, mask.length).join('');

        if (updatedVal !== placeholderChar && updatedVal !== '' && !updatedVal.includes(placeholderChar) && isValid(validators, enteredValue)) {
          cursorPosition += insertedStringLength;
        }

        var newCursorPosition = getNewCursorPosition(removedLength ? 'left' : 'right', cursorPosition);

        if (removedLength === 1 && !updatedVal.length && !isEditable(cursorPosition) && newCursorPosition > 0) {
          cursorPosition = newCursorPosition;
          cursorPosition--;
          maskedVal[cursorPosition] = placeholderChar;
        } else if (removedLength !== 1) {
          cursorPosition = newCursorPosition;
        }

        var newValue = maskedVal.slice(0, mask.length).join('');
        newSelectionPos.current = cursorPosition;

        if (newValue !== oldValue && isValid(validators, newValue)) {
          if (defaultPlaceholderValue === '__:__ _M') {
            setValue(newValue.toUpperCase());
            onChange === null || onChange === void 0 ? void 0 : onChange(e, newValue.toUpperCase());
          } else {
            setValue(newValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(e, newValue);
          }
        } else {
          window.requestAnimationFrame(function () {
            return setCursorPosition(newSelectionPos.current);
          });
        }
      }, [selectionPos.current, validators, getCurrSelection, insertAtIndex, getSelectionLength, getPlaceholderValue, getNewCursorPosition, isEditable, setCursorPosition, setValue, onChange]);
      var onBlurHandler = React__namespace.useCallback(function (e) {
        var inputVal = e.currentTarget.value;

        if (clearOnEmptyBlur) {
          if (inputVal === defaultPlaceholderValue) {
            setValue('');
            inputVal = '';
          }
        }

        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e, inputVal);
        if (deferId.current) window.cancelAnimationFrame(deferId.current);
      }, [clearOnEmptyBlur, deferId.current, getPlaceholderValue, setValue, onBlur]);
      var onClearHandler = React__namespace.useCallback(function (e) {
        newSelectionPos.current = defaultSelection.start;
        setValue(defaultPlaceholderValue);
        onClear === null || onClear === void 0 ? void 0 : onClear(e);
      }, [setValue, getPlaceholderValue, setCursorPosition, getDefaultSelection, onClear]);
      var onFocusHandler = React__namespace.useCallback(function (e) {
        deferId.current = window.requestAnimationFrame(updateSelection);

        if (!value) {
          newSelectionPos.current = defaultSelection.start;
          setValue(getPlaceholderValue());
        }

        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
      }, [deferId.current, value, updateSelection, setValue, setSelectionPos, onFocus]);
      var classes = React__namespace.useMemo(function () {
        return classNames__default["default"]({
          'd-flex flex-column flex-grow-1': true
        }, className);
      }, [className]);
      var isValueEqualPlaceholder = value === defaultPlaceholderValue;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: classes,
        "data-test": "DesignSystem-InputMask--Wrapper"
      }, /*#__PURE__*/React__namespace.createElement(Input, __assign({}, rest, {
        value: value,
        error: error,
        required: required,
        onFocus: onFocusHandler,
        onChange: onChangeHandler,
        onClear: !isValueEqualPlaceholder ? onClearHandler : undefined,
        onBlur: onBlurHandler,
        onPaste: onPasteHandler,
        autoComplete: 'off',
        ref: ref
      })), /*#__PURE__*/React__namespace.createElement(HelpText, {
        message: error ? caption : helpText,
        error: error
      }));
    });
    InputMask.displayName = 'InputMask';
    InputMask.utils = {
      getDefaultValue: getDefaultValue
    };
    var X = InputMask;

    var Label = function Label(props) {
      var _a;

      var required = props.required,
          optional = props.optional,
          withInput = props.withInput,
          disabled = props.disabled,
          children = props.children,
          className = props.className,
          info = props.info,
          rest = __rest(props, ["required", "optional", "withInput", "disabled", "children", "className", "info"]);

      var baseProps = extractBaseProps(props);
      var LabelClass = classNames__default["default"]((_a = {
        Label: true
      }, _a['Label--withInput'] = withInput, _a['Label--optional'] = optional, _a), className);
      var classes = classNames__default["default"]({
        'Label-text': true,
        'Label--disabled': disabled
      });

      var renderInfo = function renderInfo(isRequired, isOptional) {
        if (isRequired === void 0) {
          isRequired = false;
        }

        if (isRequired) {
          return /*#__PURE__*/React__namespace.createElement("span", {
            className: "Label-requiredIndicator",
            "data-test": "DesignSystem-Label--RequiredIndicator"
          });
        }

        if (isOptional) {
          return /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-Label--OptionalText",
            appearance: "subtle",
            className: "Label-optionalText"
          }, "(optional)");
        }

        return null;
      };

      var renderIndicator = function renderIndicator(info) {
        return /*#__PURE__*/React__namespace.createElement(Tooltip, {
          tooltip: info
        }, /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-Label--Info",
          name: "info",
          size: 12,
          appearance: "subtle",
          className: "ml-3 cursor-pointer d-flex align-items-center"
        }));
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Label"
      }, baseProps, {
        className: LabelClass
      }), /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        "data-test": "DesignSystem-Label--Text",
        className: classes,
        componentType: "label"
      }, rest), children, renderInfo(required, optional), info && renderIndicator(info)));
    };
    Label.displayName = 'Label';

    var Caption = function Caption(props) {
      var _a, _b;

      var error = props.error,
          hide = props.hide,
          withInput = props.withInput,
          children = props.children,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        Caption: true
      }, _a['Caption--hidden'] = hide, _a['Caption--withInput'] = withInput, _a), className);
      var errorIconClass = classNames__default["default"]((_b = {}, _b['Caption-icon'] = true, _b));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes,
        "data-test": "DesignSystem-Caption"
      }), error && /*#__PURE__*/React__namespace.createElement("div", {
        className: errorIconClass
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        size: 14,
        name: 'error',
        appearance: 'alert'
      })), /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: error ? 'destructive' : 'subtle',
        size: "small",
        weight: "medium"
      }, "" + children));
    };
    Caption.displayName = 'Caption';

    var Legend = function Legend(props) {
      var _a;

      var iconAppearance = props.iconAppearance,
          iconSize = props.iconSize,
          labelAppearance = props.labelAppearance,
          children = props.children,
          labelWeight = props.labelWeight,
          _onMouseEnter = props.onMouseEnter,
          _onMouseLeave = props.onMouseLeave,
          _onClick = props.onClick,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var legendClass = classNames__default["default"]((_a = {}, _a['Legend'] = true, _a), className);
      var styles = {
        background: "var(--" + iconAppearance + ")",
        height: iconSize + "px",
        width: iconSize + "px"
      };
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: legendClass,
        onClick: function onClick(e) {
          return _onClick && _onClick(e);
        },
        onMouseEnter: function onMouseEnter(e) {
          return _onMouseEnter && _onMouseEnter(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _onMouseLeave && _onMouseLeave(e);
        }
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: "Legend-icon",
        style: styles
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: labelAppearance,
        weight: labelWeight
      }, children));
    };
    Legend.displayName = 'Legend';
    Legend.defaultProps = {
      iconAppearance: 'inverse',
      iconSize: 16
    };

    var Editable = function Editable(props) {
      var _a;

      var className = props.className,
          onChange = props.onChange,
          editing = props.editing,
          children = props.children;
      var baseProps = extractBaseProps(props);
      var EditableClass = classNames__default["default"]((_a = {}, _a['Editable'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Editable"
      }, baseProps, {
        className: EditableClass
      }), /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-EditableWrapper",
        onClick: function onClick() {
          return onChange('edit');
        },
        onMouseEnter: function onMouseEnter() {
          return !editing && onChange('hover');
        },
        onMouseLeave: function onMouseLeave() {
          return !editing && onChange('default');
        }
      }, children));
    };
    Editable.displayName = 'Editable';

    var EditableDropdown = function EditableDropdown(props) {
      var _a, _b, _c;

      var placeholder = props.placeholder,
          dropdownOptions = props.dropdownOptions,
          className = props.className,
          customTriggerRenderer = props.customTriggerRenderer;

      var onDropdownChange = dropdownOptions.onChange,
          onDropdownClose = dropdownOptions.onClose,
          rest = __rest(dropdownOptions, ["onChange", "onClose"]);

      var _d = React__namespace.useState(placeholder),
          label = _d[0],
          setLabel = _d[1];

      var _e = React__namespace.useState(false),
          editing = _e[0],
          setEditing = _e[1];

      var _f = React__namespace.useState(false),
          showComponent = _f[0],
          setShowComponent = _f[1];

      var CompClass = classNames__default["default"]((_a = {}, _a['EditableDropdown'] = true, _a), className);
      var DefaultCompClass = classNames__default["default"]((_b = {}, _b['EditableDropdown-default'] = true, _b['d-none'] = showComponent, _b));
      var EditableDropdownClass = classNames__default["default"]((_c = {}, _c['d-none'] = !showComponent, _c));
      var baseProps = extractBaseProps(props);

      var getLabel = function getLabel(updatedLabel) {
        setLabel(updatedLabel);
      };

      var onChangeHandler = function onChangeHandler(eventType) {
        switch (eventType) {
          case 'edit':
            setEditing(true);
            setShowComponent(true);
            break;

          case 'hover':
            setShowComponent(true);
            break;

          case 'default':
            setShowComponent(false);
        }
      };

      var onChange = function onChange(value) {
        setEditing(false);
        setShowComponent(false);
        if (onDropdownChange) onDropdownChange(value);
      };

      var onClose = function onClose(selected) {
        setEditing(false);
        setShowComponent(false);
        if (onDropdownClose) onDropdownClose(selected);
      };

      var renderComponent = function renderComponent(componentLabel) {
        if (customTriggerRenderer) return customTriggerRenderer(componentLabel);
        return componentLabel;
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-EditableDropdown"
      }, baseProps, {
        className: CompClass
      }), /*#__PURE__*/React__namespace.createElement(Editable, {
        onChange: onChangeHandler,
        editing: editing
      }, /*#__PURE__*/React__namespace.createElement(Dropdown, __assign({
        placeholder: placeholder,
        onChange: onChange,
        getLabel: getLabel,
        onClose: onClose,
        className: EditableDropdownClass,
        "data-test": "DesignSystem-EditableDropdown--Dropdown"
      }, rest)), /*#__PURE__*/React__namespace.createElement("div", {
        className: DefaultCompClass,
        "data-test": "DesignSystem-EditableDropdown--Default"
      }, renderComponent(label || placeholder))));
    };
    EditableDropdown.defaultProps = {
      placeholder: '',
      dropdownOptions: {}
    };

    var Link = function Link(props) {
      var _a;

      var children = props.children,
          className = props.className,
          appearance = props.appearance,
          size = props.size,
          disabled = props.disabled,
          rest = __rest(props, ["children", "className", "appearance", "size", "disabled"]);

      var classes = classNames__default["default"]((_a = {
        Link: true
      }, _a["Link--" + size] = size, _a["Link--" + appearance] = appearance, _a["Link--" + appearance + "-disabled"] = disabled, _a), className);
      return /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        "data-test": "DesignSystem-Link",
        className: classes,
        componentType: "a",
        tabIndex: disabled ? -1 : 0
      }, rest), children);
    };
    Link.displayName = 'Link';
    Link.defaultProps = {
      appearance: 'default',
      size: 'regular',
      disabled: false
    };

    var IconMapping$2 = {
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      alert: 'error'
    };
    var Message = function Message(props) {
      var _a, _b, _c, _d;

      var actions = props.actions,
          title = props.title,
          className = props.className;
      var appearance = props.appearance;
      appearance = appearance === 'default' ? 'info' : appearance;
      var baseProps = extractBaseProps(props);
      var MessageClass = classNames__default["default"]((_a = {}, _a['Message'] = true, _a["Message--" + appearance] = appearance, _a), className);
      var IconClass = classNames__default["default"]((_b = {}, _b['Message-icon'] = true, _b["Message-icon--" + appearance] = appearance, _b['Message-icon--withTitle'] = title, _b));
      var TitleClass = classNames__default["default"]((_c = {}, _c['Message-heading'] = true, _c["Message-heading--" + appearance] = appearance, _c));
      var DescriptionClass = classNames__default["default"]((_d = {}, _d['Message-text'] = true, _d["Message-text--" + appearance] = appearance, _d));

      var renderDescription = function renderDescription(description, children) {
        if (description || typeof children === 'string') {
          return /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-Message--Description",
            className: DescriptionClass
          }, description || (typeof children === 'string' ? children : ''));
        }

        if (children) {
          return /*#__PURE__*/React__namespace.createElement("div", {
            "data-test": "DesignSystem-Message--Description",
            className: "Message-description"
          }, children);
        }

        return null;
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Message"
      }, baseProps, {
        className: MessageClass
      }), /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-Message--Icon",
        name: IconMapping$2[appearance],
        appearance: appearance,
        className: IconClass
      }), /*#__PURE__*/React__namespace.createElement("div", null, title && /*#__PURE__*/React__namespace.createElement(Heading, {
        "data-test": "DesignSystem-Message--Title",
        size: "s",
        className: TitleClass
      }, title), renderDescription(props.description, props.children), actions && /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Message--actions",
        className: "Message-actions"
      }, actions)));
    };
    Message.displayName = 'Message';
    Message.defaultProps = {
      appearance: 'info',
      description: ''
    };

    var Meta = function Meta(props) {
      var label = props.label,
          icon = props.icon,
          size = props.size,
          iconType = props.iconType;
      return /*#__PURE__*/React__namespace.createElement("span", {
        "data-test": "DesignSystem-MetaList--Meta",
        className: 'Meta'
      }, icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-MetaList--MetaIcon",
        name: icon,
        appearance: "subtle",
        className: 'Meta-icon',
        type: iconType,
        size: size === 'regular' ? 16 : 12
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        size: size,
        "data-test": "DesignSystem-MetaList--MetaLabel",
        appearance: "subtle"
      }, label));
    };
    Meta.displayName = 'Meta';

    var MetaList = function MetaList(props) {
      var _a, _b, _c;

      var list = props.list,
          seperator = props.seperator,
          className = props.className,
          size = props.size;
      var baseProps = extractBaseProps(props);
      var MetaClass = classNames__default["default"]((_a = {}, _a['MetaList'] = true, _a), className);
      var SeperatorClass = classNames__default["default"]((_b = {}, _b['MetaList-seperator'] = true, _b));
      var LeftSeperatorClass = classNames__default["default"]((_c = {}, _c['MetaList-seperator'] = true, _c['MetaList-seperator--left'] = true, _c));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-MetaList"
      }, baseProps, {
        className: MetaClass
      }), seperator && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-MetaList--Seperator",
        name: "fiber_manual_record",
        size: 8,
        className: LeftSeperatorClass,
        appearance: "disabled"
      }), list.map(function (item, ind) {
        var _a = item.label,
            label = _a === void 0 ? '' : _a,
            icon = item.icon,
            iconType = item.iconType;
        var rightSeperator = ind !== list.length - 1;
        return /*#__PURE__*/React__namespace.createElement("span", {
          key: ind,
          className: "MetaList-item"
        }, /*#__PURE__*/React__namespace.createElement(Meta, {
          size: size,
          label: label,
          icon: icon,
          iconType: iconType
        }), rightSeperator && /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-MetaList--rightSeperator",
          name: "fiber_manual_record",
          size: 8,
          className: SeperatorClass,
          appearance: "disabled"
        }));
      }));
    };
    MetaList.displayName = 'MetaList';
    MetaList.defaultProps = {
      seperatorAppearance: 'disabled',
      iconAppearance: 'subtle',
      labelAppearance: 'subtle',
      size: 'regular'
    };

    var ARROW_LEFT = 37;
    var ARROW_RIGHT = 39;

    var formatPercentage = function formatPercentage(ratio) {
      return (ratio * 100).toFixed(2) + "%";
    };
    var countDecimalPlaces = function countDecimalPlaces(value) {
      if (!isFinite(value)) return 0;

      if (Math.floor(value) !== value) {
        var valueArray = value.toString().split('.');
        return valueArray[1].length || 0;
      }

      return 0;
    };
    var approxEqual = function approxEqual(a, b) {
      var tolerance = 0.00001;
      return Math.abs(a - b) <= tolerance;
    };
    var clamp = function clamp(value, min, max) {
      if (value == null) {
        return value;
      }

      return Math.min(Math.max(value, min), max);
    };
    var arraysEqual = function arraysEqual(oldValues, newValues) {
      if (oldValues.length !== oldValues.length) return;
      return newValues.every(function (value, index) {
        return value === oldValues[index];
      });
    };
    function argMin(values, argFn) {
      if (values.length === 0) {
        return undefined;
      }

      var minValue = values[0];
      var minArg = argFn(minValue);

      for (var index = 1; index < values.length; index++) {
        var value = values[index];
        var arg = argFn(value);

        if (arg < minArg) {
          minValue = value;
          minArg = arg;
        }
      }

      return minValue;
    }
    function fillValues(values, startIndex, endIndex, fillValue) {
      var inc = startIndex < endIndex ? 1 : -1;

      for (var index = startIndex; index !== endIndex + inc; index += inc) {
        values[index] = fillValue;
      }
    }
    function isElementOfType(element) {
      return element != null && element.type != null;
    }

    var Handle = function (_super) {
      __extends(Handle, _super);

      function Handle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.state = {
          isHandleMoving: false,
          isHandleHovered: false
        };
        _this.handleElement = null;
        _this.refHandlers = {
          handle: function handle(el) {
            return _this.handleElement = el;
          }
        };

        _this.mouseEventClientOffset = function (event) {
          return event.clientX;
        };

        _this.clientToValue = function (clientPixel) {
          var _a = _this.props,
              stepSize = _a.stepSize,
              tickSize = _a.tickSize,
              value = _a.value;

          if (_this.handleElement == null) {
            return value;
          }

          var clientPixelNormalized = clientPixel;

          var _b = _this.getHandleMidpointAndOffset(_this.handleElement),
              handleMidpoint = _b.handleMidpoint,
              handleOffset = _b.handleOffset;

          var handleCenterPixel = handleMidpoint + handleOffset;
          var pixelDelta = clientPixelNormalized - handleCenterPixel;

          if (isNaN(pixelDelta)) {
            return value;
          }

          return value + Math.round(pixelDelta / (tickSize * stepSize)) * stepSize;
        };

        _this.changeValue = function (newValue, callback) {
          if (callback === void 0) {
            callback = _this.props.onChange;
          }

          var updatedValue = clamp(newValue, _this.props.min, _this.props.max);

          if (!isNaN(updatedValue) && _this.props.value !== updatedValue) {
            if (callback) callback(updatedValue);
          }

          return updatedValue;
        };

        _this.endHandleMovement = function (event) {
          var clientPixel = _this.mouseEventClientOffset(event);

          var onRelease = _this.props.onRelease;

          _this.removeDocumentEventListeners();

          _this.setState({
            isHandleMoving: false
          });

          var finalValue = _this.changeValue(_this.clientToValue(clientPixel));

          if (onRelease) onRelease(finalValue);
        };

        _this.continueHandleMovement = function (event) {
          var clientPixel = _this.mouseEventClientOffset(event);

          if (_this.state.isHandleMoving && !_this.props.disabled) {
            var value = _this.clientToValue(clientPixel);

            _this.changeValue(value);
          }
        };

        _this.beginHandleMovement = function (event) {
          if (_this.props.disabled) return;
          document.addEventListener('mousemove', _this.continueHandleMovement);
          document.addEventListener('mouseup', _this.endHandleMovement);

          _this.setState({
            isHandleMoving: true
          });

          var value = _this.clientToValue(event.clientX);

          _this.changeValue(value);
        };

        _this.handleKeyDown = function (event) {
          if (_this.props.disabled) return;
          var _a = _this.props,
              stepSize = _a.stepSize,
              value = _a.value;
          var keyCode = event.keyCode;

          if (keyCode === ARROW_LEFT) {
            _this.changeValue(value - stepSize);

            event.preventDefault();
          } else if (keyCode === ARROW_RIGHT) {
            _this.changeValue(value + stepSize);

            event.preventDefault();
          }
        };

        _this.handleKeyUp = function (event) {
          if (_this.props.disabled) return;

          if ([ARROW_LEFT, ARROW_RIGHT].indexOf(event.keyCode) >= 0) {
            var onRelease = _this.props.onRelease;
            if (onRelease) onRelease(_this.props.value);
          }
        };

        _this.getHandleMidpointAndOffset = function (handleElement, useOppositeDimension) {
          if (useOppositeDimension === void 0) {
            useOppositeDimension = false;
          }

          if (handleElement == null) {
            return {
              handleMidpoint: 0,
              handleOffset: 0
            };
          }

          var handleRect = handleElement.getBoundingClientRect();
          var sizeKey = useOppositeDimension ? 'height' : 'width';
          var handleOffset = handleRect.left;
          return {
            handleOffset: handleOffset,
            handleMidpoint: handleRect[sizeKey] / 2
          };
        };

        _this.handleMouseOver = function () {
          _this.setState({
            isHandleHovered: true
          });
        };

        _this.handleMouseLeave = function () {
          _this.setState({
            isHandleHovered: false
          });
        };

        _this.removeDocumentEventListeners = function () {
          document.removeEventListener('mousemove', _this.continueHandleMovement);
          document.removeEventListener('mouseup', _this.endHandleMovement);
        };

        return _this;
      }

      Handle.prototype.componentWillUnmount = function () {
        this.removeDocumentEventListeners();
      };

      Handle.prototype.componentDidUpdate = function (_prevProps, prevState) {
        if (prevState.isHandleMoving !== this.state.isHandleMoving) {
          if (this.handleElement) this.handleElement.focus();
        }
      };

      Handle.prototype.render = function () {
        var _a, _b;

        var _c = this.props,
            min = _c.min,
            tickSizeRatio = _c.tickSizeRatio,
            value = _c.value,
            disabled = _c.disabled,
            label = _c.label,
            isCurrentLabelHovered = _c.isCurrentLabelHovered;
        var _d = this.state,
            isHandleMoving = _d.isHandleMoving,
            isHandleHovered = _d.isHandleHovered;
        var showTootlip = isHandleMoving || isHandleHovered || isCurrentLabelHovered;
        var handleMidpoint = this.getHandleMidpointAndOffset(this.handleElement, true).handleMidpoint;
        var offsetRatio = (value - min) * tickSizeRatio;
        var offsetCalc = "calc(" + formatPercentage(offsetRatio) + " - " + handleMidpoint + "px)";
        var style = {
          left: offsetCalc
        };
        var className = classNames__default["default"]((_a = {}, _a['Slider-handle'] = true, _a['Slider-handle--disabled'] = disabled, _a['Slider-handle--active'] = isHandleMoving, _a['border-0'] = disabled, _a));
        var TooltipClass = classNames__default["default"]((_b = {}, _b['Slider-tooltip'] = true, _b['Tooltip'] = true, _b['d-none'] = !showTootlip, _b));
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
          className: className,
          onMouseOver: this.handleMouseOver,
          onMouseLeave: this.handleMouseLeave,
          onMouseDown: this.beginHandleMovement,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          ref: this.refHandlers.handle,
          style: style,
          tabIndex: 0,
          "data-test": "DesignSystem-MultiSlider-Handle"
        }), /*#__PURE__*/React__namespace.createElement("div", {
          className: TooltipClass,
          style: style
        }, label));
      };

      return Handle;
    }(React__namespace.Component);

    var MultiSliderHandle = function MultiSliderHandle() {
      return null;
    };

    var MultiSlider = function (_super) {
      __extends(MultiSlider, _super);

      function MultiSlider(props) {
        var _this = _super.call(this, props) || this;

        _this.handleElements = [];
        _this.trackElement = null;

        _this.getLabelPrecision = function (_a) {
          var labelPrecision = _a.labelPrecision,
              stepSize = _a.stepSize;
          return labelPrecision == null ? countDecimalPlaces(stepSize) : labelPrecision;
        };

        _this.getOffsetRatio = function (value) {
          return clamp((value - _this.props.min) * _this.state.tickSizeRatio, 0, 1);
        };

        _this.addHandleRef = function (ref) {
          if (ref != null) {
            _this.handleElements.push(ref);
          }
        };

        _this.getHandleValues = function (props) {
          var maybeHandles = React__namespace.Children.map(props.children, function (child) {
            return isElementOfType(child) ? child.props : null;
          });
          var handles = maybeHandles != null ? maybeHandles : [];
          handles = handles.filter(function (handle) {
            return handle !== null;
          });
          handles.sort(function (left, right) {
            return left.value - right.value;
          });
          return handles;
        };

        _this.updateTickSize = function () {
          if (_this.trackElement != null) {
            var trackSize = _this.trackElement.clientWidth;
            var tickSizeRatio = 1 / (_this.props.max - _this.props.min);
            var tickSize = trackSize * tickSizeRatio;

            _this.setState({
              tickSize: tickSize,
              tickSizeRatio: tickSizeRatio
            });
          }
        };

        _this.getTrackFill = function (start, end) {
          if (start.fillAfter !== undefined) {
            return start.fillAfter;
          }

          if (end !== undefined && end.fillBefore !== undefined) {
            return end.fillBefore;
          }

          return false;
        };

        _this.maybeHandleTrackClick = function (event) {
          var target = event.target;
          var canHandleTrackEvent = !_this.props.disabled && target.closest('.Slider-handle') == null;

          if (canHandleTrackEvent) {
            var foundHandle = _this.nearestHandleForValue(_this.handleElements, function (handle) {
              return handle.mouseEventClientOffset(event);
            });

            if (foundHandle) {
              foundHandle.beginHandleMovement(event);
            }
          }
        };

        _this.getLockedHandleIndex = function (startIndex, endIndex) {
          var inc = startIndex < endIndex ? 1 : -1;

          for (var index = startIndex + inc; index !== endIndex + inc; index += inc) {
            return index;
          }

          return -1;
        };

        _this.getNewHandleValues = function (newValue, oldIndex) {
          var handleProps = _this.getHandleValues(_this.props);

          var oldValues = handleProps.map(function (handle) {
            return handle.value;
          });
          var newValues = oldValues.slice();
          newValues[oldIndex] = newValue;
          if (newValues.length > 1) newValues.sort(function (left, right) {
            return left - right;
          });
          var newIndex = newValues.indexOf(newValue);

          var lockIndex = _this.getLockedHandleIndex(oldIndex, newIndex);

          if (lockIndex === -1) {
            fillValues(newValues, oldIndex, newIndex, newValue);
          } else {
            var lockValue = oldValues[lockIndex];
            fillValues(oldValues, oldIndex, lockIndex, lockValue);
            return oldValues;
          }

          return newValues;
        };

        _this.onReleaseHandler = function (newValue, index) {
          var onRangeRelease = _this.props.onRangeRelease;

          var handleProps = _this.getHandleValues(_this.props);

          var newValues = _this.getNewHandleValues(newValue, index);

          if (onRangeRelease) {
            var range = newValues;
            onRangeRelease(range);
          }

          handleProps.forEach(function (handle, i) {
            if (handle.onRelease) handle.onRelease(newValues[i]);
          });
        };

        _this.onChangeHandler = function (newValue, index) {
          var onRangeChange = _this.props.onRangeChange;

          var handleProps = _this.getHandleValues(_this.props);

          var oldValues = handleProps.map(function (handle) {
            return handle.value;
          });

          var newValues = _this.getNewHandleValues(newValue, index);

          if (!arraysEqual(newValues, oldValues)) {
            if (onRangeChange) {
              var range = newValues;
              onRangeChange(range);
            }

            handleProps.forEach(function (handle, i) {
              if (handle.onChange) handle.onChange(newValues[i]);
            });
          }
        };

        _this.formatLabel = function (value) {
          var labelRenderer = _this.props.labelRenderer;
          var labelValue = value.toFixed(_this.state.labelPrecision);

          if (typeof labelRenderer === 'function') {
            return labelRenderer(Number(labelValue));
          }

          return labelValue;
        };

        _this.renderHandles = function () {
          var _a = _this.props,
              disabled = _a.disabled,
              max = _a.max,
              min = _a.min,
              stepSize = _a.stepSize;

          var handleProps = _this.getHandleValues(_this.props);

          if (handleProps.length === 0) {
            return null;
          }

          return handleProps.map(function (_a, index) {
            var value = _a.value;
            var isCurrentLabelHovered = _this.state.hoveredLabelValue === Number(value.toFixed(_this.state.labelPrecision));
            return /*#__PURE__*/React__namespace.createElement(Handle, {
              disabled: disabled,
              key: index + "-" + handleProps.length,
              max: max,
              min: min,
              onRelease: function onRelease(newValue) {
                return _this.onReleaseHandler(newValue, index);
              },
              onChange: function onChange(newValue) {
                return _this.onChangeHandler(newValue, index);
              },
              label: _this.formatLabel(value),
              ref: _this.addHandleRef,
              stepSize: stepSize,
              tickSize: _this.state.tickSize,
              tickSizeRatio: _this.state.tickSizeRatio,
              value: value,
              isCurrentLabelHovered: isCurrentLabelHovered
            });
          });
        };

        _this.renderLabels = function () {
          var _a = _this.props,
              labelStepSize = _a.labelStepSize,
              max = _a.max,
              min = _a.min,
              labelRenderer = _a.labelRenderer,
              disabled = _a.disabled;
          var labels = [];
          var stepSizeRatio = _this.state.tickSizeRatio * labelStepSize;

          var handles = _this.getHandleValues(_this.props);

          var activeLabels = handles.map(function (handle) {
            return handle.value.toFixed(_this.state.labelPrecision);
          });

          var _loop_1 = function _loop_1(i, offsetRatio) {
            var _a;

            var offsetPercentage = formatPercentage(offsetRatio);
            var style = {
              left: offsetPercentage
            };
            var active = !disabled && activeLabels.indexOf(i.toFixed(_this.state.labelPrecision)) !== -1;

            var onClickHandler = function onClickHandler(event) {
              if (!_this.props.disabled) {
                var foundHandle = _this.nearestHandleForValue(_this.handleElements, function (handle) {
                  return handle.mouseEventClientOffset(event);
                });

                if (foundHandle) {
                  foundHandle.changeValue(i);
                }
              }
            };

            var SliderTicksClass = classNames__default["default"]((_a = {}, _a['Slider-ticks'] = true, _a['bg-dark'] = active, _a));
            labels.push( /*#__PURE__*/React__namespace.createElement("div", {
              onClick: onClickHandler,
              className: 'Slider-label',
              key: i,
              style: style,
              onMouseOver: function onMouseOver() {
                return _this.handleLabelMouseOver(i);
              },
              onMouseLeave: _this.handleLabelMouseLeave,
              "data-test": "DesignSystem-MultiSlider-Label"
            }, /*#__PURE__*/React__namespace.createElement("span", {
              className: SliderTicksClass
            }), labelRenderer !== false && /*#__PURE__*/React__namespace.createElement(Text, {
              size: "small",
              appearance: active ? 'default' : 'disabled'
            }, _this.formatLabel(i))));
          };

          for (var i = min, offsetRatio = 0; i < max || approxEqual(i, max); i += labelStepSize, offsetRatio += stepSizeRatio) {
            _loop_1(i, offsetRatio);
          }

          return labels;
        };

        _this.renderTrackFill = function (index, start, end) {
          var _a;

          var _b = [_this.getOffsetRatio(start.value), _this.getOffsetRatio(end.value)].sort(function (left, right) {
            return left - right;
          }),
              startRatio = _b[0],
              endRatio = _b[1];

          var startOffset = Number((startRatio * 100).toFixed(2));
          var endOffset = Number(((1 - endRatio) * 100).toFixed(2));
          var width = 100 - endOffset - startOffset + "%";
          var orientationStyle = {
            width: width
          };

          var style = __assign({}, orientationStyle);

          var fillTrack = _this.getTrackFill(start, end);

          var classes = classNames__default["default"]((_a = {}, _a['Slider-progress'] = true, _a['Slider-progress--disabled'] = _this.props.disabled, _a['Slider-progress--inRange'] = fillTrack, _a['Slider-progress--inRangeDisabled'] = fillTrack && _this.props.disabled, _a));
          return /*#__PURE__*/React__namespace.createElement("div", {
            key: "track-" + index,
            className: classes,
            style: style
          });
        };

        _this.renderTracks = function () {
          var trackStops = _this.getHandleValues(_this.props);

          trackStops.push({
            value: _this.props.max
          });
          var previous = {
            value: _this.props.min || 0
          };
          var handles = [];
          trackStops.forEach(function (track, index) {
            var current = track;
            handles.push(_this.renderTrackFill(index, previous, current));
            previous = current;
          });
          return handles;
        };

        _this.handleLabelMouseOver = function (value) {
          _this.setState({
            hoveredLabelValue: value
          });
        };

        _this.handleLabelMouseLeave = function () {
          _this.setState({
            hoveredLabelValue: undefined
          });
        };

        _this.state = {
          labelPrecision: _this.getLabelPrecision(_this.props),
          tickSize: 0,
          tickSizeRatio: 0
        };
        return _this;
      }

      MultiSlider.prototype.getDerivedStateFromProps = function (props) {
        return {
          labelPrecision: this.getLabelPrecision(props)
        };
      };

      MultiSlider.prototype.getSnapshotBeforeUpdate = function (prevProps) {
        var prevHandleProps = this.getHandleValues(prevProps);
        var newHandleProps = this.getHandleValues(this.props);

        if (newHandleProps.length !== prevHandleProps.length) {
          this.handleElements = [];
        }

        return null;
      };

      MultiSlider.prototype.componentDidMount = function () {
        this.updateTickSize();
      };

      MultiSlider.prototype.nearestHandleForValue = function (handles, getOffset) {
        return argMin(handles, function (handle) {
          var offset = getOffset(handle);
          var offsetValue = handle.clientToValue(offset);
          var handleValue = handle.props.value;
          return Math.abs(offsetValue - handleValue);
        });
      };

      MultiSlider.prototype.render = function () {
        var _a, _b;

        var _this = this;

        var _c = this.props,
            label = _c.label,
            className = _c.className;
        var baseProps = extractBaseProps(this.props);
        var SliderClass = classNames__default["default"]((_a = {}, _a['Slider'] = true, _a), className);
        var WrapperClass = classNames__default["default"]((_b = {}, _b['Slider-wrapper'] = true, _b['Slider-wrapper--disabled'] = this.props.disabled, _b));
        return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
          className: SliderClass,
          "data-test": "DesignSystem-MultiSlider"
        }), label && /*#__PURE__*/React__namespace.createElement(Label, {
          withInput: true
        }, label), /*#__PURE__*/React__namespace.createElement("div", {
          className: WrapperClass
        }, /*#__PURE__*/React__namespace.createElement("div", {
          className: "Slider-track",
          ref: function ref(_ref) {
            return _this.trackElement = _ref;
          },
          onMouseDown: this.maybeHandleTrackClick,
          "data-test": "DesignSystem-MultiSlider-Slider-Track"
        }, this.renderTracks()), /*#__PURE__*/React__namespace.createElement("div", {
          className: "Slider-axis"
        }, this.renderLabels()), this.renderHandles()));
      };

      MultiSlider.defaultProps = {
        labelStepSize: 1,
        max: 10,
        min: 0,
        stepSize: 1,
        labelRenderer: true
      };
      MultiSlider.Handle = MultiSliderHandle;
      return MultiSlider;
    }(React__namespace.Component);

    var OutsideClick = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var children = props.children,
          className = props.className,
          onOutsideClick = props.onOutsideClick,
          rest = __rest(props, ["children", "className", "onOutsideClick"]);

      var innerRef = React__namespace.useRef(null);
      React__namespace.useImperativeHandle(ref, function () {
        return innerRef.current;
      }, [innerRef]);
      React__namespace.useEffect(function () {
        document.addEventListener('click', handleOutsideClick, true);
        return function () {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);
      var handleOutsideClick = React__namespace.useCallback(function (event) {
        var element = innerRef;

        if (!event.target || !element.current) {
          return;
        }

        if (!element.current.contains(event.target)) {
          onOutsideClick(event);
        }
      }, []);
      var classes = classNames__default["default"]((_a = {}, _a['OutsideClick'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        ref: innerRef
      }, rest, {
        className: classes
      }), children);
    });
    OutsideClick.displayName = 'OutsideClick';

    var Paragraph = function Paragraph(props) {
      var _a;

      var appearance = props.appearance,
          children = props.children,
          className = props.className,
          color = props.color,
          rest = __rest(props, ["appearance", "children", "className", "color"]);

      var classes = classNames__default["default"]((_a = {
        Text: true
      }, _a["Text--" + appearance] = !color && appearance, _a["color-" + color] = color, _a), className);
      return /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        "data-test": "DesignSystem-Paragraph"
      }, rest, {
        className: classes,
        componentType: "p"
      }), children);
    };
    Paragraph.displayName = 'Paragraph';
    Paragraph.defaultProps = {
      appearance: 'default'
    };

    var ProgressBar = function ProgressBar(props) {
      var _a;

      var max = props.max,
          value = props.value,
          className = props.className,
          size = props.size;
      var baseProps = extractBaseProps(props);
      var style = {
        width: value > 0 ? Math.min(value, max) * 100 / max + "%" : '0'
      };
      var ProgressBarClass = classNames__default["default"]({
        ProgressBar: true
      }, className);
      var ProgressIndicatorClass = classNames__default["default"]((_a = {}, _a['ProgressBar-indicator'] = true, _a['ProgressBar-indicator--small'] = size === 'small', _a['ProgressBar-indicator--regular'] = size === 'regular', _a));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-ProgressBar"
      }, baseProps, {
        className: ProgressBarClass
      }), /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-ProgressBar-Indicator",
        className: ProgressIndicatorClass,
        style: style
      }));
    };
    ProgressBar.displayName = 'ProgressBar';
    ProgressBar.defaultProps = {
      max: 100,
      size: 'regular'
    };

    var Radio = /*#__PURE__*/React__namespace.forwardRef(function (props, forwardedRef) {
      var _a, _b, _c, _d;

      var _e = props.size,
          size = _e === void 0 ? 'regular' : _e,
          label = props.label,
          disabled = props.disabled,
          onChange = props.onChange,
          name = props.name,
          value = props.value,
          checked = props.checked,
          defaultChecked = props.defaultChecked,
          className = props.className,
          helpText = props.helpText,
          error = props.error,
          rest = __rest(props, ["size", "label", "disabled", "onChange", "name", "value", "checked", "defaultChecked", "className", "helpText", "error"]);

      var ref = React__namespace.useRef(null);
      React__namespace.useImperativeHandle(forwardedRef, function () {
        return ref.current;
      });
      var RadioClass = classNames__default["default"]((_a = {}, _a['Radio'] = true, _a['Radio--disabled'] = disabled, _a), className);
      var RadioWrapper = classNames__default["default"]((_b = {}, _b['Radio-wrapper'] = true, _b["Radio-defaultWrapper"] = !error, _b["Radio-errorWrapper"] = error, _b["Radio-wrapper--" + size] = size, _b));
      var RadioOuterWrapper = classNames__default["default"]((_c = {}, _c['Radio-outerWrapper'] = true, _c["Radio-outerWrapper--" + size] = size, _c));
      var RadioLabelClass = classNames__default["default"]((_d = {}, _d['Radio-Label'] = true, _d));
      var id = name + "-" + label + "-" + uidGenerator();
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: RadioClass,
        "data-test": "DesignSystem-Radio"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: RadioOuterWrapper,
        "data-test": "DesignSystem-Radio-OuterWrapper"
      }, /*#__PURE__*/React__namespace.createElement("input", __assign({
        tabIndex: 0
      }, rest, {
        type: "radio",
        disabled: disabled,
        checked: checked,
        defaultChecked: defaultChecked,
        ref: ref,
        name: name,
        value: value,
        onChange: onChange,
        className: "Radio-input",
        id: id,
        "data-test": "DesignSystem-Radio-Input"
      })), /*#__PURE__*/React__namespace.createElement("span", {
        "data-test": "DesignSystem-Radio-wrapper",
        className: RadioWrapper
      })), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Radio-labelWrapper"
      }, label && /*#__PURE__*/React__namespace.createElement("label", {
        className: RadioLabelClass,
        htmlFor: id,
        "data-test": "DesignSystem-Radio-Label"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        size: size === 'tiny' ? 'small' : 'regular',
        appearance: disabled ? 'disabled' : 'default'
      }, label)), helpText && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-Radio-HelpText",
        size: "small",
        appearance: disabled ? 'disabled' : 'subtle'
      }, helpText.trim())));
    });
    Radio.displayName = 'Radio';

    var Row = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var className = props.className,
          children = props.children,
          rest = __rest(props, ["className", "children"]);

      var classes = classNames__default["default"]((_a = {
        Row: true
      }, _a["" + className] = className, _a));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Row",
        ref: ref
      }, rest, {
        className: classes
      }), children);
    });
    Row.displayName = 'Row';

    var StatusHint = function StatusHint(props) {
      var _a, _b, _c;

      var appearance = props.appearance,
          children = props.children,
          _onMouseEnter = props.onMouseEnter,
          _onMouseLeave = props.onMouseLeave,
          _onClick = props.onClick,
          truncateLabel = props.truncateLabel,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var StatusHintClass = classNames__default["default"]((_a = {}, _a['StatusHint'] = true, _a), className);
      var StatusHintIconClass = classNames__default["default"]((_b = {}, _b['StatusHint-icon'] = true, _b["StatusHint--" + appearance] = appearance, _b));
      var StatusHintTextClass = classNames__default["default"]((_c = {}, _c['ellipsis--noWrap'] = truncateLabel, _c));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-StatusHint"
      }, baseProps, {
        className: StatusHintClass,
        onClick: function onClick(e) {
          return _onClick && _onClick(e);
        },
        onMouseEnter: function onMouseEnter(e) {
          return _onMouseEnter && _onMouseEnter(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _onMouseLeave && _onMouseLeave(e);
        }
      }), /*#__PURE__*/React__namespace.createElement("span", {
        "data-test": "DesignSystem-StatusHint--Icon",
        className: StatusHintIconClass
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-StatusHint--Text",
        weight: 'medium',
        className: StatusHintTextClass
      }, children));
    };
    StatusHint.displayName = 'StatusHint';
    StatusHint.defaultProps = {
      appearance: 'default'
    };

    var Pills = function Pills(props) {
      var _a;

      var appearance = props.appearance,
          children = props.children,
          subtle = props.subtle,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        Pills: true
      }, _a["Badge--" + appearance] = appearance && !subtle, _a["Badge--subtle-" + appearance] = subtle, _a), className);
      return /*#__PURE__*/React__namespace.createElement("span", __assign({
        "data-test": "DesignSystem-Pills"
      }, baseProps, {
        className: classes
      }), children);
    };
    Pills.displayName = 'Pills';
    Pills.defaultProps = {
      appearance: 'secondary'
    };

    var Spinner = function Spinner(props) {
      var _a, _b;

      var appearance = props.appearance,
          size = props.size,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var wrapperClasses = classNames__default["default"]((_a = {
        Spinner: true
      }, _a["Spinner--" + size] = size, _a), className);
      var circleClasses = classNames__default["default"]((_b = {
        Circle: true
      }, _b["Circle--" + appearance] = appearance, _b));
      var svgProps = {
        viewBox: '0 0 50 50'
      };
      var circleProps = {
        cx: 25,
        cy: 25,
        r: 20,
        fill: 'none',
        strokeMiterlimit: '10',
        strokeWidth: '4'
      };
      return /*#__PURE__*/React__namespace.createElement("svg", __assign({}, baseProps, {
        className: wrapperClasses
      }, svgProps), /*#__PURE__*/React__namespace.createElement("circle", __assign({
        className: circleClasses
      }, circleProps)));
    };
    Spinner.displayName = 'Spinner';
    Spinner.defaultProps = {
      appearance: 'primary',
      size: 'medium'
    };

    var Slider = function Slider(props) {
      var valueProp = props.value,
          defaultValue = props.defaultValue,
          onRelease = props.onRelease,
          onChange = props.onChange,
          rest = __rest(props, ["value", "defaultValue", "onRelease", "onChange"]);

      var _a = React__namespace.useState(valueProp === undefined ? defaultValue : valueProp),
          value = _a[0],
          setValue = _a[1];

      React__namespace.useEffect(function () {
        if (valueProp !== undefined) {
          setValue(valueProp);
        }
      }, [valueProp]);

      var onChangeHandler = function onChangeHandler(newValue) {
        if (valueProp === undefined) {
          setValue(newValue);
        }

        if (onChange) onChange(newValue);
      };

      return /*#__PURE__*/React__namespace.createElement(MultiSlider, __assign({}, rest), /*#__PURE__*/React__namespace.createElement(MultiSlider.Handle, {
        value: value,
        onChange: onChangeHandler,
        onRelease: onRelease,
        fillBefore: true
      }));
    };
    Slider.displayName = 'Slider';
    Slider.defaultProps = __assign(__assign({}, MultiSlider.defaultProps), {
      defaultValue: 0
    });

    var RangeIndex;

    (function (RangeIndex) {
      RangeIndex[RangeIndex["START"] = 0] = "START";
      RangeIndex[RangeIndex["END"] = 1] = "END";
    })(RangeIndex || (RangeIndex = {}));

    var RangeSlider = function RangeSlider(props) {
      var valueProp = props.value,
          defaultValue = props.defaultValue,
          onChange = props.onChange,
          onRelease = props.onRelease,
          rest = __rest(props, ["value", "defaultValue", "onChange", "onRelease"]);

      var _a = React__namespace.useState(valueProp === undefined ? defaultValue : valueProp),
          value = _a[0],
          setValue = _a[1];

      React__namespace.useEffect(function () {
        if (valueProp !== undefined) {
          setValue(valueProp);
        }
      }, [valueProp]);

      var onChangeHandler = function onChangeHandler(range) {
        if (valueProp === undefined) {
          setValue(range);
        }

        if (onChange) onChange(range);
      };

      return /*#__PURE__*/React__namespace.createElement(MultiSlider, __assign({
        onRangeChange: onChangeHandler,
        onRangeRelease: onRelease
      }, rest), /*#__PURE__*/React__namespace.createElement(MultiSlider.Handle, {
        value: value[RangeIndex.START],
        fillAfter: true
      }), /*#__PURE__*/React__namespace.createElement(MultiSlider.Handle, {
        value: value[RangeIndex.END]
      }));
    };
    RangeSlider.displayName = 'RangeSlider';
    RangeSlider.defaultProps = __assign(__assign({}, MultiSlider.defaultProps), {
      defaultValue: [0, 10]
    });

    var Subheading = function Subheading(props) {
      var _a;

      var appearance = props.appearance,
          children = props.children,
          className = props.className,
          color = props.color,
          rest = __rest(props, ["appearance", "children", "className", "color"]);

      var classes = classNames__default["default"]((_a = {
        Subheading: true
      }, _a["Subheading--" + appearance] = !color && appearance, _a["color-" + color] = color, _a), className);
      return /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        "data-test": "DesignSystem-Subheading"
      }, rest, {
        className: classes,
        componentType: 'h4'
      }), children);
    };
    Subheading.displayName = 'Subheading';
    Subheading.defaultProps = {
      appearance: 'default'
    };

    var Switch = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a, _b;

      var _c = props.size,
          size = _c === void 0 ? 'regular' : _c,
          defaultChecked = props.defaultChecked,
          disabled = props.disabled,
          onChange = props.onChange,
          name = props.name,
          value = props.value,
          className = props.className;
          props.appearance;
          var checkedProp = props.checked,
          rest = __rest(props, ["size", "defaultChecked", "disabled", "onChange", "name", "value", "className", "appearance", "checked"]);

      var _d = React__namespace.useState(checkedProp === undefined ? defaultChecked : checkedProp),
          checked = _d[0],
          setChecked = _d[1];

      React__namespace.useEffect(function () {
        if (checkedProp !== undefined) setChecked(checkedProp);
      }, [checkedProp]);
      var SwitchClass = classNames__default["default"]((_a = {}, _a['Switch'] = true, _a['Switch--disabled'] = disabled, _a["Switch--" + size] = size, _a), className);
      var SwitchWrapper = classNames__default["default"]((_b = {}, _b['Switch-wrapper'] = true, _b['Switch-wrapper--disabled'] = disabled, _b["Switch-wrapper--" + size] = size, _b['Switch-wrapper--checked'] = checked, _b['Switch-wrapper--checkedDisabled'] = checked && disabled, _b));

      var onChangeHandler = function onChangeHandler(event) {
        if (event.type == 'change' || isSpaceKey(event)) {
          if (checkedProp === undefined) setChecked(!checked);
          if (onChange) onChange(event, !checked);
        }
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: SwitchClass
      }, /*#__PURE__*/React__namespace.createElement("input", __assign({}, rest, {
        type: "checkbox",
        defaultChecked: defaultChecked,
        disabled: disabled,
        onChange: onChangeHandler,
        checked: checked,
        ref: ref,
        name: name,
        value: value,
        className: "Switch-input",
        onKeyUp: onChangeHandler
      })), /*#__PURE__*/React__namespace.createElement("span", {
        className: SwitchWrapper
      }));
    });
    Switch.displayName = 'Switch';

    var Textarea = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a;

      var _b = props.rows,
          rows = _b === void 0 ? 3 : _b,
          _c = props.resize,
          resize = _c === void 0 ? true : _c,
          disabled = props.disabled,
          name = props.name,
          placeholder = props.placeholder,
          value = props.value,
          defaultValue = props.defaultValue,
          required = props.required,
          error = props.error,
          onChange = props.onChange,
          onClick = props.onClick,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          className = props.className,
          rest = __rest(props, ["rows", "resize", "disabled", "name", "placeholder", "value", "defaultValue", "required", "error", "onChange", "onClick", "onBlur", "onFocus", "className"]);

      var classes = classNames__default["default"]((_a = {}, _a['Textarea'] = true, _a['Textarea--resize'] = resize, _a['Textarea--error'] = error, _a), className);
      return /*#__PURE__*/React__namespace.createElement("textarea", __assign({
        "data-test": "DesignSystem-Textarea"
      }, rest, {
        ref: ref,
        name: name,
        rows: rows,
        placeholder: placeholder,
        className: classes,
        value: value,
        defaultValue: defaultValue,
        required: required,
        disabled: disabled,
        onChange: onChange,
        onBlur: onBlur,
        onClick: onClick,
        onFocus: onFocus
      }));
    });
    Textarea.displayName = 'Textarea';

    var ActionButton = function ActionButton(props) {
      var _a;

      var appearance = props.appearance,
          label = props.label,
          onClick = props.onClick;
      var buttonClass = classNames__default["default"]((_a = {}, _a['Button'] = true, _a['Button--tiny'] = true, _a['Toast-actionButton'] = true, _a["Toast-actionButton--" + appearance] = appearance, _a));

      var onClickHandler = function onClickHandler(e) {
        e.preventDefault();
        if (onClick) onClick(e);
      };

      return /*#__PURE__*/React__namespace.createElement("button", {
        className: buttonClass,
        onClick: onClickHandler
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "white"
      }, label));
    };

    ActionButton.displayName = 'ActionButton';
    ActionButton.defaultProps = {
      appearance: 'default'
    };

    var Toast = function Toast(props) {
      var _a, _b, _c, _d;

      var title = props.title,
          message = props.message,
          actions = props.actions,
          onClose = props.onClose,
          className = props.className;
      var appearance = props.appearance;
      appearance = appearance === 'default' ? 'info' : appearance;
      var baseProps = extractBaseProps(props);
      var wrapperClass = classNames__default["default"]((_a = {}, _a['Toast'] = true, _a['Toast--withMessage'] = message, _a["Toast--" + appearance] = appearance, _a), className);
      var IconMapping = {
        info: 'info',
        success: 'check_circle',
        alert: 'error',
        warning: 'warning'
      };
      var icon = IconMapping[appearance];
      var titleClass = classNames__default["default"]((_b = {}, _b['Toast-title'] = true, _b['Toast-title--withMessage'] = message, _b));

      var iconClass = function iconClass(align) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['Toast-icon'] = true, _a["Toast-icon--" + align] = align, _a["Toast-icon--" + appearance] = appearance, _a["Toast-close-icon--" + appearance] = appearance && align === 'right', _a));
      };

      var textClass = classNames__default["default"]((_c = {}, _c['Toast-text'] = true, _c["Toast-text--" + appearance] = appearance, _c));
      var headingClass = classNames__default["default"]((_d = {}, _d['Toast-heading'] = true, _d["Toast-heading--" + appearance] = appearance, _d));

      var onCloseHandler = function onCloseHandler() {
        if (onClose) onClose();
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: wrapperClass
      }), icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        name: icon,
        className: iconClass('left')
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Toast-body"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: titleClass
      }, /*#__PURE__*/React__namespace.createElement(Heading, {
        size: "s",
        className: headingClass,
        appearance: appearance !== 'warning' ? 'white' : 'default'
      }, title), /*#__PURE__*/React__namespace.createElement(Icon, {
        name: 'close',
        className: iconClass('right'),
        onClick: onCloseHandler,
        appearance: appearance !== 'warning' ? 'white' : 'default'
      })), message && /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: appearance !== 'warning' ? 'white' : 'default',
        className: textClass
      }, message), !!(actions === null || actions === void 0 ? void 0 : actions.length) && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Toast-actions"
      }, actions.slice(0, 2).map(function (action, index) {
        return /*#__PURE__*/React__namespace.createElement(ActionButton, {
          key: index,
          label: action.label,
          appearance: appearance,
          onClick: action.onClick
        });
      }))));
    };
    Toast.displayName = 'Toast';
    Toast.defaultProps = {
      appearance: 'info'
    };

    var PopperWrapper = function (_super) {
      __extends(PopperWrapper, _super);

      function PopperWrapper(props) {
        var _this = _super.call(this, props) || this;

        _this.togglePopper = function (type, newValue) {
          var _a = _this.props,
              open = _a.open,
              onToggle = _a.onToggle;
          onToggle(newValue === undefined ? !open : newValue, type);
        };

        _this.doesEventContainsElement = function (event, ref) {
          var el = ref.current;
          return el && el.contains(event.target);
        };

        _this.getUpdatedStyle = function (oldStyle, placement, offset) {
          var style = _this.props.style;

          var newStyle = __assign(__assign({}, style), oldStyle);

          var position = placement ? placement.split('-')[0] : placement;

          switch (position) {
            case 'top':
              newStyle.marginBottom = _this.offsetMapping[offset];
              break;

            case 'bottom':
              newStyle.marginTop = _this.offsetMapping[offset];
              break;

            case 'left':
              newStyle.marginRight = _this.offsetMapping[offset];
              break;

            case 'right':
              newStyle.marginLeft = _this.offsetMapping[offset];
              break;
          }

          if (_this.props.triggerCoordinates) {
            newStyle.position = 'absolute';
            newStyle.transform = "translate(" + _this.props.triggerCoordinates.x + "px, " + _this.props.triggerCoordinates.y + "px)";
          }

          return newStyle;
        };

        _this.state = {
          animationKeyframe: '',
          isOpen: _this.props.open || false,
          uniqueKey: ''
        };
        _this.hoverableDelay = 100;
        _this.offsetMapping = {
          small: '2px',
          medium: '4px',
          large: '8px'
        };
        _this.triggerRef = /*#__PURE__*/React__namespace.createRef();
        _this.popupRef = /*#__PURE__*/React__namespace.createRef();
        _this.getPopperChildren = _this.getPopperChildren.bind(_this);
        _this.mouseMoveHandler = _this.mouseMoveHandler.bind(_this);
        _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.boundaryScrollHandler = _this.boundaryScrollHandler.bind(_this);
        return _this;
      }

      PopperWrapper.prototype.componentDidMount = function () {
        this.addBoundaryScrollHandler();
        var triggerElement = this.triggerRef.current;
        var zIndex = this.getZIndexForLayer(triggerElement);
        this.setState({
          zIndex: zIndex === undefined ? zIndex : zIndex + 1
        });
      };

      PopperWrapper.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.boundaryElement && this.props.boundaryElement) {
          this.removeBoundaryScrollHandler();
          this.addBoundaryScrollHandler();
        }

        if (prevProps.open !== this.props.open) {
          this._throttleWait = false;
          this.setState({
            animationKeyframe: ''
          });

          if (this.props.open) {
            var triggerElement = this.triggerRef.current;
            var zIndex = this.getZIndexForLayer(triggerElement);
            this.setState({
              zIndex: zIndex === undefined ? zIndex : zIndex + 1,
              isOpen: true
            });
          } else if (!this.props.open && this.props.animationClass) {
            this.setState({
              isOpen: false
            });
          }
        }
      };

      PopperWrapper.prototype.componentWillUnmount = function () {
        this.removeBoundaryScrollHandler();
      };

      PopperWrapper.prototype.boundaryScrollHandler = function () {
        var _a = this.props,
            open = _a.open,
            on = _a.on,
            closeOnScroll = _a.closeOnScroll;

        if (on === 'click' && closeOnScroll) {
          if (open) {
            if (!this._throttleWait) {
              this.togglePopper('onScroll', false);
              this._throttleWait = true;
            }
          }
        }
      };

      PopperWrapper.prototype.addBoundaryScrollHandler = function () {
        if (this.props.boundaryElement && this.props.boundaryElement.addEventListener) {
          this.props.boundaryElement.addEventListener('scroll', this.boundaryScrollHandler);
        }
      };

      PopperWrapper.prototype.removeBoundaryScrollHandler = function () {
        if (this.props.boundaryElement && this.props.boundaryElement.removeEventListener) {
          this.props.boundaryElement.removeEventListener('scroll', this.boundaryScrollHandler);
        }
      };

      PopperWrapper.prototype.mouseMoveHandler = function () {
        var _this = this;

        if (this._timer) clearTimeout(this._timer);
        this._timer = window.setTimeout(function () {
          var onToggle = _this.props.onToggle;
          onToggle(false, 'mouseLeave');
        }, this.hoverableDelay);
      };

      PopperWrapper.prototype.handleMouseEnter = function () {
        var on = this.props.on;

        if (on === 'hover') {
          if (this._timer) clearTimeout(this._timer);
          var onToggle = this.props.onToggle;
          onToggle(true, 'mouseEnter');
          this.setState(function () {
            return {
              isOpen: true
            };
          });
        }
      };

      PopperWrapper.prototype.handleMouseLeave = function () {
        var on = this.props.on;

        if (on === 'hover') {
          var _a = this.props,
              hoverable = _a.hoverable,
              onToggle = _a.onToggle;

          if (hoverable) {
            this.mouseMoveHandler();
          } else {
            onToggle(false, 'mouseLeave');
            this.setState({
              isOpen: false
            });
          }
        }
      };

      PopperWrapper.prototype.getZIndexForLayer = function (node) {
        if (node === null) {
          return;
        }

        var layerNode = node.closest('[data-layer]') || document.body;
        var zIndex = layerNode === document.body ? 'auto' : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
        return zIndex === 'auto' || isNaN(zIndex) ? 500 : zIndex;
      };

      PopperWrapper.prototype.getTriggerElement = function (ref) {
        var _this = this;

        var _a = this.props,
            trigger = _a.trigger,
            on = _a.on,
            triggerClass = _a.triggerClass;
        var options = on === 'hover' ? {
          ref: ref,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        } : {
          ref: ref,
          onClick: function onClick(ev) {
            ev.stopPropagation();

            _this.togglePopper('onClick');
          }
        };
        var classes = classNames__default["default"]('PopperWrapper-trigger', triggerClass);

        var shouldPopoverClose = function shouldPopoverClose(clicked) {
          var popover = _this.popupRef.current;
          var container = document.body;
          var popoverIndex = parseInt(window.getComputedStyle(popover).zIndex);
          var clickInsideLayer = false;
          var shouldClose = false;
          var openedLayers = container.querySelectorAll('[data-opened="true"]');
          openedLayers.forEach(function (layer) {
            if (layer.contains(clicked)) {
              clickInsideLayer = true;
              var clickedIndex = parseInt(window.getComputedStyle(layer).zIndex);

              if (popoverIndex > clickedIndex) {
                shouldClose = true;
                return;
              }
            }
          });

          if (container.isEqualNode(clicked) || shouldClose || !container.contains(clicked) || !clickInsideLayer) {
            return true;
          }

          return false;
        };

        var onOutsideClickHandler = function onOutsideClickHandler(event) {
          var _a = _this.props,
              open = _a.open,
              closeOnBackdropClick = _a.closeOnBackdropClick;

          if (open && shouldPopoverClose(event.target) && closeOnBackdropClick) {
            if (!_this.doesEventContainsElement(event, _this.popupRef)) {
              _this.togglePopper('outsideClick');
            }
          }
        };

        return /*#__PURE__*/React__namespace.createElement(OutsideClick, __assign({
          className: classes,
          onOutsideClick: onOutsideClickHandler
        }, options), trigger);
      };

      PopperWrapper.prototype.getPopperChildren = function (_a) {
        var _b;

        var _this = this;

        var _c, _d;

        var ref = _a.ref,
            style = _a.style,
            placement = _a.placement,
            outOfBoundaries = _a.outOfBoundaries;
        var _e = this.props,
            offset = _e.offset,
            children = _e.children,
            open = _e.open,
            animationClass = _e.animationClass;
        var _f = this.state,
            zIndex = _f.zIndex,
            animationKeyframe = _f.animationKeyframe,
            uniqueKey = _f.uniqueKey;
        var newStyle = offset ? this.getUpdatedStyle(style, placement, offset) : style;

        var childrenStyles = __assign(__assign({}, newStyle), {
          zIndex: zIndex
        });

        var classes = '';

        if (!animationClass) {
          var maxHeight = (_c = this.popupRef.current) === null || _c === void 0 ? void 0 : _c.offsetHeight;
          var transformStyles = (_d = this.popupRef.current) === null || _d === void 0 ? void 0 : _d.style.getPropertyValue('transform');

          if (transformStyles && maxHeight && placement && !animationKeyframe) {
            var uniqueKey_1 = Math.random().toString(36).substring(2, 6);
            var isTop = placement.includes('top');
            var popperAnimation = "\n        @keyframes popper-open-" + uniqueKey_1 + " {\n          from { \n            max-height: 0;\n            " + (isTop ? "margin-top: " + maxHeight + "px" : '') + ";\n          }\n          to {\n            max-height: " + maxHeight + "px;\n            " + (isTop ? "margin-top: 0px" : '') + ";\n          }\n        }\n        @keyframes popper-close-" + uniqueKey_1 + " {\n          from {\n            max-height: " + maxHeight + "px;\n            " + (isTop ? "margin-top: 0px" : '') + ";\n          }\n          to {\n            max-height: 0;\n            " + (isTop ? "margin-top: " + maxHeight + "px" : '') + ";\n          }\n        }\n        ";
            this.setState({
              animationKeyframe: popperAnimation,
              uniqueKey: uniqueKey_1
            });
          }

          var popperAnimationStyles = {
            animation: open ? "popper-open-" + uniqueKey + " 120ms cubic-bezier(0, 0, 0.38, 0.9), popper-fade-in 120ms" : "popper-close-" + uniqueKey + " 120ms cubic-bezier(0.2, 0, 1, 0.9), fadeOut 100ms"
          };
          childrenStyles = __assign(__assign(__assign({}, childrenStyles), popperAnimationStyles), {
            overflow: 'hidden'
          });
        } else {
          classes = classNames__default["default"]((_b = {}, _b["" + animationClass.open] = this.state.isOpen, _b["" + animationClass.close] = !this.state.isOpen, _b), children.props.className);
        }

        var childProps = {
          ref: ref,
          style: childrenStyles,
          'data-placement': placement,
          'data-hide': outOfBoundaries,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onAnimationEnd: function onAnimationEnd() {
            if (!open) {
              _this.setState({
                isOpen: false
              });
            }
          }
        };
        var element = /*#__PURE__*/React__namespace.cloneElement(children, animationClass ? __assign(__assign({}, childProps), {
          className: classes
        }) : __assign({}, childProps));
        return element;
      };

      PopperWrapper.prototype.render = function () {
        var _this = this;

        var _a = this.props,
            placement = _a.placement,
            appendToBody = _a.appendToBody,
            hide = _a.hide,
            boundaryElement = _a.boundaryElement,
            triggerCoordinates = _a.triggerCoordinates;
        var _b = this.state,
            animationKeyframe = _b.animationKeyframe,
            isOpen = _b.isOpen;
        var coordinatesPopper = /*#__PURE__*/React__namespace.createElement(reactPopper.Popper, {
          placement: placement,
          innerRef: this.popupRef,
          modifiers: __assign({
            preventOverflow: {
              boundariesElement: boundaryElement || document.body
            },
            hide: {
              enabled: hide
            }
          }, triggerCoordinates && {
            offset: {
              offset: triggerCoordinates.x + "px, " + triggerCoordinates.y + "px"
            }
          })
        }, this.getPopperChildren);
        return /*#__PURE__*/React__namespace.createElement(reactPopper.Manager, null, /*#__PURE__*/React__namespace.createElement("style", null, animationKeyframe), /*#__PURE__*/React__namespace.createElement(reactPopper.Reference, {
          innerRef: this.triggerRef
        }, function (_a) {
          var ref = _a.ref;
          return _this.getTriggerElement(ref);
        }), isOpen && appendToBody && !triggerCoordinates && /*#__PURE__*/ReactDOM__namespace.createPortal( /*#__PURE__*/React__namespace.createElement(reactPopper.Popper, {
          placement: placement,
          innerRef: this.popupRef,
          modifiers: {
            preventOverflow: {
              boundariesElement: boundaryElement || document.body
            },
            hide: {
              enabled: hide
            }
          }
        }, this.getPopperChildren), document.body), isOpen && appendToBody && triggerCoordinates && /*#__PURE__*/ReactDOM__namespace.createPortal(coordinatesPopper, document.body), isOpen && !appendToBody && !triggerCoordinates && /*#__PURE__*/React__namespace.createElement(reactPopper.Popper, {
          placement: placement,
          innerRef: this.popupRef
        }, this.getPopperChildren));
      };

      PopperWrapper.defaultProps = {
        on: 'click',
        offset: 'medium',
        closeOnBackdropClick: true,
        hoverable: true,
        appendToBody: true,
        style: {}
      };
      return PopperWrapper;
    }(React__namespace.Component);

    var propsList = ['appendToBody', 'trigger', 'hoverable', 'on', 'open', 'closeOnBackdropClick', 'offset', 'closeOnScroll'];
    var Popover = function Popover(props) {
      var _a;

      var position = props.position,
          customStyle = props.customStyle,
          dark = props.dark,
          children = props.children,
          onToggle = props.onToggle,
          className = props.className,
          hideOnReferenceEscape = props.hideOnReferenceEscape,
          _b = props.boundaryElement,
          boundaryElement = _b === void 0 ? document.body : _b,
          name = props.name,
          rest = __rest(props, ["position", "customStyle", "dark", "children", "onToggle", "className", "hideOnReferenceEscape", "boundaryElement", "name"]);

      var _c = React__namespace.useState(!!props.open),
          open = _c[0],
          setOpen = _c[1];

      var _d = React__namespace.useState(false),
          init = _d[0],
          setInit = _d[1];

      React__namespace.useEffect(function () {
        if (props.open !== undefined) setOpen(props.open);
      }, [props.open]);
      var defaultOnToggle = React__namespace.useCallback(function (newOpen) {
        setOpen(newOpen);
      }, []);
      React__namespace.useEffect(function () {
        if (!init) {
          if ('current' in boundaryElement && boundaryElement.current) {
            setInit(true);
          }
        }
      }, [boundaryElement]);
      var classes = classNames__default["default"]((_a = {
        Popover: true
      }, _a['Popover--dark'] = dark, _a), className);
      var PopoverWrapper = /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Popover",
        className: classes,
        "data-layer": true,
        "data-opened": open,
        "data-name": name
      }, children);
      return /*#__PURE__*/React__namespace.createElement(PopperWrapper, __assign({}, rest, {
        init: init,
        boundaryElement: 'current' in boundaryElement ? boundaryElement.current : boundaryElement,
        open: open,
        hide: hideOnReferenceEscape,
        style: customStyle,
        onToggle: onToggle || defaultOnToggle,
        placement: position
      }), PopoverWrapper);
    };
    Popover.displayName = 'Popover';
    Popover.defaultProps = Object.assign({}, filterProps(PopperWrapper.defaultProps, propsList, true), {
      offset: 'large',
      position: 'bottom',
      hideOnReferenceEscape: true,
      customStyle: {}
    });

    var keyCodes$1 = {
      BACKSPACE: 'Backspace',
      DELETE: 'Delete',
      ENTER: 'Enter'
    };
    var ChipInput = function ChipInput(props) {
      var _a, _b;

      var chipOptions = props.chipOptions,
          allowDuplicates = props.allowDuplicates,
          disabled = props.disabled,
          error = props.error,
          placeholder = props.placeholder,
          defaultValue = props.defaultValue,
          value = props.value,
          className = props.className,
          autoFocus = props.autoFocus,
          onChange = props.onChange,
          onBlur = props.onBlur,
          onFocus = props.onFocus;
      var inputRef = /*#__PURE__*/React__namespace.createRef();

      var _c = React__namespace.useState(value || defaultValue),
          chips = _c[0],
          setChips = _c[1];

      var _d = React__namespace.useState(''),
          inputValue = _d[0],
          setInputValue = _d[1];

      var baseProps = extractBaseProps(props);
      React__namespace.useEffect(function () {
        if (value !== undefined) {
          setChips(value);
        }
      }, [value]);
      var ChipInputBorderClass = classNames__default["default"]((_a = {}, _a['ChipInput-border'] = true, _a['ChipInput-border--error'] = error, _a));
      var ChipInputClass = classNames__default["default"]((_b = {
        ChipInput: true
      }, _b['ChipInput--disabled'] = disabled, _b['ChipInput--withChips'] = chips && chips.length > 0, _b['ChipInput--error'] = error, _b), className);

      var onUpdateChips = function onUpdateChips(updatedChips) {
        if (onChange) onChange(updatedChips);
      };

      var onChipDeleteHandler = function onChipDeleteHandler(index) {
        var updatedChips = __spreadArrays(chips);

        updatedChips.splice(index, 1);

        if (!value) {
          setChips(updatedChips);
        }

        onUpdateChips(updatedChips);
      };

      var onChipAddHandler = function onChipAddHandler() {
        if (!inputValue) return;
        var chip = inputValue.trim();

        if ((allowDuplicates || chips.indexOf(chip) === -1) && chip) {
          var updatedChips = __spreadArrays(chips, [chip]);

          if (!value) {
            setChips(updatedChips);
          }

          onUpdateChips(updatedChips);
          setInputValue('');
        }
      };

      var onDeleteAllHandler = function onDeleteAllHandler() {
        var updatedChips = [];

        if (!value) {
          setChips(updatedChips);
        }

        onUpdateChips(updatedChips);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        var chipsLength = chips.length;

        switch (event.key) {
          case keyCodes$1.DELETE:
          case keyCodes$1.BACKSPACE:
            if (inputValue === '' && chipsLength > 0) {
              onChipDeleteHandler(chipsLength - 1);
            }

            break;

          case keyCodes$1.ENTER:
            event.preventDefault();
            onChipAddHandler();
            break;
        }
      };

      var onInputChangeHandler = function onInputChangeHandler(e) {
        setInputValue(e.target.value);
      };

      var onClickHandler = function onClickHandler() {
        var _a;

        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      };

      var chipComponents = chips.map(function (chip, index) {
        var _a = chipOptions.type,
            type = _a === void 0 ? 'input' : _a,
            _onClick = chipOptions.onClick,
            rest = __rest(chipOptions, ["type", "onClick"]);

        return /*#__PURE__*/React__namespace.createElement(Chip, __assign({
          "data-test": "DesignSystem-ChipInput--Chip",
          label: chip,
          name: chip,
          type: type,
          disabled: disabled,
          key: index,
          className: "my-3 mx-2",
          onClick: function onClick() {
            return _onClick && _onClick(chip, index);
          },
          onClose: function onClose() {
            return onChipDeleteHandler(index);
          }
        }, rest));
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-ChipInput--Border",
        className: ChipInputBorderClass
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-ChipInput"
      }, baseProps, {
        className: ChipInputClass,
        onClick: onClickHandler,
        tabIndex: disabled ? -1 : 0
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "ChipInput-wrapper"
      }, chips && chips.length > 0 && chipComponents, /*#__PURE__*/React__namespace.createElement("input", {
        "data-test": "DesignSystem-ChipInput--Input",
        ref: inputRef,
        className: "ChipInput-input",
        autoFocus: autoFocus,
        placeholder: chips && chips.length > 0 ? '' : placeholder,
        disabled: disabled,
        value: inputValue,
        onBlur: onBlur,
        onFocus: onFocus,
        onChange: onInputChangeHandler,
        onKeyDown: onKeyDownHandler
      })), chips.length > 0 && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-ChipInput--Icon",
        name: "close",
        appearance: disabled ? 'disabled' : 'subtle',
        className: "ChipInput-icon",
        onClick: onDeleteAllHandler,
        tabIndex: disabled ? -1 : 0
      })));
    };
    ChipInput.displayName = 'ChipInput';
    ChipInput.defaultProps = {
      chipOptions: {},
      defaultValue: [],
      allowDuplicates: false,
      autoFocus: false
    };

    var getTextAppearance = function getTextAppearance(isActive, disabled) {
      return disabled ? 'disabled' : isActive ? 'link' : 'default';
    };
    var getIconAppearance = function getIconAppearance(isActive, disabled) {
      return disabled ? 'disabled' : isActive ? 'primary_dark' : 'default';
    };
    var getPillsAppearance = function getPillsAppearance(isActive) {
      return isActive ? 'primary' : 'secondary';
    };
    var getMenu = function getMenu(menus, active) {
      for (var _i = 0, menus_1 = menus; _i < menus_1.length; _i++) {
        var menu = menus_1[_i];

        if (active.name && menu.name === active.name || active.link && menu.link === active.link) {
          return menu;
        }

        if (menu.subMenu) {
          var activeMenu = menu.subMenu.find(function (submenu) {
            return active.name && submenu.name === active.name || active.link && submenu.link === active.link;
          });
          if (activeMenu) return activeMenu;
        }
      }

      return null;
    };
    var getExpandedMenus = function getExpandedMenus(menus, active) {
      var expandedMenus = {};
      var activeMenu = active ? getMenu(menus, active) : null;

      for (var _i = 0, menus_2 = menus; _i < menus_2.length; _i++) {
        var menu = menus_2[_i];
        var isActiveOrExpanded = (activeMenu === null || activeMenu === void 0 ? void 0 : activeMenu.name.split('.')[0]) === menu.name || menu.expanded;

        if (menu.subMenu) {
          expandedMenus[menu.name] = !!isActiveOrExpanded;
        }
      }

      return expandedMenus;
    };
    var isMenuActive = function isMenuActive(menus, menu, active) {
      if (active) {
        var currActiveMenu = getMenu(menus, active);
        return !!currActiveMenu && (currActiveMenu === menu || currActiveMenu.name.split('.')[0] === menu.name || currActiveMenu.name === menu.name || !!currActiveMenu.link && currActiveMenu.link === menu.link);
      }

      return false;
    };
    var getNavItemColor = function getNavItemColor(isActive, disabled) {
      return disabled ? 'inverse-lightest' : isActive ? 'primary-dark' : 'inverse';
    };

    var _MenuIcon = function MenuIcon(props) {
      var isChildrenVisible = props.isChildrenVisible;
      return /*#__PURE__*/React__namespace.createElement(Icon, {
        className: "mx-4",
        name: isChildrenVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      });
    };

    var _MenuPills = function MenuPills(props) {
      var _a;

      var disabled = props.disabled,
          isActive = props.isActive,
          count = props.count;
      var PillsClass = classNames__default["default"]((_a = {}, _a['MenuItem-count'] = true, _a['MenuItem-count--disabled'] = disabled, _a));
      return /*#__PURE__*/React__namespace.createElement(Pills, {
        subtle: disabled,
        className: PillsClass,
        appearance: getPillsAppearance(isActive),
        "data-test": "DesignSystem-VerticalNav--Pills"
      }, count);
    };

    var MenuItem$1 = function MenuItem(props) {
      var _a;

      var menu = props.menu,
          isActive = props.isActive,
          expanded = props.expanded,
          rounded = props.rounded,
          hasSubmenu = props.hasSubmenu,
          isChildren = props.isChildren,
          isChildrenVisible = props.isChildrenVisible,
          onClick = props.onClick,
          customItemRenderer = props.customItemRenderer;

      var _b = React__namespace.useState(false),
          isTextTruncated = _b[0],
          setIsTextTruncated = _b[1];

      var detectTruncation = Tooltip.useAutoTooltip().detectTruncation;
      var contentRef = /*#__PURE__*/React__namespace.createRef();
      React__namespace.useEffect(function () {
        var isTruncated = detectTruncation(contentRef);
        setIsTextTruncated(isTruncated);
      }, [contentRef]);

      var _MenuLabel = function MenuLabel(props) {
        var label = props.label,
            labelColor = props.labelColor;
        return /*#__PURE__*/React__namespace.createElement(Text, {
          "data-test": "DesignSystem-VerticalNav--Text",
          ref: contentRef,
          color: labelColor,
          className: "MenuItem-Text MenuItem--overflow " + (hasSubmenu || menu.count !== undefined ? '' : 'mr-5')
        }, label);
      };

      var onClickHandler = function onClickHandler(ev) {
        ev.preventDefault();
        if (onClick) onClick(menu);
      };

      var baseProps = __assign({
        onClick: onClickHandler,
        href: menu.link,
        tabIndex: 0
      }, extractBaseProps(props));

      var itemColor = getNavItemColor(isActive, menu.disabled);
      var ItemClass = classNames__default["default"]((_a = {}, _a['MenuItem'] = true, _a['MenuItem--vertical'] = true, _a['MenuItem--collapsed'] = !expanded, _a['MenuItem--expanded'] = expanded, _a['MenuItem--active'] = isActive, _a['MenuItem--disabled'] = menu.disabled, _a['MenuItem--subMenu'] = isChildren && expanded, _a['MenuItem--rounded'] = rounded && expanded, _a["color-" + itemColor] = true, _a));

      var renderSubMenu = function renderSubMenu() {
        if (hasSubmenu) {
          return /*#__PURE__*/React__namespace.createElement(_MenuIcon, {
            isChildrenVisible: isChildrenVisible
          });
        }

        if (menu.count !== undefined) {
          var count = menu.count > 99 ? '99+' : menu.count;
          return /*#__PURE__*/React__namespace.createElement(_MenuPills, {
            disabled: menu.disabled,
            isActive: isActive,
            count: count
          });
        }

        return null;
      };

      if (!expanded && !menu.icon) return null;

      var customItemProps = __assign(__assign({}, props), {
        contentRef: contentRef,
        MenuIcon: function MenuIcon() {
          return _MenuIcon({
            isChildrenVisible: isChildrenVisible
          });
        },
        MenuLabel: function MenuLabel() {
          return _MenuLabel({
            label: menu.label,
            labelColor: itemColor
          });
        },
        MenuPills: function MenuPills() {
          return menu.count !== undefined ? _MenuPills({
            disabled: menu.disabled,
            isActive: isActive,
            count: menu.count
          }) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null);
        }
      });

      return customItemRenderer ? customItemRenderer(customItemProps) : /*#__PURE__*/React__namespace.createElement(Tooltip, {
        showTooltip: expanded ? isTextTruncated : true,
        tooltip: menu.label,
        position: "right"
      }, /*#__PURE__*/React__namespace.createElement(Link$1, __assign({
        componentType: "a",
        className: ItemClass
      }, baseProps), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex align-items-center overflow-hidden"
      }, menu.icon && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-VerticalNav--Icon",
        className: expanded ? 'mr-4' : '',
        name: menu.icon,
        type: menu.iconType
      }), expanded && /*#__PURE__*/React__namespace.createElement(_MenuLabel, {
        label: menu.label,
        labelColor: itemColor
      })), expanded && renderSubMenu()));
    };
    MenuItem$1.defaultProps = {
      isActive: false
    };

    var VerticalNav = function VerticalNav(props) {
      var _a;

      var menus = props.menus,
          active = props.active,
          onClick = props.onClick,
          expanded = props.expanded,
          rounded = props.rounded,
          autoCollapse = props.autoCollapse,
          className = props.className,
          customItemRenderer = props.customItemRenderer;

      var _b = React__namespace.useState({}),
          subMenuExpandedState = _b[0],
          setSubMenuExpandedState = _b[1];

      var _c = React__namespace.useState({}),
          menuState = _c[0],
          setMenuState = _c[1];

      var baseProps = extractBaseProps(props);
      React__namespace.useEffect(function () {
        if (props.active) {
          var currMenu = getMenu(menus, props.active);
          if (currMenu) updateMenuState(currMenu, true);
        }
      }, [props.active]);
      React__namespace.useEffect(function () {
        var expandedMenus = getExpandedMenus(menus, active);
        setSubMenuExpandedState(expandedMenus);
      }, []);

      var updateMenuState = function updateMenuState(menu, val) {
        var _a;

        var currMenu = getMenu(menus, menu);

        if (currMenu) {
          var nameSplit = currMenu.name.split('.');

          if (nameSplit.length > 1 || currMenu.subMenu) {
            var name_1 = nameSplit[0];

            if (autoCollapse) {
              setMenuState((_a = {}, _a[name_1] = val || !menuState[name_1], _a));
            } else {
              var menuData = __assign({}, menuState);

              menuData[name_1] = val !== undefined ? val : !menuData[name_1];
              setMenuState(menuData);
            }
          } else {
            if (autoCollapse) {
              if (!expanded) setMenuState({});
            }
          }
        }
      };

      var onClickHandler = function onClickHandler(menu) {
        var _a, _b;

        if (menu.subMenu) {
          if (!expanded) {
            if (onClick) onClick(menu.subMenu[0]);
          } else {
            if (!subMenuExpandedState[menu.name]) {
              updateMenuState(menu);
            }

            setMenuState(__assign(__assign({}, menuState), (_a = {}, _a[menu.name] = false, _a)));
            setSubMenuExpandedState(__assign(__assign({}, subMenuExpandedState), (_b = {}, _b[menu.name] = !subMenuExpandedState[menu.name], _b)));
          }
        } else {
          if (onClick) onClick(menu);
        }
      };

      var renderList = function renderList() {
        var list = menus.map(function (menu, index) {
          var _a;

          var isActive = !menuState[menu.name] && isMenuActive(menus, menu, active);
          var hasSubmenu = menu.subMenu && menu.subMenu.length > 0;
          var isChildrenVisible = hasSubmenu && (menuState[menu.name] || subMenuExpandedState[menu.name]);
          var hasGroup = index === 0 || menus[index - 1].group !== menu.group;
          var sectionClass = classNames__default["default"]((_a = {}, _a['VerticalNav-section'] = true, _a['VerticalNav-section--border'] = index !== 0, _a));
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
            key: index
          }, hasGroup && menu.group && expanded && /*#__PURE__*/React__namespace.createElement("div", {
            className: sectionClass
          }, /*#__PURE__*/React__namespace.createElement(Text, {
            "data-test": "DesignSystem-VerticalNav--Section",
            size: "small",
            weight: "strong",
            appearance: "subtle"
          }, menu.group)), /*#__PURE__*/React__namespace.createElement(MenuItem$1, {
            "data-test": "DesignSystem-VerticalNav--Item",
            menu: menu,
            expanded: expanded,
            isActive: isActive,
            hasSubmenu: hasSubmenu,
            isChildren: false,
            rounded: rounded,
            isChildrenVisible: isChildrenVisible,
            onClick: onClickHandler,
            customItemRenderer: customItemRenderer
          }), isChildrenVisible && menu.subMenu.map(function (subMenu, id) {
            return /*#__PURE__*/React__namespace.createElement(MenuItem$1, {
              key: id,
              menu: subMenu,
              expanded: expanded,
              hasSubmenu: false,
              isChildren: true,
              rounded: rounded,
              onClick: onClickHandler,
              isActive: isMenuActive(menus, subMenu, active),
              customItemRenderer: customItemRenderer
            });
          }));
        });
        return list;
      };

      var classes = classNames__default["default"]((_a = {
        VerticalNav: true
      }, _a['VerticalNav--expanded'] = expanded, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes
      }), renderList());
    };
    VerticalNav.defaultProps = {
      expanded: true,
      autoCollapse: true,
      rounded: false,
      showTooltip: false
    };

    var HorizontalNav = function HorizontalNav(props) {
      var _a;

      var menus = props.menus,
          active = props.active,
          onClick = props.onClick,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {}, _a['HorizontalNav'] = true, _a), className);

      var onClickHandler = function onClickHandler(menu) {
        return function () {
          if (onClick) onClick(menu);
        };
      };

      var getPillsClass = function getPillsClass(disabled) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['HorizontalNav-pills'] = true, _a['HorizontalNav-pills--disabled'] = disabled, _a['HorizontalNav-animate'] = true, _a));
      };

      var renderIcon = function renderIcon(menu, isActive) {
        if (menu.count !== undefined) {
          var count = menu.count > 99 ? '99+' : menu.count;
          return /*#__PURE__*/React__namespace.createElement(Pills, {
            subtle: menu.disabled,
            className: getPillsClass(menu.disabled),
            appearance: getPillsAppearance(isActive),
            "data-test": "DesignSystem-HorizontalNav--Pills"
          }, count);
        }

        if (menu.icon) {
          return /*#__PURE__*/React__namespace.createElement(Icon, {
            className: "mr-3 HorizontalNav-animate",
            name: menu.icon,
            type: menu.iconType,
            "data-test": "DesignSystem-HorizontalNav--Icon"
          });
        }

        return null;
      };

      var onKeyDownHandler = function onKeyDownHandler(event, menu) {
        if (event.key === 'Enter' && onClick) {
          onClick(menu);
        }
      };

      var list = menus.map(function (menu, index) {
        var _a;

        var isActive = isMenuActive(menus, menu, active);
        var itemColor = getNavItemColor(isActive, menu.disabled);
        var menuClasses = classNames__default["default"]((_a = {
          'HorizontalNav-menu': true,
          'HorizontalNav-menu--default': !isActive && !menu.disabled
        }, _a['HorizontalNav-menu--active'] = isActive, _a['HorizontalNav-menu--disabled'] = menu.disabled, _a["HorizontalNav-animate"] = true, _a["color-" + itemColor] = true, _a));
        return /*#__PURE__*/React__namespace.createElement("div", {
          tabIndex: 0,
          "data-test": "DesignSystem-HorizontalNav",
          key: index,
          className: menuClasses,
          onClick: onClickHandler(menu),
          onKeyDown: function onKeyDown(e) {
            return onKeyDownHandler(e, menu);
          },
          role: "button"
        }, renderIcon(menu, isActive), /*#__PURE__*/React__namespace.createElement(Text, {
          color: itemColor,
          weight: "medium",
          "data-test": "DesignSystem-HorizontalNav--Text",
          className: "HorizontalNav-menuText HorizontalNav-animate"
        }, menu.label));
      });
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes
      }), list);
    };

    var tooltipPropsList = ['trigger', 'on', 'open', 'offset', 'onToggle', 'dark', 'customStyle', 'closeOnBackdropClick', 'hideOnReferenceEscape', 'closeOnScroll'];
    var positionValue = {
      bottom: 'bottom',
      top: 'top',
      'top-start': 'top',
      'top-end': 'top',
      'bottom-start': 'bottom',
      'bottom-end': 'bottom',
      left: 'left',
      right: 'right'
    };
    var detectTruncation = function detectTruncation(boundaryRef) {
      var element = boundaryRef === null || boundaryRef === void 0 ? void 0 : boundaryRef.current;
      var isTruncated = element ? element.scrollWidth > element.clientWidth : false;
      return isTruncated;
    };
    var Tooltip = function Tooltip(props) {
      var children = props.children,
          tooltip = props.tooltip,
          showTooltip = props.showTooltip,
          showOnTruncation = props.showOnTruncation,
          elementRef = props.elementRef,
          rest = __rest(props, ["children", "tooltip", "showTooltip", "showOnTruncation", "elementRef"]);

      var childrenRef = React__namespace.useRef(null);

      var _a = React__namespace.useState(false),
          isTruncated = _a[0],
          setIsTruncated = _a[1];

      React__namespace.useEffect(function () {
        var element = elementRef ? elementRef : childrenRef;
        setIsTruncated(detectTruncation(element));
      }, [childrenRef, elementRef, children]);
      var renderChildren = elementRef || ! /*#__PURE__*/React__namespace.isValidElement(children) ? children : /*#__PURE__*/React__namespace.cloneElement(children, {
        ref: childrenRef
      });

      if (!showTooltip) {
        return children;
      }

      var tooltipWrapper = /*#__PURE__*/React__namespace.createElement("div", {
        className: "Tooltip"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: "Tooltip-text",
        appearance: "white"
      }, tooltip));

      if (showOnTruncation) {
        return isTruncated ? /*#__PURE__*/React__namespace.createElement(Popover, __assign({
          trigger: renderChildren,
          on: 'hover',
          offset: 'medium'
        }, rest, {
          animationClass: {
            open: "Tooltip-animation-open-" + positionValue[props.position],
            close: "Tooltip-animation-close-" + positionValue[props.position]
          },
          className: "Tooltip-container"
        }), tooltipWrapper) : renderChildren;
      }

      return /*#__PURE__*/React__namespace.createElement(Popover, __assign({
        trigger: children,
        on: 'hover',
        offset: 'medium'
      }, rest, {
        animationClass: {
          open: "Tooltip-animation-open-" + positionValue[props.position],
          close: "Tooltip-animation-close-" + positionValue[props.position]
        },
        className: "Tooltip-container"
      }), tooltipWrapper);
    };

    Tooltip.useAutoTooltip = function () {
      return {
        detectTruncation: detectTruncation
      };
    };

    Tooltip.defaultProps = Object.assign({}, filterProps(Popover.defaultProps, tooltipPropsList), {
      hoverable: false,
      showTooltip: true,
      showOnTruncation: false
    });

    var Dialog = function Dialog(props) {
      var dimension = props.dimension,
          primaryButtonAppearance = props.primaryButtonAppearance,
          secondaryButtonAppearance = props.secondaryButtonAppearance,
          open = props.open,
          onClose = props.onClose,
          heading = props.heading,
          title = props.title,
          description = props.description,
          primaryButtonLabel = props.primaryButtonLabel,
          primaryButtonCallback = props.primaryButtonCallback,
          secondaryButtonLabel = props.secondaryButtonLabel,
          secondaryButtonCallback = props.secondaryButtonCallback;
      var baseProps = extractBaseProps(props);
      return /*#__PURE__*/React__namespace.createElement(Modal, __assign({
        "data-test": "DesignSystem-Dialog"
      }, baseProps, {
        open: open,
        dimension: dimension,
        onClose: onClose,
        headerOptions: {
          heading: heading
        },
        footer: /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Button, {
          type: "button",
          "data-test": "DesignSystem-Dialog--SecondaryButton",
          appearance: secondaryButtonAppearance,
          onClick: secondaryButtonCallback
        }, secondaryButtonLabel), /*#__PURE__*/React__namespace.createElement(Button, {
          type: "button",
          className: "ml-4",
          "data-test": "DesignSystem-Dialog--PrimaryButton",
          appearance: primaryButtonAppearance,
          onClick: primaryButtonCallback
        }, primaryButtonLabel))
      }), /*#__PURE__*/React__namespace.createElement(ModalDescription, {
        title: title,
        description: description
      }));
    };

    Dialog.displayName = 'Dialog';
    Dialog.defaultProps = {
      dimension: 'small',
      primaryButtonAppearance: 'primary',
      secondaryButtonAppearance: 'basic'
    };

    var OverlayFooter = function OverlayFooter(props) {
      var open = props.open,
          className = props.className,
          children = props.children,
          actions = props.actions;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        OverlayFooter: true
      }, className);
      var wrapperRef = /*#__PURE__*/React__namespace.createRef();
      React__namespace.useEffect(function () {
        var _a;

        if (open) {
          if (wrapperRef.current) {
            var secondaryBtns = (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.Button--basic');
            var secondaryBtn_1 = secondaryBtns[secondaryBtns.length - 1];

            if (secondaryBtn_1) {
              window.requestAnimationFrame(function () {
                return secondaryBtn_1.focus({
                  preventScroll: true
                });
              });
            }
          }
        }
      }, [open]);

      if (actions) {
        return /*#__PURE__*/React__namespace.createElement("div", __assign({
          ref: wrapperRef
        }, baseProps, {
          className: classes
        }), actions.map(function (_a, index) {
          _a.label;
              var options = __rest(_a, ["label"]);

          return /*#__PURE__*/React__namespace.createElement(Button, __assign({
            type: "button"
          }, options, {
            key: index
          }));
        }));
      }

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-OverlayFooter",
        ref: wrapperRef
      }, baseProps, {
        className: classes
      }), children);
    };
    OverlayFooter.displayName = 'OverlayFooter';

    var OverlayHeader = function OverlayHeader(props) {
      var _a, _b;

      var className = props.className,
          heading = props.heading,
          subHeading = props.subHeading,
          backButton = props.backButton,
          backIcon = props.backIcon,
          backIconCallback = props.backIconCallback,
          backButtonCallback = props.backButtonCallback,
          headingClass = props.headingClass;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        OverlayHeader: true
      }, _a['OverlayHeader--withBackButton'] = backButton || backIcon, _a), className);
      var subheadingClass = classNames__default["default"]((_b = {}, _b['OverlayHeader-subheading'] = true, _b['OverlayHeader-subheading--withBackButton'] = backButton || backIcon, _b));
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-OverlayHeader"
      }, baseProps, {
        className: classes
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "OverlayHeader-headerWrapper"
      }, (backButton || backIcon) && /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-OverlayHeader--Button",
        appearance: "transparent",
        className: "mr-4",
        icon: "arrow_back",
        largeIcon: true,
        onClick: backButtonCallback || backIconCallback
      }), heading && /*#__PURE__*/React__namespace.createElement(Heading, {
        className: headingClass,
        "data-test": "DesignSystem-OverlayHeader--heading"
      }, heading)), subHeading && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-OverlayHeader--Subheading",
        appearance: "subtle",
        className: subheadingClass
      }, subHeading));
    };
    OverlayHeader.displayName = 'OverlayHeader';

    var OverlayBody = function OverlayBody(props) {
      var children = props.children,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        OverlayBody: true
      }, className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-OverlayBody"
      }, baseProps, {
        className: classes
      }), children);
    };
    OverlayBody.defaultProps = {
      stickFooter: true,
      withFooter: true
    };
    OverlayBody.displayName = 'OverlayBody';

    var getWrapperElement = function getWrapperElement() {
      var element = document.querySelector('.Overlay-wrapper');

      if (element === null) {
        element = document.createElement('div');
        element.classList.add('Overlay-wrapper');
        document.body.appendChild(element);
      }

      return element;
    };
    var getUpdatedZIndex = function getUpdatedZIndex(ele) {
      var containerClassName = ele.containerClassName,
          elementRef = ele.elementRef,
          element = ele.element;
      if (element === null) return;
      var elements = element.querySelectorAll(containerClassName);
      if (elements.length < 1) return;
      var siblings = Array.from(elements).filter(function (el) {
        return el !== elementRef.current;
      });
      var zIndex = -1;
      siblings.forEach(function (element) {
        var prevZIndex = parseInt(window.getComputedStyle(element).zIndex || '0', 10);
        zIndex = Math.max(zIndex, prevZIndex + 10);
      });
      return zIndex > 0 ? zIndex : undefined;
    };
    var closeOnEscapeKeypress = function closeOnEscapeKeypress(event, isTopOverlay, onClose) {
      if (event.key === 'Escape' && isTopOverlay) {
        onClose(event);
        event.preventDefault();
      }
    };

    var OverlayManager = function () {
      function OverlayManager() {
        this.overlays = [];
      }

      OverlayManager.prototype.add = function (overlay) {
        if (overlay === null) return;
        var overlayIdx = this.overlays.indexOf(overlay);

        if (overlayIdx !== -1) {
          return overlayIdx;
        }

        overlayIdx = this.overlays.length;
        this.overlays.push(overlay);
        return overlayIdx;
      };

      OverlayManager.prototype.remove = function (overlay) {
        if (overlay === null) return;
        var overlayIdx = this.overlays.indexOf(overlay);

        if (overlayIdx === -1) {
          return;
        }

        this.overlays.splice(overlayIdx, 1);
      };

      OverlayManager.prototype.isTopOverlay = function (overlay) {
        if (overlay === null) return;
        return !!this.overlays.length && this.overlays[this.overlays.length - 1] === overlay;
      };

      return OverlayManager;
    }();

    var instance = new OverlayManager();
    Object.freeze(instance);

    var Modal = function (_super) {
      __extends(Modal, _super);

      function Modal(props) {
        var _this = _super.call(this, props) || this;

        _this.modalRef = /*#__PURE__*/React__namespace.createRef();

        _this.onCloseHandler = function (event) {
          var isTopOverlay = instance.isTopOverlay(_this.modalRef.current);
          closeOnEscapeKeypress(event, isTopOverlay, _this.onOutsideClickHandler);
        };

        _this.element = getWrapperElement();
        _this.state = {
          open: props.open,
          animate: props.open
        };
        _this.onOutsideClickHandler = _this.onOutsideClickHandler.bind(_this);
        return _this;
      }

      Modal.prototype.componentDidMount = function () {
        if (this.props.closeOnEscape) {
          if (this.state.open) {
            instance.add(this.modalRef.current);
          }

          document.addEventListener('keydown', this.onCloseHandler);
        }

        if (this.props.backdropClose) {
          if (this.state.open) {
            instance.add(this.modalRef.current);
          }
        }

        var zIndex = getUpdatedZIndex({
          element: this.element,
          containerClassName: '.Overlay-container',
          elementRef: this.modalRef
        });
        this.setState({
          zIndex: zIndex
        });
      };

      Modal.prototype.componentWillUnmount = function () {
        if (this.props.closeOnEscape) {
          document.removeEventListener('keydown', this.onCloseHandler);
        }
      };

      Modal.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;

        if (prevProps.open !== this.props.open) {
          if (this.props.open) {
            var zIndex = getUpdatedZIndex({
              element: this.element,
              containerClassName: '.Overlay-container--open',
              elementRef: this.modalRef
            });
            this.setState({
              zIndex: zIndex,
              open: true,
              animate: true
            });
            if (this.props.closeOnEscape || this.props.backdropClose) instance.add(this.modalRef.current);
          } else {
            this.setState({
              animate: false
            }, function () {
              window.setTimeout(function () {
                _this.setState({
                  open: false
                });
              }, 120);
            });
            if (this.props.closeOnEscape || this.props.backdropClose) instance.remove(this.modalRef.current);
          }
        }
      };

      Modal.prototype.onOutsideClickHandler = function (event) {
        var _a = this.props,
            closeOnEscape = _a.closeOnEscape,
            backdropClose = _a.backdropClose,
            onClose = _a.onClose;
        var open = this.state.open;

        if (open && instance.isTopOverlay(this.modalRef.current)) {
          if (closeOnEscape || backdropClose) instance.remove(this.modalRef.current);
          if (onClose) onClose(event, 'OutsideClick');else if (typeof backdropClose === 'function') backdropClose(event, 'OutsideClick');
        }
      };

      Modal.prototype.render = function () {
        var _a, _b, _c, _d;

        var _e = this.state,
            animate = _e.animate,
            open = _e.open,
            zIndex = _e.zIndex;
        var _f = this.props,
            className = _f.className,
            backdropClose = _f.backdropClose,
            dimension = _f.dimension,
            children = _f.children,
            headerOptions = _f.headerOptions,
            header = _f.header,
            footerOptions = _f.footerOptions,
            seperator = _f.seperator,
            footer = _f.footer,
            onClose = _f.onClose;
        var BackdropZIndex = zIndex ? zIndex - 1 : 1000;
        var classes = classNames__default["default"]({
          Modal: true,
          'Modal--open': open,
          'Modal-animation--open': animate,
          'Modal-animation--close': !animate
        }, className);
        var headerClass = classNames__default["default"]((_a = {}, _a['Modal-header'] = true, _a['Modal-header--withSeperator'] = seperator, _a));
        var footerClass = classNames__default["default"]((_b = {}, _b['Modal-footer'] = true, _b['Modal-footer--withSeperator'] = seperator, _b));
        var ContainerClass = classNames__default["default"]((_c = {}, _c['Row'] = true, _c['Overlay-container'] = true, _c['Overlay-container--open'] = open, _c));
        var isAPINew = headerOptions || footerOptions || footer || header;
        var bodyClass = classNames__default["default"]((_d = {}, _d['Modal-body'] = true, _d['Modal-body--withMargin'] = isAPINew ? !!footer : true, _d['Modal-body--withPadding'] = isAPINew ? !footer : true, _d));
        var baseProps = extractBaseProps(this.props);
        var sizeMap = {
          small: {
            size: '3',
            sizeL: '4',
            sizeM: '4',
            sizeXS: '10'
          },
          medium: {
            size: '4',
            sizeL: '6',
            sizeM: '6',
            sizeXS: '10'
          },
          large: {
            size: '6',
            sizeL: '8',
            sizeM: '8',
            sizeXS: '10'
          }
        };
        var ModalContainer = /*#__PURE__*/React__namespace.createElement(Row, {
          "data-test": "DesignSystem-ModalContainer",
          className: ContainerClass,
          "data-layer": true,
          "data-opened": open,
          style: {
            zIndex: zIndex ? zIndex : 1001
          }
        }, /*#__PURE__*/React__namespace.createElement(Column, __assign({
          "data-test": "DesignSystem-Modal"
        }, baseProps, {
          className: classes
        }, sizeMap[dimension], {
          ref: this.modalRef
        }), (headerOptions || header) && /*#__PURE__*/React__namespace.createElement("div", {
          className: headerClass
        }, /*#__PURE__*/React__namespace.createElement(Column, null, !header && /*#__PURE__*/React__namespace.createElement(OverlayHeader, __assign({
          "data-test": "DesignSystem-Modal--header"
        }, headerOptions)), !!header && header), /*#__PURE__*/React__namespace.createElement(Column, {
          className: "flex-grow-0"
        }, /*#__PURE__*/React__namespace.createElement(Tooltip, {
          tooltip: "Close",
          position: "bottom"
        }, /*#__PURE__*/React__namespace.createElement(Button, {
          icon: "close",
          appearance: "transparent",
          "data-test": "DesignSystem-Modal--CloseButton",
          onClick: function onClick(event) {
            if (onClose) onClose(event, 'IconClick');
          }
        })))), open && children && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, headerOptions || footerOptions || footer || header ? /*#__PURE__*/React__namespace.createElement(OverlayBody, {
          className: bodyClass
        }, this.props.children) : children), (!!footer || !!footerOptions) && /*#__PURE__*/React__namespace.createElement(OverlayFooter, __assign({
          "data-test": "DesignSystem-Modal--footer"
        }, footerOptions, {
          open: open,
          className: footerClass
        }), footer)));
        var ModalWrapper = backdropClose ? /*#__PURE__*/React__namespace.createElement(OutsideClick, {
          ref: this.modalRef,
          "data-test": "DesignSystem-Modal--OutsideClick",
          onOutsideClick: this.onOutsideClickHandler
        }, ModalContainer) : ModalContainer;
        var WrapperElement = /*#__PURE__*/ReactDOM__namespace.createPortal(ModalWrapper, this.element);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, WrapperElement, /*#__PURE__*/React__namespace.createElement(Backdrop, {
          open: this.state.animate,
          zIndex: BackdropZIndex
        }));
      };

      Modal.defaultProps = {
        dimension: 'medium'
      };
      return Modal;
    }(React__namespace.Component);

    var ModalHeader = function ModalHeader(props) {
      var _a;

      var className = props.className,
          heading = props.heading,
          subHeading = props.subHeading,
          onClose = props.onClose,
          seperator = props.seperator,
          backIcon = props.backIcon,
          backIconCallback = props.backIconCallback;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {
        'Modal-header': true
      }, _a['Modal-header--withSeperator'] = seperator, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes
      }), /*#__PURE__*/React__namespace.createElement(Column, null, /*#__PURE__*/React__namespace.createElement(OverlayHeader, {
        heading: heading,
        subHeading: subHeading,
        backButton: backIcon,
        backButtonCallback: backIconCallback
      })), /*#__PURE__*/React__namespace.createElement(Column, {
        className: "flex-grow-0"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        icon: "close",
        appearance: "transparent",
        "data-test": "DesignSystem-Modal--CloseButton",
        onClick: function onClick(event) {
          if (onClose) onClose(event, 'IconClick');
        }
      })));
    };
    ModalHeader.displayName = 'ModalHeader';

    var ModalBody = function ModalBody(props) {
      var children = props.children,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        'Modal-body': true,
        'Modal-body--withMargin': true
      }, className);
      return /*#__PURE__*/React__namespace.createElement(OverlayBody, __assign({}, baseProps, {
        stickFooter: true,
        className: classes
      }), children);
    };
    ModalBody.defaultProps = {
      stickFooter: true,
      withFooter: true
    };
    ModalBody.displayName = 'ModalBody';

    var ModalFooter = function ModalFooter(props) {
      var _a;

      var open = props.open,
          children = props.children,
          className = props.className,
          seperator = props.seperator;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {}, _a['Modal-footer'] = true, _a['Modal-footer--withSeperator'] = seperator, _a), className);
      return /*#__PURE__*/React__namespace.createElement(OverlayFooter, __assign({}, baseProps, {
        open: open,
        className: classes
      }), children);
    };
    ModalFooter.displayName = 'ModalFooter';

    var FullscreenModal = function (_super) {
      __extends(FullscreenModal, _super);

      function FullscreenModal(props) {
        var _this = _super.call(this, props) || this;

        _this.modalRef = /*#__PURE__*/React__namespace.createRef();

        _this.onOutsideClickHandler = function (event) {
          instance.remove(_this.modalRef.current);

          if (_this.props.onClose) {
            _this.props.onClose(event, 'EscapePress');
          } else {
            _this.setState({
              animate: false
            }, function () {
              window.setTimeout(function () {
                _this.setState({
                  open: false
                });
              }, 120);
            });
          }
        };

        _this.onCloseHandler = function (event) {
          var isTopOverlay = instance.isTopOverlay(_this.modalRef.current);
          closeOnEscapeKeypress(event, isTopOverlay, _this.onOutsideClickHandler);
        };

        _this.element = getWrapperElement();
        _this.state = {
          open: props.open,
          animate: props.open
        };
        return _this;
      }

      FullscreenModal.prototype.componentDidMount = function () {
        if (this.props.closeOnEscape) {
          if (this.state.open) {
            instance.add(this.modalRef.current);
          }

          document.addEventListener('keydown', this.onCloseHandler);
        }
      };

      FullscreenModal.prototype.componentWillUnmount = function () {
        if (this.props.closeOnEscape) document.removeEventListener('keydown', this.onCloseHandler);
      };

      FullscreenModal.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;

        if (prevProps.open !== this.props.open) {
          if (this.props.open) {
            var zIndex = getUpdatedZIndex({
              element: this.element,
              containerClassName: '.Overlay-container--open',
              elementRef: this.modalRef
            });
            this.setState({
              zIndex: zIndex,
              open: true,
              animate: true
            });
            if (this.props.closeOnEscape) instance.add(this.modalRef.current);
          } else {
            this.setState({
              animate: false
            }, function () {
              window.setTimeout(function () {
                _this.setState({
                  open: false
                });
              }, 120);
            });
            if (this.props.closeOnEscape) instance.remove(this.modalRef.current);
          }
        }
      };

      FullscreenModal.prototype.render = function () {
        var _a;

        var _b = this.state,
            animate = _b.animate,
            open = _b.open,
            zIndex = _b.zIndex;
        var _c = this.props,
            className = _c.className,
            dimension = _c.dimension,
            children = _c.children,
            header = _c.header,
            headerOptions = _c.headerOptions,
            footer = _c.footer,
            footerOptions = _c.footerOptions,
            onClose = _c.onClose;
        var classes = classNames__default["default"]({
          FullscreenModal: true,
          'FullscreenModal-animation--open': animate,
          'FullscreenModal-animation--close': !animate
        }, className);
        var ContainerClass = classNames__default["default"]((_a = {}, _a['Overlay-container'] = true, _a['Overlay-container--open'] = open, _a));
        var baseProps = extractBaseProps(this.props);
        var sizeMap = {
          medium: {
            size: '4',
            sizeL: '6',
            sizeM: '6',
            sizeXS: '12'
          },
          large: {
            size: '6',
            sizeL: '8',
            sizeM: '8',
            sizeXS: '12'
          }
        };
        var ModalContainer = open ? /*#__PURE__*/React__namespace.createElement("div", {
          "data-test": "DesignSystem-FullscreenModalContainer",
          className: ContainerClass,
          "data-layer": true,
          style: {
            zIndex: zIndex
          }
        }, /*#__PURE__*/React__namespace.createElement("div", __assign({
          "data-test": "DesignSystem-FullscreenModal"
        }, baseProps, {
          className: classes,
          ref: this.modalRef
        }), /*#__PURE__*/React__namespace.createElement(Row, {
          className: "justify-content-center"
        }, /*#__PURE__*/React__namespace.createElement(Column, __assign({}, sizeMap[dimension]), /*#__PURE__*/React__namespace.createElement(Row, {
          className: "FullscreenModal-header"
        }, /*#__PURE__*/React__namespace.createElement(Column, null, !header && /*#__PURE__*/React__namespace.createElement(OverlayHeader, __assign({
          "data-test": "DesignSystem-FullscreenModal--header"
        }, headerOptions)), !!header && header), /*#__PURE__*/React__namespace.createElement(Column, {
          className: "flex-grow-0"
        }, /*#__PURE__*/React__namespace.createElement(Tooltip, {
          tooltip: "Close"
        }, /*#__PURE__*/React__namespace.createElement(Button, {
          icon: "close",
          appearance: "transparent",
          "data-test": "DesignSystem-FullscreenModal--CloseButton",
          onClick: function onClick(event) {
            if (onClose) onClose(event, 'IconClick');
          }
        })))), /*#__PURE__*/React__namespace.createElement(OverlayBody, {
          "data-test": "DesignSystem-FullscreenModal--Body",
          className: "FullscreenModal-body"
        }, children), (!!footer || !!footerOptions) && /*#__PURE__*/React__namespace.createElement(OverlayFooter, __assign({
          "data-test": "DesignSystem-FullscreenModal--footer"
        }, footerOptions, {
          open: open,
          className: "FullscreenModal-footer"
        }), footer))))) : null;
        var WrapperElement = /*#__PURE__*/ReactDOM__namespace.createPortal(ModalContainer, this.element);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, WrapperElement);
      };

      FullscreenModal.defaultProps = {
        dimension: 'medium'
      };
      return FullscreenModal;
    }(React__namespace.Component);

    var sidesheetWidth = {
      regular: '6',
      large: '10'
    };

    var Sidesheet = function (_super) {
      __extends(Sidesheet, _super);

      function Sidesheet(props) {
        var _this = _super.call(this, props) || this;

        _this.sidesheetRef = /*#__PURE__*/React__namespace.createRef();

        _this.onCloseHandler = function (event) {
          var isTopOverlay = instance.isTopOverlay(_this.sidesheetRef.current);
          closeOnEscapeKeypress(event, isTopOverlay, _this.onOutsideClickHandler);
        };

        _this.element = getWrapperElement();
        _this.state = {
          open: props.open,
          animate: props.open
        };
        _this.onOutsideClickHandler = _this.onOutsideClickHandler.bind(_this);
        return _this;
      }

      Sidesheet.prototype.componentDidMount = function () {
        if (this.props.closeOnEscape) {
          if (this.state.open) {
            instance.add(this.sidesheetRef.current);
          }

          document.addEventListener('keydown', this.onCloseHandler);
        }

        if (this.props.backdropClose && this.state.open) {
          instance.add(this.sidesheetRef.current);
        }

        var zIndex = getUpdatedZIndex({
          element: this.element,
          containerClassName: '.Overlay-container',
          elementRef: this.sidesheetRef
        });
        this.setState({
          zIndex: zIndex
        });
      };

      Sidesheet.prototype.componentWillUnmount = function () {
        if (this.props.closeOnEscape) {
          document.removeEventListener('keydown', this.onCloseHandler);
        }
      };

      Sidesheet.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.open !== this.props.open) {
          if (this.props.open) {
            var zIndex = getUpdatedZIndex({
              element: this.element,
              containerClassName: '.Overlay-container--open',
              elementRef: this.sidesheetRef
            });
            this.setState({
              zIndex: zIndex,
              open: true,
              animate: true
            });
            if (this.props.closeOnEscape || this.props.backdropClose) instance.add(this.sidesheetRef.current);
          } else {
            this.setState({
              animate: false
            });
            if (this.props.closeOnEscape || this.props.backdropClose) instance.remove(this.sidesheetRef.current);
          }
        }
      };

      Sidesheet.prototype.onOutsideClickHandler = function (event) {
        var _a = this.props,
            backdropClose = _a.backdropClose,
            closeOnEscape = _a.closeOnEscape,
            onClose = _a.onClose;
        var open = this.state.open;

        if (open && instance.isTopOverlay(this.sidesheetRef.current)) {
          if (backdropClose || closeOnEscape) instance.remove(this.sidesheetRef.current);
          if (onClose) onClose(event, 'OutsideClick');
        }
      };

      Sidesheet.prototype.handleAnimationEnd = function () {
        if (!this.state.animate) {
          this.setState({
            open: false
          });
        }
      };

      Sidesheet.prototype.render = function () {
        var _a, _b, _c, _d, _e;

        var _this = this;

        var _f = this.state,
            animate = _f.animate,
            open = _f.open,
            zIndex = _f.zIndex;
        var _g = this.props,
            className = _g.className,
            backdropClose = _g.backdropClose,
            dimension = _g.dimension,
            footer = _g.footer,
            seperator = _g.seperator,
            stickFooter = _g.stickFooter,
            headerOptions = _g.headerOptions,
            footerOptions = _g.footerOptions,
            header = _g.header,
            onClose = _g.onClose;
        var BackdropZIndex = zIndex ? zIndex - 1 : 1000;
        var classes = classNames__default["default"]({
          Sidesheet: true,
          'Sidesheet--open': open,
          'Sidesheet-animation--open': animate,
          'Sidesheet-animation--close': !animate
        }, className);
        var ContainerClass = classNames__default["default"]((_a = {}, _a['Overlay-container'] = true, _a['fade-in'] = animate, _a['Overlay-container--open'] = animate, _a['Overlay-container--close'] = !animate, _a));
        var headerClass = classNames__default["default"]((_b = {}, _b['Sidesheet-header'] = true, _b['Sidesheet-header--withSeperator'] = seperator, _b));
        var footerClass = classNames__default["default"]((_c = {}, _c['Sidesheet-footer'] = true, _c['Sidesheet-footer--withSeperator'] = seperator, _c['Sidesheet-footer--stickToBottom'] = stickFooter, _c));
        var bodyClass = classNames__default["default"]((_d = {}, _d['Sidesheet-body'] = true, _d['Sidesheet-body--withMargin'] = !!footer && stickFooter, _d['Sidesheet-body--nextPage'] = (headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backButton) || (headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backIcon), _d['Sidesheet-body--firstPage'] = !(headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backButton) && !(headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backIcon), _d));
        var headingClass = classNames__default["default"]((_e = {}, _e['Sidesheet-header--shiftRight'] = (headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backButton) || (headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backIcon), _e['Sidesheet-header--shiftLeft'] = !(headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backButton) && !(headerOptions === null || headerOptions === void 0 ? void 0 : headerOptions.backIcon), _e));
        var baseProps = extractBaseProps(this.props);
        var SidesheetContainer = /*#__PURE__*/React__namespace.createElement(Row, {
          "data-test": "DesignSystem-SidesheetContainer",
          "data-open": this.state.open,
          className: ContainerClass,
          "data-layer": true,
          style: {
            zIndex: zIndex ? zIndex : 1001
          },
          ref: this.sidesheetRef,
          onAnimationEnd: function onAnimationEnd() {
            return _this.handleAnimationEnd;
          }
        }, /*#__PURE__*/React__namespace.createElement(Column, __assign({
          "data-test": "DesignSystem-Sidesheet"
        }, baseProps, {
          className: classes,
          size: sidesheetWidth[dimension]
        }), /*#__PURE__*/React__namespace.createElement("div", {
          className: headerClass
        }, /*#__PURE__*/React__namespace.createElement(Column, {
          "data-test": "DesignSystem-Sidesheet--Header"
        }, !header && /*#__PURE__*/React__namespace.createElement(OverlayHeader, __assign({
          headingClass: headingClass
        }, headerOptions)), !!header && header), /*#__PURE__*/React__namespace.createElement(Column, {
          className: "flex-grow-0"
        }, /*#__PURE__*/React__namespace.createElement(Tooltip, {
          tooltip: "Close"
        }, /*#__PURE__*/React__namespace.createElement(Button, {
          icon: "close",
          appearance: "transparent",
          "data-test": "DesignSystem-Sidesheet--CloseButton",
          largeIcon: true,
          onClick: function onClick(event) {
            if (onClose) onClose(event, 'IconClick');
          }
        })))), /*#__PURE__*/React__namespace.createElement(OverlayBody, {
          "data-test": "DesignSystem-Sidesheet--OverlayBody",
          className: bodyClass
        }, this.props.children), (!!footer || !!footerOptions) && /*#__PURE__*/React__namespace.createElement(OverlayFooter, __assign({
          "data-test": "DesignSystem-Sidesheet--Footer"
        }, footerOptions, {
          open: open,
          className: footerClass
        }), footer)));
        var SidesheetWrapper = backdropClose ? /*#__PURE__*/React__namespace.createElement(OutsideClick, {
          ref: this.sidesheetRef,
          "data-test": "DesignSystem-Sidesheet--OutsideClick",
          onOutsideClick: this.onOutsideClickHandler
        }, SidesheetContainer) : SidesheetContainer;
        var WrapperElement = /*#__PURE__*/ReactDOM__namespace.createPortal(SidesheetWrapper, this.element);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, WrapperElement, /*#__PURE__*/React__namespace.createElement(Backdrop, {
          open: this.state.animate,
          zIndex: BackdropZIndex
        }));
      };

      Sidesheet.defaultProps = {
        dimension: 'regular',
        stickFooter: false,
        headerOptions: {}
      };
      return Sidesheet;
    }(React__namespace.Component);

    var Collapsible = function Collapsible(props) {
      var _a, _b, _c, _d;

      var expanded = props.expanded,
          hoverable = props.hoverable,
          expandedWidth = props.expandedWidth,
          height = props.height,
          children = props.children,
          className = props.className,
          onToggle = props.onToggle,
          withTrigger = props.withTrigger;

      var _e = React__namespace.useState(true),
          isClicked = _e[0],
          setIsClicked = _e[1];

      var _f = React__namespace.useState(false),
          seperator = _f[0],
          setSeperator = _f[1];

      var ref = /*#__PURE__*/React__namespace.createRef();
      var baseProps = extractBaseProps(props);
      React__namespace.useEffect(function () {
        if (ref.current) {
          setSeperator(ref.current.scrollHeight > ref.current.clientHeight);
        }
      });
      var WrapperClass = classNames__default["default"]((_a = {}, _a['Collapsible-wrapper'] = true, _a['Collapsible-wrapper--overlay'] = !isClicked, _a));
      var BodyClass = classNames__default["default"]((_b = {}, _b['Collapsible-body'] = true, _b['overflow-hidden'] = !expanded && hoverable, _b));
      var classes = classNames__default["default"]((_c = {
        Collapsible: true
      }, _c['Collapsible--overlay'] = !isClicked, _c['Collapsible--shadow'] = !isClicked && expanded, _c), className);
      var FooterClass = classNames__default["default"]((_d = {}, _d['Collapsible-footer'] = true, _d['Collapsible-footer--seperator'] = seperator, _d));

      var onToggleHandler = function onToggleHandler(newExpanded, type) {
        return function () {
          if (onToggle) {
            if (type === 'mouseenter' || type === 'mouseleave') {
              if (isClicked && expanded || !hoverable) return;
              setIsClicked(false);
            }

            if (type === 'click') {
              setIsClicked(true);
            }

            onToggle(newExpanded);
          }
        };
      };

      var width = expanded ? expandedWidth : undefined;
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-CollapsibleWrapper",
        className: WrapperClass,
        style: {
          height: height
        }
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Collapsible"
      }, baseProps, {
        "data-layer": true,
        className: classes,
        style: {
          width: width
        }
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: BodyClass,
        "data-test": "DesignSystem-CollapsibleBody",
        onMouseEnter: onToggleHandler(true, 'mouseenter'),
        onMouseLeave: onToggleHandler(false, 'mouseleave'),
        ref: ref
      }, children), withTrigger && /*#__PURE__*/React__namespace.createElement("div", {
        role: "button",
        tabIndex: 0,
        className: FooterClass,
        "data-test": "DesignSystem-Collapsible--Footer",
        onClick: onToggleHandler(!expanded, 'click'),
        onKeyDown: onToggleHandler(!expanded, 'click')
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        name: expanded ? 'keyboard_arrow_left' : 'keyboard_arrow_right',
        "data-test": "DesignSystem-Collapsible--FooterIcon",
        className: "px-6 py-4 my-2 cursor-pointer",
        size: 16
      }))));
    };
    Collapsible.displayName = 'Collapsible';
    Collapsible.defaultProps = {
      expanded: false,
      hoverable: true,
      height: '100%',
      expandedWidth: '240px',
      withTrigger: true
    };

    var Status$1 = function Status(props) {
      var _a, _b;

      var type = props.type,
          time = props.time,
          className = props.className,
          _c = props.readText,
          readText = _c === void 0 ? 'Read' : _c,
          _d = props.failedText,
          failedText = _d === void 0 ? 'Click to retry' : _d,
          _e = props.sendingText,
          sendingText = _e === void 0 ? 'Sending..' : _e;
      var baseProps = extractBaseProps(props);
      var StatusClass = classNames__default["default"]((_a = {}, _a['d-flex align-items-center mt-3'] = true, _a), className);
      var TextClass = classNames__default["default"]((_b = {}, _b['ChatMessage-status'] = true, _b), className);

      var getTime = function getTime(t) {
        if (typeof t === 'number') {
          var d = new Date(t);
          var hours = d.getHours();
          var minutes = d.getMinutes();
          var AMPM = hours < 12 ? 'AM' : 'PM';
          var hrs = hours % 12 || 12;
          return hrs + ":" + minutes + " " + AMPM;
        }

        return t;
      };

      switch (type) {
        case 'failed':
          return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
            className: StatusClass
          }), /*#__PURE__*/React__namespace.createElement(Icon, {
            name: "error",
            type: "outlined",
            appearance: "destructive"
          }), /*#__PURE__*/React__namespace.createElement(Text, {
            appearance: "destructive",
            size: "small",
            className: "ml-1"
          }, "Failed"), /*#__PURE__*/React__namespace.createElement(MetaList, {
            list: [{
              label: failedText
            }],
            seperator: true
          }));

        case 'urgent':
          return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
            className: StatusClass
          }), /*#__PURE__*/React__namespace.createElement(Icon, {
            name: "notification_important",
            type: "outlined",
            appearance: "destructive"
          }), /*#__PURE__*/React__namespace.createElement(Text, {
            appearance: "destructive",
            size: "small",
            className: "ml-1"
          }, "Urgent"), time && /*#__PURE__*/React__namespace.createElement(MetaList, {
            list: [{
              label: getTime(time)
            }],
            seperator: true
          }));

        case 'read':
          return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
            className: StatusClass
          }), time && /*#__PURE__*/React__namespace.createElement(Text, {
            appearance: "subtle",
            size: "small"
          }, getTime(time)), /*#__PURE__*/React__namespace.createElement(MetaList, {
            list: [{
              label: readText
            }],
            seperator: true
          }));

        case 'sending':
          return /*#__PURE__*/React__namespace.createElement(Text, __assign({}, baseProps, {
            appearance: "subtle",
            size: "small",
            className: TextClass
          }), sendingText);

        case 'sent':
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, time && /*#__PURE__*/React__namespace.createElement(Text, __assign({}, baseProps, {
            appearance: "subtle",
            size: "small",
            className: TextClass
          }), getTime(time)));

        default:
          return null;
      }
    };
    Status$1.displayName = 'Status';

    var Box = function Box(props) {
      var _a;

      var children = props.children,
          type = props.type,
          isTyping = props.isTyping,
          statusType = props.statusType,
          withStatus = props.withStatus,
          onClick = props.onClick,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var MessageClass = classNames__default["default"]((_a = {}, _a['Box'] = true, _a["Box--" + type] = type, _a['Box--typing'] = isTyping, _a['Box--urgent'] = statusType === 'urgent', _a["Box-" + type + "--withStatus"] = withStatus || isTyping, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: MessageClass,
        onClick: onClick,
        "data-test": "DesignSystem-ChatMessage--Box"
      }), children);
    };
    Box.displayName = 'Box';

    var MessageText = function MessageText(props) {
      var text = props.text,
          type = props.type,
          isTyping = props.isTyping,
          typingText = props.typingText,
          statusType = props.statusType,
          className = props.className;
      var baseProps = extractBaseProps(props);

      if (isTyping && type === 'incoming') {
        return /*#__PURE__*/React__namespace.createElement(Text, __assign({}, baseProps, {
          appearance: 'subtle',
          size: 'small',
          className: className
        }), typingText);
      }

      return /*#__PURE__*/React__namespace.createElement(Text, __assign({}, baseProps, {
        className: className,
        appearance: statusType === 'sending' ? 'subtle' : 'default'
      }), text);
    };
    MessageText.defaultProps = {
      text: '',
      typingText: 'Typing..'
    };
    MessageText.displayName = 'MessageText';

    var ChatMessage = function ChatMessage(props) {
      var type = props.type,
          text = props.text,
          isTyping = props.isTyping,
          typingText = props.typingText,
          statusOptions = props.statusOptions,
          onClick = props.onClick,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var statusType = (statusOptions || {}).type;
      return /*#__PURE__*/React__namespace.createElement(Box, __assign({}, baseProps, {
        type: type,
        className: className,
        onClick: onClick,
        isTyping: isTyping,
        statusType: statusType,
        withStatus: statusOptions !== undefined
      }), /*#__PURE__*/React__namespace.createElement(MessageText, {
        type: type,
        text: text,
        typingText: typingText,
        isTyping: isTyping,
        statusType: statusType
      }), !isTyping && statusOptions && /*#__PURE__*/React__namespace.createElement(Status$1, __assign({}, statusOptions)));
    };
    ChatMessage.displayName = 'ChatMessage';

    var EmptyStateContext = /*#__PURE__*/React__namespace.createContext({});

    var imageHeight$1 = {
      standard: '200px',
      compressed: '150px',
      tight: '100px',
      large: '200px',
      small: '200px'
    };

    var EmptyStateImage = function EmptyStateImage(props) {
      var _a, _b;

      var children = props.children,
          maxHeight = props.maxHeight,
          height = props.height,
          minHeight = props.minHeight,
          src = props.src,
          alt = props.alt,
          className = props.className,
          rest = __rest(props, ["children", "maxHeight", "height", "minHeight", "src", "alt", "className"]);

      var contextProp = React__default["default"].useContext(EmptyStateContext);
      var imageClasses = classNames__default["default"]((_a = {}, _a['EmptyState-image'] = true, _a), className);
      var imageWrapperClasses = classNames__default["default"]((_b = {}, _b['d-flex'] = true, _b['justify-content-center'] = true, _b), className);
      var _c = contextProp.size,
          size = _c === void 0 ? 'standard' : _c;
      var sizeStyle = {
        maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : imageHeight$1[size],
        height: height,
        minHeight: minHeight
      };

      if (children) {
        return /*#__PURE__*/React__default["default"].createElement("div", __assign({}, rest, {
          className: imageWrapperClasses,
          style: __assign({}, sizeStyle)
        }), children);
      }

      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, src && /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("img", __assign({
        className: imageClasses,
        src: src,
        alt: alt,
        style: __assign({}, sizeStyle),
        "data-test": "DesignSystem-EmptyState--Img"
      }, rest))));
    };

    var EmptyStateTitle = function EmptyStateTitle(props) {
      var _a;

      var children = props.children,
          className = props.className,
          rest = __rest(props, ["children", "className"]);

      var contextProp = React__default["default"].useContext(EmptyStateContext);
      var _b = contextProp.size,
          size = _b === void 0 ? 'standard' : _b;
      var headingClass = classNames__default["default"]((_a = {}, _a["EmptyState-text"] = true, _a["EmptyState-title--" + size] = true, _a), className);

      if (size === 'standard') {
        return /*#__PURE__*/React__default["default"].createElement(Heading, __assign({
          "data-test": "DesignSystem-EmptyState--Heading",
          className: headingClass
        }, rest), children);
      }

      return /*#__PURE__*/React__default["default"].createElement(Text, __assign({
        "data-test": "DesignSystem-EmptyState--Heading",
        className: headingClass,
        weight: "medium",
        size: textSize[size]
      }, rest), children);
    };

    var EmptyStateDescription = function EmptyStateDescription(props) {
      var _a;

      var children = props.children,
          className = props.className,
          rest = __rest(props, ["children", "className"]);

      var contextProp = React__default["default"].useContext(EmptyStateContext);
      var _b = contextProp.size,
          size = _b === void 0 ? 'standard' : _b;
      var textSize = {
        standard: 'regular',
        compressed: 'regular',
        tight: 'small'
      };
      var descriptionClasses = classNames__default["default"]((_a = {}, _a["EmptyState-text"] = true, _a['mt-3'] = true, _a), className);
      return /*#__PURE__*/React__default["default"].createElement(Text, __assign({
        size: textSize[size],
        appearance: "subtle",
        className: descriptionClasses,
        "data-test": "DesignSystem-EmptyState--Text"
      }, rest), children);
    };

    var EmptyStateActions = function EmptyStateActions(props) {
      var _a;

      var children = props.children,
          className = props.className,
          rest = __rest(props, ["children", "className"]);

      var contextProp = React__default["default"].useContext(EmptyStateContext);
      var _b = contextProp.size,
          size = _b === void 0 ? 'standard' : _b;
      var actionWrapperClasses = classNames__default["default"]((_a = {}, _a["EmptyState-actions--" + size] = true, _a['EmptyState-actions'] = true, _a), className);
      return /*#__PURE__*/React__default["default"].createElement("div", __assign({
        "data-test": "DesignSystem-EmptyState--Actions",
        className: actionWrapperClasses
      }, rest), children);
    };

    var imageHeight = {
      large: '256px',
      small: '128px',
      standard: '256px',
      compressed: '256px',
      tight: '256px'
    };
    var templateWidth = {
      standard: '480px',
      compressed: '400px',
      tight: '320px',
      large: '480px',
      small: '480px'
    };
    var HeadingSize = {
      large: 'l',
      small: 'm',
      standard: 'l',
      compressed: 'l',
      tight: 'l'
    };
    var textSize = {
      large: 'large',
      small: 'regular',
      standard: 'large',
      compressed: 'large',
      tight: 'regular'
    };
    var EmptyState = function EmptyState(props) {
      var _a, _b, _c, _d;

      var imageSrc = props.imageSrc,
          title = props.title,
          description = props.description,
          _e = props.size,
          size = _e === void 0 ? 'standard' : _e,
          children = props.children,
          className = props.className,
          image = props.image,
          maxWidth = props.maxWidth,
          minWidth = props.minWidth,
          width = props.width;
      var baseProps = extractBaseProps(props);
      var templateSize = 'standard';

      var isValidSize = function isValidSize(size) {
        return size === 'large' || size === 'small';
      };

      if (title || description) {
        templateSize = isValidSize(size) ? size : 'large';
      } else {
        templateSize = isValidSize(size) ? 'standard' : size;
      }

      var wrapperClasses = classNames__default["default"]((_a = {}, _a['EmptyState'] = true, _a), className);
      var emptyStateWrapper = classNames__default["default"]((_b = {}, _b['EmptyState-Wrapper'] = true, _b), className);
      var headingClasses = classNames__default["default"]((_c = {}, _c['EmptyState-title'] = true, _c["EmptyState-title--" + templateSize] = true, _c));
      var textClasses = classNames__default["default"]((_d = {}, _d['EmptyState-description'] = true, _d["EmptyState-description--" + templateSize] = children !== undefined, _d));

      if (title || description) {
        return /*#__PURE__*/React__namespace.createElement("div", __assign({
          "data-test": "DesignSystem-EmptyState"
        }, baseProps, {
          className: wrapperClasses
        }), image && /*#__PURE__*/React__namespace.createElement("div", {
          style: {
            height: imageHeight[templateSize]
          }
        }, image), imageSrc && !image && /*#__PURE__*/React__namespace.createElement("img", {
          src: imageSrc,
          height: imageHeight[templateSize],
          "data-test": "DesignSystem-EmptyState--Img"
        }), title && /*#__PURE__*/React__namespace.createElement(Heading, {
          "data-test": "DesignSystem-EmptyState--Heading",
          size: HeadingSize[templateSize],
          className: headingClasses
        }, title), description && /*#__PURE__*/React__namespace.createElement(Text, {
          size: textSize[templateSize],
          className: textClasses,
          appearance: "subtle",
          "data-test": "DesignSystem-EmptyState--Text"
        }, description), children && children);
      }

      var templateMaxWidth = maxWidth ? maxWidth : templateWidth[templateSize];
      var customStyle = {
        maxWidth: templateMaxWidth,
        minWidth: minWidth,
        width: width
      };
      return /*#__PURE__*/React__namespace.createElement(EmptyStateContext.Provider, {
        value: {
          size: templateSize,
          maxWidth: templateMaxWidth
        }
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex justify-content-center align-item-center w-100 h-100"
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-EmptyState--Wrapper",
        className: emptyStateWrapper,
        style: customStyle
      }, baseProps), children)));
    };
    EmptyState.displayName = 'EmptyState';
    EmptyState.Title = EmptyStateTitle;
    EmptyState.Description = EmptyStateDescription;
    EmptyState.Image = EmptyStateImage;
    EmptyState.Actions = EmptyStateActions;
    EmptyState.defaultProps = {
      size: 'standard'
    };

    var ModalDescription = function ModalDescription(props) {
      var title = props.title,
          description = props.description,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        'Modal-description': true
      }, className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-ModalDescription"
      }, baseProps, {
        className: classes
      }), title && /*#__PURE__*/React__namespace.createElement(Text, {
        weight: "strong",
        "data-test": "DesignSystem-ModalDescription--Title"
      }, title), title && description && /*#__PURE__*/React__namespace.createElement("br", null), description && /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-ModalDescription--Description"
      }, description));
    };
    ModalDescription.displayName = 'ModalDescription';

    var Pagination = function Pagination(props) {
      var _a, _b, _c;

      var type = props.type,
          totalPages = props.totalPages,
          onPageChange = props.onPageChange,
          className = props.className,
          pageJumpDebounceDuration = props.pageJumpDebounceDuration;
      var baseProps = extractBaseProps(props);

      var _d = React__namespace.useState(props.page),
          page = _d[0],
          setPage = _d[1];

      var _e = React__namespace.useState(false),
          init = _e[0],
          setInit = _e[1];

      var _f = React__namespace.useState(0),
          debounceCancelCounter = _f[0],
          setDebounceCancelCounter = _f[1];

      var debouncePageChange = React__namespace.useCallback(debounce(pageJumpDebounceDuration, onPageChange), [debounceCancelCounter]);
      React__namespace.useEffect(function () {
        setPage(props.page);
      }, [props.page]);
      var wrapperClass = classNames__default["default"]((_a = {}, _a['Pagination'] = true, _a["Pagination--" + type] = type, _a), className);
      var nextButtonWrapperClass = classNames__default["default"]((_b = {}, _b['Pagination-buttonWrapper'] = true, _b['Pagination-buttonWrapper--next'] = true, _b));
      var prevButtonWrapperClass = classNames__default["default"]((_c = {}, _c['Pagination-buttonWrapper'] = true, _c['Pagination-buttonWrapper--previous'] = true, _c));
      React__namespace.useEffect(function () {
        if (init) {
          if (page >= 1 && page <= totalPages) {
            debouncePageChange(page);
          } else {
            debouncePageChange.cancel();
            setDebounceCancelCounter(function (prev) {
              return prev + 1;
            });
          }
        }
      }, [page]);

      var inputChangeHandler = function inputChangeHandler(e) {
        e.preventDefault();
        var val = +e.target.value.trim();

        if (val >= 0 && val <= totalPages) {
          if (!init) setInit(true);
          setPage(val);
        }
      };

      var onKeyPressHandler = function onKeyPressHandler(e) {
        if (!isNaturalNumber(e.key)) {
          e.preventDefault();
        }
      };

      var onClickHandler = function onClickHandler(buttonType) {
        setInit(true);

        switch (buttonType) {
          case 'first':
            setPage(1);
            break;

          case 'last':
            setPage(totalPages);
            break;

          case 'prev':
            if (page > 1) setPage(page - 1);
            break;

          case 'next':
            if (page < totalPages) setPage(page + 1);
            break;
        }
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Pagination"
      }, baseProps, {
        className: wrapperClass
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: prevButtonWrapperClass
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        onClick: function onClick() {
          return onClickHandler('first');
        },
        disabled: page <= 1,
        appearance: "transparent",
        icon: "first_page",
        "data-test": "DesignSystem-Pagination--FirstButton"
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        onClick: function onClick() {
          return onClickHandler('prev');
        },
        disabled: page <= 1,
        icon: "navigate_before",
        "data-test": "DesignSystem-Pagination--PrevButton",
        className: "ml-4 mr-3"
      })), type === 'jump' && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Pagination-pageIndex"
      }, /*#__PURE__*/React__namespace.createElement(MetricInput, {
        name: "page",
        className: "Pagination-MetricInput",
        onChange: inputChangeHandler,
        value: "" + (isNaturalNumber(page) ? page : ''),
        "data-test": "DesignSystem-Pagination--Input",
        onKeyPress: onKeyPressHandler
      }), /*#__PURE__*/React__namespace.createElement(Text, null, " of " + totalPages + " pages")), /*#__PURE__*/React__namespace.createElement("div", {
        className: nextButtonWrapperClass
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        onClick: function onClick() {
          return onClickHandler('next');
        },
        disabled: page >= totalPages,
        icon: "navigate_next",
        "data-test": "DesignSystem-Pagination--NextButton",
        className: "mr-4 ml-3"
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        onClick: function onClick() {
          return onClickHandler('last');
        },
        disabled: page >= totalPages,
        appearance: "transparent",
        icon: "last_page",
        "data-test": "DesignSystem-Pagination--LastButton"
      })));
    };
    Pagination.displayName = 'Pagination';
    Pagination.defaultProps = {
      type: 'basic',
      page: 1,
      totalPages: 1,
      pageJumpDebounceDuration: 750
    };

    var EditableInput = function EditableInput(props) {
      var _a, _b, _c, _d;

      var error = props.error,
          size = props.size,
          errorMessage = props.errorMessage,
          placeholder = props.placeholder,
          inputOptions = props.inputOptions,
          disableSaveAction = props.disableSaveAction,
          onChange = props.onChange,
          className = props.className;

      var onInputChange = inputOptions.onChange,
          rest = __rest(inputOptions, ["onChange"]);

      var _e = React__namespace.useState(props.value),
          inputValue = _e[0],
          setInputValue = _e[1];

      var _f = React__namespace.useState(props.value),
          value = _f[0],
          setValue = _f[1];

      var _g = React__namespace.useState(false),
          editing = _g[0],
          setEditing = _g[1];

      var _h = React__namespace.useState(false),
          showComponent = _h[0],
          setShowComponent = _h[1];

      var inputRef = /*#__PURE__*/React__namespace.createRef();
      var baseProps = extractBaseProps(props);
      var isControlled = props.value !== undefined;
      React__namespace.useEffect(function () {
        if (isControlled) setValue(props.value);
      }, [props.value]);
      var EditableInputClass = classNames__default["default"]((_a = {}, _a['EditableInput'] = true, _a), className);
      var EditableDefaultClass = classNames__default["default"]((_b = {}, _b['EditableInput-default'] = true, _b["EditableInput-default--" + size] = size, _b));
      var InputClass = classNames__default["default"]((_c = {}, _c['EditableInput-Input--tiny'] = size === 'tiny', _c));
      var ActionClass = classNames__default["default"]((_d = {}, _d['EditableInput-actions'] = true, _d["EditableInput-actions--" + size] = size, _d));

      var setDefaultComponent = function setDefaultComponent(updatedValue) {
        setInputValue(updatedValue);
        setEditing(false);
        setShowComponent(false);
      };

      var onSaveChanges = function onSaveChanges() {
        if (!isControlled) setValue(inputValue);
        if (onChange) onChange(inputValue || '');
        setDefaultComponent(inputValue);
      };

      var onInputChangeHandler = function onInputChangeHandler(e) {
        setInputValue(e.target.value);
        if (onInputChange) onInputChange(e);
      };

      var onChangeHandler = function onChangeHandler(eventType) {
        var _a;

        switch (eventType) {
          case 'edit':
            {
              (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
              setEditing(true);
              setShowComponent(true);
              break;
            }

          case 'hover':
            {
              setShowComponent(true);
              break;
            }

          case 'default':
            {
              setShowComponent(false);
            }
        }
      };

      var inputComponent = /*#__PURE__*/React__namespace.createElement(Input, __assign({
        defaultValue: inputValue,
        placeholder: placeholder,
        className: InputClass,
        autoFocus: editing,
        size: size,
        onChange: onInputChangeHandler,
        error: error && editing,
        ref: inputRef,
        "data-test": "DesignSystem-EditableInput--Input"
      }, rest));

      var onKeyDown = function onKeyDown(event) {
        if (document.activeElement === inputRef.current) {
          switch (event.key) {
            case 'Enter':
              onSaveChanges();
              break;

            case 'Escape':
              setDefaultComponent(value);
              break;
          }
        }
      };

      var renderChildren = function renderChildren() {
        if (showComponent) {
          return error && errorMessage && editing ? /*#__PURE__*/React__namespace.createElement(Popover, {
            trigger: inputComponent,
            position: "right",
            className: "px-6 py-6 d-flex align-items-center",
            on: "hover"
          }, /*#__PURE__*/React__namespace.createElement(InlineMessage, {
            appearance: "alert",
            description: errorMessage
          })) : inputComponent;
        }

        return /*#__PURE__*/React__namespace.createElement("div", {
          className: EditableDefaultClass,
          "data-test": "DesignSystem-EditableInput--Default"
        }, value || placeholder);
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-EditableInput"
      }, baseProps, {
        className: EditableInputClass,
        onKeyDown: onKeyDown
      }), /*#__PURE__*/React__namespace.createElement(Editable, {
        onChange: onChangeHandler,
        editing: editing
      }, renderChildren()), editing && /*#__PURE__*/React__namespace.createElement("div", {
        className: ActionClass,
        "data-test": "DesignSystem-EditableInput--Actions"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        icon: "clear",
        className: "mr-3",
        largeIcon: true,
        size: "tiny",
        onClick: function onClick() {
          setDefaultComponent(value);
        },
        "data-test": "DesignSystem-EditableInput--Discard"
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        icon: "check",
        appearance: "primary",
        largeIcon: true,
        size: "tiny",
        disabled: disableSaveAction,
        onClick: onSaveChanges,
        "data-test": "DesignSystem-EditableInput--Save"
      })));
    };
    EditableInput.defaultProps = {
      size: 'regular',
      placeholder: '',
      inputOptions: {}
    };

    var EditableChipInput = function EditableChipInput(props) {
      var _a, _b, _c, _d;

      var placeholder = props.placeholder,
          onChange = props.onChange,
          className = props.className,
          disableSaveAction = props.disableSaveAction,
          chipInputOptions = props.chipInputOptions;

      var onChipInputChange = chipInputOptions.onChange,
          _e = chipInputOptions.chipOptions,
          chipOptions = _e === void 0 ? {} : _e,
          rest = __rest(chipInputOptions, ["onChange", "chipOptions"]);

      var _onClick = chipOptions.onClick,
          chipObject = __rest(chipOptions, ["onClick"]);

      var _f = React__namespace.useState(props.value),
          inputValue = _f[0],
          setInputValue = _f[1];

      var _g = React__namespace.useState(props.value),
          value = _g[0],
          setValue = _g[1];

      var _h = React__namespace.useState(false),
          showComponent = _h[0],
          setShowComponent = _h[1];

      var baseProps = extractBaseProps(props);
      var isWithChips = inputValue && inputValue.length;
      var isControlled = props.value !== undefined;
      React__namespace.useEffect(function () {
        if (isControlled) {
          setInputValue(props.value);
          setValue(props.value);
        }
      }, [props.value]);
      var classes = classNames__default["default"]((_a = {}, _a['EditableChipInput'] = true, _a), className);
      var actionClass = classNames__default["default"]((_b = {}, _b['EditableChipInput-actions'] = true, _b));
      var defaultClasses = classNames__default["default"]((_c = {}, _c['EditableChipInput-default'] = !isWithChips, _c['EditableChipInput-defaultWithChips'] = isWithChips, _c));
      var inputClass = classNames__default["default"]((_d = {}, _d['EditableChipInput-chipInput'] = true, _d));

      var onChipInputChangeHandler = function onChipInputChangeHandler(val) {
        setInputValue(val);
        if (onChipInputChange) onChipInputChange(val);
      };

      var setDefaultComponent = function setDefaultComponent(updatedValue) {
        setInputValue(updatedValue);
        setShowComponent(false);
      };

      var onSaveChanges = function onSaveChanges() {
        if (!isControlled) setValue(inputValue);
        if (onChange && inputValue) onChange(inputValue);
        setDefaultComponent(inputValue);
      };

      var onChangeHandler = function onChangeHandler(eventType) {
        switch (eventType) {
          case 'edit':
            {
              setShowComponent(true);
              break;
            }

          case 'hover':
            {
              break;
            }

          case 'default':
            {
              setShowComponent(false);
              break;
            }
        }
      };

      var onChipDelete = function onChipDelete(index) {
        if (value) {
          var updatedValue = __spreadArrays(value);

          updatedValue.splice(index, 1);

          if (!isControlled) {
            setInputValue(updatedValue);
            setValue(updatedValue);
          }

          if (onChange) onChange(updatedValue);
        }
      };

      var renderDefaultState = function renderDefaultState() {
        if (inputValue && inputValue.length) {
          return inputValue.map(function (val, index) {
            return /*#__PURE__*/React__namespace.createElement(Chip, __assign({
              "data-test": "DesignSystem-EditableChipInput--Chip",
              key: index,
              name: val,
              label: val,
              className: "my-2 mx-2"
            }, chipObject, {
              onClose: function onClose() {
                return onChipDelete(index);
              },
              onClick: function onClick() {
                return _onClick && _onClick(val, index);
              }
            }));
          });
        }

        return /*#__PURE__*/React__namespace.createElement(Text, {
          className: "pt-1"
        }, placeholder);
      };

      var renderChildren = function renderChildren() {
        if (showComponent) {
          return /*#__PURE__*/React__namespace.createElement("div", {
            "data-test": "DesignSystem-EditableChipInput--wrapper"
          }, /*#__PURE__*/React__namespace.createElement(ChipInput, __assign({
            "data-test": "DesignSystem-EditableChipInput--ChipInput",
            placeholder: placeholder,
            onChange: onChipInputChangeHandler,
            value: inputValue,
            chipOptions: chipOptions
          }, rest, {
            className: inputClass
          })));
        }

        return /*#__PURE__*/React__namespace.createElement("div", {
          className: defaultClasses,
          "data-test": "DesignSystem-EditableChipInput--Default"
        }, renderDefaultState());
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        className: classes,
        "data-test": "DesignSystem-EditableChipInput"
      }, baseProps), /*#__PURE__*/React__namespace.createElement(Editable, {
        onChange: onChangeHandler,
        editing: showComponent
      }, renderChildren()), showComponent && /*#__PURE__*/React__namespace.createElement("div", {
        className: actionClass,
        "data-test": "DesignSystem-EditableChipInput--Actions"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-EditableChipInput--DiscardButton",
        icon: "clear",
        className: "mr-3",
        size: "tiny",
        onClick: function onClick() {
          setDefaultComponent(value);
        }
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-EditableChipInput--SaveButton",
        icon: "check",
        appearance: "primary",
        size: "tiny",
        disabled: disableSaveAction,
        onClick: onSaveChanges
      })));
    };
    EditableChipInput.defaultProps = {
      placeholder: '',
      chipInputOptions: {}
    };

    var ProgressRing = function ProgressRing(props) {
      var _a;

      var size = props.size,
          max = props.max,
          value = props.value,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var radius = 20;
      var circumference = 2 * Math.PI * radius;
      var ProgressRingClass = classNames__default["default"]((_a = {
        Ring: true
      }, _a["Ring--" + size] = size, _a), className);
      var svgProps = {
        viewBox: '0 0 50 50'
      };
      var updatedValue = value > 0 ? Math.min(value, max) * 100 / max : 0;
      var circleProps = {
        cx: 25,
        cy: 25,
        r: radius,
        fill: 'none',
        strokeWidth: '8',
        strokeDasharray: circumference + " " + circumference
      };
      return /*#__PURE__*/React__namespace.createElement("svg", __assign({
        "data-test": "DesignSystem-ProgressRing"
      }, baseProps, {
        className: ProgressRingClass
      }, svgProps), /*#__PURE__*/React__namespace.createElement("circle", __assign({
        className: "Ring-background"
      }, circleProps)), /*#__PURE__*/React__namespace.createElement("circle", __assign({
        className: "Ring-indicator",
        strokeDashoffset: circumference - updatedValue / 100 * circumference
      }, circleProps, {
        "data-test": "DesignSystem-ProgressRing--Circle"
      })));
    };
    ProgressRing.displayName = 'ProgressRing';
    ProgressRing.defaultProps = {
      size: 'regular',
      max: 100
    };

    var Step = function Step(props) {
      var _a;

      var label = props.label,
          value = props.value,
          disabled = props.disabled,
          active = props.active,
          completed = props.completed,
          onChange = props.onChange;
      var StepClass = classNames__default["default"]((_a = {}, _a['Step'] = true, _a['Stepper-animate'] = true, _a['Step--active'] = active, _a['Step--disabled'] = disabled, _a['Step--completed'] = completed, _a));

      var onClickHandle = function onClickHandle() {
        if (disabled) return;
        if (onChange) onChange(label, value);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        if (event.key === 'Enter') {
          onClickHandle();
        }
      };

      var textColor = active ? 'primary-dark' : disabled ? 'inverse-lightest' : 'inverse';
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Step",
        className: StepClass,
        onKeyDown: function onKeyDown(e) {
          return onKeyDownHandler(e);
        },
        onClick: onClickHandle,
        tabIndex: disabled ? -1 : 0
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-Step--Icon",
        name: completed ? 'check_circle' : 'radio_button_unchecked',
        className: "mr-3 my-4 Stepper-animate"
      }), label && /*#__PURE__*/React__namespace.createElement(Text, {
        weight: "medium",
        color: textColor,
        className: "Stepper-animate Stepper-text"
      }, label));
    };
    Step.displayName = 'Step';

    var Stepper = function Stepper(props) {
      var _a;

      var steps = props.steps,
          active = props.active,
          completed = props.completed,
          onChange = props.onChange,
          className = props.className,
          skipIndexes = props.skipIndexes;
      var baseProps = extractBaseProps(props);

      var onChangeHandler = function onChangeHandler(index, stepLabel, stepValue) {
        if (onChange) onChange(index, completed, stepLabel, stepValue);
      };

      var StepperClass = classNames__default["default"]((_a = {}, _a['Stepper'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Stepper"
      }, baseProps, {
        className: StepperClass
      }), steps.map(function (step, index) {
        var label = step.label,
            value = step.value;
        var isSkipped = skipIndexes.includes(index);
        var activeStep = active === index;
        var completedStep = !isSkipped && completed >= index;
        var disabled = !activeStep && !isSkipped && completed + 1 < index;
        return /*#__PURE__*/React__namespace.createElement(Step, {
          key: index,
          label: label,
          value: value,
          active: activeStep,
          completed: completedStep,
          disabled: disabled,
          onChange: function onChange(steplabel, stepvalue) {
            return onChangeHandler(index, steplabel, stepvalue);
          }
        });
      }));
    };
    Stepper.displayName = 'Stepper';
    Stepper.defaultProps = {
      completed: -1,
      active: 0,
      skipIndexes: []
    };

    var Trigger = function Trigger(props) {
      var inputFormat = props.inputFormat,
          startInputOptions = props.startInputOptions,
          endInputOptions = props.endInputOptions,
          validators = props.validators,
          state = props.state,
          setState = props.setState;
      var init = state.init,
          startDate = state.startDate,
          endDate = state.endDate,
          startError = state.startError,
          endError = state.endError;

      var updateNav = function updateNav(type) {
        if (type === 'start') {
          var _a = getDateInfo(startDate),
              year = _a.year,
              month = _a.month;

          setState({
            yearNav: year,
            monthNav: month
          });
        }

        if (type === 'end') {
          var _b = getDateInfo(endDate),
              year = _b.year,
              month = _b.month;

          setState({
            yearNav: year,
            monthNav: month
          });
        }
      };

      var onPasteHandler = function onPasteHandler(_e, val, type) {
        setState({
          open: true
        });

        if (type === 'start') {
          var placeholderChar = startInputOptions.placeholderChar || '_';

          if (val && !val.includes(placeholderChar)) {
            var d = translateToDate(inputFormat, val, validators);

            if (d) {
              setState({
                startDate: d
              });

              if (endDate) {
                var _a = getDateInfo(endDate),
                    eYear = _a.year,
                    eMonth = _a.month,
                    eDate = _a.date;

                if (compareDate(startDate, 'more', eYear, eMonth, eDate)) {
                  setState({
                    endDate: undefined
                  });
                }
              }

              if (startInputOptions.onPaste) startInputOptions.onPaste(_e, val);
            }
          }
        }

        if (type === 'end') {
          var placeholderChar = endInputOptions.placeholderChar ? endInputOptions.placeholderChar : '_';

          if (val && !val.includes(placeholderChar)) {
            var d = translateToDate(inputFormat, val, validators);

            if (d) {
              setState({
                endDate: d
              });
              if (endInputOptions.onPaste) endInputOptions.onPaste(_e, val);
            }
          }
        }
      };

      var onChangeHandler = function onChangeHandler(_e, val, type) {
        setState({
          open: true
        });

        if (type === 'start') {
          var placeholderChar = startInputOptions.placeholderChar || '_';

          if (val && !val.includes(placeholderChar)) {
            var d = translateToDate(inputFormat, val, validators);

            if (d && !isNaN(d.getTime())) {
              setState({
                startDate: d
              });

              if (endDate) {
                var _a = getDateInfo(endDate),
                    eYear = _a.year,
                    eMonth = _a.month,
                    eDate = _a.date;

                if (compareDate(startDate, 'more', eYear, eMonth, eDate)) {
                  setState({
                    endDate: undefined
                  });
                }
              }
            }
          }
        }

        if (type === 'end') {
          var placeholderChar = endInputOptions.placeholderChar ? endInputOptions.placeholderChar : '_';

          if (val && !val.includes(placeholderChar)) {
            var d = translateToDate(inputFormat, val, validators);
            if (d && !isNaN(d.getTime())) setState({
              endDate: d
            });
          }
        }
      };

      var onBlurHandler = function onBlurHandler(_e, val, type) {
        setState({
          init: true
        });
        var hasNumber = /\d/;

        if (type === 'start') {
          var _a = startInputOptions.placeholderChar,
              placeholderChar = _a === void 0 ? '_' : _a;

          if (val && hasNumber.test(val) && val.includes(placeholderChar)) {
            setState({
              startError: true
            });
          } else if (val && !hasNumber.test(val) || !val) {
            setState({
              startError: false
            });
          }

          if (!val || val.includes(placeholderChar)) setState({
            startDate: undefined
          });
        }

        if (type === 'end') {
          var _b = endInputOptions.placeholderChar,
              placeholderChar = _b === void 0 ? '_' : _b;

          if (val && hasNumber.test(val) && val.includes(placeholderChar)) {
            setState({
              endError: true
            });
          } else if (val && !hasNumber.test(val) || !val) {
            setState({
              endError: false
            });
          }

          if (!val || val.includes(placeholderChar)) setState({
            endDate: undefined
          });
        }
      };

      var onClearHandler = function onClearHandler(type) {
        setState({
          init: true
        });

        if (type === 'start') {
          setState({
            startDate: undefined
          });
          updateNav('end');
        }

        if (type === 'end') {
          setState({
            endDate: undefined
          });
          updateNav('start');
        }
      };

      var onClickHandler = function onClickHandler(type) {
        var open = state.open;

        if (!open) {
          updateNav(type);
        }
      };

      var mask = date[inputFormat];
      var startPlaceholderChar = startInputOptions.placeholderChar || '_';
      var endPlaceholderChar = endInputOptions.placeholderChar || '_';
      var showStartError = startInputOptions.error || startInputOptions.required && startError && init;
      var showEndError = endInputOptions.error || endInputOptions.required && endError && init;
      var startErrorMessage = startInputOptions.caption === undefined ? 'Invalid value' : startInputOptions.caption;
      var endErrorMessage = endInputOptions.caption === undefined ? 'Invalid value' : endInputOptions.caption;
      var startLabel = startInputOptions.label;
      var endLabel = endInputOptions.label;

      var inputValidator = function inputValidator(val) {
        return isValid(validators, val, inputFormat);
      };

      return /*#__PURE__*/React__namespace.createElement(Row, {
        "data-test": "DesignSystem-DateRangePicker-InputTrigger"
      }, /*#__PURE__*/React__namespace.createElement(Column, {
        size: '6',
        sizeXS: '12',
        className: "DateRangePicker-input DateRangePicker-input--startDate"
      }, startLabel && /*#__PURE__*/React__namespace.createElement(Label, {
        required: startInputOptions.required,
        withInput: true
      }, startLabel), /*#__PURE__*/React__namespace.createElement(X, __assign({
        icon: "events",
        placeholder: inputFormat
      }, startInputOptions, {
        mask: mask,
        value: startDate ? translateToString(inputFormat, startDate) : init ? X.utils.getDefaultValue(mask, startPlaceholderChar) : '',
        onChange: function onChange(e, val) {
          onChangeHandler(e, val || '', 'start');
        },
        onPaste: function onPaste(e, val) {
          onPasteHandler(e, val || '', 'start');
        },
        onBlur: function onBlur(e, val) {
          onBlurHandler(e, val || '', 'start');
        },
        onClear: function onClear() {
          return onClearHandler('start');
        },
        onClick: function onClick() {
          return onClickHandler('start');
        },
        error: showStartError,
        caption: showStartError ? startErrorMessage : '',
        validators: [inputValidator],
        clearOnEmptyBlur: true
      }))), /*#__PURE__*/React__namespace.createElement(Column, {
        size: '6',
        sizeXS: '12',
        className: "DateRangePicker-input DateRangePicker-input--endDate"
      }, endLabel && /*#__PURE__*/React__namespace.createElement(Label, {
        required: endInputOptions.required,
        withInput: true
      }, endLabel), /*#__PURE__*/React__namespace.createElement(X, __assign({
        icon: "events",
        placeholder: inputFormat
      }, endInputOptions, {
        mask: mask,
        value: endDate ? translateToString(inputFormat, endDate) : init ? X.utils.getDefaultValue(mask, endPlaceholderChar) : '',
        onChange: function onChange(e, val) {
          onChangeHandler(e, val || '', 'end');
        },
        onPaste: function onPaste(e, val) {
          onPasteHandler(e, val || '', 'end');
        },
        onBlur: function onBlur(e, val) {
          onBlurHandler(e, val || '', 'end');
        },
        onClear: function onClear() {
          return onClearHandler('end');
        },
        onClick: function onClick() {
          return onClickHandler('end');
        },
        error: showEndError,
        caption: showEndError ? endErrorMessage : '',
        validators: [inputValidator],
        clearOnEmptyBlur: true
      }))));
    };

    var SingleInputTrigger = function SingleInputTrigger(props) {
      var inputFormat = props.inputFormat,
          inputOptions = props.inputOptions,
          validators = props.validators,
          state = props.state,
          setState = props.setState;
      var init = state.init,
          startDate = state.startDate,
          endDate = state.endDate,
          startValue = state.startValue,
          endValue = state.endValue,
          startError = state.startError,
          endError = state.endError;
      var mask = rangeDate[inputFormat];
      var showError = inputOptions.error || inputOptions.required && (startError || endError) && init;
      var errorMessage = inputOptions.caption === undefined ? 'Invalid value' : inputOptions.caption;
      var label = inputOptions.label;
      var _a = inputOptions.placeholderChar,
          placeholderChar = _a === void 0 ? '_' : _a;
      var defaultValue = X.utils.getDefaultValue(mask, placeholderChar).split(' - ');
      var sValue = startValue || defaultValue[0];
      var eValue = endValue || defaultValue[1];

      var inputValidator = function inputValidator(val) {
        var _a = val.split(' - '),
            startVal = _a[0],
            endVal = _a[1];

        return isValid(validators, startVal, inputFormat) && isValid(validators, endVal, inputFormat);
      };

      var onPasteHandler = function onPasteHandler(_e, val) {
        var onPaste = inputOptions.onPaste;
        var date = val.split(' - ');
        var startVal = date[0];
        var endVal = date[1];
        var endD = translateToDate(inputFormat, endVal, validators);
        var startD = translateToDate(inputFormat, startVal, validators);
        setState({
          startDate: startD,
          endDate: endD,
          startValue: startVal,
          endValue: endVal
        });
        if (onPaste) onPaste(_e, val);
      };

      var onChangeHandler = function onChangeHandler(_e, val) {
        var date = val.split(' - ');
        var startVal = date[0];
        var endVal = date[1];

        if (startValue !== startVal && startVal && !startVal.includes(placeholderChar)) {
          var startD = translateToDate(inputFormat, startVal, validators);

          if (startD) {
            var isEndDateValid = endValue && !endValue.includes(placeholderChar);
            setState({
              startDate: startD,
              endDate: isEndDateValid ? endDate : undefined
            });

            if (endDate) {
              var _a = getDateInfo(endDate),
                  eYear = _a.year,
                  eMonth = _a.month,
                  eDate = _a.date;

              if (compareDate(startDate, 'more', eYear, eMonth, eDate)) {
                setState({
                  endDate: undefined
                });
              }
            }
          }
        }

        if (endValue !== endVal && endVal && !endVal.includes(placeholderChar)) {
          var endD = translateToDate(inputFormat, endVal, validators);
          var isStartDateValid = startValue && !startValue.includes(placeholderChar);

          if (endD) {
            setState({
              endDate: endD,
              startDate: isStartDateValid ? startDate : undefined
            });
          }
        }

        setState({
          startValue: startVal,
          endValue: endVal
        });
      };

      var getErrorState = function getErrorState(currentVal, siblingVal) {
        var hasNumber = /\d/;

        if (currentVal && siblingVal && !currentVal.includes(placeholderChar) && siblingVal.includes(placeholderChar)) {
          return true;
        } else if (currentVal && hasNumber.test(currentVal) && currentVal.includes(placeholderChar)) {
          return true;
        } else if (currentVal && !hasNumber.test(currentVal) || !currentVal) {
          return false;
        }

        return null;
      };

      var onBlurHandler = function onBlurHandler(_e, val) {
        setState({
          init: true
        });
        var date = val.split(' - ');
        var startVal = date[0];
        var endVal = date[1];
        var startErr = getErrorState(startVal, endVal);
        var endErr = getErrorState(endVal, startVal);

        if (startErr !== null && endErr !== null) {
          setState({
            startError: startErr,
            endError: endErr
          });
        }

        if (!startVal || startVal.includes(placeholderChar)) setState({
          startDate: undefined
        });
        if (!endVal || endVal.includes(placeholderChar)) setState({
          endDate: undefined
        });
      };

      var onClearHandler = function onClearHandler() {
        setState({
          init: true,
          startDate: undefined,
          endDate: undefined,
          yearNav: undefined,
          monthNav: undefined
        });
      };

      return /*#__PURE__*/React__namespace.createElement(Row, {
        "data-test": "DesignSystem-DateRangePicker-SingleInputTrigger"
      }, /*#__PURE__*/React__namespace.createElement(Column, null, label && /*#__PURE__*/React__namespace.createElement(Label, {
        required: inputOptions.required,
        withInput: true
      }, label), /*#__PURE__*/React__namespace.createElement(X, __assign({
        icon: "events",
        placeholder: inputFormat + " - " + inputFormat
      }, inputOptions, {
        mask: mask,
        value: !startDate && !endDate && !init ? undefined : sValue + " - " + eValue,
        onChange: function onChange(e, val) {
          onChangeHandler(e, val || '');
        },
        onBlur: function onBlur(e, val) {
          onBlurHandler(e, val || '');
        },
        onPaste: function onPaste(e, val) {
          onPasteHandler(e, val || '');
        },
        onClear: onClearHandler,
        error: showError,
        caption: showError ? errorMessage : '',
        validators: [inputValidator],
        clearOnEmptyBlur: true
      }))));
    };

    var setDate = function setDate(date) {
      var d = new Date();
      return new Date(d.setDate(date));
    };

    var getCurrentYear = function getCurrentYear() {
      var current = new Date();
      var currentYear = current.getFullYear();
      return currentYear;
    };
    var getCurrentMonth = function getCurrentMonth() {
      var current = new Date();
      var currentMonth = current.getMonth();
      return currentMonth;
    };
    var getCurrentWeek = function getCurrentWeek() {
      var current = new Date();
      var currentDate = current.getDate();
      var currentDay = current.getDay();
      return {
        startDate: setDate(currentDate - currentDay + 1),
        endDate: setDate(currentDate - currentDay + 7)
      };
    };
    var getPreviousWeek = function getPreviousWeek() {
      var current = new Date();
      var currentDate = current.getDate();
      var currentDay = current.getDay();
      return {
        startDate: setDate(currentDate - currentDay - 6),
        endDate: setDate(currentDate - currentDay)
      };
    };
    var getPreviousMonth = function getPreviousMonth() {
      var current = new Date();
      var currentYear = current.getFullYear();
      var currentMonth = current.getMonth();
      return {
        endDate: new Date(currentYear, currentMonth, 0),
        startDate: new Date(currentYear - +(currentMonth < 0), (currentMonth + 11) % 12, 1)
      };
    };
    var getPrevious90Days = function getPrevious90Days() {
      var current = new Date();
      var currentDate = current.getDate();
      return {
        startDate: setDate(currentDate - 90),
        endDate: setDate(currentDate)
      };
    };
    var getCustomDates = function getCustomDates() {
      return {
        startDate: '',
        endDate: ''
      };
    };

    var DateRangePicker = function (_super) {
      __extends(DateRangePicker, _super);

      function DateRangePicker(props) {
        var _this = _super.call(this, props) || this;

        _this.getDate = function (startDate, endDate) {
          var inputFormat = _this.props.inputFormat;
          var startVal = startDate ? translateToString(inputFormat, startDate) : '';
          var endVal = endDate ? translateToString(inputFormat, endDate) : '';
          return {
            startValue: startVal,
            endValue: endVal
          };
        };

        _this.getErrors = function (startDate, endDate) {
          var isError = function isError(date) {
            var _a = _this.props,
                disabledBefore = _a.disabledBefore,
                disabledAfter = _a.disabledAfter;

            var _b = getDateInfo(disabledBefore),
                dbYear = _b.year,
                dbMonth = _b.month,
                dbDate = _b.date;

            var _c = getDateInfo(disabledAfter),
                daYear = _c.year,
                daMonth = _c.month,
                daDate = _c.date;

            return !date ? false : compareDate(date, 'less', dbYear, dbMonth, dbDate) || compareDate(date, 'more', daYear, daMonth, daDate);
          };

          var startError = isError(startDate);
          var endError = isError(endDate);

          var _a = getDateInfo(endDate),
              eYear = _a.year,
              eMonth = _a.month,
              eDate = _a.date;

          if (compareDate(startDate, 'more', eYear, eMonth, eDate)) {
            startError = true;
            endError = true;
          }

          return {
            startError: startError,
            endError: endError
          };
        };

        _this.getInRangeError = function () {
          var rangeLimit = _this.props.rangeLimit;

          if (rangeLimit) {
            var _a = _this.state,
                startDate = _a.startDate,
                endDate = _a.endDate;

            var _b = getDateInfo(startDate),
                sYear = _b.year,
                sMonth = _b.month,
                sDate = _b.date;

            var _c = getDateInfo(endDate),
                eYear = _c.year,
                eMonth = _c.month,
                eDate = _c.date;

            var limitDate = void 0;

            if (startDate) {
              limitDate = new Date(startDate);
              limitDate.setDate(sDate + rangeLimit);
              return compareDate(limitDate, 'less', eYear, eMonth, eDate + 1);
            }

            if (endDate) {
              limitDate = new Date(endDate);
              limitDate.setDate(eDate - rangeLimit);
              return compareDate(limitDate, 'more', sYear, sMonth, sDate - 1);
            }
          }

          return false;
        };

        _this.onRangeChangeHandler = function (sDate, eDate) {
          _this.setState({
            init: true,
            startDate: sDate,
            endDate: eDate,
            startValue: sDate ? translateToString(_this.props.inputFormat, sDate) : '',
            endValue: eDate ? translateToString(_this.props.inputFormat, eDate) : ''
          });
        };

        _this.onToggleHandler = function (o, type) {
          var _a = _this.props,
              singleInput = _a.singleInput,
              inputOptions = _a.inputOptions,
              startInputOptions = _a.startInputOptions,
              endInputOptions = _a.endInputOptions;
          var disabled = singleInput ? inputOptions.disabled : startInputOptions.disabled || endInputOptions.disabled;
          if (disabled) return;

          switch (type) {
            case 'outsideClick':
              _this.setState({
                open: o
              });

              break;

            case 'onClick':
              _this.setState({
                open: true
              });

              break;
          }
        };

        var inputFormat = props.inputFormat,
            validators = props.validators;
        var startDate = convertToDate(props.startDate, inputFormat, validators);
        var endDate = convertToDate(props.endDate, inputFormat, validators);

        var _a = _this.getDate(startDate, endDate),
            startValue = _a.startValue,
            endValue = _a.endValue;

        var _b = _this.getErrors(startDate, endDate),
            startError = _b.startError,
            endError = _b.endError;

        _this.state = {
          startDate: startDate,
          endDate: endDate,
          startValue: startValue,
          endValue: endValue,
          startError: startError,
          endError: endError,
          init: false,
          open: props.open || false,
          yearNav: props.yearNav,
          monthNav: props.monthNav
        };
        _this.monthsInView = props.monthsInView || (props.withInput ? 2 : 1);
        return _this;
      }

      DateRangePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.startDate !== this.props.startDate) {
          var _a = this.props,
              inputFormat = _a.inputFormat,
              validators = _a.validators;
          var d = convertToDate(this.props.startDate, inputFormat, validators);
          var val = translateToString(inputFormat, d);
          this.setState({
            startDate: d,
            startValue: val
          });
        }

        if (prevProps.endDate !== this.props.endDate) {
          var _b = this.props,
              inputFormat = _b.inputFormat,
              validators = _b.validators;
          var d = convertToDate(this.props.endDate, inputFormat, validators);
          var val = translateToString(inputFormat, d);
          this.setState({
            endDate: d,
            endValue: val
          });
        }

        if (prevProps.open !== this.props.open) {
          this.setState({
            open: this.props.open || false
          });
        }

        if (prevProps.yearNav !== this.props.yearNav) {
          this.setState({
            yearNav: this.props.yearNav
          });
        }

        if (prevProps.monthNav !== this.props.monthNav) {
          this.setState({
            monthNav: this.props.monthNav
          });
        }

        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
          var _c = this.props,
              onRangeChange = _c.onRangeChange,
              outputFormat = _c.outputFormat;
          var _d = this.state,
              startDate = _d.startDate,
              endDate = _d.endDate;

          var _e = this.getErrors(startDate, endDate),
              startError = _e.startError,
              endError = _e.endError;

          this.setState({
            startError: startError,
            endError: endError
          });

          if (onRangeChange) {
            var inRangeError = this.getInRangeError();
            var sValue = translateToString(outputFormat, startDate);
            var eValue = translateToString(outputFormat, endDate);

            if (!inRangeError && !startError && !endError) {
              if (this.props.allowReverseSelection) {
                if (startDate && endDate) {
                  onRangeChange(startDate, endDate, sValue, eValue);
                }
              } else {
                onRangeChange(startDate, endDate, sValue, eValue);
              }
            } else if (!this.props.allowReverseSelection) {
              if (!startError) onRangeChange(startDate, undefined, sValue, eValue);else if (!endError) onRangeChange(undefined, endDate, sValue, eValue);else onRangeChange(undefined, undefined, sValue, eValue);
            }
          }

          if (this.state.startDate && this.state.endDate) {
            this.setState({
              open: false
            });
          }
        }
      };

      DateRangePicker.prototype.renderCalendar = function () {
        var _a = this.props;
            _a.startDate;
            _a.endDate;
            _a.yearNav;
            _a.monthNav;
            _a.open;
            var inputFormat = _a.inputFormat;
            _a.outputFormat;
            _a.startInputOptions;
            _a.endInputOptions;
            var validators = _a.validators;
            _a.withInput;
            _a.position;
            var disabledBefore = _a.disabledBefore,
            disabledAfter = _a.disabledAfter;
            _a.onRangeChange;
            var rangeLimit = _a.rangeLimit,
            rest = __rest(_a, ["startDate", "endDate", "yearNav", "monthNav", "open", "inputFormat", "outputFormat", "startInputOptions", "endInputOptions", "validators", "withInput", "position", "disabledBefore", "disabledAfter", "onRangeChange", "rangeLimit"]);

        var _b = this.state,
            startDate = _b.startDate,
            endDate = _b.endDate,
            yearNav = _b.yearNav,
            monthNav = _b.monthNav;
        return /*#__PURE__*/React__namespace.createElement(Calendar, __assign({}, rest, {
          monthsInView: this.monthsInView,
          rangePicker: true,
          startDate: convertToDate(startDate, inputFormat, validators),
          endDate: convertToDate(endDate, inputFormat, validators),
          disabledBefore: convertToDate(disabledBefore, inputFormat, validators),
          disabledAfter: convertToDate(disabledAfter, inputFormat, validators),
          onRangeChange: this.onRangeChangeHandler,
          yearNav: yearNav,
          monthNav: monthNav,
          rangeLimit: rangeLimit
        }));
      };

      DateRangePicker.prototype.render = function () {
        var _a;

        var _b = this.props,
            withInput = _b.withInput,
            startInputOptions = _b.startInputOptions,
            endInputOptions = _b.endInputOptions,
            inputOptions = _b.inputOptions,
            inputFormat = _b.inputFormat,
            position = _b.position,
            validators = _b.validators,
            singleInput = _b.singleInput,
            contentAlign = _b.contentAlign,
            children = _b.children;
        var open = this.state.open;
        var RangePickerClass = classNames__default["default"]((_a = {}, _a['DateRangePicker'] = true, _a["DateRangePicker--" + contentAlign] = contentAlign, _a));

        if (withInput) {
          var trigger = singleInput ? /*#__PURE__*/React__namespace.createElement(SingleInputTrigger, {
            inputFormat: inputFormat,
            inputOptions: inputOptions,
            validators: validators,
            state: this.state,
            setState: this.setState.bind(this)
          }) : /*#__PURE__*/React__namespace.createElement(Trigger, {
            inputFormat: inputFormat,
            startInputOptions: startInputOptions,
            endInputOptions: endInputOptions,
            validators: validators,
            state: this.state,
            setState: this.setState.bind(this)
          });
          return /*#__PURE__*/React__namespace.createElement(Popover, {
            trigger: trigger,
            triggerClass: "w-100",
            className: RangePickerClass,
            position: position,
            appendToBody: true,
            open: open,
            onToggle: this.onToggleHandler
          }, children, this.renderCalendar());
        }

        return this.renderCalendar();
      };

      DateRangePicker.utils = {
        getCurrentWeek: getCurrentWeek,
        getPreviousWeek: getPreviousWeek,
        getPreviousMonth: getPreviousMonth,
        getPrevious90Days: getPrevious90Days,
        getCustomDates: getCustomDates,
        getCurrentYear: getCurrentYear,
        getCurrentMonth: getCurrentMonth
      };
      DateRangePicker.defaultProps = __assign(__assign({}, Calendar.defaultProps), {
        children: /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null),
        contentAlign: 'left',
        monthsInView: undefined,
        position: 'bottom-start',
        inputFormat: 'mm/dd/yyyy',
        outputFormat: 'mm/dd/yyyy',
        validators: [date$1],
        inputOptions: {
          label: 'Date'
        },
        startInputOptions: {
          label: 'Start Date'
        },
        endInputOptions: {
          label: 'End Date'
        }
      });
      return DateRangePicker;
    }(React__namespace.Component);

    var TabsWrapper = function TabsWrapper(props) {
      var _a;

      var children = props.children,
          onTabChange = props.onTabChange,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var tabs = Array.isArray(children) ? children : [children];
      var totalTabs = tabs.length;

      var _b = React__namespace.useState(props.active && props.active < totalTabs ? props.active : 0),
          active = _b[0],
          setActiveTab = _b[1];

      React__namespace.useEffect(function () {
        setActiveTab(props.active && props.active < totalTabs ? props.active : 0);
      }, [props.active]);
      var wrapperClass = classNames__default["default"]((_a = {}, _a['TabsWrapper'] = true, _a), className);

      var tabClickHandler = function tabClickHandler(tabIndex) {
        setActiveTab(tabIndex);
        if (onTabChange) onTabChange(tabIndex);
      };

      var TabsHeader = tabs.map(function (child, index) {
        var _a;

        var _b = child.props,
            label = _b.label,
            disabled = _b.disabled;
        var tabHeaderClass = classNames__default["default"]((_a = {}, _a['Tab'] = true, _a['Tab--disabled'] = disabled, _a['Tab--active'] = !disabled && active === index, _a));
        return /*#__PURE__*/React__namespace.createElement("div", {
          "data-test": "DesignSystem-Tabs--Header",
          key: index,
          className: tabHeaderClass,
          onClick: function onClick() {
            return !disabled && tabClickHandler(index);
          }
        }, label);
      });
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-TabsWrapper"
      }, baseProps, {
        className: wrapperClass
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "TabsWrapper-header"
      }, TabsHeader), /*#__PURE__*/React__namespace.createElement("div", {
        className: "TabsWrapper-content",
        "data-test": "DesignSystem-Tabs--Content"
      }, tabs[active]));
    };
    TabsWrapper.displayName = 'TabsWrapper';

    var Tab = function Tab(props) {
      var children = props.children;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, children);
    };
    Tab.displayName = 'Tab';

    var getChildrenArray = function getChildrenArray(children) {
      return Array.isArray(children) ? children : [children];
    };

    var filterTabs = function filterTabs(children) {
      var childrenArray = getChildrenArray(children);
      var tabs = childrenArray.filter(function (element) {
        return typeof element.type === 'function' && element.type.name === Tab.name;
      });
      return tabs;
    };

    var filterInlineComponent = function filterInlineComponent(children) {
      var childrenArray = getChildrenArray(children);
      var inlineComponent = childrenArray.filter(function (element) {
        return !(typeof element.type === 'function' && element.type.name === Tab.name);
      });
      return inlineComponent;
    };

    var Tabs = function Tabs(props) {
      var _a, _b, _c;

      var children = props.children,
          withSeparator = props.withSeparator,
          onTabChange = props.onTabChange,
          className = props.className,
          headerClassName = props.headerClassName;
      var baseProps = extractBaseProps(props);
      var tabRefs = [];
      var tabs = children ? filterTabs(children) : props.tabs;
      var inlineComponent = children ? filterInlineComponent(children) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null);
      var totalTabs = tabs.length;

      var _d = React__namespace.useState(props.activeIndex && props.activeIndex < totalTabs ? props.activeIndex : 0),
          activeIndex = _d[0],
          setActiveTab = _d[1];

      React__namespace.useEffect(function () {
        if (props.activeIndex !== undefined && props.activeIndex < totalTabs) {
          setActiveTab(props.activeIndex);
        }
      }, [props.activeIndex]);
      var wrapperClass = classNames__default["default"]((_a = {}, _a['TabsWrapper'] = true, _a), className);
      var headerClass = classNames__default["default"]((_b = {}, _b['TabsWrapper-header'] = true, _b['TabsWrapper-header--withSeparator'] = withSeparator, _b), className, headerClassName);

      var getPillsClass = function getPillsClass(disabled) {
        var _a;

        return classNames__default["default"]((_a = {}, _a['Tab-pills'] = true, _a['Tab-pills--disabled'] = disabled, _a));
      };

      var getActiveTabClass = function getActiveTabClass() {
        var _a;

        var activeTab;
        var activeTabClass;

        if (tabs && tabs.length && tabs[activeIndex] && 'props' in tabs[activeIndex]) {
          activeTab = tabs[activeIndex];
          activeTabClass = (_a = activeTab.props) === null || _a === void 0 ? void 0 : _a.className;
        } else {
          activeTab = tabs[activeIndex];
          activeTabClass = activeTab && activeTab.className;
        }

        return activeTabClass;
      };

      var activeTabClass = getActiveTabClass();
      var tabContentClass = classNames__default["default"]((_c = {}, _c['TabsWrapper-content'] = true, _c["" + activeTabClass] = activeTabClass, _c));

      var tabClickHandler = function tabClickHandler(tabIndex, isKeyboard) {
        var _a;

        if (props.activeIndex === undefined) {
          setActiveTab(tabIndex);
          if (!isKeyboard) (_a = tabRefs[tabIndex]) === null || _a === void 0 ? void 0 : _a.blur();
        }

        if (onTabChange) onTabChange(tabIndex);
      };

      var tabKeyDownHandler = function tabKeyDownHandler(event, tabIndex) {
        if (event.key === 'Enter') {
          tabClickHandler(tabIndex, true);
        }

        if (event.key === 'ArrowLeft' && tabIndex > 0) {
          var prevElement = tabRefs[tabIndex - 1];
          prevElement === null || prevElement === void 0 ? void 0 : prevElement.focus();
        }

        if (event.key === 'ArrowRight' && tabIndex < tabs.length) {
          var nextElement = tabRefs[tabIndex + 1];
          nextElement === null || nextElement === void 0 ? void 0 : nextElement.focus();
        }
      };

      var renderInfo = function renderInfo(tab, index) {
        var _a;

        var _b = tab,
            count = _b.count,
            icon = _b.icon,
            disabled = _b.disabled,
            iconType = _b.iconType;

        if (count !== undefined) {
          return /*#__PURE__*/React__namespace.createElement(Pills, {
            "data-test": "DesignSystem-Tabs--Pills",
            className: getPillsClass(disabled),
            appearance: activeIndex === index ? 'primary' : 'secondary'
          }, count);
        }

        var iconClass = classNames__default["default"]((_a = {}, _a['Tab-selected'] = !disabled && activeIndex === index, _a));

        if (icon) {
          var iconAppearance = activeIndex === index ? 'info' : disabled ? 'disabled' : 'subtle';
          return /*#__PURE__*/React__namespace.createElement(Icon, {
            "data-test": "DesignSystem-Tabs--Icon",
            className: "mr-4 " + iconClass,
            name: icon,
            type: iconType,
            appearance: iconAppearance
          });
        }

        return null;
      };

      var renderDismissIcon = function renderDismissIcon(tab, index, onDismiss) {
        var _a = tab,
            disabled = _a.disabled,
            label = _a.label;
        var iconAppearance = activeIndex === index ? 'info' : disabled ? 'disabled' : 'subtle';

        var dismissIconClass = function dismissIconClass(disabled) {
          var _a;

          return classNames__default["default"]((_a = {}, _a["DismissibleTab-icon--right"] = true, _a['DismissibleTab-icon--default'] = !disabled && activeIndex !== index, _a["DismissibleTab-icon--selected"] = !disabled && activeIndex === index, _a['cursor-pointer'] = !disabled, _a['Tab-selected'] = !disabled && activeIndex === index, _a));
        };

        var tabInfo = {
          label: label,
          activeIndex: activeIndex,
          currentTabIndex: index
        };

        var onCloseHandler = function onCloseHandler(e) {
          e.stopPropagation();
          if (onDismiss) onDismiss(tabInfo);
        };

        return /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-DismissibleTabs--Icon",
          name: "clear",
          appearance: iconAppearance,
          className: dismissIconClass(disabled),
          onClick: !disabled ? onCloseHandler : undefined,
          tabIndex: disabled ? -1 : 0
        });
      };

      var renderTab = function renderTab(tab, index) {
        var _a;

        var _b = tab,
            _c = _b.label,
            label = _c === void 0 ? '' : _c,
            disabled = _b.disabled,
            isDismissible = _b.isDismissible,
            _d = _b.onDismiss,
            onDismiss = _d === void 0 ? function () {} : _d;

        if (typeof label !== 'string') {
          return label;
        }

        var textAppearance = activeIndex === index ? 'link' : disabled ? 'disabled' : 'subtle';
        var tabTextClass = classNames__default["default"]((_a = {}, _a['Tab-selected'] = !disabled && activeIndex === index, _a));
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, renderInfo(tab, index), /*#__PURE__*/React__namespace.createElement(Text, {
          "data-test": "DesignSystem-Tabs--Text",
          appearance: textAppearance,
          className: tabTextClass
        }, label), isDismissible && renderDismissIcon(tab, index, onDismiss));
      };

      var renderTabs = tabs.map(function (tab, index) {
        var _a;

        var currentTabProp = children && 'props' in tab ? tab.props : tab;
        var disabled = currentTabProp.disabled;
        var tabHeaderClass = classNames__default["default"]((_a = {}, _a['Tab'] = true, _a['Tab--disabled'] = disabled, _a['Tab--active'] = !disabled && activeIndex === index, _a['Tab-selected'] = !disabled && activeIndex === index, _a['align-items-center'] = true, _a));
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(element) {
            return element && !disabled && tabRefs.push(element);
          },
          "data-test": "DesignSystem-Tabs--Tab",
          key: index,
          className: tabHeaderClass,
          onClick: function onClick() {
            return !disabled && tabClickHandler(index);
          },
          onKeyDown: function onKeyDown(event) {
            return tabKeyDownHandler(event, index);
          },
          tabIndex: disabled ? -1 : 0
        }, renderTab(currentTabProp, index));
      });
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-Tabs"
      }, baseProps, {
        className: wrapperClass
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: headerClass,
        "data-test": "DesignSystem-Tabs--Header"
      }, renderTabs, inlineComponent), children && /*#__PURE__*/React__namespace.createElement("div", {
        className: tabContentClass,
        "data-test": "DesignSystem-Tabs--Content"
      }, tabs[activeIndex]));
    };
    Tabs.displayName = 'Tabs';
    Tabs.defaultProps = {
      withSeparator: true,
      tabs: []
    };

    var accepts = function accepts(file, acceptedFiles) {
      if (file && acceptedFiles) {
        var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
        var fileName_1 = file.name || '';
        var mimeType_1 = (file.type || '').toLowerCase();
        var baseMimeType_1 = mimeType_1.replace(/\/.*$/, '');
        return acceptedFilesArray.some(function (type) {
          var validType = type.trim().toLowerCase();

          if (validType.charAt(0) === '.') {
            return fileName_1.toLowerCase().endsWith(validType);
          }

          if (validType.endsWith('/*')) {
            return baseMimeType_1 === validType.replace(/\/.*$/, '');
          }

          return mimeType_1 === validType;
        });
      }

      return true;
    };
    var isPropagationStopped = function isPropagationStopped(event) {
      if (typeof event.isPropagationStopped === 'function') {
        return event.isPropagationStopped();
      }

      if (typeof event.cancelBubble !== 'undefined') {
        return event.cancelBubble;
      }

      return false;
    };
    var isEvtWithFiles = function isEvtWithFiles(event) {
      if (!event.dataTransfer) {
        return !!event.target && !!event.target.files;
      }

      return Array.prototype.some.call(event.dataTransfer.types, function (type) {
        return type === 'Files' || type === 'application/x-moz-file';
      });
    };
    var onDocumentDragOver = function onDocumentDragOver(event) {
      event.preventDefault();
    };
    var composeEventHandlers = function composeEventHandlers() {
      var fns = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
      }

      return function (event) {
        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        return fns.some(function (fn) {
          if (!isPropagationStopped(event) && fn) {
            fn.apply(void 0, __spreadArrays([event], args));
          }

          return isPropagationStopped(event);
        });
      };
    };
    var reducer = function reducer(state, action) {
      switch (action.type) {
        case 'focus':
          return __assign(__assign({}, state), {
            isFocused: true
          });

        case 'blur':
          return __assign(__assign({}, state), {
            isFocused: false
          });

        case 'openDialog':
          return __assign(__assign({}, state), {
            isFileDialogActive: true
          });

        case 'closeDialog':
          return __assign(__assign({}, state), {
            isFileDialogActive: false
          });

        case 'setDraggedFiles':
          var isDragActive = action.isDragActive,
              draggedFiles = action.draggedFiles;
          return __assign(__assign({}, state), {
            draggedFiles: draggedFiles,
            isDragActive: isDragActive
          });

        case 'setFiles':
          return __assign(__assign({}, state), {
            acceptedFiles: action.acceptedFiles,
            fileRejections: action.fileRejections
          });

        case 'reset':
          return __assign(__assign({}, state), {
            isFileDialogActive: false,
            isDragActive: false,
            draggedFiles: [],
            acceptedFiles: [],
            fileRejections: []
          });

        default:
          return state;
      }
    };

    var fileErrorMessages = {
      FILE_INVALID_TYPE: 'File format not accepted',
      FILE_TOO_LARGE: 'File is too large',
      FILE_TOO_SMALL: 'File is too small',
      TOO_MANY_FILES: 'Multiple files are not accepted'
    };

    var isDefined = function isDefined(value) {
      return value !== undefined && value !== null;
    };

    var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr(accept) {
      var updatedAccept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
      var messageSuffix = Array.isArray(updatedAccept) ? "one of " + updatedAccept.join(', ') : updatedAccept;
      return {
        type: 'FILE_INVALID_TYPE',
        message: "File type must be " + messageSuffix
      };
    };
    var getTooLargeRejectionErr = function getTooLargeRejectionErr(maxSize) {
      return {
        type: 'FILE_TOO_LARGE',
        message: "File is larger than " + maxSize + " bytes"
      };
    };
    var getTooSmallRejectionErr = function getTooSmallRejectionErr(minSize) {
      return {
        type: 'FILE_TOO_SMALL',
        message: "File is smaller than " + minSize + " bytes"
      };
    };
    var fileAccepted = function fileAccepted(file, accept) {
      var isAcceptable = file.type === 'application/x-moz-file' || accepts(file, accept);
      return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
    };
    var fileMatchSize = function fileMatchSize(file, minSize, maxSize) {
      if (isDefined(file.size)) {
        if (isDefined(minSize) && isDefined(maxSize)) {
          if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
          if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
        } else if (isDefined(minSize) && file.size < minSize) {
          return [false, getTooSmallRejectionErr(minSize)];
        } else if (isDefined(maxSize) && file.size > maxSize) {
          return [false, getTooLargeRejectionErr(maxSize)];
        }
      }

      return [true, null];
    };
    var getFileError = function getFileError(options) {
      var files = options.files,
          accept = options.accept,
          minSize = options.minSize,
          maxSize = options.maxSize,
          multiple = options.multiple;

      if (!multiple && files.length > 1) {
        return 'TOO_MANY_FILES';
      }

      var typeError = files.every(function (file) {
        var accepted = fileAccepted(file, accept)[0];
        return !accepted;
      });
      var sizeError = files.every(function (file) {
        var sizeMatch = fileMatchSize(file, minSize, maxSize)[0];
        return !sizeMatch;
      });
      return typeError ? 'FILE_INVALID_TYPE' : sizeError ? 'FILE_TOO_LARGE' : '';
    };
    var allFilesAccepted = function allFilesAccepted(options) {
      var files = options.files,
          accept = options.accept,
          minSize = options.minSize,
          maxSize = options.maxSize,
          multiple = options.multiple;

      if (!multiple && files.length > 1) {
        return false;
      }

      return files.every(function (file) {
        var accepted = fileAccepted(file, accept)[0];
        var sizeMatch = fileMatchSize(file, minSize, maxSize)[0];
        return accepted && sizeMatch;
      });
    };

    var COMMON_MIME_TYPES = new Map([['gif', 'image/gif'], ['ico', 'image/x-icon'], ['jpeg', 'image/jpeg'], ['jpg', 'image/jpeg'], ['png', 'image/png'], ['bmp', 'image/bmp'], ['tif', 'image/tiff'], ['tiff', 'image/tiff'], ['apng', 'image/apng'], ['avif', 'image/avif'], ['jfif', 'image/jpeg'], ['pjpeg', 'image/pjpeg'], ['pjp', 'image/jpeg'], ['svg', 'image/svg+xml'], ['webp', 'image/webp'], ['cur', 'image/x-win-bitmap'], ['MTS', 'model/vnd.mts'], ['roq', 'video'], ['f4a', 'video'], ['f4b', 'video'], ['drc', 'video'], ['nsv', 'video'], ['avi', 'video/x-msvideo'], ['mkv', 'video/x-matroska'], ['mov', 'video/quicktime'], ['mp4', 'video/mp4'], ['webm', 'video/webm'], ['flv', 'video/x-flv'], ['vob', 'video/x-ms-vob'], ['ogv', 'video/ogg'], ['ogg', 'application/ogg'], ['gifv', 'image/gif'], ['mng', 'video/x-mng'], ['M2TS', 'video/MP2T'], ['TS', 'video/mp2t'], ['qt', 'video/quicktime'], ['wmv', 'video/x-ms-wmv'], ['yuv', 'application/octet-stream'], ['rm', 'application/vnd.rn-realmedia'], ['rmvb', 'application/vnd.rn-realmedia-vbr'], ['viv', 'video/vnd.vivo'], ['asf', 'video/x-ms-asf'], ['amv', 'video/x-amv'], ['m4v', 'video/x-m4v'], ['mpg', 'video/mpeg'], ['mpeg', 'video/mpeg'], ['mpe', 'video/mpeg'], ['mpv', 'video/mpv'], ['m2v', 'video/mpeg'], ['svi', 'video/x-msvideo'], ['3gp', 'video/3gpp'], ['3g2', 'video/3gpp2'], ['mxf', 'application/mxf'], ['flv', 'video/x-flv'], ['f4v', 'video/x-f4v'], ['f4p', 'video/mp4'], ['aa', 'audio'], ['aax', 'audio'], ['act', 'audio'], ['alac', 'audio'], ['ape', 'audio'], ['awb', 'audio'], ['dss', 'audio'], ['dvf', 'audio'], ['iklax', 'audio'], ['ivs', 'audio'], ['msv', 'audio'], ['nmf', 'audio'], ['mogg', 'audio'], ['raw', 'audio'], ['rf64', 'audio'], ['sln', 'audio'], ['wv', 'audio'], ['8svx', 'audio'], ['3gp', 'audio/3gpp'], ['mp2', 'audio/mpeg'], ['aac', 'audio/x-aac'], ['aiff', 'audio/x-aiff'], ['amr', 'audio/amr'], ['au', 'audio/basic'], ['flac', 'audio/x-flac'], ['gsm', 'audio/gsm'], ['m4a', 'audio/mp4a-latm'], ['m4b', 'audio/mp4a-latm'], ['m4p', 'audio/mp4a-latm'], ['mmf', 'application/vnd.smaf'], ['mp3', 'audio/mpeg'], ['ogg', 'audio/ogg'], ['oga', 'audio/ogg'], ['opus', 'audio/opus'], ['tta', 'audio/x-tta'], ['voc', 'audio/x-voice'], ['wav', 'audio/x-wav'], ['wma', 'audio/x-ms-wma'], ['webm', 'audio/webm'], ['cda ', 'application/x-cdf'], ['ra', 'audio/x-pn-realaudio'], ['vox', 'application/x-authorware-bin'], ['rm', 'application/vnd.rn-realmedia'], ['mpc', 'application/vnd.mophun.certificate'], ['pdf', 'application/pdf'], ['zip', 'application/zip'], ['doc', 'application/msword'], ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], ['xlss', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], ['xls', 'application/vnd.ms-excel'], ['odt', 'application/vnd.oasis.opendocument.text'], ['tex', 'application/x-tex'], ['wpd', 'application/wordperfect'], ['ods', 'application/vnd.oasis.opendocument.spreadsheet'], ['csv', 'text/csv'], ['rtf', 'text/rtf'], ['txt', 'text/plain'], ['tsv', 'text/tab-separated-values']]);
    var FILES_TO_IGNORE = ['.DS_Store', 'Thumbs.db'];
    function fromEvent(evt) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2, isDragEvt(evt) && evt.dataTransfer ? getDataTransferFiles(evt.dataTransfer, evt.type) : getInputFiles(evt)];
        });
      });
    }

    function isDragEvt(value) {
      return !!value.dataTransfer;
    }

    function toFileWithPath(file, path) {
      var f = withMimeType(file);

      if (typeof f.path !== 'string') {
        var webkitRelativePath = file.webkitRelativePath;
        Object.defineProperty(f, 'path', {
          value: typeof path === 'string' ? path : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
          writable: false,
          configurable: false,
          enumerable: true
        });
      }

      return f;
    }

    function withMimeType(file) {
      var name = file.name;
      var hasExtension = name && name.lastIndexOf('.') !== -1;

      if (hasExtension && !file.type) {
        var ext = name.split('.').pop().toLowerCase();
        var type = COMMON_MIME_TYPES.get(ext);

        if (type) {
          Object.defineProperty(file, 'type', {
            value: type,
            writable: false,
            configurable: false,
            enumerable: true
          });
        }
      }

      return file;
    }

    function getInputFiles(evt) {
      var files = isInput(evt.target) ? evt.target.files ? fromList(evt.target.files) : [] : [];
      return files.map(function (file) {
        return toFileWithPath(file);
      });
    }

    function isInput(value) {
      return value !== null;
    }

    function getDataTransferFiles(dt, type) {
      return __awaiter(this, void 0, void 0, function () {
        var items, files;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!dt.items) return [3, 2];
              items = fromList(dt.items).filter(function (item) {
                return item.kind === 'file';
              });

              if (type !== 'drop') {
                return [2, items];
              }

              return [4, Promise.all(items.map(toFilePromises))];

            case 1:
              files = _a.sent();
              return [2, noIgnoredFiles(flatten(files))];

            case 2:
              return [2, noIgnoredFiles(fromList(dt.files).map(function (file) {
                return toFileWithPath(file);
              }))];
          }
        });
      });
    }

    function noIgnoredFiles(files) {
      return files.filter(function (file) {
        return FILES_TO_IGNORE.indexOf(file.name) === -1;
      });
    }

    function fromList(items) {
      var files = [];

      for (var i = 0; i < items.length; i++) {
        var file = items[i];
        files.push(file);
      }

      return files;
    }

    function toFilePromises(item) {
      if (typeof item.webkitGetAsEntry !== 'function') {
        return fromDataTransferItem(item);
      }

      var entry = item.webkitGetAsEntry();

      if (entry && entry.isDirectory) {
        return fromDirEntry(entry);
      }

      return fromDataTransferItem(item);
    }

    function flatten(items) {
      return items.reduce(function (acc, files) {
        return __spreadArrays(acc, Array.isArray(files) ? flatten(files) : [files]);
      }, []);
    }

    function fromDataTransferItem(item) {
      var file = item.getAsFile();

      if (!file) {
        return Promise.reject(item + " is not a File");
      }

      var fwp = toFileWithPath(file);
      return Promise.resolve(fwp);
    }

    function fromEntry(entry) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
        });
      });
    }

    function fromDirEntry(entry) {
      var reader = entry.createReader();
      return new Promise(function (resolve, reject) {
        var entries = [];

        function readEntries() {
          var _this = this;

          reader.readEntries(function (batch) {
            return __awaiter(_this, void 0, void 0, function () {
              var files, err_1, items;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (!!batch.length) return [3, 5];
                    _a.label = 1;

                  case 1:
                    _a.trys.push([1, 3,, 4]);

                    return [4, Promise.all(entries)];

                  case 2:
                    files = _a.sent();
                    resolve(files);
                    return [3, 4];

                  case 3:
                    err_1 = _a.sent();
                    reject(err_1);
                    return [3, 4];

                  case 4:
                    return [3, 6];

                  case 5:
                    items = Promise.all(batch.map(fromEntry));
                    entries.push(items);
                    readEntries();
                    _a.label = 6;

                  case 6:
                    return [2];
                }
              });
            });
          }, function (err) {
            reject(err);
          });
        }

        readEntries();
      });
    }

    function fromFileEntry(entry) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2, new Promise(function (resolve, reject) {
            entry.file(function (file) {
              var fwp = toFileWithPath(file, entry.fullPath);
              resolve(fwp);
            }, function (err) {
              reject(err);
            });
          })];
        });
      });
    }

    var initialState = {
      isFocused: false,
      isFileDialogActive: false,
      isDragActive: false,
      isDragAccept: false,
      isDragReject: false,
      draggedFiles: [],
      acceptedFiles: [],
      fileRejections: []
    };
    var DropzoneBase = function DropzoneBase(props) {
      var accept = props.accept,
          disabled = props.disabled,
          maxSize = props.maxSize,
          minSize = props.minSize,
          multiple = props.multiple,
          onDragEnter = props.onDragEnter,
          onDragLeave = props.onDragLeave,
          onDragOver = props.onDragOver,
          onDrop = props.onDrop,
          onDropAccepted = props.onDropAccepted,
          onDropRejected = props.onDropRejected,
          onFileDialogCancel = props.onFileDialogCancel,
          getFilesFromEvent = props.getFilesFromEvent,
          preventDropOnDocument = props.preventDropOnDocument,
          validator = props.validator;
      var rootRef = React.useRef(null);
      var inputRef = React.useRef(null);

      var _a = React.useReducer(reducer, initialState),
          state = _a[0],
          dispatch = _a[1];

      var isFocused = state.isFocused,
          isFileDialogActive = state.isFileDialogActive,
          draggedFiles = state.draggedFiles;
      var openFileDialog = React.useCallback(function () {
        if (inputRef.current) {
          dispatch({
            type: 'openDialog'
          });
          inputRef.current.value = '';
          inputRef.current.click();
        }
      }, [dispatch]);

      var onWindowFocus = function onWindowFocus() {
        if (isFileDialogActive) {
          setTimeout(function () {
            if (inputRef.current) {
              var files = inputRef.current.files;

              if (!files || !files.length) {
                dispatch({
                  type: 'closeDialog'
                });

                if (typeof onFileDialogCancel === 'function') {
                  onFileDialogCancel();
                }
              }
            }
          }, 300);
        }
      };

      React.useEffect(function () {
        window.addEventListener('focus', onWindowFocus, false);
        return function () {
          window.removeEventListener('focus', onWindowFocus, false);
        };
      }, [inputRef, isFileDialogActive, onFileDialogCancel]);
      var onKeyDownCb = React.useCallback(function (event) {
        if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
          return;
        }

        if (event.keyCode === 32 || event.keyCode === 13) {
          event.preventDefault();
          openFileDialog();
        }
      }, [rootRef, inputRef]);
      var onFocusCb = React.useCallback(function () {
        dispatch({
          type: 'focus'
        });
      }, []);
      var onBlurCb = React.useCallback(function () {
        dispatch({
          type: 'blur'
        });
      }, []);
      var dragTargetsRef = React.useRef([]);

      var onDocumentDrop = function onDocumentDrop(event) {
        if (event.target instanceof HTMLDivElement && rootRef.current && rootRef.current.contains(event.target)) {
          return;
        }

        event.preventDefault();
        dragTargetsRef.current = [];
      };

      React.useEffect(function () {
        if (preventDropOnDocument) {
          document.addEventListener('dragover', onDocumentDragOver, false);
          document.addEventListener('drop', onDocumentDrop, false);
        }

        return function () {
          if (preventDropOnDocument) {
            document.removeEventListener('dragover', onDocumentDragOver);
            document.removeEventListener('drop', onDocumentDrop);
          }
        };
      }, [rootRef, preventDropOnDocument]);
      var onDragEnterCb = React.useCallback(function (event) {
        event.preventDefault();
        event.persist();
        dragTargetsRef.current = __spreadArrays(dragTargetsRef.current, [event.target]);

        if (isEvtWithFiles(event)) {
          Promise.resolve(getFilesFromEvent(event)).then(function (files) {
            if (isPropagationStopped(event)) {
              return;
            }

            dispatch({
              draggedFiles: files,
              isDragActive: true,
              type: 'setDraggedFiles'
            });

            if (onDragEnter) {
              onDragEnter(event);
            }
          });
        }
      }, [getFilesFromEvent, onDragEnter]);
      var onDragOverCb = React.useCallback(function (event) {
        event.preventDefault();
        event.persist();

        if (event.dataTransfer) {
          try {
            event.dataTransfer.dropEffect = 'copy';
          } catch (_a) {}
        }

        if (isEvtWithFiles(event) && onDragOver) {
          onDragOver(event);
        }

        return false;
      }, [onDragOver]);
      var onDragLeaveCb = React.useCallback(function (event) {
        event.preventDefault();
        event.persist();
        var targets = dragTargetsRef.current.filter(function (target) {
          return rootRef.current && rootRef.current.contains(target);
        });
        var targetIdx = targets.indexOf(event.target);

        if (targetIdx !== -1) {
          targets.splice(targetIdx, 1);
        }

        dragTargetsRef.current = targets;

        if (targets.length > 0) {
          return;
        }

        dispatch({
          isDragActive: false,
          type: 'setDraggedFiles',
          draggedFiles: []
        });

        if (isEvtWithFiles(event) && onDragLeave) {
          onDragLeave(event);
        }
      }, [rootRef, onDragLeave]);
      var onDropCb = React.useCallback(function (event) {
        event.preventDefault();
        event.persist();
        dragTargetsRef.current = [];

        if (isEvtWithFiles(event)) {
          Promise.resolve(getFilesFromEvent(event)).then(function (files) {
            if (isPropagationStopped(event)) {
              return;
            }

            var acceptedFiles = [];
            var fileRejections = [];
            files.forEach(function (file) {
              var _a = fileAccepted(file, accept),
                  accepted = _a[0],
                  acceptError = _a[1];

              var _b = fileMatchSize(file, minSize, maxSize),
                  sizeMatch = _b[0],
                  sizeError = _b[1];

              var customErrors = validator ? validator(file) : null;

              if (accepted && sizeMatch && !customErrors) {
                acceptedFiles.push(file);
              } else {
                var errors = [acceptError, sizeError];

                if (customErrors) {
                  errors = errors.concat(customErrors);
                }

                var filteredErrors = errors.filter(function (e) {
                  return e;
                });
                fileRejections.push({
                  file: file,
                  errors: filteredErrors
                });
              }
            });
            dispatch({
              acceptedFiles: acceptedFiles,
              fileRejections: fileRejections,
              type: 'setFiles'
            });

            if (onDrop) {
              onDrop(event, acceptedFiles, fileRejections);
            }

            if (fileRejections.length > 0 && onDropRejected) {
              onDropRejected(event, fileRejections);
            }

            if (acceptedFiles.length > 0 && onDropAccepted) {
              onDropAccepted(event, acceptedFiles);
            }
          });
        }

        dispatch({
          type: 'reset'
        });
      }, [multiple, accept, minSize, maxSize, getFilesFromEvent, onDrop, onDropAccepted, onDropRejected]);

      var composeDragHandler = function composeDragHandler(fn) {
        return disabled ? null : fn;
      };

      var getRootProps = React.useMemo(function () {
        return function (_a) {
          var _b;

          if (_a === void 0) {
            _a = {};
          }

          var _c = _a.refKey,
              refKey = _c === void 0 ? 'ref' : _c;
              _a.onKeyDown;
              _a.onFocus;
              _a.onBlur;
              _a.onClick;
              var onDragEnterCallback = _a.onDragEnterCallback,
              onDragOverCallback = _a.onDragOverCallback,
              onDragLeaveCallback = _a.onDragLeaveCallback,
              onDropCallback = _a.onDropCallback,
              rest = __rest(_a, ["refKey", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnterCallback", "onDragOverCallback", "onDragLeaveCallback", "onDropCallback"]);

          return __assign((_b = {
            onDragEnter: composeDragHandler(composeEventHandlers(onDragEnterCallback, onDragEnterCb)),
            onDragOver: composeDragHandler(composeEventHandlers(onDragOverCallback, onDragOverCb)),
            onDragLeave: composeDragHandler(composeEventHandlers(onDragLeaveCallback, onDragLeaveCb)),
            onDrop: composeDragHandler(composeEventHandlers(onDropCallback, onDropCb))
          }, _b[refKey] = rootRef, _b), rest);
        };
      }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, disabled]);
      var onInputElementClick = React.useCallback(function (event) {
        event.stopPropagation();
      }, []);
      var getInputProps = React.useMemo(function () {
        return function (_a) {
          var _b;

          if (_a === void 0) {
            _a = {};
          }

          var _c = _a.refKey,
              refKey = _c === void 0 ? 'ref' : _c,
              onChange = _a.onChange,
              onClick = _a.onClick,
              rest = __rest(_a, ["refKey", "onChange", "onClick"]);

          var inputProps = (_b = {
            accept: accept,
            multiple: multiple,
            type: 'file',
            style: {
              display: 'none'
            },
            onChange: composeDragHandler(composeEventHandlers(onChange, onDropCb)),
            onClick: composeDragHandler(composeEventHandlers(onClick, onInputElementClick)),
            autoComplete: 'off',
            tabIndex: -1
          }, _b[refKey] = inputRef, _b);
          return __assign(__assign({}, inputProps), rest);
        };
      }, [inputRef, accept, multiple, onDropCb, disabled]);
      var fileCount = draggedFiles.length;
      var isDragAccept = fileCount > 0 && allFilesAccepted({
        accept: accept,
        minSize: minSize,
        maxSize: maxSize,
        multiple: multiple,
        files: draggedFiles
      });
      var isDragReject = fileCount > 0 && !isDragAccept;
      var fileError = isDragReject ? getFileError({
        accept: accept,
        minSize: minSize,
        maxSize: maxSize,
        multiple: multiple,
        files: draggedFiles
      }) : '';
      return __assign(__assign({}, state), {
        isDragAccept: isDragAccept,
        isDragReject: isDragReject,
        getRootProps: getRootProps,
        getInputProps: getInputProps,
        rootRef: rootRef,
        inputRef: inputRef,
        draggedFiles: draggedFiles,
        fileError: fileError,
        isFocused: isFocused && !disabled,
        open: composeDragHandler(openFileDialog)
      });
    };
    DropzoneBase.displayName = 'DropzoneBase';
    DropzoneBase.defaultProps = {
      disabled: false,
      getFilesFromEvent: fromEvent,
      maxSize: Infinity,
      minSize: 0,
      multiple: true,
      preventDropOnDocument: true,
      validator: function validator() {
        return null;
      }
    };

    var svgCode = {
      active: 'M14.6667 53.3333C13.6 53.3333 12.6667 52.9333 11.8667 52.1333C11.0667 51.3333 10.6667 50.4 10.6667 49.3333V39.8H14.6667V49.3333H49.3333V39.8H53.3333V49.3333C53.3333 50.4 52.9333 51.3333 52.1333 52.1333C51.3333 52.9333 50.4 53.3333 49.3333 53.3333H14.6667ZM30 43.1333V18.4L22 26.4L19.1333 23.5333L32 10.6666L44.8667 23.5333L42 26.4L34 18.4V43.1333H30Z',
      "default": 'M14.6667 53.3334C13.6 53.3334 12.6667 52.9334 11.8667 52.1334C11.0667 51.3334 10.6667 50.4 10.6667 49.3334V39.8H14.6667V49.3334H49.3333V39.8H53.3333V49.3334C53.3333 50.4 52.9333 51.3334 52.1333 52.1334C51.3333 52.9334 50.4 53.3334 49.3333 53.3334H14.6667ZM32 43.1334L19.1333 30.2667L22 27.4L30 35.4V10.6667H34V35.4L42 27.4L44.8667 30.2667L32 43.1334Z',
      error: 'M31.9988 45.3334C32.6218 45.3334 33.1444 45.1227 33.5667 44.7012C33.9889 44.2798 34.2 43.7575 34.2 43.1346C34.2 42.5115 33.9893 41.9889 33.5679 41.5667C33.1464 41.1445 32.6242 40.9334 32.0012 40.9334C31.3782 40.9334 30.8555 41.1441 30.4333 41.5655C30.0111 41.987 29.8 42.5092 29.8 43.1322C29.8 43.7552 30.0107 44.2778 30.4321 44.7C30.8536 45.1223 31.3758 45.3334 31.9988 45.3334ZM32.2117 35.1334C32.7817 35.1334 33.2555 34.9417 33.6333 34.5584C34.0111 34.175 34.2 33.7 34.2 33.1334V20.2667C34.2 19.7 34.0072 19.225 33.6217 18.8417C33.2361 18.4584 32.7583 18.2667 32.1883 18.2667C31.6183 18.2667 31.1444 18.4584 30.7667 18.8417C30.3889 19.225 30.2 19.7 30.2 20.2667V33.1334C30.2 33.7 30.3928 34.175 30.7783 34.5584C31.1639 34.9417 31.6417 35.1334 32.2117 35.1334ZM32.0177 58.6667C28.3407 58.6667 24.8851 57.9667 21.6511 56.5667C18.417 55.1667 15.5889 53.2556 13.1667 50.8334C10.7444 48.4111 8.83333 45.5813 7.43333 42.344C6.03333 39.1066 5.33333 35.6475 5.33333 31.9667C5.33333 28.2859 6.03333 24.8268 7.43333 21.5894C8.83333 18.3521 10.7444 15.5334 13.1667 13.1334C15.5889 10.7334 18.4187 8.83337 21.6561 7.43337C24.8934 6.03337 28.3525 5.33337 32.0333 5.33337C35.7142 5.33337 39.1733 6.03337 42.4106 7.43337C45.648 8.83337 48.4667 10.7334 50.8667 13.1334C53.2667 15.5334 55.1667 18.3556 56.5667 21.6C57.9667 24.8445 58.6667 28.3052 58.6667 31.9823C58.6667 35.6594 57.9667 39.1149 56.5667 42.349C55.1667 45.583 53.2667 48.4071 50.8667 50.8211C48.4667 53.2351 45.6444 55.1463 42.4 56.5544C39.1555 57.9626 35.6948 58.6667 32.0177 58.6667Z'
    };

    var DropzoneIcon = function DropzoneIcon(props) {
      var IconStyle = {
        height: 'var(--spacing-5)',
        width: 'var(--spacing-5)'
      };
      return /*#__PURE__*/React__default["default"].createElement("svg", {
        style: IconStyle,
        className: "Dropzone-icon--" + props.type,
        viewBox: "0 0 64 64",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React__default["default"].createElement("path", {
        d: svgCode[props.name],
        className: props.disabled ? 'Dropzone-icon--disabled' : "Dropzone-icon--" + props.name
      }));
    };

    var DropzoneActive = function DropzoneActive(props) {
      var type = props.type;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, type !== 'tight' && /*#__PURE__*/React__namespace.createElement(DropzoneIcon, {
        name: "active",
        type: type
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "link",
        size: "large",
        weight: "strong"
      }, "Drop your files here"));
    };
    DropzoneActive.displayName = 'DropzoneActive';

    var DropzoneError = function DropzoneError(props) {
      var type = props.type,
          error = props.error;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, type !== 'tight' && /*#__PURE__*/React__namespace.createElement(DropzoneIcon, {
        type: type,
        name: "error"
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "destructive",
        size: "large",
        weight: "strong"
      }, error));
    };
    DropzoneError.displayName = 'DropzoneError';

    var Dropzone = function Dropzone(props) {
      var _a, _b;

      var type = props.type,
          sizeLabel = props.sizeLabel,
          className = props.className,
          formatLabel = props.formatLabel,
          sampleFileLink = props.sampleFileLink,
          disabled = props.disabled;

      var _c = DropzoneBase(props),
          open = _c.open,
          getRootProps = _c.getRootProps,
          getInputProps = _c.getInputProps,
          isDragActive = _c.isDragActive,
          isDragReject = _c.isDragReject,
          fileError = _c.fileError;

      var baseProps = extractBaseProps(props);
      var DropzoneClass = classNames__default["default"]((_a = {}, _a['Dropzone'] = true, _a["Dropzone--" + type] = type, _a['Dropzone--disabled'] = disabled, _a['Dropzone--active'] = isDragActive, _a['Dropzone--error'] = isDragReject, _a['Dropzone-animation'] = true, _a['Dropzone-animation--default'] = !isDragActive && type !== 'standard', _a['Dropzone-animation--active'] = isDragActive && !isDragReject && type !== 'standard', _a['Dropzone-standard--default'] = !isDragActive && type === 'standard', _a['Dropzone-standard--active'] = isDragActive && !isDragReject && type === 'standard', _a), className);
      var WrapperClass = classNames__default["default"]((_b = {}, _b['DropzoneWrapper'] = true, _b["DropzoneWrapper--" + type] = true, _b));

      var renderDropzone = function renderDropzone() {
        if (isDragReject) return /*#__PURE__*/React__namespace.createElement(DropzoneError, {
          type: type,
          error: fileErrorMessages[fileError]
        });
        if (isDragActive) return /*#__PURE__*/React__namespace.createElement(DropzoneActive, {
          type: type
        });
        var buttonAccessibilityProps = useAccessibilityProps({
          onClick: open,
          'aria-label': 'Drag your files here or click to select files'
        });
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, type !== 'tight' && /*#__PURE__*/React__namespace.createElement(DropzoneIcon, {
          disabled: disabled,
          name: "default",
          type: type
        }), /*#__PURE__*/React__namespace.createElement("div", {
          className: WrapperClass,
          "data-test": "DesignSystem-Dropzone-Wrapper"
        }, /*#__PURE__*/React__namespace.createElement("span", null, /*#__PURE__*/React__namespace.createElement(Text, {
          size: "large",
          weight: "strong",
          className: "mr-2",
          appearance: disabled ? 'disabled' : 'default'
        }, "Drag your files here or"), /*#__PURE__*/React__namespace.createElement(Text, __assign({
          tabIndex: disabled ? -1 : 0,
          className: "ml-2 cursor-pointer",
          size: "large",
          weight: "strong",
          appearance: disabled ? 'disabled' : 'link'
        }, buttonAccessibilityProps), "browse files"), /*#__PURE__*/React__namespace.createElement("input", __assign({}, getInputProps()))), formatLabel && /*#__PURE__*/React__namespace.createElement(Text, {
          appearance: disabled ? 'disabled' : 'subtle'
        }, formatLabel), sizeLabel && /*#__PURE__*/React__namespace.createElement(Text, {
          appearance: disabled ? 'disabled' : 'subtle'
        }, sizeLabel), sampleFileLink && /*#__PURE__*/React__namespace.createElement("div", {
          className: "mt-5"
        }, sampleFileLink)));
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, getRootProps(), baseProps, {
        className: DropzoneClass,
        "data-test": "DesignSystem-Dropzone"
      }), renderDropzone());
    };
    Dropzone.displayName = 'Dropzone';
    Dropzone.defaultProps = __assign(__assign({}, DropzoneBase.defaultProps), {
      type: 'standard'
    });

    var FileUploaderFormat = function FileUploaderFormat(props) {
      var formatLabel = props.formatLabel;

      if (formatLabel) {
        return /*#__PURE__*/React__namespace.createElement(Text, {
          size: "small",
          appearance: "subtle",
          className: "mt-4"
        }, formatLabel);
      }

      return null;
    };
    FileUploaderFormat.displayName = 'FileUploaderFormat';

    var FileUploaderButton = function FileUploaderButton(props) {
      var _a;

      var accept = props.accept,
          multiple = props.multiple,
          uploadButtonLabel = props.uploadButtonLabel,
          disabled = props.disabled,
          name = props.name,
          className = props.className,
          id = props.id,
          _onChange = props.onChange;
      var baseProps = extractBaseProps(props);
      var FileUploaderButtonClass = classNames__default["default"]((_a = {}, _a['FileUploaderButton'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: FileUploaderButtonClass
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        type: "button",
        disabled: disabled,
        icon: "backup"
      }, uploadButtonLabel), /*#__PURE__*/React__namespace.createElement("input", {
        name: name,
        id: id,
        "data-test": "DesignSystem-FileUploaderButton--Input",
        accept: accept && accept.join(', '),
        multiple: multiple,
        disabled: disabled,
        type: "file",
        tabIndex: -1,
        className: "FileUploaderButton-input",
        onChange: function onChange(event) {
          var fileList = event.target.files ? Array.from(event.target.files) : [];
          if (_onChange) _onChange(fileList, event);
        }
      }));
    };
    FileUploaderButton.defaultProps = {
      uploadButtonLabel: 'Upload files',
      disabled: false,
      multiple: false
    };
    FileUploaderButton.displayName = 'FileUploaderButton';

    var FileUploader = function FileUploader(props) {
      var _a;

      var accept = props.accept,
          multiple = props.multiple,
          disabled = props.disabled,
          title = props.title,
          uploadButtonLabel = props.uploadButtonLabel,
          sizeLabel = props.sizeLabel,
          formatLabel = props.formatLabel,
          sampleFileLink = props.sampleFileLink,
          className = props.className,
          id = props.id,
          name = props.name,
          onChange = props.onChange;
      var baseProps = extractBaseProps(props);
      var FileUploaderClass = classNames__default["default"]((_a = {}, _a['FileUploader'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: FileUploaderClass,
        "data-test": "DesignSystem-FileUploader"
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        weight: "medium"
      }, title), /*#__PURE__*/React__namespace.createElement(FileUploaderFormat, {
        formatLabel: formatLabel
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        size: "small",
        appearance: "subtle",
        className: !formatLabel ? 'mt-4' : ''
      }, sizeLabel), sampleFileLink && /*#__PURE__*/React__namespace.createElement("div", {
        className: "mt-4"
      }, sampleFileLink), /*#__PURE__*/React__namespace.createElement(FileUploaderButton, {
        id: id,
        name: name,
        accept: accept,
        multiple: multiple,
        disabled: disabled,
        uploadButtonLabel: uploadButtonLabel,
        onChange: onChange,
        className: "mt-5"
      }));
    };
    FileUploader.defaultProps = Object.assign({}, FileUploaderButton.defaultProps, {
      title: 'Upload files',
      sizeLabel: 'Maximum size: 25 MB'
    });
    FileUploader.displayName = 'FileUploader';

    var FileUploaderStatus = function FileUploaderStatus(props) {
      var progress = props.progress,
          status = props.status,
          onRetry = props.onRetry;

      switch (status) {
        case 'uploading':
          return /*#__PURE__*/React__namespace.createElement(ProgressRing, {
            size: "small",
            value: progress,
            className: "mr-4"
          });

        case 'error':
          return /*#__PURE__*/React__namespace.createElement(Button, {
            appearance: "transparent",
            size: "regular",
            onClick: onRetry,
            icon: "refresh",
            className: "mr-2"
          });

        default:
          return null;
      }
    };
    FileUploaderStatus.displayName = 'FileUploaderStatus';
    FileUploaderStatus.defaultProps = {
      status: 'completed',
      progress: 0
    };

    var FileUploaderItem = function FileUploaderItem(props) {
      var _a;

      var file = props.file,
          id = props.id,
          status = props.status,
          errorMessage = props.errorMessage,
          progress = props.progress,
          _onClick = props.onClick,
          onDelete = props.onDelete,
          _onRetry = props.onRetry,
          className = props.className;
      var name = file.name;
      var baseProps = extractBaseProps(props);
      var FileItemClass = classNames__default["default"]((_a = {}, _a['FileUploaderItem'] = true, _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        "data-test": "DesignSystem-FileUploader--Item",
        className: FileItemClass,
        onClick: function onClick() {
          return _onClick && _onClick(file, id);
        }
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "FileUploaderItem-file"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: "FileUploaderItem-text",
        appearance: status === 'completed' ? 'default' : 'subtle'
      }, name), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex align-items-center"
      }, /*#__PURE__*/React__namespace.createElement(FileUploaderStatus, {
        file: file,
        id: id,
        status: status,
        progress: progress,
        onRetry: function onRetry() {
          return _onRetry && _onRetry(file, id);
        }
      }), /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-FileUploader--CancelButton",
        appearance: "transparent",
        size: "regular",
        onClick: function onClick() {
          return onDelete && onDelete(file, id);
        },
        icon: "close"
      }))), status === 'error' && /*#__PURE__*/React__namespace.createElement(InlineMessage, {
        size: "small",
        appearance: "alert",
        description: errorMessage
      }));
    };
    FileUploaderItem.defaultProps = {
      status: 'completed',
      progress: 0,
      errorMessage: 'Network Error'
    };
    FileUploaderItem.displayName = 'FileUploaderItem';

    var FileUploaderList = function FileUploaderList(props) {
      var _a;

      var fileList = props.fileList,
          onClick = props.onClick,
          onDelete = props.onDelete,
          onRetry = props.onRetry,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var FileListClass = classNames__default["default"]((_a = {}, _a['FileUploaderList'] = true, _a), className);
      if (fileList.length === 0) return null;
      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: FileListClass,
        "data-test": "DesignSystem-FileUploader--List"
      }), fileList.map(function (fileName, i) {
        return /*#__PURE__*/React__namespace.createElement(FileUploaderItem, __assign({
          key: i,
          onDelete: onDelete,
          onRetry: onRetry,
          onClick: onClick
        }, fileName));
      }));
    };
    FileUploaderList.defaultProps = {
      fileList: []
    };
    FileUploaderList.displayName = 'FileUploaderList';

    var resizeCol = function resizeCol(_a, name, el) {
      var updateColumnSchema = _a.updateColumnSchema;
      var elX = el === null || el === void 0 ? void 0 : el.getBoundingClientRect().x;

      function resizable(ev) {
        ev.preventDefault();

        if (elX) {
          updateColumnSchema(name, {
            width: ev.pageX - elX
          });
        }
      }

      window.addEventListener('mousemove', resizable);
      window.addEventListener('mouseup', function () {
        window.removeEventListener('mousemove', resizable);
      });
    };
    var sortColumn = function sortColumn(_a, name, type) {
      var sortingList = _a.sortingList,
          updateSortingList = _a.updateSortingList;

      var newSortingList = __spreadArrays(sortingList);

      var index = newSortingList.findIndex(function (l) {
        return l.name === name;
      });

      if (index !== -1) {
        newSortingList = __spreadArrays(newSortingList.slice(0, index), newSortingList.slice(index + 1));
      }

      if (type !== 'unsort') newSortingList.push({
        name: name,
        type: type
      });
      updateSortingList(newSortingList);
    };
    var pinColumn = function pinColumn(_a, name, type) {
      var updateColumnSchema = _a.updateColumnSchema;
      var schemaUpdate = {
        pinned: type !== 'unpin' ? type : undefined
      };
      updateColumnSchema(name, schemaUpdate);
    };
    var hideColumn = function hideColumn(_a, name, value) {
      var updateColumnSchema = _a.updateColumnSchema;
      var schemaUpdate = {
        hidden: value
      };
      updateColumnSchema(name, schemaUpdate);
    };
    function getWidth(_a, width) {
      var ref = _a.ref,
          withCheckbox = _a.withCheckbox;
      var isPercent = typeof width === 'string' && width.slice(-1) === '%';

      if (isPercent) {
        var checkboxCell = ref.querySelector('.Grid-cell--checkbox');
        var checkboxWidth = withCheckbox ? (checkboxCell === null || checkboxCell === void 0 ? void 0 : checkboxCell.clientWidth) || 28 : 0;
        var gridWidth = ref.clientWidth - checkboxWidth;
        return gridWidth * (+width.slice(0, -1) / 100);
      }

      return width;
    }
    function getCellSize(cellType) {
      var sizes = {
        AVATAR: {
          minWidth: 48
        },
        AVATAR_WITH_TEXT: {
          width: 256
        },
        AVATAR_WITH_META_LIST: {
          width: 256
        },
        ICON: {
          minWdth: 48
        },
        STATUS_HINT: {
          width: 96
        },
        WITH_META_LIST: {
          width: 176
        },
        DEFAULT: {
          width: 176
        }
      };
      return sizes[cellType];
    }

    var updateBatchData = function updateBatchData(data, rowIndexes, dataUpdate, selectDisabledRow) {
      var updatedData = __spreadArrays(data);

      for (var _i = 0, rowIndexes_1 = rowIndexes; _i < rowIndexes_1.length; _i++) {
        var rowIndex = rowIndexes_1[_i];

        if (data[rowIndex].disabled && selectDisabledRow || !data[rowIndex].disabled) {
          updatedData[rowIndex] = __assign(__assign({}, updatedData[rowIndex]), dataUpdate);
        }
      }

      return updatedData;
    };
    function translateData(schema, data) {
      var newData = __assign({}, data);

      if (schema.translate) {
        var translatedData = schema.translate(data);
        newData[schema.name] = translatedData !== null && _typeof(translatedData) === 'object' ? __assign(__assign({}, newData[schema.name]), translatedData) : translatedData;
      }

      if (newData[schema.name] === null || _typeof(newData[schema.name]) !== 'object') {
        newData[schema.name] = {
          title: newData[schema.name]
        };
      }

      return newData;
    }
    var filterData = function filterData(schema, data, filterList) {
      if (schema === void 0) {
        schema = [];
      }

      if (data === void 0) {
        data = [];
      }

      var filteredData = data;

      if (filterList) {
        Object.keys(filterList).forEach(function (schemaName) {
          var filters = filterList[schemaName];
          var sIndex = schema.findIndex(function (s) {
            return s.name === schemaName;
          });
          var onFilterChange = schema[sIndex].onFilterChange;

          if (filters.length && onFilterChange) {
            filteredData = filteredData.filter(function (d) {
              return onFilterChange(d, filters);
            });
          }
        });
      }

      return filteredData;
    };
    var sortData = function sortData(schema, data, sortingList) {
      if (schema === void 0) {
        schema = [];
      }

      if (data === void 0) {
        data = [];
      }

      var sortedData = __spreadArrays(data);

      sortingList === null || sortingList === void 0 ? void 0 : sortingList.forEach(function (l) {
        var sIndex = schema.findIndex(function (s) {
          return s.name === l.name;
        });

        if (sIndex !== -1) {
          var defaultComparator = function defaultComparator(a, b) {
            var aData = translateData(schema[sIndex], a);
            var bData = translateData(schema[sIndex], b);
            return aData[l.name].title.localeCompare(bData[l.name].title);
          };

          var _a = schema[sIndex].comparator,
              comparator = _a === void 0 ? defaultComparator : _a;
          sortedData.sort(comparator);
          if (l.type === 'desc') sortedData.reverse();
        }
      });
      return sortedData;
    };
    var paginateData = function paginateData(data, page, pageSize) {
      if (data === void 0) {
        data = [];
      }

      var start = (page - 1) * pageSize;
      var end = start + pageSize;
      var paginatedData = data.slice(start, end);
      return paginatedData;
    };

    var moveToIndex = function moveToIndex(arr, from, to) {
      if (from === to) return arr;
      var newArr = arr;

      if (from < to) {
        newArr = __spreadArrays(arr.slice(0, from), arr.slice(from + 1, to + 1), [arr[from]], arr.slice(to + 1));
      } else {
        newArr = __spreadArrays(arr.slice(0, to), [arr[from]], arr.slice(to, from), arr.slice(from + 1));
      }

      return newArr;
    };
    var getTotalPages = function getTotalPages(totalRecords, pageSize) {
      return Math.ceil(totalRecords / pageSize);
    };
    var getSelectAll = function getSelectAll(tableData, selectDisabledRow, clearSelection) {
      if (clearSelection) {
        return {
          indeterminate: false,
          checked: false
        };
      }

      var data = tableData.filter(function (d) {
        return d.disabled && selectDisabledRow || !d.disabled;
      });

      if (data.length) {
        var anyUnSelected = data.some(function (d) {
          return !d._selected;
        });
        var allUnSelected = data.every(function (d) {
          return !d._selected;
        });
        var indeterminate = data.length >= 0 && anyUnSelected && !allUnSelected;
        var checked = !indeterminate && !allUnSelected;
        return {
          indeterminate: indeterminate,
          checked: checked
        };
      }

      return {
        indeterminate: false,
        checked: false
      };
    };
    var hasSchema = function hasSchema(schema) {
      return schema && !!schema.length;
    };
    var getSchema = function getSchema(schema, loading, loaderSchema) {
      var response = schema;

      if (!hasSchema(schema) && loading) {
        response = loaderSchema;
      }

      return response;
    };
    var getPluralSuffix = function getPluralSuffix(count) {
      return count > 1 ? 's' : '';
    };

    var defaultProps$1 = {
      showHead: true,
      loaderSchema: [],
      schema: [],
      data: [],
      totalRecords: 0,
      type: 'data',
      size: 'standard',
      page: 1,
      pageSize: 15,
      loading: false,
      error: false,
      sortingList: [],
      filterList: {},
      showFilters: true
    };

    var context = /*#__PURE__*/React__namespace.createContext(__assign(__assign({}, defaultProps$1), {
      ref: null
    }));
    var GridProvider = context.Provider;

    var HeaderCell = function HeaderCell(props) {
      var context$1 = React__namespace.useContext(context);
      var schema = props.schema,
          setIsDragged = props.setIsDragged,
          colIndex = props.colIndex,
          onSelectAll = props.onSelectAll,
          onMenuChange = props.onMenuChange,
          onFilterChange = props.onFilterChange,
          updateColumnSchema = props.updateColumnSchema,
          reorderColumn = props.reorderColumn;
      var headProps = {
        schema: schema,
        colIndex: colIndex,
        onSelectAll: onSelectAll,
        onMenuChange: onMenuChange,
        onFilterChange: onFilterChange,
        updateColumnSchema: updateColumnSchema,
        reorderColumn: reorderColumn,
        setIsDragged: setIsDragged
      };
      var loading = context$1.loading,
          draggable = context$1.draggable,
          showMenu = context$1.showMenu,
          sortingList = context$1.sortingList,
          filterList = context$1.filterList,
          headCellTooltip = context$1.headCellTooltip,
          showFilters = context$1.showFilters,
          schemaProp = context$1.schema;
      var _a = schema.sorting,
          sorting = _a === void 0 ? true : _a,
          name = schema.name,
          filters = schema.filters,
          pinned = schema.pinned;
      var isValidSchema = hasSchema(schemaProp);
      var listIndex = sortingList.findIndex(function (l) {
        return l.name === name;
      });
      var sorted = listIndex !== -1 ? sortingList[listIndex].type : null;
      var el = /*#__PURE__*/React__namespace.createRef();
      var sortOptions = [{
        label: 'Sort Ascending',
        value: 'sortAsc',
        icon: 'arrow_upward'
      }, {
        label: 'Sort Descending',
        value: 'sortDesc',
        icon: 'arrow_downward'
      }];
      var pinOptions = [{
        label: 'Pin Left',
        value: 'pinLeft',
        icon: 'skip_previous'
      }, {
        label: 'Pin Right',
        value: 'pinRight',
        icon: 'skip_next'
      }];
      var unpinOption = {
        label: 'Unpin',
        value: 'unpin',
        icon: 'replay'
      };
      if (pinned === 'left') pinOptions[0] = unpinOption;
      if (pinned === 'right') pinOptions[1] = unpinOption;
      var hideOptions = [{
        label: 'Hide Column',
        value: 'hide',
        icon: 'cancel'
      }];
      var unsortOption = {
        label: 'Unsort',
        value: 'unsort',
        icon: 'unfold_more'
      };
      if (sorted === 'asc') sortOptions[0] = unsortOption;
      if (sorted === 'desc') sortOptions[1] = unsortOption;

      var options = __spreadArrays(pinOptions, hideOptions);

      if (sorting) options = __spreadArrays(sortOptions, options);
      var classes = classNames__default["default"]({
        'Grid-headCell': true,
        'Grid-headCell--draggable': draggable
      });
      var filterOptions = filters ? filters.map(function (f) {
        return __assign(__assign({}, f), {
          selected: filterList[name] && filterList[name].findIndex(function (fl) {
            return fl === f.value;
          }) !== -1
        });
      }) : [];

      var renderLabel = function renderLabel() {
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Text, {
          weight: "strong",
          className: "ellipsis--noWrap"
        }, schema.displayName), sorting && /*#__PURE__*/React__namespace.createElement("div", {
          className: "Grid-sortingIcons"
        }, sorted ? sorted === 'asc' ? /*#__PURE__*/React__namespace.createElement(Icon, {
          name: "arrow_upward"
        }) : /*#__PURE__*/React__namespace.createElement(Icon, {
          name: "arrow_downward"
        }) : /*#__PURE__*/React__namespace.createElement(Icon, {
          name: "unfold_more"
        })));
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        key: name,
        className: classes,
        ref: el
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-cellContent",
        "data-test": "DesignSystem-Grid-cellContent",
        onClick: function onClick() {
          if (!loading && sorting) {
            if (sorted === 'asc') onMenuChange(name, 'sortDesc');
            if (sorted === 'desc') onMenuChange(name, 'unsort');
            if (!sorted) onMenuChange(name, 'sortAsc');
          }
        }
      }, loading && !isValidSchema ? /*#__PURE__*/React__namespace.createElement(Placeholder, {
        withImage: false
      }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
        length: "medium"
      })) : !schema.headerCellRenderer && headCellTooltip ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
        position: "top-start",
        triggerClass: "w-100 overflow-hidden",
        tooltip: schema.displayName
      }, renderLabel()) : schema.headerCellRenderer && !headCellTooltip ? schema.headerCellRenderer(headProps) : renderLabel()), showFilters && filters && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, loading && !isValidSchema ? /*#__PURE__*/React__namespace.createElement("span", null, /*#__PURE__*/React__namespace.createElement(Placeholder, null)) : /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement(Dropdown, {
        menu: true,
        showApplyButton: true,
        withCheckbox: true,
        triggerOptions: {
          customTrigger: function customTrigger() {
            return /*#__PURE__*/React__namespace.createElement(Button, {
              icon: "filter_list",
              appearance: "transparent"
            });
          }
        },
        options: filterOptions,
        align: 'left',
        onChange: function onChange(selected) {
          return onFilterChange(name, selected);
        },
        minWidth: 176
      }))), showMenu && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, loading && !isValidSchema ? /*#__PURE__*/React__namespace.createElement("span", {
        className: "ml-4"
      }, /*#__PURE__*/React__namespace.createElement(Placeholder, null)) : /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement(Dropdown, {
        key: name + "-" + sorted + "-" + pinned,
        menu: true,
        optionType: "WITH_ICON",
        triggerOptions: {
          customTrigger: function customTrigger() {
            return /*#__PURE__*/React__namespace.createElement(Button, {
              icon: "more_vert_filled",
              appearance: "transparent"
            });
          }
        },
        options: options,
        align: 'left',
        onChange: function onChange(selected) {
          return onMenuChange(name, selected);
        },
        minWidth: 176
      }))), schema.resizable && /*#__PURE__*/React__namespace.createElement("span", {
        className: "Grid-cellResize",
        onMouseDown: function onMouseDown() {
          resizeCol({
            updateColumnSchema: updateColumnSchema
          }, name, el.current);
          setIsDragged(false);
        }
      }));
    };

    var BodyCell = function BodyCell(props) {
      var context$1 = React__namespace.useContext(context);
      var data = props.data,
          schema = props.schema,
          expandedState = props.expandedState,
          rowIndex = props.rowIndex,
          colIndex = props.colIndex,
          nestedRowData = props.nestedRowData;
      var size = context$1.size,
          loading = context$1.loading,
          nestedRows = context$1.nestedRows;
      var expanded = expandedState[0],
          setExpanded = expandedState[1];
      var cellProps = {
        rowIndex: rowIndex,
        colIndex: colIndex,
        size: size,
        schema: schema,
        data: data,
        loading: loading,
        expanded: expanded
      };
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-cellContent"
      }, colIndex === 0 && nestedRows && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, nestedRowData ? /*#__PURE__*/React__namespace.createElement(Icon, {
        className: 'Grid-nestedRowTrigger',
        name: expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
        size: 20,
        appearance: 'default',
        onClick: function onClick(e) {
          if (nestedRowData) {
            e.stopPropagation();
            setExpanded(!expanded);
          }
        }
      }) : /*#__PURE__*/React__namespace.createElement("span", {
        className: "Grid-nestedRowPlaceholder"
      })), schema.cellRenderer ? schema.cellRenderer(cellProps) : /*#__PURE__*/React__namespace.createElement(GridCell, __assign({
        key: rowIndex + "-" + colIndex
      }, cellProps)));
    };

    var Cell = function Cell(props) {
      var context$1 = React__namespace.useContext(context);
      var _a = props,
          isHead = _a.isHead,
          firstCell = _a.firstCell,
          schema = _a.schema,
          data = _a.data,
          rowIndex = _a.rowIndex,
          colIndex = _a.colIndex,
          expandedState = _a.expandedState,
          onSelectAll = _a.onSelectAll,
          onMenuChange = _a.onMenuChange,
          onFilterChange = _a.onFilterChange,
          updateColumnSchema = _a.updateColumnSchema,
          reorderColumn = _a.reorderColumn,
          nestedRowData = _a.nestedRowData;
      var draggable = context$1.draggable,
          separator = context$1.separator,
          nestedRows = context$1.nestedRows,
          ref = context$1.ref,
          withCheckbox = context$1.withCheckbox;
      var name = schema.name,
          hidden = schema.hidden,
          pinned = schema.pinned,
          _b = schema.cellType,
          cellType = _b === void 0 ? 'DEFAULT' : _b;

      var _c = getCellSize(cellType),
          width = _c.width,
          _d = _c.minWidth,
          minWidth = _d === void 0 ? 96 : _d,
          _e = _c.maxWidth,
          maxWidth = _e === void 0 ? 800 : _e;

      var _f = React__namespace.useState(false),
          isDragged = _f[0],
          setIsDragged = _f[1];

      var cellClass = classNames__default["default"]({
        'Grid-cell': true,
        'Grid-cell--head': isHead,
        'Grid-cell--dragged': isDragged && draggable,
        'Grid-cell--body': !isHead,
        'Grid-cell--separator': !firstCell && (schema.separator !== undefined ? schema.separator : separator),
        'Grid-cell--nestedRow': !isHead && colIndex === 0 && nestedRows
      });
      if (hidden) return null;
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: rowIndex + "-" + colIndex,
        className: cellClass,
        draggable: isHead && draggable,
        onDragStart: function onDragStart(e) {
          if (draggable) {
            setIsDragged(true);
            e.dataTransfer.setData('name', name);
            if (pinned) e.dataTransfer.setData('type', pinned);
          }
        },
        onDrag: function onDrag() {
          setIsDragged(false);
        },
        onDragOver: function onDragOver(e) {
          return e.preventDefault();
        },
        onMouseUpCapture: function onMouseUpCapture() {
          setIsDragged(false);
        },
        onDragEnd: function onDragEnd(e) {
          e.preventDefault();
          setIsDragged(false);
        },
        onDrop: function onDrop(e) {
          if (draggable) {
            setIsDragged(false);
            var from = {
              name: e.dataTransfer.getData('name'),
              type: e.dataTransfer.getData('type')
            };
            var to = {
              name: name,
              type: pinned || ''
            };
            if (from.type === to.type && reorderColumn) reorderColumn(from.name, to.name);
          }
        },
        style: {
          width: getWidth({
            ref: ref,
            withCheckbox: withCheckbox
          }, schema.width || width),
          minWidth: getWidth({
            ref: ref,
            withCheckbox: withCheckbox
          }, schema.minWidth || minWidth),
          maxWidth: getWidth({
            ref: ref,
            withCheckbox: withCheckbox
          }, schema.maxWidth || maxWidth)
        }
      }, isHead ? /*#__PURE__*/React__namespace.createElement(HeaderCell, {
        colIndex: colIndex,
        schema: schema,
        onSelectAll: onSelectAll,
        onMenuChange: onMenuChange,
        onFilterChange: onFilterChange,
        updateColumnSchema: updateColumnSchema,
        reorderColumn: reorderColumn,
        setIsDragged: setIsDragged
      }) : /*#__PURE__*/React__namespace.createElement(BodyCell, {
        rowIndex: rowIndex,
        colIndex: colIndex,
        data: data,
        schema: schema,
        expandedState: expandedState,
        nestedRowData: nestedRowData
      }));
    };

    var GridHead = function GridHead(props) {
      var context$1 = React__namespace.useContext(context);
      var schema = props.schema,
          onSelectAll = props.onSelectAll,
          onMenuChange = props.onMenuChange,
          onFilterChange = props.onFilterChange,
          updateColumnSchema = props.updateColumnSchema,
          reorderColumn = props.reorderColumn;
      var withCheckbox = context$1.withCheckbox,
          loading = context$1.loading,
          selectAll = context$1.selectAll;
      var pinnedSchema = schema.filter(function (s) {
        return !s.hidden && s.pinned;
      });
      var leftPinnedSchema = pinnedSchema.filter(function (s) {
        return !s.hidden && s.pinned === 'left';
      });
      var rightPinnedSchema = pinnedSchema.filter(function (s) {
        return !s.hidden && s.pinned === 'right';
      });
      var unpinnedSchema = schema.filter(function (s) {
        return !s.hidden && !s.pinned;
      });

      var renderCheckbox = function renderCheckbox(show) {
        if (!show || !withCheckbox) return null;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "Grid-cell Grid-cell--head Grid-cell--checkbox"
        }, loading ? /*#__PURE__*/React__namespace.createElement(Placeholder, null) : /*#__PURE__*/React__namespace.createElement(Checkbox, __assign({}, selectAll, {
          onChange: onSelectAll
        })));
      };

      var renderSchema = function renderSchema(currSchema, shouldRenderCheckbox, pinned) {
        var _a;

        if (currSchema.length) {
          var classes = classNames__default["default"]((_a = {
            'Grid-cellGroup': true,
            'Grid-cellGroup--pinned': pinned
          }, _a["Grid-cellGroup--pinned-" + pinned] = pinned, _a['Grid-cellGroup--main'] = !pinned, _a));
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: classes
          }, renderCheckbox(shouldRenderCheckbox), currSchema.map(function (s, index) {
            var cI = pinned === 'left' ? index : leftPinnedSchema.length + index;
            if (pinned === 'right') cI += unpinnedSchema.length;
            return /*#__PURE__*/React__namespace.createElement(Cell, {
              key: "" + cI,
              firstCell: !index,
              colIndex: cI,
              isHead: true,
              schema: s,
              onSelectAll: onSelectAll,
              onMenuChange: onMenuChange,
              onFilterChange: onFilterChange,
              updateColumnSchema: updateColumnSchema,
              reorderColumn: reorderColumn
            });
          }));
        }

        return null;
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-head",
        "data-test": "DesignSystem-GridHead-wrapper"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-row Grid-row--head"
      }, renderSchema(leftPinnedSchema, !!leftPinnedSchema.length, 'left'), renderSchema(unpinnedSchema, !leftPinnedSchema.length && !!unpinnedSchema.length), renderSchema(rightPinnedSchema, false, 'right')));
    };

    var GridNestedRow = function GridNestedRow(props) {
      var context$1 = React__namespace.useContext(context);
      var schema = context$1.schema,
          loading = context$1.loading,
          nestedRowRenderer = context$1.nestedRowRenderer;
      var data = props.data,
          rowIndex = props.rowIndex,
          expanded = props.expanded;
      if (nestedRowRenderer) return nestedRowRenderer({
        data: data,
        schema: schema,
        loading: loading,
        rowIndex: rowIndex,
        expanded: expanded
      });
      return null;
    };

    var GridRow = function GridRow(props) {
      var context$1 = React__namespace.useContext(context);
      var type = context$1.type,
          onRowClick = context$1.onRowClick,
          loading = context$1.loading,
          withCheckbox = context$1.withCheckbox,
          nestedRows = context$1.nestedRows;
      var schema = props.schema,
          data = props.data,
          rI = props.rowIndex,
          onSelect = props.onSelect,
          className = props.className;
      var rowRef = React__namespace.useRef(null);

      var _a = React__namespace.useState(false),
          expanded = _a[0],
          setExpanded = _a[1];

      var rowClasses = classNames__default["default"]('Grid-row', 'Grid-row--body', {
        'Grid-row--selected': data._selected,
        'Grid-row--disabled': data.disabled
      });
      var onClickHandler = React__namespace.useCallback(function () {
        if (type === 'resource' && !loading) {
          if (onRowClick) {
            onRowClick(data, rI);
          }
        }
      }, [data, rI]);
      var pinnedSchema = schema.filter(function (s) {
        return !s.hidden && s.pinned;
      });
      var leftPinnedSchema = pinnedSchema.filter(function (s) {
        return !s.hidden && s.pinned === 'left';
      });
      var rightPinnedSchema = pinnedSchema.filter(function (s) {
        return !s.hidden && s.pinned === 'right';
      });
      var unpinnedSchema = schema.filter(function (s) {
        return !s.hidden && !s.pinned;
      });
      var nestedProps = {
        data: data,
        rowIndex: rI,
        expanded: expanded
      };
      var nestedRowData = GridNestedRow(nestedProps);

      var renderCheckbox = function renderCheckbox(show) {
        if (!show || !withCheckbox) return null;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "Grid-cell Grid-cell--body Grid-cell--checkbox",
          onClick: function onClick(e) {
            return e.stopPropagation();
          }
        }, loading ? /*#__PURE__*/React__namespace.createElement(Placeholder, null) : /*#__PURE__*/React__namespace.createElement(Checkbox, {
          checked: !!data._selected,
          onChange: function onChange(event) {
            onSelect(rI, event.target.checked);
          }
        }));
      };

      var renderSchema = function renderSchema(currSchema, shouldRenderCheckbox, pinned) {
        var _a;

        if (currSchema.length) {
          var classes = classNames__default["default"]((_a = {
            'Grid-cellGroup': true,
            'Grid-cellGroup--pinned': pinned
          }, _a["Grid-cellGroup--pinned-" + pinned] = pinned, _a['Grid-cellGroup--main'] = !pinned, _a));
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: classes,
            "data-test": "DesignSystem-Grid-cellGroup"
          }, renderCheckbox(shouldRenderCheckbox), currSchema.map(function (s, index) {
            var cI = pinned === 'left' ? index : leftPinnedSchema.length + index;
            if (pinned === 'right') cI += unpinnedSchema.length;
            return /*#__PURE__*/React__namespace.createElement(Cell, {
              key: rI + "-" + cI,
              rowIndex: rI,
              colIndex: cI,
              firstCell: !index,
              schema: s,
              data: data,
              expandedState: [expanded, setExpanded],
              nestedRowData: nestedRowData
            });
          }));
        }

        return null;
      };

      var wrapperClasses = classNames__default["default"](className, {
        'Grid-rowWrapper': true
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: wrapperClasses
      }, /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Grid-row",
        className: rowClasses,
        onClick: onClickHandler,
        ref: rowRef
      }, renderSchema(leftPinnedSchema, !!leftPinnedSchema.length, 'left'), renderSchema(unpinnedSchema, !leftPinnedSchema.length && !!unpinnedSchema.length), renderSchema(rightPinnedSchema, false, 'right')), nestedRows && expanded && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-nestedRow"
      }, nestedRowData));
    };
    GridRow.defaultProps = {
      data: {}
    };

    var GridBody = function GridBody(props) {
      var context$1 = React__namespace.useContext(context);
      var data = context$1.data,
          ref = context$1.ref,
          loading = context$1.loading,
          error = context$1.error,
          withPagination = context$1.withPagination,
          page = context$1.page,
          pageSize = context$1.pageSize,
          totalRecords = context$1.totalRecords,
          errorTemplate = context$1.errorTemplate;

      if (!loading && error) {
        return errorTemplate ? typeof errorTemplate === 'function' ? errorTemplate({}) : errorTemplate : null;
      }

      var schema = props.schema,
          prevPageInfo = props.prevPageInfo,
          updatePrevPageInfo = props.updatePrevPageInfo,
          onSelect = props.onSelect;
      React__namespace.useEffect(function () {
        var gridBodyEl = ref.querySelector('.Grid-body');

        if (gridBodyEl) {
          window.requestAnimationFrame(function () {
            if (prevPageInfo.page === page) {
              gridBodyEl.scrollTop = prevPageInfo.scrollTop;
            }
          });
        }

        return function () {
          if (gridBodyEl) {
            updatePrevPageInfo({
              page: page,
              scrollTop: gridBodyEl.scrollTop
            });
          }
        };
      }, []);
      var totalPages = Math.ceil(totalRecords / pageSize);
      var isLastPage = withPagination && page === totalPages;
      var dataLength = isLastPage ? totalRecords - (page - 1) * pageSize : loading ? pageSize : withPagination ? Math.min(totalRecords, pageSize) : totalRecords;

      var renderRow = function renderRow(rowIndex, item) {
        return /*#__PURE__*/React__namespace.createElement(GridRow, {
          key: rowIndex,
          rowIndex: rowIndex,
          data: !item ? data[rowIndex] : item,
          schema: schema,
          onSelect: onSelect
        });
      };

      var getArrayList = function getArrayList() {
        if (loading && !data.length) {
          return __spreadArrays(Array(dataLength).map(function (x) {
            return x;
          }));
        }

        return data;
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Grid-body"
      }, getArrayList().map(function (item, i) {
        return renderRow(i, item);
      }));
    };

    var Grid = function (_super) {
      __extends(Grid, _super);

      function Grid(props) {
        var _this = _super.call(this, props) || this;

        _this.gridRef = null;
        _this.isHeadSyncing = false;
        _this.isBodySyncing = false;

        _this.syncScroll = function (type) {
          return function () {
            var gridHeadEl = _this.gridRef.querySelector('.Grid-head');

            var gridBodyEl = _this.gridRef.querySelector('.Grid-body');

            if (type === 'head') {
              if (!_this.isHeadSyncing) {
                _this.isBodySyncing = true;
                gridBodyEl.scrollLeft = gridHeadEl.scrollLeft;
              }

              _this.isHeadSyncing = false;
            }

            if (type === 'body') {
              if (!_this.isBodySyncing) {
                _this.isHeadSyncing = true;
                gridHeadEl.scrollLeft = gridBodyEl.scrollLeft;
              }

              _this.isBodySyncing = false;
            }
          };
        };

        _this.updateRenderedSchema = function (newSchema) {
          var updateSchema = _this.props.updateSchema;

          if (updateSchema) {
            updateSchema(newSchema);
          }
        };

        _this.updateColumnSchema = function (name, schemaUpdate) {
          var schema = _this.props.schema;

          var newSchema = __spreadArrays(schema);

          var ind = newSchema.findIndex(function (s) {
            return s.name === name;
          });
          newSchema[ind] = __assign(__assign({}, newSchema[ind]), schemaUpdate);

          _this.updateRenderedSchema(newSchema);
        };

        _this.reorderColumn = function (from, to) {
          var schema = _this.props.schema;
          var fromInd = schema.findIndex(function (s) {
            return s.name === from;
          });
          var toInd = schema.findIndex(function (s) {
            return s.name === to;
          });
          var newSchema = moveToIndex(schema, fromInd, toInd);

          _this.updateRenderedSchema(newSchema);
        };

        _this.updateSortingList = function (sortingList) {
          var updateSortingList = _this.props.updateSortingList;

          if (updateSortingList) {
            updateSortingList(sortingList);
          }
        };

        _this.updateFilterList = function (filterList) {
          var updateFilterList = _this.props.updateFilterList;

          if (updateFilterList) {
            updateFilterList(filterList);
          }
        };

        _this.onMenuChange = function (name, selected) {
          var sortingList = _this.props.sortingList;

          switch (selected) {
            case 'sortAsc':
              sortColumn({
                sortingList: sortingList,
                updateSortingList: _this.updateSortingList
              }, name, 'asc');
              break;

            case 'sortDesc':
              sortColumn({
                sortingList: sortingList,
                updateSortingList: _this.updateSortingList
              }, name, 'desc');
              break;

            case 'unsort':
              sortColumn({
                sortingList: sortingList,
                updateSortingList: _this.updateSortingList
              }, name, 'unsort');
              break;

            case 'pinLeft':
              pinColumn({
                updateColumnSchema: _this.updateColumnSchema
              }, name, 'left');
              break;

            case 'pinRight':
              pinColumn({
                updateColumnSchema: _this.updateColumnSchema
              }, name, 'right');
              break;

            case 'unpin':
              pinColumn({
                updateColumnSchema: _this.updateColumnSchema
              }, name, 'unpin');
              break;

            case 'hide':
              hideColumn({
                updateColumnSchema: _this.updateColumnSchema
              }, name, true);
              break;
          }
        };

        _this.onFilterChange = function (name, selected) {
          var _a;

          var filterList = _this.props.filterList;

          var newFilterList = __assign(__assign({}, filterList), (_a = {}, _a[name] = selected, _a));

          _this.updateFilterList(newFilterList);
        };

        _this.onSelect = function (rowIndex, selected) {
          var onSelect = _this.props.onSelect;

          if (onSelect) {
            onSelect(rowIndex, selected);
          }
        };

        _this.onSelectAll = function (event) {
          var onSelectAll = _this.props.onSelectAll;

          if (onSelectAll) {
            onSelectAll(event.target.checked, undefined, true);
          }
        };

        _this.updatePrevPageInfo = function (value) {
          _this.setState({
            prevPageInfo: value
          });
        };

        var pageInfo = {
          page: 1,
          scrollTop: 0
        };
        _this.state = {
          init: false,
          prevPageInfo: pageInfo
        };
        return _this;
      }

      Grid.prototype.componentDidMount = function () {
        this.setState({
          init: true
        });
        window.addEventListener('resize', this.forceRerender.bind(this));
      };

      Grid.prototype.forceRerender = function () {
        this.forceUpdate();
      };

      Grid.prototype.componentWillUnmount = function () {
        this.removeScrollListeners();
        window.removeEventListener('resize', this.forceRerender.bind(this));
      };

      Grid.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevState.init !== this.state.init) {
          this.addScrollListeners();
        }

        if (prevProps.page !== this.props.page || prevProps.error !== this.props.error) {
          this.removeScrollListeners();
          this.addScrollListeners();
        }
      };

      Grid.prototype.addScrollListeners = function () {
        var gridHeadEl = this.gridRef.querySelector('.Grid-head');
        var gridBodyEl = this.gridRef.querySelector('.Grid-body');

        if (gridHeadEl && gridBodyEl) {
          gridHeadEl.addEventListener('scroll', this.syncScroll('head'));
          gridBodyEl.addEventListener('scroll', this.syncScroll('body'));
        }
      };

      Grid.prototype.removeScrollListeners = function () {
        var gridHeadEl = this.gridRef.querySelector('.Grid-head');
        var gridBodyEl = this.gridRef.querySelector('.Grid-body');

        if (gridHeadEl && gridBodyEl) {
          gridHeadEl.removeEventListener('scroll', this.syncScroll('head'));
          gridBodyEl.removeEventListener('scroll', this.syncScroll('body'));
        }
      };

      Grid.prototype.render = function () {
        var _a;

        var _this = this;

        var _b;

        var baseProps = extractBaseProps(this.props);
        var _c = this.state,
            init = _c.init,
            prevPageInfo = _c.prevPageInfo;
        var _d = this.props,
            type = _d.type,
            size = _d.size,
            showHead = _d.showHead,
            className = _d.className,
            page = _d.page,
            loading = _d.loading,
            loaderSchema = _d.loaderSchema;
        var schema = getSchema(this.props.schema, loading, loaderSchema);
        var classes = classNames__default["default"]((_a = {
          Grid: 'true'
        }, _a["Grid--" + type] = type, _a["Grid--" + size] = size, _a), className);
        return /*#__PURE__*/React__namespace.createElement("div", __assign({
          className: classes
        }, baseProps, {
          ref: function ref(el) {
            _this.gridRef = el;
          }
        }), init && /*#__PURE__*/React__namespace.createElement(GridProvider, {
          value: __assign(__assign({}, this.props), {
            ref: this.gridRef
          })
        }, showHead && /*#__PURE__*/React__namespace.createElement(GridHead, {
          schema: schema,
          onSelectAll: (_b = this.onSelectAll) === null || _b === void 0 ? void 0 : _b.bind(this),
          onMenuChange: this.onMenuChange.bind(this),
          onFilterChange: this.onFilterChange.bind(this),
          updateColumnSchema: this.updateColumnSchema.bind(this),
          reorderColumn: this.reorderColumn.bind(this)
        }), /*#__PURE__*/React__namespace.createElement(GridBody, {
          key: "" + page,
          schema: schema,
          prevPageInfo: prevPageInfo,
          updatePrevPageInfo: this.updatePrevPageInfo.bind(this),
          onSelect: this.onSelect.bind(this)
        })));
      };

      return Grid;
    }(React__namespace.Component);
    Grid.defaultProps = defaultProps$1;

    var renderTitle = function renderTitle(props) {
      var tooltip = props.tooltip,
          cellData = props.cellData;
      var children = cellData.title;

      if (children !== undefined && children !== null) {
        if (tooltip) {
          return /*#__PURE__*/React__namespace.createElement(Tooltip, {
            tooltip: children,
            position: 'top-start',
            triggerClass: "w-100 overflow-hidden"
          }, /*#__PURE__*/React__namespace.createElement(Text, {
            className: "w-100 ellipsis"
          }, children));
        }

        return /*#__PURE__*/React__namespace.createElement(Text, {
          className: "w-100 ellipsis"
        }, children);
      }

      return null;
    };

    var renderMetaList = function renderMetaList(props) {
      var cellData = props.cellData;
      var metaList = cellData.metaList;

      if (metaList) {
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "GridCell-metaList",
          "data-test": "DesignSystem-GridCell-metaList"
        }, metaList.map(function (list, index) {
          return /*#__PURE__*/React__namespace.createElement(Text, {
            key: index,
            className: "ellipsis",
            appearance: 'subtle',
            size: "small"
          }, list);
        }));
      }

      return null;
    };

    var renderAvatar = function renderAvatar(props) {
      var cellData = props.cellData;
      var firstName = cellData.firstName,
          lastName = cellData.lastName,
          title = cellData.title;

      if (firstName || lastName) {
        return /*#__PURE__*/React__namespace.createElement(Avatar, {
          className: "mr-5",
          firstName: firstName,
          lastName: lastName
        });
      }

      if (title) {
        return /*#__PURE__*/React__namespace.createElement(Avatar, {
          className: "mr-5"
        }, title);
      }

      return null;
    };

    var renderIcon = function renderIcon(props) {
      var cellData = props.cellData;
      var title = cellData.title,
          icon = cellData.icon;
      var iconName = icon || title;

      if (iconName) {
        return /*#__PURE__*/React__namespace.createElement(Icon, {
          name: iconName
        });
      }

      return null;
    };

    var renderStatusHint = function renderStatusHint(props) {
      var cellData = props.cellData;
      var statusAppearance = cellData.statusAppearance;
      var children = cellData.title;

      if (children) {
        return /*#__PURE__*/React__namespace.createElement(StatusHint, {
          appearance: statusAppearance
        }, children);
      }

      return null;
    };

    var GridCell = function GridCell(props) {
      var _a;

      var size = props.size,
          schema = props.schema,
          loading = props.loading;
      var data = !loading ? translateData(schema, props.data) : {};
      var name = schema.name,
          _b = schema.cellType,
          cellType = _b === void 0 ? 'DEFAULT' : _b,
          _c = schema.align,
          align = _c === void 0 ? 'left' : _c,
          tooltip = schema.tooltip;
      var cellData = data[name];
      var cellClass = classNames__default["default"]((_a = {}, _a['GridCell'] = true, _a));

      switch (cellType) {
        case 'DEFAULT':
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--align-" + align + " GridCell--default"
          }, loading ? /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "medium",
            "data-test": "DesignSystem-GridCell-placeHolder"
          }) : renderTitle({
            tooltip: tooltip,
            cellData: cellData
          }));

        case 'WITH_META_LIST':
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--metaList"
          }, loading ? /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "medium",
            "data-test": "DesignSystem-GridCell-withMetaList"
          }), /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large",
            size: "xxs"
          })) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, renderTitle({
            tooltip: tooltip,
            cellData: cellData
          }), renderMetaList({
            cellData: cellData
          })));

        case 'AVATAR':
          if (loading) {
            return /*#__PURE__*/React__namespace.createElement(Placeholder, {
              className: "GridCell--align-" + align,
              imageSize: 'medium',
              round: true
            });
          }

          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--align-" + align + " GridCell--avatar",
            "data-test": "DesignSystem-GridCell-avatar"
          }, size !== 'tight' && renderAvatar({
            cellData: cellData
          }));

        case 'AVATAR_WITH_TEXT':
          if (loading) {
            return /*#__PURE__*/React__namespace.createElement(Placeholder, {
              imageSize: 'medium',
              round: true
            }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
              className: "ml-3",
              length: "medium"
            }));
          }

          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + "   ",
            "data-test": "DesignSystem-GridCell-avatarWithText"
          }, size !== 'tight' && renderAvatar({
            cellData: cellData
          }), renderTitle({
            tooltip: tooltip,
            cellData: cellData
          }));

        case 'AVATAR_WITH_META_LIST':
          if (loading) {
            return /*#__PURE__*/React__namespace.createElement(Placeholder, {
              imageSize: 'medium',
              round: true
            }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
              className: "ml-3",
              length: "medium"
            }), /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
              className: "ml-3",
              length: "large"
            }));
          }

          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--avatarWithText",
            "data-test": "DesignSystem-GridCell-avatarWithMetaList"
          }, size !== 'tight' && renderAvatar({
            cellData: cellData
          }), /*#__PURE__*/React__namespace.createElement("div", {
            className: "GridCell-metaListWrapper"
          }, renderTitle({
            tooltip: tooltip,
            cellData: cellData
          }), renderMetaList({
            cellData: cellData
          })));

        case 'ICON':
          if (loading) {
            return /*#__PURE__*/React__namespace.createElement(Placeholder, {
              className: "GridCell--align-" + align,
              imageSize: 'small',
              round: true
            });
          }

          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--align-" + align + " GridCell--icon",
            "data-test": "DesignSystem-GridCell-icon"
          }, renderIcon({
            cellData: cellData
          }));

        case 'STATUS_HINT':
          return /*#__PURE__*/React__namespace.createElement("div", {
            className: cellClass + " GridCell--align-" + align + " GridCell--statusHint"
          }, loading ? /*#__PURE__*/React__namespace.createElement(Placeholder, {
            className: "w-75 flex-grow-0",
            imageSize: 'small',
            round: true
          }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
            length: "large"
          })) : renderStatusHint({
            cellData: cellData
          }));
      }

      return null;
    };
    GridCell.displayName = 'GridCell';

    var DraggableDropdown = function DraggableDropdown(props) {
      var options = props.options,
          onChange = props.onChange;

      var _a = React__namespace.useState(false),
          open = _a[0],
          setOpen = _a[1];

      var _b = React__namespace.useState(options),
          tempOptions = _b[0],
          setTempOptions = _b[1];

      var _c = React__namespace.useState('var(--spacing-8)'),
          triggerWidth = _c[0],
          setTriggerWidth = _c[1];

      React__namespace.useEffect(function () {
        setTempOptions(options);
      }, [open]);

      var handleParentChange = function handleParentChange(e) {
        setTempOptions(tempOptions.map(function (option) {
          return __assign(__assign({}, option), {
            selected: e.target.checked
          });
        }));
      };

      var handleChildChange = function handleChildChange(e, index) {
        var newOptions = __spreadArrays(tempOptions);

        newOptions[index] = __assign(__assign({}, newOptions[index]), {
          selected: e.target.checked
        });
        setTempOptions(newOptions);
      };

      var onToggleHandler = function onToggleHandler(newOpen) {
        setOpen(newOpen);
      };

      var onCancelHandler = function onCancelHandler() {
        setOpen(false);
      };

      var onApplyHandler = function onApplyHandler() {
        setOpen(false);
        if (onChange) onChange(tempOptions);
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Dropdown"
      }, /*#__PURE__*/React__namespace.createElement(Popover, {
        open: open,
        onToggle: onToggleHandler,
        trigger: /*#__PURE__*/React__namespace.createElement(Button, {
          type: "button",
          ref: function ref(el) {
            setTriggerWidth((el === null || el === void 0 ? void 0 : el.clientWidth) + "px");
          },
          size: "tiny",
          appearance: "transparent",
          icon: "keyboard_arrow_down_filled",
          iconAlign: "right"
        }, "Showing " + options.filter(function (option) {
          return option.selected;
        }).length + " of " + options.length + " column" + getPluralSuffix(options.length)),
        triggerClass: "w-100",
        customStyle: {
          width: triggerWidth
        },
        className: "Header-draggableDropdown"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Dropdown-wrapper"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "OptionWrapper"
      }, /*#__PURE__*/React__namespace.createElement(Checkbox, {
        className: "OptionCheckbox",
        label: "Select All",
        checked: tempOptions.every(function (option) {
          return option.selected;
        }),
        indeterminate: tempOptions.some(function (option) {
          return option.selected;
        }) && tempOptions.some(function (option) {
          return !option.selected;
        }),
        onChange: handleParentChange
      })), tempOptions.map(function (option, index) {
        return /*#__PURE__*/React__namespace.createElement("div", {
          "data-test": "DesignSystem-Table-Header--draggableDropdownOption",
          key: option.value,
          className: "OptionWrapper d-flex flex-space-between align-items-center cursor-pointer",
          draggable: true,
          onDragStart: function onDragStart(e) {
            e.dataTransfer.setData('index', "" + index);
          },
          onDragOver: function onDragOver(e) {
            return e.preventDefault();
          },
          onDrop: function onDrop(e) {
            var from = +e.dataTransfer.getData('index');
            var to = index;
            if (from !== to) setTempOptions(moveToIndex(tempOptions, from, to));
          }
        }, /*#__PURE__*/React__namespace.createElement(Checkbox, {
          className: "OptionCheckbox",
          name: option.value,
          label: option.label,
          checked: tempOptions[index].selected,
          onChange: function onChange(e) {
            return handleChildChange(e, index);
          }
        }), /*#__PURE__*/React__namespace.createElement(Icon, {
          name: "drag_handle",
          className: "mr-4"
        }));
      })), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Dropdown-buttonWrapper"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        type: "button",
        className: "mr-4",
        size: "tiny",
        onClick: onCancelHandler
      }, "Cancel"), /*#__PURE__*/React__namespace.createElement(Button, {
        type: "button",
        appearance: "primary",
        size: "tiny",
        onClick: onApplyHandler
      }, "Apply"))));
    };

    var Header = function Header(props) {
      var _a;

      var loading = props.loading,
          error = props.error,
          data = props.data,
          displayData = props.displayData,
          schema = props.schema,
          withSearch = props.withSearch,
          showHead = props.showHead,
          withPagination = props.withPagination,
          page = props.page,
          pageSize = props.pageSize,
          withCheckbox = props.withCheckbox,
          children = props.children,
          updateSchema = props.updateSchema,
          _b = props.filterList,
          filterList = _b === void 0 ? {} : _b,
          updateFilterList = props.updateFilterList,
          _c = props.totalRecords,
          totalRecords = _c === void 0 ? 0 : _c,
          onSelectAll = props.onSelectAll,
          searchPlaceholder = props.searchPlaceholder,
          selectAll = props.selectAll,
          searchTerm = props.searchTerm,
          updateSearchTerm = props.updateSearchTerm,
          globalActionRenderer = props.globalActionRenderer,
          dynamicColumn = props.dynamicColumn,
          allowSelectAll = props.allowSelectAll,
          showFilters = props.showFilters,
          customSelectionLabel = props.customSelectionLabel,
          selectedRowsRef = props.selectedRowsRef,
          selectedAllRef = props.selectedAllRef,
          onClearSelection = props.onClearSelection,
          onSelectAllRows = props.onSelectAllRows,
          selectionActionRenderer = props.selectionActionRenderer,
          uniqueColumnName = props.uniqueColumnName;

      var _d = React__namespace.useState(false),
          selectAllRecords = _d[0],
          setSelectAllRecords = _d[1];

      var _e = React__namespace.useState(true),
          flag = _e[0],
          setFlag = _e[1];

      var customLabel = customSelectionLabel ? customSelectionLabel : 'item';
      var selectedCount = data.filter(function (d) {
        return d._selected;
      }).length;
      var startIndex = (page - 1) * pageSize + 1;
      var endIndex = Math.min(page * pageSize, totalRecords);
      var selectedRowsCount = (selectedAllRef === null || selectedAllRef === void 0 ? void 0 : selectedAllRef.current) === true ? totalRecords : ((_a = selectedRowsRef === null || selectedRowsRef === void 0 ? void 0 : selectedRowsRef.current) === null || _a === void 0 ? void 0 : _a.length) || 0;
      var showSelectedRowLabel = withCheckbox && (selectedCount || selectedRowsCount > 0);

      var _f = React__namespace.useState(true),
          showSelectedLabel = _f[0],
          setShowSelectedLabel = _f[1];

      var _g = React__namespace.useState(false),
          animateSelectedLabel = _g[0],
          setAnimateSelectedLabel = _g[1];

      var _h = React__namespace.useState(false),
          animateUnSelectedLabel = _h[0],
          setAnimateUnSelectedLabel = _h[1];

      React__namespace.useEffect(function () {
        if (showSelectedRowLabel) {
          setAnimateUnSelectedLabel(true);
          setAnimateSelectedLabel(false);
        } else {
          setAnimateUnSelectedLabel(false);
          setAnimateSelectedLabel(true);
        }
      }, [showSelectedRowLabel]);

      var onUnSelectAnimationEnd = function onUnSelectAnimationEnd() {
        showSelectedRowLabel ? setShowSelectedLabel(true) : setShowSelectedLabel(false);
        setAnimateSelectedLabel(true);
        setAnimateUnSelectedLabel(false);
      };

      var onSelectAnimationEnd = function onSelectAnimationEnd() {
        showSelectedRowLabel ? setShowSelectedLabel(true) : setShowSelectedLabel(false);
        setAnimateSelectedLabel(false);
        setAnimateUnSelectedLabel(true);
      };

      var unselectedRowLabelClass = classNames__default["default"]({
        'Table-Header-Label--hide': animateUnSelectedLabel && showSelectedRowLabel,
        'Table-Header-Label--show': animateUnSelectedLabel && !showSelectedRowLabel
      });
      var selectedRowLabelClass = classNames__default["default"]({
        'Table-Header-Label--hide': animateSelectedLabel && !showSelectedRowLabel,
        'Table-Header-Label--show': animateSelectedLabel && showSelectedRowLabel
      });
      React__namespace.useEffect(function () {
        setFlag(!flag);
      }, [schema]);
      React__namespace.useEffect(function () {
        if (selectAll && selectAll.checked) {
          if (onSelectAll) onSelectAll(true, selectAllRecords);
        }
      }, [selectAllRecords]);
      React__namespace.useEffect(function () {
        if (selectAll && !selectAll.checked) setSelectAllRecords(false);
      }, [selectAll]);
      var filterSchema = schema.filter(function (s) {
        return s.filters;
      });

      var onSearchChange = function onSearchChange(e) {
        var value = e.target.value;

        if (updateSearchTerm) {
          updateSearchTerm(value);
        }
      };

      var onFilterChange = function onFilterChange(name, filters) {
        var _a;

        var newFilterList = __assign(__assign({}, filterList), (_a = {}, _a[name] = filters, _a));

        if (updateFilterList) {
          updateFilterList(newFilterList);
        }
      };

      var columnOptions = schema.map(function (s) {
        return {
          label: s.displayName,
          value: s.name,
          selected: !s.hidden
        };
      });

      var onDynamicColumnUpdate = function onDynamicColumnUpdate(options) {
        var newSchema = options.map(function (option) {
          return __assign(__assign({}, schema.find(function (colSchema) {
            return colSchema.name === option.value;
          })), {
            hidden: !option.selected
          });
        });
        if (updateSchema) updateSchema(newSchema);
      };

      var getUnSelectedRowLabel = function getUnSelectedRowLabel() {
        if (error) {
          return "Showing 0 " + customLabel + "s";
        } else if (withPagination) {
          return "Showing " + startIndex + "-" + endIndex + " of " + totalRecords + " " + customLabel + getPluralSuffix(totalRecords);
        }

        return "Showing " + totalRecords + " " + customLabel + getPluralSuffix(totalRecords);
      };

      var getSelectedRowLabel = function getSelectedRowLabel() {
        if (selectedRowsCount > 0 && uniqueColumnName && withCheckbox) {
          return "Selected " + selectedRowsCount + " " + customLabel + getPluralSuffix(selectedRowsCount);
        } else if (selectedCount && !uniqueColumnName && withCheckbox) {
          return "Selected " + selectedCount + " " + customLabel + getPluralSuffix(selectedCount);
        } else if (withPagination) {
          return "Showing " + startIndex + "-" + endIndex + " of " + totalRecords + " " + customLabel + getPluralSuffix(totalRecords);
        }

        return "Showing " + totalRecords + " " + customLabel + getPluralSuffix(totalRecords);
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-content Header-content--top"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex w-100"
      }, withSearch && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-search"
      }, /*#__PURE__*/React__namespace.createElement(Input, {
        "data-test": "DesignSystem-Table-Header--withSearch",
        name: "GridHeader-search",
        icon: "search",
        placeholder: searchPlaceholder,
        onChange: onSearchChange,
        value: searchTerm,
        onClear: function onClear() {
          return updateSearchTerm && updateSearchTerm('');
        },
        disabled: loading && !hasSchema(schema),
        autoComplete: "off"
      })), showFilters && filterSchema.length > 0 && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-dropdown"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-filters"
      }, filterSchema.map(function (s) {
        var name = s.name,
            displayName = s.displayName,
            filters = s.filters;
        var filterOptions = filters ? filters.map(function (f) {
          return __assign(__assign({}, f), {
            selected: filterList[name] && filterList[name].findIndex(function (fl) {
              return fl === f.value;
            }) !== -1
          });
        }) : [];
        return /*#__PURE__*/React__namespace.createElement(Dropdown, {
          key: name,
          withCheckbox: true,
          showApplyButton: true,
          inlineLabel: displayName,
          icon: 'filter_list',
          options: filterOptions,
          onChange: function onChange(selected) {
            return onFilterChange(name, selected);
          }
        });
      }))), children && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-actions"
      }, children)), globalActionRenderer && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-global-actions"
      }, globalActionRenderer(displayData))), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-content Header-content--bottom"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-label"
      }, !showHead && withCheckbox && !loading && /*#__PURE__*/React__namespace.createElement(Checkbox, __assign({}, selectAll, {
        onChange: function onChange(event) {
          if (onSelectAll) onSelectAll(event.target.checked);
        }
      })), loading ? /*#__PURE__*/React__namespace.createElement(Placeholder, {
        withImage: !showHead && withCheckbox
      }, /*#__PURE__*/React__namespace.createElement(PlaceholderParagraph, {
        length: 'small',
        size: 's'
      })) : /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, showSelectedLabel ? /*#__PURE__*/React__namespace.createElement("span", {
        className: selectedRowLabelClass,
        onAnimationEnd: onSelectAnimationEnd
      }, /*#__PURE__*/React__namespace.createElement(Label, null, getSelectedRowLabel())) : /*#__PURE__*/React__namespace.createElement("span", {
        className: unselectedRowLabelClass,
        onAnimationEnd: onUnSelectAnimationEnd
      }, /*#__PURE__*/React__namespace.createElement(Label, null, getUnSelectedRowLabel())), selectedRowsCount > 0 && allowSelectAll && showSelectedLabel && /*#__PURE__*/React__namespace.createElement("div", {
        className: selectedRowLabelClass
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "ml-4 d-flex"
      }, /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-Table-Header--selectAllItemsButton",
        size: "tiny",
        disabled: selectedRowsCount === totalRecords,
        onClick: onSelectAllRows
      }, "Select " + totalRecords + " " + customLabel + "s"), /*#__PURE__*/React__namespace.createElement(Button, {
        "data-test": "DesignSystem-Table-Header--clearSelectionItemsButton",
        size: "tiny",
        className: "ml-4",
        onClick: onClearSelection
      }, "Clear Selection"), selectionActionRenderer && /*#__PURE__*/React__namespace.createElement(Divider, {
        vertical: true,
        className: "mx-4 Table-Header--Divider"
      }))), selectionActionRenderer && selectedRowsCount > 0 && showSelectedLabel && /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Table-Header--ActionRenderer",
        className: selectedRowLabelClass
      }, selectionActionRenderer(selectedRowsRef === null || selectedRowsRef === void 0 ? void 0 : selectedRowsRef.current, selectedAllRef === null || selectedAllRef === void 0 ? void 0 : selectedAllRef.current)))), dynamicColumn && /*#__PURE__*/React__namespace.createElement("div", {
        className: "Header-hideColumns"
      }, /*#__PURE__*/React__namespace.createElement(DraggableDropdown, {
        options: columnOptions,
        onChange: onDynamicColumnUpdate
      }))));
    };
    Header.defaultProps = {
      schema: [],
      data: [],
      searchPlaceholder: 'Search',
      dynamicColumn: true,
      showFilters: true
    };

    var isElementPresent = function isElementPresent(list, uniqueColumnName, value) {
      var arr = list === null || list === void 0 ? void 0 : list.filter(function (item) {
        return item[uniqueColumnName] === value;
      });
      return arr.length > 0;
    };

    var getUpdatedData = function getUpdatedData(data, selectedList, uniqueColumnName, isCancelSelection, isSelectAll) {
      var updatedData = data.map(function (item) {
        if (isSelectAll || item._selected && !isCancelSelection || uniqueColumnName && item[uniqueColumnName] && selectedList && isElementPresent(selectedList, uniqueColumnName, item[uniqueColumnName]) && !isCancelSelection) {
          item._selected = true;
        } else if (isCancelSelection) {
          item._selected = false;
        } else {
          item._selected = false;
        }

        return item;
      });
      return updatedData;
    };

    var uniqueByKey = function uniqueByKey(arr, key) {
      var list = new Set();
      return arr.filter(function (obj) {
        var value = obj[key];

        if (list.has(value)) {
          return false;
        } else {
          list.add(value);
          return true;
        }
      });
    };

    var removeDuplicate = function removeDuplicate(data, uniqueColumnName) {
      if (uniqueColumnName) {
        return uniqueByKey(data, uniqueColumnName);
      }

      return data;
    };

    var defaultErrorTemplate = function defaultErrorTemplate(props) {
      var _a = props.errorType,
          errorType = _a === void 0 ? 'DEFAULT' : _a;
      var errorMessages = {
        FAILED_TO_FETCH: 'Failed to fetch data',
        NO_RECORDS_FOUND: 'No results found',
        DEFAULT: 'No results found'
      };
      return /*#__PURE__*/React__namespace.createElement(Heading, null, errorMessages[errorType]);
    };

    var defaultProps = {
      type: 'data',
      size: 'standard',
      showHead: true,
      showMenu: true,
      multipleSorting: true,
      headerOptions: {},
      withPagination: true,
      paginationType: 'jump',
      page: 1,
      pageSize: 15,
      draggable: true,
      data: [],
      displayData: [],
      schema: [],
      loading: false,
      error: false,
      loaderSchema: [],
      sortingList: [],
      filterList: {},
      filterPosition: 'GRID',
      searchDebounceDuration: 750,
      pageJumpDebounceDuration: 750,
      errorTemplate: defaultErrorTemplate
    };

    var Table = function (_super) {
      __extends(Table, _super);

      function Table(props) {
        var _this = _super.call(this, props) || this;

        _this.selectedRowsRef = /*#__PURE__*/React__namespace.createRef();
        _this.clearSelectionRef = /*#__PURE__*/React__namespace.createRef();
        _this.selectAllRef = /*#__PURE__*/React__namespace.createRef();

        _this.updateData = function (searchUpdate) {
          if (_this.state.async) {
            _this.setState({
              loading: true
            });
          }

          if (searchUpdate) {
            _this.debounceUpdate();
          } else {
            _this.updateDataFn();
          }
        };

        _this.updateDataFn = function () {
          var _a = _this.props,
              fetchData = _a.fetchData,
              pageSize = _a.pageSize,
              withPagination = _a.withPagination,
              dataProp = _a.data,
              onSearch = _a.onSearch,
              uniqueColumnName = _a.uniqueColumnName;
          var _b = _this.state,
              async = _b.async,
              page = _b.page,
              sortingList = _b.sortingList,
              filterList = _b.filterList,
              searchTerm = _b.searchTerm;

          _this.onSelect(-1, false);

          var opts = {
            page: page,
            pageSize: pageSize,
            sortingList: sortingList,
            filterList: filterList,
            searchTerm: searchTerm
          };

          if (!_this.props.withPagination) {
            delete opts.page;
            delete opts.pageSize;
          }

          if (async) {
            if (fetchData) {
              fetchData(opts).then(function (res) {
                if (!res.searchTerm || res.searchTerm && res.searchTerm === _this.state.searchTerm) {
                  var data = res.data;
                  var dataReplica = JSON.parse(JSON.stringify(data));
                  var schema = _this.state.schema.length ? _this.state.schema : res.schema;
                  var preSelectedRows = data.filter(function (item) {
                    return item._selected;
                  });

                  if (_this.clearSelectionRef.current) {
                    _this.selectedRowsRef.current = [];
                  } else {
                    _this.selectedRowsRef.current = _this.selectedRowsRef.current ? removeDuplicate(__spreadArrays(_this.selectedRowsRef.current, preSelectedRows), uniqueColumnName) : removeDuplicate(__spreadArrays(preSelectedRows), uniqueColumnName);
                  }

                  var selectedData = getUpdatedData(dataReplica, _this.selectedRowsRef.current, uniqueColumnName, _this.clearSelectionRef.current, _this.selectAllRef.current);

                  _this.setState({
                    data: selectedData,
                    displayData: data,
                    schema: schema,
                    selectAll: getSelectAll(selectedData, _this.props.selectDisabledRow, _this.clearSelectionRef.current),
                    totalRecords: res.count,
                    loading: false,
                    error: !data.length,
                    errorType: 'NO_RECORDS_FOUND'
                  });
                }
              })["catch"](function () {
                _this.setState({
                  loading: false,
                  error: true,
                  errorType: 'FAILED_TO_FETCH'
                });
              });
            }
          } else {
            var schema = _this.state.schema;
            var filteredData = filterData(schema, dataProp, filterList);
            var searchedData = onSearch && opts.searchTerm !== undefined ? onSearch(filteredData, opts.searchTerm) : filteredData;
            var sortedData = sortData(schema, searchedData, sortingList);
            var renderedData = sortedData;
            var totalRecords = sortedData.length;

            if (withPagination && page && pageSize) {
              renderedData = paginateData(renderedData, page, pageSize);
            }

            var renderedSchema = _this.state.schema.length ? _this.state.schema : schema;
            var preSelectedRows = renderedData.filter(function (item) {
              return item._selected;
            });
            var renderedDataReplica = JSON.parse(JSON.stringify(renderedData));

            if (_this.clearSelectionRef.current) {
              _this.selectedRowsRef.current = [];
            } else {
              _this.selectedRowsRef.current = _this.selectedRowsRef.current ? removeDuplicate(__spreadArrays(_this.selectedRowsRef.current, preSelectedRows), uniqueColumnName) : removeDuplicate(__spreadArrays(preSelectedRows), uniqueColumnName);
            }

            var selectedData = getUpdatedData(renderedDataReplica, _this.selectedRowsRef.current, uniqueColumnName, _this.clearSelectionRef.current, _this.selectAllRef.current);

            _this.setState({
              totalRecords: totalRecords,
              error: !renderedData.length,
              errorType: 'NO_RECORDS_FOUND',
              selectAll: getSelectAll(renderedData, _this.props.selectDisabledRow, _this.clearSelectionRef.current),
              schema: renderedSchema,
              displayData: sortedData,
              data: selectedData
            });
          }
        };

        _this.onSelect = function (rowIndexes, selected) {
          var data = _this.state.data;
          var _a = _this.props,
              onSelect = _a.onSelect,
              uniqueColumnName = _a.uniqueColumnName;

          if (_this.selectAllRef.current && rowIndexes !== -1 && !selected) {
            _this.selectAllRef.current = false;
            _this.selectedRowsRef.current = [];
            var indexes_1 = Array.from({
              length: data.length
            }, function (_, i) {
              return i;
            });
            var newData_1 = updateBatchData(data, indexes_1, {
              _selected: false
            }, _this.props.selectDisabledRow);

            _this.setState({
              data: newData_1,
              selectAll: {
                checked: false,
                indeterminate: false
              }
            });

            if (onSelect) {
              if (_this.props.uniqueColumnName) {
                onSelect(indexes_1, selected, _this.selectedRowsRef.current, _this.selectAllRef.current);
              } else {
                onSelect(indexes_1, selected, rowIndexes === -1 ? [] : newData_1.filter(function (d) {
                  return d._selected;
                }));
              }
            }

            return;
          }

          var indexes = [rowIndexes];
          var rowData = data[rowIndexes];
          var selectedItemList = rowIndexes === -1 ? [] : [rowData];
          var newData = data;

          if (rowIndexes >= 0) {
            newData = updateBatchData(data, indexes, {
              _selected: selected
            }, _this.props.selectDisabledRow);

            _this.resetClearSelection();

            _this.setState({
              data: newData,
              selectAll: getSelectAll(newData, _this.props.selectDisabledRow, _this.clearSelectionRef.current)
            });

            if (_this.selectedRowsRef.current && selected) {
              selectedItemList = __spreadArrays([__assign(__assign({}, rowData), {
                _selected: selected
              })], _this.selectedRowsRef.current);
            }

            if (!selected && uniqueColumnName) {
              selectedItemList = _this.selectedRowsRef.current.filter(function (item) {
                return item[uniqueColumnName] !== rowData[uniqueColumnName];
              });
            }

            _this.selectedRowsRef.current = removeDuplicate(selectedItemList, uniqueColumnName);
          } else if (rowIndexes === -1 && _this.selectedRowsRef.current) {
            selectedItemList = _this.selectedRowsRef.current;
          }

          if (onSelect) {
            if (_this.props.uniqueColumnName) {
              onSelect(indexes, selected, rowIndexes === -1 && (selectedItemList === null || selectedItemList === void 0 ? void 0 : selectedItemList.length) === 0 ? [] : _this.selectedRowsRef.current, _this.selectAllRef.current);
            } else {
              onSelect(indexes, selected, rowIndexes === -1 ? [] : newData.filter(function (d) {
                return d._selected;
              }));
            }
          }
        };

        _this.onSelectAll = function (selected, selectAll, headerCheckbox) {
          var _a = _this.props,
              onSelect = _a.onSelect,
              uniqueColumnName = _a.uniqueColumnName;
          var data = _this.state.data;
          var indexes = Array.from({
            length: data.length
          }, function (_, i) {
            return i;
          });
          var newData = updateBatchData(data, indexes, {
            _selected: selected
          }, _this.props.selectDisabledRow);
          var selectedIndex = [];
          newData.forEach(function (item, key) {
            if (item._selected) {
              selectedIndex.push(key);
            }
          });
          var selectedData = [];

          if (selected) {
            _this.resetClearSelection();

            selectedData = selectAll === undefined ? __spreadArrays(_this.selectedRowsRef.current || [], newData.filter(function (d) {
              return d._selected;
            })) : _this.selectedRowsRef.current;
          } else if (!selected && headerCheckbox && uniqueColumnName) {
            _this.selectAllRef.current = false;
            _this.selectedRowsRef.current = __spreadArrays(_this.selectedRowsRef.current || [], newData);
            _this.selectedRowsRef.current = _this.selectedRowsRef.current.filter(function (item1) {
              return !newData.some(function (item2) {
                return item1[uniqueColumnName] === item2[uniqueColumnName];
              });
            });
          } else {
            _this.selectedRowsRef.current = [];
            _this.selectAllRef.current = false;
          }

          if (!(headerCheckbox && !selected)) {
            _this.selectedRowsRef.current = removeDuplicate(selectedData, uniqueColumnName);
          }

          if (onSelect) {
            if (_this.props.uniqueColumnName) {
              if (headerCheckbox && !selected) {
                onSelect(selectedIndex, selected, removeDuplicate(_this.selectedRowsRef.current, uniqueColumnName), _this.selectAllRef.current);
              } else {
                onSelect(selectedIndex, selected, removeDuplicate(selectedData, uniqueColumnName), _this.selectAllRef.current);
              }
            } else {
              onSelect(selectedIndex, selected, newData.filter(function (d) {
                return d._selected;
              }), selectAll);
            }
          }

          _this.setState({
            data: newData,
            selectAll: getSelectAll(newData, _this.props.selectDisabledRow)
          });
        };

        _this.onPageChange = function (newPage) {
          _this.setState({
            page: newPage
          });
        };

        _this.updateSchema = function (newSchema) {
          _this.setState({
            schema: newSchema
          });
        };

        _this.updateSortingList = function (newSortingList) {
          var multipleSorting = _this.props.multipleSorting;

          _this.setState({
            sortingList: multipleSorting ? __spreadArrays(newSortingList) : newSortingList.slice(-1),
            page: 1
          });
        };

        _this.updateFilterList = function (newFilterList) {
          _this.setState({
            filterList: newFilterList,
            page: 1
          });
        };

        _this.updateSearchTerm = function (newSearchTerm) {
          _this.setState({
            searchTerm: newSearchTerm,
            page: 1
          });
        };

        _this.onClearSelection = function () {
          _this.selectedRowsRef.current = [];
          _this.clearSelectionRef.current = true;
          _this.selectAllRef.current = false;

          _this.onSelectAll(false);

          _this.setState({
            selectAll: getSelectAll([], _this.props.selectDisabledRow, _this.clearSelectionRef.current)
          });
        };

        _this.resetClearSelection = function () {
          _this.clearSelectionRef.current = false;
        };

        _this.onSelectAllRows = function () {
          _this.selectAllRef.current = _this.props.uniqueColumnName ? true : false;

          _this.onSelectAll(true, true);
        };

        var async = ('fetchData' in _this.props);
        var data = props.data || [];
        var schema = props.schema || [];
        _this.state = {
          async: async,
          data: !async ? data : [],
          displayData: !async ? data : [],
          schema: !async ? schema : [],
          page: props.page,
          sortingList: props.sortingList,
          filterList: props.filterList,
          totalRecords: !async ? data.length : 0,
          loading: !async ? props.loading : true,
          error: !async ? props.error : false,
          errorType: props.errorType,
          selectAll: getSelectAll([]),
          searchTerm: undefined
        };
        _this.debounceUpdate = debounce(props.searchDebounceDuration, _this.updateDataFn);
        return _this;
      }

      Table.prototype.componentDidMount = function () {
        this.updateData();
      };

      Table.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;

        if (!this.state.async) {
          if (prevProps.error !== this.props.error) {
            var _a = this.props,
                _b = _a.data,
                data = _b === void 0 ? [] : _b,
                _c = _a.schema,
                schema = _c === void 0 ? [] : _c;
            this.setState({
              data: data,
              displayData: data,
              schema: schema,
              error: this.props.error || false,
              errorType: this.props.errorType,
              page: 1,
              totalRecords: data.length || 0,
              selectAll: getSelectAll([])
            });
          }

          if (prevProps.loading !== this.props.loading) {
            var _d = this.props,
                _e = _d.data,
                data = _e === void 0 ? [] : _e,
                _f = _d.schema,
                schema = _f === void 0 ? [] : _f;
            this.setState({
              data: data,
              displayData: data,
              schema: schema,
              loading: this.props.loading || false,
              error: this.props.error || false,
              errorType: this.props.errorType,
              page: 1,
              totalRecords: data.length || 0,
              selectAll: getSelectAll([])
            }, function () {
              _this.updateData();
            });
          }
        }

        if (prevState.page !== this.state.page) {
          var onPageChange = this.props.onPageChange;
          if (onPageChange) onPageChange(this.state.page);
        }

        if (prevState.page !== this.state.page || prevState.filterList !== this.state.filterList || prevState.sortingList !== this.state.sortingList || prevState.searchTerm !== this.state.searchTerm) {
          if (!this.props.loading) {
            var searchUpdate = prevState.searchTerm !== this.state.searchTerm;
            this.updateData(searchUpdate);
          }
        }
      };

      Table.prototype.render = function () {
        var _a = this.props,
            showHead = _a.showHead,
            type = _a.type,
            size = _a.size,
            headCellTooltip = _a.headCellTooltip,
            separator = _a.separator,
            draggable = _a.draggable,
            nestedRows = _a.nestedRows,
            nestedRowRenderer = _a.nestedRowRenderer,
            withHeader = _a.withHeader,
            headerOptions = _a.headerOptions,
            withCheckbox = _a.withCheckbox,
            showMenu = _a.showMenu,
            withPagination = _a.withPagination,
            paginationType = _a.paginationType,
            pageSize = _a.pageSize,
            pageJumpDebounceDuration = _a.pageJumpDebounceDuration,
            onRowClick = _a.onRowClick,
            loaderSchema = _a.loaderSchema,
            errorTemplate = _a.errorTemplate,
            className = _a.className,
            filterPosition = _a.filterPosition,
            uniqueColumnName = _a.uniqueColumnName;
        var baseProps = extractBaseProps(this.props);

        var _b = headerOptions,
            headerChildren = _b.children,
            headerAttr = __rest(_b, ["children"]);

        var classes = className ? " " + className : '';
        var totalRecords = this.state.totalRecords;
        var totalPages = getTotalPages(totalRecords, pageSize);
        return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
          className: "Table" + classes,
          "data-test": "DesignSystem-Table-wrapper"
        }), withHeader && /*#__PURE__*/React__namespace.createElement("div", {
          className: "Table-header",
          "data-test": "DesignSystem-Table-header"
        }, /*#__PURE__*/React__namespace.createElement(Header, __assign({}, this.state, {
          updateSchema: this.updateSchema,
          updateFilterList: this.updateFilterList,
          updateSearchTerm: this.updateSearchTerm,
          showHead: showHead,
          onSelectAll: this.onSelectAll,
          withCheckbox: withCheckbox,
          withPagination: withPagination,
          pageSize: pageSize,
          showFilters: filterPosition === 'HEADER',
          selectedRowsRef: this.selectedRowsRef,
          onClearSelection: this.onClearSelection,
          onSelectAllRows: this.onSelectAllRows,
          selectedAllRef: this.selectAllRef,
          uniqueColumnName: uniqueColumnName
        }, headerAttr), headerChildren)), /*#__PURE__*/React__namespace.createElement("div", {
          className: "Table-grid"
        }, /*#__PURE__*/React__namespace.createElement(Grid, __assign({}, this.state, {
          key: this.state.searchTerm,
          updateData: this.updateData,
          updateSchema: this.updateSchema,
          updateSortingList: this.updateSortingList,
          updateFilterList: this.updateFilterList,
          withCheckbox: withCheckbox,
          onSelect: this.onSelect,
          onSelectAll: this.onSelectAll,
          showMenu: showMenu,
          showHead: showHead,
          type: type,
          size: size,
          headCellTooltip: headCellTooltip,
          separator: separator,
          draggable: draggable,
          nestedRows: nestedRows,
          nestedRowRenderer: nestedRowRenderer,
          withPagination: withPagination && totalPages > 1,
          pageSize: pageSize,
          loaderSchema: loaderSchema,
          errorTemplate: errorTemplate && errorTemplate({
            errorType: this.state.errorType
          }),
          onRowClick: onRowClick,
          showFilters: filterPosition === 'GRID'
        }))), withPagination && !this.state.loading && !this.state.error && totalPages > 1 && /*#__PURE__*/React__namespace.createElement("div", {
          className: "Table-pagination"
        }, /*#__PURE__*/React__namespace.createElement(Pagination, {
          page: this.state.page,
          totalPages: getTotalPages(totalRecords, pageSize),
          type: paginationType,
          onPageChange: this.onPageChange,
          pageJumpDebounceDuration: pageJumpDebounceDuration
        })));
      };

      Table.defaultProps = defaultProps;
      return Table;
    }(React__namespace.Component);

    var List = function List(props) {
      return /*#__PURE__*/React__namespace.createElement(Table, __assign({}, props, {
        showHead: false,
        filterPosition: 'HEADER'
      }));
    };
    List.defaultProps = defaultProps;

    var useState$1 = React__namespace.useState;
    var VerticalNavigation = function VerticalNavigation(props) {
      var _a;

      var menus = props.menus,
          active = props.active,
          onClick = props.onClick,
          expanded = props.expanded,
          rounded = props.rounded,
          onToggle = props.onToggle,
          footer = props.footer,
          autoCollapse = props.autoCollapse;

      var _b = useState$1({}),
          menuState = _b[0],
          setMenuState = _b[1];

      React__namespace.useEffect(function () {
        if (props.active) {
          var currMenu = getMenu(menus, props.active);
          if (currMenu) updateMenuState(currMenu, true);
        }
      }, [props.active]);

      var updateMenuState = function updateMenuState(menu, val) {
        var _a;

        var currMenu = getMenu(menus, menu);

        if (currMenu) {
          var nameSplit = currMenu.name.split('.');

          if (nameSplit.length > 1 || currMenu.subMenu) {
            var name_1 = nameSplit[0];

            if (autoCollapse) {
              setMenuState((_a = {}, _a[name_1] = val || !menuState[name_1], _a));
            } else {
              var menuData = __assign({}, menuState);

              menuData[name_1] = val !== undefined ? val : !menuData[name_1];
              setMenuState(menuData);
            }
          } else {
            if (autoCollapse) {
              if (!expanded) setMenuState({});
            }
          }
        }
      };

      var onClickHandler = function onClickHandler(menu) {
        if (!menu.disabled) {
          if (menu.subMenu) {
            if (!expanded) {
              if (onClick) onClick(menu.subMenu[0]);
            } else {
              updateMenuState(menu);
            }
          } else {
            if (onClick) onClick(menu);
          }
        }
      };

      var list = menus.map(function (menu, index) {
        var _a;

        var activeMenu = expanded && !menuState[menu.name] && isMenuActive(menus, menu, active);
        var activeMenuIcon = !expanded && isMenuActive(menus, menu, active) || activeMenu;
        var menuClasses = classNames__default["default"]((_a = {
          'Navigation-menu': true
        }, _a['Navigation-menu--vertical'] = true, _a['Navigation-menu--active'] = activeMenu, _a['Navigation-menu--rounded'] = expanded && rounded, _a));
        var menuIconClasses = classNames__default["default"]({
          'Navigation-menuIcon': true,
          'Navigation-menuIcon--active': activeMenuIcon
        });
        return /*#__PURE__*/React__namespace.createElement("div", {
          key: index,
          "data-test": "DesignSystem-Navigation-VerticalNavigation--menuWrapper"
        }, /*#__PURE__*/React__namespace.createElement("div", {
          "data-test": "DesignSystem-Navigation-VerticalNavigation--menuItem",
          className: menuClasses,
          onClick: function onClick() {
            return onClickHandler(menu);
          }
        }, menu.icon && /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-Navigation-VerticalNavigation--menuIcon",
          className: menuIconClasses,
          name: menu.icon,
          appearance: getIconAppearance(activeMenuIcon, menu.disabled)
        }), expanded && /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", {
          className: "Navigation-menuLabel"
        }, /*#__PURE__*/React__namespace.createElement(Text, {
          appearance: getTextAppearance(activeMenu, menu.disabled)
        }, menu.label)), menu.subMenu && menu.subMenu.length > 0 && /*#__PURE__*/React__namespace.createElement(Icon, {
          "data-test": "DesignSystem-Navigation-VerticalNavigation--expandedSubMenuIcon",
          className: "mx-4",
          name: menuState[menu.name] ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
          appearance: "subtle"
        }))), /*#__PURE__*/React__namespace.createElement("div", {
          className: "Navigation-subMenu"
        }, menuState[menu.name] && menu.subMenu && expanded && menu.subMenu.map(function (subMenu, ind) {
          var _a;

          var isActive = isMenuActive(menus, subMenu, active);
          var subMenuClasses = classNames__default["default"](menuClasses, (_a = {}, _a['Navigation-menu--subMenu'] = true, _a['Navigation-menu--active'] = isActive, _a));
          return /*#__PURE__*/React__namespace.createElement("div", {
            "data-test": "DesignSystem-Navigation-VerticalNavigation--subMenu",
            key: ind,
            className: subMenuClasses,
            onClick: function onClick() {
              return onClickHandler(subMenu);
            }
          }, /*#__PURE__*/React__namespace.createElement(Text, {
            appearance: getTextAppearance(isActive, subMenu.disabled)
          }, subMenu.label));
        })));
      });
      var footerClasses = classNames__default["default"]((_a = {
        'Navigation-footer': true
      }, _a['Navigation-footer--border'] = true, _a));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
        className: "Navigation-body"
      }, list), footer && /*#__PURE__*/React__namespace.createElement("div", {
        className: footerClasses
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        className: "Navigation-menuIcon Navigation-menuIcon--footer",
        name: "menu_open",
        size: 16,
        onClick: function onClick() {
          return onToggle && onToggle(!expanded);
        }
      })));
    };
    VerticalNavigation.defaultProps = {
      expanded: true,
      autoCollapse: true,
      rounded: false
    };

    var Navigation = function Navigation(props) {
      var _a;

      var type = props.type,
          align = props.align,
          menus = props.menus,
          active = props.active,
          onClick = props.onClick,
          expanded = props.expanded,
          rounded = props.rounded,
          onToggle = props.onToggle,
          footer = props.footer,
          autoCollapse = props.autoCollapse,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]((_a = {}, _a['Navigation'] = true, _a["Navigation--" + type] = type, _a['justify-content-center'] = type === 'horizontal' && align === 'center', _a['justify-content-start'] = type === 'horizontal' && align === 'left', _a['Navigation--collapsed'] = !expanded, _a), className);

      var renderNavigation = function renderNavigation() {
        return type === 'horizontal' ? /*#__PURE__*/React__namespace.createElement(HorizontalNav, {
          menus: menus,
          active: active,
          onClick: onClick
        }) : /*#__PURE__*/React__namespace.createElement(VerticalNavigation, {
          menus: menus,
          active: active,
          autoCollapse: autoCollapse,
          expanded: expanded,
          rounded: rounded,
          footer: footer,
          onToggle: onToggle,
          onClick: onClick
        });
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes
      }), renderNavigation());
    };
    Navigation.defaultProps = {
      type: 'horizontal',
      align: 'center',
      expanded: true,
      autoCollapse: true,
      rounded: false
    };

    var Status = function Status(props) {
      var status = props.status,
          meta = props.meta,
          navigationPosition = props.navigationPosition,
          navigation = props.navigation,
          tabs = props.tabs;
      var statusClasses = classNames__default["default"]({
        'PageHeader-statusWrapper': true,
        'mb-3': navigationPosition === 'bottom' && navigation || tabs
      });
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, (status || meta) && /*#__PURE__*/React__namespace.createElement("div", {
        className: statusClasses,
        "data-test": "DesignSystem-PageHeader--Status"
      }, status, meta));
    };
    var Action = function Action(props) {
      var actions = props.actions,
          navigation = props.navigation,
          stepper = props.stepper;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, actions ? /*#__PURE__*/React__namespace.createElement(Column, {
        size: "4",
        sizeXL: "4",
        sizeM: "4",
        "data-test": "DesignSystem-PageHeader--Actions"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "PageHeader-actionsWrapper"
      }, actions)) : (navigation || stepper) && /*#__PURE__*/React__namespace.createElement(Column, {
        size: "4",
        sizeXL: "4",
        sizeM: "4",
        "data-test": "DesignSystem-PageHeader--Actions"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "PageHeader-actionsWrapper"
      })));
    };
    var Nav = function Nav(props) {
      var navigation = props.navigation,
          stepper = props.stepper;

      if (!navigation && !stepper) {
        return null;
      }

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "PageHeader-navigationWrapper",
        "data-test": "DesignSystem-PageHeader--Nav"
      }, navigation || stepper);
    };
    var CenterNav = function CenterNav(props) {
      var colSize = props.colSize,
          breadcrumbs = props.breadcrumbs,
          navigationPosition = props.navigationPosition;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, (!breadcrumbs || navigationPosition === 'center') && colSize === '4' && /*#__PURE__*/React__namespace.createElement(Column, {
        size: "4",
        sizeXL: "4",
        sizeM: "4",
        "data-test": "DesignSystem-PageHeader--CenterNav"
      }, /*#__PURE__*/React__namespace.createElement(Nav, __assign({}, props))));
    };
    var BackButton = function BackButton(props) {
      var button = props.button;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, button && /*#__PURE__*/React__namespace.createElement("div", {
        className: "mr-5 my-3",
        "data-test": "DesignSystem-PageHeader--Button"
      }, button));
    };
    var Title = function Title(props) {
      var badge = props.badge,
          title = props.title;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "PageHeader-titleWrapper",
        "data-test": "DesignSystem-PageHeader--Title"
      }, /*#__PURE__*/React__namespace.createElement(Heading, {
        className: "PageHeader-title"
      }, title), badge);
    };

    var PageHeader = function PageHeader(props) {
      var _a;

      var title = props.title,
          navigation = props.navigation,
          stepper = props.stepper,
          actions = props.actions,
          tabs = props.tabs,
          breadcrumbs = props.breadcrumbs,
          badge = props.badge,
          separator = props.separator,
          status = props.status,
          meta = props.meta,
          navigationPosition = props.navigationPosition,
          className = props.className,
          button = props.button;
      var baseProps = extractBaseProps(props);
      var wrapperClasses = classNames__default["default"]((_a = {
        'PageHeader-wrapper': true
      }, _a['PageHeader-wrapper--withTabs'] = tabs, _a), className);
      var classes = classNames__default["default"]({
        PageHeader: true
      });
      var colSize = (navigation || stepper) && navigationPosition === 'center' ? '4' : actions ? '8' : '12';
      var centerNavProps = {
        colSize: colSize,
        breadcrumbs: breadcrumbs,
        navigationPosition: navigationPosition,
        navigation: navigation,
        stepper: stepper
      };
      var statusProps = {
        status: status,
        meta: meta,
        navigationPosition: navigationPosition,
        navigation: navigation,
        tabs: tabs
      };
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-PageHeader"
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: wrapperClasses
      }), breadcrumbs && /*#__PURE__*/React__namespace.createElement("div", {
        className: "pl-6",
        "data-test": "DesignSystem-PageHeader--Breadcrumbs"
      }, breadcrumbs), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex pl-6"
      }, /*#__PURE__*/React__namespace.createElement(BackButton, {
        button: button
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: classes
      }, /*#__PURE__*/React__namespace.createElement(Row, null, /*#__PURE__*/React__namespace.createElement(Column, {
        size: colSize,
        sizeXL: colSize,
        sizeM: colSize
      }, /*#__PURE__*/React__namespace.createElement(Title, {
        badge: badge,
        title: title
      })), /*#__PURE__*/React__namespace.createElement(CenterNav, __assign({}, centerNavProps)), /*#__PURE__*/React__namespace.createElement(Action, {
        actions: actions,
        navigation: navigation,
        stepper: stepper
      })), /*#__PURE__*/React__namespace.createElement(Status, __assign({}, statusProps)))), /*#__PURE__*/React__namespace.createElement("div", {
        className: "pl-3"
      }, navigationPosition === 'bottom' && /*#__PURE__*/React__namespace.createElement(Nav, {
        navigation: navigation,
        stepper: stepper
      }), tabs && /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-PageHeader--Tabs"
      }, tabs))), separator && /*#__PURE__*/React__namespace.createElement(Divider, {
        appearance: "header"
      }));
    };
    PageHeader.defaultProps = {
      navigationPosition: 'center',
      separator: true
    };

    var useEffect = React__namespace.useEffect,
        useState = React__namespace.useState;
    var IconMapping$1 = {
      audio: 'audiotrack',
      image: 'image',
      video: 'movie',
      application: 'insert_drive_file',
      others: 'text_snippet'
    };
    var FileIcon = function FileIcon(props) {
      var _a, _b;

      var progress = props.progress,
          status = props.status,
          file = props.file;

      var _c = useState(false),
          animate = _c[0],
          setAnimate = _c[1];

      var type = file.type.split('/')[0] || 'others';
      var fileType = IconMapping$1[type] ? type : 'others';
      var iconClass = classNames__default["default"]((_a = {}, _a['FileIcon'] = true, _a['FileIcon--animate'] = animate, _a["FileIcon--" + fileType] = true, _a));
      var uploadingIconClass = classNames__default["default"]((_b = {}, _b['FileIcon'] = true, _b['FileIcon--uploading'] = true, _b));
      useEffect(function () {
        if (status === 'completed') {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      }, [status]);

      if (status === 'uploading') {
        return /*#__PURE__*/React__namespace.createElement(ProgressRing, {
          size: "small",
          value: progress || 0,
          className: uploadingIconClass,
          "data-test": "DesignSystem-FileListItem--ProgressRing"
        });
      }

      return /*#__PURE__*/React__namespace.createElement(Icon, {
        name: IconMapping$1[fileType],
        className: iconClass,
        "data-test": "DesignSystem-FileListItem--Icon"
      });
    };
    FileIcon.displayName = 'FileIcon';
    FileIcon.defaultProps = {
      progress: 0,
      status: 'completed'
    };

    var FileListItem = function FileListItem(props) {
      var _a;

      var progress = props.progress,
          errorMessage = props.errorMessage,
          onClick = props.onClick,
          className = props.className,
          actions = props.actions,
          fileItem = props.fileItem,
          file = props.file,
          status = props.status,
          fileSize = props.fileSize;
      var name = file.name;
      var baseProps = extractBaseProps(props);
      var FileItemClass = classNames__default["default"]((_a = {}, _a['FileItem'] = true, _a), className);

      var onClickHandler = function onClickHandler() {
        if (onClick) {
          onClick(fileItem);
        }
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: FileItemClass,
        onClick: onClickHandler,
        "data-test": "DesignSystem-FileListItem"
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "FileItem-file"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "FileItem-fileContent"
      }, /*#__PURE__*/React__namespace.createElement(FileIcon, {
        file: file,
        status: status,
        progress: progress
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        "data-test": "DesignSystem-FileListItem--Name",
        className: "FileItem-text",
        appearance: status === 'completed' ? 'default' : 'subtle',
        weight: "medium"
      }, name)), /*#__PURE__*/React__namespace.createElement("div", {
        className: "FileItem-actions"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: "FileItem-size",
        size: "small",
        appearance: 'subtle',
        "data-test": "DesignSystem-FileListItem--Size"
      }, fileSize || file.size), !!actions && actions)), status === 'error' && /*#__PURE__*/React__namespace.createElement(InlineMessage, {
        size: "small",
        appearance: "alert",
        description: errorMessage,
        className: 'FileItem-error'
      }));
    };
    FileListItem.defaultProps = {
      progress: 0,
      errorMessage: 'Network Error'
    };
    FileListItem.displayName = 'FileListItem';

    var FileList = function FileList(props) {
      var fileList = props.fileList,
          onClick = props.onClick,
          actionRenderer = props.actionRenderer,
          className = props.className;
      var baseProps = extractBaseProps(props);
      if (fileList.length === 0) return null;
      return /*#__PURE__*/React__namespace.createElement(Card, __assign({}, baseProps, {
        shadow: 'none',
        className: className
      }), fileList.map(function (fileItem, index) {
        return /*#__PURE__*/React__namespace.createElement(FileListItem, __assign({
          key: index,
          onClick: onClick,
          actions: actionRenderer && actionRenderer(fileItem),
          fileItem: fileItem
        }, fileItem));
      }));
    };
    FileList.defaultProps = {
      fileList: []
    };
    FileList.displayName = 'FileList';

    var KEY_CODE = {
      backspace: 'Backspace',
      left: 'ArrowLeft',
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
      e: 'e',
      E: 'E'
    };

    var VerificationCodeInput = function VerificationCodeInput(props) {
      var _a = props.type,
          type = _a === void 0 ? 'number' : _a,
          _b = props.fields,
          fields = _b === void 0 ? 4 : _b,
          _c = props.placeholder,
          placeholder = _c === void 0 ? '_' : _c,
          _d = props.autoFocus,
          autoFocus = _d === void 0 ? true : _d,
          onComplete = props.onComplete,
          onFocus = props.onFocus,
          onBlur = props.onBlur,
          className = props.className;
          props.value;
          var rest = __rest(props, ["type", "fields", "placeholder", "autoFocus", "onComplete", "onFocus", "onBlur", "className", "value"]);

      var initialValues = React.useMemo(function () {
        if (props.value && props.value.length) {
          return props.value.split('');
        }

        return Array(fields).fill('');
      }, []);
      var initialRefs = React.useMemo(function () {
        return __spreadArrays(Array(fields)).map(function () {
          return /*#__PURE__*/React__default["default"].createRef();
        });
      }, []);

      var _e = React.useState(initialValues),
          values = _e[0],
          setValues = _e[1];

      var refs = React.useState(initialRefs)[0];
      React.useEffect(function () {
        if (refs[0] && refs[0].current && autoFocus) {
          refs[0].current.focus({
            preventScroll: true
          });
        }
      }, []);
      React.useEffect(function () {
        var completeValue = values.join('');

        if (onComplete && completeValue.length === fields) {
          onComplete(completeValue);
        }
      }, [values]);

      var onChangeHandler = function onChangeHandler(e) {
        var index = parseInt(e.target.dataset.id, 10);
        var fieldValue = e.target.value;
        var nextRef;

        var newValues = __spreadArrays(values);

        if (!fieldValue) {
          return;
        }

        if (fieldValue.length > 1) {
          var nextIndex = fieldValue.length + index - 1;

          if (nextIndex >= fields) {
            nextIndex = fields - 1;
          }

          nextRef = refs[nextIndex];
          var split = fieldValue.split('');
          split.forEach(function (item, i) {
            var cursor = index + i;

            if (cursor < fields) {
              newValues[cursor] = item;
            }
          });
          setValues(newValues);
        } else {
          nextRef = refs[index + 1];
          newValues[index] = fieldValue;
          setValues(newValues);
        }

        if (nextRef && nextRef.current) {
          nextRef.current.focus({
            preventScroll: true
          });
          nextRef.current.select();
        }
      };

      var onFocusHandler = function onFocusHandler(e) {
        e.target.select();
        e.target.placeholder = '';

        if (onFocus) {
          onFocus(e);
        }
      };

      var onBlurHandler = function onBlurHandler(e) {
        e.target.placeholder = placeholder;

        if (onBlur) {
          onBlur(e);
        }
      };

      var onKeyDown = function onKeyDown(e) {
        var index = parseInt(e.currentTarget.dataset.id, 10);
        var prevIndex = index - 1;
        var nextIndex = index + 1;
        var prev = refs[prevIndex];
        var nextRef = refs[nextIndex];

        switch (e.key) {
          case KEY_CODE.backspace:
            {
              e.preventDefault();

              var vals = __spreadArrays(values);

              if (values[index]) {
                vals[index] = '';
                setValues(vals);
              } else if (prev && prev.current) {
                vals[prevIndex] = '';
                prev.current.focus({
                  preventScroll: true
                });
                setValues(vals);
              }

              break;
            }

          case KEY_CODE.left:
            {
              e.preventDefault();

              if (prev && prev.current) {
                prev.current.focus({
                  preventScroll: true
                });
              }

              break;
            }

          case KEY_CODE.right:
            {
              e.preventDefault();

              if (nextRef && nextRef.current) {
                nextRef.current.focus({
                  preventScroll: true
                });
              }

              break;
            }

          case KEY_CODE.up:
          case KEY_CODE.down:
          case KEY_CODE.e:
          case KEY_CODE.E:
            {
              if (type === 'number') {
                e.preventDefault();
              }

              break;
            }
        }
      };

      var wrapperClassNames = function wrapperClassNames(i) {
        return classNames__default["default"]({
          'VerificationCodeInput-Input': true,
          'ml-4': i > 0
        }, className);
      };

      return /*#__PURE__*/React__default["default"].createElement("div", {
        "data-test": "DesignSystem-VerificationCodeInput",
        className: "VerificationCodeInput"
      }, values.map(function (val, index) {
        return /*#__PURE__*/React__default["default"].createElement(Input, __assign({
          key: index,
          className: wrapperClassNames(index),
          size: "large",
          minWidth: "40px",
          value: val,
          placeholder: placeholder,
          onChange: onChangeHandler,
          onKeyDown: onKeyDown,
          onFocus: onFocusHandler,
          onBlur: onBlurHandler,
          "data-id": index,
          ref: refs[index],
          type: type
        }, rest));
      }));
    };

    VerificationCodeInput.displayName = 'VerificationCodeInput';
    VerificationCodeInput.defaultProps = {
      type: 'number',
      fields: 4
    };

    var IconMapping = {
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      alert: 'error'
    };
    var InlineMessage = function InlineMessage(props) {
      var _a, _b, _c;

      var appearance = props.appearance,
          className = props.className,
          description = props.description,
          size = props.size;
      var baseProps = extractBaseProps(props);
      var InlineMessageClass = classNames__default["default"]((_a = {}, _a['InlineMessage'] = true, _a), className);
      var IconClass = classNames__default["default"]((_b = {}, _b['InlineMessage-icon--warning'] = appearance === 'warning', _b['InlineMessage-icon--small'] = size === 'small', _b['InlineMessage-icon--regular'] = size === 'regular', _b));
      var DescriptionClass = classNames__default["default"]((_c = {}, _c["InlineMessage-text--" + appearance] = appearance, _c));
      var IconSize = size === 'small' ? 14 : 16;
      var TextWeight = size === 'small' ? 'medium' : undefined;
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-InlineMessage"
      }, baseProps, {
        className: InlineMessageClass
      }), appearance !== 'default' && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-InlineMessage--Icon",
        name: IconMapping[appearance],
        appearance: appearance,
        className: IconClass,
        size: IconSize
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        size: size,
        weight: TextWeight,
        className: DescriptionClass,
        "data-test": "DesignSystem-InlineMessage--Description"
      }, description));
    };
    InlineMessage.displayName = 'InlineMessage';
    InlineMessage.defaultProps = {
      appearance: 'default',
      description: '',
      size: 'regular'
    };

    var renderCheckbox = function renderCheckbox(list, handleOnChange, ChoiceListDisabled, size, alignment, selected) {
      return list.map(function (item, checkboxIndex) {
        var name = item.name,
            value = item.value,
            helpText = item.helpText,
            disabled = item.disabled,
            label = item.label;
        return /*#__PURE__*/React__namespace.createElement(Checkbox, {
          key: checkboxIndex,
          label: label,
          onChange: handleOnChange,
          disabled: disabled || ChoiceListDisabled,
          helpText: helpText,
          size: size,
          name: name,
          value: value,
          defaultChecked: selected.length !== 0 && selected.includes(value),
          className: getCheckboxClassName(alignment, checkboxIndex)
        });
      });
    };

    var renderRadio = function renderRadio(list, handleOnChange, ChoiceListDisabled, size, alignment, selected) {
      return list.map(function (item, radioIndex) {
        var name = item.name,
            value = item.value,
            helpText = item.helpText,
            disabled = item.disabled,
            label = item.label;
        return /*#__PURE__*/React__namespace.createElement(Radio, {
          key: radioIndex,
          label: label,
          onChange: handleOnChange,
          disabled: disabled || ChoiceListDisabled,
          helpText: helpText,
          size: size,
          name: name,
          value: value,
          defaultChecked: selected.length !== 0 && selected.includes(value),
          className: getRadioClassName(alignment, radioIndex)
        });
      });
    };

    var getCheckboxClassName = function getCheckboxClassName(alignment, index) {
      var _a;

      var ChoiceListCheckboxClass = classNames__default["default"]((_a = {}, _a["ChoiceList-checkbox--" + alignment] = true, _a['ml-0'] = index === 0 && alignment === 'horizontal', _a['mt-4'] = alignment === 'horizontal', _a));
      return ChoiceListCheckboxClass;
    };

    var getRadioClassName = function getRadioClassName(alignment, index) {
      var _a;

      var ChoiceListRadioClass = classNames__default["default"]((_a = {}, _a["ChoiceList-radio--" + alignment] = true, _a['ml-0'] = index === 0 && alignment === 'horizontal', _a['mt-4'] = alignment === 'horizontal', _a));
      return ChoiceListRadioClass;
    };

    var ChoiceList = function ChoiceList(props) {
      var _a, _b, _c;

      var title = props.title,
          choices = props.choices,
          _d = props.alignment,
          alignment = _d === void 0 ? 'vertical' : _d,
          _e = props.allowMultiple,
          allowMultiple = _e === void 0 ? false : _e,
          onChange = props.onChange,
          _f = props.disabled,
          disabled = _f === void 0 ? false : _f,
          _g = props.size,
          size = _g === void 0 ? 'regular' : _g,
          className = props.className;
      var _h = props.selected,
          selected = _h === void 0 ? [] : _h;
      var selectedChoiceValue = selected && selected || [];
      var ChoiceListClass = classNames__default["default"]((_a = {}, _a['ChoiceList'] = true, _a), className);
      var ChoiceListVerticalClass = classNames__default["default"]((_b = {}, _b['ChoiceList--alignVertical'] = true, _b));
      var ChoiceHorizontalClass = classNames__default["default"]((_c = {}, _c['ChoiceList--alignHorizontal'] = true, _c));

      var handleOnChange = function handleOnChange(e) {
        if (e.target.checked && allowMultiple) {
          if (!selectedChoiceValue.includes(e.target.value)) {
            selectedChoiceValue = __spreadArrays(selectedChoiceValue, [e.target.value]);
          }
        } else if (!e.target.checked && allowMultiple) {
          selectedChoiceValue = selectedChoiceValue.filter(function (el) {
            return el !== e.target.value;
          });
        }

        if (!allowMultiple) {
          if (!selectedChoiceValue.includes(e.target.value)) {
            selectedChoiceValue = [];
            selectedChoiceValue = __spreadArrays(selectedChoiceValue, [e.target.value]);
          }
        }

        if (onChange) onChange(e, selectedChoiceValue);
      };

      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("fieldset", {
        className: ChoiceListClass,
        "data-test": "DesignSystem-ChoiceList-Wrapper"
      }, title && title.trim() && /*#__PURE__*/React__namespace.createElement(Label, {
        withInput: true
      }, title.trim()), allowMultiple ? /*#__PURE__*/React__namespace.createElement("div", {
        className: "" + (alignment === 'horizontal' ? ChoiceHorizontalClass : ChoiceListVerticalClass)
      }, renderCheckbox(choices, handleOnChange, disabled, size, alignment, selected)) : /*#__PURE__*/React__namespace.createElement("div", {
        className: "" + (alignment === 'horizontal' ? ChoiceHorizontalClass : ChoiceListVerticalClass)
      }, renderRadio(choices, handleOnChange, disabled, size, alignment, selected))));
    };
    ChoiceList.displayName = 'ChoiceList';
    ChoiceList.defaultProps = {
      alignment: 'vertical',
      size: 'regular',
      allowMultiple: false,
      disabled: false
    };

    var Divider = function Divider(props) {
      var _a;

      var vertical = props.vertical,
          appearance = props.appearance,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var DividerClass = classNames__default["default"]((_a = {}, _a['Divider'] = true, _a['Divider--horizontal'] = !vertical, _a['Divider--vertical'] = vertical, _a['Divider--basic'] = !vertical && appearance !== 'header', _a['Divider--header'] = !vertical && appearance === 'header', _a), className);
      return /*#__PURE__*/React__namespace.createElement("hr", __assign({
        "data-test": "DesignSystem-Divider"
      }, baseProps, {
        className: DividerClass
      }));
    };
    Divider.displayName = 'Divider';
    Divider.defaultProps = {
      appearance: 'basic',
      vertical: false
    };

    var HelpText = function HelpText(props) {
      var error = props.error,
          message = props.message,
          className = props.className;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        'mt-3': true
      }, className);
      if (!message) return null;

      if (error) {
        return /*#__PURE__*/React__namespace.createElement(InlineMessage, {
          size: "small",
          className: classes,
          appearance: "alert",
          description: message
        });
      }

      return /*#__PURE__*/React__namespace.createElement("div", __assign({}, baseProps, {
        className: classes
      }), /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "subtle",
        size: "small",
        weight: "medium"
      }, message));
    };
    HelpText.displayName = 'HelpText';

    var sizeMapping = {
      tiny: 12,
      regular: 16
    };
    var LinkButton = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _a, _b;

      var children = props.children,
          type = props.type,
          className = props.className,
          disabled = props.disabled,
          tabIndex = props.tabIndex,
          icon = props.icon,
          subtle = props.subtle,
          size = props.size,
          iconAlign = props.iconAlign,
          iconType = props.iconType,
          rest = __rest(props, ["children", "type", "className", "disabled", "tabIndex", "icon", "subtle", "size", "iconAlign", "iconType"]);

      var buttonClass = classNames__default["default"]((_a = {}, _a['LinkButton'] = true, _a["LinkButton--" + size] = size, _a['LinkButton--default'] = !subtle, _a['LinkButton--subtle'] = subtle, _a["LinkButton--iconAlign-" + iconAlign] = children && iconAlign, _a["" + className] = className, _a));
      var iconClass = classNames__default["default"]((_b = {}, _b['LinkButton-icon'] = true, _b["LinkButton-icon--" + iconAlign] = children && iconAlign, _b));
      return /*#__PURE__*/React__namespace.createElement("button", __assign({
        ref: ref,
        type: type,
        "data-test": "DesignSystem-LinkButton",
        className: buttonClass,
        disabled: disabled,
        tabIndex: tabIndex
      }, rest), /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, icon && /*#__PURE__*/React__namespace.createElement("div", {
        className: iconClass
      }, /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-LinkButton--Icon",
        name: icon,
        type: iconType,
        size: size && sizeMapping[size]
      })), children));
    });
    LinkButton.displayName = 'LinkButton';
    LinkButton.defaultProps = {
      size: 'regular',
      type: 'button',
      iconAlign: 'left'
    };

    var ActionCard = function ActionCard(props) {
      var _a;

      var children = props.children,
          disabled = props.disabled,
          className = props.className,
          zIndex = props.zIndex,
          onClick = props.onClick,
          rest = __rest(props, ["children", "disabled", "className", "zIndex", "onClick"]);

      var classes = classNames__default["default"]((_a = {}, _a['ActionCard'] = true, _a['ActionCard--disabled'] = disabled, _a), className);

      var onKeyDownHandler = function onKeyDownHandler(event) {
        if (event.key === 'Enter' && onClick) {
          onClick(event);
        }
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        tabIndex: disabled ? -1 : 0,
        role: "link",
        "data-test": "DesignSystem-ActionCard",
        className: classes,
        onClick: onClick,
        onKeyDown: onKeyDownHandler
      }, rest), disabled && /*#__PURE__*/React__namespace.createElement("div", {
        style: {
          zIndex: zIndex
        },
        "data-test": "DesignSystem-ActionCard-Overlay",
        className: "ActionCard-overlay--disabled"
      }), children);
    };
    ActionCard.displayName = 'ActionCard';

    var selectedCardValues = new Map();
    function useMultiSelect() {
      var _a = React__namespace.useState([]),
          selectedCardIds = _a[0],
          setSelectedCardIds = _a[1];

      var isCardSelected = function isCardSelected(id) {
        return selectedCardIds.includes(id);
      };

      var updateCardSelection = function updateCardSelection(id, value) {
        var idList = __spreadArrays(selectedCardIds);

        if (isCardSelected(id)) {
          idList = selectedCardIds.filter(function (cardKey) {
            return id !== cardKey;
          });
          selectedCardValues["delete"](id);
        } else {
          idList.push(id);
          selectedCardValues.set(id, value);
        }

        setSelectedCardIds(idList);
      };

      return {
        selectedCardIds: selectedCardIds,
        selectedCardValues: selectedCardValues,
        isCardSelected: isCardSelected,
        updateCardSelection: updateCardSelection
      };
    }

    function useSingleSelect() {
      var _a = React__namespace.useState([]),
          selectedCardIds = _a[0],
          setSelectedCardIds = _a[1];

      var _b = React__namespace.useState([]),
          selectedCardValues = _b[0],
          setSelectedCardValues = _b[1];

      var isCardSelected = function isCardSelected(id) {
        return selectedCardIds.includes(id);
      };

      var updateCardSelection = function updateCardSelection(id, value) {
        var idList = __spreadArrays(selectedCardIds);

        var valueList = __spreadArrays(selectedCardValues);

        if (selectedCardIds.includes(id)) {
          idList = [];
          valueList = [];
        } else {
          idList = [id];
          valueList = value ? [value] : [];
        }

        setSelectedCardIds(idList);
        setSelectedCardValues(valueList);
      };

      return {
        selectedCardIds: selectedCardIds,
        selectedCardValues: selectedCardValues,
        isCardSelected: isCardSelected,
        updateCardSelection: updateCardSelection
      };
    }

    var SelectionCard = function SelectionCard(props) {
      var _a;

      var children = props.children,
          onClick = props.onClick,
          disabled = props.disabled,
          id = props.id,
          cardValue = props.cardValue,
          overlayZIndex = props.overlayZIndex,
          selected = props.selected,
          className = props.className,
          rest = __rest(props, ["children", "onClick", "disabled", "id", "cardValue", "overlayZIndex", "selected", "className"]);

      var classes = classNames__default["default"]((_a = {}, _a['Selection-card'] = true, _a['Selection-card--selected'] = selected, _a['Selection-card--disabled'] = disabled && !selected, _a['Selection-card--selected-disabled'] = disabled && selected, _a), className);

      var onClickHandler = function onClickHandler(event) {
        onClick && onClick(event, id, cardValue);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        if (event.key === 'Enter') {
          onClickHandler(event);
        }
      };

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        role: "checkbox",
        "aria-checked": selected,
        tabIndex: 0,
        onKeyDown: onKeyDownHandler,
        onClick: function onClick(event) {
          return onClickHandler(event);
        },
        className: classes,
        "data-test": "DesignSystem-SelectionCard"
      }, rest), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Selection-card-overlay",
        style: {
          zIndex: overlayZIndex
        },
        "data-test": "DesignSystem-SelectionCard-Overlay"
      }), children);
    };
    SelectionCard.defaultProps = {
      disabled: false,
      overlayZIndex: 2
    };
    SelectionCard.useMultiSelect = useMultiSelect;
    SelectionCard.useSingleSelect = useSingleSelect;

    function arrayMove(array, from, to) {
      array = array.slice();
      array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
      return array;
    }
    function getTranslateOffset(element) {
      var style = window.getComputedStyle(element);
      return Math.max(parseInt(style['margin-top'], 10), parseInt(style['margin-bottom'], 10)) + element.getBoundingClientRect().height;
    }
    function isTouchEvent(event) {
      return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
    }
    function transformItem(element, offsetY, offsetX) {
      if (offsetY === void 0) {
        offsetY = 0;
      }

      if (offsetX === void 0) {
        offsetX = 0;
      }

      if (!element) return;

      if (offsetY === null || offsetX === null) {
        element.style.removeProperty('transform');
        return;
      }

      element.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
    }
    function setItemTransition(element, duration, timing) {
      if (element) {
        element.style['transition'] = "transform " + duration + "ms" + (timing ? " " + timing : '');
      }
    }
    function binarySearch(array, targetValue) {
      var min = 0;
      var max = array.length - 1;
      var guess;

      while (min <= max) {
        guess = Math.floor((max + min) / 2);

        if (!array[guess + 1] || array[guess] <= targetValue && array[guess + 1] >= targetValue) {
          return guess;
        } else if (array[guess] < targetValue && array[guess + 1] < targetValue) {
          min = guess + 1;
        } else {
          max = guess - 1;
        }
      }

      return -1;
    }
    var schd = function schd(fn) {
      var lastArgs = [];
      var frameId = null;

      var wrapperFn = function wrapperFn() {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        lastArgs = args;

        if (frameId) {
          return;
        }

        frameId = requestAnimationFrame(function () {
          frameId = null;
          fn.apply(void 0, lastArgs);
        });
      };

      wrapperFn.cancel = function () {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };

      return wrapperFn;
    };

    var AUTOSCROLL_ACTIVE_OFFSET = 200;
    var AUTOSCROLL_SPEED_RATIO = 10;

    var Draggable = function (_super) {
      __extends(Draggable, _super);

      function Draggable(props) {
        var _this = _super.call(this, props) || this;

        _this.listRef = /*#__PURE__*/React__namespace.createRef();
        _this.ghostRef = /*#__PURE__*/React__namespace.createRef();
        _this.topOffsets = [];
        _this.itemTranslateOffsets = [];
        _this.initialYOffset = 0;
        _this.lastScroll = 0;
        _this.lastYOffset = 0;
        _this.lastListYOffset = 0;
        _this.needle = -1;
        _this.afterIndex = -2;
        _this.state = {
          itemDragged: -1,
          itemDraggedOutOfBounds: -1,
          selectedItem: -1,
          initialX: 0,
          initialY: 0,
          targetX: 0,
          targetY: 0,
          targetHeight: 0,
          targetWidth: 0,
          scrollingSpeed: 0,
          scrollWindow: false
        };

        _this.doScrolling = function () {
          var _a = _this.state,
              scrollingSpeed = _a.scrollingSpeed,
              scrollWindow = _a.scrollWindow;
          var listEl = _this.listRef.current;
          window.requestAnimationFrame(function () {
            if (scrollWindow) {
              window.scrollTo(window.pageXOffset, window.pageYOffset + scrollingSpeed * 1.5);
            } else {
              listEl.scrollTop += scrollingSpeed;
            }

            if (scrollingSpeed !== 0) {
              _this.doScrolling();
            }
          });
        };

        _this.getChildren = function () {
          if (_this.listRef && _this.listRef.current) {
            return Array.from(_this.listRef.current.children);
          }

          return [];
        };

        _this.calculateOffsets = function () {
          _this.topOffsets = _this.getChildren().map(function (item) {
            return item.getBoundingClientRect().top;
          });
          _this.itemTranslateOffsets = _this.getChildren().map(function (item) {
            return getTranslateOffset(item);
          });
        };

        _this.getTargetIndex = function (e) {
          return _this.getChildren().findIndex(function (child) {
            return child === e.target || child.contains(e.target);
          });
        };

        _this.onMouseOrTouchStart = function (e) {
          var _a;

          if (_this.dropTimeout && _this.state.itemDragged > -1) {
            window.clearTimeout(_this.dropTimeout);

            _this.finishDrop();
          }

          var isTouch = isTouchEvent(e);
          if (!isTouch && e.button !== 0) return;

          var index = _this.getTargetIndex(e);

          var listItemTouched = _this.getChildren()[index];

          var isValidDragHandle = (_a = e.target) === null || _a === void 0 ? void 0 : _a.classList.contains('Listbox-item--drag-icon');
          if (!isValidDragHandle) return;
          e.preventDefault();

          if (isTouch) {
            var opts = {
              passive: false
            };
            listItemTouched.style.touchAction = 'none';
            document.addEventListener('touchend', _this.schdOnEnd, opts);
            document.addEventListener('touchmove', _this.schdOnTouchMove, opts);
            document.addEventListener('touchcancel', _this.schdOnEnd, opts);
          } else {
            document.addEventListener('mousemove', _this.schdOnMouseMove);
            document.addEventListener('mouseup', _this.schdOnEnd);

            var listItemDragged = _this.getChildren()[_this.state.itemDragged];

            if (listItemDragged && listItemDragged.style) {
              listItemDragged.style.touchAction = '';
            }
          }

          _this.onStart(listItemTouched, isTouch ? e.touches[0].clientX : e.clientX, isTouch ? e.touches[0].clientY : e.clientY, index);
        };

        _this.getYOffset = function () {
          var listScroll = _this.listRef.current ? _this.listRef.current.scrollTop : 0;
          return window.pageYOffset + listScroll;
        };

        _this.onStart = function (target, clientX, clientY, index) {
          if (_this.state.selectedItem > -1) {
            _this.setState({
              selectedItem: -1
            });

            _this.needle = -1;
          }

          var targetRect = target.getBoundingClientRect();
          var targetStyles = window.getComputedStyle(target);

          _this.calculateOffsets();

          _this.initialYOffset = _this.getYOffset();
          _this.lastYOffset = window.pageYOffset;
          _this.lastListYOffset = _this.listRef.current.scrollTop;

          _this.setState({
            itemDragged: index,
            targetX: targetRect.left - parseInt(targetStyles['margin-left'], 10),
            targetY: targetRect.top - parseInt(targetStyles['margin-top'], 10),
            targetHeight: targetRect.height,
            targetWidth: targetRect.width,
            initialX: clientX,
            initialY: clientY
          });
        };

        _this.onMouseMove = function (e) {
          e.cancelable && e.preventDefault();

          _this.onMove(e.clientX, e.clientY);
        };

        _this.onTouchMove = function (e) {
          e.cancelable && e.preventDefault();

          _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
        };

        _this.onWheel = function (e) {
          if (_this.state.itemDragged < 0) return;
          _this.lastScroll = _this.listRef.current.scrollTop += e.deltaY;

          _this.moveOtherItems();
        };

        _this.onMove = function (clientX, clientY) {
          if (_this.state.itemDragged === -1) return null;
          transformItem(_this.ghostRef.current, clientY - _this.state.initialY, _this.props.lockVertically ? 0 : clientX - _this.state.initialX);

          _this.autoScrolling(clientY);

          _this.moveOtherItems();

          return;
        };

        _this.moveOtherItems = function () {
          var targetRect = _this.ghostRef.current.getBoundingClientRect();

          var itemVerticalCenter = targetRect.top + targetRect.height / 2;
          var offset = getTranslateOffset(_this.getChildren()[_this.state.itemDragged]);

          var currentYOffset = _this.getYOffset();

          if (_this.initialYOffset !== currentYOffset) {
            _this.topOffsets = _this.topOffsets.map(function (offset) {
              return offset - (currentYOffset - _this.initialYOffset);
            });
            _this.initialYOffset = currentYOffset;
          }

          if (_this.isDraggedItemOutOfBounds() && _this.props.removableByMove) {
            _this.afterIndex = _this.topOffsets.length + 1;
          } else {
            _this.afterIndex = binarySearch(_this.topOffsets, itemVerticalCenter);
          }

          _this.animateItems(_this.afterIndex === -1 ? 0 : _this.afterIndex, _this.state.itemDragged, offset);
        };

        _this.autoScrolling = function (clientY) {
          var _a = _this.listRef.current.getBoundingClientRect(),
              top = _a.top,
              bottom = _a.bottom,
              height = _a.height;

          var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

          if (bottom > viewportHeight && viewportHeight - clientY < AUTOSCROLL_ACTIVE_OFFSET) {
            _this.setState({
              scrollingSpeed: Math.round((AUTOSCROLL_ACTIVE_OFFSET - (viewportHeight - clientY)) / AUTOSCROLL_SPEED_RATIO),
              scrollWindow: true
            });
          } else if (top < 0 && clientY < AUTOSCROLL_ACTIVE_OFFSET) {
            _this.setState({
              scrollingSpeed: Math.round((AUTOSCROLL_ACTIVE_OFFSET - clientY) / -AUTOSCROLL_SPEED_RATIO),
              scrollWindow: true
            });
          } else {
            if (_this.state.scrollWindow && _this.state.scrollingSpeed !== 0) {
              _this.setState({
                scrollingSpeed: 0,
                scrollWindow: false
              });
            }

            if (height + 20 < _this.listRef.current.scrollHeight) {
              var scrollingSpeed = 0;

              if (clientY - top < AUTOSCROLL_ACTIVE_OFFSET) {
                scrollingSpeed = Math.round((AUTOSCROLL_ACTIVE_OFFSET - (clientY - top)) / -AUTOSCROLL_SPEED_RATIO);
              } else if (bottom - clientY < AUTOSCROLL_ACTIVE_OFFSET) {
                scrollingSpeed = Math.round((AUTOSCROLL_ACTIVE_OFFSET - (bottom - clientY)) / AUTOSCROLL_SPEED_RATIO);
              }

              if (_this.state.scrollingSpeed !== scrollingSpeed) {
                _this.setState({
                  scrollingSpeed: scrollingSpeed
                });
              }
            }
          }
        };

        _this.animateItems = function (needle, movedItem, offset, animateMovedItem) {
          if (animateMovedItem === void 0) {
            animateMovedItem = false;
          }

          _this.getChildren().forEach(function (item, i) {
            setItemTransition(item, _this.props.transitionDuration);

            if (movedItem === i && animateMovedItem) {
              if (movedItem === needle) {
                return transformItem(item, null);
              }

              transformItem(item, movedItem < needle ? _this.itemTranslateOffsets.slice(movedItem + 1, needle + 1).reduce(function (a, b) {
                return a + b;
              }, 0) : _this.itemTranslateOffsets.slice(needle, movedItem).reduce(function (a, b) {
                return a + b;
              }, 0) * -1);
            } else if (movedItem < needle && i > movedItem && i <= needle) {
              transformItem(item, -offset);
            } else if (i < movedItem && movedItem > needle && i >= needle) {
              transformItem(item, offset);
            } else {
              transformItem(item, null);
            }
          });
        };

        _this.isDraggedItemOutOfBounds = function () {
          var initialRect = _this.getChildren()[_this.state.itemDragged].getBoundingClientRect();

          var targetRect = _this.ghostRef.current.getBoundingClientRect();

          if (Math.abs(initialRect.left - targetRect.left) > targetRect.width) {
            if (_this.state.itemDraggedOutOfBounds === -1) {
              _this.setState({
                itemDraggedOutOfBounds: _this.state.itemDragged
              });
            }

            return true;
          }

          if (_this.state.itemDraggedOutOfBounds > -1) {
            _this.setState({
              itemDraggedOutOfBounds: -1
            });
          }

          return false;
        };

        _this.onEnd = function (e) {
          e.cancelable && e.preventDefault();
          document.removeEventListener('mousemove', _this.schdOnMouseMove);
          document.removeEventListener('touchmove', _this.schdOnTouchMove);
          document.removeEventListener('mouseup', _this.schdOnEnd);
          document.removeEventListener('touchup', _this.schdOnEnd);
          document.removeEventListener('touchcancel', _this.schdOnEnd);

          var removeItem = _this.props.removableByMove && _this.isDraggedItemOutOfBounds();

          if (!removeItem && _this.props.transitionDuration > 0 && _this.afterIndex !== -2) {
            schd(function () {
              setItemTransition(_this.ghostRef.current, _this.props.transitionDuration, 'cubic-bezier(0.2, 0, 0.38, 0.9)');

              if (_this.afterIndex < 1 && _this.state.itemDragged === 0) {
                transformItem(_this.ghostRef.current, 0, 0);
              } else {
                transformItem(_this.ghostRef.current, -(window.pageYOffset - _this.lastYOffset) + -(_this.listRef.current.scrollTop - _this.lastListYOffset) + (_this.state.itemDragged < _this.afterIndex ? _this.itemTranslateOffsets.slice(_this.state.itemDragged + 1, _this.afterIndex + 1).reduce(function (a, b) {
                  return a + b;
                }, 0) : _this.itemTranslateOffsets.slice(_this.afterIndex < 0 ? 0 : _this.afterIndex, _this.state.itemDragged).reduce(function (a, b) {
                  return a + b;
                }, 0) * -1), 0);
              }
            })();
          }

          _this.dropTimeout = window.setTimeout(_this.finishDrop, removeItem || _this.afterIndex === -2 ? 0 : _this.props.transitionDuration);
        };

        _this.finishDrop = function () {
          var removeItem = _this.props.removableByMove && _this.isDraggedItemOutOfBounds();

          if (removeItem || _this.afterIndex > -2 && _this.state.itemDragged !== _this.afterIndex) {
            _this.props.onChange({
              oldIndex: _this.state.itemDragged,
              newIndex: removeItem ? -1 : Math.max(_this.afterIndex, 0),
              targetRect: _this.ghostRef.current.getBoundingClientRect()
            });
          }

          _this.getChildren().forEach(function (item) {
            setItemTransition(item, 0);
            transformItem(item, null);
            item.style.touchAction = '';
          });

          _this.setState({
            itemDragged: -1,
            scrollingSpeed: 0
          });

          _this.afterIndex = -2;

          if (_this.lastScroll > 0) {
            _this.listRef.current.scrollTop = _this.lastScroll;
            _this.lastScroll = 0;
          }
        };

        _this.onKeyDown = function (e) {
          var selectedItem = _this.state.selectedItem;

          var index = _this.getTargetIndex(e);

          if (index === -1 || _this.props.values[index] && _this.props.values[index].props.disabled) {
            return;
          }

          if (e.key === ' ') {
            e.preventDefault();

            if (selectedItem === index) {
              if (selectedItem !== _this.needle) {
                _this.getChildren().forEach(function (item) {
                  setItemTransition(item, 0);
                  transformItem(item, null);
                });

                _this.props.onChange({
                  oldIndex: selectedItem,
                  newIndex: _this.needle,
                  targetRect: _this.getChildren()[_this.needle].getBoundingClientRect()
                });

                _this.getChildren()[_this.needle].focus();
              }

              _this.setState({
                selectedItem: -1
              });

              _this.needle = -1;
            } else {
              _this.setState({
                selectedItem: index
              });

              _this.needle = index;

              _this.calculateOffsets();
            }
          }

          if ((e.key === 'ArrowDown' || e.key === 'j') && selectedItem > -1 && _this.needle < _this.props.values.length - 1) {
            e.preventDefault();
            var offset = getTranslateOffset(_this.getChildren()[selectedItem]);
            _this.needle++;

            _this.animateItems(_this.needle, selectedItem, offset, true);
          }

          if ((e.key === 'ArrowUp' || e.key === 'k') && selectedItem > -1 && _this.needle > 0) {
            e.preventDefault();
            var offset = getTranslateOffset(_this.getChildren()[selectedItem]);
            _this.needle--;

            _this.animateItems(_this.needle, selectedItem, offset, true);
          }

          if (e.key === 'Escape' && selectedItem > -1) {
            _this.getChildren().forEach(function (item) {
              setItemTransition(item, 0);
              transformItem(item, null);
            });

            _this.setState({
              selectedItem: -1
            });

            _this.needle = -1;
          }

          if ((e.key === 'Tab' || e.key === 'Enter') && selectedItem > -1) {
            e.preventDefault();
          }
        };

        _this.schdOnMouseMove = schd(_this.onMouseMove);
        _this.schdOnTouchMove = schd(_this.onTouchMove);
        _this.schdOnEnd = schd(_this.onEnd);
        return _this;
      }

      Draggable.prototype.componentDidMount = function () {
        this.calculateOffsets();
        document.addEventListener('touchstart', this.onMouseOrTouchStart, {
          passive: false,
          capture: false
        });
        document.addEventListener('mousedown', this.onMouseOrTouchStart);
      };

      Draggable.prototype.componentDidUpdate = function (_prevProps, prevState) {
        if (prevState.scrollingSpeed !== this.state.scrollingSpeed && prevState.scrollingSpeed === 0) {
          this.doScrolling();
        }
      };

      Draggable.prototype.componentWillUnmount = function () {
        document.removeEventListener('touchstart', this.onMouseOrTouchStart);
        document.removeEventListener('mousedown', this.onMouseOrTouchStart);

        if (this.dropTimeout) {
          window.clearTimeout(this.dropTimeout);
        }

        this.schdOnMouseMove.cancel();
        this.schdOnTouchMove.cancel();
        this.schdOnEnd.cancel();
      };

      Draggable.prototype.render = function () {
        var _this = this;

        var baseStyle = {
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          boxSizing: 'border-box',
          position: 'relative'
        };

        var ghostStyle = __assign(__assign({}, baseStyle), {
          top: this.state.targetY,
          left: this.state.targetX,
          width: this.state.targetWidth,
          height: this.state.targetHeight,
          backgroundColor: '#ffffff',
          listStyleType: 'none',
          margin: 0,
          position: 'fixed',
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.16)'
        });

        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, this.props.renderList({
          children: this.props.values.map(function (value, index) {
            var isHidden = index === _this.state.itemDragged;
            var isSelected = index === _this.state.selectedItem;
            var isDisabled = _this.props.values[index] && _this.props.values[index].props.disabled;
            var props = {
              key: index,
              tabIndex: isDisabled ? -1 : 0,
              onKeyDown: _this.onKeyDown,
              style: __assign(__assign({}, baseStyle), {
                visibility: isHidden ? 'hidden' : undefined,
                zIndex: isSelected ? 5000 : 0
              })
            };
            return _this.props.renderItem({
              value: value,
              props: props,
              index: index,
              isDragged: false,
              isSelected: isSelected,
              isOutOfBounds: false
            });
          }),
          isDragged: this.state.itemDragged > -1,
          props: {
            ref: this.listRef
          }
        }), this.state.itemDragged > -1 && /*#__PURE__*/ReactDOM__namespace.createPortal(this.props.renderItem({
          value: this.props.values[this.state.itemDragged],
          props: {
            ref: this.ghostRef,
            style: ghostStyle,
            onWheel: this.onWheel
          },
          index: this.state.itemDragged,
          isDragged: true,
          isSelected: false,
          isOutOfBounds: this.state.itemDraggedOutOfBounds > -1
        }), document.body));
      };

      Draggable.defaultProps = {
        transitionDuration: 240,
        lockVertically: false,
        removableByMove: false
      };
      return Draggable;
    }(React__namespace.Component);

    var DraggableList = function DraggableList(props) {
      var children = props.children,
          className = props.className,
          Tag = props.tagName;
      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        Listbox: true
      }, className);
      var renderChildren = React__default["default"].Children.toArray(children).map(function (child) {
        var element = /*#__PURE__*/React__default["default"].cloneElement(child, {
          parentProps: __assign({}, props)
        });
        return element;
      });

      var _a = React__default["default"].useState(renderChildren),
          childList = _a[0],
          setChildList = _a[1];

      var onChangeHandler = function onChangeHandler(props) {
        var oldIndex = props.oldIndex,
            newIndex = props.newIndex;
        var updatedList = arrayMove(childList, oldIndex, newIndex);
        setChildList(updatedList);
      };

      return /*#__PURE__*/React__default["default"].createElement(Draggable, {
        values: childList,
        onChange: onChangeHandler,
        renderItem: function renderItem(_a) {
          var value = _a.value,
              props = _a.props;
          return /*#__PURE__*/React__default["default"].createElement("div", __assign({}, props, {
            className: "Listbox-item--draggable"
          }), value);
        },
        renderList: function renderList(_a) {
          var children = _a.children,
              props = _a.props;
          return /*#__PURE__*/React__default["default"].createElement(Tag, __assign({
            "data-test": "DesignSystem-Listbox"
          }, baseProps, {
            className: classes
          }, props), children);
        }
      });
    };

    var isDisabledElement = function isDisabledElement(element) {
      return element && element.getAttribute('data-disabled') === 'true';
    };

    var getNextSibling = function getNextSibling(element) {
      var _a, _b;

      return (_b = (_a = element === null || element === void 0 ? void 0 : element.parentNode) === null || _a === void 0 ? void 0 : _a.nextSibling) === null || _b === void 0 ? void 0 : _b.firstChild;
    };

    var getPrevSibling = function getPrevSibling(element) {
      var _a, _b;

      return (_b = (_a = element === null || element === void 0 ? void 0 : element.parentNode) === null || _a === void 0 ? void 0 : _a.previousSibling) === null || _b === void 0 ? void 0 : _b.firstChild;
    };

    var focusOption = function focusOption(element, direction) {
      var iterateElement = element;

      while (iterateElement) {
        if (!isDisabledElement(iterateElement)) {
          iterateElement.focus();
          break;
        }

        if (direction === 'down') {
          iterateElement = getNextSibling(iterateElement);
        } else {
          iterateElement = getPrevSibling(iterateElement);
        }
      }
    };

    var onKeyDown = function onKeyDown(event) {
      var sourceElement = event.target;
      var nextElement = getNextSibling(sourceElement);
      var prevElement = getPrevSibling(sourceElement);

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          focusOption(nextElement, 'down');
          break;

        case 'ArrowUp':
          event.preventDefault();
          focusOption(prevElement, 'up');
          break;
      }
    };

    var ListBody = function ListBody(props) {
      var _a;

      var children = props.children,
          className = props.className,
          disabled = props.disabled,
          selected = props.selected,
          activated = props.activated,
          tabIndex = props.tabIndex;
      var contextProp = React__namespace.useContext(ListboxContext);
      var size = contextProp.size,
          type = contextProp.type,
          draggable = contextProp.draggable;
      var itemClass = classNames__default["default"]((_a = {
        'Listbox-item': true
      }, _a["Listbox-item--" + size] = size, _a["Listbox-item--" + type] = type, _a['Listbox-item--disabled'] = disabled, _a['Listbox-item--selected'] = selected && type === 'option', _a['Listbox-item--activated'] = activated && type === 'resource', _a), className);
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-disabled": disabled,
        "data-test": "DesignSystem-Listbox-ItemWrapper",
        tabIndex: draggable ? -1 : tabIndex || 0,
        className: itemClass,
        onKeyDown: onKeyDown,
        role: "tablist"
      }, draggable && /*#__PURE__*/React__namespace.createElement(Icon, {
        size: 16,
        appearance: "subtle",
        name: "drag_indicator",
        className: "Listbox-item--drag-icon",
        "data-test": "DesignSystem-Listbox-DragIcon"
      }), children);
    };
    ListBody.displayName = 'ListBody';

    var getAnimationClass = function getAnimationClass(uniqueKey, expanded) {
      if (expanded) return "nestedList-open-" + uniqueKey + " 240ms cubic-bezier(0, 0, 0.38, 0.9)";else if (!expanded) return "nestedList-close-" + uniqueKey + " 160ms cubic-bezier(0.2, 0, 1, 0.9)";
      return '';
    };

    var getHeight = function getHeight(listItemRef) {
      var _a;

      var scrollHeight = (_a = listItemRef.current) === null || _a === void 0 ? void 0 : _a.scrollHeight;
      return scrollHeight;
    };

    var menuItemAnimation = function menuItemAnimation(listItemRef, uniqueKey) {
      return "\n      @keyframes nestedList-open-" + uniqueKey + " {\n      from {\n        height: 0px;\n      }\n      to {\n        height: " + getHeight(listItemRef) + "px;\n      }\n    }\n\n    @keyframes nestedList-close-" + uniqueKey + " {\n      from {\n        height: " + getHeight(listItemRef) + "px;\n      }\n      to {\n        height: 0px;\n      }\n    }\n  ";
    };

    function usePrevious(value) {
      var ref = React__namespace.useRef();
      React__namespace.useEffect(function () {
        if (value != undefined) {
          ref.current = value;
        }
      }, [value]);
      return ref.current;
    }

    var NestedList = function NestedList(props) {
      var nestedBody = props.nestedBody,
          expanded = props.expanded;
      var prevState = usePrevious(expanded);

      var _a = React__namespace.useState(expanded),
          open = _a[0],
          setOpen = _a[1];

      var _b = React__namespace.useState(''),
          keyframe = _b[0],
          setKeyframe = _b[1];

      var listItemRef = React__namespace.useRef(null);
      var uniqueKey = Math.random().toString(36).substring(2, 6);

      var _c = React__namespace.useState(getAnimationClass(uniqueKey, expanded)),
          animation = _c[0],
          setAnimation = _c[1];

      React__namespace.useEffect(function () {
        if (prevState != undefined && prevState !== expanded) {
          setOpen(true);
        }

        requestAnimationFrame(function () {
          var result = menuItemAnimation(listItemRef, uniqueKey);
          setKeyframe(result);
        });
        var animationClass = getAnimationClass(uniqueKey, expanded);
        setAnimation(animationClass);
      }, [expanded]);

      var handleAnimationEnd = function handleAnimationEnd() {
        !expanded && setOpen(false);
      };

      var styles = {
        animation: animation,
        overflow: 'hidden',
        animationFillMode: 'forwards'
      };
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("style", null, keyframe), nestedBody && open && /*#__PURE__*/React__namespace.createElement("div", {
        style: styles,
        onAnimationEnd: handleAnimationEnd,
        "data-test": "DesignSystem-Listbox--Nested-Item",
        ref: listItemRef
      }, nestedBody));
    };

    var ListboxItem = function ListboxItem(props) {
      var _a;

      var nestedBody = props.nestedBody,
          expanded = props.expanded,
          id = props.id,
          onClick = props.onClick,
          value = props.value,
          _b = props.tagName,
          Tag = _b === void 0 ? 'li' : _b,
          rest = __rest(props, ["nestedBody", "expanded", "id", "onClick", "value", "tagName"]);

      var contextProp = React__namespace.useContext(ListboxContext);
      var showDivider = contextProp.showDivider,
          draggable = contextProp.draggable;

      var onClickHandler = function onClickHandler(e) {
        onClick && onClick(e, id, value);
      };

      var tagClass = classNames__default["default"]((_a = {}, _a['Listbox-item-wrapper'] = !draggable, _a));
      return /*#__PURE__*/React__namespace.createElement(Tag, __assign({
        id: id,
        "data-test": "DesignSystem-Listbox-Item"
      }, rest, {
        onClick: onClickHandler,
        "data-value": value,
        className: tagClass
      }), /*#__PURE__*/React__namespace.createElement(ListBody, __assign({}, props)), nestedBody && /*#__PURE__*/React__namespace.createElement(NestedList, {
        expanded: expanded,
        nestedBody: nestedBody
      }), showDivider && /*#__PURE__*/React__namespace.createElement(Divider, {
        className: "Listbox-divider"
      }));
    };
    ListboxItem.displayName = 'Listbox.Item';
    ListboxItem.defaultProps = {
      tagName: 'li'
    };

    var ListboxContext = /*#__PURE__*/React__namespace.createContext({
      size: 'standard',
      type: 'resource',
      draggable: false,
      showDivider: true
    });
    var Provider = ListboxContext.Provider;
    var Listbox = function Listbox(props) {
      var children = props.children,
          className = props.className,
          draggable = props.draggable,
          size = props.size,
          type = props.type,
          showDivider = props.showDivider,
          Tag = props.tagName,
          rest = __rest(props, ["children", "className", "draggable", "size", "type", "showDivider", "tagName"]);

      var baseProps = extractBaseProps(props);
      var classes = classNames__default["default"]({
        Listbox: true
      }, className);
      var sharedProp = {
        size: size,
        type: type,
        draggable: draggable,
        showDivider: showDivider
      };
      return /*#__PURE__*/React__namespace.createElement(Provider, {
        value: sharedProp
      }, draggable ? /*#__PURE__*/React__namespace.createElement(DraggableList, __assign({}, props)) : /*#__PURE__*/React__namespace.createElement(Tag, __assign({
        "data-test": "DesignSystem-Listbox"
      }, baseProps, {
        className: classes
      }, rest), children));
    };
    Listbox.displayName = 'Listbox';
    Listbox.defaultProps = {
      tagName: 'ul',
      size: 'standard',
      type: 'resource',
      draggable: false,
      showDivider: true
    };
    Listbox.Item = ListboxItem;

    var RenderHelpText = function RenderHelpText(_a) {
      var helpText = _a.helpText,
          error = _a.error;
      return /*#__PURE__*/React__default["default"].createElement(HelpText, {
        className: "d-flex",
        message: helpText.trim().length > 0 ? helpText : ' ',
        error: error ? error : undefined
      });
    };
    var RenderCounter = function RenderCounter(_a) {
      var inputText = _a.inputText,
          max = _a.max;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "mt-3 d-flex"
      }, /*#__PURE__*/React__default["default"].createElement(Text, {
        appearance: "subtle",
        className: "pr-2",
        color: inputText.length > max ? 'alert' : undefined,
        size: "small",
        weight: "medium"
      }, inputText.length), /*#__PURE__*/React__default["default"].createElement(Text, {
        appearance: "subtle",
        className: "pr-2",
        size: "small",
        weight: "medium"
      }, "/"), /*#__PURE__*/React__default["default"].createElement(Text, {
        appearance: "subtle",
        size: "small",
        weight: "medium"
      }, max));
    };

    var TextFieldWithTextarea = function TextFieldWithTextarea(props) {
      var label = props.label,
          _a = props.rows,
          rows = _a === void 0 ? 3 : _a,
          _b = props.resize,
          resize = _b === void 0 ? true : _b,
          required = props.required,
          error = props.error,
          onChange = props.onChange,
          _c = props.value,
          value = _c === void 0 ? '' : _c,
          _d = props.max,
          max = _d === void 0 ? 200 : _d,
          _e = props.helpText,
          helpText = _e === void 0 ? ' ' : _e;
      var textareaRef = React__namespace.useRef(null);

      var _f = React__namespace.useState(value),
          inputText = _f[0],
          setInputText = _f[1];

      var _g = React__namespace.useState(0),
          helptextWidth = _g[0],
          setHelptextWidth = _g[1];

      var onChangeHandler = function onChangeHandler(e) {
        setInputText(e.target.value);
        if (onChange) onChange(e);
      };

      var inputError = error || inputText.length > max;
      React__namespace.useEffect(function () {
        var textarea = textareaRef.current;

        if (window.ResizeObserver) {
          var resizeObserver_1 = new window.ResizeObserver(function (entries) {
            var entry = entries[0];
            var offsetWidth = entry.target.offsetWidth;
            setHelptextWidth(offsetWidth);
          });
          textarea && resizeObserver_1.observe(textarea);
          return function () {
            resizeObserver_1.disconnect();
          };
        }

        return function () {};
      }, []);
      return /*#__PURE__*/React__namespace.createElement("div", null, label && /*#__PURE__*/React__namespace.createElement(Label, {
        required: required,
        withInput: true
      }, label), /*#__PURE__*/React__namespace.createElement(Textarea, __assign({}, props, {
        resize: resize,
        rows: rows,
        onChange: onChangeHandler,
        error: inputError,
        ref: textareaRef
      })), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex justify-content-between",
        style: {
          width: helptextWidth
        }
      }, /*#__PURE__*/React__namespace.createElement(RenderHelpText, {
        helpText: helpText,
        error: inputError
      }), /*#__PURE__*/React__namespace.createElement(RenderCounter, {
        inputText: inputText,
        max: max
      })));
    };

    var TextFieldWithInput = function TextFieldWithInput(props) {
      var label = props.label,
          minWidth = props.minWidth,
          required = props.required,
          error = props.error,
          onChange = props.onChange,
          _a = props.value,
          value = _a === void 0 ? '' : _a,
          _b = props.max,
          max = _b === void 0 ? 200 : _b,
          _c = props.helpText,
          helpText = _c === void 0 ? ' ' : _c;

      var _d = React__namespace.useState(value),
          inputText = _d[0],
          setInputText = _d[1];

      var onChangeHandler = function onChangeHandler(event) {
        setInputText(event.target.value);
        if (onChange) onChange(event);
      };

      var inputError = error || inputText.length > max;
      return /*#__PURE__*/React__namespace.createElement("div", null, label && /*#__PURE__*/React__namespace.createElement(Label, {
        required: required,
        withInput: true
      }, label), /*#__PURE__*/React__namespace.createElement(Input, __assign({}, props, {
        error: inputError,
        onChange: onChangeHandler
      })), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex justify-content-between",
        style: {
          minWidth: minWidth
        }
      }, /*#__PURE__*/React__namespace.createElement(RenderHelpText, {
        helpText: helpText,
        error: inputError
      }), /*#__PURE__*/React__namespace.createElement(RenderCounter, {
        inputText: inputText,
        max: max
      })));
    };
    TextFieldWithInput.defaultProps = {
      minWidth: 256
    };

    var TextField = function TextField(props) {
      var withTextarea = props.withTextarea;

      if (withTextarea) {
        return /*#__PURE__*/React__namespace.createElement(TextFieldWithTextarea, __assign({}, props));
      }

      return /*#__PURE__*/React__namespace.createElement(TextFieldWithInput, __assign({}, props));
    };
    TextField.displayName = 'TextField';

    var SelectionAvatar = function SelectionAvatar(props) {
      var icon = props.icon,
          image = props.image,
          rest = __rest(props, ["icon", "image"]);

      return /*#__PURE__*/React__namespace.createElement(Avatar, __assign({
        role: "checkbox"
      }, rest, {
        withTooltip: true,
        className: "cursor-pointer"
      }), image || icon);
    };

    var AvatarSelectionContext = /*#__PURE__*/React__namespace.createContext({});

    var SelectionAvatarsWrapper = function SelectionAvatarsWrapper(props) {
      var avatarList = props.avatarList,
          avatarStyle = props.avatarStyle,
          tooltipPosition = props.tooltipPosition,
          size = props.size,
          avatarRenderer = props.avatarRenderer;
      var contextProp = React__namespace.useContext(AvatarSelectionContext);
      var setSelectedItems = contextProp.setSelectedItems,
          selectedItems = contextProp.selectedItems,
          onSelect = contextProp.onSelect;

      var onClickHandler = function onClickHandler(item) {
        var list = selectedItems;

        if (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.includes(item)) {
          list = selectedItems.filter(function (selectedItem) {
            return selectedItem !== item;
          });
        } else {
          list === null || list === void 0 ? void 0 : list.push(item);
        }

        list && (setSelectedItems === null || setSelectedItems === void 0 ? void 0 : setSelectedItems(__spreadArrays(list)));
        onSelect && onSelect(list);
      };

      var handleKeyDown = function handleKeyDown(event, item) {
        switch (event.key) {
          case 'Enter':
            onClickHandler(item);
            break;
        }
      };

      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, avatarList.map(function (avatarItem, index) {
        var _a;

        var appearance = avatarItem.appearance,
            firstName = avatarItem.firstName,
            lastName = avatarItem.lastName,
            icon = avatarItem.icon,
            image = avatarItem.image;
        var GroupClass = classNames__default["default"]((_a = {}, _a["SelectionAvatarGroup-item"] = true, _a["SelectionAvatarGroup-item--selected"] = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.includes(avatarItem), _a));

        if (avatarRenderer) {
          return avatarRenderer(avatarItem);
        }

        return /*#__PURE__*/React__namespace.createElement("span", {
          key: index,
          className: "SelectionAvatarGroup-wrapper"
        }, /*#__PURE__*/React__namespace.createElement("div", {
          tabIndex: 0,
          role: "checkbox",
          style: avatarStyle,
          className: GroupClass,
          "data-test": "DesignSystem-AvatarSelection--Avatar",
          "aria-checked": selectedItems && selectedItems.includes(avatarItem),
          onClick: function onClick() {
            return onClickHandler(avatarItem);
          },
          onKeyDown: function onKeyDown(event) {
            return handleKeyDown(event, avatarItem);
          }
        }, /*#__PURE__*/React__namespace.createElement(SelectionAvatar, {
          size: size,
          appearance: appearance,
          firstName: firstName,
          lastName: lastName,
          withTooltip: true,
          tooltipPosition: tooltipPosition,
          icon: icon,
          image: image
        })));
      }));
    };

    var handleKeyDown$6 = function handleKeyDown(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem) {
      switch (event.key) {
        case 'Enter':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'ArrowDown':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'ArrowUp':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(true);
          break;
      }
    };
    var focusListItem$3 = function focusListItem(position, setFocusedOption, listRef, withSearch) {
      var _a, _b, _c, _d, _e;

      if (withSearch && position === 'down') {
        var searchInput = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-AvatarSelection--Input"]');
        searchInput && ((_b = searchInput[0]) === null || _b === void 0 ? void 0 : _b.focus());
        setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(searchInput);
        return;
      }

      var listItems = (_c = listRef.current) === null || _c === void 0 ? void 0 : _c.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      if (position === 'down') {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[0];
      } else {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[listItems.length - 1];
      }

      (_d = targetOption) === null || _d === void 0 ? void 0 : _d.focus();
      (_e = targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView) === null || _e === void 0 ? void 0 : _e.call(targetOption, {
        block: 'center'
      });
      setFocusedOption && setFocusedOption(targetOption);
    };

    var AvatarSelectionCount = function AvatarSelectionCount(props) {
      var _a;

      var hiddenAvatarCount = props.hiddenAvatarCount,
          avatarStyle = props.avatarStyle,
          size = props.size,
          hiddenAvatarList = props.hiddenAvatarList;
      var contextProp = React__namespace.useContext(AvatarSelectionContext);
      var selectedItems = contextProp.selectedItems,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          triggerRef = contextProp.triggerRef,
          setOpenPopover = contextProp.setOpenPopover,
          openPopover = contextProp.openPopover,
          popoverId = contextProp.popoverId;

      var _b = React__namespace.useState(0),
          selectedItemCount = _b[0],
          setSelectedItemCount = _b[1];

      var wrapperClassName = classNames__default["default"]((_a = {}, _a['SelectionAvatarCount-wrapper'] = true, _a['SelectionAvatarCount--selected'] = selectedItemCount > 0, _a));
      React__namespace.useEffect(function () {
        var selectedList = hiddenAvatarList.filter(function (data1) {
          return selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.some(function (data2) {
            return data2 === data1;
          });
        });
        setSelectedItemCount(selectedList.length);
      }, [selectedItems]);
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-AvatarSelection--TriggerAvatar",
        className: wrapperClassName,
        onKeyDown: function onKeyDown(event) {
          return handleKeyDown$6(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem);
        },
        style: avatarStyle,
        tabIndex: 0,
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": openPopover,
        "aria-controls": popoverId,
        ref: triggerRef
      }, /*#__PURE__*/React__namespace.createElement(Avatar, {
        size: size,
        appearance: "secondary",
        className: "SelectionAvatarCount cursor-pointer"
      }, /*#__PURE__*/React__namespace.createElement(Text, {
        className: "overflow-hidden"
      }, "+" + hiddenAvatarCount)));
    };

    var handleKeyDown$5 = function handleKeyDown(event, focusedOption, setFocusedOption, setHighlightFirstItem, setHighlightLastItem, listRef, withSearch, setOpenPopover, triggerRef) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateOptions$3('up', focusedOption, setFocusedOption, listRef, withSearch);
          break;

        case 'ArrowDown':
          event.preventDefault();
          navigateOptions$3('down', focusedOption, setFocusedOption, listRef, withSearch);
          break;

        case 'Enter':
          handleEnterKey$2(focusedOption);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(false);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(false);
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          triggerRef.current.focus();
          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;
      }
    };

    var handleEnterKey$2 = function handleEnterKey(focusedOption) {
      var _a;

      (_a = focusedOption) === null || _a === void 0 ? void 0 : _a.click();
    };

    var navigateOptions$3 = function navigateOptions(direction, focusedOption, setFocusedOption, listRef, withSearch) {
      var listItems = listRef === null || listRef === void 0 ? void 0 : listRef.current.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var index = Array.from(listItems).findIndex(function (item) {
        return item == focusedOption;
      });

      if (index === -1) {
        index = direction === 'up' ? listItems.length - 1 : 0;
      } else if (withSearch && index === 0 && direction === 'up' || withSearch && index === listItems.length - 1 && direction === 'down') {
        var searchInput = listRef.current.querySelector('[data-test="DesignSystem-AvatarSelection--Input"]');
        searchInput.focus();
        setFocusedOption && setFocusedOption(searchInput);
      } else {
        index = direction === 'up' ? (index - 1 + listItems.length) % listItems.length : (index + 1) % listItems.length;
        var targetOption = listItems[index];
        targetOption.focus();
        setFocusedOption && setFocusedOption(targetOption);
        targetOption.scrollIntoView({
          block: 'center'
        });
      }
    };

    var handleInputKeyDown$1 = function handleInputKeyDown(event, listRef, setFocusedOption, setOpenPopover, triggerRef) {
      var _a, _b, _c;

      var listItems = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          targetOption = listItems[listItems.length - 1];
          break;

        case 'ArrowDown':
          event.preventDefault();
          targetOption = listItems[0];
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          triggerRef.current.focus();
          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;
      }

      (_b = targetOption) === null || _b === void 0 ? void 0 : _b.focus();
      (_c = targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView) === null || _c === void 0 ? void 0 : _c.call(targetOption, {
        block: 'center'
      });
      setFocusedOption && setFocusedOption(targetOption);
    };

    var AvatarSelectionInput = function AvatarSelectionInput(props) {
      var contextProp = React__namespace.useContext(AvatarSelectionContext);
      var listRef = contextProp.listRef,
          setFocusedOption = contextProp.setFocusedOption,
          setOpenPopover = contextProp.setOpenPopover,
          triggerRef = contextProp.triggerRef;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "SelectionAvatar-inputWrapper"
      }, /*#__PURE__*/React__namespace.createElement(Input, __assign({
        icon: "search",
        onKeyDown: function onKeyDown(event) {
          return handleInputKeyDown$1(event, listRef, setFocusedOption, setOpenPopover, triggerRef);
        },
        className: "w-100 SelectionAvatar-input",
        "data-test": "DesignSystem-AvatarSelection--Input"
      }, props)));
    };

    var AvatarSelectionList = function AvatarSelectionList(props) {
      return /*#__PURE__*/React__namespace.createElement(Listbox, __assign({}, props), props.children);
    };
    AvatarSelectionList.defaultProps = {
      type: 'option',
      showDivider: false,
      size: 'compressed',
      tagName: 'ul'
    };

    var AvatarSelectionOption = function AvatarSelectionOption(props) {
      var children = props.children,
          value = props.value,
          rest = __rest(props, ["children", "value"]);

      var contextProp = React__namespace.useContext(AvatarSelectionContext);
      var setSelectedItems = contextProp.setSelectedItems,
          selectedItems = contextProp.selectedItems,
          onSelect = contextProp.onSelect,
          focusedOption = contextProp.focusedOption,
          setFocusedOption = contextProp.setFocusedOption,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          listRef = contextProp.listRef,
          withSearch = contextProp.withSearch,
          setOpenPopover = contextProp.setOpenPopover,
          triggerRef = contextProp.triggerRef;

      var onSelectHandler = function onSelectHandler(event, avatarData) {
        event.preventDefault();
        var list = selectedItems ? __spreadArrays(selectedItems) : [];

        if (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.includes(avatarData)) {
          list = selectedItems.filter(function (selectedItem) {
            return selectedItem !== avatarData;
          });
        } else {
          list.push(avatarData);
        }

        setSelectedItems === null || setSelectedItems === void 0 ? void 0 : setSelectedItems(__spreadArrays(list));
        setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        onSelect && onSelect(list);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$5(event, focusedOption, setFocusedOption, setHighlightFirstItem, setHighlightLastItem, listRef, withSearch, setOpenPopover, triggerRef);
      };

      return /*#__PURE__*/React__namespace.createElement(Listbox.Item, __assign({
        onClick: function onClick(event) {
          return onSelectHandler(event, value);
        },
        onKeyDown: function onKeyDown(event) {
          return onKeyDownHandler(event);
        },
        selected: selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.includes(value),
        "data-test": "DesignSystem-AvatarSelection--Option",
        tabIndex: -1
      }, rest), children);
    };
    AvatarSelectionOption.defaultProps = {
      tagName: 'li'
    };

    var AvatarSelectionEmptyState = function AvatarSelectionEmptyState(props) {
      var height = props.height,
          title = props.title,
          description = props.description;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex flex-column justify-content-center align-items-center",
        style: {
          height: height ? height - 4 : ''
        },
        "data-test": "DesignSystem-AvatarSelection--EmptyState"
      }, title && /*#__PURE__*/React__namespace.createElement(Text, {
        className: "text-align-center mb-3",
        weight: "strong"
      }, title), description && /*#__PURE__*/React__namespace.createElement(Text, {
        className: "text-align-center mb-6",
        weight: "medium",
        size: "small",
        appearance: "subtle"
      }, description));
    };

    var AvatarSelectionItem = function AvatarSelectionItem(props) {
      var avatarData = props.avatarData,
          isSelected = props.isSelected;

      var _a = React__namespace.useState(false),
          showTooltip = _a[0],
          setShowTooltip = _a[1];

      var elementRef = React__namespace.useRef(null);
      var _b = avatarData.firstName,
          firstName = _b === void 0 ? '' : _b,
          _c = avatarData.lastName,
          lastName = _c === void 0 ? '' : _c;
      var name = firstName + " " + lastName;
      return /*#__PURE__*/React__namespace.createElement(Tooltip, {
        showOnTruncation: true,
        tooltip: name,
        elementRef: elementRef,
        open: showTooltip
      }, /*#__PURE__*/React__namespace.createElement(AvatarSelectionOption, {
        value: avatarData,
        onFocus: function onFocus() {
          setShowTooltip(true);
        },
        onBlur: function onBlur() {
          setShowTooltip(false);
        }
      }, /*#__PURE__*/React__namespace.createElement(Checkbox, {
        defaultChecked: isSelected,
        checked: isSelected,
        label: name,
        size: "regular",
        tabIndex: -1,
        className: "ellipsis--noWrap",
        "data-test": "DesignSystem-AvatarSelection--Checkbox",
        labelRef: elementRef
      })));
    };

    var AvatarSelectionPopover = function AvatarSelectionPopover(props) {
      var _a;

      var hiddenAvatarList = props.hiddenAvatarList,
          customStyle = props.customStyle,
          searchPlaceholder = props.searchPlaceholder,
          searchComparator = props.searchComparator,
          children = props.children;

      var _b = React__namespace.useState(hiddenAvatarList),
          searchList = _b[0],
          setSearchList = _b[1];

      var _c = React__namespace.useState(''),
          searchValue = _c[0],
          setSearchValue = _c[1];

      var contextProp = React__namespace.useContext(AvatarSelectionContext);
      var selectedItems = contextProp.selectedItems,
          listRef = contextProp.listRef,
          withSearch = contextProp.withSearch,
          popoverId = contextProp.popoverId;

      if (children) {
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, children);
      }

      var onSearchHandler = function onSearchHandler(event) {
        var searchValue = event.target.value;
        var list = hiddenAvatarList === null || hiddenAvatarList === void 0 ? void 0 : hiddenAvatarList.filter(function (avatarData) {
          var _a, _b;

          var firstName = avatarData.firstName,
              lastName = avatarData.lastName;

          if (searchComparator) {
            return searchComparator(searchValue, avatarData);
          }

          return ((_a = firstName === null || firstName === void 0 ? void 0 : firstName.toLowerCase()) === null || _a === void 0 ? void 0 : _a.startsWith(searchValue.toLowerCase())) || ((_b = lastName === null || lastName === void 0 ? void 0 : lastName.toLowerCase()) === null || _b === void 0 ? void 0 : _b.startsWith(searchValue.toLowerCase()));
        });
        setSearchValue(searchValue);
        setSearchList(list);
      };

      var onClearHandler = function onClearHandler() {
        setSearchValue('');
        setSearchList(hiddenAvatarList);
      };

      var popperClassName = classNames__default["default"]((_a = {}, _a['py-3'] = !withSearch, _a['pb-3'] = withSearch, _a['SelectionAvatarGroup-popper'] = true, _a));
      return /*#__PURE__*/React__namespace.createElement("div", {
        style: {
          width: customStyle.width
        },
        ref: listRef,
        "data-test": "DesignSystem-AvatarSelection--Popover",
        id: popoverId
      }, withSearch && /*#__PURE__*/React__namespace.createElement(AvatarSelectionInput, {
        placeholder: searchPlaceholder,
        onChange: onSearchHandler,
        value: searchValue,
        onClear: onClearHandler
      }), /*#__PURE__*/React__namespace.createElement("div", {
        style: customStyle,
        className: popperClassName
      }, searchList.length === 0 && /*#__PURE__*/React__namespace.createElement(AvatarSelectionEmptyState, {
        height: customStyle.maxHeight,
        title: "No users found",
        description: "Try modifying your search to find what you are looking for."
      }), /*#__PURE__*/React__namespace.createElement(AvatarSelectionList, null, searchList.map(function (avatarData, index) {
        var isSelected = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.includes(avatarData);
        return /*#__PURE__*/React__namespace.createElement(AvatarSelectionItem, {
          key: index,
          avatarData: avatarData,
          isSelected: isSelected
        });
      }))));
    };

    var AvatarSelection = function AvatarSelection(props) {
      var _a;

      var max = props.max,
          borderColor = props.borderColor,
          tooltipPosition = props.tooltipPosition,
          list = props.list,
          className = props.className,
          size = props.size,
          avatarRenderer = props.avatarRenderer,
          onSelect = props.onSelect,
          width = props.width,
          maxHeight = props.maxHeight,
          minHeight = props.minHeight,
          searchPlaceholder = props.searchPlaceholder,
          withSearch = props.withSearch,
          searchComparator = props.searchComparator,
          children = props.children;

      var _b = React__namespace.useState([]),
          selectedItems = _b[0],
          setSelectedItems = _b[1];

      var _c = React__namespace.useState(false),
          openPopover = _c[0],
          setOpenPopover = _c[1];

      var _d = React__namespace.useState(),
          focusedOption = _d[0],
          setFocusedOption = _d[1];

      var _e = React__namespace.useState(false),
          highlightFirstItem = _e[0],
          setHighlightFirstItem = _e[1];

      var _f = React__namespace.useState(false),
          highlightLastItem = _f[0],
          setHighlightLastItem = _f[1];

      var listRef = /*#__PURE__*/React__namespace.createRef();
      var triggerRef = /*#__PURE__*/React__namespace.createRef();
      React__namespace.useEffect(function () {
        var selectedList = [];
        list.forEach(function (avatarItem) {
          if (avatarItem.selected) {
            selectedList.push(avatarItem);
          }
        });
        setSelectedItems(selectedList);
      }, []);
      React__namespace.useEffect(function () {
        if (!openPopover) {
          setHighlightFirstItem(false);
          setHighlightLastItem(false);
        } else {
          setHighlightFirstItem(true);
        }
      }, [openPopover]);
      React__namespace.useEffect(function () {
        if (highlightFirstItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$3('down', setFocusedOption, listRef, withSearch);
          });
        }
      }, [highlightFirstItem]);
      React__namespace.useEffect(function () {
        if (highlightLastItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$3('up', setFocusedOption, listRef, withSearch);
          });
        }
      }, [highlightLastItem]);
      var baseProps = extractBaseProps(props);
      var hiddenAvatarCount = list.length - max;
      var avatarStyle = {
        backgroundColor: "" + borderColor,
        boxShadow: "0 0 0  calc(var(--spacing-xs) + var(--spacing-s)) " + borderColor
      };
      var AvatarSelectionClass = classNames__default["default"]((_a = {}, _a['SelectionAvatarGroup'] = true, _a), className);
      var searchInputHeight = 36;
      var searchBorder = 1;
      var customStyle = {
        width: width,
        minHeight: minHeight,
        maxHeight: withSearch ? maxHeight - searchInputHeight - searchBorder : maxHeight
      };
      var hiddenAvatarList = list.slice(max, list.length);
      var popoverId = "DesignSystem-AvatarSelection-Popover-" + uidGenerator();
      var popoverProps = {
        hiddenAvatarList: hiddenAvatarList,
        customStyle: customStyle,
        searchPlaceholder: searchPlaceholder,
        searchComparator: searchComparator,
        children: children
      };
      var triggerProps = {
        size: size,
        avatarStyle: avatarStyle,
        hiddenAvatarCount: hiddenAvatarCount,
        hiddenAvatarList: hiddenAvatarList
      };

      var onToggleHandler = function onToggleHandler(open) {
        open ? setOpenPopover(true) : setOpenPopover(false);
      };

      var contextProp = {
        listRef: listRef,
        onSelect: onSelect,
        withSearch: withSearch,
        triggerRef: triggerRef,
        selectedItems: selectedItems,
        focusedOption: focusedOption,
        openPopover: openPopover,
        setSelectedItems: setSelectedItems,
        setFocusedOption: setFocusedOption,
        setHighlightFirstItem: setHighlightFirstItem,
        setHighlightLastItem: setHighlightLastItem,
        setOpenPopover: setOpenPopover,
        popoverId: popoverId
      };
      return /*#__PURE__*/React__namespace.createElement(AvatarSelectionContext.Provider, {
        value: contextProp
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-AvatarSelection"
      }, baseProps, {
        className: AvatarSelectionClass
      }), /*#__PURE__*/React__namespace.createElement(SelectionAvatarsWrapper, {
        size: size,
        avatarStyle: avatarStyle,
        avatarList: list.slice(0, max),
        avatarRenderer: avatarRenderer,
        tooltipPosition: tooltipPosition
      }), (hiddenAvatarCount > 0 || children && hiddenAvatarCount > 0) && /*#__PURE__*/React__namespace.createElement(Popover, {
        open: openPopover,
        position: "bottom-end",
        trigger: /*#__PURE__*/React__namespace.createElement(AvatarSelectionCount, __assign({}, triggerProps)),
        triggerClass: "flex-grow-0",
        onToggle: onToggleHandler
      }, /*#__PURE__*/React__namespace.createElement(AvatarSelectionPopover, __assign({}, popoverProps)))));
    };
    AvatarSelection.displayName = 'AvatarSelection';
    AvatarSelection.defaultProps = {
      max: 5,
      tooltipPosition: 'bottom',
      borderColor: 'white',
      size: 'regular',
      width: 176,
      maxHeight: 256
    };
    AvatarSelection.Input = AvatarSelectionInput;
    AvatarSelection.List = AvatarSelectionList;
    AvatarSelection.Option = AvatarSelectionOption;
    AvatarSelection.EmptyState = AvatarSelectionEmptyState;

    var ComboboxList = function ComboboxList(props) {
      return /*#__PURE__*/React__namespace.createElement(Listbox, __assign({
        className: "py-3"
      }, props, {
        role: "listbox"
      }), props.children);
    };
    ComboboxList.defaultProps = {
      type: 'option',
      showDivider: false,
      tagName: 'ul',
      size: 'compressed'
    };

    var ComboboxContext = /*#__PURE__*/React__namespace.createContext({});

    var handleKeyDown$4 = function handleKeyDown(event, focusedOption, setFocusedOption, setOpenPopover, inputTriggerRef, setHighlightFirstItem, setHighlightLastItem, multiSelect, listRef) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateOptions$2('up', focusedOption, setFocusedOption, listRef);
          break;

        case 'ArrowDown':
          event.preventDefault();
          navigateOptions$2('down', focusedOption, setFocusedOption, listRef);
          break;

        case 'Enter':
          handleEnterKey$1(focusedOption, multiSelect, inputTriggerRef, listRef, setFocusedOption);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(false);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(false);
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          inputTriggerRef.current.focus();
          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;
      }
    };

    var handleEnterKey$1 = function handleEnterKey(focusedOption, multiSelect, inputTriggerRef, listRef, setFocusedOption) {
      var _a;

      (_a = focusedOption) === null || _a === void 0 ? void 0 : _a.click();

      if (!multiSelect) {
        inputTriggerRef.current.focus();
      } else {
        var listItems = listRef.current.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
        var listArr = Array.from(listItems);
        var index = listArr.findIndex(function (item) {
          return item == focusedOption;
        });

        if (index === listArr.length - 1) {
          listItems[0].focus();
          setFocusedOption && setFocusedOption(listItems[0]);
          listItems[0].scrollIntoView({
            block: 'center'
          });
        }
      }
    };

    var navigateOptions$2 = function navigateOptions(direction, focusedOption, setFocusedOption, listRef) {
      var _a;

      var listItems = listRef.current.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var index = Array.from(listItems).findIndex(function (item) {
        return item == focusedOption;
      });

      if (index === -1) {
        index = direction === 'up' ? listItems.length - 1 : 0;
      } else {
        index = direction === 'up' ? (index - 1 + listItems.length) % listItems.length : (index + 1) % listItems.length;
      }

      var targetOption = listItems[index];
      targetOption.focus();
      setFocusedOption && setFocusedOption(targetOption);
      (_a = targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView) === null || _a === void 0 ? void 0 : _a.call(targetOption, {
        block: 'center'
      });
    };

    var ComboboxOption = function ComboboxOption(props) {
      var children = props.children,
          option = props.option,
          onClick = props.onClick,
          rest = __rest(props, ["children", "option", "onClick"]);

      var contextProp = React__namespace.useContext(ComboboxContext);
      var onOptionClick = contextProp.onOptionClick,
          inputValue = contextProp.inputValue,
          focusedOption = contextProp.focusedOption,
          setFocusedOption = contextProp.setFocusedOption,
          setOpenPopover = contextProp.setOpenPopover,
          inputTriggerRef = contextProp.inputTriggerRef,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          multiSelect = contextProp.multiSelect,
          listRef = contextProp.listRef;

      var onClickHandler = function onClickHandler() {
        if (onClick) {
          return onClick(option);
        }

        return onOptionClick && onOptionClick(__assign(__assign({}, option), {
          isSelectedOption: true
        }));
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$4(event, focusedOption, setFocusedOption, setOpenPopover, inputTriggerRef, setHighlightFirstItem, setHighlightLastItem, multiSelect, listRef);
      };

      return /*#__PURE__*/React__namespace.createElement(Listbox.Item, __assign({
        onClick: onClickHandler,
        selected: option.label === (inputValue === null || inputValue === void 0 ? void 0 : inputValue.label),
        onKeyDown: onKeyDownHandler,
        tabIndex: -1,
        role: "option",
        "data-test": "DesignSystem-Combobox-Option"
      }, rest), children);
    };
    ComboboxOption.defaultProps = {
      tagName: 'li'
    };

    var handleKeyDown$3 = function handleKeyDown(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem) {
      switch (event.key) {
        case 'ArrowUp':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(true);
          break;

        case 'ArrowDown':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'Escape':
        case 'Tab':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          break;
      }
    };
    var focusListItem$2 = function focusListItem(position, setFocusedOption, listRef) {
      var _a, _b, _c;

      var listItems = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      if (position === 'down') {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[0];
      } else {
        targetOption = listItems[listItems.length - 1];
      }

      (_b = targetOption) === null || _b === void 0 ? void 0 : _b.focus();

      if (targetOption && typeof targetOption.scrollIntoView === 'function') {
        (_c = targetOption) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }

      setFocusedOption && setFocusedOption(targetOption);
    };

    var InputBox = function InputBox(props) {
      var contextProp = React__namespace.useContext(ComboboxContext);
      var inputValue = contextProp.inputValue,
          setInputValue = contextProp.setInputValue,
          setFocusedOption = contextProp.setFocusedOption,
          setOpenPopover = contextProp.setOpenPopover,
          inputTriggerRef = contextProp.inputTriggerRef,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          openPopover = contextProp.openPopover,
          popoverId = contextProp.popoverId;

      var onChangeHandler = function onChangeHandler(event) {
        var value = event.target.value;
        setFocusedOption && setFocusedOption(undefined);
        var newValue = {
          label: value,
          value: value,
          isSelectedOption: false
        };
        setInputValue && setInputValue(newValue);

        if (value !== '') {
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        }
      };

      var onClearHandler = function onClearHandler(event) {
        var _a;

        event.stopPropagation();
        var newValue = {
          label: '',
          value: '',
          isSelectedOption: false
        };
        setInputValue && setInputValue(newValue);
        setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props, event);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$3(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem);
        props.onKeyDown && props.onKeyDown(event);
      };

      return /*#__PURE__*/React__namespace.createElement(Input, __assign({}, props, {
        ref: inputTriggerRef,
        value: inputValue === null || inputValue === void 0 ? void 0 : inputValue.label,
        onChange: onChangeHandler,
        onKeyDown: onKeyDownHandler,
        onClear: onClearHandler,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-controls": popoverId,
        "aria-label": props.placeholder || 'Combobox-Input-Trigger',
        "aria-expanded": openPopover,
        "data-test": "DesignSystem-Combobox-Input"
      }));
    };

    var keyCodes = {
      BACKSPACE: 'Backspace',
      DELETE: 'Delete',
      ENTER: 'Enter'
    };
    var MultiSelectTrigger = function MultiSelectTrigger(props) {
      var _a, _b;

      var chipOptions = props.chipOptions,
          allowDuplicates = props.allowDuplicates,
          disabled = props.disabled,
          error = props.error,
          placeholder = props.placeholder,
          defaultValue = props.defaultValue,
          value = props.value,
          className = props.className,
          autoFocus = props.autoFocus,
          onChange = props.onChange,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          onKeyDown = props.onKeyDown,
          onInputChange = props.onInputChange,
          tabIndex = props.tabIndex,
          role = props.role,
          rest = __rest(props, ["chipOptions", "allowDuplicates", "disabled", "error", "placeholder", "defaultValue", "value", "className", "autoFocus", "onChange", "onBlur", "onFocus", "onKeyDown", "onInputChange", "tabIndex", "role"]);

      var inputRef = /*#__PURE__*/React__namespace.createRef();

      var _c = React__namespace.useState(value || defaultValue),
          chips = _c[0],
          setChips = _c[1];

      var _d = React__namespace.useState(''),
          inputValue = _d[0],
          setInputValue = _d[1];

      var baseProps = extractBaseProps(props);
      React__namespace.useEffect(function () {
        if (value !== undefined) {
          setChips(value);
          setInputValue('');
        }
      }, [value]);
      var ChipInputBorderClass = classNames__default["default"]((_a = {}, _a['ChipInput-border'] = true, _a['ChipInput-border--error'] = error, _a));
      var ChipInputClass = classNames__default["default"]((_b = {
        ChipInput: true
      }, _b['ChipInput--disabled'] = disabled, _b['ChipInput--withChips'] = chips && chips.length > 0, _b['ChipInput--error'] = error, _b), className);

      var onUpdateChips = function onUpdateChips(updatedChips) {
        if (onChange) onChange(updatedChips);
      };

      var onChipDeleteHandler = function onChipDeleteHandler(index) {
        var updatedChips = __spreadArrays(chips);

        updatedChips.splice(index, 1);

        if (!value) {
          setChips(updatedChips);
        }

        onUpdateChips(updatedChips);
      };

      var onChipAddHandler = function onChipAddHandler() {
        if (!inputValue) return;
        var chip = inputValue.trim();
        var isChipExist = chips.filter(function (item) {
          return item.label === chip;
        }).length > 0;

        if ((allowDuplicates || !isChipExist) && chip) {
          var updatedChips = __spreadArrays(chips, [{
            label: chip,
            value: chip,
            isSelectedOption: false
          }]);

          if (!value) {
            setChips(updatedChips);
          }

          onUpdateChips(updatedChips);
          setInputValue('');
        }
      };

      var onDeleteAllHandler = function onDeleteAllHandler(e) {
        e.stopPropagation();
        var updatedChips = [];

        if (!value) {
          setChips(updatedChips);
        }

        onUpdateChips(updatedChips);
        setInputValue('');
        onInputChange && onInputChange();
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        var chipsLength = chips.length;

        switch (event.key) {
          case keyCodes.DELETE:
          case keyCodes.BACKSPACE:
            if (inputValue === '' && chipsLength > 0) {
              onChipDeleteHandler(chipsLength - 1);
            }

            break;

          case keyCodes.ENTER:
            event.preventDefault();
            onChipAddHandler();
            break;
        }

        onKeyDown && onKeyDown(event);
      };

      var onInputChangeHandler = function onInputChangeHandler(event) {
        setInputValue(event.target.value);
        onInputChange && onInputChange(event);
      };

      var onClickHandler = function onClickHandler() {
        var _a;

        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      };

      var chipComponents = chips.map(function (chip, index) {
        var _a = chipOptions.type,
            type = _a === void 0 ? 'input' : _a,
            _onClick = chipOptions.onClick,
            rest = __rest(chipOptions, ["type", "onClick"]);

        var chipLabel = typeof chip === 'string' ? chip : chip === null || chip === void 0 ? void 0 : chip.label;
        return /*#__PURE__*/React__namespace.createElement(Chip, __assign({
          "data-test": "DesignSystem-MultiSelectTrigger--Chip",
          label: chipLabel,
          name: chip,
          type: type,
          disabled: disabled,
          key: index,
          className: "my-3 mx-2",
          onClick: function onClick() {
            return _onClick && _onClick(chip, index);
          },
          onClose: function onClose() {
            return onChipDeleteHandler(index);
          }
        }, rest));
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-MultiSelectTrigger--Border",
        className: ChipInputBorderClass
      }, /*#__PURE__*/React__namespace.createElement("div", __assign({
        "data-test": "DesignSystem-MultiSelectTrigger"
      }, baseProps, {
        className: ChipInputClass,
        onClick: onClickHandler,
        tabIndex: disabled ? -1 : tabIndex || 0
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "ChipInput-wrapper"
      }, chips && chips.length > 0 && chipComponents, /*#__PURE__*/React__namespace.createElement("input", __assign({}, rest, {
        "data-test": "DesignSystem-MultiSelectTrigger--Input",
        ref: props.forwardedRef || inputRef,
        className: "ChipInput-input",
        autoFocus: autoFocus,
        placeholder: chips && chips.length > 0 ? '' : placeholder,
        disabled: disabled,
        value: inputValue,
        onBlur: onBlur,
        onFocus: onFocus,
        onChange: onInputChangeHandler,
        onKeyDown: onKeyDownHandler,
        role: role
      }))), (chips.length > 0 || inputValue.length > 0) && /*#__PURE__*/React__namespace.createElement(Icon, {
        "data-test": "DesignSystem-MultiSelectTrigger--Icon",
        name: "close",
        appearance: disabled ? 'disabled' : 'subtle',
        className: "ChipInput-icon",
        onClick: onDeleteAllHandler,
        tabIndex: disabled ? -1 : 0
      })));
    };
    MultiSelectTrigger.displayName = 'MultiSelectTrigger';
    MultiSelectTrigger.defaultProps = {
      chipOptions: {},
      defaultValue: [],
      allowDuplicates: false,
      autoFocus: false
    };

    var ChipInputBox = function ChipInputBox(props) {
      var contextProp = React__default["default"].useContext(ComboboxContext);
      var chipInputValue = contextProp.chipInputValue,
          setChipInputValue = contextProp.setChipInputValue,
          setOpenPopover = contextProp.setOpenPopover,
          setFocusedOption = contextProp.setFocusedOption,
          setChipInputText = contextProp.setChipInputText,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          inputTriggerRef = contextProp.inputTriggerRef,
          openPopover = contextProp.openPopover,
          popoverId = contextProp.popoverId;

      var onChangeHandler = function onChangeHandler(chips) {
        setFocusedOption && setFocusedOption(undefined);
        setChipInputValue && setChipInputValue(chips);

        if (chips.length === 0) {
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        }
      };

      var onUpdateHandler = function onUpdateHandler(event) {
        var _a;

        var value = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value;

        if (!value) {
          setChipInputText === null || setChipInputText === void 0 ? void 0 : setChipInputText('');
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          inputTriggerRef === null || inputTriggerRef === void 0 ? void 0 : inputTriggerRef.current.focus();
          return;
        }

        setChipInputText && setChipInputText(value);

        if (value !== '') {
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        }
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$3(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem);
        props.onKeyDown && props.onKeyDown(event);
      };

      return /*#__PURE__*/React__default["default"].createElement(MultiSelectTrigger, __assign({}, props, {
        value: chipInputValue,
        onChange: onChangeHandler,
        onInputChange: onUpdateHandler,
        onKeyDown: onKeyDownHandler,
        tabIndex: -1,
        forwardedRef: inputTriggerRef,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-controls": popoverId,
        "aria-label": props.placeholder || 'Combobox-ChipInput-Trigger',
        "aria-expanded": openPopover,
        "data-test": "DesignSystem-Combobox-ChipInput"
      }));
    };

    var ComboboxTrigger = function ComboboxTrigger(props) {
      var multiSelect = props.multiSelect,
          chipValue = props.chipValue,
          value = props.value,
          rest = __rest(props, ["multiSelect", "chipValue", "value"]);

      if (multiSelect) {
        var icon = props.icon,
            clearButton = props.clearButton,
            iconType = props.iconType;
        var chipInputOptions = {
          icon: icon,
          clearButton: clearButton,
          iconType: iconType
        };
        return /*#__PURE__*/React__namespace.createElement(ChipInputBox, __assign({
          defaultValue: [],
          chipOptions: __assign({}, chipInputOptions)
        }, rest, {
          value: chipValue
        }));
      }

      return /*#__PURE__*/React__namespace.createElement(InputBox, __assign({}, props, {
        value: value === null || value === void 0 ? void 0 : value.label
      }));
    };

    var Combobox = function Combobox(props) {
      var children = props.children,
          onChange = props.onChange,
          multiSelect = props.multiSelect,
          className = props.className,
          maxHeight = props.maxHeight,
          width = props.width,
          value = props.value,
          placeholder = props.placeholder,
          disabled = props.disabled,
          error = props.error,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          onClear = props.onClear,
          icon = props.icon,
          iconType = props.iconType,
          size = props.size,
          chipValue = props.chipValue,
          clearButton = props.clearButton,
          onSearch = props.onSearch,
          onKeyDown = props.onKeyDown,
          onKeyUp = props.onKeyUp;

      var _a = React__namespace.useState(),
          popoverStyle = _a[0],
          setPopoverStyle = _a[1];

      var _b = React__namespace.useState({}),
          wrapperStyle = _b[0],
          setWrapperStyle = _b[1];

      var triggerRef = /*#__PURE__*/React__namespace.createRef();
      var listRef = /*#__PURE__*/React__namespace.createRef();

      var _c = React__namespace.useState(false),
          openPopover = _c[0],
          setOpenPopover = _c[1];

      var _d = React__namespace.useState(false),
          isOptionSelected = _d[0],
          setIsOptionSelected = _d[1];

      var _e = React__namespace.useState(),
          focusedOption = _e[0],
          setFocusedOption = _e[1];

      var _f = React__namespace.useState(value || {
        label: '',
        value: ''
      }),
          inputValue = _f[0],
          setInputValue = _f[1];

      var _g = React__namespace.useState(chipValue),
          chipInputValue = _g[0],
          setChipInputValue = _g[1];

      var _h = React__namespace.useState(''),
          chipInputText = _h[0],
          setChipInputText = _h[1];

      var _j = React__namespace.useState(false),
          highlightFirstItem = _j[0],
          setHighlightFirstItem = _j[1];

      var _k = React__namespace.useState(false),
          highlightLastItem = _k[0],
          setHighlightLastItem = _k[1];

      var inputTriggerRef = React__namespace.useRef();
      var popoverId = "DesignSystem-Combobox--Popover-" + uidGenerator();
      React__namespace.useEffect(function () {
        var _a;

        var popperWidth = (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
        var popperWrapperStyle = {
          width: width || popperWidth
        };
        var wrapperStyle = {
          maxHeight: maxHeight || 'var(--spacing-9)',
          overflowY: 'auto',
          boxSizing: 'border-box'
        };
        setWrapperStyle(wrapperStyle);
        setPopoverStyle(popperWrapperStyle);
      }, []);
      React__namespace.useEffect(function () {
        if (isOptionSelected) {
          multiSelect ? setOpenPopover(true) : setOpenPopover(false);
          setIsOptionSelected(false);
        }

        var value = multiSelect ? chipInputValue : inputValue;
        onChange && !isOptionSelected && onChange(value);
      }, [inputValue, chipInputValue]);
      React__namespace.useEffect(function () {
        if (highlightFirstItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$2('down', setFocusedOption, listRef);
          });
        }
      }, [highlightFirstItem]);
      React__namespace.useEffect(function () {
        if (highlightLastItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$2('up', setFocusedOption, listRef);
          });
        }
      }, [highlightLastItem]);
      React__namespace.useEffect(function () {
        if (!openPopover) {
          setHighlightFirstItem(false);
          setHighlightLastItem(false);
        }
      }, [openPopover]);
      React__namespace.useEffect(function () {
        onSearch && onSearch(chipInputText);
      }, [chipInputText]);

      var onOptionClick = function onOptionClick(option) {
        setIsOptionSelected(true);

        if (!multiSelect) {
          setInputValue(option);
          onChange && onChange(option);
        } else {
          var chipList = chipInputValue ? __spreadArrays(chipInputValue, [option]) : [option];
          setChipInputValue(chipList);
          onChange && onChange(chipList);
        }
      };

      var outsideClickHandler = function outsideClickHandler() {
        !multiSelect && setOpenPopover(false);
      };

      var onToggleHandler = function onToggleHandler(open) {
        open ? setOpenPopover(true) : setOpenPopover(false);
      };

      var triggerProps = {
        value: value,
        placeholder: placeholder,
        disabled: disabled,
        error: error,
        onBlur: onBlur,
        onFocus: onFocus,
        onClear: onClear,
        icon: icon,
        iconType: iconType,
        size: size,
        multiSelect: multiSelect,
        chipValue: chipValue,
        clearButton: clearButton,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
      };
      var contextProp = {
        inputValue: inputValue,
        setInputValue: setInputValue,
        onOptionClick: onOptionClick,
        openPopover: openPopover,
        setOpenPopover: setOpenPopover,
        isOptionSelected: isOptionSelected,
        setIsOptionSelected: setIsOptionSelected,
        chipInputValue: chipInputValue,
        setChipInputValue: setChipInputValue,
        focusedOption: focusedOption,
        setFocusedOption: setFocusedOption,
        chipInputText: chipInputText,
        setChipInputText: setChipInputText,
        inputTriggerRef: inputTriggerRef,
        setHighlightFirstItem: setHighlightFirstItem,
        setHighlightLastItem: setHighlightLastItem,
        multiSelect: multiSelect,
        listRef: listRef,
        onSearch: onSearch,
        popoverId: popoverId
      };
      return /*#__PURE__*/React__namespace.createElement(ComboboxContext.Provider, {
        value: contextProp
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: triggerRef,
        className: className
      }, /*#__PURE__*/React__namespace.createElement(OutsideClick, {
        onOutsideClick: outsideClickHandler
      }, /*#__PURE__*/React__namespace.createElement(Popover, {
        open: openPopover && !disabled,
        triggerClass: "d-block",
        customStyle: popoverStyle,
        onToggle: onToggleHandler,
        trigger: /*#__PURE__*/React__namespace.createElement(ComboboxTrigger, __assign({}, triggerProps))
      }, /*#__PURE__*/React__namespace.createElement("div", {
        style: wrapperStyle,
        ref: listRef,
        id: popoverId
      }, children && typeof children === 'function' ? children(contextProp) : children)))));
    };
    Combobox.List = ComboboxList;
    Combobox.Option = ComboboxOption;

    var SelectContext = /*#__PURE__*/React__namespace.createContext({});

    var SelectList = function SelectList(props) {
      var contextProp = React__namespace.useContext(SelectContext);
      var withSearch = contextProp.withSearch,
          minHeight = contextProp.minHeight,
          maxHeight = contextProp.maxHeight,
          multiSelect = contextProp.multiSelect;

      var children = props.children,
          rest = __rest(props, ["children"]);

      var searchInputHeight = 33;
      var wrapperStyle = {
        maxHeight: withSearch ? maxHeight - searchInputHeight : maxHeight,
        overflowY: 'auto',
        minHeight: minHeight
      };
      return /*#__PURE__*/React__namespace.createElement(Listbox, __assign({
        "aria-label": "Options item list",
        "aria-multiselectable": multiSelect,
        className: "my-3"
      }, rest), /*#__PURE__*/React__namespace.createElement("div", {
        style: wrapperStyle
      }, children));
    };
    SelectList.defaultProps = {
      type: 'option',
      showDivider: false,
      size: 'compressed',
      tagName: 'ul'
    };

    var mapInitialValue = function mapInitialValue(multiSelect, selectedValue) {
      if (multiSelect) {
        return selectedValue && !Array.isArray(selectedValue) ? [selectedValue] : selectedValue || [];
      } else {
        return selectedValue || {
          label: '',
          value: ''
        };
      }
    };
    var elementExist = function elementExist(targetObject, mainList) {
      if (!Array.isArray(mainList)) {
        return targetObject.value === (mainList === null || mainList === void 0 ? void 0 : mainList.value) ? 0 : -1;
      }

      return mainList.findIndex(function (item) {
        return item.value === targetObject.value;
      });
    };
    var removeOrAddToList = function removeOrAddToList(targetObject, prevList) {
      var newList = __spreadArrays(prevList);

      var existingIndex = elementExist(targetObject, newList);

      if (existingIndex !== -1) {
        newList.splice(existingIndex, 1);
      } else {
        newList.push(targetObject);
      }

      return newList;
    };
    var computeValue = function computeValue(multiSelect, selectValue, setLabel) {
      if (!multiSelect) {
        return (selectValue === null || selectValue === void 0 ? void 0 : selectValue.label.trim()) || '';
      }

      var label = setLabel === null || setLabel === void 0 ? void 0 : setLabel(selectValue.length);

      if (label) {
        return label;
      }

      if (selectValue.length <= 2) {
        return selectValue.map(function (pair) {
          return "" + pair.label;
        }).join(', ');
      } else {
        return selectValue.length + " Selected";
      }
    };
    var handleKeyDownTrigger = function handleKeyDownTrigger(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem) {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'ArrowDown':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'ArrowUp':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(true);
          break;
      }
    };
    var focusListItem$1 = function focusListItem(position, setFocusedOption, listRef) {
      var _a, _b, _c;

      var searchInput = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Select--Input"]');
      var listItems = (_b = listRef.current) === null || _b === void 0 ? void 0 : _b.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      if (position === 'down') {
        targetOption = (searchInput === null || searchInput === void 0 ? void 0 : searchInput[0]) || (listItems === null || listItems === void 0 ? void 0 : listItems[0]);
      } else {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[listItems.length - 1];
      }

      (_c = targetOption) === null || _c === void 0 ? void 0 : _c.focus();
      targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView({
        block: 'center'
      });
      setFocusedOption && setFocusedOption(targetOption);
    };
    var handleKeyDown$2 = function handleKeyDown(event, focusedOption, setFocusedOption, setHighlightFirstItem, setHighlightLastItem, listRef, withSearch, setOpenPopover, triggerRef) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateOptions$1('up', focusedOption, setFocusedOption, listRef, withSearch);
          break;

        case 'ArrowDown':
          event.preventDefault();
          navigateOptions$1('down', focusedOption, setFocusedOption, listRef, withSearch);
          break;

        case 'Enter':
          handleEnterKey(focusedOption);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(false);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(false);
          break;

        case 'Tab':
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(false);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(false);
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          triggerRef.current.focus();
          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;
      }
    };
    var handleEnterKey = function handleEnterKey(focusedOption) {
      var _a;

      (_a = focusedOption) === null || _a === void 0 ? void 0 : _a.click();
    };
    var navigateOptions$1 = function navigateOptions(direction, focusedOption, setFocusedOption, listRef, withSearch) {
      var listItems = listRef.current.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var index = Array.from(listItems).findIndex(function (item) {
        return item == focusedOption;
      });

      if (index === -1) {
        index = direction === 'up' ? listItems.length - 1 : 0;
      } else if (withSearch && index === 0 && direction === 'up' || withSearch && index === listItems.length - 1 && direction === 'down') {
        var searchInput = listRef.current.querySelector('[data-test="DesignSystem-Select--Input"]');
        searchInput.focus();
        setFocusedOption && setFocusedOption(searchInput);
      } else {
        index = direction === 'up' ? (index - 1 + listItems.length) % listItems.length : (index + 1) % listItems.length;
        var targetOption = listItems[index];
        targetOption.focus();
        setFocusedOption && setFocusedOption(targetOption);
        targetOption.scrollIntoView({
          block: 'center'
        });
      }
    };
    var handleInputKeyDown = function handleInputKeyDown(event, listRef, setFocusedOption, setOpenPopover, triggerRef) {
      var _a, _b;

      var listItems = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          targetOption = listItems[listItems.length - 1];
          break;

        case 'ArrowDown':
          event.preventDefault();
          targetOption = listItems[0];
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          triggerRef.current.focus();
          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;
      }

      (_b = targetOption) === null || _b === void 0 ? void 0 : _b.focus();
      targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView({
        block: 'center'
      });
      setFocusedOption && setFocusedOption(targetOption);
    };

    var SelectOption = function SelectOption(props) {
      var children = props.children,
          option = props.option,
          checkedState = props.checkedState,
          onClick = props.onClick,
          _a = props.withCheckbox,
          withCheckbox = _a === void 0 ? true : _a,
          disabled = props.disabled,
          rest = __rest(props, ["children", "option", "checkedState", "onClick", "withCheckbox", "disabled"]);

      var contextProp = React__namespace.useContext(SelectContext);
      var onOptionClick = contextProp.onOptionClick,
          selectValue = contextProp.selectValue,
          setSelectValue = contextProp.setSelectValue,
          multiSelect = contextProp.multiSelect,
          setIsOptionSelected = contextProp.setIsOptionSelected,
          focusedOption = contextProp.focusedOption,
          setFocusedOption = contextProp.setFocusedOption,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          listRef = contextProp.listRef,
          withSearch = contextProp.withSearch,
          setOpenPopover = contextProp.setOpenPopover,
          triggerRef = contextProp.triggerRef;

      var onClickHandler = function onClickHandler() {
        if (disabled) return;

        if (onClick) {
          onClick(option);
          return;
        }

        var newList = multiSelect && Array.isArray(selectValue) ? removeOrAddToList(option, selectValue) : option;
        setIsOptionSelected === null || setIsOptionSelected === void 0 ? void 0 : setIsOptionSelected(Array.isArray(newList) ? newList.length !== 0 : true);
        setSelectValue === null || setSelectValue === void 0 ? void 0 : setSelectValue(newList);
        onOptionClick === null || onOptionClick === void 0 ? void 0 : onOptionClick(newList);
      };

      var checked = checkedState === 'checked' || elementExist(option, selectValue) !== -1;
      var indeterminate = checkedState === 'indeterminate';

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$2(event, focusedOption, setFocusedOption, setHighlightFirstItem, setHighlightLastItem, listRef, withSearch, setOpenPopover, triggerRef);
      };

      return /*#__PURE__*/React__namespace.createElement(Listbox.Item, __assign({
        role: "option",
        onClick: onClickHandler,
        "aria-selected": checked,
        "aria-label": "option item",
        onKeyDown: function onKeyDown(event) {
          return onKeyDownHandler(event);
        },
        selected: checked,
        tabIndex: -1,
        disabled: disabled,
        "data-test": "DesignSystem-Select-Option"
      }, rest), /*#__PURE__*/React__namespace.createElement("div", {
        className: "d-flex align-items-center"
      }, multiSelect && withCheckbox && /*#__PURE__*/React__namespace.createElement(Checkbox, {
        tabIndex: -1,
        "aria-checked": indeterminate ? 'mixed' : checked,
        checked: checked,
        indeterminate: indeterminate
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: multiSelect ? 'Select-trigger-text pt-2' : 'Select-trigger-text'
      }, children)));
    };
    SelectOption.defaultProps = {
      withCheckbox: true
    };

    var SelectTrigger = function SelectTrigger(props) {
      var _a, _b;

      var triggerSize = props.triggerSize,
          placeholder = props.placeholder,
          withClearButton = props.withClearButton,
          icon = props.icon,
          disabled = props.disabled,
          inlineLabel = props.inlineLabel,
          iconType = props.iconType,
          onClear = props.onClear,
          setLabel = props.setLabel,
          rest = __rest(props, ["triggerSize", "placeholder", "withClearButton", "icon", "disabled", "inlineLabel", "iconType", "onClear", "setLabel"]);

      var contextProp = React__namespace.useContext(SelectContext);
      var elementRef = React__namespace.useRef(null);
      var openPopover = contextProp.openPopover,
          selectValue = contextProp.selectValue,
          setSelectValue = contextProp.setSelectValue,
          isOptionSelected = contextProp.isOptionSelected,
          setIsOptionSelected = contextProp.setIsOptionSelected,
          multiSelect = contextProp.multiSelect,
          setOpenPopover = contextProp.setOpenPopover,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          triggerRef = contextProp.triggerRef;
      var buttonDisabled = disabled ? 'disabled' : 'default';
      var trimmedPlaceholder = placeholder === null || placeholder === void 0 ? void 0 : placeholder.trim();
      var displayValue = computeValue(multiSelect, selectValue, setLabel);
      var value = isOptionSelected && displayValue.length > 0 ? displayValue : trimmedPlaceholder;
      var iconName = openPopover ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

      var onClearHandler = function onClearHandler(event) {
        event.stopPropagation();
        var emptyValue = multiSelect ? [] : {
          label: '',
          value: ''
        };
        setSelectValue === null || setSelectValue === void 0 ? void 0 : setSelectValue(emptyValue);
        setIsOptionSelected === null || setIsOptionSelected === void 0 ? void 0 : setIsOptionSelected(false);

        if (onClear) {
          onClear(event);
        }
      };

      var buttonClass = classNames__default["default"]((_a = {}, _a['Button'] = true, _a['Select-trigger'] = true, _a["Select-trigger--" + triggerSize] = triggerSize, _a['Select-trigger--placeholder'] = !isOptionSelected, _a['Select-trigger--icon'] = icon, _a['Select-trigger--open'] = openPopover, _a));
      var textClass = classNames__default["default"]((_b = {}, _b['Select-trigger-text'] = true, _b));
      return /*#__PURE__*/React__namespace.createElement(Tooltip, {
        showOnTruncation: true,
        showTooltip: !openPopover,
        tooltip: value,
        elementRef: elementRef,
        className: "w-100",
        triggerClass: "w-100"
      }, /*#__PURE__*/React__namespace.createElement("button", __assign({
        ref: triggerRef,
        onKeyDown: function onKeyDown(event) {
          return handleKeyDownTrigger(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem);
        },
        type: "button",
        className: buttonClass,
        disabled: disabled,
        tabIndex: 0,
        "aria-haspopup": "listbox",
        "aria-expanded": openPopover,
        "aria-label": "trigger",
        "data-test": "DesignSystem-Select-trigger"
      }, rest), /*#__PURE__*/React__namespace.createElement("div", {
        className: "Select-trigger-wrapper ellipsis--noWrap"
      }, inlineLabel && /*#__PURE__*/React__namespace.createElement(Text, {
        appearance: "subtle",
        className: "mr-4 white-space-nowrap"
      }, "" + inlineLabel.trim().charAt(0).toUpperCase() + inlineLabel.trim().slice(1)), icon && !inlineLabel && /*#__PURE__*/React__namespace.createElement(Icon, {
        appearance: buttonDisabled,
        className: "d-flex align-items-center mr-4",
        name: icon,
        type: iconType
      }), value && /*#__PURE__*/React__namespace.createElement(Text, {
        ref: elementRef,
        className: textClass
      }, value)), isOptionSelected && withClearButton && /*#__PURE__*/React__namespace.createElement(Icon, {
        appearance: buttonDisabled,
        onClick: onClearHandler,
        className: "align-items-center mr-2 ml-3 Select-crossButton",
        size: 12,
        name: "close",
        "aria-label": "clear selected",
        type: iconType,
        "data-test": "DesignSystem-Select--closeIcon"
      }), /*#__PURE__*/React__namespace.createElement(Icon, {
        appearance: buttonDisabled,
        name: iconName,
        type: iconType
      })));
    };

    SelectTrigger.defaultProps = {
      triggerSize: 'regular',
      placeholder: 'Select',
      withClearButton: true
    };

    var SearchInput = function SearchInput(props) {
      var contextProp = React__namespace.useContext(SelectContext);
      var setWithSearch = contextProp.setWithSearch,
          maxHeight = contextProp.maxHeight,
          listRef = contextProp.listRef,
          setFocusedOption = contextProp.setFocusedOption,
          setOpenPopover = contextProp.setOpenPopover,
          triggerRef = contextProp.triggerRef;

      var onChange = props.onChange,
          onClear = props.onClear,
          rest = __rest(props, ["onChange", "onClear"]);

      React__namespace.useEffect(function () {
        setWithSearch === null || setWithSearch === void 0 ? void 0 : setWithSearch(true);
      }, [maxHeight]);

      var searchHandler = function searchHandler(event) {
        if (onChange) onChange(event.target.value);
      };

      var searchClearHandler = function searchClearHandler(event) {
        if (onClear) onClear(event);
      };

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "Select-inputWrapper"
      }, /*#__PURE__*/React__namespace.createElement(Input, __assign({}, rest, {
        icon: 'search',
        onKeyDown: function onKeyDown(event) {
          return handleInputKeyDown(event, listRef, setFocusedOption, setOpenPopover, triggerRef);
        },
        autoFocus: true,
        onChange: searchHandler,
        onClear: searchClearHandler,
        autoComplete: 'off',
        "aria-label": "Search",
        "aria-haspopup": "listbox",
        className: "Select-input",
        "data-test": "DesignSystem-Select--Input"
      })));
    };

    var SelectEmptyTemplate = function SelectEmptyTemplate(props) {
      var contextProp = React__namespace.useContext(SelectContext);
      var maxHeight = contextProp.maxHeight,
          withSearch = contextProp.withSearch;

      var title = props.title,
          description = props.description,
          children = props.children,
          rest = __rest(props, ["title", "description", "children"]);

      var searchInputHeight = 33;
      var wrapperStyle = {
        minHeight: withSearch ? maxHeight - searchInputHeight : maxHeight
      };
      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        className: "px-7 d-flex justify-content-center align-items-center",
        style: wrapperStyle,
        "data-test": "DesignSystem-Select-EmptyState--wrapper",
        "aria-live": "polite",
        role: "alert"
      }, rest), /*#__PURE__*/React__namespace.createElement("div", {
        "aria-labelledby": title,
        "aria-describedby": description,
        className: "d-flex flex-column justify-content-center align-items-center"
      }, title && /*#__PURE__*/React__namespace.createElement(Text, {
        id: title,
        role: "heading",
        className: "text-align-center mb-3",
        weight: "strong"
      }, title), description && /*#__PURE__*/React__namespace.createElement(Text, {
        id: description,
        className: "text-align-center mb-6",
        weight: "medium",
        size: "small",
        appearance: "subtle"
      }, description), children && children));
    };

    var SelectFooter = function SelectFooter(props) {
      var children = props.children,
          rest = __rest(props, ["children"]);

      return /*#__PURE__*/React__namespace.createElement("div", __assign({
        className: "Select-buttonWrapper"
      }, rest), children);
    };

    var Select = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var children = props.children,
          onSelect = props.onSelect,
          width = props.width,
          maxHeight = props.maxHeight,
          minHeight = props.minHeight,
          value = props.value,
          boundaryElement = props.boundaryElement,
          appendToBody = props.appendToBody,
          _a = props.multiSelect,
          multiSelect = _a === void 0 ? false : _a,
          onOutsideClick = props.onOutsideClick,
          triggerOptions = props.triggerOptions,
          popoverWidth = props.popoverWidth;

      var _b = React__namespace.useState(false),
          openPopover = _b[0],
          setOpenPopover = _b[1];

      var mapValue = mapInitialValue(multiSelect, value);

      var _c = React__namespace.useState(mapValue),
          selectValue = _c[0],
          setSelectValue = _c[1];

      var _d = React__namespace.useState(false),
          isOptionSelected = _d[0],
          setIsOptionSelected = _d[1];

      var triggerRef = /*#__PURE__*/React__namespace.createRef();
      var listRef = React__namespace.useRef(null);

      var _e = React__namespace.useState(false),
          withSearch = _e[0],
          setWithSearch = _e[1];

      var _f = React__namespace.useState(),
          focusedOption = _f[0],
          setFocusedOption = _f[1];

      var _g = React__namespace.useState(false),
          highlightFirstItem = _g[0],
          setHighlightFirstItem = _g[1];

      var _h = React__namespace.useState(false),
          highlightLastItem = _h[0],
          setHighlightLastItem = _h[1];

      var _j = React__namespace.useState({
        width: popoverWidth || width
      }),
          popoverStyle = _j[0],
          setPopoverStyle = _j[1];

      var triggerStyle = {
        width: width
      };
      React__namespace.useEffect(function () {
        var _a, _b;

        if (!popoverWidth && ((_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth)) {
          setPopoverStyle(__assign(__assign({}, popoverStyle), {
            width: (_b = triggerRef.current) === null || _b === void 0 ? void 0 : _b.clientWidth
          }));
        }
      }, []);
      React__namespace.useImperativeHandle(ref, function () {
        return {
          setOpen: function setOpen(open) {
            setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(open);
          },
          setFocusFirstItem: function setFocusFirstItem() {
            if (openPopover) {
              requestAnimationFrame(function () {
                return focusListItem$1('down', setFocusedOption, listRef);
              });
              setHighlightFirstItem(true);
            }
          },
          setFocusLastItem: function setFocusLastItem() {
            if (openPopover) {
              requestAnimationFrame(function () {
                return focusListItem$1('up', setFocusedOption, listRef);
              });
              setHighlightLastItem(true);
            }
          }
        };
      });
      React__namespace.useEffect(function () {
        if (!openPopover) {
          setHighlightFirstItem(false);
          setHighlightLastItem(false);
        }
      }, [openPopover]);
      React__namespace.useEffect(function () {
        if (highlightFirstItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$1('down', setFocusedOption, listRef);
          });
        }
      }, [highlightFirstItem]);
      React__namespace.useEffect(function () {
        if (highlightLastItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem$1('up', setFocusedOption, listRef);
          });
        }
      }, [highlightLastItem]);
      React__namespace.useEffect(function () {
        if (value) {
          setSelectValue(value);
          setIsOptionSelected(Array.isArray(value) ? value.length > 0 : value.value.trim().length > 0);
        }
      }, [value]);

      var onToggleHandler = function onToggleHandler(open) {
        if (triggerOptions && triggerOptions.disabled) {
          setOpenPopover(false);
        } else {
          setHighlightFirstItem(open);
          setOpenPopover(open);
        }
      };

      var onOptionClick = function onOptionClick(option) {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(option);
        !multiSelect && setOpenPopover(false);
      };

      var onOutsideClickHandler = function onOutsideClickHandler() {
        onOutsideClick === null || onOutsideClick === void 0 ? void 0 : onOutsideClick();
      };

      var contextProp = {
        openPopover: openPopover,
        setOpenPopover: setOpenPopover,
        selectValue: selectValue,
        setSelectValue: setSelectValue,
        isOptionSelected: isOptionSelected,
        setIsOptionSelected: setIsOptionSelected,
        onOptionClick: onOptionClick,
        maxHeight: maxHeight,
        minHeight: minHeight,
        withSearch: withSearch,
        width: width,
        setWithSearch: setWithSearch,
        multiSelect: multiSelect,
        listRef: listRef,
        triggerRef: triggerRef,
        focusedOption: focusedOption,
        setFocusedOption: setFocusedOption,
        setHighlightFirstItem: setHighlightFirstItem,
        setHighlightLastItem: setHighlightLastItem
      };
      return /*#__PURE__*/React__namespace.createElement(SelectContext.Provider, {
        value: contextProp
      }, /*#__PURE__*/React__namespace.createElement("div", {
        "data-test": "DesignSystem-Select",
        "aria-haspopup": "listbox",
        "aria-expanded": openPopover,
        style: triggerStyle
      }, /*#__PURE__*/React__namespace.createElement(Popover, {
        open: openPopover,
        onToggle: onToggleHandler,
        className: "mt-3",
        triggerClass: "d-block",
        customStyle: popoverStyle,
        boundaryElement: boundaryElement,
        appendToBody: appendToBody,
        trigger: /*#__PURE__*/React__namespace.createElement(SelectTrigger, __assign({
          "aria-controls": "select-listbox"
        }, triggerOptions))
      }, /*#__PURE__*/React__namespace.createElement(OutsideClick, {
        onOutsideClick: onOutsideClickHandler
      }, /*#__PURE__*/React__namespace.createElement("div", {
        role: "listbox",
        id: "select-listbox",
        tabIndex: 0,
        ref: listRef
      }, children)))));
    });
    Select.displayName = 'Select';
    Select.defaultProps = {
      maxHeight: 256,
      width: 176
    };
    Select.Option = SelectOption;
    Select.List = SelectList;
    Select.SearchInput = SearchInput;
    Select.EmptyTemplate = SelectEmptyTemplate;
    Select.Footer = SelectFooter;

    var MenuGroup = function MenuGroup(props) {
      var label = props.label,
          children = props.children,
          showDivider = props.showDivider,
          rest = __rest(props, ["label", "children", "showDivider"]);

      if (label) {
        return /*#__PURE__*/React__default["default"].createElement("div", __assign({
          "data-test": "DesignSystem-Menu-Group",
          role: "group",
          className: "Menu-Group"
        }, rest), /*#__PURE__*/React__default["default"].createElement(Text, {
          "data-test": "DesignSystem-Menu-Group-Label",
          size: "small",
          weight: "medium",
          appearance: "subtle",
          className: "Menu-Group-Label"
        }, label), children);
      }

      return /*#__PURE__*/React__default["default"].createElement("div", __assign({
        "data-test": "DesignSystem-Menu-Group",
        role: "group"
      }, rest), children, showDivider && /*#__PURE__*/React__default["default"].createElement(Divider, {
        className: "my-3"
      }));
    };
    MenuGroup.defaultProps = {
      showDivider: true
    };

    var MenuContext = /*#__PURE__*/React__namespace.createContext({});

    var handleKeyDown$1 = function handleKeyDown(event, focusedOption, setFocusedOption, setOpenPopover, menuTriggerRef, listRef, subListRef, isSubMenuTrigger, triggerRef, menuID, triggerID, parentListRef) {
      var _a, _b, _c;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateOptions('up', focusedOption, setFocusedOption, listRef);
          break;

        case 'ArrowDown':
          event.preventDefault();
          navigateOptions('down', focusedOption, setFocusedOption, listRef);
          break;

        case 'Enter':
          (_a = focusedOption) === null || _a === void 0 ? void 0 : _a.click();
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          break;

        case 'Escape':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);

          if (triggerRef && !isSubMenuTrigger) {
            (_b = triggerRef === null || triggerRef === void 0 ? void 0 : triggerRef.current) === null || _b === void 0 ? void 0 : _b.focus();
          } else {
            (_c = menuTriggerRef === null || menuTriggerRef === void 0 ? void 0 : menuTriggerRef.current) === null || _c === void 0 ? void 0 : _c.focus();
          }

          setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(undefined);
          break;

        case 'Tab':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          break;

        case 'ArrowRight':
          navigateSubMenu(isSubMenuTrigger, 'right', subListRef, menuID, triggerID, parentListRef);
          break;

        case 'ArrowLeft':
          navigateSubMenu(isSubMenuTrigger, 'left', subListRef, menuID, triggerID, parentListRef);
          break;
      }
    };

    var navigateOptions = function navigateOptions(direction, focusedOption, setFocusedOption, listRef) {
      var _a, _b;

      var listItems = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var index = Array.from(listItems).findIndex(function (item) {
        return item == focusedOption;
      });

      if (index === -1) {
        index = direction === 'up' ? listItems.length - 1 : 0;
      } else {
        index = direction === 'up' ? (index - 1 + listItems.length) % listItems.length : (index + 1) % listItems.length;
      }

      var targetOption = listItems[index];
      targetOption.focus();
      setFocusedOption && setFocusedOption(targetOption);
      (_b = targetOption === null || targetOption === void 0 ? void 0 : targetOption.scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(targetOption, {
        block: 'center'
      });
    };

    var navigateSubMenu = function navigateSubMenu(isSubMenuTrigger, direction, subListRef, menuID, triggerID, parentListRef) {
      var _a, _b, _c, _d;

      var element = document.querySelector("[data-name=\"" + menuID + "\"]");
      var menuPlacement = element === null || element === void 0 ? void 0 : element.getAttribute('data-placement');

      if (isSubMenuTrigger) {
        if (direction === 'right' && (menuPlacement === null || menuPlacement === void 0 ? void 0 : menuPlacement.includes('right')) || direction === 'left' && (menuPlacement === null || menuPlacement === void 0 ? void 0 : menuPlacement.includes('left'))) {
          var listItems = (_a = subListRef === null || subListRef === void 0 ? void 0 : subListRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
          (listItems === null || listItems === void 0 ? void 0 : listItems[0]).focus();
        }
      } else if (direction === 'left' && (menuPlacement === null || menuPlacement === void 0 ? void 0 : menuPlacement.includes('right')) || direction === 'right' && (menuPlacement === null || menuPlacement === void 0 ? void 0 : menuPlacement.includes('left'))) {
        var triggerElement = (_c = (_b = parentListRef === null || parentListRef === void 0 ? void 0 : parentListRef.current) === null || _b === void 0 ? void 0 : _b.querySelector("#" + triggerID)) === null || _c === void 0 ? void 0 : _c.firstChild;
        (_d = triggerElement) === null || _d === void 0 ? void 0 : _d.focus();
      }
    };

    var SubMenuContext = /*#__PURE__*/React__namespace.createContext({});

    var MenuItem = function MenuItem(props) {
      var children = props.children,
          className = props.className,
          onClick = props.onClick,
          disabled = props.disabled,
          onFocus = props.onFocus,
          rest = __rest(props, ["children", "className", "onClick", "disabled", "onFocus"]);

      var contextProp = React__default["default"].useContext(MenuContext);
      var subMenuContextProp = React__default["default"].useContext(SubMenuContext);
      var isSubMenuTrigger = false;
      var subListRef = null;
      var triggerRef = subMenuContextProp.triggerRef,
          menuID = subMenuContextProp.menuID,
          setParentOpen = subMenuContextProp.setParentOpen,
          triggerID = subMenuContextProp.triggerID,
          parentListRef = subMenuContextProp.parentListRef;
      var setOpenPopover = contextProp.setOpenPopover,
          focusedOption = contextProp.focusedOption,
          setFocusedOption = contextProp.setFocusedOption,
          menuTriggerRef = contextProp.menuTriggerRef,
          listRef = contextProp.listRef;
      var MenuItemClassName = classNames__default["default"]({
        'Menu-Item': true
      }, className);
      React__default["default"].useEffect(function () {
        var _a, _b;

        var handlePopoverOpen = function handlePopoverOpen() {
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        };

        var handlePopoverClose = function handlePopoverClose() {
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
        };

        var triggerElement = (_b = (_a = parentListRef === null || parentListRef === void 0 ? void 0 : parentListRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("#" + triggerID)) === null || _b === void 0 ? void 0 : _b.firstChild;
        triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.addEventListener('focus', handlePopoverOpen);
        triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.addEventListener('blur', handlePopoverClose);
        return function () {
          triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.removeEventListener('focus', handlePopoverOpen);
          triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.removeEventListener('blur', handlePopoverClose);
        };
      }, [triggerID]);

      var onFocusHandler = function onFocusHandler(event) {
        setFocusedOption === null || setFocusedOption === void 0 ? void 0 : setFocusedOption(event.target);
        setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
      };

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$1(event, focusedOption, setFocusedOption, setOpenPopover, menuTriggerRef, listRef, subListRef, isSubMenuTrigger, triggerRef, menuID, triggerID, parentListRef);
      };

      var onClickHandler = function onClickHandler(event) {
        if (disabled) {
          return;
        }

        setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
        setParentOpen === null || setParentOpen === void 0 ? void 0 : setParentOpen(false);
      };

      return /*#__PURE__*/React__default["default"].createElement(Listbox.Item, __assign({
        "data-test": "DesignSystem-Menu-ListItem",
        className: MenuItemClassName,
        tabIndex: -1,
        onKeyDown: onKeyDownHandler,
        onFocus: onFocusHandler,
        onClick: onClickHandler,
        disabled: disabled,
        role: "menuitem",
        "aria-disabled": disabled
      }, rest), children);
    };
    MenuItem.displayName = 'MenuItem';
    MenuItem.defaultProps = {
      tagName: 'a'
    };

    var MenuList = function MenuList(props) {
      var children = props.children,
          rest = __rest(props, ["children"]);

      return /*#__PURE__*/React__default["default"].createElement(Listbox, __assign({
        "data-test": "DesignSystem-Menu-List"
      }, rest), children);
    };
    MenuList.defaultProps = {
      type: 'option',
      showDivider: false,
      tagName: 'nav',
      size: 'compressed'
    };

    var handleKeyDown = function handleKeyDown(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightLastItem === null || setHighlightLastItem === void 0 ? void 0 : setHighlightLastItem(true);
          break;

        case 'ArrowDown':
          event.preventDefault();
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(true);
          setHighlightFirstItem === null || setHighlightFirstItem === void 0 ? void 0 : setHighlightFirstItem(true);
          break;

        case 'Escape':
        case 'Tab':
          setOpenPopover === null || setOpenPopover === void 0 ? void 0 : setOpenPopover(false);
          break;
      }
    };
    var focusListItem = function focusListItem(position, setFocusedOption, listRef) {
      var _a, _b, _c;

      var listItems = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-test="DesignSystem-Listbox-ItemWrapper"]');
      var targetOption;

      if (position === 'down') {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[0];
      } else {
        targetOption = listItems === null || listItems === void 0 ? void 0 : listItems[listItems.length - 1];
      }

      (_b = targetOption) === null || _b === void 0 ? void 0 : _b.focus();

      if (targetOption && typeof targetOption.scrollIntoView === 'function') {
        (_c = targetOption) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
          block: 'end'
        });
      }

      setFocusedOption && setFocusedOption(targetOption);
    };

    var MenuTrigger = function MenuTrigger(props) {
      var className = props.className;
      var contextProp = React__default["default"].useContext(MenuContext);
      var openPopover = contextProp.openPopover,
          setOpenPopover = contextProp.setOpenPopover,
          setHighlightFirstItem = contextProp.setHighlightFirstItem,
          setHighlightLastItem = contextProp.setHighlightLastItem,
          menuTriggerRef = contextProp.menuTriggerRef;
      var triggerClassName = classNames__default["default"]({
        'Menu-Trigger--active': openPopover
      }, className);

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown(event, setOpenPopover, setHighlightFirstItem, setHighlightLastItem);
      };

      return /*#__PURE__*/React__default["default"].createElement(Button, __assign({
        "data-test": "DesignSystem-Menu-Trigger",
        icon: "more_horiz",
        ref: menuTriggerRef,
        "aria-label": "Open menu",
        "aria-haspopup": true,
        "aria-expanded": openPopover
      }, props, {
        className: triggerClassName,
        onKeyDown: onKeyDownHandler
      }));
    };

    var SubMenu = function SubMenu(props) {
      var _a;

      var children = props.children;
      var menuID = "DesignSystem-Menu--Popover-" + uidGenerator();
      var triggerID = "DesignSystem-Menu--Trigger-" + uidGenerator();

      var _b = React__default["default"].Children.toArray(children),
          submenuTrigger = _b[0],
          submenuContent = _b[1];

      var contextProp = React__default["default"].useContext(MenuContext);
      var subListRef = React__default["default"].useRef(null);
      var triggerRef = React__default["default"].useRef(null);
      var isSubMenuTrigger = true;
      var subMenuElement = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);
      var setOpenPopover = contextProp.setOpenPopover,
          focusedOption = contextProp.focusedOption,
          setFocusedOption = contextProp.setFocusedOption,
          menuTriggerRef = contextProp.menuTriggerRef,
          listRef = contextProp.listRef;

      var onKeyDownHandler = function onKeyDownHandler(event) {
        handleKeyDown$1(event, focusedOption, setFocusedOption, setOpenPopover, menuTriggerRef, listRef, subListRef, isSubMenuTrigger, triggerRef, menuID);
      };

      var subMenuContextProp = {
        triggerRef: triggerRef,
        menuID: menuID,
        setParentOpen: setOpenPopover,
        parentListRef: listRef,
        triggerID: triggerID
      };
      var triggerElement = /*#__PURE__*/React__default["default"].cloneElement(submenuTrigger, __assign(__assign({}, (_a = submenuTrigger) === null || _a === void 0 ? void 0 : _a.props), {
        onKeyDown: onKeyDownHandler,
        ref: triggerRef,
        'aria-haspopup': 'menu',
        'aria-expanded': subListRef.current ? 'true' : 'false',
        'aria-controls': menuID,
        id: triggerID
      }));

      if ( /*#__PURE__*/React__default["default"].isValidElement(submenuContent)) {
        var _c = submenuContent === null || submenuContent === void 0 ? void 0 : submenuContent.props,
            on = _c.on,
            children_1 = _c.children;

        subMenuElement = /*#__PURE__*/React__default["default"].cloneElement(submenuContent, __assign(__assign({}, submenuContent.props), {
          on: on || 'hover',
          offset: 'small',
          children: /*#__PURE__*/React__default["default"].createElement("div", {
            ref: subListRef
          }, children_1),
          trigger: triggerElement
        }));
      }

      return /*#__PURE__*/React__default["default"].createElement(SubMenuContext.Provider, {
        value: subMenuContextProp
      }, subMenuElement);
    };

    var Menu = function Menu(props) {
      var _a;

      var children = props.children,
          width = props.width,
          minHeight = props.minHeight,
          maxHeight = props.maxHeight,
          className = props.className,
          open = props.open,
          rest = __rest(props, ["children", "width", "minHeight", "maxHeight", "className", "open"]);

      var _b = React__default["default"].useState(open),
          openPopover = _b[0],
          setOpenPopover = _b[1];

      var _c = React__default["default"].useState(false),
          highlightFirstItem = _c[0],
          setHighlightFirstItem = _c[1];

      var _d = React__default["default"].useState(false),
          highlightLastItem = _d[0],
          setHighlightLastItem = _d[1];

      var _e = React__default["default"].useState(),
          focusedOption = _e[0],
          setFocusedOption = _e[1];

      var listRef = /*#__PURE__*/React__default["default"].createRef();
      var menuTriggerRef = React__default["default"].useRef(null);
      var subMenuContextProp = React__default["default"].useContext(SubMenuContext);
      var menuID = subMenuContextProp.menuID;
      var popoverClassName = classNames__default["default"]((_a = {}, _a['Menu'] = true, _a), className);
      React__default["default"].useEffect(function () {
        setOpenPopover(open);
      }, [open]);
      React__default["default"].useEffect(function () {
        if (highlightFirstItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem('down', setFocusedOption, listRef);
          });
        }
      }, [highlightFirstItem]);
      React__default["default"].useEffect(function () {
        if (highlightLastItem && openPopover) {
          requestAnimationFrame(function () {
            return focusListItem('up', setFocusedOption, listRef);
          });
        }
      }, [highlightLastItem]);
      React__default["default"].useEffect(function () {
        if (!openPopover) {
          setHighlightFirstItem(false);
          setHighlightLastItem(false);
        }
      }, [openPopover]);

      var onToggleHandler = function onToggleHandler(open) {
        setOpenPopover(open);
      };

      var contextProp = {
        openPopover: openPopover,
        setOpenPopover: setOpenPopover,
        setHighlightFirstItem: setHighlightFirstItem,
        setHighlightLastItem: setHighlightLastItem,
        focusedOption: focusedOption,
        setFocusedOption: setFocusedOption,
        menuTriggerRef: menuTriggerRef,
        listRef: listRef
      };
      return /*#__PURE__*/React__default["default"].createElement(MenuContext.Provider, {
        value: contextProp
      }, /*#__PURE__*/React__default["default"].createElement(Popover, __assign({
        "data-test": "DesignSystem-Menu",
        name: menuID,
        offset: "medium"
      }, rest, {
        open: openPopover,
        customStyle: {
          width: width
        },
        onToggle: onToggleHandler
      }), /*#__PURE__*/React__default["default"].createElement("div", {
        ref: listRef,
        role: "menu",
        "data-test": props['data-test'] || 'DesignSystem-Menu-Wrapper',
        className: popoverClassName,
        style: {
          maxHeight: maxHeight,
          minHeight: minHeight
        }
      }, children)));
    };
    Menu.Group = MenuGroup;
    Menu.Item = MenuItem;
    Menu.List = MenuList;
    Menu.Trigger = MenuTrigger;
    Menu.SubMenu = SubMenu;
    Menu.defaultProps = {
      width: 176,
      maxHeight: 256,
      position: 'bottom-start'
    };

    var img$1 = "data:image/svg+xml,%3csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 0C10 5.52285 5.52285 10 0 10C5.52285 10 10 14.4772 10 20C10 14.4772 14.4772 10 20 10C14.4772 10 10 5.52285 10 0ZM20 14C20 17.3137 17.3137 20 14 20C17.3137 20 20 22.6863 20 26C20 22.6863 22.6863 20 26 20C22.6863 20 20 17.3137 20 14Z' fill='%232F2F2F'/%3e%3c/svg%3e";

    var img = "data:image/svg+xml,%3csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 0C10 5.52285 5.52285 10 0 10C5.52285 10 10 14.4772 10 20C10 14.4772 14.4772 10 20 10C14.4772 10 10 5.52285 10 0ZM20 14C20 17.3137 17.3137 20 14 20C17.3137 20 20 22.6863 20 26C20 22.6863 22.6863 20 26 20C22.6863 20 20 17.3137 20 14Z' fill='white'/%3e%3c/svg%3e";

    var AIButton = function AIButton(props) {
      var appearance = props.appearance,
          className = props.className,
          children = props.children,
          rest = __rest(props, ["appearance", "className", "children"]);

      var buttonClassNames = classNames__default["default"]({
        AIButton: true,
        'AIButton--primary': appearance === 'primary',
        'AIButton--basic': appearance === 'basic'
      }, className);
      var IconClassNames = classNames__default["default"]({
        'AIButton-Icon': true
      });
      var buttonIcon = appearance === 'primary' ? img : img$1;
      return /*#__PURE__*/React__namespace.createElement("button", __assign({
        className: buttonClassNames,
        "data-test": "DesignSystem-AI-Button"
      }, rest), /*#__PURE__*/React__namespace.createElement("img", {
        src: buttonIcon,
        alt: "Button Icon",
        width: 16,
        height: 16,
        className: IconClassNames,
        "data-test": "DesignSystem-AI-Button-Icon"
      }), children);
    };
    AIButton.defaultProps = {
      appearance: 'basic',
      type: 'button'
    };

    var version = "2.34.0";

    exports.AIButton = AIButton;
    exports.ActionCard = ActionCard;
    exports.Avatar = Avatar;
    exports.AvatarGroup = AvatarGroup;
    exports.AvatarSelection = AvatarSelection;
    exports.Backdrop = Backdrop;
    exports.Badge = Badge;
    exports.Breadcrumbs = Breadcrumbs;
    exports.Button = Button;
    exports.Calendar = Calendar;
    exports.Caption = Caption;
    exports.Card = Card;
    exports.CardBody = CardBody;
    exports.CardFooter = CardFooter;
    exports.CardHeader = CardHeader;
    exports.CardSubdued = CardSubdued;
    exports.ChatMessage = ChatMessage;
    exports.Checkbox = Checkbox;
    exports.Chip = Chip;
    exports.ChipGroup = ChipGroup;
    exports.ChipInput = ChipInput;
    exports.ChoiceList = ChoiceList;
    exports.Collapsible = Collapsible;
    exports.Column = Column;
    exports.Combobox = Combobox;
    exports.DatePicker = DatePicker;
    exports.DateRangePicker = DateRangePicker;
    exports.Dialog = Dialog;
    exports.Divider = Divider;
    exports.Dropdown = Dropdown;
    exports.Dropzone = Dropzone;
    exports.EditableChipInput = EditableChipInput;
    exports.EditableDropdown = EditableDropdown;
    exports.EditableInput = EditableInput;
    exports.EmptyState = EmptyState;
    exports.FileList = FileList;
    exports.FileUploader = FileUploader;
    exports.FileUploaderList = FileUploaderList;
    exports.FullscreenModal = FullscreenModal;
    exports.Grid = Grid;
    exports.GridCell = GridCell;
    exports.Heading = Heading;
    exports.HelpText = HelpText;
    exports.HorizontalNav = HorizontalNav;
    exports.Icon = Icon;
    exports.InlineMessage = InlineMessage;
    exports.Input = Input;
    exports.InputMask = X;
    exports.Label = Label;
    exports.Legend = Legend;
    exports.Link = Link;
    exports.LinkButton = LinkButton;
    exports.List = List;
    exports.Listbox = Listbox;
    exports.Menu = Menu;
    exports.Message = Message;
    exports.MetaList = MetaList;
    exports.MetricInput = MetricInput;
    exports.Modal = Modal;
    exports.ModalBody = ModalBody;
    exports.ModalDescription = ModalDescription;
    exports.ModalFooter = ModalFooter;
    exports.ModalHeader = ModalHeader;
    exports.MultiSlider = MultiSlider;
    exports.Navigation = Navigation;
    exports.OutsideClick = OutsideClick;
    exports.PageHeader = PageHeader;
    exports.Pagination = Pagination;
    exports.Paragraph = Paragraph;
    exports.Pills = Pills;
    exports.Placeholder = Placeholder;
    exports.PlaceholderImage = PlaceholderImage;
    exports.PlaceholderParagraph = PlaceholderParagraph;
    exports.Popover = Popover;
    exports.ProgressBar = ProgressBar;
    exports.ProgressRing = ProgressRing;
    exports.Radio = Radio;
    exports.RangeSlider = RangeSlider;
    exports.Row = Row;
    exports.Select = Select;
    exports.SelectionCard = SelectionCard;
    exports.Sidesheet = Sidesheet;
    exports.Slider = Slider;
    exports.Spinner = Spinner;
    exports.StatusHint = StatusHint;
    exports.Stepper = Stepper;
    exports.Subheading = Subheading;
    exports.Switch = Switch;
    exports.Tab = Tab;
    exports.Table = Table;
    exports.Tabs = Tabs;
    exports.TabsWrapper = TabsWrapper;
    exports.Text = Text;
    exports.TextField = TextField;
    exports.Textarea = Textarea;
    exports.TimePicker = TimePicker;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;
    exports.Utils = index;
    exports.VerificationCodeInput = VerificationCodeInput;
    exports.VerticalNav = VerticalNav;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
