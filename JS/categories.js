document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("filter");
  const typeSelect = document.getElementById("typeFilter");
  const sortSelect = document.getElementById("sort");
  const searchInput = document.getElementById("search");
  const categoryDropdownButton = document.getElementById("categoryDropdown");
  const categoryDropdownMenu = document.querySelector(".category-dropdown-menu");
  const categoryFilters = document.querySelectorAll(".category-filter");
  const grid = document.getElementById("categoryGrid");

  // Toggle dropdown menu
  if (categoryDropdownButton) {
    categoryDropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();
      categoryDropdownMenu.classList.toggle("active");
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (categoryDropdownMenu && !categoryDropdownMenu.contains(e.target) && e.target !== categoryDropdownButton) {
      categoryDropdownMenu.classList.remove("active");
    }
  });

  // Update button text when checkboxes change
  function updateButtonText() {
    const checkedCount = Array.from(categoryFilters).filter(cb => cb.checked).length;
    const totalCount = categoryFilters.length;
    
    if (checkedCount === totalCount) {
      categoryDropdownButton.textContent = "All Categories";
    } else if (checkedCount === 0) {
      categoryDropdownButton.textContent = "No Categories";
    } else {
      categoryDropdownButton.textContent = `${checkedCount} Selected`;
    }
    categoryDropdownButton.classList.add("updated");
  }

  function getCards() {
    return Array.from(grid.querySelectorAll(".card"));
  }

  function getSections() {
    return Array.from(grid.querySelectorAll(".resource-section"));
  }

  function getSelectedCategories() {
    return Array.from(categoryFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function applyFilters() {
    const levelVal = levelSelect ? levelSelect.value.toLowerCase() : "all";
    const typeVal = typeSelect ? typeSelect.value.toLowerCase() : "all";
    const searchVal = searchInput ? searchInput.value.toLowerCase() : "";
    const sortVal = sortSelect ? sortSelect.value : "name";
    const selectedCategories = getSelectedCategories();

    // Filter cards (for grid-based pages)
    const cards = getCards();
    cards.forEach(card => {
      const level = card.dataset.level ? card.dataset.level.toLowerCase() : "";
      const type = card.dataset.type ? card.dataset.type.toLowerCase() : "";
      const text = card.textContent.toLowerCase();

      const matchesLevel = levelVal === "all" || level === levelVal;
      const matchesType = typeVal === "all" || type === typeVal;
      const matchesSearch = searchVal === "" || text.includes(searchVal);

      card.style.display = (matchesLevel && matchesType && matchesSearch) ? "" : "none";
    });

    // Filter sections (for resource sections with categories)
    const sections = getSections();
    sections.forEach(section => {
      const category = section.dataset.category ? section.dataset.category.toLowerCase() : "";
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      section.classList.toggle("hidden", !matchesCategory);
    });

    // Filter items within visible sections
    const items = Array.from(grid.querySelectorAll(".resource-item"));
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matchesSearch = searchVal === "" || text.includes(searchVal);
      item.classList.toggle("hidden", !matchesSearch);
    });

    // Sort visible cards
    const visibleCards = cards.filter(c => c.style.display !== "none");

    visibleCards.sort((a, b) => {
      if (sortVal === "name") {
        const aText = a.querySelector("h3")?.textContent.trim() || "";
        const bText = b.querySelector("h3")?.textContent.trim() || "";
        return aText.localeCompare(bText);
      } else if (sortVal === "level") {
        const order = ["beginner", "intermediate", "advanced", "superior"];
        const aLevel = a.dataset.level ? order.indexOf(a.dataset.level.toLowerCase()) : -1;
        const bLevel = b.dataset.level ? order.indexOf(b.dataset.level.toLowerCase()) : -1;
        return aLevel - bLevel;
      }
      return 0;
    });

    visibleCards.forEach(card => grid.appendChild(card));
  }

  // Event listeners
  if (levelSelect) levelSelect.addEventListener("change", applyFilters);
  if (typeSelect) typeSelect.addEventListener("change", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyFilters);
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  
  categoryFilters.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      updateButtonText();
      applyFilters();
    });
  });

  // Initialize
  updateButtonText();
  applyFilters();
});
