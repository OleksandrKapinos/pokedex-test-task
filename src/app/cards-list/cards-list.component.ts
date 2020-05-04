import {Component, OnInit} from '@angular/core';
import {ListService} from '../_services/list.service';
import {ImageService} from '../_services/image.service';
import {first} from 'rxjs/operators';
import {PokemonsList} from '../_interfaces/pokemons-list';


@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {

    cardsList: PokemonsList[];
    isLoading: boolean;
    quantityCard = 12;
    pokemonId = 0;
    showCard = false;
    errorMessage: string;
    showError = false;

    constructor(
        private listService: ListService,
        private imageService: ImageService,
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.listService.getList(this.quantityCard)
            .pipe(first()).subscribe(
            list => {
                this.cardsList = list.results;
                for (let i = 0; i < this.quantityCard; i++) {
                    this.cardsList[i].img = this.imageService.getImage(i + 1);
                    this.cardsList[i].name = this.cardsList[i].name[0].toUpperCase() + this.cardsList[i].name.substring(1);
                }
                this.isLoading = false;
            },
            error => {
                this.errorMessage = error;
                this.showError = true;
                this.isLoading = false;
                throw error;
            });
    }


    openPokemon(id) {
        this.pokemonId = id;
        this.showCard = true;
    }

    onClose() {
        this.showCard = false;
    }

    addMore() {
        this.quantityCard += 12;
        this.ngOnInit();
    }
}
