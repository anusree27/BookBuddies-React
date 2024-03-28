import { useState , useEffect } from "react";
import paymentService from "../../services/PaymentService";
import { useParams } from 'react-router-dom';
// import Razorpay from 'razorpay'; // Import Razorpay SDK

function MakePayment() {
    const { userId, totalCost } = useParams();

    console.log(userId);
    console.log(totalCost);
    let [payment, setPayment] = useState({
      "userId": userId,
      "paymentStatus": false,
      "totalCost": totalCost,
      "mobileNo": '',
      "address": ''
        
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!userId) {
            console.log("userId not received from URL parameters");
            // Handle the case where userId is not received
        }
    }, [userId]);


    const handlePaymentChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(payment);
        paymentService.createTransaction(payment)
            .then(
                (resp) => {
                    console.log(resp.data);
                    const { transactionId, currency, amount, key } = resp.data;
                    const options = {
                        key: key,
                        amount: amount,
                        currency: currency,
                        name: 'Book Buddies',
                        description: 'Payment for Books',
                        image: 'https://example.com/your_logo.png',
                        order_id: transactionId,
                        handler: function(response) {
                            console.log(response);
                            // Handle payment success
                        },
                        prefill: {
                            name: 'suba',
                            email: 'suba@example.com',
                            contact: '9876543210'
                        }
                    };
        
                     const rzp = new window.Razorpay(options);
                     rzp.open();
        
                    
                    setMessage("payment Added success!");
                    setErrorMessage("");
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Errors accured in fallowing fields:" + JSON.stringify(err.response.data));
                }
            )


    }
    return (
        <>
            <h3>Make Payment:</h3>

            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }


            <form onSubmit={handleSubmit}>
                <p>
                    Address: <input type="text" name="address" value={payment.address} onChange={handlePaymentChange} required   ></input>
                </p>

              

                <p>
                    Phone No: <input type="number" name="mobileNo" value={payment.mobileNo} onChange={handlePaymentChange}  required></input>
                </p>
                
                <button type="submit">Make Payment</button>
            </form>
        </>
    );
}

export default MakePayment; 
