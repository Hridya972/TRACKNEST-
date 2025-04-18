// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadExpenses();
  loadBalance();
  updateTotalSpent();
});

// Add Expense
document.getElementById("expense-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const tags = document.getElementById("tags").value;
  const note = document.getElementById("note").value;

  if (isNaN(amount) || amount <= 0) return;

  const expense = { category, amount, date, tags, note };
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateTable(expenses);

  // Update balance
  let currentBalance = parseFloat(localStorage.getItem("balance") || 0);
  currentBalance -= amount;
  localStorage.setItem("balance", currentBalance.toFixed(2));
  document.getElementById("bank-balance").textContent = currentBalance.toFixed(2);

  updateTotalSpent();
  document.getElementById("expense-form").reset();
});

// Update Expense Table
function updateTable(expenses) {
  const tbody = document.getElementById("expense-table-body");
  tbody.innerHTML = "";
  expenses.forEach((exp) => {
    const row = `<tr>
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>₹${exp.amount}</td>
      <td>${exp.tags}</td>
      <td>${exp.note}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Load Expenses
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  updateTable(expenses);
}

// Load Bank Balance
function loadBalance() {
  const balance = parseFloat(localStorage.getItem("balance") || 0).toFixed(2);
  document.getElementById("bank-balance").textContent = balance;
}

// Update Total Spent
function updateTotalSpent() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("total-spent").textContent = total.toFixed(2);
}

// Update Balance
document.getElementById("balance-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = parseFloat(document.getElementById("balance-input").value);
  if (isNaN(input)) return;

  let current = parseFloat(localStorage.getItem("balance") || 0);
  const newBalance = current + input;
  localStorage.setItem("balance", newBalance.toFixed(2));
  document.getElementById("bank-balance").textContent = newBalance.toFixed(2);
  document.getElementById("balance-input").value = "";
});

// Reset App
function resetApp() {
  if (confirm("Are you sure you want to reset all data?")) {
    localStorage.removeItem("expenses");
    localStorage.removeItem("balance");
    document.getElementById("bank-balance").textContent = "0.00";
    document.getElementById("total-spent").textContent = "0.00";
    document.getElementById("expense-table-body").innerHTML = "";
    alert("All data has been cleared!");
  }
}

// Share Summary (can be customized further)
function shareSummary() {
  const balance = localStorage.getItem("balance") || "0.00";
  const total = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses")).reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)
    : "0.00";

  const summaryText = `TRACKNEST Summary:\nTotal Spent: ₹${total}\nBank Balance: ₹${balance}`;
  navigator.clipboard.writeText(summaryText).then(() => {
    alert("Summary copied to clipboard!");
  });
}