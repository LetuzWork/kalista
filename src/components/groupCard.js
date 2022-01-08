import { useState } from "react";

export default function GroupCard(props){
    const [visibility,setVisibility] = useState(false);
    let group = props.g;
    return(
        <a href={"/" + group.name} className="group-card" style={{visibility:(visibility)?"visible":"hidden",animation:(visibility)?"3s slideInFromLeft":""}}>
           <img src={group.img} onLoadCapture={()=>setVisibility(true)}/>
           <h2>{group.name}</h2>
        </a> 
    );
}