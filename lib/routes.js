var templates = require('./templates/index');

module.exports = function(router, nconf) {
	var routes  = nconf.get('routes');
	
	for(var prop in routes) {
		if (routes.hasOwnProperty(prop))
			setRoute(router, prop, routes[prop].template);
	}
};

function setRoute(router, routePath, templateName) {
	var templateNameParts = templateName.split('.');

	router.get(routePath, function() {
		var template = templates[templateNameParts[0]];
		if (templateNameParts.length > 1)
			template = template[templateNameParts[1]];
		
		this.res.html(template);
	});
}