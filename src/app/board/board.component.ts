import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board!: Field[][];
  player1!: Player;
  player2!: Player;
  currentPlayer!: Player;
  isOver = false;
  winner?: Player;
  isTied = false;

  constructor() {
    this.setup();
  }

  setup(): void {
    this.isOver = false;
    this.isTied = false;
    this.board = []
    this.winner = undefined;
    for(let i = 0; i < 3; i++) {
      const row: Field[] = [];
      for(let j = 0; j < 3; j++) {
        row.push(new Field());
      }
      this.board.push(row);
    }
    this.player1 = new Player("Player1", "X")
    this.player2 = new Player("Player2", "O")
    this.currentPlayer = this.player1;
  }

  onTurn(field: Field): void {
    if(field.player || this.isOver) return;
    field.player = this.currentPlayer;
    this.isOver = this.checkWin();
    if(this.isOver) {
      this.winner = this.currentPlayer;
      return;
    }
    this.isTied = this.checkTie();
    if(this.isTied) return;
    if(this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  checkWin(): boolean {
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i].every(field => field.player === this.currentPlayer)) {
        return true;
      }
    }
    for(let col = 0; col < 3; col++) {
      let win = true;
      for(let row = 0; row < 3; row++) {
        if(this.board[row][col].player !== this.currentPlayer) {
          win = false;
          break;
        }
      }
      if(win) return true;
    }
    let win = true;
    for(let i = 0; i < 3; i++) {
      if(this.board[i][i].player !== this.currentPlayer) {
        win = false;
        break
      }
    }
    if(win) return true;

    win = true;
    for(let i = 0; i < 3; i++) {
      if(this.board[i][2-i].player !== this.currentPlayer) {
        win = false;
        break
      }
    }
    if(win) return true;
    return false;
  }

  checkTie(): boolean {
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        if(!this.board[row][col].player) return false;
      }
    }
    return true;
  }


}

class Field {
  player?: Player;
}

class Player {
  constructor(public name: string, public piece: string) {
  }
}
