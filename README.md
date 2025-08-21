# Summarizer — AI-Powered Chrome Extension

A simple, Chrome extension that summarizes the content of the page you're browsing. Inspired by common tools, this extension gives you a clean reading experience, dispensing only the content that matters.

---

## What It Does

Highlights a webpage needs just one click. It then digs in, extracts the core ideas, and serves you a neat, compact summary. Designed for blogs, articles, and document heavy pages. Think of it as your personal TL;DR companion in Chrome.

---

## Project Structure

```
summarizer/
├─ background.js     # Extension logic for context menu or browser interaction
├─ content.js        # Injected script that captures page content
├─ popup.html        # UI presented when the extension icon is clicked
├─ popup.js          # Handles UI logic and summary display
├─ popup.css         # Styles for popup interface
├─ manifest.json     # Chrome extension configuration
├─ images/           # Icons or assets used
```

---

## Quick Setup

1. **Clone this repo**  
   ```bash
   git clone https://github.com/szwedk/summarizer.git
   cd summarizer
   ```

2. **Install (none required)**  
   - No build tools needed—plain JavaScript and HTML.

3. **Load to Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** → select this folder
   - Voilà! Your extension is now active.

---

## How to Use

- Click the extension icon.
- The webpage content loads.
- Click **“Summarize”**.
- A clean, concise summary appears—no fluff.

---

## Ideas for Improvement

- Add API-powered summarization (e.g. GPT-3, OpenAI, Cohere)
- Allow user to select summary length (short, medium, long)
- Let users copy or download summaries
- Add browser context menu option: "Summarize this page"
- Cache summaries for offline access or faster recall

---


Created and maintained by **Kamil Szwed**.  
Happy summarizing!
