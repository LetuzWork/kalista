import { getAuth,GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {collection,doc, setDoc,getDoc,addDoc, getDocs, query, where } from "firebase/firestore";

let db = {}, autho = {};
const Serve = database =>{db = database; autho = getAuth();}

const getAll = async() => {
    const ref = query(collection(db,"users"));
    const snap = await getDocs(ref);
    return snap.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data
    });
}
const add = async user =>{
    if(!user.noG){
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(autho,provider);
        await setDoc(doc(db,"users",credentials.user.uid),{name:credentials.user.displayName,image: credentials.user.photoURL});
        return {msg:"Registrado Correctamente"};
    }
    const isRepeated = await getDocs(query(collection(db,"users"), where("name","==",user.name)));
    if(isRepeated.docs.length) return {error:true, msg:"Ese nombre de usuario ya existe, seleccione otro"};
    try{
        const credentials = await createUserWithEmailAndPassword(autho,user.mail,user.password);
        await setDoc(doc(db,"users",credentials.user.uid),{name:user.name, phone: user.phone });
        return {msg:"Registrado Correctamente"};
    }catch (e) {return {error:true, msg: e};}
}

const auth = async user => {
    if(!user.noG){
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(autho,provider);
        return {msg:"Iniciado sesion correctamente Correctamente"};
    }
    try{
        const credentials = await signInWithEmailAndPassword(autho,user.mail,user.password);
        return {msg:"Iniciado Sesion Correctamente"};
    }catch (e) {return {error:true, msg: "El usuario o la contraseña ingresados son incorrectos"};}
}

const search = async id =>{
    if(!id)return;
    const ref = doc(db,"users",id);
    const Doc = await getDoc(ref);
    return (Doc?.id)?{...Doc?.data(),id:Doc?.id}:undefined;
}
const find = async name =>{
    const ref = query(collection(db,"users"), where("name","==",name));
    const snap = await getDocs(ref);
    return (snap.docs.length)?{...snap.docs[0].data(),id:snap.docs[0].id}:undefined;
}
const setPhone = async (id,phone) =>{
    return setDoc(doc(db,"users",id),{phone:phone},{merge:true});
}
export {Serve,getAll,add,auth,search,find,setPhone}