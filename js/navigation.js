import { translate } from "./i18n.js";

export function initializeNavigation() {
  const header = document.querySelector(".site-header");
  const brand = header?.querySelector(".brand");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (!header) {
    return;
  }

  let headerFrameRequested = false;

  const updateHeader = () => {
    headerFrameRequested = false;

    const scrollTop = Math.max(0, window.scrollY);
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const pageProgress = Math.min(1, scrollTop / maxScroll);

    header.classList.toggle("is-scrolled", scrollTop > 16);
    header.style.setProperty("--page-progress", pageProgress.toFixed(4));
    header.style.setProperty(
      "--page-progress-visible",
      scrollTop > 2 ? "1" : "0",
    );

    if (brand && !prefersReducedMotion.matches) {
      const walkProgress = Math.min(1, scrollTop / 220);
      const walkArc = Math.sin(walkProgress * Math.PI);

      brand.style.setProperty(
        "--brand-walk-x",
        `${(walkArc * 5).toFixed(2)}px`,
      );
      brand.style.setProperty(
        "--brand-walk-y",
        `${(walkArc * -2.25).toFixed(2)}px`,
      );
      brand.style.setProperty(
        "--brand-walk-rotation",
        `${(walkArc * 0.8).toFixed(2)}deg`,
      );
      brand.style.setProperty(
        "--brand-path-opacity",
        (0.18 + walkArc * 0.28).toFixed(3),
      );
    }
  };

  const requestHeaderUpdate = () => {
    if (headerFrameRequested) {
      return;
    }

    headerFrameRequested = true;
    requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderUpdate, { passive: true });

  if (!menuToggle || !mobileMenu) {
    return;
  }

  const mobileLinks = mobileMenu.querySelectorAll("a[href]");
  const desktopMedia = window.matchMedia("(min-width: 993px)");

  const isMenuOpen = () => menuToggle.getAttribute("aria-expanded") === "true";

  const updateMenuLabel = () => {
    menuToggle.setAttribute(
      "aria-label",
      translate(isMenuOpen() ? "Close navigation menu" : "Open navigation menu"),
    );
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    const wasOpen = isMenuOpen();

    menuToggle.setAttribute("aria-expanded", "false");
    updateMenuLabel();
    mobileMenu.classList.remove("is-open");
    mobileMenu.removeAttribute("data-open");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");

    if (restoreFocus && wasOpen && menuToggle.offsetParent !== null) {
      menuToggle.focus();
    }
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    updateMenuLabel();
    mobileMenu.hidden = false;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("data-open", "true");
    document.body.classList.add("menu-open");

    const firstLink = mobileMenu.querySelector("a[href]");
    firstLink?.focus();
  };

  menuToggle.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu({ restoreFocus: true }));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== "Tab" || !isMenuOpen()) {
      return;
    }

    const focusableElements = [menuToggle, ...mobileLinks];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (isMenuOpen() && !header.contains(event.target)) {
      closeMenu();
    }
  });

  const handleDesktopChange = (event) => {
    if (event.matches) {
      const wasOpen = isMenuOpen();
      closeMenu();

      if (wasOpen) {
        header.querySelector(".navbar > .nav-links a")?.focus();
      }
    }
  };

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", handleDesktopChange);
  } else {
    desktopMedia.addListener(handleDesktopChange);
  }

  window.addEventListener("pagehide", () => closeMenu());
  window.addEventListener("tutorings:languagechange", updateMenuLabel);
}
