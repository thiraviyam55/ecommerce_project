import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { searchProducts } from '../api/api';

export default function SearchPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Products
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

    // ✅ Initial Product Load
    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ Search Handler
    const handleSearch = (e) => {
        const value = e.target.value;

        setQuery(value);

        fetchProducts(value);
    };

    return ( <
        div className = 'min-h-screen bg-gray-100' > { /* HEADER */ } <
        header className = 'bg-white shadow sticky top-0 z-50' >
        <
        div className = 'max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4' > { /* LOGO */ } <
        h1 className = 'text-3xl font-bold text-indigo-600' >
        Product Store <
        /h1>

        { /* SEARCH BAR */ } <
        div className = 'relative w-full md:max-w-md' >
        <
        Search size = { 18 }
        className = 'absolute left-3 top-3 text-gray-400' /
        >

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

        { /* HERO SECTION */ } <
        section className = 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16' >
        <
        div className = 'max-w-7xl mx-auto px-4' >
        <
        h2 className = 'text-4xl md:text-5xl font-bold mb-4' >
        Discover Amazing Products <
        /h2>

        <
        p className = 'text-lg opacity-90 max-w-2xl' >
        Browse and explore products with a clean modern ecommerce experience. <
        /p> < /
        div > <
        /section>

        { /* PRODUCT SECTION */ } <
        div className = 'max-w-7xl mx-auto px-4 py-10' > { /* LOADING */ } {
            loading ? ( <
                div className = 'flex items-center justify-center py-20' >
                <
                div className = 'text-xl font-semibold text-gray-600' >
                Loading products... <
                /div> < /
                div >
            ) : products.length === 0 ? (
                /* EMPTY */
                <
                div className = 'text-center py-20' >
                <
                h3 className = 'text-2xl font-semibold text-gray-600' >
                No Products Found <
                /h3>

                <
                p className = 'text-gray-400 mt-2' >
                Try searching with another keyword. <
                /p> < /
                div >
            ) : (
                /* PRODUCT GRID */
                <
                div className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' > {
                    products.map((product) => ( <
                        div key = { product.id }
                        className = 'bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group' > { /* IMAGE */ } <
                        div className = 'h-60 overflow-hidden bg-gray-100' >
                        <
                        img src = { `https://ecommerce-project-3zgl.onrender.com${product.image}` }
                        alt = { product.name }
                        className = 'w-full h-full object-cover group-hover:scale-105 transition duration-300' /
                        >
                        <
                        /div>

                        { /* CONTENT */ } <
                        div className = 'p-5' >
                        <
                        h3 className = 'text-lg font-bold text-gray-800 line-clamp-1' > { product.name } <
                        /h3>

                        <
                        div className = 'flex items-center justify-between mt-4' > { /* PRICE */ } <
                        p className = 'text-2xl font-bold text-indigo-600' > ₹{ product.price } <
                        /p>

                        { /* STOCK */ } <
                        span className = { `px-3 py-1 rounded-full text-xs font-medium ${
                        product.availability
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }` } > {
                            product.availability ?
                            'In Stock' : 'Out of Stock'
                        } <
                        /span> < /
                        div >

                        { /* BUTTON */ } <
                        button onClick = {
                            () =>
                            navigate(`/product/${product.id}`)
                        }
                        className = 'w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition' >
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