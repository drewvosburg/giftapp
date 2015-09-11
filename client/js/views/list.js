import BaseView from './baseView';
import Item from './item';
import Share from './share';
import ShareWebContainer from './shareWebContainer';
import EditItem from './editItem';
import DemoData from '../modules/data';

var list = BaseView.extend({

    initialize: function(options) {
        this.users = DemoData.users();
        this.lists = DemoData.lists();
        this.items = DemoData.items();
        this.listId = options.listId;
        var self = this;
        self.selection = _.findWhere(self.lists, {'id': self.listId});
        self.model = self.selection;
    },

    events: {
        "click .addBtn": "addItem",
        "click .edit.btn": "editItem",
        "click .listBtn": "showList",
        "click .sharedBtn": "showShareMobile",
        "click .shareBtnWeb": "showShareWeb"
    },

    render: function() {
        var self = this;
        var template = JST['list.hbs'](self.model);
        self.$el.html(template);
        Backbone.trigger('title:update', self.selection.title);
        Backbone.trigger('title:backButton', 'wish');
        Backbone.trigger('nav:wish');
        self.showList();
        Backbone.on('nav:addButtonPressed', function(){
            self.addItem();
        });
        return this;
    },
    showList: function () {
        var self = this;
        Backbone.trigger('title:addButton');
        self.$('#list').empty();

        self.$('.sharedBtn').removeClass('selected');
        self.$('.listBtn').addClass('selected');
        var listItems = [];
        _.each(self.selection.items, function(select) {
            var model = _.findWhere(self.items, {'id': select});
            if (model) {
                model.mine = true;
                listItems.push(model)
            }
        });
        var card = new Item({
            'model': listItems
        });
        card.render();
        self.$('#list').append(card.$el);
    },
    showShareMobile: function () {
        var self = this;
        Backbone.trigger('title:noRightButton');
        self.$('#list').empty();
        self.$('.listBtn').removeClass('selected');
        self.$('.sharedBtn').addClass('selected');

        var card = new Share({
            'listId': self.listId,
            'id': "share",
            'className': 'shareContents'
        });
        card.render();
        self.$('#list').append(card.$el);
    },
    showShareWeb: function () {
        var self = this;

        var card = new Share({
            'listId': self.listId,
            'id': "share"
        });
        card.render();
        var container = new ShareWebContainer({
            'model': "none",
            'id': 'modal'
        });
        container.render();
        $(container.$el).find('.content').append(card.$el)

        $('body').append(container.$el);
    },
    addItem: function () {
        if ($('#modal').length == 0) {
            var self = this,
                model = {'listTitle': self.model.title},
                modal = new EditItem({
                'model': model,
                'id': 'modal'
            });
            $('main').css('overflowY','hidden');
            modal.render();
            $('body').append(modal.$el);
        }
    },
    editItem: function (e) {
        if ($('#modal').length == 0) {
            var self = this,
                item = $(e.target).parent(),
                model = _.findWhere(self.items, {'id': item[0].id}),
                modal = new EditItem({
                'model': model,
                'id': 'modal'
            });
            $('main').css('overflowY','hidden');
            modal.render();
            $('body').append(modal.$el);
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

export default list;