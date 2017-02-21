var socketIO = require("socket.io");
var game = require("./game");
var config=require("./gameConfig");
var express = require("express");
var http = require("http");

var App = function(){
	this.init();
};


var handler = App.prototype;

handler.init = function(){
	// var app = express();
	var httpServer = http.createServer(/*app*/);
    var socketServer = this.socketServer = socketIO.listen(httpServer);


	httpServer.listen(3000,function(){
	    console.log("服务器正运行在3000端口...");
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