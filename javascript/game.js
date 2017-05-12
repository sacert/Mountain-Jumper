var game;

var container = document.getElementById("container");
var c = document.getElementsByTagName('canvas')[0];
var ctx = c.getContext("2d");
var w = container.clientWidth;
var h = container.clientHeight;
var gameOver = false;
var FPS = 60;
var currScore = 0;
var hiScore = 0;
var gameStarted = 0;

var time;
var start;
var scoreTimer = 0;

function Game() {
	
	this.blob = new Blob(); 
	
	// sprite sheet
	this.blobSprite = [];

	// list of obsticles
	this.obsticles = [];

	// list of clouds
	this.clouds = [];
	
}

// returns an instant of the game
// if there isn't one, make one
Game.getInstance = function () {
	if (!Game._instance) { 
		Game._instance = new Game();
		game = Game._instance;
	}
	return Game._instance;
}

// draws the board and the moving shape
Game.prototype.draw = function () {

	// clear canvas 
	ctx.clearRect(0, 0, w, h);
	
	// if game is over, display game over screen
	if (gameOver) {
		ctx.font = '20px blocky'; 
		ctx.textAlign = 'center'; 

		ctx.fillText("Game Over", w/2, h/2); 
	}
		
	// go through all terrain particles and draw them
	this.obsticles.forEach(function (o) {o.draw();});
	this.clouds.forEach(function (cl) {cl.draw();});
	this.blob.draw();
	
}

Game.prototype.tick = function () {
	
	this.blob.checkCollision();
	if (gameOver) {
		// new high score
		if (hiScore < currScore) {
			hiScore = currScore;
			document.getElementById("score").innerHTML = "<font color=\"grey\">Hi " + game.pad(hiScore,6) + "</font> " + " " + game.pad(currScore,6);
		}
		currScore = 0;
		document.getElementById('guide').src='assets/guide.png';
	}
	
	if (!gameOver){
		
		// increment score 
		if (scoreTimer > 10) {
			currScore++;
			var newScore;
			if (hiScore > 0) {
				document.getElementById("score").innerHTML = "<font color=\"grey\">Hi " + game.pad(hiScore,6) + "</font> " + " " + game.pad(currScore,6);
			} else {
				document.getElementById("score").innerHTML = game.pad(currScore,6);
			}
			scoreTimer = 0;
		} 
		else {
			scoreTimer++;
		}
		
		var now = new Date().getTime();
		time = now - start;
		
		// update the particles
		this.blob.update();
		this.obsticles.forEach(function (o) {o.x-=(o.speed);});
		this.clouds.forEach(function (cl) {cl.x-=3;});
		
		if (this.obsticles.length > 0 && this.obsticles[0].x < -1*(this.obsticles[0].w)) {
			this.obsticles.shift();
		}
		
		if (this.clouds.length > 0 && this.clouds[0].x < (-1)*this.clouds[0].w) {
			this.clouds.shift();
		}
		
		if (Math.random() < 0.1) {
			
			// only place obsticles after a certain period after the last one was placed
			if (this.obsticles.length > 0) {
				if (this.obsticles[this.obsticles.length-1].x < (w - (this.obsticles[0].w *(3)))) {
					this.addObsticle();
				}
			} else {
				this.addObsticle();
			}
		}
		
		// make sure there are no more than 5 clouds on screen
		if (Math.random() < 0.1 && this.clouds.length < 5) {
			
			// if there is already a cloud on the screen, only display another cloud if it has past half way
			if (this.clouds.length > 0) {
				if (this.clouds[this.clouds.length-1].x < w*(3/5)) {
					var cl = new Cloud();
					this.clouds.push(cl);
				}
			} else {
				var cl = new Cloud();
				this.clouds.push(cl);
			}
		}
		
		// for jumping function 
		if (this.blob.jumping) {
			this.blob.spriteX = this.blob.w * 0;
			this.blob.velocityY += this.blob.gravity;
			this.blob.y += this.blob.velocityY;
			
			if (this.blob.y > this.blob.orig_y) {
				this.blob.y = this.blob.orig_y;
				this.blob.velocityY = 0.0;
				this.blob.onGround = true;
				this.blob.jumping = false;
			}
		}
		
		start = now;
	}
			
}

Game.prototype.addObsticle = function () {
	var ob = new Obsticle();
	ob.spriteNum = Math.floor(Math.random() * 3);
	if(ob.spriteNum != 2) {
		ob.spriteX = ob.spriteNum * ob.w;
		ob.getTriangleHeight();
		this.obsticles.push(ob);
	}
}

Game.prototype.drawInitialSprite = function () {
	var img = new Image();
	img.onload = function() {
			ctx.drawImage(game.blob.img, game.blob.spriteX, game.blob.spriteY, game.blob.w, game.blob.h, game.blob.x, game.blob.y, game.blob.w, game.blob.h);
	}
	img.src = "assets/sprite.png";
}

Game.prototype.pad = function (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

Game.prototype.newGame = function () {
	// set tick and draw to occur 
	setInterval( function() {
		game.tick();
		game.draw();
	}, 1000/FPS );
}
