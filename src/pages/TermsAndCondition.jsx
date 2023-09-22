import Innerpage from "../components/InnerPages";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TermsAndCondition = () => {
  const [page, setPage] = useState([]);

  const StrapiCMSURL = "http://localhost:1337";

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/api/terms-and-condition?populate=*"}`;

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
export default TermsAndCondition;
