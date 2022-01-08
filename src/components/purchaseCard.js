// import { useState } from "react";

// export default function PurchaseCard(props){
//     const [displayed,setDisplayed] = useState(false);
//     const purchase = props.p;
//     if(!displayed)return(
//         <div className="purchase-card">
//             <img src={p.products[0].image}/>
//             <div>
//                 <span>ORDEN {p.id}</span>
//                 <span>fecha</span>
//             </div>
//             <span className="material-icons">open</span>
//         </div>
//     );
//     return(
//         <div className="purchase-card">
//             <img src={p.products[0].image}/>
//             {(p.products.length>1)?<span className="amount-label">{p.products.length} Productos</span>:""}
//             <div>
//                 <span>ORDEN {p.id}</span>
//                 <span>fecha</span>
//                 <span>Pago: {p.pago}</span>
//                 <span>Estado: {p.status}</span>
//                 <span className="total">Total: ${p.total}</span>
//                 <span>Ver Detalle</span>
//             </div>
//             <span className="material-icons">close</span>
//         </div>
//     );
// }