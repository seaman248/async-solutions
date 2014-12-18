var http = require ('http');
var fs = require('fs');
var async = require('async');

var filePath = process.argv[2];


async.waterfall([
	function (fr) {
		fs.readFile(filePath, function (err, data) {
			if (err) return fr(err);
			fr(null, data);
		});
	},
	function (data, cb) {
		var body = '';
		http.get(data.toString().trimRight(), function (res) {
			res.on('data', function (resbody) {
				body += resbody.toString();					
			});
			res.on('end', function () {
				cb(null, body);
			});
			res.on('error', function(err){
				cb(err);
			});
		});

	}

],function (err, result) {
	if (err) console.error(err);
	console.log(result);		
});
