var flatiron = require('flatiron'),
    path = require('path'),
    connect = require('connect'),
    restful = require('restful'),
    app = flatiron.app,
    resources = require('./resources/'),
    routes = require('./routes');

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
app.use(flatiron.plugins.http, {
	before: [
		connect.static(path.join(__dirname, 'assets'), { maxAge: 86400000 })
	]
});
app.resources = resources;
routes(app.router);

app.use(restful, {
	engine: 'memory'
});

app.start(3000);