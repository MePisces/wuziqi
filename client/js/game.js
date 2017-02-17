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

(function(){
    var boxSize = 50;
    var chessSize = 40;

    function Game(cols,rows,container){
        this.cols = cols;
        this.rows = rows;

        this.container = container;
    };

    var handler = Game.prototype;

    handler.renderBoard = function(){
        var container = this.container;
        container.addClass('container');


        var boardWidth = boxSize * (this.cols-1),
            boardHeight = boxSize * (this.rows-1);

        container.css({"width":boardWidth,"height":boardHeight});
        for(var i=0;i<(this.cols-1) * (this.rows-1);i++){
            var div = $('<div/>').css({width:boxSize,height:boxSize});
            container.append(div);
        };  
    };


    handler.pushChess = function(x,y,color){
        var container = this.container;
        var div = container.find('div').eq(x+this.cols*y);
        var span = $('<span/>')
            .css({
                width:chessSize,
                height:chessSize
            })
            .css('background-color',!color?'black':'white')
            .css({
                "top":(boxSize*x-chessSize/2)+"px",
                "left":(boxSize*y-chessSize/2)+"px",
            });
        container.append(span);
    };     
    this.Game = Game;
}).call(this);
