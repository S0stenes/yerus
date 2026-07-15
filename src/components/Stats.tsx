import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

/**
 * Contadores que animam de 0 até o valor quando entram na tela.
 * Usa anime.js para a interpolação numérica.
 */
export default function Stats({ stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      setDone(true);
      const nums = el.querySelectorAll<HTMLElement>('[data-num]');
      nums.forEach((node) => {
        const target = Number(node.dataset.num ?? '0');
        if (reduce) {
          node.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        anime({
          targets: obj,
          v: target,
          round: 1,
          duration: 1600,
          easing: 'easeOutExpo',
          update: () => {
            node.textContent = String(obj.v);
          },
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [done]);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat__value font-display">
            <span data-num={s.value}>0</span>
            {s.suffix && <span className="stat__suffix">{s.suffix}</span>}
          </div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}

      <style>{`
        .stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .stat {
          background: var(--black-soft);
          padding: 1.8rem 1.4rem;
          text-align: center;
        }
        .stat__value {
          display: inline-flex;
          align-items: baseline;
          font-size: clamp(2.4rem, 6vw, 3.4rem);
          line-height: 1;
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stat__suffix { margin-left: 2px; }
        .stat__label {
          margin-top: 0.6rem;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          color: var(--muted);
        }
        @media (min-width: 720px) {
          .stats { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
