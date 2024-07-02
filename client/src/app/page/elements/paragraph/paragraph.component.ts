import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { parsePageContent, encodePageContent } from '../../../utils/pageContentFunctions';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit{
  @Input() editMode!: boolean;
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteElement: EventEmitter<void> = new EventEmitter<void>();

  innerHtml: string | undefined = ''

  ngOnInit(): void {
    this.data.type = "Paragraph"
    this.innerHtml = parsePageContent(this.data.text)
  }

  cacheChanges(event: any) {
    const newValue = event.target.innerHTML;
    this.data.text = encodePageContent(newValue)
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
      if(event.target.innerHTML.length === 0){
        this.deleteElement.emit()
      }
    }
  }

}