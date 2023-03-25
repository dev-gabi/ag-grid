import { Component, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rowData$!:Observable<any>;
  @ViewChild(AgGridAngular) agGrid!:AgGridAngular;
  selection: string ='';

  constructor(private http:HttpClient){}

    columnDefs: ColDef[] = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
        
    ];

    public defaultColDef: ColDef = {
      sortable: true,
      filter: true
    };


    ngOnInit(){
      this.rowData$ = this.http.get<any>('https://www.ag-grid.com/example-assets/row-data.json');
    }
   
      onCellClick(event :CellClickedEvent){
        console.log("clicked on row",event.data)
      }

      onHighight(make:string){
   
        this.onClearSelection();
        this.selection = make;
        this.agGrid.api.forEachNode(n=>{
          if(n.data.make == make){
           
             n.setSelected(true);
          }
        } );
      }

      onClearSelection(){
        this.selection='';
        this.agGrid.api.deselectAll();
      }
}
