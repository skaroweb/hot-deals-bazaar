import { Helmet } from "react-helmet-async";

const SEO = ({ Meta_title, Meta_description }) => {
  return (
    <Helmet
      onChangeClientState={(newState) => {
        // Update meta[name="description"]
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", Meta_description || "");
        }

        // Update og:title
        const metaTitle = document.querySelector('meta[property="og:title"]');
        if (metaTitle) {
          metaTitle.setAttribute("content", Meta_title || "");
        }

        // Update og:description
        const ogDescription = document.querySelector(
          'meta[property="og:description"]'
        );
        if (ogDescription) {
          ogDescription.setAttribute("content", Meta_description || "");
        }
      }}
    >
      <title>{Meta_title}</title>
    </Helmet>
  );
};
export default SEO;
