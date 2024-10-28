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
  signOut,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

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
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// createContext with any as initial type
const FirebaseContext = createContext<any>(null);

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
  const getData = async (key: string) => {
    try {
      const snapshot = await get(child(ref(database), "users/" + key));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return "";
    }
  };
  const putDataFirestore = async (
    name: string,
    isbNumber: string,
    price: number,
    coverPic: any
  ) => {
    const imgRef = storageRef(
      storage,
      `publish/images/${Date.now()}-${coverPic}`
    );
    const uploadResult = await uploadBytes(imgRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbNumber,
      price,
      coverPic: uploadResult.ref.fullPath,
      userId: user?.uid,
      userEmail: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
  };
  // Check if user is logged in
  const isLoggedIn = user ? true : false;
  //logged out user
  const signOutUser = () => signOut(firebaseAuth);
  // Provide context values to children components
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        putData,
        getData,
        putDataFirestore,
        isLoggedIn,
        signOutUser,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
