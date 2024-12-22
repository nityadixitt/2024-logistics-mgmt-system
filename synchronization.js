document.addEventListener('DOMContentLoaded', () => {
    const inventory = [];
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const syncButton = document.getElementById('syncButton');
    
    // Function to render the inventory table
    function renderInventory() {
        inventoryTable.innerHTML = ''; // Clear current table data
        inventory.forEach(item => {
            const row = inventoryTable.insertRow();
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.location}</td>
                <td>${item.stockLevel}</td>
                <td>
                    <button onclick="updateStock(${item.id})">Update</button>
                </td>
            `;
        });
    }

    // Function to add new item
    document.getElementById('addItemForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const location = document.getElementById('location').value;
        const stockLevel = parseInt(document.getElementById('stockLevel').value);

        const newItem = {
            id: inventory.length + 1,
            product: productName,
            location: location,
            stockLevel: stockLevel
        };

        inventory.push(newItem);
        renderInventory();

        // Clear form inputs
        document.getElementById('productName').value = '';
        document.getElementById('location').value = '';
        document.getElementById('stockLevel').value = '';
    });

    // Function to update stock for an item
    window.updateStock = (id) => {
        const item = inventory.find(item => item.id === id);
        const newStockLevel = prompt(`Enter new stock level for ${item.product} at ${item.location}:`, item.stockLevel);
        if (newStockLevel) {
            item.stockLevel = parseInt(newStockLevel);
            renderInventory();
        }
    };

    // Function to synchronize inventory
    syncButton.addEventListener('click', () => {
        alert('Inventory synchronization in progress...');
        // Here you would implement the sync logic to the server or between systems.
    });

    renderInventory(); // Initial render
});
