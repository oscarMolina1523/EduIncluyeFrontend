import { baseUrl } from "../utils/BaseUrl";

export default class HTTPService {
  baseUrl = "";
  token = "";

  constructor() {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("authToken") || "";
  }
}
