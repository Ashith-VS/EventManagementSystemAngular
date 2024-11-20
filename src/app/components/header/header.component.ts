import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../redux/selectors/authentication.selector';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { authenticationAction } from '../../redux/actions/authentication.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentUser:userModel=new Object() as userModel
  isDropdownOpen = false; 

  constructor(private store:Store,private authService:AuthService,private router:Router) { }
  ngOnInit(): void {
    this.authService.getcurrentUserId().subscribe((data:any) => {
      if(data.uid){
        this.authService.currentUser(data.uid).subscribe((res:any)=>{
          this.store.dispatch(authenticationAction({...res}))
        })
      }
    });

    this.store.select(selectCurrentUser).subscribe(user => {
      this.currentUser = user;
    })
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; 
  }

  handleLogout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/home']);
     this.isCurrentUserEmpty();
    })
  }


  isCurrentUserEmpty(): boolean {
    return Object.values(this.currentUser).every(value => value === '');
  }

 

}
