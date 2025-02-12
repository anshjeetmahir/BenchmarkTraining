var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (emp) { return emp.id !== id; });
    };
    Department.prototype.getTotalSalary = function () {
        var result = this.employees.reduce(function (accumulator, current) { return accumulator + current.salary; }, 0);
        return result;
    };
    Department.prototype.listEmployees = function () {
        console.log(this.employees);
    };
    return Department;
}());
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.items = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.items.push(item);
    };
    GenericStorage.prototype.remove = function (item) {
        this.items = this.items.filter(function (i) { return i !== item; });
    };
    GenericStorage.prototype.getAll = function () {
        return __spreadArray([], this.items, true);
    };
    return GenericStorage;
}());
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
var dept = new Department();
var employee1 = { id: 1, name: "Ravi", position: "Developer", salary: 500000 };
var employee2 = { id: 2, name: "Mayank", position: "Developer", salary: 550000 };
var employee3 = { id: 3, name: "Anshjeet Mahir", position: "Leader", salary: 700000, teamSize: 10 };
var employee4 = { id: 4, name: "Abhishek", position: "Co-Leader", salary: 650000, teamSize: 5 };
dept.addEmployee(employee1);
dept.addEmployee(employee2);
dept.addEmployee(employee3);
dept.addEmployee(employee4);
console.log('Employee List: \n');
dept.listEmployees();
console.log('Total Salary of all Employees: \n', dept.getTotalSalary());
console.log('Removing Employee ID 2: ');
dept.removeEmployee(2);
console.log('Updated List after Removal is : ');
dept.listEmployees();
var storage = new GenericStorage();
storage.add(employee2);
storage.add(employee3);
console.log('Storage items:\n');
console.log(storage.getAll());
console.log('Employee 3 details after updating his salary: ');
console.log(updateSalary(employee3, 800000));
//output:
// Employee List:
// [
//   { id: 1, name: 'Ravi', position: 'Developer', salary: 500000 },
//   { id: 2, name: 'Mayank', position: 'Developer', salary: 550000 },
//   {
//     id: 3,
//     name: 'Anshjeet Mahir',
//     position: 'Leader',
//     salary: 700000,
//     teamSize: 10
//   },
//   {
//     id: 4,
//     name: 'Abhishek',
//     position: 'Co-Leader',
//     salary: 650000,
//     teamSize: 5
//   }
// ]
// Total Salary of all Employees:
//  2400000
// Removing Employee ID 2:
// Updated List after Removal is :
// [
//   { id: 1, name: 'Ravi', position: 'Developer', salary: 500000 },
//   {
//     id: 3,
//     name: 'Anshjeet Mahir',
//     position: 'Leader',
//     salary: 700000,
//     teamSize: 10
//   },
//   {
//     id: 4,
//     name: 'Abhishek',
//     position: 'Co-Leader',
//     salary: 650000,
//     teamSize: 5
//   }
// ]
// Storage items:
// [
//   { id: 2, name: 'Mayank', position: 'Developer', salary: 550000 },
//   {
//     id: 3,
//     name: 'Anshjeet Mahir',
//     position: 'Leader',
//     salary: 700000,
//     teamSize: 10
//   }
// ]
// Employee 3 details after updating his salary:
// {
//   id: 3,
//   name: 'Anshjeet Mahir',
//   position: 'Leader',
//   salary: 800000,
//   teamSize: 10
// }
