import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { NewsApiResponse, News } from '../../interfaces/news.interface';
import { ModalController, MenuController, AlertController } from '@ionic/angular';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

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
  selectedCategory = 'general';

  private categoryTitles: { [key: string]: string } = {
    'general': 'Noticias Generales',
    'business': 'Noticias de Negocios',
    'technology': 'Noticias de Tecnología',
    'sports': 'Noticias de Deportes',
    'health': 'Noticias de Salud',
    'entertainment': 'Noticias de Entretenimiento',
    'science': 'Noticias de Ciencia'
  };

  constructor(
    private newsService: NewsService,
    private modalController: ModalController,
    private userService: UserService,
    private menuController: MenuController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    await this.loadNews();
  }

  async loadNews(event?: any) {
    try {
      this.isLoading = true;
      // Cargar noticias por categoría
      this.newsResponse = await this.newsService.getNewsByCategory(this.selectedCategory).toPromise();
      
      if (this.newsResponse && this.newsResponse.articles.length > 0) {
        this.principalNews = this.newsResponse.articles[0];
        this.otherNews = this.newsResponse.articles.slice(1);
      }
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      // Fallback a noticias generales si hay error
      try {
        this.newsResponse = await this.newsService.getTopHeadlines().toPromise();
        if (this.newsResponse && this.newsResponse.articles.length > 0) {
          this.principalNews = this.newsResponse.articles[0];
          this.otherNews = this.newsResponse.articles.slice(1);
        }
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError);
      }
    } finally {
      this.isLoading = false;
      if (event) {
        event.target.complete();
      }
    }
  }

  async filterByCategory(category: string) {
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      await this.loadNews();
    }
    // Cerrar el menú después de seleccionar
    this.menuController.close('main-menu');
  }

  getCategoryTitle(): string {
    return this.categoryTitles[this.selectedCategory] || 'Otras Noticias';
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

  async openSettings() {
    // Cerrar menú
    this.menuController.close('main-menu');
    
    const alert = await this.alertController.create({
      header: 'Configuración',
      message: 'Funcionalidad de configuración próximamente disponible.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: async () => {
            try {
              await this.userService.logout();
              this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
