import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar';
export default function Addpizza() {
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch()

  const addpizzastate = useSelector(state => state.addPizzaReducer)
  const { success, error, loading } = addpizzastate
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser.isAdmin]);
  function formHandler(e) {

    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice
      }
    }

    console.log(pizza);
    dispatch(addPizza(pizza));

  }

  return (
    <div>
      <Navbar />
      <div className="row justify-content-center p-3 ">
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
      <div className='addpizza'>
        <h6 style={{ fontSize: "25px" }}>Add Pizza</h6>

        {loading && (<Loading />)}
        {error && (<Error error='Something went wrong' />)}
        {success && (<Success success='New Pizza added successfully' />)}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="small varient price"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="medium varient price"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="large varient price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className='btn mt-3 btnn' type='submit'>Add Pizza</button>
        </form>
      </div>
    </div>
  );
}