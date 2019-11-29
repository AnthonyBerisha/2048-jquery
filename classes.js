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
        $(".score").text("Score: " +this.currentScore);
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

    randomFreeCells() {
        let availableCells = [];
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grid[y][x] === 0)
                    availableCells.push([x, y]);
            }
        }
        return availableCells;
    }

    moveTile(vector, tile, GameManager) {
        // console.trace(tile);
        if (vector === 'ArrowLeft') {
            for (let cell = tile.x; cell >= 0; cell--) {
                if (this.grid[tile.y][cell].value === tile.value && 
                    this.grid[tile.y][cell] !== tile){ // If the next cube has the same value

                    this.grid[tile.y][cell].mergeWith(tile, GameManager);
                    this.grid[tile.y][tile.x] = 0;
                }
                else if (this.grid[tile.y][cell] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+cell+"-"+tile.y;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    $('.'+newPosition).removeClass("new-tile");
                    this.grid[tile.y][cell] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.x = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowRight') {
            for (let cell = tile.x; cell < 4; cell++) {
                if (this.grid[tile.y][cell].value === tile.value && 
                    this.grid[tile.y][cell] !== tile){

                    this.grid[tile.y][cell].mergeWith(tile, GameManager);
                    this.grid[tile.y][tile.x] = 0;
                }
                else if (this.grid[tile.y][cell] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+cell+"-"+tile.y;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    $('.'+newPosition).removeClass("new-tile");
                    this.grid[tile.y][cell] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.x = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowUp') {
            for (let cell = tile.y; cell >= 0; cell--) {
                if (this.grid[cell][tile.x].value === tile.value && 
                    this.grid[cell][tile.x] !== tile){ 

                    this.grid[cell][tile.x].mergeWith(tile, GameManager);
                    this.grid[tile.y][tile.x] = 0;
                }
                else if (this.grid[cell][tile.x] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+tile.x+"-"+cell;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    $('.'+newPosition).removeClass("new-tile");
                    this.grid[cell][tile.x] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.y = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        if (vector === 'ArrowDown') {
            for (let cell = tile.y; cell < 4; cell++) {
                if (this.grid[cell][tile.x].value === tile.value && 
                    this.grid[cell][tile.x] !== tile) {

                    this.grid[cell][tile.x].mergeWith(tile, GameManager);
                    this.grid[tile.y][tile.x] = 0;
                }
                else if (this.grid[cell][tile.x] === 0) {
                    let oldPosition = 'tile-position-'+tile.x+'-'+tile.y; 
                    let newPosition = "tile-position-"+tile.x+"-"+cell;
                    $('.'+oldPosition).addClass(newPosition);
                    $('.'+newPosition).removeClass(oldPosition);
                    $('.'+newPosition).removeClass("new-tile");
                    this.grid[cell][tile.x] = tile;
                    this.grid[tile.y][tile.x] = 0;
                    tile.y = cell;
                    tile.classPosition = newPosition;
                }
            }
        }
        
        
    }

    moveTiles(vector, GameManager) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grid[y][x] !== 0) {
                    this.moveTile(vector, this.grid[y][x], GameManager);
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
        let valArray =[ [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0]];
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grid[y][x] !== 0)
                    valArray[y][x] = this.grid[y][x].value; 
            }
        }
        console.log(valArray);
    }


}

class Tile {
    constructor(position, grid) {
        this.id += 1;
        this.x = position.x;
        this.y = position.y;
        this.value = this.initValue();
        this.classPosition = "tile-position-"+this.x+"-"+this.y; 
        $("<div class='tile " + this.classPosition +" new-tile " + "tile-"+this.value+"'>" 
          + this.value + "</div>").appendTo(".tile-container");
        grid.addTile(this);
    }

    initValue() {
        if ((Math.floor((Math.random() * 10) + 1) % 2) === 0) {
            return 2;
        }
        else {
            return 4;
        }
    }

    mergeWith (tile, GameManager) {
        console.log("Tile "+this.classPosition+ " merging with " + tile.classPosition);
        this.value += tile.value;
        $('.'+this.classPosition).addClass("tile-"+this.value);
        $('.'+this.classPosition).removeClass("tile-"+(this.value / 2));
        $('.'+this.classPosition).text(this.value);
        $('.'+tile.classPosition).remove();
        GameManager.setScore(GameManager.getScore() + this.value);
        console.log(GameManager.currentScore);
    }

    updateClass() {
    }

    getPosition() {
        return array[x => this.x, y => this.y];
    }

    getValue() {
        return this.value;
    }

}