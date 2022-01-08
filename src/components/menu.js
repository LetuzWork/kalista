import { useEffect,useState } from "react"
import {getAuth, signOut } from "firebase/auth";
import Footer from "./footer"

export default function Menu(props){
    const handleLogout = ()=>{
        signOut(getAuth())
        .then(res =>console.log(res.user.mail + " logged out"))
        .catch(err => console.log(err));
    }
    return (
        <div id="menu_view">
            <div className="material-icons close highlight" onClick={props.close}>close</div>
            <a href = "/" className="highlight">Inicio</a>
            {props.groups.map(g=> <a href={"/" + g.name} key={"menu" + g.name} className="highlight" >{g.name}</a>)}
            <a href="/Contact" className="highlight" key="menu contact">Contacto</a>
            <Footer/>
            <div id="user-acount-buttons">
                {(props.user)?<>
                <span onClick={()=>window.location="/user"}>Mi Cuenta</span>
                <span onClick={handleLogout}>Salir</span>
                </>:<>
                <span onClick={()=>window.location="/register"}>Registrarse</span>
                <span onClick={()=>window.location="/login"}>Iniciar</span>
                </>}
            </div>
        </div>
    )
}