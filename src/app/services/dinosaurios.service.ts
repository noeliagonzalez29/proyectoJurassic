import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DinosauriosService {

  constructor(private http: HttpClient) { }
   //obtener dino

   getDinos():Observable<any>{
    return this.http.get('http://localhost:3000/dinosaurs');
  }
}
