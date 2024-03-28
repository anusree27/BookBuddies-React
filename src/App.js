
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import NoPage from './components/NoPage';

import DisplayBooks from './components/admin/DisplayBooks';
import AddBook from './components/admin/AddBook';
import DisplayBooksUser from './components/user/DisplayBook';
import Cart from './components/user/Cart';
import MakePayment from './components/payment/MakePayment';
import DisplaySubscriptions from './components/admin/DisplaySubscriptions';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route index element={<Home />}></Route>

            <Route path='/books' element={<DisplayBooks/>}></Route>
            <Route path='/Subscriptions' element={<DisplaySubscriptions/>}></Route>
          
            <Route path='/book' element={<AddBook/>}></Route>
            <Route path='/display' element={<DisplayBooksUser/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path="/make-payment/:userId/:totalCost" element={<MakePayment/>} />
            <Route path='*' element={<NoPage />}></Route>
          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
