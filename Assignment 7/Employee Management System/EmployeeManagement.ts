
interface IEmployee {
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface IManager extends IEmployee {
    teamSize: number;
}

class Department {
    private employees: IEmployee[] = []

    addEmployee(employee: IEmployee): void {
        this.employees.push(employee)
    }

    removeEmployee(id: number): void {
        this.employees = this.employees.filter(emp => emp.id !== id)
    }

    getTotalSalary(): number {
        const result = this.employees.reduce((accumulator, current) => accumulator + current.salary, 0);
        return result;
    }

    listEmployees(): void {
        console.log(this.employees);

    }


}

class GenericStorage<T> {

    items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    getAll(): T[] {
        return [...this.items];
    }

}

function updateSalary<T extends IEmployee>(employee: T, newSalary: number): T {

    return { ...employee, salary: newSalary };
}

const dept = new Department();

const employee1: IEmployee = { id: 1, name: "Ravi", position: "Developer", salary: 500000 };
const employee2: IEmployee = { id: 2, name: "Mayank", position: "Developer", salary: 550000 };
const employee3: IManager = { id: 3, name: "Anshjeet Mahir", position: "Leader", salary: 700000, teamSize: 10 };
const employee4: IManager = { id: 4, name: "Abhishek", position: "Co-Leader", salary: 650000, teamSize: 5 };


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
dept.listEmployees()


const storage = new GenericStorage<IEmployee>();

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