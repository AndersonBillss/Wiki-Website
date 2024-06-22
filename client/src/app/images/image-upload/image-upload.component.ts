import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchBoxComponent,
    IconComponent
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  @Input() submitFuntion!: Function

  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  selectedFile: File | null = null;
  uploadedFilePath: string | null = null;
  filePreview: string | ArrayBuffer | null = null;
  imgTitle: string | null = null;
  imgTagName: string = '';
  errorMsg: string = '';
  imageTags: string[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if(!this.isImage(this.selectedFile.name)){
        this.errorMsg = "Image must be in one of the following formats: jpeg, jpg, gif, png, heic, or webp";
        return;
      }
      this.previewFile(this.selectedFile);
      this.errorMsg = "";
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
    this.imgTitle = '';
  }

  isImage(filePath: string | null): boolean {
    if(filePath){
      return filePath.match(/\.(jpeg|jpg|gif|png|heic|webp)$/) != null;
    } else {
      return false;
    }
  }

  addTag(name: string): void {
    let newTagName = name.trim().toLowerCase();
    if(newTagName){
      if(this.imageTags.indexOf(newTagName) !== -1){
        this.errorMsg = "No Duplicate image tag names";
        return;
      }
      this.imageTags.push(newTagName);
      this.imgTagName = "";
      this.errorMsg = "";
    }
  }

  removeTag(index: number): void {
    this.imageTags.splice(index, 1);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }


  close(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible)
    this.selectedFile = null;
    this.uploadedFilePath = null;
    this.filePreview = null;
    this.imgTitle = null;
    this.imgTagName = '';
    this.errorMsg = '';
    this.imageTags = [];
  }

  submit(){
    this.submitFuntion({
      title: this.imgTitle?.toLowerCase(),
      src: this.filePreview,
      tags: this.imageTags
    })
    this.close()
  }
}
