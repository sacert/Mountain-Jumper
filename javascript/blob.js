function Blob() {
	
	this.orig_y = h - 24;
	
	this.x = 10;
	this.y = h -24 ;
	this.w = 32;
	this.h = 32;
	this.img = getSprite("assets/sprite.png");
	this.spriteX = 0;
	this.spriteY = 0;
	
	this.gravity = 0.95;
	this.onGround = true;
	this.velocityY = 0.0;
		
	this.timer = 0;
	this.change = 180;
	this.spriteNum = 1;
	
}

Blob.prototype.update = function () {
	
	this.timer++;
	
	// for changing sprite
	if (this.timer > 5) {
		if (this.spriteNum == 1) {
			this.spriteX = this.w * 0;
			this.spriteNum = 0;
		} else {
			this.spriteX = this.w * 1;
			this.spriteNum = 1;
		}
		this.timer = 0;	
	}
}

Blob.prototype.draw = function () {
	ctx.drawImage(this.img, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
}

Blob.prototype.checkCollision = function() {
	
	if (game.obsticles.length !=0 && game.obsticles[0].heightArray.length != 0) {
		var spriteOffset = 0;
		if (game.obsticles[0].spriteNum == 1) {
			spriteOffset = 16;
		}

		if (game.obsticles[0].x <= this.x+24-spriteOffset && this.y+23 > h - (game.obsticles[0].heightArray[Math.abs((this.x+24-spriteOffset) - game.obsticles[0].x)])
			|| game.obsticles[0].x <= this.x+8-spriteOffset && this.y+23 > h - (game.obsticles[0].heightArray[Math.abs((this.x+8-spriteOffset) - game.obsticles[0].x)]) ) {
			gameOver = true;
		}
		
	}
}