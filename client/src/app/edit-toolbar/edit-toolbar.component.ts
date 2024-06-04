import { CommonModule } from '@angular/common';
import { LinkComponent } from './tools/link/link.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElementComponent } from './tools/element/element.component';

@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  standalone: true,
  imports: [
    LinkComponent,
    ElementComponent,
    CommonModule
  ],
  styleUrl: './edit-toolbar.component.css'
})
export class EditToolbarComponent {
  @Input() elementsContainer!: any
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();
  selectedToolIndex = 0;

  tools = [
    "Link",
    "Element"
  ]

  selectTool(index: number){
    this.selectedToolIndex = index
  }

}
