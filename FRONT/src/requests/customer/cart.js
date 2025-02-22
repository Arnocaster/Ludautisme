import api from "../index";

export async function getCart(userId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const response = await api.get(`/customer/cart/${id}`);
    return response;
}

export async function getItems(refIds){
    const settings = {
                "page": 1,
                "limit": 25,
                "tags": [],
                "available": [],
                "categories": [],
                "id": refIds || []
    }
    const response = await api.post(`/customer/articles/search`,settings);
    return response;
}

export async function addToCart(refId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const settings = {refId}
    const response = await api.post(`/customer/cart/reference/${id}`,settings);
    return response;
}

export async function deleteFromCart(refId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const settings = {refId}
    const response = await api.delete(`/customer/cart/reference/${id}`,settings);
    return response;
}

export async function clearCart(){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const response = await api.delete(`/customer/cart/${id}`);
    return response;
}
