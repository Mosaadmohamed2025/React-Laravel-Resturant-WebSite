import React, { useState } from "react";
import title from '../assets/images/title-img.png';
import {TbBuildingStore} from 'react-icons/tb';
import axios from 'axios';
import loader from "../assets/images/loader.gif";


const Restaurantwebsites = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const[restursnt , setResturant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations , setLocations] = useState([]);

  axios.get('/sanctum/csrf-cookie').then(response => {
    axios.get(`http://127.0.0.1:8000/api/resturantsLocations`).then(res => {
        setResturant(res.data.resturants);
        setLocations(res.data.locations);
        setLoading(false);

      }).catch(error => {
        console.error('حدث خطأ في استدعاء البيانات:', error);
      });
   });   


  const searchProduct = restursnt.filter((item) =>{

      if (searchTerm.value === "") {
        return item;
      }
      if (item.resturant_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      } else {
      }

  } )

  const Location = (resturant, locations) => {
    const location = locations.find((location) => location.resturant_id === resturant.id);
  
    if (location) {
      return location.address;
    } else {
      return "Location not found"; // أو يمكنك تعيين رسالة توضيحية أخرى
    }
  }

  if(loading)
  {
      return <div className="loader">
        <img src={loader}  />          
      </div>
  }

  return (
    <section>
       <section>
      <img className="mx-auto" src={title} />
      <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      Resturant Locations
      </h2>
      </section>
      <section>
        <div className='w-full p-4  grid gap-3 grid-cols-1 lg:grid-cols-2 dark:bg-[#121413] shadow-md bg-white rounded-md' style={{border:'1px solid #777'}}>
          <div>
          <iframe className='w-full h-72 lg:h-full' src="https://maps.google.com/maps?q=مصر بنها&t=k&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>
          <div >
          <input 
          onChange={(e) => setSearchTerm(e.target.value)}
          id="name" placeholder='Search' name="name" type="text" required class="px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5" />
          <div className='overflow-y-scroll p-2 rounded-md mt-2 'style={{maxHeight:'70vh', border:'1px solid #d1d5db'}}>
         {
           searchProduct.map((resturant) => (
            <div key={resturant.id} className='mt-3 shadow-lg w-full dark:bg-[#0e100f] p-2 rounded-md' style={{border:'1px solid #777'}}>
            <div className='flex gap-3 items-center mb-2 '>
              <div>
                {<TbBuildingStore className='dark:text-[#ff9800] text-[#212245] text-4xl'/>}
              </div>
              <div>
                <h3 className='dark:text-[#777]'>{resturant.resturant_name}</h3>
                <p className='dark:text-[#777] text-xs'>{Location(resturant, locations)}</p>

                <p className='dark:text-[#777] text-xs' >Business Hours Are From 11:00 AM To 03:00 AM</p>
              </div>
            </div>
          </div>
           )
           )
         }
          </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Restaurantwebsites