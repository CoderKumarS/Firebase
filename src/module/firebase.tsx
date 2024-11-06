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
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

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

  // Function to sign in a user with google
  const signinUserWithGoogle = async () => {
    return signInWithPopup(firebaseAuth, googleProvider);
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
      let snapshot = await get(child(ref(database), "users/" + key));
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
  const getAdminData = async (key: string) => {
    try {
      const snapshot = await get(child(ref(database), "admin/" + key));
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
        signinUserWithGoogle,
        putData,
        getData,
        getAdminData,
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
