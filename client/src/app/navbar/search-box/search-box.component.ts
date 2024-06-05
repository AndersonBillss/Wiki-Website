import { CommonModule } from '@angular/common';
import { Component, ElementRef,  ViewChild, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements AfterViewInit, OnInit, OnChanges{

  @Input() label?: string | '';
  @Input() placeholder?: string | null;
  @Input() options?: string[] | null;
  @Input() value!: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputRef') inputElement!: ElementRef;
  @ViewChild('optionListRef') optionListElement!: ElementRef;

  filteredOptions: string[] = []
  isClickingOnOptions: boolean = false
  selectedOptionIndex: number | null = null

  ngOnInit(): void {
    this.filteredOptions = this.options?this.options:[]
  }

  ngAfterViewInit(): void {

    this.inputElement.nativeElement.addEventListener('click', () => {
      this.inputElement.nativeElement.focus();
    }); 

    if(this.options){
      const inputWidth = this.inputElement.nativeElement.offsetWidth
      document.documentElement.style.setProperty('--input-width', `${inputWidth}px`)
      const optionListHtml = this.optionListElement.nativeElement

      optionListHtml.addEventListener('mousedown', () => {
        this.isClickingOnOptions = true;
      });
      
      optionListHtml.addEventListener('mouseup', () => {
        this.isClickingOnOptions = false;
      });

      // add/remove optionsListHtml on focus/blur
      this.inputElement.nativeElement.addEventListener('focus', () => {
        if(optionListHtml.classList.contains('hidden')){
            optionListHtml.classList.remove('hidden')
        }
      });
      this.inputElement.nativeElement.addEventListener('blur', () => {
        if(!optionListHtml.classList.contains('hidden') && !this.isClickingOnOptions){
          optionListHtml.classList.add('hidden')
        }      
      });

      this.inputElement.nativeElement.addEventListener('keydown', (e: any) => {
        if(e.key === 'ArrowUp'){
          if(this.selectedOptionIndex !== null && this.selectedOptionIndex > 0){
            this.selectedOptionIndex--
          } else {
            this.selectedOptionIndex = this.filteredOptions.length-1
          }
        }
        if(e.key === 'ArrowDown'){
          if(this.selectedOptionIndex !== null && this.selectedOptionIndex < this.filteredOptions.length-1){
            this.selectedOptionIndex++
          } else {
            this.selectedOptionIndex = 0
          }
        }

        if(this.selectedOptionIndex !== null){
          this.setValue(this.filteredOptions[this.selectedOptionIndex])
        }

        if(e.key === 'Enter'){
          this.inputElement.nativeElement.blur()
        }
      })
    }
  }


  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);

    if(this.options){
      this.filteredOptions = this.options.filter(option => option.includes(this.value))
    }
  }

  focus(){
    this.inputElement.nativeElement.focus()
  }

  setValue(newValue: string){

    this.value = newValue
    this.valueChange.emit(newValue);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue) {
      // Handle changes to options here
      this.options = changes['options'].currentValue
      if(this.options){
        this.filteredOptions = this.options
      }
    }
  }
}
