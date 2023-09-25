import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TopProducts.css";
import ProductListImg from "../Content/ProductListImg";

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);

  const StrapiCMSURL = "https://hot-deals-bazaar-strapi.onrender.com";

  useEffect(() => {
    const apiUrl = `${
      StrapiCMSURL +
      "/api/products?populate=*&sort[0]=createdAt:desc&pagination[limit]=3"
    }`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const productsData = response.data.data;
        setTopProducts(productsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Generate schema.org/Product structured data
  const productSchema = topProducts.map((product, index) => {
    const imageSchema = {
      "@context": "http://schema.org",
      "@type": "ImageObject",
      url: "", // Set this to the URL of the product image
      width: "300", // Width of the image in pixels (adjust as needed)
      height: "200", // Height of the image in pixels (adjust as needed)
    };

    const schema = {
      "@context": "http://schema.org",
      "@type": "Product",
      name: product.attributes.title || "", // Provide a default value (empty string) if title is null
      description: product.attributes.description || "", // Provide a default value if description is null
      image: imageSchema, // Include the ImageObject
      brand: {
        "@type": "Brand",
        name: product.attributes.platform || "", // Provide a default value if brand is null
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR", // Use "INR" for Indian Rupees
        price: product.attributes.dealPrice || "", // Provide a default value if dealPrice is null
        availability: "http://schema.org/InStock",
      },
    };

    // Add image if it exists
    if (
      product.attributes &&
      product.attributes.productimage &&
      product.attributes.productimage.data &&
      product.attributes.productimage.data.attributes
    ) {
      imageSchema.url =
        StrapiCMSURL + product.attributes.productimage.data.attributes.url;
    }

    return schema;
  });

  return (
    <>
      <div className="sidebar">
        <div className="panel panel-default shopsList">
          <div className="panel-heading">
            <h2 className="panel-title">Recent Products</h2>
          </div>
          <div
            id="collapseTwo"
            className="panel-collapse  in"
            aria-expanded="true"
          >
            <div className="panel-body">
              <div className="top_products">
                {topProducts.map((product, index) => (
                  <div key={index} className="top_products_item">
                    <div className="img">
                      {product.attributes.productimage &&
                      product.attributes.productimage.data &&
                      product.attributes.productimage.data.attributes ? (
                        <a
                          href={product.attributes.productLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={
                              StrapiCMSURL +
                              product.attributes.productimage.data.attributes
                                .url
                            }
                            alt={product.title}
                            className="img-fluid"
                          />
                        </a>
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
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href={product.attributes.productLink}>
                          {product.attributes.title}
                        </a>
                      </div>
                      <div className="amount_main">
                        <div className="originalPrice">
                          <span>{product.attributes.originalPrice}</span>
                        </div>
                        <div className="dealPrice">
                          <span>{product.attributes.dealPrice}</span>
                        </div>
                        <div className="discount">
                          <span>{product.attributes.discount}% Off</span>
                        </div>
                      </div>
                    </div>

                    <div className="shopnow">
                      <div className="platform">
                        <ProductListImg
                          platform={product.attributes.platform}
                        />
                      </div>
                      <div className="shop_btn">
                        <a
                          href={product.attributes.productLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Embed schema.org/Product structured data */}
      {productSchema.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </>
  );
};
export default TopProducts;
