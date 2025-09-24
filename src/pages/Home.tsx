import React from "react";
import Orderbook from "../components/Orderbook";
import PendingOrders from "../components/PendingOrders";
import OrderHistory from "../components/OrderHistory";

interface HomeProps {
    isLoggedIn: boolean;
    reload: () => void
}

const Home: React.FC<HomeProps> = ({ isLoggedIn ,reload}) => {
  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <div className="auth-card text-center">
          <h1 className="text-2xl font-bold text-gray-800">Start Trading</h1>
          <p className="text-gray-600 mt-2">
            Create an account or login to start trading.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-left">
        <Orderbook  reload={reload}/>
      </div>
      <div className="home-right">
        <div className="home-right-top">
          <PendingOrders />
        </div>
        <div className="home-right-bottom">
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
