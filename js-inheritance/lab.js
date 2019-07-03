/** 
 * ES5 Function Expressions: 
*/

let bike = function() {
    'use strict'

    let createBicyclePrototye = function() {

        let speed = 0;
        let type = "Normal bike";

        const applyBrake = function (givenSpeed) {
            this.speed -=  givenSpeed;
        }

        const speedUp = function (givenSpeed) {
            this.speed +=  givenSpeed;
        }

        return {
            type: type,
            speed: speed,
            applyBrake: applyBrake,
            speedUp: speedUp
        }
    }

    let createMountainBikeProtoype = function(bicyclePrototype) {
        let create = Object.create(bicyclePrototype);
        create.gear = 1;
        create.type = "Mountain bike";
        create.setGear = function(gear) {
            this.gear = gear;
        }
        return create;
    }

    return {
        createBicyclePrototye: createBicyclePrototye, 
        createMountainBikeProtoype: createMountainBikeProtoype
    }

};


/** 
 * ES6 Class construct: 
*/
class BicyclePrototype {
    
    speed = 0;
    type = "Normal bike from ES6"

    applyBrake = function (givenSpeed) {
        this.speed -=  givenSpeed;
    }

    speedUp = function (givenSpeed) {
        this.speed +=  givenSpeed;
    }
}

class MountainBikeProtoype extends BicyclePrototype {
    constructor() {
        super();
        this.gear = 2;
        this.type = "Mountain bike ES6";
    }

    setGear(newGear) {
        this.gear = newGear;
    }
}

/**
 * Function construtor:
 */

function BicyclePrototypeConstructor() {

    type = "Normal bike from FC"
    speed = 0;

    applyBrake = function (givenSpeed) {
        this.speed -=  givenSpeed;
    }

    speedUp = function (givenSpeed) {
        this.speed +=  givenSpeed;
    }

    return {
        type: type,
        speed: speed,
        applyBrake: applyBrake,
        speedUp: speedUp
    }
}

function MountainBikeProtoypeConstructor(bicyclePrototype) {
    let create = Object.create(bicyclePrototype);
    create.type = "Mountain bike FC";
    create.gear = 3;
    
    setGear = function (newGear) {
        create.gear = newGear;
    }

    return create;
}

/** 
 * Testing on the screen:
*/
let controll = function () {
    let panel = document.getElementsByTagName("textarea")[0];
    let transformBtn = document.getElementById("transform");
    let speedupBtn = document.getElementById("speedup");
    let brakeBtn = document.getElementById("brake");
    let timer;

    //Uncomment one of the 3 lines to test the functionality:

    let newBike = new BicyclePrototypeConstructor(); 
    // let newBike = new BicyclePrototype(); 
    //let newBike = bike().createBicyclePrototye();
    
    transformBtn.onclick = () => transformBike();
    speedupBtn.onclick = () => bikeSpeedUp();
    brakeBtn.onclick = () => bikeBrake();


    (function () {
        panel.value = newBike.type + ", speed is: " + newBike.speed + " km/h";
    })();

    let transformBike = function () {

        //Uncomment one of the 3 lines to test the functionality:

        newBike = new MountainBikeProtoypeConstructor(newBike); 
        //newBike = new MountainBikeProtoype(); 
        //newBike = bike().createMountainBikeProtoype(newBike);

        panel.value = newBike.type + ", the gear is: " + newBike.gear +", and speed is: " + newBike.speed + " km/h";
    }

    let bikeSpeedUp = function () {
        timer = setInterval(()=> {
            newBike.speed += 1;
            panel.value = newBike.type + ", the gear is: " + newBike.gear + ", speed is: " + newBike.speed + " km/h";
        }, 80);
    }  

    let bikeBrake = function () {
        clearInterval(timer);
        timer = setInterval(()=> {
            newBike.speed -= 1;
            panel.value = newBike.type + ", the gear is: " + newBike.gear + ", speed is: " + newBike.speed + " km/h";
            
            if (newBike.speed <= 0)                
                clearInterval(timer);

        }, 40);
    }
};

window.onload = function() {
    controll();
};
