import "./ProductCartStyles.css"
import { useContext,useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { BiXCircle } from "react-icons/bi";



export const ProductCart = ({ item }) => {
  const product = item.productId;
  
  const { DeleteProductFromCart } = useContext(AppContext);
  const handleDeleteProduct = (idProduct) => {
    console.log(idProduct);
    DeleteProductFromCart(idProduct);
  };

  return (
    <div className="productCartContainer">
      <div className="productCartTitleImageContainer">
        <img
          className="productCartImage"
          src={product?.thumbnail}
          alt={`Imagen de ${product.title}`}
        />
        <div className="productCartTitleCode">
          <h3 className="productCartTitle">{product.title}</h3>
          <span
            className="productCartCode"
          >{`Code: ${product.code}`}</span>
        </div>
      </div>
      <div className="productCartPriceContainer">
        <p className="productPrice">{`$${product.price}`}</p>
      </div>
      <div className="productCartPriceContainer">
        <p className="productQuantity">{`${item.quantity}`}</p>
      </div>
      <div className="productCartTotalPriceContainer">
        <p className="productTotalPrice">{`$ ${
          (product.price * item.quantity).toFixed(2)
        }`}</p>
        <BiXCircle
          className="buttonDeleteProduct"
          onClick={() => handleDeleteProduct(product._id)}
        ></BiXCircle>
      </div>
    </div>
  );
};
