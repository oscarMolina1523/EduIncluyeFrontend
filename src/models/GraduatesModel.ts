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

  
}
