import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, updateEmail, updatePassword, signInWithPhoneNumber } from '@angular/fire/auth';
import "firebase/auth";
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { FirebaseStuffService } from '../services/firebaseService/firebase-stuff.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  constructor(private firebaseStuff : FirebaseStuffService, private router : Router){

  }

  smsResult : any;
  confirmation : boolean = false;
  user : any;
  auth = getAuth();
  reCaptchaVerifier !: RecaptchaVerifier;
  //bobby : User = {id: "", idAuth: "", email: "", password: "", phone: "", name: ""};
  
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[ Validators.required, Validators.email]),
    phone : new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
    otp : new FormControl('')
  }, {validators: passwordsMatchValidator()});

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get otp(){
    return this.signUpForm.get('otp');
  }

  submit(){

    if(!this.signUpForm.valid){
      console.log('Form is invalid');
      return;
    }

    console.log('Form is valid');
    const {name, email, password, phone} = this.signUpForm.value;
      
    if(name && email && password && phone){
      console.log("calling generate captcha");
      this.generateCaptcha(phone);
    }else
      console.error('One of the values in the form was null ');
    
  }

  generateCaptcha(phoneNumber : string){
    console.log("Begining of generateCaptcha");
    try {
      this.reCaptchaVerifier = new RecaptchaVerifier(getAuth(), 'recaptcha-container', {
        size: 'normal',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          
          return response;
        },
      });
      console.log('ReCaptchaVerifier initialized successfully');
    } catch (error:any) {
      console.error('Error generating captcha', error.message);
    }
    
    console.log('About to sign user up with his phone number - signup,generateCaptcha');
    
    signInWithPhoneNumber(getAuth(), "+52"+phoneNumber, this.reCaptchaVerifier).then(
      (smsResult) => {
        console.log('OTP sent');
        this.smsResult = smsResult;
        this.confirmation = true;
      }
    ).then(
      ( ) => {
        console.log("user created");
      }
    ).catch(
      (error) => {
        console.error('Error sending OTP', error);
      }
    )
  }

  //the SMS code has been sent to the user's phone and he has submitted it
  submit2(){
    this.verifyOTP(this.otp?.value);
  }

  //called when the user enters the code sent to his phone
  verifyOTP(value:any){
    if(this.smsResult != undefined){
      this.smsResult.confirm(value).then(
        (object : { user: any;} ) => {
          console.log('User signed up with his phone number');
          this.user = object.user;
          
          var email = this.signUpForm.get('email')?.value;
          var password = this.signUpForm.get('password')?.value;
          var phone = this.signUpForm.get('phone')?.value || " ";
          var name = this.signUpForm.get('name')?.value || " ";
          var currentUser = this.auth.currentUser;
          if(currentUser != null && email != null && password != null){
            updateEmail(currentUser, email).then(
              () => {
                console.log('Email updated');
              }
            ).catch(
              (error) => {
                console.error('Error updating email', error, email);
              }
            );
            updatePassword(currentUser, password).then(
              () => {
                console.log('Password updated');
                this.router.navigate(['/home']);
              }
            ).catch(
              (error) => {
                console.error('Error updating password', error);
              }
            );

            //DAR DE ALTA USUARIO CON FIRESTORE con el servicio firebaseStuff
            /*this.bobby = {id: "", idAuth: currentUser.uid, email: email, password: password, phone: phone, name: name};
            this.crudService.addUser(this.bobby).then(
              () => {
                console.log('User added to the database');
              }
            ).catch(
              (error) => {
                console.error('Error adding user to the database', error);
              }
            );*/
  
          }
        }
      )
    }
  }
  

}


//
export function passwordsMatchValidator() : ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword){
      return {passwordsDontMatch: true};
    }
    return null;
  }
}
