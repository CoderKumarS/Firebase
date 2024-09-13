import React, { useState, useEffect } from "react";
import { useFirebase } from "../module/firebase";
import Alert from "../test/Alert";
import Button from "../test/Button";
import { Form } from "react-bootstrap";

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
    setUser(prevState => ({ ...prevState, [id]: value }));
  };

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert(prevAlert => ({ ...prevAlert, visible: false }));
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
      const auth = await firebase.signinUserWithEmailAndPassword(user.email, user.password);
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
    <div className="d-flex flex-column align-items-center justify-content-center position-relative">
      {alert.visible && (
        <Alert
          onClose={() => setAlert(prevAlert => ({ ...prevAlert, visible: false }))}
          color={alert.color}
        >
          {alert.message}
        </Alert>
      )}
      <h1 className="m-3 pb-2 text-center border-bottom border-primary">
        Log In
      </h1>
      <Form className="m-3 p-2 border border-primary rounded bg-info bg-opacity-10 container-sm">
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
            required
          />
        </Form.Group>
        <div className="my-2 text-center">
          <Button onClick={handleLogIn} color="primary">
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogIn;
