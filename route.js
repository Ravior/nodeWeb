/**
* 路由模块
**/

/***-------URL  start------------------------**/
var indexUrl=require("./indexUrl");

var startUrl=require("./startUrl");

var uploadUrl=require("./uploadUrl");

var handle={};

handle["/"]=indexUrl.index;

handle["/start"]=startUrl.start

handle["/upload"]=uploadUrl.upload;

/***-------URL  end------------------------**/


function route(pathname){
	console.log("About to route a request for"+pathname);
	if(typeof handle[pathname]==="function"){
		return handle[pathname]();
	}else{
		console.log("No request handler found for"+pathname);
		return "404 No found";
	}
}
exports.route=route;