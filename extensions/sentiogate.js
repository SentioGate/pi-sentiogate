// SentioGate provider for the Pi coding agent (@earendil-works/pi-coding-agent)
// Registers SentioGate as an OpenAI-compatible provider.
function safeBaseUrl(raw) {
  const url = raw || "https://api.sentiogate.dev/v1";
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "https://api.sentiogate.dev/v1";
    }
  } catch {
    return "https://api.sentiogate.dev/v1";
  }
  return url.replace(/\/$/, "");
}

const BASE_URL = safeBaseUrl(process.env.SENTIOGATE_BASE_URL);
const zero = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
const model = (id, name, extra = {}) => ({
  type: "chat", id, name, reasoning: false, input: ["text"], cost: zero,
  contextWindow: 128000, maxTokens: 8192, ...extra,
});

export default function (pi) {
  pi.registerProvider("sentiogate", {
    name: "SentioGate",
    baseUrl: BASE_URL,
    apiKey: "$SENTIOGATE_API_KEY",
    api: "openai-completions",
    models: [
      model("auto", "SentioGate Auto (router picks the model)"),
      model("openrouter/deepseek/deepseek-chat-v3-0324", "DeepSeek V3 (pinned, low cost)"),
      model("openrouter/google/gemini-2.5-flash", "Gemini 2.5 Flash (pinned)", { input: ["text", "image"], contextWindow: 1000000 }),
    ],
  });
}
