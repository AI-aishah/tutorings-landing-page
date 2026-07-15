import { initializeNavigation } from "./navigation.js";
import { initializeAnimations } from "./animations.js";
import { initializeSupportChat } from "./chatbot.js";
import { initializeI18n } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeI18n();
  initializeNavigation();
  initializeAnimations();
  initializeSupportChat();

  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
});
