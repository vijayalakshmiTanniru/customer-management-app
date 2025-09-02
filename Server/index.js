const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  console.log('✅ Connected to SQLite DB');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    address_details TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers(id)
  )`);
});

// ---------------- API ROUTES ----------------

// Get all customers
app.get('/api/customers', (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ data: rows });
  });
});

// Get single customer
app.get('/api/customers/:id', (req, res) => {
  db.get("SELECT * FROM customers WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ data: row });
  });
});

// Create new customer
app.post('/api/customers', (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  db.run(
    `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`,
    [first_name, last_name, phone_number],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  db.run(
    `UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`,
    [first_name, last_name, phone_number, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updatedID: req.params.id });
    }
  );
});

// Delete customer
app.delete('/api/customers/:id', (req, res) => {
  db.run(`DELETE FROM customers WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: req.params.id });
  });
});

// Get addresses by customer
app.get('/api/customers/:id/addresses', (req, res) => {
  db.all("SELECT * FROM addresses WHERE customer_id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ data: rows });
  });
});

// Add address
app.post('/api/customers/:id/addresses', (req, res) => {
  const { address_details, city, state, pin_code } = req.body;
  db.run(
    `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`,
    [req.params.id, address_details, city, state, pin_code],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Update address
app.put('/api/addresses/:addressId', (req, res) => {
  const { address_details, city, state, pin_code } = req.body;
  db.run(
    `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`,
    [address_details, city, state, pin_code, req.params.addressId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updatedID: req.params.addressId });
    }
  );
});

// Delete address
app.delete('/api/addresses/:addressId', (req, res) => {
  db.run(`DELETE FROM addresses WHERE id = ?`, [req.params.addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: req.params.addressId });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
