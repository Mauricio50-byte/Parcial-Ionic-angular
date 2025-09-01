import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importar componentes
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkComponent } from './components/link/link.component';
import { CardComponent } from './components/card/card.component';
import { PrincipalNewsComponent } from './components/principal-news/principal-news.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';
import { UserFormComponent } from './components/user-form/user-form.component';

// Importar servicios y providers
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';
import { EncryptProvider } from './providers/encrypt.provider';
import { HttpProvider } from './providers/http.provider';
import { LoaderProvider } from './providers/loader.provider';
import { StorageProvider } from './providers/storage.provider';
import { ToastProvider } from './providers/toast.provider';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    LinkComponent,
    CardComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SideBarComponent,
    ListComponent,
    ModalComponent,
    UserFormComponent
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    LinkComponent,
    CardComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SideBarComponent,
    ListComponent,
    ModalComponent,
    UserFormComponent
  ],
  providers: [
    NewsService,
    UserService,
    EncryptProvider,
    HttpProvider,
    LoaderProvider,
    StorageProvider,
    ToastProvider
  ]
})

export class SharedModule { }