import "./styles.css";

const REVEAL_SELECTOR = ".reveal-left, .reveal-right, .reveal-up, .reveal-down";
const ELEMENT_VISIBLE = 150;

let prevScrollpos = window.scrollY;
let timeFixed;
let activeMenu = 0;
let indexCarousel = 0;
let rafScrollId = 0;

const getEl = (id) => document.getElementById(id);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const threshold = windowHeight - ELEMENT_VISIBLE;
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.getBoundingClientRect().top < threshold) {
      el.classList.add("active");
    }
  });
};

const checkOnScroll = () => {
  const vh = document.documentElement.clientHeight;
  const childScroll = window.scrollY;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const mybutton = getEl("myBtn");
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

  revealOnScroll();

  const header = getEl("header");
  header.style.top = "0";
  const scrolled = height > 0 ? (childScroll / height) * 100 : 0;
  getEl("myBar").style.width = `${scrolled}%`;

  if (childScroll < vh) {
    header.style.top = "-60px";
  } else if (childScroll < prevScrollpos) {
    header.style.top = "-53px";
  } else {
    header.style.top = "0";
  }
  prevScrollpos = childScroll;

  const pageIds = [
    "welcome-page",
    "about-me-page",
    "experience-page",
    "projects-page",
    "hobbies-page",
    "contact-page",
  ];
  const listMenuPositions = pageIds.map((id) =>
    Math.abs(getEl(id).getBoundingClientRect().y)
  );
  const smallestNumber = Math.min(...listMenuPositions);
  const menuOptions =
    window.innerWidth <= 601
      ? document.getElementsByClassName("vertical-menu-option")
      : document.getElementsByClassName("menu-option");
  if (smallestNumber < 300 && menuOptions.length) {
    const newActiveMenu = listMenuPositions.indexOf(smallestNumber);
    if (
      newActiveMenu !== activeMenu &&
      menuOptions[activeMenu] &&
      menuOptions[newActiveMenu]
    ) {
      menuOptions[activeMenu].classList.remove("active-option");
      menuOptions[newActiveMenu].classList.add("active-option");
      activeMenu = newActiveMenu;
    }
  }
};

const onScroll = () => {
  if (rafScrollId) return;
  rafScrollId = requestAnimationFrame(() => {
    rafScrollId = 0;
    checkOnScroll();
  });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToElement = (id, closeMenu) => {
  if (closeMenu) {
    getEl("vertical-navbar").style.display = "none";
  }
  if (id === "home-page") {
    scrollToTop();
    return;
  }
  getEl(id).scrollIntoView({ behavior: "smooth" });
};

const slide = (direction) => {
  const sliderEl = getEl("slider");
  const maxIndex = sliderEl.children.length - 1;
  if (direction === "left") {
    if (indexCarousel === 0) return;
    indexCarousel -= 1;
  } else {
    if (indexCarousel === maxIndex) return;
    indexCarousel += 1;
  }

  sliderEl.style.transform = `translateX(-${indexCarousel}00%)`;

  const left = getEl("arrow-left");
  const right = getEl("arrow-right");
  const leftSpan = left.querySelector("span");
  const rightSpan = right.querySelector("span");

  if (indexCarousel === 0) {
    leftSpan.style.cursor = "default";
    left.style.opacity = "0";
    rightSpan.style.cursor = "pointer";
    right.style.opacity = "1";
  } else if (indexCarousel === maxIndex) {
    leftSpan.style.cursor = "pointer";
    left.style.opacity = "1";
    rightSpan.style.cursor = "default";
    right.style.opacity = "0";
  } else {
    leftSpan.style.cursor = "pointer";
    left.style.opacity = "1";
    rightSpan.style.cursor = "pointer";
    right.style.opacity = "1";
  }
};

const openVerticalMenu = () => {
  const navbar = getEl("vertical-navbar");
  navbar.style.display =
    navbar.style.display === "none" || !navbar.style.display
      ? "block"
      : "none";
};

const addFooterTekst = () => {
  getEl("footer-tekst").textContent = `@${new Date().getFullYear()} designed by Netfusion Łukasz Nitkowski`;
};

const init = () => {
  const loadingPage = getEl("loading-page");
  const logoContainer = getEl("logo-container");
  const nLogo = getEl("n-logo-start");

  nLogo.style.animation = "opacity010 1s forwards";
  logoContainer.style.transition = "3s";

  setTimeout(() => {
    const classes = [
      "first-child",
      "second-child",
      "third-child",
      "fourth-child",
    ];
    for (let i = 0; i < 4; i += 1) {
      logoContainer.children[i].classList.add(classes[i]);
    }
  }, 1000);

  setTimeout(() => {
    logoContainer.style.transform = "scale(5)";
  }, 2000);

  setTimeout(() => {
    loadingPage.classList.add("loading-page-hide");
    getEl("container").style.display = "block";
    checkOnScroll();
  }, 3000);

  setTimeout(() => {
    loadingPage.style.display = "none";
  }, 3500);
};

const bindUi = () => {
  getEl("logo-container").addEventListener("click", (e) => {
    e.preventDefault();
  });

  const container = getEl("container");
  container.addEventListener("click", (e) => {
    const scrollBtn = e.target.closest("[data-scroll]");
    if (scrollBtn) {
      scrollToElement(
        scrollBtn.dataset.scroll,
        scrollBtn.hasAttribute("data-close-menu")
      );
      return;
    }
    const actionEl = e.target.closest("[data-action]");
    if (actionEl && actionEl.dataset.action === "scroll-top") {
      scrollToTop();
      return;
    }
    const slideEl = e.target.closest("[data-slide-dir]");
    if (slideEl) {
      slide(slideEl.dataset.slideDir);
    }
  });

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target;
    if (t.matches("[data-scroll]")) {
      e.preventDefault();
      scrollToElement(t.dataset.scroll, t.hasAttribute("data-close-menu"));
    } else if (t.matches("[data-slide-dir]")) {
      e.preventDefault();
      slide(t.dataset.slideDir);
    } else if (t.matches("[data-action='scroll-top']")) {
      e.preventDefault();
      scrollToTop();
    }
  });

  getEl("menu-icon").addEventListener("click", openVerticalMenu);

  const sun = document.querySelector("#retrobg-sun");
  if (sun) {
    sun.addEventListener("click", () => {
      document.querySelector("#retrobg").classList.toggle("retrobg-shutdown");
    });
  }
};

window.addEventListener("load", () => {
  bindUi();
  init();
  addFooterTekst();
  window.addEventListener("scroll", onScroll, { passive: true });
});
