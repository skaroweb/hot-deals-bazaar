import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./LatestBlog.css";

const LatestBlog = ({ blogExcept }) => {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const url = useParams();
  const StrapiCMSURL = process.env.REACT_APP_SERVER_URL;

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

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/blogs.json"}`;
    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming the API response contains an array of blogs
        const topFourblogs = response.data.data;
        const fetchedBlogs = topFourblogs.slice(0, 4);

        const matchingPost = fetchedBlogs.find(
          (post) => sanitizeTitleForURL(post.attributes.Title) === url.id
        );

        // Filter out the matchingPost from the fetchedBlogs array
        const filteredBlogs = fetchedBlogs.filter(
          (post) => post.id !== matchingPost?.id
        );

        if (location.pathname.startsWith("/blog/")) {
          setBlogs(filteredBlogs);
        } else {
          // Update the state with the fetched data
          setBlogs(fetchedBlogs);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array means this effect runs once after the initial render

  // Scroll to the top when a Link is clicked
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {blogs.length > 0 && (
        <div className="sidebar2">
          <div className="panel panel-default shopsList">
            <div className="panel-heading">
              <div className="panel-title">Latest Blog</div>
            </div>
            <div
              id="collapseTwo"
              className="panel-collapse  in"
              aria-expanded="true"
            >
              <div className="panel-body">
                <div className="latest-blog">
                  {blogs.map((blog) => (
                    <div className="latest-blog-item" key={blog.id}>
                      <div className="title">
                        <Link
                          to={`/blog/${sanitizeTitleForURL(
                            blog.attributes.Title
                          )}`}
                          onClick={handleLinkClick} // Scroll to top when Link is clicked
                        >
                          {blog.attributes.Title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LatestBlog;
