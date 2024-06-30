import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

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

  ngOnInit(): void {
    this.data.type = "Header"
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
      if(event.target.innerHTML.length === 0){
        this.deleteElement.emit()
      }
    }
  }
}
