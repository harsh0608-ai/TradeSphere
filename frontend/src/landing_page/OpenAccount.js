import React from 'react';

function OpenAccount() {
    return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a Tradesphere account</h1>
        <p className="fs-5 mb-5 text-secondary">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={() => {window.location.href = 'http://localhost:3002/signup';}}
        >
          Sign up Now
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;