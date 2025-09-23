import React, { useState, useEffect } from "react";
import { request } from "../services/request";
import OrderModal from "./OrderModal";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">("BUY");

  const handleOpenModal = (side: "BUY" | "SELL") => {
    setOrderSide(side);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handlePlaceOrder = (order: {
    stockName: string;
    side: "BUY" | "SELL";
    quantity: number;
    price: number;
  }) => {
    console.log("Order placed:", order);
    // 🚀 Later you can call your API here
  };

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await request<{
        Error: boolean;
        data: OrderbookData;
      }>({
        method: "GET",
        url: "/orderbook/order-books",
        data: {
          stockName: stockName || undefined,
          side: side || undefined,
        },
        showToast: false,
      });

      if (response && !response.Error) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching orderbook:", err);
    } finally {
      setLoading(false);
    }
  }, [stockName, side]);

  useEffect(() => {
    fetchOrders();
  }, [stockName, side, fetchOrders]);

  return (
    <div className="component-card">
      {/* Header with buttons */}
      <div className="component-header">
        <h3 className="component-title">Orderbook</h3>
        <div className="button-group">
          <button
            onClick={() => handleOpenModal("BUY")}
            className="btn btn-buy"
          >
            Buy
          </button>
          <button
            onClick={() => handleOpenModal("SELL")}
            className="btn btn-sell"
          >
            Sell
          </button>
        </div>
      </div>

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
      <OrderModal
        isOpen={isModalOpen}
        side={orderSide}
        onClose={handleCloseModal}
        onSubmit={handlePlaceOrder}
      />
    </div>
  );
};

export default Orderbook;
