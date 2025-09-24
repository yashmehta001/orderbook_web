import React, { useState } from "react";
import { request } from "../services/request";
import OrderResultModal from "./OrderResultModal";

interface OrderModalProps {
  isOpen: boolean;
  side: "BUY" | "SELL";
  onClose: () => void;
  reload: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  side,
  onClose,
}) => {
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [resultOpen, setResultOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultData, setResultData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        stockName,
        side,
        quantity: Number(quantity),
        price: Number(price),
      };
      const endpoint =
        side === "BUY" ? "/orderbook/buy-order" : "/orderbook/sell-order";

      const response = await request({
        method: "POST",
        url: endpoint,
        data: payload,
      });

      if (response && response.Error === false) {
        setResultData(response.data);
        setResultOpen(true);
          console.log("Order placed successfully:", resultData);
          console.log("resultOpen:", resultOpen);
        // Refresh parent state (orderbook, etc.)
        // reload();

        // Reset input fields
        handleReset();

        // Do NOT close main modal yet – let user see result first
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const handleReset = () => {
    setStockName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          <h2 className="modal-title">
            Place {side === "BUY" ? "Buy" : "Sell"} Order
          </h2>

          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="stockName">Stock</label>
            <input
              id="stockName"
              type="text"
              placeholder="Enter stock name"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              required
            />

            <label htmlFor="side">Side</label>
            <input id="side" type="text" value={side} disabled />

            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <div className="modal-buttons">
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="place-order-btn"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <OrderResultModal
        isOpen={resultOpen}
        data={resultData}
        onClose={() => {
          setResultOpen(false);
          onClose(); // close parent modal after result modal
        }}
      />
    </>
  );
};

export default OrderModal;
