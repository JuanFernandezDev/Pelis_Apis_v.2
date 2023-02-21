import { Component, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(public fireService: FirebaseService, private fb: FormBuilder, private router: Router) {}


 /*  formUser = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required,Validators.email])
  }) */

  formUser = this.fb.group({
    'contra': ['', Validators.required],
    'contraR': ['', Validators.required],
    'email': ['',[Validators.required, Validators.email]]
  })

  get contra(){
    return this.formUser.get('contra') as FormControl
  }
  get contraR(){
    return this.formUser.get('contraR') as FormControl
  }
  get email(){
    return this.formUser.get('email') as FormControl
  }

  passwordRegex = new RegExp("^(?=.*\\d{5,})(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{7,}$");


  // Función que comprueba si la contraseña cumple con la expresión regular
    validatePassword(password: string): boolean {
    return this.passwordRegex.test(password);
    
  }

  isEnable(){
    return this.contra.value == this.contraR.value && this.formUser.invalid && this.validatePassword(this.contra.value);
  }

  register(email: string, pass: string){
    this.fireService.newAccount(email, pass).then((user) => {
      console.log("User created")
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log("Error creating user: " + error)
    })
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

  isPasswordVisible2 = false;

  togglePasswordVisibility2() {
    if (this.isPasswordVisible2) {
      this.contraR.setValidators([Validators.required]);
      this.contraR.updateValueAndValidity();
    } else {
      this.contraR.setValidators([]);
      this.contraR.updateValueAndValidity();
    }
    this.isPasswordVisible2 = !this.isPasswordVisible2;
  }

  
}
