export interface DepartmentNavLink {
  id: string;
  label: string;
}

interface DepartmentNavbarProps {
  deptCode?: string;
  deptName?: string;
  items: DepartmentNavLink[];
}

export function DepartmentNavbar({ deptName, items }: DepartmentNavbarProps) {
  const nameClean = deptName?.trim() || "Department";

  return (
    <nav
      aria-label={`${nameClean} section navigation`}
      className="sticky top-3 z-30 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-xs backdrop-blur-md sm:px-4 sm:py-3 dark:border-slate-800 dark:bg-slate-900/95"
    >
      {items.length > 0 ? (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-xl border border-transparent bg-slate-100/80 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-700 transition hover:border-[var(--color-primary,#f97316)]/35 hover:bg-[var(--color-primary,#f97316)]/10 hover:text-orange-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-[var(--color-primary-dark,#fb923c)]/35 dark:hover:bg-[var(--color-primary-dark,#fb923c)]/15 dark:hover:text-[var(--color-primary-dark,#fb923c)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : (
        <p className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          {nameClean}
        </p>
      )}
    </nav>
  );
}
