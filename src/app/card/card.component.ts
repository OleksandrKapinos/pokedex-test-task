import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardService} from '../_services/card.service';
import {ImageService} from '../_services/image.service';

export class PokemonFullInformation {
  constructor(
    public name: string,
    public id: number,
    public types: object[],
    public stats: object[],
    public weight: string,
    public image?: string
  ) {
  }
}

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

  currentPokemonId: number;
  @Output() closeEvent = new EventEmitter<boolean>();

  @Input()
  set pokemonId(pokemonId: number) {
    if (pokemonId > 0 && pokemonId < 964) {
      this.currentPokemonId = pokemonId;
      this.ngOnInit();
    }
  }


  pokemonFullInfo = new PokemonFullInformation('', 0, [], [], '');
  isLoadingPokemon: boolean;

  ngOnInit() {
    this.isLoadingPokemon = true;
    this.cardService.getCard(this.currentPokemonId)
      .subscribe(card => {
        if (card) {
          this.pokemonFullInfo = new PokemonFullInformation(
            card.name[0].toUpperCase() + card.name.substring(1),
            card.id,
            card.types.reverse(),
            card.stats.reverse(),
            card.weight,
            this.imageService.getImage(card.id)
          );
        }
        this.isLoadingPokemon = false;
      });
  }

  close() {
    this.closeEvent.emit();
  }
}
