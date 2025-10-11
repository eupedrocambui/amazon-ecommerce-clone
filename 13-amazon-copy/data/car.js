export class Car {
    #brand;
    #model;
    speed;
    topSpeed;
    isTrunkOpen;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
        this.topSpeed = 200;
        this.isTrunkOpen = false;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model} ${this.speed} ${this.isTrunkOpen}`);
    }

    go() {
        if (this.isTrunkOpen) {
            console.log('trunk is open, please close before start driving');
        } else {
            if (this.speed < this.topSpeed) {
                this.speed += 5;
            } else {
                console.log(`speed limit ${this.topSpeed}`);
            }
        }    
    }

    brake() {
        if (this.speed > 0) {
            this.speed -= 5;
        } else {
            console.log('you already at speed 0');
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            console.log('cant open trunk while speed > 0, please brake');
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

export class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails); // load the properties from parent class
        this.acceleration = carDetails.acceleration;
        this.topSpeed = 300;
    }

    openTrunk() {
        console.log('race cars dont have trunk');
    }

    closeTrunk() {
        console.log('race cars dont have trunk');
    }

    go() {
        if (this.speed < this.topSpeed) {
            this.speed += this.acceleration;
        } else {
            console.log(`speed limit ${this.topSpeed}`);
        }
    }
}

const car1 = new Car({brand: 'toyota', model: 'corola'});
const car2 = new Car({brand: 'bmw', model: '320i'});
const car3 = new RaceCar({
    brand: 'mitsubishi',
    model: 'lancer evo x',
    acceleration: 20
});


console.log(car1);
console.log(car3);

car1.go();
car3.go();

console.log(car1);
console.log(car3);
