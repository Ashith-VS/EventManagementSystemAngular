import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : Auth, private firestore: Firestore,) { }

  LoginUser(data:any){
    const { email, password } = data;
    return from(signInWithEmailAndPassword(this.auth,email,password))
  }


  createUser(data:any) {
  const {email, password } = data;
   return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
    switchMap((res)=>from(setDoc(doc(this.firestore, 'users', res.user.uid),{...data,id: res.user.uid,}))) 
   )  
  }


  currentUser(data:any){
    

  }

  // Sign out
  logout() {
    return signOut(this.auth);
  }

}
