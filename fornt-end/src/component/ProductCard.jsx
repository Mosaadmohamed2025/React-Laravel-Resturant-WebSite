import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../store/shopping-cart/cartSlice';

const ProductCard = (props) => {
    const {id , title  , image01 , price  } = props.product;
    const dispatch = useDispatch();

    const addToCart = () =>{
        dispatch(
            cartActions.addItem({
                id,
                title,
                image01,
                price,
            })
        );
    };
  return (
    <div className="product__item ">
    <div className="product__img flex justify-center items-center">
      <img src={image01} alt="product-img" className="w-24" />
    </div>

    <div className="product__content">
      <h5 className='w-full  font-bold'>
        <Link to={`/foods/${id}`}className='dark:text-[#ff9800]'>{title}</Link>
      </h5>
      <div className=" flex flex-col items-center justify-between ">
        <span className="product__price mb-3 dark:text-[#777]">${price}</span>
        <button className="addTOCart__btn dark:bg-[#680813] w-full" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  )
}

export default ProductCard