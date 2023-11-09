import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../Util/Helmet";
import Breadcrumb from "../Util/Breadcrumb";
import TableOfContents from "../Util/TableOfContents";

function BlogSinglePost({ setBlogExcept }) {
  const [post, setPost] = useState(null);
  const StrapiCMSURL = process.env.REACT_APP_SERVER_URL;

  const { id } = useParams();

  // Function to convert a title to a URL-friendly format
  function convertTitleToURL(title) {
    title = title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
    return title;
  }

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
        const blogData = response.data.data;
        const matchingPost = blogData.find(
          (post) => sanitizeTitleForURL(post.attributes.Title) === id
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
    { label: `${post?.attributes.Title}`, path: `/blog/${id}` },
  ];
  const currentURL = window.location.href;

  // Function to add dynamic id attributes to h2 elements
  function addIdsToH2Elements(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const h2Elements = doc.querySelectorAll("h2");

    h2Elements.forEach((h2, index) => {
      let textContent = h2.textContent;

      // Replace & with a single hyphen
      textContent = textContent.replace(/&/g, "-");

      // Replace double hyphens with a single hyphen
      textContent = textContent.replace(/--/g, "-");

      const id = `${sanitizeTitleForURL(textContent)}`;
      h2.setAttribute("id", id);
    });

    return doc.body.innerHTML;
  }

  return (
    <HelmetProvider>
      <div>
        {post ? (
          <>
            <SEO
              Meta_title={post.attributes.Meta_title}
              Meta_description={post.attributes.Meta_description}
              OG_image={StrapiCMSURL + post.attributes.Featured_image_url}
              OG_url={currentURL}
              canonical_url={currentURL}
            />
            <Breadcrumb items={breadcrumbItems} />
            {post.attributes.ClassicEditor && (
              <TableOfContents content={post.attributes.ClassicEditor} />
            )}
            <article id="content">
              <div className="post-detail">
                <h1 className="heading3">
                  <strong>{post.attributes.Title}</strong>
                </h1>
                <div className="Single_post_img_holder">
                  {post.attributes && post.attributes.Featured_image_url ? (
                    <img
                      src={StrapiCMSURL + post.attributes.Featured_image_url}
                      alt={post.attributes.Title}
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src={`${StrapiCMSURL}/uploads/Image_not_available.png`}
                      alt="no_image"
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="txt-holder">
                  <div
                    className="single_post_para"
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.ClassicEditor
                        ? addIdsToH2Elements(post.attributes.ClassicEditor)
                        : "",
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
