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
            var targetUrl = this.ui.windowClose.data('resultUrl');

            if (success == 'ok') {
                self.close();
                opener.$.publish('sns.popupWindow.close', {
                    targetUrl:targetUrl
                });
            } else {
                alert(msg);
                self.close();
            }
        }
    };
    controller.initialize();
};

module.exports = popupClose;