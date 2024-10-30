import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string= '';
  password: string= '';
  loginError: string= '';

  constructor(private UserService: UserService, private router: Router){}
  onSubmit() {
    this.UserService.loginUser(this.email, this.password, (success, user) => {
      if (success) {
        this.router.navigate(['/dashboard']);      // Redirige al dashboard
      } else {
        this.loginError = 'Email o contraseña incorrectos.';
        console.error('Error en el proceso de login: Token no recibido o credenciales incorrectas');
      }
    });
  }
  registro(){
    this.router.navigate(['/register'])
  }
}
