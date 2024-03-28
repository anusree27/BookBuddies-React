import { useState } from "react";
import adminService from "../../services/AdminService";

function AddBook() {
    let [book, setBook] = useState({
        "bookTitle": '',
        "bookAuthor": '',
        "price": 0,
        "image": '',
        "bookCategory": '',
        "stockQuantity": 0
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const handleBookChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (book && book.bookTitle && book.bookAuthor && book.price && book.image && book.bookCategory && book.stockQuantity) {
            // Create a book stock object from the book details
            let newBookStock = {
                book: {
                    bookTitle: book.bookTitle,
                    bookAuthor: book.bookAuthor,
                    price: book.price,
                    image: book.image,
                    bookCategory: book.bookCategory,
                    reviewList: []
                },
                stockQuantity: book.stockQuantity
            };

            adminService.addBookStock(newBookStock)
                .then((resp) => {
                    console.log(resp.data);
                    setMessage("Book Stock Added successfully!");
                    setErrorMessage("");
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Error adding Book Stock: " + JSON.stringify(err.response.data));
                });
        } else {
            setErrorMessage("All fields are required.");
        }
    }

    return (
        <>
            <h3>Add new Book Stock:</h3>

            {message && <h3 className="alert alert-success">{message}</h3>}
            {errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>}

            <form onSubmit={handleSubmit}>
                <p>
                    Title: <input type="text" name="bookTitle" value={book.bookTitle} onChange={handleBookChange} required></input>
                </p>
                <p>
                    Author: <input type="text" name="bookAuthor" value={book.bookAuthor} onChange={handleBookChange} required></input>
                </p>
                <p>
                    Price: <input type="number" name="price" value={book.price} onChange={handleBookChange} min="0" required></input>
                </p>
                <p>
                    Image URL: <input type="text" name="image" value={book.image} onChange={handleBookChange}></input>
                </p>
                <p>
                    Category: <input type="text" name="bookCategory" value={book.bookCategory} onChange={handleBookChange}></input>
                </p>
                <p>
                    Stock Quantity: <input type="number" name="stockQuantity" value={book.stockQuantity} onChange={handleBookChange} min="0" required></input>
                </p>
                <button type="submit">Add Book Stock</button>
            </form>
        </>
    );
}

export default AddBook;
