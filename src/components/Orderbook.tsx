import React, { useState, useEffect } from "react";
import { getRequest } from "../services/api"; // your reusable API function
import "../App.css";

interface Order {
  stockName: string;
  price: number;
  quantity: number;
}

interface OrderbookData {
  BUY: Order[];
  SELL: Order[];
}

const Orderbook: React.FC = () => {
  const [stockName, setStockName] = useState("");
  const [side, setSide] = useState("");
  const [orders, setOrders] = useState<OrderbookData>({ BUY: [], SELL: [] });
  const [loading, setLoading] = useState(false);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const params: { stockName?: string; side?: string } = {};
      if (stockName) params.stockName = stockName;
      if (side) params.side = side;

      const response = await getRequest("/orderbook/order-books", params, token || "");

      if (response && !response.Error) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching orderbook:", err);
    } finally {
      setLoading(false);
    }
  }, [stockName, side]);

  // Fetch orders whenever stockName or side changes
  useEffect(() => {
    fetchOrders();
  }, [stockName, side, fetchOrders]);

  return (
    <div className="component-card">
      <h3 className="component-title">Orderbook</h3>

      {/* Filters */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          className="auth-input"
        />
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="auth-input"
        >
          <option value="">All</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orderbook-container">
          {/* BUY Orders */}
          <div className="orderbook-section">
            <h4 className="font-semibold text-gray-700 mb-2">BUY Orders</h4>
            <div className="order-list">
              {orders.BUY.length ? (
                orders.BUY.map((order, idx) => (
                  <div key={idx} className="order-row">
                    <span>{order.stockName}</span>
                    <span>${order.price}</span>
                    <span>{order.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No BUY orders</p>
              )}
            </div>
          </div>

          {/* SELL Orders */}
          <div className="orderbook-section mt-3">
            <h4 className="font-semibold text-gray-700 mb-2">SELL Orders</h4>
            <div className="order-list">
              {orders.SELL.length ? (
                orders.SELL.map((order, idx) => (
                  <div key={idx} className="order-row">
                    <span>{order.stockName}</span>
                    <span>${order.price}</span>
                    <span>{order.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No SELL orders</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderbook;
