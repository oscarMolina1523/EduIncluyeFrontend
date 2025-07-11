export default class UserModel {
    id:string;
    name:string;
    email:string;
    image:string;
    isActive:boolean;
  constructor(id:string, name:string, email:string,image:string, isActive:boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image= image;
    this.isActive= isActive;
  }

  static fromJson(json:any) {
    const id = String(json['id']) || "";
    const name = String(json['name'] || '');
    const email = String(json['email'] || '');
    const image = String(json['image'] || '');
    const isActive = json['isActive'] !== undefined ? Boolean(json['isActive']) : false;
    return new UserModel(id, name, email,image, isActive);
  }

  static fromJsonModel(json: any) {
    const id = String(json['id']) || "";
    const name = String(json['name'] || '');
    const email = String(json['email'] || '');
    const image = String(json['image'] || '');
    const isActive = json['isActive'] !== undefined ? Boolean(json['isActive']) : false;
    return new UserModel(id, name, email,image, isActive);
  }

  toJsonDTO() {
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      image: this.image,
      isActive: this.isActive,
    };
  }
}