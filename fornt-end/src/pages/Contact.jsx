import React from "react";
import title from '../assets/images/title-img.png';
import call from '../assets/images/contactUs.d01f6f8e.svg'
import{AiFillPhone , AiFillMail} from 'react-icons/ai';

const Contact = () => {
  return (
    <section>
       <section>
      <img className="mx-auto" src={title} />
      <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      Contact Us
      </h2>
      </section>
      <section>
      <div className='w-full p-4  dark:bg-[#121413]  shadow-md bg-white rounded-md' >  
      <div className="pb-3 mb-5 dark:border-[#680813]" style={{borderBottom:'1px solid #df2020'}}>
       <img src={call} className='mx-auto mb-4 ' />
       <p className="dark:text-[#777]  text-center">Sometimes you just need to talk to a real person. call us.</p>
        </div>   
        <div>
        <p className="dark:text-[#777]  mb-3 text-center text-xl">You can contact us at</p>
        <div className="p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white flex items-center gap-3">
        <AiFillPhone className='text-[#212245] text-3xl dark:text-[#ff9800]' />
          <span className="dark:text-[#777]">1119454</span>
        </div>
        <div className="p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white flex items-center gap-3">
        <AiFillMail className='text-[#212245] text-3xl dark:text-[#ff9800]' />
          <span className="dark:text-[#777]">italiano@gmail.com</span>
        </div>
        </div>  
        </div>
      </section>
    </section>
  )
};

export default Contact;
