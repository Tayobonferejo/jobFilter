const tags = document.querySelectorAll(".tag");
const cards = document.querySelectorAll(".job-card");
const filterBar = document.getElementById("filter");

// Initialize filters
const activeFilters = {
  role: new Set(),
  level: new Set(),
  language: new Set(),
  tool: new Set()
};

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    const value = tag.textContent.toLowerCase();
    const type = tag.dataset.type || (value.includes('react') || value.includes('vue') || value.includes('django') ? 'tool' : 'language');
    const isActive = tag.classList.toggle("active");

    if (isActive) {
      activeFilters[type].add(value);
    } else {
      activeFilters[type].delete(value);
    }

    filterCards();
    updateFilterBar();
  });
});


function filterCards() {
  cards.forEach(card => {
    const role = card.dataset.role.toLowerCase();
    const level = card.dataset.level.toLowerCase();
    const languages = card.dataset.languages ? card.dataset.languages.toLowerCase().split(",") : [];
    const tools = card.dataset.tools ? card.dataset.tools.toLowerCase().split(",") : [];

    const matchRole = !activeFilters.role.size || activeFilters.role.has(role);
    const matchLevel = !activeFilters.level.size || activeFilters.level.has(level);
    const matchLanguage = !activeFilters.language.size || languages.some(lang => activeFilters.language.has(lang));
    const matchTool = !activeFilters.tool.size || tools.some(tool => activeFilters.tool.has(tool));

    const match = matchRole && matchLevel && matchLanguage && matchTool;

    if (match) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}


function updateFilterBar() {
  filterBar.innerHTML = "";

  Object.entries(activeFilters).forEach(([type, values]) => {
    values.forEach(value => {
      const pill = document.createElement("div");
      pill.className = "filter-pill";

      pill.innerHTML = `
        <span>${value}</span>
        <button data-type="${type}" data-value="${value}">✕</button>
      `;

      filterBar.appendChild(pill);
    });
  });
}

filterBar.addEventListener("click", e => {
  if (!e.target.matches("button")) return;

  const { type, value } = e.target.dataset;

  // Remove from filter state
  activeFilters[type].delete(value);

  // Remove active class from matching tag
  tags.forEach(tag => {
    if (tag.textContent.toLowerCase() === value) {
      tag.classList.remove("active");
    }
  });

  updateFilterBar();
  filterCards();
});



// resetBtn.addEventListener("click", () => {
//   activeRoles.clear();
//   activeLevel = null;

//   tags.forEach(tag => tag.classList.remove("active"));
//   cards.forEach(card => card.classList.remove("hide"));

//   filterCards();
// });
