import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (stockData) => {},
  closeSellWindow: () => {},
  refreshHoldings: () => {},
  setRefreshHoldings: (callback) => {},
  refreshOrders: () => {},
  setRefreshOrders: (callback) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockData, setSelectedStockData] = useState(null);
  const [refreshHoldings, setRefreshHoldings] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (stockData) => {
    setIsSellWindowOpen(true);
    setSelectedStockData(stockData);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockData(null);
  };

  const handleRefreshHoldings = () => {
    if (refreshHoldings) {
      refreshHoldings();
    }
  };

  const handleRefreshOrders = () => {
    if (refreshOrders) {
      refreshOrders();
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshHoldings: handleRefreshHoldings,
        setRefreshHoldings: setRefreshHoldings,
        refreshOrders: handleRefreshOrders,
        setRefreshOrders: setRefreshOrders,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow stockData={selectedStockData} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
