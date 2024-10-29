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
  @Input() optionSelectFunction?: any;
  @Input() titlecase: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputRef') inputElement!: ElementRef;
  @ViewChild('optionListRef') optionListElement!: ElementRef;

  filteredOptions: string[] | null = []
  isClickingOnOptions: boolean = false
  selectedOptionIndex: number | null = null

  ngOnInit(): void {
    this.filteredOptions = this.options?this.options:[]
  }

  ngAfterViewInit(): void {

    this.inputElement.nativeElement.addEventListener('click', () => {
      this.inputElement.nativeElement.focus();
    }); 

      this.addListeners()
  }


  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);

    if(this.options){
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(this.value.toLowerCase()))
    }

  }

  focus(){
    this.inputElement.nativeElement.focus()
  }

  
  setValue(newValue: string){
    this.value = newValue
    this.valueChange.emit(newValue);
  }

  handleItemClick(value: string){
    this.setValue(value)
    if(this.optionSelectFunction){
      this.optionSelectFunction(value)
    }
    setTimeout(() => {
      this.inputElement.nativeElement.blur()
    })
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


  addListeners(){
    const inputWidth = this.inputElement.nativeElement.offsetWidth
    document.documentElement.style.setProperty('--input-width', `${inputWidth}px`)
    const optionListHtml = this.optionListElement.nativeElement

    if(this.options !== undefined){
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
    }


    this.inputElement.nativeElement.addEventListener('keydown', (e: any) => {
      if(e.key === 'ArrowUp' && this.filteredOptions){
        if(this.selectedOptionIndex !== null && this.selectedOptionIndex > 0){
          this.selectedOptionIndex--
        } else {
          this.selectedOptionIndex = this.filteredOptions.length-1
        }
        this.setValue(this.filteredOptions[this.selectedOptionIndex])

      } else 
      if(e.key === 'ArrowDown' && this.filteredOptions){
        if(this.selectedOptionIndex !== null && this.selectedOptionIndex < this.filteredOptions.length-1){
          this.selectedOptionIndex++
        } else {
          this.selectedOptionIndex = 0
        }
        this.setValue(this.filteredOptions[this.selectedOptionIndex])

      } else 
      if(this.selectedOptionIndex !== null && this.filteredOptions){
        this.setValue(this.filteredOptions[this.selectedOptionIndex])
        if(this.optionSelectFunction){
          this.optionSelectFunction(this.value)
        }
      }

      if(e.key === 'Enter'){
        this.inputElement.nativeElement.blur()
        if(this.optionSelectFunction){
          this.optionSelectFunction(this.value)
        }
      }
    })
  }
}
