import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule , ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
//import { CardComponent } from './card/card.component';
//import { CardListComponent } from './card-list/card-list.component';
//import { NewCardInputComponent } from './new-card-input/new-card-input.component';
//import { CardService } from './services/card.service';
//import { HttpClientModule } from '@angular/common/http'; // if no this line,  HttpClient not work.
//import { AngularFireDatabaseModule } from '@angular/fire/database'; // if no this line , AngularFireDatabase not work
//import { AngularFireModule } from '@angular/fire'; // if not this line, no way to initialize environment.
//import { environment } from '../environments/environment'; // if no this line, environment.firebase not work
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
//import { CardsEffects } from './effects/cards';
import { AboutComponent } from './about/about.component';
//import { MainComponent } from './main/main.component';
import {Routes, RouterModule, Router} from "@angular/router";


const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full'},
  {path: 'cards',
  loadChildren: () => import('./cards.module').then(x => x.CardsModule) 
  },
  {path: 'about', component: AboutComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    //CardComponent,
    //CardListComponent,
    //NewCardInputComponent,
    AboutComponent,
    //MainComponent,
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    //HttpClientModule, 
    //AngularFireModule.initializeApp(environment.firebase), // if no this initializeAPP. ERROR Error: StaticInjectorError[InjectionToken FirebaseAppConfigToken]:
    //AngularFireDatabaseModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  //providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
