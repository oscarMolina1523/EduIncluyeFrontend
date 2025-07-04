import CategoryModel from "../models/CategoryModel";
import HTTPService from "./http-service";

export default class CategoryService extends HTTPService{
    private path:string;
    constructor(){
        super();
        this.path="category"
    }

    async getAll(){
        const data= await super.get(this.path);
        return data.map((item:any)=>CategoryModel.fromJson(item));
    }

}