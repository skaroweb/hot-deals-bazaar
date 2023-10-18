// const fs = require("fs");

// // Simulated blog post URLs, replace this with your actual data retrieval logic
// function getBlogPostURLs() {
//   // Fetch and return a list of blog post URLs
//   return [
//     "/blog/flipkart-great-indian-festival-2023-shop-the-best-deals-offers",
//     "/blog/the-top-10-compact-phones-redefining-portability-in-2023",
//     // Add more blog post URLs as needed
//   ];
// }

// // Create a sitemap XML string
// const routes = [
//   "/",
//   "/blog",
//   "/privacy-policy",
//   "/terms-and-conditions",
//   "/disclaimer",
//   // Add your application's routes here
// ];
// const blogPostURLs = getBlogPostURLs();

// const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${routes
//   .concat(blogPostURLs)
//   .map(
//     (route) => `
//     <url>
//       <loc>https://hotdealsbazaar.com${route}</loc>
//     </url>
//   `
//   )
//   .join("")}
// </urlset>`;

// // Write the sitemap to a file
// fs.writeFileSync("public/sitemap.xml", sitemap);

const fs = require("fs");
const axios = require("axios");
const StrapiCMSURL = process.env.REACT_APP_SERVER_URL;

// Create a sitemap XML string
const routes = [
  "/",
  "/blog",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  // Add your application's routes here
];

function sanitizeTitleForURL(title) {
  // Replace any whitespace with a hyphen
  title = title.replace(/\s+/g, "-");

  // Remove special characters like "&", ":", and any other unwanted characters
  title = title.replace(/[^a-zA-Z0-9-]/g, "");

  // Replace consecutive hyphens with a single hyphen
  title = title.replace(/-+/g, "-");

  // Convert to lowercase
  title = title.toLowerCase();

  return title;
}

// Function to fetch blog post URLs from an API
async function getBlogPostURLs() {
  try {
    const response = await axios.get(`${StrapiCMSURL + "/blogs.json"}`); // Replace with your API endpoint
    const blogPosts = response.data.data; // Assuming the API returns an array of blog post URLs

    return blogPosts.map(
      (post) => `/blog/${sanitizeTitleForURL(post.attributes.Title)}`
    ); // Adjust this to match your API response structure
  } catch (error) {
    console.error("Error fetching blog post URLs:", error);
    return [];
  }
}

(async () => {
  const blogPostURLs = await getBlogPostURLs();
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
})();
