import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/customers/${id}`)
      .then(res => setCustomer(res.data.data));

    axios.get(`http://localhost:5000/api/customers/${id}/addresses`)
      .then(res => setAddresses(res.data.data));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>{customer.first_name} {customer.last_name}</h2>
      <p>📞 {customer.phone_number}</p>
      <h3>Addresses:</h3>
      <ul>
        {addresses.map(a => (
          <li key={a.id}>{a.address_details}, {a.city}, {a.state}, {a.pin_code}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetailPage;
