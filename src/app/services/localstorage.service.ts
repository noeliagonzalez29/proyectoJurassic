import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private TOKEN= 'token';
  private COINS= 'coins';
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
  setCoins(coins: number): void {
    localStorage.setItem(this.COINS, coins.toString());
  }

  getCoins(): number {
    return parseInt(localStorage.getItem(this.COINS) || '0', 10);
  }

  clearCoins(): void {
    localStorage.removeItem(this.COINS);
  }
}
