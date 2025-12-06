import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container-fluid">
      <h1 className="display-3 mt-3">Character Sheet Manager</h1>
      <div className="d-flex flex-grow-1 justify-content-end">
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-info btn-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Landing;
