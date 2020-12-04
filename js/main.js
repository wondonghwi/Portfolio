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
  navMenu.classList.remove('open');
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle btn
const barToggle = document.querySelector('.nav__toggle-btn');
barToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
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
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  //span이 클릭 되었을때도 제대로 동작하기 위하여 parentNode 추가
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  //Remove selection and activity
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON'
    ? e.target
    : e.target.parentNode
  target.classList.add('selected');

  // console.log(filter)
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});


//Common Function
const scrollIntoView = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
};

//Scroll관련 효과
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

