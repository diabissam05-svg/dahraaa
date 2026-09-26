import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, ArrowRight, Youtube, Play } from "lucide-react";
import { useCms } from "../lib/store";
import { loc } from "../lib/i18n";
import { parseVideoSource } from "../lib/video";
import Reveal from "./Reveal";

/**
 * Homepage promotional video banner — fully driven by the admin
 * "SECTION VIDÉO" CMS tab (visibility, source, poster, texts, CTA).
 */
export default function VideoSectionBanner() {
  const { state, lang } = useCms();
  const section = state.videoSection;
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!section?.enabled || !section.videoUrl) return null;
  const source = parseVideoSource(section.videoUrl, { autoplay: true, muted, loop: true });
  if (!source) return null;

  // Build the "watch on original platform" link
  const watchOnUrl =
    source.kind === "youtube"
      ? section.videoUrl
      : source.kind === "vimeo"
      ? section.videoUrl
      : "";

  const watchOnLabel =
    source.kind === "vimeo" ? "Watch on Vimeo" : "Watch on YouTube";

  return (
    <section className="bg-onyx py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            {/* 16:9 on mobile, wider on desktop */}
            <div className="relative aspect-video w-full bg-black sm:aspect-[16/9] md:aspect-[21/9]">
              {source.kind === "file" ? (
                <video
                  className="h-full w-full object-cover"
                  src={source.src}
                  poster={section.poster || undefined}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : playing ? (
                <iframe
                  ref={iframeRef}
                  className="h-full w-full"
                  src={source.src}
                  title={loc(section.title, lang)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder={0}
                  style={{ border: 0 }}
                />
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  className="group relative h-full w-full"
                  aria-label="Play video"
                >
                  {section.poster && (
                    <img
                      src={section.poster}
                      alt={loc(section.title, lang)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 shadow-2xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                      <Play size={30} className="translate-x-0.5 fill-black text-black" />
                    </span>
                  </div>
                </button>
              )}

              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10">
                {section.badge.fr && (
                  <span className="mb-2 inline-flex w-fit rounded border border-brand/50 bg-brand/10 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand backdrop-blur-sm sm:mb-3 sm:px-3 sm:text-[11px]">
                    {loc(section.badge, lang)}
                  </span>
                )}
                <h2 className="font-display max-w-3xl text-2xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-5xl">
                  {loc(section.title, lang)}
                </h2>
                <p className="mt-2 line-clamp-2 max-w-2xl text-xs leading-relaxed text-slate-200 sm:mt-3 sm:line-clamp-3 sm:text-sm md:text-base">
                  {loc(section.subtitle, lang)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                  {section.ctaLabel.fr && (
                    <Link
                      to={section.ctaLink || "/shop"}
                      className="group flex w-fit items-center gap-2 rounded bg-brand px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-brand-strong hover:shadow-xl hover:shadow-brand/40 sm:px-6 sm:py-3 sm:text-sm"
                    >
                      {loc(section.ctaLabel, lang)}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                    </Link>
                  )}
                  {watchOnUrl && (
                    <a
                      href={watchOnUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-fit items-center gap-2 rounded border border-red-600/60 bg-red-600/15 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-sm transition-all hover:bg-red-600 hover:text-white sm:px-5 sm:py-3 sm:text-sm"
                    >
                      {source.kind === "vimeo" ? <Play size={15} /> : <Youtube size={16} />}
                      {watchOnLabel}
                    </a>
                  )}
                </div>
              </div>

              {/* Mute toggle — works for direct video files */}
              {source.kind === "file" && (
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="absolute end-3 top-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:border-brand hover:text-brand sm:end-4 sm:top-4 sm:gap-2 sm:px-3.5"
                >
                  {muted ? <VolumeX size={15} className="text-brand" /> : <Volume2 size={15} className="text-brand" />}
                  <span className="hidden sm:inline">{muted ? "Activer le son" : "Couper le son"}</span>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
