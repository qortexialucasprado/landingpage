import { useEffect, useState, useRef } from "react";
import logoLp from "../imports/Html→Body/Logo_LP.png";
import logoLucasPrado from "../imports/Html→Body/Logo_Lucas_Prado.png";
import lucasPradoPerfil from "../imports/Html→Body/Lucas.Prado.png";
import { FaqAlienDecoration } from "./components/FaqAlienDecoration";
import { ResultadosCarousel } from "./components/ResultadosCarousel";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { getWhatsAppUrl, siteEnv } from "../config/env";

const WHATSAPP_URL = getWhatsAppUrl();

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load Iconify
    const script = document.createElement("script");
    script.src =
      "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight && heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      ".reveal-up, .reveal-right, .reveal-scale",
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition =
        targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav"
            : "bg-transparent border-transparent"
        } border-b`}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <a
              href="#"
              onClick={(e) => scrollToSection(e, "#")}
              style={{ fontFamily: "var(--font-display)" }}
              className="font-bold text-2xl text-white tracking-tight flex items-center gap-2"
            >
              <img
                src={logoLp}
                alt="LP Logo"
                className="h-8 w-auto object-contain shrink-0"
              />
              LUCAS PRADO
            </a>
          </div>

          <nav
            className="hidden lg:flex items-center gap-8 text-xs"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--clr-text-lo)",
            }}
          >
            {[
              { href: "#metodo", label: "Método" },
              { href: "#resultados", label: "Resultados" },
              { href: "#modalidades", label: "Modalidades" },
              { href: "#sobre", label: "Sobre" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="hover:text-white transition-colors relative group"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: "var(--clr-primary)",
                  }}
                ></span>
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-primary px-6 py-3 text-xs items-center gap-2"
          >
            <iconify-icon
              icon="solar:phone-calling-linear"
              width="16"
            ></iconify-icon>
            Falar no WhatsApp
          </a>

          <button
            className="lg:hidden p-2"
            style={{ color: "var(--clr-text-mid)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <iconify-icon
              icon="solar:hamburger-menu-linear"
              width="24"
            ></iconify-icon>
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              borderColor: "rgba(41, 121, 255, 0.1)",
              backgroundColor: "var(--clr-surface)",
            }}
          >
            <nav className="flex flex-col p-5 gap-4">
              {[
                { href: "#metodo", label: "Método" },
                { href: "#resultados", label: "Resultados" },
                { href: "#modalidades", label: "Modalidades" },
                { href: "#sobre", label: "Sobre" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--clr-text-mid)",
                  }}
                  className="text-base hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div
          className="w-full py-2 hidden md:block"
          style={{
            backgroundColor: "rgba(5, 13, 26, 0.9)",
            borderBottom: "1px solid rgba(41, 121, 255, 0.1)",
          }}
        >
          <div
            className="container mx-auto px-5 text-center text-xs md:text-[0.65rem]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--clr-text-lo)",
            }}
          >
            PERSONAL TRAINER · PRESENCIAL & ONLINE ·
            @TEAMLUCASPRADO
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center pt-24 pb-56 sm:pb-80 lg:pb-48 overflow-hidden"
        style={{ backgroundColor: "var(--clr-bg)" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            ref={heroImgRef}
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop"
            alt="Lucas Prado"
            className="w-full h-full object-cover object-top opacity-60"
            style={{ mixBlendMode: "luminosity" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,13,26,0.95) 10%, rgba(5,13,26,0.7) 50%, transparent 100%)",
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-32"
            style={{
              background:
                "linear-gradient(0deg, #050D1A 0%, transparent 100%)",
            }}
          ></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--clr-primary)",
            }}
            className="font-bold text-9xl md:text-[12rem] lg:text-[16rem] opacity-5 tracking-tighter leading-none whitespace-nowrap"
          >
            LUCAS PRADO
          </h1>
        </div>

        <div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-20 blur-[80px] rounded-full animate-float z-0 pointer-events-none"
          style={{ backgroundColor: "var(--clr-accent)" }}
        ></div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10 flex flex-col justify-center min-h-[70vh]">
          <div className="max-w-3xl">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
              }}
              className="font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-6"
            >
              <span className="block reveal-up">
                SEM FRESCURA.
              </span>
              <span className="block reveal-up delay-100">
                SEM ENROLAÇÃO.
              </span>
              <span
                className="block reveal-up delay-200"
                style={{ color: "var(--clr-primary)" }}
              >
                SÓ RESULTADO.
              </span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--clr-text-mid)",
              }}
              className="font-normal text-lg md:text-xl mb-4 reveal-up delay-300 max-w-xl"
            >
              Treino simples, descomplicado e com método testado
              em alunos reais.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--clr-text-lo)",
              }}
              className="font-light text-base mb-10 reveal-up delay-400 max-w-lg leading-relaxed"
            >
              Não importa se você quer emagrecer, ganhar massa
              ou simplesmente se sentir bem. O caminho existe,
              e é mais direto do que te fizeram acreditar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 reveal-scale delay-500">
              <a
                href={siteEnv.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-sm md:text-xs text-center flex items-center justify-center gap-2"
              >
                <iconify-icon
                  icon="solar:instagram-linear"
                  width="18"
                ></iconify-icon>
                Seguir no Instagram
              </a>
              <a
                href="#modalidades"
                onClick={(e) =>
                  scrollToSection(e, "#modalidades")
                }
                className="btn-secondary px-8 py-4 text-sm md:text-xs text-center"
              >
                Quero Começar
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full z-20 px-5 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal-up delay-500">
              {[
                {
                  label: "Modalidades",
                  value: "PRESENCIAL · ONLINE",
                },
                { label: "Especialidades", value: "5 ÁREAS" },
                {
                  label: "Atendimento",
                  value: "PERSONALIZADO",
                  class: "hidden sm:block",
                },
                {
                  label: "Método",
                  value: "TESTADO E APROVADO",
                  class: "hidden lg:block",
                  valueColor: true,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`glass-card p-4 md:p-5 ${stat.class || ""}`}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--clr-text-lo)",
                    }}
                    className="text-xs md:text-[0.65rem] mb-1"
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      color: stat.valueColor
                        ? "var(--clr-primary)"
                        : "white",
                    }}
                    className="font-bold text-xl md:text-2xl tracking-tight"
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRIP DE PROVA RÁPIDA */}
      <section
        className="py-4 md:py-5 relative z-20"
        style={{
          background:
            "linear-gradient(135deg, #0B3D91 0%, #1565C0 100%)",
        }}
      >
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-row sm:flex-wrap lg:flex-nowrap sm:items-center sm:justify-between sm:gap-4 md:gap-8 text-center sm:text-left reveal-scale">
            {[
              { value: "+200", label: "Alunos transformados" },
              {
                value: "5",
                label: "Focos de atuação",
                divider: true,
              },
              {
                value: "3",
                label: "Formas de treinar",
                divider: true,
              },
              {
                value: "RESULTADO",
                sublabel: "REAL E COMPROVADO",
                divider: true,
                alignRight: true,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`sm:flex-1 sm:w-auto ${item.alignRight ? "sm:text-left lg:text-right" : ""}`}
              >
                {item.divider && idx > 0 && (
                  <div
                    className="hidden sm:block w-[1px] h-8 bg-white/15 absolute"
                    style={{ left: `${idx * 25}%` }}
                  ></div>
                )}
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className="font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none"
                >
                  {item.value}
                </div>
                {item.label && (
                  <div
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-xs md:text-[0.65rem] text-white/70 mt-0.5 leading-tight"
                  >
                    {item.label}
                  </div>
                )}
                {item.sublabel && (
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                    className="font-bold text-sm sm:text-lg md:text-xl text-white/70 tracking-tight leading-tight"
                  >
                    {item.sublabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É / ESPECIALIDADES */}
      <section
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: "var(--clr-bg)" }}
        id="sobre-metodo"
      >
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
          alt=""
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050D1A 0%, transparent 20%, transparent 80%, #050D1A 100%)",
            pointerEvents: "none",
          }}
        ></div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div className="max-w-lg">
              <span
                className="eyebrow block mb-6 reveal-right"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Para quem é
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "white",
                }}
                className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-8 reveal-up"
              >
                VOCÊ NÃO
                <br />
                PRECISA DE
                <br />
                COMPLICAÇÃO.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--clr-text-lo)",
                }}
                className="text-base md:text-lg leading-relaxed mb-10 reveal-up delay-100"
              >
                A maioria das pessoas já tentou. Desistiu porque
                o processo era cansativo, confuso ou sem
                resultado visível. Aqui é diferente: o método é
                simples porque foi construído para funcionar de
                verdade.
              </p>

              <div className="space-y-4 reveal-up delay-200">
                {[
                  {
                    text: "Quer ",
                    strong: "emagrecer",
                    rest: " sem dietas mirabolantes e sem passar fome.",
                  },
                  {
                    text: "Busca ",
                    strong: "hipertrofia",
                    rest: " com treino estruturado e progressivo.",
                  },
                  {
                    text: "Treina há anos e sente que está ",
                    strong: "travado, sem evolução.",
                    rest: "",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4"
                  >
                    <iconify-icon
                      icon="solar:check-circle-linear"
                      style={{ color: "var(--clr-primary)" }}
                      className="mt-1 shrink-0"
                      width="20"
                    ></iconify-icon>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--clr-text-mid)",
                      }}
                      className="text-base md:text-sm"
                    >
                      {item.text}
                      <strong className="font-normal text-white">
                        {item.strong}
                      </strong>
                      {item.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:mt-24">
              {[
                {
                  icon: "solar:running-linear",
                  title: "EMAGRECIMENTO",
                  desc: "Déficit calórico inteligente + treino que acelera o metabolismo.",
                },
                {
                  icon: "solar:dumbbell-linear",
                  title: "HIPERTROFIA",
                  desc: "Periodização progressiva para ganho de massa real.",
                },
                {
                  icon: "solar:heart-pulse-linear",
                  title: "CONDICIONAMENTO",
                  desc: "Capacidade cardiovascular e resistência sem sacrifício.",
                },
                {
                  icon: "solar:users-group-rounded-linear",
                  title: "ADAPTADOS",
                  desc: "Treinos focados no público feminino e terceira idade, com segurança.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`glass-card p-6 reveal-up delay-${100 * (idx + 1)}`}
                >
                  <iconify-icon
                    icon={item.icon}
                    style={{ color: "var(--clr-primary)" }}
                    className="mb-4"
                    width="32"
                  ></iconify-icon>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "white",
                    }}
                    className="font-semibold text-2xl tracking-tight mb-2"
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--clr-text-lo)",
                    }}
                          className="text-base md:text-sm"
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MÉTODO / COMO FUNCIONA */}
      <section
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: "var(--clr-surface)" }}
        id="metodo"
      >
        <div
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(41, 121, 255, 0.2), transparent)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(41, 121, 255, 0.2), transparent)",
          }}
        ></div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span
              className="eyebrow block mb-6 reveal-up"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Como funciona
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
              }}
              className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6 reveal-up delay-100"
            >
              UM MÉTODO SIMPLES
              <br />
              QUE FUNCIONA DE VERDADE.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--clr-text-lo)",
              }}
              className="text-base md:text-lg reveal-up delay-200"
            >
              Sem planilha genérica. Sem protocolo copiado da
              internet. Cada aluno começa com uma avaliação e
              sai com um caminho desenhado para o seu corpo e
              objetivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div
              className="hidden md:block absolute top-[40%] left-[10%] w-[80%] h-[1px] border-t border-dashed z-0"
              style={{ borderColor: "rgba(41, 121, 255, 0.4)" }}
            ></div>

            {[
              {
                num: "01",
                title: "AVALIAÇÃO",
                desc: "Entendemos o seu histórico, objetivo e rotina antes de montar qualquer treino. O ponto de partida é individual, sempre.",
                img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
                highlight: false,
              },
              {
                num: "02",
                title: "PROTOCOLO",
                desc: "Treino desenhado para o seu nível, sua disponibilidade e seu objetivo. Ajustado a cada ciclo. Nada genérico.",
                img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
                highlight: true,
              },
              {
                num: "03",
                title: "ACOMPANHAMENTO",
                desc: "Suporte contínuo, ajustes constantes e motivação quando você precisar. Presencialmente ou à distância.",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
                highlight: false,
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`relative z-10 flex flex-col group reveal-up delay-${100 * (idx + 1)}`}
              >
                <div
                  className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border group-hover:border-[#2979FF]/50 transition-colors ${step.highlight ? "border-[#2979FF]/40 shadow-[0_0_24px_rgba(41,121,255,0.1)] group-hover:shadow-[0_0_32px_rgba(41,121,255,0.2)]" : "border-white/5"}`}
                >
                  <div
                    className={`absolute inset-0 z-10 group-hover:bg-transparent transition-colors ${step.highlight ? "bg-[#050D1A]/20" : "bg-[#050D1A]/30"}`}
                  ></div>
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className={`absolute top-4 left-4 z-20 px-3 py-1 rounded text-sm md:text-xs ${step.highlight ? "bg-[#2979FF] text-white" : "bg-[#050D1A]/80 backdrop-blur-sm text-[#2979FF] border border-[#2979FF]/30"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {step.num}
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "white",
                  }}
                  className="font-semibold text-3xl tracking-tight mb-3"
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--clr-text-lo)",
                  }}
                  className="text-base md:text-sm leading-relaxed"
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS / PROVA SOCIAL */}
      <section
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: "var(--clr-bg)" }}
        id="resultados"
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <div className="max-w-xl mb-16 md:mb-20">
            <span
              className="eyebrow block mb-6 reveal-right"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Resultados Reais
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
              }}
              className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6 reveal-up"
            >
              ALUNOS REAIS.
              <br />
              RESULTADOS REAIS.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--clr-text-lo)",
              }}
              className="text-base reveal-up delay-100"
            >
              Nada de fotografia editada ou resultado milagroso.
              O que você vê aqui foi conquistado com trabalho,
              constância e método.
            </p>
          </div>

          <ResultadosCarousel />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Nunca achei que fosse ser tão direto assim. Sem enrolação, sem aquela sensação de que você é só mais um aluno. Em 3 meses perdi 9kg e não passei um dia com fome.",
                name: "ANA C.",
                type: "EMAGRECIMENTO · PRESENCIAL",
                avatar:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop&crop=faces",
                highlight: false,
              },
              {
                quote:
                  "Fazia academia há 2 anos sem resultado. Com o Lucas, em 4 meses comecei a ver diferença real na musculatura. O treino é sério, mas você consegue seguir.",
                name: "MARCOS R.",
                type: "HIPERTROFIA · ONLINE",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop&crop=faces",
                highlight: true,
              },
              {
                quote:
                  "Tenho 62 anos e achei que treino pesado não era para mim. Ele adaptou tudo. Hoje faço exercícios que não conseguia nem imaginar há 6 meses.",
                name: "MARIA L.",
                type: "TERCEIRA IDADE · A DOMICÍLIO",
                avatar:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop&crop=faces",
                highlight: false,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`glass-card p-6 md:p-8 flex flex-col h-full reveal-up delay-${100 * (idx + 1)}`}
                style={
                  testimonial.highlight
                    ? {
                        borderColor: "rgba(41,121,255,0.4)",
                        boxShadow:
                          "0 0 24px rgba(41,121,255,0.1)",
                      }
                    : {}
                }
              >
                <div
                  className="flex gap-1 mb-4"
                  style={{ color: "var(--clr-primary)" }}
                >
                  {[...Array(5)].map((_, i) => (
                    <iconify-icon
                      key={i}
                      icon="solar:star-bold"
                      width="16"
                    ></iconify-icon>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--clr-text-mid)",
                  }}
                  className="text-base md:text-base mb-8 italic flex-1"
                >
                  "{testimonial.quote}"
                </p>
                <div
                  className={`flex items-center gap-4 border-t pt-4 mt-auto ${testimonial.highlight ? "border-[#2979FF]/20" : "border-white/10"}`}
                >
                  <div
                    className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2"
                    style={{
                      borderColor: "var(--clr-primary)",
                      backgroundColor: "#1A1A1A",
                    }}
                  >
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "white",
                      }}
                      className="font-semibold text-lg tracking-tight"
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--clr-text-lo)",
                      }}
                      className="text-xs md:text-[0.6rem]"
                    >
                      {testimonial.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: "var(--clr-surface)" }}
        id="modalidades"
      >
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(21, 101, 192, 0.3), transparent)",
          }}
        ></div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span
              className="eyebrow block mb-6 reveal-up"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Como posso te atender
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
              }}
              className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6 reveal-up delay-100"
            >
              VOCÊ ESCOLHE
              <br />
              ONDE TREINAR.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--clr-text-lo)",
              }}
              className="text-base md:text-lg reveal-up delay-200"
            >
              Sem desculpa de distância ou de horário. O
              acompanhamento acontece do jeito que funciona para
              a sua rotina.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {[
              {
                title: "PRESENCIAL",
                subtitle: "ACADEMIA PARCEIRA",
                img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
                features: [
                  "Treino 100% acompanhado",
                  "Correção de movimento na hora",
                  "Avaliação física inclusa",
                ],
                highlight: false,
                scale: false,
              },
              {
                title: "ONLINE",
                subtitle: "ONDE VOCÊ ESTIVER",
                img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop",
                features: [
                  "Protocolo personalizado",
                  "Suporte direto por WhatsApp",
                  "Ajustes periódicos",
                  "Análise de vídeos de execução",
                ],
                highlight: true,
                scale: true,
              },
              {
                title: "A DOMICÍLIO",
                subtitle: "NA SUA CASA OU PRÉDIO",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
                features: [
                  "Comodidade total",
                  "Adaptação ao seu espaço",
                  "Equipamentos levados por mim",
                ],
                highlight: false,
                scale: false,
              },
            ].map((mode, idx) => (
              <div
                key={idx}
                className={`rounded-[12px] border overflow-hidden flex flex-col h-full reveal-up delay-${100 * (idx + 1)} ${mode.scale ? "lg:scale-105 z-10 relative" : ""}`}
                style={{
                  backgroundColor: mode.highlight
                    ? "rgba(11, 61, 145, 0.15)"
                    : "var(--clr-bg)",
                  backdropFilter: mode.highlight
                    ? "blur(16px)"
                    : "none",
                  borderWidth: mode.highlight ? "2px" : "1px",
                  borderColor: mode.highlight
                    ? "#2979FF"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: mode.highlight
                    ? "0 0 32px rgba(41,121,255,0.2)"
                    : "none",
                }}
              >
                {mode.highlight && (
                  <div
                    className="absolute top-4 right-4 z-30 px-3 py-1 rounded text-xs md:text-[0.6rem] text-white tracking-wider"
                    style={{
                      backgroundColor: "var(--clr-primary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    MAIS ESCOLHIDO
                  </div>
                )}
                <div
                  className={`${mode.highlight ? "h-48" : "h-40"} w-full relative`}
                >
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: mode.highlight
                        ? "linear-gradient(0deg, #050D1A 0%, rgba(11,61,145,0.4) 100%)"
                        : "rgba(5,13,26,0.6)",
                    }}
                  ></div>
                  <img
                    src={mode.img}
                    className="w-full h-full object-cover"
                    alt={mode.title}
                  />
                  <div className="absolute bottom-4 left-6 z-20">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "white",
                      }}
                      className={`font-bold tracking-tight ${mode.highlight ? "text-4xl" : "text-3xl"}`}
                    >
                      {mode.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--clr-text-lo)",
                      }}
                      className="text-xs md:text-[0.65rem]"
                    >
                      {mode.subtitle}
                    </p>
                  </div>
                </div>
                <div
                  className="p-6 md:p-8 flex-1 flex flex-col"
                  style={{
                    backgroundColor: mode.highlight
                      ? "rgba(11, 22, 40, 0.5)"
                      : "transparent",
                  }}
                >
                  <ul className="space-y-4 mb-8 flex-1">
                    {mode.features.map((feature, fidx) => (
                      <li
                        key={fidx}
                        className="flex items-center gap-3 text-base md:text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--clr-text-mid)",
                        }}
                      >
                        <iconify-icon
                          icon={
                            mode.highlight
                              ? "solar:check-circle-bold"
                              : "solar:check-circle-linear"
                          }
                          style={{
                            color: "var(--clr-primary)",
                          }}
                        ></iconify-icon>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`border-t pt-6 mb-6 ${mode.highlight ? "border-[#2979FF]/20" : "border-white/10"}`}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "white",
                      }}
                      className={`font-semibold ${mode.highlight ? "text-3xl" : "text-2xl"}`}
                    >
                      SOB CONSULTA
                    </span>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-${mode.highlight ? "4" : "3"} text-center text-sm md:text-xs ${mode.highlight ? "btn-primary" : "btn-secondary"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {mode.highlight
                      ? "Quero Começar"
                      : "Saber Mais"}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--clr-text-disabled)",
            }}
            className="text-center text-xs md:text-[0.65rem] mt-12 reveal-up delay-400"
          >
            VALORES E DISPONIBILIDADE VIA WHATSAPP · SEM
            COMPROMISSO NA PRIMEIRA CONVERSA
          </p>
        </div>
      </section>

      {/* SOBRE LUCAS PRADO */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: "var(--clr-bg)" }}
        id="sobre"
      >
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 blur-md pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative reveal-scale">
              <div
                className="absolute -left-4 md:-left-8 top-10 w-[3px] h-3/4 rounded-full z-20"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--clr-primary), transparent)",
                }}
              ></div>
              <div className="relative w-full max-w-[589px] rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                <img
                  src={lucasPradoPerfil}
                  className="block h-auto w-full"
                  alt="Lucas Prado, perfil"
                  width={589}
                  height={900}
                />
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
              </div>
            </div>

            <div className="max-w-xl">
              <span
                className="eyebrow block mb-6 reveal-right"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Quem é Lucas Prado
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "white",
                }}
                className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-8 reveal-up"
              >
                PERSONAL TRAINER
                <br />
                QUE ENTREGA
                <br />O QUE PROMETE.
              </h2>

              <div
                className="space-y-6 mb-12 reveal-up delay-100"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--clr-text-lo)",
                }}
              >
                <p className="text-base leading-relaxed">
                  Lucas Prado é Personal Trainer com atuação
                  presencial, online e a domicílio. Especialista
                  em emagrecimento, hipertrofia,
                  condicionamento, público feminino e terceira
                  idade.
                </p>
                <p className="text-base leading-relaxed">
                  A filosofia é simples: resultado não vem de
                  método complicado, vem de consistência,
                  acompanhamento real e um protocolo feito para
                  você, não para uma planilha genérica.
                </p>
                <p className="text-base leading-relaxed">
                  Cada aluno atendido é uma prova de que o
                  processo funciona quando é feito com seriedade
                  e sem frescura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10 reveal-up delay-200">
                {[
                  {
                    icon: "solar:diploma-linear",
                    label: "FORMAÇÃO",
                    value: "Educação Física",
                  },
                  {
                    icon: "solar:target-linear",
                    label: "ESPECIALIDADES",
                    value: "Emagrecimento, Hipertrofia",
                  },
                  {
                    icon: "solar:map-point-linear",
                    label: "ATUAÇÃO",
                    value: "Presencial, Online, Domicílio",
                  },
                  {
                    icon: "solar:instagram-linear",
                    label: "INSTAGRAM",
                    value: `@${siteEnv.instagramHandle}`,
                    link: siteEnv.instagramUrl,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3"
                  >
                    <iconify-icon
                      icon={item.icon}
                      style={{ color: "var(--clr-primary)" }}
                      className="mt-1"
                      width="20"
                    ></iconify-icon>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--clr-text-disabled)",
                        }}
                        className="text-xs md:text-[0.65rem] mb-1"
                      >
                        {item.label}
                      </h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--clr-text-mid)",
                          }}
                          className="text-base md:text-sm hover:text-[#2979FF] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--clr-text-mid)",
                          }}
                          className="text-base md:text-sm"
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqSectionRef}
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: "var(--clr-surface)" }}
        id="faq"
      >
        <FaqAlienDecoration sectionRef={faqSectionRef} />
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 75% 72%, rgba(41, 121, 255, 0.08) 0%, transparent 55%)",
            }}
          />
        </div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto">
            <span
              className="eyebrow block mb-6 text-center reveal-up"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Dúvidas
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "white",
              }}
              className="font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] mb-16 text-center reveal-up delay-100"
            >
              PERGUNTAS DIRETAS.
            </h2>

            <div className="space-y-4 reveal-up delay-200">
              {[
                {
                  q: "Preciso ter experiência prévia?",
                  a: "Não. Iniciantes são bem-vindos. Avaliamos o seu ponto de partida e montamos o protocolo do zero, no seu ritmo.",
                },
                {
                  q: "Como funciona o acompanhamento online?",
                  a: "Você recebe o protocolo de treino completo, suporte por mensagem e revisões periódicas. A distância não muda o compromisso com o seu resultado.",
                },
                {
                  q: "E o atendimento a domicílio?",
                  a: "Atendo na sua casa, condomínio ou espaço de sua preferência. Sem necessidade de deslocamento: o treino vai até você.",
                },
                {
                  q: "Em quanto tempo vejo resultado?",
                  a: "Depende do objetivo e da consistência, mas alunos costumam notar diferença nas primeiras 4 a 8 semanas de protocolo. Resultado real leva tempo, e o processo é esse.",
                },
                {
                  q: "Qual é o valor?",
                  a: "Os valores variam conforme a modalidade e o plano. Entre em contato para receber uma proposta personalizada sem compromisso.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-white/5 overflow-hidden transition-all duration-300"
                  style={{ backgroundColor: "var(--clr-bg)" }}
                >
                  <summary
                    className="flex justify-between items-center p-6 text-lg font-medium text-white cursor-pointer select-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {faq.q}
                    <iconify-icon
                      icon="solar:alt-arrow-down-linear"
                      style={{ color: "var(--clr-primary)" }}
                      className="transition-transform duration-300 group-open:rotate-180"
                      width="24"
                    ></iconify-icon>
                  </summary>
                  <div
                    className="px-6 pb-6 border-t pt-4"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--clr-text-lo)",
                      borderColor: "rgba(41, 121, 255, 0.1)",
                    }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="relative py-32 md:py-48 flex items-center overflow-hidden"
        style={{ backgroundColor: "var(--clr-bg)" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
            alt="Lucas Prado CTA"
            className="w-full h-full object-cover object-center opacity-40"
            style={{ mixBlendMode: "luminosity" }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(5, 13, 26, 0.85)" }}
          ></div>
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.08] blur-[120px] rounded-full z-0 pointer-events-none"
          style={{ backgroundColor: "var(--clr-primary)" }}
        ></div>

        <div
          className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap z-10 opacity-70 pointer-events-none select-none border-y py-2"
          style={{ borderColor: "rgba(41, 121, 255, 0.1)" }}
        >
          <div
            className="animate-ticker inline-block"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--clr-primary)",
            }}
          >
            <span className="font-bold text-2xl md:text-4xl tracking-widest">
              S E G U I R · N O · I N S T A G R A M · @ T E A M
              L U C A S P R A D O · C O M E Ç A R · A G O R A ·
              S E M · E N R O L A Ç Ã O · R E S U L T A D O · R
              E A L ·
            </span>
            <span className="font-bold text-2xl md:text-4xl tracking-widest">
              S E G U I R · N O · I N S T A G R A M · @ T E A M
              L U C A S P R A D O · C O M E Ç A R · A G O R A ·
              S E M · E N R O L A Ç Ã O · R E S U L T A D O · R
              E A L ·
            </span>
          </div>
        </div>

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-20 text-center flex flex-col items-center">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "white",
            }}
            className="font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-8 reveal-up"
          >
            CHEGA DE
            <br />
            ESPERAR O<br />
            MOMENTO CERTO.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--clr-text-mid)",
            }}
            className="text-lg md:text-xl max-w-2xl mb-12 reveal-up delay-100"
          >
            Primeira conversa sem compromisso. Você fala, a
            gente escuta e monta o plano certo para o seu
            objetivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto reveal-scale delay-200">
            <a
              href={siteEnv.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-10 py-5 text-base md:text-sm text-center flex items-center justify-center gap-2"
            >
              <iconify-icon
                icon="solar:instagram-linear"
                width="20"
              ></iconify-icon>
              Seguir no Instagram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-10 py-5 text-base md:text-sm text-center flex items-center justify-center gap-2"
            >
              <iconify-icon
                icon="solar:phone-calling-linear"
                width="20"
              ></iconify-icon>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative pt-20 pb-10 border-t"
        style={{
          backgroundColor: "var(--clr-bg)",
          borderImage:
            "linear-gradient(90deg, transparent, rgba(41,121,255,0.5), transparent) 1",
        }}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="md:col-span-5 flex flex-col items-start">
              <a
                href="#"
                onClick={(e) => scrollToSection(e, "#")}
                className="group relative mb-5 block"
                aria-label="Lucas Prado Personal Trainer, voltar ao topo"
              >
                <div
                  className="pointer-events-none absolute -inset-6 rounded-full opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(41, 121, 255, 0.35) 0%, transparent 70%)",
                  }}
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={logoLucasPrado}
                    alt="Lucas Prado Personal Trainer"
                    className="relative w-full max-w-[220px] sm:max-w-[260px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </a>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--clr-text-disabled)",
                }}
                className="max-w-xs border-t border-white/10 pt-4 text-sm md:text-xs tracking-[0.2em]"
              >
                RESULTADO SEM FRESCURA.
              </p>
            </div>

            <div className="md:col-span-3">
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "white",
                }}
                className="text-sm md:text-xs mb-6"
              >
                NAVEGAÇÃO
              </h4>
              <ul
                className="space-y-3 text-base md:text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--clr-text-lo)",
                }}
              >
                {[
                  { href: "#metodo", label: "Método" },
                  { href: "#resultados", label: "Resultados" },
                  {
                    href: "#modalidades",
                    label: "Modalidades",
                  },
                  { href: "#sobre", label: "Sobre" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) =>
                        scrollToSection(e, item.href)
                      }
                      className="hover:text-[#2979FF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4" id="whatsapp">
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "white",
                }}
                className="text-sm md:text-xs mb-6"
              >
                CONTATO
              </h4>
              <ul
                className="space-y-4 text-base md:text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--clr-text-lo)",
                }}
              >
                <li>
                  <a
                    href={siteEnv.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#2979FF] transition-colors"
                  >
                    <iconify-icon
                      icon="solar:instagram-linear"
                      width="18"
                    ></iconify-icon>
                    @{siteEnv.instagramHandle}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteEnv.contactEmail}`}
                    className="flex items-center gap-2 hover:text-[#2979FF] transition-colors"
                  >
                    <iconify-icon
                      icon="solar:letter-linear"
                      width="18"
                    ></iconify-icon>
                    {siteEnv.contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#2979FF] transition-colors"
                  >
                    <iconify-icon
                      icon="solar:phone-calling-linear"
                      width="18"
                    ></iconify-icon>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--clr-text-disabled)",
              }}
              className="text-xs md:text-[0.65rem]"
            >
              LUCAS PRADO PERSONAL TRAINER · © 2026
            </p>
            <div className="flex gap-4">
              <div
                className="w-12 h-[2px] rounded mt-1"
                style={{
                  backgroundColor: "rgba(41, 121, 255, 0.3)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <iconify-icon icon="mdi:whatsapp" width="28"></iconify-icon>
      </a>
    </>
  );
}