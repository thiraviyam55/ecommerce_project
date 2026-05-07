import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { searchProducts } from '../api/api';

export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async(search = '') => {
        try {
            setLoading(true);

            const response = await searchProducts(search);

            setProducts(response.data.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;

        setQuery(value);

        fetchProducts(value);
    };

    return ( <
        div className = 'min-h-screen bg-gray-100' > { /* Header */ } <
        header className = 'bg-white shadow-sm sticky top-0 z-50' >
        <
        div className = 'max-w-7xl mx-auto px-4 py-4 flex items-center justify-between' >
        <
        h1 className = 'text-2xl font-bold text-indigo-600' >
        Product Store <
        /h1>

        <
        div className = 'relative w-full max-w-md' >
        <
        Search className = 'absolute left-3 top-3 text-gray-400'
        size = { 18 }
        />

        <
        input type = 'text'
        placeholder = 'Search products...'
        value = { query }
        onChange = { handleSearch }
        className = 'w-full border border-gray-300 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500' /
        >
        <
        /div> < /
        div > <
        /header>

        { /* Banner */ } <
        section className = 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14' >
        <
        div className = 'max-w-7xl mx-auto px-4' >
        <
        h2 className = 'text-4xl font-bold mb-3' >
        Discover Amazing Products <
        /h2>

        <
        p className = 'text-lg opacity-90' >
        Search and explore products instantly. <
        /p> < /
        div > <
        /section>

        { /* Product Grid */ } <
        div className = 'max-w-7xl mx-auto px-4 py-10' > {
            loading ? ( <
                div className = 'text-center text-lg font-semibold' >
                Loading products... <
                /div>
            ) : products.length === 0 ? ( <
                div className = 'text-center text-gray-500 text-lg' >
                No products found. <
                /div>
            ) : ( <
                div className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' > {
                    products.map((product) => ( <
                        div key = { product.id }
                        className = 'bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300' >
                        <
                        div className = 'h-56 overflow-hidden bg-gray-100' >
                        <
                        img src = { `https://ecommerce-project-3zgl.onrender.com${product.image}` }
                        alt = { product.name }
                        className = 'w-full h-full object-cover hover:scale-105 transition duration-300' /
                        >
                        <
                        /div>

                        <
                        div className = 'p-4' >
                        <
                        h3 className = 'text-lg font-semibold line-clamp-1' > { product.name } <
                        /h3>

                        <
                        div className = 'flex items-center justify-between mt-3' >
                        <
                        p className = 'text-indigo-600 text-xl font-bold' > ₹{ product.price } <
                        /p>

                        <
                        span className = { `px-3 py-1 rounded-full text-xs font-medium ${
                        product.availability
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }` } > { product.availability ? 'In Stock' : 'Out of Stock' } <
                        /span> < /
                        div >

                        <
                        button className = 'w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition' >
                        View Details <
                        /button> < /
                        div > <
                        /div>
                    ))
                } <
                /div>
            )
        } <
        /div> < /
        div >
    );
}