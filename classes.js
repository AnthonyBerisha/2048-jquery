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

    freeCells() {

    }

    keyToVector(key) {
        switch (key) {
            case "ArrowLeft" :
                return 'left';
                break;
            case "ArrowRight" :
                return 'right';
                break;
            case "ArrowUp" :
                return 'up';
                break;
            case "ArrowDown" :
                return 'down';
                break;
        }
    }

    newPosition(vector, tile) {

        // return _newPosition;
    }

    moveTiles(vector, newPos) {

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grid[y][x] !== 0) {
                    this.grid[y][x].moveTo({x: 2, y: 4});
                    this.grid[newPos.x][newPos.y] = this.grid[y][x];
                    this.grid[y][x] = 0;
                }
            }

        }
    }

    addTile(tileObject){
        console.log("tileObject.x = ",tileObject.x);
        console.log("tileObject.y = ",tileObject.y);
        this.grid[tileObject.y - 1][tileObject.x - 1] = tileObject;
    }
    
    printGrid() {
        console.log(this.grid);
    }


}

class Tile {
    constructor(position, grid) {
        this.x = position.x;
        this.y = position.y;
        this.value = this.initValue();
        $("<div class='tile tile-position-"+this.x+"-"+this.y+"'>" 
          + this.value + "</div>").appendTo(".tile-container");
        grid.addTile(this);
    }

    initValue() {
        if ((Math.floor((Math.random() * 10) + 1) % 2) === 0)
			    return 2;
		    else
			    return 4;
    }

    getPosition() {
        return this.pos;
    }

    getValue() {
        return this.value;
    }

    moveTo(position) {
        // Add new position class
        $(".tile-position-" + this.x + "-" + this.y)
        .addClass("tile-position-" + position.x + "-" + position.y);
        
        // then remove the old one
        $(".tile-position-" + position.x + "-" + position.y)
        .removeClass("tile-position-" + this.x + "-" + this.y);
        this.x = position.x;
        this.y = position.y;
    }



}