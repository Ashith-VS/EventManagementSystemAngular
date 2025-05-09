import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ApiListService } from '../../services/api-list.service';
import { Router } from '@angular/router';
import { eventModel } from '../../models/event.model';

@Component({
  selector: 'app-admin-all-events',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './admin-all-events.component.html',
  styleUrl: './admin-all-events.component.css'
})
export class AdminAllEventsComponent implements OnInit {
  events: eventModel[] = [];
  constructor(private eventService:ApiListService,private router:Router){}

  ngOnInit(): void {
    this.eventService.GetAllEvents().subscribe({
      next: (res:any) => {
        this.events=res
      },
      error: (error) => console.error('Error getting events', error)
    })
  }

  handleEdit(id:string){
    this.router.navigate([`/dashboard/${id}`])
  }

  convertToNumber(value:string):number {
    return parseInt(value)
  }



}
