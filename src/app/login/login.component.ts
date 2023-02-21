import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, public fireService: FirebaseService, private router: Router){

  }

 /*  formUser = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required,Validators.email])
  }) */

  formUser = this.fb.group({
    'name': ['', Validators.required],
    'email': ['',[Validators.required, Validators.email]]
  })

  get name(){
    return this.formUser.get('name') as FormControl
  }
  get email(){
    return this.formUser.get('email') as FormControl
  }

  procesar(){
    console.log(this.formUser.value)
  }

  goRegistro(){
    this.router.navigate(['/register']);
  }
}
