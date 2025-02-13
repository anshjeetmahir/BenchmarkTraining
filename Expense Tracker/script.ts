
enum ExpenseCategory {
    FOOD = "Food",
    TRAVEL = "Travel",
    BILLS = "Bills",
    SHOPPING = "Shopping",
    OTHER = "Other"
}


interface Expense {
    id: number;
    amount: number;
    category: ExpenseCategory;
    date: string;
    description: string;
}


class ExpenseTracker {
    private expenses: Expense[] = [];
    private storageKey: string = "expenses";

    constructor() {
        this.loadExpenses();
        this.renderExpenses();
    }

    private saveExpenses(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.expenses));
    }

    private loadExpenses(): void {
        const storedExpenses = localStorage.getItem(this.storageKey);
        if (storedExpenses) {
            this.expenses = JSON.parse(storedExpenses);
        }
    }

    addExpense(amount: number, category: ExpenseCategory, date: string, description: string): void {
        const newExpense: Expense = {
            id: this.expenses.length + 1,
            amount,
            category,
            date,
            description
        };
        this.expenses.push(newExpense);
        this.saveExpenses();
        this.renderExpenses();
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }

    filterExpenses(category?: ExpenseCategory, startDate?: string, endDate?: string): Expense[] {
        return this.expenses.filter(expense => {
            return (!category || expense.category === category) &&
                (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                (!endDate || new Date(expense.date) <= new Date(endDate));
        });
    }

    renderExpenses(filteredExpenses: Expense[] = this.expenses): void {
        const expenseList = document.getElementById("expense-list") as HTMLElement;
        if (!expenseList) return;
        expenseList.innerHTML = "";
        filteredExpenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
            `;
            expenseList.appendChild(row);
        });
    }

    afterResetFilter(): void {
        this.loadExpenses()
        this.renderExpenses(this.expenses);
    }

    clearLog(): void {
        localStorage.clear();
        this.expenses = [];
        this.renderExpenses(this.expenses)
    }
}

const tracker = new ExpenseTracker();
const expenseForm = document.getElementById("expense-form") as HTMLElement;
const filterButton = document.getElementById("filter-btn") as HTMLElement;
const resetFilterButton = document.getElementById("filter-reset") as HTMLElement;
const clearHistory = document.getElementById('clear-btn') as HTMLElement;




expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputAmount = document.getElementById("amount") as HTMLInputElement;
    const inputCategory = document.getElementById("category") as HTMLSelectElement;
    const inputDate = document.getElementById("date") as HTMLSelectElement;
    const inputDescription = document.getElementById("description") as HTMLSelectElement;


    const amount = inputAmount.valueAsNumber;
    const category = inputCategory.value as ExpenseCategory;
    const date = inputDate.value;
    const description = inputDescription.value;

    if (amount && category && date && description) {
        tracker.addExpense(amount, category, date, description);
    }

    inputAmount.value = '';
    inputCategory.value = 'Select Category';
    inputDate.value = ''
    inputDescription.value = ''

});

filterButton.addEventListener("click", (e) => {
    e.preventDefault();

    const inputCategory = document.getElementById("filter-category") as HTMLSelectElement;
    const inputStartDate = document.getElementById("filter-start-date") as HTMLInputElement;
    const inputEndDate = document.getElementById("filter-end-date") as HTMLInputElement;

    const category = inputCategory.value !== "#" ? (inputCategory.value as ExpenseCategory) : null;
    const startDate = inputStartDate.value.trim() ? inputStartDate.value : null;
    const endDate = inputEndDate.value.trim() ? inputEndDate.value : null;


    if (!category && !startDate && !endDate) {
        tracker.renderExpenses(tracker.getExpenses());
        return;
    }


    const filteredExpenses = tracker.filterExpenses(category || undefined, startDate || undefined, endDate || undefined);
    tracker.renderExpenses(filteredExpenses);


});


resetFilterButton.addEventListener('click', () => {

    const inputCategory = document.getElementById("filter-category") as HTMLSelectElement;
    const inputStartDate = document.getElementById("filter-start-date") as HTMLInputElement;
    const inputEndDate = document.getElementById("filter-end-date") as HTMLInputElement;

    inputCategory.value = '#';
    inputStartDate.value = '';
    inputEndDate.value = '';

    tracker.afterResetFilter()


});

clearHistory.addEventListener('click', () => tracker.clearLog())