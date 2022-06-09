import React, { FC, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(4).max(20).required(),
});

const Login: FC = () => {
  const initState = {
    email: "",
    password: "",
  };
  const [initialValues, setInitialValues] = useState(initState);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (values) => {
    console.log("Values:::", values);
  };

  const onError: SubmitErrorHandler<IFormInputs> = (error) => {
    console.log("ERROR:::", error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
