var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        return "Rent price for Car: ".concat(this.brand, " - ").concat(this.model, " for ").concat(days, " Days = ").concat(this.rentPricePerDay * days, " Rs");
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.calculateRentalCost = function (days) {
        return "Rent price for Bike: ".concat(this.brand, " - ").concat(this.model, " for ").concat(days, " Days = ").concat(this.rentPricePerDay * days, " Rs");
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        return "Rent price for Truck: ".concat(this.brand, " - ").concat(this.model, " for ").concat(days, " Days = ").concat(this.rentPricePerDay * days, " Rs");
    };
    return Truck;
}(Vehicle));
var car = new Car("Toyota", "Camry", 5000);
var bike = new Bike("Yamaha", "R15", 2000);
var truck = new Truck("Volvo", "FH16", 10000);
console.log(car.calculateRentalCost(5));
console.log(bike.calculateRentalCost(3));
console.log(truck.calculateRentalCost(7));
