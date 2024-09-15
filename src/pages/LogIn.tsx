import React, { useState, useEffect } from "react";
import { useFirebase } from "../module/firebase";
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
      console.log(error);
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
        <div className="container-sm col">
          <img
            src="https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uiD7zTYPmlSgcMcd12jHp72vMysESxhG-eKa_U40SCqsN14sMzayGZEOLbWoG1m6PHEgxyhJuD4Az_vzRyMuj3GW04oI713xlnqmsq5hzGpFH1Co_DLcCqjNUwAOhtGBj9zaFB12TJJ6NdyUDk1gNmk1DS7BsJSB7MDQIJC30dm6FeL8ibn-vCzg=w919-h516-p-k-no-nu"
            alt="HeroImage"
          />
          <h1 className="pb-2 text-left border-bottom border-primary">
            Log In
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
            nulla nisi minima aliquid officia nobis ea repudiandae earum animi
            quasi?
          </p>
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
