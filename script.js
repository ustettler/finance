function addTransaction() {
    var amountInput = document.getElementById("amount").value.trim(); // Leerzeichen entfernen

    // Überprüfen, ob der eingegebene Wert eine gültige Zahl ist
    if (!(/^\d*\.?\d*$/.test(amountInput))) {
        alert("Bitte geben Sie einen gültigen Betrag ein.");
        return;
    }

    var amount = parseFloat(amountInput);
    var description = document.getElementById("description").value;
    var transactionList = document.getElementById("transaction-body");

    var newRow = document.createElement("tr");
    var newAmountCell = document.createElement("td");
    var newDescriptionCell = document.createElement("td");

    newAmountCell.textContent = amount.toFixed(2); // Hier die Änderung
    newDescriptionCell.textContent = description;

    newRow.appendChild(newAmountCell);
    newRow.appendChild(newDescriptionCell);

    if (amount >= 0) {
        newRow.className = "table-success";
    } else {
        newRow.className = "table-danger";
    }

    transactionList.appendChild(newRow);

    updateTotal();

    // Formular leeren
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}

function updateTotal() {
    var total = 0;
    var transactionRows = document.querySelectorAll("#transaction-body tr");

    transactionRows.forEach(function(row) {
        var amount = parseFloat(row.cells[0].textContent);
        total += amount;
    });

    document.getElementById("total-amount").textContent = total.toFixed(2);
}