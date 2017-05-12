function Cloud() {
	this.max = h*(2/5) + h/4;
	this.min = h*(2/5) - h/4;
	this.y = Math.floor(Math.random() * (this.max - this.min)) + this.min;
	this.x = w;
	
	this.w = 128;
	this.h = 128;
	this.img = getSprite("assets/cloud.png");
	this.spriteX = 0;
	this.spriteY = 0;
}

Cloud.prototype.draw = function () {
	ctx.drawImage(this.img, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w/2, this.h/2);
}