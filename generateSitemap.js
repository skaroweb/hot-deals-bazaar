const fs = require("fs");

// Simulated blog post URLs, replace this with your actual data retrieval logic
function getBlogPostURLs() {
  // Fetch and return a list of blog post URLs
  return [
    "/blog/flipkart-great-indian-festival-2023-shop-the-best-deals-offers",
    "/blog/the-top-10-compact-phones-redefining-portability-in-2023",
    // Add more blog post URLs as needed
  ];
}

// Create a sitemap XML string
const routes = [
  "/",
  "/blog",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  // Add your application's routes here
];
const blogPostURLs = getBlogPostURLs();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .concat(blogPostURLs)
  .map(
    (route) => `
    <url>
      <loc>https://hotdealsbazaar.com${route}</loc>
    </url>
  `
  )
  .join("")}
</urlset>`;

// Write the sitemap to a file
fs.writeFileSync("public/sitemap.xml", sitemap);
