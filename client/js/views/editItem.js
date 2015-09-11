import BaseView from './baseView';

var editItem = BaseView.extend({

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
        var template = JST['editItem.hbs'](self.model);
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

export default editItem;