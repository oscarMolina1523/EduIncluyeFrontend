export default class PodcastModel {
  id: string;
  name: string;
  description: string;
  video: string;
  audio: string;
  isActive: boolean;
  constructor(
    id: string,
    name: string,
    description: string,
    video: string,
    audio: string,
    isActive: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.video = video;
    this.audio = audio;
    this.isActive = isActive;
  }

  static fromJson(json: any): PodcastModel {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const video = String(json["video"] || "");
    const audio = String(json["audio"] || "");
    const isActive =
      json["isActive"] !== undefined ? Boolean(json["isActive"]) : true;

    return new PodcastModel(id, name, description, video, audio, isActive);
  }
}
