export interface ICategory
{
    RecordPk:number;
    CategoryName:string;
    DepartmentFk:number;
    slika : string;
    Score:number;


}

export interface IDepartment
{
    RecordPk:number;
    CategoryList:ICategory[];
    DepartmentName:string;
    slika : string;
    Score:number;

}

export interface INavBar
{
    userName:string;
    departments:IDepartment[];
}