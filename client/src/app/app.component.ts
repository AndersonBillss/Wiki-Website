import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'client';
  pageHtml: string | undefined = ''

  constructor(){}

  ngOnInit(): void {
    const string = "this is a test [[string|samplePage]] for my wiki website. I will create a function to turn this string into innerHtml with links in it. Linked strings will be in this format: ![[string|targetRoute]]. <div></div> <> '' &&&&"

    this.pageHtml = parsePageContent(string)
    if(this.pageHtml == undefined){
      console.log('parsing error')
    }

  }
}
