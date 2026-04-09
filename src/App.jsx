import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Theme ───────────────────────────────────────────────────────────────────

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}

// ─── Animated Background ─────────────────────────────────────────────────────

function AnimatedBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a0f] transition-colors duration-500" />
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/8 dark:bg-emerald-500/4 blur-[100px]"
        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Section wrapper with fade-in ────────────────────────────────────────────

function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── SVG Icons (inline, no external libs) ────────────────────────────────────

const Icons = {
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx={12} cy={12} r={5} />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x={2} y={4} width={20} height={16} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  smartphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x={5} y={2} width={14} height={20} rx={2} ry={2} />
      <path d="M12 18h.01" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x={2} y={2} width={20} height={8} rx={2} ry={2} />
      <rect x={2} y={14} width={20} height={8} rx={2} ry={2} />
      <line x1={6} y1={6} x2={6.01} y2={6} />
      <line x1={6} y1={18} x2={6.01} y2={18} />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ─── Chip ────────────────────────────────────────────────────────────────────

function Chip({ children, accent }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        accent
          ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/20"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Stack", href: "#stack" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
          TV<span className="text-violet-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Alternar tema"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {dark ? Icons.moon : Icons.sun}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Floating Preview: Android App ───────────────────────────────────────────

function FloatingAndroid() {
  const bars = [35, 55, 45, 70, 60, 80, 50];
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-[200px] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">Cotacao App</div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">USD/BRL</span>
          <span className="text-xs text-emerald-500 font-medium">+1.2%</span>
        </div>
        <div className="text-2xl font-bold text-violet-500 mt-0.5">R$ 5,12</div>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-end gap-1.5 h-16">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-violet-500/80"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-zinc-400">7 dias</span>
          <span className="text-[9px] text-emerald-500">Tempo real</span>
        </div>
      </div>
      <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 flex gap-2">
        <div className="text-[9px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-500 font-medium">KMP</div>
        <div className="text-[9px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-medium">Compose</div>
      </div>
    </motion.div>
  );
}

// ─── Floating Preview: Recruiter Card ────────────────────────────────────────

function FloatingRecruiterCard() {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="w-[220px] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
          TV
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">Talisson V.</div>
          <div className="text-[10px] text-zinc-500">Backend & Android Dev</div>
        </div>
      </div>
      <div className="space-y-2">
        {["Android", "KMP", "Backend"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{s}</span>
            <div className="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-violet-500"
                initial={{ width: 0 }}
                animate={{ width: s === "Android" ? "90%" : s === "KMP" ? "85%" : "80%" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-wrap gap-1">
          {["Kotlin", "Ktor", "Compose"].map((t) => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Floating Preview: Backend API ───────────────────────────────────────────

function FloatingBackend() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="w-[210px] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
    >
      <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
        {Icons.server}
        <span className="text-[10px] font-mono text-zinc-500">Ktor API</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <div className="p-3 space-y-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">GET</span>
          <span className="text-zinc-600 dark:text-zinc-400">/tasks</span>
          <span className="ml-auto text-emerald-500 text-[9px]">200</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">POST</span>
          <span className="text-zinc-600 dark:text-zinc-400">/tasks</span>
          <span className="ml-auto text-emerald-500 text-[9px]">201</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">PUT</span>
          <span className="text-zinc-600 dark:text-zinc-400">/tasks/:id</span>
          <span className="ml-auto text-emerald-500 text-[9px]">200</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-500/15 text-red-600 dark:text-red-400 font-bold">DEL</span>
          <span className="text-zinc-600 dark:text-zinc-400">/tasks/:id</span>
          <span className="ml-auto text-emerald-500 text-[9px]">204</span>
        </div>
      </div>
      <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 flex gap-1.5">
        {["Ktor", "Docker", "MySQL"].map((t) => (
          <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-500 font-medium">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                Disponivel para oportunidades
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight text-zinc-900 dark:text-white tracking-tight">
              Desenvolvedor{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
                Android e Backend
              </span>{" "}
              com foco em Kotlin Multiplatform
            </h1>

            <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Arquitetura limpa, codigo avaliavel e projetos que falam por si.
              Foco em{" "}
              <strong className="text-zinc-700 dark:text-zinc-300">
                Jetpack Compose, KMP, Ktor e Spring Boot
              </strong>
              .
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors shadow-lg shadow-violet-500/25"
              >
                Ver projetos principais
                {Icons.arrow}
              </a>
              <a
                href="https://github.com/TalissonVitorino"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                {Icons.github}
                Abrir GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative h-[500px]"
          >
            <div className="absolute left-0 top-4">
              <FloatingAndroid />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
              <FloatingRecruiterCard />
            </div>
            <div className="absolute right-0 bottom-4">
              <FloatingBackend />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Recruiter Snapshot ──────────────────────────────────────────────────────

const snapshotCards = [
  {
    icon: Icons.code,
    title: "Stack Principal",
    items: ["Kotlin / Java", "Jetpack Compose", "KMP", "Ktor / Spring Boot"],
  },
  {
    icon: Icons.smartphone,
    title: "Tipo de Entrega",
    items: ["Apps Android nativos", "APIs REST robustas", "Projetos multiplataforma"],
  },
  {
    icon: Icons.check,
    title: "O que Avaliar",
    items: ["Codigo no GitHub", "Arquitetura dos projetos", "README detalhado"],
  },
  {
    icon: Icons.server,
    title: "Disponibilidade",
    items: ["Portfolio aberto", "Projetos documentados", "Codigo revisavel"],
  },
];

function RecruiterSnapshot() {
  return (
    <Section id="snapshot" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Visao Rapida para Recrutadores
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Entenda meu perfil em segundos. Sem enrolacao.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {snapshotCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-3">
                {card.title}
              </h3>
              <ul className="space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="w-1 h-1 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Project visual previews ─────────────────────────────────────────────────

function CotacaoPreview() {
  return (
    <div className="w-full h-40 bg-gradient-to-br from-violet-500/5 to-blue-500/5 dark:from-violet-500/10 dark:to-blue-500/10 rounded-xl flex items-center justify-center p-4">
      <div className="flex gap-3 items-end h-24">
        {[40, 60, 45, 75, 55, 80, 65].map((h, i) => (
          <motion.div
            key={i}
            className="w-5 rounded-t bg-gradient-to-t from-violet-500 to-blue-500 opacity-80"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

function NutrivoxPreview() {
  return (
    <div className="w-full h-40 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl flex items-center justify-center p-4">
      <div className="space-y-2 w-full max-w-[180px]">
        <div className="h-2.5 rounded-full bg-emerald-500/30 w-full" />
        <div className="h-2.5 rounded-full bg-emerald-500/20 w-4/5" />
        <div className="h-2.5 rounded-full bg-emerald-500/15 w-3/5" />
        <div className="mt-3 flex gap-1.5">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20" />
          <div className="w-6 h-6 rounded-full bg-teal-500/20" />
          <div className="w-6 h-6 rounded-full bg-emerald-500/15" />
        </div>
      </div>
    </div>
  );
}

function KtorPreview() {
  return (
    <div className="w-full h-40 bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10 rounded-xl p-4 font-mono text-[10px] space-y-1.5 overflow-hidden">
      <div className="flex gap-2 items-center">
        <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">GET</span>
        <span className="text-zinc-500">/tasks</span>
        <span className="ml-auto text-emerald-500">200 OK</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold">POST</span>
        <span className="text-zinc-500">/tasks</span>
        <span className="ml-auto text-emerald-500">201</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-500/20 text-red-600 dark:text-red-400 font-bold">DEL</span>
        <span className="text-zinc-500">/tasks/:id</span>
        <span className="ml-auto text-zinc-400">204</span>
      </div>
      <div className="mt-2 text-zinc-400">{"{ \"status\": \"running\" }"}</div>
    </div>
  );
}

// ─── Projects Section ────────────────────────────────────────────────────────

const projects = [
  {
    title: "Cotacao Multiplatform",
    subtitle: "Android + Desktop \u2022 Kotlin Multiplatform",
    description:
      "App de cotacao de moedas em tempo real com KMP. Arquitetura MVVM, StateFlow e integracao com AwesomeAPI. Roda em Android e Desktop com codigo compartilhado.",
    highlights: ["Multiplataforma real", "Reatividade com StateFlow", "API em tempo real"],
    stack: ["Kotlin", "KMP", "Compose", "MVVM", "StateFlow", "AwesomeAPI"],
    repo: "https://github.com/TalissonVitorino",
    preview: <CotacaoPreview />,
  },
  {
    title: "Nutrivox",
    subtitle: "Conceito de Produto \u2022 UX Clinica",
    description:
      "Conceito de app voltado para nutricao com assistencia de IA nao prescritiva. Foco em experiencia clinica limpa, acessibilidade e fluxos intuitivos.",
    highlights: ["IA assistiva", "UX clinica", "Design acessivel"],
    stack: ["Kotlin", "Compose", "MVVM", "Room", "Material 3"],
    preview: <NutrivoxPreview />,
  },
  {
    title: "Ktor Minhas Tarefas",
    subtitle: "REST API \u2022 Backend com Kotlin",
    description:
      "API REST completa para gerenciamento de tarefas. Serializacao com kotlinx, rotas tipadas e container Docker pronto para deploy.",
    highlights: ["CRUD completo", "Docker ready", "Serializacao tipada"],
    stack: ["Kotlin", "Ktor", "Serialization", "Docker", "MySQL"],
    repo: "https://github.com/TalissonVitorino",
    preview: <KtorPreview />,
  },
];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">{project.preview}</div>

      <div className="px-6 pb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{project.title}</h3>
        <p className="text-sm text-violet-500 font-medium mt-1">{project.subtitle}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.highlights.map((h) => (
            <Chip key={h} accent>
              {h}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            {Icons.github}
            Ver repositorio
            {Icons.external}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <Section id="projetos" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Projetos Principais
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Projetos reais com codigo aberto, documentacao e decisoes tecnicas claras.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="sobre" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Sobre</h2>
          <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
            <p>
              Sou <strong className="text-zinc-700 dark:text-zinc-300">Talisson Vitorino</strong>,
              desenvolvedor focado em <strong className="text-zinc-700 dark:text-zinc-300">Android e Backend</strong> com
              o ecossistema Kotlin como base.
            </p>
            <p>
              Trabalho com <strong className="text-zinc-700 dark:text-zinc-300">Jetpack Compose</strong> para interfaces
              nativas, <strong className="text-zinc-700 dark:text-zinc-300">Kotlin Multiplatform</strong> para compartilhar
              logica entre plataformas, e <strong className="text-zinc-700 dark:text-zinc-300">Ktor / Spring Boot</strong>{" "}
              para APIs robustas.
            </p>
            <p>
              Minha abordagem prioriza <strong className="text-zinc-700 dark:text-zinc-300">arquitetura limpa</strong>,
              codigo legivel e projetos que qualquer recrutador ou tech lead pode avaliar diretamente pelo GitHub.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Stack Section ───────────────────────────────────────────────────────────

const stackItems = [
  "Kotlin",
  "Java",
  "Android",
  "Jetpack Compose",
  "Kotlin Multiplatform",
  "Ktor",
  "Spring Boot",
  "StateFlow",
  "Clean Architecture",
  "MVVM",
  "Docker",
  "MySQL",
  "SQLite",
  "REST APIs",
  "Git",
];

function Stack() {
  return (
    <Section id="stack" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Stack & Tecnologias</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10">
          Tecnologias que uso no dia a dia.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {stackItems.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.08 }}
              className="px-4 py-2 rounded-2xl text-sm font-medium bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400 transition-all cursor-default shadow-sm"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contato" className="py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Contato</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          Quer conversar sobre um projeto ou oportunidade? Entre em contato.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/TalissonVitorino"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            {Icons.github}
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/talissonvitorino"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0077b5] text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            {Icons.linkedin}
            LinkedIn
          </a>
          <a
            href="mailto:talissonv57@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/25"
          >
            {Icons.mail}
            Email
          </a>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          Talisson Vitorino &copy; {new Date().getFullYear()} &mdash; Feito com React, Tailwind CSS e Framer Motion
        </p>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <AnimatedBg />
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <Hero />
      <RecruiterSnapshot />
      <Projects />
      <About />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
