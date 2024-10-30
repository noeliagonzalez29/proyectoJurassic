import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private TOKEN= 'token';
  constructor() { }
  // Método para guardar el token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  // Método para eliminar el token
  clearToken(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
