import { Component} from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    SearchBoxComponent
  ],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = ''
  navOptions: string[] = [
    'first option',
    'second option',
    'third option',
    'fourth option',
    'fifth option',
  ]

}
