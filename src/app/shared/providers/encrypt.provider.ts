import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptProvider {

  constructor() { }

  // Encriptar datos usando AES
  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, environment.secretKey).toString();
  }

  // Comparar datos encriptados con texto plano
  compareData(encrypted: string, plain: string): boolean {
    const decrypted = CryptoJS.AES.decrypt(encrypted, environment.secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted === plain;
  }
}