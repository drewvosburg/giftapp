import BaseView from './baseView';
import Item from './item';
import ClaimItem from './claimItem';
import ShareWebContainer from './shareWebContainer';
import EditItem from './editItem';
import DemoData from '../modules/data';

var sharedList = BaseView.extend({

    initialize: function(options) {
        this.users = DemoData.users();
        this.lists = DemoData.lists();
        this.items = DemoData.items();
        this.listId = options.listId;
        var self = this;
        self.selection = _.findWhere(self.lists, {'id': self.listId});
        var name = _.findWhere(self.users, {'id': self.selection.owner});
            if (name) {
                self.selection.name = name.name;
            }
        self.model = self.selection;
    },

    events: {
        "click .addBtn": "addItem",
        "click .edit.btn": "editItem",
        "click .listBtn": "showList",
        "click .sharedBtn": "showShareMobile",
        "click .shareBtnWeb": "showShareWeb",
        "click .claim.btn": "plsClaimItem"
    },

    render: function() {
        var self = this;
        var template = JST['sharedList.hbs'](self.model);
        self.$el.html(template);
        Backbone.trigger('title:update', self.selection.title);
        Backbone.trigger('title:backButton', 'give');
        Backbone.trigger('title:noRightButton');
        Backbone.trigger('nav:give');
        self.showList();
        return this;
    },
    showList: function () {
        var self = this;
        self.$('#list').empty();

        self.$('.sharedBtn').removeClass('selected');
        self.$('.listBtn').addClass('selected');
        var listItems = [];
        _.each(self.selection.items, function(select) {
            var model = _.findWhere(self.items, {'id': select});
            if (model) {
                model.claim = true;
                listItems.push(model)
            }
        });
        var card = new Item({
            'model': listItems
        });
        card.render();
        self.$('#list').append(card.$el);
    },
    plsClaimItem: function (e) {
        if ($('#modal').length == 0) {
            var self = this,
            item = $(e.target).parent().parent(),
            model = _.findWhere(self.items, {'id': item[0].id});
            model.name = self.model.name;
            var modal = new ClaimItem({
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

export default sharedList;