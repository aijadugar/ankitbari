"use client";

import { useEffect, useState } from "react";

/**
 * A "floating" rolling-digit clock. Each digit lives in its own little cell
 * and the number drops down into place (an odometer that always rolls down
 * as time advances) when it changes.
 */

const ROLL = [
  9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
] as const;

function DigitCell({ value }: { value: string }) {
  const n = Number(value);
  return (
    <div
      className="relative h-[1.18em] w-[0.66em] overflow-hidden rounded-[4px] border border-zinc-300/40 bg-zinc-100/40 shadow-[0_1px_1px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.5)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
    >
      {/* subtle top highlight to make the cell read as "floating" */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5" />
      <div
        className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${(9 - n) * 10}%)` }}
      >
        {ROLL.map((d) => (
          <span
            key={d}
            className="flex h-[1.18em] items-center justify-center leading-none"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function TwoDots() {
  return (
    <div className="mx-0.5 sm:mx-1 flex flex-col gap-1.5 -translate-x-[2px] sm:-translate-x-[3px]">
      <div className="w-[2px] h-[2px] rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
      <div className="w-[2px] h-[2px] rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
    </div>
  );
}

export function CurrentTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setTime(new Date()), 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  const hours = (time?.getHours() ?? 0).toString().padStart(2, "0");
  const minutes = (time?.getMinutes() ?? 0).toString().padStart(2, "0");
  const seconds = (time?.getSeconds() ?? 0).toString().padStart(2, "0");

  const label = time
    ? time.toLocaleTimeString()
    : "00:00:00";

  return (
    <div
      className="flex items-center h-[28px] sm:h-[32px] select-none"
      role="img"
      aria-label={`Current time ${label}`}
    >
      <div
        className="text-[20px] sm:text-[24px] tracking-[0.12em] flex items-center text-zinc-500 dark:text-zinc-400 h-full"
        style={{ fontFamily: '"Doto", monospace', fontWeight: 700 }}
      >
        <DigitCell value={hours[0]} />
        <DigitCell value={hours[1]} />
        <TwoDots />
        <DigitCell value={minutes[0]} />
        <DigitCell value={minutes[1]} />
        <TwoDots />
        <DigitCell value={seconds[0]} />
        <DigitCell value={seconds[1]} />
      </div>
    </div>
  );
}
