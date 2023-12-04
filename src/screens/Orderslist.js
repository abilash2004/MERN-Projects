import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from '../components/navbar';
export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getordersstate;
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser.isAdmin]);
  useEffect(() => {
    dispatch(getAllOrders());
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
      <h6 style={{ fontSize: "25px" }}>Add Pizza</h6>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="tab table-striped table-bordered table-responsive-sm" style={{width:"80%"}}>
        <thead className="thead-dark table pizza-font">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>

        <tbody  className="table pizza-font">
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userid}</td>
                  <td>INR:{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  {/* <td>
                    {order.isDelivered ? (
                      <h1>Delivered</h1>
                    ) : (
                      <button className="btn" onClick={() => { dispatch(deliverOrder(order._id)) }}>Deliver</button>
                    )}
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}