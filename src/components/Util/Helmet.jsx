import { Helmet } from "react-helmet-async";

const SEO = ({ Meta_title, Meta_description, OG_image }) => {
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

        // Update og:image
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute("content", OG_image || "");
        }
      }}
    >
      <title>{Meta_title}</title>
    </Helmet>
  );
};
export default SEO;
