(function($) {
	var gameManager = new GameManager();
	var grid = new Grid();	
	$.fn.startGame = function() {
		// Generate grid with 2 randomly positioned tiles
		var randomTile = new Tile({x: 2, y: 2}, grid);
		var randomTile = new Tile({x: 2, y: 3}, grid);
		// var randomTile = new Tile({x: 4, y: 2}, grid);
	};

	$.fn.createRandomTile = function(grid) {
		// Get all the available cells in the grid
		let availableCells = grid.randomFreeCells();
		console.log(availableCells);
		// Choose a random index in the free positions array
		let randomIndex = Math.floor((Math.random() * availableCells.length) + 1);
		console.log("Random number: ", randomIndex)
		let randomPosition = {x: availableCells[randomIndex][0], y: availableCells[randomIndex][1]};
		console.log("Random position: ", randomPosition);
		var newTile = new Tile(randomPosition, grid)

	}

	$.fn.moveTiles = function(vector) {
		grid.moveTiles(vector);
		jQuery().createRandomTile(grid);
	};

	$.fn.printGrid = function() {
		grid.printGrid();
	}


})(jQuery);



$(document).ready(function () {

	jQuery().startGame();
	// Game loop here
	$(".new-game").click(function () {
		gameManager.restartGame();
	});


	
	// Get player input and react according to it
	$(document).keyup(function (key) { 
		if (key.key === 'Control')
			jQuery().printGrid();
		else
			jQuery().moveTiles(key.key);
		// tile.moveTo({x: 1, y: 2});
	});

	// After each valid input randomly add tile on the available ones

	// console.log(initTile1.getValue());




});

function randomPosition() {
	let position = {x: 0, y: 0};
	position.x = Math.floor((Math.random() * 4) + 1);
	position.y = Math.floor((Math.random() * 4) + 1);
	return position;
}