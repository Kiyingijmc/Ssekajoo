"use strict";
//applying the faddding of the nav bar on mouse over
const fadded = function (e) {
  const itemslist = [...document.querySelectorAll(".nav-item")];
  const targe = e.target.closest(".nav-item");
  console.log(targe);
  if (itemslist.includes(targe)) {
    itemslist.forEach((el) => {
      const opacity = this;
      if (el !== targe && opacity) {
        el.classList.add("faded");
        targe
          .closest(".nav")
          .querySelector(".nav-logobox")
          .classList.add("faded");
      }
      if (!opacity) {
        el.classList.remove("faded");
        targe
          .closest(".nav")
          .querySelector(".nav-logobox")
          .classList.remove("faded");
      }
    });
    //targe.style.opacity = 1;
  }
};
const navfade = function () {
  const nav = document.querySelector(".nav");
  nav.addEventListener("mouseover", fadded.bind(1));
  nav.addEventListener("mouseout", fadded.bind(0));
};
//appling tab funcitionality

const tabsfunc = function () {
  const tabs = [...document.querySelectorAll(".tab-content-container")];
  const tabb = document.querySelectorAll(".tabs__tab");
  document.querySelector(".tabs").addEventListener("click", (e) => {
    e.preventDefault();
    const targe = e.target.closest(".tabs__tab");
    if (!targe) return;
    tabb.forEach((ta, i) => {
      ta.classList.remove("transup");
      //tabs.at(i).classList.remove("display");
    });
    tabs.forEach((el) => {
      el.classList.remove("display");
    });
    targe.classList.add("transup");

    const dd = targe.dataset.tab;
    document.querySelector(`.tab-content--${dd}`).classList.add("display");
    console.log(tabs);
  });
};
//calling functions
navfade();
tabsfunc();
