import "./styles.css";
import {
  hobbiesSlides,
  themaBlocks,
  skillRows,
  experienceRows,
  projectRows,
} from "./content-config.js";
import {
  retroStars,
  retroBuildings,
  RETRO_VLINE_COUNT,
  RETRO_HLINE_COUNT,
} from "./retro-scene-config.js";

const REVEAL_SELECTOR = ".reveal-left, .reveal-right, .reveal-up, .reveal-down";
const ELEMENT_VISIBLE = 150;

let prevScrollpos = window.scrollY;
let timeFixed;
let activeMenu = 0;
let indexCarousel = 0;
let rafScrollId = 0;

const getEl = (id) => document.getElementById(id);

const renderRetroScene = () => {
  const starsEl = getEl("retrobg-stars");
  if (!starsEl) return;
  starsEl.replaceChildren();
  retroStars.forEach((s) => {
    const el = document.createElement("div");
    el.className = "retrobg-star";
    el.style.left = `${s.left}%`;
    el.style.top = `${s.top}%`;
    el.style.transform = `scale(${s.scale})`;
    starsEl.appendChild(el);
  });

  const cityEl = getEl("retrobg-city");
  if (cityEl) {
    cityEl.replaceChildren();
    retroBuildings.forEach((b) => {
      const el = document.createElement("div");
      el.className = b.antenna
        ? "retrobg-building retrobg-antenna"
        : "retrobg-building";
      el.style.left = `${b.left}%`;
      el.style.height = `${b.height}%`;
      el.style.width = `${b.width}%`;
      cityEl.appendChild(el);
    });
  }

  const vlinesEl = getEl("retrobg-vlines");
  if (vlinesEl) {
    vlinesEl.replaceChildren();
    for (let i = 0; i < RETRO_VLINE_COUNT; i += 1) {
      const el = document.createElement("div");
      el.className = "retrobg-vline";
      vlinesEl.appendChild(el);
    }
  }

  const hlinesEl = getEl("retrobg-hlines");
  if (hlinesEl) {
    hlinesEl.replaceChildren();
    for (let i = 0; i < RETRO_HLINE_COUNT; i += 1) {
      const el = document.createElement("div");
      el.className = "retrobg-hline";
      hlinesEl.appendChild(el);
    }
  }
};

const renderHobbiesSlides = () => {
  const slider = getEl("slider");
  slider.replaceChildren();
  hobbiesSlides.forEach((item) => {
    const wrap = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    const p = document.createElement("p");
    p.textContent = item.text;
    wrap.appendChild(h3);
    wrap.appendChild(p);
    slider.appendChild(wrap);
  });
};

const renderThemaBlocks = () => {
  const root = getEl("thema-container");
  root.replaceChildren();
  themaBlocks.forEach((b) => {
    const block = document.createElement("div");
    block.className = b.blockClass;
    const a = document.createElement("a");
    a.href = b.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    const img = document.createElement("img");
    img.src = b.image;
    img.className = "about-image";
    img.alt = "";
    if (b.imageStyle) img.setAttribute("style", b.imageStyle);
    const h3 = document.createElement("h3");
    h3.textContent = b.title;
    const p = document.createElement("p");
    p.textContent = b.text;
    block.appendChild(a);
    block.appendChild(img);
    block.appendChild(h3);
    block.appendChild(p);
    root.appendChild(block);
  });
};

const renderSkillRows = () => {
  const mount = getEl("skills-rows-mount");
  mount.replaceChildren();
  skillRows.forEach((row) => {
    const rs = document.createElement("div");
    rs.className = "row-skill";
    const st = document.createElement("div");
    st.className = "skill-type";
    const pLabel = document.createElement("p");
    if (row.smallerFont) pLabel.className = "smaller-font";
    pLabel.textContent = row.label;
    st.appendChild(pLabel);
    const fill = document.createElement("div");
    fill.className = "fill-skill";
    const bar = document.createElement("div");
    bar.id = row.barId;
    bar.className = "skill-bar-fill";
    bar.style.width = row.percent;
    fill.appendChild(bar);
    const pct = document.createElement("div");
    pct.className = "percentage-skill";
    const pPct = document.createElement("p");
    pPct.textContent = row.percent;
    pct.appendChild(pPct);
    rs.appendChild(st);
    rs.appendChild(fill);
    rs.appendChild(pct);
    mount.appendChild(rs);
  });
};

const renderAlternatingRows = (containerId, rows) => {
  const root = getEl(containerId);
  root.replaceChildren();
  rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row-block-experience";
    const fake = document.createElement("div");
    fake.className = "fake-block-experience";
    const sideClass =
      row.side === "left"
        ? "left-block-experience reveal-left"
        : "right-block-experience reveal-right";
    const content = document.createElement("div");
    content.className = sideClass;
    const h3 = document.createElement("h3");
    h3.textContent = row.title;
    content.appendChild(h3);
    row.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      content.appendChild(p);
    });
    if (row.side === "left") {
      rowEl.appendChild(content);
      rowEl.appendChild(fake);
    } else {
      rowEl.appendChild(fake);
      rowEl.appendChild(content);
    }
    root.appendChild(rowEl);
  });
};

const mountSiteContent = () => {
  renderRetroScene();
  renderHobbiesSlides();
  renderThemaBlocks();
  renderSkillRows();
  renderAlternatingRows("info-block-experience", experienceRows);
  renderAlternatingRows("info-block-projects", projectRows);
  indexCarousel = 0;
  getEl("slider").style.transform = "translateX(-0%)";
  updateCarouselChrome();
};

const updateCarouselChrome = () => {
  const sliderEl = getEl("slider");
  const maxIndex = Math.max(0, sliderEl.children.length - 1);
  const left = getEl("arrow-left");
  const right = getEl("arrow-right");
  const leftSpan = left.querySelector("span");
  const rightSpan = right.querySelector("span");
  if (!leftSpan || !rightSpan || maxIndex === 0) return;

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
  if (maxIndex < 0) return;
  if (direction === "left") {
    if (indexCarousel === 0) return;
    indexCarousel -= 1;
  } else {
    if (indexCarousel === maxIndex) return;
    indexCarousel += 1;
  }

  sliderEl.style.transform = `translateX(-${indexCarousel}00%)`;
  updateCarouselChrome();
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
  mountSiteContent();
  bindUi();
  init();
  addFooterTekst();
  window.addEventListener("scroll", onScroll, { passive: true });
});
