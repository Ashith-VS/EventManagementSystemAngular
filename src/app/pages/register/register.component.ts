import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterModel } from '../../models/regster.model';
import RegisterInput from "../../constants/inputs.json"
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm=new FormGroup({})
  errorObj:{[key:string]:string}={};
  JsonInput:RegisterModel[]=RegisterInput.Registers;
  defaultAvatarIcon = './assets/icons/avatar.webp';
  avatar: File | null = null;
  showModal:boolean=false;

  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.handleChangesClearErrors();
  }

  buildForm(){
    this.JsonInput.forEach((item:any)=>{
      const validators = [];
      if (item.isrequired) {
        validators.push(Validators.required);
      }
      if (item.ispattern) {
        validators.push(Validators.pattern(item.ispattern));
      }

      const controller = this.fb.control(item.value,validators)
      this.registerForm.addControl(item.name,controller)
    })
  }

  handleChangesClearErrors(){
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.valueChanges.subscribe(() => {
        if (this.errorObj[key]) {
          delete this.errorObj[key]; // Clear the error message for the field
        }
        });
      })
  }

  handleSubmit(e:Event):void{
    e.preventDefault();
    this.errorObj={};
    this.handleValidate();
    if(this.registerForm.valid){
      const formObject:any={...this.registerForm.value};
      if(this.avatar){
        formObject['avatar']=this.avatar
      } 
this.auth.createUser(formObject).subscribe({
  next:()=>{
    console.log('User created successfully');
    this.showModal=true;
  },
  error: (err) => {
    console.error('Error creating user:', err);
    this.errorObj['error']=err.message|| 'An unexpected error occurred'
  },
})

    }else{
      setTimeout(() => {
        const firstErrorElement = document.querySelector(".error")as HTMLElement;
        if (firstErrorElement) {
          firstErrorElement.focus();
        }
      }, 1000);
    }
   
  }


  handleValidate(){
    Object.keys(this.registerForm.controls).forEach((key)=>{
      const field =this.JsonInput.find((item:any)=>item.name===key)
      if(!field) return;
      if(this.registerForm.get(key)?.errors?.['required']){
        this.errorObj[key]=`${field.label} is required`;
      }
      if(this.registerForm.get(key)?.errors?.['pattern']){
        this.errorObj[key]=field.patternErrorMessage||`Invalid ${field.label}`;
      }
    })
    return this.errorObj
  }

  errorObjArr(){
    return Object.keys(this.errorObj)
  }

  focusInput(id:string){
    const inputElement = document.getElementById(id);
    if(inputElement){
      inputElement.focus();
    }
  }

handleNavigate(data:string){
this.router.navigate([`${data}`])
}

handleAvatar(e:Event):void{
  const file=(e.target as HTMLInputElement).files?.[0];
  if(file){
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.avatar = e.target.result;
      // console.log('this.avatar4: ', this.avatar);
    };
    reader.readAsDataURL(file);
  }
}


}


