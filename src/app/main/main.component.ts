import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Card } from '../models/card';
import * as fromRoot from '../reducers';
import * as cards from '../actions/cards';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-main',
  template: `
<div class="container-fluid text-center pb-5">
  <div class="row justify-content-end">
    <app-new-card-input (onCardAdd)="addCard($event)"></app-new-card-input>
  </div>
</div>
<app-card-list [cards]="cards$ | async"></app-card-list>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  title = 'getting-started-ng5';
  public cards$: Observable<Card[]>;

  addCard(card: Card) {
    // update the state in store 
    this.store.dispatch(new cards.Add(card));
  }

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    // this next line do nothing, just return the current state. be careful
    // it is updated.
    this.store.dispatch(new cards.Load());
    // reassign the new state's cards into this.cards$ to trigger
    // <app-card-list [cards]="cards$ | async"></app-card-list>, then
    // trigger card-list.components.ts. 
    this.cards$ = this.store.select(fromRoot.getCards);
  }
}
