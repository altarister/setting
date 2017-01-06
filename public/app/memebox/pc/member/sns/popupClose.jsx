var $ = require('jquery');
var utility = require('utility');

var popupClose = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            windowClose: '.popup-window-close'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            var success = this.ui.windowClose.data('resultSuccess');
            var msg = this.ui.windowClose.data('resultMsg');

            alert(success+' , '+msg)
            if (success == 'ok') {
                console.log('opener = ',opener)

                this.addEventListener();
                //$.publish('sns.popupWindow.close', {targetUrl:'/rocketpay/mypage'});
                opener.$.publish('sns.popupWindow.close', {targetUrl:'/rocketpay/mypage'});
                //self.close();
            } else {
                alert(msg);
                self.close();
            }
        },

        addEventListener: function(){
            $.subscribe('sns.popupWindow.close', $.proxy(this.popupWindowCloseEvent, this));
        },

        f: function(){

        }
    };
    controller.initialize();
};

module.exports = popupClose;