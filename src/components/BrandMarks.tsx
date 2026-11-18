import { ReactNode, useEffect, useRef, useState } from 'react';

interface GuapiraSealProps {
  className?: string;
}

export function GuapiraSeal({ className = '' }: GuapiraSealProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <path
          id="guapira-seal-circle"
          d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
        />
      </defs>
      <circle
        cx="70"
        cy="70"
        r="66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <circle
        cx="70"
        cy="70"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      <text
        fill="currentColor"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="2.8"
      >
        <textPath href="#guapira-seal-circle" startOffset="0%">
          SANTA GUAPIRA · TUCURUVI · DESDE 2020 ·
        </textPath>
      </text>
      <text
        x="70"
        y="68"
        textAnchor="middle"
        fill="currentColor"
        fontSize="13"
        fontWeight="800"
        letterSpacing="1.5"
        className="font-display"
      >
        AV. 753
      </text>
      <text
        x="70"
        y="82"
        textAnchor="middle"
        fill="#D92B20"
        fontSize="9"
        fontWeight="700"
        letterSpacing="2"
      >
        SP · ZN
      </text>
    </svg>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}
