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
}
