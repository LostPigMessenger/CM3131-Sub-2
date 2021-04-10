//This code was adapted from the tutorial by Simon Grimm, referenced in the report.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = 'https://pokeapi.co/api/v2'; //API Url
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'; //Pictures of the pokemon

  constructor(private http: HttpClient) { }


  //This gets the information from the API and turns it into an array. It loads all 898 pokemon but could be limited to less. Reduced for testing purposes(loads faster)
  getPokemon(offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=130`).pipe(map(result =>{
      return result['results'];
    }),
    map(pokemons => {
      return pokemons.map((pokemon, index) => {
         pokemon.image = this.getPokemonImg(index + offset + 1); //This gives us the pokemon sprite url according to the pokemon index. +1 since the pokemon array begins at 0 but the sprites URL begins at 1
         pokemon.pokeIndex = offset + index + 1;
         return pokemon;
      });

    })
    );
  }

//This gets the URL for the pokemon sprite according to the index
  getPokemonImg(index) { 
    return `${this.imageUrl}${index}.png`;
  }

  
  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map(pokemons => {
        pokemons['image'] = this.getPokemonImg(pokemons['id']);
        pokemons['pokeIndex'] = pokemons['id'];
        return pokemons;
      })
    );
  }

  getPokemonDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(pokemon => {
        let sprites = Object.keys(pokemon['sprites']);//This transforms the keys for the pokemon sprites from the Image Url into an array
        pokemon['images'] = sprites
          .map(spriteKey => pokemon['sprites'][spriteKey])
          .filter(img => img);// Checks if image is null
        return pokemon;
      })
    );
  }

}
