(function () {
    'use strict';

    let count = 0;
    const blank = {
        x: '300',
        y: '300'
    }
    const init = function () {
        let i = 0;
        $('#puzzlearea>div').each(function () {
            let x = ((i % 4) * 100);
            let y = (Math.floor(i / 4) * 100);
            $(this).addClass("puzzlepiece");
            $(this).css({
                'left': x + 'px',
                'top': y + 'px',
                'background-image': 'url("background.jpg")',
                'background-position': -x + 'px ' + (-y) + 'px'
            })
            this.x = x;
            this.y = y;
            i++;
        });
    };

    const play = function () {
        $('#puzzlearea>div').mouseover(isValid);
        $('#puzzlearea>div').click(move);
        $('#shufflebutton').click(shuffle);
    }

    const shuffle = function () {

        if (count != 0) return false;
        let doShuffle;
        doShuffle = setInterval(function () {
            $('#shufflebutton').attr('disabled', true);
            $('#puzzlearea>div').each(function () {
                $(this).mouseover();
            });
            let piece = $('.movablepiece');
            let len = piece.length;
            let index = Math.floor(Math.random() * len);
            piece[index].click();
            count++;
            if (count > 100) {
                clearInterval(doShuffle);
                count = 0;
                $('#shufflebutton').attr('disabled', false);
            }
        }, 10);
    }

    const isValid = function (e) {
        e.target.valid = false;
        if (e.target.y == blank.y) {
            if (e.target.x + 100 == blank.x || e.target.x - 100 == blank.x)
                e.target.valid = true;
        } else if (e.target.x == blank.x) {
            if (e.target.y + 100 == blank.y || e.target.y - 100 == blank.y)
                e.target.valid = true;
        }
        e.target.valid ?
            $(e.target).addClass('movablepiece') :
            $(e.target).removeClass('movablepiece');
    }

    const move = function (e) {
        if (!e.target.valid) 
            return false;

        let { x, y } = blank;
        blank.x = e.target.x;
        blank.y = e.target.y;
        e.target.x = x;
        e.target.y = y;

        $(e.target).css({
            'left': x + 'px',
            'top': y + 'px'
        });
    }

    $(function () {
        init();
        play();
    })

})();