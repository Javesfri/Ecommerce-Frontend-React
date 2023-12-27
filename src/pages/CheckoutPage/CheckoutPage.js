import "./CheckoutPageStyles.css";
import { useContext, useEffect, useState } from "react";
import { countries } from "countries-list";
import { Wallet } from "@mercadopago/sdk-react";
import { AppContext } from "../../context/AppContext";
import { OrderProduct } from "../../components/OrderProduct/OrderProduct";
import { useLocation } from "react-router";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import classnames from "classnames";
export const CheckoutPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [totalPriceOder, setTotalPriceOder] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [purchaserData, setPurchaserData] = useState({
    email: "",
    tel_number: "",
    first_name: "",
    last_name: "",
    address: "",
    country: "",
  });
  const location = useLocation();
  const {
    preferenceId,
    cart,
    handleClickPay,
    savePrePurchaseData,
    successfulPayment,
  } = useContext(AppContext);

  const handleInputChange = (field, value) => {
    setPurchaserData({ ...purchaserData, [field]: value });
  };

  const namesArray = Object.values(countries)
    .map((country) => country.name)
    .sort();

  const checkoutMercadoPagoClass = classnames("checkoutMercadoPagoButton", {
    checkoutMercadoPagoButtonHidden: isReady,
  });
  const chekcoutFormClass = classnames("checkoutForm", {
    checkoutMercadoPagoButtonHidden: isReady,
  });
  const handleCheckout = async () => {
    if (
      !purchaserData.email ||
      !purchaserData.tel_number ||
      !purchaserData.first_name ||
      !purchaserData.last_name ||
      !purchaserData.address ||
      !purchaserData.country
    ) {
      // Si falta algún atributo, muestra un mensaje de error o toma la acción necesaria
      alert("Todos los campos del comprador son obligatorios");
      return;
    }

    // Continuar con la lógica para crear la preferencia
    const prePurchaseData = { ...purchaserData, products: orderData };

    await savePrePurchaseData(prePurchaseData);
    const createPreference = await handleClickPay(orderData);

    if (createPreference) {
      console.log("butttonnnnn");
      setIsReady(true);
    }
  };

  const renderCheckoutButton = () => {
    if (preferenceId && isReady) {
      return (
        <Wallet
          initialization={{
            preferenceId: preferenceId,
            redirectMode: "self",
          }}
          customization={{
            visual: {
              buttonBackground: "black",
              borderRadius: "5px",
              buttonWidth: "50%",
            },
            texts: { action: "buy" },
          }}
          onSubmit={() => {}}
        />
      );
    }
  };
  useEffect(() => {
    const handleOrderdata = () => {
      const validItems = cart.filter(
        (item) => item.quantity <= item.productId.stock
      );
      const orderArray = validItems.map((item) => ({
        title: item.productId.title,
        unit_price: item.productId.price,
        quantity: item.quantity,
        id_product: item.productId._id,
        thumbnail: item.productId.thumbnail,
      }));
      const totalPrice = orderArray.reduce((accumulator, order) => {
        return accumulator + order.unit_price * order.quantity;
      }, 0);
      setTimeout(() => {
        setTotalPriceOder(Number(totalPrice.toFixed(2)));
        setOrderData(orderArray);
      }, 500);
    };
    handleOrderdata();
  }, [location, cart]);

  return (
    <>
      {orderData === null ||
      orderData == undefined ||
      orderData.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="containerCheckout">
          <div className="checkoutTitleFormContainer">
            <h4 className="checkoutTitles">Datos del Comprador</h4>
            <form className={chekcoutFormClass}>
              <div className="checkoutInputContainer">
                <input
                  className="checkoutInput"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={purchaserData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <div className="checkoutPhoneInputContainer">
                  <img className="checkoutPhoneInputFlag" src="/flag.png" />
                  <input
                    className="checkoutPhoneInput"
                    style={{ width: "100%" }}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Número de teléfono"
                    defaultValue={purchaserData.tel_number}
                    onChange={(e) =>
                      handleInputChange("tel_number", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="checkoutInputContainer">
                <input
                  className="checkoutInput"
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Nombre"
                  defaultValue={purchaserData.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  required
                />
                <input
                  className="checkoutInput"
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Apellido"
                  defaultValue={purchaserData.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="checkoutInputContainer">
                <input
                  className="checkoutInput"
                  style={{ width: "60%" }}
                  type="text"
                  id="street_address"
                  name="street_address"
                  placeholder="Domicilio"
                  defaultValue={purchaserData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
                <select
                  name="select"
                  className="checkoutInput"
                  style={{ width: "30%" }}
                  placeholder="Pais"
                  defaultValue={purchaserData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  required
                >
                  <option value="pais" disabled selected>
                    País
                  </option>
                  {namesArray.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="checkoutButtonContainer">
              {/**/}
              {renderCheckoutButton()}
              <button
                className={checkoutMercadoPagoClass}
                onClick={() => handleCheckout()}
              >
                <img src="/mercado-pago-logo.png" />
              </button>
            </div>
          </div>
          <div className="checkoutOrderSummaryContainer">
            <div>
              <h4 className="checkoutTitles">Resumen de Pedido</h4>
              <div className="checkoutOrderProducts">
                {orderData.length == 0 ? (
                  <div>Cargaondo</div>
                ) : (
                  orderData?.map((item) => (
                    <OrderProduct item={item}></OrderProduct>
                  ))
                )}
              </div>
            </div>

            <div className="checkoutTotalOrder">
              <div className="cartSubtotalTotalContainer">
                <p className="cartSubtotalTotalTitle">Subtotal: </p>
                <p className="cartSubtotalTotal">{`$${totalPriceOder}`}</p>
              </div>
              <div className="cartSubtotalTotalContainer">
                <p className="cartSubtotalTotalTitle">Envio: </p>
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
                >{`$${totalPriceOder}`}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
