import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { parsePageContent } from './functions/pageContentFunctions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  pageHtml: string | undefined = ''

  ngOnInit(): void {
    const string = "this is a test [[string|samplePage]] for my wiki website. I will create a function to turn this string into innerHtml with links in it. Linked strings will be in this format: ![[string|targetRoute]]. <div></div> <> '' &&&&"

    this.pageHtml = parsePageContent(string)
    if(this.pageHtml == undefined){
      console.log('parsing error')
    }
  }
}
