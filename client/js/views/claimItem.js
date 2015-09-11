import BaseView from './baseView';

var claimItem = BaseView.extend({

    initialize: function(options) {
        this.model = options.model;
        Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }
            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }
            var operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };
            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }
            var result = operators[operator](lvalue, rvalue);
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    },

    events: {
        "click #dim": "hide",
        "click .cancel.btn": "hide",
        "click .closeBtn": "hide"

    },

    render: function() {

        var self = this;
        var template = JST['claimItem.hbs'](self.model);
        self.$el.html(template);
    },

    transitionIn: function(callback) {


        if (_.isFunction(callback)) {
            callback();
        };

    },

    transitionOut: function(callback) {

        if (_.isFunction(callback)) {
            callback();
        };

    },

    hide: function() {
        $('#modal').remove();
        $('main').css('overflowY','scroll');
    },

    show: function() {
        this.$el.show();
    }

});

export default claimItem;