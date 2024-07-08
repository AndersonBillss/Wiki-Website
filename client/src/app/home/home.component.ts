import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName: string = ''

  constructor(
    private router: Router,
    private userService: UserService
  ){ }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((res: any) => {
      this.userName = res.userName
    })
  }


  logout(){
    localStorage.setItem("token","")
    this.router.navigate(['/login'])
  }
}
