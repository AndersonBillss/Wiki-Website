import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './element.component.html',
  styleUrl: './element.component.css'
})
export class ElementComponent {
  @Input() elementsContainer!: any
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  elementTypes: string[] = [
    "Paragraph",
    "Header",
    "Image"
  ]

  changeElement(type: string){
    const parent = this.elementsContainer.nativeElement;
    if(!parent){
      return
    }

    const focusedElement = document.activeElement;
    let index = -1;
    
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].contains(focusedElement)) {
        index = i;
        break;
      }
    }

    if (index !== -1) {

      this.data[index].type = type;
      this.dataChange.emit(this.data);

      // Refocus the appropriate element
      setTimeout(() => {
        const updatedElement = parent.children[index];
        const contentEditableElement = updatedElement.querySelector('[contenteditable="true"], input, textarea');

        if (contentEditableElement instanceof HTMLElement) {
          contentEditableElement.focus();
        }
      });
      
    }
  }
}
