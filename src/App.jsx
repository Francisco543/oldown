import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContext';
import WidgetCartContextProvider from './context/WidgetCartContext';
import Landing from './components/Landing';
import AlertContextProvider from './context/AlertContext'
import ProductsContextProvider from './context/ProductsContext'

function App() {
  return (
    <CartContextProvider>
      <WidgetCartContextProvider>
        <AlertContextProvider>
          <ProductsContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/products' element={<ItemListContainer/>} />
            <Route path='/category/:id' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
        </ProductsContextProvider>
        </AlertContextProvider>
      </WidgetCartContextProvider>
    </CartContextProvider>

  );
}

export default App;
