import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../../interfaces/news.interface';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false
})
export class PrincipalNewsComponent {

  @Input() news!: News;
  @Output() openNews = new EventEmitter<News>();

  constructor() { }

  onOpenNews() {
    this.openNews.emit(this.news);
  }
}