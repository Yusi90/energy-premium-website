import OpenAI from "openai";

export const runtime = "nodejs";

type GenerateImageRequest = {
  prompt?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateImageRequest;
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return Response.json({ error: "Ein Prompt ist erforderlich." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "OPENAI_API_KEY ist serverseitig nicht konfiguriert." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const image = await openai.images.generate({
      // Falls das konfigurierte Bildmodell nicht verfügbar ist, kann es hier angepasst werden.
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
    });

    const imageBase64 = image.data?.[0]?.b64_json;

    if (!imageBase64) {
      return Response.json({ error: "Die OpenAI API hat kein Base64-Bild zurückgegeben." }, { status: 502 });
    }

    return Response.json({ imageBase64 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler bei der Bildgenerierung.";
    return Response.json({ error: message }, { status: 500 });
  }
}
