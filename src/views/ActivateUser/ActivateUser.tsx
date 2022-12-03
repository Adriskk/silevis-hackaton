import React, { FC, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router";
import { APIS, ENDPOINTS } from "../../config";
import axios from "axios";
import RequestResponse from "../../interfaces/RequestResponse";
import { Toast } from "primereact/toast";

const ActivateUser: FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

  const [activated, setActivated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    activateAccount()
      .then((data: RequestResponse) => {
        if (data?.status === "success") {
          setIsLoading(false);
          setActivated(true);
          toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Your account has been successfully activated",
          });
          navigate("/");
        }
      })
      .catch(({ res }) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Your account could not be activated",
        });

        setIsLoading(false);
      });
  }, []);

  const activateAccount = async (): Promise<RequestResponse> => {
    const { data } = await axios.post<RequestResponse>(
      APIS.API_V1 +
        ENDPOINTS.POST.ACTIVATE_ACCOUNT.replace(":token", token || "")
    );

    return data;
  };

  return (
    <section className="flex align-items-center justify-content-center gap-2">
      {isLoading && <Loader size="big" />}
      {!isLoading && activated && (
        <span>Account activation was successful - redirecting...</span>
      )}
      <Toast ref={toastRef} />
    </section>
  );
};

export default ActivateUser;
