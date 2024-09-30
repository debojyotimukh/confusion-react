import { useFormik } from "formik";
import {
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  FormGroup,
} from "reactstrap";

export const LoginButton = ({ onClick }) => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Button outline onClick={onClick}>
          <span className="fa fa-sign-in fa-lg"> Login</span>
        </Button>
      </NavItem>
    </Nav>
  );
};

export const LoginModal = ({ isOpen, toggler }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggler}>
      <ModalHeader toggle={toggler}>Login</ModalHeader>
      <ModalBody>
        <div>
          <LoginForm afterSubmit={toggler} />
        </div>
      </ModalBody>
    </Modal>
  );
};

const LoginForm = ({ afterSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: true,
    },
    onSubmit: (values) => {
      console.log("Logged in: " + values.username);
      afterSubmit();
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          required={true}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required={true}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="remember"
            defaultChecked={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.remember}
          />
          Remember me
        </Label>
      </FormGroup>
      <Button type="submit" value="submit" color="primary">
        Login
      </Button>
    </Form>
  );
};
