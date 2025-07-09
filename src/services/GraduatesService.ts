import GraduatesModel from "../models/GraduatesModel";
import HTTPService from "./http-service";

export default class GraduatesService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "graduates";
  }

  async getAll() {
    const data = await super.get(this.path);
    return data.map((item: any) => GraduatesModel.fromJson(item));
  }

  async getById(id: string) {
    const item = await super.get(`${this.path}/${id}`);
    if (!item) return null;

    return GraduatesModel.fromJson(item);
  }

  async addGraduates(graduates: GraduatesModel) {
    const body = GraduatesModel.fromJsonModel(graduates).toJsonDTO();
    const result = await super.post(`${this.path}`, body);
    if (!result) return null;
    return GraduatesModel.fromJson(result);
  }

  async updateGraduates(id: string, graduates: GraduatesModel) {
    const body = GraduatesModel.fromJsonModel(graduates).toJsonDTO();
    const json = await super.put(`${this.path}/${id}`, body);
    if (!json) return null;

    return GraduatesModel.fromJson(json);
  }

  async deleteGraduates(id: string) {
    await super.delete(`${this.path}/${id}`);
  }
}
