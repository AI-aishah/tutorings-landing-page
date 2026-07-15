import {
  formatMessage,
  getLanguage,
  setLocalizedText,
  translate,
} from "./i18n.js";

export function initializeAnimations() {
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.classList.add("is-animated");
    initializeHeroLens(hero);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.classList.add("is-ready");
      });
    });
  }

  initializeRecognition();
  initializePrograms();
  initializeTimeline();
  initializeHowItWorks();
  initializeWhyTutorings();
  initializeTestimonialMarquee();
  initializeFutureVision();
  initializeFinalCta();
  initializeContentSections();
}

function initializeTestimonialMarquee() {
  const track = document.querySelector("[data-marquee-track]");
  const sourceGroup = track?.querySelector(
    ".testimonial-marquee-group:not([data-marquee-clone])",
  );

  if (!track || !sourceGroup) {
    return;
  }

  const appendThirdGroup = () => {
    track.querySelectorAll("[data-marquee-clone]").forEach((clone) => {
      clone.remove();
    });

    const clone = sourceGroup.cloneNode(true);
    clone.dataset.marqueeClone = "";
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("inert", "");
    track.append(clone);
    track.classList.add("has-three-groups");
  };

  appendThirdGroup();
  window.addEventListener("tutorings:languagechange", appendThirdGroup);
}

function initializePrograms() {
  const section = document.querySelector("#programs");
  const chooser = section?.querySelector("[data-program-chooser]");

  if (!section || !chooser) {
    return;
  }

  const cards = Array.from(section.querySelectorAll("[data-program-card]"));
  const quiz = chooser.querySelector("[data-program-quiz]");
  const quizTrigger = chooser.querySelector("[data-program-quiz-trigger]");
  const quizClose = chooser.querySelector("[data-program-quiz-close]");
  const quizBack = chooser.querySelector("[data-program-quiz-back]");
  const quizSteps = Array.from(
    chooser.querySelectorAll("[data-program-quiz-step]"),
  );
  const quizProgress = chooser.querySelector("[data-program-quiz-progress]");
  const quizMeter = chooser.querySelector("[data-program-quiz-meter]");
  const quizResult = chooser.querySelector("[data-program-quiz-result]");
  const resultName = chooser.querySelector("[data-program-result-name]");
  const resultReason = chooser.querySelector("[data-program-result-reason]");
  const showResult = chooser.querySelector("[data-program-show-result]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const programs = {
    general: {
      name: "General English",
      reason:
        "A flexible CEFR-based journey is the clearest match for building your complete English level.",
    },
    ielts: {
      name: "IELTS Preparation",
      reason:
        "A structured four-skill plan will keep your preparation focused on the band score you need.",
    },
    step: {
      name: "STEP Simplified",
      reason:
        "Focused strategies and exam-style practice are the most direct route to your STEP goal.",
    },
  };
  const answers = [];
  let recommendedProgram = "general";
  let currentQuizStep = 0;
  let recommendationTimer;

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-path-visible"));
  } else {
    const pathObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-path-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.28 },
    );

    cards.forEach((card) => pathObserver.observe(card));
  }

  const closeQuiz = ({ restoreFocus = false } = {}) => {
    if (!quiz || !quizTrigger) {
      return;
    }

    quiz.hidden = true;
    quizTrigger.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      quizTrigger.focus();
    }
  };

  const showQuizStep = (stepIndex) => {
    currentQuizStep = Math.min(
      quizSteps.length - 1,
      Math.max(0, stepIndex),
    );
    quizSteps.forEach((step, index) => {
      step.hidden = index !== currentQuizStep;
    });
    if (quizResult) {
      quizResult.hidden = true;
    }
    if (quizProgress) {
      quizProgress.textContent = formatMessage("quizProgress", {
        current: currentQuizStep + 1,
        total: quizSteps.length,
      });
    }
    if (quizMeter) {
      quizMeter.style.width = `${((currentQuizStep + 1) / quizSteps.length) * 100}%`;
    }
    if (quizBack) {
      quizBack.hidden = currentQuizStep === 0;
    }
  };

  const calculateRecommendation = () => {
    const scores = { general: 0, ielts: 0, step: 0 };

    answers.forEach((answer) => {
      answer?.split(",").forEach((score) => {
        const [program, value] = score.split(":");
        if (program in scores) {
          scores[program] += Number.parseInt(value, 10) || 0;
        }
      });
    });

    return Object.entries(scores).reduce((best, entry) =>
      entry[1] > best[1] ? entry : best,
    )[0];
  };

  const showQuizResult = () => {
    recommendedProgram = calculateRecommendation();
    quizSteps.forEach((step) => {
      step.hidden = true;
    });
    if (quizResult) {
      quizResult.hidden = false;
    }
    if (quizProgress) {
      quizProgress.textContent = translate("Recommendation ready");
    }
    if (quizMeter) {
      quizMeter.style.width = "100%";
    }
    if (quizBack) {
      quizBack.hidden = false;
    }
    if (resultName) {
      setLocalizedText(resultName, programs[recommendedProgram].name);
    }
    if (resultReason) {
      setLocalizedText(resultReason, programs[recommendedProgram].reason);
    }
  };

  quizTrigger?.addEventListener("click", () => {
    const shouldOpen = quiz?.hidden ?? false;

    if (!shouldOpen) {
      closeQuiz({ restoreFocus: true });
      return;
    }

    answers.length = 0;
    quizSteps.forEach((step) => {
      step.querySelectorAll("[data-program-quiz-option]").forEach((option) => {
        option.classList.remove("is-selected");
      });
    });
    quiz.hidden = false;
    quizTrigger.setAttribute("aria-expanded", "true");
    showQuizStep(0);
    quizSteps[0]?.querySelector("button")?.focus();
  });

  quizClose?.addEventListener("click", () => closeQuiz({ restoreFocus: true }));
  quiz?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQuiz({ restoreFocus: true });
    }
  });

  quizSteps.forEach((step, stepIndex) => {
    step.querySelectorAll("[data-program-quiz-option]").forEach((option) => {
      option.addEventListener("click", () => {
        answers[stepIndex] = option.dataset.programScores ?? "";
        step.querySelectorAll("[data-program-quiz-option]").forEach((item) => {
          item.classList.toggle("is-selected", item === option);
        });

        if (stepIndex < quizSteps.length - 1) {
          showQuizStep(stepIndex + 1);
          quizSteps[stepIndex + 1]?.querySelector("button")?.focus();
        } else {
          showQuizResult();
          showResult?.focus();
        }
      });
    });
  });

  quizBack?.addEventListener("click", () => {
    if (quizResult && !quizResult.hidden) {
      showQuizStep(quizSteps.length - 1);
      return;
    }

    showQuizStep(currentQuizStep - 1);
  });

  showResult?.addEventListener("click", () => {
    const card = cards.find(
      (item) => item.dataset.programCard === recommendedProgram,
    );

    if (!card) {
      return;
    }

    closeQuiz();
    card.classList.remove("is-recommended");
    void card.offsetWidth;
    card.classList.add("is-recommended");
    card.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "center",
    });

    window.clearTimeout(recommendationTimer);
    recommendationTimer = window.setTimeout(() => {
      card.classList.remove("is-recommended");
    }, 2200);
  });

  window.addEventListener("tutorings:languagechange", () => {
    if (quizResult && !quizResult.hidden) {
      showQuizResult();
    } else {
      showQuizStep(currentQuizStep);
    }
  });
}

function initializeFutureVision() {
  const section = document.querySelector("#future");
  const cards = Array.from(
    section?.querySelectorAll("[data-outcome-card]") ?? [],
  );
  const segments = Array.from(
    section?.querySelectorAll("[data-outcome-segment]") ?? [],
  );
  const points = Array.from(
    section?.querySelectorAll("[data-outcome-point]") ?? [],
  );

  if (!section || cards.length === 0) {
    return;
  }

  const setActiveOutcome = (index = null) => {
    cards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.outcomeCard === index);
    });
    segments.forEach((segment) => {
      segment.classList.toggle(
        "is-active",
        segment.dataset.outcomeSegment === index,
      );
    });
    points.forEach((point) => {
      point.classList.toggle("is-active", point.dataset.outcomePoint === index);
    });
  };

  cards.forEach((card) => {
    const activate = () => setActiveOutcome(card.dataset.outcomeCard);
    const deactivate = () => {
      if (document.activeElement !== card) {
        setActiveOutcome();
      }
    };

    card.addEventListener("pointerenter", activate);
    card.addEventListener("pointerleave", deactivate);
    card.addEventListener("focus", activate);
    card.addEventListener("blur", deactivate);
  });
}

function initializeFinalCta() {
  const panel = document.querySelector("#booking .cta-panel");
  const bookingAction = panel?.querySelector("[data-booking-action]");
  const confetti = panel?.querySelector("[data-cta-confetti]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!panel || !bookingAction || !confetti) {
    return;
  }

  let resetTimer;

  bookingAction.addEventListener("click", () => {
    if (reducedMotion.matches) {
      return;
    }

    const panelRect = panel.getBoundingClientRect();
    const buttonRect = bookingAction.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2 - panelRect.left;
    const centerY = buttonRect.top + buttonRect.height / 2 - panelRect.top;

    confetti.style.setProperty("--confetti-x", `${centerX}px`);
    confetti.style.setProperty("--confetti-y", `${centerY}px`);
    confetti.classList.remove("is-bursting");
    void confetti.offsetWidth;
    confetti.classList.add("is-bursting");

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      confetti.classList.remove("is-bursting");
    }, 900);
  });
}

function initializeHeroLens(hero) {
  const lens = hero.querySelector("[data-hero-lens]");
  const logo = lens?.querySelector(".hero-path-logo");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const supportsFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  );

  if (!lens || !logo || prefersReducedMotion.matches) {
    return;
  }

  const dots = Array.from(lens.querySelectorAll("[data-path-dot]"));
  let frameRequested = false;
  let scrollFrameRequested = false;
  let pointerX = 0;
  let pointerY = 0;

  const updateMergeVectors = () => {
    const targetX = logo.offsetLeft;
    const targetY = logo.offsetTop;

    dots.forEach((dot) => {
      const dotCenterX = dot.offsetLeft + dot.offsetWidth / 2;
      const dotCenterY = dot.offsetTop + dot.offsetHeight / 2;

      dot.style.setProperty(
        "--dot-merge-x",
        `${(targetX - dotCenterX).toFixed(2)}px`,
      );
      dot.style.setProperty(
        "--dot-merge-y",
        `${(targetY - dotCenterY).toFixed(2)}px`,
      );
    });
  };

  const applyDepth = () => {
    frameRequested = false;

    const rect = lens.getBoundingClientRect();
    const normalizedX = Math.min(
      1,
      Math.max(-1, (pointerX - (rect.left + rect.width / 2)) / (rect.width / 2)),
    );
    const normalizedY = Math.min(
      1,
      Math.max(-1, (pointerY - (rect.top + rect.height / 2)) / (rect.height / 2)),
    );

    lens.style.setProperty(
      "--hero-lens-x",
      `${(normalizedX * 3.5).toFixed(2)}px`,
    );
    lens.style.setProperty(
      "--hero-lens-y",
      `${(normalizedY * 2.5).toFixed(2)}px`,
    );
    lens.style.setProperty(
      "--hero-scatter-x",
      `${(normalizedX * -5).toFixed(2)}px`,
    );
    lens.style.setProperty(
      "--hero-scatter-y",
      `${(normalizedY * -3.5).toFixed(2)}px`,
    );

    dots.forEach((dot) => {
      const dotRect = dot.getBoundingClientRect();
      const deltaX = pointerX - (dotRect.left + dotRect.width / 2);
      const deltaY = pointerY - (dotRect.top + dotRect.height / 2);
      const distance = Math.hypot(deltaX, deltaY);
      const influence = Math.max(0, 1 - distance / 220);
      const depth = Number.parseFloat(dot.dataset.depth ?? "0.7");
      const nudgeX = Math.max(
        -7,
        Math.min(7, deltaX * 0.04 * influence * depth),
      );
      const nudgeY = Math.max(
        -5,
        Math.min(5, deltaY * 0.03 * influence * depth),
      );

      dot.style.setProperty("--dot-nudge-x", `${nudgeX.toFixed(2)}px`);
      dot.style.setProperty("--dot-nudge-y", `${nudgeY.toFixed(2)}px`);
    });
  };

  const handlePointerMove = (event) => {
    if (
      !supportsFinePointer.matches &&
      event.pointerType !== "touch" &&
      event.pointerType !== "pen"
    ) {
      return;
    }

    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(applyDepth);
    }
  };

  const resetDepth = () => {
    lens.style.setProperty("--hero-lens-x", "0px");
    lens.style.setProperty("--hero-lens-y", "0px");
    lens.style.setProperty("--hero-scatter-x", "0px");
    lens.style.setProperty("--hero-scatter-y", "0px");
    dots.forEach((dot) => {
      dot.style.setProperty("--dot-nudge-x", "0px");
      dot.style.setProperty("--dot-nudge-y", "0px");
    });
  };

  const updateScrollDepth = () => {
    scrollFrameRequested = false;

    const heroRect = hero.getBoundingClientRect();
    const scrollProgress = Math.min(
      1,
      Math.max(0, -heroRect.top / Math.max(heroRect.height, 1)),
    );
    const speeds = [-8, 12, -6, 15, -10, 18];

    dots.forEach((dot, index) => {
      const depth = Number.parseFloat(dot.dataset.depth ?? "0.7");
      const offset = scrollProgress * (speeds[index] ?? 8) * depth;
      dot.style.setProperty("--dot-scroll-y", `${offset.toFixed(2)}px`);
    });
  };

  const requestScrollDepth = () => {
    if (scrollFrameRequested) {
      return;
    }

    scrollFrameRequested = true;
    requestAnimationFrame(updateScrollDepth);
  };

  const handleResize = () => {
    updateMergeVectors();
    requestScrollDepth();
  };

  hero.addEventListener("pointermove", handlePointerMove, { passive: true });
  hero.addEventListener("pointerdown", handlePointerMove, { passive: true });
  hero.addEventListener("pointerup", resetDepth, { passive: true });
  hero.addEventListener("pointercancel", resetDepth, { passive: true });
  hero.addEventListener("pointerleave", resetDepth);
  window.addEventListener("scroll", requestScrollDepth, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("pagehide", resetDepth);
  updateMergeVectors();
  updateScrollDepth();
}

function initializeHowItWorks() {
  const section = document.querySelector("#how-it-works");
  const comparison = section?.querySelector("[data-schedule-compare]");

  if (!comparison) {
    return;
  }

  const scheduleTabs = Array.from(
    comparison.querySelectorAll("[data-schedule-tab]"),
  );
  const schedulePanels = Array.from(
    comparison.querySelectorAll("[data-schedule-panel]"),
  );

  const activateSchedule = (nextTab, shouldFocus = false) => {
    const state = nextTab?.dataset.scheduleTab;

    if (!state) {
      return;
    }

    scheduleTabs.forEach((tab) => {
      const isSelected = tab === nextTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    schedulePanels.forEach((panel) => {
      panel.hidden = panel.dataset.schedulePanel !== state;
    });

    comparison.dataset.scheduleState = state;

    if (shouldFocus) {
      nextTab.focus();
    }
  };

  scheduleTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateSchedule(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % scheduleTabs.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + scheduleTabs.length) % scheduleTabs.length;
      } else if (event.key === "ArrowRight") {
        nextIndex = (index + (getLanguage() === "ar" ? -1 : 1) + scheduleTabs.length) % scheduleTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index + (getLanguage() === "ar" ? 1 : -1) + scheduleTabs.length) % scheduleTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = scheduleTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateSchedule(scheduleTabs[nextIndex], true);
    });
  });
}

function initializeContentSections() {
  const sections = Array.from(
    document.querySelectorAll("[data-reveal-section]"),
  );

  if (sections.length === 0) {
    return;
  }

  sections.forEach((section) => section.classList.add("is-observed"));

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.16 },
  );

  sections.forEach((section) => observer.observe(section));
}

function initializeRecognition() {
  const recognition = document.querySelector(".recognition");

  if (!recognition) {
    return;
  }

  recognition.classList.add("is-observed");

  const restartStory = () => {
    if (!recognition.classList.contains("is-visible")) {
      return;
    }

    recognition.classList.remove("is-visible");
    void recognition.offsetWidth;
    recognition.classList.add("is-visible");
  };

  window.addEventListener("tutorings:languagechange", restartStory);

  if (!("IntersectionObserver" in window)) {
    recognition.classList.add("is-visible", "is-playing");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      recognition.classList.toggle("is-playing", entry.isIntersecting);

      if (
        !entry.isIntersecting ||
        recognition.classList.contains("is-visible")
      ) {
        return;
      }

      recognition.classList.add("is-visible");
    },
    { rootMargin: "10% 0px", threshold: 0.18 },
  );

  observer.observe(recognition);
}

function initializeWhyTutorings() {
  const section = document.querySelector("#why-tutorings");

  if (!section) {
    return;
  }

  const explorer = section.querySelector("[data-why-explorer]");
  const whyTabs = Array.from(
    explorer?.querySelectorAll("[data-why-tab]") ?? [],
  );
  const whyPanels = Array.from(
    explorer?.querySelectorAll("[data-why-panel]") ?? [],
  );

  const activateWhyPanel = (nextTab, shouldFocus = false) => {
    const need = nextTab?.dataset.whyTab;

    if (!need) {
      return;
    }

    whyTabs.forEach((tab) => {
      const isSelected = tab === nextTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    whyPanels.forEach((panel) => {
      panel.hidden = panel.dataset.whyPanel !== need;
    });

    explorer.dataset.activeNeed = need;

    if (shouldFocus) {
      nextTab.focus();
    }
  };

  whyTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateWhyPanel(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % whyTabs.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + whyTabs.length) % whyTabs.length;
      } else if (event.key === "ArrowRight") {
        nextIndex = (index + (getLanguage() === "ar" ? -1 : 1) + whyTabs.length) % whyTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index + (getLanguage() === "ar" ? 1 : -1) + whyTabs.length) % whyTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = whyTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateWhyPanel(whyTabs[nextIndex], true);
    });
  });

  const ieltsNeedTab = whyTabs.find(
    (tab) => tab.dataset.whyTab === "ielts",
  );
  const openIeltsNeed = () => {
    if (ieltsNeedTab) {
      activateWhyPanel(ieltsNeedTab);
    }
  };

  document.querySelectorAll('a[href="#ielts"]').forEach((link) => {
    link.addEventListener("click", openIeltsNeed);
  });

  if (window.location.hash === "#ielts") {
    openIeltsNeed();
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#ielts") {
      openIeltsNeed();
    }
  });

  const ieltsCard = section.querySelector("[data-ielts-tabs]");
  const tabs = Array.from(
    ieltsCard?.querySelectorAll("[data-ielts-tab]") ?? [],
  );
  const panels = Array.from(
    ieltsCard?.querySelectorAll("[data-ielts-panel]") ?? [],
  );

  const activateTab = (nextTab, shouldFocus = false) => {
    const skill = nextTab?.dataset.ieltsTab;

    if (!skill) {
      return;
    }

    tabs.forEach((tab) => {
      const isSelected = tab === nextTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.ieltsPanel !== skill;
    });

    if (shouldFocus) {
      nextTab.focus();
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "ArrowRight") {
        nextIndex = (index + (getLanguage() === "ar" ? -1 : 1) + tabs.length) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index + (getLanguage() === "ar" ? 1 : -1) + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  const cefrCard = section.querySelector("[data-cefr-card]");
  const range = cefrCard?.querySelector("[data-cefr-range]");
  const code = cefrCard?.querySelector("[data-cefr-code]");
  const title = cefrCard?.querySelector("[data-cefr-title]");
  const description = cefrCard?.querySelector("[data-cefr-description]");
  const markers = Array.from(
    cefrCard?.querySelectorAll(".cefr-levels span") ?? [],
  );
  const levels = [
    {
      code: "A1",
      title: "Foundation",
      description: "Understand and use familiar everyday expressions.",
    },
    {
      code: "A2",
      title: "Elementary",
      description: "Handle simple exchanges about familiar, everyday topics.",
    },
    {
      code: "B1",
      title: "Independent",
      description: "Manage common situations in work, study, and travel.",
    },
    {
      code: "B2",
      title: "Confident",
      description: "Communicate clearly and discuss more complex ideas.",
    },
    {
      code: "C1",
      title: "Advanced",
      description: "Use English flexibly for academic and professional goals.",
    },
    {
      code: "C2",
      title: "Mastery",
      description: "Understand and express nuanced ideas with precision.",
    },
  ];

  const updateCefrLevel = () => {
    if (!range || !code || !title || !description) {
      return;
    }

    const levelIndex = Math.min(
      levels.length - 1,
      Math.max(0, Number.parseInt(range.value, 10) || 0),
    );
    const level = levels[levelIndex];
    const progress = (levelIndex / Math.max(levels.length - 1, 1)) * 100;

    cefrCard.style.setProperty("--cefr-progress", `${progress}%`);
    cefrCard.dataset.cefrLevel = level.code.toLowerCase();
    range.setAttribute(
      "aria-valuetext",
      formatMessage("cefrValue", {
        code: level.code,
        title: translate(level.title),
      }),
    );
    code.textContent = level.code;
    setLocalizedText(title, level.title);
    setLocalizedText(description, level.description);
    markers.forEach((marker, index) => {
      marker.classList.toggle("is-active", index === levelIndex);
    });
  };

  range?.addEventListener("input", updateCefrLevel);
  updateCefrLevel();
  window.addEventListener("tutorings:languagechange", updateCefrLevel);
}

function initializeTimeline() {
  const timeline = document.querySelector("[data-timeline]");
  const progress = timeline?.querySelector("[data-timeline-progress]");
  const line = timeline?.querySelector(".timeline-line");
  const body = timeline?.querySelector("[data-timeline-body]");
  const scrubber = timeline?.querySelector("[data-timeline-scrubber]");

  if (!timeline || !progress || !line || !body || !scrubber) {
    return;
  }

  const milestones = Array.from(
    timeline.querySelectorAll("[data-milestone]"),
  );
  const nodes = milestones.map((milestone) =>
    milestone.querySelector(".milestone-number"),
  );
  const titleKeys = [
    "Know your level",
    "Define your goal",
    "Follow your roadmap",
    "Practice live",
    "Receive feedback",
    "Build confidence",
  ];
  const toggles = Array.from(
    timeline.querySelectorAll("[data-milestone-toggle]"),
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  timeline.classList.add("is-observed");

  const setCardExpanded = (toggle, shouldExpand) => {
    const card = toggle.closest(".milestone-card");
    const exampleId = toggle.getAttribute("aria-controls");
    const example = exampleId ? document.getElementById(exampleId) : null;

    card?.classList.toggle("is-expanded", shouldExpand);
    toggle.setAttribute("aria-expanded", String(shouldExpand));
    example?.setAttribute("aria-hidden", String(!shouldExpand));
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const shouldExpand = toggle.getAttribute("aria-expanded") !== "true";

      toggles.forEach((otherToggle) => {
        setCardExpanded(otherToggle, otherToggle === toggle && shouldExpand);
      });
    });

    toggle.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setCardExpanded(toggle, false);
        toggle.focus();
      }
    });
  });

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    milestones.forEach((milestone) => milestone.classList.add("is-revealed"));
  } else {
    const milestoneObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.18 },
    );

    milestones.forEach((milestone) => milestoneObserver.observe(milestone));
  }

  let nodeThresholds = [];
  let frameRequested = false;
  let timelineInRange = true;
  let currentProgress = 0;
  let currentStep = 0;
  let isDragging = false;
  let hasScrubOverride = false;
  let travelTimer = 0;

  const clamp = (value, minimum = 0, maximum = 1) =>
    Math.min(maximum, Math.max(minimum, value));

  const getNearestStep = (value) => {
    if (nodeThresholds.length === 0) {
      return 0;
    }

    return nodeThresholds.reduce((nearestIndex, threshold, index) => {
      const nearestDistance = Math.abs(
        value - nodeThresholds[nearestIndex],
      );
      return Math.abs(value - threshold) < nearestDistance
        ? index
        : nearestIndex;
    }, 0);
  };

  const renderProgress = (value) => {
    currentProgress = clamp(value);
    currentStep = getNearestStep(currentProgress);
    const currentTitle = translate(titleKeys[currentStep] ?? "Learning step");

    timeline.style.setProperty(
      "--timeline-progress",
      currentProgress.toFixed(4),
    );
    timeline.style.setProperty(
      "--timeline-position",
      `${(currentProgress * 100).toFixed(2)}%`,
    );

    if (!prefersReducedMotion.matches) {
      timeline.classList.add("is-traveling");
      window.clearTimeout(travelTimer);
      travelTimer = window.setTimeout(() => {
        timeline.classList.remove("is-traveling");
      }, 480);
    }

    scrubber.setAttribute("aria-valuenow", String(currentStep + 1));
    scrubber.setAttribute(
      "aria-valuetext",
      formatMessage("timelineValue", {
        step: currentStep + 1,
        title: currentTitle,
      }),
    );
    scrubber.dataset.stepLabel = formatMessage("timelineLabel", {
      step: currentStep + 1,
      title: currentTitle,
    });

    milestones.forEach((milestone, index) => {
      const isActive = currentProgress >= (nodeThresholds[index] ?? 1) - 0.002;
      const isCurrent = index === currentStep;

      milestone.classList.toggle("is-active", isActive);
      milestone.classList.toggle("is-current", isCurrent);

      if (isCurrent) {
        milestone.setAttribute("aria-current", "step");
      } else {
        milestone.removeAttribute("aria-current");
      }
    });
  };

  const cacheGeometry = () => {
    const lineRect = line.getBoundingClientRect();

    if (lineRect.height === 0) {
      nodeThresholds = [];
      return;
    }

    nodeThresholds = nodes.map((node) => {
      if (!node) {
        return 1;
      }

      const nodeRect = node.getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2;
      return Math.min(
        1,
        Math.max(0, (nodeCenter - lineRect.top) / lineRect.height),
      );
    });
  };

  const updateProgress = () => {
    frameRequested = false;

    if (isDragging || hasScrubOverride) {
      return;
    }

    const lineRect = line.getBoundingClientRect();
    const readingLine = window.innerHeight * 0.58;
    renderProgress(
      clamp((readingLine - lineRect.top) / Math.max(lineRect.height, 1)),
    );
  };

  const requestProgressUpdate = () => {
    if (frameRequested) {
      return;
    }

    frameRequested = true;
    requestAnimationFrame(updateProgress);
  };

  const handleScroll = () => {
    hasScrubOverride = false;

    if (timelineInRange) {
      requestProgressUpdate();
    }
  };

  const handleResize = () => {
    cacheGeometry();

    if (hasScrubOverride) {
      renderProgress(nodeThresholds[currentStep] ?? currentProgress);
    } else {
      requestProgressUpdate();
    }
  };

  const getPointerProgress = (clientY) => {
    const lineRect = line.getBoundingClientRect();
    return clamp((clientY - lineRect.top) / Math.max(lineRect.height, 1));
  };

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    event.preventDefault();
    isDragging = true;
    hasScrubOverride = true;
    timeline.classList.add("is-dragging");
    scrubber.focus({ preventScroll: true });
    scrubber.setPointerCapture?.(event.pointerId);
    renderProgress(getPointerProgress(event.clientY));
  };

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    renderProgress(getPointerProgress(event.clientY));
  };

  const finishDragging = (event) => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    timeline.classList.remove("is-dragging");

    if (scrubber.hasPointerCapture?.(event.pointerId)) {
      scrubber.releasePointerCapture(event.pointerId);
    }

    renderProgress(nodeThresholds[currentStep] ?? currentProgress);
  };

  const selectStep = (nextStep) => {
    currentStep = clamp(nextStep, 0, milestones.length - 1);
    hasScrubOverride = true;
    renderProgress(
      nodeThresholds[currentStep] ??
        currentStep / Math.max(milestones.length - 1, 1),
    );
  };

  scrubber.addEventListener("pointerdown", handlePointerDown);
  scrubber.addEventListener("pointermove", handlePointerMove);
  scrubber.addEventListener("pointerup", finishDragging);
  scrubber.addEventListener("pointercancel", finishDragging);
  scrubber.addEventListener("keydown", (event) => {
    const forwardKeys = [
      "ArrowDown",
      getLanguage() === "ar" ? "ArrowLeft" : "ArrowRight",
      "PageDown",
    ];
    const backwardKeys = [
      "ArrowUp",
      getLanguage() === "ar" ? "ArrowRight" : "ArrowLeft",
      "PageUp",
    ];

    if (forwardKeys.includes(event.key)) {
      event.preventDefault();
      selectStep(currentStep + 1);
    } else if (backwardKeys.includes(event.key)) {
      event.preventDefault();
      selectStep(currentStep - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectStep(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectStep(milestones.length - 1);
    }
  });

  cacheGeometry();
  updateProgress();

  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(handleResize) : null;
  resizeObserver?.observe(body);

  if ("IntersectionObserver" in window) {
    const timelineRangeObserver = new IntersectionObserver(
      ([entry]) => {
        timelineInRange = entry.isIntersecting;

        if (timelineInRange) {
          requestProgressUpdate();
        }
      },
      { rootMargin: "100% 0px" },
    );

    timelineRangeObserver.observe(timeline);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("tutorings:languagechange", () => {
    renderProgress(currentProgress);
  });

  window.addEventListener("pagehide", () => {
    window.clearTimeout(travelTimer);
    resizeObserver?.disconnect();
  });
}
