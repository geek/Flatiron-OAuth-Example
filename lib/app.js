var flatiron = require('flatiron'),
    path = require('path'),
    restful = require('restful'),
    nconf = require('nconf'),
    app = flatiron.app,
    resources = require('./resources/'),
    routes = require('./routes');

nconf.env()
    .file({ file: path.join(__dirname, '..', 'config', 'config.json') });

app.use(flatiron.plugins.http, {
	before: []
});
app.resources = resources;
routes(app.router, nconf);

app.use(restful, {
	engine: 'memory'
});

app.start(3000);