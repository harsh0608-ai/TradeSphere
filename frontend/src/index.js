import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import AboutPage from './landing_page/about/AboutPage';
import SupportPage from './landing_page/support/SupportPage';
import{ BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import KiteRedirect from './pages/KiteRedirect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/products' element={<ProductPage/>}/>
      <Route path='/pricing' element={<PricingPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/support' element={<SupportPage/>}/>
      <Route path='/kite' element={<KiteRedirect/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Footer />
  </BrowserRouter>
);

