import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import VerticalGraph from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const context = useContext(GeneralContext);

  const fetchHoldings = () => {
    axios.get("http://localhost:3000/allHoldings", {
      withCredentials: true
    }).then((response) => {
      setAllHoldings(response.data);
    }).catch(error => {
      console.error("Error fetching holdings:", error);
    });
  };

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  useEffect(() => {
    // Fetch holdings on component mount
    fetchHoldings();

    // Register refresh function with context
    if (context && context.setRefreshHoldings) {
      context.setRefreshHoldings(fetchHoldings);
    }

    return () => {
      // Cleanup
      if (context && context.setRefreshHoldings) {
        context.setRefreshHoldings(null);
      }
    };
  }, [context]);

  // Calculate totals
  const totalInvestment = allHoldings.reduce((sum, stock) => {
    return sum + (stock.avg * stock.qty);
  }, 0);

  const currentValue = allHoldings.reduce((sum, stock) => {
    return sum + (stock.price * stock.qty);
  }, 0);

  const profitLoss = currentValue - totalInvestment;
  const profitLossPercent = totalInvestment > 0 ? ((profitLoss / totalInvestment) * 100).toFixed(2) : 0;
  const isProfitable = profitLoss >= 0;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
            <th>Action</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
                <td>
                  <button
                    onClick={() => context.openSellWindow(stock)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#ff0000",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2).split('.')[0]}.<span>{totalInvestment.toFixed(2).split('.')[1]}</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currentValue.toFixed(2).split('.')[0]}.<span>{currentValue.toFixed(2).split('.')[1]}</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={isProfitable ? "profit" : "loss"}>
            {Math.abs(profitLoss).toFixed(2)} ({isProfitable ? '+' : '-'}{profitLossPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>

  );
};

export default Holdings;