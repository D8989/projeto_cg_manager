import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItemBase } from './interfaces/item-base.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemBaseService {
  constructor(private http: HttpClient) {}

  listItensBase() {
    return this.http.post<IItemBase[]>(
      'http://localhost:3000/item-base/list',
      {}
    );
  }
}
