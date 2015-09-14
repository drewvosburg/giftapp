import Nav from './views/nav';
import Wish from './views/wish';
import List from './views/list';
import SharedList from './views/sharedList';
import Give from './views/give';
import Shop from './views/shop';
import ShopList from './views/shopList';
import Utils from './modules/utils';


var ApplicationRouter = Backbone.Router.extend({

    routes: {
    	'wish': 'wish',
        'list?:query': 'list',
        'shared-list?:query': 'sharedList',
        'give': 'give',
        'shop': 'shop',
        'shop-list?:query': 'shopList',
        '*actions': 'wish' // Backbone will try to match the route above first
    },

    initialize: function() {
        var self = this;

        this.nav = new Nav();

        Backbone.on('manager:goto', function(view) {
            self.nav.update();
            $('#modal').remove();
            $('main').scrollTop(0);
        });
    },

    wish: function() {

        var view = new Wish({
            tagName:'section',
            id: 'wish'
        });
        app.manager.goto(view);
    },
    give: function() {

        var view = new Give({
            tagName:'section',
            id: 'give'
        });
        app.manager.goto(view);
    },

    list: function(query) {
        var params = Utils.parseQueryString(query);
        var view = new List({
            tagName:'section',
            id: 'list',
            listId: params.l
        });
        app.manager.goto(view);
    },
    sharedList: function(query) {
        var params = Utils.parseQueryString(query);
        var view = new SharedList({
            tagName:'section',
            id: 'sharedList',
            listId: params.l
        });
        app.manager.goto(view);
    },
    shop: function() {
        var view = new Shop({
            tagName:'section',
            id: 'shop'
        });
        app.manager.goto(view);
    },
    shopList: function(query) {
        var params = Utils.parseQueryString(query);
        var view = new ShopList({
            tagName:'section',
            id: 'shopList',
            listId: params.l
        });
        app.manager.goto(view);
    },

});

export default ApplicationRouter;