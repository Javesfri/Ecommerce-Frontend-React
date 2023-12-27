import "./PaymentStatusStyles.css";
import "animate.css";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { BsCheck2 } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { BsQuestion } from "react-icons/bs";

export const PaymentStatus = () => {
  const location = useLocation();
  const [dataOrder,setDataOrder] = useState(null)
  const { loading, setLoading,getPrePurchaseData,cart,successfulPayment } = useContext(AppContext);
  const searchParams = new URLSearchParams(location.search); //Convierto las query en pare
  const queryParamsObject = Object.fromEntries(searchParams.entries());
  const renderPaymentStatus = () => {
    if (queryParamsObject.status === "approved") {
      return (
        <>
          <div className="containerPaymentStatusIcon ">
            <BsCheck2 className="animate__animated animate__jackInTheBox paymentStatusIcon1 " />
          </div>
          <div className="containerPaymentStatusGreetingInfoTotal">
            <p className="paymentStatusGretings">{`Hola ${dataOrder?.first_name}, Felicitaciones!`}</p>
            <p className="paymentStatusInfo">{`El pago a sido Exitoso!`}</p>
            <p className="paymentStatusTotal">{`Total: $${dataOrder?.amount}`}</p>
            <p className="paymentStatusMailNotification ">
              Le hemos enviado un mail con la confirmación y el ticket del pago
            </p>
          </div>
        </>
      );
    } else if (queryParamsObject.status === "failure") {
      return (
        <>
          <div className="containerPaymentStatusIcon ">
            <BsX className="animate__animated animate__jackInTheBox paymentStatusIcon2 " />
          </div>
          <div className="containerPaymentStatusGreetingInfoTotal">
            <p className="paymentStatusGretings">{`Hola ${dataOrder?.first_name}, Lo lamentamos!`}</p>
            <p
              className="paymentStatusInfo"
              style={{ color: "#FF4136" }}
            >{`El pago a sido Rechazado!`}</p>
            <p className="paymentStatusTotal">{`Total: $${dataOrder?.amount}`}</p>
            <p className="paymentStatusMailNotification ">
              Puede intentar nuevamemente, o cambie el metodo de pago
            </p>
          </div>
        </>
      );
    }
    return (
      <>
      <div className="containerPaymentStatusIcon ">
        <BsQuestion className="animate__animated animate__jackInTheBox paymentStatusIcon3 " />
      </div>
      <div className="containerPaymentStatusGreetingInfoTotal">
        <p className="paymentStatusGretings">{`Hola ${dataOrder?.first_name}, aguarda unos momentos! `}</p>
        <p className="paymentStatusInfo" style={{color:"#F1C40F"}}>{`El pago está siendo procesado!`}</p>
        <p className="paymentStatusTotal">{`Total: $${dataOrder?.amount}`}</p>
        <p className="paymentStatusMailNotification ">
            Le enviaremos un mail cuando el estado del pago haya cambiado
          </p>
      </div>
    </>
    );
  };
  useEffect(() => {
    //Solicitar objeto del storage, guardarlo en la bdd y eliminarlo del storage
    // returnar la devolucion de la peticion fetch.,mientras cargar.
    //luego mostrar panel.
    
    const purchaseData = async()=>{
      setLoading(true);
      const data= await getPrePurchaseData()
      if(data){
          let totalAmount=data.products.reduce((accumulator, order) => {
          return accumulator + order.unit_price * order.quantity;
        }, 0)
        console.log("hola")
        setDataOrder({first_name:data.first_name,amount:Number(totalAmount).toFixed(2)})
        const totalData={...data,payment_id:queryParamsObject.payment_id,payment_type:queryParamsObject.payment_type,amount:Number(totalAmount).toFixed(2),preference_id: queryParamsObject.preference_id}
        if(queryParamsObject.status==="approved" && queryParamsObject.collection_status==="approved"){
           await successfulPayment(totalData)
          
        }
      }
      setTimeout(()=>{setLoading(false);},1000)
    
    }  

    purchaseData()

  }, [location.search]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="containerPaymentStatus">
          {renderPaymentStatus()}
          <div className="paymentStatusLinkButtonsContainer">
            {queryParamsObject.status === "approved" ? (
              <Link to={"/account/current"}>Ir A Mis Compras</Link>
            ) : (
              <Link to={"/cart"}>Ir Al Carrito</Link>
            )}
            <Link to={"/products?all=true"}>Ir a Productos</Link>
          </div>
        </div>
      )}
    </>
  );
};
