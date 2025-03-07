import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const stripePromise = loadStripe("pk_test_51MOH8zSB0s2EMORR1S7r29neT4EL162r7P5EmVbS71UAcHp55KqfBGfT0b5JbJdHKUuLlhlcNtfvO7mLOLb9lmQW00OSfFmdcL");

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
