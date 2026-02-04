import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ stockData }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(stockData.price);
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(GeneralContext);

  const handleSellClick = async () => {
    try {
      setErrorMessage("");

      // Validate quantity
      if (parseInt(stockQuantity) > stockData.qty) {
        setErrorMessage(`Cannot sell more than ${stockData.qty} shares`);
        return;
      }

      if (parseInt(stockQuantity) <= 0) {
        setErrorMessage("Quantity must be greater than 0");
        return;
      }

      const response = await axios.post("http://localhost:3000/newOrder", {
        name: stockData.name,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        // Refresh holdings after successful sell
        if (context.refreshHoldings) {
          context.refreshHoldings();
        }
        // Refresh orders after successful sell
        if (context.refreshOrders) {
          context.refreshOrders();
        }
        context.closeSellWindow();
      }
    } catch (error) {
      console.error("Error placing sell order:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error placing sell order");
      }
    }
  };

  const handleCancelClick = () => {
    context.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4 style={{ color: "#cc5858", marginBottom: "10px" }}>
          Sell {stockData.name}
        </h4>

        {errorMessage && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </div>
        )}

        <div className="inputs">
          <fieldset>
            <legend>Available Qty: {stockData.qty}</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              max={stockData.qty}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price (Current: ₹{stockData.price.toFixed(2)})</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#666",
            padding: "8px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <p>
            <strong>Avg Cost:</strong> ₹{stockData.avg.toFixed(2)}
          </p>
          <p>
            <strong>Est. Amount:</strong> ₹
            {(stockQuantity * stockPrice).toFixed(2)}
          </p>
          <p>
            <strong>Est. P&L:</strong>{" "}
            <span style={{ color: stockPrice > stockData.avg ? "green" : "red" }}>
              ₹{((stockPrice - stockData.avg) * stockQuantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <div className="buttons">
        <span>Current Price ₹{stockData.price.toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
