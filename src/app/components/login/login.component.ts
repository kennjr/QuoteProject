import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name:string = "";
  email:string = "";
  password:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  loginAttempt(){
    
    let nameInput = this.name;
    let emailInput = this.email;
    let passwordInput = this.password;

    if(nameInput != "" && emailInput != "" && passwordInput != ""){

    }else if(nameInput == ""){
      console.log("We're in the login attempt")
      alert("The name field is empty");
    }
    else if(emailInput == ""){
      alert("The email field is empty");
    }
    else if(passwordInput == ""){
      alert("The password field is empty");
    }

  }

  clearForm(){
    this.name="";
    this.password="";
    this.email="";
  }

}
