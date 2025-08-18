import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pub } from 'src/Modeles/Pub';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(private http:HttpClient) { }

   getAllArticles() : Observable<Pub[]> 
      {
        return this.http.get<Pub[]>('http://localhost:3001/Pub')
    }
  add(pub:Pub):Observable<void>
  {
    return this.http.post<void>('http://localhost:3001/Pub',pub)
  }
  getPubByID(id : string): Observable<Pub> 
    {
      return this.http.get<Pub>(`http://localhost:3001/members/${id}` )
    }
    update(id: string, pub: any): Observable<any> {
      return this.http.put<any>(`http://localhost:3001/Pub/articles/${id}`, pub);
    }
}