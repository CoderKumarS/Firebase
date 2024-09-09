import React, { useState, useEffect } from "react";
import Alert from "../test/Alert";
import Button from "../test/Button";
import { Form } from "react-bootstrap";
function LogIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    color: "",
  });
  let target, value;
  const handleUser = (e) => {
    target = e.target.id;
    value = e.target.value;
    setUser({ ...user, [target]: value });
  };
  if (alert.visible) {
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 5000);
  }
  const handleLogIn = async () => {
    if (user.email == "" || user.password == "") {
      setAlert({
        ...alert,
        visible: true,
        message: "Email and Password are required",
        color: "danger",
      });
      return;
    }
    try {

    } catch (error) {
      setAlert({
        ...alert,
        visible: true,
        message: error.message,
        color: "danger",
      });
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center postion-relative">
      {alert.visible && (
        <Alert
          onClose={() => setAlert({ ...alert, visible: false })}
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
}

export default LogIn;
