import { useFormik } from "formik";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import { postComment } from "../../services";

const AddCommentForm = ({ updateComments, dishId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const [submitError, setSubmitError] = useState(null);

  const formik = useFormik({
    initialValues: {
      rating: 5,
      name: "",
      comment: "",
    },
    validationSchema: Yup.object({
      author: Yup.string()
        .min(3, "Must be greater than 2 characters")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      comment: Yup.string()
        .min(10, "At least 10 characters")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const comment = {
        ...values,
        dishId: dishId,
        date: new Date().toISOString(),
      };
      postComment(
        comment,
        () => {
          console.log("Comment added: " + JSON.stringify(comment));
          updateComments(comment);
          resetForm();
          toggleModal();
        },
        (msg) => {
          console.log("Feedback submit failed: " + msg);
          setSubmitError("Failed to submit, try again");
          setSubmitting(false);
        }
      );
    },
  });

  return (
    <>
      <Button outline onClick={toggleModal}>
        <span className="fa fa-pencil fa-lg"> Submit Comment</span>
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup row>
              <Label htmlFor="rating" md={2}>
                Rating
              </Label>
              <Col md={12}>
                <Input
                  type="select"
                  id="rating"
                  name="rating"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                >
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
                  <option value={"4"}>4</option>
                  <option value={"5"}>5</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="author" md={4}>
                Your Name
              </Label>
              <Col md={12}>
                <Input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.author}
                />
                {formik.touched.author && formik.errors.author ? (
                  <div className="text-danger">{formik.errors.author}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="comment" md={2}>
                Comment
              </Label>
              <Col md={12}>
                <Input
                  type="textarea"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                />
                {formik.touched.comment && formik.errors.comment ? (
                  <div className="text-danger">{formik.errors.comment}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10 }}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
                {submitError ? (
                  <div className="text-danger">{submitError}</div>
                ) : null}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddCommentForm;
