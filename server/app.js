var socketIO = require("socket.io");
var game = require("./game");
var config=require("./gameConfig");
var express = require("express");
var http = require("http");

var port =3000;

var App = function(){
	this.init();
	this.bind();
};


var handler = App.prototype;

handler.init = function(){
	// var app = express();
	var httpServer = http.createServer(/*app*/);
    var socketServer = this.socketServer = socketIO.listen(httpServer);

	httpServer.listen(port,function(){
	    console.log("服务器正运行在"+port+"端口...");
	});

};

handler.bind = function(){
	var socketServer = this.socketServer;
	 socketServer.on("connect", function (so) {
	 	console.log(so.id);
	 });
};

var app = new App();


module.exports = app;