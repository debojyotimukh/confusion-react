import { useFormik } from "formik";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
} from "reactstrap";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
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

interface LoginModalProps {
  isOpen: boolean;
  toggler: () => void;
}

export const LoginModal = ({ isOpen, toggler }: LoginModalProps) => {
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

interface LoginFormProps {
  afterSubmit: () => void;
}

const LoginForm = ({ afterSubmit }: LoginFormProps) => {
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
            value={String(formik.values.remember)}
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
