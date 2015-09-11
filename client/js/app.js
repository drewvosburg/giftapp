import Config from './modules/Config';
import Router from './router';
import Manager from './manager';

function App() {

    window.app = {

        init: function() {

            this.manager = new Manager();
            this.router = new Router();
            Backbone.history.start({
                pushState: true
            });
        }
    }

    $(function() {
        window.app.init();

        if (Backbone.history && Backbone.history._hasPushState) {

            $(document).delegate("a", "click", function(evt) {
                var href = $(this).attr("href");
                var protocol = "http";
                console.log(href);
                if (href.slice(0,protocol.length) !== protocol) {
                    evt.preventDefault();
                console.log(href);
                    Backbone.history.navigate(href, true);
                }
            });
        }
    });
}

export default App;