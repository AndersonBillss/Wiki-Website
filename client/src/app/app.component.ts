import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parsePageContent } from './functions/pageContentFunctions';

import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';

import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconModule,
    TabsComponent
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'client';
  pageHtml: string | undefined = ''

  @ViewChild('tabOffset') tabOffset!: ElementRef
  @ViewChild('tabs') tabs!: ElementRef

  constructor(){}

  ngAfterViewInit(): void {
  }
}
