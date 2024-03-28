import React, { useState, useEffect } from "react";
import adminService from "../../services/AdminService";

function DisplayBooks() {
    const [bookStocks, setBookStocks] = useState([]);
    const [updateBookStock, setUpdateBookStock] = useState(null);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        adminService.getAllBookStocks()
            .then((resp) => {
                setBookStocks(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        adminService.deleteBookStockById(id)
            .then(() => {
                setBookStocks(bookStocks.filter((bookStock) => bookStock.bookStockId !== id));
                setMessage("Book Stock deleted successfully!");
                setErrorMessage("");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("Error deleting Book Stock: " + JSON.stringify(err));
                setMessage("");
            });
    };

    const handleUpdate = (bookStock) => {
        setUpdateBookStock(bookStock);
    };

    const updateBookStockData = (updatedBookStock) => {
        adminService.updateBookStock(updatedBookStock)
            .then((resp) => {
                console.log(resp.data);
                setMessage("Book Stock updated successfully!");
                setErrorMessage("");
                loadAllData();
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("Error updating Book Stock: " + JSON.stringify(err));
                setMessage("");
            });
    };

    return (
        <>
            <h3>All Book Stocks:</h3>
            {message && <h3 className="alert alert-success">{message}</h3>}
            {errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Stock Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookStocks.map((bookStock) => (
                        <tr key={bookStock.bookStockId}>
                            <td>{bookStock.book.bookId}</td>
                            <td><img src={bookStock.book.image} alt={bookStock.book.bookTitle} style={{ maxWidth: "100px", maxHeight: "100px" }} /></td>
                            <td>{bookStock.book.bookTitle}</td>
                            <td>{bookStock.book.bookAuthor}</td>
                            <td>{bookStock.stockQuantity}</td>
                            <td>
                                <button onClick={() => handleDelete(bookStock.bookStockId)}>Delete</button>
                                <button onClick={() => handleUpdate(bookStock)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {updateBookStock && (
                <UpdateBookStockForm bookStock={updateBookStock} onUpdate={updateBookStockData} />
            )}
        </>
    );
}

function UpdateBookStockForm({ bookStock, onUpdate }) {
    const [updatedStockQuantity, setUpdatedStockQuantity] = useState(bookStock.stockQuantity);

    const handleUpdateBookStock = (e) => {
        e.preventDefault();
        onUpdate({ ...bookStock, stockQuantity: updatedStockQuantity });
    };

    return (
        <form onSubmit={handleUpdateBookStock}>
            <h3>Update Stock Quantity:</h3>
            <p>
                <strong>Book Title:</strong> {bookStock.book.bookTitle}
            </p>
           
            <label htmlFor="updatedStockQuantity">Update Stock Quantity:</label>
            <input
                type="number"
                name="updatedStockQuantity"
                value={updatedStockQuantity}
                onChange={(e) => setUpdatedStockQuantity(e.target.value)}
                required
                min="0"
            />
            <button type="submit">Update Stock Quantity</button>
        </form>
    );
}

export default DisplayBooks;

