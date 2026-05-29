import { useEffect, useState, useRef } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    // Header Scroll Glassmorphism
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Parallax Effect for Hero
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroImgRef.current) {
          heroImgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        if (heroTextRef.current) {
          heroTextRef.current.style.transform = `translate(-50%, calc(-50% + ${scrollY * -0.1}px))`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll Reveal Animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav' : 'bg-transparent border-transparent'
        } border-b`}
      >
        <div className="container mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <a href="#" onClick={(e) => scrollToSection(e, '#')} className="font-display font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
              <span className="text-[#2979FF]">LP</span>
              LUCAS PRADO
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-mono text-xs font-normal text-[#B0B0B0]">
            {['#metodo', '#resultados', '#modalidades', '#sobre'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scrollToSection(e, href)}
                className="hover:text-white transition-colors relative group"
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#2979FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="hidden md:flex btn-primary px-6 py-3 font-mono text-xs items-center gap-2 font-normal">
            <iconify-icon icon="solar:phone-calling-linear" width="16"></iconify-icon>
            Falar no WhatsApp
          </a>

          {/* Mobile Menu Toggle (Visual Only per source) */}
          <button className="lg:hidden text-[#F2F2F2] p-2">
            <iconify-icon icon="solar:hamburger-menu-linear" width="24"></iconify-icon>
          </button>
        </div>
        {/* Tagline */}
        <div className="w-full bg-[#050D1A]/90 border-b border-[#2979FF]/10 py-2 hidden md:block">
          <div className="container mx-auto px-5 text-center font-mono text-[0.65rem] text-[#B0B0B0]">
            PERSONAL TRAINER · PRESENCIAL &amp; ONLINE · @TEAMLUCASPRADO
          </div>
        </div>
      </header>

      {/* SEÇÃO 01 · Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-56 sm:pb-80 lg:pb-48 overflow-hidden bg-[#050D1A]">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img
            ref={heroImgRef}
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop"
            alt="Lucas Prado"
            className="w-full h-full object-cover object-top opacity-60 mix-blend-luminosity hero-img"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(5,13,26,0.95) 10%, rgba(5,13,26,0.7) 50%, transparent 100%)' }}></div>
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: 'linear-gradient(0deg, #050D1A 0%, transparent 100%)' }}></div>
        </div>

        {/* Giant Text Background */}
        <div
          ref={heroTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none hero-text"
        >
          <h1 className="font-display font-extrabold text-9xl md:text-[12rem] lg:text-[16rem] text-[#2979FF] opacity-5 tracking-tighter leading-none whitespace-nowrap">
            LUCAS PRADO
          </h1>
        </div>

        {/* Glow Orb */}
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#1565C0] opacity-20 blur-[80px] rounded-full animate-float z-0 pointer-events-none"></div>

        <div className="container mx-auto px-5 md:px-10 relative z-10 flex flex-col justify-center min-h-[70vh]">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-white mb-6">
              <span className="block reveal-up">SEM FRESCURA.</span>
              <span className="block reveal-up delay-100">SEM ENROLAÇÃO.</span>
              <span className="block text-[#2979FF] reveal-up delay-200">
                SÓ RESULTADO.
              </span>
            </h1>

            <p className="font-body font-normal text-lg md:text-xl text-[#F2F2F2] mb-4 reveal-up delay-300 max-w-xl">
              Treino simples, descomplicado e com método testado em alunos reais.
            </p>
            <p className="font-body font-light text-sm md:text-base text-[#B0B0B0] mb-10 reveal-up delay-400 max-w-lg leading-relaxed">
              Não importa se você quer emagrecer, ganhar massa ou simplesmente se
              sentir bem. O caminho existe — e é mais direto do que te fizeram
              acreditar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 reveal-scale delay-500">
              <a href="https://instagram.com/teamlucasprado" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 font-mono text-xs font-normal text-center flex items-center justify-center gap-2">
                <iconify-icon icon="solar:instagram-linear" width="18"></iconify-icon>
                Seguir no Instagram
              </a>
              <a href="#modalidades" onClick={(e) => scrollToSection(e, '#modalidades')} className="btn-secondary px-8 py-4 font-mono text-xs font-normal text-center">
                Quero Começar
              </a>
            </div>
          </div>
        </div>

        {/* Floating Stats Mobile/Desktop */}
        <div className="absolute bottom-10 left-0 w-full z-20 px-5 md:px-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 reveal-up delay-500">
              <div className="glass-card p-4 md:p-5">
                <div className="font-mono text-[0.65rem] text-[#B0B0B0] mb-1">
                  Modalidades
                </div>
                <div className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                  PRESENCIAL · ONLINE
                </div>
              </div>
              <div className="glass-card p-4 md:p-5">
                <div className="font-mono text-[0.65rem] text-[#B0B0B0] mb-1">
                  Especialidades
                </div>
                <div className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                  5 ÁREAS
                </div>
              </div>
              <div className="glass-card p-4 md:p-5 hidden sm:block">
                <div className="font-mono text-[0.65rem] text-[#B0B0B0] mb-1">
                  Atendimento
                </div>
                <div className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                  PERSONALIZADO
                </div>
              </div>
              <div className="glass-card p-4 md:p-5 hidden lg:block">
                <div className="font-mono text-[0.65rem] text-[#B0B0B0] mb-1">
                  Método
                </div>
                <div className="font-display font-extrabold text-xl md:text-2xl text-[#2979FF] tracking-tight">
                  TESTADO E APROVADO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 02 · Strip de Prova Rápida */}
      <section className="py-6 md:py-8 relative z-20" style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1565C0 100%)' }}>
        <div className="container mx-auto px-5 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-10 text-center sm:text-left reveal-scale">
            <div className="flex-1">
              <div className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight">+200</div>
              <div className="font-mono text-xs text-white/70 mt-1">Alunos transformados</div>
            </div>
            <div className="hidden sm:block w-[1px] h-12 bg-white/15"></div>
            <div className="flex-1">
              <div className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight">5</div>
              <div className="font-mono text-xs text-white/70 mt-1">Focos de atuação</div>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-white/15"></div>
            <div className="flex-1 hidden md:block">
              <div className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight">3</div>
              <div className="font-mono text-xs text-white/70 mt-1">Formas de treinar</div>
            </div>
            <div className="hidden lg:block w-[1px] h-12 bg-white/15"></div>
            <div className="flex-1 hidden lg:block text-right">
              <div className="font-display font-extrabold text-2xl text-white tracking-tight">RESULTADO</div>
              <div className="font-display font-extrabold text-2xl text-white/70 tracking-tight">REAL E COMPROVADO</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 03 · Para Quem É / Especialidades */}
      <section className="py-24 md:py-32 relative bg-[#050D1A]" id="sobre-metodo">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none" alt="" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050D1A 0%, transparent 20%, transparent 80%, #050D1A 100%)', pointerEvents: 'none' }}></div>

        <div className="container mx-auto px-5 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div className="max-w-lg">
              <span className="font-mono text-xs eyebrow block mb-6 reveal-right">
                Para quem é
              </span>
              <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 reveal-up">
                VOCÊ NÃO<br />PRECISA DE<br />COMPLICAÇÃO.
              </h2>
              <p className="font-body text-[#B0B0B0] text-base md:text-lg leading-relaxed mb-10 reveal-up delay-100">
                A maioria das pessoas já tentou. Desistiu porque o processo era
                cansativo, confuso ou sem resultado visível. Aqui é diferente — o
                método é simples porque foi construído para funcionar de verdade.
              </p>

              <div className="space-y-4 reveal-up delay-200">
                {[
                  { text: 'Quer ', strong: 'emagrecer', rest: ' sem dietas mirabolantes e sem passar fome.' },
                  { text: 'Busca ', strong: 'hipertrofia', rest: ' com treino estruturado e progressivo.' },
                  { text: 'Treina há anos e sente que está ', strong: 'travado, sem evolução.', rest: '' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF] mt-1 shrink-0" width="20"></iconify-icon>
                    <p className="font-body text-sm text-[#F2F2F2]">
                      {item.text}
                      <strong className="font-normal text-white">{item.strong}</strong>
                      {item.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:mt-24">
              <div className="glass-card p-6 reveal-up delay-100">
                <iconify-icon icon="solar:running-linear" class="text-[#2979FF] mb-4" width="32"></iconify-icon>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-2">EMAGRECIMENTO</h3>
                <p className="font-body text-sm text-[#B0B0B0]">Déficit calórico inteligente + treino que acelera o metabolismo.</p>
              </div>
              <div className="glass-card p-6 reveal-up delay-200">
                <iconify-icon icon="solar:dumbbell-linear" class="text-[#2979FF] mb-4" width="32"></iconify-icon>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-2">HIPERTROFIA</h3>
                <p className="font-body text-sm text-[#B0B0B0]">Periodização progressiva para ganho de massa real.</p>
              </div>
              <div className="glass-card p-6 reveal-up delay-300">
                <iconify-icon icon="solar:heart-pulse-linear" class="text-[#2979FF] mb-4" width="32"></iconify-icon>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-2">CONDICIONAMENTO</h3>
                <p className="font-body text-sm text-[#B0B0B0]">Capacidade cardiovascular e resistência sem sacrifício.</p>
              </div>
              <div className="glass-card p-6 reveal-up delay-400">
                <iconify-icon icon="solar:users-group-rounded-linear" class="text-[#2979FF] mb-4" width="32"></iconify-icon>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-2">ADAPTADOS</h3>
                <p className="font-body text-sm text-[#B0B0B0]">Treinos focados no público feminino e terceira idade, com segurança.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 · Método / Como Funciona */}
      <section className="py-24 md:py-32 bg-[#0B1628] relative" id="metodo">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2979FF]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2979FF]/20 to-transparent"></div>

        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="font-mono text-xs eyebrow block mb-6 reveal-up">Como funciona</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-6 reveal-up delay-100">
              UM MÉTODO SIMPLES<br />QUE FUNCIONA DE VERDADE.
            </h2>
            <p className="font-body text-[#B0B0B0] text-base md:text-lg reveal-up delay-200">
              Sem planilha genérica. Sem protocolo copiado da internet. Cada aluno
              começa com uma avaliação e sai com um caminho desenhado para o seu
              corpo e objetivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-[40%] left-[10%] w-[80%] h-[1px] border-t border-dashed border-[#2979FF]/40 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col group reveal-up delay-100">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-white/5 group-hover:border-[#2979FF]/50 transition-colors">
                <div className="absolute inset-0 bg-[#050D1A]/30 z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop" alt="Avaliação" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-[#050D1A]/80 backdrop-blur-sm px-3 py-1 rounded font-mono text-xs text-[#2979FF] border border-[#2979FF]/30">01</div>
              </div>
              <h3 className="font-display font-semibold text-3xl text-white tracking-tight mb-3">AVALIAÇÃO</h3>
              <p className="font-body text-sm text-[#B0B0B0] leading-relaxed">
                Entendemos o seu histórico, objetivo e rotina antes de montar
                qualquer treino. O ponto de partida é individual — sempre.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col group reveal-up delay-200">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-[#2979FF]/40 group-hover:border-[#2979FF] transition-colors shadow-[0_0_24px_rgba(41,121,255,0.1)] group-hover:shadow-[0_0_32px_rgba(41,121,255,0.2)]">
                <div className="absolute inset-0 bg-[#050D1A]/20 z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" alt="Protocolo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-[#2979FF] px-3 py-1 rounded font-mono text-xs text-white">02</div>
              </div>
              <h3 className="font-display font-semibold text-3xl text-white tracking-tight mb-3">PROTOCOLO</h3>
              <p className="font-body text-sm text-[#B0B0B0] leading-relaxed">
                Treino desenhado para o seu nível, sua disponibilidade e seu
                objetivo. Ajustado a cada ciclo. Nada genérico.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col group reveal-up delay-300">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-white/5 group-hover:border-[#2979FF]/50 transition-colors">
                <div className="absolute inset-0 bg-[#050D1A]/30 z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop" alt="Acompanhamento" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-[#050D1A]/80 backdrop-blur-sm px-3 py-1 rounded font-mono text-xs text-[#2979FF] border border-[#2979FF]/30">03</div>
              </div>
              <h3 className="font-display font-semibold text-3xl text-white tracking-tight mb-3">ACOMPANHAMENTO</h3>
              <p className="font-body text-sm text-[#B0B0B0] leading-relaxed">
                Suporte contínuo, ajustes constantes e motivação quando você
                precisar. Presencialmente ou à distância.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 05 · Resultados / Prova Social */}
      <section className="py-24 md:py-32 bg-[#050D1A] relative" id="resultados">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-xl mb-16 md:mb-20">
            <span className="font-mono text-xs eyebrow block mb-6 reveal-right">Resultados Reais</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-6 reveal-up">
              ALUNOS REAIS.<br />RESULTADOS REAIS.
            </h2>
            <p className="font-body text-[#B0B0B0] text-base reveal-up delay-100">
              Nada de fotografia editada ou resultado milagroso. O que você vê
              aqui foi conquistado com trabalho, constância e método.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 reveal-up delay-200">
            <div className="relative aspect-[3/4] bg-[#0B1628] rounded-lg overflow-hidden group border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#6B6B6B]">ANTES/DEPOIS</div>
              <div className="absolute top-2 left-2 bg-[#050D1A]/80 backdrop-blur-sm px-2 py-1 rounded font-mono text-[0.6rem] text-white">EMAGRECIMENTO</div>
            </div>
            <div className="relative aspect-[3/4] bg-[#0B1628] rounded-lg overflow-hidden group border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#6B6B6B]">ANTES/DEPOIS</div>
              <div className="absolute top-2 left-2 bg-[#050D1A]/80 backdrop-blur-sm px-2 py-1 rounded font-mono text-[0.6rem] text-white">HIPERTROFIA</div>
            </div>
            <div className="relative aspect-[3/4] bg-[#0B1628] rounded-lg overflow-hidden group border border-white/5 hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#6B6B6B]">ANTES/DEPOIS</div>
            </div>
            <div className="relative aspect-[3/4] bg-[#0B1628] rounded-lg overflow-hidden group border border-white/5 hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#6B6B6B]">ANTES/DEPOIS</div>
            </div>
          </div>

          <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4 mb-24 reveal-up delay-300">
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" className="w-full rounded bg-[#0B1628] opacity-80 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'luminosity' }} alt="Treino" />
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop" className="w-full rounded bg-[#0B1628] opacity-80 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'luminosity' }} alt="Treino" />
            <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop" className="w-full rounded bg-[#0B1628] opacity-80 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'luminosity' }} alt="Treino" />
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" className="w-full rounded bg-[#0B1628] opacity-80 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'luminosity' }} alt="Treino" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 md:p-8 flex flex-col h-full reveal-up delay-100">
              <div className="flex gap-1 text-[#2979FF] mb-4">
                {[...Array(5)].map((_, i) => <iconify-icon key={i} icon="solar:star-bold" width="16"></iconify-icon>)}
              </div>
              <p className="font-body text-sm md:text-base text-[#F2F2F2] mb-8 italic flex-1">
                "Nunca achei que fosse ser tão direto assim. Sem enrolação, sem
                aquela sensação de que você é só mais um aluno. Em 3 meses perdi
                9kg e não passei um dia com fome."
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full border-2 border-[#2979FF] bg-[#1A1A1A] overflow-hidden"></div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white tracking-tight">ANA C.</h4>
                  <p className="font-mono text-[0.6rem] text-[#B0B0B0]">EMAGRECIMENTO · PRESENCIAL</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 flex flex-col h-full reveal-up delay-200" style={{ borderColor: 'rgba(41,121,255,0.4)', boxShadow: '0 0 24px rgba(41,121,255,0.1)' }}>
              <div className="flex gap-1 text-[#2979FF] mb-4">
                {[...Array(5)].map((_, i) => <iconify-icon key={i} icon="solar:star-bold" width="16"></iconify-icon>)}
              </div>
              <p className="font-body text-sm md:text-base text-[#F2F2F2] mb-8 italic flex-1">
                "Fazia academia há 2 anos sem resultado. Com o Lucas, em 4 meses
                comecei a ver diferença real na musculatura. O treino é sério, mas
                você consegue seguir."
              </p>
              <div className="flex items-center gap-4 border-t border-[#2979FF]/20 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full border-2 border-[#2979FF] bg-[#1A1A1A] overflow-hidden"></div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white tracking-tight">MARCOS R.</h4>
                  <p className="font-mono text-[0.6rem] text-[#B0B0B0]">HIPERTROFIA · ONLINE</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 flex flex-col h-full reveal-up delay-300">
              <div className="flex gap-1 text-[#2979FF] mb-4">
                {[...Array(5)].map((_, i) => <iconify-icon key={i} icon="solar:star-bold" width="16"></iconify-icon>)}
              </div>
              <p className="font-body text-sm md:text-base text-[#F2F2F2] mb-8 italic flex-1">
                "Tenho 62 anos e achei que treino pesado não era para mim. Ele
                adaptou tudo. Hoje faço exercícios que não conseguia nem imaginar
                há 6 meses."
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full border-2 border-[#2979FF] bg-[#1A1A1A] overflow-hidden"></div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white tracking-tight">MARIA L.</h4>
                  <p className="font-mono text-[0.6rem] text-[#B0B0B0]">TERCEIRA IDADE · A DOMICÍLIO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 06 · Modalidades */}
      <section className="py-24 md:py-32 bg-[#0B1628] relative" id="modalidades">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1565C0]/30 to-transparent"></div>

        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="font-mono text-xs eyebrow block mb-6 reveal-up">Como posso te atender</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-6 reveal-up delay-100">
              VOCÊ ESCOLHE<br />ONDE TREINAR.
            </h2>
            <p className="font-body text-[#B0B0B0] text-base md:text-lg reveal-up delay-200">
              Sem desculpa de distância ou de horário. O acompanhamento acontece
              do jeito que funciona para a sua rotina.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Presencial */}
            <div className="bg-[#050D1A] rounded-[12px] border border-white/5 overflow-hidden flex flex-col h-full reveal-up delay-100">
              <div className="h-40 w-full relative">
                <div className="absolute inset-0 bg-[#050D1A]/60 z-10"></div>
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Presencial" />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="font-display font-extrabold text-3xl text-white tracking-tight">PRESENCIAL</h3>
                  <p className="font-mono text-[0.65rem] text-[#B0B0B0]">ACADEMIA PARCEIRA</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Treino 100% acompanhado
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Correção de movimento na hora
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Avaliação física inclusa
                  </li>
                </ul>
                <div className="border-t border-white/10 pt-6 mb-6">
                  <span className="font-display font-semibold text-2xl text-white">SOB CONSULTA</span>
                </div>
                <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="btn-secondary w-full py-3 text-center text-xs font-mono">Saber Mais</a>
              </div>
            </div>

            {/* Online */}
            <div className="glass-card overflow-hidden flex flex-col h-full relative lg:scale-105 z-10 reveal-up delay-200" style={{ borderWidth: '2px', borderColor: '#2979FF', boxShadow: '0 0 32px rgba(41,121,255,0.2)' }}>
              <div className="absolute top-4 right-4 z-30 bg-[#2979FF] px-3 py-1 rounded font-mono text-[0.6rem] text-white tracking-wider">MAIS ESCOLHIDO</div>
              <div className="h-48 w-full relative">
                <div className="absolute inset-0 bg-[#0B3D91]/60 z-10" style={{ background: 'linear-gradient(0deg, #050D1A 0%, rgba(11,61,145,0.4) 100%)' }}></div>
                <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Online" />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="font-display font-extrabold text-4xl text-white tracking-tight">ONLINE</h3>
                  <p className="font-mono text-[0.65rem] text-[#B0B0B0]">ONDE VOCÊ ESTIVER</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-[#0B1628]/50">
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-bold" class="text-[#2979FF]"></iconify-icon>
                    Protocolo personalizado
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-bold" class="text-[#2979FF]"></iconify-icon>
                    Suporte direto por WhatsApp
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-bold" class="text-[#2979FF]"></iconify-icon>
                    Ajustes periódicos
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-bold" class="text-[#2979FF]"></iconify-icon>
                    Análise de vídeos de execução
                  </li>
                </ul>
                <div className="border-t border-[#2979FF]/20 pt-6 mb-6">
                  <span className="font-display font-semibold text-3xl text-white">SOB CONSULTA</span>
                </div>
                <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="btn-primary w-full py-4 text-center text-xs font-mono font-normal">Quero Começar</a>
              </div>
            </div>

            {/* A Domicílio */}
            <div className="bg-[#050D1A] rounded-[12px] border border-white/5 overflow-hidden flex flex-col h-full reveal-up delay-300">
              <div className="h-40 w-full relative">
                <div className="absolute inset-0 bg-[#050D1A]/60 z-10"></div>
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="A Domicílio" />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="font-display font-extrabold text-3xl text-white tracking-tight">A DOMICÍLIO</h3>
                  <p className="font-mono text-[0.65rem] text-[#B0B0B0]">NA SUA CASA OU PRÉDIO</p>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Comodidade total
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Adaptação ao seu espaço
                  </li>
                  <li className="flex items-center gap-3 font-body text-sm text-[#F2F2F2]">
                    <iconify-icon icon="solar:check-circle-linear" class="text-[#2979FF]"></iconify-icon>
                    Equipamentos levados por mim
                  </li>
                </ul>
                <div className="border-t border-white/10 pt-6 mb-6">
                  <span className="font-display font-semibold text-2xl text-white">SOB CONSULTA</span>
                </div>
                <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="btn-secondary w-full py-3 text-center text-xs font-mono">Saber Mais</a>
              </div>
            </div>
          </div>

          <p className="text-center font-mono text-[0.65rem] text-[#6B6B6B] mt-12 reveal-up delay-400">
            VALORES E DISPONIBILIDADE VIA WHATSAPP · SEM COMPROMISSO NA PRIMEIRA CONVERSA
          </p>
        </div>
      </section>

      {/* SEÇÃO 07 · Sobre Lucas Prado */}
      <section className="py-24 md:py-32 bg-[#050D1A] relative overflow-hidden" id="sobre">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 blur-md pointer-events-none z-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="container mx-auto px-5 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative reveal-scale">
              <div className="absolute -left-4 md:-left-8 top-10 w-[3px] h-3/4 bg-gradient-to-b from-[#2979FF] to-transparent rounded-full z-20"></div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" className="w-full h-full object-cover" alt="Lucas Prado - Perfil" />
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
              </div>
            </div>

            <div className="max-w-xl">
              <span className="font-mono text-xs eyebrow block mb-6 reveal-right">Quem é Lucas Prado</span>
              <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 reveal-up">
                PERSONAL TRAINER<br />QUE ENTREGA<br />O QUE PROMETE.
              </h2>

              <div className="space-y-6 font-body text-[#B0B0B0] text-base leading-relaxed mb-12 reveal-up delay-100">
                <p>
                  Lucas Prado é Personal Trainer com atuação presencial, online e
                  a domicílio. Especialista em emagrecimento, hipertrofia,
                  condicionamento, público feminino e terceira idade.
                </p>
                <p>
                  A filosofia é simples: resultado não vem de método complicado —
                  vem de consistência, acompanhamento real e um protocolo feito
                  para você, não para uma planilha genérica.
                </p>
                <p>
                  Cada aluno atendido é uma prova de que o processo funciona
                  quando é feito com seriedade e sem frescura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10 reveal-up delay-200">
                <div className="flex items-start gap-3">
                  <iconify-icon icon="solar:diploma-linear" class="text-[#2979FF] mt-1" width="20"></iconify-icon>
                  <div>
                    <h4 className="font-mono text-[0.65rem] text-[#6B6B6B] mb-1">FORMAÇÃO</h4>
                    <p className="font-body text-sm text-[#F2F2F2]">Educação Física</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <iconify-icon icon="solar:target-linear" class="text-[#2979FF] mt-1" width="20"></iconify-icon>
                  <div>
                    <h4 className="font-mono text-[0.65rem] text-[#6B6B6B] mb-1">ESPECIALIDADES</h4>
                    <p className="font-body text-sm text-[#F2F2F2]">Emagrecimento, Hipertrofia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <iconify-icon icon="solar:map-point-linear" class="text-[#2979FF] mt-1" width="20"></iconify-icon>
                  <div>
                    <h4 className="font-mono text-[0.65rem] text-[#6B6B6B] mb-1">ATUAÇÃO</h4>
                    <p className="font-body text-sm text-[#F2F2F2]">Presencial, Online, Domicílio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <iconify-icon icon="solar:instagram-linear" class="text-[#2979FF] mt-1" width="20"></iconify-icon>
                  <div>
                    <h4 className="font-mono text-[0.65rem] text-[#6B6B6B] mb-1">INSTAGRAM</h4>
                    <a href="https://instagram.com/teamlucasprado" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[#F2F2F2] hover:text-[#2979FF] transition-colors">@teamlucasprado</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 · FAQ */}
      <section className="py-24 md:py-32 bg-[#0B1628] relative overflow-hidden" id="faq">
        <div className="absolute right-0 top-0 w-[40%] h-full opacity-[0.07] z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, rgba(0,0,0,0.8))', WebkitMaskImage: 'linear-gradient(to right, transparent, rgba(0,0,0,0.8))' }}>
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="container mx-auto px-5 md:px-10 relative z-10">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-xs eyebrow block mb-6 text-center reveal-up">Dúvidas</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-16 text-center reveal-up delay-100">
              PERGUNTAS DIRETAS.
            </h2>

            <div className="space-y-4 reveal-up delay-200">
              {[
                { q: 'Preciso ter experiência prévia?', a: 'Não. Iniciantes são bem-vindos. Avaliamos o seu ponto de partida e montamos o protocolo do zero, no seu ritmo.' },
                { q: 'Como funciona o acompanhamento online?', a: 'Você recebe o protocolo de treino completo, suporte por mensagem e revisões periódicas. A distância não muda o compromisso com o seu resultado.' },
                { q: 'E o atendimento a domicílio?', a: 'Atendo na sua casa, condomínio ou espaço de sua preferência. Sem necessidade de deslocamento — o treino vai até você.' },
                { q: 'Em quanto tempo vejo resultado?', a: 'Depende do objetivo e da consistência — mas alunos costumam notar diferença nas primeiras 4 a 8 semanas de protocolo. Resultado real leva tempo, e o processo é esse.' },
                { q: 'Qual é o valor?', a: 'Os valores variam conforme a modalidade e o plano. Entre em contato para receber uma proposta personalizada sem compromisso.' }
              ].map((faq, index) => (
                <details key={index} className="group bg-[#050D1A] rounded-lg border border-white/5 overflow-hidden transition-all duration-300 [&[open]]:glass-card">
                  <summary className="flex justify-between items-center p-6 text-lg font-body font-medium text-white cursor-pointer select-none">
                    {faq.q}
                    <iconify-icon icon="solar:alt-arrow-down-linear" class="faq-icon text-[#2979FF] transition-transform duration-300" width="24"></iconify-icon>
                  </summary>
                  <div className="faq-content px-6 pb-6 text-[#B0B0B0] font-body text-sm md:text-base leading-relaxed border-t border-transparent group-open:border-[#2979FF]/10 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 · CTA Final */}
      <section className="relative py-32 md:py-48 flex items-center overflow-hidden bg-[#050D1A]">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" alt="Lucas Prado CTA" className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#050D1A]/85 backdrop-blur-[2px]"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2979FF] opacity-[0.08] blur-[120px] rounded-full z-0 pointer-events-none"></div>

        <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap z-10 opacity-70 pointer-events-none select-none border-y border-[#2979FF]/10 py-2">
          <div className="animate-ticker font-display font-extrabold text-2xl md:text-4xl text-[#2979FF] tracking-widest inline-block">
            S E G U I R · N O · I N S T A G R A M · @ T E A M L U C A S P R A D O
            · C O M E Ç A R · A G O R A · S E M · E N R O L A Ç Ã O · R E S U L T
            A D O · R E A L · S E G U I R · N O · I N S T A G R A M · @ T E A M L
            U C A S P R A D O ·
          </div>
          <div className="animate-ticker font-display font-extrabold text-2xl md:text-4xl text-[#2979FF] tracking-widest inline-block" aria-hidden="true">
            S E G U I R · N O · I N S T A G R A M · @ T E A M L U C A S P R A D O
            · C O M E Ç A R · A G O R A · S E M · E N R O L A Ç Ã O · R E S U L T
            A D O · R E A L · S E G U I R · N O · I N S T A G R A M · @ T E A M L
            U C A S P R A D O ·
          </div>
        </div>

        <div className="container mx-auto px-5 md:px-10 relative z-20 text-center flex flex-col items-center">
          <h2 className="font-display font-extrabold text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.9] mb-8 reveal-up">
            CHEGA DE<br />ESPERAR O<br />MOMENTO CERTO.
          </h2>

          <p className="font-body text-[#F2F2F2] text-lg md:text-xl max-w-2xl mb-12 reveal-up delay-100">
            Primeira conversa sem compromisso. Você fala, a gente escuta e monta o
            plano certo para o seu objetivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto reveal-scale delay-200">
            <a href="https://instagram.com/teamlucasprado" target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-5 font-mono text-sm font-normal text-center flex items-center justify-center gap-2">
              <iconify-icon icon="solar:instagram-linear" width="20"></iconify-icon>
              Seguir no Instagram
            </a>
            <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="btn-secondary px-10 py-5 font-mono text-sm font-normal text-center flex items-center justify-center gap-2">
              <iconify-icon icon="solar:phone-calling-linear" width="20"></iconify-icon>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050D1A] relative pt-20 pb-10 border-t" style={{ borderImage: 'linear-gradient(90deg, transparent, rgba(41,121,255,0.5), transparent) 1' }}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="md:col-span-5 flex flex-col items-start">
              <a href="#" onClick={(e) => scrollToSection(e, '#')} className="font-display font-extrabold text-3xl text-white tracking-tight flex items-center gap-2 mb-4">
                <span className="text-[#2979FF]">LP</span>
                LUCAS PRADO
              </a>
              <p className="font-mono text-xs text-[#6B6B6B] tracking-widest">
                RESULTADO SEM FRESCURA.
              </p>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-mono text-xs text-white mb-6">NAVEGAÇÃO</h4>
              <ul className="space-y-3 font-body text-sm text-[#B0B0B0]">
                {['#metodo', '#resultados', '#modalidades', '#sobre'].map((href) => (
                  <li key={href}>
                    <a href={href} onClick={(e) => scrollToSection(e, href)} className="hover:text-[#2979FF] transition-colors">
                      {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-mono text-xs text-white mb-6">CONTATO</h4>
              <ul className="space-y-4 font-body text-sm text-[#B0B0B0]">
                <li>
                  <a href="https://instagram.com/teamlucasprado" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#2979FF] transition-colors">
                    <iconify-icon icon="solar:instagram-linear" width="18"></iconify-icon>
                    @teamlucasprado
                  </a>
                </li>
                <li>
                  <a href="mailto:lucasspradoo01@gmail.com" className="flex items-center gap-2 hover:text-[#2979FF] transition-colors">
                    <iconify-icon icon="solar:letter-linear" width="18"></iconify-icon>
                    lucasspradoo01@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#whatsapp" onClick={(e) => scrollToSection(e, '#whatsapp')} className="flex items-center gap-2 hover:text-[#2979FF] transition-colors">
                    <iconify-icon icon="solar:phone-calling-linear" width="18"></iconify-icon>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[0.65rem] text-[#6B6B6B]">
              LUCAS PRADO PERSONAL TRAINER · © {new Date().getFullYear()}
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-[2px] bg-[#2979FF]/30 rounded mt-1"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}