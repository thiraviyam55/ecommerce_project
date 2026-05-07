import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: 10, margin: 10 }
        }
        onClick = {
            () => navigate(`/product/${product.id}`)
        } >
        <
        img src = { `https://ecommerce-project-3zgl.onrender.com${product.image}` }
        alt = { product.name }
        width = "120" /
        >
        <
        h3 > { product.name } < /h3> <
        p > ₹{ product.price } < /p> < /
        div >
    );
}