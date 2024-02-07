
let expenses = [];

if(sessionStorage.getItem('isLoggedIn') ==='false') {
    window.location.href='AccessDenied.html';
}


// Function to display expenses in the table
function displayExpenses() {
    const expenseListTable = document.getElementById('expenseList');
    expenseListTable.innerHTML = ''; // Clear previous data

    expenses.forEach(expense => {
        const row = expenseListTable.insertRow();
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.note}</td>
            <td><button><i class="material-icons">delete</i></button></td>
            <td><button><i class="material-icons">edit</i></button></td>
        `;
    });
}

var modal = document.getElementById("expenseModal");
var addExpenseBtn = document.getElementById("addExpenseBtn");

var span = document.getElementsByClassName("close")[0];
addExpenseBtn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addExpense() {
    var category_val = document.getElementById("category").value;
    var amount_val = document.getElementById("amount").value;
    var date_val = document.getElementById("date").value;
    var note_val = document.getElementById("note").value;

    // Generate a unique ID for the expense
    const id = expenses.length + 1;

    // Create a new expense object
    const newExpense = { id, category: category_val, amount: amount_val, date: date_val, note: note_val };

    // Add the new expense to the expenses array
    expenses.push(newExpense);

    // Save the updated expenses array to sessionStorage
    sessionStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpenses();

    modal.style.display = "none";
}

// Retrieve expenses from sessionStorage when the page loads
window.onload = function() {
    
        const storedExpenses = sessionStorage.getItem('expenses');
        if (storedExpenses) {
            expenses = JSON.parse(storedExpenses);
            displayExpenses();
        }
}

function logout(){
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}