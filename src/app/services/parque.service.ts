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

  actualizarParque(parque: any): Observable<any>{


    /* hay que pasar el parque entero en vez de enviar las cosas a data
    {
      "userId": "79ac2d61-48e3-406c-9b7a-2f50638fc995",
     "dinosaurIds": [],
     "recintosIds": [],
     "coins": 0
  }
    */
  const token = localStorage.getItem('token');
  const headers = {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${token}`,
    })
  };
  
  // Enviamos el parque completo en el body
  return this.http.put('http://localhost:3000/park/update', parque, headers);
}
  }

