let prevScrollpos = window.scrollY;
let timeFixed;
let activeMenu = 0;
let indexCarousel = 0;

const getEl = (id) => document.getElementById(id);

const init = () => {
  const loadingPage = getEl("loading-page");
  const logoContainer = getEl("logo-container");
  const nLogo = getEl("n-logo-start");

  nLogo.style.animation = "opacity010 1s forwards";
  logoContainer.style.transition = "3s";

  setTimeout(() => {
    logoContainer.children[0].classList.add("first-child");
    logoContainer.children[1].classList.add("second-child");
    logoContainer.children[2].classList.add("third-child");
    logoContainer.children[3].classList.add("fourth-child");
  }, 1000); ///1000

  setTimeout(() => {
    logoContainer.style.transform = "scale(5)";
  }, 2000); ///2000

  setTimeout(() => {
    loadingPage.classList.add("loading-page-hide");
    const container = getEl("container");
    container.style.display = "block";
    checkOnScroll();
  }, 3000); ///3000

  setTimeout(() => {
    loadingPage.style.display = "none";
  }, 3500); ///3500
};

window.onload = () => {
  init();
  addFooterTekst();
};

window.onscroll = function () {
  checkOnScroll();
};

const checkOnScroll = () => {
  const vh = document.documentElement.clientHeight;
  const childScroll = window.scrollY;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var mybutton = getEl("myBtn");
  if (timeFixed) {
    clearTimeout(timeFixed);
  }
  if (childScroll > 20) {
    mybutton.style.display = "block";
    mybutton.style.animation = "opacity010 1s forwards";
  } else {
    mybutton.style.animation = "opacity101 1s forwards";
    timeFixed = setTimeout(() => {
      mybutton.style.display = "none";
    }, 1000);
  }

  const revealsLeft = document.querySelectorAll(".reveal-left");
  const revealsRight = document.querySelectorAll(".reveal-right");
  const revealsUp = document.querySelectorAll(".reveal-up");
  const revealsDown = document.querySelectorAll(".reveal-down");
  if (revealsLeft) {
    for (let i = 0; i < revealsLeft.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsLeft[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsLeft[i].classList.add("active");
      }
    }
  }
  if (revealsRight) {
    for (let i = 0; i < revealsRight.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsRight[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsRight[i].classList.add("active");
      }
    }
  }
  if (revealsUp) {
    for (let i = 0; i < revealsUp.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsUp[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsUp[i].classList.add("active");
      }
    }
  }
  if (revealsDown) {
    for (let i = 0; i < revealsDown.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsDown[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsDown[i].classList.add("active");
      }
    }
  }

  getEl("header").style.top = "0";
  const scrolled = (childScroll / height) * 100;
  getEl("myBar").style.width = scrolled + "%";

  if (childScroll < vh) {
    getEl("header").style.top = "-60px";
  } else if (childScroll < prevScrollpos) {
    getEl("header").style.top = "-53px";
  } else {
    getEl("header").style.top = "0";
  }
  prevScrollpos = childScroll;
  const home = getEl("welcome-page").getBoundingClientRect().y;
  const about = getEl("about-me-page").getBoundingClientRect().y;
  const exp = getEl("experience-page").getBoundingClientRect().y;
  const projects = getEl("projects-page").getBoundingClientRect().y;
  const hobbies = getEl("hobbies-page").getBoundingClientRect().y;
  const contact = getEl("contact-page").getBoundingClientRect().y;
  const listMenuPositions = [home, about, exp, projects, hobbies, contact].map(
    (x) => Math.abs(x)
  );
  const smallestNumber = Math.min.apply(null, listMenuPositions);
  const menuOptions =
    window.screen.width <= 601
      ? document.getElementsByClassName("vertical-menu-option")
      : document.getElementsByClassName("menu-option");
  if (smallestNumber < 300) {
    const newActiveMenu = listMenuPositions.indexOf(smallestNumber);
    menuOptions[activeMenu].classList.remove("active-option");
    menuOptions[newActiveMenu].classList.add("active-option");
    activeMenu = newActiveMenu;
  }
};

const scrollToElement = (id, isMobileOption) => {
  if (isMobileOption) {
    const nav = getEl("vertical-navbar");
    nav.style.display = "none";
  }
  if (id === "home-page") {
    scrollToTop();
    return;
  }
  const choosenEl = getEl(id);
  choosenEl.scrollIntoView({ behavior: "smooth" });
};

const slide = (direction) => {
  if (direction === "left") {
    if (indexCarousel === 0) {
      return;
    }
    indexCarousel--;
  } else {
    if (indexCarousel === 4) {
      return;
    }
    indexCarousel++;
  }

  document.getElementById(
    "slider"
  ).style.transform = `translateX(-${indexCarousel}00%)`;

  if (indexCarousel === 0) {
    document.getElementById("arrow-left").querySelector("span").style.cursor =
      "default";
    document.getElementById("arrow-left").style.opacity = "0";
    document.getElementById("arrow-right").querySelector("span").style.cursor =
      "pointer";
    document.getElementById("arrow-right").style.opacity = "1";
  } else if (indexCarousel === 4) {
    document.getElementById("arrow-left").querySelector("span").style.cursor =
      "pointer";
    document.getElementById("arrow-left").style.opacity = "1";
    document.getElementById("arrow-right").querySelector("span").style.cursor =
      "default";
    document.getElementById("arrow-right").style.opacity = "0";
  } else {
    document.getElementById("arrow-left").querySelector("span").style.cursor =
      "pointer";
    document.getElementById("arrow-left").style.opacity = "1";
    document.getElementById("arrow-right").querySelector("span").style.cursor =
      "pointer";
    document.getElementById("arrow-right").style.opacity = "1";
  }
};

const scrollToTop = () => {
  const child = window;
  child.scrollTo({ top: 0, behavior: "smooth" });
};

const openVerticalMenu = () => {
  const navbar = document.getElementById("vertical-navbar");
  if (navbar.style.display === "none" || !navbar.style.display) {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
};

const addFooterTekst = () => {
  let footerTekst = getEl("footer-tekst");
  footerTekst.innerText = `@${new Date().getFullYear()} designed by Netfusion Łukasz Nitkowski`;
};

document.querySelector("#retrobg-sun").onclick = () => {
  document.querySelector("#retrobg").classList.toggle("retrobg-shutdown");
};
