$(window).load(function(){
	var i=0, head=1, row=0, end=0, speed=500;
	var timer, gameOver, mode="pause";
	//mode: run, pause, gameOver
	var foodX=Math.floor((Math.random() * 15));
	var foodY=Math.floor((Math.random() * 15));
	var way="Right";
	
	$(document).ready(function(){
        $("#infoAreaOpen").hide();
		document.getElementById("score").innerHTML = "Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+end;
		document.getElementById("bestScore").innerHTML = "Best Score&nbsp;&nbsp;"+getCookie();
	});
	
	$('#btn_changeMode').click(function() {
        //Start
        if(mode=="gameOver"){ 
            $(".s").attr('class','');
            $("#0_0").attr('class','s 0');
		
            clearInterval(timer);
            timer=setInterval(function(){move();},speed);
		
            mode="run";
            $("#btn_changeMode").attr('value','PAUSE');
            end=0;
            head=1;
            row=0;
            way="Right";
            $("#"+foodX+"_"+foodY).attr('class','');
            food(1);
            document.getElementById("score").innerHTML = "Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+end;
        }
        //pause
        else if(mode=="run"){
            clearInterval(timer);
		
            mode="pause";
            $("#btn_changeMode").attr('value','RUN');
        }
		//run
        else if(mode=="pause"){
            timer=setInterval(function(){move();},speed);
		
            mode="run";
            $("#btn_changeMode").attr('value','PAUSE');
        }
	});
	$('#btn_restart').click(function() {
       if(mode=="gameOver"){
           
           $('#gameOverMask').attr("style", "visibility:hidden");
           $('#gameOverBtn').attr("style", "visibility:hidden");
            
           $('#btn_changeMode').click();
        }
	});
	$('#infoAreaClose').click(function() {
        $("#infoAreaClose").hide();
        $("#infoAreaOpen").show();
	});
	$('#infoAreaOpen').click(function() {
        $("#infoAreaOpen").hide();
        $("#infoAreaClose").show();
	});
	
	
	$('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 900
	});

	$('body').keydown(function(evt){
		if(mode=="run"){
            if(evt.keyCode==37){//Left
				if(way!="Right"){
					way="Left";
					move();
				}
			}
			if(evt.keyCode==38){//Up
				if(way!="Down"){
					way="Up";
					move();
				}
				return false;
			}
			if(evt.keyCode==39){//Right
				if(way!="Left"){
					way="Right";
					move();
				}
			}
			if(evt.keyCode==40){//Down
				if(way!="Up"){
					way="Down";
					move();
				}
				return false;
			}
		}
	});
	
	function move() {
		food(0);
		
		if(row==foodX&&head==foodY){
			food(1);
			end++;
			document.getElementById("score").innerHTML = "Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+end;
		}
		
		drow();
		speedUp();
	}
	
	function food(change){
		var check=false;
		if(change==1){
			while(check===false){
				foodX=Math.floor((Math.random() * 15));
				foodY=Math.floor((Math.random() * 15));
				
				var cl = $("#"+foodX+"_"+foodY).attr('class');
				
				if(cl.search('s')==-1){
					check=true;
				}
			}
		}    
		$("#"+foodX+"_"+foodY).attr('class','f');
	}
	
	function drow(){    
		$("."+end).attr('class','');
		
		for(i=end;i>=0;i--){
			$("."+i).attr('class','s '+(i+1));
		}
		
		//判斷Game Over
		var c = $("#"+row+"_"+head).attr('class');
		if(c.search('s')!=-1||mode=="gameOver"){
			clearInterval(timer);
			mode="gameOver";
            $("#btn_changeMode").attr('value','START');
            setCookie();
            document.getElementById("bestScore").innerHTML = "Best Score&nbsp;&nbsp;"+getCookie();
            $('#gameOverMask').attr("style", "");
            $('#gameOverMask').css("line-height", $(window).height()*0.7+"px");
            $('#gameOverBtn').attr("style", "");
		}
			
		$("#"+row+"_"+head).attr('class','s 0');
		
		if(way=="Right"){
			head++;
			if(head>14){
				head=0;
			}
		}
		if(way=="Left"){
            head--;
            if(head<0){
                head=14;
            }
		}
		if(way=="Down"){
            row++;
            if(row>14){
                row=0;
            }
		}
		if(way=="Up"){
            row--;
            if(row<0){
				row=14;
			}
		}
	}
	
    function speedUp(){
		if(end==5 && mode!="gameOver"){
			clearInterval(timer);
			speed=280;
			timer=setInterval(function(){move();},speed);
		}
		if(end==15 && mode!="gameOver"){
			clearInterval(timer);
			speed=150;
			timer=setInterval(function(){move();},speed);
		}
	}
	
	//cookie
	function setCookie(){
        var oldBestScore=getCookie();
        if(end>oldBestScore){
            document.cookie="bestScore="+end;
        }
	}
	function getCookie(){
        var cookie = document.cookie;
        if(cookie!==""){
            return cookie.replace("bestScore=","");
        }
        else{
            return "0";
        }
	}

});