import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Input } from '@angular/core';

import { Router } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchBoxComponent,
    CommonModule
  ],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() pageList?: string[] | null

  searchOptions: string[] | null = []

  searchTerm: string = ''

  constructor( 
    private pageContentsService: PageContentsService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    if(this.pageList === undefined){
      this.pageContentsService.getPageList().subscribe((data) => {
        this.searchOptions = data
      })
    } else {
      this.searchOptions = this.pageList
    }
  }

  navigateToPage(pageName: string){
    this.router.navigate([`/page/${pageName}`])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageList'] && changes['pageList'].currentValue){
        this.searchOptions = changes['pageList'].currentValue
    }
  }

}
