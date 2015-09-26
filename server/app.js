/// <reference path="typings/node/node.d.ts"/>
var pkg = require(__dirname + '/../package.json'),
    path = require('path'),
    express = require('express'),
    _ = require('underscore'),

    app = express();

var staticPath = __dirname.replace('/server', '/' + pkg.config.buildFolder);

app.use(express.static(staticPath));

app.get('*', function(request, response) {
    response.sendfile('./' + pkg.config.buildFolder + '/index.html');
});

var server = app.listen(80, function() {
	//(process.env.PORT || pkg.config.serverPort), function() {

    var port = server.address().port;

    console.log("%s serving from %s on port: %s", pkg.name, staticPath, port);
});

module.exports = app;