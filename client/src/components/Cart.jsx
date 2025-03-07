import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !user.token) return;
        
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/cart", {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setCart(res.data.products);
                console.log(res.data)
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

    if (!user) return <p>Please log in to view your cart.</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>No products in cart.</p> : (
                cart.map(item => (
                    <div key={item.productId._id} style={{ border: "1px solid black", padding: "10px" }}>
                       
                        <h3>{item.productId.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
