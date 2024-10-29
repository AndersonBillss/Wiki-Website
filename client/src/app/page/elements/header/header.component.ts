import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { parsePageContent, encodePageContent } from '../../../utils/pageContentFunctions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() editMode!: boolean;
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteElement: EventEmitter<void> = new EventEmitter<void>();

  innerHtml: string | undefined = ''

  ngOnInit(): void {
    this.data.type = "Header"
    this.innerHtml = parsePageContent(this.data.text)
  }

  cacheChanges(event: any) {
    const newValue = event.target.innerHTML;
    this.data.text = newValue
    this.dataChange.emit(this.data);
  }

  keyDownHandler(event: any){
    //handle enter press
    if(event.key === "Enter"){
      event.preventDefault();
      this.enterPressed.emit()
    }
    //delete element
    if(event.key === "Backspace" || event.key === "Delete"){
      const isOnlyNewLine = event.target.innerText === '\n'
      const noLength: boolean = event.target.innerText.length === 0
      if(noLength || isOnlyNewLine){
        this.deleteElement.emit()
      }
    }
  }
}
