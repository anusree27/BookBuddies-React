import { useState, useEffect } from "react";
// import {useHistory} from 'react-router-dom';
import adminService from "../../services/AdminService";
import userService from "../../services/UserService";
import "./DisplayBook.css";

function DisplayBooksUser() {
    let [books, setBooks] = useState([]);
    let [quantity, setQuantity] = useState(1);
    
    // let [updateBook, setUpdateBook] = useState(null);
    let customerCartdto={
        "userId":1,
        "bookId":0,
        "quantity":1
    };
    useEffect(() => {
        loadAllData();
    }, []);

    useEffect(() => {
        loadAllData();
    }, []);

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
      };

    const loadAllData = () => {
        adminService.getAllBooks()
            .then((resp) => {
                setBooks(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddToCart = (id) => {
        customerCartdto.bookId=id;
        customerCartdto.quantity=quantity;
        
            userService.addToCart(customerCartdto).then(() => {
                console.log("Added!");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleBuyNow = (id) => {
        customerCartdto.bookId=id;
        customerCartdto.quantity=quantity;
        
           
            userService.buyNow(customerCartdto).then(() => {
                console.log("BuyNow");
                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

    

    return (
        <>
            <h3>All Books:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td><img src={book.image} alt={book.bookTitle} style={{ maxWidth: "100px", maxHeight: "100px" }} /></td>
    
                            <td>{book.bookTitle}</td>
                            <td>{book.bookAuthor}</td>
                            <td>{book.bookCategory}</td>
                            <td>{book.price}</td>
                            <label for="quantity">quantity</label>
                            <input type="number" name="quantity" value={quantity} onChange={handleQuantity}/>
                            <td>
                                <button onClick={() => handleAddToCart(book.bookId)}>Add To Cart</button>
                                <button onClick={() => handleBuyNow(book.bookId)}>Buy Now</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default DisplayBooksUser;
