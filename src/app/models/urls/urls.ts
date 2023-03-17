export class ServiceUrls 
{
     public ApiUrl:string = "http://localhost:90/api";

    static User = class extends ServiceUrls {
       
        
        private pref:string = this.ApiUrl +"/User/";

        public GetUsers:string = this.pref + "GetUsers";
        public FindUsers:string = this.pref + "FindUsers";
        public SetUp:string = this.pref + "SetUp";
        public GetUserById:string = this.pref + "GetUserById";

    }
    static Product = class extends ServiceUrls {
       
        
        private pref:string = this.ApiUrl +"/Products/";
        public SearchProducts:string = this.pref + "SearchProducts";
        public GetGroupProducts:string = this.pref + "GetGroupProducts";
        public GetProducts:string = this.pref + "GetProducts";       
        public GetProductsByCategoryFk: string = this.pref + "GetProductsByCategoryFk";
        public GetProductsByDepartmentFk:string = this.pref + "GetProductsByDepartmentFk";
        public FilterProducts: string = this.pref + "FilterProducts";
        public SetProduct : string = this.pref + "SetProduct";
        public GetProductbyId:string = this.pref + "GetProductbyId";
        public GetProductbycode:string = this.pref + "GetProductbycode";
        public GetProductListByCategoryFk:string = this.pref + "GetProductListByCategoryFk";
    }

    static Basket = class extends ServiceUrls {
        private pref:string = this.ApiUrl +"/Basket/";

        public GetBacket:string = this.pref + "GetBacket";
        public GetBacketById:string = this.pref + "GetBacketById";

        public SetBacket:string = this.pref +  "SetBacket";
    }
    static OrderHistory = class extends ServiceUrls {
        private pref:string = this.ApiUrl +"/OrderHistory/";

        public GetHistory:string = this.pref + "GetHistory";
        public SetHistory:string = this.pref + "SetHistory";
        public FilterHistoryProducts:string = this.pref + "FilterHistoryProducts";

    }

    static Department = class extends ServiceUrls {
        private pref:string = this.ApiUrl +"/Department/";

        public GetNavBar:string = this.pref + "GetNavBar";
        public GetDepartments:string = this.pref + "GetDepartments";
        public GetCategories:string = this.pref + "GetCategories";
        public SetDepartment:string = this.pref + "SetDepartment";
        public SetCategory:string = this.pref + "SetCategory";
        public GetAllCategories:string = this.pref + "GetAllCategories";
    }

    static Home = class extends ServiceUrls {
        private pref:string = this.ApiUrl +"/Home/";

        public GetHome:string = this.pref + "GetHome";
        public SetDepartmentML:string = this.pref + "SetDepartmentML";
        public SetCategoryML:string = this.pref + "SetCategoryML";
        public GetDepartments:string = this.pref + "GetDepartments";
        public GetCategories:string = this.pref + "GetCategories";
        public GetRow1Products_1:string = this.pref + "GetRow1Products_1";
        public GetRow1Products_2:string = this.pref + "GetRow1Products_2";
        public GetRow2:string = this.pref + "GetRow2";
        public GetRow3:string = this.pref + "GetRow3";
        public GetProductsForTopCategory:string = this.pref + "GetProductsForTopCategory";
        public GetRow5:string = this.pref + "GetRow5";
        public GetRow6:string = this.pref + "GetRow6";


    }
}

