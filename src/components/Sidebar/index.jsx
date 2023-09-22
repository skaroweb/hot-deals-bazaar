import React, { useState, useEffect } from "react";
import "./index.css";
import { useShop } from "../../Context/ShopContext";

const Sidebar = ({ onSelectedShopsChange }) => {
  // const [searchText, setSearchText] = useState("");
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const { shopname } = useShop();

  useEffect(() => {
    // Initialize the filteredShops state with default values once shopname is available
    setFilteredShops(
      shopname
        .map((shop) => ({ id: shop.id, name: shop.name }))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [shopname]);

  // const handleSearch = (event) => {
  //   const searchText = event.target.value.toLowerCase();
  //   setSearchText(searchText);

  //   // Filter shops that match the search text
  //   const matchingShops = filteredShops.filter((shop) =>
  //     shop.name.toLowerCase().includes(searchText)
  //   );

  //   setFilteredShops(matchingShops);
  // };

  const handleCheckboxChange = (event) => {
    const shopId = event.target.id;
    const isChecked = event.target.checked;

    // Update the selectedShops state based on checkbox changes
    if (isChecked) {
      setSelectedShops([...selectedShops, shopId]);
    } else {
      setSelectedShops(selectedShops.filter((id) => id !== shopId));
    }
  };

  // Use useEffect to listen for changes in selectedShops and call the callback
  useEffect(() => {
    onSelectedShopsChange(selectedShops);
  }, [selectedShops]);

  return (
    <div className="sidebar">
      <div className="panel panel-default shopsList">
        <div className="panel-heading">
          <h2 className="panel-title">Popular Online Shops</h2>
        </div>
        <div
          id="collapseTwo"
          className="panel-collapse  in"
          aria-expanded="true"
        >
          <div className="panel-body">
            {/* <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="shopsFilter"
                placeholder="Search Shops..."
                onChange={handleSearch}
                value={searchText}
              />
            </div> */}
            <ul className="list-group" id="shopsFilterul">
              {filteredShops.map((shop) => (
                <li key={shop.id} className="list-group-item">
                  <input
                    type="checkbox"
                    name="shops"
                    id={shop.id}
                    data-shop-id={shop.id}
                    onChange={handleCheckboxChange}
                    checked={selectedShops.includes(shop.id)}
                  />
                  <label htmlFor={shop.id}>{shop.name}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
