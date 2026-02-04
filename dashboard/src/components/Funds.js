import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Funds.css";

const Funds = () => {
  const [fundsData, setFundsData] = useState({
    availableMargin: 4043.10,
    usedMargin: 3757.30,
    availableCash: 4043.10,
    openingBalance: 4043.10,
    closingBalance: 3736.40,
    payin: 4064.00,
    span: 0.00,
    deliveryMargin: 0.00,
    exposure: 0.00,
    optionsPremium: 0.00,
    collateralLiquid: 0.00,
    collateralEquity: 0.00,
    totalCollateral: 0.00,
  });

  useEffect(() => {
    // Fetch funds data from backend
    fetchFundsData();
  }, []);

  const fetchFundsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/funds");
      if (response.data) {
        setFundsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching funds data:", error);
      // Use default values on error
    }
  };

  return (
    <>
      <div className="funds-header">
        <div className="funds-info">
          <p>Instant, zero-cost fund transfers with UPI</p>
        </div>
        <div className="funds-buttons">
          <Link className="btn btn-green">Add funds</Link>
          <Link className="btn btn-blue">Withdraw</Link>
        </div>
      </div>

      <div className="funds-container">
        <div className="funds-col">
          <div className="funds-section-header">
            <h3>Equity</h3>
          </div>

          <div className="funds-summary">
            <div className="summary-card">
              <div className="summary-label">Available margin</div>
              <div className="summary-value colored">
                ₹{fundsData.availableMargin.toFixed(2)}
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Used margin</div>
              <div className="summary-value">₹{fundsData.usedMargin.toFixed(2)}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Available cash</div>
              <div className="summary-value">₹{fundsData.availableCash.toFixed(2)}</div>
            </div>
          </div>

          <div className="funds-table">
            <div className="table-section">
              <div className="table-title">Balance</div>
              <div className="table-row">
                <span className="table-label">Opening Balance</span>
                <span className="table-value">₹{fundsData.openingBalance.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">Closing Balance</span>
                <span className="table-value">₹{fundsData.closingBalance.toFixed(2)}</span>
              </div>
            </div>

            <div className="table-divider"></div>

            <div className="table-section">
              <div className="table-title">Charges</div>
              <div className="table-row">
                <span className="table-label">Payin</span>
                <span className="table-value">₹{fundsData.payin.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">SPAN</span>
                <span className="table-value">₹{fundsData.span.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">Delivery margin</span>
                <span className="table-value">₹{fundsData.deliveryMargin.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">Exposure</span>
                <span className="table-value">₹{fundsData.exposure.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">Options premium</span>
                <span className="table-value">₹{fundsData.optionsPremium.toFixed(2)}</span>
              </div>
            </div>

            <div className="table-divider"></div>

            <div className="table-section">
              <div className="table-title">Collateral</div>
              <div className="table-row">
                <span className="table-label">Liquid funds</span>
                <span className="table-value">₹{fundsData.collateralLiquid.toFixed(2)}</span>
              </div>
              <div className="table-row">
                <span className="table-label">Equity</span>
                <span className="table-value">₹{fundsData.collateralEquity.toFixed(2)}</span>
              </div>
              <div className="table-row total">
                <span className="table-label">Total Collateral</span>
                <span className="table-value">₹{fundsData.totalCollateral.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="funds-col">
          <div className="commodity-card">
            <div className="commodity-icon">📊</div>
            <p className="commodity-text">You don't have a commodity account</p>
            <Link className="btn btn-blue btn-large">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;