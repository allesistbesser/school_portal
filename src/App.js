import "./App.css";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { useState } from "react";
import Navbar from "./Navbar";
import UserByRole from "./UserByRole";

function App() {
  const [islogin, setislogin] = useState(false)
  const [pageNumber, setpageNumber] = useState(0)
  const [token, settoken] = useState()
  const [endpoint, setendpoint] = useState(sessionStorage.getItem("endpoint"))
  return (
    <div className="App">
      <Navbar islogin={islogin} setislogin={setislogin} settoken={settoken} setpageNumber={setpageNumber}/>
     
      {islogin == false ? <Login setpageNumber={setpageNumber} setislogin={setislogin} settoken={settoken} setendpoint={setendpoint} endpoint={endpoint}/>: null}
      {pageNumber == 1 ? <CreateUser token={token} endpoint={endpoint}/>: null}
      {pageNumber == 2 ? <UserByRole token={token} endpoint={endpoint}/> : null}
    </div>
  );
}

export default App;
