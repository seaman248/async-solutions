var http = require('http'),
	async = require('async');

var url1 = process.argv[2],
	url2 = process.argv[3];


async.series({
	requestOne: function (cb) {
		var body = '';
		http.get(url1.toString(), function (res) {
			res.on('data', function (resbody) {
				body += resbody.toString();					
			});
			res.on('end', function () {
				cb(null, body);
			});
		});
	},
	requestTwo: function (cb) {
		var body = '';
		http.get(url2.toString(), function (res) {
			res.on('data', function (resbody) {
				body += resbody.toString();					
			});
			res.on('end', function () {
				cb(null, body);
			});
		});
	}

}, function (err, result) {
	console.log(result);		
});
