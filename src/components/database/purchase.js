import {collection,doc, setDoc,getDoc,addDoc, getDocs, query, where, deleteDoc} from "firebase/firestore";

let db = {};
const Serve = database => db = database;

const getAll = async() => {
    const ref = query(collection(db,"purchases"));
    const snap = await getDocs(ref);
    return snap.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data
    });
}
const search = async user => {
    console.log(user);
    if(!user) return;
    const ref = query(collection(db,"purchases"), where("user", "==", user));
    const snap = await getDocs(ref);
    return snap.docs.map(doc => {return{...doc.data(),id:doc.id}});
}
const add = async purchase => {
    try{
        let newPurchase = {user:purchase.user,products: purchase.products,total: purchase.total,status: "A realizarse", date: (new Date()).toLocaleString().substring(0,15)};
        const ref = await addDoc(collection(db, "purchases"),newPurchase);
        const p = await getDoc(doc(db,"purchases",ref.id));
        return ({...p.data(),id:p.id});
    }catch (e){ console.log(e)};
}
const erase = async id =>{
    return await deleteDoc(doc(db, "purchases", id));
}
const cancel = async id =>{
    return await setDoc(doc(db,"purchases",id),{status:"Cancelado"},{merge:true});
}
const done = async id =>{
    return await setDoc(doc(db,"purchases",id),{status:"Realizado"},{merge:true});
}

export {Serve,add, getAll, search, erase, done, cancel}