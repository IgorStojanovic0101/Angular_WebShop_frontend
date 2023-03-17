import { ICategory, IDepartment } from "./navbar";
import { IProduct } from "./product";

export interface IHome
{
    departmentList: IDepartment [];
    categoryList: ICategory[];
    categoryDepartmentFk:number;
    productsRow1_predictions1 : IProduct[];
    productsRow1_predictions2 : IProduct[];
    productsRow2_predictions: IProduct[];

}

