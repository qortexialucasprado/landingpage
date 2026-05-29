# Design System · Lucas Prado Personal Trainer

---

## Design System Overview

Este sistema de design foi extraído e sintetizado a partir de referências visuais de alta performance no segmento fitness premium. O resultado é uma linguagem visual única, intencional e product-ready — adaptada à identidade de Lucas Prado com paleta de azul profundo.

---

## 1. Concept and Style

Uma identidade que combina **brutalidade visual controlada** com **sofisticação dark premium**. O sistema equilibra energia física e autoridade profissional — agressivo nas headlines, refinado na composição, limpo na execução.

A tipografia condensada e em uppercase domina o espaço. A fotografia é protagonista. O azul elétrico corta o escuro como foco de luz — não decorativo, mas funcional e intencional.

**Keywords:** `dark-premium` · `high-impact` · `photo-forward` · `bold-editorial` · `electric-precise` · `structured-raw`

---

## 2. Color System

### 2.1 Primitive Colors

```
Navy Deep    #050D1A   → Base absoluta. Background principal.
Royal Blue   #0B3D91   → Camada de profundidade. Cards e seções.
Blue Glow    #1565C0   → Ponte entre Royal e Electric. Gradientes.
Electric Blue #2979FF  → Energia máxima. CTA, destaque, glow.

Neutral 900  #080808   → Preto absoluto para overlays e sombras.
Neutral 800  #111111   → Superfície escura alternativa.
Neutral 700  #1A1A1A   → Bordas escuras e separadores.
Neutral 400  #6B6B6B   → Texto desabilitado, placeholders.
Neutral 200  #B0B0B0   → Texto secundário, labels, captions.
Neutral 100  #D9D9D9   → Bordas suaves, divisores.
Neutral 50   #F2F2F2   → Texto primário sobre dark.
White        #FFFFFF   → Headlines de impacto máximo.
```

### 2.2 Semantic Colors

| Role        | Token         | Hex       | Uso                                                  |
|-------------|---------------|-----------|------------------------------------------------------|
| Primary     | `--clr-primary`   | `#2979FF` | CTAs principais, links ativos, ícones de destaque    |
| Secondary   | `--clr-secondary` | `#0B3D91` | Backgrounds de cards, seções alternadas              |
| Accent      | `--clr-accent`    | `#1565C0` | Gradientes, bordas de hover, anéis de foco           |
| Background  | `--clr-bg`        | `#050D1A` | Canvas base de toda a interface                      |
| Surface     | `--clr-surface`   | `#0B1628` | Cards, modais, painéis elevados                      |
| Text High   | `--clr-text-hi`   | `#FFFFFF` | Headlines, números de destaque                       |
| Text Mid    | `--clr-text-mid`  | `#F2F2F2` | Body text, parágrafos                                |
| Text Low    | `--clr-text-lo`   | `#B0B0B0` | Labels, captions, texto de suporte                   |
| Success     | `--clr-success`   | `#22C55E` | Checklist de benefícios, confirmações                |
| Error       | `--clr-error`     | `#EF4444` | Validações, alertas críticos                         |
| Overlay     | `--clr-overlay`   | `rgba(5,13,26,0.72)` | Camada sobre fotos em cards de serviço  |

**Lógica de uso:**
- O fundo `#050D1A` nunca compete com o conteúdo — ele recua para dar protagonismo à fotografia e à tipografia.
- `#2979FF` (Electric Blue) é usado com parcimônia: no máximo 1–2 elementos por seção, sempre como foco visual.
- O gradiente canônico do sistema vai de `#050D1A` → `#0B3D91` → `#1565C0`, aplicado em overlays de fotografia e fundos de seção alternados.
- Cards de serviço usam overlay `rgba(5,13,26,0.72)` sobre fotografia para garantir legibilidade.

---

## 3. Typography

### 3.1 System

O sistema tipográfico opera em dois eixos: **impacto** e **clareza**. Headlines são armas — condensadas, bold, uppercase. Body é invisível — serve ao conteúdo sem decoração.

| Papel         | Família sugerida          | Estilo                      |
|---------------|---------------------------|------------------------------|
| Display / H1  | Barlow Condensed          | 900 weight · uppercase · tight tracking |
| H2 / Section  | Barlow Condensed          | 700 weight · uppercase       |
| H3 / Sub      | Barlow Condensed          | 600 weight · uppercase       |
| Body          | Inter                     | 400–500 weight · normal case |
| Caption / Tag | Inter ou JetBrains Mono   | 500 weight · uppercase · wide tracking |
| Numbers/Stats | Barlow Condensed          | 900 weight · uppercase       |

### 3.2 Scale

```
Display  →  clamp(56px, 8vw, 96px)   · line-height: 0.92  · tracking: -0.02em
H1       →  clamp(40px, 6vw, 72px)   · line-height: 0.95  · tracking: -0.01em
H2       →  clamp(28px, 4vw, 48px)   · line-height: 1.0   · tracking: 0
H3       →  clamp(20px, 2.5vw, 32px) · line-height: 1.1   · tracking: 0.01em
Body     →  16px / 18px              · line-height: 1.6   · tracking: 0
Caption  →  11px / 12px              · line-height: 1.4   · tracking: 0.08em · uppercase
Stats    →  clamp(48px, 7vw, 80px)   · line-height: 1.0   · tracking: -0.02em
```

### 3.3 Weight Distribution

- `900` → Headlines de impacto máximo, números de prova social
- `700` → Section titles, subtítulos de cards
- `600` → Labels de seção (ex.: "WHAT WE OFFER"), eyebrows
- `400–500` → Body, descrições, texto corrido
- `500 uppercase` → Tags, badges, captions de microconteúdo

### 3.4 Color in Type

- Headlines principais: `#FFFFFF` sobre dark
- Palavra de destaque inline (keyword accent): `#2979FF`
- Body text: `#F2F2F2`
- Eyebrow labels: `#2979FF` uppercase tracking amplo
- Captions e metadata: `#B0B0B0`

---

## 4. Spacing and Layout

### 4.1 Spacing Scale (Base 4pt)

```
2   →  0.5rem   →  micro gaps, icon padding
4   →  1rem     →  inline spacing, tag padding
8   →  2rem     →  between label and heading
12  →  3rem     →  between heading and body
16  →  4rem     →  card internal padding
24  →  6rem     →  section sub-block gap
32  →  8rem     →  between major sections
48  →  12rem    →  section vertical padding (desktop)
64  →  16rem    →  hero vertical padding
```

### 4.2 Grid System

```
Desktop:  12 colunas · gutter 24px · margin 80px
Tablet:   8 colunas  · gutter 16px · margin 40px
Mobile:   4 colunas  · gutter 12px · margin 20px
```

### 4.3 Layout Density

**Denso nas estatísticas, espaçoso nas seções.** Cada seção respira com `padding-y` mínimo de 80px. Cards de serviço são apertados internamente para criar tensão visual. O whitespace (aqui, "darkspace") é ativo — não vazio, mas intencionalmente presente para dar peso à tipografia.

### 4.4 Composition Rules

- Foto sempre à direita ou ao fundo — nunca enquadrada de forma convencional
- Texto alinhado à esquerda em 90% dos casos
- Números/estatísticas em linha horizontal, separados por espaço generoso
- Cards de serviço: layout 3 colunas desktop, 1 coluna mobile, card central com destaque diferenciado (overlay + borda Electric Blue)
- Eyebrow label sempre acima do título de seção, em uppercase tracking

---

## 5. Shapes and UI Language

### 5.1 Border Radius

```
Sharp     →  0px     → Elementos de máximo impacto (botão hero, cards foto full-bleed)
Subtle    →  4px     → Cards internos, inputs
Default   →  8px     → Cards padrão, modais
Soft      →  12px    → Cards de planos/pricing
Pill      →  9999px  → Tags, badges, chips
```

O sistema prefere **bordas retas e sutis** — a agressividade vem da tipografia, não do arredondamento. Cards de foto usam `0px` ou `4px`. Cards de pricing usam `12px` para suavizar o contraste de preço.

### 5.2 Stroke / Borders

```
Invisible   →  nenhuma borda (maioria dos cards sobre bg escuro)
Subtle      →  1px solid rgba(41,121,255,0.15)  → separadores e divisores
Active      →  1px solid #2979FF               → card selecionado, item de nav ativo
Accent      →  2px solid #2979FF               → highlight de card em destaque
```

### 5.3 Component Style

| Componente     | Estilo                                                    |
|----------------|-----------------------------------------------------------|
| Botão Primary  | Fill `#2979FF` · texto `#FFFFFF` · radius 4px · uppercase |
| Botão Secondary| Border `1px #F2F2F2` · texto `#F2F2F2` · sem fill         |
| Botão Ghost    | Sem borda, texto `#2979FF` · com ícone arrow →            |
| Card Serviço   | Foto full-bleed · overlay dark · texto sobre imagem       |
| Card Pricing   | Surface `#0B1628` · radius 12px · borda sutil             |
| Card Pricing ★ | Surface gradiente `#0B3D91→#1565C0` · borda `#2979FF`     |
| Tag / Eyebrow  | Uppercase · tracking 0.08em · cor `#2979FF` · sem bkg     |
| Stat Block     | Número `#FFFFFF` · label `#B0B0B0` · layout vertical      |
| Input          | Borda `1px rgba(255,255,255,0.1)` · fill `#0B1628`        |

---

## 6. Visual Details

### 6.1 Shadows

```
Nenhuma sombra padrão em cards sobre background escuro.
Glow Effect  →  box-shadow: 0 0 24px rgba(41,121,255,0.35)  → botão primary em hover
Photo Depth  →  box-shadow: 0 16px 48px rgba(0,0,0,0.6)     → cards com foto elevada
Inner Glow   →  box-shadow: inset 0 1px 0 rgba(41,121,255,0.2) → card highlight top border
```

### 6.2 Gradients

```
Hero Overlay:
  background: linear-gradient(135deg, #050D1A 0%, rgba(5,13,26,0) 60%)
  → aplicado sobre foto de fundo no hero, lado esquerdo

Section BG Alternate:
  background: linear-gradient(180deg, #050D1A 0%, #0B3D91 50%, #050D1A 100%)
  → seções alternadas para criar ritmo sem usar cor sólida

Card Overlay (foto):
  background: linear-gradient(0deg, rgba(5,13,26,0.9) 0%, rgba(5,13,26,0.2) 60%, transparent 100%)
  → sobre imagens de cards de serviço para legibilidade

CTA Glow Gradient:
  background: linear-gradient(135deg, #1565C0 0%, #2979FF 100%)
  → botão primário principal

Pricing Card Highlight:
  background: linear-gradient(160deg, #0B3D91 0%, #1565C0 100%)
  → card de plano em destaque (Standard/Recomendado)
```

### 6.3 Efeitos Adicionais

```
Glow Orb (decorativo):
  Elemento SVG circular desfocado, cor #1565C0, opacity 0.15–0.25
  Posicionado atrás do profissional no hero — cria aura de presença

Backdrop Filter:
  backdrop-filter: blur(12px)
  → usado em stats cards flutuantes sobre foto (glassmorphism sutil)

Background Text (gigante):
  Texto com opacity 0.06–0.10, cor #2979FF
  → nome ou palavra-chave em uppercase Barlow Condensed 900
  → layer atrás do conteúdo no hero, cria profundidade sem poluir

Photo Treatment:
  Imagens com leve tint azul: mix-blend-mode: multiply + overlay azul #0B3D91 opacity 0.15
  → unifica o tom das fotos com a paleta sem perder naturalidade

### 6.4 Glassmorphism

Aplicar nos seguintes componentes:
- Cards de depoimento
- Cards de estatísticas flutuantes no hero
- Card de modalidade em destaque
- Painel do FAQ expandido
- Header após scroll (navbar com blur)

```css
/* Glass card padrão */
background: rgba(11, 61, 145, 0.15);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(41, 121, 255, 0.2);
border-radius: 16px;

/* Glass navbar (após scroll) */
background: rgba(5, 13, 26, 0.72);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(41, 121, 255, 0.1);
```

### 6.5 Animações e Movimento

**Princípio:** movimento com propósito — cada animação comunica 
algo, nunca é decorativa pelo simples fato de existir.

```css
/* Timing padrão do sistema */
--ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-sharp:   cubic-bezier(0.4, 0, 0.6, 1);

--duration-fast:   150ms;
--duration-base:   300ms;
--duration-slow:   600ms;
--duration-reveal: 900ms;
```

**Entrance animations (scroll-triggered via Intersection Observer):**

```css
/* Fade up — padrão para textos e cards */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Fade in — para imagens e overlays */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Scale in — para stat numbers e CTAs */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

/* Slide right — para eyebrow labels */
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

**Mapeamento por seção:**

| Seção | Elemento | Animação | Delay |
|---|---|---|---|
| Hero | Eyebrow label | slideRight | 0ms |
| Hero | Headline linha 1 | fadeUp | 100ms |
| Hero | Headline linha 2 | fadeUp | 200ms |
| Hero | Headline linha 3 | fadeUp | 300ms |
| Hero | Subtítulo | fadeUp | 400ms |
| Hero | Botões | scaleIn | 500ms |
| Hero | Stat cards | fadeUp | 600ms |
| Strip | Números | scaleIn | stagger 100ms |
| Todas seções | Eyebrow | slideRight | 0ms |
| Todas seções | Headline | fadeUp | 100ms |
| Todas seções | Cards | fadeUp | stagger 150ms |
| Stats | Contadores | countUp animado | ao entrar na viewport |

**Hover states:**

```css
/* Botão primário */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(41, 121, 255, 0.5);
  transition: all 300ms var(--ease-smooth);
}

/* Card de serviço / modalidade */
.card:hover {
  transform: translateY(-6px);
  border-color: rgba(41, 121, 255, 0.5);
  box-shadow: 0 20px 60px rgba(5, 13, 26, 0.6),
              0 0 24px rgba(41, 121, 255, 0.15);
  transition: all 400ms var(--ease-smooth);
}

/* Glow orb no hero — flutuação contínua */
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-20px) scale(1.05); }
}
.glow-orb {
  animation: float 6s ease-in-out infinite;
}

/* Ticker / faixa animada */
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-track {
  animation: ticker 20s linear infinite;
}
```

**Parallax leve no hero:**
```css
/* Foto do Lucas com parallax suave no scroll */
.hero-photo {
  transition: transform 0.1s linear;
  /* controlado via JS: transform: translateY(scrollY * 0.3px) */
}
```

---

## 7. Contrast and Accessibility

### 7.1 Contrast Ratios (WCAG AA mínimo)

| Combinação                     | Ratio estimado | Status  |
|-------------------------------|----------------|---------|
| `#FFFFFF` sobre `#050D1A`     | 19.7:1         | ✅ AAA  |
| `#F2F2F2` sobre `#050D1A`     | 17.8:1         | ✅ AAA  |
| `#F2F2F2` sobre `#0B3D91`     | 7.2:1          | ✅ AA   |
| `#FFFFFF` sobre `#2979FF`     | 4.8:1          | ✅ AA   |
| `#B0B0B0` sobre `#050D1A`     | 9.1:1          | ✅ AAA  |
| `#2979FF` sobre `#050D1A`     | 6.3:1          | ✅ AA   |
| `#F2F2F2` sobre `#1565C0`     | 5.1:1          | ✅ AA   |

### 7.2 Readability Approach

- **Hierarquia por peso e tamanho** — nunca apenas por cor
- **Cor como reforço, não como única informação** — ícones acompanham sempre o Electric Blue em contextos críticos
- **Foto com overlay obrigatório** — nenhum texto diretamente sobre imagem sem camada de contraste
- **Inputs e formulários** — placeholder em `#6B6B6B`, label em `#B0B0B0`, foco com borda `#2979FF`

### 7.3 Focus States

```css
:focus-visible {
  outline: 2px solid #2979FF;
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

## Appendix · Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --clr-bg:          #050D1A;
  --clr-surface:     #0B1628;
  --clr-secondary:   #0B3D91;
  --clr-accent:      #1565C0;
  --clr-primary:     #2979FF;

  --clr-text-hi:     #FFFFFF;
  --clr-text-mid:    #F2F2F2;
  --clr-text-lo:     #B0B0B0;
  --clr-text-disabled: #6B6B6B;

  --clr-border-subtle:  rgba(41, 121, 255, 0.15);
  --clr-border-active:  #2979FF;
  --clr-overlay:        rgba(5, 13, 26, 0.72);

  --clr-success:     #22C55E;
  --clr-error:       #EF4444;

  /* Typography */
  --font-display:    'Barlow Condensed', sans-serif;
  --font-body:       'Inter', sans-serif;
  --font-mono:       'JetBrains Mono', monospace;

  /* Spacing */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-4:   1rem;
  --space-8:   2rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-24:  6rem;
  --space-32:  8rem;
  --space-48:  12rem;

  /* Radius */
  --radius-sharp:   0px;
  --radius-sm:      4px;
  --radius-md:      8px;
  --radius-lg:      12px;
  --radius-pill:    9999px;

  /* Shadows / Glow */
  --glow-primary:   0 0 24px rgba(41, 121, 255, 0.35);
  --shadow-photo:   0 16px 48px rgba(0, 0, 0, 0.6);
  --shadow-inner:   inset 0 1px 0 rgba(41, 121, 255, 0.2);

  /* Gradients */
  --grad-hero:      linear-gradient(135deg, #050D1A 0%, rgba(5,13,26,0) 60%);
  --grad-section:   linear-gradient(180deg, #050D1A 0%, #0B3D91 50%, #050D1A 100%);
  --grad-card:      linear-gradient(0deg, rgba(5,13,26,0.9) 0%, rgba(5,13,26,0.2) 60%, transparent 100%);
  --grad-cta:       linear-gradient(135deg, #1565C0 0%, #2979FF 100%);
  --grad-pricing:   linear-gradient(160deg, #0B3D91 0%, #1565C0 100%);
}
```

---

*Design System · Lucas Prado Personal Trainer · v1.0 · 27/05/2026*
