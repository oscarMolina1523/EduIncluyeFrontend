import CategoryModel from "../models/CategoryModel";
import HTTPService from "./http-service";

export default class CategoryService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "category";
  }

  async getAll() {
    const data = await super.get(this.path);
    return data.map((item: any) => CategoryModel.fromJson(item));
  }

  async getById(id: string) {
    const item = await super.get(`${this.path}/${id}`);
    if (!item) return null;

    return CategoryModel.fromJson(item);
  }

  async addCategory(category: CategoryModel) {
    //el body que se va mandar se construye
    const body = CategoryModel.fromJsonModel(category).toJsonDTO();
    //devuelte null o la categoria creada
    const result = await super.post("category", body);
    if (!result) return null;
    //retorna la categoria creada es decir el resultado
    return CategoryModel.fromJson(result);
  }

  async updateCategory(id: string, category: CategoryModel) {
    const body = CategoryModel.fromJsonModel(category).toJsonDTO();
    const json = await super.put(`category/${id}`, body);
    if (!json) return null;

    return CategoryModel.fromJson(json);
  }

  async deleteCategory(id: string) {
    await super.delete(`category/${id}`);
  }
}
