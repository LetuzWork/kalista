import { useEffect, useState } from "react";
import PorductCard from "./productCard";

export default function Searching(props){
    const [products,setProducts] = useState(null);
    const [loading,setLoading] = useState(true);
    const cart = localStorage.getItem("products")?.split(",");
    useEffect(async ()=>{
        const id = window.location.pathname.split("/")[2];
        const datos = await props.inventory.searchGroup(id);
        setProducts(datos);
        console.log(datos);
        setLoading(false);
    },[]);
    if(loading)return "Loading..."
    return(
        <div id="search">
            {products.map(p => <PorductCard key={"card" + p.name} p={p} onCart={cart?.includes(p.id)}/>)}
        </div>
    );
}