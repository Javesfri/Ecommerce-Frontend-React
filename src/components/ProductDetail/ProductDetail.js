
import "./ProductDetailStyles.css"
import { ProductCount } from "../ProductCount/ProductCount"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
export const ProductDetail = ({product})=>{
    console.log(product)
    return (
        <>
          {product ? (
            <div className="containerProductDetail">
              <div className="conatinerProductGalleryData">
                <div className="containerProductGallery">
                  <img className="productImage" src={product.thumbnail} alt={`imagen de ${product.title}`} />
                  <div className="productGallery"></div>
                </div>
                <div className="containerProductData">
                  <h1 className="productTitle">{product.title}</h1>
                  <span className="productCode">{`Código de Producto: ${product.code}`}</span>
                  <div className="containerProductPrice">
                    <span className="productPriceTitle">Precio efectivo o transferencia:</span>
                    <span className="productPrice">{`$${product.price}`}</span>
                  </div>
                  <div className="productAddCartBuy">
                    <ProductCount stock={product.stock} idProduct={product._id}></ProductCount>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </>
      );

}