import BaseView from './baseView';
import SharedListEntry from './sharedListEntry';
import DemoData from '../modules/data';

var give = BaseView.extend({

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
        var template = JST['give.hbs'](self);
        self.$el.html(template);
        Backbone.trigger('title:update', 'Shared With You');
        Backbone.trigger('title:noLeftButton');
        Backbone.trigger('title:noRightButton');
        Backbone.trigger('nav:give');
        var i;

        // this would be done by underscore.  This is how you select the list
        var selection = this.users[0].lists;
        var lists = _.filter(self.lists, function(list) {
            return list.sharedWith.indexOf(self.userId) > -1;
        });
        selection = _.sortBy(lists, 'date');
        var past = [];
        var noTime = [];
        var future = [];

        _.each(selection, function(list) {
            if (Date.parse(list.date)) {
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
            model.name = _.findWhere(self.users, {'id': list.owner});
            model.active = true;
            if (model.name) {
                model.name = model.name.name;
            }
            var card = new SharedListEntry({
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
            model.active = true;
            model.name = _.findWhere(self.users, {'id': list.owner});
            if (model.name) {
                model.name = model.name.name;
            }
            var card = new SharedListEntry({
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
            var newRow = $('<div class="row"></div>')
            var divider = $('<div class="col-xs-12"><h2 class="past">Past lists:</h2></div>');
            newRow.append(divider);
            _.each(past, function(list) {
                var model = list;
                var items = [];
                _.each(list.items, function(item) {
                    var temp = _.findWhere(self.items, {'id': item});
                    if (temp) { items.push(temp)};
                });
                model.items = items;
                model.name = _.findWhere(self.users, {'id': list.owner});
                if (model.name) {
                    model.name = model.name.name;
                    model.active = list.active;
                }
                var card = new SharedListEntry({
                    'model': model,
                    'className': 'listEntry',
                    'id': model.id
                });
                card.render();
                var wrapper = $('<div class="col-md-4 col-sm-6 col-xs-12"></div>');
                wrapper.append(card.$el);
                newRow.append(wrapper);
            });
            self.$('#list').after(newRow);
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

export default give;