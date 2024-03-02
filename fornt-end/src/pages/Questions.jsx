import React from 'react'
import title from '../assets/images/title-img.png';

const Questions = () => {
  return (
    <section>
        <section>
      <img className="mx-auto" src={title} />
      <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      Questions
      </h2>
      </section>
      <section>
      <div className='w-full p-4  dark:bg-[#121413]  shadow-md bg-white rounded-md' >
          <div className='p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white'>
            <h3 className='text-xl dark:text-[#ff9800] text-[#212245] mb-2'>How will I know when my order has been received from the restaurant?</h3>
            <p className='dark:text-[#777] text-xs'>
            Once you place your order, the order confirmation page will show the time the restaurant received your order, along with the expected time to prepare or deliver your order. You will also receive a purchase order confirmation message at the email address you provided when registering. And in case you are not sure about the order that you have placed, you can always contact the restaurant directly
            </p>
          </div>
          <div className='p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white'>
            <h3 className='text-xl dark:text-[#ff9800] text-[#212245] mb-2'>Can I save my credit card information for future orders?</h3>
            <p className='dark:text-[#777] text-xs'>
            no. To maintain your privacy, all your credit card information is handled through the bank's secured gateway and no information is saved on the Italiano app.            </p>
          </div>
          <div className='p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white'>
            <h3 className='text-xl dark:text-[#ff9800] text-[#212245] mb-2'>What payment options are available when ordering through the app?</h3>
            <p className='dark:text-[#777] text-xs'>
            You can pay online using a credit card or cash when receiving the order.
            </p>
          </div>
          <div className='p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white'>
            <h3 className='text-xl dark:text-[#ff9800] text-[#212245] mb-2'>
            Is the delivery fee when using the application higher than the usual delivery fee?            </h3>
            <p className='dark:text-[#777] text-xs'>
            No, the delivery fee is the same for the restaurant that receives the order and delivers it to you, there is no difference in the fee.
            </p>
          </div>
          <div className='p-3 mb-3 rounded-md shadow-md dark:bg-[#0e100f] bg-white'>
            <h3 className='text-xl dark:text-[#ff9800] text-[#212245] mb-2'>
            How can I provide feedback about my experience at Italiano Restaurant?
         </h3>
            <p className='dark:text-[#777] text-xs'>
            Italiano Restaurant always strives to ensure that you have a wonderful and distinct dining experience in its chain of branches and while you are using the mobile application. If you would like to make any feedback about your experience with us, go to the side menu of the app, and press Contact Support            </p>
          </div>
        
        </div>
      </section> 
    </section>
  )
}

export default Questions