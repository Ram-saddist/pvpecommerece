import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.token) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/cart", {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setCart(res.data.products);
            } catch (error) {
                console.error("Error fetching cart", error);
            }
        };

        fetchCart();
    }, [user]);

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCart(cart.filter(item => item.productId._id !== productId));
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    const handleCheckout = () => {
        navigate("/checkout", { state: { cart } });
    };

    if (!user) return <p>Please log in to view your cart.</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>No products in cart.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item.productId._id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                            <h3>{item.productId.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price per Item: Rs{item.productId.price.toFixed(2)}</p>
                            <p>Total Price: Rs{(item.quantity * item.productId.price).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total Cart Price: Rs.{totalPrice.toFixed(2)}</h3>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
