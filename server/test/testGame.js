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




for (var i = 0; i < testList.length; i++) {
	console.log(testList[i]());
}