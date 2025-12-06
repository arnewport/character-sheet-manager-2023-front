const url = process.env.REACT_APP_API_URL;

const refreshSheet = async (id, setSheet) => {
  if (id) {
    fetch(url + "api/v1/sheet/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            new Error(`Unexpected status code ${response.status}`)
          );
        }
      })
      .then(setSheet)
      .catch((error) => {
        console.error(error);
      });
  }
};

const refreshHome = async (id, setUserSheetArray) => {
  if (id) {
    fetch(url + "api/v1/userSheet/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            new Error(`Unexpected status code ${response.status}`)
          );
        }
      })
      .then(setUserSheetArray)
      .catch((error) => {
        console.error(error);
      });
  }
}

export { refreshSheet, refreshHome };
