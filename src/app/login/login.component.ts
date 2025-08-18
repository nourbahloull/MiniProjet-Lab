import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthServiceService } from 'src/Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private Auth: AuthServiceService,
    private router: Router 
  ) {}
  
  email: string = '';
  password: string = '';
  
  onSubmit() {
    console.log(this.email, this.password);
    

    this.Auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      console.log("connexion avec succes");
      this.router.navigate(['/members']); 
    });
  }
}