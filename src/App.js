import {useEffect, useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import './App.css';
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import FileUploader from "./components/fileuploader";

import GroupPage from "./components/groupPage";
import Searching from "./components/searching";
import Login from "./components/login";
import Register from "./components/register";
import UserPage from "./components/userpage";
import EditUserData from "./components/edituserdata";

export default function App(props) {
  const [groups,setGroups] = useState(null);
  const [loading,setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const inventory = require("./components/database/product");
  const userver = require("./components/database/user");
  const [allProducts,setAllProducts] = useState([]);
  useEffect(async ()=>{
    inventory.Serve(props.db);
    let data = await inventory.getAll();
    setAllProducts(data);
    let datos = await inventory.getGroups();
    setGroups(datos);
    

    userver.Serve(props.db);
    onAuthStateChanged(getAuth(), async user =>{
      const userData = await userver.search(user?.uid);
      if(userData){
      // console.log({...userData,mail: user.email});
      setUser({...userData,mail: user.email});
      }
      setLoading(false);
    })
  },[inventory,props.db,userver])
  if(loading) return <div>Loading...</div>
  return (
    <div className="App">
      <Header groups={groups} user={user} products={allProducts}/>
      <div id="body">
        <Router >
          {groups.map(g => <Route key={"route"+ g.name} path={"/"+g.name} exact component={()=> <GroupPage g={g}/>}/>)}
          <Route path="/" exact component={()=> <Main db={props.db} groups={groups}/> }/>
          <Route path="/login" exact component={()=> <Login userver={userver}/> }/>
          <Route path="/register" exact component={()=> <Register userver={userver} load={x=> setLoading(x)}/> }/>
          <Route path="/user" exact component={()=> <UserPage userver={userver} user={user} db={props.db}/> }/>
          <Route path="/edituser" exact component={()=> <EditUserData userver={userver} user={user}/> }/>
          <Route path="/addProduct" exact component={()=><FileUploader db={props.db}/>}/>
          <Route path="/search/:id" exact component={()=> <Searching inventory={inventory}/> }/>
        </Router>
      </div>
      <Footer/>
    </div>
  );
}
