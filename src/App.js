import "./App.css";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [islogin, setislogin] = useState(false)
  const [token, settoken] = useState()
  const [endpoint, setendpoint] = useState(sessionStorage.getItem("endpoint"))
  return (
    <div className="App">
      <Navbar islogin={islogin} setislogin={setislogin} settoken={settoken}/>
     
      {islogin == false ? <Login setislogin={setislogin} settoken={settoken} setendpoint={setendpoint} endpoint={endpoint}/>: null}
      {islogin == true ? <CreateUser token={token} endpoint={endpoint}/>: null}
    </div>
  );
}

export default App;
