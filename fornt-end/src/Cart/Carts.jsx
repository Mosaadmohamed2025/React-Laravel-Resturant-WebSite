import React from "react";

import { Link } from "react-router-dom";
import CartItem from "./CartsItem";

import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../store/shopping-cart/cartUiSlice";
import{TiDeleteOutline} from 'react-icons/ti'
import CartsItem from "./CartsItem";


const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="fixed  w-full h-full bg-[#000000a3] " style={{zIndex:'999999999'}}>
      <div className="p-4 cart pb-3 absolute top-0 right-0 h-full dark:bg-[#121413] dark:text-[#777]   bg-[#fff]  w-96 "  style={{zIndex:'999999999'}}>
        <div className="w-full h-20">
          <span className="cursor-pointer" onClick={toggleCart}>
          <TiDeleteOutline className="text-3xl font-bold" />
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartsItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom dark:bg-[#680813] flex items-center justify-between">
          <h6 className="dark:text-[#ff9800]">
            Subtotal : <span>${totalAmount}</span>
          </h6>
          <button className="dark:bg-[#0e100f] ">
            <Link className="dark:text-[#777] " to="/checkout" onClick={toggleCart}>
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;