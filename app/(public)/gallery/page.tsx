"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderKanban,
  Globe,
  Images,
  Loader2,
  Search,
  X,
} from "lucide-react";
import {
  getPublicGallery,
  type PublicGalleryItem,
} from "@/lib/actions/public/public-gallery";

interface AlbumGroup {
  key: string;
  album: string;
  category: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  coverPath: string;
  coverTitle: string | null;
  coverDesc: string | null;
  items: PublicGalleryItem[];
}

export default function PublicGalleryPage() {
  const [allItems, setAllItems] = useState<PublicGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [scopeFilter, setScopeFilter] = useState<
    "all" | "university" | "department"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [activeAlbumKey, setActiveAlbumKey] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPublicGallery({ page: 1, pageSize: 100 });
      setAllItems(res.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGallery();
  }, [loadGallery]);

  const albums = useMemo<AlbumGroup[]>(() => {
    const map = new Map<string, AlbumGroup>();

    for (const item of allItems) {
      const key = `${item.departmentId ?? "university"}::${item.album}`;
      const existing = map.get(key);
      if (existing) {
        existing.items.push(item);
      } else {
        map.set(key, {
          key,
          album: item.album,
          category: item.category,
          departmentId: item.departmentId,
          departmentCode: item.departmentCode,
          departmentName: item.departmentName,
          coverPath: item.path,
          coverTitle: item.title,
          coverDesc: item.desc,
          items: [item],
        });
      }
    }

    return Array.from(map.values());
  }, [allItems]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const album of albums) {
      if (album.category) set.add(album.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [albums]);

  const filteredAlbums = useMemo(() => {
    const q = search.trim().toLowerCase();

    return albums.filter((album) => {
      if (scopeFilter === "university" && album.departmentId !== null) {
        return false;
      }
      if (scopeFilter === "department" && album.departmentId === null) {
        return false;
      }
      if (
        categoryFilter !== "all" &&
        album.category.toLowerCase() !== categoryFilter.toLowerCase()
      ) {
        return false;
      }

      if (!q) return true;

      return (
        album.album.toLowerCase().includes(q) ||
        album.category.toLowerCase().includes(q) ||
        (album.departmentCode?.toLowerCase().includes(q) ?? false) ||
        (album.departmentName?.toLowerCase().includes(q) ?? false) ||
        album.items.some(
          (i) =>
            (i.title?.toLowerCase().includes(q) ?? false) ||
            (i.desc?.toLowerCase().includes(q) ?? false),
        )
      );
    });
  }, [albums, scopeFilter, categoryFilter, search]);

  const activeAlbum = useMemo(
    () => albums.find((a) => a.key === activeAlbumKey) ?? null,
    [albums, activeAlbumKey],
  );

  const albumPhotos = activeAlbum?.items ?? [];

  useEffect(() => {
    if (lightboxIndex === null || albumPhotos.length === 0) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % albumPhotos.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + albumPhotos.length) % albumPhotos.length,
        );
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, albumPhotos.length]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/15 dark:text-orange-400">
            <Images className="h-3.5 w-3.5" />
            <span>SBSSU Gallery</span>
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {activeAlbum ? activeAlbum.album : "Gallery Albums"}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
            {activeAlbum
              ? `${albumPhotos.length} ${albumPhotos.length === 1 ? "image" : "images"} in "${activeAlbum.album}".`
              : "Browse photo albums across SBSSU campus and departments."}
          </p>
        </div>

        {activeAlbum && (
          <button
            type="button"
            onClick={() => {
              setActiveAlbumKey(null);
              setLightboxIndex(null);
            }}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-xs transition hover:border-orange-500 hover:text-orange-600 sm:self-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Albums</span>
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-14 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
          <span>Loading gallery...</span>
        </div>
      ) : !activeAlbum ? (
        <>
          {/* Filters */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: "all", label: "All", icon: FolderKanban },
                    { id: "university", label: "University", icon: Globe },
                    { id: "department", label: "Departments", icon: Building2 },
                  ] as const
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScopeFilter(id)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                      scopeFilter === id
                        ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search album, title, or dept..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    categoryFilter === "all"
                      ? "bg-green-700 text-white dark:bg-green-500 dark:text-slate-950"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-semibold transition ${
                      categoryFilter === cat
                        ? "bg-green-700 text-white dark:bg-green-500 dark:text-slate-950"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Album Cards */}
          {filteredAlbums.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-14 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No albums found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlbums.map((album) => (
                <button
                  key={album.key}
                  type="button"
                  onClick={() => setActiveAlbumKey(album.key)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-xs transition hover:-translate-y-0.5 hover:border-orange-500/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/60"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={album.coverPath}
                      alt={album.coverTitle || album.album}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-3 bottom-3 rounded-full bg-slate-950/75 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-xs">
                      {album.items.length}{" "}
                      {album.items.length === 1 ? "image" : "images"}
                    </span>
                  </div>

                  <div className="space-y-2.5 p-5">
                    <div className="flex items-center justify-between gap-2">
                      {album.departmentId ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                          <Building2 className="h-3 w-3" />
                          <span>
                            {album.departmentCode?.toUpperCase() ||
                              "Department"}
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                          <Globe className="h-3 w-3" />
                          <span>University</span>
                        </span>
                      )}
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {album.category}
                      </span>
                    </div>

                    <h2 className="font-mono text-lg font-bold text-slate-900 transition group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {album.album}
                    </h2>

                    {(album.coverTitle || album.coverDesc) && (
                      <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                        {album.coverTitle || album.coverDesc}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Images inside selected album */
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {albumPhotos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-xs transition hover:border-orange-500/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/60"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={photo.path}
                  alt={photo.title || activeAlbum.album}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              {(photo.title || photo.desc) && (
                <div className="p-3.5">
                  {photo.title && (
                    <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {photo.title}
                    </div>
                  )}
                  {photo.desc && (
                    <div className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {photo.desc}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && albumPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5 text-white">
              <div className="min-w-0">
                <div className="truncate text-sm font-bold">
                  {albumPhotos[lightboxIndex].title ||
                    activeAlbum?.album ||
                    "Gallery Photo"}
                </div>
                {albumPhotos[lightboxIndex].desc && (
                  <div className="truncate text-xs text-slate-400">
                    {albumPhotos[lightboxIndex].desc}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={albumPhotos[lightboxIndex].path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  <span>Original</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="cursor-pointer rounded-lg bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950 p-4">
              <img
                src={albumPhotos[lightboxIndex].path}
                alt={albumPhotos[lightboxIndex].title || "Photo"}
                className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain"
              />

              {albumPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (prev) =>
                          ((prev ?? 0) - 1 + albumPhotos.length) %
                          albumPhotos.length,
                      )
                    }
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-slate-900/80 p-2.5 text-white hover:bg-slate-800"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (prev) => ((prev ?? 0) + 1) % albumPhotos.length,
                      )
                    }
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-slate-900/80 p-2.5 text-white hover:bg-slate-800"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
