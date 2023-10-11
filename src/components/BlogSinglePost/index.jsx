import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../Util/Helmet";
import Breadcrumb from "../Util/Breadcrumb";

function BlogSinglePost({ setBlogExcept }) {
  const [post, setPost] = useState(null);
  const StrapiCMSURL = "https://hot-deals-bazaar.netlify.app";

  const { id } = useParams();

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/blogs.json"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const blogData = response.data.data;

        // Find the post with the matching title (assuming the title is unique)
        const matchingPost = blogData.find(
          (post) =>
            post.attributes.Title.replace(/,/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase() === id
        );
        setPost(matchingPost);
        setBlogExcept(id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: `${post?.attributes.Title}`, path: `/blog/${id}` }, // Dynamic breadcrumb
  ];

  return (
    <HelmetProvider>
      <div>
        {post ? (
          <>
            <SEO
              Meta_title={post.attributes.Meta_title}
              Meta_description={post.attributes.Meta_description}
            />
            <Breadcrumb items={breadcrumbItems} />
            <article id="content">
              <div className="post-detail">
                <div className="Single_post_img_holder">
                  {post.attributes &&
                  post.attributes.Featured_image &&
                  post.attributes.Featured_image.data &&
                  post.attributes.Featured_image.data.attributes ? (
                    <img
                      src={
                        "http://localhost:1337" +
                        post.attributes.Featured_image.data.attributes.url
                      }
                      alt={post.attributes.Title}
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src={`${StrapiCMSURL}/uploads/Image_not_available_8a8e4a7492.png`}
                      alt="no_image"
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="txt-holder">
                  <h1 className="heading3">{post.attributes.Title}</h1>
                  <div
                    className="single_post_para"
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.ClassicEditor || "", // Make sure to handle the case where ClassicEditor is null
                    }}
                  />
                </div>
              </div>
            </article>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </HelmetProvider>
  );
}

export default BlogSinglePost;
