import { environment } from "src/environments/environment";

export class ServiceUrls 
{
    public static ApiUrl: string = environment.ApiUrl;

    public static get User() {
        const pref = `${ServiceUrls.ApiUrl}/User`;
        return {  
 
         GetUsers: `${pref}/GetUsers`,
         FindUsers: `${pref}/FindUsers`,
         SetUp: `${pref}/SetUp`,
         GetUserById: `${pref}/GetUserById`
        };
    }
    public static get Product() {

        const pref = `${ServiceUrls.ApiUrl}/Products`;
        return {    

        SearchProducts:`${pref}/SearchProducts`,
        GetGroupProducts:`${pref}/GetGroupProducts`,
        GetProducts:`${pref}/GetProducts`,       
        GetProductsByCategoryFk: `${pref}/GetProductsByCategoryFk`,
        GetProductsByDepartmentFk: `${pref}/GetProductsByDepartmentFk`,
        FilterProducts:  `${pref}/FilterProducts`,
        SetProduct :  `${pref}/SetProduct`,
        GetProductbyId: `${pref}/GetProductbyId`,
        GetProductbycode: `${pref}/GetProductbycode`,
        GetProductListByCategoryFk: `${pref}/GetProductListByCategoryFk`
        };
    }

    public static get Basket()  {
        const pref: string = `${ServiceUrls.ApiUrl}/Basket`;
        return {    
        GetBacket: `${pref}/GetBacket`,
        GetBacketById: `${pref}/GetBacketById`,
        SetBacket: `${pref}/SetBacket`
        }
      };
    
      public static get OrderHistory() {
        const pref: string = `${ServiceUrls.ApiUrl}/OrderHistory`;
    
        return {    
        GetHistory: `${pref}/GetHistory`,
        SetHistory: `${pref}/SetHistory`,
        FilterHistoryProducts:  `${pref}/FilterHistoryProducts`
        }
      };
    
      public static get Department()  {
        const pref: string = `${ServiceUrls.ApiUrl}/Department`;
        return {    
         GetNavBar:  `${pref}/GetNavBar`,
         GetDepartments:  `${pref}/GetDepartments`,
         GetCategories:  `${pref}/GetCategories`,
         SetDepartment:  `${pref}/SetDepartment`,
         SetCategory:  `${pref}/SetCategory`,
         GetAllCategories:  `${pref}/GetAllCategories`
        }
      };
    
      public static get Home() {
        const pref: string = `${ServiceUrls.ApiUrl}/Home`;
        return {    
         GetHome:  `${pref}/GetHome`,
         SetDepartmentML: `${pref}/SetDepartmentML`,
         SetCategoryML: `${pref}/SetCategoryML`,
         GetDepartments: `${pref}/GetDepartments`,
         GetCategories:  `${pref}/GetCategories`,
         GetRow1Products_1:  `${pref}/GetRow1Products_1`,
         GetRow1Products_2: `${pref}/GetRow1Products_2`,
         GetRow2:  `${pref}/GetRow2`,
         GetRow3:  `${pref}/GetRow3`,
         GetProductsForTopCategory:  `${pref}/GetProductsForTopCategory`,
         GetRow5:  `${pref}/GetRow5`,
         GetRow6:  `${pref}/GetRow6`
        }
      }
}

