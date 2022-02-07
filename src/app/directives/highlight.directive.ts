import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  constructor(private elementRef: ElementRef) { 
    this.bgColor()
    
  }

  private bgColor (){
    this.elementRef.nativeElement.style.backgroundColor = '#ff5722';
    this.elementRef.nativeElement.style.color = '#fff';
  }

}
