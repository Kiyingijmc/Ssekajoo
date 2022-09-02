"use strict";
// selecting random color
const rgbno = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);
const rgbcol = () => `rgb(${rgbno(255, 0)},${rgbno(255, 0)},${rgbno(255, 0)})`;

const domcolor = function (bcc) {
  bcc.style.backgroundColor = rgbcol();
};
//slider

const slinding = function (
  selector,
  parent = "body",
  itr = 2500,
  direction = "x"
) {
  const rt = document.querySelector(`${parent}`);
  //console.log(rt);
  const slide = [...rt.querySelectorAll(`${selector}`)];
  //console.log(slide);
  const slider = rt.querySelector(".slider");
  const right = rt.querySelector(".right");
  const left = rt.querySelector(".left");
  let cursld = 0;
  slide.forEach((sld, i) => {
    sld.style.transform = `translate${direction.toUpperCase()}(${i * 100}%)`;
  });

  const btn = document.querySelector(".btn");

  right.addEventListener("click", (e) => {
    if (e.target.closest(".btnArr"))
      if (cursld === slide.length - 1) {
        cursld = 0;
      } else cursld++;
    slide.forEach((sld, i) => {
      sld.style.transform = `translate${direction.toUpperCase()}(${
        100 * (i - cursld)
      }%)`;
    });
  });
  left.addEventListener("click", (e) => {
    //console.log(cursld);
    if (e.target.closest(".btnArr"))
      if (cursld === 0) {
        cursld = slide.length - 1;
      } else cursld--;
    slide.forEach((sld, i) => {
      sld.style.transform = `translate${direction.toUpperCase()}(${
        100 * (i - cursld)
      }%)`;
    });
  });
  const slidecall = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    domcolor(entry.target);
    console.log(entry);
    entry.target.style.opacity = 1;
  };
  const slideObserver = (callback) =>
    new IntersectionObserver(callback, {
      root: null,
      threshold: 0.05,
      rootMargin: "100px",
    });
  slide.forEach((el) => {
    slideObserver(slidecall).observe(el);
  });
  /*
  //  const slidev = slide.reduce((acc,mov)=>
  //  {mov.getPropertyValue('transform')==='translateX(0%)'? acc=mov : mov
  //  return acc;
  //  },0)*/

  let cx = 0;

  const sldintefuc = function () {
    slide.forEach((sld, i) => {
      sld.style.transform = `translate${direction.toUpperCase()}(${
        100 * (i - cursld)
      }%)`;
    });
    if (cursld === slide.length - 1) {
      cursld = -1;
    }
    cursld++;
  };
  const sldimter = () => setInterval(sldintefuc, itr);
  sldimter();
};
//removing lazy class and displayong the image
const lazyloader = [...document.querySelectorAll(".lazy-img")];
const slideImgDis = function (entries, observer) {
  const [entry] = entries;
  if (entry.target.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const loadimg = new IntersectionObserver(slideImgDis, {
  root: null,
  threshold: 0.25,
});
lazyloader.forEach((el) => {
  loadimg.observe(el);
});
slinding(".slide", ".heading-slider", 3500);
slinding(".slide", ".sidebar-slider");
console.log(lazyloader);
document.addEventListener("click", (e) => {
  if (!e.target.closest(".img-circle")) return;
  const imageCircle = e.target;
  imageCircle.src = imageCircle.dataset.src;
  imageCircle.addEventListener("load", () =>
    imageCircle.classList.remove("lazy-img")
  );
});
