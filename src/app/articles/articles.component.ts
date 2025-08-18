import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PubService } from 'src/Service/pub.service';
import { ModalPubComponent } from '../modal-pub/modal-pub.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Specify type for better type checking
  displayedColumns: string[] = ['id', 'titre', 'type', 'lieu', 'date', 'Sourcepdf'];
  
  constructor(private pubService: PubService, private dialog: MatDialog) {}
  
  ngOnInit() {
    this.fetchData();
  }
  
  fetchData(): void {
    this.pubService.getAllArticles().subscribe((articles) => {
      this.dataSource.data = articles;
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  open(): void {
    const dialogRef = this.dialog.open(ModalPubComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.pubService.add(res).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }
  
  onEdit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: id }; // Pass as object with id property
    
    const dialogRef = this.dialog.open(ModalPubComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.pubService.update(id,res).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }
}