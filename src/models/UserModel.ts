export default class UserModel {
    id:string;
    name:string;
    email:string;
    isActive:boolean;
  constructor(id:string, name:string, email:string, isActive:boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive= isActive;
  }

  static fromJson(json:any) {
    const id = String(json['id']) || "";
    const name = String(json['name'] || '');
    const email = String(json['email'] || '');
    const isActive = Boolean(json['isActive'] || false);
    return new UserModel(id, name, email, isActive);
  }
}