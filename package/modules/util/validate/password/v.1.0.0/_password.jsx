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

    checkCapsLock: function(e) {
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

    validatePassword: function (str) {
        var isValidPassword = true;
        var security_step = 0;
        var reg_sequential = {
            english : /[a-zA-Z]\a\a/,
            number : /(\w)\1\1/
        };
        var reg_character = {
            english : /.*[a-zA-Z]/,
            specialCharacter : /.*[!@#$%^&+=]/,
            number : /.*[0-9]/
        };

        // 필요 문자 여부 확인
        for(var character_key in reg_character){
            if (reg_character[character_key].test(str)) {
                ++security_step;
            }
        }
        // 연속된 문자 숫자 확인
        for(var sequential_key in reg_sequential){
            if (reg_sequential[sequential_key].test(str)) {
                return isValidPassword = false;
            }
        }

        if (security_step < 2) {
            isValidPassword = false;
        }

        return isValidPassword;
    }
};

module.exports = validate_password;
