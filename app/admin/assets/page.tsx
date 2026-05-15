"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { imagePrompts, videoPrompts } from "@/lib/prompts";

const imagePromptEntries = Object.entries(imagePrompts);
const videoPromptEntries = Object.entries(videoPrompts);
const recommendedFiles = ["hero-solar.jpg", "hero-video.mp4", "battery-storage.jpg", "grid-connection.jpg"];

export default function AssetAdminPage() {
  const [selectedImagePrompt, setSelectedImagePrompt] = useState(imagePromptEntries[0][0]);
  const [selectedVideoPrompt, setSelectedVideoPrompt] = useState(videoPromptEntries[0][0]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [requestId, setRequestId] = useState("");
  const [status, setStatus] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const imagePrompt = useMemo(() => imagePrompts[selectedImagePrompt as keyof typeof imagePrompts], [selectedImagePrompt]);
  const videoPrompt = useMemo(() => videoPrompts[selectedVideoPrompt as keyof typeof videoPrompts], [selectedVideoPrompt]);
  const imageDataUri = imageBase64 ? `data:image/png;base64,${imageBase64}` : "";

  async function generateImage() {
    setIsGeneratingImage(true);
    setStatus("Bildgenerierung läuft...");
    setImageBase64("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = (await response.json()) as { imageBase64?: string; error?: string };

      if (!response.ok || !data.imageBase64) {
        throw new Error(data.error ?? "Bildgenerierung fehlgeschlagen.");
      }

      setImageBase64(data.imageBase64);
      setStatus("Bild herunterladen und in public/media speichern oder in Cloud Storage hochladen.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unbekannter Fehler.");
    } finally {
      setIsGeneratingImage(false);
    }
  }

  async function generateVideo() {
    setIsGeneratingVideo(true);
    setStatus("Videogenerierung läuft...");
    setVideoUrl("");
    setRequestId("");

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, prompt: videoPrompt }),
      });
      const data = (await response.json()) as { video?: string; requestId?: string; error?: string };

      if (!response.ok || !data.video) {
        throw new Error(data.error ?? "Videogenerierung fehlgeschlagen.");
      }

      setVideoUrl(data.video);
      setRequestId(data.requestId ?? "");
      setStatus("Video wurde generiert. Datei herunterladen und als hero-video.mp4 in public/media speichern.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unbekannter Fehler.");
    } finally {
      setIsGeneratingVideo(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--primary-dark)] px-6 py-12 text-[#f8f5ef] lg:px-8">
      <div className="dark-grid fixed inset-0 opacity-35" />
      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-soft)]">Interne Testseite</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Asset-Pipeline testen</h1>
          <p className="mt-4 max-w-3xl text-[#cbd8d0]">
            Diese Seite nutzt nur interne API-Routen. API-Keys werden nicht im Client verwendet. Generierte Bilder können heruntergeladen und in <code>public/media</code> gespeichert werden.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#07130f]/60 p-4 text-sm leading-6 text-[#d6e3dc]">
              <strong className="text-[var(--accent-soft)]">Empfohlene Dateinamen:</strong>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommendedFiles.map((file) => (
                  <span key={file} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-[#d6e3dc]">{file}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/10 p-4 text-sm leading-6 text-[#f7e7bd]">
              fal.ai Image-to-Video benötigt eine öffentlich erreichbare Bild-URL. Ein lokaler Dateipfad reicht dafür nicht aus; nutze Cloud Storage oder eine öffentlich abrufbare Datei.
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Bildgenerierung</h2>
            <label className="mt-6 block text-sm text-[#cbd8d0]" htmlFor="imagePrompt">
              Bild-Prompt
            </label>
            <select
              id="imagePrompt"
              value={selectedImagePrompt}
              onChange={(event) => setSelectedImagePrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07130f] p-3 text-[#f8f5ef]"
            >
              {imagePromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-[#07130f]/70 p-4 text-sm leading-6 text-[#cbd8d0]">{imagePrompt}</p>
            <button
              type="button"
              onClick={generateImage}
              disabled={isGeneratingImage}
              className="mt-5 rounded-full bg-[var(--accent-soft)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingImage ? "Generiert..." : "Bild generieren"}
            </button>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Videogenerierung</h2>
            <label className="mt-6 block text-sm text-[#cbd8d0]" htmlFor="videoPrompt">
              Video-Prompt
            </label>
            <select
              id="videoPrompt"
              value={selectedVideoPrompt}
              onChange={(event) => setSelectedVideoPrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07130f] p-3 text-[#f8f5ef]"
            >
              {videoPromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-[#07130f]/70 p-4 text-sm leading-6 text-[#cbd8d0]">{videoPrompt}</p>
            <label className="mt-5 block text-sm text-[#cbd8d0]" htmlFor="imageUrl">
              Öffentlich erreichbare imageUrl
            </label>
            <input
              id="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07130f] p-3 text-[#f8f5ef]"
            />
            <button
              type="button"
              onClick={generateVideo}
              disabled={isGeneratingVideo}
              className="mt-5 rounded-full bg-[#f8f5ef] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingVideo ? "Generiert..." : "Video generieren"}
            </button>
          </section>
        </div>

        {status && <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm text-[#d6e3dc]">{status}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {imageDataUri && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-4">
              <Image
                className="rounded-[1.5rem] border border-white/10"
                src={imageDataUri}
                alt="Generiertes Energie-Infrastruktur Asset"
                width={1536}
                height={1024}
                unoptimized
              />
              <a
                href={imageDataUri}
                download="hero-solar.png"
                className="mt-4 inline-flex rounded-full bg-[var(--accent-soft)] px-5 py-3 text-sm font-semibold text-[var(--primary-dark)]"
              >
                Bild herunterladen
              </a>
              <p className="mt-3 text-sm text-[#cbd8d0]">Bild herunterladen und in public/media speichern oder in Cloud Storage hochladen.</p>
            </div>
          )}
          {videoUrl && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-4">
              <video src={videoUrl} controls className="w-full rounded-2xl" />
              <a href={videoUrl} download="hero-video.mp4" className="mt-4 inline-flex rounded-full bg-[#f8f5ef] px-5 py-3 text-sm font-semibold text-[var(--primary-dark)]">
                Video herunterladen
              </a>
              {requestId && <p className="mt-3 text-xs text-[#aebdb5]">Request ID: {requestId}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
