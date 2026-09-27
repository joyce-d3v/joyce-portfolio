/* =========================================================
   PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     ELEMENTS
  ------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const sections = document.querySelectorAll("main section[id]");

  const revealElements = document.querySelectorAll(".reveal");


  /* -------------------------------------------------------
     MOBILE NAVIGATION
  ------------------------------------------------------- */

  if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = menuToggle.classList.toggle("active");

      mobileNav.classList.toggle("open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      mobileNav.setAttribute("aria-hidden", String(!isOpen));

      document.body.classList.toggle("menu-open", isOpen);

    });


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        mobileNav.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");

      });

    });

  }


  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* -------------------------------------------------------
     ACTIVE NAVIGATION
  ------------------------------------------------------- */

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const currentId = entry.target.getAttribute("id");

          navLinks.forEach((link) => {

            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === `#${currentId}`
            );

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* -------------------------------------------------------
     HEADER SHADOW ON SCROLL
  ------------------------------------------------------- */

  const header = document.querySelector(".site-header");

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 20) {
      header.style.boxShadow = "0 10px 35px rgba(0, 0, 0, 0.18)";
    } else {
      header.style.boxShadow = "none";
    }

  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* -------------------------------------------------------
     CLOSE MOBILE MENU WITH ESCAPE
  ------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
      return;
    }

    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.classList.remove("active");

    mobileNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    mobileNav.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");

  });


  /* -------------------------------------------------------
     EXTERNAL LINKS
  ------------------------------------------------------- */

  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );

  externalLinks.forEach((link) => {

    link.addEventListener("click", () => {
      link.blur();
    });

  });

});
