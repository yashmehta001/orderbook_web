import React, { useState, useEffect } from "react";
import { getRequest } from "../services/api";
import "../App.css";

interface Order {
  id: string;
  stockName: string;
  side: "BUY" | "SELL";
  price: string;
  quantity: number;
  createdAt: string;
}

interface Transaction {
  transactionId: string;
  orders: Order[];
}

const OrderHistory: React.FC = () => {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await getRequest("/order-history", {}, token || "");
      if (response && !response.Error) {
        setHistory(response.data);
      }
    } catch (err) {
      console.error("Error fetching order history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="component-card">
      <h3 className="component-title">Order History</h3>

      {loading ? (
        <p>Loading order history...</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Stock</th>
                <th>Side</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.length ? (
                history.map((txn) =>
                  txn.orders.map((order, index) => (
                    <tr key={order.id}>
                      {index === 0 && (
                        <td rowSpan={txn.orders.length}>
                          {txn.transactionId.slice(0, 6)}
                        </td>
                      )}
                      <td>{order.stockName}</td>
                      <td>{order.side}</td>
                      <td>${order.price}</td>
                      <td>{order.quantity}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500">
                    No order history
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
