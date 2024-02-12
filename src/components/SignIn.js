/**Ce code importe les éléments d’authentification et de fournisseur Google configurés 
 dans le fichier de configuration de Firebase. 
 * La méthode signInWithPopup de Firebase prend les composants d'authentification et de fournisseur comme paramètres. 
 Cette fonctionnalité permettra de valider les individus avec leurs identifiants Google.
 * il retourne un div contenant un bouton qui, lorsqu'il est cliqué, appelle la fonction signInWithGoogle*/

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config"
 
function SignIn() {
 const signInWithGoogle = () => {
 signInWithPopup(auth,provider)
 };
 return (
 <div>
 <button onClick={signInWithGoogle}>Sign In With Google</button>
 </div>
 )
}

export default SignIn