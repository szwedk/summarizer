chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
      const { title, text } = request;
      summarizeContent(title, text)
        .then((summaries) => {
          sendResponse({ summary: summaries });
        })
        .catch((error) => {
          console.error("Error summarizing content:", error);
          sendResponse({ summary: [] });
        });
      return true;
    }
  });
  
  async function summarizeContent(title, text) {
    const apiKey = "[yourAPIkeyHere";
    const prompt = `Summarize the following content:\n\nTitle: ${title}\n\nText: ${text}\n\nSummary:`;
  
    const response1 = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.7,
        }),
      }
    );
  
    const summary1 = (await response1.json()).choices[0].text.trim();
  
    const response2 = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 80,
          n: 1,
          stop: null,
          temperature: 0.7,
        }),
      }
    );
  
    const summary2 = (await response2.json()).choices[0].text.trim();
  
    // Unique summarization method for summary3 - bullet points
    const response3 = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Provide a bullet-point summary of the following content:\n\nTitle: ${title}\n\nText: ${text}\n\nBullet points:`,
          max_tokens: 80,
          n: 1,
          stop: null,
          temperature: 0.7,
        }),
      }
    );
  
    const summary3 = (await response3.json()).choices[0].text.trim();
  
    return [summary1, summary2, summary3];
  }
  


  
