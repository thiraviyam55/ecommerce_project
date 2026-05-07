import { useState, useEffect } from "react";
import { searchProducts } from "../api/api";

export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    const fetchProducts = async(q) => {
        const res = await searchProducts(q);
        setProducts(res.data.data);
    };

    useEffect(() => {
        fetchProducts("");
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchProducts(value);
    };

    return ( <
        div className = "p-6" >
        <
        h2 className = "text-xl font-bold mb-4" > Products < /h2>

        <
        input className = "border p-2 w-full mb-4 rounded"
        placeholder = "Search products..."
        value = { query }
        onChange = { handleSearch }
        />

        <
        div className = "grid grid-cols-3 gap-4" > {
            products.map((p) => ( <
                div key = { p.id }
                className = "border p-4 rounded shadow" >
                <
                img src = { `https://ecommerce-project-3zgl.onrender.com${p.image}` }
                alt = { p.name }
                className = "w-full h-40 object-cover" /
                >
                <
                h3 className = "font-bold mt-2" > { p.name } < /h3> <
                p > ₹{ p.price } < /p> < /
                div >
            ))
        } <
        /div> < /
        div >
    );
}