var Flappy_Fish = {
	WIDTH: 320,
	HEIGHT: 480,
	scale: 1,
	offset: {
		top: 0,
		left: 0,
		mobilePreset: 50
	},
	entities: [],
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	score: {
		taps: 0,
		coins: 0
	},
	distance: 0,
	digits:[],
	fonts:[],
	RATIO: null,
	game:null,
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	ua: null,
	android: null,
	ios: null,
	
	/** This function initializes the game
	*/
	init: function () {
		Flappy_Fish.RATIO = Flappy_Fish.WIDTH / Flappy_Fish.HEIGHT;
		Flappy_Fish.currentWidth = Flappy_Fish.WIDTH;
		Flappy_Fish.currentHeight = Flappy_Fish.HEIGHT;
		Flappy_Fish.canvas = document.getElementsByTagName('canvas')[0];
		Flappy_Fish.canvas.width = Flappy_Fish.WIDTH;
		Flappy_Fish.canvas.height = Flappy_Fish.HEIGHT;
		Flappy_Fish.ctx = Flappy_Fish.canvas.getContext('2d');
		Flappy_Fish.ua = navigator.userAgent.toLowerCase();
		Flappy_Fish.android = Flappy_Fish.ua.indexOf('android') > -1 ? true : false;
		Flappy_Fish.ios = (Flappy_Fish.ua.indexOf('iphone') > -1 || Flappy_Fish.ua.indexOf('ipad') > -1) ? true : false;
		window.addEventListener('click', function (e) {
			e.preventDefault();
			Flappy_Fish.Input.set(e);
		}, false);

		window.addEventListener('touchstart', function (e) {
			e.preventDefault();
			Flappy_Fish.Input.set(e.touches[0]);
		}, false);
		window.addEventListener('touchmove', function (e) {
			e.preventDefault();
		}, false);
		window.addEventListener('touchend', function (e) {
			e.preventDefault();
		}, false);
		Flappy_Fish.resize();
		Flappy_Fish.changeState("Splash");
		
		Flappy_Fish.loop();

	},

	/** This function maintains the aspect ratio of the game after resizing of the browser window and across multiple platforms
	*/
	resize: function () {

		Flappy_Fish.currentHeight = window.innerHeight;
		Flappy_Fish.currentWidth = Flappy_Fish.currentHeight * Flappy_Fish.RATIO;
		if (Flappy_Fish.android || Flappy_Fish.ios) {
			document.body.style.height = (window.innerHeight + Flappy_Fish.offset.mobilePreset) + 'px';
		}
		Flappy_Fish.canvas.style.width = Flappy_Fish.currentWidth + 'px';
		Flappy_Fish.canvas.style.height = Flappy_Fish.currentHeight + 'px';
		Flappy_Fish.scale = Flappy_Fish.currentWidth / Flappy_Fish.WIDTH;
		Flappy_Fish.offset.top = Flappy_Fish.canvas.offsetTop;
		Flappy_Fish.offset.left = Flappy_Fish.canvas.offsetLeft;
		window.setTimeout(function () {
			window.scrollTo(0, 1);
		}, 1);
	},
				

	/** This function will update the game and reset the tapped state of the game
	*/
	update: function () {
		Flappy_Fish.game.update();
		Flappy_Fish.Input.tapped = false;
	},

	/** This function draws all entities to the game screen
	*/
	render: function () {
		// cycle through all entities and render to canvas
		for (i = 0; i < Flappy_Fish.entities.length; i += 1) {
			Flappy_Fish.entities[i].render();
		}
			
		Flappy_Fish.game.render();
		
	},

	/** This function iterates the updating and rendering of the game
	*/
	loop: function () {

		requestAnimFrame(Flappy_Fish.loop);

		Flappy_Fish.update();
		Flappy_Fish.render();
	},
	/** This function changes the current state of the game
	* param {string} state - the state the game is to be changed to
	*/
	changeState: function(state) {                   
		Flappy_Fish.game = new window[state]();
		Flappy_Fish.game.init();
	}
};