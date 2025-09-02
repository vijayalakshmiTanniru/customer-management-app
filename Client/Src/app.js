import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Customers</Link> | <Link to="/new">Add Customer</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/new" element={<CustomerFormPage />} />
        <Route path="/edit/:id" element={<CustomerFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
