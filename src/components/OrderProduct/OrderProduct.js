import "./OrderProductStyles.css"

export const OrderProduct = ({item})=>{
    return (
        <div className="containerOrderProduct">
            <img className="imageOrderProduct" src={item.thumbnail}></img>
            <div className="titleQuantityOrderProduct">
                <h5 className="titleOrderProduct">{item.title}</h5>
                <div className="quantityPriceOrderProduct">
                <span className="quantityOrderProduct">Cantidad: {item.quantity}</span>
                <span className="priceOrderProduct">${(item.unit_price*item.quantity).toFixed(2)}</span>
                </div>
                
            </div>
        </div>
    )

}