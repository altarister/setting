var $ = require('jquery');
var utility = require('utility');

require('device/signUpSNS.scss');

var signUpSNS_templates = {
    SNS: require('device/signUpSNS.hbs'),
};

var SignUpSNS = function($element){
    var controller = {

        element: $element,
        ui: {
            information: '.signUp-SNS-information-wrap'
        },

        data : {
            service : 'naver',
            welcomeText: '네이버로 회원가입을 시작합니다'
        },

        config: {
            sns: {
                service : 'email',
                welcomeText: '미미박스 회원이 되기 위한 간단한 과정!'
            }
        },

        initialize: function(){
            console.log('ggg -- ',this.element.length);

            this.makeSNS();
            utility.uiEnhancements.call(this);
        },

        makeSNS: function(){
            var SNS = '';
            if(this.element.length === 0){
                SNS = signUpSNS_templates.SNS(this.data);
            }
            console.log(SNS)
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = SignUpSNS