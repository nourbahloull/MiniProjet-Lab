import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EVT } from 'src/Modeles/Evt';
import { EvtService } from 'src/Service/evt.service';

@Component({
  selector: 'app-visibility-evt',
  templateUrl: './visibility-evt.component.html',
  styleUrls: ['./visibility-evt.component.css']
})
export class VisibilityEvtComponent {
  EventAffiche!:EVT
  constructor(public dialogRef:MatDialogRef<VisibilityEvtComponent>,@Inject(MAT_DIALOG_DATA)data:any,private ES:EvtService){
    console.log('idd',data)
    this.ES.getEvtById(data).subscribe((EvtRecap)=>{
      this.EventAffiche=EvtRecap
    })
  }

}
