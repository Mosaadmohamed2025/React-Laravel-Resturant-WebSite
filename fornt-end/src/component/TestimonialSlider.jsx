import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ava01 from "../assets/images/ava-1.jpg";
import ava02 from "../assets/images/ava-2.jpg";
import ava03 from "../assets/images/ava-3.jpg";

const TestimonialSlider = () => {

  return (
    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
    slidesPerView={2}
    pagination={{ clickable: true }}
    spaceBetween={30} 
     className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2">
      <SwiperSlide  className="text-center p-2 rounded-md " style={{ height:'150px', border: '1px solid #333'}}>
        <div className=" slider__content flex justify-center flex-col items-center gap-3 ">
          <h6 className="dark:text-[#ff9800] text-xl">Mosaad Mohamed</h6>
        </div>
        <p className="review__text">
          "I have been a customer of theirs for a long time and their food is amazing. 
        </p>
      </SwiperSlide>
      <SwiperSlide  className="text-center p-2 rounded-md "  style={{ height:'150px', border: '1px solid #333'}}>
        <div className="slider__content flex justify-center flex-col items-center gap-3 ">
          <h6 className="dark:text-[#ff9800] text-xl">Mohamed Samir</h6>
        </div>
        <p className="review__text">
        "I have been a customer of theirs for a long time and their food is amazing. 
        </p>
      </SwiperSlide>
      <SwiperSlide className="text-center p-2 rounded-md "  style={{ height:'150px', border: '1px solid #333'}}>
        <div className="slider__content flex flex-col justify-center items-center gap-3 ">
          <h6 className="dark:text-[#ff9800] text-xl">Abdelsalam Morad</h6>
        </div>
        <p className="review__text">
        "I have been a customer of theirs for a long time and their food is amazing. 
        </p>
      </SwiperSlide>
      <SwiperSlide className="text-center p-2 rounded-md "  style={{ height:'150px', border: '1px solid #333'}}>
        <div className="slider__content flex flex-col justify-center items-center gap-3 ">
          <h6 className="dark:text-[#ff9800] text-xl">Mosatafa Morad</h6>
        </div>
        <p className="review__text">
        "I have been a customer of theirs for a long time and their food is amazing. 
        </p>
      </SwiperSlide>
      <SwiperSlide className="text-center p-2 rounded-md "  style={{ height:'150px', border: '1px solid #333'}}>
        <div className="slider__content flex flex-col justify-center items-center gap-3 ">
          <h6 className="dark:text-[#ff9800] text-xl">Sayed osama</h6>
        </div>
        <p className="review__text">
        "I have been a customer of theirs for a long time and their food is amazing. 
        </p>
      </SwiperSlide>
    </Swiper>
  );
};

export default TestimonialSlider;
