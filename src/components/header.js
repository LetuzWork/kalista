// import icon from "../imgs/white-recortado.png"
import { useState } from "react";
import SearchView from "./search"
import CartView from "./cart"
import MenuView from "./menu"

export default function Header(props){
    const [searchView,setSearchView] = useState(false);
    const [cartView,setCartView] = useState(false);
    const [menuView,setMenuView] = useState(false);
    console.log(props.products);
    return(
        <header>
            <a href="/" className="logo">KALISTA</a>
            {(searchView)?<SearchView close={()=>setSearchView(false)}/>:(cartView)?<CartView close={()=>setCartView(false)} products={props.products}/>:(menuView)?<MenuView close={()=>setMenuView(false)} groups={props.groups}/>
            :""}<nav>
                <span className="material-icons" onClick={()=>setSearchView(!searchView)}>search</span>
                <span className="material-icons" onClick={()=>setCartView(!cartView)}>shopping_cart</span>
                <span className="material-icons" onClick={()=>setMenuView(!menuView)}>menu</span>
            </nav>
        </header>
    );
}