"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { imagePrompts, videoPrompts } from "@/lib/prompts";

const imagePromptEntries = Object.entries(imagePrompts);
const videoPromptEntries = Object.entries(videoPrompts);
const filenames = ["hero-solar.jpg", "hero-video.mp4", "battery-storage.jpg", "grid-connection.jpg"];

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
      setStatus('Bild herunterladen und in public/media speichern oder in Cloud Storage hochladen.');
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
    <main className="min-h-screen bg-[#07130F] px-6 py-12 text-[#F8F5EF] lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-[#D6A84F]/30 bg-[#D6A84F]/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#D6A84F]">Interne Asset-Pipeline</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Premium-Medien für Scrollytelling vorbereiten</h1>
          <p className="mt-4 max-w-3xl text-[#F8F5EF]/70">
            Generierte Bilder können heruntergeladen und in <code className="rounded bg-black/20 px-1">public/media</code> gespeichert werden. API-Keys werden nicht im Client angezeigt. fal.ai Image-to-Video benötigt eine öffentlich erreichbare Bild-URL; ein lokaler Dateipfad reicht nicht aus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {filenames.map((name) => (
              <span key={name} className="rounded-full border border-[#F8F5EF]/10 bg-[#07130F]/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F8F5EF]/75">
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Bildgenerierung</h2>
            <label className="mt-6 block text-sm text-[#F8F5EF]/70" htmlFor="imagePrompt">
              Bild-Prompt
            </label>
            <select
              id="imagePrompt"
              value={selectedImagePrompt}
              onChange={(event) => setSelectedImagePrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#F8F5EF]/10 bg-black/35 p-3 text-[#F8F5EF]"
            >
              {imagePromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-black/25 p-4 text-sm leading-6 text-[#F8F5EF]/70">{imagePrompt}</p>
            <button
              type="button"
              onClick={generateImage}
              disabled={isGeneratingImage}
              className="mt-5 rounded-full bg-[#F8F5EF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#07130F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingImage ? "Generiert..." : "Bild generieren"}
            </button>
          </section>

          <section className="rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Videogenerierung</h2>
            <label className="mt-6 block text-sm text-[#F8F5EF]/70" htmlFor="videoPrompt">
              Video-Prompt
            </label>
            <select
              id="videoPrompt"
              value={selectedVideoPrompt}
              onChange={(event) => setSelectedVideoPrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#F8F5EF]/10 bg-black/35 p-3 text-[#F8F5EF]"
            >
              {videoPromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-black/25 p-4 text-sm leading-6 text-[#F8F5EF]/70">{videoPrompt}</p>
            <label className="mt-5 block text-sm text-[#F8F5EF]/70" htmlFor="imageUrl">
              Öffentlich erreichbare imageUrl
            </label>
            <input
              id="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-[#F8F5EF]/10 bg-black/35 p-3 text-[#F8F5EF]"
            />
            <button
              type="button"
              onClick={generateVideo}
              disabled={isGeneratingVideo}
              className="mt-5 rounded-full bg-[#D6A84F] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#07130F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingVideo ? "Generiert..." : "Video generieren"}
            </button>
          </section>
        </div>

        {status && <p className="mt-6 rounded-2xl border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.04] p-4 text-sm text-[#F8F5EF]/75">{status}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {imageBase64 && (
            <div className="rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.04] p-4">
              <Image
                className="rounded-[1.5rem]"
                src={`data:image/png;base64,${imageBase64}`}
                alt="Generiertes Energie-Infrastruktur Asset"
                width={1536}
                height={1024}
                unoptimized
              />
              <p className="mt-4 text-sm text-[#F8F5EF]/70">Bild herunterladen und in public/media speichern oder in Cloud Storage hochladen.</p>
            </div>
          )}
          {videoUrl && (
            <div className="rounded-[2rem] border border-[#F8F5EF]/10 bg-[#F8F5EF]/[0.04] p-4">
              <video src={videoUrl} controls className="w-full rounded-2xl" />
              {requestId && <p className="mt-3 text-xs text-[#F8F5EF]/55">Request ID: {requestId}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
