$(document).ready(function () {
    $().startGame();
    $(document).keyup(function(event) {    
        $().controls(event);
    });
    $('.new-game').click(function () { 
        $().newGame();        
    });
    $('.victory-new-game').click(function () {
        $('.victory-screen').toggle();
        $().newGame();    
    });
});