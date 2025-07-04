export default class CategoryModel {
  id: string;
  name: string;
  description: string;
  video: string;
  image: string;
  isActive: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    video: string,
    image: string,
    isActive: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.video = video;
    this.image = image;
    this.isActive = isActive;
  }

// Se llama directamente desde la clase sin crear un objeto primero.
// Sirve para crear instancias de la clase a partir de otros datos, como un JSON de la base de datos o la API.

  static fromJson(json: any): CategoryModel {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const image = String(json["image"] || "");
    const isActive = json["isActive"] !== undefined ? Boolean(json["isActive"]) : true;

    return new CategoryModel(id, name, description, video, image, isActive);
  }
}
