var validate_password = {

    isShift: false,

    message: {
        a: '영문(대소문자), 숫자, 특수문자 중 2가지 이상을 조합하여 작성합니다.',
        b: '비밀번호에 동일한 문자나 숫자를 연속으로 사용할 수 없습니다.',
        c: '비밀번호는 6~15자 이내로 입력 바랍니다.'
    },

    validatePassword: function (str) {
        var isValidPassword = true;
        var security_step = 0;
        var message = '';
        var reg_sequential = {
            english : /[a-zA-Z]\a\a/,
            number : /(\w)\1\1/
        };
        var reg_character = {
            english : /.*[a-zA-Z]/,
            specialCharacter : /.*[!@#$%^&+=]/,
            number : /.*[0-9]/
        };

        // 연속된 문자 숫자 확인
        for(var sequential_key in reg_sequential){
            if (reg_sequential[sequential_key].test(str)) {
                message = this.message.b;
                isValidPassword = false;
            }
        }

        if( !this.checkSequencialNumber(str,4) ){
            message = this.message.b;
            isValidPassword = false;
        }

        // 필요 문자 여부 확인
        for(var character_key in reg_character){
            if (reg_character[character_key].test(str)) {
                ++security_step;
            }
        }

        if (security_step < 2) {
            message = this.message.a;
            isValidPassword = false;
        }

        if(str.length < 6 || str.length > 15 ){
            message = this.message.c;
            isValidPassword = false;
        }

        return {
            isValid: isValidPassword,
            message: message
        }
    },

    checkSequencialNumber: function (str, limit){
        var origin, d, p, n = 0;
        var limitLength = limit == null ? 4 : limit;
        for(var i=0; i<str.length; i++){
            var c = str.charCodeAt(i);
            if(i > 0 && (p = origin - c) >-2 && p < 2 && (n = p == d ? n+1 : 0) > limitLength-3){
                return false;
            }
            d = p;
            origin = c;
        }
        return true;
    }
};

module.exports = validate_password;
