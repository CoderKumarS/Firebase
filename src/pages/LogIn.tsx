import React, { useState, useEffect } from "react";
import { useFirebase } from "../module/firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

interface UserState {
  email: string;
  password: string;
}

interface AlertState {
  visible: boolean;
  message: string;
  color: string;
}

const LogIn: React.FC = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    message: "",
    color: "",
  });

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setUser((prevState) => ({ ...prevState, [id]: value }));
  };

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert.visible]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/profile");
    }
  }, [firebase, navigate]);
  const signUpWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const auth = await firebase.signinUserWithGoogle();
      await firebase.putData("users/" + auth.user.uid, {
        name: auth.user.displayName,
        email: auth.user.email,
      });
      setAlert({
        visible: true,
        message: `${auth.user.email} Signed in successfully`,
        color: "green",
      });
    } catch (error: any) {
      setAlert({
        visible: true,
        message: error.message,
        color: "red",
      });
      setIsLoading(false);
    }
  };
  const handleLogIn = async (): Promise<void> => {
    setIsLoading(true);
    if (user.email === "" || user.password === "") {
      setAlert({
        visible: true,
        message: "Email and Password are required",
        color: "red",
      });
      return;
    }

    try {
      const auth = await firebase.signinUserWithEmailAndPassword(
        user.email,
        user.password
      );
      setAlert({
        visible: true,
        message: `${auth.user.email} Signed in successfully`,
        color: "green",
      });
      setUser({ email: "", password: "" });
    } catch (error: any) {
      setAlert({
        visible: true,
        message: error.message,
        color: "red",
      });
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100dvh-4rem)] flex items-center justify-center bg-cover bg-center bg-slate-700"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_v38iuAxhM7IUI-KbsEeiNmLgUyiw3_SfW3CI6x9OY4cTjUv8MX_LivgjkUHM60GLzq_UboTuKaT0YoWyop0Kff-JBsbMEXfsyyBPPe7K0wXtG7Q9YTNOzmi3PV99DxPO4oyQSHQwA=w919-h516-p-k-no-nu')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md p-8 m-4 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Log In
        </motion.h1>
        {alert.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`mb-4 p-3 rounded-md ${
              alert.color === "green"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
          </motion.div>
        )}
        <form className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleUser}
              required
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-transparent rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Enter your email"
            />
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleUser}
              required
              autoComplete=""
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-transparent rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Enter your password"
            />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogIn}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </motion.button>
          </motion.div>
        </form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-opacity-20 backdrop-filter backdrop-blur-lg text-white">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={signUpWithGoogle}
            >
              <span className="sr-only">Sign in with Google</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with GitHub</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-sm text-white"
        >
          Not a member?{" "}
          <NavLink
            to="/signup"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Sign up now
          </NavLink>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LogIn;
