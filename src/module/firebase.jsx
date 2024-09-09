import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCsKcyebUwlLJtgRFdr57HgOjJUSNMmk4k",
  authDomain: "loginfirebase-95ef0.firebaseapp.com",
  projectId: "loginfirebase-95ef0",
  storageBucket: "loginfirebase-95ef0.appspot.com",
  messagingSenderId: "383204528230",
  appId: "1:383204528230:web:4c398f73fbd5984c469da7",
  databaseURL: "https://loginfirebase-95ef0-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const putData = (key, data) => {
    set(ref(database, key), data);
  };
  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, putData }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
