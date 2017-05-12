window.addEventListener("keydown", controls, false);
window.addEventListener("touchstart", touchControl, false);

window.onload = function () {
	window.onresize();
}

window.onresize = function () {
	
	var game = Game.getInstance();

	w = container.clientWidth;
	h = container.clientHeight;
	c.width = w;
	c.height = h;
	
	game.blob.y = h -24 ;
	game.blob.orig_y = h -24 ;
	game.obsticles.forEach(function (o) {o.y=(h-128);});

	// needs to be hear to draw the initial block before the game starts
	game.drawInitialSprite();
}

function jumping() {
	// for the first time 
	if (gameStarted == 0) {
		game.newGame();
		gameStarted = 1;
	} else {
		document.getElementById('guide').src='';
		if (gameOver) {
			game = new Game();
			gameOver = false;
		} else {
	  
			game.blob.jumping = true;
			
			if (game.blob.onGround) {
				game.blob.velocityY = -18.0;
				game.blob.onGround = false;
			}
			
			if (game.blob.velocityY < -34.0) {
				game.blob.velocityY = -34.0;
			}
		}
	}
}

function controls(e) {
	if(e.keyCode == 38 || e.keyCode == 32) { // up key or spacebar
		jumping();
	}	  
}

function touchControl(e) {
	jumping();
}