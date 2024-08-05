import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Input } from '@angular/core';

import { PageContentsService } from '../services/page-contents.service';
import { LocationService } from '../services/location.service';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchBoxComponent,
    CommonModule,
    IconComponent,
    RouterModule
  ],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() pageList?: string[] | null
  @Input() pageSelectFunction: any

  searchOptions: string[] | null = []
  searchTerm: string = ''

  section: string = ''

  constructor( 
    private pageContentsService: PageContentsService,
    private locationService: LocationService
  ){
  }

  ngOnInit(): void {
    this.section = this.locationService.getCurrentRoute()[1]
    if(this.pageList === undefined){
      this.pageContentsService.getPageList(this.section).subscribe((data) => {
        this.searchOptions = data
      })
    } else {
      this.searchOptions = this.pageList
    }
  }

  navigateToPage(pageName: string){
    this.pageSelectFunction(pageName)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageList'] && changes['pageList'].currentValue){
        this.searchOptions = changes['pageList'].currentValue
    }
  }

}
