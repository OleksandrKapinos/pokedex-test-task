import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Pokemon} from '../_interfaces/pokemon';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private  http: HttpClient
  ) {
  }

  getCard(id: number) {
    return this.http.get<Pokemon>(`${environment.production}/${id}`)
                    .pipe(
                        retry(1),
                        catchError(this.errorHandler)
                    );
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message);
  }
}
