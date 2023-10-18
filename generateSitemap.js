const fs = require("fs");
const path = require("path");
const { SitemapStream } = require("sitemap");

const routes = [
  "/",
  "/about",
  // Add other routes for your project's pages
];

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: "https://hotdealsbazaar.com" }); // Replace with your domain

  for (const route of routes) {
    sitemap.write({ url: route });
  }

  sitemap.end();
  const sitemapXML = sitemap.toString();

  // Specify the path to the public folder
  const publicFolderPath = path.join(__dirname, "public");
  const sitemapPath = path.join(publicFolderPath, "sitemap.xml");

  // Save the sitemap to the public folder
  fs.writeFileSync(sitemapPath, sitemapXML);
  console.log("Sitemap generated and saved to public/sitemap.xml");
};

generateSitemap();
