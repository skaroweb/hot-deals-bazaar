import { NavLink } from "react-router-dom";

import "./topNav.css";

const TopNav = () => {
  // Define the navigation items
  const navigationItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "More",
      url: "/more",
      subItems: [
        {
          name: "Privacy Policy",
          url: "/privacy-policy",
        },
        {
          name: "Terms and Conditions",
          url: "/terms-and-conditions",
        },
        {
          name: "Disclaimer",
          url: "/disclaimer",
        },
      ],
    },
  ];

  // Generate JSON-LD structured data for SiteNavigationElement
  const siteNavigationElements = navigationItems.map((item, index) => ({
    "@type": "SiteNavigationElement",
    name: item.name,
    url: item.url,
  }));

  // Add sub-navigation items
  navigationItems.forEach((item, index) => {
    if (item.subItems && item.subItems.length > 0) {
      siteNavigationElements[index]["potentialAction"] = {
        "@type": "SearchAction",
        target: item.url, // Replace with the actual search target URL if needed
        "query-input": "required name=search_term_string",
      };
      siteNavigationElements[index]["mainEntity"] = item.subItems.map(
        (subItem) => ({
          "@type": "SiteNavigationElement",
          name: subItem.name,
          url: subItem.url,
        })
      );
    }
  });

  return (
    <div>
      <nav id="nav">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 d-flex justify-content-between topnavres">
              <ul className="list-unstyled">
                <li>
                  <NavLink to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog">
                    <i className="fa fa-rss" aria-hidden="true"></i>
                    Blog
                  </NavLink>
                </li>
                <li className="dropdown">
                  <span>
                    More <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </span>

                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                    </li>
                    <li>
                      <NavLink to="/terms-and-conditions">
                        Terms and Conditions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/disclaimer">Disclaimer</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="social-icons">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61552405893743"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <i class="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/hotdealsbazaar"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <i class="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@Hotdealsbazaar"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <i class="fab fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://in.pinterest.com/hotdealsbazaar/"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <i class="fab fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/hotdealsbazaar/"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          name: "Hot Deals bazaar",
          url: "https://www.hotdealsbazaar.com", // Replace with your website URL
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://www.hotdealsbazaar.com/search?q={search_term_string}", // Replace with your site's search URL
            "query-input": "required name=search_term_string",
          },
          mainEntity: siteNavigationElements,
        })}
      </script>
    </div>
  );
};
export default TopNav;
