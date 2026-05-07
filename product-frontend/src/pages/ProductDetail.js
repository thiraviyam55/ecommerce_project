import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/api';

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async() => {
        try {
            const response = await getProductDetail(id);

            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return ( <
            div className = 'p-10 text-center text-xl' >
            Loading... <
            /div>
        );
    }

    return ( <
            div className = 'min-h-screen bg-gray-100 py-10' >
            <
            div className = 'max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-10' >

            { /* IMAGE */ } <
            div className = 'bg-gray-100' >
            <
            img src = { `https://ecommerce-project-3zgl.onrender.com${product.image}` }
            alt = { product.name }
            className = 'w-full h-full object-cover' /
            >
            <
            /div>

            { /* CONTENT */ } <
            div className = 'p-8' >
            <
            h1 className = 'text-4xl font-bold text-gray-800 mb-4' > { product.name } <
            /h1>

            <
            p className = 'text-gray-600 leading-7 mb-6' > { product.description } <
            /p>

            <
            div className = 'space-y-4' >
            <
            div >
            <
            span className = 'text-gray-500' > Price: < /span>

            <
            p className = 'text-3xl font-bold text-indigo-600' > ₹{ product.price } <
            /p> < /
            div >

            <
            div >
            <
            span className = 'font-semibold' > SKU: < /span>{' '} { product.sku } < /
            div >

            <
            div >
            <
            span className = 'font-semibold' > Availability: < /span>{' '} {
            product.availability ?
            'In Stock' :
            'Out of Stock'
        } <
        /div> < /
        div >

        <
        button className = 'mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition' >
        Add to Cart <
        /button> < /
        div > <
        /div> < /
        div >
);
}