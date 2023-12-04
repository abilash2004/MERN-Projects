import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/userAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success"
import { Link } from "react-router-dom";
export default function () {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const registerstate = useSelector(state => state.registerUserReducer)
  const { error, loading, success } = registerstate
	const [msg, setMsg] = useState("");
  const dispatch = useDispatch()
  function register() {

    if (password != cpassword) {
      alert("passwords not matched")
    }
    else {
      const user = {
        name,
        email,
        password
      }
      console.log(user);
      dispatch(registerUser(user))
    }

  }
  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 register rounded">

          {loading && (<Loading />)}
          {success && (<Success success='User Registered Successfully' />)}
          {error && (<Error error='Email already registred' />)}

          <h6 className="text-center m-1" style={{ fontSize: "35px" }}>
            Register
          </h6>
          <div>
            <input required type="text" placeholder="name" className="form-control" value={name} style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }} onChange={(e) => { setname(e.target.value) }} />
            <input required type="text" placeholder="email" className="form-control" value={email} style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }} onChange={(e) => { setemail(e.target.value) }} />
            <input
              type="text"
              placeholder="password"
              className="form-control"
              value={password}
              required
              style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }}
              onChange={(e) => { setpassword(e.target.value) }}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control"
              value={cpassword}
              required
              style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }}
              onChange={(e) => { setcpassword(e.target.value) }}
            />
            <button onClick={register} className="btn mt-3 mb-3">Register</button>
          </div>
          <a style={{ color: 'black' }} href="/login">click here to Login?</a>
        </div>
      </div>
    </div>
  )
}