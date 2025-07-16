import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class PaginationComponent implements OnInit {

  @Input() page : number = 1;
  @Input() count : number = 1; 
  @Input() perPage: number = 10;
  @Input() pageToShow : number = 0;
  @Input() loading: boolean = true;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goToPage = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
    
  }

  onPrev() {
    this.goPrev.emit(true);
  }
  
  onNext() {
    this.goNext.emit(true);
  }

  onPage(n: number): void {
    this.goToPage.emit(n);
    
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage);
  }

}
