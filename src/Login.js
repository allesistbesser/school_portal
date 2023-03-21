import React, { useState } from "react";
import axios from "axios";

const Login = ({setislogin,settoken,setendpoint,endpoint}) => {
  
  const [user, setuser] = useState();
  const [username, setusername] = useState(sessionStorage.getItem("username1"));
  const [password, setpassword] = useState(sessionStorage.getItem("password1"));
  const [Error, setError] = useState();

  const login = async (username, password,endpoint) => {
    await axios
      .post(`${endpoint}/auth/signin`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setuser(res.data);
        setislogin(true);
        settoken(res.data.token)
        console.log(res.data);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let infologin = {};
    data.forEach(function (value, key) {
      infologin[key] = value;
    });
    setendpoint(infologin.endpoint)
    await login(infologin.username, infologin.password,infologin.endpoint)
      .then(() => {
        sessionStorage.setItem("username1", username);
        sessionStorage.setItem("password1", password);
        sessionStorage.setItem("endpoint",endpoint);
        setError("");
      })
      .catch((err) => {
        setError(err);
        setuser("");
      });
  };

  return (
    <div className="container col-6 mt-5">
      <h2 className="text-center text-primary fw-bold fs-1 mb-5">
        <i className="bi bi-person-circle me-2" /> Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Endpoint</label>
          <input
            name="endpoint"
            type="text"
            className="form-control"
            value={endpoint|| ""}
            onChange={(e) => setendpoint(e.target.value)}
          />
          <div className="form-text">OR</div>
          <label className="form-label">User Name</label>
          <input
            name="username"
            value={username || ""}
            onChange={(e) => setusername(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={password || ""}
            onChange={(e) => setpassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary container">
          SIGN IN
        </button>
        {Error?.message?.toLowerCase().includes("failed") ? (
          <h3 className="mt-5 alert alert-danger" role="alert">
            username or password is wrong
          </h3>
        ) : null}
        {Error?.message?.toLowerCase().includes("network") ? (
          <h3 className="mt-5 alert alert-danger" role="alert">
            Server Error
          </h3>
        ) : null}
      </form>
      <h3>{user?.token?.slice(-10, user?.token?.length)}</h3>
    </div>
  );
};
export default Login;
