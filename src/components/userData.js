export default function UserData(props){
    const user = props.user;
    return(
        <div id="user-data" className="auth-card">
            <h3>Información Personal</h3>
            <span>{user.name}</span>
            <span>{user.mail}</span>
            <span>{user.number}</span>
            <button onClick={()=>window.location="edituser"} style={{background:"#37f"}}>Editar Información</button>
        </div>
    )
}