import React, { useState } from "react";

interface OrderModalProps {
  isOpen: boolean;
  side: "BUY" | "SELL";
  onClose: () => void;
  onSubmit: (order: {
    stockName: string;
    side: "BUY" | "SELL";
    quantity: number;
    price: number;
  }) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  side,
  onClose,
  onSubmit,
}) => {
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ stockName, side, quantity, price });
    onClose();
  };

  const handleReset = () => {
    setStockName("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">
          Place {side === "BUY" ? "Buy" : "Sell"} Order
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Stock Name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            required
          />

          <input type="text" value={side} disabled />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
  );
};

export default OrderModal;
