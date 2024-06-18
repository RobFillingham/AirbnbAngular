import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FirebaseStuffService } from '../../services/firebaseService/firebase-stuff.service';
@Component({
  selector: 'app-stantard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './stantard.component.html',
  styleUrl: './stantard.component.css'
})
export class StantardComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, ]),
    password: new FormControl('', [Validators.required])
  });
  
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor( private firebaseStuff : FirebaseStuffService, private router : Router) { }

  wrong : boolean = false;
  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const {email, password} = this.loginForm.value;
    if (email && password) {
      this.firebaseStuff.login(email, password).subscribe(
        () => {
          this.router.navigate(['home']);
          console.log('logged in');
          this.wrong=false;
        },
        (error) => {
          this.wrong=true;
          console.log(error);
        }
      );
    }
  }

}
