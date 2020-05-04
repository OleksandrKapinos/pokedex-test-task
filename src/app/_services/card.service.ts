import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private  http: HttpClient
  ) {
  }

  getCard(id: number) {
    return this.http.get<any>(`${environment.production}/${id}`);
  }
}
