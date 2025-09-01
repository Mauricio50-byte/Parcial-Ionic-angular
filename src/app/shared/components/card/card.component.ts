import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../../interfaces/news.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {

  @Input() news!: News;
  @Output() openNews = new EventEmitter<News>(); 
  constructor() { }
}