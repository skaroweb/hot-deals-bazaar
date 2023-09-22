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
          Meta_title="Homepage - Hot Deals Bazaar"
          Meta_description="Hot Deals Bazaar but loot products"
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
