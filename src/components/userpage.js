import { useEffect, useState } from "react";
import UserData from "./userData";
import UserPurchases from "./userPurchases";

export default function UserPage(props){
    const purchaserver = require("./database/purchase")
    const [toggle,setToggle] = useState(false);
    const [purchases,setPurchases] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(async()=>{
        purchaserver.Serve(props.db);
        var datos = await purchaserver.search(user?.name);
        setPurchases(datos);
        setLoading(false);
    },[])
    const user = props.user;
    if(loading)return "loading..."
    return(
        <div id="user-page">
            <h2>Hola {user.name}!</h2>
            <div id="userdata-switcher">
                <div onClick={()=>setToggle(false)} className={(!toggle)?"active":""}> Mis Compras</div>
                <div  onClick={()=>setToggle(true)} className={(toggle)?"active":""}> Mis Datos</div>
            </div>
            {(!toggle)?<UserPurchases userver={props.userver} purchases={purchases} user={user}/>: <UserData userver={props.userver} user={user}/>}
        </div>
    )
}