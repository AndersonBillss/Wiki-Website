import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { SearchBoxComponent } from '../../../navbar/search-box/search-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-item-create',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    SearchBoxComponent
  ],
  templateUrl: './asset-item-create.component.html',
  styleUrl: './asset-item-create.component.css'
})
export class AssetItemCreateComponent {
  @Input() submitFuntion!: Function

  @Input() items!: any[];
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  assetTypes: string[] = [
    "Image",
    "Animation",
    "Audio"
  ]
  selectedAssetType: string = ''
  assetTitle: string = '';
  itemFiles: File | File[] | null = null;
  preview: (string | ArrayBuffer)[] | null = null
  errorMsg: string = '';

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }


  close(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible)
    this.assetTitle = '';
    this.itemFiles = null
    this.errorMsg = '';
    this.selectedAssetType = ''
  }

  checkValidity(){
    const duplicate = this.items.find(f => f.title.toLowerCase() === this.assetTitle.toLowerCase()) !== undefined
    if(duplicate){
      this.errorMsg = "This is a duplicate title"
    } else {
      this.errorMsg = ""
    }
  }

  submit(){
    let submitObject: any = {
      title: this.assetTitle,
      type: this.selectedAssetType
    }
    if(this.selectedAssetType === "Image"){
      if(Array.isArray(this.preview)){
        submitObject.src = this.preview[0]
      } else {
        this.errorMsg = "Image is null"
        return
      }
    } else if(this.selectedAssetType === "Animation"){
      if(Array.isArray(this.preview)){
        submitObject.srcArray = this.preview
      } else {
        this.errorMsg = "Image is null"
        return
      }
    } else if(this.selectedAssetType === "Audio"){
      this.errorMsg = "Audio not yet supported"
      return
    }

    this.submitFuntion(submitObject)
    this.close()
  }

  public selectType(type: string){
    this.selectedAssetType = type
    this.itemFiles = null
    this.preview = null
    this.errorMsg = ''
  }

  isImage(filePath: string | null): boolean {
    if(filePath){
      return filePath.match(/\.(jpeg|jpg|gif|png|heic|webp|apng)$/) != null;
    } else {
      return false;
    }
  }

  previewFiles(files: File[]): void {
    this.preview = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.preview?.push(reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  public onFileSelected(event: Event){
    if(this.selectedAssetType === "Image"){
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.itemFiles = input.files[0];
        if(!this.isImage(this.itemFiles.name)){
          this.errorMsg = "Image must be in one of the following formats: jpeg, jpg, gif, png, apng, heic, or webp";
          return;
        }
        if(!this.assetTitle){
          this.assetTitle = this.getFileTitle(this.itemFiles.name)
        }
        this.previewFiles([this.itemFiles]);
        this.errorMsg = "";
      }
    } else if(this.selectedAssetType === "Animation"){
      const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {

          this.itemFiles = []

          for(let i=0; i<input.files.length; i++){
            const file = input.files[i]
            this.itemFiles.push(file)
          }
          
          for(const file of  this.itemFiles){
            if(!this.isImage(file.name)){
              this.errorMsg = "Image must be in one of the following formats: jpeg, jpg, gif, png, heic, or webp";
              return;
            }
          }
          if(!this.assetTitle){
            this.assetTitle = this.getFileTitle(this.itemFiles[0].name)
          }

          this.previewFiles(this.itemFiles);
          this.errorMsg = "";
        }
    } else if(this.selectedAssetType === "Audio"){

    } else {
      this.errorMsg = "Invalid asset type"
    }
  }

  getFileTitle(title: string): string{
    const splitTitle = title.split('.')
    let newTitle = ''
    for(let i=0; i<splitTitle.length-1; i++){
      newTitle += splitTitle[i]
    }
    return newTitle
  }
}
