const ProductListImg = ({ platform }) => {
  const StrapiCMSURL = "http://localhost:1337";
  return (
    <div>
      {platform === "Amazon" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Amazon_0c7ce7f518.png"}`}
          alt="Amazon"
          className="img-fluid"
        />
      ) : platform === "Flipkart" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Flipkart_e57c87dc70.png"}`}
          alt="Flipkart"
          className="img-fluid"
        />
      ) : platform === "Myntra" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Myntra_38c5594447.png"}`}
          alt="Myntra"
          className="img-fluid"
        />
      ) : platform === "Paytm" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/paytm_14f2542a8b.png"}`}
          alt="Paytm"
          className="img-fluid"
        />
      ) : platform === "Jiomart" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/jiomart_d044ac8b4a.png"}`}
          alt="Jiomart"
          className="img-fluid"
        />
      ) : platform === "Croma" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/croma_cdce11efe3.png"}`}
          alt="Croma"
          className="img-fluid"
        />
      ) : platform === "Ajio" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/AJIO_3e99680326.png"}`}
          alt="Ajio"
          className="img-fluid"
        />
      ) : platform === "Pepperfry" ? (
        <img
          src={`${StrapiCMSURL + "/uploads/Pepperfry_121efb7657.png"}`}
          alt="Pepperfry"
          className="img-fluid"
        />
      ) : (
        <img
          src={`${StrapiCMSURL + "/uploads/other_a4f7156973.png"}`}
          alt="other"
          className="img-fluid"
        />
      )}
    </div>
  );
};
export default ProductListImg;
