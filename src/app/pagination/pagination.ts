import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Input() count: number = 1;
  @Input() perPage: number = 10;
  @Input() pageToShow: number = 5; // Changed default to 5 for better UX
  @Input() loading: boolean = true;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev() {
    console.log('Previous clicked, current page:', this.page);
    this.goPrev.emit(true);
  }

  onNext() {
    console.log('Next clicked, current page:', this.page);
    this.goNext.emit(true);
  }

  onPage(n: number): void {
    console.log('Page clicked:', n, 'current page:', this.page);
    this.goToPage.emit(n);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  getPages(): number[] {
    const totalPages = this.totalPages();
    const currentPage = this.page || 1;
    const pagesToShow = this.pageToShow || 5;
    
    // If total pages is less than or equal to pages to show, show all
    if (totalPages <= pagesToShow) {
      const pages: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    console.log('Generated pages:', pages, 'for current page:', currentPage, 'total pages:', totalPages);
    return pages;
  }
}