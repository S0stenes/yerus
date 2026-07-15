import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface Props {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Botão "magnético": é atraído levemente pelo cursor.
 * anime.js cria um efeito de onda (ripple) dourada ao clicar.
 */
export default function MagneticButton({ href, label, external = true }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    let cur = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const loop = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      el.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - (r.left + r.width / 2)) * 0.35;
      target.y = (e.clientY - (r.top + r.height / 2)) * 0.4;
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const ripple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'mag__ripple';
    dot.style.left = `${e.clientX - r.left}px`;
    dot.style.top = `${e.clientY - r.top}px`;
    el.appendChild(dot);
    anime({
      targets: dot,
      scale: [0, 3.4],
      opacity: [0.55, 0],
      duration: 700,
      easing: 'easeOutExpo',
      complete: () => dot.remove(),
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={ripple}
      className="btn btn-primary mag"
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <span className="mag__label">{label}</span>
      <span className="mag__arrow" aria-hidden="true">→</span>

      <style>{`
        .mag {
          position: relative;
          overflow: hidden;
          --pad-y: 1.1rem;
          --pad-x: 2.4rem;
          font-size: 1.02rem;
        }
        .mag__label, .mag__arrow { position: relative; z-index: 2; }
        .mag__arrow { transition: transform 0.4s var(--ease); }
        .mag:hover .mag__arrow { transform: translateX(5px); }
        .mag__ripple {
          position: absolute;
          z-index: 1;
          width: 40px;
          height: 40px;
          margin: -20px 0 0 -20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
      `}</style>
    </a>
  );
}
