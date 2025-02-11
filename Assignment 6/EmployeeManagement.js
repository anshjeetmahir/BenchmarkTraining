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
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        if (name === void 0) { name = "Anshjeet Mahir"; }
        if (id === void 0) { id = 1; }
        if (salary === void 0) { salary = 100000; }
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.getSalary = function () {
        return this.salary;
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.calculateBonus = function () {
        return "Manager ID: ".concat(this.id, "\nManager Name: ").concat(this.name, "\nManager Salary: ").concat(this.getSalary(), "\nManager Bonus: ").concat(this.getSalary() * 0.20, "\n");
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        return "Engineer ID: ".concat(this.id, "\nEngineer Name: ").concat(this.name, "\nEngineer Salary: ").concat(this.getSalary(), "\nEngineer Bonus: ").concat(this.getSalary() * 0.15, "\n");
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intern.prototype.calculateBonus = function () {
        return "Intern ID: ".concat(this.id, "\nIntern Name: ").concat(this.name, "\nIntern Salary: ").concat(this.getSalary(), "\nIntern Bonus: ").concat(this.getSalary() * 0.05, "\n");
    };
    return Intern;
}(Employee));
var manager = new Manager("Jessica", 1, 100000);
var engineer = new Engineer("Ravi", 2, 80000);
var intern = new Intern("Aayushi", 3, 30000);
console.log(manager.calculateBonus());
console.log(engineer.calculateBonus());
console.log(intern.calculateBonus());
