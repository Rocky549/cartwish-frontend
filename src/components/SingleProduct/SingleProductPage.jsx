import React, { useContext, useState } from 'react'
import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from './../Common/Loader';
import CartContext from '../../Contexts/CartContext';
import UserContext from '../../Contexts/UserContext';


const SingleProductPage = () => {
    const{addToCart} = useContext(CartContext);
    const user = useContext(UserContext);
    const {id}=useParams();
    const[selectedImage,SetSelectedImage]=useState(0);
    const[qty,setQty] = useState(1);
    const {data:product,error,isLoading}=useData(`/products/${id}`);
  return (
    <section className="align_center single_product">
        {error && <em className='form_error'>{error}</em>}
        {isLoading && <Loader/>}
        {product && <><div className="align_center">
            <div className="single_product_thumbnails">
            {product.images.map((image,index) => <img src={`http://localhost:5000/products/${image}`} alt={product.title} key={index} className={selectedImage===index?'selected_image':''} onClick={()=>SetSelectedImage(index)} />)}
            </div>
            <img src={`http://localhost:5000/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display'/>
        </div>
        <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_desc">{product.description}</p>
            <p className="single_product_price">{product.price.toFixed(2)}</p>
           { user && <><h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
                <QuantityInput quantity={qty} setQty={setQty} stock={product.stock} cartPage={false} productId={product._id}/>
            </div>
            <button className="search_button add_cart" onClick={()=>addToCart(product,qty)}>Add to Cart</button></>}
        </div></>}
    </section>
  )
}

export default SingleProductPage