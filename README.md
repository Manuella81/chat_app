**CHAT_APP** (en cours de réalisation)

Bienvenue sur le projet CHAT_APP. Il s'agit d'une application fictif de conversation.
Utilisation de react.js en front et de firebase pour le back et cloud firestore pour la création de la base de données.
Firebase est utilisé pour la gestion en temps réel des messages, l'authentification des utilisateurs, le stockage de fichiers et l'analyse des données utilisateur.


**EXPLICATION DU CODE**

**firebase-config**: permet d'initialiser Firebase dans mon application web, d'accéder à Cloud Firestore pour stocker des données, et d'utiliser le service d'authentification Firebase pour gérer l'authentification des utilisateurs, en utilisant Google comme fournisseur d'authentification.

**App.js**: vérifie si un utilisateur est connecté en utilisant le hook useAuthState, puis affiche le composant Chat s'il est connecté ou le composant SignIn s'il n'est pas connecté. 

**Dossier components**:

- **Chat.js**: ce composant Chat gère l'affichage des messages de la conversation, permet à l'utilisateur de sélectionner un partenaire de discussion, et fournit une interface pour envoyer de nouveaux messages. Il utilise Firebase Firestore pour stocker et récupérer les messages, ainsi que Firebase Auth pour gérer l'authentification de l'utilisateur.

- **Message.js**: ce composant affiche l'interface utilisateur d'un message dans le chat, en incluant l'avatar de l'utilisateur et le texte du message. Il utilise également des classes conditionnelles pour aligner correctement les messages en fonction de l'utilisateur qui les a envoyés.

- **SendMessage.js**: ce composant permet à l'utilisateur de saisir un message dans un champ de texte, puis d'envoyer ce message en cliquant sur un bouton. Le message est ensuite ajouté à la base de données Firestore avec des informations supplémentaires telles que l'heure de création et les détails de l'utilisateur qui l'a envoyé.

- **SignIn.js**: ce composant fournit une interface utilisateur simple permettant à l'utilisateur de se connecter à l'application à l'aide de son compte Google. Lorsque l'utilisateur clique sur le bouton "Se connecter avec Google", une fenêtre contextuelle de connexion Google s'ouvre, permettant à l'utilisateur de saisir ses identifiants Google pour se connecter à l'application.



**CAPTURES D'ECRAN**

SE CONNECTER AVEC GOOGLE
![home](https://github.com/Manuella81/chat_app/assets/101250152/3a51bd88-643d-445f-b698-89bfca2f4f95)

INTERFACE DE CHAT
![chat1](https://github.com/Manuella81/chat_app/assets/101250152/c3e9ff61-208e-438c-b6cd-6c0acdd16ed7)
