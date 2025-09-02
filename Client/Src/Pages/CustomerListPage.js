import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then(res => setCustomers(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            <Link to={`/customers/${c.id}`}>
              {c.first_name} {c.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerListPage;
