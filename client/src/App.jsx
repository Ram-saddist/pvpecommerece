import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";


const App = () => {
  return (

    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </AuthProvider>
    </Router>

  );
};

export default App;
