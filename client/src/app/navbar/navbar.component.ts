import { Component, OnInit} from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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

  constructor( private pageContentsService: PageContentsService){
  }

  ngOnInit(): void {
    this.pageContentsService.getPageList().subscribe((data) => {
      this.navOptions = data
    })
  }

}
