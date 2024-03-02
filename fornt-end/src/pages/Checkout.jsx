import React, { useEffect, useState } from "react";
import title1 from '../assets/images/title-img.png';
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const Checkout = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  
  const handleRemoveAll = () => {
      dispatch(cartActions.removeAll());
    };
  const [error, setError] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledOnline, setdisabledOnline] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const [checkoutInput, setCheckoutInput] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    cartItems: JSON.stringify(cartItems), 
});
const handleInput = (e) => {
  e.persist();
  setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
}
  
useEffect(() => {
  if (!localStorage.getItem('auth_token')) {
    swal('Warning', "Please Login First", 'warning');
    navigate("/home");
  }
}, []);
 

  const submitOrder = async (e, payment_mode) => {
    e.preventDefault();
  
    if(cartItems.length == 0)
    {
       swal("your cart is empty", "", "error");
       return 0;
    }
    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      payment_mode: payment_mode,
      payment_id: '',
      cartItems: JSON.stringify(cartItems), 
      subtotal: totalAmount,
    };
  
    try {
      await axios.get('/sanctum/csrf-cookie');
  
      switch (payment_mode) {
        case "cod":
          setDisabled(true);
          const responseCod = await axios.post('/api/place-order', data);
          if (responseCod.data.status === 200) {
            swal("Order Placed Successfully", responseCod.data.message, "success");
            setError([]);
            handleRemoveAll();
            navigate("/home");
          } else if (responseCod.data.status === 422) {
            swal("All fields are mandatory", "", "error");
            setError(responseCod.data.errors);
            setDisabled(false);

          }else if(responseCod.data.status === 500)
          {
            swal("An error occurred while saving the order", "", "error");
            setDisabled(false);
          }
          break;
  
        case "stripe":
          setdisabledOnline(true);
          const responseStripe = await axios.post('api/makePayment', data);
          if (responseStripe.data.status === 200) {
            const { clientSecret } = responseStripe.data;
            const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
  
            if (result.error) {
              swal('Failed to initiate payment:', result.error.message, 'error');
              setdisabledOnline(false);

            } else {
              swal('Order Paid Successfully', '', 'success');
              handleRemoveAll();
              navigate('/home');
            }
          } else if (responseStripe.data.status === 422) {
            window.location.reload();

            swal('All fields are mandatory', '', 'error');
            setError(responseStripe.data.errors);
          }
          break;
  
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <section class="leading-loose">
      <section>
     <img className="mx-auto" src={title1} />
      <h2 className="mb-8 dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      Checkout
      </h2>
   </section>
    <form onSubmit={submitOrder} className="w-full mx-auto m-4 p-10 bg-white dark:bg-[#121413]  rounded-md shadow-xl">
      
      <div class="">
        <label class="block text-sm text-gray-600 dark:text-[#777]"> First Name</label>
        <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        <small className="text-danger">{error.firstname}</small>
      </div>
      <div class="mt-2">
        <label class="block text-sm text-gray-600 dark:text-[#777]">Last Name</label>
        <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
      </div>
      <div class="mt-2">
        <label class=" block text-sm text-gray-600 dark:text-[#777]"> Phone Number</label>
        <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        <small className="text-danger">{error.phone}</small>
      </div>
      <div class="mt-2">
         <label class=" block text-sm text-gray-600 dark:text-[#777]"> Email Address</label>
          <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
          <small className="text-danger">{error.email}</small>
      </div>
      <div class="mt-2">
        <label class=" block text-sm text-gray-600 dark:text-[#777]" >FullAddress</label>
         <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded"></textarea>
         <small className="text-danger">{error.address}</small>     
        </div>
      <div class="mt-2">
        <label class=" text-sm block text-gray-600 dark:text-[#777]" >City</label>
        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        <small className="text-danger">{error.city}</small>    
      </div>
      <div class="inline-block mt-2 w-1/2 pr-1">
        <label class=" block text-sm text-gray-600 dark:text-[#777]" >State</label>
        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        <small className="text-danger">{error.state}</small>     
      </div>
      <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
        <label class=" block text-sm text-gray-600" >Zip Code</label>
        <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        <small className="text-danger">{error.zipcode}</small>      
      </div>
      <p class="mt-4 text-gray-800 font-medium dark:text-[#777]">Payment information</p>
      <div class="">
        <label class="block text-sm text-gray-600 dark:text-[#777]" for="cus_name">Card</label>
        <div class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded">
        <CardElement  class="w-full px-5 py-1 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  rounded" />
        </div>
      </div>
      <div class="mt-4">
      <div className="flex flex-wrap items-center gap-4">
      <button type="submit" disabled={disabled ?true: false } onClick={(e)=>submitOrder(e, "cod")} className="w-fit px-4 py-1 text-white font-light tracking-wider bg-[#df2020] dark:bg-[#680813] rounded" ><span>{disabled ? "proseesing" : "Place Order"}</span></button>
      <button type="button"disabled={disabledOnline ?true: false }  onClick={(e)=>submitOrder(e, "stripe")} className="w-fit px-4 py-1 text-white font-light tracking-wider bg-[#df2020] dark:bg-[#680813] rounded" ><span>{disabledOnline ? "proseesing" : "Pay Online"}</span></button>     
      </div>
        <h6 className="dark:text-[#ff9800]">
                  Subtotal: $
        <span className="cart__subtotal dark:text-[#ff9800]">{totalAmount}</span>
        </h6>
      </div>
      {error && <div>{error}</div>}
    </form>
  </section>
  );
};

export default Checkout;