import {PokemonsList} from './pokemons-list';

export interface PokemonsServerList {
    count: number;
    next: string;
    previous: null;
    results: PokemonsList[];
}
