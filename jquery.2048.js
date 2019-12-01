(function($) {

    let isGameOver = false;
    let isWin = false;
    var tileMoved = false;

    let grid = [ [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0]];
    
    let score = 0;
    
    $.fn.startGame = function() {
        // Generate the board and the two first tiles
        $().createRandomTile();
        $().createRandomTile();
        // $().printGrid();
        $('.score-container').text('Score: '+score);
    }
    
    $.fn.newGame = function() {
        $('.tile').remove();
        $('.victory-screen').hide();
        $('.game-over-screen').hide();

        grid = [ [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0]];
        $().updateScore(0);
        isGameOver = false;
        isWin = false;
        $().startGame();

    }
    
    $.fn.check2048 = function() {
        if ($('.tile').hasClass('tile-2048'))
            $().victory();
    }

    $.fn.victory = function() {
        isWin = true;
        $('.victory-screen').toggle();
        $('.victory-screen .victory-score').text('Your score: '+score);
    }

    $.fn.checkGameOver = function() {
        let freeCells = $().freeCells();
        if (freeCells.length === 0 && !$().canMove())
            $().gameOver();
    }

    $.fn.gameOver = function() {
        isGameOver = true;
        $('.game-over-screen').toggle();
        $('.game-over-screen .game-over-score').text('Your score: '+score);
    }


    $.fn.createRandomTile = function() {
        $().createTile($().freeCell($().freeCells()));
    }

    $.fn.canMove = function() {
        let availableMoves = 0;
        availableMoves += $().canMoveHorizontally();
        availableMoves += $().canMoveVertically();
        console.log(availableMoves);
        return availableMoves > 0 ? true : false; 
    }

    $.fn.canMoveHorizontally = function() {
        let horizontalMoves = 0;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 3; x++) {
                if (grid[y][x].value === grid[y][x + 1].value)
                    horizontalMoves++;
            }
        }
        console.trace('hor: ', horizontalMoves);
        return horizontalMoves;
    }
    $.fn.canMoveVertically = function() {
        let verticalMoves = 0;
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 3; y++) {
                if (grid[y][x].value === grid[y + 1][x].value)
                    verticalMoves++;
            }
        }
        console.trace('ver: ', verticalMoves);
        return verticalMoves;
    }
    
    $.fn.controls = function(event) {
        if (!isGameOver || !isWin) {
            if ($().correctDirection(event.key)) {
                $('.tile').removeClass('tile-merged');
                $().moveTiles(event.key);
                if (tileMoved) {
                    $().createRandomTile();
                    tileMoved = false;
                }
            }
            $().checkGameOver();
            $().check2048();
        }
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
    }
    
    $.fn.moveTile = function(vector, tile) {
        let moved = false;
        switch (vector) {
            case 'ArrowLeft':
                moved = $().moveTileLeft(tile);
                break;
            case 'ArrowRight':
                moved = $().moveTileRight(tile);
                break;
            case 'ArrowUp':
                moved = $().moveTileUp(tile);
                break;
            case 'ArrowDown':
                moved = $().moveTileDown(tile);
                break;
        }
        $('.tile-position-'+tile.x+'-'+tile.y).removeClass('tile-new');
        return moved;
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
        let newPosition;
        
        for (let targetCell = tile.x; targetCell >= 0; targetCell--) {
            if (tile.x > 0 && $().canMergeWith(tile, grid[tile.y][tile.x - 1])) {
                $().mergeWith(tile, grid[tile.y][tile.x - 1]);
                tileMoved = true;
            }
            else if (grid[tile.y][targetCell] === 0) {
                newPosition = 'tile-position-'+targetCell+'-'+tile.y;
                $('.'+tilePosition).addClass(newPosition);
                $('.'+newPosition).removeClass(tilePosition);
                grid[tile.y][targetCell] = tile;
                $().removeTile(tile);
                tile.x = targetCell;
                tileMoved = true;
            }
            
            tilePosition = 'tile-position-'+targetCell+'-'+tile.y;
        }
    }
    
    // RIGHT
    $.fn.moveTileRight = function(tile) {
        let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
        for (let targetCell = tile.x; targetCell < 4; targetCell++) {
            if (tile.x < 3 && $().canMergeWith(tile, grid[tile.y][tile.x + 1])) {
                $().mergeWith(tile, grid[tile.y][tile.x + 1]);
                tileMoved = true;
            }
            else if (grid[tile.y][targetCell] === 0) {
                let newPosition = 'tile-position-'+targetCell+'-'+tile.y;
                $('.'+tilePosition).addClass(newPosition);
                $('.'+newPosition).removeClass(tilePosition);
                grid[tile.y][targetCell] = tile;
                $().removeTile(tile);
                tile.x = targetCell;
                tileMoved = true;
            }
            tilePosition = 'tile-position-'+targetCell+'-'+tile.y;
        }
    }
    
    // UP
    $.fn.moveTileUp = function(tile) {
        let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
        for (let targetCell = tile.y; targetCell >= 0; targetCell--) {
            if (tile.y > 0 && $().canMergeWith(tile, grid[tile.y - 1][tile.x])) {
                $().mergeWith(tile, grid[tile.y - 1][tile.x]);
                tileMoved = true;
            }
            else if (grid[targetCell][tile.x] === 0) {
                let newPosition = 'tile-position-'+tile.x+'-'+targetCell;
                $('.'+tilePosition).addClass(newPosition);
                $('.'+newPosition).removeClass(tilePosition);
                grid[targetCell][tile.x] = tile;
                $().removeTile(tile);
                tile.y = targetCell;
                tileMoved = true;
            }
            tilePosition = 'tile-position-'+tile.x+'-'+targetCell;
        }
    }
    
    // DOWN
    $.fn.moveTileDown = function(tile) {
        let tilePosition = 'tile-position-'+tile.x+'-'+tile.y;
        for (let targetCell = tile.y; targetCell < 4; targetCell++) {
            if (tile.y < 3 && $().canMergeWith(tile, grid[tile.y + 1][tile.x])) {
                $().mergeWith(tile, grid[tile.y + 1][tile.x]);
                tileMoved = true;
            }
            if (grid[targetCell][tile.x] === 0) {
                let newPosition = 'tile-position-'+tile.x+'-'+targetCell;
                $('.'+tilePosition).addClass(newPosition);
                $('.'+newPosition).removeClass(tilePosition);
                grid[targetCell][tile.x] = tile;
                $().removeTile(tile);
                tile.y = targetCell;
                tileMoved = true;
            }
            tilePosition = 'tile-position-'+tile.x+'-'+targetCell;
        }
    }
    
    $.fn.addTile = function(tile) {
        grid[tile.y][tile.x] = tile;
    }
    
    $.fn.removeTile = function(tile) {
        grid[tile.y][tile.x] = 0;
    }
    
    $.fn.updateScore = function(newScore) {
        if (newScore === 0)
            score = 0;
        else
            score += newScore;
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
    }
})(jQuery);
    