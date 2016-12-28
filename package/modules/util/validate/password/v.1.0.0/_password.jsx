var validate_password = {

    isShift: false,

    checkShiftUp: function (e) {
        if (e.which && e.which == 16) {
            this.isShift = false;
        }
    },

    checkShiftDown: function (e) {
        if (e.which && e.which == 16) {
            this.isShift = true;
        }
    },

    checkCapslock: function(e) {
        var myKeyCode = 0;
        var myShiftKey = false;
        if (window.event) { // IE
            myKeyCode = e.keyCode;
            myShiftKey = e.shiftKey;
        } else if (e.which) { // netscape ff opera
            myKeyCode = e.which;
            myShiftKey = this.isShift;
        }

        var oMsg = document.getElementById("pswd1Msg");

        if ((myKeyCode >= 65 && myKeyCode <= 90) && !myShiftKey) {
            oMsg.style.display = "block";
            oMsg.className = "error";
            oMsg.innerHTML = "Caps Lock이 켜져 있습니다.";
        } else if ((myKeyCode >= 97 && myKeyCode <= 122) && myShiftKey) {
            oMsg.style.display = "block";
            oMsg.className = "error";
            oMsg.innerHTML = "Caps Lock이 켜져 있습니다.";
        } else {
            oMsg.style.display = "none";
        }
    },

    temp: function(){
        var sameCharRegexp = /[a-zA-Z]\a\a/; // 같은 문자 반복 3개
        var sameNumberRegexp = /(\w)\1\1/; // 같은 숫자 반복 3개
    },

    isValidPassword: function (str) {
        var cnt = 0;
        if (str == "") {
            return false;
        }

        /* check whether input value is included space or not */
        // var retVal = checkSpace(str);
        // if (retVal) {
        //     return false;
        // }
        if (str.length < 6) {
            return false;
        }
        for (var i = 0; i < str.length; ++i) {
            if (str.charAt(0) == str.substring(i, i + 1))
                ++cnt;
        }
        if (cnt == str.length) {
            return false;
        }

        var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{6,16}$/;
        if (!isPW.test(str)) {
            return false;
        }

        return true;
    }
};

module.exports = validate_password;
