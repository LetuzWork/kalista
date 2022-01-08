import { useEffect,useState } from 'react';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default function Register(props){
    const [name,setName] = useState();
    const [password,setPassword] = useState();
    const [phone,setPhone] = useState();
    const [mail,setMail] = useState();
    const [allowed, setAllowed] = useState(false);
    useEffect(()=>{
        let number
        try{number = phoneUtil.parseAndKeepRawInput(phone, 'AR')}catch(e){return }
        if(mail?.includes("@") && (name != "") && (password?.length >= 6) && phoneUtil.isValidNumber(number))setAllowed(true)
        else if(allowed) setAllowed(false);
    })
    const handleRegister =async (e,noG)=>{
        e.preventDefault();
        props.load(true);
        const result = await props.userver.add({name,password,mail,phone,noG});
        props.load(false);
        alert(result.msg);
        if(!result.error) window.location = "/";
    }
    return (
        <div id="register" className="auth-card">
            <h2>Registrarse</h2>
        <form onSubmit={e => handleRegister(e,true)}>
            <input type="email" placeholder="Correo Electrónico" onChange={e => setMail(e.target.value)} required/>
            <input placeholder="Nombre" onChange={e => setName(e.target.value)} required/>
            <input type="tel"  onChange={e=>setPhone(e.target.value)} placeholder="+54 3487 123456" pattern="[+()\d-]+.{10,13}" title="Debe usar un formato valido de numero telefonico" required/>
            <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} pattern=".{6,}"   required title="6 caracteres minimo"/>
            <button  disabled={(allowed)?"":"disabled"} type="submit" className="login-button" style={{background:"#29f"}}>Registrar</button>
        </form>
        <button className="login-button" onClick={handleRegister} style={{background:"#f54"}}>Registrarse con Google</button>
    </div>
    );
}