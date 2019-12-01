(function($) {

let grid = [ [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0]];

let score = 0;

$.fn.startGame = function() {
    // Generate the board and the two first tiles
    $().createRandomTile();
    $().createRandomTile();
    $().printGrid();
    $('.score-container').text('Score: '+score);
    // $('.score').text('0');
}

$.fn.createRandomTile = function() {
    $().createTile($().freeCell($().freeCells()));
}


/* Creates a tile div on the screen and adds its value 
 * to the corresponding cell in the grid array. */
$.fn.createTile = function(positionObject) {
    let tilePosition = 'tile-position-'+positionObject.x+'-'+positionObject.y;
    let initValue = jQuery().randomInitValue();
    $("<div class='tile " + tilePosition + " tile-"+initValue+"'>" 
        +initValue+"</div>").appendTo(".tile-container");
    $('.'+tilePosition).addClass('tile-new');
    grid[positionObject.y][positionObject.x] = {x: positionObject.x, y: positionObject.y, value: initValue};
}

$.fn.randomInitValue = function() {
    if ((Math.floor((Math.random() * 10) + 1) % 2) === 0)
        return 2;
    else
        return 4;
}

// Returns an array containing all the free cells
$.fn.freeCells = function() { 
    let freeCells = [];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (grid[y][x] === 0)
                freeCells.push([x, y]);
        }
    }
    return freeCells;
}

// Picks a random position in the freeCells array
$.fn.freeCell = function(freeCellsPositions) {
    let randomIndex = Math.floor((Math.random() * freeCellsPositions.length));
    let randomPosition = {x: freeCellsPositions[randomIndex][0], y: freeCellsPositions[randomIndex][1]};
    // console.log("Random number: ", randomIndex)
    return randomPosition;
}

$.fn.moveTiles = function(vector) {
    let currentGrid = grid;
    let canMove = false;
    switch (vector) {
        case 'ArrowLeft':
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (grid[y][x] !== 0 && grid[y][x].value !== 0)
                        canMove = $().moveTile(vector, grid[y][x]);
                }
            }
        break;
        case 'ArrowRight':
            for (let y = 0; y < 4; y++) {
                for (let x = 3; x >= 0; x--) {
                    if (grid[y][x] !== 0 && grid[y][x].value !== 0)
                        canMove = $().moveTile(vector, grid[y][x]);
                }
            }
        break;
        case 'ArrowUp':
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (grid[y][x] !== 0 && grid[y][x].value !== 0)
                        canMove = $().moveTile(vector, grid[y][x]);
                }
            }
        break;
        case 'ArrowDown':
            for (let y = 3; y >= 0; y--) {
                for (let x = 3; x >= 0; x--) {
                    if (grid[y][x] !== 0 && grid[y][x].value !== 0)
                        canMove = $().moveTile(vector, grid[y][x]);
                }
            }
        break;
    }
    if (canMove) {
        $().createRandomTile();
    }
}

$.fn.moveTile = function(vector, tile) {
    switch (vector) {
        case 'ArrowLeft':
            return $().moveTileLeft(tile);
            break;
        case 'ArrowRight':
            return $().moveTileRight(tile);
            break;
        case 'ArrowUp':
            return $().moveTileUp(tile);
            break;
        case 'ArrowDown':
            return $().moveTileDown(tile);
            break;
    }
}

$.fn.canMergeWith = function(oldTile, newTile) {
    if (typeof newTile !== 'object' || typeof oldTile !== 'object')
        return false;
    if ($('.tile-position-'+newTile.x+'-'+newTile.y).hasClass('tile-merged')) 
        return false;
    if (oldTile.value !== newTile.value)
        return false;
    // if (oldTile === newTile)
    //     return false;
    // if ($('.'+newTile.tilePosition).hasClass('tile-merged'))
    //     return false; 
    return true;
}

$.fn.mergeWith = function(tileMerging, newTile) {
    let tilePosition = 'tile-position-';
    let newValue = newTile.value + tileMerging.value;
    newTile.value = newValue;
    $().updateScore(newValue);
    $('.'+tilePosition+newTile.x+'-'+newTile.y).addClass("tile-"+ newValue);
    $('.'+tilePosition+newTile.x+'-'+newTile.y).addClass("tile-merged");
    $('.'+tilePosition+newTile.x+'-'+newTile.y).removeClass("tile-"+(newValue / 2));
    $('.'+tilePosition+newTile.x+'-'+newTile.y).text(newValue);
    $('.'+tilePosition+tileMerging.x+'-'+tileMerging.y).remove();
    $().addTile(newTile);
    $().removeTile(tileMerging);
}

// LEFT
$.fn.moveTileLeft = function(tile) {
    let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
    let moved = false;
    
    for (let targetCell = tile.x; targetCell >= 0; targetCell--) {
        if ($().canMergeWith(tile, grid[tile.y][tile.x - 1])) {
            $().mergeWith(tile, grid[tile.y][tile.x - 1]);
            moved = true;
            return moved;
        }
        else if (grid[tile.y][targetCell] === 0) {
            let newPosition = 'tile-position-'+targetCell+'-'+tile.y;
            $('.'+tilePosition).addClass(newPosition);
            $('.'+newPosition).removeClass(tilePosition);
            $('.'+newPosition).removeClass('tile-new');
            grid[tile.y][targetCell] = tile;
            $().removeTile(tile);
            tile.x = targetCell;
            moved = true;
        }
        
        tilePosition = 'tile-position-'+targetCell+'-'+tile.y;
    }
    return moved;
}

// RIGHT
$.fn.moveTileRight = function(tile) {
    let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
    let moved = false;
    for (let targetCell = tile.x; targetCell < 4; targetCell++) {
        if ($().canMergeWith(tile, grid[tile.y][tile.x + 1])) {
            $().mergeWith(tile, grid[tile.y][tile.x + 1]);
            moved = true;
            return moved;
        }
        else if (grid[tile.y][targetCell] === 0) {
            let newPosition = 'tile-position-'+targetCell+'-'+tile.y;
            $('.'+tilePosition).addClass(newPosition);
            $('.'+newPosition).removeClass(tilePosition);
            $('.'+newPosition).removeClass('tile-new');
            grid[tile.y][targetCell] = tile;
            $().removeTile(tile);
            tile.x = targetCell;
            moved = true;
        }
        tilePosition = 'tile-position-'+targetCell+'-'+tile.y;
    }
    return moved;
}

// UP
$.fn.moveTileUp = function(tile) {
    let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
    let moved = false;
    for (let targetCell = tile.y; targetCell >= 0; targetCell--) {
        if (tile.y > 0 && $().canMergeWith(tile, grid[tile.y - 1][tile.x])) {
            $().mergeWith(tile, grid[tile.y - 1][tile.x]);
            moved = true;
            return moved;
        }
        else if (grid[targetCell][tile.x] === 0) {
            let newPosition = 'tile-position-'+tile.x+'-'+targetCell;
            $('.'+tilePosition).addClass(newPosition);
            $('.'+newPosition).removeClass(tilePosition);
            $('.'+newPosition).removeClass('tile-new');
            grid[targetCell][tile.x] = tile;
            $().removeTile(tile);
            tile.y = targetCell;
            moved = true;
        }
        tilePosition = 'tile-position-'+tile.x+'-'+targetCell;
    }
    return moved;
}

// DOWN
$.fn.moveTileDown = function(tile) {
    let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
    let moved = false;
    for (let targetCell = tile.y; targetCell < 4; targetCell++) {
        if (tile.y < 3 && $().canMergeWith(tile, grid[tile.y + 1][tile.x])) {
            $().mergeWith(tile, grid[tile.y + 1][tile.x]);
            moved = true;
            return moved;
        }
        if (grid[targetCell][tile.x] === 0) {
            let newPosition = 'tile-position-'+tile.x+'-'+targetCell;
            $('.'+tilePosition).addClass(newPosition);
            $('.'+newPosition).removeClass(tilePosition);
            $('.'+newPosition).removeClass('tile-new');
            grid[targetCell][tile.x] = tile;
            $().removeTile(tile);
            tile.y = targetCell;
            moved = true;
        }
        tilePosition = 'tile-position-'+tile.x+'-'+targetCell;
    }
    return moved;
}

$.fn.addTile = function(tile) {
    grid[tile.y][tile.x] = tile;
}

$.fn.removeTile = function(tile) {
    grid[tile.y][tile.x] = 0;
}

$.fn.updateScore = function(newScore) {
    score += newScore;
    console.log(score);
    $('.score-container').text('Score: '+score);
}


$.fn.correctDirection = function(vector) {
    if (vector === 'ArrowLeft' ||
        vector === 'ArrowRight' ||
        vector === 'ArrowUp' ||
        vector === 'ArrowDown') {
        return true;
    }
    return false;
}




$.fn.printGrid = function() {
    let valArray =[ [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (grid[y][x] !== 0)
                valArray[y][x] = grid[y][x].value; 
        }
    }
    console.log(valArray);
    // console.log(grid);
}
})(jQuery);



// MAIN LOOP HERE
$(document).ready(function () {
    var moving = false;
    $().startGame();
    $(document).keyup(function (event) { 
        if (event.key === 'Control')
            $().printGrid();
        else if ($().correctDirection(event.key) && !moving) {
            console.log(event.key);
            moving = true;
            $('.tile').removeClass('tile-merged');
            $().moveTiles(event.key);
            moving = false;
        }
    });
    
});




// OLD STUFF DOWN THERE DON'T GO

// (function($) {
// 	var gameManager = new GameManager();
// 	var grid = new Grid();	
// 	$.fn.startGame = function() {
// 		// Generate grid with 2 randomly positioned tiles
// 		jQuery().createRandomTile(grid);
// 		jQuery().createRandomTile(grid);

// 		////////////////////////TEST HERE
// 		// var newTile = new Tile ({x: 0, y: 1}, grid);
// 		// var newTile2 = new Tile ({x: 1, y: 1}, grid);
// 		// var newTile3 = new Tile ({x: 2, y: 1}, grid);
// 		// var newTile4 = new Tile ({x: 3, y: 1}, grid);
// 		// newTile2;
// 		// newTile3;
// 		// newTile4;

// 		$(".score").text("Score: "+gameManager.currentScore);
// 	};

// 	$.fn.createRandomTile = function(grid) {
// 		// Get all the available cells in the grid
// 		let availableCells = grid.randomFreeCells();
// 		// console.log(availableCells);
// 		// Choose a random index in the free positions array
// 		let randomIndex = Math.floor((Math.random() * availableCells.length));
// 		// console.log("Random number: ", randomIndex)
// 		let randomPosition = {x: availableCells[randomIndex][0], y: availableCells[randomIndex][1]};
// 		// console.log("Random position: ", randomPosition);
// 		var newTile = new Tile(randomPosition, grid)
// 	}

// 	$.fn.moveTiles = function(vector) {
// 		let gr = grid.moveTiles(vector, gameManager);
// 		console.log(gr);
// 		jQuery().createRandomTile(grid);
// 	};

// 	$.fn.printGrid = function() {
// 		grid.printGrid();
// 	}


// })(jQuery);



// $(document).ready(function () {

// 	jQuery().startGame();
// 	// Game loop here
// 	$(".new-game").click(function () {
// 		gameManager.restartGame();
// 	});


	
// 	// Get player input and react according to it
// 	$(document).keyup(function (key) { 
// 		if (key.key === 'Control')
// 			jQuery().printGrid();
// 		else if (key.key === 'ArrowRight' ||
// 				 key.key === 'ArrowLeft' ||
// 				 key.key === 'ArrowUp' ||
// 				 key.key === 'ArrowDown'){
// 			jQuery().moveTiles(key.key);
// 			jQuery().printGrid();

// 		}
// 		// tile.moveTo({x: 1, y: 2});
// 	});

// 	// After each valid input randomly add tile on the available ones

// 	// console.log(initTile1.getValue());




// });

// function randomPosition() {
// 	let position = {x: 0, y: 0};
// 	position.x = Math.floor((Math.random() * 4) + 1);
// 	position.y = Math.floor((Math.random() * 4) + 1);
// 	return position;
// }