import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import AboutUs from './Pages/AboutUs/AboutUs';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import MyOrder from './Pages/MyOrder/MyOrder';
import { CartProvider } from './components/ContextReducer'; // Import CartProvider
import './App.css';

const App = () => {
  return (
    <CartProvider> {/* Wrap everything with CartProvider */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<SignUp />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/success' element={<Success />} />
          <Route path='/myOrder' element={<MyOrder />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </CartProvider>
  );
};

export default App;
