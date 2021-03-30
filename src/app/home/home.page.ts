import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  offset = 0; //for the pokemon list
  pokemon = [] //pokemon array
  public searchInput='';

  constructor(private pokeService: PokemonService) {}

  ngOnInit()  {
    this.loadPokemon();
  }

  loadPokemon(){
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result:', res);
      this.pokemon = res;
    })
  }
  
  onSearchChange(e) {
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

  

}
