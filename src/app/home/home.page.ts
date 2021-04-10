//This code was adapted from the tutorial by Simon Grimm, referenced in the report.
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  offset = 0; //for the pokemon list
  pokemon = []; //pokemon array
  public searchInput='';
  storedPokemons: any = [];
  searchResultSave: any;

  constructor(private pokeService: PokemonService, private storage: Storage) {}

  async ngOnInit()  {
    this.loadPokemon();
    await this.storage.create();

  }

  loadPokemon(){
    this.pokeService.getPokemon(this.offset).subscribe(result => {
      console.log('result:', result);
      this.pokemon = result;
    })
  }
  
  onSearchUpdate(e) {
    let value = e.detail.value;
 
    if (value == '') {
      this.offset = 0;
      return;
    }
 
    this.pokeService.findPokemon(value).subscribe(result => {
      this.pokemon = [result];
      this.searchResultSave = result;//This contains the details of the pokemon from the search result so they can be later used for storage in addRecentSearch()
    }, err => {
      this.pokemon = [];
    });
  }

  async addRecentSearch(){ //What to do next: This saves it as an array, should be saved as object inside array, I think. Scratch that, this makes a new array for every object [{...}], instead it should be one array with multiple objects. Add one more variable to store the object and then chuck that in an array. Should display fine on home page then.
    
    
    this.storedPokemons.push(this.searchResultSave);
    await this.storage.set('savedPokemon',this.storedPokemons);
    console.log(this.storedPokemons)

  }

  async clearRecentSearches(){

    this.storedPokemons.splice(0);
    
  }

  

}
