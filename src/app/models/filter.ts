import { FilterStatus } from "./enums/filterStatus";

export interface IFilter
{
    Ten_to_20: boolean;
    Twenty_to_30: boolean;

    radio:boolean;
    stars : number;
    categoryFk:number;
    departmentFk:number;
    search:boolean;
    search_input:string;
    status:FilterStatus;

}


export class Filter implements IFilter
{
  
    constructor (public Ten_to_20: boolean,public Twenty_to_30:boolean,
        public  radio: boolean,public  stars: number,public search:boolean,public search_input:string,
         public categoryFk: number, public departmentFk:number, public status:FilterStatus)
    {}
}