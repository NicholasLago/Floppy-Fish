
Flappy_Fish.Draw = {



	/** This function draws a rectangle with starting coordinates, width and height, and colour
	* {int} x - initial x coordinate
	* {int} y - initial y coordinate
	* {int} w - width of rectangle
	* {int} h - height of rectangle
	* {int} col - colour of rectangle
	*/
	rect: function (x, y, w, h, col) {
		Flappy_Fish.ctx.fillStyle = col;
		Flappy_Fish.ctx.fillRect(x, y, w, h);
	},

	/** This function draws a circle with starting coordinates, radius, and colour
	* param {int} x - initial x coordinate
	* param {int} y - initial y coordinate
	* param {int} r - radius of circle
	* param {int} col - colour of circle
	*/
	circle: function (x, y, r, col) {
		Flappy_Fish.ctx.fillStyle = col;
		Flappy_Fish.ctx.beginPath();
		Flappy_Fish.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
		Flappy_Fish.ctx.closePath();
		Flappy_Fish.ctx.fill();
	},
	
	/** This function draws an image
	* {string} img - image name
	* {int} x - initial x coordinate
	* {int} y - initial y coordinate
	*/
	Image:function(img,x,y){                
		Flappy_Fish.ctx.drawImage(img,x,y);
	},

	/** This function takes an instance of a character object and updates and draws its new instance
	* param {string} img - image name
	* param {int} srcX - initial character x coordinate
	* param {int} srcY - initial character y coordinate
	* param {int} srcW - initial character width
	* param {int} srcH - initial cahracter height
	* param {int} destX - final character x coordinate
	* param {int} destY - final character y coordinate
	* param {int} destW - final character width
	* param {int} destH - final character height
	* param {int} r - character object rotation
	*/
	Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
		Flappy_Fish.ctx.save();
		Flappy_Fish.ctx.translate(destX, destY);
		Flappy_Fish.ctx.rotate(r * (Math.PI / 180));
		Flappy_Fish.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
		Flappy_Fish.ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
		Flappy_Fish.ctx.restore();
	},
	
	/** This function draws text to the screen
	* param {string} string - text to be drawn
	* param {int} x - intial x coordinate
	* param {int} y - initial y coordinate
	* param {int} size - size of text
	* param {int} col - colour of text
	*/ 
	text: function (string, x, y, size, col) {
		Flappy_Fish.ctx.font = 'bold ' + size + 'px Monospace';
		Flappy_Fish.ctx.fillStyle = col;
		Flappy_Fish.ctx.fillText(string, x, y);
	}

};

Flappy_Fish.Input = {

	x: 0,
	y: 0,
	tapped: false,

	/** This function sets the coordinates of a tap on the screen
	* param {object} data - data acquired from the tap
	*/
	set: function (data) {
		this.x = (data.pageX - Flappy_Fish.offset.left) / Flappy_Fish.scale;
		this.y = (data.pageY - Flappy_Fish.offset.top) / Flappy_Fish.scale;
		this.tapped = true;

	}

};

/** This function sets the ground instance
* param {int} x - x coordinate
* param {int} y - y coordinate
* param {int} r - radius
*/
Flappy_Fish.BottomBar = function (x, y, r) {

	this.x = x;
	this.y = y
	this.r = r;
	this.vx = -1;
	this.bg = new Image();
	this.bg.src = 'images/bg.png';
	this.name = 'BottomBar';

	/** This function updates the coordinates
	*/
	this.update = function () {
		// update coordinates
		this.x += this.vx;
		if (this.x < (0 - this.r)) {
			this.respawn();
		}
	};

	/** This function draws the ground
	*/

	this.render = function () {

		Flappy_Fish.Draw.Image(this.bg,this.x,this.y);

	}



	/** This function initializes the instance
	*/
	this.respawn = function () {
		this.x = Flappy_Fish.WIDTH - 1;
	}
	this.Remove = function(){
		// no remove for this function
	}

}

/** This function sets a pipe instance
*/
Flappy_Fish.Pipe = function (x, w) {

	this.centerX = x;
	this.coin = true
	this.w = w;
	this.h = Flappy_Fish.HEIGHT - 150;
	this.vx = -1;
	this.type = 'pipe';


	/** This function updates the pipe's coordinates
	*/
	this.update = function () {
		// update coordinates
		this.centerX += this.vx;
		if (this.centerX == (0 - this.w)) {
			this.respawn();
		}

	};

	/** This function draws the pipee to the screen
	*/
	this.render = function () {

		var colourBlack = '#000000';
		var colourCyan = '#7bb5c1';
		var colourDarkCyan = '#5f7c82';

		if (this.coin) {
			Flappy_Fish.Draw.circle(this.centerX + this.w / 2 - 5, this.centerY - 5, 5, "Gold")
		}
		//black outline of top and bottom pipes, set to the size of the pipe object
		Flappy_Fish.Draw.rect(this.centerX, 0, this.w, this.centerY - 50, colourBlack);
		Flappy_Fish.Draw.rect(this.centerX, this.centerY + 50, this.w, this.h, colourBlack);
		//base colour of top and bottom pipes, offset to create a border of 3 pixel width
		Flappy_Fish.Draw.rect(this.centerX+3, 0, this.w - 6, this.centerY - 53, colourCyan);
		Flappy_Fish.Draw.rect(this.centerX+3, this.centerY + 53, this.w-6, this.h, colourCyan);
		//shade colour of top and bottom pipes, set partially create shadow effect
		Flappy_Fish.Draw.rect(this.centerX+3, 0, this.w - 33, this.centerY - 53, colourDarkCyan);
		Flappy_Fish.Draw.rect(this.centerX+3, this.centerY + 53, this.w-33, this.h, colourDarkCyan);
		//Flappy_Fish.Draw.rect(this.centerX, this.centerY - 60, this.w, this.centerY - 50, '#45565a');
		//Flappy_Fish.Draw.rect(this.centerX, this.centerY + 50, this.w, this.centerY +10, '#45565a');


		
		//Flappy_Fish.Draw.rect(this.centerX+45, 0, this.w, this.centerY - 50, '#000000');
	}

	/** This function initializes the pipe instance
	*/
	this.respawn = function () {
		this.centerY = this.randomIntFromInterval(70, 220);
		this.centerX = Flappy_Fish.WIDTH - this.w + Flappy_Fish.WIDTH/2;
		this.coin = true;
	}

	/** Ths function returns a random integer
	*/
	this.randomIntFromInterval = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	this.centerY = this.randomIntFromInterval(100, 190);

	this.Remove = function(){
		// no remove for this function
	}
}

/** This sets the playr character instance
*/
Flappy_Fish.fish = function () {

	this.img = new Image();
	this.img.src = 'images/fish.png';
	this.gravity = 0.25;
	this.width = 34;
	this.height = 24;
	this.ix = 0;
	this.iy = 0;
	this.fr = 0;
	this.vy = 180;
	this.vx = 70;
	this.velocity = 0;
	this.play = false;
	this.jump = -4.6;
	this.rotation = 0;
	this.type = 'fish';
	this.powerGravity = false;
	this.powerTime = 0;
	this.origGravity = this.gravity;
	this.gravBuffer = 0.2;
	this.origJump = this.jump;
	this.jumpBuffer = -3;
	
	/** This function updates the player character instance
	*/
	this.update = function () {
		if (this.fr++ > 5) {
			this.fr = 0;
			if (this.iy == this.height * 3) {
				this.iy = 0
			}
			this.iy += this.height;
		}
		if (this.play) {
			this.velocity += this.gravity;
			this.vy += this.velocity;
			if (this.vy <= 0) {
				this.vy = 0;
			}
			if (this.vy >= 370) {
				this.vy = 370;
			}
			this.rotation = Math.min((this.velocity / 10) * 90, 90);
		}
		if (Flappy_Fish.Input.tapped) {
			this.play = true;
			play_sound(soundJump);
			this.velocity = this.jump;
		}

		if (this.powerGravity == true){
			var d = new Date();
			var t = d.getTime();
			//window.alert(t);

			if (t - 4000 > powerTime){
				this.powerGravity = false
				if (this.gravity == this.origGravity - this.gravBuffer){
					this.gravity = this.gravity + this.gravBuffer;
				}
				if (this.jump == this.origJump - this.jumpBuffer){
					this.jump = this.jump + this.jumpBuffer;
				}
				
			}
			
		}
	};

	/** This function drasws the plauer character to the screen
	*/
	this.render = function () {

		Flappy_Fish.Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
	}
	this.Remove = function(){
		// no remove for this function
	}
	this.powerMode = function(){
		this.powerGravity = true;
		if (this.gravity == this.origGravity){
			
			this.gravity = this.gravity - this.gravBuffer;
			//window.alert(this.gravity);
		}
		if (this.jump == this.origJump){
			
			this.jump = this.jump - this.jumpBuffer;
			//window.alert(this.gravity);
		}
		var date = new Date();
		powerTime = date.getTime();

	}

}


Flappy_Fish.PowerUp = function (x){

	this.img = new Image();
	this.img.src = 'images/medals/powerupGravity.png';
	this.centerX = x;
	this.centerY = Flappy_Fish.HEIGHT - 200; // close to the roof, dangerous to grab
	this.width = 44;
	this.height = 44;
	this.h = this.height;
	this.vx = -1;
	this.type = 'powerup';



	this.update = function (){
		this.centerX += this.vx;
		if (this.centerX == (0 - this.width)) {
			this.respawn();
		}
	}

	this.render = function (){
		Flappy_Fish.Draw.Image(this.img, this.centerX, this.centerY);
	}

	this.respawn = function () {
		this.centerY = this.randomIntFromInterval(0,Flappy_Fish.HEIGHT); // random on screen
		this.centerX = Flappy_Fish.WIDTH;  // somewhere in front of you
	}

	/** Ths function returns a random integer
	*/
	this.randomIntFromInterval = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	this.Remove = function(){
		this.centerX = Flappy_Fish.WIDTH - this.width;
		this.centerY = -this.height; // off screen
	}


}

/** This function sets a particle instance
*/
Flappy_Fish.Particle = function (x, y, r, col, type) {

	this.x = x;
	this.y = y;
	this.r = r;
	this.col = col;
	this.type = type || 'circle';
	this.name = 'particle';

	// determines whether particle will
	// travel to the right of left
	// 50% chance of either happening
	this.dir = (Math.random() * 2 > 1) ? 1 : -1;

	// random values so particles do no
	// travel at the same speeds
	this.vx = ~~ (Math.random() * 4) * this.dir;
	this.vy = ~~ (Math.random() * 7);

	this.remove = false;

	/** This function updates the coordinates
	*/
	this.update = function () {

		// update coordinates
		this.x += this.vx;
		this.y -= this.vy;

		// increase velocity so particle
		// accelerates oFlappy_Fish screen
		this.vx *= 0.99;
		this.vy *= 0.99;

		// adding this negative amount to the
		// y velocity exerts an upward pull on
		// the particle, as if drawn to the
		// surface
		this.vy -= 0.35;

		// oFlappy_Fishscreen
		if (this.y > Flappy_Fish.HEIGHT) {
			this.remove = true;
		}

	};


	/** This function draws the particle to the screen
	*/
	this.render = function () {
		if (this.type === 'star') {
			Flappy_Fish.Draw.star(this.x, this.y, this.col);
		} else {
			Flappy_Fish.Draw.circle(this.x, this.y, this.r, this.col);
		}
	};

};

 // checks if two entities are touching
/** This function checks for entity collision
*/
Flappy_Fish.Collides = function (fish, pipe) {


	if(fish.vy >=370){                
		 
		 return true;
	}
	if (pipe.coin && fish.vx > pipe.centerX + pipe.w / 2 - 5) {
		pipe.coin = false;
		Flappy_Fish.score.coins += 1;
		Flappy_Fish.digits = Flappy_Fish.score.coins.toString().split('');
		play_sound(soundScore);
	}

	var bx1 = fish.vx - fish.width / 2;
	var by1 = fish.vy - fish.height / 2;
	var bx2 = fish.vx + fish.width / 2;
	var by2 = fish.vy + fish.height / 2;

	var upx1 = pipe.centerX;
	var upy1 = 0;
	var upx2 = pipe.centerX + pipe.w;
	var upy2 = pipe.centerY - 50;


	var lpx1 = pipe.centerX;
	var lpy1 = pipe.centerY + 50;
	var lpx2 = upx2;
	var lpy2 = pipe.h;

	var c1 = !(bx1 > upx2 ||
		bx2 < upx1 ||
		by1 > upy2 ||
		by2 < upy1)
	var c2 = !(bx1 > lpx2 ||
		bx2 < lpx1 ||
		by1 > lpy2 ||
		by2 < lpy1)

	return (c1 || c2)

};

Flappy_Fish.CollidesPowerUp = function (fish, powerup) {
	//window.alert(1);
	//window.alert(powerup.centerX);
	var collides = false;
	var bx1 = fish.vx - fish.width / 2; // fish left side
	var by1 = fish.vy - fish.height / 2; // fish bottom
	var bx2 = fish.vx + fish.width / 2; // fish right side
	var by2 = fish.vy + fish.height / 2; // fish top

	var p1 = powerup.centerX + powerup.width/2; // right side
	var p2 = powerup.centerY + powerup.height/2; // top
	var p3 = powerup.centerY - powerup.height/2; // bottom
	var p4 = powerup.centerX - powerup.width/2; // left side

	if ( 
		bx1 < p1 && bx1 > p4 // is the left corner inbetween the two corners of powerup
		|| bx2 < p1 && bx2 > p4
	) {	//window.alert('x');
		if ( 
		by1 < p2 && by1 > p3 
		|| by2 < p2 && by2 > p3
	) {
		//window.alert('x');
			play_sound(soundPowerup);
			collides = true;
			
		}
	}
	
	return collides;

};

/** This function sets title instance
*/
window.Splash = function(){
	
	this.banner = new Image();
	this.banner.src = "images/splash.png";
	
	/** This function initializes the game values and background entities
	*/
	this.init = function(){
		play_sound(soundSwoosh);
		Flappy_Fish.distance = 0;
		Flappy_Fish.entities = [];
		Flappy_Fish.score.taps = Flappy_Fish.score.coins = 0;
		//Add entities
		for (i = 0; i < 2; i += 1) {
			Flappy_Fish.entities.push(new Flappy_Fish.BottomBar(Flappy_Fish.WIDTH * i, 0, Flappy_Fish.WIDTH));
		}
	}
	
	/** This function updates the background entities
	*/
	this.update = function(){
		for (i = 0; i < Flappy_Fish.entities.length; i += 1) {
			Flappy_Fish.entities[i].update();                    
		}
		if (Flappy_Fish.Input.tapped) {
			Flappy_Fish.changeState('Play');
			Flappy_Fish.Input.tapped = false;
		}
	}
	
	/** This function draws the title to the screen
	*/
	this.render = function(){
		Flappy_Fish.Draw.Image(this.banner,66,100);
	}

}

/** This function sets the foreground entities
*/
window.Play = function(){
	
	/** This function initializes several pipe objects and the player character
	*/
	this.init = function(){         
		 
		
		Flappy_Fish.entities.push(new Flappy_Fish.Pipe(Flappy_Fish.WIDTH, 50));
		Flappy_Fish.entities.push(new Flappy_Fish.Pipe(Flappy_Fish.WIDTH + Flappy_Fish.WIDTH / 2, 50));
		Flappy_Fish.entities.push(new Flappy_Fish.Pipe(Flappy_Fish.WIDTH * 2, 50));
		Flappy_Fish.entities.push(new Flappy_Fish.PowerUp(Flappy_Fish.WIDTH - Flappy_Fish.WIDTH/2));
		Flappy_Fish.fish = new Flappy_Fish.fish();
		Flappy_Fish.entities.push(Flappy_Fish.fish);
		for(var n=0;n<10;n++){
			var img = new Image();
			img.src = "images/fonts/font_small_" + n +'.png';
			Flappy_Fish.fonts.push(img);
		}
		Flappy_Fish.digits = ["0"];
	}
	
	/** This function updates the all game entities and checks the input and game state
	*/
	this.update = function() { 


		var checkCollision = false; // we only need to check for a collision
		// if the user tapped on this game tick




		// if the user has tapped the screen
		if (Flappy_Fish.Input.tapped) {
			// keep track of taps; needed to 
			// calculate accuracy
			Flappy_Fish.score.taps += 1;

			// set tapped back to false           
			// in the next cycle

			checkCollision = true;
		}

		// cycle through all entities and update as necessary
		for (i = 0; i < Flappy_Fish.entities.length; i += 1) {
			Flappy_Fish.entities[i].update();
			try{
			if (Flappy_Fish.entities[i].type == 'pipe') {
				var hit = Flappy_Fish.Collides(Flappy_Fish.fish, Flappy_Fish.entities[i]);
				if (hit) {
					play_sound(soundHit);
					Flappy_Fish.changeState('GameOver');
					 break;
				}
			}
			if (Flappy_Fish.entities[i].type === 'powerup'){
				var powerup = Flappy_Fish.CollidesPowerUp(Flappy_Fish.fish, Flappy_Fish.entities[i]);
				if (powerup){
					//play_sound(soundHit);
					Flappy_Fish.entities[i].Remove();
					for (j = 0; j < Flappy_Fish.entities.length; j += 1){
						if (Flappy_Fish.entities[j].type === 'fish'){
							//window.alert('fish!');
							Flappy_Fish.entities[j].powerMode();
						}
					}
				}

				
			}
			}catch(err){
				// do nothing
			}
		}

	}
	
	/** This function draws the score to the screen
	*/
	this.render = function() { 
		//score             
		var X = (Flappy_Fish.WIDTH/2-(Flappy_Fish.digits.length*14)/2);               
		for(var i = 0; i < Flappy_Fish.digits.length; i++)
		{
		  Flappy_Fish.Draw.Image(Flappy_Fish.fonts[Number(Flappy_Fish.digits[i])],X+(i*14),10);
		}
	}

}

/** This function sets the game over functionalities
*/
window.GameOver = function(){
	
	/** This function determines the medal the player receives
	*/
	this.getMedal = function()
	{
	   var score = Flappy_Fish.score.coins;
	   	medal = "gold";
	
		return medal;
	}
	
	/** This function determines the highscore
	*/
	this.getHighScore = function(){
		var savedscore = getCookie("highscore");
		if(savedscore != ""){
			var hs = parseInt(savedscore) || 0;
			if(hs < Flappy_Fish.score.coins)
			{
			 hs = Flappy_Fish.score.coins
			 setCookie("highscore", hs, 999);
			}
			return hs;
		  }
		  else
		  {                  
			setCookie("highscore", Flappy_Fish.score.coins, 999);
			return  Flappy_Fish.score.coins;
		  }
	}
	
	/** This function initializes the score review screen
	*/
	this.init = function(){  
		
		var that = this;
		setTimeout(function() {
			play_sound(soundDie);
			that.banner = new Image();
			that.banner.src = "images/scoreboard.png";
			var m = that.getMedal();
			that.medal =  new Image();
			that.medal.src = 'images/medals/medal_gold.png';
			that.replay = new Image();
			that.replay.src = "images/replay.png";
			that.highscore = that.getHighScore() ;
		}, 500);
		
	}
	
	/** This function allows the a certain area to be tapped to replay the game
	*/
	this.update = function(){               
		if (Flappy_Fish.Input.tapped) {
			var x = Flappy_Fish.Input.x;
			var y = Flappy_Fish.Input.y;
			
			 if((x >= 102.5 && x <= 102.5+115) && (y >= 260 && y <= 260+70)){       
				Flappy_Fish.changeState('Splash');
			}
			Flappy_Fish.Input.tapped = false;
		}
		Flappy_Fish.fish.update();
	}

	this.render = function(){
		if(this.banner){
			Flappy_Fish.Draw.Image(this.banner,42,70);
			Flappy_Fish.Draw.Image(this.medal,75,183);
			Flappy_Fish.Draw.Image(this.replay,102.5,260);
			Flappy_Fish.Draw.text(Flappy_Fish.score.coins, 220, 185, 15, 'black');
			Flappy_Fish.Draw.text(this.highscore, 220, 225, 15, 'black');
		}
	}

}

window.addEventListener('load', Flappy_Fish.init, false);
window.addEventListener('resize', Flappy_Fish.resize, false);
