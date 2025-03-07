import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ display: "flex", gap: "15px", padding: "10px" }}>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    {user && user.role === "user" && <Link to="/cart">Cart</Link>}
                    {user.role === "admin" && <Link to="/add-product">Add Product</Link>}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
};

export default Navigation;
