import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/shared/master-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SharedModel } from 'src/app/models/shared-model';
import { CreateStatus } from 'src/app/models/enums/CreateStatus';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:User[] = [];
  setup:any = FormGroup;
  returnModel: SharedModel = new SharedModel;
  forma=FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private commServ:MasterService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setup = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      cnf_password:['',Validators.required]
    });
   
  }
  SignUpForm(data:any){


    this.toastr.warning("Please wait for registration");

     
      
      //console.log(ema);

           
      let firstname = this.setup.value.firstname;
      let lastname = this.setup.value.lastname;
      let username = this.setup.value.username;
      let password = this.setup.value.password;



         var send = new User(firstname,lastname,username,false);
         console.log(send);

        //  this.returnModel = this.commServ.SetUpUser(send);
          this.commServ.SetUpUser(send).subscribe((ret:any)=>{
            this.returnModel = ret;  
            
            console.log(this.returnModel);

           

          if(this.returnModel.Status === CreateStatus.success)
          {
            localStorage.setItem('user_id',String(this.returnModel.RecordPk));
       
            this.toastr.success('Registration successful');
            localStorage.setItem("isLoggedIn","true");
            this.router.navigate(['auth/home']);
          }
         if(this.returnModel.Status === CreateStatus.validation)
          {
            this.returnModel.errors.forEach(element => {
            this.toastr.warning(element);
            });
             localStorage.clear();
  
            
          }
          if(this.returnModel.Status === CreateStatus.failed)         
          {
            this.returnModel.errors.forEach(element => {
              this.toastr.error(element); 
            });
            localStorage.clear();
          }

        });
         
  }
  goToLogin(){
    this.router.navigate(['login'])
  }
}
