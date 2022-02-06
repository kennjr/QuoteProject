import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) { 
    this.bgColor();
  }

  private bgColor (){
    this.elementRef.nativeElement.style.backgroundColor = 'orange';
  }

}
