let transactions = [];

        function addTransaction() {
            let amountInput = document.getElementById("amount").value.trim(); // Leerzeichen entfernen
            let description = document.getElementById("description").value.trim();

            // Überprüfen, ob beide Felder leer sind
            if (amountInput === "" && description === "") {
                alert("Bitte füllen Sie mindestens eines der Felder aus.");
                return;
            }

            // Überprüfen, ob der eingegebene Wert eine gültige Zahl ist
            if (amountInput !== "" && isNaN(amountInput)) {
                alert("Bitte geben Sie einen gültigen Betrag ein.");
                return;
            }

            // Konvertiere den Betrag in eine Zahl, oder setze auf 0 wenn leer
            let amount = parseFloat(amountInput) || 0;

            // Wenn es sich um Ausgaben handelt (Beschreibung vorhanden und Betrag positiv), den Betrag negativ setzen
            if (description !== "" && amount > 0) {
                amount *= -1;
            }

            transactions.push({ amount: amount, description: description });
            renderTransactions();
            updateTotal();

            // Formular leeren
            document.getElementById("amount").value = "";
            document.getElementById("description").value = "";
        }

        function renderTransactions() {
            let transactionList = document.getElementById("transaction-body");
            transactionList.innerHTML = '';

            transactions.forEach(function(transaction) {
                let newRow = document.createElement("tr");
                let newAmountCell = document.createElement("td");
                let newDescriptionCell = document.createElement("td");

                newAmountCell.textContent = transaction.amount.toFixed(2);
                newDescriptionCell.textContent = transaction.description;

                newRow.appendChild(newAmountCell);
                newRow.appendChild(newDescriptionCell);

                if (transaction.amount >= 0) {
                    newRow.className = "table-success";
                } else {
                    newRow.className = "table-danger";
                }

                transactionList.appendChild(newRow);
            });
        }

        function updateTotal() {
            let total = 0;
            transactions.forEach(function(transaction) {
                total += transaction.amount;
            });

            document.getElementById("total-amount").textContent = total.toFixed(2);
        }