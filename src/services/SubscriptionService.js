import { axiosInstance } from "./axios-http-client";

class SubscriptionService{
  subscribeToBook(subscriptionDto){
    return axiosInstance.post('http://localhost:8080/subscription/subscribe',subscriptionDto);
}
  getAllSubscriptions(){
    return axiosInstance.get('http://localhost:8080/subscription/subscriptions');
}
  getSubscriptionsByUserId(userId){
    return axiosInstance.get('http://localhost:8080/subscription/subscriptions/user/'+userId);
}
  renewSubscription(updateSubscriptionDto){
    return axiosInstance.patch('http://localhost:8080/subscription/renew',updateSubscriptionDto);
}
  extendSubscription(updateSubscriptionDto){
    return axiosInstance.patch('http://localhost:8080/subscription/extend',updateSubscriptionDto);
}
  cancelExpiredSubscriptions(){
    return axiosInstance.patch("http://localhost:8080/subscription/cancelExpired",null);
}
  
  
}

export default new SubscriptionService();