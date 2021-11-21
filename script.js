"use strict"

const burgerBtn = document.querySelector('.burger-btn');
const primaryNavigation = document.querySelector('.primary-navigation');

burgerBtn.addEventListener("click", () => {
    
   const visiblity = primaryNavigation.getAttribute("data-visible");
   if (visiblity === "false") {
       primaryNavigation.setAttribute("data-visible", true);
       burgerBtn.setAttribute("aria-expanded", true);
   } else {
       primaryNavigation.setAttribute("data-visible", false);
       burgerBtn.setAttribute("aria-expanded", false);
   }
})
