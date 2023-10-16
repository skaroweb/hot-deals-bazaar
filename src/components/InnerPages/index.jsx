import { HelmetProvider } from "react-helmet-async";
import SEO from "../Util/Helmet";
import { useLocation } from "react-router-dom";
import "./index.css";
import Breadcrumb from "../Util/Breadcrumb";

function Innerpage({ page }) {
  const StrapiCMSURL = "https://hotdealsbazaar.com";
  const location = useLocation();

  if (!page) {
    return <p>Loading...</p>;
  }
  const pageTitle = page.attributes && page.attributes.Title;
  const pageContent = page.attributes && page.attributes.Editor;
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: `${pageTitle}`, path: `${location.pathname}` }, // Dynamic breadcrumb
  ];

  return (
    <HelmetProvider>
      <div>
        <SEO
          Meta_title={page.attributes && page.attributes.Meta_title}
          Meta_description={page.attributes && page.attributes.Meta_description}
        />
        <Breadcrumb items={breadcrumbItems} />
        <article id="content">
          <div className="post-detail">
            <div className="txt-holder">
              <h1 className="heading3">
                <strong>{pageTitle}</strong>
              </h1>
              <div
                className="single_post_para"
                dangerouslySetInnerHTML={{
                  __html: pageContent || "",
                }}
              />
            </div>
          </div>
        </article>
      </div>
    </HelmetProvider>
  );
}

export default Innerpage;
