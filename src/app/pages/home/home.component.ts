import { authenticationAction } from './../../redux/actions/authentication.action';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ApiListService } from '../../services/api-list.service';
import { eventModel } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
import { userModel } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../redux/selectors/authentication.selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  events:eventModel[]=[]
  currentUser:userModel=new Object as userModel;

  constructor(private eventService:ApiListService,private authService:AuthService,private store:Store) { }
  ngOnInit(): void {
    this.eventService.GetAllEvents().subscribe((data:any) => {
      this.events = data;
    });

    this.store.select(selectCurrentUser).subscribe((data:any) => {
      this.currentUser = data;
    });
  }

}
