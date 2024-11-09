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
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
  const listAllTask = () => {
    // Create a reference under which you want to list
    return getDocs(collection(firestore, "Task"));
  };
  const updateTask = async (taskId: string, action: "complete" | "fail") => {
    try {
      // Update the task status in Firestore
      const taskRef = doc(firestore, "Task", taskId); // Replace "tasks" with your collection name
      await updateDoc(taskRef, {
        status: action === "complete" ? "completed" : "failed",
      });
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  };

  // Function to put data into Firebase database
  const putData = (key: string, data: any) => {
    set(ref(database, key), data);
  };
  const putUserDataFirestore = async (id: any) => {
    try {
      const data = await addDoc(collection(firestore, "User"), {
        id: id.id,
        name: id.name,
        email: id.email,
      });
      return data;
    } catch (error) {
      console.error("Error adding document:", error);
      return "";
    }
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
  const getDataById = async (id: string) => {
    try {
      const userQuery = query(
        collection(firestore, "User"),
        where("id", "==", id)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        console.log("No user found with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const updateUserDataFirestore = async (id: string, updatedData: any) => {
    try {
      const userQuery = query(
        collection(firestore, "User"),
        where("id", "==", id)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].ref;
        await updateDoc(userData, updatedData);
        return true; // Indicate success
      } else {
        console.log("No user found with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
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
  const putDataFirestore = async (Task: any) => {
    try {
      console.log(Task);
      const data = await addDoc(collection(firestore, "Task"), {
        title: Task.title,
        status: Task.status,
        description: Task.description,
        assigne: Task.assigne,
        created: Task.created,
      });
      return data;
    } catch (error) {
      console.error("Error adding document:", error);
      return "";
    }
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
        listAllTask,
        updateTask,
        putData,
        putUserDataFirestore,
        updateUserDataFirestore,
        getData,
        getDataById,
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
