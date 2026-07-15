const STORAGE_KEY = "tutorings-language";
const SUPPORTED_LANGUAGES = new Set(["en", "ar"]);
const TRANSLATABLE_ATTRIBUTES = [
  "aria-label",
  "aria-valuetext",
  "placeholder",
  "alt",
  "title",
  "data-label",
  "data-step-label",
  "data-text",
];

const ARABIC_TRANSLATIONS = Object.freeze({
  /* Document and navigation */
  "Tutorings | English and IELTS Tutoring":
    "Tutorings | تعليم الإنجليزية والتحضير للآيلتس",
  "Personalized English learning that helps students communicate confidently and achieve their IELTS goals through live one-to-one tutoring.":
    "تعليم إنجليزي مخصص يساعد الطلاب على التواصل بثقة وتحقيق أهدافهم في الآيلتس من خلال دروس فردية مباشرة.",
  "Skip to main content": "انتقل إلى المحتوى الرئيسي",
  Programs: "البرامج",
  IELTS: "الآيلتس",
  "How it works": "كيف يعمل",
  "How It Works": "كيف يعمل",
  Stories: "قصص النجاح",
  "Book a Lesson": "احجز درسًا",
  "Book Your First Lesson": "احجز درسك الأول",
  "Explore Programs": "استكشف البرامج",
  "Back to top": "العودة إلى الأعلى",
  Explore: "استكشف",
  Connect: "تواصل معنا",
  Discover: "اكتشف",
  "Official Website": "الموقع الرسمي",

  /* Hero */
  "English & IELTS tutoring built around you":
    "تعليم الإنجليزية والآيلتس المصمم لك",
  "Your journey to mastering English": "رحلتك نحو إتقان الإنجليزية",
  "starts with a clear path.": "تبدأ بمسار واضح.",
  "Build real confidence through personalized one-to-one English and IELTS lessons designed around your goals, level, and schedule.":
    "ابنِ ثقة حقيقية من خلال دروس فردية مخصصة في الإنجليزية والآيلتس، مصممة وفق أهدافك ومستواك وجدولك.",
  "Personalized guidance": "توجيه مخصص",
  "Flexible lessons": "دروس مرنة",
  "IELTS preparation": "التحضير للآيلتس",
  "The challenge": "التحدي",
  "Your path": "مسارك",
  "Why Tutorings": "لماذا Tutorings؟",
  "Success stories": "قصص النجاح",
  "Use a path dot to explore a section of the page.":
    "استخدم إحدى نقاط المسار لاستكشاف قسم من الصفحة.",

  /* Recognition story */
  "You are not the problem": "المشكلة ليست فيك",
  "Learning English shouldn’t feel like":
    "تعلّم الإنجليزية لا ينبغي أن يبدو وكأنه",
  guessing: "تخمين",
  "You can watch videos, download apps, memorize grammar, and still feel unsure what to study next or how to improve. The missing piece is often not effort. It is direction.":
    "قد تشاهد الفيديوهات وتحمل التطبيقات وتحفظ القواعد، ومع ذلك تبقى غير متأكد مما ينبغي أن تتعلمه بعد ذلك أو كيف تتطور. ما ينقصك غالبًا ليس الجهد، بل الاتجاه الواضح.",
  "You do not need more random resources. You need a path built for you.":
    "لا تحتاج إلى مزيد من المصادر العشوائية، بل إلى مسار مصمم لك.",
  Frustrated: "إحباط",
  Overwhelmed: "تشتّت",
  "Clear path": "مسار واضح",
  "“I keep studying...”": "«أواصل الدراسة...»",
  "But I am not making clear progress.": "لكنني لا أرى تقدمًا واضحًا.",
  Videos: "فيديوهات",
  Apps: "تطبيقات",
  Grammar: "قواعد",
  Courses: "دورات",
  Podcasts: "بودكاست",
  "Quick tips": "نصائح سريعة",
  "Social posts": "منشورات",
  "Where do I start?": "من أين أبدأ؟",
  "Clear study plan": "خطة دراسة واضحة",
  "A tutor who stays with you": "مدرّس يستمر معك",
  "Practice with support and useful feedback.":
    "تدرّب بدعم وملاحظات مفيدة.",
  "Follow your plan": "اتبع خطتك",
  "Build every skill": "طوّر كل مهارة",
  "“Now I know what to learn next.”": "«الآن أعرف ماذا أتعلم بعد ذلك.»",
  "Clear progress across every English skill.":
    "تقدم واضح في كل مهارة من مهارات الإنجليزية.",

  /* Programs and quiz */
  "Choose your path": "اختر مسارك",
  "A program built around where you want to go.":
    "برنامج مصمم وفق الوجهة التي تريد الوصول إليها.",
  "Whether you want stronger everyday English, a higher IELTS score, or focused preparation for STEP, choose a program designed around your goal.":
    "سواء أردت تطوير الإنجليزية اليومية، أو تحقيق درجة أعلى في الآيلتس، أو الاستعداد المركّز لاختبار STEP، اختر برنامجًا مصممًا حول هدفك.",
  "Not sure which program fits?": "لست متأكدًا من البرنامج المناسب؟",
  "Answer three quick questions for a recommendation.":
    "أجب عن ثلاثة أسئلة سريعة لتحصل على توصية.",
  "Find your clearest starting point": "اعثر على أوضح نقطة بداية",
  "Question 1 of 3": "السؤال 1 من 3",
  "What is your main goal?": "ما هدفك الرئيسي؟",
  "Improve my overall English": "تطوير مستواي العام في الإنجليزية",
  "Reach an IELTS score": "تحقيق درجة محددة في الآيلتس",
  "Prepare for the STEP exam": "الاستعداد لاختبار STEP",
  "What timeline are you working with?": "ما المدة المتاحة لك؟",
  "Flexible, long-term progress": "تقدّم مرن على المدى الطويل",
  "About 3–6 months": "نحو 3–6 أشهر",
  "Less than 3 months": "أقل من 3 أشهر",
  "How would you describe your current level?":
    "كيف تصف مستواك الحالي؟",
  Beginner: "مبتدئ",
  Intermediate: "متوسط",
  Advanced: "متقدم",
  "I am not sure": "لست متأكدًا",
  "Your recommended path": "المسار المقترح لك",
  "Show my program": "اعرض برنامجي",
  Back: "رجوع",
  "Recommendation ready": "توصيتك جاهزة",
  "General English": "الإنجليزية العامة",
  "IELTS Preparation": "التحضير للآيلتس",
  "STEP Simplified": "برنامج STEP المبسّط",
  "A flexible CEFR-based journey is the clearest match for building your complete English level.":
    "مسار مرن مبني على مستويات CEFR هو الأنسب لتطوير مستواك المتكامل في الإنجليزية.",
  "A structured four-skill plan will keep your preparation focused on the band score you need.":
    "خطة منظمة للمهارات الأربع تحافظ على تركيز استعدادك نحو الدرجة التي تحتاجها.",
  "Focused strategies and exam-style practice are the most direct route to your STEP goal.":
    "استراتيجيات مركزة وتدريب يحاكي الاختبار هما الطريق الأقصر نحو هدفك في STEP.",
  "Program 01": "البرنامج 01",
  "Program 02": "البرنامج 02",
  "Program 03": "البرنامج 03",
  "Build your English level step by step through personalized live lessons, practical speaking, and a clear CEFR-based roadmap.":
    "طوّر مستواك في الإنجليزية خطوة بخطوة عبر دروس مباشرة مخصصة، وتطبيق عملي، وخريطة واضحة مبنية على CEFR.",
  "Prepare for all four IELTS skills with a structured study plan, private live sessions, practical assignments, and focused feedback.":
    "استعد لمهارات الآيلتس الأربع من خلال خطة دراسة منظمة، وجلسات فردية مباشرة، وتكليفات عملية، وملاحظات مركزة.",
  "Prepare for the STEP exam through focused explanations, clear strategies, and practice designed around the exam format.":
    "استعد لاختبار STEP عبر شروحات مركزة، واستراتيجيات واضحة، وتدريبات مصممة وفق نمط الاختبار.",
  "Live private and recorded lessons": "دروس فردية مباشرة ومسجلة",
  "Flexible scheduling": "مواعيد مرنة",
  "Levels from beginner to advanced": "مستويات من المبتدئ إلى المتقدم",
  Speaking: "المحادثة",
  Listening: "الاستماع",
  Writing: "الكتابة",
  Reading: "القراءة",
  "All four IELTS test skills": "مهارات اختبار الآيلتس الأربع",
  "Goal-based preparation": "استعداد مبني على الهدف",
  "Assignment correction and guidance": "تصحيح التكليفات والتوجيه",
  "Reading, writing, listening, and speaking":
    "القراءة والكتابة والاستماع والمحادثة",
  "Practice using IELTS-style materials":
    "تدرّب باستخدام مواد تحاكي الآيلتس",
  "Clear explanations": "شروحات واضحة",
  "Focused exam preparation": "استعداد مركز للاختبار",
  "Practice based on the exam style": "تدريب وفق نمط الاختبار",
  "Support throughout the preparation process": "دعم طوال فترة الاستعداد",
  "At a glance": "نظرة سريعة",
  "Best for": "الأنسب لـ",
  "Main focus": "التركيز الرئيسي",
  Pace: "الوتيرة",
  "Building complete English ability": "بناء مهارات إنجليزية متكاملة",
  "Everyday, academic, and professional English":
    "الإنجليزية اليومية والأكاديمية والمهنية",
  "Flexible CEFR-level journey": "مسار مرن عبر مستويات CEFR",
  "Learners targeting an IELTS band score":
    "المتعلمين الذين يستهدفون درجة في الآيلتس",
  "Exam format, strategies, and practice":
    "نمط الاختبار والاستراتيجيات والتدريب",
  "Structured around your exam date": "منظم وفق موعد اختبارك",
  "Learners preparing specifically for STEP":
    "المتعلمين الذين يستعدون خصيصًا لاختبار STEP",
  "Explore General English": "استكشف الإنجليزية العامة",
  "Explore IELTS Preparation": "استكشف برنامج الآيلتس",
  "Explore STEP Preparation": "استكشف برنامج STEP",

  /* Learning path */
  "The learning path": "مسار التعلّم",
  "The right path changes everything.": "المسار الصحيح يغيّر كل شيء.",
  "From your first assessment to your final progress report, every part of the experience is designed to keep you supported, organized, and moving forward.":
    "من تقييمك الأول حتى تقرير تقدمك النهائي، صُممت كل مرحلة لتمنحك الدعم والتنظيم وتدفعك إلى الأمام.",
  "Most learners do not struggle because they are incapable. They struggle because they are following a path that was not built for them. Tutorings creates a personalized learning journey based on your goals, level, and pace, so every lesson moves you closer to confident English.":
    "لا يواجه معظم المتعلمين صعوبة لأنهم غير قادرين، بل لأنهم يتبعون مسارًا لم يُصمم لهم. ينشئ Tutorings رحلة تعلّم مخصصة وفق أهدافك ومستواك ووتيرتك، لتقربك كل حصة من استخدام الإنجليزية بثقة.",
  "Know your level": "اعرف مستواك",
  "Start with a clear understanding of where you are today.":
    "ابدأ بفهم واضح لمستواك اليوم.",
  "A short CEFR check samples your speaking, listening, reading, and writing—not just one skill.":
    "يقيس تقييم CEFR قصير المحادثة والاستماع والقراءة والكتابة، وليس مهارة واحدة فقط.",
  "Define your goal": "حدّد هدفك",
  "Set a direction based on IELTS, study abroad, career, or confidence.":
    "حدّد اتجاهك وفق هدفك في الآيلتس أو الدراسة بالخارج أو العمل أو بناء الثقة.",
  "Your tutor turns a goal such as “IELTS 7.0 by June” into clear weekly skill targets.":
    "يحوّل مدرّسك هدفًا مثل «درجة 7.0 في الآيلتس قبل يونيو» إلى أهداف أسبوعية واضحة للمهارات.",
  "Follow your roadmap": "اتبع خريطة تعلّمك",
  "Get a personalized plan instead of another generic course.":
    "احصل على خطة مخصصة بدلًا من دورة عامة أخرى.",
  "Know what comes next at every stage.": "اعرف خطوتك التالية في كل مرحلة.",
  "Your lesson dashboard shows today’s focus, targeted practice, and your next measurable checkpoint.":
    "تعرض لوحة درسك تركيز اليوم والتدريب المستهدف ومحطة التقدم التالية القابلة للقياس.",
  "Practice live": "تدرّب مباشرة",
  "Strengthen your complete English ability through one-to-one sessions.":
    "قوِّ مهاراتك المتكاملة في الإنجليزية عبر جلسات فردية.",
  "Use English more naturally in study, work, and everyday life.":
    "استخدم الإنجليزية بصورة أكثر طبيعية في الدراسة والعمل والحياة اليومية.",
  "Discuss an article, listen for detail, revise a paragraph, and apply new vocabulary live.":
    "ناقش مقالًا، واستمع للتفاصيل، وراجع فقرة، وطبّق مفردات جديدة مباشرة.",
  "Receive feedback": "تلقَّ الملاحظات",
  "Correct mistakes, strengthen weak areas, and keep moving forward.":
    "صحّح أخطاءك، وقوِّ نقاط ضعفك، واستمر في التقدم.",
  "Your tutor explains one recurring pattern, then helps you apply the correction in a new task.":
    "يشرح مدرّسك نمطًا متكررًا، ثم يساعدك على تطبيق التصحيح في مهمة جديدة.",
  "Build confidence": "ابنِ ثقتك",
  "Complete a presentation, email, interview, or academic discussion with less tutor support.":
    "أنجز عرضًا أو بريدًا أو مقابلة أو نقاشًا أكاديميًا باعتماد أقل على المدرّس.",
  "See a lesson example": "شاهد مثالًا من درس",
  "In a real lesson": "في درس حقيقي",
  "Learning step": "خطوة تعليمية",

  /* How it works */
  "A simple process built around you.": "عملية بسيطة مصممة حولك.",
  "Understand your level, meet your tutor, begin live lessons, and keep improving through a clear process.":
    "اعرف مستواك، والتقِ بمدرّسك، وابدأ دروسك المباشرة، واستمر في التطور ضمن عملية واضحة.",
  "Complete your assessment": "أكمل تقييم مستواك",
  "Understand your level, strengths, and learning priorities.":
    "تعرّف على مستواك ونقاط قوتك وأولويات تعلّمك.",
  "Meet your tutor": "تعرّف على مدرّسك",
  "Start with guidance from a tutor who understands your goals.":
    "ابدأ بتوجيه من مدرّس يفهم أهدافك.",
  "Begin live sessions": "ابدأ الجلسات المباشرة",
  "Practice real English through lessons personalized to your level and pace.":
    "مارس الإنجليزية الحقيقية عبر دروس مخصصة لمستواك ووتيرتك.",
  "Track your progress": "تابع تقدمك",
  Improve: "تطوّر",
  "Review results, adjust the plan, and keep improving consistently.":
    "راجع النتائج، وعدّل الخطة، واستمر في التطور بثبات.",
  "See what changes when your learning has direction.":
    "شاهد ما يتغير عندما يصبح لتعلّمك اتجاه واضح.",
  "Same busy day. A clearer rhythm.": "اليوم المزدحم نفسه، لكن بإيقاع أوضح.",
  "Before Tutorings": "قبل Tutorings",
  "After Tutorings": "بعد Tutorings",
  "Study without a target": "دراسة بلا هدف",
  "Save another resource": "حفظ مصدر جديد",
  "Try a different app": "تجربة تطبيق آخر",
  "Wonder what improved": "التساؤل عما تحسّن",
  "See today’s focus": "معرفة تركيز اليوم",
  "Join your live session": "حضور الجلسة المباشرة",
  "Practice": "تطبيق عملي",
  "Review with purpose": "مراجعة هادفة",
  "A short activity prepares you for the lesson.":
    "نشاط قصير يهيئك للدرس.",
  "Your progress and next focus are clear.":
    "تقدمك وتركيزك التالي واضحان.",
  "A new method replaces yesterday’s one.":
    "طريقة جديدة تحل محل طريقة الأمس.",
  "Effort goes in, but direction stays unclear.":
    "تبذل جهدًا، لكن الاتجاه يبقى غير واضح.",
  "One priority connects to your learning plan.":
    "أولوية واحدة ترتبط بخطة تعلّمك.",
  "“I’ll come back to this later.”": "«سأعود إلى هذا لاحقًا.»",
  "The next step is still a guess.": "الخطوة التالية ما زالت مجرد تخمين.",

  /* What you receive */
  "What you receive": "ما الذي ستحصل عليه",
  "More than lessons. A complete learning experience.":
    "أكثر من مجرد دروس؛ تجربة تعلّم متكاملة.",
  "A fixed tutor, live every week": "مدرّس ثابت وجلسات مباشرة كل أسبوع",
  "Consistent guidance from someone who knows your progress.":
    "توجيه مستمر من شخص يعرف مسار تقدمك.",
  "A clear roadmap from your level to your goal":
    "خريطة واضحة من مستواك إلى هدفك",
  "Clear steps remove uncertainty, so you always know what comes next.":
    "خطوات واضحة تزيل الحيرة، لتعرف دائمًا ما يأتي بعد ذلك.",
  "Progress you can actually see": "تقدم يمكنك رؤيته فعلًا",
  "Reports and tests make every improvement visible.":
    "التقارير والاختبارات تجعل كل تحسّن واضحًا.",
  "Also included": "يشمل أيضًا",
  "Live one-to-one learning": "تعلّم فردي مباشر",
  "Fixed tutor throughout the level": "مدرّس ثابت طوال المستوى",
  "Cambridge-based learning resources": "مصادر تعليمية مبنية على Cambridge",
  "Structured learning resources": "مصادر تعليمية منظمة",
  "Progress tests and personal follow-up": "اختبارات تقدم ومتابعة شخصية",
  "Recorded lesson review": "مراجعة الدروس المسجلة",
  "Arabic-speaking support": "دعم باللغة العربية",
  "Practical feedback": "ملاحظات عملية",
  "Program inclusions may vary. Review the selected program page for full details.":
    "قد تختلف مكونات البرامج. راجع صفحة البرنامج المختار للاطلاع على التفاصيل الكاملة.",

  /* Why Tutorings */
  "What would help you move forward?": "ما الذي سيساعدك على التقدم؟",
  "Start with what matters most to you. Tutorings brings the right support into focus.":
    "ابدأ بما يهمك أكثر، وسيضع Tutorings الدعم المناسب أمامك بوضوح.",
  "A tutor who understands you": "مدرّس يفهمك",
  "Know where you are going": "اعرف وجهتك",
  "Target every exam skill": "استهدف كل مهارة في الاختبار",
  "Start with peace of mind": "ابدأ براحة واطمئنان",
  "Personal guidance": "توجيه شخصي",
  "A tutor who understands your goals, level, and learning style stays close to your progress.":
    "مدرّس يفهم أهدافك ومستواك وطريقة تعلّمك، ويتابع تقدمك عن قرب.",
  "Build continuity with someone who knows your progress.":
    "حافظ على استمرارية تعلّمك مع شخص يعرف تقدمك.",
  "Clarify difficult concepts bilingually when it helps.":
    "وضّح المفاهيم الصعبة باللغتين عندما يكون ذلك مفيدًا.",
  "Choose lesson times that fit your studies or work.":
    "اختر مواعيد دروس تناسب دراستك أو عملك.",
  "Learn with support that feels personal.": "تعلّم بدعم تشعر أنه صُمم لك.",
  "Your lessons adapt to your level, goals, pace, and the way you understand best.":
    "تتكيف دروسك مع مستواك وأهدافك ووتيرتك والطريقة الأنسب لفهمك.",
  "Built around you": "مصمم حولك",
  "Clarity at every step": "وضوح في كل خطوة",
  "A clear roadmap": "خريطة واضحة",
  "See exactly where your English is going.":
    "اعرف بدقة إلى أين تتجه لغتك الإنجليزية.",
  "Move through recognized CEFR levels with a clear target at every stage instead of following random resources.":
    "تقدّم عبر مستويات CEFR المعتمدة بهدف واضح في كل مرحلة بدلًا من تتبع مصادر عشوائية.",
  Foundation: "الأساسيات",
  Elementary: "ابتدائي",
  Independent: "مستقل",
  Confident: "واثق",
  Mastery: "إتقان",
  "Understand and use familiar everyday expressions.":
    "افهم واستخدم العبارات اليومية المألوفة.",
  "Handle simple exchanges about familiar, everyday topics.":
    "تعامل مع محادثات بسيطة حول موضوعات يومية مألوفة.",
  "Manage common situations in work, study, and travel.":
    "تعامل مع المواقف الشائعة في العمل والدراسة والسفر.",
  "Communicate clearly and discuss more complex ideas.":
    "تواصل بوضوح وناقش أفكارًا أكثر تعقيدًا.",
  "Use English flexibly for academic and professional goals.":
    "استخدم الإنجليزية بمرونة لأهداف أكاديمية ومهنية.",
  "Understand and express nuanced ideas with precision.":
    "افهم الأفكار الدقيقة وعبّر عنها بوضوح ودقة.",
  "Prepare for the score—not just the test.":
    "استعد للدرجة، وليس للاختبار فقط.",
  "Focus your preparation on the skill that needs attention now while keeping all four connected.":
    "ركّز استعدادك على المهارة التي تحتاج إلى اهتمام الآن، مع إبقاء المهارات الأربع مترابطة.",
  "Practice fluency, pronunciation, and confident answers with live examiner-style feedback.":
    "تدرّب على الطلاقة والنطق والإجابات الواثقة مع ملاحظات مباشرة بأسلوب الممتحن.",
  "Train for different accents, question types, and detail recognition through focused listening review.":
    "تدرّب على اللهجات المختلفة وأنواع الأسئلة والتقاط التفاصيل عبر مراجعة استماع مركزة.",
  "Plan stronger Task 1 and Task 2 responses, then improve structure, grammar, and clarity.":
    "خطط لإجابات أقوى في المهمتين 1 و2، ثم حسّن البناء والقواعد والوضوح.",
  "Build skimming, scanning, and evidence-finding strategies for every IELTS reading question type.":
    "طوّر استراتيجيات القراءة السريعة والمسح والعثور على الدليل لكل نوع من أسئلة قراءة الآيلتس.",
  "Try the experience with less risk.": "جرّب التجربة بمخاطرة أقل.",
  "Your first live lesson gives you a real feel for Tutorings before you fully commit to the journey.":
    "يمنحك درسك المباشر الأول تجربة حقيقية مع Tutorings قبل الالتزام الكامل بالمسار.",
  "The Golden Guarantee": "الضمان الذهبي",
  "Your first live lesson is protected.": "درسك المباشر الأول مشمول بالحماية.",
  "After your first live lesson": "بعد درسك المباشر الأول",
  "If it is not right for you, request a full refund for the IELTS or General English program you selected.":
    "إذا لم تكن التجربة مناسبة لك، يمكنك طلب استرداد كامل لبرنامج الآيلتس أو الإنجليزية العامة الذي اخترته.",
  "A safer first step": "خطوة أولى أكثر أمانًا",
  "Full refund": "استرداد كامل",
  "Golden Guarantee": "الضمان الذهبي",

  /* Trust and educators */
  "Trusted & recognized": "موثوق ومعتمد",
  "Built on trusted partnerships and educational excellence.":
    "مبني على شراكات موثوقة وتميّز تعليمي.",
  "Recognized partners, experienced educators, and results learners can trust.":
    "شركاء معتمدون، ومدرّسون ذوو خبرة، ونتائج يمكن للمتعلمين الوثوق بها.",
  "Official IELTS partner": "شريك رسمي للآيلتس",
  "Certified curriculum": "منهج معتمد",
  "Accelerator graduate": "خريج برنامج المسرّعة",
  "Launchpad graduate": "خريج برنامج الانطلاقة",
  "Qualified teachers": "مدرّسون مؤهلون",
  "Students supported": "طلاب حصلوا على الدعم",
  "Our educators": "مدرّسونا",
  "Meet the guides behind your progress.": "تعرّف على المرشدين وراء تقدمك.",
  "Experienced, qualified educators help you follow a clearer path in both Arabic and English.":
    "مدرّسون مؤهلون وذوو خبرة يساعدونك على اتباع مسار أوضح بالعربية والإنجليزية.",
  "Standard 01": "المعيار 01",
  "Standard 02": "المعيار 02",
  "Standard 03": "المعيار 03",
  "Standard 04": "المعيار 04",
  "IELTS-proven educators": "مدرّسون بخبرة مثبتة في الآيلتس",
  "Every tutor has achieved an IELTS score of at least 7.5.":
    "كل مدرّس حقق درجة 7.5 على الأقل في الآيلتس.",
  "Experienced teachers": "مدرّسون ذوو خبرة",
  "More than five years of teaching experience.":
    "أكثر من خمس سنوات من الخبرة في التدريس.",
  "Qualified educators": "مدرّسون مؤهلون",
  "Certified English educators committed to clear guidance.":
    "مدرّسو إنجليزية معتمدون ملتزمون بتوجيه واضح.",
  "Bilingual support": "دعم ثنائي اللغة",
  "Arabic and English support for clearer learning.":
    "دعم بالعربية والإنجليزية لتعلّم أكثر وضوحًا.",
  "Full-time teaching team": "فريق تدريس متفرغ",
  "Growing learner community": "مجتمع متعلمين متنامٍ",

  /* Comparison */
  "Why students choose Tutorings": "لماذا يختار الطلاب Tutorings؟",
  "A learning experience designed for real progress.":
    "تجربة تعلّم مصممة لتحقيق تقدم حقيقي.",
  "Compare the support, structure, and continuity built into every Tutorings learning journey.":
    "قارن الدعم والتنظيم والاستمرارية المدمجة في كل رحلة تعلّم مع Tutorings.",
  "Comparison of Tutorings with typical online learning platforms":
    "مقارنة بين Tutorings ومنصات التعلم الإلكتروني المعتادة",
  "Compare the experience": "قارن التجربة",
  "What learners receive": "ما يحصل عليه المتعلمون",
  "Your guided learning path": "مسار تعلّم موجّه لك",
  "Typical platforms": "المنصات المعتادة",
  "Typical online learning platforms": "منصات التعلم الإلكتروني المعتادة",
  "Experience may vary": "قد تختلف التجربة",
  "Fixed tutor throughout your journey": "مدرّس ثابت طوال رحلتك",
  "Live one-to-one lessons": "دروس فردية مباشرة",
  "Personalized learning roadmap": "خريطة تعلّم مخصصة",
  "CEFR progression": "تقدّم وفق CEFR",
  "Progress tracking": "متابعة التقدم",
  "Speaking-focused learning": "تعلّم يركز على المحادثة",
  "Structured IELTS preparation": "تحضير منظم للآيلتس",
  Included: "مشمول",
  "Often changes": "يتغير غالبًا",
  Varies: "يختلف",
  "Often self-directed": "يعتمد غالبًا على التعلّم الذاتي",
  "Not always included": "غير مشمول دائمًا",
  Limited: "محدود",
  "Usually available": "متاح عادةً",
  "Depends on instructor": "يعتمد على المدرّس",
  "Not commonly available": "غير متاح عادةً",
  "Swipe to explore each comparison →": "اسحب لاستكشاف كل مقارنة ←",
  "Features and availability on typical platforms vary by provider, instructor, and program.":
    "تختلف الخصائص ومدى توفرها في المنصات المعتادة باختلاف الجهة والمدرّس والبرنامج.",

  /* Success stories */
  "Student success": "نجاح الطلاب",
  "Real learners. Real outcomes.": "متعلمون حقيقيون. نتائج حقيقية.",
  "Progress feels possible when you see people like you succeed.":
    "يصبح التقدم أقرب عندما ترى أشخاصًا مثلك ينجحون.",
  "Confidence in motion": "ثقة تتقدم",
  "I’m a Business Administration student, and I learnt a lot with Tutorings. I was a student for 6 months and went from level 1 to level 3. I also saw a great improvement when speaking to my colleagues, as that was always my main issue.":
    "أنا طالب إدارة أعمال، وتعلمت الكثير مع Tutorings. درست لمدة ستة أشهر وانتقلت من المستوى الأول إلى المستوى الثالث. كما لاحظت تحسنًا كبيرًا في التحدث مع زملائي، إذ كان ذلك دائمًا التحدي الأكبر بالنسبة لي.",
  "I joined the IELTS program because I wanted to take the exam for a scholarship. It was a one-month program, and although it was challenging, it really paid off. I achieved 7 out of 9 in IELTS, which was above the minimum requirement I needed.":
    "انضممت إلى برنامج الآيلتس لأنني أردت دخول الاختبار للحصول على منحة. استمر البرنامج شهرًا واحدًا، ورغم أنه كان مكثفًا فقد أثمر فعلًا. حققت 7 من 9 في الآيلتس، وهي درجة أعلى من الحد الأدنى المطلوب.",
  "General English student": "طالب في الإنجليزية العامة",
  "IELTS student": "طالب آيلتس",
  "IELTS & General English": "الآيلتس والإنجليزية العامة",
  "Level 1 → 3": "المستوى 1 ← 3",
  "in six months": "خلال ستة أشهر",
  "above the required score": "أعلى من الدرجة المطلوبة",
  "Real stories and verified outcomes help learners believe that progress is possible for them too.":
    "تساعد القصص الحقيقية والنتائج الموثقة المتعلمين على الإيمان بأن التقدم ممكن لهم أيضًا.",

  /* Future and final CTA */
  "Your future": "مستقبلك",
  "Imagine where English can take you.":
    "تخيّل إلى أين يمكن أن تأخذك الإنجليزية.",
  "The destination is not another completed course. It is a life with more confidence and more possibilities.":
    "الوجهة ليست إنهاء دورة أخرى، بل حياة بثقة أكبر وفرص أكثر.",
  "Study abroad": "ادرس في الخارج",
  "Meet university requirements and feel prepared for academic life.":
    "استوفِ متطلبات الجامعة واستعد للحياة الأكاديمية بثقة.",
  "Reach your IELTS goal": "حقق هدفك في الآيلتس",
  "Prepare with structure instead of stress and scattered resources.":
    "استعد بخطة منظمة بدلًا من التوتر والمصادر المتناثرة.",
  "Grow your career": "طوّر مسارك المهني",
  "Communicate more clearly in interviews, meetings, and presentations.":
    "تواصل بوضوح أكبر في المقابلات والاجتماعات والعروض.",
  "Speak with confidence": "تحدث بثقة",
  "Use English more naturally without overthinking every sentence.":
    "استخدم الإنجليزية بصورة طبيعية أكثر دون الإفراط في التفكير في كل جملة.",
  "Your next step": "خطوتك التالية",
  "Ready to begin your journey?": "هل أنت مستعد لبدء رحلتك؟",
  "Take the first step with personalized guidance built around your English goals.":
    "خذ الخطوة الأولى بتوجيه مخصص مبني على أهدافك في الإنجليزية.",
  "Your clear path starts here": "مسارك الواضح يبدأ هنا",
  "Know the next step": "اعرف الخطوة التالية",

  /* Localized schedule times */
  "8:00 AM": "8:00 ص",
  "1:00 PM": "1:00 م",
  "7:00 PM": "7:00 م",
  "8:00 PM": "8:00 م",
  "10:00 PM": "10:00 م",

  /* Footer */
  "Personalized English and IELTS tutoring built around your goals.":
    "تعليم مخصص للإنجليزية والآيلتس مبني حول أهدافك.",
  "Success Stories": "قصص النجاح",
  "Tutorings.": "Tutorings.",

  /* Chat interface and official FAQs */
  "Instant FAQ help": "مساعدة فورية للأسئلة الشائعة",
  "Frequently asked": "الأسئلة الشائعة",
  "Tutorings answers": "إجابات Tutorings",
  "Hi! Choose a common question below, or type a short question and I’ll find the closest official Tutorings answer.":
    "مرحبًا! اختر سؤالًا شائعًا أدناه، أو اكتب سؤالًا قصيرًا وسأعرض أقرب إجابة رسمية من Tutorings.",
  "Are male and female tutors available?": "هل يتوفر مدرّسون ومدرّسات؟",
  "Can I pause my program?": "هل يمكنني إيقاف برنامجي مؤقتًا؟",
  "Can I pause my program if I travel or get busy?":
    "هل يمكنني إيقاف برنامجي مؤقتًا إذا سافرت أو انشغلت؟",
  "Can I watch a live lesson later?": "هل يمكنني مشاهدة الدرس المباشر لاحقًا؟",
  "Will I keep the same tutor?": "هل سيستمر معي المدرّس نفسه؟",
  "Will I have the same tutor throughout the program?":
    "هل سيستمر معي المدرّس نفسه طوال البرنامج؟",
  "Why is the program private?": "لماذا البرنامج فردي؟",
  "How much should I study daily?": "كم أحتاج أن أدرس يوميًا؟",
  "How much daily study time do I need?": "كم من الوقت أحتاج للدراسة يوميًا؟",
  "Will I receive a certificate?": "هل سأحصل على شهادة؟",
  "Ask a question about Tutorings": "اسأل عن Tutorings",
  "Ask a quick question…": "اكتب سؤالًا سريعًا…",
  "Frontend only · Nothing is sent or stored":
    "واجهة تجريبية فقط · لا يتم إرسال أو تخزين أي بيانات",
  "Yes. Tutorings has professional male and female tutors from around the world who speak both English and Arabic to make explanations clearer.":
    "نعم. يضم Tutorings مدرّسين ومدرّسات محترفين من أنحاء العالم، ويتحدثون العربية والإنجليزية لتقديم شرح أوضح.",
  "Yes. You can request to freeze your program for up to 14 days, provided you notify Tutorings in advance, so you can continue without losing your lessons.":
    "نعم. يمكنك طلب تجميد برنامجك لمدة تصل إلى 14 يومًا، بشرط إبلاغ Tutorings مسبقًا، لتتمكن من المتابعة دون فقدان دروسك.",
  "Yes. A recorded copy is added to the app after your live lesson so you can review it later.":
    "نعم. تُضاف نسخة مسجلة إلى التطبيق بعد درسك المباشر لتتمكن من مراجعته لاحقًا.",
  "Tutorings assigns you a fixed tutor throughout your level, helping them follow your progress, weaknesses, and improvement closely.":
    "يخصص لك Tutorings مدرّسًا ثابتًا طوال المستوى، مما يساعده على متابعة تقدمك ونقاط ضعفك وتطورك عن قرب.",
  "All lessons are one-to-one, so they can be designed around your goals. Your tutor focuses on your weaknesses and guides you according to your individual needs.":
    "جميع الدروس فردية، لذلك يمكن تصميمها حول أهدافك. يركز مدرّسك على نقاط ضعفك ويوجهك وفق احتياجاتك الخاصة.",
  "It depends on your goals and current level. On average, Tutorings recommends 30–40 minutes per day outside the lesson for review and homework.":
    "يعتمد ذلك على أهدافك ومستواك الحالي. في المتوسط، يوصي Tutorings بنحو 30–40 دقيقة يوميًا خارج الدرس للمراجعة والواجبات.",
  "Yes. You receive a Cambridge-certified certificate after completing the level and successfully passing the progression test.":
    "نعم. تحصل على شهادة معتمدة من Cambridge بعد إكمال المستوى واجتياز اختبار الانتقال بنجاح.",
  "Hello! I can answer the official common questions shown above. Choose one, or ask using a few keywords.":
    "مرحبًا! يمكنني الإجابة عن الأسئلة الرسمية الشائعة المعروضة أعلاه. اختر أحدها أو اسأل باستخدام كلمات مختصرة.",
  "Tutorings offers live one-to-one English lessons, a fixed bilingual tutor, flexible scheduling, and structured paths for General English, IELTS, and STEP. Try one of the common questions above, explore the programs, or use the booking section for personal guidance.":
    "يقدم Tutorings دروس إنجليزية فردية مباشرة، ومدرّسًا ثابتًا ثنائي اللغة، ومواعيد مرنة، ومسارات منظمة للإنجليزية العامة والآيلتس وSTEP. جرّب أحد الأسئلة الشائعة أعلاه، أو استكشف البرامج، أو انتقل إلى قسم الحجز للحصول على توجيه شخصي.",

  /* Accessibility labels and descriptive alternatives */
  "Primary navigation": "التنقل الرئيسي",
  "Mobile navigation": "تنقل الجوال",
  "Open navigation menu": "فتح قائمة التنقل",
  "Close navigation menu": "إغلاق قائمة التنقل",
  "Close program quiz": "إغلاق اختبار اختيار البرنامج",
  "Tutorings home": "الصفحة الرئيسية لـ Tutorings",
  "Tutorings benefits": "مزايا Tutorings",
  "Explore the learning challenge": "استكشف تحدي التعلّم",
  "Explore Tutorings programs": "استكشف برامج Tutorings",
  "Explore the personalized learning path": "استكشف مسار التعلّم المخصص",
  "Explore how Tutorings works": "استكشف آلية عمل Tutorings",
  "Explore why learners choose Tutorings": "استكشف لماذا يختار المتعلمون Tutorings",
  "Explore student success stories": "استكشف قصص نجاح الطلاب",
  "Explore the six-step learning path": "استكشف مسار التعلّم المكوّن من ست خطوات",
  "Choose what matters most to you": "اختر ما يهمك أكثر",
  "Compare a learning schedule": "قارن جدول التعلّم",
  "Additional program benefits": "مزايا إضافية للبرنامج",
  "Cambridge learning resources": "مصادر Cambridge التعليمية",
  "Explore CEFR levels from A1 to C2": "استكشف مستويات CEFR من A1 إلى C2",
  "Golden Guarantee details": "تفاصيل الضمان الذهبي",
  "IELTS skills": "مهارات الآيلتس",
  "Tutorings partners and recognitions": "شركاء واعتمادات Tutorings",
  "Tutorings teacher and learner community": "مجتمع مدرّسي ومتعلمي Tutorings",
  "More than 50 qualified full-time teachers": "أكثر من 50 مدرّسًا مؤهلًا ومتفرغًا",
  "More than 200 students who have trusted Tutorings": "أكثر من 200 طالب وثقوا بـ Tutorings",
  "Tutorings educator standards": "معايير مدرّسي Tutorings",
  "Student testimonial carousel": "شريط آراء الطلاب",
  "Explore Tutorings English program with Cambridge curriculum":
    "استكشف برنامج Tutorings للإنجليزية بمنهج Cambridge",
  "Explore Tutorings IELTS program with IDP resources":
    "استكشف برنامج Tutorings للآيلتس بمواد IDP",
  "Explore Tutorings": "استكشف Tutorings",
  "Connect with Tutorings": "تواصل مع Tutorings",
  "Open frequently asked questions": "فتح الأسئلة الشائعة",
  "Close frequently asked questions": "إغلاق الأسئلة الشائعة",
  "Send question": "إرسال السؤال",
  "A learner struggles to improve their English, becomes overwhelmed by scattered resources, then finds Tutorings and follows a clear path toward improving every part of their English.":
    "متعلم يواجه صعوبة في تطوير لغته الإنجليزية، ويتشتت بين مصادر كثيرة، ثم يجد Tutorings ويتبع مسارًا واضحًا لتطوير جميع مهاراته في الإنجليزية.",
});

const MESSAGE_BUILDERS = Object.freeze({
  quizProgress: {
    en: ({ current, total }) => `Question ${current} of ${total}`,
    ar: ({ current, total }) => `السؤال ${current} من ${total}`,
  },
  timelineValue: {
    en: ({ step, title }) => `Step ${step}: ${title}`,
    ar: ({ step, title }) => `الخطوة ${step}: ${title}`,
  },
  timelineLabel: {
    en: ({ step, title }) => `${step} · ${title}`,
    ar: ({ step, title }) => `${step} · ${title}`,
  },
  cefrValue: {
    en: ({ code, title }) => `${code} — ${title}`,
    ar: ({ code, title }) => `${code} — ${title}`,
  },
});

const textSources = new WeakMap();
const attributeSources = new WeakMap();
let currentLanguage = "en";
let mutationObserver;

const cleanText = (value = "") => value.replace(/\s+/g, " ").trim();

const readPreferredLanguage = () => {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (SUPPORTED_LANGUAGES.has(savedLanguage)) {
      return savedLanguage;
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return "en";
};

const saveLanguage = (language) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // The page still works when language preference cannot be persisted.
  }
};

export const getLanguage = () => currentLanguage;

export const isArabic = () => currentLanguage === "ar";

export const translate = (source, language = currentLanguage) => {
  if (language !== "ar") {
    return source;
  }

  return ARABIC_TRANSLATIONS[source] ?? source;
};

export const formatMessage = (key, values = {}, language = currentLanguage) => {
  const builder = MESSAGE_BUILDERS[key]?.[language] ?? MESSAGE_BUILDERS[key]?.en;
  return builder ? builder(values) : "";
};

const getTextSource = (node, shouldRefresh = false) => {
  if (!textSources.has(node) || shouldRefresh) {
    textSources.set(node, cleanText(node.nodeValue));
  }

  return textSources.get(node) ?? "";
};

const renderTextNode = (node, shouldRefresh = false) => {
  if (
    !node.parentElement ||
    node.parentElement.closest("[data-i18n-key]") ||
    ["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentElement.tagName) ||
    node.parentElement.closest("svg")
  ) {
    return;
  }

  const source = getTextSource(node, shouldRefresh);

  if (!source) {
    return;
  }

  const rawValue = node.nodeValue;
  const leadingSpace = rawValue.match(/^\s*/)?.[0] ?? "";
  const trailingSpace = rawValue.match(/\s*$/)?.[0] ?? "";
  node.nodeValue = `${leadingSpace}${translate(source)}${trailingSpace}`;
};

const getAttributeRecord = (element) => {
  if (!attributeSources.has(element)) {
    attributeSources.set(element, {});
  }

  return attributeSources.get(element);
};

const renderAttribute = (element, attribute, shouldRefresh = false) => {
  if (!element.hasAttribute(attribute)) {
    return;
  }

  const sources = getAttributeRecord(element);

  if (!(attribute in sources) || shouldRefresh) {
    sources[attribute] = cleanText(element.getAttribute(attribute));
  }

  const source = sources[attribute];

  if (source) {
    element.setAttribute(attribute, translate(source));
  }
};

const renderKeyedElement = (element) => {
  const key = element.dataset.i18nKey;

  if (key) {
    element.textContent = translate(key);
  }
};

const renderSubtree = (root, shouldRefresh = false) => {
  if (root.nodeType === Node.TEXT_NODE) {
    renderTextNode(root, shouldRefresh);
    return;
  }

  if (!(root instanceof Element) && root !== document) {
    return;
  }

  if (root instanceof Element && root.matches("[data-i18n-key]")) {
    renderKeyedElement(root);
  }

  root.querySelectorAll?.("[data-i18n-key]").forEach(renderKeyedElement);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    renderTextNode(walker.currentNode, shouldRefresh);
  }

  const elements = [];

  if (root instanceof Element) {
    elements.push(root);
  }

  elements.push(...(root.querySelectorAll?.("*") ?? []));
  elements.forEach((element) => {
    TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      renderAttribute(element, attribute, shouldRefresh);
    });
  });
};

const updateLanguageControls = () => {
  document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
    const label = toggle.querySelector("[data-language-toggle-label]");
    const nextLanguage = currentLanguage === "ar" ? "en" : "ar";

    toggle.dataset.nextLanguage = nextLanguage;
    toggle.setAttribute(
      "aria-label",
      currentLanguage === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic",
    );

    if (label) {
      label.textContent = currentLanguage === "ar" ? "English" : "العربية";
      label.setAttribute("lang", nextLanguage);
      label.setAttribute("dir", nextLanguage === "ar" ? "rtl" : "ltr");
    }
  });
};

const applyLanguage = ({ announce = true } = {}) => {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = translate("Tutorings | English and IELTS Tutoring");

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute(
    "content",
    translate(
      "Personalized English learning that helps students communicate confidently and achieve their IELTS goals through live one-to-one tutoring.",
    ),
  );

  renderSubtree(document);
  updateLanguageControls();
  mutationObserver?.takeRecords();

  if (announce) {
    window.dispatchEvent(
      new CustomEvent("tutorings:languagechange", {
        detail: { language: currentLanguage },
      }),
    );

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }
};

export const setLanguage = (language, options = {}) => {
  if (!SUPPORTED_LANGUAGES.has(language) || language === currentLanguage) {
    return;
  }

  currentLanguage = language;
  saveLanguage(language);
  applyLanguage(options);
};

export const setLocalizedText = (element, source) => {
  if (!element) {
    return;
  }

  element.dataset.i18nKey = source;
  element.textContent = translate(source);
  mutationObserver?.takeRecords();
};

const observeLanguageContent = () => {
  if (!("MutationObserver" in window)) {
    return;
  }

  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        renderTextNode(mutation.target, true);
        return;
      }

      if (mutation.type === "attributes") {
        renderAttribute(mutation.target, mutation.attributeName, true);
        return;
      }

      mutation.addedNodes.forEach((node) => renderSubtree(node, true));
    });

    mutationObserver.takeRecords();
  });

  mutationObserver.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: TRANSLATABLE_ATTRIBUTES,
  });
};

export function initializeI18n() {
  currentLanguage = readPreferredLanguage();
  applyLanguage({ announce: false });

  document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setLanguage(currentLanguage === "ar" ? "en" : "ar");
    });
  });

  observeLanguageContent();

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY && SUPPORTED_LANGUAGES.has(event.newValue)) {
      setLanguage(event.newValue, { announce: true });
    }
  });
}
