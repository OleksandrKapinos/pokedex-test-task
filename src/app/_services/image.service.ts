import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
  }

  getImage(id: number) {
    if (id < 10){
      return `${environment.images}/00${id}.png`;
    }else if (id < 100) {
      return `${environment.images}/0${id}.png`;
    }else{
      return `${environment.images}/${id}.png`;
    }
  }
}
