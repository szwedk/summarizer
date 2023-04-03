chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestContent") {
      const title = document.title;
      const text = document.body.innerText;
      sendResponse({ title, text });
    }
  });
  