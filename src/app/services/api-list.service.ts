import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor(private firestore:Firestore ) { }

  createEvent(data:any,uid:string){
    return from(setDoc(doc(this.firestore,'event',uid),{...data,id:uid}))
  }

  GetAllEvents(){
    return from(getDocs(collection(this.firestore,"event"))).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data()))
    )
  }

  updateEventById(id:string,data:any){
    const updateEvent = doc(this.firestore, 'event', id);
    return from(updateDoc(updateEvent,{...data}))
  }



}
