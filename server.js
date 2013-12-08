var http=require("http");
var url=require("url");
var route=require("./route").route;

function start(){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log("Request for"+pathname+"received");
		var result=route(pathname);
		response.writeHead(200,{"Content-type":"text/plain"});
		response.write(result);
		response.end();
	}
	http.createServer(onRequest).listen(8090);
	console.log("server is starting");
}
exports.start=start;