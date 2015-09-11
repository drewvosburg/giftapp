import BaseView from './baseView';
import DemoData from '../modules/data';

var share = BaseView.extend({

    initialize: function(options) {
        var self = this;
        self.users = DemoData.users();
        self.lists = DemoData.lists();
        self.listId = options.listId;

        self.selection = _.findWhere(self.lists, {'id': self.listId});
        self.shareMembers = [];
        _.each(self.selection.sharedWith, function(sharedUserId) {
            var user = _.findWhere(self.users, {'id': sharedUserId});
            if (user) {
                self.shareMembers.push({'name': user.name, 'id': user.id});
            } else {
                // check invites to see if it exists, then return invite id and email address
            }
        });
        self.shareMembers = self.shareMembers.reverse();
    },

    events: {
        "click #dim": "hide"
    },

    render: function() {

        var self = this;
        var template = JST['share.hbs'](self.shareMembers);
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
        $('#modal').remove();
        $('main').css('overflowY','scroll');
    },

    show: function() {
        this.$el.show();
    }

});

export default share;