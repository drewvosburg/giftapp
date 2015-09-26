function Config() {

    this.init();
    return this;
}

_.extend(Config.prototype, {

    SiteName: "wrappd",

    init: function() {
      
    }
});

var config = new Config();
export default config;