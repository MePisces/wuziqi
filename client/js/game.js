// $(function(){
//     //初始化游戏
// newGame("15","15");
// //下棋
// pushChess("15","15");
// //接受输赢信息
// winChess("play1");
//     //初始化游戏
// function newGame(x,y){
//     $(function(){
//         var chesss=parseInt(x*y);
//         var chesssx=parseInt(x*50+x*2)+"px"
//         var chesssy=parseInt(y*50+y*2)+"px"
//         $("ul").css({"width":chesssx})
//         $("ul").css({"height":chesssy})
//         for(var i=0;i<chesss;i++){
//              $("ul").append("<li></li>");
//         }
//     })
// }
// //下棋
// var color=1;
// function pushChess(x,y,color){
//     $("ul").on("click","li",function(){
//             if($(this).html()==""){
//                     $(this).append("<span></span>");
//                 if(color){$("span").css({"background":"black"})}
//                     else{$("span").css({"background":"white"})}
//             }
//     })
// }                       
// //接受输赢信息
// function winChess(play1){
//     //alert(play1);
// }
// })

(function() {
    var boxSize = 50;
    var chessSize = 40;
    var dist = 20;

    function Game(cols, rows, container) {
        this.cols = cols;
        this.rows = rows;

        this.container = container;

        this._renderBoard();
        this._bind();
    };

    var handler = Game.prototype;

    handler._renderBoard = function() {
        var container = this.container;
        container.addClass('container');


        var boardWidth = boxSize * (this.cols - 1),
            boardHeight = boxSize * (this.rows - 1);

        container.css({
            "width": boardWidth,
            "height": boardHeight
        });
        for (var i = 0; i < (this.cols - 1) * (this.rows - 1); i++) {
            var div = $('<div/>').css({
                width: boxSize,
                height: boxSize
            });
            container.append(div);
        };

        container.css({
            position:'relative'
        });
        var mask = this._mask = $('<div/>').addClass('.container_mask');
        mask.css({
            width:this.container.css('width'),
            height:this.container.css('height'),
            position:'absolute',
            top:0,
            left:0,
            opacity:0.1
        });
        container.append(mask);
    };


    handler.pushChess = function(x, y, color) {
        var container = this.container;
        var div = container.find('div').eq(x + this.cols * y);
        var span = $('<span/>')
            .css({
                width: chessSize,
                height: chessSize
            })
            .css('background-color', !color ? 'black' : 'white')
            .css({
                "top": (boxSize * x - chessSize / 2) + "px",
                "left": (boxSize * y - chessSize / 2) + "px",
            });
        container.append(span);
    };

    handler._bind = function() {
        var self = this;
        // $('body').delegate('#game','click',function(ev) {
        // $('body').on('click','.container',function(ev) {
        this._mask.on('click',function(ev){
            ev.preventDefault();
            // if(ev.target!=this.container){
            // }
            var disX = ev.offsetX;
            var disY = ev.offsetY;
            // console.log(disX,disY,ev.target)
            
            var nextPosi = self._getNext({x:disX,y:disY},dist);
            if(nextPosi){
                console.log(nextPosi);
                self.reqPutChess(nextPosi);
            }
        });

    };

    handler.reqPutChess = function(){};

    handler.putChess = function() {};

    // 页面点击坐标 找到 逻辑坐标
    handler._getNext= function(posi,dist){
        var relaPosi = world_rela(posi);

        var list = [
            relaPosi,
            {x:relaPosi.x+1,y:relaPosi.y},
            {x:relaPosi.x,y:relaPosi.y+1},
            {x:relaPosi.x+1,y:relaPosi.y+1}
        ]; 

        var rst = list.find(function(n){
            var worldPosi = rela_world(n);
            // console.log({posi,relaPosi,worldPosi});
            if(Math.abs(worldPosi.x - posi.x)<dist &&Math.abs(worldPosi.y - posi.y)<dist){
                return relaPosi;
            }
            
        });

        return rst;

    }

    var rela_world = function(posi){
        var x = posi.x;
        var y = posi.y;
        return {x:x*boxSize,y:y*boxSize};
    };

    var world_rela = function(posi){
        var x = posi.x;
        var y = posi.y;
        return {x:Math.floor(x/boxSize),y:Math.floor(y/boxSize)};
    };

    this.Game = Game;
}).call(this);
//var socket=io();
//socket.on("message",function (data) {
//   var type=data.type;
//  switch(type){
//    case "startGame":
//  var row=data.row;
// var col=data.col;
//game(row,col)
//}
//socket.send(data);
//})