import { initializeApp } from "firebase/app";

//! Authentication Services from Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//! Database Services from Firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzSW2HBdDQ3WmB9APlZ-gZlTQuOQpJw3A",
  authDomain: "music-app-project-qspider.firebaseapp.com",
  projectId: "music-app-project-qspider",
  storageBucket: "music-app-project-qspider.firebasestorage.app",
  messagingSenderId: "978015917105",
  appId: "1:978015917105:web:658b812916d06e1ec8f110",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

export default firebaseApp;