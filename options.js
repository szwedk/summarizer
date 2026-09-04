const keyInput = document.getElementById("key");
const statusLine = document.getElementById("status");

chrome.storage.local.get("apiKey").then(({ apiKey }) => {
  if (apiKey) keyInput.value = apiKey;
});

document.getElementById("save").addEventListener("click", async () => {
  const apiKey = keyInput.value.trim();

  if (!apiKey) {
    await chrome.storage.local.remove("apiKey");
    report("Key cleared.");
    return;
  }

  await chrome.storage.local.set({ apiKey });
  report("Saved.");
});

function report(message) {
  statusLine.textContent = message;
  statusLine.classList.remove("hidden");
}
