window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport() {
	return !!document.createElement('testcanvas').getContext;
}

function canvasApp() {
	if(!canvasSupport) {
		return;
	} else {
		var theCanvas = document.getElementById("canvas");
		var context = theCanvas.getContext("2d");
	}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declearation
//
///////////////////////////////////////////////////////////////////////////////

	// Environmental constants
	const screenWidth = 800;
	const screenHeight = 480;

	// Game states
	const stateInitial = 0;
	const stateLoading = 1;
	const stateReset = 2;
	const stateTitle = 3;
	var state = stateInitial;

	// Loader variables
	var itemsToLoad = 1;
	var loadCount = 0;

	// Image resources
	var imgTile = new Image();

	// General variables
	var mouseX = 0;
	var mouseY = 0;

///////////////////////////////////////////////////////////////////////////////
//
// Event functions
//
///////////////////////////////////////////////////////////////////////////////

	function eventItemLoaded(e) {
		loadCount = loadCount + 1;
		if(loadCount == itemsToLoad) {
			state = stateReset;
		}
	}

	function eventMouseMove(e) {
		if(e.offsetX || e.offsetX == 0) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if(e.layerX || e.layerX == 0) {
			mouseX = e.layerX - theCanvas.offsetLeft;
			mouseY = e.layerY - theCanvas.offsetTop;
		}
	}
	
	function eventMouseClick(e) {
	}

///////////////////////////////////////////////////////////////////////////////
//
// Subroutines
//
///////////////////////////////////////////////////////////////////////////////

	// Main Loop
	function timerTick() {
		switch(state) {
		case stateInitial:
			init();
			break;
		case stateLoading:
			drawLoading();
			break;
		case stateReset:
			reset();
			break;
		case stateTitle:
			drawTitle();
			break;
		}
	}

	// Initializations
	function init() {
		// Setup mouse events
		theCanvas.addEventListener("mousemove", eventMouseMove, true);
		theCanvas.addEventListener("click", eventMouseClick, true);

		// Setup image loader events
		imgTile.src = "Tile.png";
		imgTile.onload = eventItemLoaded;

		// Switch to next state
		if(itemsToLoad != 0) {
			state = stateLoading;
		} else {
			state = stateReset;
		}
	}

	// Loading screen
	function drawLoading() {
		// Caculate loader
		var percentage = Math.round(loadCount / itemsToLoad * 100);

		// Clear Background
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, screenWidth, screenHeight);

		// Print percentage
		context.textBaseline = "bottom";	
		context.fillStyle = "#000000";
		context.font = "14px monospace";
		context.textAlign = "center";
		context.fillText(percentage + "%", screenWidth / 2, screenHeight / 2);
	}

	function reset() {
		state = stateTitle;
	}

	// Title screen
	function drawTitle() {
		// Clear Background
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, screenWidth, screenHeight);

		// Debug message
		context.textBaseline = "top";	
		context.fillStyle = "#000000";
		context.font = "14px monospace";
		context.textAlign = "right";
		context.fillText("so far so good!", screenWidth, 0);
	}

	const FPS = 30;
	var intervalTime = 1000 / FPS;
	setInterval(timerTick, intervalTime);
}

