import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private router: Router,
  ){ }

  getRoute(): Observable<string[]>{
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const url = this.router.url.slice(1, this.router.url.length)
        let routes = url.split('/')
        routes = routes.map(route => {
          return decodeURIComponent(route)
        })
        console.log(routes)
        return routes
      })
    )
  }

  getCurrentRoute(): string[] { 
    const url = this.router.url.slice(1, this.router.url.length)
    let routes = url.split('/')
    routes = routes.map(route => {
      return decodeURIComponent(route)
    })
    return routes
  }


}