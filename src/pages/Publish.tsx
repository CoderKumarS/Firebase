import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useFirebase } from "../module/firebase";
import Alert from "../components/Alert";
import Button from "../components/Button";

function Publish() {
  const firebase = useFirebase();
  const [book, setBook] = useState({
    name: "",
    isbNumber: "",
    price: "",
    coverPic: "",
  });
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    color: "",
  });
  let target, value;
  const handleElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    target = e.target.id;
    value = e.target.value;
    setBook({ ...book, [target]: value });
  };
  if (alert.visible) {
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 5000);
  }
  const handleSubmit = async () => {
    if (!book.isbNumber || !book.price || !book.name || !book.coverPic) {
      setAlert({
        ...alert,
        visible: true,
        message: "All fields are required",
        color: "danger",
      });
      return;
    }
    try {
      const element = await firebase.putDataFirestore(
        book.name,
        book.isbNumber,
        book.price,
        book.coverPic
      );
      setAlert({
        ...alert,
        visible: true,
        message: element.book.name + " added successfully",
        color: "success",
      });
      setBook({ name: "", isbNumber: "", price: "", coverPic: "" });
    } catch (error: any) {
      setAlert({
        ...alert,
        visible: true,
        message: error.message,
        color: "danger",
      });
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
        Publish
      </h1>
      <Form className="m-3 p-2 border border-primary rounded bg-info bg-opacity-10 container-sm">
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the book name"
            value={book.name}
            onChange={handleElement}
            required
          />
        </Form.Group>

        <Form.Group controlId="isbNumber">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN number"
            value={book.isbNumber}
            onChange={handleElement}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={book.price}
            onChange={handleElement}
            required
          />
        </Form.Group>
        <Form.Group controlId="coverPic">
          <Form.Label>Cover Picture</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter cover picture"
            value={book.coverPic}
            onChange={handleElement}
            required
          />
        </Form.Group>

        <div className="my-2 text-center">
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Publish;
