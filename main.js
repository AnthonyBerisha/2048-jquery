$(document).ready(function () {
	// Generate grid with 2 randomly positioned tiles
	addFirstTiles();

	// Game loop here
	// Get player input and react according to it
	// After each valid input randomly add tile on the available ones






});


function addFirstTiles() {
	for (i = 0; i < 2; i++) {
		let x = Math.floor((Math.random() * 4) + 1);
		let y = Math.floor((Math.random() * 4) + 1);
		console.log("x = ", x);
		console.log("y = ", y);
		$("<div class='tile tile-position-"+x+"-"+y+"'></div>").appendTo(".tile-container");


	}



}