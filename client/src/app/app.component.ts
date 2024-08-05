import { Component, ElementRef, ViewChild } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { TabsComponent } from './tabs/tabs.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TabsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  pageHtml: string | undefined = ''

  @ViewChild('tabOffset') tabOffset!: ElementRef
  @ViewChild('tabs') tabs!: ElementRef

  constructor(){}

}


