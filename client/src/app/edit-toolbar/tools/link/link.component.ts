import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from '../../../navbar/search-box/search-box.component';
import { IconComponent } from '../../../icon/icon.component';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [
    FormsModule,
    SearchBoxComponent,
    IconComponent
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  newLink: string = ""

  addLink() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
  
      // Exit if the selection is not within a contentEditable element
      if (!this.isContentEditable(range.commonAncestorContainer) || this.newLink.trim() === '') {
        return;
      }
      


      const expandRangeToWordBoundaries = (range: Range) => {
        const textContent = range.commonAncestorContainer.textContent||'';
        let start = range.startOffset+1;
        let end = range.endOffset-1;

        // Expand start to the left until a word boundary is reached
        while (start > 0 && /\S/.test(textContent[start - 1])) {
            start--;
        }

        // Expand end to the right until a word boundary is reached
        while (end < textContent.length && /\S/.test(textContent[end])) {
            end++;
        }

        range.setStart(range.startContainer, start);
        range.setEnd(range.endContainer, end);
    };

    expandRangeToWordBoundaries(range);


      // Trim leading spaces by adjusting the start offset
      while (range.startOffset < range.endOffset && range.toString()[0] === ' ') {
        range.setStart(range.startContainer, range.startOffset + 1);
      }
      // Trim trailing spaces by adjusting the end offset
      while (range.endOffset > range.startOffset && range.toString().slice(-1) === ' ') {
        range.setEnd(range.endContainer, range.endOffset - 1);
      }
  
      const selectedText = range.toString();
      if(selectedText === ''){
        return //Exit if there is no selected text
      }
      
      const linkElement = document.createElement('a');
      linkElement.href = `/page/${this.newLink}`; 
      linkElement.textContent = selectedText;
  
      range.deleteContents();
      range.insertNode(linkElement);
    }
  }


  removeLink(){
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);

      // Exit if the selection is not within a contentEditable element
      if (!this.isContentEditable(range.commonAncestorContainer)) {
        return;
      }

      let container: Node | null = range.commonAncestorContainer
      while(container && container?.nodeName === "A" || container?.parentNode && container.parentElement?.nodeName === "A" ){
        container = container.parentNode
      }

      const childNodes = container?.childNodes
      if(childNodes?.length){

        //loop through child nodes
        for(let i=0; i<childNodes?.length; i++){
          const node = childNodes[i]
          //if a child node is A and intersects with range, replace it with a text node
          if(node.nodeName === "A" && range.intersectsNode(node)){
            const textNode = document.createTextNode(node.textContent || '');
            node.parentElement?.replaceChild(textNode, node)
          }

        }
      }


    }
  }


  isContentEditable(container: Node | null){
    while (container) {
      if (container.nodeType === Node.ELEMENT_NODE && (container as HTMLElement).hasAttribute('contentEditable')) {
        return(true)
      }
      container = container.parentNode;
    }
    return(false)
  }
}
