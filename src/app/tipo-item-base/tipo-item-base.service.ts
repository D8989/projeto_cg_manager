import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipoItemBase } from './interfaces/tipo-item-base.interface';
import { ICreateTipoItemBase } from './interfaces/create-tipo-item-base.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoItemBaseService {
  constructor(private http: HttpClient) {}

  listTipos() {
    return this.http.get<ITipoItemBase[]>(
      'http://localhost:3000/tipo-item-base'
    );
  }

  insertTipo(dto: ICreateTipoItemBase) {
    return this.http.post<ITipoItemBase>(
      'http://localhost:3000/tipo-item-base',
      dto
    );
  }
}
