import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PubService } from 'src/Service/pub.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})
export class ModalPubComponent {
  form!: FormGroup;
  type!: string;
  
  foods: Food[] = [
    {value: 'conf-0', viewValue: 'conf'},
    {value: 'journal-1', viewValue: 'journal'},
    {value: 'workshop-2', viewValue: 'workshop'},
  ];

  constructor(private PS: PubService,private dialogRef: MatDialogRef<ModalPubComponent>,@Inject (MAT_DIALOG_DATA) data:any
  ) {
    if (data) {
      this.PS.getPubByID(data.id).subscribe((res) => {
        this.form = new FormGroup({
          titre: new FormControl(res.titre),
          lieu: new FormControl(res.lieu),
          Date: new FormControl(res.Date),
          Sourcepdf: new FormControl(res.Sourcepdf),
          type: new FormControl(res.type),
        });
      });
    } else {
      this.form = new FormGroup({
        titre: new FormControl(null),
        lieu: new FormControl(null),
        Date: new FormControl(null),
        Sourcepdf: new FormControl(null),
        type: new FormControl(null),
      });
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
    console.log("form value", this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}