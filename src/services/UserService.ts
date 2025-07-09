import UserModel from "../models/UserModel";
import HTTPService from "./http-service";

export default class UserService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "users";
  }

  async getAll() {
    const data = await super.get(this.path);
    return data.map((item: any) => UserModel.fromJson(item));
  }

  async getById(id: string) {
    const item = await super.get(`${this.path}/${id}`);
    if (!item) return null;

    return UserModel.fromJson(item);
  }

  async addUser(user: UserModel) {
    //el body que se va mandar se construye
    const body = UserModel.fromJsonModel(user).toJsonDTO();
    //devuelte null o la categoria creada
    const result = await super.post(`${this.path}`, body);
    if (!result) return null;
    //retorna la categoria creada es decir el resultado
    return UserModel.fromJson(result);
  }

  async updateUser(id: string, user: UserModel) {
    const body = UserModel.fromJsonModel(user).toJsonDTO();
    const json = await super.put(`${this.path}/${id}`, body);
    if (!json) return null;

    return UserModel.fromJson(json);
  }

  async deleteUser(id: string) {
    await super.delete(`${this.path}/${id}`);
  }
}
