import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SearchBoxComponent } from '../navbar/search-box/search-box.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    IconComponent,
    SearchBoxComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userName: string = ''

  constructor(
    private location: Location,
    private authService: AuthService
  ){}


  signUp(){
    this.authService.signUp(this.userName).subscribe(data => {
      console.log(data)
    })
  }

  goBack(){
    this.location.back()
  }
}
