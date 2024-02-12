import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase-config.js"
import { useAuthState } from "react-firebase-hooks/auth"
import "./App.css";
function App() {
 const [user] = useAuthState(auth)
 return (
 <>
 {user ? <Chat /> : <SignIn />}
 </>
 );
}
export default App;
