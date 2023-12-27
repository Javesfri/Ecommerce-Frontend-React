import { Children } from "react";
import React, { createContext, useState, useEffect } from "react";
import { encryptData, decryptData } from "../utils/encryption";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  //ESTADOS
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCartItems] = useState([]);
  const [preferenceId, setPreferenceId] = useState(
    "37320567-02906770-85c6-4ef3-bac0-16d0f833b073"
  );

  //MANEJO DE SESSION
  const currentUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/session/current",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } else {
        console.error(
          "La respuesta no fue satisfactoria:",
          response.statusText
        );
        setUser(null);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setUser(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  };

  const login = async (client) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
        credentials: "include",
      });

      if (response.ok) {
        currentUser();
        getCartItems();
        return "LOGEADO";
      } else {
        // Manejar el caso en el que la respuesta no es "ok"
        console.log(
          "Respuesta no exitosa:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      alert("Error al realizar la solicitud:", error);
    } finally {
      setTimeout(() => setLoading(false), 900);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/session/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        console.log("Logout Exitoso");
        return "Logout Exitoso";
      } else {
        // Manejar el caso en el que la respuesta no es "ok"
        console.log(
          "Respuesta no exitosa:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      alert("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  //MANEJO DE CARRITO Y CHECKOUT
  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/carts/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const dataNotOk = await response.json();
        console.log(dataNotOk);
      } else {
        const dataOk = await response.json();
        setCartItems(dataOk.payload.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AddProductToCart = async (idProduct, stock, quantity) => {
    if (stock >= quantity) {
      const quantityQuery = quantity > 1 ? `?quantity=${quantity}` : `/`;
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/carts/product/${idProduct}${quantityQuery}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const dataNotOk = await response.json();
          console.log(dataNotOk);
        } else {
          const dataOk = await response.json();
          const itemOnCart = dataOk.payload.products;
          getCartItems();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No hay suficiente stock");
    }
  };

  const DeleteProductFromCart = async (idProduct) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/carts/product/${idProduct}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const dataNotOk = await response.json();
        throw new Error(
          "No se pudo eliminar el producto del carrito: ",
          dataNotOk
        );
      } else {
        const dataOk = await response.json();
        getCartItems();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCartItems = () => {
    return cart?.length;
  };

  const totalPriceCartItems = () => {
    let total = 0;
    cart.map((item) => (total += item.quantity * item.productId.price));
    return total.toFixed(2);
  };

  const emptyCart = async () => {};

  const handleClickPay = async (orderArray) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/checkout/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: orderArray }),
        }
      );
      if (!response.ok) {
        const dataNotOk = await response.json();
        return false;
      } else {
        const dataOk = await response.json();
        setPreferenceId(dataOk.id);
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSecretKeyOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/checkout/secret_key",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.secretKey;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const deletePrePurchaseData = ()=>{
    sessionStorage.removeItem("orderData")
  }
  const savePrePurchaseData = async (orderData) => {
    let encryptedData;

    const secretKey = await getSecretKeyOrder();
    if (secretKey) {
      encryptedData = encryptData(orderData, secretKey);
      console.log("Data encriptada", encryptedData);
      sessionStorage.setItem("orderData", JSON.stringify(encryptedData));
    }
  };
  const getPrePurchaseData =async()=>{
    const encryptedData = JSON.parse(sessionStorage.getItem("orderData"));
    if (encryptedData) {
      const secretKey = await getSecretKeyOrder();
      if (secretKey) {
        const decryptedData=decryptData(encryptedData,secretKey)
        return decryptedData
      }
    }
  }
  const successfulPayment = async (totalData) => {
    try{
      const response = await fetch(
        "http://localhost:8080/api/checkout/generate_purchase_ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(totalData),
          credentials:"include"
        }
      );
      const data = await response.json();
    }catch(error){
      
    }
   
  };
  const generateTicket = async(orderData) =>{

  }
  //EFFECTS

  useEffect(() => {
    currentUser();
    getCartItems();
  }, []);
  const values = {
    loading,
    setLoading,
    login,
    user,
    logout,
    currentUser,
    totalCartItems,
    AddProductToCart,
    DeleteProductFromCart,
    totalPriceCartItems,
    handleClickPay,
    preferenceId,
    cart,
    savePrePurchaseData,
    getPrePurchaseData,
    successfulPayment,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
