import React, { useState, useEffect } from "react";
import { useFirebase } from "../module/firebase";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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
  const handleLogIn = async (): Promise<void> => {
    if (user.email === "" || user.password === "") {
      setAlert({
        visible: true,
        message: "Email and Password are required",
        color: "danger",
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
        color: "success",
      });
      setUser({ email: "", password: "" });
    } catch (error: any) {
      setAlert({
        visible: true,
        message: error.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center position-relative h-75">
      {alert.visible && (
        <Alert
          onClose={() =>
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }))
          }
          color={alert.color}
        >
          {alert.message}
        </Alert>
      )}
      <div className="row w-75 ">
        <div className="container-sm col relative">
          <img
            src="https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_v38iuAxhM7IUI-KbsEeiNmLgUyiw3_SfW3CI6x9OY4cTjUv8MX_LivgjkUHM60GLzq_UboTuKaT0YoWyop0Kff-JBsbMEXfsyyBPPe7K0wXtG7Q9YTNOzmi3PV99DxPO4oyQSHQwA=w919-h516-p-k-no-nu"
            alt="HeroImage"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 mx-5">
            <h1 className="pb-2 text-left border-bottom border-primary text-white">
              Log In
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
              nulla nisi minima aliquid officia nobis ea repudiandae earum animi
              quasi?
            </p>
          </div>
        </div>
        <Form className="p-2 border border-primary rounded bg-info bg-opacity-10 container-sm col w-75">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleUser}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleUser}
              autoComplete="false"
              required
            />
          </Form.Group>
          <div className="my-2 text-center">
            <Button onClick={handleLogIn} color="primary">
              Log In
            </Button>
          </div>
          <div className="my-2 text-center">
            <NavLink to="/forgot">Forgotten password?</NavLink>
          </div>
          <hr />
          <div className="buttons">
            <div className="my-2 text-center">
              <Button onClick={() => {}} color="danger">
                Sign In With Google
              </Button>
            </div>
            <div className="my-2 text-center">
              <Button onClick={() => {}} color="success">
                <NavLink to="/login" className="text-white no-underline">
                  Create new Account
                </NavLink>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
