const main = document.getElementById("main");

const cards = document.querySelectorAll(".job-card");
const tags = document.querySelectorAll(".tag");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    const value = tag.textContent.toLowerCase();

    cards.forEach(card => {
      const role = card.dataset.role;
      const level = card.dataset.level;
      const languages = card.dataset.languages.split(",");
      const tools = card.dataset.tools
        ? card.dataset.tools.split(",")
        : [];

      const match =
        role === value ||
        level === value ||
        languages.includes(value) ||
        tools.includes(value);

        console.log(match);

      card.style.display = match ? "block" : "none";
    });
  });
});
