import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parsePageContent } from './functions/pageContentFunctions';

import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconModule
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  pageHtml: string | undefined = ''

  constructor(private iconService: IconService){
    iconService.registerIcons()
  }

  ngOnInit(): void {
    const string = "this is a test [[string|samplePage]] for my wiki website. I will create a function to turn this string into innerHtml with links in it. Linked strings will be in this format: ![[string|targetRoute]]. <div></div> <> '' &&&&"

    this.pageHtml = parsePageContent(string)
    if(this.pageHtml == undefined){
      console.log('parsing error')
    }
  }
}
