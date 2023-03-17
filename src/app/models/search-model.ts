import { faL } from "@fortawesome/free-solid-svg-icons";
import { ICategory } from "./navbar";


export interface SearchModel 
{
     categoryFk:number;
     departmentFk:number;
     userId:number;
     departmentCount:number;
     categoryCount:number;
     categoryList:ICategory[];

  
}

export class SearchModelClass implements SearchModel
{
     categoryList: ICategory[] = [];
     categoryFk: number = 0;
     departmentFk:number = 0;
     departmentCount:number = 0;
     categoryCount:number = 0;
     search:string = '';
  
    constructor (public userId:number)
    {  }
   


}