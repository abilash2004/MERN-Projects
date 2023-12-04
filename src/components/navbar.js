import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";

function Navbar() {
    const cartstate = useSelector((state) => state.cartReducer);
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch()
    return (
        <div style={{
            position: "sticky",
            top: "0",
            zIndex: "100",
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(249, 246, 246, 0.300)",
        }}>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 rounded" >
                <a className="navbar-brand pizza-font" href="/" style={{ fontSize: "25px", marginLeft: "10px" }}>
                    It's Pizza Time
                </a>
                <div className=" navbar-collapse pizza-font" id="navbarNav" style={{ fontSize: "20px" }}>
                    <ul className="navbar-nav ms-auto">

                        {currentUser ? (<div class="dropdown">
                            <button class=" btn-secondary dropdown-toggle nav-link " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentUser.name}
                            </button>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item bi bi-bag" href="/orders">     Orders</a></li>
                                <li><a class="dropdown-item" href="#" onClick={() => { dispatch(logoutUser()) }}><li class="bi bi-box-arrow-left">      Logout</li></a></li>
                            </ul>
                        </div>) :
                            (<li className="nav-item">
                                <a className="nav-link bi bi-box-arrow-right" href="/login">
                                    Login
                                </a>
                            </li>)}
                        <li className="nav-item ">
                            <a className="nav-link bi bi-cart3" href="/cart">
                                Cart {cartstate.cartItems.length}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
