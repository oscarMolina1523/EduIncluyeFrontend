import ContentModel from "../models/ContentModel";
import HTTPService from "./http-service";

export default class ContentService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "content";
  }

  async getAll() {
    const data = await super.get(this.path);
    return data.map((item: any) => ContentModel.fromJson(item));
  }

  async getById(id: string) {
    const item = await super.get(`${this.path}/${id}`);
    if (!item) return null;

    return ContentModel.fromJson(item);
  }

  async addContent(content: ContentModel) {
    //el body que se va mandar se construye
    const body = ContentModel.fromJsonModel(content).toJsonDTO();
    //devuelte null o la categoria creada
    const result = await super.post(`${this.path}`, body);
    if (!result) return null;
    //retorna la categoria creada es decir el resultado
    return ContentModel.fromJson(result);
  }

  async updateContent(id: string, content: ContentModel) {
    const body = ContentModel.fromJsonModel(content).toJsonDTO();
    const json = await super.put(`${this.path}/${id}`, body);
    if (!json) return null;

    return ContentModel.fromJson(json);
  }

  async deleteCategory(id: string) {
    await super.delete(`${this.path}/${id}`);
  }

  async getByCategoryId(id: string, page: number = 1, pageSize: number = 10) {
    const body = { idCategoria: id, page, pageSize };
    const data = await super.post(
      `${this.path}/contents-by-category-paginated`,
      body
    );
    return data.map((item: any) => ContentModel.fromJson(item));
  }
}
