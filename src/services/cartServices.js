import apiClient from "../utils/api-client";

export function addToCartApi(id,quantity){
return apiClient.post(`/cart/${id}`,{quantity})
}

export function getCartApi(){
    return apiClient.get('/cart')
}


export function removeFromCartApi(id){
    return apiClient.patch(`/cart/remove/${id}`);
}

export function increaseProductApi(id){
    return apiClient.patch(`/cart/increase/${id}`)
}

export function decreaseProductApi(id){
    return apiClient.patch(`/cart/decrease/${id}`)
}