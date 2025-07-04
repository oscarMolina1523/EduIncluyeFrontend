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
  //con los nombre de campos que trae de backend

  static fromJson(json: any): CategoryModel {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const image = String(json["image"] || "");
    const isActive =
      json["isActive"] !== undefined ? Boolean(json["isActive"]) : true;

    return new CategoryModel(id, name, description, video, image, isActive);
  }

  //con los nombres de campos definidos aca en el frontend
  static fromJsonModel(json: any) {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const image = String(json["image"] || "");
    const isActive =
      json["isActive"] !== undefined ? Boolean(json["isActive"]) : true;

    return new CategoryModel(id, name, description, video, image, isActive);
  }

  //primero campos que va recibir en el backend y los campos nombrados aca en el frontend
  toJsonDTO(){
    return{
      id: this.id,
      name:this.name,
      description: this.description,
      video: this.video,
      image:this.image,
      isActive: this.isActive,
    }
  }
}
