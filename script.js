"use strict";

const gridEl = document.querySelector('.gridEl');

let grid = [];


function renderGrid() {
   for (let i = 0; i < 100; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      gridEl.append(square);
      grid.push(square);
   }
}
renderGrid();