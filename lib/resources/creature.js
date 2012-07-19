var resourceful = require('resourceful');

module.exports = resourceful.define('creature', function () {
  this.restful = true;

  this.string('diet');
  this.timestamps();
});