import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent  {


  //forcage de type => boite de dialogue 
  constructor(public dialogRef:MatDialogRef <ModalEvtComponent>,@Inject(MAT_DIALOG_DATA) data:any) {
    if(data){
      console.log('data recu ',data)
      this.form= new FormGroup({
        titre : new FormControl(data.titre),
        DateDebut: new FormControl(data.DateDebut),
        DateFin : new FormControl(data.DateFin),
        lieu : new FormControl(data.lieu)})
    }else{
      this.form= new FormGroup({
        titre : new FormControl(null),
        DateDebut: new FormControl(null),
        DateFin : new FormControl(null),
        lieu : new FormControl(null)
       
      })
    }
  }
  //declaration de form 
   form !: FormGroup;
  // ngOnInit(){
  //   this.form= new FormGroup({
  //     titre : new FormControl(null),
  //     DateDebut: new FormControl(null),
  //     DateFin : new FormControl(null),
  //     lieu : new FormControl(null)
     
  //   })
  // }
  
  //save et close 
  save() {
    this.dialogRef.close(this.form.value);//la boite envoie au eventcomponent form.value boite observable eventcomponent:subscriber de la boite 
}

close() {
    this.dialogRef.close();
}

}
