import React, { useEffect } from 'react';
import { BrowserRouter , Route , Routes ,Navigate } from 'react-router-dom';
import './App.css';
import{Header , Footer , SideBar,UserProfile} from './component'
import {Home , AllMeals , FoodDetails ,Profile,Checkout , Login , Register  , Orders, Contact , Cart, Restaurantwebsites, Questions,  OrderTracking} from './pages';
import {useStateContext } from './context/Context'
import Carts from './Cart/Carts';
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';

function App() {

  const { dispatch ,  screenSize ,activeMenu, setActiveMenu, setCurrentMode,currentMode ,setProfile , profile } = useStateContext();
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  


  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';

  axios.defaults.headers.common['X-CSRF-TOKEN'] = window.csrfToken;

  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  });
  
  const stripePromise = loadStripe('Your Key');


  
  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if ( currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);

 



  return (
<div className='dark'>
       <BrowserRouter>
<Header />
      {showCart && <Carts />}
      {profile && localStorage.getItem("auth_token") ? <UserProfile /> : null}

      <SideBar />
      <div className=' bg-main-bg dark:bg-main-dark-bg' style={{paddingTop:'60px', minHeight:'100vh' }} >
       <div className='container mx-auto relative px-4'>
         <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllMeals />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={
      <Elements stripe={stripePromise}>
      <Checkout />
      </Elements>
      }/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/locations" element={<Restaurantwebsites />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/ordertracking" element={<OrderTracking />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
       </div>
     </div> 
      <Footer />
         </BrowserRouter> 
</div>
  );
}

export default App;
