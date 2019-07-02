'use strict';

(function(){
    let isBigger = false;
    let crescent;
    const mytext = document.getElementById('mytext');
    const bling = document.getElementById('bling');
    const decoration = document.getElementById('decoration');
    const body = document.getElementsByTagName("body")[0];

    decoration.onclick = () => {
        let size;
        if(isBigger){
            isBigger = false;
            clearInterval(crescent);  
        } else {
            isBigger = true;
            crescent = setInterval(function(){
                size = window.getComputedStyle(mytext, null).getPropertyValue('font-size');
                mytext.style.fontSize = (parseInt(size) + 2) + 'px';
            }, 500); 
        }
    }

    bling.onchange = () => {
        mytext.classList.toggle('bling');
        body.classList.toggle('glitz');
    }
})();