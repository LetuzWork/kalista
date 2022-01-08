import {collection,doc, setDoc,getDoc,addDoc, getDocs, query, where,deleteDoc } from "firebase/firestore";
import { getStorage,  ref,uploadBytes,getDownloadURL,deleteObject} from "firebase/storage";
let db = {}, storage;
const Serve = database =>{ db = database; storage = getStorage();}

const add = async product => {
    let newProduct = { description: product.description, stock: product.stock, price: product.price, group: product.group};
    const storageRef = ref(storage, product.name);
    await uploadBytes(storageRef, product.image)
    newProduct.image = await getDownloadURL(storageRef);
    await setDoc(doc(db,"products",product.name),newProduct);
    return (newProduct);
    
    
}
const getAll = async() => {
    const ref = query(collection(db,"products"));
    const snap = await getDocs(ref);
    return snap.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data
    });
}
const search = async id =>{
    const ref = doc(db,"products",id);
    const Doc = await getDoc(ref);
    return (Doc.data())?{...Doc.data(),id:Doc.id}:undefined;
}
const modify = async (id,atr,value) => {
    return await setDoc(doc(db,"products",id),{[atr]:value},{merge:true});
}
const erase = id => {
    let msg;
    deleteDoc(doc(db, "products", id))
    .then(async () => await deleteObject(ref(storage,id)))
    .then(() => msg = "Erased Correctly")
    .catch(err => msg = err);

    return msg;
}
const getGroups =async  ()=>{
    const inventory = await getAll();
    const  groups = {names:[],imgs:[],products:{}};
    await inventory.forEach(p =>{
        if(!groups.names.includes(p.group)){groups.names.push(p.group); groups.imgs.push(p.image); groups.products[p.group]=[]}
        groups.products[p.group].push(p);
    });
    return groups.names.map((n,i) =>{return{name: n, img: groups.imgs[i],products: groups.products[n]}});
}
const searchGroup = async (id)=>{
    const inventory = await getAll();
    return inventory.filter(p =>  p.id.toLowerCase().indexOf(id.toLowerCase()) !== -1);
}
export {Serve, add, getAll, search, modify, getGroups, erase,searchGroup}