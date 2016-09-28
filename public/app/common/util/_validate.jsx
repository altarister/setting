// jquery: event.keyCode
// http://www.cambiaresearch.com/articles/15/javascript-key-codes
var keycodes = {
    BACKSPACE: 8,
    TAB: 9,

    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,

    SHIFT: 16,
    CTRL: 17,
    ALT: 18,

    PAGE_UP: 33,
    PAGE_DOWN: 34,

    END: 35,
    HOME: 36,
    INSERT: 45,
    DELETE: 46,

    NUM_LOCK: 144,

    CAPS_LOCK: 20,

    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};

var validCharArr = [
    // refer to http://jrgraphix.net/research/unicode_blocks.php
    '\u0020-\u007F',    // Basic Latin
    '\u1100-\u11FF',    // Hangul Jamo
    '\u3130-\u318F',    // Hangul Compatibility Jamo
    '\uAC00-\uD7AF',    // Hangul Syllables
    '\u4E00-\u9FFF',    // CJK Unified Ideographs
    '\u3000-\u303F',    // CJK Symbols and Punctuation
    '\uFF00-\uFFEF'     // Halfwidth and Fullwidth Forms
];

var validate = {
    keycodes: keycodes,

    trim: function (str) {
        var str = (typeof str !== 'string') ? '' + str : str;
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    isNull: function (obj) {
        return (obj === 0) ? false : (!!obj) ? false : true;
    },
    isNotNull: function (obj) {
        return !isNull(obj);
    },
    isEmpty: function (obj) {
        if (typeof obj == "string") {
            return (validate.trim(obj).length > 0) ? false : true;
        }
        return validate.isNull(obj);
    },
    isNotEmpty: function(obj){
        return !this.isEmpty(obj);
    },
    isNumber: function (input) {
        return typeof input === 'number' && isFinite(input);
    },
    isNumeric: function (input) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    },
    isNumberByEvent: function(e){
        return e.which && (48 <= e.which && e.which <= 57 || e.which == keycodes.BACKSPACE);
    },
    defaultValue: function(arg, defaultValue) {
        if (this.isEmpty(arg)) return defaultValue;
        return arg
    },
    isKor: function (str) {
        str = validate.trim(str);
        return (/^[가-힝]+$/).test(str);
    },
    isEng: function (str) {
        str = validate.trim(str);
        return (/^[a-zA-Z]+$/).test(str);
    },
    isEmail: function (str) {
        return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(str);
    },
    isCellPhone: function(first, second, third) {
        var cellPhoneNumber = first + "-" + second + "-" + third;
        if (!this.isTel(cellPhoneNumber)) return false;
        var secondPattern = "010" === first ? /\d{4}/ : /\d{3,4}/;
        var thirdPattern = /\d{4}/;
        var validSecond = secondPattern.test(second);
        var validThird = thirdPattern.test(third);
        if (validSecond && validThird) return true;
        return false
    },
    cellphoneByAll : function(cellphoneNumber){
        var cellphoneByAll = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        return cellphoneByAll.test(cellphoneNumber);
    },
    isSelected: function( selectValue ){
        return selectValue.length > 0;
    },
    isTel: function(val) {
        var phonestr = /^\d{2,6}-\d{3,4}-\d{4}$/;
        if (!phonestr.test(val)) return false;
        else return true
    },
    isValidCharacters: function(val) {
        if (val != null && val != "") {
            var formatStr = "^[" + validCharArr.join('') + "]*$";
            var format = new RegExp(formatStr);
            if (!format.test(val)) {
                return false;
            }
        }
        return true;
    }
};

module.exports = validate;