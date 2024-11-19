import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-booked-events',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './booked-events.component.html',
  styleUrl: './booked-events.component.css'
})
export class BookedEventsComponent {

}
