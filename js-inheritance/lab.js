
//ES5 Function Expressions: 
(function() {
    'use strict'

    let createBicyclePrototye = function() {

        let speed = 0;

        const applyBreak = function (givenSpeed) {
            this.speed -=  givenSpeed;
        }

        const speedUp = function (givenSpeed) {
            this.speed +=  givenSpeed;
        }

        return {
            speed: speed,
            applyBreak: applyBreak,
            speedUp: speedUp
        }
    }

    let createMountainBikeProtoype = function(bicyclePrototype) {
        let create = Object.create(bicyclePrototype);
        create.gear = 1;
        create.setGear = function(gear) {
            this.gear = gear;
        }
        return create;
    }

    let start = function() {
        let bicyclePrototype = createBicyclePrototye();
        let mountainBikeProtoype = createMountainBikeProtoype(bicyclePrototype);

        console.log(mountainBikeProtoype.speedUp(2));
        console.log(mountainBikeProtoype.speed);
        console.log(mountainBikeProtoype.setGear(3));
        console.log(mountainBikeProtoype.gear);
        console.log(bicyclePrototype);
        console.log(mountainBikeProtoype);
    }

    start();

})();

// ES6 Class construct: 
(function(){

    class BicyclePrototype {
        
        speed = 0;

        constructor() {
            this.speed = speed;
            this.applyBreak = applyBreak;
            this.speedUp = speedUp;
        }

        applyBreak = function (givenSpeed) {
            this.speed -=  givenSpeed;
        }

        speedUp = function (givenSpeed) {
            this.speed +=  givenSpeed;
        }

    }

})();

// Constructor function 