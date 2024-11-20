import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { userModel } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../redux/selectors/authentication.selector';

@Component({
  selector: 'app-booked-events',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './booked-events.component.html',
  styleUrl: './booked-events.component.css'
})
export class BookedEventsComponent implements OnInit {
  currentUser: userModel=new Object() as userModel;
  ticketShowModal: boolean = false;
  selectedTicket:any

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user)=>{
      this.currentUser=user
    })
  }


  handleViewTicket(data:any){
    this.ticketShowModal=true;
    this.selectedTicket=data;
    // console.log('this.selectedTicket: ', this.selectedTicket);
  }

  handleCloseModal(){
    this.ticketShowModal=false;
  }
}
