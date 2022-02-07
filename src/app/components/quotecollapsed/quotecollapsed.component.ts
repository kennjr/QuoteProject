import { Component, OnInit, Input } from '@angular/core';
import { Quote } from 'src/app/models/Quote';

@Component({
  selector: 'app-quotecollapsed',
  templateUrl: './quotecollapsed.component.html',
  styleUrls: ['./quotecollapsed.component.css']
})
export class QuotecollapsedComponent implements OnInit {

  @Input() quote?: Quote;
  @Input() index?: number;
  @Input() mostUpvotedQuoteIndex?: number;

  constructor() { }

  ngOnInit(): void {
  }

  showQuoteDetails (){
    
  }

}
