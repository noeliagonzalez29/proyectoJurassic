import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginObservableSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private localStorageService: LocalstorageService) { }



   loginUser(email: string, password: string, onLogin: (success: boolean, user?: any)=>void){
     this.http.post('http://localhost:3000/auth/login',{"email": email,"password":password}).subscribe(
      (response: any)=>{
        if(response && response.token){
          this.localStorageService.setToken(response.token); //guardar el token
          this.loginObservableSubject.next(true);
          onLogin(true, response.user)
        }else{
          onLogin(false);
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        onLogin(false);
      }
      //console.log('Error en el login')

     )
   }
   registerUser(email: string, password: string, onRegister: (success: boolean)=>void){
     this.http.post('http://localhost:3000/auth/register', {"email": email,"password":password}).subscribe(()=>{
       onRegister(true)
     })
   }

   estaLogueado():boolean{
    return !!this.localStorageService.getToken();
   }
}
