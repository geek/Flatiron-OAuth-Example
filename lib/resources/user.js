var resourceful = require('resourceful');

module.exports = resourceful.define('user', function () {
  this.restful = true;

  this.string('name');
  this.timestamps();
});