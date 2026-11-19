import React from "react";
import {
  getParsedLegacyOptions,
  resolveLegacyOptionByIdAndMode,
} from "@/constants/legacy-select-options";
import {
  getDeletedLegacyRecords,
  getLegacyRecordsBySelection,
} from "@/lib/actions/legacy-website";
import { LegacyWebsiteManager } from "./LegacyWebsiteManager";

type PageProps = {
  searchParams: Promise<{
    Id?: string;
    id?: string;
    mode?: string;
    tab?: string;
  }>;
};

export default async function LegacyWebsiteManagePage({
  searchParams,
}: PageProps) {
  const resolved = await searchParams;
  const rawId = resolved.Id ?? resolved.id;
  const parsedId =
    rawId && /^\d+$/.test(rawId.trim()) ? Number(rawId.trim()) : null;

  const fallback = getParsedLegacyOptions()[0];
  const activeOption =
    resolveLegacyOptionByIdAndMode(parsedId, resolved.mode) ?? fallback;

  const [{ recordById, records }, deletedRecords] = await Promise.all([
    activeOption
      ? getLegacyRecordsBySelection({
          id: activeOption.id,
          mode: activeOption.mode,
        })
      : Promise.resolve({ recordById: null, records: [] }),
    getDeletedLegacyRecords(),
  ]);

  return (
    <LegacyWebsiteManager
      initialId={activeOption?.id ?? null}
      initialMode={activeOption?.mode ?? null}
      initialTab={resolved.tab === "add" ? "add" : "view"}
      recordById={recordById}
      records={records}
      deletedRecords={deletedRecords}
    />
  );
}
