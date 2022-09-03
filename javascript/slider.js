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
  ///////////
  ///////
  //giving slides bacground color
  const slidecall = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    //domcolor(entry.target);
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

  ///////////////
  //////////
  ///
  //auto sliding

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
///////////////
//////////
//////
//removing lazy class and displayong the image
const lazyloader = [...document.querySelectorAll(".lazy-img")];

const slideImgDis = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.target.classList.contains("slide_img")) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
  }
  entry.target.classList.remove("lazy-img");

  observer.unobserve(entry.target);
};
const obsOptions = (rot) => {
  const rote = document.querySelector(rot);
  const loadimg = new IntersectionObserver(slideImgDis, {
    root: rote,
    threshold: 0.1,
    //rootMargin: "-40px",
  });
  lazyloader.forEach((el) => {
    loadimg.observe(el);
  });
};

/*const loadimg = (rot)=>{new IntersectionObserver(
  slideImgDis,
  obsOptions(rot)
);
lazyloader.forEach((el) => {
  loadimg.observe(el);
});
}*/
//////////
//////
///
//removing the lazy class on vissible clips of the scroller one loading of the web page
const sli = document.querySelector(".scroller");
const sro = document.querySelectorAll(".scroll");

sro.forEach((el) => {
  if (
    sli.getBoundingClientRect().top + 50 < el.getBoundingClientRect().top &&
    sli.getBoundingClientRect().bottom + 50 > el.getBoundingClientRect().bottom
  ) {
    el.querySelector("img").classList.remove("lazy-img");
  }
});
//console.log(sli.getBoundingClientRect());
//console.log(sro.getBoundingClientRect());
////////
///
obsOptions(".scroller-content");
obsOptions(".slider__boxe-1");
obsOptions(".slider__boxe-2");
slinding(".slide", ".heading-slider", 3500);
slinding(".slide", ".sidebar-slider");
//console.log(lazyloader);
document.addEventListener("click", (e) => {
  if (!e.target.closest(".img-circle")) return;
  const imageCircle = e.target;
  imageCircle.src = imageCircle.dataset.src;
});

const sectionVanish = document.querySelectorAll("section");
sectionVanish.forEach((el) => {
  el.querySelector(".form-container")
    ? el.querySelector(".form-container").classList.add("form-away")
    : el;
  el.classList.add("section");
});

const sectionObs = new IntersectionObserver(
  (entries, observe) => {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section");
    entry.target.querySelector(".form-container")
      ? entry.target
          .querySelector(".form-container")
          .classList.remove("form-away")
      : entry.target;

    observe.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
    rootMargin: "-60px",
  }
);
sectionVanish.forEach((el) => {
  sectionObs.observe(el);
});
