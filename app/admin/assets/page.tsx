"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { imagePrompts, videoPrompts } from "@/lib/prompts";

const imagePromptEntries = Object.entries(imagePrompts);
const videoPromptEntries = Object.entries(videoPrompts);

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
      setStatus("Bild wurde generiert. Für Video-Tests muss es öffentlich erreichbar gehostet werden.");
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
      setStatus("Video wurde generiert.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unbekannter Fehler.");
    } finally {
      setIsGeneratingVideo(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-12 text-stone-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-100">Interne Testseite</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Asset-Pipeline testen</h1>
          <p className="mt-4 max-w-3xl text-stone-300">
            Diese Seite nutzt nur interne API-Routen. API-Keys werden nicht im Client verwendet. Die fal.ai Videogenerierung benötigt eine öffentlich erreichbare imageUrl.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Bildgenerierung</h2>
            <label className="mt-6 block text-sm text-stone-300" htmlFor="imagePrompt">
              Bild-Prompt
            </label>
            <select
              id="imagePrompt"
              value={selectedImagePrompt}
              onChange={(event) => setSelectedImagePrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 p-3 text-stone-100"
            >
              {imagePromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-black/40 p-4 text-sm leading-6 text-stone-300">{imagePrompt}</p>
            <button
              type="button"
              onClick={generateImage}
              disabled={isGeneratingImage}
              className="mt-5 rounded-full bg-stone-100 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingImage ? "Generiert..." : "Bild generieren"}
            </button>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Videogenerierung</h2>
            <label className="mt-6 block text-sm text-stone-300" htmlFor="videoPrompt">
              Video-Prompt
            </label>
            <select
              id="videoPrompt"
              value={selectedVideoPrompt}
              onChange={(event) => setSelectedVideoPrompt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 p-3 text-stone-100"
            >
              {videoPromptEntries.map(([key]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p className="mt-4 min-h-32 rounded-2xl bg-black/40 p-4 text-sm leading-6 text-stone-300">{videoPrompt}</p>
            <label className="mt-5 block text-sm text-stone-300" htmlFor="imageUrl">
              Öffentlich erreichbare imageUrl
            </label>
            <input
              id="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 p-3 text-stone-100"
            />
            <button
              type="button"
              onClick={generateVideo}
              disabled={isGeneratingVideo}
              className="mt-5 rounded-full bg-emerald-100 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingVideo ? "Generiert..." : "Video generieren"}
            </button>
          </section>
        </div>

        {status && <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-stone-300">{status}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {imageBase64 && (
            <Image
              className="rounded-[2rem] border border-white/10"
              src={`data:image/png;base64,${imageBase64}`}
              alt="Generiertes Energie-Infrastruktur Asset"
              width={1536}
              height={1024}
              unoptimized
            />
          )}
          {videoUrl && (
            <div className="rounded-[2rem] border border-white/10 p-4">
              <video src={videoUrl} controls className="w-full rounded-2xl" />
              {requestId && <p className="mt-3 text-xs text-stone-400">Request ID: {requestId}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
