const droperSelection = document.querySelectorAll(".drop");
droperSelection.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.classList.contains("drop") &&
      e.target
        .closest(".nav-drop")
        .querySelector(".drop-container")
        .classList.toggle("droperhide");
    // ? e.target.parentElement.parentElement.nextElementSibling.classList.add(
    //     "droperhide"
    //   )
    // : console.log("hiil");
    console.log(
      e.target.closest(".nav-drop").querySelector(".drop-container").classList
    );
  });
});

const navItem = document.querySelectorAll(".dropdown");
navItem.forEach((el) => {
  el.style.flexDirection = "column" && console.log(el.classList);

  el.addEventListener("mouseover", (e) => {
    e.target.closest(".dropdown") &&
      (el.style.flexDirection = "column") &&
      e.target
        .closest(".nav-drop")
        .querySelector(".drop-container")
        .classList.add("displaydrop");

    el.addEventListener("mouseout", (e) => {
      e.target.closest(".dropdown") &&
        !e.target
          .closest(".nav-drop")
          .querySelector(".drop-container")
          .classList.contains("droperhide") &&
        el.style.removeProperty("flex-direction") &&
        e.target
          .closest(".nav-drop")
          .querySelector(".drop-container")
          .classList.remove("displaydrop");
    });
  });
});

/*const droperHover = function (method) {
  if (!e.target.querySelector(".drop")) return;
  e.target
    .querySelector(`.drop-container[data-order="top"]`)
    .classList.method("displaydrop");
};
*/
