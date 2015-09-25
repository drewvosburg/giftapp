import BaseView from './baseView';
import Item from './item';
import ClaimItem from './claimItem';
import UnclaimItem from './unclaimItem';
import ShareWebContainer from './shareWebContainer';
import EditItem from './editItem';
import DemoData from '../modules/data';

var sharedList = BaseView.extend({

    initialize: function(options) {
        this.users = DemoData.users();
        this.lists = DemoData.lists();
        this.items = DemoData.items();
        this.claimed = DemoData.claimed();
        this.listId = options.listId;
        this.userId = "0";
        this.active = true;
        var self = this;
        self.selection = _.findWhere(self.lists, {'id': self.listId});
        var name = _.findWhere(self.users, {'id': self.selection.owner});
            if (name) {
                self.selection.name = name.name;
            }
        self.model = self.selection;
        if (moment(self.selection.date) < moment()) {
            this.active = false;
        }
    },

    events: {
        "click .addBtn": "addItem",
        "click .edit.btn": "editItem",
        "click .listBtn": "showList",
        "click .sharedBtn": "showShareMobile",
        "click .shareBtnWeb": "showShareWeb",
        "click .claim.btn": "plsClaimItem",
        "click .unclaim.btn": "unclaimItem"
    },

    render: function() {
        var self = this;
        var template = JST['sharedList.hbs'](self.model);
        self.$el.html(template);
        Backbone.trigger('title:update', self.selection.title);
        Backbone.trigger('title:backButton', 'give');
        Backbone.trigger('title:noRightButton');
        Backbone.trigger('nav:give');
        var listItems = [];
        _.each(self.selection.items, function(select) {
            var model = _.findWhere(self.items, {'id': select});
            if (model) {
                model.claim = true;
                model.active = self.active;
                listItems.push(model)
            }
        });
        listItems = _.groupBy(listItems, 'claimed');
        console.log(listItems);
        var card = new Item({
            'model': listItems[false]
        });
        card.render();
        self.$('#list').append(card.$el);
        if (listItems[true]) {
            var claimedByMe = [];
            var claimedByOthers = [];
            _.each(listItems[true], function (item) {
                var itemClaim = _.findWhere(self.claimed, {'item': item.id});
                item.active = self.active;
                if (itemClaim.claimerId == self.userId) {
                    item.byMe = true;
                    claimedByMe.push(item);
                } else {
                    claimedByOthers.push(item);
                }
            });
            var cardTwo = new Item({
                'model': claimedByMe
            });
            console.log(claimedByMe, claimedByOthers)
            cardTwo.render();
            var claimed = $('<div><div class="col-xs-12"><h2>Already claimed</h2></div></div>');
            claimed.append(cardTwo.$el);
            self.$('#claimed').append(claimed);

            var cardThree = new Item({
                'model': claimedByOthers
            });
            cardThree.render();
            self.$('#claimed').append(cardThree.$el);
        }
        return this;
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
    unclaimItem: function (e) {
        if ($('#modal').length == 0) {
            var self = this,
            item = $(e.target).parent().parent(),
            model = _.findWhere(self.items, {'id': item[0].id});
            model.name = self.model.name;
            var modal = new UnclaimItem({
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