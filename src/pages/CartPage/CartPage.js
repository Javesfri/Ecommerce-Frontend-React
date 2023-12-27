import "./CartPageStyles.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { ProductCart } from "../../components/ProductCart/ProductCart";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import {initMercadoPago} from "@mercadopago/sdk-react";
initMercadoPago("TEST-a71f12d9-57df-48cb-a2f3-d56f36b89dce");

export const CartPage = () => {

  const {
    user,
    currentUser,
    totalCartItems,
    totalPriceCartItems,
    handleClickPay,
    cart,
    loading,
    setLoading
  } = useContext(AppContext);
  const navigate = useNavigate();
  const handleOnClick = async () => {
      navigate("/checkout");
  };
  useEffect(() => {
    const isUser = async () => {
      setLoading(true)
      await currentUser();
      setLoading(false)
    
    };
    isUser()
  }, []);

  return (<>{loading ?  <LoadingSpinner/> : <div className="containerCart">
  <div className="cartTitleContainer">
    <h1 className="cartTitle">{`Tu Carrito (${totalCartItems()} productos)`}</h1>
  </div>
  <div className="cartTableItemsContainer">
    <div className="cartTableItemsTitlesContaienr">
      <p
        className="cartTalbleItemsTitle"
        style={{ width: "40%", textAlign: "start" }}
      >
        Item
      </p>
      <p className="cartTalbleItemsTitle" style={{ width: "20%" }}>
        Precio
      </p>
      <p className="cartTalbleItemsTitle" style={{ width: "20%" }}>
        Cantidad
      </p>
      <p className="cartTalbleItemsTitle" style={{ width: "20%" }}>
        Total
      </p>
    </div>
    <div className="cartTableItems">
      {cart.length == 0 ? (
        <p>Carrito Vacío</p>
      ) : (
        cart.map((item) => <ProductCart key={item._id} item={item} />)
      )}
    </div>
  </div>
  <div className="cartTotalCheckoutContainer">
    <div className="cartTotalCheckout">
      <div className="cartSubtotalTotalContainer">
        <p className="cartSubtotalTotalTitle">Subtotal: </p>
        <p className="cartSubtotalTotal">{`$${totalPriceCartItems()}`}</p>
      </div>
      <div className="cartSubtotalTotalContainer">
        <p className="cartSubtotalTotalTitle">Impuestos: </p>
        <p className="cartSubtotalTotal">{`$0`}</p>
      </div>
      <div
        className="cartSubtotalTotalContainer"
        style={{ borderBottom: "none" }}
      >
        <p className="cartSubtotalTotalTitle">TOTAL: </p>
        <p
          className="cartSubtotalTotal"
          style={{ fontSize: "28px" }}
        >{`$${totalPriceCartItems()}`}</p>
      </div>
      <div className="cartButtonCheckoutContainer">
        <button onClick={handleOnClick} className="cartButtonCheckout">
          Ir al pago
        </button>
      </div>
    </div>
  </div>
</div>}</>
    
  );
};
