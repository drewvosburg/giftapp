import BaseView from './baseView';
import ListEntry from './listEntry';
import DemoData from '../modules/data';

var shopList = BaseView.extend({

    initialize: function(options) {
        this.listId = options.listId;
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
        Handlebars.registerHelper('site', function(options) {
            var url = /(http(s)?:\/\/)?([^\.]*)?.([^\.]*)/i.exec(options.fn(this));
            return url[4];
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
        "click .checkbox": "gotten"
    },

    render: function() {
        var type = this.listId;
        if (type == "christmas") {
            type = "Christmas";
        } else if (type == "wishlist") {
            type = "Wish List";
        } else if (type == "birthday") {
            type = "Birthday";
        } else {
            type = "Other";
        }
        var self = this;
        self.type = type;
        Backbone.trigger('title:update', type);
        Backbone.trigger('title:backButton', 'shop');
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
            listData.ownerId = listOwner.id;
            listData.date = listObj.date;
            listData.type = listObj.type;
            listData.owner = listOwner.name;

            // Now that we have the metadata established, let's add the items as an array
            listData.items = [];
            _.each(list, function(item) {
                var itemObj = _.findWhere(self.items, {'id': item.item})
                itemObj.gotten = item.gotten;
                listData.items.push(itemObj);
            });
            if (listData.type == self.listId) {
                lists.push(listData);
            }
        });
        lists = _.groupBy(lists, 'ownerId');
        var model = {'title': self.type, 'lists': lists}
        console.log(model);
        var template = JST['shopList.hbs'](model);

        self.$el.html(template);
        return this;
    },
    gotten: function(e) {
        var target = $(e.target),
        checked = target.data('checked');
            console.log(checked)
        if (checked) {
            target.data('checked', false).removeClass('true');
        } else {
            target.data('checked', true).addClass('true');
        }
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

export default shopList;