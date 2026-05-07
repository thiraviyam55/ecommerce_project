const BASE_URL = 'https://ecommerce-project-3zgl.onrender.com/api';

export const searchProducts = async(q) => {
    const res = await fetch(`${BASE_URL}/product?q=${q}`);
    console.log("ad")
    return res.json();
};

export const getProductDetail = async(id) => {
    const res = await fetch(`${BASE_URL}/product/${id}`);
    return res.json();
};