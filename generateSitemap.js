const fs = require("fs");
const routes = [
  "/",
  "/blog",

  // Add your application's routes here
];

// Create a sitemap XML string
const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        (route) => `
      <url>
        <loc>https://hotdealsbazaar.com${route}</loc>
      </url>
    `
      )
      .join("")}
  </urlset>
`;

// Write the sitemap to a file
fs.writeFileSync("public/sitemap.xml", sitemap);
