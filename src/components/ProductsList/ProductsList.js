import React from "react";
import "./ProductsListStyles.css"
import { Link } from "react-router-dom";
export const ProductList = ({ items }) => {
    console.log(items)
  return (
    <div className="containerItemList">
      {items ? (
        items.map((item) => (
          <div key={item._id} className="containerItem">
            <Link className="linkItems" to={`/product/${item._id}`}>
              <img className="imageItem" src={item.thumbnail}></img>
            </Link>
            <div className="containerItemInfo">
              <Link className="linkItems" to={`/product/${item._id}`}>
                <h2 className="itemTitle">{item.title}</h2>
              </Link>
              <div className="itemPrice">
                <span>$ {item.price}</span>
              </div>
              {item.stock > 0 ? (
                <div className="itemInStock">
                  <span>En Stock</span>
                </div>
              ) : (
                <div className="itemNoStock">
                  <span>Sin Stock</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

