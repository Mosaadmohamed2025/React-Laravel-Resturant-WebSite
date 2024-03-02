import React from 'react'
import { Link } from 'react-router-dom';

const ResturantCard = (props) => {

    const{id, icon , title , business , text } = props.item;
  return (
    <div className='mt-3 shadow-lg w-full dark:bg-[#0e100f] p-2 rounded-md' style={{border:'1px solid #777'}}>
    <div className='flex gap-3 items-center mb-2 '>
      <div>
        {icon}
      </div>
      <div c>
        <h3 className='dark:text-[#777]'>{title}</h3>
        <p className='dark:text-[#777] text-xs'>{text}</p>
        <p className='dark:text-[#777] text-xs' >{business}</p>
      </div>
    </div>
  </div>
  )
}

export default ResturantCard