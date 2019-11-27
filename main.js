$(document).ready(function () {

	var gameManager = new GameManager();
	// Generate grid with 2 randomly positioned tiles
	var grid = new Grid();
	// var initTile1 = new Tile(randomPosition(), grid);
	// var initTile2 = new Tile(randomPosition(), grid);
	var tile = new Tile({x: 3, y: 3}, grid);

	// Game loop here
	$(".new-game").click(function () {
		gameManager.restartGame();
	});


	
	// Get player input and react according to it
	$(document).keyup(function (key) { 
		if (key.key === 'Control')
			grid.printGrid();
		else
			grid.moveTiles(key.key);
		// tile.moveTo({x: 1, y: 2});
	});

	// After each valid input randomly add tile on the available ones

	// console.log(initTile1.getValue());




});


function newGame () {
}

function randomPosition() {
	let position = {x: 0, y: 0};
	position.x = Math.floor((Math.random() * 4) + 1);
	position.y = Math.floor((Math.random() * 4) + 1);
	return position;
}