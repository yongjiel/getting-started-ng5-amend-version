import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CardService} from '../services/card.service';
import { of } from 'rxjs/observable/of';

import * as Cards from '../actions/cards';

import {exhaustMap, map, mergeMap, catchError} from 'rxjs/operators';



@Injectable()
export class CardsEffects {
    //@createEffect()
    // this would like to side plugin the list from firebsae based on the action.
    loadCards$ = createEffect(() => {
        if (this.actions$ === undefined){
            return null;
        }else {
            return this.actions$
                .pipe(ofType(Cards.LOAD),
                    mergeMap(action => {
                        return this.cardService.getCardsList().pipe(
                        map(res => new Cards.LoadSuccess(res)),
                        catchError(error => of(new Cards.ServerFailure(error))))}
                    )
                )
        }
        
        }
    )

    //@createEffect({dispatch: false})
    serverFailure$ = createEffect(() =>
         this.actions$
        .pipe(ofType(Cards.SERVER_FAILURE),
        map((action: Cards.ServerFailure) => action.payload),
        exhaustMap(errors => {
            console.log('Server error happened:', errors);
            return of(null);
        })), 
        {dispatch: false}
    )

    //@createEffect({dispatch: false})
    addCards$  = createEffect(() => 
        this.actions$
        .pipe(ofType(Cards.ADD),
            map((action: Cards.Add) => action.payload),
            exhaustMap(payload => {
              // const card = this.cardService.createCard(payload);
              //   if (card.$key) {
              //       return of(new Cards.LoadSuccess([card]));
              //   }
              this.cardService.createCard(payload);
              return of(null);
            })
        ), 
        {dispatch: false}
    )      

    constructor(
        private actions$: Actions, 
        private cardService: CardService) {}
}
