import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ApiListService } from '../../services/api-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  events:any[]=[]
  constructor(private eventService:ApiListService) { }
  ngOnInit(): void {
    this.eventService.GetAllEvents().subscribe(data => {
      this.events = data;
    });
  }

}
