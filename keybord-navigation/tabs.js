"use strict"

const tabList = document.querySelector('[role=tablist]');
const tabs = tabList.querySelectorAll('[role=tab]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach( (tab) => {
   tab.addEventListener('click', changeTabPanel);
})

function changeTabFocus(e) {

   if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      tabs[tabFocus].setAttribute('tabindex', -1);
   }

   if (e.key === "ArrowRight") {
      tabFocus++;
      if (tabFocus > tabs.length - 1) {
         tabFocus = 0;
      }
   }
   if (e.key === "ArrowLeft") {
      tabFocus--;
      if (tabFocus < 0) {
         tabFocus = tabs.length - 1;
      }
   }

   tabs[tabFocus].setAttribute('tabindex', 0);
   tabs[tabFocus].focus();
}

function changeTabPanel(e) {
   const chosenTab = e.target;
   const chosenTabAttribute = chosenTab.getAttribute('aria-controls');
   const chosenTabPicture = chosenTab.getAttribute('data-img');

   const chosenParent = chosenTab.parentNode;
   const commonParent = chosenParent.parentNode;

   hideContent(commonParent, '[role=tabpanel]');
   hideContent(commonParent, '[role=tabimg]');

   showContent(commonParent, `#${chosenTabAttribute}`);
   showContent(commonParent, `#${chosenTabPicture}`);

   commonParent.querySelector('[aria-selected=true]').setAttribute('aria-selected', false);
   chosenTab.setAttribute('aria-selected', true);
}

function hideContent(element, content) {
   element.querySelectorAll(content).forEach( (item) => {
      item.setAttribute('hidden', true);
   });
}

function showContent(element, content) {
   element.querySelector(content).removeAttribute('hidden');
}


