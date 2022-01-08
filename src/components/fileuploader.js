import {useEffect, useState} from "react";
// import uploadingGIF from "../../imgs/uploading.gif"

export default function FileUploader (props){
    const inventory = require("./database/product");
    const [uploading,setUploading] = useState(false);
    const [picture,setPicture] = useState();
    const [groups, setGroups] = useState();
    useEffect(async ()=>{
        inventory.Serve(props.db);
        const groups = [], products = await inventory.getAll();
        await products.forEach(p => (!groups.includes(p.group))?groups.push(p.group):"") ;
        setGroups(groups);
        console.log(groups);
    },[inventory])
    const handleInput = e=>{
        const reader = new FileReader();
        reader.addEventListener("load", function(){console.log(this); setPicture(this.result)});
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSubmit = async e=>{
        e.preventDefault();
        setUploading(true);
        const product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description:  document.getElementById("description").value,
            stock: document.getElementById("stock").value,
            image: document.getElementById("file-input").files[0],
            group: document.getElementById("group").value
        }
        const result = await inventory.add(product);
        console.log(result);
        window.location = "/addProduct";
    }
    if(uploading) return <div>Loading...</div>//<img src={uploadingGIF} width={320} alt="Subiendo"/>
    return (
        <form id="file-uploader" onSubmit={handleSubmit}>
            <h2>Ingresar un Nuevo Producto</h2>
            <input id="group" placeholder="Grupo" list="groups" required/>
            <datalist id="groups">{(groups)?groups.map(g => <option key={g}>{g}</option>):""}</datalist>
            <input id="name" placeholder="Nombre" required/>
            <input type="number" id="price" placeholder="Precio" required/>
            <input type="number" id="stock" placeholder="Cantidad" required/>
            <input id="description" placeholder="Descripción" required/>
            <div>
                <label for="file-cont">Inserte Una Imagen</label>
                <div id="file-cont">
                    <span className="material-icons">file_upload</span>
                    <input id="file-input" type="file" onChange={handleInput} required/>
                </div>
            </div>
            {(picture)?<img width="64" src={picture} alt="something have gone very bad"/>:''}
            <button type="submit">Guardar</button>
        </form>
    );
}