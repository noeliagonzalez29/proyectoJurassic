import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  registrationSuccess = false;
  errors: {[key: string]: string}={};

  constructor(private UserService: UserService, private fb: FormBuilder){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      const { email, password } = this.form.value;
      this.UserService.registerUser(email, password, (success) => {
        this.registrationSuccess = success;
        if (!success) {
          this.errors['register'] = 'Error en el registro. Intente de nuevo.';
        }
      });
    } else {
      this.errors['register'] = 'Revise los datos del formulario.';
    }
  }
}
