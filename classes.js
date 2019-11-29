class GameManager {
    constructor() {
        this.currentScore = 0;
        this.isGameWon = false;
        this.isGameLost = false;
    }

    getScore() {
        return this.currentScore;
    }

    setScore(newScore) {
        this.currentScore = newScore;
    }

    restartGame(){
        location.reload();
    }


}

class Grid {
    constructor() {
        this.grid = [ [0,0,0,0],
                      [0,0,0,0],
                      [0,0,0,0],
                      [0,0,0,0]]
    }

    randomFreeCell() {
        let availableCells;
        for (y = 0; y < 4; y++) {
            for (x = 0; x < 4; x++) {
                if (this.grid[y][x] === 0)
                    availableCells.push([y => y, x => x]);
            }
        }
        return availableCells;
    }

    newPosition(vector, tile) {
        
        // return _newPosition;
    }

    moveTile(vector, tile) {
        // console.trace(tile);
        if (vector === 'ArrowLeft') {
            for (let cell = tile.x; cell >= 0; cell--) {
                if (this.grid[tile.y][cell] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+cell+"-"+tile.y;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    this.grid[tile.y][cell] = tile;
                    this.grid[tile.y][cell + 1] = 0;
                    tile.x = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowRight') {
            for (let cell = tile.x; cell < 4; cell++) {
                if (this.grid[tile.y][cell] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+cell+"-"+tile.y;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    this.grid[tile.y][cell] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.x = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowUp') {
            for (let cell = tile.y; cell >= 0; cell--) {
                if (this.grid[cell][tile.x] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+tile.x+"-"+cell;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    this.grid[cell][tile.x] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.y = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowDown') {
            for (let cell = tile.y; cell < 4; cell++) {
                if (this.grid[cell][tile.x] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+tile.x+"-"+cell;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    this.grid[cell][tile.x] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.y = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        
        
    }

    moveTiles(vector) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grid[y][x] !== 0) {
                    this.moveTile(vector, this.grid[y][x]);
                }
            }
        }
    }

    addTile(tileObject){
        // console.log("tileObject.x = ",tileObject.x);
        // console.log("tileObject.y = ",tileObject.y);
        this.grid[tileObject.y][tileObject.x] = tileObject;
    }
    
    printGrid() {
        console.log(this.grid);
    }


}

class Tile {
    constructor(position, grid) {
        // .id += 1;
        this.x = position.x;
        this.y = position.y;
        this.value = this.initValue();
        this.classPosition = "tile-position-"+this.x+"-"+this.y; 
        $("<div class='tile new-tile " + this.classPosition +"'>" 
          + this.value + "</div>").appendTo(".tile-container");
        grid.addTile(this);
    }

    initValue() {
        if ((Math.floor((Math.random() * 10) + 1) % 2) === 0)
			    return 2;
		    else
			    return 4;
    }

    // mergeWith() {

    // }

    getPosition() {
        return array[x => this.x, y => this.y];
    }

    getValue() {
        return this.value;
    }

    moveTo(position) {
        // Add new position class
        $(".tile-position-" + this.x + "-" + this.y).addClass("tile-position-" + position.x + "-" + position.y);
        
        // then remove the old one
        $(".tile-position-" + position.x + "-" + position.y)
        .removeClass("tile-position-" + this.x + "-" + this.y);
        // Remove .new-tile class
        $(".tile-position-" + position.x + "-" + position.y)
        .removeClass("new-tile");
        this.x = position.x;
        this.y = position.y;
    }



}