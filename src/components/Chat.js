/**Ce code importe la base de données, les composants de vérification initialisés dans le fichier
  firebase- config.js, et les méthodes Firestore personnalisées qui facilitent la gestion des données stockées. 
  * import { collection, query, limit, orderBy, onSnapshot } permet d'interroger et capturer les données actuellement stockées 
  dans la collection de messages Firestore, triées par heure de création, et de lire uniquement les 50 messages les plus récents.
  * Les méthodes Firestore sont encapsulées et exécutées dans un Hook useEffet pour s'assurer que les messages sont affichés immédiatement, 
  chaque fois qu'on appui sur le bouton d'envoi, sans rafraîchir la fenêtre de la page. Lorsque les données sont lues, elles sont enregistrées 
  dans messages.
*/

import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase-config";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [chatPartnerInfo, setChatPartnerInfo] = useState({
    name: "Partenaire de Chat",
    photoURL: "url-avatar-par-defaut",
  });
  const [chatPartnerUID, setChatPartnerUID] = useState(null);
   const messagesEndRef = useRef(null);


  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const messageListener = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(messagesArray);

      // Récupérer l'UID du partenaire de chat
      const partnerUID = getChatPartnerUID(messagesArray);
      setChatPartnerUID(partnerUID);

      
      if (partnerUID) {
        // Récupérer les informations du partenaire de chat depuis les messages
        fetchChatPartnerInfo(messagesArray, partnerUID);
      }
    });

    // Nettoyage des écouteurs
    return () => messageListener();
  }, []);


  useEffect(() => {
    // Faire défiler automatiquement vers le bas lorsqu'il y a de nouveaux messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  const handleChatPartnerClick = (uid) => {
    // Mettre à jour le partenaire de chat lorsque vous cliquez sur le bloc de discussion
    setChatPartnerUID(uid);
  };

  // récupère l'UID du partenaire de chat en comparant avec l'UID de l'utilisateur actuel.
  const getChatPartnerUID = (messagesArray) => {
    //récupère l'UID de l'utilisateur connecté
    const userUID = auth.currentUser.uid;
    const partnerUIDs  = messagesArray
      //map pour créer un nouveau tableau contenant les UID de chaque message 
      .map((message) => message.uid)
      //filter pour exclure l'UID de l'utilisateur actuel du tableau chatPartnerUIDs
      .filter((uid) => uid !== userUID);
    /*Si la longueur de chatPartnerUIDs est supérieure à 0, retourne le premier élément de chatPartnerUIDs (chatPartnerUIDs[0]).
    Sinon, retourne null*/
    return partnerUIDs .length > 0 ? partnerUIDs [0] : null;
  };

  // récupère les informations du partenaire de chat en utilisant l'UID.
  const fetchChatPartnerInfo = (messagesArray, uid) => {
    const partnerMessage  = messagesArray.find((message) => message.uid === uid);

    if (partnerMessage ) {
      setChatPartnerInfo({
        name: partnerMessage .name,
        photoURL: partnerMessage .photoURL || "url-avatar-par-defaut",
      });
    } else {
      // Gérer le cas où les informations du partenaire de chat ne sont pas trouvées
      console.error("Informations du partenaire de chat non trouvées.");
    }
  };


  return (
    <section id="chat">

      <div className="chat_left">

        <div className="title_fixed">
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <h2>Discussions</h2>
        </div>

        <div className="scroller"> 
          {chatPartnerUID && (
            /**Si un partenaire est sélectionné, la classe selected est ajoutée, sinon aucune classe supplémentaire n'est ajoutée.  */
            <div className={`bloc_discussion  ${chatPartnerUID ? 'selected' : ''}`} onClick={() => handleChatPartnerClick(chatPartnerUID)}>
              <img
                className="header_avatar"
                src={chatPartnerInfo.photoURL}
                alt="Avatar"
              />
              <h2>{chatPartnerInfo.name}</h2>
            </div>
          )}
        </div>

      </div>

    <div className="chat_right">
      {chatPartnerUID && (
        <div className="header_chat" onClick={() => handleChatPartnerClick(null)}>
          <img
            className="header_avatar"
            src={chatPartnerInfo.photoURL}
            alt="Avatar"
          />
          <h2 className="header_name">{chatPartnerInfo.name}</h2>
        </div>
      )}
      
      <div className="messages-wrapper">

        <div className="scroller2"> 
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      
        <div ref={messagesEndRef} />

      </div>
      
      <SendMessage />
    </div>
  </section>
  );
}

export default Chat;