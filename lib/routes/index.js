var users = require('./users');

module.exports = function(router) {
	users(router);

	router.get('/', function () {
	  this.res.json({ 'hello': 'world' });
	});	
};