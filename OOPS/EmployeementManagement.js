
class Employee {
    #salary;//private
    constructor(id, name, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary;
    }

    getSalary() {
        return this.#salary;
    }

    calculateBonus() {
        const output = `Manager ID: ${this.id}\nManager Name: ${this.name}\nManager Salary: ${this.getSalary()}\nManager Bonus: No base bonus for employees...\n`;
        return output;

    }

};
//Inheritance
class Manager extends Employee {


    calculateBonus() {
        const bonus = this.getSalary() * 0.75
        const output = `Manager ID: ${this.id}\nManager Name: ${this.name}\nManager Salary: ${this.getSalary()}\nManager Bonus: ${bonus}\n`;
        return output;
    }



};

//Inheritance
class Engineer extends Employee {
    calculateBonus() {
        const bonus = this.getSalary() * 0.5
        const output = `Engineer ID: ${this.id}\nEngineer Name: ${this.name}\nEngineer Salary: ${this.getSalary()}\nEngineer Bonus: ${bonus}\n`
        return output;
    }


};
//Inheritance
class Intern extends Employee {
    calculateBonus() {
        const bonus = this.getSalary() * 0.25
        const output = `Intern ID: ${this.id}\nIntern Name: ${this.name}\nIntern Salary: ${this.getSalary()}\nIntern Bonus: ${bonus}\n`
        return output;
    }

};

//Object Creation
const employee = new Employee(1, "Akshay", 10000);
const manager = new Manager(2, "John Smith", 500000);
const engineer = new Engineer(3, "Anshjeet Mahir", 300000);
const intern = new Intern(4, "Karan Singh", 100000);

console.log(employee.calculateBonus());
// Manager ID: 1
//Manager Name: Akshay
//Manager Salary: 10000
//Manager Bonus: No base bonus for employees...
console.log(manager.calculateBonus());
//Manager ID: 2
//Manager Name: John Smith
//Manager Salary: 500000
console.log(engineer.calculateBonus());
//Engineer ID: 3
//Engineer Name: Anshjeet Mahir
//Engineer Salary: 300000
//Engineer Bonus: 150000
console.log(intern.calculateBonus());
//Intern ID: 4
//Intern Name: Karan Singh
//Intern Salary: 100000
//Intern Bonus: 25000
