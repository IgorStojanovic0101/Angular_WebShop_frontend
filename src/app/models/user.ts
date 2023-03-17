

export interface IUser {
    UserPk : number;
     FirstName :string;
    LastName : string;
    isAdmin:boolean;
    Username:string;
   // Password :string;
 //   CnfPassword :string;

    
 
}
export class User implements IUser
{
  
    constructor (public FirstName :string,public  LastName : string,public Username:string, public isAdmin:boolean)
    {
        
    }
    Password : string ='';
    CnfPassword:string='';
    UserPk: number = 0;
}