document.addEventListener("DOMContentLoaded", function () {
  const linkList = document.getElementById("link-list");
  const openSelectedBtn = document.getElementById("open-selected-btn");

  // Request content script to fetch links from the current tab.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getLinks,
    });
  });

  // Listen for messages from content script.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "sendLinks") {
      const links = request.links || [];
      links.forEach((link) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(link));

        linkList.appendChild(listItem);
      });
    }
  });

  openSelectedBtn.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        // Open the link in a new tab.
        window.open(checkbox.nextSibling.textContent, "_blank");
      }
    });
  });
});

// Content script to extract all links from the DOM and send them back to popup.
function getLinks() {
  const links = Array.from(document.querySelectorAll("a")).map((a) => a.href);
  chrome.runtime.sendMessage({ action: "sendLinks", links: links });
}
