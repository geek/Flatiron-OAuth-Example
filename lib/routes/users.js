var templates = require('../templates');

module.exports = function(router) {
	router.get('/users/', function () {
	  	this.res.html(templates.users.profile);
	});	
};