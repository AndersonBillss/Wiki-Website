import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBoxComponent } from '../navbar/search-box/search-box.component';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBoxComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = ''

  constructor(private authService: AuthService){ }

  logIn(){
    this.authService.logIn(this.username).subscribe(data => {
      console.log(data)
    })
  }
}
