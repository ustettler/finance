let transactions = [];

function addTransaction() {
    const amountInput = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();

    if (amountInput === "" && description === "") {
        alert("Bitte füllen Sie mindestens eines der Felder aus.");
        return;
    }

    if (amountInput !== "" && !(/^\d*\.?\d*$/.test(amountInput))) {
        alert("Bitte geben Sie einen gültigen Betrag ein.");
        return;
    }

    const amount = amountInput !== "" ? parseFloat(amountInput) : 0;
    if (description !== "" && amount !== 0) {
        transactions.push({ amount: -amount, description: description });
    } else {
        transactions.push({ amount: amount, description: description });
    }

    renderTransactions();
    updateTotal();

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}

function renderTransactions() {
    const transactionList = document.getElementById("transaction-body");
    transactionList.innerHTML = '';

    transactions.forEach(function(transaction) {
        const newRow = document.createElement("tr");
        const newAmountCell = document.createElement("td");
        const newDescriptionCell = document.createElement("td");

        newAmountCell.textContent = Math.abs(transaction.amount).toFixed(2);
        newDescriptionCell.textContent = transaction.description;

        newRow.appendChild(newAmountCell);
        newRow.appendChild(newDescriptionCell);

        newRow.className = transaction.amount >= 0 ? "table-success" : "table-danger";

        transactionList.appendChild(newRow);
    });
}

function updateTotal() {
    const total = transactions.reduce((acc, cur) => acc + cur.amount, 0);
    document.getElementById("total-amount").textContent = total.toFixed(2);
}
