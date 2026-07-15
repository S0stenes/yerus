# Yerus — Landing Page

Landing page da **Yerus**, agência de marketing digital. Construída com **Astro**, ilhas em **React**, animações de **parallax com GSAP** (scroll + mouse) e microinterações com **anime.js**. Totalmente responsiva (desktop, tablet e mobile).

---

## 🚀 Como rodar

Pré-requisito: **Node.js 18+** instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo desenvolvimento (abre em http://localhost:4321)
npm run dev

# 3. Gerar a versão de produção (pasta /dist)
npm run build

# 4. Pré-visualizar o build de produção
npm run preview
```

---

## 🎨 Tecnologias e efeitos

- **Astro** — estrutura, performance e HTML estático rápido.
- **React** — ilhas interativas (FAQ, contadores, botão magnético) via `@astrojs/react`.
- **GSAP + ScrollTrigger** — parallax por scroll, parallax por movimento do mouse na hero, reveals e barra de progresso. Código em `src/scripts/animations.ts`.
- **anime.js** — contadores animados (Sobre), abertura do FAQ e efeito de onda no botão de CTA.
- Acessibilidade: respeita `prefers-reduced-motion` (desativa animações pesadas).

---

## ✏️ O que você precisa editar (placeholders)

Tudo o que é conteúdo fica centralizado em **`src/data/site.ts`**. Procure pelos comentários `[PLACEHOLDER]`:

| O quê | Onde |
|---|---|
| WhatsApp, e-mail, Instagram, cidade | `src/data/site.ts` → `site.contact` |
| Serviços (textos e itens) | `src/data/site.ts` → `services` |
| Métricas / números | `src/data/site.ts` → `stats` |
| Portfólio / cases | `src/data/site.ts` → `portfolio` |
| Perguntas frequentes | `src/data/site.ts` → `faq` |

### Vídeo de fundo da hero

Coloque seu vídeo em **`public/hero/`** com os nomes `hero.webm` e `hero.mp4`.
Enquanto não houver vídeo, um **fundo animado dourado** aparece automaticamente no lugar (nada quebra). Detalhes em `public/hero/LEIA-ME.txt`.

---

## 📁 Estrutura

```
public/
  logo-golden.svg      logo completa (dourada)
  icon-golden.svg      símbolo da águia
  favicon.svg
  hero/                onde vai o vídeo de fundo (+ poster)
src/
  data/site.ts         ⭐ todo o conteúdo editável
  styles/global.css    design system (cores, tipografia, tokens)
  scripts/animations.ts motor de animações GSAP
  layouts/Base.astro   <head>, fontes, SEO
  components/
    Nav.astro          menu + barra de progresso
    Hero.astro         vídeo fullscreen + parallax de mouse
    Services.astro     5 serviços
    About.astro        sobre + diferenciais
    Stats.tsx          contadores animados (React + anime.js)
    Process.astro      processo em 4 etapas
    Portfolio.astro    prova social
    Faq.astro / Faq.tsx accordion (React + anime.js)
    MagneticButton.tsx botão magnético (React + anime.js)
    FinalCta.astro     chamada final
    Footer.astro       rodapé
  pages/index.astro    monta a página
```

---

## 🌐 Publicação

O comando `npm run build` gera a pasta `dist/` com o site estático — pode ser publicado em qualquer hospedagem (Vercel, Netlify, Cloudflare Pages, Hostinger, etc.). Lembre-se de configurar o domínio conforme sua hospedagem.

## 🎨 Paleta da marca

- Preto: `#050505`
- Dourado (gradiente): `#ffe999 → #c9a15a → #8a6a2f`
- Tipografia: Cormorant Garamond (títulos) + Inter (texto)
