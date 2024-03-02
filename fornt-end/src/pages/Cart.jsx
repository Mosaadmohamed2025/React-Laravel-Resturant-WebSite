import React from "react";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import title1 from '../assets/images/title-img.png';
import{AiFillDelete} from 'react-icons/ai'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <section>
   <section>
     <img className="mx-auto" src={title1} />
      <h2 className="mb-8 dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      Your Cart
      </h2>
   </section>
   <div>
     <div className=" w-full ">
     {cartItems.length === 0 ? (
                <h5 className="dark:text-[#777] text-center">Your cart is empty</h5>
              ) : (
                <table className="border-collapse border border-solid border-slate-300  w-full "  >
                  <thead className="border border-slate-300  border border-solid">
                    <tr className="dark:text-[#777]">
                      <th >Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
     </div>
     <div className="mt-4">
                <h6 className="dark:text-[#ff9800]">
                  Subtotal: $
                  <span className="cart__subtotal dark:text-[#ff9800]">{totalAmount}</span>
                </h6>
                <p className="mt-2 dark:text-[#777]">Taxes and shipping will calculate at checkout</p>
                <div className="mt-2 cart__page-btn gap-2 flex dark:text-[#777] items-center">
                  <button className=" dark:bg-[#680813] addTOCart__btn me-4">
                    <Link to="/foods">Continue Shopping</Link>
                  </button>
                  <button className="dark:bg-[#680813] addTOCart__btn ">
                    <Link to="/checkout">Proceed to checkout</Link>
                  </button>
                </div>
              </div>
   </div>
    </section>
  );
};


const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <tr className="border border-slate-300  border border-solid">
      <td className="text-center dark:text-[#777] p-2 cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center dark:text-[#777]">{title}</td>
      <td className="text-center dark:text-[#777]">${price}</td>
      <td className="text-center dark:text-[#777]">{quantity}px</td>
      <td className="text-center cart__item-del dark:text-[#777]">
        <AiFillDelete className="text-center mx-auto dark:text-[#777] cursor-pointer"  onClick={deleteItem} />
      </td>
    </tr>
  );
};

export default Cart;
