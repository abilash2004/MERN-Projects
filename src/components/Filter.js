import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");

  const handleFilter = () => {
    dispatch(filterPizzas(searchkey, category));
  };

  return (
    <div >
      <div className="row justify-content-left pizza-font">
        <div className="form">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="non veg">Non Veg</option>
          </select>
        </div>
        <div className="col-md-1 custom-margin">
          <button className="btn bi bi-funnel-fill custom-margin" onClick={handleFilter}>
          </button>
        </div>
      </div>
    </div>
  );
}
