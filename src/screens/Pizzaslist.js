import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deletePizza, getAllPizzas } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Navbar from '../components/navbar';

export default function Pizzaslist() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      return <Navigate to="/" />;
    }
    dispatch(getAllPizzas());
  }, [dispatch, currentUser]);

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

          <h6 style={{ fontSize: '27px' }}>Pizzas List</h6>
          {loading && <Loading />}
          {error && <Error error="Something went wrong" />}

          <table className="tab table-bordered table-responsive-sm" style={{ width:"100%" }}>
            <thead className="thead-dark table" sbtyle={{ fontSize: '18px' }}>
              <tr>
                <th>Name</th>
                <th>Prices</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='table'>
              {pizzas &&
                pizzas.map((pizza) => (
                  <tr className=" pizza-font" style={{ fontSize: '16px' }} key={pizza._id}>
                    <td>{pizza.name}</td>
                    <td>
                      Small: {pizza.prices[0]['small']} <br />
                      Medium: {pizza.prices[0]['medium']} <br />
                      Large: {pizza.prices[0]['large']}
                    </td>
                    <td>{pizza.category}</td>
                    <td>
                      <i
                        className="fa fa-trash"
                        style={{ color: 'red' }}
                        onClick={() => {
                          dispatch(deletePizza(pizza._id));
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}