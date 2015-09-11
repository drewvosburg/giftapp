import BaseView from './baseView';

var sharedListEntry = BaseView.extend({

    initialize: function(options) {
        Handlebars.registerHelper('beforeNow', function (date) {
            if (moment.unix(date).diff(moment()) < 0) {
                return "past";
            }
        });
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
        this.model = options.model;

        Handlebars.registerHelper('formatTime', function(options) {
            var timestamp = options.fn(this);
            if (timestamp && parseInt(timestamp)) {
                timestamp = moment.unix(timestamp).fromNow()
                return new Handlebars.SafeString("(" + timestamp + ")")
            }
        });
    },

    events: {
        'click': 'navigate'
    },

    render: function() {

        var self = this;
        var template = JST['sharedListEntry.hbs'](self.model);
        self.$el.html(template);
    },

    transitionIn: function(callback) {

        TweenLite.fromTo(this.$('h1'), .5, {
            x: -100,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            ease: 'easeOutExpo'
        });

        if (_.isFunction(callback)) {
            callback();
        };

    },
    navigate: function(e) {
        var self = this;
        Backbone.history.navigate("shared-list?l=" + self.id, {trigger: true});
    },

    transitionOut: function(callback) {

        var self = this;

        TweenLite.to(this.$('h1'), .5, {
            x: 100,
            autoAlpha: 0,
            ease: 'easeInExpo',
            onComplete: function() {
                if (_.isFunction(callback)) {
                    callback();
                };

            }
        });
    },

    hide: function() {
        this.$el.hide();
    },

    show: function() {
        this.$el.show();
    }

});

export default sharedListEntry;