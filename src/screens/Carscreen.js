import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { deleteFromCart } from '../actions/cartActions'
import Checkout from '../components/Checkout'
import Navbar from '../components/navbar';

export default function Cartscreen() {

    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0)
    const dispatch = useDispatch()
    return (
        <div >
            <Navbar />
            <div className="row justify-content-center p-2 cart" >

                <div className="col-md-6" >
                    <h6 style={{ fontSize: '40px', color: "white" }}>My Cart</h6>

                    {cartItems.map(item => {
                        return (
                            <div className="flex-container" style={{ margin: "25px", marginTop: "5px", backgroundColor: "rgba(249, 246, 246, 0.300)", backdropFilter: "blur(10px)", borderRadius: "16px" }}>

                                <div className='text-left m-2 w-100'>
                                    <h2>{item.name} [{item.varient}]</h2>
                                    <h3>Price : {item.quantity} x {item.prices[0][item.varient]} = {item.price}</h3>
                                    <h4 style={{ display: 'inline' }}>Quantity : </h4>
                                    <i className="fa fa-plus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}></i>
                                    <b>{item.quantity}</b>
                                    <i className="fa fa-minus" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}></i>
                                    <hr />
                                </div>

                                <div className='m-1 w-100'>
                                    <img src={item.image} style={{ height: '80px', height: '80px', borderRadius: "15px", marginTop: "20px" }} />
                                </div>
                                <div className='m-1 w-100'>
                                    <i className="fa fa-trash mt-5" aria-hidden="true" onClick={() => { dispatch(deleteFromCart(item)) }}></i>
                                </div>

                            </div>)
                    })}



                </div>

                <div className="col-md-4 text-right" style={{ marginTop: "52px", backgroundColor: "rgba(249, 246, 246, 0.300)", backdropFilter: "blur(10px)", borderRadius: "16px", height: "90px", width: "250px" }}>
                    <h2 style={{ fontSize: '45px' }}>SubTotal : {subtotal} /-</h2>
                    <Checkout subtotal={subtotal} />
                </div>

            </div>
        </div>
    )
}
