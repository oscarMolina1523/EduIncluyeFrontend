export default class GraduatesModel {
  id: string;
  name: string;
  description: string;
  image: string;
  constructor(id: string, name: string, description: string, image: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }

  static fromJson(json: any) {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const image = String(json["image"] || "");

    return new GraduatesModel(
      id,
      name,
      description,
      image,
    );
  }

  static fromJsonModel(json: any) {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const image = String(json["image"] || "");

    return new GraduatesModel(
      id,
      name,
      description,
      image,
    );
  }
}
