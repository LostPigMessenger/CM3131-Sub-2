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


  //This gets the information from the API and turns it into an array. It's limited to getting the original 151 pokemon out of 893 total.
  getPokemon(offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=151`).pipe(map(result =>{
      return result['results'];
    }),
    map(pokemon => {
      return pokemon.map((poke, index) => {
         poke.image = this.getPokeImage(index + offset + 1); //This gives us the pokemon sprite url. +1 since the pokemon array begins at 0 but the sprites URL begins at 1
         poke.pokeIndex = offset + index + 1;
         return poke;
      });

    })
    );
  }

//This gets the URL for the pokemon sprite according to the index
  getPokeImage(index) { 
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

  getPokeDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);//This transforms the keys for the pokemon sprites from the Image Url into an array
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);// Checks if image is null
        return poke;
      })
    );
  }

}
