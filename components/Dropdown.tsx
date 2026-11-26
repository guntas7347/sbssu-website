"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Star } from "lucide-react";
import { NavItem } from "@/constants/nav-items";

function NewStarBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full font-bold uppercase tracking-wide shrink-0 bg-amber-400/20 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300 border border-amber-400/40 shadow-2xs ${
        compact ? "px-1.5 py-0.2 text-[9px]" : "px-1.5 py-0.5 text-[10px]"
      }`}
    >
      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 dark:fill-amber-300 dark:text-amber-300" />
      <span>New</span>
    </span>
  );
}

function DesktopDropdownItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isExternal = item.href?.startsWith("http");

  const content = (
    <>
      <span className="inline-flex items-center gap-1.5 min-w-0">
        <span className="truncate">{item.label}</span>
        {item.new && <NewStarBadge compact />}
      </span>
      {hasChildren && (
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
      )}
    </>
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setSubOpen(true)}
      onMouseLeave={() => hasChildren && setSubOpen(false)}
    >
      {item.href ? (
        <Link
          href={item.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={onNavigate}
          className="flex items-center justify-between gap-2 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-dark/15 dark:hover:text-primary-dark transition-colors"
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setSubOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-dark/15 dark:hover:text-primary-dark transition-colors cursor-pointer"
        >
          {content}
        </button>
      )}

      {hasChildren && subOpen && (
        <div className="absolute top-0 left-full pl-1 z-50">
          <div className="w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2">
            {item.children!.map((grandChild) => (
              <DesktopDropdownItem
                key={`${item.label}-${grandChild.label}`}
                item={grandChild}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavNode({
  item,
  depth = 0,
  onNavigate,
}: {
  item: NavItem;
  depth?: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isExternal = item.href?.startsWith("http");

  return (
    <div
      className={
        depth === 0
          ? "border-b border-slate-100 dark:border-slate-800/40 pb-1"
          : ""
      }
    >
      {hasChildren ? (
        <div>
          <div className="flex items-center justify-between rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            {item.href ? (
              <Link
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={onNavigate}
                className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark inline-flex items-center gap-1.5"
              >
                <span>{item.label}</span>
                {item.new && <NewStarBadge compact />}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="flex-1 px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{item.label}</span>
                {item.new && <NewStarBadge compact />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={`Toggle ${item.label} submenu`}
              className="p-2 text-slate-500 hover:text-primary dark:hover:text-primary-dark cursor-pointer"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  expanded
                    ? "rotate-180 text-primary dark:text-primary-dark"
                    : ""
                }`}
              />
            </button>
          </div>

          {expanded && (
            <div className="ml-3 pl-2 border-l border-slate-200 dark:border-slate-800 py-1 space-y-1 bg-slate-50/50 dark:bg-slate-900/50 rounded-r-lg my-1">
              {item.children!.map((child) => (
                <MobileNavNode
                  key={`${item.label}-${child.label}`}
                  item={child}
                  depth={depth + 1}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.href || "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={onNavigate}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark rounded-lg"
        >
          <span>{item.label}</span>
          {item.new && <NewStarBadge compact />}
        </Link>
      )}
    </div>
  );
}

export function Tier2Navigation({ navItems }: { navItems: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <nav className="hidden lg:flex items-center justify-between py-1.5">
        {navItems.map((item) => {
          const hasChildren = Boolean(
            item.children && item.children.length > 0,
          );
          const isExternal = item.href?.startsWith("http");

          return (
            <div
              key={item.label}
              className="relative group py-1"
              onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
              onMouseLeave={() => hasChildren && setOpenDropdown(null)}
            >
              {hasChildren ? (
                item.href ? (
                  <Link
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="px-2 py-1 text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark transition-colors flex items-center gap-1 rounded"
                  >
                    <span>{item.label}</span>
                    {item.new && <NewStarBadge />}
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="px-2 py-1 text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark transition-colors flex items-center gap-1 rounded cursor-pointer"
                  >
                    <span>{item.label}</span>
                    {item.new && <NewStarBadge />}
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
                  </button>
                )
              ) : (
                <Link
                  href={item.href || "#"}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="px-2 py-1 text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark transition-colors rounded inline-flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  {item.new && <NewStarBadge />}
                </Link>
              )}

              {hasChildren && openDropdown === item.label && (
                <div className="absolute top-full left-0 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  {item.children!.map((child) => (
                    <DesktopDropdownItem
                      key={`${item.label}-${child.label}`}
                      item={child}
                      onNavigate={() => setOpenDropdown(null)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile Nav Toggle & Drawer Header */}
      <div className="lg:hidden flex items-center justify-between py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Navigation Menu
        </span>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span>{mobileMenuOpen ? "Close Menu" : "Browse All"}</span>
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 py-3 space-y-1.5 max-h-[70vh] overflow-y-auto">
          {navItems.map((item) => (
            <MobileNavNode
              key={item.label}
              item={item}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
