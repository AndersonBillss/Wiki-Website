import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [],
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){ }


  logout(){
    localStorage.setItem("token","")
    this.router.navigate(['/login'])
  }
}
