import { axiosInstance } from "./axios-http-client";

class UserService {
    addToCart(customerCartdto){
        return axiosInstance.post('http://localhost:8080/book/cart',customerCartdto);
    }
    getCart(userId){
        return axiosInstance.get('http://localhost:8080/user/cart/'+userId);
    }
    deleteFromCart(bookId,userId){
        return axiosInstance.delete('http://localhost:8080/cart/'+userId+'/'+bookId);
    }
    increaseCart(bookDto){
        return axiosInstance.patch('http://localhost:8080/cart/book/quantity/plus',bookDto);
    }
    decreaseCart(bookDto){
        return axiosInstance.patch('http://localhost:8080/cart/book/quantity/minus',bookDto);
    }
    buyNow(customerCartdto){
        return axiosInstance.post('http://localhost:8080/book/buy',customerCartdto);
    }
    buyAll(listDto){
        console.log("Service",listDto);
        return axiosInstance.post('http://localhost:8080/cart/buy',listDto);
    }
}

export default new UserService();
