import React, { useEffect , useState} from 'react'
import title1 from '../assets/images/title-img.png';
import axios from 'axios';
import loader from "../assets/images/loader.gif";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {

  const[orders , setorders] = useState([]);
  const[orderitems , setorderitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.get(`http://127.0.0.1:8000/api/orders`).then(res => {
          setorders(res.data.orders);
          setorderitems(res.data.orderitems);
          setLoading(false);
          console.log(orders)
  
        }).catch(error => {
          console.error('حدث خطأ في استدعاء البيانات:', error);
        });
     });   
  },[])
  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      swal('Warning', "Please Login First", 'warning');
      navigate("/home");
    }
  }, []);

  if(loading)
    {
        return <div className="loader">
          <img src={loader}  />          
        </div>
    }
  return (
    <section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     <section>
      <img className="mx-auto" src={title1} />
      <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold	"  >
      My Orders
      </h2>
      </section>
      <section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {orders.map((orderWithItems) => (
            <div key={orderWithItems.order.id} style={{ borderRadius: '20px',border:'1px solid #777' }}   className="w-full mt-3 shadow-lg w-full dark:bg-[#0e100f] p-2 rounded-md text-white mt-5">
                <p><span className='dark:text-[#ff9800]'>placed on :</span> <span>{orderWithItems.order.created_at.toString().split('T')[0]}</span></p>
                <p><span className='dark:text-[#ff9800]'>firstname :</span><span>{orderWithItems.order.firstname} </span></p>
                <p><span className='dark:text-[#ff9800]'>lastname :</span> <span>{orderWithItems.order.lastname} </span></p>
                <p><span className='dark:text-[#ff9800]'>email :</span> <span>{orderWithItems.order.email} </span></p>
                <p><span className='dark:text-[#ff9800]'>phone :</span> <span> {orderWithItems.order.phone}</span></p>
                <p><span className='dark:text-[#ff9800]'>adderss :</span> <span>{orderWithItems.order.address}</span></p>
                <p><span className='dark:text-[#ff9800]'>payment method :</span> <span>{orderWithItems.order.payment_method == "cod" ? "cash in order" : "visa"}</span></p>
                <p><span className='dark:text-[#ff9800]'>your orders : :</span> <ul>
                {orderWithItems.orderitems.map((orderItem) => (
                  <li key={orderItem.id}>
                    <span className='dark:text-[#ff9800]'>Product:</span> {orderItem.product_name}, <span className='dark:text-[#ff9800]'>Quantity:</span> {orderItem.qty}
                  </li>
                ))}
              </ul>
              </p>
                <p> <span className='dark:text-[#ff9800]'>total price :</span> {orderWithItems.order.total}</p>
            </div>
          ))}
      </div>
      </section>
    </section>
  )
}

export default Orders