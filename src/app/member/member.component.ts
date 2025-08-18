import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';
import { MemberService } from 'src/Service/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
// saisir le tableau
dataSource : Member[]=[]
//appeler le service : injection de dependance : le mecanisme qui permet d'injecter le service dans le composant  
//se lance automatiquement
constructor(private MS : MemberService , private router : Router , private dialog : MatDialog){

}
//se lance automatiquement rapidement loorsque on charge le composant
ngOnInit() {
    this.MS.GetAllMember().subscribe((a)=>{
      //permet d'actualiser : tsir chargement automatiquement
      this.dataSource= a
    })
}
displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'date', 'action'];

delete(id : string) : void
 {
  //pour ajouter boite : 
  //1.ouvrire la boite 
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
  });
  //2.if click de user = confirm =>
    //subscribe
    dialogRef.afterClosed().subscribe(result => {
      if(result){
              //faire le lien avec le service : controller
              this.MS.deleteMemberById(id).subscribe(()=>{
                //eli jek f observable : void
                //actualisr la page : appeler la fonction getAllMember
                this.MS.GetAllMember().subscribe((a)=>{
                  //permet d'actualiser : tsir chargement automatiquement
                  this.dataSource= a
                })
              })
      }
    });
  
      
  
}
}
