import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export interface QA {
  q: string;
  a: string;
}

interface Props {
  items: QA[];
}

const INITIAL_OPEN = 0;

/** Accordion de perguntas frequentes com abertura animada via anime.js.
 *  IMPORTANTE: o height/opacity do corpo é controlado 100% pelo anime.js
 *  (imperativo). O React cuida apenas da classe/ícone e do aria — assim as
 *  duas coisas não brigam pelo mesmo style e o abrir/fechar funciona. */
export default function Faq({ items }: Props) {
  const [open, setOpen] = useState<number | null>(INITIAL_OPEN);
  const bodies = useRef<Array<HTMLDivElement | null>>([]);

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const collapse = (el: HTMLDivElement) => {
    anime.remove(el);
    // fixa a altura atual em px antes de animar (nunca a partir de 'auto')
    el.style.height = `${el.scrollHeight}px`;
    if (prefersReduced()) {
      el.style.height = '0px';
      el.style.opacity = '0';
      return;
    }
    // força reflow para o browser registrar a altura inicial
    void el.offsetHeight;
    anime({
      targets: el,
      height: 0,
      opacity: 0,
      duration: 380,
      easing: 'easeInOutQuad',
    });
  };

  const expand = (el: HTMLDivElement) => {
    anime.remove(el);
    const target = el.scrollHeight;
    if (prefersReduced()) {
      el.style.height = 'auto';
      el.style.opacity = '1';
      return;
    }
    anime({
      targets: el,
      height: [el.offsetHeight, target],
      opacity: [Number(el.style.opacity) || 0, 1],
      duration: 460,
      easing: 'easeOutExpo',
      complete: () => {
        // altura automática depois de abrir (acompanha conteúdo responsivo)
        el.style.height = 'auto';
      },
    });
  };

  // Estado inicial: abre o item inicial, mantém os demais fechados.
  useEffect(() => {
    bodies.current.forEach((el, i) => {
      if (!el) return;
      if (i === INITIAL_OPEN) {
        el.style.height = 'auto';
        el.style.opacity = '1';
      } else {
        el.style.height = '0px';
        el.style.opacity = '0';
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (i: number) => {
    const next = open === i ? null : i;

    // fecha o item aberto anteriormente (se for outro)
    if (open !== null && open !== i && bodies.current[open]) {
      collapse(bodies.current[open]!);
    }

    const el = bodies.current[i];
    if (el) {
      if (next === i) expand(el);
      else collapse(el);
    }

    setOpen(next);
  };

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              <span>{item.q}</span>
              <span className="faq__icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
            <div
              className="faq__body"
              ref={(el) => {
                bodies.current[i] = el;
              }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq { display: flex; flex-direction: column; gap: 0.7rem; }
        .faq__item {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: rgba(255,255,255,0.014);
          transition: border-color 0.4s var(--ease);
          overflow: hidden;
        }
        .faq__item.is-open { border-color: var(--line-strong); }
        .faq__q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          text-align: left;
          padding: 1.35rem 1.5rem;
          font-family: var(--font-display);
          font-size: 1.28rem;
          color: var(--white);
          cursor: pointer;
        }
        .faq__icon {
          flex: none;
          position: relative;
          width: 18px;
          height: 18px;
        }
        .faq__icon i {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 2px;
          background: var(--gold-3);
          translate: -50% -50%;
          transition: transform 0.4s var(--ease), background 0.4s var(--ease);
        }
        .faq__icon i:nth-child(2) { transform: rotate(90deg); }
        .is-open .faq__icon i:nth-child(2) { transform: rotate(0deg); }
        .faq__body {
          height: 0;
          opacity: 0;
          overflow: hidden;
        }
        .faq__body p {
          padding: 0 1.5rem 1.5rem;
          color: var(--muted);
          font-size: 0.98rem;
          max-width: 62ch;
        }
      `}</style>
    </div>
  );
}
