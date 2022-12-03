import "./LoggedUser";

export default interface RequestResponse {
  status: "success" | "error";
  data?: any;
  token?: string;
}
