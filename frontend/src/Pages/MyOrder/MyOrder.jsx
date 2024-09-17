import React, { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
          alert("User not logged in. Please log in first.");
          return;
        }

        const response = await fetch('http://localhost:4000/api/v1/myOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const result = await response.json();
        if (response.ok) {
          setOrders(result.orders);  // Set the list of orders received from backend
        } else {
          alert(result.message || "Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Error fetching orders. Please try again later.");
      } finally {
        setLoading(false);  // Stop loading whether the request is successful or failed
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="container">
        <h3>You have no previous orders.</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>My Orders</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Details</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {order.order_data.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <strong>{item.name}</strong> - Qty: {item.qty} - Size: {item.size}
                    </div>
                  ))}
                </td>
                <td>{order.order_date.split(" ")[0]}</td> {/* Extract date from formatted date */}
                <td>{order.order_date.split(" ")[1]}</td> {/* Extract time from formatted date */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
