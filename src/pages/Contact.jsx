import React from "react";

//Modules
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";

//Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Contact() {
  //Joi Validation Schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    feedback: Joi.string().required(),
  });
  //React Hook Form
  const result = useForm({
    resolver: joiResolver(schema),
    defaultValues: {},
  });
  const errors = result.formState.errors;
  const control = result.control;
  const handleSubmit = result.handleSubmit;
  //Submit
  const onSubmit = (data) => {
    console.log(data);
    window.alert("Thanks for your feedback!");
  };

  return (
    <div className="main">
      {/* Page Header */}
      <div className="contact-form">
        <div className="pt-5">
          <h2 className="pt-5 text-center">Contact Us</h2>
        </div>
        <div>
          {/* Name */}
          <Form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
            <Form.Group>
              <Form.Label className="fs-5">NAME</Form.Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Name" />
                )}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </Form.Group>

            {/* Email */}
            <Form.Group>
              <Form.Label className="fs-5">EMAIL</Form.Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Email" type="email" />
                )}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </Form.Group>

            {/* Feedback */}
            <Form.Group>
              <Form.Label className="fs-5">FEEDBACK</Form.Label>
              <Controller
                name="feedback"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    placeholder="Feedback"
                    as="textarea"
                    rows={5}
                  />
                )}
              />
              <p className="text-danger">{errors.feedback?.message}</p>
            </Form.Group>

            {/* Submit */}
            <Button type="submit" className="mt-1 mb-3 w-100 send-button">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
