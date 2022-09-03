const droperSelection = document.querySelectorAll(".drop");
droperSelection.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.classList.contains("drop")
      ? e.target.nextElementSibling.classList.toggle("droperhide")
      : console.log("hiil");
    console.log(e.target);
  });
});

const navItem = document.querySelectorAll(".nav-drop");
navItem.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    if (!e.target.querySelector(".drop-container")) return;
    e.target
      .querySelector(`.drop-container[data-order="top"]`)
      ?.classList?.add("displaydrop");
    // if (!e.target.querySelector(".displaydrop")) return;
    // e.target;
    el.addEventListener("mouseout", (e) => {
      if (!e.target.closest(".nav-item")) return;
      e.target
        .querySelector(`.drop-container`)
        ?.classList.remove("displaydrop");
    });
  });
});

const droperHover = function (method) {
  if (!e.target.querySelector(".drop")) return;
  e.target
    .querySelector(`.drop-container[data-order="top"]`)
    .classList.method("displaydrop");
};
