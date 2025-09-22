import React, { useState, useEffect, useCallback } from "react";
import { getRequest, deleteRequest } from "../services/api"; // postRequest will be used for delete
import "../App.css";
import { FaTrash } from "react-icons/fa"; // react-icons for delete icon

interface Order {
  id: string;
  stockName: string;
  side: "BUY" | "SELL";
  price: string;
  quantity: number;
}

const PendingOrders: React.FC = () => {
  const [stockName, setStockName] = useState("");
  const [side, setSide] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const params: { stockName?: string; side?: string } = {};
      if (stockName) params.stockName = stockName;
      if (side) params.side = side;

      const response = await getRequest("/orderbook", params, token || "");

      if (response && !response.Error) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching pending orders:", err);
    } finally {
      setLoading(false);
    }
  }, [stockName, side]);

  useEffect(() => {
    fetchPendingOrders();
  }, [stockName, side, fetchPendingOrders]);

  const handleDelete = async (orderId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await deleteRequest(`/orderbook/${orderId}`,token|| "");
      if (!data.Error) {
        fetchPendingOrders(); // Refresh the list
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="component-card">
      <h3 className="component-title">Pending Orders</h3>

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

      {/* Table */}
      {loading ? (
        <p>Loading pending orders...</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Side</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th> {/* Delete column */}
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.stockName}</td>
                    <td>{order.side}</td>
                    <td>${order.price}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    No pending orders
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

export default PendingOrders;
