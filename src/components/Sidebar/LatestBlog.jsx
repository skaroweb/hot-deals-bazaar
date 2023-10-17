import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./LatestBlog.css";

const LatestBlog = ({ blogExcept }) => {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const url = useParams();
  const StrapiCMSURL = "https://hotdealsbazaar.com";

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

  return (
    <>
      {blogs.length > 0 && (
        <div className="sidebar2">
          <div className="panel panel-default shopsList">
            <div className="panel-heading">
              <h2 className="panel-title">Latest Blog</h2>
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
                        >
                          {blog.attributes.Title}
                        </Link>
                      </div>
                      <div className="view">
                        <span>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        2034 Views
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
