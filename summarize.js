const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

// Roughly 4 chars per token. Keeps a long article inside the context window
// and stops a huge page from turning into a surprise bill.
const MAX_CHARS = 24000;

const STYLES = {
  brief: "Summarize this page in two or three sentences.",
  detailed: "Summarize this page in one or two paragraphs, keeping specific facts and figures.",
  bullets: "Summarize this page as five short bullet points, one line each."
};

export function styleNames() {
  return Object.keys(STYLES);
}

export function trim(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > MAX_CHARS ? clean.slice(0, MAX_CHARS) + "…" : clean;
}

export async function summarize({ title, text, style, apiKey, signal }) {
  const instruction = STYLES[style] ?? STYLES.brief;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      messages: [
        { role: "system", content: "You summarize web pages. Answer with the summary only." },
        { role: "user", content: `${instruction}\n\nTitle: ${title}\n\n${trim(text)}` }
      ]
    })
  });

  if (!res.ok) throw new Error(await describeFailure(res));

  const data = await res.json();
  const summary = data.choices?.[0]?.message?.content?.trim();
  if (!summary) throw new Error("OpenAI returned an empty summary.");
  return summary;
}

async function describeFailure(res) {
  if (res.status === 401) return "That API key was rejected. Check it in the extension options.";
  if (res.status === 429) return "Rate limited or out of quota. Try again shortly.";

  const body = await res.json().catch(() => null);
  return body?.error?.message ?? `OpenAI request failed (${res.status}).`;
}
