"use strict"

window.onload = function() {
   document.querySelector('#rollBtn').addEventListener('click', controller.rollDice);
   document.querySelector('#resetBtn').addEventListener('click', controller.resetGame);

   document.querySelector('#drawRoll').addEventListener('click', controller.drawRollDice);
   document.querySelector('#drawClose').addEventListener('click', function() {
      document.querySelector('.draw').style.display="none";
   })

   document.querySelector('#twoPlayersBtn').addEventListener('click', model.start2Players);
   document.querySelector('#threePlayersBtn').addEventListener('click', model.start3Players);
   document.querySelector('#fourPlayersBtn').addEventListener('click', model.start4Players);
   document.querySelector('#fivePlayersBtn').addEventListener('click', model.start5Players);
}

let view = {

   displayResult: function(player) {
      const diceList = document.getElementsByClassName('dice');
      diceList[player].innerHTML = model.players[player].dice;
      this.displayShade(diceList, player)
   },

   displayShade: function(list, player) {
      let nextPlayer = player + 1;
      for (let i = 0; i < model.players.length; i++) {
         list[i].removeAttribute('role');
      }
      if (nextPlayer < model.players.length) {
         list[nextPlayer].setAttribute('role', 'active');
      } else {
         list[0].setAttribute('role', 'active');
      }
   },

   displayScore: function(player) {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      scoreboardList[player].innerHTML = model.players[player].score;
      this.displayMessage(playerTurn(), controller.roundNum);
   },

   displayMessage: function(playerNum, roundNum) {
      document.querySelector('#message').innerHTML = `Player ${playerNum} Turn`;
      document.querySelector('#roundEl').innerHTML = `Round # ${roundNum}`;
   },

   displayVictoryMessage: function(winner) {
      document.querySelector('#message').innerHTML = `Congrats! Player ${winner + 1} won!`;
   },

   renderDrawGround: function(winners, message) {
      const drawEl = document.querySelector('.draw');
      const messageEl = document.querySelector('#drawMessage');

      messageEl.innerHTML = message;
      drawEl.style.display="flex";
      renderContent(winners);
   },

   displayDrawDices: function() {
      const drawDiceList = document.getElementsByClassName('draw__dice');
      for (let i = 0; i < drawDiceList.length; i++) {
         if (controller.winnersScores[i]) {
            drawDiceList[i].innerHTML = controller.winnersScores[i];
         }
      }
      return drawDiceList.length;
   },

   displayDrawWinner: function(winners, drawWinnerNum) {
      const drawMessage = document.querySelector('#drawMessage');
      drawMessage.innerHTML = `Winner is Player # ${winners[drawWinnerNum] + 1}`;
      document.querySelector('#message').innerHTML = `Winner is Player # ${winners[drawWinnerNum] + 1}`;
   }

};

//
//    end of view object
//

let model = {

   players: [
      {score: 0, dice: 0},
      {score: 0, dice: 0},
   ],

   getRandomNum: function() {
      return Math.floor(Math.random() * 6 + 1);
   },

   sumPlayerScore: function(player) {
      let dice = this.getRandomNum();
      this.players[player].dice = dice;
      this.players[player].score += dice;
   },

   countPlayerTurn: function() {
      let playerNum = 1;
      function counter() {
         if (playerNum < model.players.length) {
            playerNum++;
         } else {
            playerNum = 1;
         }
         return playerNum;
      }
      return counter;
   },

   checkScore: function() {
      for (let i = 0; i < this.players.length; i++) {
         let player = this.players[i];
         if (player.score >= 20) {
            return true;
         }
      }
      return false;
   },

   manageVictory: function() {
      const rollBtn = document.querySelector('#rollBtn');
      const resetBtn = document.querySelector('#resetBtn');
      let playerScores = collectScores();
      defineWinnerName(playerScores, checkWinner(playerScores));
      controller.changeButton(rollBtn, resetBtn);
      controller.roundNum--;
   },

   // set up the number of players

   start2Players: function() {
      document.querySelector('.overlay').style.display="none";
   },
   start3Players: function() {
      document.querySelector('.overlay').style.display="none";
      document.querySelector('#player3').style.display="block";
      model.players.push({score: 0, dice: 0});
   },
   start4Players: function() {
      document.querySelector('.overlay').style.display="none";
      for (let i = 3; i < 5; i++) {
         document.querySelector(`#player${i}`).style.display="block";
      }
      model.players.push(
         {score: 0, dice: 0}, 
         {score: 0, dice: 0}
      );
   },
   start5Players: function() {
      document.querySelector('.overlay').style.display="none";
      for (let i = 3; i < 6; i++) {
         document.querySelector(`#player${i}`).style.display="block";
      }
      model.players.push(
         {score: 0, dice: 0}, 
         {score: 0, dice: 0},
         {score: 0, dice: 0}
      );
   }
};
let playerTurn = model.countPlayerTurn();

// 
//    end of model object
// 

let controller = {

   player: 0,
   clicks: 0,
   roundNum: 1,
   winnersScores: [],
   winners: [],

   countClicks: function() {
      this.clicks++;
      this.manageClicks();
   },

   manageClicks: function() {
      let hitScore = model.checkScore();
      if (this.clicks === model.players.length && hitScore) {
         model.manageVictory();
      }
      if (this.clicks === model.players.length) {
         this.roundNum++;
         document.querySelector('#roundEl').innerHTML = `Round # ${this.roundNum}`;
         this.clicks = 0;
      }
   },

   rollDice: function() {
      model.sumPlayerScore(controller.player);
      view.displayResult(controller.player);
      view.displayScore(controller.player);
      controller.changePlayer();
      controller.countClicks();
   },

   changePlayer: function() {
      if (this.player < (model.players.length - 1)) {
         this.player++;
      } else {
         this.player = 0;
      }
   },

   changeButton: function(hideBtn, showBtn) {
      hideBtn.style.display = "none";
      showBtn.style.display = "block";
   },

   resetGame: function() {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      const diceList = document.getElementsByClassName('dice');
      const rollBtn = document.querySelector('#rollBtn');
      const resetBtn = document.querySelector('#resetBtn');
      // const drawEl = document.querySelector('.draw');
      const drawPlayers = document.querySelector('#drawPlayers');

      for (let i = 0; i < model.players.length; i++) {
         model.players[i].score = 0;
         scoreboardList[i].innerHTML = 0;
         diceList[i].innerHTML = `-`;
      }
      document.querySelector('#message').innerHTML = `Player 1 Turn`;
      document.querySelector('#roundEl').innerHTML = `Round # 1`;

      controller.clicks = 0;
      controller.roundNum = 1;
      controller.player = 0;
      controller.changeButton(resetBtn, rollBtn);
      controller.winnersScores = [];
      controller.winners = [];
      drawPlayers.innerHTML = '';
      renderContent(controller.winners);
      controller.changeButton(
         document.querySelector('#drawClose'),
         document.querySelector('#drawRoll')
      );
   },

   drawRollDice: ()=> {
      const drawRoll = document.querySelector('#drawRoll');
      const drawClose = document.querySelector('#drawClose');
      const drawPlayers = document.querySelector('#drawPlayers');

      let dice = model.getRandomNum();
      let drawWinnerNum = 0;
      let winners = controller.winners;

      controller.winnersScores.push(dice);
      let winnersQuantity = view.displayDrawDices();

      if (winnersQuantity === controller.winnersScores.length) {
         controller.changeButton(drawRoll, drawClose);
         drawWinnerNum = defineWinnerName(
            controller.winnersScores, 
            checkWinner(controller.winnersScores)
         );
         view.displayDrawWinner(winners, drawWinnerNum);
      }

      if (drawWinnerNum.length > 1) {
         drawPlayers.innerHTML = '';
         renderContent(winners);
         view.displayDrawDices();
         drawNoWinnerMessage(winners);         
      }
   }

};

// auxiliary functions

function collectScores() {
   let playerScores = [];
   for (let i = 0; i < model.players.length; i++) {
      playerScores.push(model.players[i].score);
   }
   return playerScores;
}
function checkWinner(scores) {
   let bestScore = 0;
   for (let i = 0; i < scores.length; i++) {
      if (scores[i] > bestScore) {
         bestScore = scores[i];
      }
   }
   return bestScore;
}
function defineWinnerName(scores, best) {
   let winnerNumber = 0;
   let winners = checkDraw(scores, best);
   if (winners.length < 2) {
      for (let i = 0; i < scores.length; i++) {
         if (best === scores[i]) {
            winnerNumber = i;
         }
      }
      view.displayVictoryMessage(winnerNumber);
      return winnerNumber;
   } else {
      view.renderDrawGround(winners, 'Each Player has only one try');
      return winners;
   }
}
function checkDraw(scores, best) {
   let indices = [];
   let idx = scores.indexOf(best);
   while (idx !== -1) {
      indices.push(idx);
      idx = scores.indexOf(best, idx + 1);
   }
   controller.winners = indices;
   return indices
}
function renderContent(winners) {
   const drawPlayers = document.querySelector('#drawPlayers');
   let content = '';

   for (let i = 0; i < winners.length; i++) {
      let playerNum = winners[i] + 1;
      content = ` 
         <div id="player" class="playerEl">
               <h2>Player 
                  <span>${playerNum}</span>
               </h2>
            <div id="playerDice" class="draw__dice" role="active">-</div>
         </div>
      `;
      drawPlayers.innerHTML += content;
   }
}
function drawNoWinnerMessage(winners) {
   let content = '';
   let mainContent = '';
   let winnersNames = [];
   const drawMessage = document.querySelector('#drawMessage');
   for (let i = 0; i < winners.length; i++) {
      winnersNames.push(winners[i] + 1);
      content = `No Winner! Players # ${winnersNames} have same scores`;
      drawMessage.innerHTML = content;
      mainContent = `No Winner! Players # ${winnersNames} have same scores`;
      document.querySelector('#message').innerHTML = mainContent;
   }
}

