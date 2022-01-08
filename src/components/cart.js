import { useEffect, useState } from "react";
import CartCard from "./cartcard";

export default function CartView(props){
    const [prices, setPrices] = useState({});
    const [total, setTotal] = useState(0);
    const [cart,setCart] = useState(localStorage.getItem("products")?.split(","));
    const takeOff = (id)=>{
        let aux = [...cart];
        aux.splice(cart.indexOf(id),1);
        (aux.length)?localStorage.setItem("products",aux): localStorage.removeItem("products");
        setCart(aux);
    }
    const setPrice = (id,price)=>{
        let obj = prices;
        obj[id] = price;
        setPrices(obj);
        setTotal(Object.values(obj)?.reduce((last,cur)=>{ return last+=cur}));
    }
    
    return (
        <div id="cart_view" >
            <div className="material-icons close highlight" onClick={props?.close}>keyboard_arrow_left</div>
            <h2>Carrito</h2>
            {(cart.length)?
            <div className="cart-products">
                <p>Productos ({cart.length})</p>
                {cart?.map(p => <CartCard  key={p}  product={props.products.filter(pr => pr.id === p)[0]} setPrice={setPrice} takeOff={takeOff}/>)}
                <div className="buy-flap">
                   <div>Total: ${total}</div>
                   <button className="formated-btn"  style={{background:"#eee", color:"#141416"}}>Comprar</button>
                </div>
            </div>
            :<span>Aun no seleccionó ningun producto</span>
            }
        </div>
    );
}