import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyD4mLMqm3DqbWy7nswgMZoHgqM5unEtL2Y",
  authDomain: "netlix-clone-b5f03.firebaseapp.com",
  projectId: "netlix-clone-b5f03",
  storageBucket: "netlix-clone-b5f03.firebasestorage.app",
  messagingSenderId: "962956837844",
  appId: "1:962956837844:web:f6a67fdd3d21858d7acc41",
  measurementId: "G-0XGGE0SYKL"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signUp=async (name,email,password)=>{
    try {
       const res=  await  createUserWithEmailAndPassword(auth,email,password);
       const user=res.user
       await addDoc(collection(db,'user'),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }
}

const login =async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signUp,logout} 