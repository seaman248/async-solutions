var async = require('async'),
	http = require('http');

var urls = [process.argv[2], process.argv[3]];

async.map(urls, function (item, cb) {
	http.get(item, function (res) {
		var body = '';
		res.on('data', function (data) {
			body += data.toString();
		});
		res.on('end', function () {
			return cb(null, body);
		});
	}).on('err', function (err) {
		if(err) console.log(err);			
	})
},function (err, result) {
	if(err) throw err;
	console.log(result);
});