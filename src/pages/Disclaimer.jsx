import Innerpage from "../components/InnerPages";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Disclaimer = () => {
  const [page, setPage] = useState([]);

  const StrapiCMSURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/disclaimer.json"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const pages = response.data.data;
        setPage(pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Innerpage page={page} />
        </div>
      </div>
    </div>
  );
};
export default Disclaimer;
