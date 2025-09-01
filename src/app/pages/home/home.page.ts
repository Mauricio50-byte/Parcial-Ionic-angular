import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { NewsApiResponse, News } from '../../interfaces/news.interface';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  newsResponse?: NewsApiResponse;
  principalNews?: News;
  otherNews?: News[];
  user?: User;
  isLoading = true;

  constructor(
    private newsService: NewsService,
    private modalController: ModalController,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    await this.loadNews();
  }

  async loadNews(event?: any) {
    try {
      this.isLoading = true;
      this.newsResponse = await this.newsService.getTopHeadlines().toPromise();
      
      if (this.newsResponse && this.newsResponse.articles.length > 0) {
        this.principalNews = this.newsResponse.articles[0];
        this.otherNews = this.newsResponse.articles.slice(1);
      }
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      this.isLoading = false;
      if (event) {
        event.target.complete();
      }
    }
  }

  async openNewsModal(news: News) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        news: news
      }
    });
    return await modal.present();
  }

  async doRefresh(event: any) {
    await this.loadNews(event);
  }
}