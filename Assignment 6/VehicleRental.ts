abstract class Vehicle {
    constructor(
        public brand: string,
        public model: string,
        public rentPricePerDay: number
    ) { }

    abstract calculateRentalCost(days: number): number | string;
}

class Car extends Vehicle {
    calculateRentalCost(days: number): number | string {
        return `Rent price for Car: ${this.brand} - ${this.model} for ${days} Days = ${this.rentPricePerDay * days} Rs`;
    }
}

class Bike extends Vehicle {
    calculateRentalCost(days: number): number | string {
        return `Rent price for Bike: ${this.brand} - ${this.model} for ${days} Days = ${this.rentPricePerDay * days} Rs`;
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days: number): number | string {
        return `Rent price for Truck: ${this.brand} - ${this.model} for ${days} Days = ${this.rentPricePerDay * days} Rs`;
    }
}


const car = new Car("Toyota", "Camry", 5000);
const bike = new Bike("Yamaha", "R15", 2000);
const truck = new Truck("Volvo", "FH16", 10000);

console.log(car.calculateRentalCost(5));
console.log(bike.calculateRentalCost(3));
console.log(truck.calculateRentalCost(7));

// Rent price for Car: Toyota - Camry for 5 Days = 25000 Rs
// Rent price for Bike: Yamaha - R15 for 3 Days = 6000 Rs
// Rent price for Truck: Volvo - FH16 for 7 Days = 70000 Rs