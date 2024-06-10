import { Component, OnInit} from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AsyncPipe } from '@angular/common';

import { Router } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchBoxComponent
  ],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchTerm: string = ''
  navOptions: string[] = []

  constructor( 
    private pageContentsService: PageContentsService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.pageContentsService.getPageList().subscribe((data) => {
      this.navOptions = data
    })
  }

  navigateToPage(pageName: string){
    this.router.navigate([`/page/${pageName}`])
  }

}
