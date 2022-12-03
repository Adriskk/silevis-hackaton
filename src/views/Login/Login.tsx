import React, { FC, useRef, useState } from "react";
import { Formik } from "formik";
import TextInput from "../../components/TextInput/TextInput";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import * as yup from "yup";
import { APIS, ENDPOINTS } from "../../config";
import LoginDTO from "../../interfaces/LoginDTO";
import axios from "axios";
import RequestResponse from "../../interfaces/RequestResponse";
import { useNavigate } from "react-router";
import Cookie from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

const Login: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

  if (auth) navigate("/");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<boolean>(false);

  const requiredMessage: string = "This field is required";
  const schema = yup.object().shape({
    username: yup.string().required(requiredMessage),
    password: yup.string().required(requiredMessage),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const formSubmit = async (values: LoginDTO): Promise<void> => {
    setIsLoading(true);

    // * Request to server.
    setRequestError(false);
    try {
      const { data } = await axios.post<RequestResponse>(
        APIS.API_V1 + ENDPOINTS.POST.LOGIN,
        values
      );

      switch (data.status) {
        case "success":
          Cookie.set(
            "user",
            JSON.stringify({ ...data.data, token: data.token } || {})
          );
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
          summary: "Could not login to an account",
          detail: "Something went wrong, could not login to this account",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <section className="flex align-items-center justify-content-center w-full h-full">
      <div className="box flex flex-column gap-5 align-items-center justify-content-center w-auto h-auto p-3">
        <header className="text-2xl">Login to account</header>

        <Formik
          validationSchema={schema}
          onSubmit={(data: LoginDTO) => formSubmit(data)}
          initialValues={initialValues}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              className="inputs flex flex-column gap-3 align-items-center justify-content-start"
            >
              <TextInput label="Username" id="username" name="username" />

              <TextInput
                label="Password"
                id="password"
                name="password"
                isPassword
              />

              <Button
                label="Login"
                aria-label="Login"
                loading={isLoading}
                type="submit"
              />
              <span>
                Don't own an account? <a href="/register">here</a>
              </span>
            </form>
          )}
        </Formik>
      </div>
      <Toast ref={toastRef} />
    </section>
  );
};

export default Login;
