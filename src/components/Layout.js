import { Link, Outlet } from "react-router-dom";
import './Layout.css';

export default function Layout() {
    return (
        <>
       
            <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">

                      

                        <li className="nav-item">
                            <Link to='/books' className="nav-link">Books</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/book' className="nav-link">Add Book</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/subscriptions' className="nav-link">Subscriptions</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/display' className="nav-link">User Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cart' className="nav-link">Cart</Link>
                        </li>

                      
                    </ul>
                </div>

            </nav>

            <Outlet></Outlet>
        </>
    )
}