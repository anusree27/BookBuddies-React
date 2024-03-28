import { useState, useEffect } from "react";
import userService from "../../services/UserService";
import { useNavigate } from 'react-router-dom';



function Cart() {
    let [bookStocks, setBookStocks] = useState([]);
    const navigate = useNavigate();
    let bookDto={
        "userId":1,
        "bookId":0
    };
    let listDto={
        "userId":1,
        "idList":[]
    };

    let [cost, setTotalCost] = useState(0);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        userService.getCart(1).then((resp) => {
                setBookStocks(resp.data);
                const totalSum = resp.data.reduce((acc, curr) => acc=acc + (curr.book.price*curr.quantity), 0);
                setTotalCost(totalSum);
            })
            .catch((err) => {
                console.log(err);
            });
    };
     
    const handleDelete = (bookId) => {
        let userId=1;
        userService.deleteFromCart(bookId,userId)
            .then(() => {
                console.log("Delete");
                loadAllData();

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleIncrease = (bookId) => {
        bookDto.bookId=bookId;
        userService.increaseCart(bookDto)
            .then(() => {
                console.log("Delete");
                loadAllData();

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDecrease = (bookId) => {
        bookDto.bookId=bookId;
        userService.decreaseCart(bookDto)
            .then(() => {
                console.log("Delete");
                loadAllData();

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleBuyAll = () => {

        for (let i = 0; i < bookStocks.length; i++) {
            listDto.idList.push(bookStocks[i].book.bookId);
          }
          let userId = parseInt(listDto.userId);
          let amount = parseFloat(cost);
        console.log(listDto);
        console.log(userId);
        console.log(amount);
        console.log(typeof userId);
        console.log(typeof amount);
        userService.buyAll(listDto)
            .then((resp) => {
                console.log("BuyALl",resp);
                navigate(`/make-payment/${userId}/${amount}`);

               
            })
            .catch((err) => {
                console.log(err);
            });
    };

  
    return (
        <>
            <h3>Cart</h3>
            <table>
                <thead>
                    <tr>  
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookStocks.map((bookStock) => (
                        <tr key={bookStock.book.bookId}>
                            <td>{bookStock.book.bookTitle}</td>
                            <td>{bookStock.book.bookAuthor}</td>
                            <td>{bookStock.book.bookCategory}</td>
                            <td>{bookStock.book.price}</td>
                            <td>
                            <button onClick={() => handleIncrease(bookStock.book.bookId)}>+</button></td>
                            <td>{bookStock.quantity}</td>
                            <td><button onClick={() => handleDecrease(bookStock.book.bookId)}>-</button></td>
                            <td>
                            <button onClick={() => handleDelete(bookStock.book.bookId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                     <tr>Total cost:{cost}</tr>
                </tbody>
               
            </table>
            <button onClick={() => handleBuyAll()}>Buy</button>
        </>
    );
}

export default Cart;
// for (let i = 0; i < bookStocks.length; i++) {
//     total+=bookStocks[i].book.price*bookStocks[i].quantity;
//   }
// setTotalCost(total);