import BaseView from './baseView';
import ListEntry from './listEntry';
import DemoData from '../modules/data';

var wish = BaseView.extend({

    initialize: function() {
        this.users = DemoData.users();
        this.lists = DemoData.lists();
        this.items = DemoData.items();
        this.userId = "0";
    },

    events: {

    },

    render: function() {

        var self = this;
        var template = JST['wish.hbs'](self);
        self.$el.html(template);
        Backbone.trigger('title:update', 'logo');
        Backbone.trigger('title:noLeftButton');
        Backbone.trigger('title:noRightButton');
        Backbone.trigger('nav:wish');
        var i;

        // this would be done by underscore.  This is how you select the list
        var selection = _.findWhere(self.users, {'id': self.userId}).lists;
        var lists = []
        _.each(selection, function(list) {
            list = _.findWhere(self.lists, {'id': list})
            if (list) {
                lists.push(list);
            }
        });
        selection = _.sortBy(lists, 'date');
        var past = [];
        var noTime = [];
        var future = [];
        _.each(selection, function(list) {
            if (Date.parse(list.date)) {
                console.log(list.date)
                if (moment(list.date) < moment()) {
                    list.timePassed = true;
                    past.push(list);
                } else {
                    future.push(list);
                }
            } else {
                noTime.push(list)
            }
        });
        _.each(future, function(list) {
            var model = list;
            var items = [];
            _.each(list.items, function(item) {
                var temp = _.findWhere(self.items, {'id': item});
                if (temp) { items.push(temp)};
            });
            model.items = items;
            var card = new ListEntry({
                'model': model,
                'className': 'listEntry',
                'id': model.id
            });
            card.render();
            var wrapper = $('<div class="col-md-4 col-sm-6 col-xs-12"></div>');
            wrapper.append(card.$el);
            self.$('#list').append(wrapper);
        });
        _.each(noTime, function(list) {
            var model = list;
            var items = [];
            _.each(list.items, function(item) {
                var temp = _.findWhere(self.items, {'id': item});
                if (temp) { items.push(temp)};
            });
            model.items = items;
            var card = new ListEntry({
                'model': model,
                'className': 'listEntry',
                'id': model.id
            });
            card.render();
            var wrapper = $('<div class="col-md-4 col-sm-6 col-xs-12"></div>');
            wrapper.append(card.$el);
            self.$('#list').append(wrapper);
        });
        if (past.length) {
            var divider = $('<div class="col-xs-12"><h2 class="past">Past lists:</h2></div>');
            self.$('#list').append(divider);
            _.each(past, function(list) {
                var model = list;
                var items = [];
                _.each(list.items, function(item) {
                    var temp = _.findWhere(self.items, {'id': item});
                    if (temp) { items.push(temp)};
                });
                model.items = items;
                var card = new ListEntry({
                    'model': model,
                    'className': 'listEntry',
                    'id': model.id
                });
                card.render();
                var wrapper = $('<div class="col-md-4 col-sm-6 col-xs-12"></div>');
                wrapper.append(card.$el);
                self.$('#list').append(wrapper);
            });
        }
        return this;
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

export default wish;