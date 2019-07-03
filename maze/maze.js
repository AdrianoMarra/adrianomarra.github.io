let init = function () {

    $('#start').on('click', startGame)
    $('#end').on('click', endGame)
    let lost = false;
    let finish = false;

    function startGame() {
        resetGame();
        $(".boundary").on('mouseenter', function() { 
            if (!lost && !finish) {
                faill();
            }
        });
        
        $("#maze").on('mouseleave', function() {
            if (!lost && !finish) {
                faill();
            }
        });
    }

    function faill() {
        lost = true;
        $( ".boundary").addClass('youlose');
    }

    function endGame () {
        if (!lost) {
            alert('Congrats you win! :]');
            resetGame ();
        }
        else {
            alert('Sorry you lost! :[');
        } 
        finish = true;
    }

    function resetGame () {
        $( ".boundary").removeClass('youlose');
        finish = false;
        lost = false;
    }

}

$(document).ready(init);