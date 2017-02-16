/**
 * Created by hxsd on 2017/2/16.
 */

var data=[
    {
        "color":0,
        "pos":[
            {x:7,y:7},
            {x:1,y:1},
            {x:2,y:3},
            {x:1,y:4},
            {x:5,y:4},
            {x:2,y:4},
            {x:3,y:4},
            {x:4,y:4},
            {x:2,y:6}
        ]
    },
    {
        "color":1,
        "pos":[
            {x:1,y:1},
            {x:2,y:4}
        ]
    }
];

var row=10;
var col=10;

module.exports={
    boxSize:function(){
        return {
            row:row,
            col:col
        };
    },
    checkWin:function(data){
        if(wuzi(data[0].pos)){
            return data[0].color;
        }else if(wuzi(data[1].pos)){
            return data[1].color;
        };
        return false;
    }
};

wuzi(data[0].pos);

//五子相连
function wuzi(pos){
    var flag=false;
    var fisrtX;
    var fisrtY;
    if(pos.length==0){
        return false;
    };

    pos.sort(pos.sort(sortPos));
    fisrtX=pos[0].x;
    fisrtY=pos[0].y;
    for(var i=0;i<pos.length;i++){

    };
};

//排序
function sortPos(a,b){
    switch(true){
        case a.y<b.y:return -1;
        case a.y>b.y:return 1;
        case a.x<b.x:return -1;
        case a.x>b.x:return 1;
    };
};