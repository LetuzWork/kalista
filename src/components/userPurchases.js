import PurchaseCard from "./purchaseCard";

export default function UserPurchases(props){
    const {user,purchases} = props;
    return(
        <div id="user-purchases">
            {(purchases[0])?purchases.map(p => <PurchaseCard p={p}/>)
            :<div id="nopurchase-msg" className="auth-card">
                <h3>Aun No Realizo Ninguna Compra</h3>
                <button onClick={()=>window.location="/"} style={{background:"#699"}}>Seguir Comprando</button>
            </div>}
        </div>
    )
}