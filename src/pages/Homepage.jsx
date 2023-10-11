import React, { useState } from "react";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import LatestBlog from "../components/Sidebar/LatestBlog";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../components/Util/Helmet";

const Homepage = () => {
  const [selectedShops, setSelectedShops] = useState([]);

  // Callback function to receive selected checkbox values
  const handleSelectedShopsChange = (selectedValues) => {
    setSelectedShops(selectedValues);
  };

  return (
    <>
      <HelmetProvider>
        <SEO
          Meta_title="HotDealsBazaar - Unearth Exclusive Daily Deals on Products"
          Meta_description="Discover unbeatable daily deals on a wide range of products at HotDealsBazaar. We curate the freshest deals just for you. Get the best discounts with every visit."
        />
        <div className="container">
          <div className="row d-flex flex-md-row flex-column-reverse">
            <div className="col-md-3 mt-3">
              <div className="sticky_sidebar">
                <Sidebar onSelectedShopsChange={handleSelectedShopsChange} />
                <LatestBlog />
              </div>
            </div>
            <div className="col-md-9 mt-3">
              <Content platform={selectedShops} />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};
export default Homepage;
