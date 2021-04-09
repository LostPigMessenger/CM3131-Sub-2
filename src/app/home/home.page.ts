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
  key: any;



  constructor(private pokeService: PokemonService, private storage: Storage) {}

  ngOnInit()  {
    this.loadPokemon();
  }

  loadPokemon(){
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result:', res);
      this.pokemon = res;
    })
  }
  
  onSearchUpdate(e) {
    let value = e.detail.value;
 
    if (value == '') {
      this.offset = 0;
      return;
    }
 
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }

  SavePokeInfo(){
    this.storage.set('key',this.pokemon);

  }

  

}
