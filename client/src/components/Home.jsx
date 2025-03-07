import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        if (!user || !user.token) {
            alert("Please log in to add to cart");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/cart/add", { productId }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert("Product added to cart!");
            navigate("/cart")
        } catch (error) {
            console.log(error)
            console.error("Error adding to cart", error.response?.data?.message);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {products.map(product => (
                    <div key={product._id} style={{ border: "1px solid black", padding: "10px" }}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Rs.{product.price}</p>
                        <p><img src={product.imageUrl} alt={product.name} /></p>
                        {user && user.role === "user" && (
                            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
