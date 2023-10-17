import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import { useSearch } from "../../Context/SearchContext";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useShop } from "../../Context/ShopContext";
import ProductListImg from "./ProductListImg";

function ProductList({ platform }) {
  const { searchText } = useSearch();
  const { setShopname } = useShop();

  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(12); // Adjust the initial number of items to display
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const itemsToLoad = 12; // Adjust the number of items to load each time
  const StrapiCMSURL = "https://hotdealsbazaar.com";

  useEffect(() => {
    const apiUrl = `${StrapiCMSURL + "/products.json"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Access the "data" array from the response
        const filteredProducts = response.data.data;

        // // Filter products that have the affiliate_product_link
        const productsData = filteredProducts.filter((product) => {
          return product.attributes.affiliate_product_link !== null;
        });

        // console.log(filteredProducts);

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

          // Create an empty set to store unique shop names
          const uniqueShops = new Set();

          // Loop through the data and add each unique shop name to the set
          productsData.forEach((item) => {
            uniqueShops.add(item.attributes.platform);
          });

          // Convert the set to an array if needed
          const shops = Array.from(uniqueShops).map((shop) => {
            return { id: shop, name: shop };
          });
          console.log(shops);

          setProducts(searchTextFilteredProducts);
          setIsLoading(false); // Set isLoading to false when data is fetched
        } else {
          // If no platforms are provided, show all products

          // Filter products based on searchText
          const searchTextFilteredProducts = productsData.filter((product) =>
            product.attributes.title
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );

          // Create an empty set to store unique shop names
          const uniqueShops = new Set();

          // Loop through the data and add each unique shop name to the set
          productsData.forEach((item) => {
            uniqueShops.add(item.attributes.platform);
          });

          // Convert the set to an array if needed
          const shops = Array.from(uniqueShops).map((shop) => {
            return { id: shop, name: shop };
          });
          setShopname(shops);
          setProducts(searchTextFilteredProducts);
          setIsLoading(false); // Set isLoading to false on error
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

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={visibleItems}
          next={loadMore}
          hasMore={canLoadMore}
          loader={
            <div
              key={0}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
          style={{ height: "auto", overflow: "visible" }} // Set height and overflow
        >
          <div className={styles.Product_main}>
            <div className={styles.products}>
              {displayedProducts.map((product, index) => (
                <div key={index} className={styles.product_item}>
                  <div className={styles.time_ago}>
                    <span>
                      <i className="fa fa-clock" aria-hidden="true"></i>
                    </span>
                    {getTimeAgo(product.attributes.createdAt)}
                  </div>
                  <div className={styles.products_img}>
                    {product.attributes.ProductImgUrl ? (
                      <a
                        href={product.attributes.productLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={product.attributes.ProductImgUrl}
                          alt={product.attributes.title}
                          className="img-fluid"
                        />
                      </a>
                    ) : (
                      <img
                        src={`${
                          StrapiCMSURL + "/uploads/Image_not_available.png"
                        }`}
                        alt="no_image"
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className={styles.products_heading}>
                    <a
                      href={product.attributes.productLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {product.attributes.title}
                    </a>
                  </div>
                  <div className={styles.item_meta}>
                    <div className={styles.old_price}>
                      <span>{product.attributes.originalPrice}</span>
                    </div>
                    <div className={styles.new_price}>
                      <span>{product.attributes.dealPrice}</span>
                    </div>
                    <div className={styles.discount}>
                      {product.attributes.discount && (
                        <span>{product.attributes.discount}% Off</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.item_footer}>
                    <div className={styles.shop_name}>
                      <ProductListImg platform={product.attributes.platform} />
                    </div>
                    <div className={styles.shop_btn}>
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
        </InfiniteScroll>
      )}
      {/* Embed schema.org/Product structured data */}
      {/* {productSchema.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))} */}
    </div>
  );
}

export default ProductList;
