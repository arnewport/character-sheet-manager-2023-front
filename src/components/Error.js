import { useLocation } from "react-router-dom";

function Error({ message }) {
  const location = useLocation();

  return (
    <p>
      Error {location.state ? ` - ${location.state.message}` : ""}
      {message}
    </p>
  );
}

export default Error;
