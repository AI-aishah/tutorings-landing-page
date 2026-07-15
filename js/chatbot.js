import { getLanguage, setLocalizedText, translate } from "./i18n.js";

const FAQS = [
  {
    id: "tutors",
    question: "Are male and female tutors available?",
    answer:
      "Yes. Tutorings has professional male and female tutors from around the world who speak both English and Arabic to make explanations clearer.",
    keywords: ["male", "female", "men", "women", "gender", "male tutor", "female tutor"],
    keywordsAr: ["مدرس", "مدرسة", "معلم", "معلمة", "ذكر", "أنثى", "رجال", "نساء"],
  },
  {
    id: "pause",
    question: "Can I pause my program if I travel or get busy?",
    answer:
      "Yes. You can request to freeze your program for up to 14 days, provided you notify Tutorings in advance, so you can continue without losing your lessons.",
    keywords: ["pause", "freeze", "travel", "busy", "break", "stop program", "14 days"],
    keywordsAr: ["إيقاف", "تجميد", "سفر", "مشغول", "انشغلت", "استراحة", "14 يوم"],
  },
  {
    id: "recording",
    question: "Can I watch a live lesson later?",
    answer:
      "Yes. A recorded copy is added to the app after your live lesson so you can review it later.",
    keywords: ["recording", "recorded", "watch later", "replay", "review lesson", "miss lesson"],
    keywordsAr: ["تسجيل", "مسجل", "مشاهدة لاحقا", "إعادة", "مراجعة الدرس", "فاتني الدرس"],
  },
  {
    id: "same-tutor",
    question: "Will I have the same tutor throughout the program?",
    answer:
      "Tutorings assigns you a fixed tutor throughout your level, helping them follow your progress, weaknesses, and improvement closely.",
    keywords: ["same tutor", "same teacher", "fixed tutor", "fixed teacher", "keep tutor", "change tutor"],
    keywordsAr: ["نفس المدرس", "مدرس ثابت", "معلم ثابت", "تغيير المدرس", "يستمر المدرس"],
  },
  {
    id: "private",
    question: "Why is the program private?",
    answer:
      "All lessons are one-to-one, so they can be designed around your goals. Your tutor focuses on your weaknesses and guides you according to your individual needs.",
    keywords: ["private", "one to one", "one-to-one", "1 to 1", "1-1", "individual lesson"],
    keywordsAr: ["فردي", "خاص", "واحد لواحد", "درس فردي", "لماذا البرنامج"],
  },
  {
    id: "study-time",
    question: "How much daily study time do I need?",
    answer:
      "It depends on your goals and current level. On average, Tutorings recommends 30–40 minutes per day outside the lesson for review and homework.",
    keywords: ["study time", "daily", "minutes", "hours", "homework", "how long", "30", "40"],
    keywordsAr: ["وقت الدراسة", "يوميا", "دقائق", "ساعات", "واجب", "كم أدرس", "30", "40"],
  },
  {
    id: "certificate",
    question: "Will I receive a certificate?",
    answer:
      "Yes. You receive a Cambridge-certified certificate after completing the level and successfully passing the progression test.",
    keywords: ["certificate", "certification", "cambridge", "graduate", "completion"],
    keywordsAr: ["شهادة", "اعتماد", "كامبردج", "Cambridge", "تخرج", "إكمال"],
  },
];

const normalize = (value = "") =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export function initializeSupportChat() {
  const widget = document.querySelector("[data-support-chat]");
  const trigger = widget?.querySelector("[data-support-chat-trigger]");
  const panel = widget?.querySelector("[data-support-chat-panel]");
  const closeButton = widget?.querySelector("[data-support-chat-close]");
  const log = widget?.querySelector("[data-support-chat-log]");
  const form = widget?.querySelector("[data-support-chat-form]");
  const input = widget?.querySelector("[data-support-chat-input]");
  const quickQuestions = Array.from(
    widget?.querySelectorAll("[data-chat-question]") ?? [],
  );
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!widget || !trigger || !panel || !log || !form || !input) {
    return;
  }

  const getFaqById = (id) => FAQS.find((faq) => faq.id === id);

  const findFaq = (query) => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return null;
    }

    return FAQS
      .map((faq) => ({
        faq,
        score: [...faq.keywords, ...(faq.keywordsAr ?? [])].reduce((score, keyword) => {
          const normalizedKeyword = normalize(keyword);

          if (!normalizedQuery.includes(normalizedKeyword)) {
            return score;
          }

          return score + (normalizedKeyword.includes(" ") ? 3 : 1);
        }, 0),
      }))
      .sort((first, second) => second.score - first.score)
      .find((match) => match.score > 0)?.faq ?? null;
  };

  const scrollLog = () => {
    log.scrollTo({
      top: log.scrollHeight,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  };

  const addMessage = (text, sender, { localized = false } = {}) => {
    const message = document.createElement("div");
    const body = document.createElement("p");

    message.className = `support-chat-message support-chat-message-${sender}`;
    if (localized) {
      setLocalizedText(body, text);
    } else {
      body.textContent = text;
    }

    if (sender === "bot") {
      const avatar = document.createElement("span");
      avatar.className = "support-chat-mini-avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = "T";
      message.append(avatar);
    }

    message.append(body);
    log.append(message);
    scrollLog();
  };

  const answerQuestion = (
    question,
    faq = findFaq(question),
    { localizedQuestion = false } = {},
  ) => {
    addMessage(question, "user", { localized: localizedQuestion });

    window.setTimeout(() => {
      if (faq) {
        addMessage(faq.answer, "bot", { localized: true });
        return;
      }

      if (/\b(hi|hello|hey)\b/i.test(question) || /(مرحبا|مرحبًا|السلام عليكم|هلا)/i.test(question)) {
        addMessage(
          "Hello! I can answer the official common questions shown above. Choose one, or ask using a few keywords.",
          "bot",
          { localized: true },
        );
        return;
      }

      addMessage(
        "Tutorings offers live one-to-one English lessons, a fixed bilingual tutor, flexible scheduling, and structured paths for General English, IELTS, and STEP. Try one of the common questions above, explore the programs, or use the booking section for personal guidance.",
        "bot",
        { localized: true },
      );
    }, reducedMotion.matches ? 0 : 280);
  };

  const updateTriggerState = (isOpen) => {
    trigger.setAttribute("aria-expanded", String(isOpen));
    trigger.setAttribute(
      "aria-label",
      translate(
        isOpen
          ? "Close frequently asked questions"
          : "Open frequently asked questions",
      ),
    );
  };

  const updateLanguageState = () => {
    input.setAttribute("dir", getLanguage() === "ar" ? "rtl" : "ltr");
    updateTriggerState(!panel.hidden);
  };

  const openPanel = () => {
    panel.hidden = false;
    panel.classList.add("is-open");
    updateTriggerState(true);
    widget.classList.add("has-opened");
    window.requestAnimationFrame(() => input.focus());
  };

  const closePanel = ({ restoreFocus = true } = {}) => {
    panel.classList.remove("is-open");
    panel.hidden = true;
    updateTriggerState(false);

    if (restoreFocus) {
      trigger.focus();
    }
  };

  trigger.addEventListener("click", () => {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  closeButton?.addEventListener("click", () => closePanel());

  widget.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      closePanel();
    }
  });

  quickQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const faq = getFaqById(button.dataset.chatQuestion);

      if (faq) {
        answerQuestion(faq.question, faq, { localizedQuestion: true });
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();

    if (!question) {
      input.focus();
      return;
    }

    input.value = "";
    answerQuestion(question);
    input.focus();
  });

  updateLanguageState();
  window.addEventListener("tutorings:languagechange", updateLanguageState);
}
