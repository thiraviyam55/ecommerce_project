import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/api';

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async() => {
        const response = await getProductDetails(id);

        setProduct(response.data);
    };

    if (!product) {
        return <div className = 'p-10' > Loading... < /div>;
    }

    return ( <
        div className = 'max-w-6xl mx-auto p-6' >
        <
        div className = 'grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl overflow-hidden' >

        <
        div className = 'bg-gray-100' >
        <
        img src = { `https://YOUR-BACKEND-URL.onrender.com${product.image}` }
        alt = { product.name }
        className = 'w-full h-full object-cover' /
        >
        <
        /div>

        <
        div className = 'p-8' >
        <
        h1 className = 'text-4xl font-bold mb-4' > { product.name } <
        /h1>

        <
        p className = 'text-gray-600 mb-6' > { product.description } <
        /p>

        <
        div className = 'space-y-3' >
        <
        p className = 'text-2xl font-bold text-indigo-600' > ₹{ product.price } <
        /p>

        <
        p >
        <
        span className = 'font-semibold' > SKU: < /span> {product.sku} < /
        p >

        <
        p >
        <
        span className = 'font-semibold' > Availability: < /span>{' '} { product.availability ? 'In Stock' : 'Out of Stock' } < /
        p > <
        /div>

        <
        button className = 'mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl' >
        Add to Cart <
        /button> < /
        div > <
        /div> < /
        div >
    );
}