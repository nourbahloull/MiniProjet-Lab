import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Service/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit{
form! : FormGroup;
//injection de dependance : creer une instane du service bch nejem nesta3mlo
constructor(private MS:MemberService , private router : Router , private activatedRoute : ActivatedRoute){

}

ngOnInit() {
  // 1) recuperer route actif et chercher id
 const idCourant = this.activatedRoute.snapshot.params['id']
 console.log(idCourant)
  //2) si id existe et a un valeur
  if(idCourant){
  //=> je suis dans edit
  console.log("je suis dans edit")
  this.MS.getMemberById(idCourant).subscribe((a)=>{
    this.form=new FormGroup({
      cin : new FormControl(a.cin),
      name : new FormControl(a.name),
      type : new FormControl(a.type),
      createdDate : new FormControl(a.createdDate),
    })
   
  })
  }
  //sinon create
  else{
    this.form=new FormGroup({
      cin : new FormControl(null , Validators.required ),
      name : new FormControl(null ),
      type : new FormControl(null ),
      createdDate : new FormControl(null ),
    })
  }
  
}

onsub(){
  console.log(this.form.value)
    // 1) recuperer route actif et chercher id
 const idCourant = this.activatedRoute.snapshot.params['id']

  //2) si id existe et a un valeur
  if(idCourant){
    this.MS.editMember(idCourant, this.form.value).subscribe(()=>{
    this.router.navigate([''])
    })

 }
  else {
    this.MS.addMember(this.form.value).subscribe(()=>{
      //eli jek f observable : void
      //route vers listes bch nara contenu actualisé
      this.router.navigate([''])
    })
  }
}
}
