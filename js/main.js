'use strict'

//Make navbar the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//Handle Scrolling
const navMenu = document.querySelector('.nav__menu');
navMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (!link) {
    return;
  }
  // console.log(link);
  scrollTo(link);
});

// Home Contact scroll
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', (e) => {
  scrollTo('#contact');
});

//Common Function
const scrollTo = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"})
};
