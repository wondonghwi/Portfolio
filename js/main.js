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
  scrollIntoView(link);
});

// Home Contact scroll
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', (e) => {
  scrollIntoView('#contact');
});

//Home Scroll down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//Arrow Btn
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//Handle Arrow up
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home')
});

//projects
const workBtnContainer = document.querySelector('.work__categories');
const porjectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  //span이 클릭 되었을때도 제대로 동작하기 위하여 parentNode 추가
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }
  console.log(filter)
  projects.forEach((project) => {
    if (filter === '*' || filter === project.dataset.type) {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');
    }
  });
});

//Common Function
const scrollIntoView = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"})
};
