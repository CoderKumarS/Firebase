import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsKcyebUwlLJtgRFdr57HgOjJUSNMmk4k",
  authDomain: "loginfirebase-95ef0.firebaseapp.com",
  projectId: "loginfirebase-95ef0",
  storageBucket: "loginfirebase-95ef0.appspot.com",
  messagingSenderId: "383204528230",
  appId: "1:383204528230:web:4c398f73fbd5984c469da7",
  databaseURL: "https://loginfirebase-95ef0-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const FirebaseContext = createContext<any>(null); // createContext with any as initial type

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // User type from Firebase

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set authenticated user
      } else {
        setUser(null); // No user signed in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to sign up a user with email and password
  const signupUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to sign in a user with email and password
  const signinUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to put data into Firebase database
  const putData = (key: string, data: any) => {
    set(ref(database, key), data);
  };

  // Check if user is logged in
  const isLoggedIn = !!user;

  // Provide context values to children components
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        putData,
        isLoggedIn,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
