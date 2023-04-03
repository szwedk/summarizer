document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("summarizeButton").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.executeScript(activeTab.id, { file: "content.js" }, () => {
          chrome.tabs.sendMessage(activeTab.id, { action: "requestContent" }, (response) => {
            if (response) {
              const { title, text } = response;
              chrome.runtime.sendMessage({ action: "summarize", title, text }, (result) => {
                if (result) {
                  displaySummaries(result.summary);
                }
              });
            }
          });
        });
      });
    });
  });
  
  
  function displaySummaries(summaries) {
    const summaryOptions = document.getElementById("summaryOptions");
    const summariesContainer = document.getElementById("summariesContainer");
    summariesContainer.innerHTML = "";
  
    summaries.forEach((summary) => {
      const summaryElement = document.createElement("div");
      summaryElement.className = "summary";
      summaryElement.innerText = summary;
      summariesContainer.appendChild(summaryElement);
    });
  
    summaryOptions.classList.remove("hidden");
  }
  