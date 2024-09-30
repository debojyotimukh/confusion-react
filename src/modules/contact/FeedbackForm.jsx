import { useFormik } from "formik";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import * as Yup from "yup";
import { postFeedback } from "../../services";
import { useState } from "react";

const FeedbackForm = () => {
  const [submitResponse, setSubmitResponse] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: true,
      contactType: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "Must be greater than 2 characters")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .min(3, "Must be greater than 2 characters")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      telnum: Yup.number()
        .min(100, "Must be greater than 2 numbers")
        .max(99999999999, "Must be 15 numbers or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      postFeedback(
        values,
        () => {
          console.log("Feedback submitted");
          setSubmitResponse(null);
          resetForm();
        },
        (msg) => {
          console.log("Feedback submit failed: " + msg);
          setSubmitResponse("Failed to submit, try again");
          setSubmitting(false);
        }
      );
    },
  });

  return (
    <Form model="feedback" onSubmit={formik.handleSubmit}>
      <TextInput formik={formik} formModel={"firstname"} label={"First Name"} />
      <TextInput formik={formik} formModel={"lastname"} label={"Last Name"} />
      <TextInput formik={formik} formModel={"telnum"} label={"Contact Tel."} />
      <TextInput formik={formik} formModel={"email"} label={"Email"} />
      <FormGroup row>
        <Col md={{ size: 6, offset: 2 }}>
          <FormGroup check>
            <Label check>
              {" "}
              <strong>May we contact you?</strong>
              <Input
                type="checkbox"
                name="agree"
                className="form-check-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.agree}
              />
            </Label>
          </FormGroup>
        </Col>
        <Col md={{ size: 3, offset: 1 }}>
          <Input
            type="select"
            name="contactType"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactType}
          >
            <option>Tel.</option>
            <option>Email</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="message" md={2}>
          Your Feedback
        </Label>
        <Col md={10}>
          <Input
            type="textarea"
            id="message"
            name="message"
            rows="12"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          ></Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md={{ size: 10, offset: 2 }}>
          <Button type="submit" color="primary" disabled={formik.isSubmitting}>
            Send Feedback
          </Button>
          {submitResponse ? (
            <div className="text-danger">{submitResponse}</div>
          ) : null}
        </Col>
      </FormGroup>
    </Form>
  );
};

export default FeedbackForm;

const TextInput = ({ formik, formModel, label }) => {
  return (
    <FormGroup row>
      <Label htmlFor={formModel} md={2}>
        {label}
      </Label>
      <Col md={10}>
        <Input
          type="text"
          id={formModel}
          name={formModel}
          placeholder={label}
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[formModel]}
        />
        {formik.touched[formModel] && formik.errors[formModel] ? (
          <div className="text-danger">{formik.errors[formModel]}</div>
        ) : null}
      </Col>
    </FormGroup>
  );
};
