import Innerpage from "../components/InnerPages";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PrivacyPolicy = () => {
  const [page, setPage] = useState([]);

  const StrapiCMSURL = "https://hot-deals-bazaar-strapi.onrender.com";

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/api/privacy-policy?populate=*"}`;

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
export default PrivacyPolicy;
