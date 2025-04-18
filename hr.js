function initApp() {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('main-content').classList.remove('hidden');
      loadExpenses();
      loadBalance();
      updateTotalSpent(); // <- Add this
    }, 1200);};
  
  // Add Expense
  function addExpense(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const tags = document.getElementById('tags').value;
    const note = document.getElementById('note').value;
  
    if (isNaN(amount) || amount <= 0) return;
  
    // Save expense to localStorage
    const expense = { category, amount, date, tags, note };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Update the table
    updateTable(expenses);
  
    // Deduct from bank balance
    let currentBalance = parseFloat(localStorage.getItem('balance') || 0);
    let newBalance = currentBalance - amount;
    localStorage.setItem('balance', newBalance.toFixed(2));
    document.getElementById('bank-balance').textContent = newBalance.toFixed(2);
      updateTotalSpent(); // <- Add this
    // Clear form
    document.querySelector('form').reset();
  }
  
  // Load Expenses
  function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updateTable(expenses);
  }
  
  // Update Table
  function updateTable(expenses) {
    const tbody = document.getElementById('expense-table-body');
    tbody.innerHTML = '';
    expenses.forEach(exp => {
      const row = `<tr>
        <td>${exp.date}</td><td>${exp.category}</td><td>₹${exp.amount}</td>
        <td>${exp.tags}</td><td>${exp.note}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }
  
  // Update Bank Balance
  function updateBalance(e) {
    e.preventDefault();
    const input = parseFloat(document.getElementById('balance-input').value);
    const current = parseFloat(localStorage.getItem('balance') || 0);
    const newBalance = current + input;
    localStorage.setItem('balance', newBalance.toFixed(2));
    document.getElementById('bank-balance').textContent = newBalance.toFixed(2);
    document.getElementById('balance-input').value = '';
  }
  
  // Load Bank Balance
  function loadBalance() {
    const bal = localStorage.getItem('balance') || 0;
    document.getElementById('bank-balance').textContent = parseFloat(bal).toFixed(2);
  } // <- close it here
  
  // Update Total Spent
  function updateTotalSpent() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById("total-spent").textContent = total.toFixed(2);
  }
  function resetApp() {
    const confirmReset = confirm("Are you sure you want to reset all data?");
    if (!confirmReset) return;
  
    localStorage.removeItem("expenses");
    localStorage.removeItem("balance");
  
    // Reset values on the page
    document.getElementById('bank-balance').textContent = "0.00";
    document.getElementById('total-spent').textContent = "0.00";
    document.getElementById('expense-table-body').innerHTML = "";
  
    alert("All data has been cleared!");
  }