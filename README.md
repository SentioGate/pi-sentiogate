# @sentiogate/pi-provider

Use [SentioGate](https://sentiogate.app) as a model provider in [Pi](https://pi.dev).
SentioGate is an OpenAI-compatible LLM router with zero markup on your own keys. It runs on a global edge, picks a model for each request with `auto`, and automatically falls back to another model if one fails.

## Install

```bash
pi install npm:@sentiogate/pi-provider
```

Or try it for one run without saving it: `pi -e npm:@sentiogate/pi-provider`.

## Configure

1. Create an API key at https://sentiogate.app and add your own provider keys there (or use the free community pool).
2. Export it:

```bash
export SENTIOGATE_API_KEY=your-key
```

3. Pick a model:

```bash
pi --model sentiogate/auto
pi -p "say hi" --model sentiogate/auto
```

Inside Pi, use `/model` and choose a `sentiogate/...` entry.

## Models

| Model | Use |
|---|---|
| `sentiogate/auto` | Recommended. SentioGate picks the model per request. |
| `sentiogate/openrouter/deepseek/deepseek-chat-v3-0324` | Pinned low-cost model, good for background work. |
| `sentiogate/openrouter/google/gemini-2.5-flash` | Pinned fast model with image input. |

Pinned models only work if your key's allowed-models list includes them. Any other model id your key allows can be added via `~/.pi/agent/models.json`.

## Options

| Env var | Default | Purpose |
|---|---|---|
| `SENTIOGATE_API_KEY` | (required) | Your SentioGate key |
| `SENTIOGATE_BASE_URL` | `https://api.sentiogate.dev/v1` | Override the API endpoint |

## License

Apache-2.0
