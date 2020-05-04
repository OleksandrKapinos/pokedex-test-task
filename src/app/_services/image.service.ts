import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
  }

  getImage(id: number) {
    return  (id < 10) ?  `${environment.images}/00${id}.png` :
            (id < 100) ? `${environment.images}/0${id}.png` :
                         `${environment.images}/${id}.png`;
  }
}
