import { useFormik } from "formik";
import { useReducer } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { postFeedback } from "../../services";

const submitResponseReducer = (_, action) => {
  if (action.type === "success")
    return { message: "Thanks for feedback!", displayStyle: "text-success" };
  if (action.type === "error")
    return {
      message: "Failed to submit, try again",
      displayStyle: "text-danger",
    };
  throw Error("Unknown action.");
};

const FeedbackForm = () => {
  const [submitResponse, dispatchSubmitResponse] = useReducer(
    submitResponseReducer,
    { message: null, displayStyle: "" }
  );

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: true,
      contactType: "tel",
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
      telnum: Yup.number("Must be a number")
        .min(100, "Must be greater than 2 numbers")
        .max(99999999999, "Must be 15 numbers or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const feedback = {
        ...values,
        date: new Date().toISOString(),
      };
      postFeedback(
        feedback,
        () => {
          console.log("Feedback submitted: " + JSON.stringify(feedback));
          dispatchSubmitResponse({ type: "success" });
          resetForm();
        },
        (msg) => {
          console.log("Feedback submit failed: " + msg);
          dispatchSubmitResponse({ type: "error" });
          setSubmitting(false); // don't reset form, allow retry
        }
      );
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
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
                defaultChecked={true}
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
            <option value={"tel"}>Tel.</option>
            <option value={"email"}>Email</option>
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
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md={{ size: 10, offset: 2 }}>
          <Button type="submit" color="primary" disabled={formik.isSubmitting}>
            Send Feedback
          </Button>
          {submitResponse.message ? (
            <div className={submitResponse.displayStyle}>
              {submitResponse.message}
            </div>
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
