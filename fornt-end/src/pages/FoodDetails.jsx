import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../store/shopping-cart/cartSlice";
import title1 from "../assets/images/title-img.png";
import axios from "axios";
import swal from "sweetalert";
import loader from '../assets/images/loader.gif';
import logo2 from "../assets/images/logo-2.png";


const FoodDetails = () => {
  const { id } = useParams();
  const [previewImg, setPreviewImg] = useState("");
  const [section, setSection] = useState([]);
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const addToCart = (id, title, price) => {
    if (!localStorage.getItem("auth_token")) {
      swal("Warning", "please login first", "warning");
    } else {
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

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .get(`http://127.0.0.1:8000/api/ProductDetails/${id}`)
        .then((res) => {
          setSection(res.data.section);
          setProduct(res.data.product);
          setImages(res.data.images);
          const imageUrls = getImageUrls(product.id, res.data.images);
          setImageUrls(imageUrls);
          setLoading(false);
        })
        .catch((error) => {
          console.error("حدث خطأ في استدعاء البيانات:", error);
        });
    });
  }, [id, product]);



  function getImageUrl(productId, images) {
    const productImage = images.find((image) => image.product_id === productId);

    if (productImage) {
      const imageUrl = `http://127.0.0.1:8000/product_images/${productImage.image}`;
      return imageUrl;
    }

    return "";
  }

  function getImageUrls(productId, images) {
    const productImages = images.filter(
      (image) => image.product_id === productId
    );

    if (productImages.length > 0) {
      const imageUrls = productImages.map(
        (image) => `http://127.0.0.1:8000/product_images/${image.image}`
      );
      return imageUrls;
    }

    return [];
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
        <img className="mx-auto" src={title1} alt="" />
        <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold ">
          {product.Product_name}
        </h2>
      </section>
      <section>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <div>
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="cursor-pointer w-24 mb-3"
                onClick={() => {
                  setPreviewImg(imageUrls[index]);
                  setCurrentImageIndex(index);
                }}
              >
                <img src={imageUrls[index]} alt="" className="" />
              </div>
            ))}
          </div>
          <div className="w-2/5">
            <img src={imageUrls[currentImageIndex]} alt="" className="" />
          </div>
          <div>
            <div>
              <h2 className="dark:text-[#ff9800] mb-3">{product.Product_name}</h2>
              <p className="product__price dark:text-[#680813]">
                Price: <span>${product.price}</span>
              </p>
              <p className="dark:text-[#777] mb-5">
                Category: <span>{section.section_name}</span>
              </p>

              <button
                onClick={() => addToCart(product.id, product.Product_name, product.price)}
                className="addTOCart__btn dark:bg-[#680813]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default FoodDetails;
