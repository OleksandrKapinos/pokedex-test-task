import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PokemonsServerList} from '../_interfaces/pokemons-server-list';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ListService {

    constructor(
        private http: HttpClient
    ) {
    }

    getList(size) {
        return this.http.get<PokemonsServerList>(`${environment.production}?limit=${size}`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            );
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message);
    }
}

