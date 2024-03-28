import { axiosInstance } from "./axios-http-client";

class PaymentService{
  createTransaction(payment){
    return axiosInstance.post('http://localhost:8080/payment/buy',payment);
  }

}
export default new PaymentService();