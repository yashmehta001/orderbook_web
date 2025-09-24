import React from "react";

interface OrderResultModalProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onClose: () => void;
}

const OrderResultModal: React.FC<OrderResultModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  if (!isOpen || !data) {
    console.log("OrderResultModal: Not open or no data");
    return null
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Order Result</h2>

        {/* ✅ Summary Section */}
        <div className="modal-summary">
          {data.totalStockBought !== undefined && (
            <p>
              <strong>Total Bought:</strong> {data.totalStockBought}
            </p>
          )}
          {data.totalStockSold !== undefined && (
            <p>
              <strong>Total Sold:</strong> {data.totalStockSold}
            </p>
          )}
          {data.fundsSpent !== undefined && (
            <p>
              <strong>Funds Spent:</strong> ${Number(data.fundsSpent).toFixed(2)}
            </p>
          )}
          {data.fundsAdded !== undefined && (
            <p>
              <strong>Funds Added:</strong> ${Number(data.fundsAdded).toFixed(2)}
            </p>
          )}
        </div>

        {/* ✅ Trades Table */}
        <div
          className="table-container"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.trades?.length ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.trades.map((trade: any, idx: number) => (
                  <tr key={idx}>
                    <td>{trade.stockName}</td>
                    <td>${Number(trade.price).toFixed(2)}</td>
                    <td>{trade.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500">
                    No trades
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Close Button */}
        <div className="modal-buttons">
          <button onClick={onClose} className="place-order-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderResultModal;
