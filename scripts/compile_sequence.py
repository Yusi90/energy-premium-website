#!/usr/bin/env python3
"""Compile an input video into a web-ready image sequence and manifest.

Example:
  python scripts/compile_sequence.py input.mp4 public/generated/energy-transformation --id energy-transformation --fps 30 --width 1880 --height 920
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def run(command: list[str]) -> None:
    process = subprocess.run(command, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if process.returncode != 0:
        if process.stdout:
            print(process.stdout, file=sys.stdout)
        if process.stderr:
            print(process.stderr, file=sys.stderr)
        raise SystemExit(process.returncode)


def ffmpeg_exists() -> str:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise SystemExit(
            "ffmpeg wurde nicht gefunden. Bitte ffmpeg installieren und erneut ausführen. "
            "Ohne ffmpeg kann kein Video in Frames kompiliert werden."
        )
    return ffmpeg


def supports_webp(ffmpeg: str) -> bool:
    probe = subprocess.run([ffmpeg, "-hide_banner", "-encoders"], text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return "libwebp" in f"{probe.stdout}\n{probe.stderr}" or " webp" in f"{probe.stdout}\n{probe.stderr}"


def count_frames(directory: Path, extension: str) -> int:
    return len(sorted(directory.glob(f"frame_*.{extension}")))


def main() -> None:
    parser = argparse.ArgumentParser(description="Compile an MP4/MOV/WebM video into frames, poster and manifest.json.")
    parser.add_argument("input", type=Path, help="Input video path, e.g. render.mp4")
    parser.add_argument("output", type=Path, help="Output directory under public/generated/... ")
    parser.add_argument("--id", default="energy-transformation", help="Manifest id")
    parser.add_argument("--fps", type=int, default=30, help="Target frame extraction FPS")
    parser.add_argument("--width", type=int, default=1880, help="Manifest/render width")
    parser.add_argument("--height", type=int, default=920, help="Manifest/render height")
    parser.add_argument("--format", choices=["auto", "webp", "jpg", "png"], default="auto", help="Preferred output image format")
    parser.add_argument("--quality", type=int, default=82, help="Quality for WebP/JPG")
    parser.add_argument("--public-url", default=None, help="Public URL prefix, e.g. /generated/energy-transformation")
    args = parser.parse_args()

    if not args.input.exists():
        raise SystemExit(f"Input video nicht gefunden: {args.input}")

    ffmpeg = ffmpeg_exists()
    output = args.output
    output.mkdir(parents=True, exist_ok=True)

    selected_format = args.format
    if selected_format == "auto":
        selected_format = "webp" if supports_webp(ffmpeg) else "jpg"

    extension = "jpg" if selected_format == "jpg" else selected_format
    frame_pattern = output / f"frame_%04d.{extension}"

    for old in output.glob("frame_*.webp"):
        old.unlink()
    for old in output.glob("frame_*.jpg"):
        old.unlink()
    for old in output.glob("frame_*.png"):
        old.unlink()

    vf = f"fps={args.fps},scale={args.width}:{args.height}:force_original_aspect_ratio=increase,crop={args.width}:{args.height}"

    if selected_format == "webp":
        command = [ffmpeg, "-y", "-i", str(args.input), "-vf", vf, "-quality", str(args.quality), str(frame_pattern)]
    elif selected_format == "jpg":
        command = [ffmpeg, "-y", "-i", str(args.input), "-vf", vf, "-q:v", "3", str(frame_pattern)]
    else:
        command = [ffmpeg, "-y", "-i", str(args.input), "-vf", vf, str(frame_pattern)]

    run(command)

    frame_count = count_frames(output, extension)
    if frame_count == 0:
        raise SystemExit("Keine Frames erzeugt. Bitte Input-Video, ffmpeg-Ausgabe und Zielverzeichnis prüfen.")

    first_frame = output / f"frame_0001.{extension}"
    poster = output / f"poster.{extension}"
    shutil.copyfile(first_frame, poster)

    public_url = args.public_url or f"/generated/{output.name}"
    manifest = {
        "id": args.id,
        "kind": "canvas-sequence",
        "format": extension,
        "frameCount": frame_count,
        "framePattern": f"frame_%04d.{extension}",
        "indexBase": 1,
        "pad": 4,
        "fps": args.fps,
        "publicUrl": public_url,
        "frameUrlTemplate": f"{public_url}/frame_{{index}}.{extension}",
        "poster": f"{public_url}/poster.{extension}",
        "size": {"width": args.width, "height": args.height, "fit": "cover"},
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Erzeugt: {frame_count} Frames als {extension}")
    print(f"Poster: {poster}")
    print(f"Manifest: {output / 'manifest.json'}")


if __name__ == "__main__":
    main()
