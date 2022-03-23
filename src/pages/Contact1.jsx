import React from "react";
import { Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <div className="contact-page">
      <div className="content-container-sm">
        <Form className="form p-5" >
          <Form.Group className="mb-3 " controlId="name">
            <Form.Label className="text-center">NAME</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="feedback">
            <Form.Label>FEEDBACK</Form.Label>
            <Form.Control as="textarea" placeholder="Enter feedback" rows={3} />
          </Form.Group>

          <Button
            className="mt-4  w-100 btn-block"
            variant="danger"
            type="submit"
          >
            SEND
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
