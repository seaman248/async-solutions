var http = require('http'),
	async = require('async');

var urls = [process.argv[2], process.argv[3]];

async.each(urls, function (item, cb) {
	http.get(item, function (res) {
		res.on('data', function (chunk) {
		});
		res.on('end', function () {
			cb(null);
		});
	}).on('error', function (err) {
			cb(err);
		}); 
}, function (err) {
	if (err) console.log(err);		
});