var async = require('async'),
	http = require('http');

var postOptions = {
	  hostname: process.argv[2],
	  port: process.argv[3],
	  path: '/users/create',
	  method: 'POST'
	};
var getUrl = 'http://' + postOptions.hostname + ':' + postOptions.port;

async.series({
	postReq: function (okf) {
		function addUsr (id, cb) {
			var writeBody = JSON.stringify({'user_id':id});				
			var req = http.request(postOptions, function (res) {
				res.on('data', function (data) {});
				res.on('end', function () {
					cb();
				});
			});
			req.on('error', function (err) {
				if(err) throw err;
			});
			req.write(writeBody);
			req.end();	
		}
		async.times(5, function (id, cb) {
			addUsr(++id, function (err) {
				if (err) console.log(err);		
				okf(null, 'saved');						
			});
		}, function(err){
		      if (err) return okf(err);
		      okf(null, 'saved');
		});
		
	},
	getReq: function (cb) {
		http.get(getUrl + '/users', function (res) {
			var body = '';
			res.on('data', function (data) {
				body += data.toString();															
			});
			res.on('end', function () {
				cb(null,body);					
			});
		}).on('error', cb);
	}
}, function (err, result) {
	if (err) return console.log(err);
	if (result.getReq != undefined){
		console.log(result.getReq);			
	}		
});