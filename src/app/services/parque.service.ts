import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParqueService {


  constructor(private http: HttpClient) { }
  //obtener parque
  getParque(): Observable<any>{
    const token= localStorage.getItem('token');
    const headers= {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${token}`
      })
    };
    return this.http.get('http://localHost:3000/park/status', headers);
  }
}
