import { summarize } from "./summarize.js";

const runButton = document.getElementById("run");
const styleSelect = document.getElementById("style");
const statusLine = document.getElementById("status");
const summaryBox = document.getElementById("summary");

const controller = new AbortController();
addEventListener("unload", () => controller.abort());

chrome.storage.local.get("style").then(({ style }) => {
  if (style) styleSelect.value = style;
});

runButton.addEventListener("click", async () => {
  const style = styleSelect.value;
  chrome.storage.local.set({ style });

  setBusy(true);
  show(statusLine, "Reading the page…");
  summaryBox.classList.add("hidden");

  try {
    const { apiKey } = await chrome.storage.local.get("apiKey");
    if (!apiKey) throw new Error("Add your OpenAI API key in the extension options first.");

    const page = await readActiveTab();
    if (!page.text) throw new Error("Nothing readable on this page.");

    show(statusLine, "Summarizing…");
    const summary = await summarize({ ...page, style, apiKey, signal: controller.signal });

    statusLine.classList.add("hidden");
    show(summaryBox, summary);
  } catch (err) {
    if (err.name === "AbortError") return;
    show(statusLine, err.message);
  } finally {
    setBusy(false);
  }
});

async function readActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => ({ title: document.title, text: document.body.innerText })
  });

  return result.result;
}

function setBusy(busy) {
  runButton.disabled = busy;
  runButton.textContent = busy ? "Working…" : "Summarize";
}

function show(el, text) {
  el.textContent = text;
  el.classList.remove("hidden");
}
