import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../store/shopping-cart/cartSlice';
import axios from "axios";
import swal from 'sweetalert';
import title from '../assets/images/title-img.png';
import{BsSearch} from 'react-icons/bs';
import ReactPaginate from "react-paginate";
import loader from "../assets/images/loader.gif";


const AllMeals = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const[sections , setSection ] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  const dispatch = useDispatch();


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

  const searchProduct = products.filter((item) =>{

      if (searchTerm.value === "") {
        return item;
      }
      if (item.Product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      } else {
        return console.log("not found");
      }

  } )
  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      All Meals
      </h2>
      </section>
      <section>
        <div className="flex w-full gap-2 flex-wrap justify-between items-center">
        <div className="w-full  md:w-1/2 relative rounded-md cursor-pointer  flex items-center justify-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light  py-2 px-3  border-0 focus:outline-none	 rounded-md '
                  style={{ border:'1px solid #fde4e4' }}
                />
                <span>
                  <BsSearch className="right-6 dark:text-white top-4 absolute" />
                </span>
        </div>
        <div className="w-full md:w-1/4" >
        <div className="rounded-md text-end">
                <select className=" py-2 px-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-full rounded-md " style={{ border:'1px solid #fde4e4' }}>
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
        </div>
        </div>
      </section>
      <section>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayPage.map((product) => (
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
        <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            
            </div>
      </section>
    </section>
  );
};

export default AllMeals;
