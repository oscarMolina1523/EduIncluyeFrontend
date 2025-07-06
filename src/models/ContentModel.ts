export default class ContentModel {
  id: string;
  name: string;
  description: string;
  video: string;
  audio: string;
  isActive: boolean;
  idCategory: string;

  constructor(
    id: string,
    name: string,
    description: string,
    video: string,
    audio: string,
    isActive: boolean,
    idCategory: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.video = video;
    this.audio = audio;
    this.isActive = isActive;
    this.idCategory = idCategory;
  }

  static fromJson(json: any) {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const audio = String(json["audio"] || "");
    const isActive = Boolean(json["isActive"] ?? false);
    const idCategory = String(json["idCategory"] || "");

    return new ContentModel(
      id,
      name,
      description,
      video,
      audio,
      isActive,
      idCategory
    );
  }

  static fromJsonModel(json: any) {
    const id = String(json["id"]) || "";
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const audio = String(json["audio"] || "");
    const isActive = Boolean(json["isActive"]) || false;
    const idCategory = String(json["idCategory"] || "");

    return new ContentModel(
      id,
      name,
      description,
      video,
      audio,
      isActive,
      idCategory
    );
  }

  toJsonDTO() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      video: this.video,
      audio: this.audio,
      isActive: this.isActive,
      idCategory: this.idCategory,
    };
  }
}
