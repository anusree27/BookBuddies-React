import { useState } from "react";
import adminService from "../../services/AdminService";

function AddBook() {
    let [book, setBook] = useState({
        "bookTitle": '',
        "bookAuthor": '',
        "price": 0,
        "image": '',
        "bookCategory": ''
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const handleBookChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (book && book.bookTitle && book.bookAuthor) {
            // Check if book, bookTitle, and bookAuthor are not null before submitting
            adminService.addBook(book)
                .then((resp) => {
                    console.log(resp.data);
                    setMessage("Book Added successfully!");
                    setErrorMessage("");
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Errors occurred in the following fields: " + JSON.stringify(err.response.data));
                });
        } else {
            setErrorMessage("Book Title and Author are required fields.");
        }
    }

    return (
        <>
            <h3>Add new Book:</h3>

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
                <button type="submit">Add Book</button>
            </form>
        </>
    );
}

export default AddBook;
