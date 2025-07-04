import TokenModel from "../models/TokenModel";
import HTTPService from "./http-service";

export default class AuthService extends HTTPService {
  async signIn(email:string, password:string) {
    const body = { email: email, password: password };
    const json = await this.post("auth/login", body);
    return TokenModel.fromJson(json);
  }

  async signUp(username:string,email:string, password:string) {
    if (!username || !password || !email) {
      throw new Error("Username, email and password are required");
    }

    const body = { name: username,email:email, password: password };
    await this.post("auth/register", body);
  }
}
