import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Summary = () => {
  const [cookies] = useCookies([]);
  const [username, setUsername] = useState("");
  const [fundsData, setFundsData] = useState(null);
  const [holdingsData, setHoldingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Get username from token verification
      const verifyRes = await axios.post(
        "http://localhost:3000/verify",
        {},
        { withCredentials: true }
      );
      if (verifyRes.data.status) {
        setUsername(verifyRes.data.user);
      }

      // Get funds data with credentials
      const fundsRes = await axios.get("http://localhost:3000/funds", {
        withCredentials: true
      });
      setFundsData(fundsRes.data);

      // Get holdings data with credentials
      const holdingsRes = await axios.get("http://localhost:3000/allHoldings", {
        withCredentials: true
      });
      setHoldingsData(holdingsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  const totalInvested = holdingsData.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );
  const totalCurrent = holdingsData.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent =
    totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : 0;
  return (
    <>
      <div className="username">
        <h6>{username ? `Welcome, ${username}` : "Loading..."}</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{fundsData?.availableMargin?.toFixed(2) || "0.00"}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{fundsData?.usedMargin?.toFixed(2) || "0"}</span>
            </p>
            <p>
              Opening balance <span>₹{fundsData?.openingBalance?.toFixed(2) || "0"}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingsData.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              ₹{Math.abs(totalPnL).toFixed(2)}{" "}
              <small>{totalPnL >= 0 ? "+" : ""}{totalPnLPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{totalCurrent.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{totalInvested.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;