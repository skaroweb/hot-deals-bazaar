// Breadcrumb.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => {
  const location = useLocation();

  // Create breadcrumbs for the current location
  const breadcrumbs = items.map((item) => {
    const isActive = location.pathname === item.path;
    return {
      ...item,
      isActive,
    };
  });

  // Generate Breadcrumb schema JSON
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.path,
        name: item.label,
      },
    })),
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map((item, index) => (
            <li
              className={`breadcrumb-item ${item.isActive ? "active" : ""}`}
              key={index}
            >
              {item.isActive ? (
                item.label
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {/* Embed Breadcrumb schema JSON */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </div>
  );
};

export default Breadcrumb;
