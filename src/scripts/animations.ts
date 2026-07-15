// ============================================================
//  MOTOR DE ANIMAÇÕES — GSAP
//  - Reveal de elementos ao rolar  [data-reveal]
//  - Parallax por scroll           [data-parallax="0.2"]
//  - Parallax por mouse (hero)     [data-mouse="0.04"] dentro de [data-mouse-scene]
//  - Barra de progresso do topo    [data-scroll-progress]
// ============================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function init() {
  // ----- 0. Brilho dourado seguindo o cursor (cards do site inteiro) -----
  document
    .querySelectorAll<HTMLElement>('.card, .about__card, .process__item')
    .forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

  // ----- 1. Reveal ao entrar na viewport -----
  const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  revealEls.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          onStart: () => el.classList.add('is-visible'),
          onComplete: () => {
            // remove o will-change para não deixar camadas de composição
            // ativas (que podem ser recortadas por overflow em ancestrais)
            el.style.willChange = 'auto';
          },
        });
      },
    });
  });

  if (prefersReduced) {
    // Sem parallax quando o usuário pede menos movimento.
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // ----- 2. Parallax por scroll -----
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax ?? '0.2');
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('[data-parallax-scene]') ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // ----- 3. Parallax por mouse (cena do hero) -----
  const scenes = gsap.utils.toArray<HTMLElement>('[data-mouse-scene]');
  scenes.forEach((scene) => {
    const layers = gsap.utils.toArray<HTMLElement>('[data-mouse]', scene);
    // movimento suavizado com quickTo
    const movers = layers.map((layer) => {
      const depth = parseFloat(layer.dataset.mouse ?? '0.03');
      return {
        x: gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3' }),
        y: gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power3' }),
        depth,
      };
    });

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      movers.forEach((m) => {
        m.x(-relX * m.depth * 120);
        m.y(-relY * m.depth * 120);
      });
    };

    const onLeave = () => movers.forEach((m) => (m.x(0), m.y(0)));

    scene.addEventListener('mousemove', onMove);
    scene.addEventListener('mouseleave', onLeave);
  });

  // ----- 4. Barra de progresso de scroll -----
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }

  // ----- 5. Sutil "float" contínuo em elementos marcados -----
  gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: '+=14',
      duration: 3 + i * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  // recalcula posições após tudo carregar (fontes, imagens)
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// Garante execução após o DOM montar (scripts de Astro são type=module/defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
