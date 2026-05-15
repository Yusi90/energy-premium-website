"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SequenceManifest = {
  id: string;
  kind: string;
  format: "svg" | "jpg" | "jpeg" | "png" | "webp" | string;
  frameCount: number;
  framePattern?: string;
  indexBase: number;
  pad: number;
  fps?: number;
  publicUrl: string;
  frameUrlTemplate: string;
  poster: string;
  size: {
    width: number;
    height: number;
    fit?: "cover" | "contain";
  };
};

type CanvasSequenceProps = {
  manifestUrl?: string;
  progress: number;
  className?: string;
  fallbackLabel?: string;
};

const DEFAULT_MANIFEST = "/generated/energy-transformation/manifest.json";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function padIndex(value: number, pad: number) {
  return String(value).padStart(pad, "0");
}

function buildFrameUrl(manifest: SequenceManifest, zeroBasedFrame: number) {
  const index = manifest.indexBase + zeroBasedFrame;
  const padded = padIndex(index, manifest.pad);
  return manifest.frameUrlTemplate.replace("{index}", padded);
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, fit: "cover" | "contain" = "cover") {
  const imageWidth = image.naturalWidth || width;
  const imageHeight = image.naturalHeight || height;
  const canvasRatio = width / height;
  const imageRatio = imageWidth / imageHeight;

  let drawWidth = width;
  let drawHeight = height;

  if (fit === "contain") {
    if (imageRatio > canvasRatio) {
      drawWidth = width;
      drawHeight = width / imageRatio;
    } else {
      drawHeight = height;
      drawWidth = height * imageRatio;
    }
  } else if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
  }

  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

export function CanvasSequence({
  manifestUrl = DEFAULT_MANIFEST,
  progress,
  className = "",
  fallbackLabel = "Cinematic Energieinfrastruktur-Sequenz",
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const posterRef = useRef<HTMLImageElement | null>(null);
  const requestedFrame = useRef<number>(-1);
  const [manifest, setManifest] = useState<SequenceManifest | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(manifestUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Manifest konnte nicht geladen werden: ${response.status}`);
        }
        return response.json() as Promise<SequenceManifest>;
      })
      .then((nextManifest) => {
        if (!cancelled) {
          setManifest(nextManifest);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  const effectiveProgress = isReducedMotion ? Math.round(clamp(progress) * 3) / 3 : clamp(progress);

  const frameIndex = manifest?.frameCount ? Math.round(effectiveProgress * (manifest.frameCount - 1)) : 0;

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) {
      return null;
    }

    const rect = wrapper.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width, height };
  }, []);

  const drawImage = useCallback(
    (image: HTMLImageElement) => {
      const currentManifest = manifest;
      const target = sizeCanvas();
      if (!target || !currentManifest) {
        return;
      }
      drawCover(target.ctx, image, target.width, target.height, currentManifest.size.fit ?? "cover");
    },
    [manifest, sizeCanvas],
  );

  const loadImage = useCallback((src: string) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    return image;
  }, []);

  useEffect(() => {
    if (!manifest) {
      return;
    }

    const poster = loadImage(manifest.poster);
    poster.onload = () => {
      posterRef.current = poster;
      if (requestedFrame.current < 0) {
        drawImage(poster);
      }
    };
    poster.onerror = () => setLoadFailed(true);
  }, [drawImage, loadImage, manifest]);

  useEffect(() => {
    if (!manifest) {
      return;
    }

    requestedFrame.current = frameIndex;
    const cached = frameCache.current.get(frameIndex);
    if (cached?.complete && cached.naturalWidth > 0) {
      drawImage(cached);
      return;
    }

    const src = buildFrameUrl(manifest, frameIndex);
    const image = cached ?? loadImage(src);
    frameCache.current.set(frameIndex, image);

    image.onload = () => {
      if (requestedFrame.current === frameIndex) {
        drawImage(image);
      }
    };
    image.onerror = () => {
      setLoadFailed(true);
      if (posterRef.current) {
        drawImage(posterRef.current);
      }
    };

    const neighborIndexes = [frameIndex - 1, frameIndex + 1].filter((index) => index >= 0 && index < manifest.frameCount);
    neighborIndexes.forEach((index) => {
      if (!frameCache.current.has(index)) {
        frameCache.current.set(index, loadImage(buildFrameUrl(manifest, index)));
      }
    });
  }, [drawImage, frameIndex, loadImage, manifest]);

  useEffect(() => {
    const handleResize = () => {
      const cached = frameCache.current.get(frameIndex);
      if (cached?.complete && cached.naturalWidth > 0) {
        drawImage(cached);
      } else if (posterRef.current) {
        drawImage(posterRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawImage, frameIndex]);

  return (
    <div ref={wrapperRef} className={`relative h-full w-full overflow-hidden bg-[#07130F] ${className}`} aria-label={fallbackLabel}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {loadFailed && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#07130F] text-center text-sm text-[#F7F3EA]/70">
          <span className="rounded-full border border-[#F7F3EA]/15 bg-[#07130F]/80 px-5 py-3">Sequenz wird vorbereitet.</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(7,19,15,0.18)_52%,rgba(7,19,15,0.70)_100%)]" />
    </div>
  );
}
