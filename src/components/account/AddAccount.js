import { useState } from "react";
import accountService from "../../services/AccountService";
function AddAccount() {
    let [account, setAccount] = useState({
        "name": '',
        "amount": 0,
        "email": '',
        "password": ''
    });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");


    const handleAccountChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(account);
        accountService.addAccount(account)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Account Added success!");
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
            <h3>Add new Account:</h3>

            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }


            <form onSubmit={handleSubmit}>
                <p>
                    Name: <input type="text" name="name" value={account.name} onChange={handleAccountChange}    required pattern="[a-zA-Z ]{3,16}" title="Name should contain min 3 & max 16 chars , no digits and special chars allowed."></input>
                </p>

                <p>
                    Email: <input type="email" name="email" value={account.email} onChange={handleAccountChange} required></input>
                </p>

                <p>
                    Amount: <input type="number" name="amount" value={account.amount} onChange={handleAccountChange} min = "500" required></input>
                </p>
                <p>
                    Password: <input type="text" name="password" value={account.password} onChange={handleAccountChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"></input>
                </p>
                <button type="submit">Add Account</button>
            </form>
        </>
    );
}

export default AddAccount; 
