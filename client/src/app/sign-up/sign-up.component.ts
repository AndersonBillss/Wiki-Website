import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SearchBoxComponent } from '../navbar/search-box/search-box.component';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    IconComponent,
    SearchBoxComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userName: string = ''
  snackbar: any = {success: true, msg: '', hidden: true}
  logInSuccess: boolean = false

  constructor(
    private location: Location,
    private authService: AuthService
  ){}


  signUp(){
    this.authService.signUp(this.userName).subscribe((data: any) => {
      this.openSnackBar(data)
      if(data.success){
        this.logInSuccess = true
      }
    })
  }

  openSnackBar(apiRes: any){
    this.snackbar = {
      success: apiRes.success,
      msg: apiRes.msg,
      hidden: false
    }
    setTimeout(() => {
      this.snackbar.hidden = true
    },3000)
  }

  goBack(){
    this.location.back()
  }
}
