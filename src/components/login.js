import { useState } from "react";

export default function Login(props){
    const [password,setPassword] = useState();
    const [mail,setMail] = useState();
    const handleAuth = async (e,noG)=>{
        e.preventDefault();
        const result = await props.userver.auth({password,mail,noG});
        if(result.error) alert(result.msg);
        else window.location="/user";
    }
    return (
        <div id="login" className="auth-card">
            <h2>Inicia Sesión</h2>
            <form onSubmit={e => handleAuth(e,true)}>
                <input type="email" placeholder="Correo Electrónico" onChange={e => setMail(e.target.value)} required/>
                <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} pattern=".{6,}"   required title="6 caracteres minimo"/>
                <button type="submit" className="login-button" style={{background:"#29f"}}>Iniciar Sesion</button>
            </form>
            <button className="login-button" onClick={handleAuth} style={{background:"#f54"}}>Iniciar con Google</button>
        </div>
    )
}