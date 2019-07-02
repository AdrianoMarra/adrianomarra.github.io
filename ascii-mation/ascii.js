(function(){
    'use strict';
    const panel = document.querySelector('#panel');
    const start = document.querySelector('#start');
    const stop = document.querySelector('#stop');
    const animation = document.querySelector('#animation');
    const turbo = document.querySelector('#turbo');
    const size = document.querySelector('#size');
    const limiter = '=====\n'
    let frameTimer = 250;
    let interval;
    let animationFrames = [];
    let framesCount = 0;
    let started = false;
    const blankMsg = 'Please select an Animation!';
    
    const startAnimation = () => {
        if(!started){
            started = true;
        }

        interval = setInterval(() => {
            panel.value = animationFrames[framesCount];
            framesCount == animationFrames.length - 1 ? framesCount = 0 : framesCount++;
        }, frameTimer);
    };
    const stopAnimation = () => {
        clearInterval(interval);
        start.disabled = false;
        stop.disabled = true;
        started = false;
        panel.value = animationFrames[0];
    }

    start.onclick = () => {
        if(animation.value == 'blank') {
            panel.value = blankMsg;
            return;
        }
        start.disabled = true;
        stop.disabled = false;
        startAnimation();
    }
    stop.onclick = () => {
        stopAnimation();
    }
    animation.onchange = function() {
        framesCount = 0;
        if(this.value == 'custom') stopAnimation();
        animationFrames = ANIMATIONS[animation.value].split(limiter);
        panel.value = animationFrames[0];
    }
    turbo.onchange = () => {
        frameTimer = turbo.checked ? 50 : 250;
        if(started && interval){
            clearInterval(interval);
            startAnimation();
        }
    }
    size.onchange = () => 
        panel.className = size.value;
})();