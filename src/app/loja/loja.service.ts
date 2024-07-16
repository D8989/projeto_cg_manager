import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILojaPaginado } from './interfaces/loja-paginado.interface';
import { environment } from '../../environments/environment';
import { IMessageResp } from '../common/res/message-resp.interface';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<ILojaPaginado>(
      environment.apiUrl + 'loja/list',
      {},
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete<IMessageResp>(
      environment.apiUrl + `loja/${id}/soft`
    );
  }
}
