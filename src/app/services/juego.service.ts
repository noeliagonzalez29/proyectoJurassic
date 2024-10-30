import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient) { }


  //obtener posibles emergencias
  getEmergencia():Observable<any>{
    return this.http.get('http://localhost:3000/emergencies');
  }
}
