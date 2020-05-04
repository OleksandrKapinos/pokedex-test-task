import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardService} from '../_services/card.service';
import {ImageService} from '../_services/image.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


    constructor(
        private cardService: CardService,
        private imageService: ImageService,
    ) {
    }


    @Output() closeEvent = new EventEmitter<boolean>();

    @Input()
    set pokemonId(pokemonId: number) {
        if (pokemonId > 0 && pokemonId < 964) {
            this.currentPokemonId = pokemonId;
            this.ngOnInit();
        }
    }


    errorMessage: string;
    showError = false;
    currentPokemonId: number;
    isLoading: boolean;
    pokemonInfo = {
        id: 1,
        name: '',
        types: [],
        stats: [],
        weight: '',
        image: ''
    };

    ngOnInit() {
        this.isLoading = true;
        this.cardService.getCard(this.currentPokemonId)
            .subscribe(card => {
                    if (card) {
                        const {name, id, types, stats, weight, ...rest} = card;
                        stats.reverse();
                        const pokemonName = name[0].toUpperCase() + name.slice(1);
                        const img = this.imageService.getImage(id);
                        this.pokemonInfo = {
                            id,
                            name: pokemonName,
                            types,
                            stats,
                            weight,
                            image: img
                        };
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

    close() {
        this.closeEvent.emit();
    }
}
