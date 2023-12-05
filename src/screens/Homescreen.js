import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Pizza from '../components/pizza'
import Filter from "../components/Filter";
import Load from "../components/Load";
import Error from "../components/Error";
import Navbar from '../components/navbar';
export default function Homescreen() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div>
      <Navbar />
      <Filter />
      <div className="row justify-content-center home">
        {loading ? (
          <Load />
        ) : error ? (
          <Error error="Somthing Went Wrong" />
        ) : (pizzas.map((pizza) => {
          return (<div className="col-md-4" key={pizza._id}>
            <div>
              <Pizza pizza={pizza} />
            </div>
          </div>)
        }))}
      </div>
      <footer className="footer bg-dark text-light">
        <div >
          <div className="row">
            <div className="Name">
              <h5>Contact Us</h5>
              <p>info@example.com</p>
              <p>(123) 456-7890</p>
            </div>
            <p>&#169; 2023 copyright all right reserved</p>
          </div>
        </div>
      </footer>
    </div>

  )
}