import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css";
//import { useSearch } from "../../Context/SearchContext";
import { HelmetProvider } from "react-helmet-async";
import Breadcrumb from "../Util/Breadcrumb";
import SEO from "../Util/Helmet";

const BlogList = () => {
  const [bloglist, setBloglist] = useState([]);
  //const { searchText } = useSearch();

  //   console.log(searchText);

  const StrapiCMSURL = "https://hotdealsbazaar.com";

  const formatDate = (publishedAt) => {
    const date = new Date(publishedAt);

    const options = {
      day: "numeric",
      month: "short",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/blogs.json"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const blogData = response.data.data;
        setBloglist(blogData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
  ];

  // Function to remove <h2> tags from HTML content
  const removeH2Tags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const h2Tags = tempDiv.getElementsByTagName("h2");
    for (let i = h2Tags.length - 1; i >= 0; i--) {
      h2Tags[i].parentNode.removeChild(h2Tags[i]);
    }
    return tempDiv.innerHTML;
  };

  function sanitizeTitleForURL(title) {
    // Replace any whitespace with a hyphen
    title = title.replace(/\s+/g, "-");

    // Remove special characters like "&", ":", and any other unwanted characters
    title = title.replace(/[^a-zA-Z0-9-]/g, "");

    // Convert to lowercase
    title = title.toLowerCase();

    return title;
  }

  return (
    <HelmetProvider>
      <div>
        <SEO
          Meta_title="Discover the Hotdealsbazaar Blog - Stay Updated on Deals"
          Meta_description="Stay informed about the latest deals and get valuable insights into various products by visiting the Hotdealsbazaar blog."
        />

        <section className="blog-sec container pad-top-lg pad-bottom-md">
          <div className="row">
            <Breadcrumb items={breadcrumbItems} />
            {bloglist.map((blog, index) => (
              <div
                key={index}
                className="col-xs-12 col-sm-6 col-md-3 mb-2 pt-3 pb-3"
              >
                <div className="blog-holder mar-bottom-xs">
                  <div className="img-holder">
                    {blog.attributes.Featured_image_url ? (
                      <Link
                        to={`/blog/${sanitizeTitleForURL(
                          blog.attributes.Title
                        )}`}
                      >
                        <img
                          src={
                            StrapiCMSURL + blog.attributes.Featured_image_url
                          }
                          alt={blog.attributes.title}
                          className="img-fluid"
                        />
                      </Link>
                    ) : (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/Image_not_available.png"
                        }`}
                        alt="no_image"
                        className="img-fluid"
                      />
                    )}

                    <time
                      className="time text-center"
                      dateTime="2017-02-03 20:00"
                    >
                      {formatDate(blog.attributes.publishedAt).split(" ")[1]}
                      <span className="txt">
                        {formatDate(blog.attributes.publishedAt).split(" ")[0]}
                      </span>
                    </time>
                  </div>
                  <h4 className="heading3">
                    <Link
                      to={`/blog/${sanitizeTitleForURL(blog.attributes.Title)}`}
                    >
                      {blog.attributes.Title}
                    </Link>
                  </h4>
                  <div
                    className="paragraph"
                    dangerouslySetInnerHTML={{
                      __html: removeH2Tags(blog.attributes.ClassicEditor),
                    }}
                  />
                  <Link
                    className="btn-primary text-center text-uppercase"
                    to={`/blog/${sanitizeTitleForURL(blog.attributes.Title)}`}
                  >
                    read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
};
export default BlogList;
