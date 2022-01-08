import { useEffect, useState } from "react";

export default function PorductCard(props){
    const [onCart,setOnCart] = useState(props.onCart);
    let product = props.p;
    console.log(product);
    const handleAdd = (inserting)=>{
        let cart = localStorage?.getItem("products")?.split(",");
        if(inserting)cart = (cart)?[...cart,product.id]:product.id;
        else cart.splice(cart.indexOf(product.id),1);

        (cart.length)?localStorage.setItem("products",cart): localStorage.removeItem("products");
        console.log(cart);
    }
    return(
        <div className="product-card">
            <img src={product.image} alt=""/>
            <div  className="material-icons cart-button highlight" onClick={()=>{handleAdd(!onCart); setOnCart(!onCart); }}>{(!onCart)?"shopping_cart":"shopping_bag"}</div>
            <span className="product-id">{product.id}</span>
            <span className="product-price">${product.price}</span>
        </div>
    );
}