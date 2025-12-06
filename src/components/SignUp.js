import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authAPI";

import ValidationSummary from "./ValidationSummary";

function SignUp() {
  const [errors, setErrors] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (evt) => {
    const nextCredentials = { ...credentials };
    nextCredentials[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors([]);
    if (!validateForm()) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    register(credentials).then((data) => {
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        setSuccess(true);
      }
    });
  };

  const validateForm = () => {
    return credentials.password === credentials.confirmPassword;
  };

  return (
    <div>
      <ValidationSummary errors={errors} />
      {success ? (
        <div className="alert alert-success">
          Congratulations {credentials.username}, you have been registered.
          Login <Link to="/login">here</Link>.
        </div>
      ) : (
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
            <div className="form-group align-left">
              <label htmlFor="label">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-lg">
                Sign up
              </button>
              <Link to="/" className="btn btn-warning btn-lg">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
