import BaseView from './baseView';

var item = BaseView.extend({

    initialize: function(options) {
        this.model = options.model;
        Handlebars.registerHelper('site', function(options) {
            var url = /(http(s)?:\/\/)?([^\.]*)?.([^\.]*)/i.exec(options.fn(this));
            return url[4];
        });
    },

    events: {

    },

    render: function() {

        var self = this;
        var template = JST['item.hbs'](self.model);
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

export default item;