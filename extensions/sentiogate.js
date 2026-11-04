// SentioGate provider for Pi: registers SentioGate as an OpenAI-compatible provider.
const BASE_URL = process.env.SENTIOGATE_BASE_URL || "https://api.sentiogate.dev/v1";
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
