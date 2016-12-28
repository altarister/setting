var validate_password = {
    validatePasswd: function(pwStr,handleErrorValidationText){
        if( pwStr == undefined ) {
            return false;
        }

        pwStr = pwStr.replace(/\s+/g, '');
        var pwStrLen = $.trim(pwStr).length;

        var reg_pwd_all = /^.*(?=.{6,10}$)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        var reg_pwd_chNu = /^.*(?=.*[a-zA-Z])(?=.*[0-9]).*$/;

        var reg_pwd_chSp = /^.*(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        var reg_pwd_nuSp = /^.*(?=.*[0-9])(?=.*[!@#$%^&+=]).*$/;

        if( pwStrLen == 0 ) {
            handleErrorValidationText('* 비밀번호를 공백으로 할 수 없습니다.',1);
            return false;
        } else {
            if( pwStrLen < 6 || pwStrLen > 15){
                handleErrorValidationText('* 비밀번호는 6~15자 이내로 입력 바랍니다.',1);
                return false;
            } else {

                // 조합 검사
                var isCombined = false;
                if( reg_pwd_all.test(pwStr)) {
                    isCombined = true;
                } else if( reg_pwd_chNu.test(pwStr)){ // 문자 + 숫자
                    isCombined = true;
                } else if( reg_pwd_chSp.test(pwStr)) { // 문자 + 특수문자
                    isCombined = true;
                } else if( reg_pwd_nuSp.test(pwStr) ){ // 숫자 + 특수문자
                    isCombined = true;
                }
                if( !isCombined ){
                    handleErrorValidationText('* 영문(대소문자), 숫자, 특수문자 중 2가지 이상을 조합하여 작성합니다.',1);
                    return false;
                } else {

                    var sameCharRegexp = /[a-zA-Z]\a\a/; // 같은 문자 반복 3개
                    var sameNumberRegexp = /(\w)\1\1/; // 같은 숫자 반복 3개

                    if( pwStr.match(sameCharRegexp) ) {
                        handleErrorValidationText('* 비밀번호에 동일한 문자나 숫자를 연속으로 사용할 수 없습니다.',1);
                        return false;
                    } else if( pwStr.match(sameNumberRegexp) ) {
                        handleErrorValidationText('* 비밀번호에 동일한 문자나 숫자를 연속으로 사용할 수 없습니다.',1);
                        return false;
                    }
                    else if( !checkSequencialNumber(pwStr,4) ){
                        handleErrorValidationText('* 연속된 문자/숫자는 사용할 수 없습니다.', 1);
                        return false;
                    }

                    try{
                        var loginedId = loginId.split("@")[0];
                        if( loginedId == pwStr){
                            handleErrorValidationText('* 비밀번호가 아이디와 동일할 수 없습니다.', 1);
                            return false;
                        }
                    }catch(err){
                    }
                    handleErrorValidationText('* 사용 가능한 비밀번호입니다.', 0);
                    return true;
                }
            }
        }
    }
};

module.exports = validate_password;