import HTTPService from "./http-service";

export default class GraduatesService extends HTTPService {
  private path: string;
  constructor() {
    super();
    this.path = "graduates";
  }
}
