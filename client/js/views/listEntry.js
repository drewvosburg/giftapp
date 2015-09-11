import BaseView from './baseView';

var listEntry = BaseView.extend({

    initialize: function(options) {
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
        var template = JST['listEntry.hbs'](self.model);
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
        Backbone.history.navigate("list?l=" + self.id, {trigger: true});
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

export default listEntry;