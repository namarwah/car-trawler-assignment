import React, { useState, useEffect } from "react";

import "./ProductDetail.scss";
import supplierBolt from "../images/supplier-bolt.svg";
import supplierFreenow from "../images/supplier-freenow.svg";
import vehicleAccessible from "../images/vehicle-other-accessible.svg";
import vehicleEco from "../images/vehicle-other-eco.svg";
import vehicleMini from "../images/vehicle-standard-minibus.svg";
import vehicleSedan from "../images/vehicle-standard-sedan.svg";
import vehicleSuv from "../images/vehicle-standard-suv.svg";

const ProductDetails = (props) => {
  const url =
    "https://raw.githubusercontent.com/cartrawler/mobility-react-native-assessment/master/assets/availability.json";
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let content = <p>Loading Product Details...</p>;

  // Initial API call to fetch the data from the server
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setProductDetails(
          data.sort((a, b) => {
            return a.eta - b.eta;
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // To sort the products based on different criteria such as price, eta, category and supplier
  const sortByCriteria = (sortCriteria) => {
    if (sortCriteria === "eta") {
      productDetails.sort((a, b) => {
        return a.eta - b.eta;
      });
    } else if (sortCriteria === "price") {
      productDetails.sort((a, b) => {
        return a.price.amount - b.price.amount;
      });
    } else if (sortCriteria === "category") {
      productDetails.sort((a, b) => {
        let category1 = a.category.vehicleType.toUpperCase();
        let category2 = b.category.vehicleType.toUpperCase();
        if (category1 < category2) {
          return -1;
        }
        if (category1 > category2) {
          return 1;
        }
        return 0;
      });
    } else {
      productDetails.sort((a, b) => {
        let supplier1 = a.supplier.supplierName.toUpperCase();
        let supplier2 = b.supplier.supplierName.toUpperCase();
        if (supplier1 < supplier2) {
          return -1;
        }
        if (supplier1 > supplier2) {
          return 1;
        }
        return 0;
      });
    }
    setProductDetails([...productDetails]);
  };

  if (!isLoading && productDetails && productDetails.length > 0) {
    content = productDetails.map((product) => (
      <div className="product-card" key={product.availabilityId}>
        <div className="product-img">
          <img
            src={
              product.supplier.supplierKey === "bolt"
                ? supplierBolt
                : supplierFreenow
            }
            alt={product.supplier.supplierName}
          ></img>
        </div>
        <div className="product-content">
          <div className="product-content-detail">
            <span>ETA : </span>
            <span>{product.eta} Minutes</span>
          </div>
          <div className="product-content-detail">
            <span>Price : </span>
            <span>
              {product.price.amount} {product.price.currency}
            </span>
          </div>
          <div className="product-content-detail">
            <span>Supplier : </span>
            <span>{product.supplier.supplierName}</span>
          </div>
          <div className="product-content-detail">
            <span>Category : </span>
            <span>{product.category.vehicleType}</span>
          </div>
          <div className="product-content-detail-img">
            <img
              className="product-category-img"
              src={
                product.category.vehicleType === "ACCESSIBLE"
                  ? vehicleAccessible
                  : product.category.vehicleType === "SEDAN"
                  ? vehicleSedan
                  : product.category.vehicleType === "MINIBUS"
                  ? vehicleMini
                  : product.category.vehicleType === "ECO"
                  ? vehicleEco
                  : vehicleSuv
              }
              alt={product.category.vehicleType}
            ></img>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <div className="sort-criteria">
        <label>Sort By :</label>
        <select onChange={(e) => sortByCriteria(e.target.value)}>
          <option value="eta">ETA</option>
          <option value="price">Price</option>
          <option value="supplier">Supplier</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="product-container">{content}</div>
    </>
  );
};

export default ProductDetails;