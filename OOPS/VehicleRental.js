
class Vehicle {


    constructor(brand, model, pricePerDay) {
        this.brand = brand;
        this.model = model;
        this.pricePerDay = pricePerDay;
    }



    calculatRentalCost(days) {

        return this.pricePerDay * days;

    }

};
//Inheritance
class Car extends Vehicle {

    constructor(brand, model, pricePerDay) {
        super(brand, model, pricePerDay);

    }

    //Polymorphism
    calculatRentalCost(days) {

        const rent = super.calculatRentalCost(days);
        const output = `Rent price for Car : ${this.brand} - ${this.model} for ${days} Days = ${rent} Rs\n`
        return output;

    }

};
//Inheritance
class Bike extends Vehicle {

    constructor(brand, model, pricePerDay) {
        super(brand, model, pricePerDay);

    }

    //polymorphism
    calculatRentalCost(days) {

        const rent = super.calculatRentalCost(days);
        const output = `Rent price for Bike : ${this.brand} - ${this.model} for ${days} Days = ${rent} Rs\n`
        return output;

    }

};
//Inheritance
class Truck extends Vehicle {

    constructor(brand, model, pricePerDay) {
        super(brand, model, pricePerDay);

    }
    //Polymorphism
    calculatRentalCost(days) {

        const rent = super.calculatRentalCost(days);
        const output = `Rent price for Truck : ${this.brand} - ${this.model} for ${days} Days = ${rent} Rs\n`
        return output;

    }

};


//Object Creation
const car = new Car('BMW', 'M5 CSL', 5000);
const bike = new Bike('Kawasaki', 'H2 R', 2000);
const truck = new Truck('Ashok Leyland', 'MX-1000', 10000);


console.log(bike.calculatRentalCost(3)); // Rent price for Bike : Kawasaki - H2 R for 3 Days = 6000 Rs
console.log(car.calculatRentalCost(5)); // Rent price for Car : BMW - M5 CSL for 5 Days = 25000 Rs
console.log(truck.calculatRentalCost(7)); // Rent price for Truck : Ashok Leyland - MX-1000 for 7 Days = 70000 Rs


