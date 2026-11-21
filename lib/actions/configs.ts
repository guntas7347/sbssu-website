"use server";

import { getCurrentUser } from "./auth";

export interface RightOption {
  code: string;
  label: string;
  scopes?: string[];
}

export interface ScopeConfig {
  key: string;
  label: string;
  rights: string[];
  folder?: string;
}

const SCOPE_LABELS: Record<string, { label: string; folder?: string }> = {
  university: { label: "University Wide" },
  "all-departments": { label: "All Departments" },
  academics: { label: "Academics" },
  examination: { label: "COE" },
  department: { label: "Department" },
};

const RIGHTS_CONFIG: RightOption[] = [
  {
    code: "admin",
    label: "Full Rights",
    scopes: [
      "university",
      "all-departments",
      "academics",
      "examination",
      "department",
    ],
  },
  {
    code: "hod",
    label: "Head of Department",
    scopes: ["department"],
  },
  {
    code: "academics",
    label: "Academics",
    scopes: ["academics"],
  },
  {
    code: "examination",
    label: "Controller of Examinations",
    scopes: ["examination"],
  },
  {
    code: "allow_login",
    label: "Portal Login",
    scopes: [],
  },
];

function buildScopesFromRights(rights: RightOption[]): ScopeConfig[] {
  const scopeMap = new Map<string, ScopeConfig>();

  for (const [key, meta] of Object.entries(SCOPE_LABELS)) {
    scopeMap.set(key, {
      key,
      label: meta.label,
      folder: meta.folder,
      rights: [],
    });
  }

  for (const right of rights) {
    for (const scopeKey of right.scopes ?? []) {
      const existing = scopeMap.get(scopeKey) ?? {
        key: scopeKey,
        label: scopeKey,
        rights: [],
      };
      if (!existing.rights.includes(right.code)) {
        existing.rights.push(right.code);
      }
      scopeMap.set(scopeKey, existing);
    }
  }

  return Array.from(scopeMap.values());
}

export async function getAllRights(): Promise<RightOption[]> {
  return RIGHTS_CONFIG.map(({ code, label }) => ({ code, label }));
}

export async function getScopesConfig(): Promise<ScopeConfig[]> {
  return buildScopesFromRights(RIGHTS_CONFIG);
}

export async function getRightsConfig(): Promise<string[]> {
  const scopes = await getScopesConfig();
  return Array.from(new Set(scopes.flatMap((s) => s.rights)));
}

export async function getAllowedScopesForRights(
  rights: string[],
): Promise<ScopeConfig[]> {
  if (!Array.isArray(rights) || rights.length === 0) return [];
  const scopes = await getScopesConfig();
  return scopes.filter((scope) =>
    scope.rights.some((requiredRight) => rights.includes(requiredRight)),
  );
}

export async function getUserAllowedScopes(): Promise<ScopeConfig[]> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];
  return getAllowedScopesForRights(rights);
}
