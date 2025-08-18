import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/Service/auth-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private Auth:AuthServiceService, private router : Router){}
  logout():void{
    //envoie jwt
    this.Auth.signOut().then(()=>this.router.navigate(['/']))
  }

}
