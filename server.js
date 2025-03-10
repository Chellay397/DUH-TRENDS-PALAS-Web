require('dotenv').config();

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const employeeRoutes = require('./routes/employeeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailsRoutes = require('./routes/orderDetailsRoutes');
const productRoutes = require('./routes/productRoutes');
const brandpartnerRoutes = require('./routes/brandpartnerRoutes');
const contractRoutes = require('./routes/contractRoutes');
const storagetypeRoutes = require('./routes/storagetypeRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders:"Content-Type,Authorization",
  credentials:true
}));

app.use('/api/employee',employeeRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/orderDetails',orderDetailsRoutes);
app.use('/api/product',productRoutes);
app.use('/api/brandpartner',brandpartnerRoutes);
app.use('/api/contract',contractRoutes);
app.use('/api/storagetype',storagetypeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});