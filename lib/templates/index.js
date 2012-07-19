var	fs = require('fs'),
	S = require('string');

// From http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

(function() {
	walk(__dirname, constructResults);

	function readFileForTemplate(objectPath, filePath) {
		var parts = objectPath.split('/'),
	        currentPart = '',
	        parent = module.exports = module.exports || {};
	        
	    for(var i = 0, len = parts.length; i < len; i++) {
	        currentPart = parts[i];

	        if (i + 1 === len)
	        	parent[currentPart] = parent[currentPart] || '';
	        else
	        {
	        	parent[currentPart] = parent[currentPart] || {};
	        	parent = parent[currentPart];
	        }
	    }

	    fs.readFile(filePath, 'utf8', function(err, data) {
	    	if (err)
	    		throw err;

	    	parent[currentPart] += data;
	    });
	}

	function buildTemplatesObject(results) {
		for(var i = 0, len = results.length; i < len; i++) {
			readFileForTemplate(results[i].file, results[i].fullPath);
		}
	}

	function constructResults(err, files) {
		if (err)
			throw err;

		if (!files)
			return [];

		var results = [];
		
		for (var i = 0, len = files.length; i < len; i++) {
			var file = files[i],
				result = {};

			if (!S(file).endsWith('.html'))
				continue;

			result.fullPath = file;
			file = S(file).replaceAll(__dirname + '/', '').s;
			result.file = S(file).replaceAll('.html', '').s;

			results.push(result);
		}

		buildTemplatesObject(results);
	}
})();