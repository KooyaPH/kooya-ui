// Only an owned local persistent browser loads this extension. The browser
// controller evaluates tabs.setZoom/getZoom directly in this worker.
chrome.runtime.onMessage.addListener(() => false);
