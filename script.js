'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////////////////////////
/////////////////////////////////////////////
//SMOOTH SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//page delegation
tabsContainer.addEventListener('click', function (e) {
  //GOING UPWARDS
  //UISNG THE CLOSEST PROPERT HELPS TO ONLY BE ON TH EVENT OF BUTTON I.E EVEN WE CLICK ON THE SPAN ELEMENT THAT IS THE NUMBER IN THE BUTTON IT MOVES TO THE CLOSEST OPERATIONS_TAB SO THAT ONLY THE BUTTON OPERATION CAN BE PROCEEDED

  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //GUARD CLAUSE
  clicked.classList.add('operations__tab--active');
  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
/////////////////////////////////////////////////////
////////////////Menu Fade animation//////////////////
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///////////////////////////////////////////////////
////////////////Sticky Navigation////////////////////
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if ((this.window.scrollY = initialCoords.top)) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
/////////////////////////////////////////////////////////
/////////Sticky Navigation using IntersectionObserver////
// const obscallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsoptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obscallback, obsoptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
console.log(navheight);
const stickynav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);
////////////////////////////////////////////////////////
///////////////////Reveal Section/////////////////////
const allSections = document.querySelectorAll('.section');
const revealsection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
//////////////////////////////////////////////////////
////////////Lazy Loading Images//////////////////////
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
///////////////////////////////////////////////////////
//////////SliderImplementation/////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnleft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  let curslide = 0;
  const maxslide = slides.length;
  const gotoslide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4)';
  // slider.style.overflow = 'visible';
  const nextSlide = function () {
    if (curslide === maxslide - 1) {
      curslide = 0;
    } else {
      curslide++;
    }
    gotoslide(curslide);
    activateDot(curslide);
  };
  const prevslide = function () {
    if (curslide === 0) {
      curslide = maxslide - 1;
    } else {
      curslide--;
    }
    gotoslide(curslide);
    activateDot(curslide);
  };
  const init = function () {
    gotoslide(0);
    createDots();
    activateDot(0);
  };
  init();
  /////////Eventlisteners////////////////////////////
  btnRight.addEventListener('click', nextSlide);
  btnleft.addEventListener('click', prevslide);
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevslide();
    e.key === 'ArrowRight' && nextSlide(); //using shortcircuiting
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoslide(slide);
      activateDot(slide);
    }
  });
};
slider();

//PAGE NAVIGATION/////////////////////////////////////
/////////////////////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
///////////////EVENT DELEGATION//////////////////////
////////////////////////////////////////
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //MATCH STRATEGY
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////
//////////////////////////////////////////////////
console.log(document.documentElement);
console.log(document.header);
console.log(document.body);

console.log(document.querySelectorAll('section'));
// console.log(document.getElementById('section-1'));
const allbuttons = document.getElementsByTagName('button');
console.log(allbuttons);
const btnn = document.getElementsByClassName('btn');
console.log(btnn);
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we are cookies for improvemenets hepling .<button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message);

// header.append(message);
// //what if we need one nore to append at the down
// // header.append(message.cloneNode(true));
// // header.after(message);
// //Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });
/////////////////////////////////////////////////////
////////////////////////////////////////////////////
// styling
// message.style.backgroundColor = 'black';
// message.style.width = '120%';
// console.log(message.style.color);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// ///attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('designer'));
// //setAttribute
// logo.setAttribute('company', 'Banklist');
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
//Classes
// logo.classList.add();
// logo.classList.remove();
// ToggleEvent(), contains();
//////////////////////////////////////////////
///////////////////////////////////////////////
//smooth scrolling

////////////////////////////////////////////////////////
/////////////////////////////////////
// const h1 = document.querySelector('h1');
// const alerth1 = function (e) {
//   alert('You are reading the heading h1');
// };
// h1.addEventListener('mouseenter', alerth1);
// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//propagation:capturing and bubbling
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   // //stop propogation
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
// });
////////////////////////////////////////////////////
///////////////////////////////////////////////////
// const h1 = document.querySelector('h1');
////////Going down:child
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'black';
// h1.lastElementChild.style.color = 'orangered';
/////////////////////////GOING UPWARDS:parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('header').style.background = 'yellow';
// h1.closest('h1').style.background = 'white';
//////////////////////////GOING SIDEWAYA siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (h1 !== el) {
//     el.style.color = 'orangblack';
//   }
// });
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and Dom tree built', e);
});
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnvalue = '';
});
