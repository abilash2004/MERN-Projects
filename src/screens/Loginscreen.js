import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../actions/userAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const loginstate = useSelector(state => state.loginUserReducer)
  const { loading, error } = loginstate
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/'
    }
  }, [])

  function login() {
    const user = { email, password }
    dispatch(loginUser(user))
  }

  return (
    <>
      <div className='login'>
        <div >
          <div>
            <h6 className="text-center m-3" style={{ fontSize: "35px", marginTop: "10px" }}>
              Login
            </h6>

            {loading && (<Loading />)}
            {error && (<Error error='Invalid Credentials' />)}

            <div>
              <input required type="text" placeholder="email" className="form-control" style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }} value={email} onChange={(e) => { setemail(e.target.value) }} />
              <input
                type="text"
                placeholder="password"
                className="form-control"
                value={password}
                style={{ width: "250px", marginRight: "auto", marginLeft: "auto", backgroundColor: "rgba(249, 246, 246, 0.400)", borderColor: "rgba(249, 246, 246, 0.400)" }}
                required
                onChange={(e) => { setpassword(e.target.value) }}
              />

              <button onClick={login} className="btn log mt-3 mb-3">Login</button>
              <br />
              <a style={{ color: 'black' }} href="/register">click here to Register?</a>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
