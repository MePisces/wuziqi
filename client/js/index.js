/**
 * Created by hxsd on 2017/2/17.
 */
$(function(){
    var clientSocket = io(/*'ws://localhost:3000'*/);
    var arrName=[]

    var height=$(window).height()/2+"px";  //获取游览器高度的一半
    $("#top").css({height:height});
    $("#bottom").css({height:height,marginTop:height});
    $("#bg").css({height:$(window).height()+"px"});


    //点击进入登录操作
    $("button").on("click",function(){
        $("#top").animate({"marginTop":-$(window).height()/2},1000);

        $("#bottom").animate({"marginTop":$(window).height()},1000);
        $("#bg").css("display","block")

    });

    //自动进入登录操作
    setTimeout(function(){
        $("#top").animate({"marginTop":-$(window).height()/2},1000);

        $("#bottom").animate({"marginTop":$(window).height()},1000);
        $("#bg").css("display","block")
    },3000)
//           req:
//            url:'/login/play'
//            play:{
//                type:"enter"，
//	            name:string，
//                color:num
//            }
    //点击登录按钮 提交用户名信息给后台
    $(".go").on("click",function(){
        $(".tishi ").html(null);
        //获取用户名
        var name=$("#name").val();
        //判断用户名是否已经存在
        for(var i=0;i<arrName.length;i++){
            if (name==arrName[i]){
                $(".tishi ").html("用户名已存在");
            }else {
            }
        }
        arrName.push(name);
        //生成提交信息
        var play={
            type:"enter",
            name:name
        };
        if(validLogin(play)){
            $("#name").val(null);
           clientSocket.send(play);
           $(this).parent().attr({
               href:"game.html",
               target:"_blank"
           });
        }
        console.log(play)
    });
    //验证用户名是否为空
    function validLogin(play){
        if(!play.name){
            $(".tishi ").html("用户名不能为空");
            return false;

        }else{
        }
        return true;
    }

});