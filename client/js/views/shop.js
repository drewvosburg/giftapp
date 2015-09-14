import BaseView from './baseView';
import ListEntry from './listEntry';
import DemoData from '../modules/data';

var shop = BaseView.extend({

    initialize: function() {
        this.users = DemoData.users();
        this.lists = DemoData.lists();
        this.items = DemoData.items();
        this.claimed = DemoData.claimed();
        this.userId = "0";
        Handlebars.registerHelper('formatTime', function(options) {
            var timestamp = options.fn(this);
            if (timestamp && parseInt(timestamp)) {
                timestamp = moment(timestamp).fromNow()
                return new Handlebars.SafeString("(" + timestamp + ")")
            }
        });
        Handlebars.registerHelper('getEnglish', function(options) {
            var type = options.fn(this);
            if (type == "christmas") {
                type = "Christmas";
            } else if (type == "wishlist") {
                type = "Wish List";
            } else if (type == "birthday") {
                type = "Birthday";
            } else {
                type = "Other";
            }
            return new Handlebars.SafeString(type);
        });
    },

    events: {
        "click .listEntry": "navigate"
    },

    render: function() {

        var self = this;
        Backbone.trigger('title:update', 'Shop');
        Backbone.trigger('title:noLeftButton');
        Backbone.trigger('title:noRightButton');
        Backbone.trigger('nav:shop');

        var selection = _.where(self.claimed, {'claimerId': self.userId});
        selection = _.groupBy(selection, 'listId');
        var lists = []
        _.each(selection, function(list) {
            // This is a little complex, we're touching lots of tables, so hang with me.

            // First, get the list from the lists table.
            // These are sorted, so pick any of them ---------v
            var listObj = _.findWhere(self.lists, {'id': list[0].listId});
            var listOwner = _.findWhere(self.users, {'id': listObj.owner});

            // Building the list data object
            var listData = {};
            listData.title = listOwner.name + " - " + listObj.title;
            listData.date = listObj.date;
            listData.type = listObj.type;
            listData.owner = listOwner.name;

            // Now that we have the metadata established, let's add the items as an array
            listData.items = [];
            _.each(list, function(item) {
                var itemObj = _.findWhere(self.items, {'id': item.item})
                listData.items.push(itemObj);
            });
            lists.push(listData);
        });
        lists = _.sortBy(lists, 'owner');
        selection = _.groupBy(lists, 'type');
        var template = JST['shop.hbs'](selection);
        self.$el.html(template);
        return this;
    },
    navigate: function(e) {
        var target = null;
        if (e.target.id == "christmas" || e.target.id == "wishlist" || e.target.id =="birthday" || e.target.id == "other" ) {
            target = e.target.id;
        } else if ($(e.target).parent()[0].id == "christmas" || $(e.target).parent()[0].id == "wishlist" || $(e.target).parent()[0].id =="birthday" || $(e.target).parent()[0].id == "other" ) {
            target = $(e.target).parent()[0].id;
        } else {
            target = $(e.target).parent().parent()[0].id;
        }
        Backbone.history.navigate("shop-list?l=" + target, {trigger: true});
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
        this.$el.hide();
    },

    show: function() {
        this.$el.show();
    }

});

export default shop;