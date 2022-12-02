import React, { FC, useRef, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import * as yup from "yup";
import { Formik } from "formik";
import RegisterDTO from "../../interfaces/RegisterDTO";
import { Button } from "primereact/button";
import axios from "axios";
import RequestResponse from "../../interfaces/RequestResponse";
import { ENDPOINTS, FIELDS } from "../../config";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";
import { Toast } from "primereact/toast";

const Register: FC = () => {
  // TODO - Add better error handling
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<boolean>(false);

  const requiredMessage: string = "This field is required";
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS.username.min,
        `Your username must have minimum ${FIELDS.username.min} chars.`
      )
      .max(
        FIELDS.username.max,
        `Your username must have maximum ${FIELDS.username.max} chars.`
      )
      .matches(
        new RegExp(FIELDS.username.regex),
        "You have to use only letters and numbers, additionaly (.-_)"
      ),
    password: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS.password.min,
        `Your password must have minimum ${FIELDS.password.min} chars.`
      )
      .max(
        FIELDS.password.max,
        `Your password must have maximum ${FIELDS.password.max} chars.`
      )
      .matches(
        new RegExp(FIELDS.password.regex),
        `Your password must contain at least ${FIELDS.password.min} characters, at least one uppercase with lowercase letter and one number`
      ),
    password_confirm: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS.password.min,
        "Your confirm password isn't the same as your password."
      )
      .max(
        FIELDS.password.max,
        "Your confirm password isn't the same as your password."
      )
      .oneOf([yup.ref("password")], "Passwords are different."),
    email: yup
      .string()
      .email("This is not an e-mail.")
      .required(requiredMessage)
      .min(FIELDS.email.min, "Is this an e-mail?")
      .max(FIELDS.email.max, "Your e-mail is too long.")
      .email("Your e-mail is incorrect."),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const formSubmit = async (values: RegisterDTO): Promise<void> => {
    setIsLoading(true);

    values = {
      username: values.username,
      email: values.email,
      password: CryptoJS.SHA256(values.password).toString(),
    };

    // * Request to server.
    setRequestError(false);
    try {
      const { data } = await axios.post<RequestResponse>(
        ENDPOINTS.POST.REGISTER,
        values
      );

      switch (data.status) {
        case "success":
          navigate("/");
          break;
        case "error":
          toastRef.current?.show({
            severity: "error",
            summary: "Error occurred",
            detail: "Something went wrong...",
          });
          break;
        default:
          break;
      }
    } catch (e) {
      setRequestError(true);
    } finally {
      if (requestError) {
        toastRef.current?.show({
          severity: "error",
          summary: "Error occurred",
          detail: "Something went wrong...",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <section className="flex align-items-center justify-content-center w-full h-full">
      <div className="box flex flex-column gap-5 align-items-center justify-content-center w-auto h-auto p-3">
        <header className="text-2xl">Create an account</header>

        <Formik
          validationSchema={schema}
          onSubmit={(data: RegisterDTO) => formSubmit(data)}
          initialValues={initialValues}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              className="inputs flex flex-column gap-3 align-items-center justify-content-start"
            >
              <TextInput label="Username" id="username" name="username" />

              <TextInput label="E-mail" id="email" name="email" />

              <TextInput
                label="Password"
                id="password"
                name="password"
                isPassword
              />

              <TextInput
                label="Confirm password"
                id="password_confirm"
                name="password_confirm"
                isPassword
              />

              <Button
                label="Register"
                aria-label="Register"
                loading={isLoading}
              />
            </form>
          )}
        </Formik>
      </div>
      <Toast ref={toastRef} />
    </section>
  );
};

export default Register;
