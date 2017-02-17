var Game = require('../game');

var testList = [];

// 1 
testList.push(function(){
	var game = new Game(10,10);
	game.putChess(0,0);
	game.putChess(1,0);
	game.putChess(0,1);
	game.putChess(1,1);
	game.putChess(0,2);
	game.putChess(1,2);
	game.putChess(0,3);
	game.putChess(1,3);

	var flag1 = game.winColor === undefined;

	game.putChess(0,4);

	var flag2 = game.winColor === 0;

	return flag1&& flag2;

});

// 2 横向
testList.push(function(){
	var game = new Game(10,10);
	game.putChess(0,0);
	game.putChess(1,0);

	game.putChess(1,0);
	game.putChess(1,1);

	game.putChess(2,0);
	game.putChess(1,3);

	game.putChess(3,0);
	game.putChess(1,4);

	game.putChess(4,0);

	return game.winColor;
});

// 3 纵向
testList.push(function(){
	var game = new Game(10,10);
	game.putChess(0,0);
	game.putChess(1,0);

	game.putChess(0,1);
	game.putChess(1,1);

	game.putChess(1,0);
	game.putChess(1,4);

	game.putChess(2,0);
	game.putChess(0,2);

	game.putChess(3,0);
	game.putChess(0,2);

	game.putChess(4,0);
	game.putChess(0,2);

	game.putChess(1,2);
	game.putChess(1,3);

	game.putChess(1,3);
	game.putChess(1,2);


	return game.winColor;
});

// 3 左上到右下
testList.push(function(){
	var game = new Game(10,10);
	game.putChess(0,0);
	game.putChess(1,0);

	game.putChess(0,1);
	game.putChess(1,1);

	game.putChess(1,1);
	game.putChess(1,4);

	game.putChess(2,2);
	game.putChess(0,2);

	game.putChess(3,3);
	game.putChess(0,2);

	game.putChess(4,4);
	game.putChess(0,2);

	game.putChess(1,2);
	game.putChess(1,3);

	game.putChess(5,5);


	return game.winColor;
});

// 3 右上到左下
testList.push(function(){
	var game = new Game(10,10);
	game.putChess(0,0);
	game.putChess(1,0);

	game.putChess(0,1);
	game.putChess(1,1);

	game.putChess(1,1);
	game.putChess(7,4);

	game.putChess(2,2);
	game.putChess(6,5);

	game.putChess(3,3);
	game.putChess(5,6);

	game.putChess(4,4);
	game.putChess(4,7);

	game.putChess(1,2);
	game.putChess(1,3);

	game.putChess(5,5);
	game.putChess(3,8);


	return game.winColor;
});

for (var i = 0; i < testList.length; i++) {
	console.log(testList[i]());
};