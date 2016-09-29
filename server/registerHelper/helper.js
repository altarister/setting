/**
 * Created by 160727-b on 2016. 9. 29..
 */
var hbs = require('hbs');
var blocks = {};

hbs.registerPartials(__dirname + '/views/memebox/layouts');
hbs.registerPartials(__dirname + '/views/memebox/pc');
hbs.registerPartials(__dirname + '/views/common/');
hbs.registerPartials(__dirname + '/public/app/components');

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];

    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    blocks[name] = [];
    return val;
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

module.exports = hbs;