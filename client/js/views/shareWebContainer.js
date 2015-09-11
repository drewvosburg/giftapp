import BaseView from './baseView';

var share = BaseView.extend({

    initialize: function(options) {
        this.model = options.model;
    },

    events: {
        "click #dim": "hide",
        "click .cancel.btn": "hide",
        "click .closeBtn": "hide"
    },

    render: function() {

        var self = this;
        var template = JST['shareWebContainer.hbs'](self.model);
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
        console.log("trying to hide it")
        $('#modal').remove();
        $('main').css('overflowY','scroll');
    },

    show: function() {
        this.$el.show();
    }

});

export default share;