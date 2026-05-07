import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetail';

function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route path = '/'
        element = { < SearchPage / > }
        />

        <
        Route path = '/product/:id'
        element = { < ProductDetailPage / > }
        /> < /
        Routes > <
        /BrowserRouter>
    );
}

export default App;