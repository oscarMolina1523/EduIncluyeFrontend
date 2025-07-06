import TokenModel from "../models/TokenModel";
import HTTPService from "./http-service";

export default class AuthService extends HTTPService {
  async signIn(email: string, password: string) {
    const body = { email: email, password: password };
    const json = await this.post("auth/login", body);
    console.log("Token plano recibido en AuthService.signIn:", json);
    return new TokenModel(json);
  }

  async signUp(username: string, newemail: string, newpassword: string) {
    if (!username || !newpassword || !newemail) {
      throw new Error("Username, email and password are required");
    }

    const body = { name: username, email: newemail, password: newpassword };
    const json = await this.post("auth/register", body);
    console.log("Token recibido en AuthService.signup:", json.token);
    return TokenModel.fromJson(json);
  }
}
