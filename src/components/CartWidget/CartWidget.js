import "./CartWidgetStyles.css"
import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { BsCart } from "react-icons/bs";




 export const CartWidget = () =>{
    const location =useLocation()
    const{totalCartItems,AddProductToCart,login} =useContext(AppContext)
    return(
        <div className="cartWidgetContainer">
            <BsCart className="cartWidgetIcon"></BsCart>
            <span className="cartWidgetCounter">{totalCartItems()}</span>
        </div>
    )
}

