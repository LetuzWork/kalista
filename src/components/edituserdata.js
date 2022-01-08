import { useState } from "react";

export default function EditUserData(props){
    const [name,setName] = useState();
    const [phone,setPhone] = useState();
    const [mail,setMail] = useState();
    const user = props.user;

    const handleChanges = async e=>{
        e.preventDefault();
        const result = await props.userver.edit({mail,name,phone});
        if(result.error) alert(result.msg);
        else window.location = "/user";
    }
    if(!user) window.location = "/";
    return(
        <div id="edit-userdata" className="auth-card">
            <h2>Editar Datos</h2>
            <form onSubmit={handleChanges}>
                <input type="email" placeholder="Correo Electrónico" value={user.mail} onChange={e => setMail(e.target.value)} required/>
                <input placeholder="Nombre" onChange={e => setName(e.target.value)} value={user.name} required/>
                <input type="tel"  onChange={e=>setPhone(e.target.value)} value={user?.phone} placeholder="+54 3487 123456" pattern="[+()\d-]+.{10,13}" title="Debe usar un formato valido de numero telefonico" required/>
                <button type="submit" className="login-button" style={{background:"#29f"}}>Guardar Cambios</button>
            </form>
        </div>
    )
}

//ACORDATE DE HACER LAS VERIFICACIONES 
//HACE UN ROUTER PARA EDIT EN USERVER
//Agrega mail al router de add user
