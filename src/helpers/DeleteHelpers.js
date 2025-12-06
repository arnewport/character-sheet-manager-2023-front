const url = process.env.REACT_APP_API_URL;

const handleDelete = (id, navigate) => {
  if (id !== null) {
    const config = {
      method: "DELETE",
    };

    const deleteAllUserSheets = async () => {
      fetch(url + "api/v1/userSheet/deleteAll/" + id, config)
        .then((response) => {
          if (response.ok) {
            // success
            deleteSheet();
          } else {
            // failure
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const deleteSheet = async () => {
      fetch(url + "api/v1/sheet/" + id, config)
        .then((response) => {
          if (response.ok) {
            // success
            navigate("/home");
          } else {
            // failure
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    deleteAllUserSheets();
  }
  return;
};

export default handleDelete;
