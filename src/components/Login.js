import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authAPI";

import AuthContext from "../contexts/AuthContext";
import ValidationSummary from "./ValidationSummary";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const { handleLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors([]);
    login(credentials)
      .then((user) => {
        handleLoggedIn(user);
        navigate("/home");
      })
      .catch((err) => {
        setErrors(["Invalid username/password."]);
      });
  };

  const handleChange = (evt) => {
    const nextCredentials = { ...credentials };
    nextCredentials[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
  };

  return (
    <div>
      <ValidationSummary errors={errors} />
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="label">Username</label>
            <input
              type="text"
              className="form-control align-left"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="label">Password</label>
            <input
              type="password"
              className="form-control align-left"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary btn-lg">
              Log in
            </button>
            <Link to="/" className="btn btn-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
