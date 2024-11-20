import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ApiListService } from '../../services/api-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { eventModel } from '../../models/event.model';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../redux/selectors/authentication.selector';
import { userModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  events:eventModel[]=[]
  id:string|null = null;
  filteredEvents:eventModel=new Object as eventModel
  currentUser:userModel=new Object as userModel
  loginModalOpen:boolean = false
  confirmModalOpen:boolean = false
  eventAttendModalOpen:boolean = false
  selectedTickets:number=1

  constructor(private eventService:ApiListService,private route:ActivatedRoute,private store:Store,private router:Router,private toast:ToastrService ){
     this.id=this.route.snapshot.paramMap.get('id')
    }
  ngOnInit(): void {
    // console.log('this.id',this.id);
    this.eventService.GetAllEvents().subscribe((res:any)=>{
      this.events=res
      if(this.id){
        const eventToDisplay=this.events.filter(e=>e.id===this.id)[0]
        this.filteredEvents=eventToDisplay
        // console.log('this.filteredEvents: ', this.filteredEvents);
      }
    })

    this.store.select(selectCurrentUser).subscribe((user)=>{
      this.currentUser=user
    })

  }

  isEmptyfilteredEvents():boolean{
return isEmpty(this.filteredEvents)
  }

  convertToNumber(value:string):number {
    return parseInt(value)
  }

  handleModal(){
    if(!isEmpty(this.currentUser)){
      if(this.convertToNumber(this.filteredEvents.AvailableTickets) <=0){
        this.toast.error('Tickets sold out');
      }else{
        this.confirmModalOpen=true;
    }

    }else{
      this.loginModalOpen=true
    }
  }

  handleNavigate(data:string){
this.router.navigateByUrl(data)
  }
  

  handleCloseConfirm(){
    this.confirmModalOpen=false
  }

  handleBookEventModal(){
    this.eventAttendModalOpen=true
    this.confirmModalOpen=false

  }

  handleBookEventclose(){
    this.eventAttendModalOpen=false
    this.toast.info('Ticket cancelled');
    this.selectedTickets=1
  }

  handleBookEventTicket(){
    if(this.selectedTickets>0 && this.selectedTickets < 8){
      if(this.selectedTickets <= this.convertToNumber(this.filteredEvents.AvailableTickets)){
        const data={...this.filteredEvents,AvailableTickets:this.convertToNumber(this.filteredEvents.AvailableTickets) - this.selectedTickets}
        this.eventService.updateEventById(this.filteredEvents.id,data).subscribe(()=>{
          console.log("event updated successfully1");
        })
      const userData={...data,ticketBooked:this.selectedTickets}
      // console.log('userData: ', userData);
        this.eventService.updateUserDocById(this.currentUser.id,userData).subscribe(()=>{
          console.log("user updated successfully2");
        });
        this.toast.success('Tickets booked successfully');
        this.router.navigateByUrl('home')
      }else{
        this.toast.error('Not enough tickets available');
      }
    }else{
      this.toast.error('Please select a ticket between 1 and 8');
    }


  }



 

}
