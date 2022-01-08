import { useEffect, useState } from "react";

export default function CartCard(props){
    let {product} = props
    const [amount, setAmount] = useState(1);
    useEffect(()=>props.setPrice(product.id, amount*product.price),[amount]);
    return(
        <div className="cart-card">
            <img src={product.image} alt=""/>
            <div className="data-cont">
                <span className="cart-name">{product.id}</span>
                <span className="cart-price">Precio: ${product.price*amount}</span>
                <div className="cart-acum">
                    <span onClick={()=>setAmount(amount-1)}>-</span>
                    <span className="cart-amount">{amount}</span>
                    <span onClick={()=>setAmount(amount+1)}>+</span>
                </div>
            </div>
            <span className="take-off-cart highlight" onClick={()=> props?.takeOff(product.id)}>Quitar</span>
        </div>
    );
}