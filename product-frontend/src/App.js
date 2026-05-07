 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import SearchPage from './pages/SearchPage';
 import ProductDetailPage from './pages/ProductDetailPage';

 function App() {
     return ( <
         BrowserRouter >
         <
         Routes >
         <
         Route path = '/'
         element = { < SearchPage / > }
         /> < /
         Routes >
         <
         Route path = '/product/:id'
         element = { < ProductDetailPage / > }
         />< /
         BrowserRouter >
     );
 }

 export default App;