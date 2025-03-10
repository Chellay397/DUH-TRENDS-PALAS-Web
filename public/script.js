document.addEventListener("DOMContentLoaded", () => {
    loadPage('home');
});
 
function loadPage(page) {
    let content = document.getElementById('content');
 
    if (page === 'home') {
        loadHomePage();
    } else if (page === 'employee') {
        loadEmployeePage();
    } else if (page === 'products') {
        loadProductPage();
    } else if (page === 'order') {
        loadOrderPage(); // Corrected to 'order'
    } else if (page === 'storageType') {
        loadStorageTypePage();
    } else if (page === 'contract') {
        loadContractPage();
    }
}
 
// Global Variables
let order = [];
let orderHistory = [];
let totalprice = 0;
let orderDetailIdCounter = 1; // Counter for generating unique order detail IDs
 
 
//example load orders from api
// Function to format date properly 
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function loadOrderData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/order');
        const data = await response.json();

        console.log("Fetched Orders:", data); // Debugging line  

        if (!data || data.length === 0) {
            console.error("No orders found!");
            return;
        }

        orderHistory = [];
        for (let i = 0; i < data.length; i++) {
            const orderDetails = await loadOrderDetailsById(data[i]["order_id"]);
            orderHistory.push({
                orderId: data[i]["order_id"], 
                total: data[i]["total"],
                date: formatDate(data[i]["order_date"]),
                details: orderDetails
            });
        }
        console.log("Processed Order History:", orderHistory);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}
async function loadOrderDetailsById(orderId) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/orderDetails/order/${orderId}`);
        const data = await response.json();
        
        return data.map(detail => ({
            detailId: detail["order_detail_id"],
            barcode: detail["product_barcode"],
            quantity: detail["quantity"],
            price: detail["price"],
            subtotal: Number(detail["quantity"]) * Number(detail["price"])
        }));
    } catch (error) {
        console.error(`Error fetching order details for Order ID ${orderId}:`, error);
        return [];
    }
}

// Function to load order details by orderId
async function loadOrderDetailsById(orderId) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/orderDetails/order/${orderId}`);
        const data = await response.json();
        
        return data.map(detail => ({
            detailId: detail["order_detail_id"],
            barcode: detail["product_barcode"],
            quantity: detail["quantity"],
            price: detail["price"],
            subtotal: Number(detail["quantity"]) * Number(detail["price"])
        }));
    } catch (error) {
        console.error(`Error fetching order details for Order ID ${orderId}:`, error);
        return [];
    }
}

// Function to add a new order (POST request)
async function createOrder(orderData) {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const result = await response.json();
        console.log("Order added:", result);
        loadOrderData(); // Reload orders after adding
        return result.id;
    } catch (error) {
        console.error('Error adding order:', error);
    }
}

// Function to edit an existing order (PUT request)
async function editOrder(orderId, updatedData) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/order/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Order updated:", result);
        loadOrderData(); // Reload orders after updating
    } catch (error) {
        console.error(`Error updating order ID ${orderId}:`, error);
    }
}

// Function to delete an order (DELETE request)
async function deleteOrder(orderId) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/order/${orderId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Order deleted:", result);
        loadOrderData(); // Reload orders after deleting
    } catch (error) {
        console.error(`Error deleting order ID ${orderId}:`, error);
    }
}

// Load orders on page load
loadOrderData();

// Function to add a new order detail (POST request)
async function createOrderDetail(orderDetailsData) {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/orderDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetailsData)
        });
        const result = await response.json();
        loadOrderDetails(orderData.order_id); 
    } catch (error) {
        console.error('Error adding order detail:', error);
    }
}

// Function to edit an existing order detail (PUT request)
async function editOrderDetail(detailId) {
    const updatedData = {
        quantity: parseInt(prompt("Enter new quantity:"), 10),
        price: parseFloat(prompt("Enter new price:"))
    };

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/orderDetails/${detailId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Order Detail updated:", result);
        loadOrderDetails(result.order_id); // Reload order details
    } catch (error) {
        console.error(`Error updating order detail ID ${detailId}:`, error);
    }
}

// Function to delete an order detail (DELETE request)
async function deleteOrderDetail(detailId) {
    if (!confirm("Are you sure you want to delete this order detail?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/orderDetails/${detailId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Order Detail deleted:", result);
        loadOrderDetails(result.order_id); // Reload order details
    } catch (error) {
        console.error(`Error deleting order detail ID ${detailId}:`, error);
    }
}

//product
async function loadProductsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/product');
        const data = await response.json();

        console.log("Fetched Products:", data); // Debugging line  

        if (!data || data.length === 0) {
            console.error("No products found!");
            return;
        }

        products = data.map(product => ({
            barcode: product["product_barcode"],
            name: product["product_name"],
            brandPartnerId: product["brandpartner_id"],
            quantity: product["quantity"],
            price: product["price"],
            employeeId: product["employee_id"],
            deliveryDate: product["delivery_date"],
            expirationDate: product["expiration_date"]
        }));

        loadProducts(); // Refresh table display
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to add a new product (POST request)
async function createProduct(productData) {
    try {
        const response = await fetch('http://localhost:3000/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        const result = await response.json();
        console.log("Product added:", result);
        loadProductsFromAPI(); // Reload products after adding
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Function to edit an existing product (PUT request)
async function editProductAPI(productBarcode, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/${productBarcode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Product updated:", result);
        loadProductsFromAPI(); // Reload products after updating
    } catch (error) {
        console.error(`Error updating product barcode ${productBarcode}:`, error);
    }
}

// Function to delete a product (DELETE request)
async function deleteProductAPI(productBarcode) {
    try {
        const response = await fetch(`http://localhost:3000/api/product/${productBarcode}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Product deleted:", result);
        loadProductsFromAPI(); // Reload products after deleting
    } catch (error) {
        console.error(`Error deleting product barcode ${productBarcode}:`, error);
    }
}

// Load products from API when page loads
loadProductsFromAPI();


//storagetype
// Function to load all storage types (GET request)
async function loadStorageTypesFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/storagetype');
        const data = await response.json();

        console.log("Fetched Storage Types:", data); // Debugging line  

        if (!data || data.length === 0) {
            console.error("No storage types found!");
            return;
        }

        storageTypes = data.map(storage => ({
            id: storage["Storage_ID"],  // Ensure the correct field names
            contractId: storage["ContractID"],
            price: storage["Storage_price"]
        }));

        loadStorageTypes(); // Refresh table display
    } catch (error) {
        console.error('Error fetching storage types:', error);
    }
}

// Function to add a new storage type (POST request)
async function createStorageType(storageData) {
    try {
        const response = await fetch('http://localhost:3000/api/storagetype', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storageData)
        });
        const result = await response.json();
        console.log("Storage Type added:", result);
        loadStorageTypesFromAPI(); // Reload storage types after adding
    } catch (error) {
        console.error('Error adding storage type:', error);
    }
}

// Function to edit an existing storage type (PUT request)
async function editStorageTypeAPI(storageId, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/api/storagetype/${storageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Storage Type updated:", result);
        loadStorageTypesFromAPI(); // Reload storage types after updating
    } catch (error) {
        console.error(`Error updating storage type ID ${storageId}:`, error);
    }
}

// Function to delete a storage type (DELETE request)
async function deleteStorageTypeAPI(storageId) {
    try {
        const response = await fetch(`http://localhost:3000/api/storagetype/${storageId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Storage Type deleted:", result);
        loadStorageTypesFromAPI(); // Reload storage types after deleting
    } catch (error) {
        console.error(`Error deleting storage type ID ${storageId}:`, error);
    }
}

// Load storage types from API when page loads
loadStorageTypesFromAPI();

// Contract
// Function to load all contracts (GET request)
async function loadContractsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/contract');
        const data = await response.json();

        console.log("Fetched Contracts:", data); // Debugging line  

        if (!data || data.length === 0) {
            console.error("No contracts found!");
            return;
        }

        contracts = data.map(contract => ({
            id: contract["Contract_ID"],
            startDate: contract["Contract_startdate"],
            endDate: contract["Contract_enddate"],
            brandPartnerId: contract["BrandPartner_ID"]
        }));

        loadContracts(); // Refresh table display
    } catch (error) {
        console.error('Error fetching contracts:', error);
    }
}

// Function to add a new contract (POST request)
async function createContract(contractData) {
    try {
        const response = await fetch('http://localhost:3000/api/contract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contractData)
        });
        const result = await response.json();
        console.log("Contract added:", result);
        loadContractsFromAPI(); // Reload contracts after adding
    } catch (error) {
        console.error('Error adding contract:', error);
    }
}

// Function to edit an existing contract (PUT request)
async function editContractAPI(contractId, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/api/contract/${contractId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Contract updated:", result);
        loadContractsFromAPI(); // Reload contracts after updating
    } catch (error) {
        console.error(`Error updating contract ID ${contractId}:`, error);
    }
}

// Function to delete a contract (DELETE request)
async function deleteContractAPI(contractId) {
    try {
        const response = await fetch(`http://localhost:3000/api/contract/${contractId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Contract deleted:", result);
        loadContractsFromAPI(); // Reload contracts after deleting
    } catch (error) {
        console.error(`Error deleting contract ID ${contractId}:`, error);
    }
}

// Load contracts from API when page loads
loadContractsFromAPI();

//employee
// Function to load all employees (GET request)
async function loadEmployeesFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/employee');
        const data = await response.json();

        console.log("Fetched Employees:", data);

        if (!data || data.length === 0) {
            console.error("No employees found!");
            return;
        }

        employees = data.map(employee => ({
            id: employee.Employee_ID,
            firstName: employee.Firstname,
            lastName: employee.Lastname,
            contactNumber: employee.ContactNumber,
            address: employee.Address
        }));

        loadEmployees(); // Refresh employee table display
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

// Function to add a new employee (POST request)
async function createEmployee(employeeData) {
    try {
        const response = await fetch('http://localhost:3000/api/employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        const result = await response.json();
        console.log("Employee added:", result);
        loadEmployeesFromAPI(); // Reload employees after adding
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

// Function to edit an existing employee (PUT request)
async function editEmployeeAPI(employeeId, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        console.log("Employee updated:", result);
        loadEmployeesFromAPI(); // Reload employees after updating
    } catch (error) {
        console.error(`Error updating employee ID ${employeeId}:`, error);
    }
}

// Function to delete an employee (DELETE request)
async function deleteEmployeeAPI(employeeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/employee/${employeeId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Employee deleted:", result);
        loadEmployeesFromAPI(); // Reload employees after deleting
    } catch (error) {
        console.error(`Error deleting employee ID ${employeeId}:`, error);
    }
}

// Load employees when the page loads
loadEmployeesFromAPI();


// Load Home Page
function loadHomePage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2 class="mb-4">Point of Sale (POS) System</h2>
        <form id="pos-form">
            <div class="mb-3">
                <label for="barcode" class="form-label">Product Barcode</label>
                <select class="form-control" id="barcode" onchange="loadProductPrice()" required>
                    <option value="">Select a Barcode</option>
                    <option value="123456789012">123456789012</option>
                    <option value="123456789014">123456789014</option>
                    <option value="123456789015">123456789015</option>
                    <option value="123456789016">123456789016</option>
                    <option value="123456789082">123456789082</option>
                    <option value="223456789012">223456789012</option>
                    <option value="223456789013">223456789013</option>
                    <option value="223456789014">223456789014</option>
                    <option value="223456789015">223456789015</option>
                    <option value="223456789016">223456789016</option>
                    <option value="FOOD2001">FOOD2001</option>
                    <option value="FOOD2002">FOOD2002</option>
                    <option value="FOOD2003">FOOD2003</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="quantity" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control-plaintext" value="0.0" id="price" required readonly>
            </div>
            <button type="button" class="btn btn-primary" onclick="addOrder()">Add Order</button>
        </form>
       
        <h3 class="mt-4">Order Summary</h3>
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Product Barcode</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="order-list"></tbody>
        </table>
        <h4>Total: ₱<span id="total-price">0.00</span></h4>
        <button class="btn btn-success mt-3" onclick="processOrder()">Process Order</button>
 
        <h3 class="mt-4">Order History</h3>
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product Barcode</th>
                    <th>Total</th>
                    <th>Order Date</th>
                </tr>
            </thead>
            <tbody id="order-history"></tbody>
        </table>
    `;
    updateOrderHistoryTable();
}
function loadProductPrice(){
    let barcodeInput = document.getElementById('barcode');
    let priceInput = document.getElementById('price');
    priceInput.value = products.find(products => products.barcode === barcodeInput.value).price;
}
// Add Order Function
async function addOrder() {
    try {
        const response = await fetch('http://localhost:3000/api/product');
        const data = await response.json();
        let barcodeInput = document.getElementById('barcode');
        let quantityInput = document.getElementById('quantity');
        let priceInput = document.getElementById('price');
    
        let barcode = barcodeInput.value.trim();
        let quantity = parseInt(quantityInput.value);
        let price = parseFloat(priceInput.value);
    
        if (!barcode || quantity <= 0 || price <= 0) {
            alert("Please enter valid product details!");
            return;
        }
        
        if (!data || data.length === 0) {
            console.error("No Product found!");
            return;
        }
        let result = false;
        
        for (i=0; i < data.length; i++){
            const product_barcode = data[i].product_barcode
            if (product_barcode == document.getElementById("barcode").value){
                result = true;
                break;
            }
        }

        if (result==true){

    
            let subtotal = quantity * price;
            let newOrderDetail = {
                detailId: orderDetailIdCounter++, // Generate unique detailId
                barcode,
                quantity,
                price,
                subtotal
            };
        
            order.push(newOrderDetail);
            totalprice += subtotal;
        
            updateOrderTable();
        
            barcodeInput.value = "";
            quantityInput.value = "";
            priceInput.value = "";
        } else{
            alert("NONE");
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Update Order Summary Table
function updateOrderTable() {
    let orderList = document.getElementById('order-list');
    let totalPriceElement = document.getElementById('total-price');
 
    orderList.innerHTML = ""; // Clear existing rows
    order.forEach((item) => {
        orderList.innerHTML += `
            <tr>
                <td>${item.barcode}</td>
                <td>${item.quantity}</td>
                <td>₱${item.price.toFixed(2)}</td>
                <td>₱${item.subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteOrder(${item.detailId})">Delete</button>
                </td>
            </tr>
        `;
    });
 
    totalPriceElement.innerText = totalprice.toFixed(2);
}
 
// Delete Function
function deleteOrder(detailId) {
    const index = order.findIndex(item => item.detailId === detailId);
    if (index >= 0) {
        totalprice -= order[index].subtotal;
        order.splice(index, 1); // Remove item from order list
        updateOrderTable(); // Refresh UI
    } else {
        alert("Invalid item selection for deletion.");
    }
}
 
// Update Order History Table
function updateOrderHistoryTable() {
    let historyTable = document.getElementById('order-history');
    historyTable.innerHTML = "";
    orderHistory.forEach(order => {
        historyTable.innerHTML += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.details.map(d => d.barcode).join(", ")}</td>
                <td>₱${order.total}</td>
                <td>${order.date}</td> <!-- Displaying the order date -->
            </tr>
        `;
    });
}
 
// Initialize Page
loadHomePage();
 
// Employee Management Page
function loadEmployeePage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2>Employee Management</h2>
        <form id="employeeForm" class="mb-3">
            <input type="hidden" id="employeeId">
            <div class="mb-2"><input type="text" id="firstName" class="form-control" placeholder="First Name" required></div>
            <div class="mb-2"><input type="text" id="lastName" class="form-control" placeholder="Last Name" required></div>
            <div class="mb-2"><input type="text" id="contactNumber" class="form-control" placeholder="Contact Number" required></div>
            <div class="mb-2"><input type="text" id="address" class="form-control" placeholder="Address" required></div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <table class="table">
            <thead><tr>
                <th>Employee ID</th><th>First Name</th><th>Last Name</th><th>Contact Number</th><th>Address</th><th>Actions</th>
            </tr></thead>
            <tbody id="employeeTableBody"></tbody>
        </table>
    `;
 
    loadEmployees();
    document.getElementById('employeeForm').addEventListener("submit", handleEmployeeForm);
}
 
let employees = [
    { id: 1, firstName: "John", lastName: "Doe", contactNumber: "1234567890", address: "123 Main St, City, Country" },
    { id: 2, firstName: "Jane", lastName: "Smith", contactNumber: "0987654321", address: "456 Elm St, City, Country" },
    { id: 3, firstName: "Ansharlene", lastName: "Balagosa", contactNumber: "09123456789", address: "Davao City" }
];
 
function loadEmployees() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${employee.id}</td><td>${employee.firstName}</td><td>${employee.lastName}</td>
                <td>${employee.contactNumber}</td><td>${employee.address}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
 
function handleEmployeeForm(event) {
    event.preventDefault();
    const id = document.getElementById('employeeId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const address = document.getElementById('address').value;
 
    if (id === "") {
        employees.push({ id: employees.length + 1, firstName, lastName, contactNumber, address });
    } else {
        employees[id] = { id: parseInt(id) + 1, firstName, lastName, contactNumber, address };
    }
 
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = "";
    loadEmployees();
}
 
function editEmployee(index) {
    document.getElementById('employeeId').value = index;
    document.getElementById('firstName').value = employees[index].firstName;
    document.getElementById('lastName').value = employees[index].lastName;
    document.getElementById('contactNumber').value = employees[index].contactNumber;
    document.getElementById('address').value = employees[index].address;
}
 
function deleteEmployee(index) {
    employees.splice(index, 1);
    loadEmployees();
}
 
// Product Management
function loadProductPage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2>Product Management</h2>
        <form id="productForm" class="mb-3">
            <input type="hidden" id="productId">
            <div class="mb-2"><input type="text" id="productBarcode" class="form-control" placeholder="Product Barcode" required></div>
            <div class="mb-2"><input type="text" id="productName" class="form-control" placeholder="Product Name" required></div>
            <div class="mb-2">
                <select id="brandPartnerId" class="form-control" required>
                    <option value="">Select Brand Partner ID</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div class="mb-2"><input type="number" id="quantity" class="form-control" placeholder="Quantity" required></div>
            <div class="mb-2"><input type="number" id="price" class="form-control" placeholder="Price" step="0.01" required></div>
            <div class="mb-2">
                <select id="employeeId" class="form-control">
                    <option value="">Select Employee</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div class="mb-2"><input type="datetime-local" id="deliveryDate" class="form-control"></div>
            <div class="mb-2"><input type="datetime-local" id="expirationDate" class="form-control"></div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <table class="table">
            <thead><tr>
                <th>Barcode</th><th>Name</th><th>Brand ID</th><th>Quantity</th><th>Price</th>
                <th>Employee ID</th><th>Delivery Date</th><th>Expiration Date</th><th>Actions</th>
            </tr></thead>
            <tbody id="productTableBody"></tbody>
        </table>
    `;
    loadProducts();
    document.getElementById('productForm').addEventListener("submit", handleProductForm);
}
 
let products = [];
 
function loadProducts() {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.barcode}</td><td>${product.name}</td><td>${product.brandPartnerId}</td>
                <td>${product.quantity}</td><td>₱${product.price}</td><td>${product.employeeId || 'NULL'}</td>
                <td>${product.deliveryDate || 'NULL'}</td><td>${product.expirationDate || 'NULL'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
 
function handleProductForm(event) {
    event.preventDefault();
 
    const productId = document.getElementById('productId').value;
    const product = {
        barcode: document.getElementById('productBarcode').value,
        name: document.getElementById('productName').value,
        brandPartnerId: document.getElementById('brandPartnerId').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value,
        employeeId: document.getElementById('employeeId').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        expirationDate: document.getElementById('expirationDate').value
    };
 
    if (productId === "") {
        // Add new product
        products.push(product);
    } else {
        // Update existing product
        products[parseInt(productId)] = product;
    }
 
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = "";
    loadProducts();
}
 
function editProduct(index) {
    const product = products[index];
 
    document.getElementById('productId').value = index;
    document.getElementById('productBarcode').value = product.barcode;
    document.getElementById('productName').value = product.name;
    document.getElementById('brandPartnerId').value = product.brandPartnerId;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('price').value = product.price;
    document.getElementById('employeeId').value = product.employeeId;
    document.getElementById('deliveryDate').value = product.deliveryDate;
    document.getElementById('expirationDate').value = product.expirationDate;
}
 
function deleteProduct(index) {
    products.splice(index, 1);
    loadProducts();
}
 
// Storage Type Page
function loadStorageTypePage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2>Storage Type</h2>
        <form id="storageTypeForm" class="mb-3">
            <input type="hidden" id="storageTypeId">
            <div class="mb-2"><input type="text" id="contractId" class="form-control" placeholder="Contract ID" required></div>
            <div class="mb-2">
                <select id="storagePrice" class="form-control" required>
                    <option value="">Select Price (₱)</option>
                    <option value="1000">₱1,000</option>
                    <option value="1200">₱1,200</option>
                    <option value="1500">₱1,500</option>
                    <option value="2200">₱2,200</option>
                    <option value="2500">₱2,500</option>
                    <option value="3000">₱3,000</option>
                    <option value="3500">₱3,500</option>
                    <option value="5500">₱5,500</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <table class="table">
            <thead><tr>
                <th>Storage Type ID</th><th>Contract ID</th><th>Price (₱)</th><th>Actions</th>
            </tr></thead>
            <tbody id="storageTypeTableBody"></tbody>
        </table>
    `;
    loadStorageTypes();
    document.getElementById('storageTypeForm').addEventListener("submit", handleStorageTypeForm);
}

let storageTypes = [];

function loadStorageTypes() {
    const tableBody = document.getElementById('storageTypeTableBody');
    tableBody.innerHTML = '';
    storageTypes.forEach((storage, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${storage.id}</td><td>${storage.contractId}</td><td>₱${storage.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStorageType(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStorageType(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function handleStorageTypeForm(event) {
    event.preventDefault();
    const id = document.getElementById('storageTypeId').value;
    const contractId = document.getElementById('contractId').value;
    const price = document.getElementById('storagePrice').value;

    if (id === "") {
        storageTypes.push({ id: storageTypes.length + 1, contractId, price });
    } else {
        storageTypes[id] = { id: parseInt(id) + 1, contractId, price };
    }

    document.getElementById('storageTypeForm').reset();
    document.getElementById('storageTypeId').value = "";
    loadStorageTypes();
}

function editStorageType(index) {
    document.getElementById('storageTypeId').value = index;
    document.getElementById('contractId').value = storageTypes[index].contractId;
    document.getElementById('storagePrice').value = storageTypes[index].price;
}

function deleteStorageType(index) {
    storageTypes.splice(index, 1);
    loadStorageTypes();
}
 
// Contract Page
function loadContractPage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2>Contract</h2>
        <form id="contractForm" class="mb-3">
            <input type="hidden" id="contractId">
            <div class="mb-2"><input type="date" id="contractStartDate" class="form-control" required></div>
            <div class="mb-2"><input type="date" id="contractEndDate" class="form-control" required></div>
            <div class="mb-2">
                <select id="brandPartnerId" class="form-control" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <table class="table">
            <thead>
                <tr>
                    <th>Contract ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Brand Partner ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="contractTableBody"></tbody>
        </table>
    `;
    loadContracts();
    document.getElementById('contractForm').addEventListener("submit", handleContractForm);
}
 
let contracts = [];
 
function loadContracts() {
    const tableBody = document.getElementById('contractTableBody');
    tableBody.innerHTML = '';
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
 
    contracts.forEach((contract, index) => {
        const status = contract.endDate < today ? "Expired" : "Active";
        const statusColor = status === "Expired" ? "text-danger" : "text-success";
 
        tableBody.innerHTML += `
            <tr>
                <td>${contract.id}</td>
                <td>${contract.startDate}</td>
                <td>${contract.endDate}</td>
                <td>${contract.brandPartnerId}</td>
                <td class="${statusColor}">${status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editContract(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContract(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
 
function handleContractForm(event) {
    event.preventDefault();
    const id = document.getElementById('contractId').value;
    const startDate = document.getElementById('contractStartDate').value;
    const endDate = document.getElementById('contractEndDate').value;
    const brandPartnerId = document.getElementById('brandPartnerId').value;
 
    if (id === "") {
        contracts.push({ id: contracts.length + 1, startDate, endDate, brandPartnerId });
    } else {
        contracts[id] = { id: parseInt(id) + 1, startDate, endDate, brandPartnerId };
    }
 
    document.getElementById('contractForm').reset();
    document.getElementById('contractId').value = "";
    loadContracts();
}
 
function editContract(index) {
    document.getElementById('contractId').value = index;
    document.getElementById('contractStartDate').value = contracts[index].startDate;
    document.getElementById('contractEndDate').value = contracts[index].endDate;
    document.getElementById('brandPartnerId').value = contracts[index].brandPartnerId;
}
 
function deleteContract(index) {
    contracts.splice(index, 1);
    loadContracts();
}
 
 
// Orders Page
function loadOrderPage() {
    let content = document.getElementById('content');
    content.innerHTML = `
        <h2>Orders</h2>
       
        <table class="table table-bordered mt-3" id="orders-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Total</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="orders-table-body"></tbody>
        </table>
 
        <h3>Order Details</h3>
        <table class="table table-bordered mt-3" id="order-details-table">
            <thead>
                <tr>
                    <th>Order Detail ID</th>
                    <th>Order ID</th>
                    <th>Product Barcode</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="order-details-table-body"></tbody>
        </table>
    `;
    loadOrders();
}
 
// Load Orders
function loadOrders() {
    let tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = "";
    orderHistory.forEach(order => {
        let row = `
            <tr>
                <td>${order.orderId}</td>
                <td>₱${order.total}</td>
                <td>${order.date}</td> <!-- Displaying the order date -->
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewOrderDetails(${order.orderId})">View Details</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
 
// Process Order
async function processOrder() {
    if (order.length === 0) {
        alert("No orders to process.");
        return;
    }
 
    let orderId = orderHistory.length + 1;
    let total = totalprice.toFixed(2);
    let products = order.map(o => `${o.barcode} (x${o.quantity})`).join(", ");
    let currentDate = new Date(); // Get current date
 
    orderHistory.push({ orderId, products, total, date: currentDate, details: order }); // Include details

    let createId = await createOrder({
        order_date:currentDate,
        total: total
    })
    console.log(createId)
    for(let i = 0; i<order.length;i++){
        await createOrderDetail({
            "order_id": createId,
            "product_barcode": order[i]["barcode"],
            "quantity": order[i]["quantity"],
            "price": order[i]["price"]
        })
    }
    updateOrderHistory();
 
    order = [];
    totalprice = 0;
    updateOrderHistoryTable();
    alert("Order processed successfully!");
}
 
// Update Order History Table
function updateOrderHistory() {
    let historyTable = document.getElementById('order-history');
    historyTable.innerHTML = "";
 
    orderHistory.forEach(order => {
        historyTable.innerHTML += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.products}</td>
                <td>₱${order.total}</td>
                <td>${order.date}</td> <!-- Displaying the order date -->
            </tr>
        `;
    });
}
 
// View Order Details
function viewOrderDetails(orderId) {
    console.log("Viewing details for Order ID:", orderId); // Debugging log
    let order = orderHistory.find(o => o.orderId === orderId);
    console.log(order);
    if (order) {
        let detailsTableBody = document.getElementById('order-details-table-body');
        detailsTableBody.innerHTML = ""; // Clear existing details
        order.details.forEach(detail => {
            detailsTableBody.innerHTML += `
                <tr>
                    <td>${detail.detailId}</td>
                    <td>${order.orderId}</td>
                    <td>${detail.barcode}</td>
                    <td>${detail.quantity}</td>
                    <td>₱${detail.price}</td>
                    <td>₱${detail.subtotal}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editOrderDetail(${order.orderId}, ${detail.detailId})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteOrderDetail(${order.orderId}, ${detail.detailId})">Delete</button>
                    </td>
                </tr>
            `;
        });
    } else {
        console.error("Order not found for ID:", orderId); // Debugging log
    }
}
 
// Edit Order Detail
function editOrderDetail(orderId, detailId) {
    let order = orderHistory.find(o => o.orderId === orderId);
    let detail = order.details.find(d => d.detailId === detailId);
    if (detail) {
        let quantity = prompt("Enter new quantity:", detail.quantity);
        let price = prompt("Enter new price:", detail.price);
        if (quantity !== null && price !== null) {
            if (!isNaN(quantity) && !isNaN(price) && quantity > 0 && price > 0) {
                detail.quantity = parseInt(quantity);
                detail.price = parseFloat(price);
                detail.subtotal = detail.quantity * detail.price; // Update subtotal
                loadOrders(); // Refresh orders
                viewOrderDetails(orderId); // Refresh order details
            } else {
                alert("Please enter valid numbers for quantity and price.");
            }
        }
    }
}
 
// Delete Order Detail
function deleteOrderDetail(orderId, detailId) {
    let order = orderHistory.find(o => o.orderId === orderId);
    if (order) {
        order.details = order.details.filter(d => d.detailId !== detailId);
        loadOrders(); // Refresh orders
        viewOrderDetails(orderId); // Refresh order details
    }
}
 