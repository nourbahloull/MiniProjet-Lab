import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EvtService } from '../../Service/evt.service';
import { EVT } from 'src/Modeles/Evt';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { VisibilityEvtComponent } from '../visibility-evt/visibility-evt.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['0', '1', '2', '3', '4','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EvtService,private dialog : MatDialog) {}

  ngOnInit() {
    this.fetchdata();
  }

  ngAfterViewInit() {
    // No need to set paginator and sort here anymore
  }

  fetchdata(): void {
    this.ES.getAllEvents().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      // Set paginator and sort after dataSource is initialized
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(): void {
    // Open the modal (ModalEvtComponent)
    let dialogRef = this.dialog.open(ModalEvtComponent);
    //recuperer les donnes de la boite //subscriber jusqu'a fermeture de la boite 
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.ES.ADDEvent(data).subscribe(()=>{
          this.fetchdata()

        })
      }
    })
  }

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
                this.ES.deleteEvtById(id).subscribe(()=>{
                  //eli jek f observable : void
                  //actualisr la page : appeler la fonction getAllMember
                  this.fetchdata()
                  
                })
        }
      });
    }
    edit(id:string){
      const dialogConfig = new MatDialogConfig();

      //recupere evt by id 
      this.ES.getEvtById(id).subscribe((Evtrecupere)=>{
        dialogConfig.data = Evtrecupere
        let dialogRef = this.dialog.open(ModalEvtComponent,dialogConfig);
        dialogRef.afterClosed().subscribe((x)=>{
          if(x){
            this.ES.updateEvt(id,x).subscribe(()=>{
              this.fetchdata()
            })
          }
        })

      })
      //envoyer evt vers la boite 
      //ouvrir la boite 
    }
    visibility(id:string):void
    {
      const dialogConfig = new MatDialogConfig();//variable ou en envoie data :MatDialogConfig
        dialogConfig.data = id;
        let dialogRef=this.dialog.open(VisibilityEvtComponent,dialogConfig)//mahiech bech teathly donc sans afterclose...
        
    }
}