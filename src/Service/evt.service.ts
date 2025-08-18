import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EVT } from 'src/Modeles/Evt';

@Injectable({
  providedIn: 'root'
})
export class EvtService {

  constructor(private http:HttpClient) {
  
     }
  
    // fonction qui envoie une requete en mode Get
    getAllEvents() : Observable<EVT[]> 
    {
      return this.http.get<EVT[]>('http://localhost:3001/Evt')
    }
    ADDEvent(evt:EVT):Observable<void>
    {
      return this.http.post<void>('http://localhost:3001/Evt',evt)
    }

    
    deleteEvtById(id : string): Observable<void>
  {
     return this.http.delete<void>(`http://localhost:3001/Evt/${id}`)
  }



    getEvtById(id : string): Observable<EVT> 
      {
        return this.http.get<EVT>(`http://localhost:3000/Evt/${id}` )
      }
    updateEvt(id:string,x:EVT):Observable<void>{
      return this.http.put<void>(`http://localhost:3000/Evt/${id}`,x)
    }
    

}

