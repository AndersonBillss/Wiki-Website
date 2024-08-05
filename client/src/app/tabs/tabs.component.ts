import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IconComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent  implements OnInit{
  selectedPage: string = '';
  viewTabs: boolean = true

  constructor(
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationService.getRoute().subscribe((routes: string[]) => {
      if(routes.length > 0){
        this.selectedPage = routes[0]
      }
      const isLoginPage = this.selectedPage==="login"||this.selectedPage==="signUp"
      this.viewTabs=!isLoginPage
    });

  }

}
