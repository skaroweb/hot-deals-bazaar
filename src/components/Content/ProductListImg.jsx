const ProductListImg = ({ platform }) => {
  const StrapiCMSURL = "https://hot-deals-bazaar-strapi.onrender.com";
  return (
    <div>
      {platform === "Amazon" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Amazon_972ce3627e.png"}`}
          alt="Amazon"
          className="img-fluid"
        />
      ) : platform === "Flipkart" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Flipkart_2040ee091e.png"}`}
          alt="Flipkart"
          className="img-fluid"
        />
      ) : platform === "Myntra" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Myntra_ed63da776d.png"}`}
          alt="Myntra"
          className="img-fluid"
        />
      ) : platform === "Paytm" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/paytm_5cc03d32d6.png"}`}
          alt="Paytm"
          className="img-fluid"
        />
      ) : platform === "Jiomart" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/jiomart_c497dfce9b.png"}`}
          alt="Jiomart"
          className="img-fluid"
        />
      ) : platform === "Croma" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/croma_2fcb34dd16.png"}`}
          alt="Croma"
          className="img-fluid"
        />
      ) : platform === "Ajio" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/AJIO_b4874b7895.png"}`}
          alt="Ajio"
          className="img-fluid"
        />
      ) : platform === "Pepperfry" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Pepperfry_043d2087c5.png"}`}
          alt="Pepperfry"
          className="img-fluid"
        />
      ) : (
        <img
          src={`${StrapiCMSURL + "/uploads/other_7158b35552.png"}`}
          alt="other"
          className="img-fluid"
        />
      )}
    </div>
  );
};
export default ProductListImg;
