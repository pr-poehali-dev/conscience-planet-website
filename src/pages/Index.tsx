import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7e72ef13-d58a-4508-aea6-693c8b706395/files/838295de-afe5-4cff-aed9-55f773f69d88.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О проекте", href: "#about" },
  { label: "Миссия", href: "#mission" },
  { label: "Деятельность", href: "#activity" },
  { label: "Как помочь", href: "#donate" },
  { label: "Контакты", href: "#contacts" },
];

const DONATE_AMOUNTS = [500, 1000, 2500, 5000];

const ACTIVITIES = [
  { icon: "Users", title: "Сообщество", desc: "Объединяем людей вокруг общих ценностей и целей. Создаём пространство для диалога и взаимопомощи." },
  { icon: "BookOpen", title: "Образование", desc: "Проводим мастер-классы, вебинары и обучающие программы для всех желающих." },
  { icon: "Globe", title: "Социальные проекты", desc: "Реализуем инициативы, меняющие жизнь людей к лучшему в реальном мире." },
  { icon: "Heart", title: "Поддержка", desc: "Оказываем помощь тем, кто в ней нуждается — быстро, адресно, с душой." },
  { icon: "Zap", title: "Инновации", desc: "Внедряем современные решения для повышения эффективности социальных инициатив." },
  { icon: "Star", title: "Партнёрства", desc: "Выстраиваем долгосрочные связи с организациями-единомышленниками по всей стране." },
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
  const activitySection = useInView();
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
            Мы меняем мир к лучшему
          </div>

          <h1 className="font-oswald text-6xl md:text-8xl lg:text-[100px] font-bold leading-[0.9] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            ВМЕСТЕ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#FF2EAD] to-[#AAFF00]">
              МЫ СИЛА
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Социальный проект, объединяющий людей ради добрых дел. Каждое ваше действие — шаг к лучшему миру.
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
            {[["1 200+", "Участников"], ["47", "Проектов"], ["5 лет", "В деле"]].map(([num, label]) => (
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
              Мы — команда единомышленников, которая верит: небольшие добрые дела способны изменить мир. Наш проект объединяет волонтёров, специалистов и неравнодушных людей для реализации социальных инициатив.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              С 2019 года мы реализовали десятки программ помощи, образовательных проектов и общественных инициатив по всей стране.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#00D4FF]/40 to-transparent" />
              <div className="font-oswald text-sm text-white/30 uppercase tracking-widest">С 2019 года</div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] via-[#FF2EAD] to-[#AAFF00] rounded-2xl opacity-20 blur-sm" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { label: "Регионов охвата", value: "23", color: "#00D4FF" },
                  { label: "Волонтёров", value: "450+", color: "#FF2EAD" },
                  { label: "Выдано грантов", value: "₽8.4М", color: "#AAFF00" },
                  { label: "Довольных людей", value: "10К+", color: "#FF6B2E" },
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
                "Создать устойчивое сообщество добра, где каждый человек — независимо от возраста и положения — может найти поддержку и стать частью перемен."
              </blockquote>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: "Target", title: "Адресность", desc: "Каждая наша программа направлена на конкретных людей с реальными потребностями" },
                  { icon: "Scale", title: "Прозрачность", desc: "Открытая отчётность и полный контроль за расходованием пожертвований" },
                  { icon: "TrendingUp", title: "Результат", desc: "Измеримый социальный эффект от каждого проекта и инициативы" },
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
              { icon: "Users", title: "Волонтёрство", desc: "Помогай делом, а не только деньгами" },
              { icon: "Share2", title: "Рассказать друзьям", desc: "Поделись нашей историей в соцсетях" },
              { icon: "Handshake", title: "Партнёрство", desc: "Для бизнеса и организаций" },
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