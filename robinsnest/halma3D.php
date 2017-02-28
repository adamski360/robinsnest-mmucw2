<?php // Example 26-2: header.php
  session_start();

  echo "<!DOCTYPE html>\n<html><head>";

  require_once 'functions.php';

  $userstr = ' (Guest)';

  if (isset($_SESSION['user']))
  {
    $user     = $_SESSION['user'];
    $loggedin = TRUE;
    $userstr  = " ($user)";
  }else{
	$loggedin = FALSE;
  }



  if (!$loggedin) die();
?>



<meta charset="utf-8">
<title>Untitled Document</title>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


<style type="text/css">

body,#Game_Canvas {
	margin: 0;
	padding: 0;
	height:100vh;
	width:100vw;
	font-family: "Ariel", arial, sans-serif;

}
<img src="../image1.jpg" width="328" height="63" alt=""/>

.card {
  background: #fff;
  border-radius: 2px;
  background-color:white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.z-1 {
	  box-shadow: 0 14px 30px rgba(0,0,0,0.20), 0 10px 9px rgba(0,0,0,0.22);
}
.z-2 {
	  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

#loading{
	width:100vw;
	height:100vh;
	background-color:#831517;
	z-index:9000; 
}

.fab{
	width:46px;
	height:46px;
	position:fixed;
	bottom:40px;
	right:40px;
	line-height:46px;
	border-radius: 50%;
	
	transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.2s;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  	text-align: center;
	display:block;
	z-index:8000; 
  }
  
  #angle{
	bottom:200px;
  }  
    
  #zoomIn{
	bottom:120px;
  }  
  
  #zoomOut{
	bottom:40px;	
  }
 
 
.fab:active {
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
      transition-delay: 0s;
}

.fab i {
	  margin: auto;
	  display: inline-block;
	  vertical-align: middle;
	  color:white;
}

.fab > i::shadow path {
  fill: #fff;
}

.DeepOrange.C500{
    background-color: #FF5722;	
}

.point{
	cursor:pointer;
}

#emblem0{
	    background-image: url("images/Profile/<?php echo $_SESSION['user'] ?>.jpg");
}

.emblem{
	width:100px;
	height:100px;
	position:fixed;
	top:20px;
	left:20px;
	line-height:46px;
	border-radius: 50%;
	background-color:#FFFFFF;
	transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.2s;
  	text-align: center;
	display:block;
	z-index: 8000;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
 }
 
 #userName{
	width:00px;
	height:100px;
	position:fixed;
	top:20px;
	left:70px;
	background-color:#FFFFFF;
	z-index: 7999;
	text-indent:60px;
	border-radius: 0px 50px 50px 0px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
 }
 
#userName h1{
	display:none;
	padding:0;
	margin:0;
	line-height:100px;
}

 #userInfo{
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
	z-index: 7999;
 }
 
.unselcetable{
	-webkit-user-select: none; /* Chrome/Safari */        
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+ */
	
	/* Rules below not implemented in browsers yet */
	-o-user-select: none;
	user-select: none;
}

#blanket {
	background-color:#111;
	opacity: 0.68;
	position:fixed;
	z-index: 9001;
	top:0px;
	left:0px;
	width:100%;
	height:100%;
}

#popUpDiv {
    position:fixed;
    top: 50%;
    left: 50%;
    white-space: nowrap;
	opacity: 0;
	background:white;
	width:0;
    height:0;
    margin-top: -9em; /*set to a negative number 1/2 of your height*/
    margin-left: -15em; 
	border:5px solid #000;
	z-index: 9002;
	overflow:hidden;
}



</style>
</head>

<?php  // require_once 'header.php';?>
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://threejs.org/build/three.min.js"></script>

<script src="Scripts/dat.gui.min.js"></script>

<body onload="winnerPopup('popUpDiv')">

<!--<div id="loading"></div>-->

<div  id="Game_Canvas" width="100vw" height="100vw"></div>
    
        
<div id="angle"   class="fab unselcetable point DeepOrange C500"><i class="material-icons">switch_camera</i></div>
<div id="zoomIn"  class="fab unselcetable point DeepOrange C500"><i class="material-icons">zoom_in</i></div>
<div id="zoomOut" class="fab unselcetable point DeepOrange C500"><i class="material-icons">zoom_out</i></div>

<div id="userInfo">
  <div id="emblem0" class="emblem unselcetable"></div>
  <div id="userName" class=" unselcetable"> 
  	<h1><?php echo $user ?></h1>
  </div>
</div>

<div id="blanket" style="display:none"></div>
<div id="popUpDiv" style="display:none">
	<h1 id="winMsg"> Player 0 Wins</h1>
</div>

</body>

</html>
<script>
var view = "angle";
var c_pos = {x:40,y:100,z:110};
//var c_pos = {x:40,y:100,z:-20};
var c_pos45 = {x:110,y:100,z:110};
var zoom = 1;


var zoomIn = 0;
var camera;
var params = {
	rot:0,
	top:function(){
		camera.position.x = 40;
		camera.position.y = 150 *zoom;
		camera.position.z = 40;
		camera.lookAt(new THREE.Vector3(40,0,40));
		
		view = "top";
	},
	
	angle:function(){
		camera.position.x = c_pos.x *zoom;
		camera.position.y = c_pos.y *zoom;
		camera.position.z = c_pos.z *zoom;
		camera.lookAt(new THREE.Vector3(40,0,40));
		
		view = "angle";
	}
	
	

}

window.onload = function() {
/*  var gui = new dat.GUI();
  
    gui.add(params, 'top').name('Top View')
    gui.add(params, 'angle').name('Angled View')
    gui.add(c_pos, 'y', 0,100).step(10).name('Zoom').onFinishChange(function(){
		camera.position.x = c_pos.x *zoom;;
		camera.position.y = c_pos.y *zoom;
		camera.position.z = c_pos.z *zoom;
		camera.lookAt(new THREE.Vector3(40,0,40));
		view = "angle";
		
	

	});
	
	gui.add(params, 'rot', 0,360).step(10).name('Rotaion').onFinishChange(function(){


	//camera.position.x = 60 * Math.cos(params.rot );
	//camera.position.z = 60 * Math.sin(params.rot );
	//camera.lookAt(new THREE.Vector3(40,0,40));


	});*/
	
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		camera.position.x = 40;
		camera.position.y = 150 *zoom;
		camera.position.z = 40;
		camera.lookAt(new THREE.Vector3(40,0,40));
		view = "top";
}else{
		camera.position.x = c_pos.x *zoom;;
		camera.position.y = c_pos.y *zoom;
		camera.position.z = c_pos.z *zoom;
		camera.lookAt(new THREE.Vector3(40,0,40));
		view = "angle";
}
	

};


$("#angle").click(angle);
$("#zoomIn").click(ZoomIn);
$("#zoomOut").click(ZoomOut);

function angle(){ 
	if(view == "top"){
		camera.position.x = c_pos.x;
		camera.position.y = c_pos.y *zoom;
		camera.position.z = c_pos.z *zoom;
		camera.lookAt(new THREE.Vector3(40,0,40));	
		view = "angle";
	}else if(view == "angle"){
		camera.position.x = c_pos45.x *zoom;;
		camera.position.y = c_pos45.y *zoom;
		camera.position.z = c_pos45.z *zoom;
		camera.lookAt(new THREE.Vector3(40,0,40));	
		view = "angle45";
	}else if(view == "angle45"){
		camera.position.x = 40;
		camera.position.y = 150 *zoom;
		camera.position.z = 40;
		camera.lookAt(new THREE.Vector3(40,0,40));
		view = "top";
	}
}

var zoomIncrement = 0.1;
function ZoomIn(){
	
	if(zoom >= 0.5){
		zoom = zoom - zoomIncrement;
	
		if(view == "top"){
			camera.position.x = 40;
			camera.position.y = 150 *zoom;
			camera.position.z = 40;
			camera.lookAt(new THREE.Vector3(40,0,40));
		}else if(view == "angle"){
			camera.position.x = c_pos.x;
			camera.position.y = c_pos.y *zoom;
			camera.position.z = c_pos.z *zoom;
			camera.lookAt(new THREE.Vector3(40,0,40));
		}else if(view == "angle45"){
			camera.position.x = c_pos45.x *zoom;;
			camera.position.y = c_pos45.y *zoom;
			camera.position.z = c_pos45.z *zoom;
			camera.lookAt(new THREE.Vector3(40,0,40));
		}
	}
}
function ZoomOut(){
	
	if(zoom <= 1.8){
		zoom = zoom + zoomIncrement;
		
		if(view == "top"){
			camera.position.x = 40;
			camera.position.y = 150 *zoom;
			camera.position.z = 40;
			camera.lookAt(new THREE.Vector3(40,0,40));
		}else if(view == "angle"){
			camera.position.x = c_pos.x;
			camera.position.y = c_pos.y *zoom;
			camera.position.z = c_pos.z *zoom;
			camera.lookAt(new THREE.Vector3(40,0,40));	
		}else if(view == "angle45"){
			camera.position.x = c_pos45.x *zoom;;
			camera.position.y = c_pos45.y *zoom;
			camera.position.z = c_pos45.z *zoom;
			camera.lookAt(new THREE.Vector3(40,0,40));
		}
	}
}

function showPopUp() {
	$("#blanket").css("display", 'block');
	$("#popUpDiv").css("display", 'block');
	
	$("#popUpDiv").animate({
            height: '18em',
            width: '30em',
			overflow:'auto',
			opacity: '1'
        }, 500, 'swing');
	
}
	
function closePopUp() {
	$("#popUpDiv").animate({
            height: '0em',
            width: '0em',
			overflow:'hidden',
			opacity: '0'
			
        }, 500, 'swing');
	$("#blanket").css("display", 'none').delay(600);
}

$("#blanket").click(closePopUp);

var showInfo = false;

/*if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$("#userInfo").click(function(){
		if(showInfo){
			$("#userName").animate({
				width:300,
			},"fast");
			$("#userName *").fadeIn();				
		}else{
			$("#userName").animate({
				width:0,
			},"fast");
			$("#userName *").css("display", "none");
		}
	});
	
}else{*/

	$("#userInfo").hover(function(){
		$("#userName").animate({
			width:300,
		},"fast");
		$("#userName *").fadeIn();
	},function(){
		$("#userName").animate({
			width:0,
		},"fast");
		$("#userName *").css("display", "none");
	});
//}

</script>
<script src="Scripts/halma3D.js"></script>


