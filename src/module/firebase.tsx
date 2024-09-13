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
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  databaseURL: "your_database_url",
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
