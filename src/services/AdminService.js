import { axiosInstance } from "./axios-http-client";

class AdminService {
    getAllBooks() {
        return axiosInstance.get('http://localhost:8080/user/allbooks');
    }
    getAllBookStocks() {
        return axiosInstance.get('http://localhost:8080/stockmanager/books');
    }

    deleteBookStockById(id) {
        console.log("Service");
        return axiosInstance.delete('http://localhost:8080/stockmanager/book/' + id);
    }

    updateBookStock(bookDetails) {
        return axiosInstance.patch('http://localhost:8080/stockmanager/book', bookDetails);
    }

    addBookStock(bookDetails) {
        return axiosInstance.post('http://localhost:8080/stockmanager/book', bookDetails);
    }
}

export default new AdminService();
