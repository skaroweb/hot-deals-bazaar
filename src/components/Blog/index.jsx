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

  const StrapiCMSURL = "http://localhost:3000";

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

  return (
    <HelmetProvider>
      <div>
        <SEO Meta_title="Blog page" Meta_description="Blog page" />

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
                    {blog.attributes.Featured_image &&
                    blog.attributes.Featured_image.data &&
                    blog.attributes.Featured_image.data.attributes ? (
                      <Link
                        to={`/blog/${blog.attributes.Title.replace(/,/g, "")
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        <img
                          src={
                            "http://localhost:1337" +
                            blog.attributes.Featured_image.data.attributes.url
                          }
                          alt={blog.attributes.title}
                          className="img-fluid"
                        />
                      </Link>
                    ) : (
                      <img
                        src={`${
                          StrapiCMSURL +
                          "/uploads/Image_not_available_8a8e4a7492.png"
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
                      to={`/blog/${blog.attributes.Title.replace(/,/g, "")
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {blog.attributes.Title}
                    </Link>
                  </h4>
                  <div
                    className="paragraph"
                    dangerouslySetInnerHTML={{
                      __html: blog.attributes.ClassicEditor,
                    }}
                  />
                  <Link
                    className="btn-primary text-center text-uppercase"
                    to={`/blog/${blog.attributes.Title.replace(/,/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
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
