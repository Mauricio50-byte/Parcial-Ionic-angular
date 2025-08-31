import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { StorageProvider } from '../providers/storage.provider';
import { EncryptProvider } from '../providers/encrypt.provider';
import { HttpProvider } from '../providers/http.provider';
import { Country } from '../../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_KEY = 'user';
  private readonly COUNTRIES_KEY = 'countries';

  constructor(
    private storage: StorageProvider,
    private encrypt: EncryptProvider,
    private http: HttpProvider
  ) { }

  async register(user: User): Promise<boolean> {
    try {
      // Encriptar contraseña
      user.password = this.encrypt.encryptData(user.password);
      
      // Guardar usuario en almacenamiento local
      await this.storage.set(this.USER_KEY, user);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const user: User | undefined = await this.storage.get(this.USER_KEY);
      
      if (user && user.email === email) {
        // Verificar contraseña encriptada
        return this.encrypt.compareData(user.password, password);
      }
      
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.storage.remove(this.USER_KEY);
  }

  async getCurrentUser(): Promise<User | undefined> {
    return await this.storage.get(this.USER_KEY);
  }

  async updateUser(user: User): Promise<boolean> {
    try {
      // Si se cambia la contraseña, encriptarla
      if (user.password) {
        user.password = this.encrypt.encryptData(user.password);
      }
      
      await this.storage.set(this.USER_KEY, user);
      return true;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return false;
    }
  }

  async getCountries(): Promise<Country[]> {
    try {
      // Verificar si ya tenemos los países en almacenamiento local
      const cachedCountries = await this.storage.get(this.COUNTRIES_KEY);
      
      if (cachedCountries) {
        return cachedCountries;
      }
      
      // Obtener países de la API
      const response: any = await this.http.get(environment.apiUrl.flags).toPromise();
      const countries: Country[] = response.data.map((country: any) => ({
        id: country.name,
        value: `${country.flag} ${country.name}`
      }));
      
      // Guardar en caché
      await this.storage.set(this.COUNTRIES_KEY, countries);
      
      return countries;
    } catch (error) {
      console.error('Error al obtener países:', error);
      return [];
    }
  }
}