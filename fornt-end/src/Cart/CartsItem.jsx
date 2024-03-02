import React from 'react'
import { useDispatch } from 'react-redux'
import{cartActions} from '../store/shopping-cart/cartSlice';
import {AiOutlinePlus} from 'react-icons/ai';
import{RiSubtractFill} from 'react-icons/ri'
import{TiDeleteOutline} from 'react-icons/ti'

const CartsItem = ({item}) => {
    const { id, title, price, image01, quantity, totalPrice } = item;

    const dispatch = useDispatch();

    const incrementItem = () => {
        dispatch(
          cartActions.addItem({
            id,
            title,
            price,
            image01,
          })
        );
      };
    
      const decreaseItem = () => {
        dispatch(cartActions.removeItem(id));
      };
    
      const deleteItem = () => {
        dispatch(cartActions.deleteItem(id));
      };

      
    return (
    <div className='mb-3'>
        <div className='flex gap-2 '>
        <img className='w-10 h-10 ' src={image01} alt="product-img" />

        <div className='w-full flex items-center gap-4 justify-between'>
        <div>
            <h6 className="font-bold text-xl">{title}</h6>
            <p className=" flex items-center gap-5 ">
              {quantity}x <span>${totalPrice}</span>
            </p>
            <div className="flex items-center dark:bg-[#0e100f] bg-[#fde4e4] justify-between rounded-md w-32 py-1 px-2 ">
              <span className="cursor-pointer" onClick={incrementItem}>
              <AiOutlinePlus />
              </span>
              <span className="quantity">{quantity}</span>
              <span className="cursor-pointer" onClick={decreaseItem}>
                <RiSubtractFill />
              </span>
            </div>
          </div>
          <span className="text-2xl cursor-pointer  font-bold" onClick={deleteItem}>
          <TiDeleteOutline />
          </span>
        </div>
        </div>
    </div>
  )
}

export default CartsItem