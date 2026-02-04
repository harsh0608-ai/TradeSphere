import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const context = useContext(GeneralContext);

  const fetchOrders = () => {
    axios.get("http://localhost:3000/allOrders", {
      withCredentials: true
    }).then((response) => {
      setAllOrders(response.data);
    }).catch(error => {
      console.error("Error fetching orders:", error);
    });
  };

  useEffect(() => {
    // Fetch orders on component mount
    fetchOrders();

    // Register refresh function with context
    if (context && context.setRefreshOrders) {
      context.setRefreshOrders(fetchOrders);
    }

    return () => {
      // Cleanup
      if (context && context.setRefreshOrders) {
        context.setRefreshOrders(null);
      }
    };
  }, [context]);

  if (allOrders.length > 0) {
    return (
      <div className="order-table">
        <h2 className="text-muted">Your Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>₹{parseFloat(order.price).toFixed(2)}</td>
                <td>
                  <span
                    style={{
                      backgroundColor: order.mode === "BUY" ? "#4CAF50" : "#FF5252",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    {order.mode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;