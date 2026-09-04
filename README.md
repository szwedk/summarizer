# Page Summarizer

A Chrome extension that summarizes the page you're reading. Pick a length, click once,
get the summary in the popup.

## Setup

You need your own [OpenAI API key](https://platform.openai.com/api-keys).

1. `chrome://extensions` → enable Developer mode → **Load unpacked** → select this folder.
2. Open the extension's **Details → Extension options** and paste your key.

The key is kept in `chrome.storage.local` on your machine and is only ever sent to
`api.openai.com`. It is not in the source, and it does not sync.

## How it works

The popup pulls the page text with `chrome.scripting.executeScript`, trims it to roughly
24k characters so a long article can't blow past the context window, and sends one request
to `/v1/chat/completions` with `gpt-4o-mini`.

Three summary styles — brief, detailed, bullets — each a different instruction on the
same call. Your last choice is remembered.

```
summarize.js   endpoint, prompt, truncation, error messages
popup.js       reads the tab, calls summarize, renders state
options.js     stores the API key
```

## Notes

Requesting a summary of a `chrome://` page or the Web Store won't work — Chrome blocks
script injection there, and that's not something an extension can opt out of.
