import { useEffect, useState } from "react";

const useSheets = (sheetId) => {
  // variables
  const url = process.env.REACT_APP_API_URL;
  const URL = url + "api/v1/sheet/";

  // state
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState([]);

  // fetch sheet matching sheetId
  useEffect(() => {
    const fetchSheet = async () => {
      const fetchData = async (link) => {
        const response = await fetch(link);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        return response.json();
      };

      try {
        const sheet = await fetchData(URL + sheetId);
        setSheet(sheet);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheet();
  }, [URL, sheetId]);

  return [sheet, setSheet, loading];
};

export default useSheets;
