import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerFormPage() {
  const [form, setForm] = useState({ first_name: "", last_name: "", phone_number: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/customers", form)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Customer</h2>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
      <input name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}

export default CustomerFormPage;
