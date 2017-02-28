


var kBoardWidth = 9;
var kBoardHeight= 9;
var kPieceWidth = 10;
var kPieceHeight= 5;
var P0startPos;
var P1startPos;

var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;

var PiecesIsSelceted;
var playerColours = [0xff0000,0x0000ff];
var playerColoursSelected = [0xff8072,0x7280ff];

var curentPieceCell;
var WinnerWinnerChickenDinner;
var container, scene, renderer, mesh,projector,

    mouse = { x: 0, y: 0 },
    objects = [],
    Pieces = [],
    Pieces0 = [],
    Pieces1 = [],
    Squares = [],
    PiecesAndSquares = [],
	pickUpY = 20,
	putDownY = 5,
    count = 0,
	zoom=1,
	dirLight,
    CANVAS_WIDTH = 900,
    CANVAS_HEIGHT = 900;
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

// info
info = document.createElement( 'div' );
info.style.position = 'absolute';
info.style.top = '30px';
info.style.width = '900px';
info.style.textAlign = 'center';
info.style.color = '#f00';
info.style.display = 'none';
info.style.backgroundColor = '#eeeeee';
info.style.zIndex = '1';
info.style.fontFamily = 'Monospace';
info.innerHTML = 'INTERSECT Count: ' + count;
info.style.userSelect = "none";
info.style.webkitUserSelect = "none";
info.style.MozUserSelect = "none";
document.body.appendChild( info );
container = document.getElementById( 'Game_Canvas' );
document.body.appendChild( container );




renderer = new THREE.WebGLRenderer();
renderer.setSize( SCREEN_WIDTH,SCREEN_HEIGHT );
container.appendChild( renderer.domElement );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000 );

var playersTurn = 0;



//lightItUp(-30,100,-30);	

var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
//ambient.castShadow = true;	
scene.add( ambient );
//spotLightItUp(240,200,240,1,300,1.1);
//spotLightItUp(-160,200,-160,1,300,0.5);

lightItUp(240,100,240);	
lightItUp(240,100,-160);	
lightItUp(-160,100,240);	
lightItUp(-160,100,-160);	
//spotLightItUp(40,200,400);	
//spotLightItUp(40,200,-400);	
newGame();

renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;



function Cell(row, column) {
    this.row = row;
    this.column = column;
}

function newGame() {
    P0startPos = [
		new Cell(kBoardHeight - 3, 0),
	    new Cell(kBoardHeight - 2, 0),
	    new Cell(kBoardHeight - 1, 0),
	    new Cell(kBoardHeight - 3, 1),
	    new Cell(kBoardHeight - 2, 1),
	    new Cell(kBoardHeight - 1, 1),
	    new Cell(kBoardHeight - 3, 2),
	    new Cell(kBoardHeight - 2, 2),
	    new Cell(kBoardHeight - 1, 2)		
		];
    P1startPos = [
		new Cell(0,kBoardHeight - 3),
	    new Cell(0,kBoardHeight - 2),
	    new Cell(0,kBoardHeight - 1),
	    new Cell(1,kBoardHeight - 3),
	    new Cell(1,kBoardHeight - 2),
	    new Cell(1,kBoardHeight - 1),
	    new Cell(2,kBoardHeight - 3),
	    new Cell(2,kBoardHeight - 2),
	    new Cell(2,kBoardHeight - 1)
		];
	 	   
    gNumPieces = P0startPos.length + P1startPos.length  ;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
	
    DrawBoard()
	
}


	


	
function DrawBoard(){
	var size = 10;
	
	
	var materialBorder = new THREE.MeshPhongMaterial( { 
			map:   new THREE.TextureLoader().load('images/Textures/woodBorder.jpg'),
			specular: 0x111111,
			shininess: 0,
			bumpMap: new THREE.TextureLoader().load('images/Textures/woodOdd_NormalMap.png'),
		});
	var objectLoader = new THREE.ObjectLoader();
				objectLoader.load("Scripts/json/borderGeometry.json", function ( obj ) {
				obj.position.set(40,0,40);
				obj.castShadow = true;
				obj.receiveShadow = true;
				obj.material = materialBorder;
				
				scene.add( obj );
	});	
	//new THREE.TextureLoader().load( "textures/water.jpg" )
	var materialPole = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( 'images/maple-wood-planks-texture.jpg'), specular: 0x111111, shininess: 0  } );
	var materialFlag = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( 'images/maple-wood-planks-texture.jpg'), specular: 0x111111, shininess: 0  } );
	
	
	
	
	var materialMug = new THREE.MeshPhongMaterial( { /*map: THREE.ImageUtils.loadTexture('images/maple-wood-planks-texture.jpg')*/
		color:0x900404,
		metalness:1,
		specular: 0x111111,
		shininess: 0 
		});

	
	var pole = new THREE.Mesh(
    new THREE.CylinderGeometry( 1, 1, 30,30),materialPole);
	pole.position.x = -15;
	pole.position.y = 15;
	pole.position.z = 95;
	scene.add(pole);


	
	var objectLoader = new THREE.ObjectLoader();
				objectLoader.load("Scripts/json/mugModel.json", function ( obj ) {
				obj.position.set(-40 ,0	,80);
				obj.rotation.y = 180;
				obj.castShadow = true;
				obj.receiveShadow = true;
				obj.material = materialMug;
				obj.material.alphaMap =  new THREE.TextureLoader().load( 'images/emblem/moebius-triangle.png');
				obj.children[0].material = materialMug;
				obj.material.side = THREE.DoubleSide;
				scene.add(obj);
	});
	
	
	
	
	var wallpaperTx =  new THREE.TextureLoader().load( 'images/contemporaryTextured2.jpg' );
	wallpaperTx.wrapS = wallpaperTx.wrapT = wallpaperTx.RepeatWrapping;
	wallpaperTx.repeat.set(1200 / 20, 1000 / 20);
	
	var bmap =  new THREE.TextureLoader().load( 'images/contemporaryTextured2NormalMap.png' );
	bmap.wrapS = bmap.wrapT = bmap.RepeatWrapping;
	bmap.repeat.set(1200 / 20, 1000 / 20);
	
	
	var CarpetTx = new THREE.TextureLoader().load(  'images/DarkBlueCarpetTexture.jpg' );
	CarpetTx.wrapS = CarpetTx.wrapT = CarpetTx.RepeatWrapping;
	CarpetTx.repeat.set(200 / 10, 400 / 10);
	
   var materialWallpaper = [
		new THREE.MeshPhongMaterial( { 
			map: wallpaperTx,
			bumpMap    :  bmap,
			specular: 0x111111,
			shininess: 0 
		} ),
		new THREE.MeshPhongMaterial( { 
			map: wallpaperTx,
			bumpMap    :  bmap,
			specular: 0x111111,
			shininess: 0 
		} ),
		new THREE.MeshPhongMaterial( { 
			map: CarpetTx,
			specular: 0x111111,
			shininess: 0 
		} ),
		new THREE.MeshPhongMaterial( { 
			map: wallpaperTx,
			bumpMap    :  bmap,
			specular: 0x111111,
			shininess: 0 
		} ),
		new THREE.MeshPhongMaterial( { 
			map: wallpaperTx,
			bumpMap    :  bmap,
			specular: 0x111111,
			shininess: 0 
		} ),
		new THREE.MeshPhongMaterial( { 
			map: wallpaperTx,
			bumpMap    :  bmap,
			specular: 0x111111,
			shininess: 0 
		})
    ];//contemporaryTextured.jpg
	
	var MulitmaterialWallpaper = new THREE.MultiMaterial( materialWallpaper );	
		
	var Room = new THREE.Mesh(
		new THREE.BoxGeometry( -1200, -700, -1000),MulitmaterialWallpaper);
		Room.position.x = 40;
		Room.position.y = 200;
		Room.position.z = 40;
		Room.wireframe = true;

	scene.add(Room);


 
	
	
	

//tableTx.wrapS = tableTx.wrapT = THREE.RepeatWrapping;
//tableTx.repeat.set(50 / 10, 50 / 10);

var materialTable = new THREE.MeshPhongMaterial({
		map: new THREE.TextureLoader().load('images/Textures/Table.png' ),
		bumpMap: new THREE.TextureLoader().load('images/Textures/Table_NormalMap.png' ),
		specular: 0x111111,
		shininess: 0 
	});

	
var table = new THREE.Mesh(
    new THREE.CylinderGeometry( 120, 120, 10,30),materialTable);
	table.position.x = 40;
	table.position.y = -10;
	table.position.z = 40;
scene.add(table);

	







	var geometry = new THREE.BoxGeometry(size,10,size,0,0,0);


	var EvenMaterial = new THREE.LineDashedMaterial({
			metalness: 0,
			roughness: 0.5,
			color: 0xD18942,	
			shininess: 0, 
			shading: THREE.SmoothShading
		});
	var OddMaterial = new THREE.LineDashedMaterial({
			metalness: 0,
			roughness: 0.5,
			color: 0xFDCA9B,	
			shininess: 0, 
			shading: THREE.SmoothShading
		});

		
		
		
			
	var xy = 1;	
	for(var ix = 0;ix<kBoardWidth;ix++){
		for(var iz = 0;iz<kBoardHeight;iz++){	
			drawSquare(new Cell(ix, iz),isOdd(xy));
			xy++;
		}
	}
	
	for (var r = 0; r < P0startPos.length; r++) {
		drawPiece(P0startPos[r], r == gSelectedPieceIndex,0);
    }	
		
	for (var b = 0; b < P1startPos.length; b++) {
		drawPiece(P1startPos[b], b == gSelectedPieceIndex,1);
    }
 	
}




function drawSquare(p,isOdd){
	
	
	
//var materialOdd  = new THREE.MeshPhongMaterial( { map:   new THREE.TextureLoader().load('images/maple-wood-planks-texture.jpg'), specular: 0x111111, shininess: 0  } );
var materialOdd  = new THREE.MeshPhongMaterial( { 
			map:   new THREE.TextureLoader().load('images/Textures/woodOdd.jpg'),
			specular: 0x111111,
			bumpMap:   new THREE.TextureLoader().load('images/Textures/woodOdd_NormalMap.png'),
			shininess: 0 
		} );
		
var materialEven  = new THREE.MeshPhongMaterial( { 
			map:   new THREE.TextureLoader().load('images/Textures/woodEven.jpg'),
			bumpMap:   new THREE.TextureLoader().load('images/Textures/woodEven_NormalMap.png'),
			shininess: 0 
		} );
		
		
		if(isOdd==true){
			var column = p.column;
			var row = p.row;
					
			obj = new THREE.Mesh(
			new THREE.BoxGeometry( 10, 1, 10, 1, 1, 1 ),materialOdd);
			obj.position.set(0 +(row*10), 4.5, 0 +(column*10));

			Squares.push(obj);
			scene.add(obj);
			
			/*
			var objectLoader = new THREE.ObjectLoader();
			objectLoader.load("Scripts/json/SquareOdd.json", function ( obj ) {
			obj.position.set(0 +(row*10), 0, 0 +(column*10));
			scene.add( obj );
			Squares.push(obj);
		});*/
		
	}else{
		var column = p.column;
			var row = p.row;	
			
			obj = new THREE.Mesh(
			new THREE.BoxGeometry( 10, 1, 10, 1, 1, 1 ),materialEven);
			obj.position.set(0 +(row*10), 4.5, 0 +(column*10));

			Squares.push(obj);
			scene.add( obj );
			
	}
}



function drawPiece(p, selected,player){
	
	var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) ;
    var y = (row * kPieceWidth) ;
    var radius = (kPieceWidth / 2) - (kPieceWidth / 10);

	var objectLoader = new THREE.ObjectLoader();
				objectLoader.load("Scripts/json/Halma Piece.json", function ( obj ) {
				obj.position.set(x, 5, y);
				obj.castShadow = true;
				obj.receiveShadow = true;
				obj.rotation.y = 180;
				obj.material.color.setHex(playerColours[player]);
				scene.add( obj );
				Pieces.push(obj);
				if(player==0){
					Pieces0.push(obj);
				}

				if(player==1){
					Pieces1.push(obj);
				}

	});
	
}
	

function isOdd(num) { return num % 2;}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


document.addEventListener( 'mousedown', onDocumentMouseDown );

var prevSelect = null;

function onDocumentMouseDown( event ) { 
	if(gGameInProgress){ 

	var player = playersTurn;

	event.preventDefault();
	//console.log(Pieces);

	
	var raycaster =  new THREE.Raycaster(); 
											   
	mouse.x = ( event.clientX / renderer.domElement.clientWidth) * 2 - 1 ;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1 ;

	//console.log(mouse.x + ","+ mouse.y);

	
	
	raycaster.setFromCamera(mouse,camera);
	
	
	//intersectSquare
	
	
	
	var intersectPieces  = raycaster.intersectObjects(Pieces);//
	var intersectPieces0 = raycaster.intersectObjects(Pieces0);//
	var intersectPieces1 = raycaster.intersectObjects(Pieces1);//
	var intersectSquares = raycaster.intersectObjects(Squares);
	var intersectPlayersPieces;
	
	if(player === 0){
		intersectPlayersPieces = intersectPieces0;
	}else if(player === 1){
		intersectPlayersPieces = intersectPieces1;
	}
	
	var iee = false;	
	
	if(hasPlayerWon(0) == true){
		console.log("Player Won");
	}
	
	//console.log(intersects);
if (prevSelect !== null ){
	if(PiecesIsSelceted === true){
		//console.log(new Cell(intersectSquares[0].object.position.x,intersectSquares[0].object.position.z));
		//console.log(PiecesIsSelceted);canJump
		
		if(
			canJump(intersectSquares[0].object.position,prevSelect.object.position) == true || 
			hasPiece(intersectSquares[0].object.position.x,intersectSquares[0].object.position.z) == false &&
			(prevSelect.object.position.x+10) >= intersectSquares[0].object.position.x &&
			(prevSelect.object.position.z+10) >= intersectSquares[0].object.position.z &&
			(prevSelect.object.position.x-10) <= intersectSquares[0].object.position.x && 
			(prevSelect.object.position.z-10) <= intersectSquares[0].object.position.z &&
				gGameInProgress == true){
				
					prevSelect.object.position.x = intersectSquares[0].object.position.x;
					prevSelect.object.position.z = intersectSquares[0].object.position.z;
					if(isGameOver()){
						endGame();
					}else{
						if(player === 0){
							playersTurn =1;
						}else if(player === 1){
							playersTurn =0;
						}
					}
					
			}
	}
	
	
	
		//prevSelect.object.material.color.setHex(playerColours[player]);
		prevSelect.object.position.y = putDownY;
		}
	if ( intersectPlayersPieces.length > 0 ) {
		
		
		intersectPiece = intersectPlayersPieces[0];

		if (intersectPiece.object.position.y === pickUpY){

			if (prevSelect !== null ){
				prevSelect.object.position.y = putDownY;
				//prevSelect.object.material.color.setHex(playerColours[player]);
				PiecesIsSelceted = false;
			}
			
			//console.log("B " + intersectPiece.object.position.y);
		}else{
			if (prevSelect !== null ){
				prevSelect.object.position.y = putDownY;
				//prevSelect.object.material.color.setHex(playerColours[player]);
			PiecesIsSelceted = false;
			}
			
			intersectPiece.object.position.y = pickUpY;
			//intersectPiece.object.material.color.setHex(playerColoursSelected[player]);
			curentPieceCell = new Cell((intersectPiece.object.position.x / 10),(intersectPiece.object.position.z / 10));
			//console.log(curentPieceCell);
			PiecesIsSelceted = true;
			
			//console.log("A " + intersectPiece.object.position.y);

		}

		//objects.splice(objects.indexOf(intersectPiece.object), 1 );
		//scene.remove(intersectPiece.object);
		prevSelect = intersectPiece;
		//console.log("HIT " + intersectPiece.object.position.y);

	}else{
		PiecesIsSelceted = false;
	
	}
	
	}else{
		//endGame();			
	}
	
}

function hasPiece(x,z){
	"use strict";
	//console.log(Postion);
	
	var CellHasPieces = false;
	for(var i = 0; i < Pieces.length;i++){
		if(Pieces[i].position.z == z && Pieces[i].position.x == x ){
			//console.log(Pieces[i].position.z +" " + Pieces[i].position.x);
						CellHasPieces = true;
		}
	}
	return CellHasPieces;
}

function hasPiecePlayer(x,z,player){
	"use strict";
	//console.log(Postion);
	var PieceList;
	
		switch (player) {
		case 0:
			PieceList = Pieces0;
			break;
		case 1:
			PieceList = Pieces1;
			break;
	}
		
	var CellHasPieces = false;
	for(var i = 0; i < PieceList.length;i++){
		if(PieceList[i].position.z == z && PieceList[i].position.x == x ){
			//console.log(Pieces[i].position.z +" " + Pieces[i].position.x);
						CellHasPieces = true;
		}
	}
	return CellHasPieces;
}




function canJump(CellPostion,PiecePostion){
	"use strict";
	var CanJump = false;

	if(hasPiece(CellPostion.x,CellPostion.z) == false){

		if(	
			((PiecePostion.x+20) == CellPostion.x && (PiecePostion.z+20) == CellPostion.z && hasPiece(PiecePostion.x+10,PiecePostion.z+10) == true) || 
			((PiecePostion.x+20) == CellPostion.x && (PiecePostion.z-20) == CellPostion.z && hasPiece(PiecePostion.x+10,PiecePostion.z-10) == true) || 
			((PiecePostion.x-20) == CellPostion.x && (PiecePostion.z+20) == CellPostion.z && hasPiece(PiecePostion.x-10,PiecePostion.z+10) == true) || 	
			((PiecePostion.x-20) == CellPostion.x && (PiecePostion.z-20) == CellPostion.z && hasPiece(PiecePostion.x-10,PiecePostion.z-10) == true) || 	
			
			((PiecePostion.x+20) == CellPostion.x && (PiecePostion.z   ) == CellPostion.z && hasPiece(PiecePostion.x+10,PiecePostion.z   ) == true) || 	
			((PiecePostion.x-20) == CellPostion.x && (PiecePostion.z   ) == CellPostion.z && hasPiece(PiecePostion.x-10,PiecePostion.z   ) == true) || 			
			((PiecePostion.x   ) == CellPostion.x && (PiecePostion.z+20) == CellPostion.z && hasPiece(PiecePostion.x   ,PiecePostion.z+10) == true) || 	
			((PiecePostion.x   ) == CellPostion.x && (PiecePostion.z-20) == CellPostion.z && hasPiece(PiecePostion.x   ,PiecePostion.z-10) == true) 
		){		
			CanJump = true;
		}
	}
	return CanJump;
}
	
function lightItUp(x,y,z){
	"use strict";
	var light;
	var intensity = 1.5;
	var distance =500;
	var decay = 1.5;
	var sphere = new THREE.SphereGeometry( 0.25, 16, 50 );
	
	light = new THREE.PointLight( 0xffffff, intensity, distance, decay );
	//light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	
	
	light.castShadow = true;            // default false
	light.shadow.mapSize.width = 512;  // default
	light.shadow.mapSize.height = 512; // default
	light.shadow.camera.near = 0.5;       // default
	light.shadow.camera.far = 500;      // default
	light.shadowDarkness = 0.5;	
	
	light.position.x = x;
	light.position.y = y;
	light.position.z = z;
	
	scene.add(light);

	}
	
function spotLightItUp(x,y,z,i,d,dc){
	"use strict";
	var spotLight;
	var intensity = i;
	var distance = d;
	var decay = dc;
	var sphere = new THREE.SphereGeometry( 0.25, 16, 50 );
	
	spotLight = new THREE.SpotLight( 0xffffff, intensity, distance, decay );
	spotLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );

		
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	
	spotLight.shadow.camera.near = 50;
	spotLight.shadow.camera.far = 400;
	spotLight.shadow.camera.fov = 20;

	
	spotLight.castShadow = true;            // default false
	spotLight.shadow.mapSize.width = 512;  // default
	spotLight.shadow.mapSize.height = 512; // default
	spotLight.shadowDarkness = 0.5;	
	
	spotLight.position.x = x;
	spotLight.position.y = y;
	spotLight.position.z = z;
	
	spotLight.angle = 1.2;
	
	scene.add(spotLight);

	}
	

/*
    var x = (column * kPieceWidth) ;
    var y = (row * kPieceWidth) ;*/
	
function isGameOver(){
	if(hasPlayerWon(0)){
		WinnerWinnerChickenDinner = 0;
		$("#winMsg").text("Player 1 Wins");
		showPopUp();
		return true;
	}else if(hasPlayerWon(1)){
		WinnerWinnerChickenDinner = 1;
		$("#winMsg").text("Player 2 Wins");
		showPopUp();
		return true;
	}else{
		return false;	
	}
	
	
}
	
function hasPlayerWon(player) {
	
	var PieceList;
	
		switch (player) {
		case 0:
			PieceList = P1startPos;
			break;
		case 1:
			PieceList = P0startPos;
			break;
	}
			
	
	
    for (var i = 0; i < PieceList.length; i++) {
			var x = (PieceList[i].column * kPieceWidth);
			var y = (PieceList[i].row    * kPieceWidth);
						
		if(hasPiecePlayer(x,y,player) == false){
			return false;
		}		
    }
    return true;
}

/*	
		if(hasPiecePlayer(intersectSquares[0].object.position.x,intersectSquares[0].object.position.z,0) == true){
			console.log("TRUE");
		}*/
		
function endGame() {
    gGameInProgress = false;
}

function render() {
	

    renderer.render( scene, camera );

}

(function animate() {		

	requestAnimationFrame( animate );

    render();

})();

var message;

