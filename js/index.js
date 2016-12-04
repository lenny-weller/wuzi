$(function(){
	var canvas=$("#canvas").get(0);
	var ctx=canvas.getContext('2d');
	var sep=40;
	var sr=4;
	var R=15;
	var audio=$("#audio").get(0);
	var begin=$(".begin");
	var face=$(".face");
	var ju=$(".ju");
	var bl=$(".bl");
	var wh=$(".wh");
	var more=$(".more");
	var close=$(".close");
	var AI=false;
	var gamestate="pause";
	var empty={};
	var intel=$(".intel");
	var person=$(".person");
	var lose=$(".lose");
	
	
	begin.on("click",function(){
		face.css("display","none")
		face.css("background-color","rgba(0,0,0,0)")
	})
	ju.on("click",function(){
		menual();
	})
	intel.on("click",function(){
		intel.css("color","#eee");
		person.css("color","#9A5E18");
	})
	person.on("click",function(){
		person.css("color","#eee");
		intel.css("color","#9A5E18");
	})
	lose.on("click",function(){
		location.reload();
	})
	
	
	
	function cirle(x,y,r){
		ctx.save();
		ctx.beginPath();
		ctx.arc(lam(x),lam(y),r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	
	function lam(x){
		return (x+0.5)*sep+0.5;
	}
	
	function drawQipan(){
		ctx.save();
		ctx.beginPath();
		for(var i=0;i<15;i++){
			ctx.moveTo(20.5,20.5+i*sep);
			ctx.lineTo(580.5,20.5+i*sep);
			ctx.moveTo(20.5+i*sep,20.5);
			ctx.lineTo(20.5+i*sep,580.5);
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				empty[m(i,j)]=true;
			}
		}
		
		cirle(3,3,sr);
		cirle(11,3,sr);
		cirle(7,7,sr);
		cirle(3,11,sr);
		cirle(11,11,sr);
	}
	drawQipan();
	
//	var qizi=[];
	 var qizi={};
	function drawqizi(x,y,color){
		gamestate="play";
		ctx.save();
		ctx.translate(lam(x),lam(y))
		ctx.beginPath();
		ctx.arc(0,0,R,0,Math.PI*2);
		
	var g=ctx.createRadialGradient(-7,-7,0,0,0,20);
		if(color==="black"){
//			ctx.globalAlpha="0.9";
		    g.addColorStop(0.1,"#ccc");
		    g.addColorStop(0.3,"#000");
		    g.addColorStop(1,"#000");
		    
		}else{
			g.addColorStop(0.1,"#fff");
		    g.addColorStop(0.4,"#fff");
		    g.addColorStop(1,"#eee");
			
		}
		ctx.fillStyle=g;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
//		qizi.push({x:x,y:y,color:color});
		qizi[x+"_"+y]=color;
		delete empty[m(x,y)];
		gamestate="play";
	}
//	function have(x,y){
//		var flags=false;
//		$.each(qizi,function(i,v){
//			if(v.x===x&&v.y===y){
//				flags=true;
//			}
//		})
//		return flags;
//	}

	
	var flag=true;
	function handclick(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);
//		if(have(x,y)){
//			return;
//		}
		 if(qizi[x+"_"+y]){
	         return;
	     }
		 if(AI){
		 	audio.play();
		 	drawqizi(x,y,"black");
		 	if(check(x,y,"black")>=5){
		    	$("#canvas").off("click");
                bl.addClass("move");
                more.addClass("move1");
		    }
		 	var p=smart();
		 	drawqizi(p.x,p.y,"white");
		 	if(check(p.x,p.y,"white")>=5){
		    	$("#canvas").off("click");
                wh.addClass("move");
                more.addClass("move1");
		    }
		 	return false;
		 }	
		if(flag){
			if(check(x,y,"black")>=5){
		    	$("#canvas").off("click");
                bl.addClass("move");
                more.addClass("move1");
		    }
			
			drawqizi(x,y,"black");
			dv=0;
            dr=0;
            miaozhen2();
			clearInterval(s);
		    t=setInterval(miaozhen1,1000);
		}else{
			if(check(x,y,"white")>=5){
		    	$("#canvas").off("click");
                wh.addClass("move");
                more.addClass("move1");
		    }
			drawqizi(x,y,"white");
			dr=0;
            dv=0;
            miaozhen1();
			clearInterval(t);
		    s=setInterval(miaozhen2,1000);
		}
		audio.play();
		flag=!flag;
	}
	$("#canvas").on("click",handclick);
	
	//人机
	function smart(){
		var pos={};
		var max=-Infinity;
		for(var k in empty){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			if(check(x,y,"black")>max){
				max=check(x,y,"black");
				pos={x:x,y:y};
			}
		}
		var pos2={};
		var max2=-Infinity;
		for(var k in empty){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			if(check(x,y,"white")>max2){
				max2=check(x,y,"white")
				pos2={x:x,y:y}
			}
		}
		
//	return pos2
		if(max>max2){
			return pos;
		}else{
			return pos2;
		}
	}
	
//指针
    var biaoLeft=$("#biaoLeft").get(0);
    var cxt=biaoLeft.getContext('2d');
    var biaoRight=$("#biaoRight").get(0);
    var tcx=biaoRight.getContext('2d');
    var dv=0;
    function miaozhen1(){
    	biaoLeft.width=150;
    	biaoLeft.height=150;
		cxt.save();
		cxt.beginPath();
		cxt.arc(75,75,5,0,Math.PI*2);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
    	cxt.save();
    	cxt.translate(75,75);
		cxt.rotate(Math.PI/180*6*dv);
		cxt.beginPath();
		cxt.arc(0,0,10,0,Math.PI*2);
		cxt.moveTo(0,10);
		cxt.lineTo(0,20);
		cxt.moveTo(0,-10);
		cxt.lineTo(0,-60);
//      	ctx.lineTo(7.5*30,7.5*30);
		cxt.closePath();
//		cxt.lineWidth="3";
		cxt.strokeStyle="chocolate";
		cxt.stroke();
        cxt.restore();
        dv++;
        if(dv==360){
        	dv=0;
        }
    }
//  function reader1(){
//  	cxt.clearRect(0,0,150,150);
//  	cxt.save();
//  	cxt.translate(75,75);
//  	miaozhen1();
//  	cxt.restore()
//  }
    miaozhen1();
    var t;
    var dr=0;
     function miaozhen2(){
     	biaoRight.width=150;
    	biaoRight.height=150;
		tcx.save();
		tcx.beginPath();
		tcx.arc(75,75,5,0,Math.PI*2);
		tcx.closePath();
		tcx.stroke();
		tcx.restore();
		tcx.save();
        tcx.translate(75,75);
		tcx.rotate(Math.PI/180*6*dr)
		tcx.beginPath();
		tcx.arc(0,0,10,0,Math.PI*2);
		tcx.moveTo(0,10);
		tcx.lineTo(0,20);
		tcx.moveTo(0,-10);
		tcx.lineTo(0,-60);
//      	ctx.lineTo(7.5*30,7.5*30);
		tcx.closePath();
//		cxt.lineWidth="3";
		tcx.strokeStyle="chocolate";
		tcx.stroke();
        tcx.restore();
        dr++;
        if(dr==360){
        	dr=0;
        }
    }
//  function reader2(){
//  	tcx.clearRect(0,0,150,150);
//  	tcx.save();
//  	tcx.translate(75,75);
//  	miaozhen2();
//  	tcx.restore()
//  }
    miaozhen2();
    var s;
    //输赢判断
    function m(a,b){
    	return a+"_"+b;
    }
    function check(x,y,color){
    	var i=1;
    	row=1;
    	while(qizi[m(x+i,y)]===color){
    		row++;
    		i++;
    	}
    	while(qizi[m(x-i,y)]===color){
    		row++;
    		i++;
    	}
    	col=1
    	while(qizi[m(x,y+i)]===color){
    		col++;
    		i++;
    	}
    	while(qizi[m(x,y-i)]===color){
    		col++;
    		i++;
    	}
    	z=1
    	while(qizi[m(x+i,y+i)]===color){
    		z++;
    		i++;
    	}
    	while(qizi[m(x-i,y-i)]===color){
    		z++;
    		i++;
    	}
    	r=1
    	while(qizi[m(x-i,y+i)]===color){
    		r++;
    		i++;
    	}
    	while(qizi[m(x+i,y-i)]===color){
    		r++;
    		i++;
    	}
    	return Math.max(row,col,z,r);
    }
    //画棋谱
    function menual(){
    	ctx.save();
    	ctx.font="24px/1  微软雅黑";
    	ctx.textBaseline="middle";
    	ctx.textAlign="center";
    	var i=1;
    	for(var j in qizi){
    		var arr=j.split("_");
    		if(qizi[j]==="white"){
    			ctx.fillStyle="#000";
    		}else{
    			ctx.fillStyle="#fff";
    		}
    		ctx.fillText(i++,lam(parseInt(arr[0])),lam(parseInt(arr[1])));
    	}
    	ctx.restore();
    	$("<img>").attr("src",canvas.toDataURL()).appendTo(".box");
    	$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo(".box");
        $(".box").addClass("active");
    }
    //关闭棋谱
    close.on("click",function(){
    	$(".box").removeClass("active");
    	drawQipan();
    	for(var j in qizi){
    		var x=parseInt(j.split("_")[0]);
    		var y=parseInt(j.split("_")[1]);
    		drawqizi(x,y,qizi[j]);
    	}
    })
    //重新开始
    function again() {
		qizi={};
        flag=true;
        canvas.width=600;
        canvas.height=600;
//      handclick();
//      $("#canvas").off('click');
        $("#canvas").on('click',handclick);
        drawQipan();
        gamestate="false";
    }
    more.on("click",function(){
    	more.removeClass("move1");
    	$(".win").removeClass("move");
    	again();
    })
    $(".again").on("click",again);
    
    //模式切换
    intel.on("click",function(){
    	if(gamestate==="play"){
    		return
    	}
    	AI=true;
    })
    person.on("click",function(){
    	if(gamestate==="play"){
    		return
    	}
    	AI=false;
    })
    	
    

})
