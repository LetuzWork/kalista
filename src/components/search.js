import { useState } from "react";

const sleep = delay => new Promise(resolve=>setTimeout(resolve, delay));
export default function SearchView(props){
    const [text,setText] = useState("");

    const handleSearch = ()=>{
        window.location = "/search/" + text;
    }
    return (
        <div id="search_view">
            <span className="material-icons" onClick={handleSearch}>search</span>
            <input placeholder="¿Qué estás buscando?" onChange={e => setText(e.target.value)}/>
            <span className="material-icons" onClick={props.close}>close</span>
        </div>
    );
    
}