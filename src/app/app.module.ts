import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from './settings/settings.component';
import { GameComponent } from './game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TestCompComponent } from './game/test-comp/test-comp.component';
import { GameSessionComponent } from './game/game-session/game-session.component';

const routes: Routes = [{ path: "", component: HomeComponent },
  {path: "settings", component:SettingsComponent},
  {path: "game", component:GameComponent},
  {path: "scoreboard", component:ScoreboardComponent},
  {path: "test", component:TestCompComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SettingsComponent, GameComponent, ScoreboardComponent, TestCompComponent, GameSessionComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule 
{}
