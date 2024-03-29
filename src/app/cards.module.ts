import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from './services/card.service';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardInputComponent } from './new-card-input/new-card-input.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers/index';
import { CardsEffects } from './effects/cards';

import { environment } from './../environments/environment';
import { MainComponent } from './main/main.component';

import {Routes, RouterModule, Router} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: 'cards', pathMatch: 'full'},
  {path: 'cards', component: MainComponent},
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('state', reducers), // change to 'state' from that tuturial.
    EffectsModule.forFeature([CardsEffects]),
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [CardService],
  declarations: [
    CardComponent,
    CardListComponent,
    NewCardInputComponent,
    MainComponent
  ]
})
export class CardsModule { }
