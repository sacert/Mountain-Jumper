function Obsticle() {
	this.x = w;
	this.y = h - 128;
	this.speed = 10;
	
	this.w = 128;
	this.h = 128;
	this.img = getSprite("assets/tris.png");
	this.spriteX = 0;
	this.spriteY = 0;
	this.spriteNum = 0;
	this.heightArray = [];
}

Obsticle.prototype.draw = function () {
	ctx.drawImage(this.img, this.spriteX, this.spriteY, this.w, this.h, this.x, this.y, this.w, this.h);
}

Obsticle.prototype.getTriangleHeight = function() {
	
	if (this.spriteNum == 0) {
		for (var i = 2; i <= this.w; i+= 2) {
			this.heightArray.push(i);
		}
		
		for (var i = this.w; i >= 2; i-=2) {
			this.heightArray.push(i);
		}
	} else {
		this.heightArray.push(1);
		for (var i = 3; i <= (this.h-32); i+= 2) {
			this.heightArray.push(i);
		}
		
		for (var i = (this.h-32); i >= 2; i-=2) {
			this.heightArray.push(i);
		}
		this.heightArray.push(1);
	}
}