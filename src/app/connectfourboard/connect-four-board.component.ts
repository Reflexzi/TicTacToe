import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-connectfourboard',
  imports: [CommonModule],
  templateUrl: './connect-four-board.component.html',
  styleUrl: './connect-four-board.component.scss'
})
export class ConnectFourBoardComponent {
  rowSize = 6;
  colSize = 7;
  board!: Field[][];
  player1!: Player;
  player2!: Player;
  currentPlayer!:Player;
  isOver:boolean = false;
  winner?:Player;
  isTied:boolean = false;

  constructor() {
    this.setup();
  }

  setup(): void {
    this.board = [];
    this.isOver = false;
    this.winner = undefined;
    for(let i = 0; i < this.rowSize; i++) {
      const row: Field[] = [];
      for(let j = 0 ; j < this.colSize; j++) {
        row.push(new Field());
      }
      this.board.push(row);
    }
    this.player1 = new Player("Player1", "background-red")
    this.player2 = new Player("Player2", "background-yellow")
    this.currentPlayer = this.player1;
  }

  onTurn(x: number): void {
    const field = this.getNextEmptyField(x);
    if(!field) return
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

  private getNextEmptyField(x: number): Field | undefined {
    for(let row = this.rowSize-1; row >= 0; row--) {
      if (!this.board[row][x].player) {
        return this.board[row][x];
      }
    }
    return
  }

  checkWin(): boolean {
    const direction = [
      { dx: 1, dy: 0},
      { dx: 0, dy: 1},
      { dx: 1, dy: 1},
      { dx: 1, dy: -1},
    ];
    for(let row = 0; row < this.rowSize; row++) {
      for(let col = 0; col < this.colSize; col++) {
        const field = this.board[row][col];
        if(!field.player || field.player !== this.currentPlayer) continue
        for(const { dx, dy } of direction) {
          let count = 1;
          for(let step = 1; step < 4; step++) {
            const newRow = row + dy * step;
            const newCol = col + dx * step;
            if(newRow < 0 || newRow >= this.rowSize || newCol < 0 || newCol >= this.colSize) break;
            if(this.board[newRow][newCol].player === this.currentPlayer) {
              count++;
            } else {
              break;
            }
          }
          if(count === 4) return true;
        }
      }
    }


    return false
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
