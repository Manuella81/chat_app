import React, { useState } from "react"
import { db, auth } from "../firebase-config"
import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";


function SendMessage() {
 const [msg, setMsg] = useState("")
 const messagesRef = collection(db, "messages");
 
 const sendMsg = async (e) => {
 const { uid, displayName, photoURL } = auth.currentUser
 
 await addDoc(messagesRef, {
 text: msg,
 name: displayName,
 createdAt: serverTimestamp(),
 uid: uid,
 photoURL: photoURL
 })
 setMsg("");
 };

return (
 <div className="message"> 
    <input placeholder="Message…" 
    type="text" value={msg} 
    onChange={(e) => setMsg(e.target.value)}
    />
    <button onClick={sendMsg}><FontAwesomeIcon icon={faPaperPlane} /></button>
 </div>
 )
}

export default SendMessage