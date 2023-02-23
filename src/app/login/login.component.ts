import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, public fireService: FirebaseService, private router: Router) {

  }

  formUser = this.fb.group({
    'contra': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]]
  })

  get contra() {
    return this.formUser.get('contra') as FormControl
  }
  get email() {
    return this.formUser.get('email') as FormControl
  }

  procesar() {
    console.log(this.formUser.value)
  }

  goRegistro() {
    this.router.navigate(['/register']);
  }

  isPasswordVisible = false;

  togglePasswordVisibility() {
    if (this.isPasswordVisible) {
      this.contra.setValidators([Validators.required]);
      this.contra.updateValueAndValidity();
    } else {
      this.contra.setValidators([]);
      this.contra.updateValueAndValidity();
    }
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
