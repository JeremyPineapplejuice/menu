const categoryBar = document.getElementById("category-bar");
const menuItemsContainer = document.getElementById("menu-items");

// Paste your published CSV link here:
const sheetCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdKVwNiQOPXWuFSB1QUmg8IwWsEe2WNg2Ts9AjASkzFLE0IwZOMfFQ5lI6z0hMZN5qlvwhp8X1WpUN/pub?gid=0&single=true&output=csv";

fetch(sheetCSV)
  .then(response => response.text())
  .then(csvText => {
    const data = Papa.parse(csvText, { header: true }).data;
    buildMenu(data);
  })
  .catch(err => {
    menuItemsContainer.innerHTML = "<p>Failed to load menu data.</p>";
    console.error("Error loading CSV:", err);
  });

function buildMenu(rows) {
  const menuData = {};

  rows.forEach(row => {
    if (!row.Category || !row.Name) return; // skip empty rows
    const category = row.Category.trim();
    if (!menuData[category]) {
      menuData[category] = [];
    }
    menuData[category].push({
      name: row.Name.trim(),
      price: row.Price ? row.Price.trim() : "",
      ingredients: row.Ingredients ? row.Ingredients.trim() : ""
    });
  });

  // Create category buttons
  Object.keys(menuData).forEach((category, index) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = category;

    if (index === 0) {
      btn.classList.add("active");
      displayMenuItems(menuData, category);
    }

    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      displayMenuItems(menuData, category);
    });

    categoryBar.appendChild(btn);
  });
}

function displayMenuItems(menuData, category) {
  menuItemsContainer.innerHTML = "";
  menuData[category].forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";

    itemDiv.innerHTML = `
      <div class="menu-item-header">
        <span>${item.name}</span>
        <span>${item.price}</span>
      </div>
      <div class="ingredients">${item.ingredients}</div>
    `;

    menuItemsContainer.appendChild(itemDiv);
  });
}

