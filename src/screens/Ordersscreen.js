import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../actions/orderActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/navbar';

export default function Ordersscreen() {
  AOS.init();
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h6 style={{ fontSize: '35px', color: "black", marginTop: "10px" }}>My Orders</h6>
      <hr />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => (
            <div
              className="col-md-8 m-2 p-1"
              data-aos="fade-down"
              style={{ backgroundColor: "rgba(249, 246, 246, 0.300)", backdropFilter: "blur(16px)", borderRadius: "16px" }}
              key={order._id}
            >
              <div className="flex-container" style={{ marginTop: "10px" }}>
                <div className="text-left w-100 m-1">
                  <h6 style={{ fontSize: '25px' }} className='pizza-font'>Items</h6>
                  <hr />
                  {order.orderItems.map((item) => (
                    <div key={item._id}>
                      <p className='pizza-font'>
                        {item.name} [{item.varient}] * {item.quantity} ={' '}
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-left w-100 m-1">
                  <h6 style={{ fontSize: '25px' }} className='pizza-font'>Address</h6>
                  <hr />
                  {order.shippingAddress ? (
                    <>
                      <p className='pizza-font'>STREET: {order.shippingAddress.street || 'N/A'}</p>
                      <p className='pizza-font'>City: {order.shippingAddress.city || 'N/A'}</p>
                      <p className='pizza-font'>Country: {order.shippingAddress.country || 'N/A'}</p>
                      <p className='pizza-font'>Pincode: {order.shippingAddress.pincode || 'N/A'}</p>
                    </>
                  ) : (
                    <p className='pizza-font'>  Shipping address not available</p>
                  )}
                </div>
                <div className="text-left w-100 m-1">
                  <h6 style={{ fontSize: '25px' }} className='pizza-font'>Order Info</h6>
                  <hr />
                  <p className='pizza-font'>Order Amount: {order.orderAmount}</p>
                  <p className='pizza-font'>Date: {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</p>
                  <p className='pizza-font'>Transaction Id: {order.transactionId || 'N/A'}</p>
                  <p className='pizza-font'>Order Id: {order._id}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}