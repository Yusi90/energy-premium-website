import { fal } from "@fal-ai/client";

export const runtime = "nodejs";

type GenerateVideoRequest = {
  imageUrl?: unknown;
  prompt?: unknown;
};

type FalVideoResult = {
  requestId?: string;
  data?: {
    video?: {
      url?: string;
    };
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateVideoRequest;
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!imageUrl || !prompt) {
      return Response.json({ error: "imageUrl und prompt sind erforderlich." }, { status: 400 });
    }

    const credentials = process.env.FAL_KEY;

    if (!credentials) {
      return Response.json({ error: "FAL_KEY ist serverseitig nicht konfiguriert." }, { status: 500 });
    }

    fal.config({ credentials });

    const result = (await fal.subscribe("fal-ai/kling-video/v2.1/pro/image-to-video", {
      // fal.ai Image-to-Video benötigt eine öffentlich erreichbare Bild-URL; lokale oder private URLs funktionieren nicht.
      input: {
        image_url: imageUrl,
        prompt,
        duration: "5",
        negative_prompt: "text, logos, people, fantasy, exaggerated sci-fi, shaky camera",
      },
    })) as FalVideoResult;

    const video = result.data?.video?.url;

    if (!video) {
      return Response.json({ error: "fal.ai hat keine Video-URL zurückgegeben.", requestId: result.requestId }, { status: 502 });
    }

    return Response.json({ video, requestId: result.requestId ?? "" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler bei der Videogenerierung.";
    return Response.json({ error: message }, { status: 500 });
  }
}
