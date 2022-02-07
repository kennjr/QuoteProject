import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onAddQuote :EventEmitter<boolean> = new EventEmitter();

  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  hasRoute (route :string){
    return this.router.url === route;
  }

  addQuote(){
    this.onAddQuote.emit(true);
  }
}
