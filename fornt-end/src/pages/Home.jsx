import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../store/shopping-cart/cartSlice';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import swal from 'sweetalert';
import {GiCheckMark} from 'react-icons/gi';
import title from '../assets/images/title-img.png';
import client from '../assets/images/client.png';
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import landing from '../assets/images/about-img.png';
import landing_1 from '../assets/images/output (1).png';
import landing_2 from '../assets/images/output (2).png';
import landing_3 from '../assets/images/output (3).png';
import landing_4 from '../assets/images/output (7).png';
import loader from "../assets/images/loader.gif";
import { ProductCard, TestimonialSlider, UserProfile } from "../component";
import { useStateContext } from '../context/Context';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
];

const Home = () => {

  const { setProfile , profile} = useStateContext();

  const[sections , setSection ] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  
  useEffect(() => {

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.get(`http://127.0.0.1:8000/api/getProducts`).then(res => {
        setSection(res.data.sections);
        setProducts(res.data.products);
        setImages(res.data.images);
        setLoading(false);

      }).catch(error => {
        console.error('حدث خطأ في استدعاء البيانات:', error);
      });
    });
}, []);

  const addToCart = (id, title, price) => {

    if(!localStorage.getItem('auth_token'))
    {
      swal("Warning","please login first","warning");

    }else{
     const image01 = getImageUrl(id, images);
      dispatch(
        cartActions.addItem({
          id,
          title,
          image01,
          price,
        })
      );
      swal('Success', "Order Added To Cart", 'success');

    }
  };

  function getImageUrl(productId, images) {
    const productImage = images.find(image => image.product_id === productId);
  
    if (productImage) {
      const imageUrl = `http://127.0.0.1:8000/product_images/${productImage.image}`;
      return imageUrl;
    }
  
    return ''; 
  }

  if(loading)
    {
        return <div className="loader">
          <img src={loader}  />          
        </div>
    }

  return (
    <div>

      <section>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          spaceBetween={100} 
          navigation
        >
          <SwiperSlide>
            <div>
              <img style={{ maxWidth: '100%', height: '440px', margin: 'auto' }} src={landing_1} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img style={{ maxWidth: '100%', height: '440px', margin: 'auto' }} src={landing_2} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img style={{ maxWidth: '100%', height: '440px', margin: 'auto' }} src={landing_3} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img style={{ maxWidth: '100%', height: '440px', margin: 'auto' }} src={landing_4} />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="section">
        <div className="w-full text-center leading-normal">
          <h5 className="text-[#df2020] dark:text-[#680813] font-bold text-2xl sm:text-3xl mb-4">
            <img className="mx-auto" src={title} />
            What we serve
          </h5>
          <h2 className="dark:text-[#ff9800] text-2xl sm:text-4xl mb-3 font-bold">
            We offer many very special services
          </h2>
          <h2 className="dark:text-[#ff9800] text-4xl font-bold">
          </h2>
          <p className="mb-1 mt-4 text-[#777] sm:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            officiis?
          </p>
          <p className="text-[#777] sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            eius.{" "}
          </p>
        </div>
        <div className="flex pt-12 justify-center lg:justify-between items-center flex-wrap">
          {featureData.map((item, index) => (
            <div className="w-full m-2 lg:w-1/4 flex flex-col rounded-md justify-center items-center text-center px-5 py-3" style={{ border: '1px solid #333' }}>
              <img
                src={item.imgUrl}
                className="w-24 mb-3"
              />
              <h5 className=" text-xl text-[#212245] dark:text-[#ff9800] font-bold mb-3">{item.title}</h5>
              <p className="text-[#777]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section">
        <h2 className="text-center mb-5 w-full dark:text-[#ff9800]">
          <img className="mx-auto" src={title} />
          Menu
        </h2>
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <div key={product.id} style={{ borderRadius: '20px' }} className="w-full mt-5">
              <div className="product__item">
                <div className="product__img flex justify-center items-center">
                  <img src={getImageUrl(product.id, images)} alt="product-img" className="w-24" />
                </div>
                <div className="product__content">
                  <h5 className='w-full  font-bold'>
                    <Link to={`/foods/${product.id}`} className='dark:text-[#ff9800]'>{product.Product_name}</Link>
                  </h5>
                  <div className=" flex flex-col items-center justify-between ">
                    <span className="product__price mb-3 dark:text-[#777]">${product.price}</span>
                    <button onClick={() => addToCart(product.id, product.Product_name, product.price)} className="addTOCart__btn dark:bg-[#680813] w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

        <section className="section" >
         <h2 className="text-center mb-5 w-full dark:text-[#ff9800]">
          <img className="mx-auto" src={title} />
          About Us
         </h2>
            <div class="grid lg:grid-cols-2 md:grid-cols-1 items-center">
            <div class="md:ml-12">
                <img
                  src={landing}
                  alt="Restaurant Interior"
                  class="rounded-lg shadow-lg"
                />
              </div>
              <div style={{lineHeight:'2'}}>
                <h2 class="dark:text-[#ff9800] text-3xl font-semibold mb-4">About  Restaurant</h2>
                 <p class="review__text mb-6">
              Welcome to our exceptional restaurant! We offer an unforgettable experience in the world of burgers and pizza.
              You can savor the most delicious meals made with utmost care from fresh and flavorful ingredients.
            </p>
            <p class="review__text">
              With a variety of burgers, pizzas, and delectable sides, you can choose what suits your taste and preferences.
              Whether you're looking to enjoy a scrumptious meal with friends and family or even order food for delivery to your doorstep,
            </p>
             <div class="icons">
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> best price </h3>
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> Best Service </h3>
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> Fresh Ingredient </h3>
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> backed buns </h3>
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> natural cheese </h3>
                  <h3 className="flex items-center gap-1  dark:text-[#ff9800]"> <GiCheckMark /> veg &amp; non-veg </h3>
              </div>
              </div>
              
          </div>
        </section>
      
      <section className='section'>
        <h2 className="text-center mb-5 w-full dark:text-[#ff9800]">
          <img className="mx-auto" src={title} />
          Testimonial
        </h2>
        <img src={client} className='mx-auto mb-5' />
        <TestimonialSlider />
      </section>
    </div>
  );
};

export default Home;
