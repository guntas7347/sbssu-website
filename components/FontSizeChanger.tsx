"use client";

import { useEffect, useState } from "react";

const SIZES = [14, 16, 18, 20, 22];
const DEFAULT_SIZE = 16;

export default function FontSizeChanger() {
  const [size, setSize] = useState(DEFAULT_SIZE);

  useEffect(() => {
    const saved = localStorage.getItem("text-size");
    if (saved) {
      const parsed = Number(saved);
      if (SIZES.includes(parsed)) setSize(parsed);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem("text-size", String(size));
  }, [size]);

  const decrease = () => setSize((prev) => Math.max(SIZES[0], prev - 2));

  const increase = () =>
    setSize((prev) => Math.min(SIZES[SIZES.length - 1], prev + 2));

  const reset = () => setSize(DEFAULT_SIZE);

  return (
    <div
      role="group"
      aria-label="Font size controls"
      className="inline-flex items-center divide-x divide-slate-700/80 overflow-hidden rounded bg-slate-800 text-xs text-slate-300"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={size === SIZES[0]}
        aria-label="Decrease text size"
        title="Decrease text size"
        className="px-2 py-1 text-[11px] font-medium transition-colors hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 cursor-pointer"
      >
        A−
      </button>

      <button
        type="button"
        onClick={reset}
        aria-label="Reset text size"
        title="Reset text size (16px)"
        className={`px-2 py-1 text-[11px] font-medium transition-colors hover:bg-slate-700 hover:text-white cursor-pointer ${
          size === DEFAULT_SIZE
            ? "bg-slate-700/70 text-white"
            : "text-slate-300"
        }`}
      >
        A
      </button>

      <button
        type="button"
        onClick={increase}
        disabled={size === SIZES[SIZES.length - 1]}
        aria-label="Increase text size"
        title="Increase text size"
        className="px-2 py-1 text-[11px] font-medium transition-colors hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 cursor-pointer"
      >
        A+
      </button>
    </div>
  );
}
