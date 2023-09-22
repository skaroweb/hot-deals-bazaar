import Navbar from "../Navbar/TopNav";
import { useLocation } from "react-router-dom";

import "./style.css";
import { useSearch } from "../../Context/SearchContext";

const Header = () => {
  const { searchText, setSearchText } = useSearch();
  const location = useLocation();

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value); // Update the search text in the context
  };

  return (
    <>
      <header id="header">
        <Navbar />
        <div className="header-holder container">
          <div className="row">
            <div className="col-xs-12">
              <div className="logo">
                <img src="/logo.png" alt="Coupmy" className="img-responsive" />
              </div>
              {location.pathname === "/" && (
                <form
                  className="navbar-form navbar-right search-form hidden-xs"
                  method="get"
                  action=""
                >
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchInputChange}
                    name="q"
                    id="q"
                    placeholder="Search Offers, Deals, Coupons, Recharge"
                    className="form-control"
                  />
                  <button
                    type="submit"
                    id="search"
                    className="btn btn-primary"
                    disabled
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
