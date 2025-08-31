import { Component, Input } from '@angular/core';
import { News } from '../../../interfaces/news.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() news!: News;

  constructor() { }
}