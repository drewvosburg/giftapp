var nav = Backbone.View.extend({

    el: 'header',

    initialize: function() {
        return this.render();
    },

    events: {
        'click .item': 'navigate',
        'click .addBtn': function(){
        Backbone.trigger('nav:addButtonPressed');
        },
        'click .backBtn': 'goBack'
    },

    render: function() {
        var self = this;
        this.backHref = "";
        var template = JST['nav.hbs'];
        this.$el.html(template);
        this.links = this.$('.item');

        Backbone.on('title:update', function(title){
            if (title == "logo") {
                var sizeLogo = $('<div class="sizeLogo"></div>').append(self.$('.logo').html());
                self.$('#mobile-header').html(sizeLogo);
            } else {
            self.$('#mobile-header').text(title);
            }
        });

        Backbone.on('title:backButton', function(href){
            self.$('#left-btn').removeClass().addClass('backBtn');
            self.backHref = href;
        });
        Backbone.on('title:noLeftButton', function(){
            self.$('#left-btn').removeClass();
        });
        Backbone.on('title:addButton', function(){
            self.$('#right-btn').removeClass().addClass('addBtn');
        });
        Backbone.on('title:noRightButton', function(title){
            self.$('#right-btn').removeClass();
        });
        Backbone.on('nav:wish', function(){
            self.$('.give').removeClass('active');
            self.$('.shop').removeClass('active');
            self.$('.wish').addClass('active');
        });
        Backbone.on('nav:give', function(title){
            self.$('.wish').removeClass('active');
            self.$('.shop').removeClass('active');
            self.$('.give').addClass('active');
        });
        Backbone.on('nav:shop', function(title){
            self.$('.wish').removeClass('active');
            self.$('.give').removeClass('active');
            self.$('.shop').addClass('active');
        });
    },
    goBack: function() {
        var self = this;
        console.log(self.backHref);
        Backbone.history.navigate(self.backHref, {trigger: true});
    },
    navigate: function(e) {

        var link = $(e.currentTarget);
        var to = link.data('id');

        if (to) {
            this.links.removeClass('active');
            link.addClass('active');
            app.router.navigate(to, {trigger: true});
        }

    },

    update: function() {
        /*var fragment = Backbone.history.fragment,
            active = this.$el.find('.active'),
            attr = '[href="/' + fragment + '"]',
            link = this.$el.find(attr).parent();
        if (active) {
            active.removeClass('active');
        }
        link.addClass('active');*/
    }
});

export default nav;