import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from '../actions/userAction';
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Navbar from '../components/navbar';
import Loading from "../components/Loading";

export default function Userslist() {
    const dispatch = useDispatch();
    const usersstate = useSelector(state => state.getAllUsersReducer);
    const { error, loading, users } = usersstate;
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/";
        }
    }, [currentUser.isAdmin]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center p-3">
            <div className="col-md-5">
          <h6 style={{ fontSize: "35px" }}>Admin Panel</h6>

          <ul className="adminfunctions"  style={{borderRadius:"50px"}}>
            <li>
              <Link to={'/admin/userslist'} style={{ color: 'white', textDecoration:"none" }}>Users List</Link>
            </li>
            <li>
              <Link to={'/admin/pizzaslist'} style={{ color: 'white', textDecoration:"none" }}>Pizzas List</Link>
            </li>
            <li>
              <Link to={'/admin/addpizza'} style={{ color: 'white', textDecoration:"none" }}>Add Pizza</Link>
            </li>
            <li>
              <Link to={'/admin/orderslist'} style={{ color: 'white', textDecoration:"none" }}>Orders List</Link>
            </li>
                    </ul>
                </div>
            </div>
            <div>
                <h6 style={{ fontSize: "27px" }}>Users list</h6>
                {loading && <Loading />}
                {error && <Error error="Something went wrong" />}
                {users && users.length > 0 ? (
                    <table className='tab table-bordered table-responsive-sm' style={{ width:"50%" }}>
                        <thead className='thead-dark table' style={{ fontSize: "18px" }}>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody className="table pizza-font" style={{ fontSize: "16px" }}>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <i className='fa fa-trash' style={{ color: "red" }} onClick={() => { dispatch(deleteUser(user._id)) }}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users available.</p>
                )}
            </div>
        </div>
    );
}
