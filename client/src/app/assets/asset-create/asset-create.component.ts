import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';
import { IconComponent } from '../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asset-create',
  standalone: true,
  imports: [SearchBoxComponent, IconComponent, CommonModule, FormsModule],
  templateUrl: './asset-create.component.html',
  styleUrl: './asset-create.component.css'
})
export class AssetCreateComponent {
  @Input() submitFuntion!: Function

  @Input() folders!: any[]
  @Input() assetTagOptions?: string[]
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  assetTitle: string = '';
  assetTagName: string = '';
  errorMsg: string = '';
  assetTags: string[] = [];


  addTag(name: string): void {
    let newTagName = name.trim().toLowerCase();
    if(newTagName){
      if(this.assetTags.indexOf(newTagName) !== -1){
        this.errorMsg = "No Duplicate image tag names";
        return;
      }
      this.assetTags.push(newTagName);
      this.assetTagName = "";
      this.errorMsg = "";
    }
  }

  checkValidity(){
    const duplicate = this.folders.find(f => f.title === this.assetTitle.toLowerCase()) !== undefined
    if(duplicate){
      this.errorMsg = "This is a duplicate title"
    } else {
      this.errorMsg = ""
    }
  }

  removeTag(index: number): void {
    this.assetTags.splice(index, 1);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }


  close(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible)
    this.assetTitle = '';
    this.assetTagName = '';
    this.errorMsg = '';
    this.assetTags = [];
  }

  submit(){
    this.submitFuntion({
      title: this.assetTitle?.toLowerCase(),
      tags: this.assetTags
    })
    this.close()
  }
}
