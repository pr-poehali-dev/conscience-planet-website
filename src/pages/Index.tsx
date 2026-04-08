import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7e72ef13-d58a-4508-aea6-693c8b706395/files/838295de-afe5-4cff-aed9-55f773f69d88.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О проекте", href: "#about" },
  { label: "Миссия", href: "#mission" },
  { label: "Гипотеза", href: "#hypothesis" },
  { label: "Деятельность", href: "#activity" },
  { label: "Этапы", href: "#stages" },
  { label: "Как помочь", href: "#donate" },
  { label: "Контакты", href: "#contacts" },
];

const DONATE_AMOUNTS = [500, 1000, 2500, 5000];

const ACTIVITIES = [
  { icon: "Microscope", title: "Научная сфера", desc: "Фундаментальные исследования в дерматоглифике, антропологии и нейробиологии." },
  { icon: "BarChart2", title: "Статистика и ИИ", desc: "Обработка больших массивов биометрических данных с применением машинного обучения." },
  { icon: "Database", title: "IT-инфраструктура", desc: "Создание цифровой платформы для сбора, хранения и анализа дерматоглифических данных." },
  { icon: "BookOpen", title: "Гуманитарная сфера", desc: "Осмысление этических аспектов и разработка гуманистических концепций." },
  { icon: "GraduationCap", title: "Просвещение", desc: "Популяризация научного подхода и разработка образовательных программ." },
  { icon: "Globe", title: "Международное партнёрство", desc: "Сотрудничество с ВОЗ, ЮНЕСКО, РАН и международными центрами дерматоглифики." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const aboutSection = useInView();
  const missionSection = useInView();
  const hypothesisSection = useInView();
  const activitySection = useInView();
  const stagesSection = useInView();
  const donateSection = useInView();
  const contactsSection = useInView();

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="bg-[#09090f] text-white font-ibm min-h-screen overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#09090f]/95 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/7e72ef13-d58a-4508-aea6-693c8b706395/bucket/eb5383e6-f9ca-4fe8-b468-187333af7244.jpg"
              alt="Логотип"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00D4FF]/40"
            />
            <span className="font-oswald text-xl font-bold tracking-widest">
              <span className="text-[#00D4FF]">СОВЕСТЬ</span>
              <span className="text-white"> ПЛАНЕТЫ</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-white/60 hover:text-[#00D4FF] transition-colors duration-200 tracking-wide uppercase">
                {link.label}
              </a>
            ))}
          </div>

          <button onClick={() => scrollTo("#donate")}
            className="hidden md:flex items-center gap-2 bg-[#00D4FF] text-[#09090f] font-oswald font-semibold text-sm px-5 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#AAFF00] transition-colors duration-300">
            <Icon name="Heart" size={14} />
            Поддержать
          </button>

          <button className="md:hidden text-white/80" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d0d1a]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-oswald text-lg uppercase tracking-wider text-white/70 hover:text-[#00D4FF] transition-colors">
                {link.label}
              </a>
            ))}
            <button onClick={() => scrollTo("#donate")}
              className="mt-2 bg-[#00D4FF] text-[#09090f] font-oswald font-bold text-sm px-5 py-3 rounded-full uppercase tracking-wider">
              Поддержать проект
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090f]/60 via-[#09090f]/40 to-[#09090f]" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#FF2EAD]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AAFF00]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-medium uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full animate-pulse" />
            Междисциплинарный научный проект
          </div>

          <h1 className="font-oswald text-6xl md:text-8xl lg:text-[100px] font-bold leading-[0.9] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            СОВЕСТЬ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#FF2EAD] to-[#AAFF00]">
              ПЛАНЕТЫ
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Изучаем феномен преемственности индивидуальности через дерматоглифику. Наука на службе гуманизации общества и глобального здоровья.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <button onClick={() => scrollTo("#donate")}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#00D4FF] to-[#AAFF00] text-[#09090f] font-oswald font-bold text-base px-8 py-4 rounded-full uppercase tracking-wider hover:scale-105 transition-transform duration-200">
              <Icon name="Heart" size={18} />
              Поддержать проект
            </button>
            <button onClick={() => scrollTo("#about")}
              className="flex items-center justify-center gap-3 border border-white/20 text-white font-oswald font-medium text-base px-8 py-4 rounded-full uppercase tracking-wider hover:border-[#00D4FF]/60 hover:text-[#00D4FF] transition-all duration-200">
              Узнать больше
              <Icon name="ArrowDown" size={16} />
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
            {[["10 000+", "Участников"], ["10 лет", "Программа"], ["220 млн ₽", "Бюджет"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-oswald text-2xl md:text-3xl font-bold text-[#00D4FF]">{num}</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutSection.ref} className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="text-[#00D4FF] text-xs font-medium uppercase tracking-[0.3em] mb-4">О проекте</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold leading-tight mb-6">
              КТО МЫ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#FF2EAD]">ТАКИЕ?</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              «Совесть Планеты» — междисциплинарный научный проект, нацеленный на укрепление глобального здоровья и гармонизацию общества через изучение феномена преемственности индивидуальности.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Мы объединяем дерматоглифику, генетику, психологию, нейробиологию, статистику и IT, чтобы исследовать гипотезу о возможной связи отпечатков пальцев и стоп с феноменом реинкарнации — и перевести дискуссию из сферы веры в область эмпирического анализа.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#00D4FF]/40 to-transparent" />
              <div className="font-oswald text-sm text-white/30 uppercase tracking-widest">Наука. Данные. Гуманизм.</div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] via-[#FF2EAD] to-[#AAFF00] rounded-2xl opacity-20 blur-sm" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { label: "Участников в базе", value: "10 000+", color: "#00D4FF" },
                  { label: "Научных статей", value: "15+", color: "#FF2EAD" },
                  { label: "Лет программы", value: "10", color: "#AAFF00" },
                  { label: "Сфер науки", value: "6", color: "#FF6B2E" },
                ].map(item => (
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                    <div className="font-oswald text-3xl font-bold mb-1" style={{ color: item.color }}>{item.value}</div>
                    <div className="text-white/50 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" ref={missionSection.ref} className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/3 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF2EAD]/8 rounded-full blur-[120px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${missionSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#FF2EAD] text-xs font-medium uppercase tracking-[0.3em] mb-4">Наша миссия</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold leading-tight">
              ЗАЧЕМ МЫ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2EAD] to-[#AAFF00]">ЗДЕСЬ?</span>
            </h2>
          </div>

          <div className={`transition-all duration-700 delay-200 ${missionSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative border border-white/10 rounded-3xl p-10 md:p-14 bg-white/3 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2EAD]/60 to-transparent" />

              <blockquote className="font-oswald text-3xl md:text-4xl font-medium leading-tight text-center mb-10 text-white/90">
                "Создать научную основу для гуманизации общества и предотвращения деструктивных сценариев развития цивилизации."
              </blockquote>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: "Target", title: "Адресность", desc: "Экспериментальная проверка гипотезы о преемственности индивидуальности через дерматоглифику" },
                  { icon: "Scale", title: "Прозрачность", desc: "Открытая методология, публикации в рецензируемых журналах и независимая верификация" },
                  { icon: "TrendingUp", title: "Результат", desc: "Перевод дискуссии о реинкарнации из сферы веры в область эмпирического анализа" },
                ].map(item => (
                  <div key={item.title} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/[0.08] hover:border-[#FF2EAD]/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#FF2EAD]/15 flex items-center justify-center mb-4">
                      <Icon name={item.icon} size={22} className="text-[#FF2EAD]" />
                    </div>
                    <div className="font-oswald text-lg font-semibold mb-2">{item.title}</div>
                    <div className="text-white/50 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HYPOTHESIS */}
      <section id="hypothesis" ref={hypothesisSection.ref} className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#AAFF00]/3 to-transparent" />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-[#00D4FF]/6 rounded-full blur-[130px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${hypothesisSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#AAFF00] text-xs font-medium uppercase tracking-[0.3em] mb-4">Научная основа</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold leading-tight">
              ОСНОВНАЯ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AAFF00] to-[#00D4FF]">ГИПОТЕЗА</span>
            </h2>
          </div>

          <div className={`transition-all duration-700 delay-100 ${hypothesisSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Central hypothesis block */}
            <div className="relative border border-[#AAFF00]/20 rounded-3xl p-10 md:p-14 bg-white/[0.02] mb-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AAFF00]/50 to-transparent" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#AAFF00]/5 rounded-full blur-[60px]" />
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-[#AAFF00]/10 border border-[#AAFF00]/30 flex items-center justify-center shrink-0">
                  <Icon name="Fingerprint" size={32} className="text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="font-oswald text-2xl font-semibold text-[#AAFF00] mb-4">Дерматоглифика и реинкарнация</h3>
                  <p className="text-white/70 text-base leading-relaxed mb-4">
                    Дерматоглифические узоры (отпечатки пальцев и стоп) формируются в период эмбрионального развития и остаются неизменными на протяжении всей жизни. Они уникальны для каждого человека и несут в себе закодированную биологическую информацию.
                  </p>
                  <p className="text-white/70 text-base leading-relaxed">
                    Наша гипотеза: если феномен реинкарнации существует как биологически обусловленный процесс, то дерматоглифические паттерны могут сохранять статистически значимые следы преемственности индивидуальности — обнаруживаемые через сравнительный анализ больших данных.
                  </p>
                </div>
              </div>
            </div>

            {/* Supporting pillars */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: "Dna",
                  color: "#00D4FF",
                  title: "Генетический аспект",
                  desc: "Анализ связи дерматоглифических паттернов с генетическими маркерами. Выявление наследственных и ненаследственных компонентов узоров для отделения биологической преемственности от случайных совпадений.",
                },
                {
                  icon: "Brain",
                  color: "#FF2EAD",
                  title: "Нейробиологический аспект",
                  desc: "Исследование возможных нейробиологических механизмов формирования дерматоглифических паттернов и их корреляции с психологическими характеристиками личности.",
                },
                {
                  icon: "ChartScatter",
                  color: "#AAFF00",
                  title: "Статистический анализ",
                  desc: "Применение методов машинного обучения для поиска скрытых закономерностей в массиве из 10 000+ биометрических профилей. Контроль случайности через многократное тестирование гипотез.",
                },
                {
                  icon: "Scale",
                  color: "#FF6B2E",
                  title: "Этические границы",
                  desc: "Проект строго придерживается принципа научного нейтралитета. Мы не продвигаем религиозные или эзотерические концепции — лишь проверяем статистические закономерности эмпирическим путём.",
                },
              ].map(item => (
                <div key={item.title} className="flex gap-5 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon name={item.icon} size={22} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 className="font-oswald text-lg font-semibold mb-2" style={{ color: item.color }}>{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expected outcomes */}
            <div className="border border-white/[0.08] rounded-2xl p-7 bg-white/[0.02]">
              <div className="font-oswald text-lg font-semibold mb-5 text-white/80">Ожидаемые научные результаты</div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { num: "10 000+", label: "записей в базе данных дерматоглифики стоп и кистей — крупнейшей в мире" },
                  { num: "15+", label: "публикаций в рецензируемых журналах с открытым доступом к данным" },
                  { num: "1", label: "новое научное направление на стыке дерматоглифики, генетики и психологии" },
                ].map(item => (
                  <div key={item.num} className="flex gap-4 items-start">
                    <div className="font-oswald text-3xl font-bold text-[#AAFF00] shrink-0">{item.num}</div>
                    <div className="text-white/45 text-sm leading-relaxed pt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITY */}
      <section id="activity" ref={activitySection.ref} className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${activitySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#AAFF00] text-xs font-medium uppercase tracking-[0.3em] mb-4">Деятельность</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold">
              ЧТО МЫ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AAFF00] to-[#00D4FF]">ДЕЛАЕМ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVITIES.map((item, i) => (
              <div key={item.title}
                className={`group relative border border-white/[0.08] rounded-2xl p-7 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#AAFF00]/30 transition-all duration-300 overflow-hidden cursor-pointer ${activitySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 0.1}s`, transitionDuration: "700ms" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#AAFF00]/0 group-hover:from-[#AAFF00]/5 to-transparent transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#AAFF00]/10 border border-[#AAFF00]/20 flex items-center justify-center mb-5 group-hover:bg-[#AAFF00]/20 transition-colors">
                    <Icon name={item.icon} size={22} className="text-[#AAFF00]" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold mb-3 group-hover:text-[#AAFF00] transition-colors">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" ref={stagesSection.ref} className="py-28 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-[350px] h-[350px] bg-[#FF2EAD]/6 rounded-full blur-[120px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${stagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#FF2EAD] text-xs font-medium uppercase tracking-[0.3em] mb-4">Дорожная карта</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold">
              ЭТАПЫ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2EAD] to-[#FF6B2E]">ПРОЕКТА</span>
            </h2>
            <p className="text-white/40 text-base mt-4">10-летняя программа исследований</p>
          </div>

          <div className={`relative transition-all duration-700 delay-100 ${stagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Vertical line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF2EAD]/60 via-[#FF6B2E]/40 to-transparent md:-translate-x-px" />

            <div className="flex flex-col gap-8">
              {[
                {
                  period: "0–6 мес.",
                  title: "Подготовительный этап",
                  items: ["Перевод проекта из статуса общественной инициативы в пилотный эксперимент на базе Академии наук РФ", "Формирование научного комитета", "Разработка технического задания", "Получение разрешений этических комитетов", "Создание прототипа ПО и закупка оборудования"],
                  color: "#FF2EAD",
                  index: 1,
                },
                {
                  period: "6–12 мес.",
                  title: "Пилотный этап",
                  items: ["Набор пилотной группы 500–1 000 участников", "Апробация методики сбора данных", "Тестирование базы данных и ПО", "Первичный статистический анализ"],
                  color: "#FF6B2E",
                  index: 2,
                },
                {
                  period: "12–36 мес.",
                  title: "Масштабирование",
                  items: ["Расширение выборки до 5 000 человек", "Внедрение автоматизированных инструментов анализа", "Публикация первых результатов"],
                  color: "#AAFF00",
                  index: 3,
                },
                {
                  period: "36–72 мес.",
                  title: "Основной сбор данных",
                  items: ["Доведение выборки до 10 000+ участников", "Систематический анализ новых данных", "Валидация выявленных закономерностей"],
                  color: "#00D4FF",
                  index: 4,
                },
                {
                  period: "72–108 мес.",
                  title: "Обобщение результатов",
                  items: ["Финальный статистический анализ", "Формулировка научных выводов", "Подготовка монографии и итоговых отчётов"],
                  color: "#FF2EAD",
                  index: 5,
                },
                {
                  period: "108–120 мес.",
                  title: "Постпроектный этап",
                  items: ["Открытая база данных (с анонимизацией)", "Методические рекомендации", "Планирование последующих исследований"],
                  color: "#AAFF00",
                  index: 6,
                },
              ].map((stage, i) => (
                <div key={stage.index}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start transition-all duration-700 ${stagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}>

                  {/* Dot */}
                  <div className="relative z-10 flex flex-col items-center shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4">
                    <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-oswald font-bold text-lg"
                      style={{ borderColor: stage.color, backgroundColor: `${stage.color}15`, color: stage.color }}>
                      {stage.index}
                    </div>
                  </div>

                  {/* Card — alternates left/right on desktop */}
                  <div className={`flex-1 md:w-[calc(50%-48px)] md:flex-none ${i % 2 === 0 ? "md:pr-16" : "md:pl-16 md:ml-auto"}`}>
                    <div className="border border-white/[0.08] rounded-2xl p-6 bg-white/[0.02] hover:border-white/15 transition-colors group"
                      style={{ borderLeftColor: `${stage.color}40`, borderLeftWidth: "2px" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-oswald text-sm font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                          style={{ backgroundColor: `${stage.color}15`, color: stage.color }}>
                          {stage.period}
                        </span>
                      </div>
                      <h4 className="font-oswald text-xl font-semibold mb-3 group-hover:text-white transition-colors" style={{ color: stage.color }}>{stage.title}</h4>
                      <ul className="flex flex-col gap-1.5">
                        {stage.items.map(item => (
                          <li key={item} className="flex items-start gap-2 text-white/50 text-sm">
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Budget footer */}
            <div className={`mt-14 border border-white/[0.08] rounded-2xl p-7 bg-white/[0.02] transition-all duration-700 delay-700 ${stagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Общий бюджет проекта</div>
                  <div className="font-oswald text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2EAD] to-[#FF6B2E]">220 млн ₽</div>
                  <div className="text-white/40 text-sm mt-1">22 млн ₽ / год · 10 лет</div>
                </div>
                <div className="h-px md:h-16 w-full md:w-px bg-white/10" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
                  {[
                    { label: "Госгранты", icon: "Landmark" },
                    { label: "Частные фонды", icon: "Heart" },
                    { label: "Корпоративные партнёры", icon: "Building2" },
                    { label: "Краудфандинг", icon: "Users" },
                  ].map(s => (
                    <div key={s.label} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                        <Icon name={s.icon} size={18} className="text-white/50" />
                      </div>
                      <div className="text-white/40 text-xs leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" ref={donateSection.ref} className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2EAD]/4 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#AAFF00]/6 rounded-full blur-[150px]" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${donateSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#FF2EAD] text-xs font-medium uppercase tracking-[0.3em] mb-4">Как помочь</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold mb-4">
              ПОДДЕРЖИ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2EAD] to-[#FF6B2E]">НАС</span>
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Ваше пожертвование напрямую финансирует наши программы. Каждый рубль имеет значение.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${donateSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {donateSuccess ? (
              <div className="border border-[#AAFF00]/30 bg-[#AAFF00]/10 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#AAFF00]/20 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-[#AAFF00]" />
                </div>
                <h3 className="font-oswald text-3xl font-bold text-[#AAFF00] mb-3">Спасибо!</h3>
                <p className="text-white/60">Ваша поддержка бесценна. Мы уже работаем над новыми проектами благодаря вам.</p>
                <button onClick={() => setDonateSuccess(false)} className="mt-6 text-white/40 text-sm hover:text-white/60 transition-colors">
                  Пожертвовать ещё
                </button>
              </div>
            ) : (
              <div className="border border-white/10 rounded-3xl p-8 md:p-10 bg-white/[0.03] overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2EAD]/50 to-transparent" />

                <div className="mb-6">
                  <div className="text-white/60 text-sm uppercase tracking-widest mb-3 font-medium">Выберите сумму</div>
                  <div className="grid grid-cols-4 gap-3">
                    {DONATE_AMOUNTS.map(amount => (
                      <button key={amount}
                        onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                        className={`py-3 rounded-xl font-oswald font-semibold text-base transition-all duration-200 ${
                          selectedAmount === amount && !customAmount
                            ? "bg-gradient-to-r from-[#FF2EAD] to-[#FF6B2E] text-white scale-105"
                            : "bg-white/[0.08] border border-white/10 text-white/70 hover:border-[#FF2EAD]/40 hover:text-white"
                        }`}>
                        {amount.toLocaleString("ru")} ₽
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-white/60 text-sm uppercase tracking-widest mb-3 font-medium">Или введите сумму</div>
                  <div className="relative">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                      placeholder="Введите сумму в рублях"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/30 text-base focus:outline-none focus:border-[#FF2EAD]/60 transition-colors"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 font-oswald text-lg">₽</span>
                  </div>
                </div>

                <button onClick={() => setDonateSuccess(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#FF2EAD] to-[#FF6B2E] text-white font-oswald font-bold text-lg uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-3">
                  <Icon name="Heart" size={20} />
                  {finalAmount > 0 ? `Пожертвовать ${finalAmount.toLocaleString("ru")} ₽` : "Пожертвовать"}
                </button>

                <p className="text-white/30 text-xs text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с условиями пожертвования. Оплата защищена.
                </p>
              </div>
            )}
          </div>

          <div className={`mt-10 grid md:grid-cols-3 gap-4 transition-all duration-700 delay-300 ${donateSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { icon: "FlaskConical", title: "Стать участником", desc: "Учёные, IT-специалисты и аналитики данных" },
              { icon: "Share2", title: "Рассказать о нас", desc: "Распространи информацию о проекте" },
              { icon: "Handshake", title: "Партнёрство", desc: "Для фондов, компаний и организаций" },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-white/15 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={18} className="text-white/60" />
                </div>
                <div>
                  <div className="font-oswald font-semibold text-base mb-1">{item.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactsSection.ref} className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${contactsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[#00D4FF] text-xs font-medium uppercase tracking-[0.3em] mb-4">Контакты</div>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold">
              СВЯЖИСЬ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#AAFF00]">С НАМИ</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 delay-100 ${contactsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="border border-white/10 rounded-3xl p-8 bg-white/[0.03] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent" />
              {contactSent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#00D4FF]/15 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Send" size={24} className="text-[#00D4FF]" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-[#00D4FF] mb-2">Сообщение отправлено!</h3>
                  <p className="text-white/50 text-sm">Мы свяжемся с вами в течение одного рабочего дня.</p>
                  <button onClick={() => setContactSent(false)} className="mt-5 text-white/30 text-xs hover:text-white/50 transition-colors">Отправить ещё</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="flex flex-col gap-4">
                  <h3 className="font-oswald text-xl font-semibold mb-2">Написать нам</h3>
                  <input required placeholder="Ваше имя" className="bg-white/5 border border-white/[0.12] rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" />
                  <input required type="email" placeholder="Email адрес" className="bg-white/5 border border-white/[0.12] rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors" />
                  <textarea required rows={4} placeholder="Ваше сообщение..." className="bg-white/5 border border-white/[0.12] rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none" />
                  <button type="submit" className="py-4 bg-gradient-to-r from-[#00D4FF] to-[#AAFF00] text-[#09090f] font-oswald font-bold text-base uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-transform duration-200">
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-5 justify-center">
              {[
                { icon: "Mail", label: "Email", value: "info@project.ru", color: "#00D4FF" },
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00", color: "#FF2EAD" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, 1", color: "#AAFF00" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 10:00–19:00", color: "#FF6B2E" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-5 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                    <Icon name={item.icon} size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "Youtube", label: "YouTube" },
                ].map(s => (
                  <button key={s.label} className="flex-1 py-3 border border-white/10 rounded-xl text-white/50 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                    <Icon name={s.icon} size={16} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-xl font-bold tracking-widest">
            <span className="text-[#00D4FF]">СОВЕСТЬ</span><span className="text-white/60"> ПЛАНЕТЫ</span>
          </div>
          <div className="text-white/30 text-sm">© 2026 Все права защищены</div>
          <div className="flex gap-6">
            {["Политика конфиденциальности", "Условия использования"].map(link => (
              <a key={link} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;