import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/shared/master-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';
import { IUser, User } from 'src/app/models/user';
import { KorpaService } from 'src/app/shared/korpa/korpa.service';
import { HomeService } from 'src/app/shared/home/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm:any =  FormGroup;

  constructor(private homeService: HomeService,private basketService:KorpaService, private userService:UserService,private fb:FormBuilder, private router:Router, private commServ:MasterService,private toastr: ToastrService) { }

  ngOnInit(): void {


  this.LoginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
         // email:['',Validators.compose([Validators.required,Validators.email])]

    });

    
   // this.commServ.getUserList().subscribe((data:any)=>{
    //  this.users = data;
   // });
  }


  goToRegister(){
    this.router.navigate(['register'])
  }    
  

     //Form Validables 
  submitted = false;
      //Add user form actions
      get f() { return this.LoginForm.controls; }



      onSubmit() {
        
        this.submitted = true;
        // stop here if form is invalid
        if (this.LoginForm.invalid) {
            return;
        }
        //True if all the fields are filled
        if(this.submitted)
        {
          //Napravi search model koji ce da saljes
          const send:IUser = {
            FirstName: '',
            UserPk: 0,
            LastName: '',
            Username: this.LoginForm.value.username,
            isAdmin:false
          };

       
          
          this.commServ.findUser(send).subscribe((result)=>
          {

       
        
          if(result.Username === this.LoginForm.value.username /*&& item.email === data.email*/){

            localStorage.setItem("isLoggedIn","true");
            //const user:IUser = { FirstName: item.FirstName,LastName:item.LastName,UserPk:item.UserPk,Email:item.Email};
          //  console.log(result);
            this.userService.setUser(result)



            localStorage.setItem('user_id',String(result.UserPk));
            
            if(result.isAdmin)
              this.router.navigate(['auth/admin']);
            else
              this.router.navigate(['auth/home']);
          }
          else{
            this.toastr.error('Hello world!', 'Toastr fun!');
            localStorage.clear();
          }
          
        


         });
          
        }
       

      }

}
   
    

