import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) {

   }

  // fonction qui envoie une requete en mode Get
  GetAllMember() : Observable<Member[]> 
  {
    return this.http.get<Member[]>('http://localhost:3001/members')
  }

  addMember(member : Member): Observable<void>
  {
    return this.http.post<void>('http://localhost:3001/members', member)
  }

  deleteMemberById(id : string): Observable<void>
  {
     return this.http.delete<void>(`http://localhost:3001/members/${id}`)
  }

  editMember(id : string , member : Member): Observable<void>
  {
     return this.http.put<void>(`http://localhost:3001/members/${id}`, member)
  }

  getMemberById(id : string): Observable<Member> 
  {
    return this.http.get<Member>(`http://localhost:3001/members/${id}` )
  }
}
