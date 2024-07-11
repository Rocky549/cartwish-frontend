const cartReducer = (cart,action) =>{

    switch(action.type){
        case "ADD_TO_CART": {
            const {product,quantity}=action.payload;
            const updatedCart=[...cart];
            const isExistProductIndex = updatedCart.findIndex(item=>item.product._id===product.id);
            if(isExistProductIndex === -1){
            updatedCart.push({product:product,quantity:quantity})
            }else{
            updatedCart[isExistProductIndex].quantity+=quantity;
            }
            return updatedCart;
        }
        case "GET_CART": {
            return action.payload.products;
        }
        case "REVERT_CART": {
            return action.payload.cart;
        }
        case "REMOVE_CART": {
            const oldCart = [...cart];
            const newCart= oldCart.filter(item => item.product._id !== action.payload.id)
            return newCart;
        }
        case "EMPTY_CART": {
            return [];
        }
     
    }

}

export default cartReducer;