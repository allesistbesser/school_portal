import React, { useState, useEffect } from "react";
import axios from "axios";

const UserByRole = ({ token, endpoint }) => {
  const [role, setrole] = useState("ROLE_TEACHER");
  const [users, setusers] = useState();
  const [userInfo, setuserInfo] = useState();
  const [userName, setuserName] = useState([])

  const getUserByRole = async (role) => {
    await axios
      .get(`${endpoint}/user/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
          role: role,
        },
      })
      .then((res) => {
        setusers(res.data);
        // console.log("resData users", res.data);
        userNameGet(res.data)
      })
      .catch((err) => console.log(err));
  };

  const userInfoGet = async (id) => {
    await axios
      .get(`${endpoint}/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accountId: id,
        },
      })
      .then((res) => setuserInfo(res.data));
  };
  // user info deneme

  const userNameGet = async (users) => {
    let UserNameOne=[]
    for (let i = 0; i < users.length; i++) {
      await axios
        .get(`${endpoint}/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accountId: users[i].accountId,
          },
        })
        .then((res) => {UserNameOne.push(res.data)});
    };
      setuserName(UserNameOne)
  }


const handleSubmit = async (event) => {
  event.preventDefault();
  setuserInfo();
  
  await getUserByRole(event.target.value)
    .then(() => { })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  getUserByRole(role);
}, []);

console.log("userNAme state",userName);
return (
  <div className="main">
    <div>
      <h2>User Search By Role</h2>
      <form>
        <div className="form-group col-md-2 ms-5">
          <label htmlFor="roles">Role</label>
          <select
            name="roles"
            id="roles"
            className="form-select"
            defaultValue={"ROLE_TEACHER"}
            onChange={(e) => {
              handleSubmit(e);
            }}
          >
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_TEACHER">Teacher</option>
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_GUARDIAN">GUARDIAN</option>
          </select>
        </div>
      </form>
      <table
        role="button"
        className="table table-primary table-striped mt-5"
        style={{ width: "550px" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {userName?.map((user, key) => (
            <tr key={key}>
              <th scope="row">#</th>
              <td >{user?.username}</td>
              <td >{user?.firstname} {user?.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {userInfo ? (
      <div className="card m-5" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src="https://www.shutterstock.com/image-vector/standard-user-icon-avatar-260nw-467859071.jpg"
          alt="Card image cap"
        />
        <div className="card-body">
          <h4>user name: {userInfo?.username}</h4>
          <h5 className="card-title">
            {userInfo?.firstname} {userInfo?.lastname}
          </h5>

          <a href="#" className="btn btn-primary">
            Passoword Change
          </a>
        </div>
      </div>
    ) : null}

  </div>
);
};

export default UserByRole;
