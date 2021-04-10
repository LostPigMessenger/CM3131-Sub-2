//This code was adapted from the tutorial by Simon Grimm, referenced in the report.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {

  details: any;
  
  indexes: any;

  constructor(private route: ActivatedRoute, private pokeService: PokemonService, private storage: Storage) { }

  ngOnInit() {

    let index = this.route.snapshot.paramMap.get('index');//This gives us the pokemon that was chosen from the search result based on its index in the current URL
    this.pokeService.getPokemonDetails(index).subscribe(details => {
      this.details = details;
      console.log('Details: ', details);
    });

    
  }

}
