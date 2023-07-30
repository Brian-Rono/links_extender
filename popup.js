document.addEventListener("DOMContentLoaded", function () {
  // Sample links, you can replace these with your own list of links.
  const links = [
    "https://www.example.com",
    "https://www.example.org",
    "https://www.example.net"
  ];

  const linkList = document.getElementById("link-list");
  const openSelectedBtn = document.getElementById("open-selected-btn");

  links.forEach((link) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(link));

    linkList.appendChild(listItem);
  });

  openSelectedBtn.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        // Open the link in a new tab.
        window.open(links[index], "_blank");
      }
    });
  });
});
