import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='login'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    // Validate email and cart data before making the API request
    if (!userEmail) {
      alert("User not logged in. Please log in first.");
      return;
    }

    if (!data || data.length === 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      let response = await fetch("http://localhost:4000/api/v1/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,  // Cart data
          email: userEmail,
          order_date: new Date().toDateString()  // Current date
        })
      });

      const result = await response.json();  // Parse the response
      if (!response.ok) {
        console.error("Failed to place order:", result.message);
        alert("Failed to place order: " + result.message);
        return;
      }

      // Handle successful order placement
      console.log("Checkout response:", result);
      dispatch({ type: "DROP" });  // Clear the cart after successful checkout
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
