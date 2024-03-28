import { useState } from "react";
import accountService from "../../services/AccountService";
import { useEffect } from "react";



function UpdateAccount({ account, onUpdateCompletion }) {
    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");



    let [updateAccount, setUpdateAccount] = useState(account); // assign incoming props to component state

    const handleAccountChange = (e) => {
        setUpdateAccount({ ...account, [e.target.name]: e.target.value });

    }


    const handleUpdate = (e) => {
        e.preventDefault();

        console.log(updateAccount);
        accountService.updateAccount(updateAccount)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Account Updated success!");
                    setErrorMessage("");
                   //onUpdateCompletion();// set isUpdate to false
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    //setErrorMessage("Errors accured in fallowing fields:" + JSON.stringify(err.response.data));
                    setErrorMessage("Could not update !");
                }
            )


    }

    return (
        <>
            <h3>Update your account:</h3>
            {
                message && <h3 className="alert alert-success">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }


            <form onSubmit={handleUpdate}>
                <p>
                    Name: <input type="text" name="name" value={updateAccount.name} onChange={handleAccountChange} required pattern="[a-zA-Z ]{3,16}" title="Name should contain min 3 & max 16 chars , no digits and special chars allowed."></input>
                </p>

                <p>
                    Email: <input type="email" name="email" value={updateAccount.email} onChange={handleAccountChange} disabled></input>
                </p>

                <p>
                    Amount: <input type="number" name="amount" value={updateAccount.amount} onChange={handleAccountChange} min="500" required></input>
                </p>
                <p>
                    Password: <input type="text" name="password" value={updateAccount.password} onChange={handleAccountChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"></input>
                </p>
                <button type="submit">Update Account</button>
                <button onClick={onUpdateCompletion}>Back</button>

            </form>
        </>
    )
}

function AccountsTable({ accountArray, handleDelete, handleUpdate }) {

    console.log(accountArray);



    return (
        <>
            <h3> All Accounts:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        accountArray.map(
                            (account) =>
                            (<tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.name}</td>
                                <td>{account.amount}</td>
                                <td><button onClick={() => handleDelete(account.id)}>Delete</button></td>

                                <td><button onClick={() => handleUpdate(account)}>Update</button></td>
                            </tr>)


                        )
                    }

                </tbody>
            </table>

        </>
    )

}

function DisplayAccounts() {

    //let accounts;

    let [accounts, setAccounts] = useState([]);
    let [isUpdate, setIsUpdate] = useState(false);
    let [updateAccount, setUpdateAccount] = useState({});





    useEffect(() => {
        //Runs only on the first render
        loadAllData();
    }, []);

    const loadAllData = () => {

        accountService.getAllAccounts()
            .then(
                (resp) => {
                    console.log(resp.data);
                    //accounts = resp.data;
                    setAccounts(resp.data);
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
            .finally(
                () => {
                    console.log("Loaded all data from Server");
                }
            )
    }

    // loadAllData();

    const handleDelete = (id) => {
        console.log(id);
        accountService.deleteAccountById(id)
            .then(
                (resp) => {
                    console.log(resp);
                    setAccounts(accounts.filter((a) => a.id !== id))
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const handleUpdate = (updateAccount) => {
        console.log(updateAccount);
        setUpdateAccount(updateAccount);
        setIsUpdate(true);

    }

    return (
        <>

            {
                isUpdate ? <UpdateAccount account={updateAccount} onUpdateCompletion={() => { setIsUpdate(false); loadAllData() }}></UpdateAccount> :


                    accounts.length > 0 ? <AccountsTable accountArray={accounts} handleDelete={handleDelete} handleUpdate={handleUpdate} /> : <h3> No Accounts found.</h3>
            }
        </>
    );
}

export default DisplayAccounts;