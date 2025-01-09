import { Routes } from '@angular/router';
import {BoardComponent} from './board/board.component';
import {GamesComponent} from './games/games.component';

export const routes: Routes = [
  { path: "tictactoe", component: BoardComponent },
  { path: "", component: GamesComponent },
];
