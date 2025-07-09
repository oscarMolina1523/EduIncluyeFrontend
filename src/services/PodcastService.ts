import PodcastModel from "../models/PodcastModel";
import HTTPService from "./http-service";

export default class PodcastService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "podcast";
  }

  async getAll() {
    const data = await super.get(this.path);
    return data.map((item: any) => PodcastModel.fromJson(item));
  }

  async getById(id: string) {
    const item = await super.get(`${this.path}/${id}`);
    if (!item) return null;

    return PodcastModel.fromJson(item);
  }

  async addPodcast(podcast: PodcastModel) {
    const body = PodcastModel.fromJsonModel(podcast).toJsonDTO();
    const result = await super.post(`${this.path}`, body);
    if (!result) return null;
    return PodcastModel.fromJson(result);
  }

  async updatePodcast(id: string, podcast: PodcastModel) {
    const body = PodcastModel.fromJsonModel(podcast).toJsonDTO();
    const json = await super.put(`${this.path}/${id}`, body);
    if (!json) return null;

    return PodcastModel.fromJson(json);
  }

  async deletePodcast(id: string) {
    await super.delete(`${this.path}/${id}`);
  }
}
