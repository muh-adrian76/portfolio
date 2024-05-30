/*=============== SHOW MENU ===============*/
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", function () {
    navMenu.classList.add("show-menu");
  });
}
/*=============== HIDE MENU ===============*/
if (navClose) {
  navClose.addEventListener("click", function () {
    navMenu.classList.remove("show-menu");
  });
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    navMenu.classList.remove("show-menu");
  });
});

/* ACCORDION SKILLS */
const skillsContent = document.getElementsByClassName(
    "skills-container-content"
  ),
  skillsHeader = document.querySelectorAll(".skills-container-header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills-container-content skills-close";
  }
  if (itemClass === "skills-container-content skills-close") {
    this.parentNode.className = "skills-container-content skills-open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/* QUALIFICATION TABS */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });
    tab.classList.add("qualification-active");
  });
});

/* SERVICES MODAL */
const modalViews = document.querySelectorAll(".services-modal"),
  modalBtns = document.querySelectorAll(".services-button"),
  modalCloses = document.querySelectorAll(".services-modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/* PORTFOLIO SWIPER  */
var swiperPortfolio = new Swiper(".portfolio-container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* TESTIMONIAL */
var swiperTestimonial = new Swiper(".testimonial-container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 50,

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/* CONTACT */
document
  .querySelector('a[href="#contact-name"]')
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("contact-name").focus();
  });

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const contactName = document.getElementById("contact-name");
  const contactEmail = document.getElementById("contact-email");
  const contactProject = document.getElementById("contact-project");
  const contactMessage = document.getElementById("contact-message");

  // Emailjs documentation: 'service-ID','template-ID','htmlForm-ID','accountPublicKey'
  emailjs
    .sendForm(
      "service_wrxd6eb",
      "template_ug8i6ja",
      contactForm,
      "KZr0b7798SEEDFJ6A"
    )
    .then(
      function () {
        contactMessage.textContent = "Message sent ✅";
        setTimeout(function () {
          contactMessage.textContent = "";
        }, 5000);
      },
      function (error) {
        alert("I'm sorry! Somehow something has failed...", error);
      }
    );

  contactName.value = "";
  contactEmail.value = "";
  contactProject.value = "";
});

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY || window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelectorAll(".nav-menu a[href*=" + sectionId + "]")
        .forEach((link) => {
          link.classList.add("active-link");
        });
    } else {
      document
        .querySelectorAll(".nav-menu a[href*=" + sectionId + "]")
        .forEach((link) => {
          link.classList.remove("active-link");
        });
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* CHANGE BACKGROUND HEADER */
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* SHOW SCROLL UP */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* DARK LIGHT THEME */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "ri-moon-clear-line"
    : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[
    selectedIcon === "ri-moon-clear-line" ? "add" : "remove"
  ](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "10px",
  duration: 2000,
  reset: true,
  viewOffset: {
    bottom: 50,
  },
});
sr.reveal(".home-img", { delay: 200 });
sr.reveal(".section-title", { delay: 200 });
sr.reveal(".section-subtitle", { delay: 200 });
sr.reveal(".qualification-container", { delay: 300 });
sr.reveal(".services-container", { delay: 300 });
sr.reveal(".portfolio-container", { delay: 300 });

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */
const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
});
srLeft.reveal(".home-data", { delay: 100 });
srLeft.reveal(".home-social", { delay: 300 });
srLeft.reveal(".about-container-img", { delay: 200 });
srLeft.reveal(".skills-left", { delay: 200 });
srLeft.reveal(".contact_left", { delay: 200 });

const srRight = ScrollReveal({
  origin: 'right',
  distance: "80px",
  duration: 2000,
  reset: true,
});
srRight.reveal(".about-container-data", { delay: 200 });
srRight.reveal(".skills-right", { delay: 100 });
srRight.reveal(".contact_right", { delay: 100 });
