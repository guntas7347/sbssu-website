"use client";

import React, { useEffect, useState } from "react";
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export const VALID_LAUNCH_CODE = "LAUNCH";
const UNLOCK_DURATION_SECONDS = 4;

const VERIFICATION_STAGES = [
  "Validating secret launch key...",
  "Verifying cryptographic authorization...",
  "Authenticating Vice Chancellor clearance...",
  "Unlocking deployment console...",
];

interface LaunchLockProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  showPromptAlert: boolean;
  onDismissAlert: () => void;
}

export function LaunchLock({
  isUnlocked,
  onUnlock,
  showPromptAlert,
  onDismissAlert,
}: LaunchLockProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(UNLOCK_DURATION_SECONDS);

  useEffect(() => {
    if (!isVerifying) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isVerifying]);

  useEffect(() => {
    if (!isVerifying || secondsLeft > 0) return;

    setIsVerifying(false);
    onUnlock();
  }, [isVerifying, secondsLeft, onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;

    const normalized = code.trim().toUpperCase();

    if (normalized === VALID_LAUNCH_CODE) {
      setError("");
      onDismissAlert();
      setSecondsLeft(UNLOCK_DURATION_SECONDS);
      setIsVerifying(true);
    } else {
      setError("Invalid Authorization Code. Please verify with IT Cell.");
    }
  };

  if (isUnlocked) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-secondary/30 bg-secondary/10 px-5 py-3.5 text-sm shadow-sm transition-all">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-white shadow-sm">
            <Unlock className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              Launch Console Authorized
            </p>
            <p className="text-xs text-slate-600">
              Session verified with key{" "}
              <span className="font-mono font-semibold text-secondary">
                {VALID_LAUNCH_CODE}
              </span>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
          <CheckCircle2 className="h-3.5 w-3.5" />
          UNLOCKED
        </span>
      </div>
    );
  }

  if (isVerifying) {
    const elapsed = UNLOCK_DURATION_SECONDS - secondsLeft;
    const progressPercent = Math.min(
      100,
      Math.round(((elapsed + 1) / UNLOCK_DURATION_SECONDS) * 100),
    );
    const stageIndex = Math.min(
      VERIFICATION_STAGES.length - 1,
      Math.floor(
        (elapsed / UNLOCK_DURATION_SECONDS) * VERIFICATION_STAGES.length,
      ),
    );

    return (
      <div className="overflow-hidden rounded-2xl border-2 border-primary bg-white p-5 shadow-md ring-4 ring-primary/15 transition-all">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Verifying Secret Launch Codes
                </h2>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary uppercase">
                  <ShieldCheck className="h-3 w-3" />
                  Authenticating
                </span>
              </div>
              <p className="mt-0.5 font-mono text-xs font-medium text-slate-600">
                {VERIFICATION_STAGES[stageIndex]}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Unlocking In
            </span>
            <span className="rounded-xl bg-primary/10 px-3.5 py-1.5 font-mono text-lg font-extrabold text-primary">
              00:0{secondsLeft}s
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-primary/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition-all ${
        showPromptAlert
          ? "border-primary ring-4 ring-primary/15"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Enter Launch Codes to Launch
              </h2>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold tracking-wider text-amber-800 uppercase">
                Locked
              </span>
            </div>
            <p className="mt-0.5 text-sm text-slate-600">
              Authorization key required before initializing university servers
              and public web portals.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row md:w-auto"
        >
          <div className="relative">
            <KeyRound className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (error) setError("");
                if (showPromptAlert) onDismissAlert();
              }}
              placeholder="ENTER LAUNCH CODE"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pr-4 pl-10 font-mono text-sm font-bold tracking-widest text-slate-900 uppercase transition outline-none focus:border-primary focus:bg-white focus:ring-3 focus:ring-primary/20 sm:w-64"
            />
          </div>
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.99]"
          >
            <Unlock className="h-4 w-4" />
            Authorize
          </button>
        </form>
      </div>

      {(error || showPromptAlert) && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-medium text-amber-900">
          <ShieldAlert className="h-4 w-4 shrink-0 text-primary" />
          <span>
            {error ||
              "Console is currently locked. Please enter the launch code above to unlock launch controls."}
          </span>
        </div>
      )}
    </div>
  );
}
