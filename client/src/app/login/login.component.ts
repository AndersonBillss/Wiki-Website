import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBoxComponent } from '../navbar/search-box/search-box.component';
import { RouterModule, Router } from '@angular/router';

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
  errorMsg: string = ''


  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  logIn(){
    this.authService.logIn(this.username).subscribe((data: any) => {
        if(data.success){
          this.errorMsg = ''
          localStorage.setItem("token",data.token)
          this.router.navigate(['/home'])
        } else {
          this.errorMsg = data.msg
        }
      },
      (error: any) => {
        console.error('TEST LOG Error:', error.error.msg);
        this.errorMsg = error.error.msg
      }
    )
  }
}
