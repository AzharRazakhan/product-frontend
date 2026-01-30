
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddEditProduct from './pages/AddEditProduct';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/add-product' element={<AddEditProduct />} />
        <Route path='/edit-product/:id' element={<AddEditProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
