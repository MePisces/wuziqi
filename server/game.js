var COLOR = {
	BLACK:0,
	WHITE:1
};

function Game(cols,rows){
	this.cols = cols;
	this.rows = rows;

	this._map = {};

	this.winColor = undefined;
	this._startGame();
};


var handler = Game.prototype;

handler.putChess = function(x,y){
	this._setChess(x,y,this.currColor);

	this.winColor = this.check(); 
	if(!this.winColor){
		this._switchColor();
	}
};

handler.check = function(){
	
};

// private methods
handler._switchColor = function(){
	this.currColor = 1 - this.currColor;
};

handler._startGame = function () {
	this.currColor = COLOR.BLACK;
	
};

handler._setChess = function(x,y,color){
	this._map[[x,y].join('#')] = this.currColor;

};

handler._getChess = function(x,y){
	return this._map[[x,y].join('#')];
};


module.exports = Game;