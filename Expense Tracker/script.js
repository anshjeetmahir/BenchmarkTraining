var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["FOOD"] = "Food";
    ExpenseCategory["TRAVEL"] = "Travel";
    ExpenseCategory["BILLS"] = "Bills";
    ExpenseCategory["SHOPPING"] = "Shopping";
    ExpenseCategory["OTHER"] = "Other";
})(ExpenseCategory || (ExpenseCategory = {}));
var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        this.expenses = [];
        this.storageKey = "expenses";
        this.loadExpenses();
        this.renderExpenses();
    }
    ExpenseTracker.prototype.saveExpenses = function () {
        localStorage.setItem(this.storageKey, JSON.stringify(this.expenses));
    };
    ExpenseTracker.prototype.loadExpenses = function () {
        var storedExpenses = localStorage.getItem(this.storageKey);
        if (storedExpenses) {
            this.expenses = JSON.parse(storedExpenses);
        }
    };
    ExpenseTracker.prototype.addExpense = function (amount, category, date, description) {
        var newExpense = {
            id: this.expenses.length + 1,
            amount: amount,
            category: category,
            date: date,
            description: description
        };
        this.expenses.push(newExpense);
        this.saveExpenses();
        this.renderExpenses();
    };
    ExpenseTracker.prototype.getExpenses = function () {
        return this.expenses;
    };
    ExpenseTracker.prototype.filterExpenses = function (category, startDate, endDate) {
        return this.expenses.filter(function (expense) {
            return (!category || expense.category === category) &&
                (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                (!endDate || new Date(expense.date) <= new Date(endDate));
        });
    };
    ExpenseTracker.prototype.renderExpenses = function (filteredExpenses) {
        if (filteredExpenses === void 0) { filteredExpenses = this.expenses; }
        var expenseList = document.getElementById("expense-list");
        if (!expenseList)
            return;
        expenseList.innerHTML = "";
        filteredExpenses.forEach(function (expense) {
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>".concat(expense.date, "</td>\n                <td>").concat(expense.category, "</td>\n                <td>").concat(expense.description, "</td>\n                <td>").concat(expense.amount, "</td>\n            ");
            expenseList.appendChild(row);
        });
    };
    ExpenseTracker.prototype.afterResetFilter = function () {
        this.loadExpenses();
        this.renderExpenses(this.expenses);
    };
    ExpenseTracker.prototype.clearLog = function () {
        localStorage.clear();
        this.expenses = [];
        this.renderExpenses(this.expenses);
    };
    return ExpenseTracker;
}());
var tracker = new ExpenseTracker();
var expenseForm = document.getElementById("expense-form");
var filterButton = document.getElementById("filter-btn");
var resetFilterButton = document.getElementById("filter-reset");
var clearHistory = document.getElementById('clear-btn');
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var inputAmount = document.getElementById("amount");
    var inputCategory = document.getElementById("category");
    var inputDate = document.getElementById("date");
    var inputDescription = document.getElementById("description");
    var amount = inputAmount.valueAsNumber;
    var category = inputCategory.value;
    var date = inputDate.value;
    var description = inputDescription.value;
    if (amount && category && date && description) {
        tracker.addExpense(amount, category, date, description);
    }
    inputAmount.value = '';
    inputCategory.value = 'Select Category';
    inputDate.value = '';
    inputDescription.value = '';
});
filterButton.addEventListener("click", function (e) {
    e.preventDefault();
    var inputCategory = document.getElementById("filter-category");
    var inputStartDate = document.getElementById("filter-start-date");
    var inputEndDate = document.getElementById("filter-end-date");
    var category = inputCategory.value !== "#" ? inputCategory.value : null;
    var startDate = inputStartDate.value.trim() ? inputStartDate.value : null;
    var endDate = inputEndDate.value.trim() ? inputEndDate.value : null;
    if (!category && !startDate && !endDate) {
        tracker.renderExpenses(tracker.getExpenses());
        return;
    }
    var filteredExpenses = tracker.filterExpenses(category || undefined, startDate || undefined, endDate || undefined);
    tracker.renderExpenses(filteredExpenses);
});
resetFilterButton.addEventListener('click', function () {
    var inputCategory = document.getElementById("filter-category");
    var inputStartDate = document.getElementById("filter-start-date");
    var inputEndDate = document.getElementById("filter-end-date");
    inputCategory.value = '#';
    inputStartDate.value = '';
    inputEndDate.value = '';
    tracker.afterResetFilter();
});
clearHistory.addEventListener('click', function () { return tracker.clearLog(); });
