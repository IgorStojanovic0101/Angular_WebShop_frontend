import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/shared/master-service.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  constructor(private service:MasterService) { 
  }

  UserList:any=[];  
  myTitle:string | undefined;



  ngOnInit(): void {
 
   this.myTitle = "Users";
    this.refreshUserList();  

  }
  refreshUserList()
  {
    this.service.getUserList().subscribe(data =>{
      console.log(data);
      this.UserList = data;
    })
  }
  addClick()
  {
    var val = {FirstName:"Igor"};
   //this.service.findUser(val).subscribe(data =>{
    //console.log(data);
   // data.forEach(element => {
     // alert(element.FirstName.toString());

   // });
  // })
  }
}