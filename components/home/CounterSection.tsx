"use client";

import { useEffect, useRef, useState } from "react";

interface Counter {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

const counters: Counter[] = [
  { label: "Sites équipés", value: 9000, suffix: "+", prefix: "" },
  { label: "kWh économisés", value: 2300000, suffix: "+", prefix: "" },
  { label: "Avance de fonds demandée", value: 0, suffix: " €", prefix: "" },
  { label: "Dossiers pris en charge", value: 100, suffix: "%", prefix: "" },
];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);

  return count;
}

function CounterItem({ counter, start }: { counter: Counter; start: boolean }) {
  const count = useCountUp(counter.value, 1800, start);
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-[#0d1e3a] mb-2">
        {counter.prefix}
        {count.toLocaleString("fr-FR")}
        {counter.suffix}
      </div>
      <div className="text-[#2c2c2a]/60 font-medium text-sm">{counter.label}</div>
    </div>
  );
}

export default function CounterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 border-b border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {counters.map((counter) => (
            <CounterItem key={counter.label} counter={counter} start={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
