import { Routes } from '@angular/router';
import {BoardComponent} from './board/board.component';
import {GamesComponent} from './games/games.component';
import {ConnectFourBoardComponent} from './connectfourboard/connect-four-board.component';

export const routes: Routes = [
  { path: "tictactoeGame", component: BoardComponent },
  {path: "ConnectFour", component: ConnectFourBoardComponent},
  { path: "", component: GamesComponent },
];
