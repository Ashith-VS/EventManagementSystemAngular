import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number =new Date().getFullYear();
  

  handleFocusTop(){
    window.scroll({top: 0, behavior: "smooth"});
  }

}
