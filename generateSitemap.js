const fs = require("fs");
const sharedState = require("./src/sharedState"); // Import the shared state

// Create a sitemap XML string
const routes = [
  "/",
  "/blog",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  // Add your application's routes here
];

const blogPostURLs = sharedState.bloglist.map(
  (post) => `/blog/${post.attributes.Title}`
); // Get dynamically generated blog post URLs

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
