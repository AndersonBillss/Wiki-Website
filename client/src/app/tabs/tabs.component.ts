import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterModule, Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IconComponent,
    RouterModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent  implements OnInit{
  selectedPage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      let route = this.router.url;
      route = route.slice(1,route.length)

      let routeSlashIndex = route.indexOf('/')
      if(routeSlashIndex !== -1){
        this.selectedPage = route.slice(0,routeSlashIndex)
      } else {
        this.selectedPage = route
      }
      console.log(this.selectedPage)
    });
  }

}
