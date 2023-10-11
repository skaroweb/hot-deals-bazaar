import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import { useSearch } from "../../Context/SearchContext";
import Spinner from "react-bootstrap/Spinner";

function ProductList({ platform }) {
  const { searchText } = useSearch();

  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(12); // Adjust the initial number of items to display
  const itemsToLoad = 12; // Adjust the number of items to load each time
  const StrapiCMSURL = "http://localhost:1337";

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/api/products?populate=*"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const productsData = response.data.data;

        // Check if platforms are provided and apply the filter condition
        if (platform && platform.length > 0) {
          const filteredProducts = productsData.filter((product) =>
            platform.includes(product.attributes.platform)
          );

          // Filter products based on searchText
          const searchTextFilteredProducts = filteredProducts.filter(
            (product) =>
              product.attributes.title
                .toLowerCase()
                .includes(searchText.toLowerCase())
          );

          setProducts(searchTextFilteredProducts);
        } else {
          // If no platforms are provided, show all products

          // Filter products based on searchText
          const searchTextFilteredProducts = productsData.filter((product) =>
            product.attributes.title
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );

          setProducts(searchTextFilteredProducts);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [platform, searchText]);

  const displayedProducts = products.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsToLoad);
  };

  const canLoadMore = visibleItems < products.length;

  // function handleScroll() {
  //   var isAtBottom =
  //     document.documentElement.scrollHeight -
  //       document.documentElement.scrollTop <=
  //     document.documentElement.clientHeight;

  //   if (isAtBottom) {
  //     setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsToLoad);
  //   }
  // }

  // window.addEventListener("scroll", handleScroll);

  // Function to convert milliseconds to a human-readable format
  function getTimeAgo(createdAt) {
    const currentDate = new Date();
    const timeDifferenceMillis = currentDate - new Date(createdAt);
    const seconds = Math.floor(timeDifferenceMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} sec${seconds > 1 ? "s" : ""}`;
    }
  }

  return (
    <div>
      <h1>Flash Deals:</h1>
      <div className={styles.Product_main}>
        <div className={styles.products}>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <div key={index} className={styles.product_item}>
                <div className={styles.time_ago}>
                  <span>
                    <i className="fa fa-clock" aria-hidden="true"></i>
                  </span>
                  {getTimeAgo(product.attributes.createdAt)}
                </div>
                <div className={styles.products_img}>
                  {product.attributes.productimage &&
                  product.attributes.productimage.data &&
                  product.attributes.productimage.data.attributes ? (
                    <a href="#/">
                      <img
                        src={
                          StrapiCMSURL +
                          product.attributes.productimage.data.attributes.url
                        }
                        alt={product.attributes.title}
                        className="img-fluid"
                      />
                    </a>
                  ) : (
                    <a href="#/">
                      <img src="" alt="no_image" className="img-fluid" />
                    </a>
                  )}
                </div>
                <div className={styles.products_heading}>
                  <a href="#/">{product.attributes.title}</a>
                </div>
                <div className={styles.item_meta}>
                  <div className={styles.old_price}>
                    <span>₹2,799</span>
                  </div>
                  <div className={styles.new_price}>
                    <span>₹1,041</span>
                  </div>
                  <div className={styles.discount}>
                    <span> 62% Off</span>
                  </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.item_footer}>
                  <div className="shop_name">
                    {product.attributes.platform === "Amazon" && (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/Amazon_0c7ce7f518.png"
                        }`}
                        alt="Amazon"
                      />
                    )}
                    {product.attributes.platform === "Flipkart" && (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/Flipkart_e57c87dc70.png"
                        }`}
                        alt="Flipkart"
                      />
                    )}
                    {product.attributes.platform === "Myntra" && (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/Myntra_38c5594447.png"
                        }`}
                        alt="Myntra"
                      />
                    )}
                    {product.attributes.platform === "Paytm" && (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/paytm_14f2542a8b.png"
                        }`}
                        alt="Paytm"
                      />
                    )}

                    {product.attributes.platform === "Jiomart" && (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/jiomart_d044ac8b4a.png"
                        }`}
                        alt="Jiomart"
                      />
                    )}
                  </div>
                  <div className={styles.shop_btn}>
                    <a href="#/">Shop Now</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.spin}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
      {canLoadMore && (
        <button className={styles.load_btn} onClick={loadMore}>
          Load More
        </button>
      )}
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a
              href={product.attributes.productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.attributes.title}
            </a>
            {product.attributes.productimage &&
              product.attributes.productimage.data &&
              product.attributes.productimage.data.attributes && (
                <img
                  src={
                    StrapiCMSURL +
                    product.attributes.productimage.data.attributes.url
                  }
                  alt={product.attributes.title}
                />
              )}
            <p>Deal Price: {product.attributes.dealPrice}</p>
            <p>Original Price: {product.attributes.originalPrice}</p>
            <p>Platform: {product.attributes.platform}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ProductList;
