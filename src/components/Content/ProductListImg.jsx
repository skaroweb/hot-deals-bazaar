const ProductListImg = ({ platform }) => {
  const StrapiCMSURL = "http://localhost:1337";
  return (
    <div>
      {platform === "Amazon" ? (
        <img src={`${"/shop/Amazon.png"}`} alt="Amazon" className="img-fluid" />
      ) : platform === "Flipkart" ? (
        <img
          src={`${"/shop/Flipkart.png"}`}
          alt="Flipkart"
          className="img-fluid"
        />
      ) : platform === "Myntra" ? (
        <img src={`${"/shop/Myntra.png"}`} alt="Myntra" className="img-fluid" />
      ) : platform === "Paytm" ? (
        <img
          src={`${"/shop/paytm_5cc03d32d6.png"}`}
          alt="Paytm"
          className="img-fluid"
        />
      ) : platform === "Jiomart" ? (
        <img
          src={`${"/shop/jiomart_c497dfce9b.png"}`}
          alt="Jiomart"
          className="img-fluid"
        />
      ) : platform === "Croma" ? (
        <img src={`${"/shop/Croma.png"}`} alt="Croma" className="img-fluid" />
      ) : platform === "Ajio" ? (
        <img src={`${"/shop/Ajio.png"}`} alt="Ajio" className="img-fluid" />
      ) : platform === "Pepperfry" ? (
        <img
          src={`${"/shop/Pepperfry.png"}`}
          alt="Pepperfry"
          className="img-fluid"
        />
      ) : (
        <img src={`${"/shop/other.png"}`} alt="other" className="img-fluid" />
      )}
    </div>
  );
};
export default ProductListImg;
