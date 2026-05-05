import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/api";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductDetail(id).then((res) => {
            setProduct(res.data);
        });
    }, [id]);

    if (!product) return <p > Loading... < /p>;

    return ( <
        div >
        <
        h2 > { product.name } < /h2>

        <
        img src = { `http://localhost:5000${product.image}` }
        alt = { product.name }
        width = "200" /
        >

        <
        p > { product.description } < /p> <
        p > Price: ₹{ product.price } < /p> <
        p > SKU: { product.sku } < /p> <
        p > Available: { product.availability ? "Yes" : "No" } < /p> <
        /div>
    );
}