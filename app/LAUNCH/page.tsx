"use client";

import React, { useEffect, useState } from "react";
import {
  Rocket,
  Server,
  Globe,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
  Lock,
  ExternalLink,
  Radio,
  RotateCcw,
} from "lucide-react";
import { LaunchLock } from "./launch-lock";

export interface LaunchStep {
  id: string;
  label: string;
  title: string;
  description: string;
  timer: number; // duration in seconds
}

const LAUNCH_STEPS: LaunchStep[] = [
  {
    id: "core-servers",
    label: "CORE_INFRASTRUCTURE_SERVERS",
    title: "University Core Servers & Database Cluster",
    description:
      "Initialize primary application nodes, PostgreSQL data clusters, and internal campus network routing.",
    timer: 5,
  },
  {
    id: "linux-server",
    label: "LINUX_SERVER_DEPLOYMENT",
    title: "Linux Server Infrastructure",
    description:
      "Deploy and configure Linux production servers, system services, reverse proxies, firewall rules, and application runtime environments.",
    timer: 5,
  },
  {
    id: "sso-auth",
    label: "SBS_SSO_IDENTITY_PROVIDER",
    title: "SBS-SSO Authentication & Security Gateway",
    description:
      "Activate unified Single Sign-On (sso.sbssu.ac.in), cryptographic session tokens, and role-based access controls.",
    timer: 4,
  },
  {
    id: "official-website",
    label: "OFFICIAL_WEB_PORTAL_SBSSU",
    title: "Official SBSSU Website (sbssu.ac.in)",
    description:
      "Publish academic departments, administration portals, notices, and public university web services.",
    timer: 6,
  },
  {
    id: "university-forms",
    label: "UNIVERSITY_FORMS_SUBMISSIONS",
    title: "University Forms & Submissions Portal",
    description:
      "Initialize forms.sbssu.ac.in for online university forms, information submissions, and centralized submission management.",
    timer: 4,
  },
  {
    id: "grievance-portal",
    label: "STUDENT_GRIEVANCE_SYSTEM",
    title: "University Grievance Redressal Portal",
    description:
      "Activate grievances.sbssu.ac.in for student and stakeholder grievance submission, tracking, and resolution services.",
    timer: 4,
  },
  {
    id: "alumni-portal",
    label: "ALUMNI_NETWORK_SANJH_2026",
    title: "SBSSU Alumni Network & Sanjh 2026",
    description:
      "Launch alumni.sbssu.ac.in, reconnect alumni of SBSCET, SBSSTC, and SBSSU, and enable Sanjh 2026 registration, cultural events, and alumni engagement.",
    timer: 6,
  },
  {
    id: "full-rollout",
    label: "GLOBAL_PUBLIC_ACCESS_ALL",
    title: "Full Public Rollout & Student Services",
    description:
      "Enable public DNS propagation, CDN edge caching, and live student & faculty digital services nationwide.",
    timer: 5,
  },
  {
    id: "final-dns-launch",
    label: "FINAL_DNS_PROPAGATION_LAUNCH",
    title: "Final DNS Propagation & Global Launch",
    description:
      "Establish public DNS routing for all university services, synchronize domain records, verify SSL connectivity, and bring all portals online for public access.",
    timer: 25,
  },
];

type StepStatus = "idle" | "launching" | "completed";

export default function LaunchPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLockAlert, setShowLockAlert] = useState(false);

  const [statuses, setStatuses] = useState<Record<string, StepStatus>>(() =>
    Object.fromEntries(LAUNCH_STEPS.map((s) => [s.id, "idle"])),
  );
  const [remainingSeconds, setRemainingSeconds] = useState<
    Record<string, number>
  >(() => Object.fromEntries(LAUNCH_STEPS.map((s) => [s.id, s.timer])));

  const completedCount = LAUNCH_STEPS.filter(
    (s) => statuses[s.id] === "completed",
  ).length;
  const isAllLaunched =
    LAUNCH_STEPS.length > 0 && completedCount === LAUNCH_STEPS.length;

  useEffect(() => {
    if (isAllLaunched) {
      document.getElementById("gate")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isAllLaunched]);
  // Countdown tick effect for any currently launching step
  useEffect(() => {
    const activeStep = LAUNCH_STEPS.find(
      (step) => statuses[step.id] === "launching",
    );
    if (!activeStep) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const current = prev[activeStep.id] ?? 0;
        if (current <= 1) {
          clearInterval(interval);
          setStatuses((prevStatus) => ({
            ...prevStatus,
            [activeStep.id]: "completed",
          }));
          return { ...prev, [activeStep.id]: 0 };
        }
        return { ...prev, [activeStep.id]: current - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [statuses]);

  const handleLaunch = (step: LaunchStep) => {
    if (!isUnlocked) {
      setShowLockAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (statuses[step.id] !== "idle") return;

    // Console log hook — replace with fetch() API call later
    console.log("launching", step.label);

    setRemainingSeconds((prev) => ({
      ...prev,
      [step.id]: step.timer,
    }));
    setStatuses((prev) => ({
      ...prev,
      [step.id]: "launching",
    }));
  };

  const handleResetDemo = () => {
    setStatuses(Object.fromEntries(LAUNCH_STEPS.map((s) => [s.id, "idle"])));
    setRemainingSeconds(
      Object.fromEntries(LAUNCH_STEPS.map((s) => [s.id, s.timer])),
    );
  };

  const getStepIcon = (index: number) => {
    const icons = [Server, ShieldCheck, Globe, Sparkles];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary/20 selection:text-primary">
      {/* Top ceremonial accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-dark to-secondary" />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* University Header */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              Official Digital Infrastructure Inauguration
            </div>

            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-md sm:h-28 sm:w-28">
              <img
                src="/sbssu-logo.png"
                alt="Shaheed Bhagat Singh State University Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Shaheed Bhagat Singh State University
            </h1>
            <p className="mt-2 text-base font-semibold text-slate-600 sm:text-xl">
              Ferozepur, Punjab (Est. 1995)
            </p>

            {/* Overall Progress Bar */}
            <div className="mt-7 w-full max-w-xl">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>DEPLOYMENT SEQUENCE PROGRESS</span>
                <span className="font-mono text-slate-900">
                  {completedCount} / {LAUNCH_STEPS.length} SERVICES LIVE
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{
                    width: `${(completedCount / LAUNCH_STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Authorization Gate */}
        <section id="gate" className="mt-6">
          <LaunchLock
            isUnlocked={isUnlocked}
            onUnlock={() => setIsUnlocked(true)}
            showPromptAlert={showLockAlert}
            onDismissAlert={() => setShowLockAlert(false)}
          />
        </section>

        {/* Final Celebration Banner */}
        {isAllLaunched && (
          <section className="mt-6 overflow-hidden rounded-3xl border-2 border-secondary bg-gradient-to-br from-secondary/10 via-white to-primary/10 p-7 shadow-lg sm:p-9">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white shadow-md shadow-secondary/30">
                <Sparkles className="h-8 w-8" />
              </div>
              <span className="rounded-full bg-secondary px-3.5 py-1 text-xs font-bold tracking-widest text-white uppercase">
                Inauguration Complete
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Official University Digital Ecosystem is Now Live!
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                All core servers, authentication gateways, and the official web
                portal of Shaheed Bhagat Singh State University, Ferozepur have
                been successfully inaugurated and are publicly accessible.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md shadow-secondary/25 transition hover:bg-secondary/90"
                >
                  Open sbssu.ac.in
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Console
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Sequential Launch Steps */}
        <section className="mt-6 space-y-4">
          {LAUNCH_STEPS.map((step, index) => {
            const status = statuses[step.id];
            const secondsLeft = remainingSeconds[step.id];
            const isPreviousCompleted =
              index === 0 ||
              statuses[LAUNCH_STEPS[index - 1].id] === "completed";

            const isSequentialLocked = isUnlocked && !isPreviousCompleted;
            const progressPercent =
              status === "completed"
                ? 100
                : status === "launching"
                  ? Math.round(((step.timer - secondsLeft) / step.timer) * 100)
                  : 0;

            return (
              <div
                key={step.id}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 transition-all sm:p-6 ${
                  status === "launching"
                    ? "border-primary ring-4 ring-primary/15 shadow-md"
                    : status === "completed"
                      ? "border-secondary/40 bg-secondary/[0.02] shadow-sm"
                      : isSequentialLocked
                        ? "border-slate-200/80 bg-slate-50/70 opacity-75"
                        : "border-slate-200 shadow-sm"
                }`}
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  {/* Left: Step Badge + Details */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold transition-colors ${
                        status === "completed"
                          ? "bg-secondary text-white"
                          : status === "launching"
                            ? "bg-primary text-white animate-pulse"
                            : isSequentialLocked
                              ? "bg-slate-200 text-slate-500"
                              : "bg-primary/10 text-primary"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : status === "launching" ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        getStepIcon(index)
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-600">
                          STEP 0{index + 1}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {step.label}
                        </span>
                        {status === "completed" && (
                          <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-bold text-secondary">
                            LIVE & OPERATIONAL
                          </span>
                        )}
                        {status === "launching" && (
                          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
                            INITIALIZING...
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1.5 text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Timer & Action Button */}
                  <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 pt-4 md:justify-end md:border-t-0 md:pt-0">
                    {/* Countdown Readout */}

                    {/* Dedicated Launch Button */}
                    {status === "completed" ? (
                      <div className="inline-flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-3 text-sm font-bold text-secondary">
                        <CheckCircle2 className="h-4 w-4" />
                        Launched
                      </div>
                    ) : status === "launching" ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-wait items-center gap-2 rounded-xl bg-primary/85 px-5 py-3 text-sm font-bold text-white shadow-sm"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Launching ({secondsLeft}s)
                      </button>
                    ) : isSequentialLocked ? (
                      <button
                        type="button"
                        disabled
                        title="Complete the previous step first"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
                      >
                        <Lock className="h-4 w-4" />
                        Awaiting Step 0{index}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleLaunch(step)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition hover:bg-primary/90 active:scale-[0.98]"
                      >
                        <Rocket className="h-4 w-4" />
                        Launch
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Step Progress Bar during countdown */}
                {status === "launching" && (
                  <div className="mt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-400">
          Department of Computer Science & Engineering • Shaheed Bhagat Singh
          State University, Ferozepur
        </footer>
      </main>
    </div>
  );
}
