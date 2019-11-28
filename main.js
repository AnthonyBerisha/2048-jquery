(function($) {
	var gameManager = new GameManager();
	var grid = new Grid();	
	$.fn.startGame = function() {
		// Generate grid with 2 randomly positioned tiles
		var randomTile = new Tile({x: 3, y: 3}, grid);
		var randomTile = new Tile({x: 0, y: 3}, grid);
		// var randomTile = new Tile({x: 4, y: 2}, grid);
	};

	// $.fn.createTile(grid) {

	// }

	$.fn.moveTiles = function(vector) {
		grid.moveTiles(vector);
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