import React, { useState } from "react";
import axios from "axios";

const CreateUser = ({ token , endpoint}) => {
  const [user, setuser] = useState();

  const create = async (infoUser) => {
    await axios
      .post(`${endpoint}/user/create`, infoUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let infoUser = {};
    let address = {};
    data.forEach(function (value, key) {
      if (key == "roles") {
        infoUser[key] = [value];
      } else if (
        key == "street" ||
        key == "number" ||
        key == "city" ||
        key == "state" ||
        key == "zip"
      ) {
        address[key] = value;
      } else if (key == "birthdate" && value =="") {
        infoUser[key] ="1999-01-01"
      }
      else {
        infoUser[key] = value;
      }
    });
    infoUser["address"] = address
    console.log(infoUser);

    await create(infoUser)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container col-9 mt-5">
      <h2 className="text-center text-danger fw-bold fs-1 mb-5">
        <i className="bi bi-person-circle me-2" /> Create User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="username">User Name</label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="roles">Role</label>
            <select
              name="roles"
              id="roles"
              className="form-select"
              defaultValue={"ROLE_STUDENT"}
             
            >
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_TEACHER">Teacher</option>
              <option value="ROLE_STUDENT">Student</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="firstname">First Name</label>
            <input
              name="firstname"
              type="text"
              className="form-control"
              id="firstname"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastname">Last Name</label>
            <input
              name="lastname"
              type="text"
              className="form-control"
              id="lastname"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="inputPassword4"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              name="birthdate"
              type="date"
              className="form-control"
              id="birthdate"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              className="form-select"
              defaultValue={"MALE"}
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>
        </div>

        <div className="row mt-5">
          <div className="form-group col-md-6">
            <label htmlFor="street">Street</label>
            <input
              name="street"
              type="text"
              className="form-control"
              id="street"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="number">number</label>
            <input name="number" type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="city">City</label>
            <input
              name="city"
              type="text"
              className="form-control "
              id="city"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <input
              name="state"
              type="text"
              className="form-control"
              id="state"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="zip">Zip</label>
            <input name="zip" type="text" className="form-control" id="zip" />
          </div>
        </div>
        <div className="form-group"></div>
        <button type="submit" className="btn btn-primary mt-4">
          Sign in
        </button>
      </form>
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
    </div>
  );
};

export default CreateUser;
