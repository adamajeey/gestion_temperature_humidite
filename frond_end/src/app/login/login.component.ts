import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
/* import { Person } from './Person'; */


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router) {
    
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email]],
      
      password:['',[Validators.required,Validators.minLength(4)]],
      
      })
  }

  
onSubmit(){
this.submitted = true
this.spin = true

 if(this.registerForm.invalid){
  this.spin = false
  return ;
} 

 /* /insertion sur la base de données/ */
  const user ={
 
   email : this.registerForm.value. email,
   password: this.registerForm.value. password,
  
  }

  // console.log(user)
  
  this.userService.getConnexion(user).subscribe(
    data=>{
      console.log(data)
      if (data.data?.roles.replace(/['"]+/g, '') == "Admin" || data.data?.roles.replace(/['"]+/g, '') == "admin") {
          this.route.navigateByUrl('acceuil')
          this.spin = true
      } else {
        this.route.navigateByUrl('acceuil')
        this.spin = true
      }
    }, 
    error=>{
     /*  console.log(error) */
     console.log(error)
      if(error == 'Bad Request'){
      this.errorSms ='vous etes pas dans la base de données'
      this.spin = false
      setTimeout(()=>{ this.errorSms = false}, 3000); 
    }
    }
   );



}

}

