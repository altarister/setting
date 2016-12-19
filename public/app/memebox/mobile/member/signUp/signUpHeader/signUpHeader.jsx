var $ = require('jquery');
var utility = require('utility');

require('./signUpHeader.scss');

var signUpHeader = function () {
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function () {
            utility.uiEnhancements.call(this);
            this.addEventListener();
        }
    };
    controller.initialize();
};

module.exports = signUpHeader;