import { set } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { io, Socket } from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    color: "",
  });
  if (alert.visible) {
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 5000);
  }
  const socket: Socket = io("http://localhost:3000");

  const sendMessage = () => {
    if (message == "") {
      setAlert({
        ...alert,
        visible: true,
        message: "Enter the message",
        color: "danger",
      });
      return;
    }
    socket.emit("send_message", { message });
  };
  useEffect(() => {
    socket.on("reci_message", (data) => {
      setReceivedMessage(data.message);
      setMessage("");
    });
  }, [socket]);
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
        Chat
      </h1>
      <Form className="m-3 p-2 border border-primary rounded bg-info bg-opacity-10 container-sm">
        <Form.Group controlId="name">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <div className="my-2 text-center">
          <Button color="primary" onClick={sendMessage}>
            Send Message
          </Button>
        </div>
      </Form>
      <div className="m-3 p-2 border border-primary rounded bg-info bg-opacity-10 container-sm text-center">
        {receivedMessage}
      </div>
    </div>
  );
};

export default Chat;
