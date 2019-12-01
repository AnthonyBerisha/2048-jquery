$(document).ready(function () {
    $().startGame();
    $(document).keyup(function(event) {    
        $().controls(event);
        $().checkGameOver();
        $().check2048();
    });
    $('.new-game').click(function () { 
        $().newGame();        
    });
    $('.victory-new-game').click(function () {
        $().newGame();    
    });
    $('.game-over-new-game').click(function () {
        $().newGame();    
    });
});