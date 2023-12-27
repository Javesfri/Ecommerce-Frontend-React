import "./ProductCountStyles.css"
import React, { useState ,useContext} from 'react'
import {BiCartAdd} from "react-icons/bi"
import {BiMinus} from "react-icons/bi"
import {BiPlus} from "react-icons/bi"
import { AppContext } from "../../context/AppContext"
export const ProductCount = ({stock,idProduct})=>{
    const {AddProductToCart} = useContext(AppContext)
    const [counter, setCounter] = useState(1);
    const addQuantity = ()=>{
        if(counter < stock){
            setCounter(counter + 1)
        }
    }

    const decraeseQuantity =()=>{
        if(counter > 1){
            setCounter(counter - 1)
        }
    }

    const handleOnAdd = () =>{
        AddProductToCart(idProduct,stock,counter)
    }
    return(
        <div className="productCountAddCartContainer">

            <div className="productCountContainer">
                <BiMinus className="counterIcon" onClick={decraeseQuantity}></BiMinus>
                <div className="quantityVisualizer"><span>{counter}</span></div>
                <BiPlus className="counterIcon" onClick={addQuantity}></BiPlus>
               
            </div>
            <span>{`(${stock} disponiblies)`}</span>

                <button className="addCartButton" onClick={handleOnAdd}><BiCartAdd></BiCartAdd> Agregar</button>
        
        </div>
    )
}
