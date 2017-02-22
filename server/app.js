var socketIO = require("socket.io");
var Game = require("./game");
var CONFIG = require("./gameCONFIG");
var express = require("express");
var http = require("http");
var _ = require('underscore');

var port = 3000;

var App = function() {
	this.userList = [];
	this.init();
	this.bind();
};


var handler = App.prototype;

handler.init = function() {
	// var app = express();
	var httpServer = http.createServer( /*app*/ );
	var io = this.io = socketIO.listen(httpServer);

	httpServer.listen(port, function() {
		console.log("服务器正运行在" + port + "端口...");
	});

};

// todo
handler.bind = function() {
	var self = this;
	var io = self.io;

	var dict = {};
	// enter
	dict['user.enter'] = function(so, data) {
		let username = data.username;
		if (!this._findUser(username)) {
			this._addUser(so.id,username);

			let us = this._findUserBySid(so.id);
			let color = us.color;
			username = us.username;
			io.send({
				type: 'user.join',
				username,
				color
			});
		}

		// 人数满足
		console.log(this.userList.length);
		if (this.userList.length == CONFIG.USER_COUNT) {
			this.startGame();
			var ga = this.ga;
			io.send({
				type: 'game.start',
				userList: this.userList,
				cols: ga.cols,
				rows: ga.rows
			});

			io.send({
				'type':'game.currColor',
				'color':ga.currColor
			});
		}
	};

	io.on("connect", function(so) {
		console.log(so.id);

		so.on('message', function(data) {
			console.log(data, new Date().toString());

			var type = data.type;
			dict[type] && dict[type].call(self, so, data);
		});

		so.on('disconnect', function() {
			console.log('_removeUserBySid',so.id);
			this._removeUserBySid(so.id);

			let us = this._findUserBySid(so.id);
			io.send({
				'type':'disconnect',
				'username':us.username
			});
		}.bind(self));
	});
};


handler.startGame = function() {
	var rows = CONFIG.rows,
		cols = CONFIG.cols;

	var ga = this.ga = new Game(rows, cols);
};

// private methods
// todo
handler._getColor = function() {
	return this.userList.length == 0 ? 1 : 0;
};

handler._addUser = function(sid, username) {
	color = this._getColor();
	this.userList.push({
		sid,
		username,
		color
	});
};

handler._findUser = function(username){
	return _.find(this.userList,us=>us.username == username);
};

handler._findUserBySid = function(sid){
	return _.find(this.userList,us=>us.sid == sid);
};

handler._removeUserBySid = function(sid){
	console.log(this.userList);
	this.userList = _.filter(this.userList,us=>us.sid!=sid);
	console.log(this.userList);
};

var app = new App();


module.exports = app;