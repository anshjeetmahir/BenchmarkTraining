abstract class Employee {
    constructor(
        public name: string = "Anshjeet Mahir",
        protected id: number = 1,
        private salary: number = 100000
    ) { }

    abstract calculateBonus(): number | string;

    getSalary(): number {
        return this.salary;
    }
}

class Manager extends Employee {
    calculateBonus(): number | string {
        return `Manager ID: ${this.id}\nManager Name: ${this.name}\nManager Salary: ${this.getSalary()}\nManager Bonus: ${this.getSalary() * 0.20}\n`;
    }
}

class Engineer extends Employee {
    calculateBonus(): number | string {
        return `Engineer ID: ${this.id}\nEngineer Name: ${this.name}\nEngineer Salary: ${this.getSalary()}\nEngineer Bonus: ${this.getSalary() * 0.15}\n`;
    }
}

class Intern extends Employee {
    calculateBonus(): number | string {
        return `Intern ID: ${this.id}\nIntern Name: ${this.name}\nIntern Salary: ${this.getSalary()}\nIntern Bonus: ${this.getSalary() * 0.05}\n`;
    }
}

const manager = new Manager("Jessica", 1, 100000);
const engineer = new Engineer("Ravi", 2, 80000);
const intern = new Intern("Aayushi", 3, 30000);

console.log(manager.calculateBonus());
console.log(engineer.calculateBonus());
console.log(intern.calculateBonus());

// Manager ID: 1
// Manager Name: Jessica
// Manager Salary: 100000
// Manager Bonus: 20000

// Engineer ID: 2
// Engineer Name: Ravi
// Engineer Salary: 80000
// Engineer Bonus: 12000

// Intern ID: 3
// Intern Name: Aayushi
// Intern Salary: 30000
// Intern Bonus: 1500