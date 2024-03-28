import { useEffect, useState } from "react";
import SubscriptionService from "../../services/SubscriptionService";


function DisplaySubscriptions(){
    let [subscriptions, setSubscriptions]=useState([]);
    
    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        SubscriptionService.getAllSubscriptions()
            .then((resp) => {
                setSubscriptions(resp.data);
                console.log("Display Subscriptions successfull")
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return(
        <>
        <h2>Subscriptions</h2>
        <table>
        <thead>
            <tr>
                <th>Subscription ID</th>
                <th>Subscription Date</th>
                <th>Expire Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Payment Plan</th>
                <th>Customer</th>
                <th>Book</th>
            </tr>
        </thead>
        <tbody>
            {subscriptions.map((subscription)=>(
                <tr key={subscription.subscriptionId}>
                <td>{ subscription.subscriptionId }</td>
                <td>{ subscription.subscriptionDate }</td>
                <td>{ subscription.expireDate }</td>
                <td>{ subscription.subscriptionCost }</td>
                <td>{ subscription.subscriptionStatus }</td>
                <td>{ subscription.paymentPlan }</td>
                <td>{ subscription.customer?.userName }</td>
                <td>{ subscription.book?.bookTitle}</td>
            </tr>

            ))}
            
        </tbody>
    </table>
    
        
        </>

    );

}
export default DisplaySubscriptions;