import PorductCard from "./productCard";

export default function GroupPage(props){
    const group = props.g;
    const cart = localStorage.getItem("products")?.split(",");
    return(
        <div id={"gp-"+ group.name} className="group-page">
            <h2>{group.name}</h2>
            {group.products.map(p => <PorductCard key={"card" + p.name} p={p} onCart={cart?.includes(p.id)}/>)}
        </div>
    );
}