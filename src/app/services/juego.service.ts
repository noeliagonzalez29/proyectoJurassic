import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient) { }

  //obtener parque
  getParque(): Observable<any>{
    return this.http.get('http://localHost:3000/parks');
  }

  getDinos():Observable<any>{
    return this.http.get('http://localhost:3000/dinosaurs');
  }

  getRecintos(): Observable<any>{
    return this.http.get('http://localhost:3000/enclosures');

  }
  getEmergencia():Observable<any>{
    return this.http.get('http://localhost:3000/emergencies');
  }
}
